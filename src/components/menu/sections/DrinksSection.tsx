import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import NoteBadge from "@/components/menu/NoteBadge";

export function DrinksSection({ items }: { items: TMenuItem[] }) {
    return (
        <div className="bg-cream frame-drink frame-sharp frame-center-gap">
            <div className="px-4 py-6 md:px-6 md:py-7 ">
                <h2 className="menu-heading mb-3 text-center font-heading text-3xl font-extrabold text-orange">
                    DRINK
                </h2>
                <div
                    className="grid gap-6 items-start mt-8"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(40%, 1fr))" }}
                >
                    {items.map((it) => (
                        <div key={it.id} className="w-full flex justify-center">
                            <div className="w-full max-w-[520px] flex flex-col items-center gap-3 text-orange">
                                <NoteBadge note={it.notes} />
                                {it.photo ? (
                                    <Image
                                        src={it.photo}
                                        alt={it.name}
                                        width={800}
                                        height={600}
                                        sizes="(max-width: 640px) 90vw, 45vw"
                                        className="w-full rounded-md object-cover"
                                        style={{ height: "auto" }}
                                    />
                                ) : (
                                    <div className="w-full h-48 rounded-md bg-clean flex items-center justify-center p-2 text-xs">
                                        <span className="text-center text-charcoal/60">
                                            Image coming soon...
                                        </span>
                                    </div>
                                )}
                                <p className="font-heading font-semibold text-orange text-center">
                                    {it.name}
                                </p>
                                <p className="text-xs text-orange italic text-center">
                                    {it.vietName}
                                </p>
                                <Price value={it.price} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function DrinksToppings({ items }: { items: TMenuItem[] }) {
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
