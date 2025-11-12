import type { TMenuItem } from "@/lib/schema";
import { HouseSpecialCard } from "./HouseSpecialCard";
import MenuSectionShell from "../MenuSectionShell";
import "@/app/menu/menu.css";

export default function HouseSpecialSection({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;

    const groupsMap = new Map<string, TMenuItem[]>();
    items.forEach((it) => {
        const key = it.name ?? "item";
        if (!groupsMap.has(key)) groupsMap.set(key, []);
        groupsMap.get(key)!.push(it);
    });
    const groups = Array.from(groupsMap.values());

    return (
        <MenuSectionShell
            title="HOUSE SPECIALS"
            frameClass="center-frame"
        >
            <div className="grid grid-cols-1 gap-5 py-4">
                {groups.map((g, i) => (
                    <div key={(g[0].name ?? "item") + "-" + i}>
                        <HouseSpecialCard group={g} />
                        {i !== groups.length - 1 && <hr className="w-full" />}
                    </div>
                ))}
            </div>
        </MenuSectionShell>
    );
}
