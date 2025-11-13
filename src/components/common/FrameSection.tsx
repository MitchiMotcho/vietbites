import { PropsWithChildren } from "react";
import clsx from "clsx";

type FrameSectionProps = PropsWithChildren<{
    title: string;
    className?: string;
    frameClass?: "center-frame" | "left-frame" | "right-frame";
    id?: string;
}>;

export default function FrameSection({
    title,
    className,
    frameClass,
    id,
    children,
}: FrameSectionProps) {
    return (
        <section
            id={id}
            className={clsx(
                "bg-cream frame-sharp",
                frameClass,
                "h-full flex flex-col",
                frameClass === "left-frame" && "mt-2",
                className
            )}
        >
            <h2
                className={`frame-heading mb-3 ${
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
