import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import DietaryTags from "@/components/menu/DietaryTags";
import MenuSectionShell from "./MenuSectionShell";

export function CheSection({ items }: { items: TMenuItem[] }) {
    if (!items?.length) return null;

    return (
        <MenuSectionShell
            title="CHÈ / SWEET SOUP"
            frameClass="center-frame"
        >
            <div className="p-8">
                <p className="mb-2 mt-2 text-center text-orange italic font-semibold w-3/4 mx-auto">
                    A traditional Vietnamese sweet dessert soup made with
                    ingredients like beans, coconut milk, tapioca, jellies and
                    seasonal fruits. Served chilled or warm, it&apos;s a
                    refreshing and colorful treat enjoyed year-round.
                </p>

                <hr className="my-2" />

                <ol className="che-ol">
                    {items.map((it, idx) => (
                        <li key={it.id}>
                            <div className="flex items-baseline gap-2">
                                <span className="no">{idx + 1}.</span>
                                <div>
                                    <p className="font-heading font-semibold text-orange">
                                        {it.name}
                                    </p>
                                    <p className="text-xs text-orange italic">
                                        {it.vietName}
                                    </p>
                                    <DietaryTags item={it} />
                                </div>
                            </div>
                            <div className="text-orange">
                                <Price value={it.price} />
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="mt-5 lg:-mb-0.5 w-full overflow-hidden">
                <Image
                    src="/images/food/FoodCollage.png"
                    alt="Che Section"
                    width={1200}
                    height={400}
                    className="w-full lg:w-[99%] h-auto object-cover block lg:bottom-0.5 lg:right-0.5 lg:absolute"
                />
            </div>
        </MenuSectionShell>
    );
}
