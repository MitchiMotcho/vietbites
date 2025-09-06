import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-16 bg-clean border-t border-charcoal/10">
            {/* Slim brand accent */}
            <div className="h-1 bg-orange/80" />

            <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 md:grid-cols-2">
                {/* Brand / tagline */}
                <div className="flex flex-col items-center gap-3">
                    <Image
                        src="/images/Banners/BannerNoBg.png"
                        alt="VietBites"
                        width={500}
                        height={200}
                        className="rounded-md h-16 w-auto"
                    />
                    <div className="mt-3 flex gap-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center rounded-lg bg-orange text-clean px-3 py-2 text-sm font-semibold shadow transition ease-in-out duration-300 hover:bg-[var(--orange-hover)] active:bg-[var(--orange-active)] active:scale-[.98]"
                        >
                            Get in touch
                        </Link>
                        <Link
                            href="/menu"
                            className="button-outline py-2 px-3 text-sm font-heading font-medium rounded-lg"
                        >
                            View menu
                        </Link>
                    </div>
                </div>

                {/* Visit us */}
                <div className="text-sm">
                    <p
                        className="mb-2 font-semibold text-charcoal"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Visit us
                    </p>
                    <address className="not-italic text-charcoal/90">
                        246 Gerrard St E
                        <br />
                        Toronto, ON, M5A 2G2
                    </address>
                    <p className="mt-2 text-charcoal/80">
                        Open Sat to Thurs •{" "}
                        <Link
                            href="/location"
                            className="underline hover:text-orange ease-in-out duration-300 transition-colors"
                        >
                            Check our hours
                        </Link>
                    </p>

                    <div className="mt-3 flex gap-3">
                        <Link
                            href="/location"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-orange text-clean shadow transition ease-in-out duration-300 hover:bg-[var(--orange-hover)] active:bg-[var(--orange-active)] active:scale-[.95]"
                        >
                            <FaMapMarkerAlt size={18} />
                        </Link>
                        <a
                            href="https://www.instagram.com/vietbites.to"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal/15 text-charcoal shadow-sm button-outline"
                        >
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-charcoal/10 py-4 text-center text-xs text-charcoal/70">
                © {new Date().getFullYear()} VietBites. Created by{" "}
                <a
                    href="https://motchi.ca"
                    className="underline hover:text-orange ease-in-out duration-300 transition-colors"
                    target="_blank"
                >
                    Mitchi Motcho Websites
                </a>
                . All rights reserved.
            </div>
        </footer>
    );
}
