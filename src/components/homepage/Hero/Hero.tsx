import Image from "next/image";
import Link from "next/link";
import OpenToday from "./OpenToday";
import { getHours } from "@/lib/notion/hours";

export default async function Hero({
    hours,
}: {
    hours: Awaited<ReturnType<typeof getHours>>;
}) {
    return (
        <section className="relative overflow-hidden rounded-2xl section-cream px-6 py-10 md:px-10 md:py-14">
            <div className="grid gap-10 md:grid-cols-2 items-center">
                {/* Text side */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading">
                        Welcome to{" "}
                        <span className="text-orange">VietBites</span> – A Taste
                        of Vietnam in Toronto
                    </h1>
                    <p className="mt-3 text-base md:text-lg text-charcoal/80">
                        Discover the vibrant flavors and rich culinary
                        traditions of Vietnam. At VietBites, we bring you the
                        essence of Hải Phòng's bustling streets with our
                        authentic <em>bánh mì</em> and delightful Vietnamese
                        desserts. Every dish is crafted with care and meant to
                        be savored and celebrated.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <Link
                            href="/menu"
                            className="inline-flex items-center rounded-lg bg-orange text-clean px-5 py-3 font-semibold shadow transition duration-200 hover:bg-[var(--orange-hover)] active:bg-[var(--orange-active)] active:scale-[.98]"
                        >
                            View Menu
                        </Link>
                        <Link
                            href="/location"
                            className="button-outline py-3 px-5 text-sm md:text-base font-heading font-medium rounded-lg"
                        >
                            Visit Us
                        </Link>
                    </div>

                    {/* Hours quick glance */}
                    <div className="mt-6 text-sm text-charcoal/80">
                        <OpenToday hours={hours} />
                    </div>
                </div>

                {/* Image side */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/images/Banners/VerticalArt.jpg"
                        alt="VietBites dishes"
                        width={560}
                        height={360}
                        className="rounded-xl shadow-sm object-cover w-full max-w-[560px] h-auto"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
