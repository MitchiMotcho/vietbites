import type { Metadata } from "next";
import { StoryHero } from "@/components/story/StoryHero";
import FounderLetter from "@/components/story/FounderLetter";
import { PhotoStrip } from "@/components/story/PhotoStrip";
import Quote from "@/components/story/Quote";
import CTA from "@/components/story/CTA";
import Pillars from "@/components/story/Pillars";

export const metadata: Metadata = {
    title: "Our Story • VietBites Toronto",
    description:
        "How VietBites began: Hải Phòng flavors, family recipes, and the craft behind our bánh mì and desserts.",
    openGraph: {
        title: "Our Story • VietBites Toronto",
        description:
            "How VietBites began: Hải Phòng flavors, family recipes, and the craft behind our bánh mì and desserts.",
        type: "article",
    },
};

export default function StoryPage() {
    return (
        <main className="relative">
            {/* HERO */}
            <StoryHero />

            <hr />

            {/* FOUNDER LETTER */}
            <FounderLetter />

            {/* PHOTO STRIP */}
            <PhotoStrip />

            <hr />

            {/* PILLARS */}
            <Pillars />

            {/* QUOTE */}
            <Quote />

            <hr />

            {/* CTA */}
            <CTA />
        </main>
    );
}
