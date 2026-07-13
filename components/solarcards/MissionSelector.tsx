"use client";

import { motion, useReducedMotion } from "motion/react";
import { gameModes, type GameModeId } from "@/data/solarcards-rules";
import { cardArt } from "@/data/solarcards-assets";
import { useGameMode } from "./GameModeContext";
import { SectionHeading } from "./SectionHeading";
import { SolarCardImage } from "./SolarCardImage";

const portalStyles: Record<GameModeId, { glow: string; ring: string; particles: string }> = {
  star: {
    glow: "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,138,36,0.35), rgba(255,216,74,0.12) 55%, transparent 75%)",
    ring: "border-sun/70",
    particles: "bg-sun",
  },
  galaxy: {
    glow: "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(63,158,255,0.3), rgba(162,118,255,0.16) 55%, transparent 75%)",
    ring: "border-planet/70",
    particles: "bg-galaxy",
  },
};

export function MissionSelector() {
  const { mode, setMode } = useGameMode();
  const reducedMotion = useReducedMotion();

  return (
    <section id="mission" className="relative mx-auto max-w-6xl scroll-mt-36 px-4 py-24 sm:px-6">
      <SectionHeading
        chapter="MISSION 01"
        heading="Choose Your Battle"
        question="What type of game am I playing?"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {(Object.keys(gameModes) as GameModeId[]).map((modeId) => {
          const battleMode = gameModes[modeId];
          const selected = mode === modeId;
          const portal = portalStyles[modeId];

          return (
            <motion.button
              key={modeId}
              type="button"
              onClick={() => setMode(modeId)}
              aria-pressed={selected}
              whileHover={reducedMotion ? undefined : { rotateX: 2, rotateY: modeId === "star" ? -2 : 2, y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`group relative overflow-hidden rounded-3xl border-2 p-8 text-left transition-colors sm:p-10 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sun ${
                selected
                  ? `${portal.ring} bg-space-surface shadow-[0_0_50px_rgba(255,216,74,0.12)]`
                  : "border-white/10 bg-space-navy hover:border-white/25"
              }`}
              style={{ perspective: 800 }}
            >
              <div aria-hidden="true" className="absolute inset-0" style={{ background: portal.glow }} />

              {/* Solar / nebula particles */}
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <span className={`absolute left-[15%] top-[30%] h-1 w-1 rounded-full opacity-60 ${portal.particles}`} />
                <span className={`absolute left-[80%] top-[20%] h-1.5 w-1.5 rounded-full opacity-40 ${portal.particles}`} />
                <span className={`absolute left-[60%] top-[65%] h-1 w-1 rounded-full opacity-50 ${portal.particles}`} />
              </div>

              <div className="relative flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`font-display text-xs tracking-[0.25em] uppercase ${modeId === "star" ? "text-flare" : "text-planet"}`}>
                      {battleMode.label}
                    </p>
                    <h3 className="display-heading mt-2 text-4xl text-ink sm:text-5xl">
                      {battleMode.name.toUpperCase()}
                    </h3>
                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      selected
                        ? "border-sun bg-sun text-space-black"
                        : "border-white/25 text-transparent"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="sr-only">{selected ? "Selected" : "Not selected"}</span>
                  </span>
                </div>

                {/* Objective card the energy flows into */}
                <div className="flex items-center gap-6">
                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : selected
                          ? { scale: [1, 1.06, 1] }
                          : { scale: 1 }
                    }
                    transition={{ duration: 2.4, repeat: selected ? Infinity : 0, ease: "easeInOut" }}
                    className="relative shrink-0"
                  >
                    <SolarCardImage
                      src={modeId === "star" ? cardArt.starSunYoung : cardArt.galaxyMilkyWay}
                      alt={
                        modeId === "star"
                          ? "Sun (Young) Star card, the Star Game objective"
                          : "Milky Way Galaxy card, the Galaxy Game objective"
                      }
                      width={modeId === "galaxy" ? 132 : 120}
                      prismatic={selected}
                    />
                  </motion.div>

                  <dl className="grid flex-1 gap-2 text-sm">
                    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                      <dt className="font-bold text-ink-muted">Time</dt>
                      <dd className="font-bold text-ink">{battleMode.duration}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                      <dt className="font-bold text-ink-muted">Deck</dt>
                      <dd className="font-bold text-ink">{battleMode.deckSize} cards</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold text-ink-muted">Objective</dt>
                      <dd className={`font-bold ${modeId === "star" ? "text-sun" : "text-galaxy"}`}>
                        {battleMode.objective}
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className={`font-display text-sm ${selected ? "text-sun" : "text-ink-muted"}`}>
                  {selected ? "✓ Mission selected" : "Select this mission"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">
        Your selection updates the deck builder and victory sections below.
      </p>
    </section>
  );
}
