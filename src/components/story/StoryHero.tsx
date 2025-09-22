import Link from "next/link";

export function StoryHero() {
    return (
        <section className="relative overflow-hidden rounded-2xl section-cream sm:mx-6 px-6 py-16 md:px-10 md:py-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-charcoal/10" />
            <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1.1fr_.9fr] items-center">
                <div>
                    <p className="mb-2 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                        Our Story
                    </p>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading leading-tight text-orange">
                        This is how we opened our first bánh mì & dessert shop
                        at 23.
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-charcoal/80 max-w-prose">
                        Hi, I&apos;m{" "}
                        <span className="font-semibold text-orange">Lily</span>{" "}
                        (VietBites founder). A few months ago, my partner and I
                        were still working in the restaurant industry,
                        surrounded by hustle, energy, and the love of food. Deep
                        down we kept dreaming about one thing:{" "}
                        <span className="text-orange font-semibold">
                            opening a place of our own
                        </span>
                        .
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/menu"
                            className="rounded-lg bg-orange text-clean px-5 py-3 font-semibold shadow transition hover:bg-orange-hover active:bg-orange-active"
                        >
                            Explore the Menu
                        </Link>
                        <Link
                            href="/location"
                            className="button-outline px-5 py-3 rounded-lg font-heading font-medium"
                        >
                            Visit Us
                        </Link>
                    </div>
                </div>
                <div className="relative mx-auto w-full max-w-md text-2xl md:text-3xl font-semibold text-center uppercase text-charcoal/50">
                    <p>Team image goes here...</p>
                </div>
            </div>
        </section>
    );
}
