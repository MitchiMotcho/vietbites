import { NextResponse } from "next/server";
import { getMenu } from "@/lib/notion/menu";

export async function GET() {
    const data = await getMenu();
    return NextResponse.json(data);
}
