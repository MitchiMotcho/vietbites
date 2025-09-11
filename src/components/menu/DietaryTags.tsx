import type { TMenuItem } from "@/lib/schema";

export default function DietaryTags({ item }: { item: TMenuItem }) {
    if (
        (!item.description || item.description.trim() === "") &&
        !item.tags?.length
    )
        return null;
    return (
        <div className="mt-1 text-xs text-charcoal/60">
            {item.description && <p>{item.description}</p>}
            {!!item.tags?.length && (
                <p className="mt-1">
                    {item.tags.map((t) => (
                        <span
                            key={t}
                            className={`inline-flex items-center font-medium rounded-full border border-orange/80 bg-neutral-50 px-3 py-1 m-0.5 text-[10px] shadow-sm text-orange/80 cursor-default`}
                        >
                            {t}
                        </span>
                    ))}
                </p>
            )}
        </div>
    );
}
