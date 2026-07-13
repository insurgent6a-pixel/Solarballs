"use client";

import { useState } from "react";
import { setupSteps, setupCallout } from "@/data/solarcards-rules";
import { SectionHeading } from "./SectionHeading";

type TableZoneId = "opponent" | "discard" | "play" | "deck" | "hand";

interface TableZone {
  id: TableZoneId;
  label: string;
  hint: string;
}

const tableZones: TableZone[] = [
  { id: "opponent", label: "Opponent Area", hint: "Your rival's cards face you from across the table." },
  { id: "discard", label: "Discard Pile", hint: "Defeated and discarded cards go here, on your left." },
  { id: "play", label: "Play Area", hint: "Summoned cards live here. Only these cards count as in play." },
  { id: "deck", label: "Your Deck", hint: "Draw from here, on your right." },
  { id: "hand", label: "Your Hand", hint: "Five cards, hidden from rivals. Not yet in play." },
];

const zoneHighlight = "border-sun bg-sun/10 shadow-[0_0_24px_rgba(255,216,74,0.25)]";
const zoneIdle = "border-white/15 bg-space-surface/60";

function ZoneCardStack({ count, faceDown = false }: { count: number; faceDown?: boolean }) {
  return (
    <div aria-hidden="true" className="flex -space-x-4">
      {Array.from({ length: count }).map((_, cardIndex) => (
        <span
          key={cardIndex}
          className={`h-10 w-7 rounded border-2 border-black shadow-[0_3px_8px_rgba(0,0,0,0.5)] sm:h-12 sm:w-8 ${
            faceDown ? "bg-gradient-to-br from-space-surface to-space-navy" : "bg-space-navy"
          }`}
          style={{ transform: `rotate(${(cardIndex - count / 2) * 4}deg)` }}
        />
      ))}
    </div>
  );
}

export function BattlefieldSetup() {
  const [activeZone, setActiveZone] = useState<TableZoneId | null>(null);

  const zoneClasses = (zoneId: TableZoneId) =>
    `flex min-h-11 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 transition-colors sm:p-4 ${
      activeZone === zoneId ? zoneHighlight : zoneIdle
    }`;

  const labelButton = (zone: TableZone) => (
    <button
      key={zone.id}
      type="button"
      onMouseEnter={() => setActiveZone(zone.id)}
      onMouseLeave={() => setActiveZone(null)}
      onFocus={() => setActiveZone(zone.id)}
      onBlur={() => setActiveZone(null)}
      onClick={() => setActiveZone((current) => (current === zone.id ? null : zone.id))}
      aria-pressed={activeZone === zone.id}
      className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun ${
        activeZone === zone.id
          ? "border-sun text-sun"
          : "border-white/20 text-ink-soft hover:border-white/40 hover:text-ink"
      }`}
    >
      {zone.label}
    </button>
  );

  return (
    <section id="setup" className="relative mx-auto max-w-6xl scroll-mt-36 px-4 py-24 sm:px-6">
      <SectionHeading
        chapter="MISSION 04"
        heading="Set the Table"
        question="Where does everything go?"
        accentClass="text-planet"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        {/* Top-down table view */}
        <div className="rounded-3xl border border-white/10 bg-space-black p-4 sm:p-6">
          <div className="grid gap-3">
            <div className={zoneClasses("opponent")}>
              <ZoneCardStack count={3} faceDown />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeZone === "opponent" ? "text-sun animate-pulse" : "text-ink-muted"}`}>
                Opponent Area
              </span>
            </div>

            <div className="grid grid-cols-[1fr_2fr_1fr] gap-3">
              <div className={zoneClasses("discard")}>
                <ZoneCardStack count={2} />
                <span className={`text-center text-xs font-bold uppercase tracking-wider ${activeZone === "discard" ? "text-sun animate-pulse" : "text-ink-muted"}`}>
                  Discard
                </span>
              </div>
              <div className={zoneClasses("play")}>
                <ZoneCardStack count={4} />
                <span className={`text-center text-xs font-bold uppercase tracking-wider ${activeZone === "play" ? "text-sun animate-pulse" : "text-ink-muted"}`}>
                  Play Area
                </span>
              </div>
              <div className={zoneClasses("deck")}>
                <ZoneCardStack count={2} faceDown />
                <span className={`text-center text-xs font-bold uppercase tracking-wider ${activeZone === "deck" ? "text-sun animate-pulse" : "text-ink-muted"}`}>
                  Deck
                </span>
              </div>
            </div>

            <div className={zoneClasses("hand")}>
              <ZoneCardStack count={5} />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeZone === "hand" ? "text-sun animate-pulse" : "text-ink-muted"}`}>
                Your Hand — 5 Cards
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {tableZones.map(labelButton)}
          </div>
          <p className="mt-3 min-h-10 text-center text-sm font-semibold text-ink-soft">
            {activeZone
              ? tableZones.find((zone) => zone.id === activeZone)?.hint
              : "Hover or tap a label to spot each area."}
          </p>
        </div>

        {/* Setup steps */}
        <div>
          <h3 className="font-display text-xl tracking-wide text-ink">SETUP STEPS</h3>
          <ol className="mt-5 grid gap-3">
            {setupSteps.map((setupStep) => (
              <li key={setupStep.step} className="flex items-start gap-4 rounded-xl border border-white/10 bg-space-navy p-4">
                <span className="display-heading flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-planet/20 text-lg text-planet">
                  {setupStep.step}
                </span>
                <p className="pt-1 text-sm font-semibold text-ink-soft">{setupStep.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 rounded-xl border-l-4 border-sun bg-sun/10 p-4 text-sm font-bold text-ink">
            {setupCallout}
          </p>
        </div>
      </div>
    </section>
  );
}
