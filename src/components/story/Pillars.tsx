import { getPillars } from "@/lib/notion/pillars";
import type { Pillar } from "@/lib/notion/pillars";

export default async function Pillars() {
    const pillars: Pillar[] = await getPillars();

    if (pillars.length === 0) return null;

    return (
        <section className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
            <header className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-orange">
                    Our Pillars
                </h2>
                <p className="mt-2 text-base md:text-lg text-charcoal/80">
                    Our values shape every bánh mì, dessert, and interaction.
                </p>
            </header>
            <div className="grid gap-8 md:grid-cols-3">
                {pillars.map((pillar) => (
                    <div
                        key={pillar.title}
                        className="rounded-lg border border-charcoal/10 bg-cream p-6 shadow-sm transition hover:shadow-md"
                    >
                        <h3 className="pillar-heading font-heading text-lg font-bold text-orange">
                            {pillar.title}
                        </h3>
                        <p className="mt-3 text-sm text-charcoal">
                            {pillar.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
