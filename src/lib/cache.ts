import { unstable_cache as nextCache, revalidateTag } from "next/cache";

/**
 * Cache any async function result in Next/Vercel’s incremental cache.
 * - key: a stable cache key (include params in it)
 * - fn:  the async function to cache
 * - opts.revalidate: seconds to keep fresh (0 = no TTL, rely on tags)
 * - opts.tags: one or more tags so you can revalidate by tag later
 */
export function cached<TArgs extends any[], TReturn>(
    key: string | (string | number)[],
    fn: (...args: TArgs) => Promise<TReturn>,
    opts: { revalidate?: number; tags?: string[] } = {}
) {
    const keyParts = Array.isArray(key) ? key.map(String) : [String(key)];
    const { revalidate, tags } = opts;
    // Wrap the function with Next's cache
    const wrapped = nextCache(
        // The cached function (no args here)
        async (...args: TArgs) => fn(...(args as TArgs)),
        keyParts,
        { revalidate, tags }
    );
    // Return a function that forwards args to the cached function
    return (...args: TArgs) => wrapped(...(args as TArgs));
}

/**
 * Trigger a revalidation for anything cached with a matching tag.
 * Call from a route handler after content changes (webhook or manual).
 */
export async function revalidateByTag(tag: string) {
    // Next.js handles fan-out to all matching cached entries
    revalidateTag(tag);
}

/** Common tag helpers so you’re consistent everywhere */
export const tags = {
    menu: (category?: string) =>
        category ? [`menu`, `menu:category:${category}`] : [`menu`],
    hours: () => ["hours"],
    announcements: () => ["announcements"],
    pillars: () => ["pillars"],
};

/** Reasonable default TTLs (seconds). Adjust to your needs. */
export const ttl = {
    short: 60, // 1 min
    normal: 60 * 10, // 10 min
    long: 60 * 60, // 1 hr
};
