"use client";

import OpenToday from "@/components/homepage/Hero/OpenToday";
import type { OpeningHour } from "@/lib/notion/hours";
import SectionHeader from "../common/SectionHeader";

function toMinutes(t: string) {
    const [hh, mm = "0"] = t.split(":").map((s) => s.trim());
    return Number(hh) * 60 + Number(mm);
}

function getToday(hours: OpeningHour[]) {
    const now = new Date();
    const dayNames = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    const todayName = dayNames[now.getDay()];

    if (Array.isArray(hours)) {
        return (
            hours.find(
                (h: OpeningHour) =>
                    (h.day || "").toString().toLowerCase() === todayName
            ) || hours[now.getDay()]
        );
    }
    if (hours && typeof hours === "object") {
        return hours[todayName] ?? hours[now.getDay()];
    }
    return null;
}
function normalizeIntervals(
    today: OpeningHour | OpeningHour[] | null
): { start: string; end: string } | null {
    if (!today) return null;

    if (Array.isArray(today)) {
        console.error(
            "normalizeIntervals: expected a single OpeningHour object but received an array. Using the first element.",
            today
        );
        today = today[0];
        if (!today) return null;
    }

    let interval: { start?: string; end?: string } = {};

    if (today.open && today.close)
        interval = { start: today.open, end: today.close };
    else return null;

    if (!interval.start || !interval.end) return null;

    return {
        start: interval.start,
        end: interval.end,
    };
}

function statusMessage(hours: OpeningHour[]) {
    const now = new Date();
    const nowM = now.getHours() * 60 + now.getMinutes();
    const today = getToday(hours);
    const interval = today ? normalizeIntervals(today as OpeningHour) : null;

    if (!interval) {
        return "We're closed :( Check our hours below and visit another day.";
    }

    const openNow = (() => {
        try {
            return (
                nowM >= toMinutes(interval!.start) &&
                nowM < toMinutes(interval!.end)
            );
        } catch {
            return false;
        }
    })();

    if (openNow) {
        const minsLeft = toMinutes(interval.end) - nowM;
        return minsLeft <= 60
            ? "We're closing soon, come by quickly!"
            : "We're open right now, come visit us!";
    }

    if (nowM < toMinutes(interval.start)) {
        const startM = toMinutes(interval.start);
        const endM = toMinutes(interval.end);
        const format12 = (mins: number) => {
            const hh = Math.floor(mins / 60);
            const mm = mins % 60;
            const period = hh >= 12 ? "PM" : "AM";
            const hour12 = ((hh + 11) % 12) + 1; // convert 0->12, 13->1, etc.
            const pad = (n: number) => n.toString().padStart(2, "0");
            return `${hour12}:${pad(mm)} ${period}`;
        };
        return `We open later today at ${format12(startM)} until ${format12(
            endM
        )}.`;
    }

    return "We're closed :( Check our hours below and visit another day.";
}

export default function LocationIntro({ hours }: { hours: OpeningHour[] }) {
    return (
        <>
            <SectionHeader
                title="Visit Us"
                subtitle={
                    <>
                        We&apos;re located in Downtown Toronto! Come by for bánh
                        mì, drinks, and desserts. See today&apos;s hours and
                        directions below.
                    </>
                }
            />

            {/* Today’s status — prominent card, centered (unchanged design) */}
            <div className="flex justify-center">
                <div
                    role="status"
                    aria-live="polite"
                    className="inline-flex items-center gap-3 w-full md:w-auto justify-center bg-linear-to-r from-orange/10 to-amber-50 border-2 border-orange/30 text-orange rounded-xl px-4 py-3 shadow-lg ring-1 ring-orange/20"
                >
                    <span
                        className="shrink-0 h-3 w-3 rounded-full bg-orange shadow-md animate-pulse"
                        aria-hidden="true"
                    />
                    <div className="text-center">
                        <div className="text-base md:text-lg lg:text-xl font-heading font-semibold leading-tight">
                            <OpenToday hours={hours} showLink={false} />
                        </div>
                        <div className="text-xs text-charcoal/70 mt-0.5">
                            {statusMessage(hours)}
                        </div>
                    </div>
                    <span
                        className="shrink-0 h-3 w-3 rounded-full bg-orange shadow-md animate-pulse"
                        aria-hidden="true"
                    />
                </div>
            </div>

            <hr className="my-4" />
        </>
    );
}
