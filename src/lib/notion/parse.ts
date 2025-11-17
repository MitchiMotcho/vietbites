import type {
    PageObjectResponse,
    PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/** A Page from Notion that might be partial */
export type NotionPage = PageObjectResponse | PartialPageObjectResponse;

export function isFullPage(p: NotionPage): p is PageObjectResponse {
    return "properties" in p;
}

/* -------------------- Rich text → string -------------------- */
export function text(rt?: { plain_text: string }[] | string | null): string {
    return Array.isArray(rt) ? rt.map((t) => t.plain_text).join("") : rt ?? "";
}

/* -------------------- Property readers (type-safe) -------------------- */
export function getTitle(
    props: PageObjectResponse["properties"],
    key: string
): string | undefined {
    const prop = props[key];
    if (prop?.type === "title") return text(prop.title);
    return undefined;
}

export function getRichText(
    props: PageObjectResponse["properties"],
    key: string
): string | undefined {
    const prop = props[key];
    if (prop?.type === "rich_text") return text(prop.rich_text);
    return undefined;
}

export function getUrl(props: any, key: string): string | undefined {
    const prop = props?.[key];
    if (!prop) return undefined;

    // Native Notion URL property
    if (prop.type === "url") return prop.url || undefined;

    // Graceful fallback: if someone stored it as rich_text/title, try to read it
    if (prop.type === "rich_text") {
        const txt = (prop.rich_text || []).map((t: any) => t.plain_text).join("").trim();
        return txt || undefined;
    }
    if (prop.type === "title") {
        const txt = (prop.title || []).map((t: any) => t.plain_text).join("").trim();
        return txt || undefined;
    }

    return undefined;
}

export function getNumber(
    props: PageObjectResponse["properties"],
    key: string
): number | undefined {
    const prop = props[key];
    if (prop?.type === "number") return prop.number ?? undefined;
    return undefined;
}

export function getCheckbox(
    props: PageObjectResponse["properties"],
    key: string
): boolean | undefined {
    const prop = props[key];
    if (prop?.type === "checkbox") return prop.checkbox ?? undefined;
    return undefined;
}

export function getSelectName(
    props: PageObjectResponse["properties"],
    key: string
): string | undefined {
    const prop = props[key];
    if (prop?.type === "select") return prop.select?.name ?? undefined;
    return undefined;
}

export function getMultiSelectNames(
    props: PageObjectResponse["properties"],
    key: string
): string[] | undefined {
    const prop = props[key];
    if (prop?.type === "multi_select")
        return (prop.multi_select ?? []).map((t) => t.name);
    return undefined;
}

/* -------------------- Files → API Route -------------------- */
// Minimal structural type for Notion files (works across SDK versions)
type NotionFile =
    | { type: "file"; file: { url: string } }
    | { type: "external"; external: { url: string } };

// Call this API route to get a cached/rotating URL for Notion-hosted files
// Prevents 403 errors from expired signed URLs in the client
export function notionFileSrc(params: { pageId: string; prop?: string; i?: number; ttlMins?: number }) {
    const { pageId, prop = "Image", i = 0, ttlMins = 1 } = params;
    // cache-buster that changes every ttlMins minutes so the optimizer drops stale 403s
    const v = Math.floor(Date.now() / (ttlMins * 60_000));
    const qs = new URLSearchParams({ pageId, prop, i: String(i), v: String(v) });
    return `/api/notion-file?${qs.toString()}`;
}


/* -------------------- Paginated results shape -------------------- */
export type NotionList<T = NotionPage> = {
    results: T[];
    next_cursor: string | null;
};
