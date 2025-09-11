import Link from "next/link";
import Image from "next/image";

export default function Location() {
    return (
        <section className="mt-12 rounded-2xl section-cream px-6 py-10 md:px-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-2 md:items-center lg:grid-cols-[60%_40%] lg:pr-26 lg:pl-10">
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold font-heading">
                        Come Visit VietBites on Gerrard St E
                    </h2>
                    <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
                        <span className="text-orange font-semibold">VietBites</span> is
                        located at{" "}
                        <span className="font-semibold">
                            246 Gerrard St E, Toronto
                        </span>
                        , steps from downtown. Come by for bánh mì, desserts,
                        and a little taste of Vietnam!
                    </p>

                    <div className="flex flex-col gap-6 pt-6 md:gap-8 text-xs sm:text-sm lg:text-base">
                        <div className="flex items-center justify-center gap-4 flex-row md:justify-start">
                            <Link
                                href="/location"
                                className="inline-flex items-center justify-center rounded-lg bg-orange text-clean px-5 py-3 font-semibold shadow transition duration-200 hover:bg-[var(--orange-hover)] active:bg-[var(--orange-active)] active:scale-[.98]"
                            >
                                Hours & Directions
                            </Link>
                            <Link
                                href="/contact"
                                className="button-outline py-3 px-5 font-heading font-medium rounded-lg text-center"
                            >
                                Get in Touch
                            </Link>
                        </div>
                        <div className="text-center md:text-left relative">
                            <Link
                                href="/story"
                                className="inline-block text-orange font-semibold underline-offset-4 hover:scale-105 transition-all ease-in-out duration-300 text-sm md:text-base relative group"
                            >
                                Learn more about our story →
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/images/Storefront.webp"
                        alt="VietBites storefront"
                        width={500}
                        height={800}
                        className="rounded-xl shadow-sm object-cover max-w-[500px] lg:max-w-[300px] w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );
}
