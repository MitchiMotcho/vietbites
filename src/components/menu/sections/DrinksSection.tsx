import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import NoteBadge from "@/components/menu/NoteBadge";
import DietaryTags from "@/components/menu/DietaryTags";
import Price from "@/components/menu/MenuPrice";

export default function DrinksSection({ items }: { items: TMenuItem[] }) {
    return (
        <div className="section-poster rounded-2xl bg-cream p-4 md:p-6 h-full">
            <h2 className="mb-3 text-center font-heading text-2xl md:text-3xl font-extrabold text-orange">
                DRINK
            </h2>
            <div className="flex flex-wrap items-end gap-6">
                {items.map((it) => (
                    <div key={it.id} className="w-[120px]">
                        <div className="relative mx-auto mb-2 h-24 w-24 overflow-hidden rounded-lg ring-1 ring-charcoal/10">
                            <NoteBadge note={it.notes} />
                            {it.photo ? (
                                <Image
                                    src={it.photo}
                                    alt={it.name}
                                    width={120}
                                    height={120}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-clean" />
                            )}
                        </div>
                        <p className="text-center text-sm font-heading">
                            {it.name}
                        </p>
                        <p className="text-center text-xs text-charcoal/70">
                            {it.vietName}
                        </p>
                        <p className="mt-1 text-center font-semibold text-orange">
                            <Price value={it.price} />
                        </p>
                        <DietaryTags item={it} />
                    </div>
                ))}
            </div>
        </div>
    );
}
