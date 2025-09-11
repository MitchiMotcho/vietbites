import type { TMenuItem } from "@/lib/schema";

export type MenuGroups = Record<string, TMenuItem[]>;

export const ORDER = [
    "Banh Mi",
    "Sweet Soup",
    "Drinks",
    "House Special",
    "Cake Box",
    "Sweets",
    "Combo",
    "Sticky Rice",
    "Toppings",
];

export function groupByCategory(items: TMenuItem[]): MenuGroups {
    const groups: MenuGroups = {};
    for (const it of items) {
        const key =
            typeof it.category === "string" ? it.category : String(it.category);
        (groups[key] ||= []).push(it);
    }
    // sort inside groups by sortOrder then name
    for (const k of Object.keys(groups)) {
        groups[k].sort(
            (a, b) =>
                (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999) ||
                a.name.localeCompare(b.name)
        );
    }
    return groups;
}

/**
 * We need toppings separated for:
 * - Bánh mì toppings: things that belong beside the Bánh mì grid (no price displayed)
 * - Chè toppings: add-ons under the chè list (show tiny price if provided)
 *
 */
export function splitToppings(items: TMenuItem[]) {
    const bm: TMenuItem[] = [];
    const che: TMenuItem[] = [];
    for (const it of items) {
        const tagset = new Set((it.tags ?? []).map((t) => t.toLowerCase()));
        if (it.category === "Toppings") {
            if (tagset.has("banh mi".toLowerCase())) {
                bm.push(it);
            } else if (tagset.has("sweet soup".toLowerCase())) {
                che.push(it);
            }
        }
    }

    return {
        banhMiToppings: bm,
        cheToppings: che,
    };
}
