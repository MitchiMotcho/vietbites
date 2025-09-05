import { notion, DB, getDataSourceId } from "../notionClient";
import { cached, tags, ttl } from "../cache";
import { mapMenuItem } from "../mappers";
import type { TMenuItem } from "../schema";

async function _fetchMenu(): Promise<TMenuItem[]> {
    const dataSourceId = await getDataSourceId(DB.MENU);
    const res = await notion.dataSources.query({
        data_source_id: dataSourceId,
        sorts: [{ property: "Name", direction: "ascending" }],
    });
    return (res.results as any[]).map(mapMenuItem);
}

async function _fetchMenuByCategory(category: string): Promise<TMenuItem[]> {
    const dataSourceId = await getDataSourceId(DB.MENU);
    const res = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: { property: "Category", select: { equals: category } },
        sorts: [{ property: "Name", direction: "ascending" }],
    });
    return (res.results as any[]).map(mapMenuItem);
}

export const getMenu = cached(["menu", "all"], _fetchMenu, {
    revalidate: ttl.long,
    tags: tags.menu(),
});

export const getMenuByCategory = (category: string) =>
    cached(
        ["menu", "category", category],
        () => _fetchMenuByCategory(category),
        {
            revalidate: ttl.long,
            tags: tags.menu(category),
        }
    )();
