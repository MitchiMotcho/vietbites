import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// Centralize DB ids (32-char IDs from Notion URLs)
export const DB = {
    MENU: process.env.NOTION_DB_MENU!,
    OPENING: process.env.NOTION_DB_OPENING!,
    ANNOUNCEMENTS: process.env.NOTION_DB_ANNOUNCEMENTS!,
};

for (const [k, v] of Object.entries(DB)) {
  if (!v) throw new Error(`Missing env for ${k} database id`);
}

/**
 * Resolve and memoize the Data Source ID for a given Database ID.
 * New Notion API wants dataSource_id when querying.
 */
const dsCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
    const cached = dsCache.get(databaseId);
    if (cached) return cached;

    const db = await notion.databases.retrieve({ database_id: databaseId });
    const dsId = (db as any)?.data_sources?.[0]?.id as string | undefined;
    if (!dsId) {
        throw new Error(
            `No data source found for database ${databaseId}. ` +
                `Make sure you're opening the ORIGINAL database (not a linked view) and that your integration has Connections access.`
        );
    }
    dsCache.set(databaseId, dsId);
    return dsId;
}
