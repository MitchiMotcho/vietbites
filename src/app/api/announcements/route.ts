import { NextResponse } from "next/server";
import { getAnnouncements } from "@/lib/notion/announcements";

export async function GET() {
    const data = await getAnnouncements();
    return NextResponse.json(data);
}
