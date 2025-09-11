import "server-only";
import { getMenu } from "@/lib/notion/menu";
import { groupByCategory, splitToppings } from "@/lib/menu/helpers";
import { BanhMiSection, BanhMiToppings } from "@/components/menu/sections/BanhMiSection";
import { CheSection, CheToppings } from "@/components/menu/sections/CheSection";
import DrinksSection from "@/components/menu/sections/DrinksSection";
import SimpleTileSection from "@/components/menu/sections/SimpleTileSection";
export default async function MenuPage() {
    const items = await getMenu();
    const groups = groupByCategory(items);

    const banhMi = groups["Banh Mi"] ?? [];
    const sweetSoup = groups["Sweet Soup"] ?? [];
    const drinks = groups["Drinks"] ?? [];
    const toppings = groups["Toppings"] ?? [];
    const { banhMiToppings, cheToppings } = splitToppings(toppings);

    return (
        <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-10 space-y-8 bg-cream">
            {/* Row 1: 2 columns */}
            <section className="grid gap-6 lg:grid-cols-2">
                <div>
                    <BanhMiSection items={banhMi} />
                    <BanhMiToppings items={banhMiToppings} />
                </div>
                <div>
                    <CheSection items={sweetSoup} />
                    <CheToppings items={cheToppings} />
                </div>
            </section>

            {/* Row 2: 2 columns */}
            <section className="grid gap-6 lg:grid-cols-2">
                <div>
                    <DrinksSection items={drinks} />
                </div>
                <div>
                    <SimpleTileSection
                        title="House Special"
                        items={groups["House Special"] ?? []}
                    />
                </div>
            </section>

            {/* Row 3: 2 columns */}
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

            {/* Row 4: 2 columns */}
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
        </main>
    );
}
