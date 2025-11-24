import clsx from "clsx";
import type { Platform } from "@/lib/notion/platforms";
import PlatformBadge from "./PlatformBadge";

export type PlatformsProps = {
    /** Pass items from Notion mapping later */
    items: Platform[];
    /** Switch between compact icons (mobile) and full pills (desktop) */
    variant?: "compact" | "full";
    /** Alignment of the whole row */
    align?: "left" | "center" | "right" | "between";
    /** Wrap spacing */
    className?: string;
    /** "solid" = vibrant, "subtle" = bordered/ghost style */
    tone?: "solid" | "subtle";
    /** number of items per row on mobile (compact only) */
    rowSize?: number;
};

export default function Platforms({
    items,
    variant = "full",
    align = "center",
    tone = "solid",
    rowSize,
    className,
}: PlatformsProps) {
    const justify =
        align === "left"
            ? "justify-start"
            : align === "right"
            ? "justify-end"
            : "justify-center";

    // Map to literal Tailwind classes so JIT can see them
    const gridColsMap: Record<
        NonNullable<PlatformsProps["rowSize"]>,
        string
    > = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    };

    const useGrid = variant === "compact" && rowSize;

    return (
        <div
            className={clsx(
                "mt-3 overflow-visible",
                useGrid
                    ? clsx(
                          "grid gap-3 sm:gap-4",
                          gridColsMap[rowSize!],
                          // center items inside grid cells
                          "justify-items-center"
                      )
                    : clsx("flex flex-wrap gap-3 sm:gap-4", justify),
                className
            )}
        >
            {items.map((it, i) => (
                <PlatformBadge
                    key={`${it.name}-${i}`}
                    name={it.name}
                    url={it.url!}
                    label={variant === "full" ? it.label : undefined}
                    ariaLabel={it.label}
                    variant={variant}
                    tone={tone}
                    // if you want to center each pill in grid cells on small view:
                    className={useGrid ? "justify-self-center" : undefined}
                />
            ))}
        </div>
    );
}
