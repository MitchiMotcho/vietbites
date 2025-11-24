import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Contact VietBites in Toronto with questions about our menu, catering, collaborations, or feedback. Reach us by form or social media platforms.",
    openGraph: {
        title: "Contact VietBites In Toronto",
        description:
            "Get in touch with VietBites in Downtown Toronto. Use the contact form or connect through Instagram, Facebook, TikTok, or delivery partners.",
    },
    twitter: {
        title: "Contact VietBites In Toronto",
        description:
            "Contact VietBites for questions, feedback, or catering inquiries. Use the contact form or reach us on social platforms and delivery apps.",
    },
};

/*
import "server-only";
import type { Metadata } from "next";

import Intro from "@/components/contact/Intro";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeader from "@/components/common/SectionHeader";
import Platforms from "@/components/common/Platforms";

import { getPlatforms } from "@/lib/notion/platforms";
import type { Platform } from "@/lib/notion/platforms";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Contact VietBites in Toronto with questions about our menu, catering, collaborations, or feedback. Reach us by form or social media platforms.",
    openGraph: {
        title: "Contact VietBites In Toronto",
        description:
            "Get in touch with VietBites in Downtown Toronto. Use the contact form or connect through Instagram, Facebook, TikTok, or delivery partners.",
    },
    twitter: {
        title: "Contact VietBites In Toronto",
        description:
            "Contact VietBites for questions, feedback, or catering inquiries. Use the contact form or reach us on social platforms and delivery apps.",
    },
};

export default async function ContactPage() {
    const allPlatforms: Platform[] = await getPlatforms();
    const platforms = allPlatforms.filter(
        (p) =>
            p.name === "Instagram" ||
            p.name === "Facebook" ||
            p.name === "TikTok" ||
            p.name === "Location" ||
            p.name === "DoorDash" ||
            p.name === "UberEats"
    );

    return (
        <main className="max-w-7xl bg-cream">
            <section className="mx-auto px-4 md:px-6 lg:px-8 pb-10 pt-4 rounded-lg section-cream">
                <SectionHeader
                    title="CONTACT US"
                    subtitle="The VietBites team is here to help you with any questions or concerns!"
                >
                    <Platforms
                        items={platforms}
                        variant="full"
                        align="center"
                    />
                </SectionHeader>

                <div className="mt-8 grid grid-cols-1 gap-6">
                    <Intro />
                    <div className="max-w-5xl mx-auto w-full">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
*/

import { FiMail } from "react-icons/fi";

export default function ContactPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-cream px-4">
            <div className="max-w-xl w-full text-center bg-clean backdrop-blur-sm rounded-lg p-8 shadow-md">
                <FiMail className="mx-auto text-5xl text-orange" />
                <h1 className="mt-4 text-3xl font-bold">
                    Contact Page Coming Soon...
                </h1>
                <p className="mt-3 text-sm">
                    This page is coming soon. In the meantime, you can contact us through{" "}
                    <a
                        href="mailto:vietbitezinc@gmail.com"
                        className="text-link underline"
                    >
                        email
                    </a>
                    .
                </p>
            </div>
        </main>
    );
}
