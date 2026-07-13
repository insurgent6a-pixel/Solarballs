"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { quickMoves, quickMovesFooter } from "@/data/solarcards-rules";
import { cardArt } from "@/data/solarcards-assets";
import { SectionHeading } from "./SectionHeading";
import { SolarCardImage } from "./SolarCardImage";

const PHASE_MS = 3200;

const moveAccents = ["text-moon", "text-earth", "text-anomaly", "text-sun"];

const handCardArt = [
  cardArt.moonLuna,
  cardArt.planetJupiter,
  cardArt.planetEarth,
  cardArt.moonEuropa,
  cardArt.anomalyBigBang,
];

/** Looping storyboard: hand, summon, battle, objective. */
function MoveAnimation({ phase }: { phase: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-space-black sm:h-64"
    >
      <div className="starfield-dense absolute inset-0 opacity-60" />

      <AnimatePresence mode="wait">
        {phase === 0 ? (
          <motion.div
            key="draw"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative flex items-end justify-center"
          >
            {[-24, -12, 0, 12, 24].map((angle, cardIndex) => (
              <motion.div
                key={angle}
                initial={{ y: 60, rotate: 0 }}
                animate={{ y: Math.abs(angle) * 0.5, rotate: angle }}
                transition={{ delay: cardIndex * 0.12, type: "spring", stiffness: 160, damping: 14 }}
                className="-mx-3"
                style={{ transformOrigin: "bottom center" }}
              >
                <SolarCardImage src={handCardArt[cardIndex]} alt="" width={64} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        {phase === 1 ? (
          <motion.div key="build" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
            <motion.div
              initial={{ y: 90, scale: 0.7, rotate: -10 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="shadow-[0_0_30px_rgba(121,232,255,0.35)]"
            >
              <SolarCardImage src={cardArt.moonLuna} alt="" width={80} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, delay: 0.4 }}
              className="absolute -inset-3 rounded-xl border-2 border-moon/60"
            />
          </motion.div>
        ) : null}

        {phase === 2 ? (
          <motion.div key="battle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex items-center gap-16">
            <motion.div
              animate={{ x: [0, 26, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 1.4, delay: 0.3 }}
            >
              <SolarCardImage src={cardArt.planetEarth} alt="" width={80} />
            </motion.div>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flare blur-sm"
            />
            <motion.div
              animate={{ x: [0, 14, 60], rotate: [0, -6, -18], opacity: [1, 1, 0.25] }}
              transition={{ duration: 1.5, delay: 0.9 }}
            >
              <SolarCardImage src={cardArt.dwarfPluto} alt="" width={72} />
            </motion.div>
          </motion.div>
        ) : null}

        {phase === 3 ? (
          <motion.div
            key="ascend"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 12 }}
            className="relative"
          >
            <SolarCardImage src={cardArt.starSunYoung} alt="" width={104} prismatic />
            <motion.span
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-6 -z-10 rounded-full bg-sun/20 blur-2xl"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function QuickRules() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const cycle = setInterval(() => setPhase((current) => (current + 1) % 4), PHASE_MS);
    return () => clearInterval(cycle);
  }, [reducedMotion]);

  return (
    <section id="quick-rules" className="relative mx-auto max-w-6xl scroll-mt-36 px-4 py-24 sm:px-6">
      <SectionHeading
        chapter="MISSION 02"
        heading="The Entire Game in Four Moves"
        question="What is the basic game loop?"
        accentClass="text-moon"
      />

      <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {quickMoves.map((move, moveIndex) => {
            const isActive = !reducedMotion && phase === moveIndex;
            return (
              <li
                key={move.number}
                className={`rounded-2xl border p-5 transition-colors ${
                  isActive
                    ? "border-white/30 bg-space-surface"
                    : "border-white/10 bg-space-navy"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`display-heading text-4xl ${moveAccents[moveIndex]} ${isActive ? "" : "opacity-70"}`}
                  >
                    {move.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-wide text-ink">
                      {move.name.toUpperCase()}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-ink-soft">{move.line}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {reducedMotion ? (
          <div className="flex h-56 items-center justify-center rounded-2xl border border-white/10 bg-space-black sm:h-64">
            <SolarCardImage src={cardArt.starSunYoung} alt="" width={104} prismatic />
          </div>
        ) : (
          <MoveAnimation phase={phase} />
        )}
      </div>

      <p className="mt-10 text-center text-base font-bold text-ink-soft">
        {quickMovesFooter}
      </p>
    </section>
  );
}
