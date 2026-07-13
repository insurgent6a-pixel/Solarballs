"use client";

import { deckCompositions, cardCategories, gameModes } from "@/data/solarcards-rules";
import { cardArt } from "@/data/solarcards-assets";
import { useGameMode } from "./GameModeContext";
import { SectionHeading } from "./SectionHeading";
import { SolarCardImage } from "./SolarCardImage";
import { CelestialBody, type CelestialVariant } from "./CelestialBody";

// Planet cards are blue in the category system; the purple "planet" sphere is reserved for Dwarf Planets
const categoryToVariant: Record<string, CelestialVariant> = {
  moon: "moon",
  dwarf: "dwarf",
  planet: "earth",
  star: "star",
  galaxy: "galaxy",
  anomaly: "anomaly",
};

export function DeckOrbit() {
  const { mode } = useGameMode();
  const deck = deckCompositions[mode];
  const battleMode = gameModes[mode];
  const orbitEntries = deck.entries.filter(
    (entry) => entry.categoryId !== battleMode.objectiveCategory,
  );
  const largestCount = Math.max(...deck.entries.map((entry) => entry.count));

  return (
    <section id="deck" className="relative scroll-mt-36 overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(63,158,255,0.08), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          chapter="MISSION 03"
          heading="Construct Your Deck"
          question="What cards are in my deck?"
          accentClass="text-earth"
        />

        <p className="mx-auto mt-6 max-w-[55ch] text-center font-semibold text-ink-soft">
          {battleMode.name}: {deck.total} cards orbiting one objective.
        </p>

        {/* Orbit diagram. Counts render as numbers plus token clusters, never one element per card. */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-12 hidden aspect-square w-full max-w-xl sm:block"
        >
          <span className="absolute inset-[12%] rounded-full border border-white/10" />
          <span className="absolute inset-[30%] rounded-full border border-dashed border-white/15" />

          {/* Objective at the center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center gap-2">
              <SolarCardImage
                src={mode === "star" ? cardArt.starSunYoung : cardArt.galaxyMilkyWay}
                alt=""
                width={132}
                prismatic
                className="shadow-[0_0_60px_rgba(255,216,74,0.25)]"
              />
              <p className="rounded-full bg-space-black/80 px-3 py-1 text-center font-display text-sm uppercase text-ink">
                1 {cardCategories[battleMode.objectiveCategory].name}
              </p>
            </div>
          </div>

          {orbitEntries.map((entry, entryIndex) => {
            const category = cardCategories[entry.categoryId];
            // Diagonal start angle keeps inner-ring nodes clear of the tall center card
            const angle =
              (entryIndex / orbitEntries.length) * Math.PI * 2 - Math.PI / 2 - Math.PI / 4;
            // Bigger stacks sit on the outer ring so orbit distance mirrors quantity
            const ringRadius = entry.count >= largestCount * 0.5 ? 40 : 28;
            const left = 50 + Math.cos(angle) * ringRadius;
            const top = 50 + Math.sin(angle) * ringRadius;
            const tokenCount = Math.min(Math.ceil(entry.count / 4), 5);

            return (
              <div
                key={entry.categoryId}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
                style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${entryIndex * -1.3}s` }}
              >
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-space-navy/90 px-3 py-2.5 backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    {Array.from({ length: tokenCount }).map((_, tokenIndex) => (
                      <CelestialBody
                        key={tokenIndex}
                        variant={categoryToVariant[entry.categoryId]}
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="font-display text-xs whitespace-nowrap text-ink">
                    <span style={{ color: category.hex }}>{entry.count}</span>{" "}
                    {entry.count === 1 ? category.name : category.plural}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plain composition list: the accessible source of truth for both breakpoints */}
        <div className="mx-auto mt-12 max-w-xl">
          <h3 className="font-display text-lg tracking-wide text-ink">
            {battleMode.name.toUpperCase()} DECK — {deck.total} CARDS
          </h3>
          <ul className="mt-4 grid gap-3">
            {deck.entries.map((entry) => {
              const category = cardCategories[entry.categoryId];
              const barWidth = (entry.count / largestCount) * 100;
              return (
                <li key={entry.categoryId} className="grid grid-cols-[8rem_1fr_2.5rem] items-center gap-3 text-sm">
                  <span className="font-bold text-ink-soft">
                    {entry.count === 1 ? category.name : category.plural}
                  </span>
                  <span aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${barWidth}%`, backgroundColor: category.hex }}
                    />
                  </span>
                  <span className="text-right font-display text-base text-ink">
                    {entry.count}
                  </span>
                </li>
              );
            })}
            <li className="mt-1 grid grid-cols-[8rem_1fr_2.5rem] items-center gap-3 border-t border-white/15 pt-3 text-sm">
              <span className="font-bold text-ink">Total</span>
              <span />
              <span className="text-right font-display text-base text-sun">{deck.total}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
