import Intro from "@/components/contact/Intro";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <section className="mx-auto max-w-5xl xl:max-w-[60vw] px-4 md:px-6 lg:px-8 py-10 rounded-lg section-cream border border-gray-100 shadow-sm">
            <h1 className="contact-heading text-center text-3xl md:text-4xl font-semibold text-orange tracking-tight">
                Contact Us
            </h1>
            <p className="mt-2 text-center text-sm md:text-base text-charcoal/70">
                The Viet Bites team is here to help you with any questions or
                concerns!
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6">
                <Intro />
                <div>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
