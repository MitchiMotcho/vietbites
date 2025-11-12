import NoteBadge from "@/components/menu/NoteBadge";
import Price from "@/components/menu/MenuPrice";
import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";

export function HouseSpecialCard({ group }: { group: TMenuItem[] }) {
    const item = group[0];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-3 justify-center items-center">
            <div className="relative flex items-center justify-center">
                {item.notes ? <NoteBadge note={item.notes} /> : null}
                <div className="relative w-full aspect-4/3 rounded-md overflow-hidden">
                    {item.photo ? (
                        <Image
                            src={item.photo}
                            alt={item.name ?? "photo"}
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
                <div className="flex justify-between w-full gap-3">
                    <div className="min-w-0">
                        <p className="font-heading font-semibold text-orange truncate">
                            {item.name}
                        </p>
                        {item.vietName ? (
                            <p className="text-sm italic text-orange truncate">
                                {item.vietName}
                            </p>
                        ) : null}
                        {item.tags?.length ? (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {item.tags.map((t: string, i: number) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="text-right shrink-0">
                        {group.length === 1 ? (
                            <p className="text-orange font-extrabold">
                                <Price value={item.price} />
                            </p>
                        ) : (
                            <div>
                                <div className="text-xs text-charcoal/70 font-semibold">
                                    Options
                                </div>
                                <ul className="list-none mt-1 space-y-1 text-orange">
                                    {group.map((elem, idx) => {
                                        const label = elem.description
                                            ?.split("/", 2)[0]
                                            ?.trim();
                                        return (
                                            <li
                                                key={idx}
                                                className="whitespace-nowrap text-sm flex items-center justify-end gap-2"
                                            >
                                                {label ? (
                                                    <span className="text-xs text-charcoal/70 font-semibold mr-1 truncate max-w-[12ch]">
                                                        {label}
                                                    </span>
                                                ) : null}
                                                <Price value={elem.price} />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {item.description ? (
                    <p className="mt-2 text-sm text-gray-700/70">
                        {item.description}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
