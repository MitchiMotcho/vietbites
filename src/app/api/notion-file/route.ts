import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const revalidate = 0; // always resolve fresh (no ISR cache)
const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * Pull the i-th file url from a Notion page's Files property.
 * Handles both "file" (signed, expiring) and "external" (public) entries.
 */
async function resolveFileUrl(pageId: string, prop: string, index = 0) {
    // You can also call notion.pages.properties.retrieve here if you want to avoid retrieving the whole page
    const page = (await notion.pages.retrieve({ page_id: pageId })) as any;
    const p = page?.properties?.[prop];

    if (!p || p.type !== "files") return null;
    const files = p.files || [];
    const f = files[index];
    if (!f) return null;

    if (f.type === "external") return f.external?.url ?? null;
    if (f.type === "file") return f.file?.url ?? null; // signed URL (expiring)
    return null;
}

export async function GET(req: NextRequest) {
    const pageId = req.nextUrl.searchParams.get("pageId");
    const prop = req.nextUrl.searchParams.get("prop") ?? "Image";
    const iParam = req.nextUrl.searchParams.get("i");
    const index = iParam ? Number(iParam) : 0;

    if (!pageId) {
        return NextResponse.json({ error: "Missing pageId" }, { status: 400 });
    }

    try {
        const url = await resolveFileUrl(pageId, prop, index);
        if (!url) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // Redirect to the latest signed (or external) URL.
        // Short, friendly caching on the edge/cdn layer.
        return NextResponse.redirect(url, {
            status: 302,
            headers: {
                // keep short; signed urls typically rotate ~60m
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (err) {
        console.error("notion-file proxy error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
