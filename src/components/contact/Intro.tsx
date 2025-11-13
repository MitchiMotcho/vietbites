"use client";
import Link from "next/link";
import { GiBread, GiShoppingBag } from "react-icons/gi";
import UrgentBanner from "./UrgentBanner";
import Tips from "./Tips";

export default function Intro({ className = "" }: { className?: string }) {
    return (
        <aside
            className={
            "rounded-lg bg-white border border-gray-100 shadow-sm p-5 md:p-6 flex flex-col gap-4 w-full max-w-4xl mx-auto" +
            (className ? " " + className : "")
            }
        >
            <UrgentBanner />

            <div>
                <h2 className="text-lg md:text-xl font-semibold text-orange">
                    Need help?
                </h2>
                <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                    Tell us what&apos;s going on and we&apos;ll get back to you
                    within{" "}
                    <span className="font-medium text-gray-900">
                        3-5 business days
                    </span>
                    .
                </p>
            </div>

            <Tips
                items={[
                    {
                        icon: <GiShoppingBag className="h-5 w-5" aria-hidden />,
                        text: (
                            <>
                                Include your{" "}
                                <span className="font-medium text-orange">
                                    order number
                                </span>{" "}
                                if your message is about an order.
                            </>
                        ),
                    },
                    {
                        icon: <GiBread className="h-5 w-5" aria-hidden />,
                        text: (
                            <>
                                For catering/event requests, please add the{" "}
                                <span className="font-medium text-orange">
                                    date
                                </span>
                                ,{" "}
                                <span className="font-medium text-orange">
                                    guest count
                                </span>
                                , and{" "}
                                <span className="font-medium text-orange">
                                    location
                                </span>
                                .
                            </>
                        ),
                    },
                ]}
            />

            <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 hidden lg:block">
                <p className="text-sm font-medium text-gray-800">
                    What to include
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Clear description of the issue or request.</li>
                    <li>Order details when relevant.</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                    Business hours:{" "}
                    <Link
                        href="/location"
                        aria-label="Check our business hours"
                        className="inline-block font-medium text-orange underline transition-transform transform hover:scale-105 ease-in-out duration-300"
                    >
                        Check our hours
                    </Link>
                </p>
            </div>
        </aside>
    );
}
