import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { cached, tags, ttl } from "../cache";
import { assertMenu } from "@/lib/schema";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    NotionList,
    NotionPage,
    isFullPage,
    getTitle,
    getRichText,
    getNumber,
    getSelectName,
    firstFileUrl,
    getCheckbox,
    getMultiSelectNames,
} from "./parse";

export type MenuItem = {
    id: string;
    name: string;
    vietName: string;
    description?: string;
    price: number;
    category:
        | "Sticky Rice"
        | "Cake Box"
        | "Combo"
        | "Sweets"
        | "House Special"
        | "Toppings"
        | "Drinks"
        | "Sweet Soup"
        | "Banh Mi"
        | string;
    photo?: string;
    notes?: "NEW" | "HIGHLIGHT" | string | undefined;
    sortOrder?: number;
    available: boolean;
    tags?: string[];
};

const rawToItem = (p: NotionPage): MenuItem => {
    if (!isFullPage(p)) {
        return {
            id: p.id,
            name: "Untitled",
            vietName: "Untitled",
            price: 0,
            category: "Uncategorized",
            available: true,
        };
    }
    const props = p.properties;

    const name = getTitle(props, "Name") || "Untitled";
    const vietName = getRichText(props, "Vietnamese Name") || "Untitled";
    const description = getRichText(props, "Description") || undefined;

    const price =
        getNumber(props, "Price") ?? (Number(getTitle(props, "Price")) || 0); // safety fallback if schema is temporarily off

    const category = getSelectName(props, "Category") ?? "Uncategorized";
    const photo = firstFileUrl(props, "Photo");
    const notes = getSelectName(props, "Notes") ?? undefined;
    const sortOrder = getNumber(props, "Sort Order");
    const available = getCheckbox(props, "Available") ?? true;
    const tags = getMultiSelectNames(props, "Tags") ?? [];

    return {
        id: p.id,
        name,
        vietName,
        description,
        price,
        category,
        photo,
        notes,
        sortOrder,
        available,
        tags,
    };
};

async function _getMenu(): Promise<MenuItem[]> {
    const data_source_id = await getDataSourceId(DB.MENU);
    const all: PageObjectResponse[] = [];
    let start_cursor: string | undefined;

    do {
        const pages = (await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Sort Order", direction: "ascending" },
                { property: "Name", direction: "ascending" },
            ],
            filter: { property: "Available", checkbox: { equals: true } },
            page_size: 100,
            start_cursor,
        })) as NotionList<PageObjectResponse>;

        all.push(...pages.results);
        start_cursor = pages.next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToItem);
    assertMenu(items);
    return items;
}

async function _getMenuByCategory(category: string): Promise<MenuItem[]> {
    const data_source_id = await getDataSourceId(DB.MENU);
    const all: PageObjectResponse[] = [];
    let start_cursor: string | undefined;

    do {
        const pages = (await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Sort Order", direction: "ascending" },
                { property: "Name", direction: "ascending" },
            ],
            filter: { property: "Category", select: { equals: category } },
            page_size: 100,
            start_cursor,
        })) as NotionList<PageObjectResponse>;

        all.push(...pages.results);
        start_cursor = pages.next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToItem);
    assertMenu(items);
    return items;
}

export const getMenu = cached(["notion", "menu", "all"], _getMenu, {
    revalidate: ttl.long,
    tags: tags.menu(),
});

export const getMenuByCategory = (category: string) =>
    cached(
        ["notion", "menu", "category", category],
        () => _getMenuByCategory(category),
        {
            revalidate: ttl.long,
            tags: tags.menu(category),
        }
    )();
