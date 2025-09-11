import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import DietaryTags from "@/components/menu/DietaryTags";
import Image from "next/image";

export function CheSection({ items }: { items: TMenuItem[] }) {
    return (
        <div className="section-poster rounded-2xl bg-cream p-4 md:p-6 h-full">
            <h2 className="mb-3 text-center font-heading text-2xl md:text-3xl font-extrabold text-orange">
                CHÈ / SWEET SOUP
            </h2>
            <ol className="che-ol">
                {items.map((it, idx) => (
                    <li key={it.id}>
                        <div className="flex items-baseline gap-2">
                            <span className="no">{idx + 1}.</span>
                            <div>
                                <p className="font-heading font-semibold">
                                    {it.name}
                                </p>
                                <p className="text-xs text-charcoal/70 italic">
                                    {it.vietName}
                                </p>
                                <DietaryTags item={it} />
                            </div>
                        </div>
                        <div className="text-orange">
                            <Price value={it.price} />
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export function CheToppings({ items }: { items: TMenuItem[] }) {
    if (!items.length) return null;
    return (
        <div className="mt-4 flex items-center gap-4 rounded-xl bg-cream p-4 ring-1 ring-charcoal/10">
            <span className="rounded-full bg-orange px-3 py-1 text-xs font-heading font-bold text-clean">
                TOPPING
            </span>
            <div className="flex flex-wrap gap-4">
                {items.map((it) => (
                    <div key={it.id} className="flex items-center gap-2">
                        {it.photo ? (
                            <Image
                                src={it.photo}
                                alt={it.name}
                                width={36}
                                height={36}
                                className="h-9 w-9 rounded-full object-cover ring-1 ring-charcoal/10"
                                style={{ height: "auto" }}
                            />
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-clean ring-1 ring-charcoal/10" />
                        )}
                        <span className="text-sm">{it.name}</span>
                        {typeof it.price === "number" && (
                            <span className="text-xs text-charcoal/60">
                                · <Price value={it.price} />
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
