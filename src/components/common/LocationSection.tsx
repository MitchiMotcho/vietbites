import Link from "next/link";
import Image from "next/image";

export default function LocationSection() {
    return (
        <section className="mt-12 mx-4 sm:mx-0 rounded-2xl section-cream px-6 py-10 md:px-12 md:py-14 relative overflow-hidden">
            {/* soft background accent */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/10 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-green/10 blur-2xl"
            />

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
                {/* Text block */}
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-[11px] font-semibold text-orange ring-1 ring-orange/20">
                        Toronto • Gerrard St E
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-heading">
                        Come Visit Us on Gerrard St East
                    </h2>

                    <p className="text-charcoal/80 text-sm md:text-base leading-relaxed max-w-prose">
                        <span className="text-orange font-semibold">
                            VietBites
                        </span>{" "}
                        is located at{" "}
                        <span className="font-semibold">
                            {process.env.NEXT_PUBLIC_VIETBITES_LOCATION}
                        </span>
                        , steps from downtown. Come by for bánh mì, desserts,
                        and a little taste of Vietnam!
                    </p>

                    {/* subtle divider */}
                    <hr className="my-2" />

                    {/* CTA group */}
                    <div className="flex flex-col items-start gap-4 pt-2">
                        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:gap-4">
                            <Link
                                href="/visit"
                                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange px-5 py-3 font-semibold text-clean shadow transition duration-200 hover:bg-orange-hover active:scale-[.98] active:bg-orange-active"
                            >
                                Visit Us
                            </Link>
                            <Link
                                href="/menu"
                                className="button-outline inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-center font-heading font-medium"
                            >
                                View Menu
                            </Link>
                        </div>

                        <Link
                            href="/story"
                            className="group inline-flex items-center gap-2 rounded-sm py-1 text-sm font-semibold text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange md:text-base"
                        >
                            <span className="underline decoration-orange/35 underline-offset-4 transition-colors group-hover:decoration-orange">
                                Learn more about our story
                            </span>
                            <span
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Image block (no width/height warning: fill + aspect) */}
                <div className="flex justify-center md:justify-end">
                    <div className="relative w-full max-w-130 lg:max-w-90 aspect-3/4 overflow-hidden rounded-xl shadow-sm ring-1 ring-charcoal/10">
                        <Image
                            src="/images/StoreFront.webp"
                            alt="VietBites Storefront"
                            fill
                            sizes="(max-width: 1024px) 100vw, 360px"
                            className="object-cover"
                            priority
                        />
                        {/* subtle gradient for polish */}
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/5 via-transparent to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
