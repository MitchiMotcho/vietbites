// components/menu/DrinkGridSection.tsx
import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import NoteBadge from "@/components/menu/NoteBadge";
import FrameSection from "@/components/common/FrameSection";

export default function DrinksGridSection({
    title = "DRINKS",
    items,
    frameClass = "center-frame",
}: {
    title?: string;
    items: TMenuItem[];
    frameClass?: "center-frame" | "left-frame" | "right-frame";
}) {
    if (!items?.length) return null;

    return (
        <FrameSection title={title} frameClass={frameClass}>
            <div className="grid gap-4 items-start mt-2 grid-cols-1 sm:grid-cols-2">
                {items.map((it) => (
                    <div key={it.id} className="w-full flex justify-center">
                        <div className="w-full max-w-[520px] flex flex-col items-center gap-2 text-orange">
                            <NoteBadge note={it.notes} />

                            {/* Consistent, bold image area */}
                            <div className="relative w-full aspect-4/3 rounded-md overflow-hidden">
                                {it.photo ? (
                                    <Image
                                        src={it.photo}
                                        alt={it.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-contain"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 rounded-md bg-clean flex items-center justify-center p-2 text-xs">
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
        </FrameSection>
    );
}
