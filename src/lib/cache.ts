import { unstable_cache as nextCache, revalidateTag } from "next/cache";

/**
 * Cache any async function result in Next/Vercel’s incremental cache.
 */
export function cached<TArgs extends unknown[], TReturn>(
    key: string | (string | number)[],
    fn: (...args: TArgs) => Promise<TReturn>,
    opts: { revalidate?: number; tags?: string[] } = {}
) {
    const keyParts = Array.isArray(key) ? key.map(String) : [String(key)];
    const { revalidate, tags } = opts;

    const wrapped = nextCache(async (...args: TArgs) => fn(...args), keyParts, {
        revalidate,
        tags,
    });

    return (...args: TArgs) => wrapped(...args);
}

/** Trigger a revalidation for anything cached with a matching tag. */
export async function revalidateByTag(tag: string) {
    revalidateTag(tag);
}

export const tags = {
    menu: (category?: string) =>
        category ? ["menu", `menu:category:${category}`] : ["menu"],
    hours: () => ["hours"],
    announcements: () => ["announcements"],
    pillars: () => ["pillars"],
    platforms: () => ["platforms"],
};

export const ttl = {
    short: 60,
    normal: 60 * 10,
    long: 60 * 60,
};
