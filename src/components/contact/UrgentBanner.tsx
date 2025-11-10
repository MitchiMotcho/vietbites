"use client";
import { LuAlarmClock } from "react-icons/lu";

export default function UrgentBanner() {
    return (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-3">
            <div className="flex-none inline-flex items-center justify-center h-9 w-9 rounded-md bg-amber-500 text-white">
                <LuAlarmClock className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-sm text-amber-900">
                <p className="font-semibold">Urgent requests</p>
                <p className="mt-1 text-xs">
                    Start your subject with{" "}
                    <span className="font-semibold tracking-wider font-mono">
                        &quot;[URGENT] - &quot;
                    </span>{" "}
                    and include a phone number so we can reach you faster.
                </p>
            </div>
        </div>
    );
}
