import { getPillars } from "@/lib/notion/pillars";
import type { Pillar } from "@/lib/notion/pillars";

export default async function Pillars() {
    const pillars: Pillar[] = await getPillars();
    if (pillars.length === 0) return null;

    return (
        <section className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
            <header className="mb-8 text-center">
                <h2 className="inline-block text-2xl md:text-3xl font-heading font-bold text-orange">
                    Our Pillars
                </h2>
                <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-linear-to-r from-orange to-amber-400/80" />
                <p className="mt-3 text-base md:text-lg text-charcoal/80 max-w-2xl mx-auto">
                    The values that guide every bánh mì, dessert, and interaction.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-3" role="list">
                {pillars.map((p, i) => (
                    <article
                        key={p.title}
                        role="listitem"
                        tabIndex={0}
                        aria-label={`${p.title} — pillar ${i + 1}`}
                        className="group relative overflow-hidden rounded-2xl bg-cream ring-1 ring-charcoal/10 p-6 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:-translate-y-1 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange/30"
                    >
                        {/* top gradient accent */}
                        <span className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-orange to-amber-400/80" />

                        {/* subtle left stripe */}
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-orange/5" />

                        {/* number chip */}
                        <span className="inline-flex items-center justify-center rounded-full bg-orange/10 text-orange ring-1 ring-orange/20 w-8 h-8 md:w-9 md:h-9 text-sm font-bold">
                            <span className="sr-only">Pillar {i + 1}:</span>
                            {i + 1}
                        </span>

                        <h3 className="mt-3 pillar-heading font-heading text-lg md:text-xl font-bold text-orange flex items-center gap-3">
                            {p.title}
                            <span className="ml-auto hidden md:inline-block h-1 w-12 rounded bg-orange/40" />
                        </h3>

                        <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-charcoal/90 line-clamp-3">
                            {p.description}
                        </p>

                        {/* subtle hover flourish */}
                        <span className="pointer-events-none absolute -right-16 -bottom-16 hidden transform rotate-45 rounded-full bg-orange/5 blur-2xl transition-opacity duration-300 group-hover:block group-focus:block w-40 h-40" />
                    </article>
                ))}
            </div>
        </section>
    );
}
