export default function Quote() {
    return (
        <section className="mx-auto mt-16 max-w-5xl md:px-10">
            <div className="card p-8 ring-1 ring-charcoal/10">
                <blockquote className="text-lg text-orange font-bold md:text-xl font-heading leading-relaxed">
                    “A quote can go here about VietBites or other inspirations.”
                </blockquote>
                <p className="mt-2 text-sm text-charcoal/70">
                    — The VietBites Team
                </p>
            </div>
        </section>
    );
}
