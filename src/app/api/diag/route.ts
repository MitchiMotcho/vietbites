import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    NOTION_TOKEN: !!process.env.NOTION_TOKEN,
    MENU: !!process.env.NOTION_DB_MENU,
    OPENING: !!process.env.NOTION_DB_OPENING,
    ANNOUNCEMENTS: !!process.env.NOTION_DB_ANNOUNCEMENTS,
    PILLARS: !!process.env.NOTION_DB_PILLARS,
  });
}