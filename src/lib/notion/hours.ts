import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { cached, tags, ttl } from "../cache";
import { assertHours } from "@/lib/schema";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    NotionList,
    NotionPage,
    isFullPage,
    getTitle,
    getRichText,
    getNumber,
    getCheckbox,
} from "./parse";

/** App-facing type */
export type OpeningHour = {
    id: string;
    day: string;
    open: string;
    close: string;
    closed: boolean;
    notes?: string;
    sort?: number;
};

/**
 * Read a time value from a property that could be one of:
 * - date (take start time portion)
 * - select (name)
 * - rich_text (joined)
 */
function readTimeFromProp(
    props: PageObjectResponse["properties"],
    key: string
): string | undefined {
    const prop = props[key];
    if (!prop) return undefined;

    if (prop.type === "date") {
        const start = prop.date?.start;
        if (start) {
            // "2025-09-06T11:00:00.000-04:00" -> "11:00"
            const m = start.match(/T(\d{2}:\d{2})/);
            if (m) return m[1];
        }
    }

    if (prop.type === "select") {
        return prop.select?.name?.trim() || undefined;
    }

    if (prop.type === "rich_text") {
        const rt = getRichText(props, key);
        return rt?.trim();
    }

    return undefined;
}

const rawToHour = (p: NotionPage): OpeningHour => {
    if (!isFullPage(p)) {
        return {
            id: p.id,
            day: "",
            open: "",
            close: "",
            closed: false,
            notes: undefined,
            sort: undefined,
        };
    }

    const props = p.properties;
    return {
        id: p.id,
        day: getTitle(props, "Day") || "",
        open: readTimeFromProp(props, "Open") ?? "",
        close: readTimeFromProp(props, "Close") ?? "",
        closed: getCheckbox(props, "Closed") ?? false,
        notes: getRichText(props, "Notes") || undefined,
        sort: getNumber(props, "Sort"),
    };
};

async function _getHours(): Promise<OpeningHour[]> {
    const data_source_id = await getDataSourceId(DB.OPENING);
    const all: PageObjectResponse[] = [];
    let start_cursor: string | undefined;

    do {
        const res = (await notion.dataSources.query({
            data_source_id,
            sorts: [{ property: "Sort", direction: "ascending" }],
            page_size: 100,
            start_cursor,
        })) as NotionList<PageObjectResponse>;

        all.push(...res.results);
        start_cursor = res.next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToHour);
    assertHours(items);
    return items;
}

export const getHours = cached(["notion", "hours"], _getHours, {
    tags: tags.hours(),
    revalidate: ttl.long,
});
