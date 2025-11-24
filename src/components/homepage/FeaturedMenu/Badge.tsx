type BadgeProps = { note?: string };

export default function Badge({ note }: BadgeProps) {
    if (!note) return null;

    const normalized = note.toUpperCase();

    if (normalized === "HIGHLIGHT") {
        return (
            <span
                className="inline-flex items-center gap-1 rounded-full bg-green-100/90 text-green-700 border border-green-300 px-2 py-0.5 text-xs font-semibold shadow-sm"
                aria-label="Popular item"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden
                >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                </svg>
                Popular
            </span>
        );
    }

    if (normalized === "NEW") {
        return (
            <span
                className="inline-flex items-center gap-1 rounded-full bg-orange-100/90 text-orange-700 border border-orange-300 px-2 py-0.5 text-xs font-semibold shadow-sm"
                aria-label="New item"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden
                >
                    <path d="M12 2a1 1 0 0 1 1 1v5.05l4.24-2.45a1 1 0 1 1 1 1.73L14 9.78l4.24 2.45a1 1 0 1 1-1 1.73L13 11.95V17a1 1 0 1 1-2 0v-5.05l-4.24 2.45a1 1 0 1 1-1-1.73L10 9.78 5.76 7.33a1 1 0 1 1 1-1.73L11 8.05V3a1 1 0 0 1 1-1z" />
                </svg>
                New Arrival
            </span>
        );
    }

    // Fallback custom notes
    return (
        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 text-xs font-semibold shadow-sm">
            {note}
        </span>
    );
}
