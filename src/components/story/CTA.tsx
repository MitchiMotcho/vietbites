import Image from "next/image";
import Link from "next/link";

export default function CTA() {
    return (
        <section
            id="story-link"
            className="mx-auto my-16 max-w-6xl md:px-10"
        >
            <div className="grid items-center gap-6 rounded-2xl bg-orange/10 p-6 md:grid-cols-[1.1fr_.9fr] md:p-8 ring-1 ring-orange/20">
                <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-orange">
                        Visit us for a taste of Vietnam
                    </h3>
                    <p className="mt-2 text-charcoal/80">
                        We&apos;re excited to share our flavors with you. Thank
                        you for supporting our small business and being part of
                        our journey.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                            href="/location"
                            className="rounded-lg bg-orange px-5 py-3 font-semibold text-clean shadow transition ease-in-out duration-300 hover:bg-orange-hover"
                        >
                            Plan your visit
                        </Link>
                        <Link
                            href="/menu"
                            className="button-outline rounded-lg px-5 py-3 font-heading font-medium"
                        >
                            Today&apos;s menu
                        </Link>
                    </div>
                </div>
                <div className="relative h-56 overflow-hidden rounded-xl ring-1 ring-orange/20 md:h-64">
                    <Image
                        src="/images/StoreFront.webp"
                        alt="VietBites storefront"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
