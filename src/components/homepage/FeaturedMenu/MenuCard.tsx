import Image from "next/image";
import Badge from "./Badge";
import Tag from "./Tag";

type MenuCardProps = {
    id: string;
    name: string;
    vietName: string;
    description?: string;
    price: number;
    photo?: string;
    note?: string;
    tags?: string[];
};

export default function MenuCard({
    name,
    vietName,
    description,
    price,
    photo,
    note,
    tags,
}: MenuCardProps) {
    return (
        <article className="group overflow-hidden rounded-xl border border-charcoal/10 bg-cream shadow-sm transition-all hover:shadow-lg flex flex-col h-96">
            <div className="relative">
                {/* Image with subtle gradient for text legibility */}
                {photo ? (
                    <div className="relative h-44 w-full">
                        <Image
                            src={photo}
                            alt={name}
                            width={640}
                            height={360}
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-transparent" />
                    </div>
                ) : (
                    <div className="h-44 w-full grid place-items-center bg-clean text-sm text-charcoal/60 border-b border-charcoal/10">
                        Photo coming soon...
                    </div>
                )}

                {/* Badge sits on image */}
                <div className="absolute top-2 right-2">
                    <Badge note={note} />
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-1 flex-1 min-h-0">
                <div className="flex flex-row items-start justify-between gap-3 text-orange">
                    <div className="flex flex-col max-w-3/4">
                        <p className="font-semibold text-lg leading-snug">
                            {name}
                        </p>
                        <div className="text-sm italic">{vietName}</div>
                    </div>
                    <div className="flex items-center">
                        <p className="text-orange font-extrabold text-lg">
                            ${price.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="flex-1">
                    {description ? (
                        <p className="mt-1 text-sm text-charcoal/60 line-clamp-4 overflow-hidden">
                            {description}
                            {description.length > 100 && "..."}
                        </p>
                    ) : (
                        // keep space when no description so cards stay same height
                        <div className="mt-1" />
                    )}
                </div>

                {tags && tags.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {tags.slice(0, 2).map((t) => (
                            <Tag key={t} label={t} />
                        ))}
                        {tags.length > 2 && (
                            <span className="text-sm text-charcoal/60">
                                + {tags.length - 2} more
                            </span>
                        )}
                    </div>
                ) : null}
            </div>

            {/* Bottom accent hover */}
            <div className="h-1 bg-orange/60 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
        </article>
    );
}
