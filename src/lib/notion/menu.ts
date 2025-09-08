import "server-only";
import { notion, DB, getDataSourceId } from "./client";
import { text, fileUrl } from "./parse";
import { cached, tags, ttl } from "../cache";
import { assertMenu } from "@/lib/schema";

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

const rawToItem = (p: any): MenuItem => {
    const props = p.properties;
    return {
        id: p.id,
        name: text(props.Name?.title) || "Untitled",
        vietName: text(props["Vietnamese Name"]?.rich_text) || "Untitled",
        description: text(props.Description?.rich_text) || undefined,
        price:
            props.Price?.number ??
            (text(props.Price) ? Number(text(props.Price)) : 0),
        category: props.Category?.select?.name ?? "Uncategorized",
        photo: fileUrl(props.Photo?.files),
        notes: props.Notes?.select?.name ?? undefined,
        sortOrder: props["Sort Order"]?.number ?? undefined,
        available: !!props.Available?.checkbox,
        tags: (props.Tags?.multi_select ?? []).map((t: any) => t.name),
    };
};

async function _getMenu(): Promise<MenuItem[]> {
    const data_source_id = await getDataSourceId(DB.MENU);
    const all: any[] = [];
    let start_cursor: string | undefined;

    do {
        const pages = await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Sort Order", direction: "ascending" },
                { property: "Name", direction: "ascending" },
            ],
            filter: { property: "Available", checkbox: { equals: true } },
            page_size: 100,
            start_cursor,
        });
        all.push(...pages.results);
        start_cursor = (pages as any).next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToItem);
    try {
        assertMenu(items); // validate and throw if mismatch
    } catch (error) {
        console.error("Menu validation failed:", error);
        throw error;
    }
    return items;
}

async function _getMenuByCategory(category: string): Promise<MenuItem[]> {
    const data_source_id = await getDataSourceId(DB.MENU);
    const all: any[] = [];
    let start_cursor: string | undefined;

    do {
        const pages = await notion.dataSources.query({
            data_source_id,
            sorts: [
                { property: "Sort Order", direction: "ascending" },
                { property: "Name", direction: "ascending" },
            ],
            filter: { property: "Category", select: { equals: category } },
            page_size: 100,
            start_cursor,
        });
        all.push(...pages.results);
        start_cursor = (pages as any).next_cursor ?? undefined;
    } while (start_cursor);

    const items = all.map(rawToItem);
    try {
        assertMenu(items); // validate and throw if mismatch
    } catch (error) {
        console.error("Menu validation failed:", error);
        throw error;
    }

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
