import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { text } from "./parse";
import { cached, tags, ttl } from "../cache";
import { assertHours } from "@/lib/schema";

export type OpeningHour = {
    id: string;
    day: string;
    open: string;
    close: string;
    closed: boolean;
    notes?: string;
    sort?: number;
};

function readTime(prop: any): string | undefined {
    // Date type (if used) takes precedence
    const date = prop?.date?.start as string | undefined;
    if (date) {
        // e.g., "2025-09-06T11:00:00.000-04:00" -> "11:00"
        const m = date.match(/T(\d{2}:\d{2})/);
        if (m) return m[1];
    }

    const sel = prop?.select?.name as string | undefined;
    if (sel) return sel.trim();

    // Rich text fallback
    const rt = text(prop?.rich_text);
    if (rt) return rt.trim();

    return undefined;
}

const rawToHour = (p: any): OpeningHour => {
    const props = p.properties;
    return {
        id: p.id,
        day: text(props.Day?.title) || "",
        open: readTime(props.Open) ?? "",
        close: readTime(props.Close) ?? "",
        closed: !!props.Closed?.checkbox,
        notes: text(props.Notes?.rich_text) || undefined,
        sort: props.Sort?.number ?? undefined,
    };
};

async function _getHours(): Promise<OpeningHour[]> {
    const data_source_id = await getDataSourceId(DB.OPENING);
    const all: any[] = [];
    let start_cursor: string | undefined;

    do {
        const res = await notion.dataSources.query({
            data_source_id,
            sorts: [{ property: "Sort", direction: "ascending" }],
            page_size: 100,
            start_cursor,
        });
        all.push(...res.results);
        start_cursor = (res as any).next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToHour);
    try {
        assertHours(items);
    } catch (error) {
        console.error("Hours validation failed:", error);
        throw error;
    }
    return items;
}

export const getHours = cached(["notion", "hours"], _getHours, {
    tags: tags.hours(),
    revalidate: ttl.long,
});
