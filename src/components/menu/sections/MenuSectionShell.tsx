import { PropsWithChildren } from "react";
import clsx from "clsx";

type MenuSectionShellProps = PropsWithChildren<{
    title: string;
    className?: string;
    frameClass?: "center-frame" | "left-frame" | "right-frame";
}>;

export default function MenuSectionShell({
    title,
    className,
    frameClass,
    children,
}: MenuSectionShellProps) {
    return (
        <section
            className={clsx(
                "bg-cream frame-sharp",
                frameClass,
                "px-4 pb-6 pt-0 md:px-6 md:pb-7 md:pt-0",
                "h-full flex flex-col",
                frameClass === "left-frame" && "mt-2",
                className
            )}
        >
            <h2
                className={`menu-heading mb-3 ${
                    frameClass === "center-frame"
                        ? "text-center mx-auto text-2xl lg:text-3xl"
                        : "text-xl"
                } font-heading  font-extrabold text-orange`}
            >
                {title}
            </h2>

            <div className="flex-1">{children}</div>
        </section>
    );
}
