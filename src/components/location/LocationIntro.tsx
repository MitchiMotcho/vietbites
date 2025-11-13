"use client";

import OpenToday from "@/components/homepage/Hero/OpenToday";

type Hours = any;

function toMinutes(t: string) {
    const [hh, mm = "0"] = t.split(":").map((s) => s.trim());
    return Number(hh) * 60 + Number(mm);
}

function getToday(hours: Hours) {
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
                (h: any) => (h.day || "").toString().toLowerCase() === todayName
            ) || hours[now.getDay()]
        );
    }
    if (hours && typeof hours === "object") {
        return hours[todayName] ?? hours[now.getDay()] ?? hours.today;
    }
    return null;
}

function normalizeIntervals(today: any) {
    if (!today) return [];
    let intervals: any[] = [];

    if (Array.isArray(today)) intervals = today;
    else if (Array.isArray(today?.intervals)) intervals = today.intervals;
    else if (today.open && today.close)
        intervals = [{ start: today.open, end: today.close }];

    return intervals
        .map((it) => {
            if (typeof it === "string") {
                const [start, end] = it.split("-").map((s) => s.trim());
                return { start, end };
            }
            return {
                start: it.start ?? it.open ?? it.from,
                end: it.end ?? it.close ?? it.to,
            };
        })
        .filter((it) => it.start && it.end);
}

function statusMessage(hours: Hours) {
    const now = new Date();
    const nowM = now.getHours() * 60 + now.getMinutes();
    const today = getToday(hours);
    const intervals = normalizeIntervals(today);

    if (!intervals.length) {
        return "We're closed :( Check our hours below and visit another day.";
    }

    const openInterval = intervals.find((it) => {
        try {
            return nowM >= toMinutes(it.start) && nowM < toMinutes(it.end);
        } catch {
            return false;
        }
    });

    if (openInterval) {
        const minsLeft = toMinutes(openInterval.end) - nowM;
        return minsLeft <= 30
            ? "We're closing soon, come by quickly!"
            : "We're open right now, come visit us!";
    }

    const later = intervals
        .map((it) => ({ m: toMinutes(it.start), it }))
        .filter((x) => x.m > nowM)
        .sort((a, b) => a.m - b.m)[0];

    if (later) {
        const h = Math.floor(later.m / 60);
        const m = later.m % 60;
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `We open later today at ${h}:${pad(m)}.`;
    }

    return "We're closed :( Check our hours below and visit another day.";
}

export default function LocationIntro({ hours }: { hours: Hours }) {
    return (
        <>
            <header className="text-center">
                <h1 className="contact-heading text-3xl md:text-4xl font-semibold text-orange tracking-tight">
                    Visit Us
                </h1>
                <p className="mt-2 text-sm md:text-base text-charcoal/70">
                    We&apos;re located in Downtown Toronto! Come by for bánh mì,
                    drinks, and desserts. See today&apos;s hours and directions
                    below.
                </p>
            </header>

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
                        <div className="text-lg md:text-xl font-heading font-semibold leading-tight">
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
