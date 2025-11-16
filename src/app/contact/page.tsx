import "server-only";

import Intro from "@/components/contact/Intro";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeader from "@/components/common/SectionHeader";
import Platforms from "@/components/common/Platforms";

import { getPlatforms } from "@/lib/notion/platforms";
import type { Platform } from "@/lib/notion/platforms";

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
                    subtitle="The Viet Bites team is here to help you with any questions or concerns!"
                >
                    <Platforms items={platforms} variant="full" align="center"/>
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
