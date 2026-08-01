import Image from "next/image";
import Link from "next/link";
import "./Hero.css";
import OpenToday from "./OpenToday";
import { getHours } from "@/lib/notion/hours";

export default async function Hero({
    hours,
}: {
    hours: Awaited<ReturnType<typeof getHours>>;
}) {
    return (
        <section
            id="hero"
            data-reveal="hero"
            className="frame-clipped overflow-hidden rounded-2xl bg-cream px-8 py-16 
             min-h-150 md:min-h-175 md:px-16 md:py-24 lg:min-h-0 lg:py-14"
        >
            <div className="relative z-10 grid items-center gap-10 md:gap-14 lg:grid-cols-[1.2fr_.8fr]">
                <div>
                    <p className="mb-2 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                        VietBites • Toronto
                    </p>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
                        Welcome to{" "}
                        <span className="text-orange">VIETBITES</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold font-heading leading-snug text-charcoal/80">
                        A Taste of Vietnam in Toronto
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-charcoal/80 max-w-prose">
                        Discover the vibrant flavors and rich culinary
                        traditions of Vietnam. At VietBites, we bring you the
                        essence of Hải Phòng&apos;s bustling streets with our
                        authentic <em>bánh mì</em> and Vietnamese desserts.
                        Crafted with care, meant to be savored.
                    </p>

                    {/* Today's hours */}
                    <div className="mt-4 text-sm text-charcoal/80">
                        <OpenToday hours={hours} />
                    </div>

                    <div className="mt-4 mx-auto flex w-3/4 flex-col gap-3 sm:mx-0 sm:w-full sm:flex-row sm:gap-4">
                        <Link
                            href="/menu"
                            className="text-center rounded-lg bg-orange text-clean px-5 py-3 font-semibold shadow transition duration-200 hover:bg-orange-hover active:bg-orange-active active:scale-[.98]"
                        >
                            View Menu
                        </Link>
                        <a
                            href="https://vietbites.pikapoint.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center rounded-lg bg-charcoal text-clean px-5 py-3 font-semibold shadow transition duration-200 hover:bg-charcoal/95 active:bg-charcoal-active active:scale-[.98]"
                        >
                            Order Now
                        </a>
                    </div>

                    {/* Desktop-only decoration stays in the text column so it
                        cannot overlap the poster in the adjacent grid column. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none mt-10 hidden max-w-xl items-center justify-between gap-6 lg:flex"
                    >
                        <div className="opacity-95 floatAnim1">
                            <Image
                                src="/images/food/icon1.png"
                                alt=""
                                width={220}
                                height={150}
                                sizes="(min-width: 1280px) 144px, 112px"
                                className="h-auto w-28 object-contain xl:w-36"
                            />
                        </div>
                        <div className="opacity-95 floatAnim2">
                            <Image
                                src="/images/food/icon3.png"
                                alt=""
                                width={200}
                                height={260}
                                sizes="(min-width: 1280px) 144px, 112px"
                                className="h-auto w-28 object-contain xl:w-36"
                            />
                        </div>
                        <div className="opacity-95 floatAnim3">
                            <Image
                                src="/images/food/icon2.png"
                                alt=""
                                width={210}
                                height={210}
                                sizes="(min-width: 1280px) 144px, 112px"
                                className="h-auto w-28 object-contain xl:w-36"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-md ">
                    <div className="mt-6 overflow-hidden rounded-lg bg-cream ring-2 ring-charcoal/10">
                        <Image
                            src="/images/banners/VerticalArt.jpg"
                            alt="VietBites poster with 'Bite to Bright, Spoon to Smile'"
                            width={600}
                            height={800}
                            className="h-auto w-full object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Layout safety layer to prevent overlaps on small screens */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 md:hidden bg-linear-to-b from-transparent via-transparent to-cream/10" />
        </section>
    );
}
