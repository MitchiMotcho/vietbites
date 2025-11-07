import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import NoteBadge from "@/components/menu/NoteBadge";

export function DrinksSection({ items }: { items: TMenuItem[] }) {
    return (
        <div className="bg-cream frame-drink frame-sharp frame-center-gap px-4 py-6 md:px-6 md:py-7 relative">
            <h2 className="menu-heading absolute left-1/2 -translate-x-1/2 -top-1 z-10 bg-cream px-3 font-heading text-3xl font-extrabold text-orange">
                DRINK
            </h2>
            <div
                className="grid gap-x-2 gap-y-4 items-start mt-6"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(40%, 1fr))",
                }}
            >
                {items.map((it) => (
                    <div key={it.id} className="w-full flex justify-center">
                        <div className="w-full max-w-[520px] flex flex-col items-center gap-1 text-orange">
                            <NoteBadge note={it.notes} />
                            {it.photo ? (
                                <Image
                                    src={it.photo}
                                    alt={it.name}
                                    width={800}
                                    height={600}
                                    className="w-auto h-42 md:h-58 rounded-md object-cover"
                                    style={{ width: "auto" }}
                                />
                            ) : (
                                <div className="w-full h-48 rounded-md bg-clean flex items-center justify-center p-2 mb-2 text-xs">
                                    <span className="text-center text-charcoal/60">
                                        Image coming soon...
                                    </span>
                                </div>
                            )}
                            <p className="font-heading font-semibold text-orange text-sm md:text-base text-center">
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
    );
}

export function DrinksToppings({ items }: { items: TMenuItem[] }) {
    if (!items.length) return null;
    return (
        <div className="rounded-xl bg-cream frame-drink-toppings frame-sharp frame-left-gap mt-2">
            <div className="flex flex-col items-start gap-1">
                <p className="font-heading text-orange font-extrabold text-xl">
                    DRINK TOPPINGS
                </p>
                <p className="text-xs xl:text-sm italic text-charcoal/70">
                    Add any of these toppings to your drink!
                </p>
            </div>

            <div className="flex flex-col items-start gap-4 py-4 px-4 md:items-start md:justify-start lg:px-0 lg:flex-row lg:flex-wrap lg:gap-10 xl:justify-evenly">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="w-full lg:w-auto flex flex-row items-center gap-4"
                    >
                        {it.photo ? (
                            <div className="flex-shrink-0">
                                <Image
                                    src={it.photo}
                                    alt={it.name}
                                    width={80}
                                    height={80}
                                    className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover ring-1 ring-charcoal/10"
                                />
                            </div>
                        ) : (
                            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-clean flex items-center justify-center p-2 text-gray-400 text-xs ring-charcoal/10 ring-1 flex-shrink-0">
                                Soon...
                            </div>
                        )}

                        <div className="grid grid-cols-[80%_20%] w-full lg:min-w-[30vw] items-baseline justify-between gap-x-6 px-4 xl:flex xl:min-w-0 xl:px-0">
                            <span className="text-sm md:text-base font-medium font-heading text-orange leading-none">
                                {it.name}
                            </span>

                            {typeof it.price === "number" && (
                                <span className="text-sm text-orange font-semibold leading-none">
                                    <Price value={it.price} />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
