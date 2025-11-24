"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    max?: number;
    onCountChange?: (count: number) => void;
    onValidityChange?: (overLimit: boolean) => void;
};

export default function TextArea({
    id,
    className,
    value,
    onChange,
    max = 5000,
    onCountChange,
    onValidityChange,
    ...props
}: Props) {
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const initialCount = (() => {
        if (typeof value === "string") return value.length;
        if (typeof value === "number") return String(value).length;
        return 0;
    })();

    const [count, setCount] = useState<number>(initialCount);
    const over = count > max;

    // keep count in sync for controlled usage
    useEffect(() => {
        if (typeof value === "string") {
            setCount(value.length);
            onCountChange?.(value.length);
            onValidityChange?.(value.length > max);
        }
    }, [value, max, onCountChange, onValidityChange]);

    // for uncontrolled initial value
    useEffect(() => {
        if (value === undefined && ref.current) {
            const len = ref.current.value.length;
            setCount(len);
            onCountChange?.(len);
            onValidityChange?.(len > max);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const len = e.target.value.length;
        setCount(len);
        onCountChange?.(len);
        onValidityChange?.(len > max);
        onChange?.(e);
    };

    return (
        <div className="relative w-full">
            <textarea
                id={id}
                ref={ref}
                value={value as string}
                onChange={handleChange}
                aria-invalid={over || undefined}
                className={
                    "w-full rounded-md border bg-white px-3 pt-2 pb-6 text-base shadow-sm " +
                    (over
                        ? "border-red-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 "
                        : "border-gray-300 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 ") +
                    (className ? ` ${className}` : "")
                }
                {...props}
            />
            <div
                className={
                    "absolute right-3 bottom-2 select-none text-[10px] sm:text-xs " +
                    (over ? "text-red-600" : "text-gray-500")
                }
            >
                {count}/{max}
            </div>
        </div>
    );
}
