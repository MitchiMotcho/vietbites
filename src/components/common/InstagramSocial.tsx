import { FaInstagram } from "react-icons/fa";

export default function InstagramSocial({
    handle = "@vietbites.to",
    link = "https://www.instagram.com/vietbites.to",
    align = "center",
}: {
    handle?: string;
    link?: string;
    align?: "left" | "center" | "right";
}) {
    const justify =
        align === "left"
            ? "justify-start"
            : align === "right"
            ? "justify-end"
            : "justify-center";

    return (
        <div className={`mt-6 flex ${justify} overflow-visible`}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange/10 px-4 py-2
                   text-orange font-semibold text-sm md:text-base transform transition
                   duration-200 hover:bg-orange hover:text-clean hover:scale-105
                   active:scale-[.98] border-orange border"
            >
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
                <span className="font-heading">{handle}</span>
            </a>
        </div>
    );
}
