"use client";
import { useId, useRef, useState, type ReactNode } from "react";
import { LuX } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";
import { useClickAway } from "react-use";

export default function Hint({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const hintRef = useRef<HTMLDivElement>(null);
    const hintId = useId();

    useClickAway(hintRef, () => setOpen(false));

    return (
        <div className="relative flex items-center gap-2" ref={hintRef}>
            {/* Info button */}
            <button
                type="button"
                aria-expanded={open}
                aria-controls={open ? hintId : undefined}
                onClick={() => setOpen((v) => !v)}
                className="hint-icon-button inline-flex h-4 w-4 items-center justify-center rounded-full bg-white p-0 text-orange shadow transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
            >
                <FaInfoCircle className="h-4 w-4" aria-hidden />
                <span className="sr-only">More info</span>
            </button>

            {/* Hint box */}
            {open ? (
                <div
                    id={hintId}
                    className="absolute left-1/2 top-full z-50 mt-2 w-64 max-w-[90vw] -translate-x-1/2 rounded-lg border border-gray-100 bg-white p-3 text-xs text-gray-700 shadow-xl ring-1 ring-black/5"
                >
                    <button
                        type="button"
                        aria-label="Close hint"
                        onClick={() => setOpen(false)}
                        className="hint-icon-button absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-transparent p-0 text-gray-500 shadow-none hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <LuX className="h-3 w-3" aria-hidden />
                    </button>

                    <div className="mb-1 font-semibold text-gray-900">Hint</div>
                    <div className="font-medium text-gray-700">{children}</div>
                </div>
            ) : null}
        </div>
    );
}
