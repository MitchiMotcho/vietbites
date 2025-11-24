import { JSX } from "react";
import { FaPepperHot, FaLeaf, FaCarrot } from "react-icons/fa";
import { LuWheatOff } from "react-icons/lu";

const tagIcons: Record<string, JSX.Element> = {
    spicy: <FaPepperHot className="inline-block mr-1" />,
    "gluten free": <LuWheatOff className="inline-block mr-1" />,
    vegan: <FaLeaf className="inline-block mr-1" />,
    vegetarian: <FaCarrot className="inline-block mr-1" />,
};

export default function Tag({ label }: { label: string }) {
    return (
        <span
            className={`inline-flex items-center font-medium rounded-full border border-orange/80 bg-neutral-50 px-3 py-1 text-[10px] shadow-sm text-orange/80 cursor-default`}
        >
            {tagIcons[label.toLowerCase()]}
            {label}
        </span>
    );
}
