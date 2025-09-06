import { NextResponse } from "next/server";
import { getHours } from "@/lib/notion/hours";

export async function GET() {
    const data = await getHours();
    return NextResponse.json(data);
}
