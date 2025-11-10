import NoteBadge from "@/components/menu/NoteBadge";
import Price from "@/components/menu/MenuPrice";
import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";

export function HouseSpecialCard({ group }: { group: TMenuItem[] }) {
    const item = group[0];

    return (
        <div className="grid sm:grid-cols-[30%_70%] grid-cols-1 gap-3">
            <div className="relative w-3/4 mx-auto sm:w-full h-32 sm:h-32">
                {item.notes ? <NoteBadge note={item.notes} /> : null}
                {item.photo ? (
                    <Image
                        src={item.photo}
                        alt={item.name ?? "photo"}
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
                    <div className="min-w-0">
                        <p className="font-heading font-semibold text-orange truncate">
                            {item.name}
                        </p>
                        {item.vietName ? (
                            <p className="text-sm italic text-orange truncate">
                                {item.vietName}
                            </p>
                        ) : null}
                        {/* tags (dietary / chips) */}
                        {item.tags?.length ? (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {item.tags.map((t: any, i: number) => (
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

                    <div className="text-right ml-2">
                        {group.length === 1 ? (
                            <p className="text-orange font-extrabold">
                                <Price value={item.price} />
                            </p>
                        ) : (
                            <div className="text-right ml-2">
                                <div className="text-xs text-charcoal/70 font-semibold">
                                    Options
                                </div>
                                <ul className="list-none mt-1 space-y-1 text-orange">
                                    {group.map((elem, idx) => (
                                        <li
                                            key={idx}
                                            className="whitespace-nowrap text-sm flex items-center justify-end gap-2"
                                        >
                                            {elem.description &&
                                            elem.description.split(
                                                "/",
                                                2
                                            )[0] ? (
                                                <span className="text-xs text-charcoal/70 font-semibold mr-1 truncate">
                                                    {
                                                        elem.description.split(
                                                            "/",
                                                            2
                                                        )[0]
                                                    }
                                                </span>
                                            ) : null}
                                            <Price value={elem.price} />
                                        </li>
                                    ))}
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

            <hr className="sm:hidden" />
        </div>
    );
}
