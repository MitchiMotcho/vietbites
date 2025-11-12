import Intro from "@/components/contact/Intro";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="max-w-7xl bg-cream">
            <section className="mx-auto px-4 md:px-6 lg:px-8 py-10 rounded-lg section-cream">
                <div className="mb-8">
                    <h1 className="contact-heading text-center text-3xl md:text-4xl font-semibold text-orange tracking-tight">
                        CONTACT US
                    </h1>
                    <p className="mt-2 text-center text-sm md:text-base text-charcoal/70 max-w-1/2 mx-auto">
                        The Viet Bites team is here to help you with any
                        questions or concerns!
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6">
                    <Intro />
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
