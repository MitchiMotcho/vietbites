import clsx from "clsx";
import InstagramSocial from "@/components/common/InstagramSocial";

/** ---- data helpers (unchanged api) ---- */
function normalizeHours(
    hours: any
): Array<{ day: string; open?: string; close?: string; closed?: boolean }> {
    if (Array.isArray(hours)) {
        return hours.map((h: any) => ({
            day: h.day ?? h.label ?? h.name ?? "—",
            open: h.open ?? h.start ?? h.opens ?? h.from ?? h.openTime,
            close: h.close ?? h.end ?? h.closes ?? h.to ?? h.closeTime,
            closed: Boolean(
                h.closed ?? h.isClosed ?? (h.open === "" && h.close === "")
            ),
        }));
    }

    const order = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    if (hours && typeof hours === "object") {
        const rows = Object.entries(hours).map(([key, value]: any) => ({
            day: capitalize(key),
            open: value?.open ?? value?.start ?? "",
            close: value?.close ?? value?.end ?? "",
            closed: Boolean(value?.closed),
        }));
        rows.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
        return rows;
    }

    // default closed template
    return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ].map((d) => ({ day: d, closed: true }));
}
function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** ---- UI ---- */
export default function HoursTable({ hours }: { hours: any }) {
    const rows = normalizeHours(hours);

    return (
        <section
            aria-label="Business hours"
            className="max-w-lg mx-auto rounded-2xl"
        >
            <p className="px-5 sm:px-6 py-4 xl:py-8 text-center text-xs text-charcoal/60">
                Holiday hours may vary. Please check our socials below for
                updates.
            </p>
            <ul role="list" className="divide-y divide-transparent">
                {rows.map((r, idx) => {
                    const isClosed = r.closed || (!r.open && !r.close);

                    return (
                        <li key={`${r.day}-${idx}`}>
                            {idx !== 0 && (
                                <div className="py-4">
                                    <hr className="w-full" />
                                </div>
                            )}

                            <div className="px-5 sm:px-6 py-3.5 grid grid-cols-[1fr_auto] items-center gap-3">
                                <span
                                    className={clsx(
                                        "font-heading font-extrabold tracking-tight",
                                        "text-[color-mix(in_oklab,var(--green)_85%,black_0%)]",
                                        "text-base sm:text-lg"
                                    )}
                                >
                                    {r.day}
                                </span>

                                {isClosed ? (
                                    <span className="inline-flex items-center rounded-full bg-charcoal/5 text-charcoal/60 px-2.5 py-0.5 text-xs sm:text-sm font-semibold">
                                        Closed
                                    </span>
                                ) : (
                                    <time
                                        className="font-heading font-extrabold text-orange text-sm sm:text-base"
                                        dateTime={`${r.open}-${r.close}`}
                                    >
                                        {r.open} - {r.close}
                                    </time>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Socials - Just Instagram for now */}
            <InstagramSocial align="center" />
        </section>
    );
}
