"use client";
import { useRef, useState, type ReactNode } from "react";
import { LuInfo, LuX } from "react-icons/lu";
import { useClickAway } from "react-use";

export default function Hint({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const hintRef = useRef<HTMLDivElement>(null);

    useClickAway(hintRef, () => setOpen(false));

    return (
        <div className="relative flex items-center gap-2" ref={hintRef}>
            {/* Info button */}
            <div
                role="button"
                aria-expanded={open}
                aria-controls="hint-content"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 shadow transition ease-in-out duration-300 cursor-pointer"
            >
                <LuInfo className="h-4 w-4" aria-hidden />
                <span className="sr-only">More info</span>
            </div>

            {/* Hint box */}
            <div
                id="hint-content"
                aria-hidden={!open}
                className={`absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-100 bg-white p-3 text-xs text-gray-700 shadow-xl ring-1 ring-black/5 
                            transition-all duration-300 ease-in-out z-99
                            ${
                                open
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                            }`
                        }
            >
                {/* Close button */}
                <div
                    role="button"
                    aria-label="Close hint"
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="absolute top-2 right-2 inline-flex items-center justify-center h-5 w-5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                    <LuX className="h-3 w-3" aria-hidden />
                </div>

                <div className="font-medium text-gray-900 mb-1">Hint</div>
                <div className="text-gray-600">{children}</div>
            </div>
        </div>
    );
}
