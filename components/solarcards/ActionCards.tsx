"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { playerActions, type PlayerAction } from "@/data/solarcards-rules";
import { SectionHeading } from "./SectionHeading";
import { CelestialBody } from "./CelestialBody";

const actionAccents: Record<PlayerAction["id"], { hex: string; text: string }> = {
  summon: { hex: "#79E8FF", text: "text-moon" },
  attack: { hex: "#FF8A24", text: "text-flare" },
  discard: { hex: "#A276FF", text: "text-planet" },
};

function ActionIcon({ actionId }: { actionId: PlayerAction["id"] }) {
  if (actionId === "summon") {
    // A card entering orbit
    return (
      <div className="relative flex h-24 items-center justify-center" aria-hidden="true">
        <span className="absolute h-20 w-20 rounded-full border-2 border-dashed border-moon/40" />
        <span className="h-14 w-10 -rotate-12 rounded border-2 border-black bg-space-surface shadow-[0_0_18px_rgba(121,232,255,0.4)]" />
      </div>
    );
  }
  if (actionId === "attack") {
    // Two planets colliding
    return (
      <div className="relative flex h-24 items-center justify-center gap-1" aria-hidden="true">
        <CelestialBody variant="earth" size={40} className="translate-x-2" />
        <span className="z-10 h-6 w-6 rounded-full bg-flare blur-[3px]" />
        <CelestialBody variant="dwarf" size={32} className="-translate-x-2" />
      </div>
    );
  }
  // Two cards entering a cosmic portal
  return (
    <div className="relative flex h-24 items-center justify-center" aria-hidden="true">
      <span
        className="absolute h-16 w-16 rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(162,118,255,0.7) 0%, rgba(255,79,163,0.35) 55%, transparent 75%)",
        }}
      />
      <span className="h-12 w-8 -rotate-[20deg] translate-x-1 rounded border-2 border-black bg-space-surface" />
      <span className="h-12 w-8 rotate-[14deg] -translate-x-1 scale-90 rounded border-2 border-black bg-space-navy opacity-80" />
    </div>
  );
}

export function ActionCards() {
  const [expandedAction, setExpandedAction] = useState<PlayerAction["id"] | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="actions" className="relative mx-auto max-w-6xl scroll-mt-36 px-4 py-24 sm:px-6">
      <SectionHeading
        chapter="MISSION 06"
        heading="Choose Your Move"
        question="What can I do?"
        accentClass="text-flare"
      />

      <p className="mx-auto mt-6 max-w-[50ch] text-center font-semibold text-ink-soft">
        One action per turn. Pick a card to read the fine print.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {playerActions.map((action) => {
          const accent = actionAccents[action.id];
          const expanded = expandedAction === action.id;
          return (
            <motion.div
              key={action.id}
              whileHover={reducedMotion ? undefined : { y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative rounded-2xl border-2 border-black bg-space-navy p-2 shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
            >
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: `${accent.hex}44`, background: `linear-gradient(180deg, ${accent.hex}0f, transparent 40%)` }}
              >
                <ActionIcon actionId={action.id} />
                <h3 className={`display-heading mt-2 text-center text-3xl ${accent.text}`}>
                  {action.name.toUpperCase()}
                </h3>
                <p className="mt-3 min-h-12 text-center text-sm font-semibold text-ink-soft">
                  {action.summary}
                </p>

                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`action-detail-${action.id}`}
                  onClick={() =>
                    setExpandedAction((current) => (current === action.id ? null : action.id))
                  }
                  className="mx-auto mt-4 flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold text-ink transition-colors hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
                >
                  {expanded ? "Hide details" : "Show details"}
                  <span aria-hidden="true" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                <div
                  id={`action-detail-${action.id}`}
                  hidden={!expanded}
                  className="mt-4 rounded-lg border-l-2 bg-space-black/60 p-4 text-sm text-ink-soft"
                  style={{ borderColor: accent.hex }}
                >
                  {action.detail}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
