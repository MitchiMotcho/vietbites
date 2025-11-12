import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import NoteBadge from "@/components/menu/NoteBadge";
import MenuSectionShell from "./MenuSectionShell";

export function DrinksSection({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;

    return (
        <MenuSectionShell
            title="DRINKS"
            frameClass="center-frame"
        >
            <div className="grid gap-4 items-start mt-2 grid-cols-1 sm:grid-cols-2">
                {items.map((it) => (
                    <div key={it.id} className="w-full flex justify-center">
                        <div className="w-full max-w-[520px] flex flex-col items-center gap-2 text-orange">
                            <NoteBadge note={it.notes} />
                            <div className="relative w-full max-w-[520px] rounded-md overflow-hidden flex items-center justify-center">
                                {it.photo ? (
                                    <Image
                                        src={it.photo}
                                        alt={it.name}
                                        width={800}
                                        height={600}
                                        className="max-h-48 md:max-h-64 w-auto object-contain mx-auto"
                                    />
                                ) : (
                                    <div className="w-full py-6 rounded-md bg-clean flex items-center justify-center p-2 text-xs">
                                        <span className="text-center text-charcoal/60">
                                            Image coming soon...
                                        </span>
                                    </div>
                                )}
                            </div>
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
        </MenuSectionShell>
    );
}

export function DrinksToppings({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;
    return (
        <MenuSectionShell
            title="DRINK TOPPINGS"
            frameClass="left-frame"
        >
            <p className="text-xs xl:text-sm italic text-charcoal/70">
                Add any of these toppings to your drink!
            </p>

            <div className="flex flex-col gap-4 py-4 px-2 lg:px-0 lg:flex-row lg:flex-wrap lg:gap-10 xl:justify-evenly">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="w-full lg:w-auto flex flex-row items-center gap-4"
                    >
                        {it.photo ? (
                            <div className="shrink-0">
                                <Image
                                    src={it.photo}
                                    alt={it.name}
                                    width={80}
                                    height={80}
                                    className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover ring-1 ring-charcoal/10"
                                />
                            </div>
                        ) : (
                            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-clean flex items-center justify-center p-2 text-gray-400 text-xs ring-charcoal/10 ring-1 shrink-0">
                                Soon...
                            </div>
                        )}

                        <div className="grid grid-cols-[1fr_auto] w-full lg:min-w-[30vw] items-baseline gap-x-6 px-2 xl:flex xl:min-w-0 xl:px-0">
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
                <hr className="w-full lg:hidden" />
                <div className="w-full lg:w-auto flex items-center justify-center px-2">
                    <p className="text-xs xl:text-sm italic text-charcoal/70 text-center">
                        Brighten your drink with our toppings. Mix and match to create your perfect sip, ask your server for recommendations and current availability.
                    </p>
                </div>
            </div>
        </MenuSectionShell>
    );
}
