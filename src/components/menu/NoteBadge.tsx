import type { MenuItem } from "@/lib/notion/menu";

export default function NoteBadge({ note }: { note?: MenuItem["notes"] }) {
    if (!note) return null;
    return (
        <span className="absolute -top-2 -left-2 rounded-full bg-orange px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-clean shadow z-10">
            {String(note)}
        </span>
    );
}
