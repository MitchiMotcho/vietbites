import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const DB = {
    MENU: process.env.NOTION_DB_MENU!,
    OPENING: process.env.NOTION_DB_OPENING!,
    ANNOUNCEMENTS: process.env.NOTION_DB_ANNOUNCEMENTS!,
    PILLARS: process.env.NOTION_DB_PILLARS!,
};

for (const [k, v] of Object.entries(DB)) {
    if (!v) throw new Error(`Missing env for ${k} database id`);
}

type DatabaseWithDataSources = {
    data_sources?: { id: string }[];
};

const dsCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
    const hit = dsCache.get(databaseId);
    if (hit) return hit;

    const db = (await notion.databases.retrieve({
        database_id: databaseId,
    })) as DatabaseWithDataSources;

    const dsId = db.data_sources?.[0]?.id;
    if (!dsId) {
        throw new Error(
            `No data source found for database ${databaseId}. Ensure your integration is connected to the ORIGINAL database.`
        );
    }
    dsCache.set(databaseId, dsId);
    return dsId;
}
