import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { cached, tags, ttl } from "../cache";
import { assertAnnouncements } from "@/lib/schema";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    NotionList,
    NotionPage,
    isFullPage,
    getTitle,
    getRichText,
    getNumber,
    firstFileUrl,
    getCheckbox,
} from "./parse";

export type Announcement = {
    id: string;
    title: string;
    details?: string;
    media?: string;
    sort?: number;
    active?: boolean;
};

const rawToAnn = (p: NotionPage): Announcement => {
    if (!isFullPage(p)) return { id: p.id, title: "Untitled", active: true };
    const props = p.properties;
    return {
        id: p.id,
        title: getTitle(props, "Title") || "Untitled",
        details: getRichText(props, "Details") || undefined,
        media: firstFileUrl(props, "Media"),
        sort: getNumber(props, "Sort"),
        active: getCheckbox(props, "Active") ?? true,
    };
};

async function _getAnnouncements(): Promise<Announcement[]> {
    const data_source_id = await getDataSourceId(DB.ANNOUNCEMENTS);
    const all: PageObjectResponse[] = [];
    let start_cursor: string | undefined;

    do {
        const res = (await notion.dataSources.query({
            data_source_id,
            sorts: [{ property: "Sort", direction: "ascending" }],
            filter: { property: "Active", checkbox: { equals: true } },
            page_size: 100,
            start_cursor,
        })) as NotionList<PageObjectResponse>;

        all.push(...res.results);
        start_cursor = res.next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToAnn);
    assertAnnouncements(items);
    return items;
}

export const getAnnouncements = cached(
    ["notion", "announcements"],
    _getAnnouncements,
    {
        tags: tags.announcements(),
        revalidate: ttl.long,
    }
);
