"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  attackPositionRules,
  defensePositionRules,
  formationCallouts,
} from "@/data/solarcards-rules";
import { SectionHeading } from "./SectionHeading";
import { CelestialBody } from "./CelestialBody";

const STAGE_MS = 2600;

const stageCaptions = [
  "A card stands vertically in Attack Position.",
  "At the end of your turn, rotate it sideways into Defense Position.",
  "Slide the defender over the card you want to protect.",
  "Opponents must now battle the defender first.",
];

function FormationStage({ stage }: { stage: number }) {
  // Defender travels: upright, rotated, then layered over the protected card
  const defenderAnimation =
    stage === 0
      ? { rotate: 0, x: 0, y: 0 }
      : stage === 1
        ? { rotate: 90, x: 0, y: 0 }
        : { rotate: 90, x: -104, y: -6 };

  return (
    <div
      aria-hidden="true"
      className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-space-black sm:h-72"
    >
      <div className="starfield-dense absolute inset-0 opacity-50" />

      <div className="relative flex items-center gap-14">
        {/* Protected card stays put */}
        <div className="relative">
          <div className="h-32 w-22 w-[5.5rem] rounded-lg border-2 border-black bg-space-surface p-1.5">
            <div className="flex h-full items-center justify-center rounded bg-space-navy">
              <CelestialBody variant="star" size={44} />
            </div>
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap uppercase tracking-wider text-ink-muted">
            Protected
          </span>
        </div>

        {/* Defender rotates and covers it */}
        <motion.div
          animate={defenderAnimation}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
          className="relative z-10 h-32 w-[5.5rem] rounded-lg border-2 border-moon/70 bg-space-surface p-1.5 shadow-[0_0_24px_rgba(121,232,255,0.3)]"
        >
          <div className="flex h-full items-center justify-center rounded bg-space-navy">
            <CelestialBody variant="moon" size={40} />
          </div>
        </motion.div>
      </div>

      {/* Opponent attack telegraph */}
      <motion.div
        initial={false}
        animate={{ opacity: stage === 3 ? 1 : 0, y: stage === 3 ? 0 : -30 }}
        transition={{ duration: 0.6 }}
        className="absolute top-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <div className="h-20 w-14 rotate-3 rounded-lg border-2 border-anomaly/80 bg-space-surface p-1 shadow-[0_0_20px_rgba(255,79,163,0.4)]">
          <div className="flex h-full items-center justify-center rounded bg-space-navy">
            <CelestialBody variant="anomaly" size={26} />
          </div>
        </div>
        <svg width="20" height="34" viewBox="0 0 20 34" fill="none">
          <path d="M10 0v26M3 20l7 8 7-8" stroke="#FF4FA3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}

export function BattlefieldDiagram() {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reducedMotion || !playing) return;
    const advance = setInterval(() => {
      setStage((current) => {
        if (current >= stageCaptions.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, STAGE_MS);
    return () => clearInterval(advance);
  }, [playing, reducedMotion]);

  const replay = () => {
    setStage(0);
    setPlaying(true);
  };

  const shownStage = reducedMotion ? stageCaptions.length - 1 : stage;

  return (
    <section id="formation" className="relative scroll-mt-36 overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 55%, rgba(121,232,255,0.07), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          chapter="MISSION 07"
          heading="Control Your Formation"
          question="How do attack and defense work?"
          accentClass="text-moon"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <FormationStage stage={shownStage} />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="text-sm font-semibold text-ink-soft">
                <span className="font-display text-moon">{shownStage + 1}/4</span>{" "}
                {stageCaptions[shownStage]}
              </p>
              {reducedMotion ? null : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPlaying((wasPlaying) => !wasPlaying)}
                    className="min-h-11 rounded-full border border-white/20 px-4 text-sm font-bold text-ink hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
                  >
                    {playing ? "Pause" : "Resume"}
                  </button>
                  <button
                    type="button"
                    onClick={replay}
                    className="min-h-11 rounded-full border border-moon/50 px-4 text-sm font-bold text-moon hover:border-moon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon"
                  >
                    Replay
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5">
            <article className="rounded-2xl border border-flare/30 bg-space-navy p-6">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-9 w-6 rounded border-2 border-flare bg-space-surface" />
                <h3 className="font-display text-lg tracking-wide text-flare">ATTACK POSITION</h3>
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-ink-soft">
                {attackPositionRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span aria-hidden="true" className="text-flare">▸</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-moon/30 bg-space-navy p-6">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-6 w-9 rounded border-2 border-moon bg-space-surface" />
                <h3 className="font-display text-lg tracking-wide text-moon">DEFENSE POSITION</h3>
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-ink-soft">
                {defensePositionRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span aria-hidden="true" className="text-moon">▸</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {formationCallouts.map((callout) => (
            <p key={callout} className="rounded-xl border-l-4 border-sun bg-sun/10 p-4 text-sm font-bold text-ink">
              {callout}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
