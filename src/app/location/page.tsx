import "server-only";

import { getHours } from "@/lib/notion/hours";
import FrameSection from "@/components/common/FrameSection";
import HoursTable from "@/components/location/HoursTable";
import LocationIntro from "@/components/location/LocationIntro";

import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import Image from "next/image";

function googleMapsEmbedSrc() {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.074289893019!2d-79.37107992344025!3d43.66202617109976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cbc0f751d687%3A0x881dfbd1330e66d6!2sVietBites!5e0!3m2!1sen!2sca!4v1731557500000!5m2!1sen!2sca";
}

function directionsUrl(address: string) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address
    )}`;
}

export default async function LocationPage() {
    const hours = await getHours();

    return (
        <main
            id="location"
            className="max-w-7xl mx-auto bg-cream px-4 md:px-6 lg:px-8 pb-12 pt-6 space-y-8"
        >
            <LocationIntro hours={hours} />

            {/* 2-column at xl; stacked otherwise */}
            <section className="grid gap-6 xl:grid-cols-2 items-start">
                {/* Left: Map + Address / Actions */}
                <FrameSection title="LOCATION" frameClass="center-frame">
                    <div className="grid gap-4">
                        {/* CARD — centered on ≤lg, left on xl+ */}
                        <div className="rounded-lg my-4 p-4 md:p-5 bg-clean ring-1 ring-charcoal/6 shadow-sm flex flex-col xl:flex-row items-center xl:items-start gap-4 text-center xl:text-left">
                            {/* Logo */}
                            <div className="shrink-0">
                                <Image
                                    src="/images/logos/LogoCircle.png"
                                    alt="VietBites logo"
                                    width={100}
                                    height={100}
                                    className="h-12 w-12 rounded-md object-cover"
                                />
                            </div>

                            {/* Main info */}
                            <div className="flex-1 min-w-0 w-full">
                                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-heading text-orange text-lg font-semibold">
                                            VIETBITES
                                        </p>
                                        <p className="text-charcoal/80 font-medium mt-1">
                                            <span className="inline-flex items-center gap-2 text-xs md:text-sm lg:text-base">
                                                <FaLocationDot className="h-4 w-4 text-orange" aria-hidden="true" />
                                                {process.env.NEXT_PUBLIC_VIETBITES_LOCATION}
                                            </span>
                                        </p>

                                        {process.env.NEXT_PUBLIC_VIETBITES_PHONE ? (
                                            <p className="text-charcoal/80 font-medium mt-1">
                                            <span className="inline-flex items-center gap-2 text-sm lg:text-base">
                                                <FaPhone className="h-4 w-4 text-orange" aria-hidden="true" />
                                                {process.env.NEXT_PUBLIC_VIETBITES_PHONE}
                                            </span>
                                        </p>

                                        ) : null}
                                    </div>
                                </div>

                                {/* Chips */}
                                <div className="mt-3 flex flex-wrap gap-2 justify-center xl:justify-start">
                                    <span className="text-xs bg-clean shadow-sm text-orange font-semibold hover:cursor-default px-3 py-1 rounded-full border border-orange">
                                        Pickup
                                    </span>
                                    <span className="text-xs bg-clean shadow-sm text-orange font-semibold hover:cursor-default px-3 py-1 rounded-full border border-orange">
                                        Delivery
                                    </span>
                                </div>

                                <div className="mt-3 text-xs text-charcoal/60">
                                    <span className="block text-center xl:text-left">
                                        See full hours in the{" "}
                                        <a
                                            href="#hours"
                                            className="underline-offset-2 underline hover:text-orange transition-colors ease-in-out duration-300 xl:hidden"
                                        >
                                            hours section
                                        </a>
                                        <span className="xl:hidden">
                                            {" "}below
                                        </span>
                                        <p className="hidden xl:inline">
                                            hours section to the right
                                        </p>
                                        .
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Buttons — centered ≤lg, left on xl+ */}
                        <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center xl:justify-start">
                            <a
                                href={directionsUrl(process.env.NEXT_PUBLIC_VIETBITES_LOCATION || "")}
                                className="text-center rounded-lg bg-orange text-clean px-5 py-3 font-semibold shadow transition duration-200 hover:bg-orange-hover active:bg-orange-active active:scale-[.98]"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Get Directions
                            </a>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    process.env.NEXT_PUBLIC_VIETBITES_LOCATION || ""
                                )}`}
                                className="text-center button-outline px-5 py-3 text-sm md:text-base font-heading font-medium rounded-lg"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                View in Google Maps
                            </a>
                        </div>

                        <hr className="my-4" />

                        {/* Map embed — full bleed inside the shell */}
                        <div className="-mx-2 md:-mx-4">
                            <div className="aspect-4/3 w-full rounded-md overflow-hidden ring-1 ring-charcoal/10">
                                <iframe
                                    title="Google Maps"
                                    src={googleMapsEmbedSrc()}
                                    className="h-full w-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        <p className="text-xs text-charcoal/60 text-center xl:text-left mt-2">
                            Parking available on nearby streets.
                            Transit-friendly location.
                        </p>
                    </div>
                </FrameSection>

                {/* Right: Hours */}
                <FrameSection
                    id="hours"
                    title="HOURS"
                    frameClass="center-frame"
                >
                    <HoursTable hours={hours} />
                </FrameSection>
            </section>
        </main>
    );
}
