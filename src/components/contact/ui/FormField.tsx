"use client";
import {
    ReactNode,
    useId,
    cloneElement,
    isValidElement,
    ReactElement,
} from "react";
import Hint from "@/components/contact/ui/Hint";

export default function FormField({
    id,
    label,
    required,
    hint,
    children,
    className,
}: {
    id?: string;
    label: ReactNode;
    required?: boolean;
    hint?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    const autoId = useId();
    const controlId = id || autoId;

    return (
        <div
            className={
                "flex flex-col gap-2" + (className ? ` ${className}` : "")
            }
        >
            <div className="flex items-center gap-2">
                <label
                    htmlFor={controlId}
                    className="font-semibold text-sm mx-1 text-gray-800"
                >
                    {label}{" "}
                    {required ? (
                        <span className="text-red-600">*</span>
                    ) : (
                        <span className="sr-only">(optional)</span>
                    )}
                </label>
                {hint ? <Hint>{hint}</Hint> : null}
            </div>

            {isValidElement(children)
                ? cloneElement(
                      children as ReactElement<any>,
                      {
                          // keep existing props, inject id if missing, and aria-required
                          ...(children as ReactElement<any>).props,
                          id:
                              (children as ReactElement<any>).props?.id ??
                              controlId,
                          "aria-required": required || undefined,
                      } as any
                  )
                : children}
        </div>
    );
}
