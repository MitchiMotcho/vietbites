import Image from "next/image";
import { getAnnouncements } from "@/lib/notion/announcements";
import { IoNewspaperOutline } from "react-icons/io5";

export default async function Announcements({
    announcements,
}: {
    announcements?: Awaited<ReturnType<typeof getAnnouncements>>;
}) {
    if (!announcements?.length) return null;

    const [featured, ...rest] = announcements;

    return (
        <>
            <hr />
            <section className="mt-10">
                <div className="flex items-end justify-between gap-3">
                    <h2 className="text-2xl font-bold font-heading">
                        Announcements
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Featured */}
                    <article className="mt-4 overflow-hidden rounded-2xl bg-clean ring-1 ring-charcoal/10">
                        <div className="relative aspect-[16/9] w-full">
                            {featured.media && (
                                <Image
                                    src={featured.media}
                                    alt={featured.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-cream">
                                <h3 className="announcement-title font-heading text-xl md:text-2xl font-bold">
                                    {featured.title}
                                </h3>
                                {featured.details && (
                                    <p className="mt-1 line-clamp-2 text-sm text-charcoal/80">
                                        {featured.details}
                                    </p>
                                )}
                            </div>
                            {/* small orange corner tab */}
                            <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1 rounded-full bg-orange px-2 py-1 text-[10px] font-bold uppercase text-clean">
                                <IoNewspaperOutline className="h-3 w-3 mr-2" />
                                News
                            </span>
                        </div>
                    </article>

                    {/* Rest (light list, not heavy cards) */}
                    {rest.length > 0 && (
                        <ul className="mt-5 grid gap-4 md:grid-cols-2">
                            {rest.map((a) => (
                                <li
                                    key={a.id}
                                    className="group flex items-start gap-3 rounded-xl bg-cream p-3 ring-1 ring-charcoal/10 transition hover:ring-charcoal/20"
                                >
                                    <div className="relative h-32 w-48 sm:h-40 sm:w-60 md:h-48 md:w-72 lg:h-56 lg:w-80 overflow-hidden rounded-lg ring-1 ring-charcoal/10">
                                        {a.media && (
                                            <Image
                                                src={a.media}
                                                alt={a.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="line-clamp-1 font-heading text-sm font-semibold text-orange">
                                            {a.title}
                                        </h3>
                                        {a.details && (
                                            <p className="mt-1 line-clamp-2 text-xs text-charcoal/80">
                                                {a.details}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </>
    );
}
