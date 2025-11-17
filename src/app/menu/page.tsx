import "server-only";
import Image from "next/image";
import Link from "next/link";

import ToppingsSection from "@/components/menu/ToppingSection";
import MenuListSection from "@/components/menu/MenuListSection";
import DrinksGridSection from "@/components/menu/DrinkGridSection";

import { getMenu } from "@/lib/notion/menu";
import { groupByCategory, splitToppings } from "@/lib/menu/helpers";

import { BiMessageError } from "react-icons/bi";
import SectionHeader from "@/components/common/SectionHeader";

import { getPlatforms } from "@/lib/notion/platforms";
import type { Platform } from "@/lib/notion/platforms";
import Platforms from "@/components/common/Platforms";

export default async function MenuPage() {
    const items = await getMenu();
    const groups = groupByCategory(items);

    const banhMi = groups["Banh Mi"] ?? [];
    const sweetSoup = groups["Sweet Soup"] ?? [];
    const drinks = groups["Drinks"] ?? [];
    const toppings = groups["Toppings"] ?? [];
    const { banhMiToppings, drinksToppings } = splitToppings(toppings);
    const houseSpecial = groups["House Special"] ?? [];
    const combo = groups["Combo"] ?? [];

    const allPlatforms: Platform[] = await getPlatforms();
    const platforms = allPlatforms.filter(
        (p) =>
            p.name === "DoorDash" ||
            p.name === "UberEats"
    );

    if (
        !banhMi.length ||
        !sweetSoup.length ||
        !drinks.length ||
        !houseSpecial.length
    ) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10 text-center h-[60vh] flex flex-col items-center justify-center gap-4">
                <BiMessageError className="text-9xl text-orange mx-auto" />
                <p className="text-charcoal/70 lg:text-lg">
                    Our menu is currently under maintenance. Please check back
                    later!
                    <br /> If issue persists, please contact us at{" "}
                    <Link href="/contact">our contact page</Link>.
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-7xl bg-cream">
            <section className="mx-auto px-4 md:px-6 lg:px-8 pb-10 pt-3 rounded-lg section-cream space-y-8">
                <SectionHeader
                    title="OUR MENU"
                    subtitle="From traditional Vietnamese Bánh Mì to delightful Sweet Soups and refreshing Drinks, explore our diverse menu crafted to satisfy your cravings."
                />
                <Platforms items={platforms} variant="full" align="center"/>
                <section className="grid gap-6 xl:grid-cols-2 h-full items-start">
                    <div className="h-full flex flex-col">
                        <MenuListSection
                            title="BÁNH MÌ"
                            items={banhMi}
                            frameClass="center-frame"
                            groupByName={true}
                            showOptions={true}
                        />
                        <ToppingsSection
                            title="BÁNH MÌ TOPPINGS"
                            items={banhMiToppings}
                            variant="banhmi"
                            frameClass="left-frame"
                        />
                    </div>
                    <div className="h-full flex">
                        <MenuListSection
                            title="HOUSE SPECIALS"
                            items={houseSpecial}
                            frameClass="center-frame"
                            groupByName={true}
                            showOptions={true}
                            extraTopPlacement="span"
                            extraTop={
                                <p className="py-4">
                                    Signature selections crafted in-house to
                                    showcase a harmonious blend of traditional
                                    flavors and simple, familiar ingredients.
                                </p>
                            }
                            extraBottom={
                                <>
                                    <hr className="w-full" />
                                    <figure className="w-full mt-8">
                                        <div className="relative w-full aspect-video overflow-hidden rounded-none">
                                            <Image
                                                src="/images/menu/banh-mi-que.jpeg"
                                                alt="House Specials — Bánh Mì Quê"
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                        <figcaption className="my-4 text-[11px] text-center text-charcoal/70 italic">
                                            *Bánh Mì Que: Mini baguette with
                                            Pate filling, crafted in-house.
                                        </figcaption>
                                    </figure>
                                </>
                            }
                        />
                    </div>
                </section>

                <section className="w-full">
                    <div className="h-full flex">
                        <MenuListSection
                            title="CHÈ / SWEET SOUP"
                            items={sweetSoup}
                            frameClass="center-frame"
                            groupByName={true}
                            showOptions={true}
                            splitThreshold={6}
                            extraTopPlacement="span"
                            extraTop={
                                <>
                                    <p className="py-4">
                                        A traditional Vietnamese sweet dessert
                                        soup made with ingredients like beans,
                                        coconut milk, tapioca, jellies and
                                        seasonal fruits. Served chilled or warm,
                                        it&apos;s a refreshing and colorful
                                        treat enjoyed year-round.
                                    </p>
                                </>
                            }
                        />
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2 h-full items-start">
                    <div className="h-full flex flex-col">
                        <DrinksGridSection
                            items={drinks}
                            frameClass="center-frame"
                        />
                        <ToppingsSection
                            title="DRINK TOPPINGS"
                            items={drinksToppings}
                            variant="drinks"
                            frameClass="left-frame"
                        />
                    </div>
                    <div className="h-full flex">
                        <MenuListSection
                            title="COMBO MEALS"
                            items={combo}
                            frameClass="center-frame"
                            groupByName={true}
                            showOptions={true}
                            extraTopPlacement="span"
                            extraTop={
                                <p className="py-4">
                                    Bundle your favorites and save! Choose any
                                    of the options below for a perfect meal
                                    combination.
                                </p>
                            }
                        />
                    </div>
                </section>
            </section>
        </main>
    );
}
