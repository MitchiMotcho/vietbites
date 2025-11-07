import Image from "next/image";
import type { TMenuItem } from "@/lib/schema";
import NoteBadge from "@/components/menu/NoteBadge";
import DietaryTags from "@/components/menu/DietaryTags";
import Price from "@/components/menu/MenuPrice";
import "@/app/menu/menu.css";

export default function HouseSpecialSection({ items }: { items: TMenuItem[] }) {
    if (!items.length) return null;
    return (
        <p>tehee</p>
    );
}