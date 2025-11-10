import "server-only";

import {
    BanhMiSection,
    BanhMiToppings,
} from "@/components/menu/sections/BanhMiSection";
import {
    DrinksSection,
    DrinksToppings,
} from "@/components/menu/sections/DrinkSection";
import { CheSection } from "@/components/menu/sections/CheSection";
import SimpleTileSection from "@/components/menu/sections/SimpleTileSection";
import HouseSpecialSection from "@/components/menu/sections/HouseSpecial/HouseSpecialSection";

import { getMenu } from "@/lib/notion/menu";
import { groupByCategory, splitToppings } from "@/lib/menu/helpers";

import Link from "next/link";
import { BiMessageError } from "react-icons/bi";

export default async function MenuPage() {
    const items = await getMenu();
    const groups = groupByCategory(items);

    const banhMi = groups["Banh Mi"] ?? [];
    const sweetSoup = groups["Sweet Soup"] ?? [];
    const drinks = groups["Drinks"] ?? [];
    const toppings = groups["Toppings"] ?? [];
    const { banhMiToppings, drinksToppings } = splitToppings(toppings);
    const houseSpecial = groups["House Special"] ?? [];

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
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10 space-y-8 bg-cream">
            {/* Row 1: 2 columns on large screens; 1 on smaller screens */}
            <section className="grid gap-6 lg:grid-cols-2 h-full items-start">
                <div className="h-full flex flex-col">
                    <BanhMiSection items={banhMi} />
                    <BanhMiToppings items={banhMiToppings} />
                </div>
                <div className="h-full flex">
                    <CheSection items={sweetSoup} />
                </div>
            </section>

            {/* Row 2: 2 columns on large screens; 1 on smaller screens */}
            <section className="grid gap-6 lg:grid-cols-2">
                <div>
                    <DrinksSection items={drinks} />
                    <DrinksToppings items={drinksToppings} />
                </div>
                <div>
                    <HouseSpecialSection items={houseSpecial} />
                </div>
            </section>

            {/* Row 3: 2 columns on large screens; 1 on smaller screens */}
            <section className="grid gap-6 md:grid-cols-2">
                <div>
                    <SimpleTileSection
                        title="Combo"
                        items={groups["Combo"] ?? []}
                    />
                </div>
                <div>
                    <SimpleTileSection
                        title="Sticky Rice"
                        items={groups["Sticky Rice"] ?? []}
                    />
                </div>
            </section>

            {/* Row 4: 2 columns on large screens; 1 on smaller screens */}
            <section className="grid gap-6 md:grid-cols-2">
                <div>
                    <SimpleTileSection
                        title="Cake Box"
                        items={groups["Cake Box"] ?? []}
                    />
                </div>
                <div>
                    <SimpleTileSection
                        title="Sweets"
                        items={groups["Sweets"] ?? []}
                    />
                </div>
            </section>
        </main>
    );
}
