import Image from "next/image";
import Link from "next/link";
import "server-only";

import { getAnnouncements } from "@/lib/notion/announcements";
import { getMenu } from "@/lib/notion/menu";
import { getHours } from "@/lib/notion/hours";

/* ----------------------------- Helpers ----------------------------- */

function pickFeatured(
    items: Awaited<ReturnType<typeof getMenu>>,
    count: number
) {
    // Prefer HIGHLIGHT, then NEW, then top-by-order
    const highlight = items.filter((i) => i.notes === "HIGHLIGHT");
    const fresh = items.filter((i) => i.notes === "NEW");
    const rest = items.filter(
        (i) => i.notes !== "HIGHLIGHT" && i.notes !== "NEW"
    );
    const ordered = [...highlight, ...fresh, ...rest].slice(0, count);
    return ordered;
}

function OpenToday({ hours }: { hours: Awaited<ReturnType<typeof getHours>> }) {
    if (!hours?.length) return null;

    // Expect "Sort" 1..7 for Mon..Sun
    const idx = new Date().getDay(); // 0=Sun..6=Sat
    const map: Record<number, string> = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };
    const todayName = map[idx];

    // Find today's hours, fallback to first match if multiple
    const today = hours.find(
        (h) => (h.day || "").toLowerCase() === todayName.toLowerCase()
    );
    if (!today) return null;

    // Show hours if open, even if open/close are empty strings or null
    const isClosed = today.closed === true || (!today.open && !today.close);

    return (
        <p>
            Today's Hours:{" "}
            {isClosed ? (
                <span className="font-semibold">Closed</span>
            ) : (
                <span className="font-semibold">
                    {today.open ? today.open : "—"} –{" "}
                    {today.close ? today.close : "—"}
                </span>
            )}{" "}
            <Link
                href="/location"
                className="underline hover:text-orange transition-colors"
            >
                (see full hours)
            </Link>
        </p>
    );
}

export default async function HomePage() {
    // fetch in parallel
    const [annPromise, menuPromise, hoursPromise] = [
        getAnnouncements(),
        getMenu(),
        getHours(),
    ];

    const [announcements, menu, hours] = await Promise.all([
        annPromise,
        menuPromise,
        hoursPromise,
    ]);

    const featured = pickFeatured(menu, 4);

    return (
        <>
            {/* HERO */}
            <section className="relative overflow-hidden rounded-2xl section-cream px-6 py-10 md:px-10 md:py-14">
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    aria-hidden
                >
                    {/* subtle texture / pattern hook if you want later */}
                </div>

                <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div>
                        <h1
                            className="text-3xl md:text-4xl font-bold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Vietnamese flavors, made with love.
                        </h1>
                        <p className="mt-3 text-base md:text-lg text-charcoal/80">
                            From house specials to sweet soups and bánh
                            mì—VietBites brings a taste of home to Toronto.
                            Order at the counter, stay for a story.
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

                    <div className="flex justify-center md:justify-end">
                        {/* swap to a hero image when ready */}
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

            {/* ANNOUNCEMENTS */}
            {announcements?.length ? (
                <>
                    <hr />
                    <section className="mt-10">
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Announcements
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {announcements.map((a) => (
                                <article key={a.id} className="card">
                                    <div className="flex items-start gap-4">
                                        {a.media ? (
                                            <Image
                                                src={a.media}
                                                alt={a.title}
                                                width={96}
                                                height={96}
                                                className="rounded-md object-cover w-24 h-24"
                                            />
                                        ) : null}
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {a.title}
                                            </h3>
                                            {a.details ? (
                                                <p className="text-sm text-charcoal/80 mt-1">
                                                    {a.details}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </>
            ) : null}

            <hr />

            {/* FEATURED MENU */}
            <section className="mt-10">
                <div className="flex items-end justify-between gap-3">
                    <h2
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Customer Favourites
                    </h2>
                    <Link
                        href="/menu"
                        className="text-sm underline hover:text-orange transition-colors"
                    >
                        See full menu
                    </Link>
                </div>

                {featured.length ? (
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {featured.map((item) => (
                            <li
                                key={item.id}
                                className="card transition-shadow hover:shadow-md"
                            >
                                {item.photo ? (
                                    <Image
                                        src={item.photo}
                                        alt={item.name}
                                        width={480}
                                        height={320}
                                        className="rounded-lg object-cover w-full h-40"
                                    />
                                ) : (
                                    <div className="rounded-lg bg-clean border border-charcoal/10 w-full h-40 grid place-items-center text-sm text-charcoal/60">
                                        Photo coming soon
                                    </div>
                                )}
                                <div className="mt-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>
                                        {item.notes === "NEW" && (
                                            <span className="inline-flex items-center rounded-lg bg-orange/10 text-orange px-2 py-0.5 text-xs font-semibold">
                                                NEW
                                            </span>
                                        )}
                                        {item.notes === "HIGHLIGHT" && (
                                            <span className="inline-flex items-center rounded-lg bg-green-100/70 text-green px-2 py-0.5 text-xs font-semibold">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    {item.description ? (
                                        <p className="text-sm text-charcoal/80 mt-1 line-clamp-3">
                                            {item.description}
                                        </p>
                                    ) : null}
                                    <p className="mt-2 font-semibold">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-charcoal/70 mt-3">
                        Menu is being prepared—please check back soon.
                    </p>
                )}
            </section>

            <hr />

            {/* LOCATION STRIP */}
            <section className="mt-12 rounded-2xl section-cream px-6 py-7 md:px-8 md:py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2
                            className="text-xl md:text-2xl font-bold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Visit VietBites on Gerrard St E
                        </h2>
                        <p className="text-charcoal/80 text-sm md:text-base mt-1">
                            246 Gerrard St E, Toronto • Open daily — check hours
                            & directions.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/location"
                            className="inline-flex items-center rounded-lg bg-orange text-clean px-4 py-2 font-semibold shadow transition duration-200 hover:bg-[var(--orange-hover)] active:bg-[var(--orange-active)] active:scale-[.98]"
                        >
                            Hours & Directions
                        </Link>
                        <Link
                            href="/contact"
                            className="button-outline py-2 px-4 text-sm font-heading font-medium rounded-lg"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
