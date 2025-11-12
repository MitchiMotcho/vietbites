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
    const Img = ({ alt, ...props }: ComponentProps<typeof Image>) => <Image alt={alt} {...props} />;
    return (
        <section className="mx-auto mt-12 max-w-6xl md:px-10">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {images.map((img, index) => (
                    <figure
                        key={index}
                        className="group relative overflow-hidden rounded-xl shadow-lg ring-1 ring-charcoal/10 bg-orange/10"
                    >
                        <Img
                            src={img.src}
                            alt={img.alt}
                            width={420}
                            height={300}
                            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110 md:h-48"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                    </figure>
                ))}
            </div>
        </section>
    );
}
