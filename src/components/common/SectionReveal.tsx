"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal], main section";

export default function SectionReveal() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;

                    const section = entry.target as HTMLElement;
                    section.dataset.revealState = "visible";
                    observer.unobserve(section);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px",
            },
        );

        const registered = new Set<HTMLElement>();
        const activatedIntros = new Set<HTMLElement>();
        const animationFrames = new Set<number>();

        const activateIntros = (restartAll = false) => {
            const intros = Array.from(
                document.querySelectorAll<HTMLElement>(
                    '[data-reveal="initial"], [data-reveal="hero"]',
                ),
            ).filter(
                (intro) => restartAll || !activatedIntros.has(intro),
            );

            if (intros.length === 0) return;

            for (const intro of intros) {
                intro.classList.remove("page-entrance-active");
                activatedIntros.add(intro);
            }

            // Commit the reset before re-adding the animation class.
            void document.body.offsetWidth;

            for (const intro of intros) {
                intro.classList.add("page-entrance-active");
            }
        };

        const revealAfterPaint = (section: HTMLElement) => {
            const firstFrame = requestAnimationFrame(() => {
                animationFrames.delete(firstFrame);

                const secondFrame = requestAnimationFrame(() => {
                    animationFrames.delete(secondFrame);
                    section.dataset.revealState = "visible";
                });

                animationFrames.add(secondFrame);
            });

            animationFrames.add(firstFrame);
        };

        const registerSections = () => {
            const sections = Array.from(
                document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
            ).filter((section) => {
                if (
                    section.dataset.reveal === "initial" ||
                    section.dataset.reveal === "hero"
                ) {
                    return false;
                }
                if (section.hasAttribute("data-reveal")) return true;
                if (section.closest("[data-reveal]")) return false;
                return !section.querySelector(":scope section");
            });

            for (const [index, section] of sections.entries()) {
                if (registered.has(section)) continue;

                registered.add(section);

                section.classList.add("section-reveal");
                section.dataset.revealState = "pending";

                const alreadyVisible =
                    section.getBoundingClientRect().top <
                    window.innerHeight * 0.92;

                const stagger = (index % 3) * 55;
                section.style.setProperty(
                    "--reveal-delay",
                    `${alreadyVisible ? 140 + stagger : stagger}ms`,
                );

                if (alreadyVisible) {
                    revealAfterPaint(section);
                } else {
                    observer.observe(section);
                }
            }
        };

        const syncReveals = () => {
            activateIntros();
            registerSections();
        };

        syncReveals();

        // App Router content can stream in after this client effect mounts.
        const mutationObserver = new MutationObserver(syncReveals);
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) activateIntros(true);
        };
        window.addEventListener("pageshow", handlePageShow);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
            mutationObserver.disconnect();
            observer.disconnect();
            for (const frame of animationFrames) cancelAnimationFrame(frame);
        };
    }, [pathname]);

    return null;
}
