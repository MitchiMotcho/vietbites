import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import NoteBadge from "@/components/menu/NoteBadge";
import DietaryTags from "@/components/menu/DietaryTags";
import Price from "@/components/menu/MenuPrice";
import MenuSectionShell from "./MenuSectionShell";
import "@/app/menu/menu.css";

export function BanhMiSection({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;

    return (
        <MenuSectionShell
            title="BÁNH MÌ"
            frameClass="center-frame"
        >
            <div className="grid grid-cols-1 gap-5 py-4">
                {items.map((it) => (
                    <div key={it.id}>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-3 items-center"
                        >
                            <div className="relative">
                                <NoteBadge note={it.notes} />
                                <div className="relative w-full aspect-4/3 rounded-md overflow-hidden">
                                    {it.photo ? (
                                        <Image
                                            src={it.photo}
                                            alt={it.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 30vw"
                                            className="object-cover object-center rounded-md"
                                            priority
                                        />
                                    ) : (
                                        <div className="absolute inset-0 text-xs bg-clean flex items-center justify-center p-2 rounded-md border border-charcoal/10">
                                            <span className="text-center text-charcoal/60">
                                                Image coming soon...
                                            </span>
                                        </div>
                                    )}
                                </div>
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
                        </div>

                        {it.id !== items[items.length - 1]?.id && (
                            <hr className="w-full" />
                        )}
                    </div>
                ))}
            </div>
        </MenuSectionShell>
    );
}

export function BanhMiToppings({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;

    return (
        <MenuSectionShell
            title="BÁNH MÌ TOPPINGS"
            frameClass="left-frame"
        >
            <p className="text-xs xl:text-sm italic text-charcoal/70">
                Do you dislike any ingredient below? Let us know, we won&apos;t
                put it in!
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 py-2">
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
                        <span className="text-sm text-center text-orange font-semibold mb-3">
                            {it.name}
                        </span>
                    </div>
                ))}
            </div>
        </MenuSectionShell>
    );
}
