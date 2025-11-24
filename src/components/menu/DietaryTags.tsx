import type { MenuItem } from "@/lib/notion/menu";

export default function DietaryTags({ item, description }: { item: MenuItem; description?: string }) {
    if (
        (!item.description || item.description.trim() === "") &&
        !item.tags?.length
    )
        return null;
    if (item.notes?.toLowerCase().includes("coming soon")) return null;
    return (
        <div className="mt-1 text-xs text-charcoal/70">
            {description ? <p>{description}</p> : item.description ? <p>{item.description}</p> : null}
            {!!item.tags?.length && (
                <p className="mt-1">
                    {item.tags.map((t) => (
                        <span
                            key={t}
                            className={`inline-flex items-center font-semibold rounded-full border border-orange/80 bg-neutral-50 px-3 py-1 m-0.5 text-[10px] shadow-sm text-orange/80 cursor-default`}
                        >
                            {t}
                        </span>
                    ))}
                </p>
            )}
        </div>
    );
}
