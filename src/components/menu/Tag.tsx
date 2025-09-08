const tagGradients: Record<string, string> = {
    spicy: "from-red-200 to-neutral-50 bg-gradient-to-b",
    "gluten free": "from-yellow-200 to-neutral-50 bg-gradient-to-b",
    vegan: "from-emerald-200 to-neutral-50 bg-gradient-to-b",
    vegetarian: "from-emerald-200 to-neutral-50 bg-gradient-to-b",
};

export default function Tag({ label }: { label: string }) {
    const key = label.toLowerCase();
    const gradient = tagGradients[key];

    if (gradient) {
        return (
            <span
                className={`inline-block rounded-full p-[1.5px] bg-gradient-to-t ${gradient.replace('bg-gradient-to-b', '')} shadow-sm`}
            >
                <span
                    className="block rounded-full bg-neutral-50 px-3 py-1 text-xs text-gray-500"
                >
                    {label}
                </span>
            </span>
        );
    }

    return (
        <span
            className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-gray-500 shadow-sm"
        >
            {label}
        </span>
    );
}
