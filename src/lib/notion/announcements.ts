import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { text, fileUrl } from "./parse";
import { cached, tags, ttl } from "../cache";
import { assertAnnouncements } from "@/lib/schema";

export type Announcement = {
    id: string;
    title: string;
    details?: string;
    media?: string;
    sort?: number;
    active?: boolean;
};

const rawToAnn = (p: any): Announcement => {
    const props = p.properties;
    return {
        id: p.id,
        title: text(props.Title?.title) || "Untitled",
        details: text(props.Details?.rich_text) || undefined,
        media: fileUrl(props.Media?.files),
        sort: props.Sort?.number ?? undefined,
        active: props.Active?.checkbox ?? true,
    };
};

async function _getAnnouncements(): Promise<Announcement[]> {
    const data_source_id = await getDataSourceId(DB.ANNOUNCEMENTS);
    const all: any[] = [];
    let start_cursor: string | undefined;

    do {
        const res = await notion.dataSources.query({
            data_source_id,
            sorts: [{ property: "Sort", direction: "ascending" }],
            filter: { property: "Active", checkbox: { equals: true } }, // valid
            page_size: 100,
            start_cursor,
        });
        all.push(...res.results);
        start_cursor = (res as any).next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToAnn);
    try {
        assertAnnouncements(items);
    } catch (error) {
        console.error("Announcements validation failed:", error);
        throw error;
    }
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
