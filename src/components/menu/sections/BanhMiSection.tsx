import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import NoteBadge from "@/components/menu/NoteBadge";
import DietaryTags from "@/components/menu/DietaryTags";
import Price from "@/components/menu/MenuPrice";
import "@/app/menu/menu.css";

export function BanhMiSection({ items }: { items: TMenuItem[] }) {
    return (
        <div className="frame-menu bg-cream px-4 py-6 md:px-6 md:py-7">
            <h2 className="menu-heading mb-3 text-center font-heading text-3xl font-extrabold text-orange">
                BÁNH MÌ
            </h2>
            <div className="grid grid-cols-1 gap-5">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="grid sm:grid-cols-[30%_70%] grid-cols-1 gap-3"
                    >
                        <div className="relative w-3/4 mx-auto sm:w-full h-32 sm:h-32">
                            <NoteBadge note={it.notes} />
                            {it.photo ? (
                                <Image
                                    src={it.photo}
                                    alt={it.name}
                                    fill
                                    sizes="(max-width: 640px) 75vw, 30vw"
                                    className="rounded-md object-cover"
                                    priority
                                />
                            ) : (
                                <div className="h-full w-full text-xs rounded-md bg-clean flex items-center justify-center p-2">
                                    <span className="text-center text-charcoal/60">
                                        Image coming soon...
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex justify-between w-full">
                                <div>
                                    <p className="font-heading font-semibold text-orange">
                                        {it.name}
                                    </p>
                                    <p className="text-sm italic text-orange">
                                        {it.vietName}
                                    </p>
                                </div>
                                <p className="text-orange font-extrabold">
                                    <Price value={it.price} />
                                </p>
                            </div>
                            <DietaryTags item={it} />
                        </div>
                        <hr className="sm:hidden" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function BanhMiToppings({ items }: { items: TMenuItem[] }) {
    if (!items.length) return null;
    return (
        <div className="rounded-xl bg-cream frame-toppings">
            <div className="flex flex-col items-start gap-1">
                <p className="font-heading text-orange font-extrabold text-xl">
                    TOPPINGS
                </p>
                <p className="text-xs xl:text-sm italic text-charcoal/70">
                    Do you dislike any ingredient below? Let us know, we won&apos;t put it in!
                </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="flex flex-col items-center justify-center gap-2"
                    >
                        {it.photo ? (
                            <Image
                                src={it.photo}
                                alt={it.name}
                                width={100}
                                height={100}
                                className="h-auto w-20 rounded-full object-cover ring-1 ring-charcoal/10"
                                style={{ height: "auto" }}
                            />
                        ) : (
                            <div className="h-20 w-20 rounded-full bg-clean ring-1 ring-charcoal/10">
                                <span className="flex h-full w-full items-center justify-center text-center text-xs text-charcoal/60 p-2">
                                    Coming soon...
                                </span>
                            </div>
                        )}
                        <span className="text-sm text-center text-orange font-semibold">
                            {it.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
