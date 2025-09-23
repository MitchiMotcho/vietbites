import { NextResponse } from "next/server";
import { revalidateByTag } from "@/lib/cache";

// Protect endpoint with a token
const TOKEN = process.env.REVALIDATE_TOKEN;

export async function POST(req: Request) {
    try {
        const { tag, token } = await req.json();

        if (TOKEN && token !== TOKEN) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized" },
                { status: 401 }
            );
        }
        if (!tag) {
            return NextResponse.json(
                { ok: false, error: "Missing tag" },
                { status: 400 }
            );
        }

        await revalidateByTag(tag);
        return NextResponse.json({ ok: true, revalidated: tag });
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        return NextResponse.json(
            { ok: false, error: errorMessage },
            { status: 500 }
        );
    }
}
