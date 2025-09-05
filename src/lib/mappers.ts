import type { PageObjectResponse } from "@notionhq/client";
import { MenuItem, TMenuItem } from "./schema";

/** Safely read plain text from title or rich text property **/
const text = (prop: any) =>
    Array.isArray(prop) && prop[0]?.plain_text ? prop[0].plain_text : undefined;

const fileUrl = (files: any[] | undefined) => {
    const f = files?.[0];
    if (!f) return undefined;
    if (f.type === "external") return f.external.url;
    if (f.type === "file") return f.file.url;
    return undefined;
};

/** Map Notion page to MenuItem **/
export function mapMenuItem(page: PageObjectResponse) {
    if (page.object !== "page") throw new Error("Not a page");

    const props: any = (page as any).properties;

    const item: TMenuItem = {
        id: page.id,
        name: text(props.Name?.title) || "Untitled",
        description: text(props.Description?.rich_text) || "No description",
        price: props.Price?.number ?? (text(props.Price) ? Number(text(props.Price)) : 0),
        category: text(props.Category?.select?.name) || "Uncategorized",
        photo: fileUrl(props.Photo?.files),
        notes: text(props.Notes?.select?.name) || undefined,
    };

    return MenuItem.parse(item); // Validate and return
};