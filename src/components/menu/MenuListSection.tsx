import MenuItem from "./MenuItem";
import type { TMenuItem } from "@/lib/schema";
import FrameSection from "@/components/common/FrameSection";

type Props = {
    title: string;
    items: TMenuItem[];
    frameClass?: "center-frame" | "left-frame" | "right-frame";
    groupByName?: boolean;
    showOptions?: boolean;
    extraTop?: React.ReactNode;
    extraBottom?: React.ReactNode;
    /** when items > splitThreshold, auto 2-col layout on xl+ */
    splitThreshold?: number; // default 6
    splitCols?: 2;
    /** where to render extraTop in split mode */
    extraTopPlacement?: "span" | "left"; // default "span"
};

function groupBy(items: TMenuItem[], key: (i: TMenuItem) => string) {
    const map = new Map<string, TMenuItem[]>();
    for (const it of items) {
        const k = key(it);
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push(it);
    }
    return Array.from(map.values());
}

function splitInto<T>(arr: T[], cols: number) {
    const out: T[][] = Array.from({ length: cols }, () => []);
    const mid = Math.ceil(arr.length / cols);
    // left/right split that keeps order: first half goes left, second goes right
    out[0] = arr.slice(0, mid);
    out[1] = arr.slice(mid);
    return out;
}

export default function MenuListSection({
    title,
    items,
    frameClass,
    groupByName = false,
    showOptions = true,
    extraTop,
    extraBottom,
    splitThreshold = 6,
    splitCols = 2,
    extraTopPlacement = "span",
}: Props) {
    if (!items?.length) return null;

    const groups = groupByName
        ? groupBy(items, (i) => i.name ?? "item")
        : items.map((i) => [i]);

    const shouldSplit = groups.length > splitThreshold && splitCols === 2;
    const [left, right] = shouldSplit ? splitInto(groups, 2) : [groups, []];

    const topContent = (
        <div
            className={`${
                extraTopPlacement === "span" ? "xl:col-span-2" : "col-span-1"
            }`}
        >
            <div
                className={`my-2 text-center text-orange italic font-semibold w-full md:w-3/4 xl:w-3/5 mx-auto`}
            >
                {extraTop}
            </div>
            <hr className="w-full" />
        </div>
    );

    return (
        <FrameSection
            title={title}
            frameClass={frameClass}
            className="w-full"
        >
            {/* Single-column mode (all breakpoints) when not splitting */}
            {!shouldSplit && (
                <>
                    {extraTop ? topContent : null}
                    <div className="grid grid-cols-1 gap-5 py-4">
                        {groups.map((group, idx) => (
                            <div
                                key={
                                    (group[0].id ?? group[0].name ?? "item") +
                                    "-" +
                                    idx
                                }
                            >
                                <MenuItem
                                    group={group}
                                    showOptions={showOptions}
                                />
                                {idx !== groups.length - 1 && (
                                    <hr className="w-full" />
                                )}
                            </div>
                        ))}
                    </div>

                    {extraBottom && (
                        <div className="xl:col-span-2">{extraBottom}</div>
                    )}
                </>
            )}

            {/* Split mode: single column on <=lg, two columns on xl+ */}
            {shouldSplit && (
                <>
                    {/* Small/medium screens: keep normal single list */}
                    <div className="xl:hidden">
                        {extraTop ? topContent : null}
                        <div className="grid grid-cols-1 gap-6 sm:gap-5 py-4">
                            {groups.map((group, idx) => (
                                <div
                                    key={
                                        (group[0].id ??
                                            group[0].name ??
                                            "item") +
                                        "-" +
                                        idx
                                    }
                                >
                                    <MenuItem
                                        group={group}
                                        showOptions={showOptions}
                                    />
                                    {idx !== groups.length - 1 && (
                                        <hr className="w-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                        {extraBottom && (
                            <div className="xl:col-span-2">{extraBottom}</div>
                        )}
                    </div>

                    <div className="hidden xl:relative xl:grid xl:grid-cols-2">
                        {/* gradient vertical divider */}
                        <div
                            className="hidden xl:block absolute top-[10%] bottom-0 left-1/2 -translate-x-1/2 w-px opacity-90"
                            style={{
                                background:
                                    "linear-gradient(to bottom, color-mix(in oklab, var(--green) 0%, transparent), color-mix(in oklab, var(--green) 60%, transparent), color-mix(in oklab, var(--green) 0%, transparent))",
                            }}
                        />

                        {/* If top placement is span, it will cover both columns */}
                        {extraTop && extraTopPlacement === "span"
                            ? topContent
                            : null}

                        {/* Left column */}
                        <div className="pr-6 md:pr-8">
                            {extraTop && extraTopPlacement === "left"
                                ? topContent
                                : null}
                            <div className="grid grid-cols-1 gap-5 py-4">
                                {left.map((group, idx) => (
                                    <div
                                        key={
                                            (group[0].id ??
                                                group[0].name ??
                                                "item") +
                                            "-L-" +
                                            idx
                                        }
                                    >
                                        <MenuItem
                                            group={group}
                                            showOptions={showOptions}
                                        />
                                        {idx !== left.length - 1 && (
                                            <hr className="w-full" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="pl-6 md:pl-8">
                            <div className="grid grid-cols-1 gap-5 py-4">
                                {right.map((group, idx) => (
                                    <div
                                        key={
                                            (group[0].id ??
                                                group[0].name ??
                                                "item") +
                                            "-R-" +
                                            idx
                                        }
                                    >
                                        <MenuItem
                                            group={group}
                                            showOptions={showOptions}
                                        />
                                        {idx !== right.length - 1 && (
                                            <hr className="w-full" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom image/text (spans both) */}
                        {extraBottom && (
                            <div className="xl:col-span-2">{extraBottom}</div>
                        )}
                    </div>
                </>
            )}
        </FrameSection>
    );
}
