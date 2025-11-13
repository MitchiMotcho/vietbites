import Image from "next/image";
import Price from "@/components/menu/MenuPrice";
import DietaryTags from "@/components/menu/DietaryTags";
import type { TMenuItem } from "@/lib/schema";

export default function MenuItem({
    group,
    showOptions = true,
}: {
    group: TMenuItem[];
    showOptions?: boolean;
}) {
    const item = group[0];
    const hasOptions = showOptions && group.length > 1;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-3 items-center">
            {/* Image */}
            <div className="relative">
                <div className="relative w-full aspect-4/3 rounded-md overflow-hidden">
                    {item.photo ? (
                        <Image
                            src={item.photo}
                            alt={item.name ?? "photo"}
                            fill
                            sizes="(max-width: 640px) 100vw, 30vw"
                            className="object-contain object-center rounded-md"
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

            {/* Content area:
                - hasOptions:   mobile = 1 column (right block stacks below), sm+ = [1fr | auto]
                - no options:   always [1fr | auto] so price stays on the right on all sizes */}
            <div
                className={[
                    "w-full grid gap-2 sm:gap-3",
                    hasOptions
                        ? "grid-cols-1 sm:grid-cols-[1fr_auto]"
                        : "grid-cols-[1fr_auto]",
                ].join(" ")}
            >
                {/* Left block: name + viet name + tags */}
                <div className="min-w-0">
                    <p className="font-heading font-semibold text-orange">
                        {item.name}
                    </p>
                    {item.vietName ? (
                        <p className="text-sm italic text-orange">
                            {item.vietName}
                        </p>
                    ) : null}
                    <DietaryTags item={item} />
                    {/* description intentionally not rendered to match your style */}
                </div>

                {/* Right block: price or options */}
                <div
                    className={[
                        "sm:text-right",
                        hasOptions ? "" : "justify-self-end",
                    ].join(" ")}
                >
                    {!hasOptions ? (
                        // No options: keep price on the right on all sizes
                        <p className="text-orange font-extrabold">
                            <Price value={item.price} />
                        </p>
                    ) : (
                        // Has options: show stacked list (below on mobile, right on sm+)
                        <div>
                            <div className="text-xs text-charcoal/70 font-semibold">
                                Options
                            </div>
                            <ul className="list-none mt-1 space-y-1 text-orange">
                                {group.map((elem, i) => {
                                    const label = elem.description
                                        ?.split("/", 2)[0]
                                        ?.trim();
                                    return (
                                        <li
                                            key={i}
                                            className="text-sm grid grid-cols-[1fr_auto] items-center gap-2 whitespace-nowrap"
                                        >
                                            <span className="text-xs text-charcoal/70 font-semibold truncate text-left">
                                                {label}
                                            </span>
                                            <span className="text-right">
                                                {label?.startsWith("Add") &&
                                                    "+"}
                                                <Price value={elem.price} />
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
