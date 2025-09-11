import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import NoteBadge from "@/components/menu/NoteBadge";
import DietaryTags from "@/components/menu/DietaryTags";
import Price from "@/components/menu/MenuPrice";

export default function SimpleTileSection({
    title,
    items,
}: {
    title: string;
    items: TMenuItem[];
}) {
    return (
        <div className="section-poster rounded-2xl bg-cream p-4 md:p-6 h-full">
            <h2 className="mb-3 text-center font-heading text-2xl md:text-3xl font-extrabold text-orange">
                {title.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="grid grid-cols-[88px_1fr] gap-3"
                    >
                        <div className="relative">
                            <NoteBadge note={it.notes} />
                            {it.photo ? (
                                <Image
                                    src={it.photo}
                                    alt={it.name}
                                    width={160}
                                    height={120}
                                    className="h-auto w-24 rounded-md object-cover ring-1 ring-charcoal/10 md:w-28"
                                    style={{ height: "auto" }}
                                />
                            ) : (
                                <div className="h-20 w-24 rounded-md bg-clean ring-1 ring-charcoal/10 md:w-28" />
                            )}
                        </div>
                        <div>
                            <p className="font-heading font-semibold">
                                {it.name}
                            </p>
                            <p className="text-sm text-charcoal/70 italic">
                                {it.vietName}
                            </p>
                            <p className="mt-1 text-orange font-extrabold">
                                <Price value={it.price} />
                            </p>
                            <DietaryTags item={it} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
