import type { TMenuItem } from "@/lib/schema";
import Price from "@/components/menu/MenuPrice";
import DietaryTags from "@/components/menu/DietaryTags";
import Image from "next/image";

export function CheSection({ items }: { items: TMenuItem[] }) {
    return (
        <div className="frame-che bg-cream px-4 py-6 md:px-6 md:py-7">
            {" "}
            <h2 className="menu-heading mb-3 text-center font-heading text-3xl font-extrabold text-orange">
                CHÈ / SWEET SOUP
            </h2>
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
            <hr />
            <p className="my-4 text-center text-orange italic font-semibold w-3/4 mx-auto">
                A traditional Vietnamese sweet dessert soup made with
                ingredients like beans, coconut milk, tapioca, jellies and
                seasonal fruits. Served chilled or warm, it's a refreshing and
                colorful treat enjoyed year-round.
            </p>
        </div>
    );
}
