"use client";

import { useEffect, useState } from "react";
import { missionNavItems } from "@/data/solarcards-rules";

/** Sticky mission progress bar under the main nav. Tracks the active section. */
export function MissionControl() {
  const [activeId, setActiveId] = useState(missionNavItems[0].sectionId);

  useEffect(() => {
    const watchedSections = missionNavItems
      .map((navItem) => document.getElementById(navItem.sectionId))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (observedEntries) => {
        // Topmost visible section wins so the indicator never jumps backwards mid-scroll
        const visible = observedEntries
          .filter((observedEntry) => observedEntry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );

    watchedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = missionNavItems.findIndex(
    (navItem) => navItem.sectionId === activeId,
  );
  const progress =
    missionNavItems.length > 1
      ? Math.max(activeIndex, 0) / (missionNavItems.length - 1)
      : 0;

  return (
    <div className="sticky top-16 z-40 border-b border-white/10 bg-space-navy/90 backdrop-blur-md">
      <nav aria-label="Mission progress" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-flare via-sun to-moon transition-[width] duration-500"
            style={{ width: `${progress * 100}%` }}
          />
          <ul className="flex snap-x snap-mandatory gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {missionNavItems.map((navItem) => {
              const isActive = navItem.sectionId === activeId;
              return (
                <li key={navItem.sectionId} className="snap-start">
                  <a
                    href={navItem.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sun ${
                      isActive ? "text-sun" : "text-ink-muted hover:text-ink-soft"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full transition-colors ${
                        isActive ? "bg-sun shadow-[0_0_8px_rgba(255,216,74,0.8)]" : "bg-white/25"
                      }`}
                    />
                    {navItem.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
