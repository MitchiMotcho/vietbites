import Image from "next/image";
import Link from "next/link";
import "./Hero.css";
import OpenToday from "./OpenToday";
import QRCode from "./QRCode/QRCode";
import { getHours } from "@/lib/notion/hours";

export default async function Hero({
    hours,
}: {
    hours: Awaited<ReturnType<typeof getHours>>;
}) {
    return (
        <section
            id="hero"
            className="frame-clipped overflow-hidden rounded-2xl bg-cream px-8 py-16 
             md:px-16 md:py-24 lg:py-32 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
        >
            {/* Floating product images */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
            >
                <div className="hidden lg:block absolute floatLeft opacity-95 floatAnim1">
                    <Image
                        src="/images/food/icon1.png"
                        alt="Food Icons - Rice Paper Salad"
                        width={220}
                        height={150}
                        style={{ height: "auto", width: "200px" }}
                        className="h-auto aspect-auto w-[200px] lg:w-[220px] object-cover -rotate-20"
                        priority
                    />
                </div>
                <div className="hidden lg:block absolute floatCenter opacity-95 floatAnim2">
                    <Image
                        src="/images/food/icon3.png"
                        alt="Food Icons - Banh Mi"
                        width={200}
                        height={260}
                        style={{ height: "auto", width: "180px" }}
                        className="h-auto w-[180px] xl:w-[200px] object-cover"
                        priority
                    />
                </div>
                <div className="hidden md:block absolute floatRight opacity-95 floatAnim3">
                    <Image
                        src="/images/food/icon2.png"
                        alt="Food Icons - Snack"
                        width={210}
                        height={210}
                        style={{ height: "auto" }}
                        className="h-auto w-[190px] xl:w-[210px] object-cover"
                        priority
                    />
                </div>
            </div>

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

                    <div className="mt-8 w-3/4 mx-auto sm:w-full flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                        <Link
                            href="/menu"
                            className="text-center rounded-lg bg-orange text-clean px-5 py-3 font-semibold shadow transition duration-200 hover:bg-orange-hover active:bg-orange-active active:scale-[.98]"
                        >
                            View Menu
                        </Link>
                        <Link
                            href="/story"
                            className="text-center button-outline px-5 py-3 text-sm md:text-base font-heading font-medium rounded-lg"
                        >
                            Our Story
                        </Link>
                        <Link
                            href="/location"
                            className="text-center button-outline px-5 py-3 text-sm md:text-base font-heading font-medium rounded-lg"
                        >
                            Visit Us
                        </Link>
                    </div>

                    {/* Today’s hours */}
                    <div className="mt-6 text-sm text-charcoal/80">
                        <OpenToday hours={hours} />
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-sm">
                    <div className="rounded-xl bg-clean p-6 shadow-sm ring-1 ring-charcoal/10">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/logos/LogoCircle.png"
                                alt="VietBites mark"
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full"
                            />
                            <div>
                                <p className="font-heading font-bold text-lg tracking-wide text-orange">
                                    VIETBITES
                                </p>
                                <p className="text-xs text-charcoal/70">
                                    Desserts &amp; Bánh mì
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                            <p className="text-sm text-charcoal/80">
                                Follow us on Instagram for new specials and
                                behind-the-scenes.
                            </p>
                            <a
                                href="https://www.instagram.com/vietbites.to"
                                className="inline-flex items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-clean shadow hover:bg-orange-hover active:bg-orange-active"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                @vietbites.to
                            </a>
                        </div>

                        {/* Instagram QR code */}
                        <QRCode />
                    </div>
                </div>
            </div>

            {/* Layout safety layer to prevent overlaps on small screens */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 md:hidden bg-linear-to-b from-transparent via-transparent to-cream/10" />
        </section>
    );
}
