import Image from "next/image";
import { getAnnouncements } from "@/lib/notion/announcements";

export default async function Announcements({
    announcements,
}: {
    announcements?: Awaited<ReturnType<typeof getAnnouncements>>;
}) {
    return (
        <>
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
        </>
    );
}
