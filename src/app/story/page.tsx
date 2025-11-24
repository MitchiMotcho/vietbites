import "server-only";
import type { Metadata } from "next";

import { StoryHero } from "@/components/story/StoryHero";
import FounderLetter from "@/components/story/FounderLetter";
import { PhotoStrip } from "@/components/story/PhotoStrip";
import Quote from "@/components/story/Quote";
import LocationSection from "@/components/common/LocationSection";
import Pillars from "@/components/story/Pillars";

export const metadata: Metadata = {
    title: "Our Story",
    description:
        "Learn how VietBites started in Toronto with roots in Hải Phòng. Read about our founders, family recipes, and the story behind our Vietnamese bánh mì and desserts.",
    openGraph: {
        title: "Our Story At VietBites Toronto",
        description:
            "Discover the VietBites story from Hải Phòng to Toronto. Learn about our Vietnamese bakery, family recipes, and the inspiration behind our bánh mì and desserts.",
        type: "article",
    },
    twitter: {
        title: "Our Story At VietBites Toronto",
        description:
            "Read how VietBites grew from Hải Phòng flavors to a Vietnamese bakery in Downtown Toronto serving bánh mì, chè, drinks, and desserts.",
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
            <LocationSection />
        </main>
    );
}
