import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { cached, ttl, tags } from "../cache";
import { assertPlatforms } from "@/lib/schema";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    NotionList,
    NotionPage,
    isFullPage,
    getTitle,
    getRichText,
    getUrl,
    getNumber,
} from "./parse";

export type Platform = {
    id: string,
    name: string,
    url?: string,
    label?: string,
    priority?: number,
};

const rawToPlatform = (p: NotionPage): Platform => {
    if (!isFullPage(p)) {
        return {
            id: p.id,
            name: "Untitled",
            url: undefined,
            priority: undefined,
        };
    }
    const props = p.properties;
    return {
        id: p.id,
        name: getTitle(props, "Name") || "Untitled",
        url: getUrl(props, "URL") || undefined,
        label: getRichText(props, "Label") || undefined,
        priority: getNumber(props, "Priority"),
    };
};

async function _getPlatforms(): Promise<Platform[]> {
    const data_source_id = await getDataSourceId(DB.PLATFORMS);
    const all: PageObjectResponse[] = [];
    let start_cursor: string | undefined;

    do {
        const res = (await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Priority", direction: "ascending" },
                { property: "Name", direction: "ascending" },
            ],
            page_size: 100,
            start_cursor,
        })) as NotionList<PageObjectResponse>;

        all.push(...res.results);
        start_cursor = res.next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToPlatform);
    assertPlatforms(items);
    return items;
}

export const getPlatforms = cached(["notion", "platforms", "all"], _getPlatforms, {
    revalidate: ttl.long,
    tags: tags.platforms ? tags.platforms() : undefined,
});
