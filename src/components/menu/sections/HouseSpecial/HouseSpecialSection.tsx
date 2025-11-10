
import type { TMenuItem } from "@/lib/schema";
import { HouseSpecialCard } from "./HouseSpecialCard";
import "@/app/menu/menu.css";

export default function HouseSpecialSection({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;

    // Group items by name (preserve order)
    const groupsMap = new Map<string, TMenuItem[]>();
    items.forEach((it) => {
        const key = it.name ?? "item";
        if (!groupsMap.has(key)) groupsMap.set(key, []);
        groupsMap.get(key)!.push(it);
    });
    const groups = Array.from(groupsMap.values());

    return (
        <section className="frame-banhmi frame-sharp frame-center-gap bg-cream px-4 py-6 md:px-6 md:py-7">
            <h2 className="menu-heading mb-3 text-center font-heading text-3xl font-extrabold text-orange">
                House Specials
            </h2>

            <div className="grid grid-cols-1 gap-5">
                {groups.map((g, i) => (
                    <HouseSpecialCard key={(g[0].name ?? "item") + "-" + i} group={g} />
                ))}
            </div>
        </section>
    );
}
