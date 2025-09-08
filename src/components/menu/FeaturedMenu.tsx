import Link from "next/link";
import { getMenu } from "@/lib/notion/menu";
import MenuCard from "./MenuCard";

function pickFeatured(
    items: Awaited<ReturnType<typeof getMenu>>,
    count: number
) {
    const highlight = items.filter((i) => i.notes === "HIGHLIGHT");
    const fresh = items.filter((i) => i.notes === "NEW");
    const rest = items.filter(
        (i) => i.notes !== "HIGHLIGHT" && i.notes !== "NEW"
    );
    return [...highlight, ...fresh, ...rest].slice(0, count);
}

export default function FeaturedMenu({
    menu,
}: {
    menu: Awaited<ReturnType<typeof getMenu>>;
}) {
    const featured = pickFeatured(menu, 4);

    return (
        <section id="menu" className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <h2 className="text-2xl font-bold font-heading">
                    Customer Favourites
                </h2>
                <Link
                    href="/menu"
                    className="inline-block rounded-lg bg-orange text-white px-4 py-2 text-sm font-semibold shadow hover:bg-orange-hover transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
                >
                    See full menu
                </Link>
            </div>

            {featured.length ? (
                <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((item) => (
                        <li key={item.id}>
                            <MenuCard
                                id={item.id}
                                name={item.name}
                                vietName={item.vietName}
                                description={item.description}
                                price={item.price}
                                photo={item.photo}
                                note={item.notes}
                                tags={item.tags}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-charcoal/70 mt-3">
                    Menu is being prepared—please check back soon.
                </p>
            )}
        </section>
    );
}
