import type { ComponentProps } from "react";
import Image from "next/image";

export function PhotoStrip({
    images = [
        { src: "/images/story/MiniBaguette.png", alt: "Che/Sweet Soup" },
        { src: "/images/story/MiniBaguette.png", alt: "Mini Baguette" },
        { src: "/images/story/MiniBaguette.png", alt: "Tiramisu" },
        { src: "/images/story/MiniBaguette.png", alt: "Flan" },
    ],
}: {
    images?: { src: string; alt: string }[];
}) {
    const Img = ({ alt, ...props }: ComponentProps<typeof Image>) => (
        <Image alt={alt} {...props} />
    );

    return (
        <section className="mx-auto mt-12 max-w-6xl px-4 md:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {images.map((img, index) => (
                    <figure
                        key={index}
                        className={[
                            // base visual shell
                            "group relative overflow-hidden rounded-2xl ring-1 ring-charcoal/10 bg-clean shadow-sm transition-transform duration-300 will-change-transform",
                            // hover / focus affordances
                            "hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1",
                            // keyboard focus outline
                            "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-400",
                            // staggered heights for visual rhythm (kept responsive)
                            index % 4 === 0
                                ? "h-44 md:h-56"
                                : index % 4 === 1
                                ? "h-52 md:h-64"
                                : index % 4 === 2
                                ? "h-44 md:h-56"
                                : "h-52 md:h-64",
                        ].join(" ")}
                    >
                        {/* subtle gradient overlay to keep captions legible */}
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                        <Img
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width:768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            priority={index < 2}
                        />

                        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-white bg-linear-to-t from-black/70 via-black/30 to-transparent backdrop-blur-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                            <span className="truncate">{img.alt}</span>
                        </figcaption>

                        {/* focusable element for keyboard users */}
                        <a
                            tabIndex={0}
                            aria-label={img.alt}
                            className="absolute inset-0 z-10 focus:outline-none"
                        />
                    </figure>
                ))}
            </div>
        </section>
    );
}
