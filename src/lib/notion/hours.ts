import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { text } from "./parse";
import { cached, tags, ttl } from "../cache";
import { assertHours } from "@/lib/schema";

export type OpeningHour = {
    id: string;
    day: string; // "Monday"
    open?: string; // "11:00"
    close?: string; // "20:00"
    closed: boolean;
    notes?: string;
    sort?: number;
};

const rawToHour = (p: any): OpeningHour => {
    const props = p.properties;
    return {
        id: p.id,
        day: text(props.Day?.title) || "",
        open: text(props.Open?.rich_text) || undefined,
        close: text(props.Close?.rich_text) || undefined,
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
