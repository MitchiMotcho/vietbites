import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { cached, ttl, tags } from "../cache";
import { assertPillars, TPillar } from "@/lib/schema";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    NotionList,
    NotionPage,
    isFullPage,
    getTitle,
    getRichText,
    getNumber,
} from "./parse";

export type Pillar = TPillar;

const rawToPillar = (p: NotionPage): Pillar => {
    if (!isFullPage(p)) {
        return {
            id: p.id,
            title: "Untitled",
            description: undefined,
            priority: undefined,
        };
    }
    const props = p.properties;
    return {
        id: p.id,
        title: getTitle(props, "Title") || "Untitled",
        description: getRichText(props, "Description") || undefined,
        priority: getNumber(props, "Priority"),
    };
};

async function _getPillars(): Promise<Pillar[]> {
    const data_source_id = await getDataSourceId(DB.PILLARS);
    const all: PageObjectResponse[] = [];
    let start_cursor: string | undefined;

    do {
        const res = (await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Priority", direction: "ascending" },
                { property: "Title", direction: "ascending" },
            ],
            page_size: 100,
            start_cursor,
        })) as NotionList<PageObjectResponse>;

        all.push(...res.results);
        start_cursor = res.next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToPillar);
    assertPillars(items);
    return items;
}

export const getPillars = cached(["notion", "pillars", "all"], _getPillars, {
    revalidate: ttl.long,
    tags: tags.pillars ? tags.pillars() : undefined,
});
