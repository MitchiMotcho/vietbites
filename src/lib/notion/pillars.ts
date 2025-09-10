import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { text } from "./parse";
import { cached, ttl, tags } from "../cache";
import { assertPillars, TPillar } from "@/lib/schema";

export type Pillar = TPillar;

const rawToPillar = (p: any): Pillar => {
    const props = p.properties;
    return {
        id: p.id,
        title: text(props.Title?.title) || "Untitled",
        description: text(props.Description?.rich_text) || undefined,
        priority: props["Priority"]?.number ?? undefined,
    };
};

async function _getPillars(): Promise<Pillar[]> {
    const data_source_id = await getDataSourceId(
        DB.PILLARS
    );
    const all: any[] = [];
    let start_cursor: string | undefined;

    do {
        const pages = await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Priority", direction: "ascending" },
                { property: "Title", direction: "ascending" },
            ],
            page_size: 100,
            start_cursor,
        });
        all.push(...pages.results);
        start_cursor = (pages as any).next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToPillar);
    try {
        assertPillars(items); // validate and throw if mismatch
    } catch (error) {
        console.error("Pillars validation failed:", error);
        throw error;
    }
    return items;
}

export const getPillars = cached(["notion", "pillars", "all"], _getPillars, {
    revalidate: ttl.long,
    // If your cache tags helper doesn't have `pillars`, either add it or remove the tags line.
    tags: (tags as any).pillars ? (tags as any).pillars() : undefined,
});
