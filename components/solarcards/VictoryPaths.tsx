"use client";

import {
  gameModes,
  cardCategories,
  scoringValues,
  scoreVictoryExplanation,
  scoreExample,
  scoreExampleContext,
} from "@/data/solarcards-rules";
import { cardArt } from "@/data/solarcards-assets";
import { useGameMode } from "./GameModeContext";
import { SectionHeading } from "./SectionHeading";
import { SolarCardImage } from "./SolarCardImage";
import { CelestialBody } from "./CelestialBody";

export function VictoryPaths() {
  const { mode } = useGameMode();
  const battleMode = gameModes[mode];

  return (
    <section id="victory" className="relative scroll-mt-36 overflow-hidden py-24">
      {/* Warm light on the instant-win side, cool on the score side */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 22% 45%, rgba(255,216,74,0.1), transparent 65%), radial-gradient(ellipse 50% 60% at 78% 45%, rgba(63,158,255,0.1), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          chapter="FINAL MISSION"
          heading="Two Paths to Victory"
          question="How do I win?"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Path 1: instant victory with the selected objective */}
          <article className="relative overflow-hidden rounded-3xl border-2 border-sun/40 bg-space-navy p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,138,36,0.22), transparent 65%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-6 text-center">
              <p className="font-display text-sm tracking-[0.25em] text-flare">PATH 1</p>
              <span className="rounded-full bg-sun px-6 py-2 font-display text-xl text-space-black shadow-[0_0_30px_rgba(255,216,74,0.5)]">
                INSTANT WIN
              </span>

              <SolarCardImage
                src={mode === "star" ? cardArt.starSunYoung : cardArt.galaxyMilkyWay}
                alt={
                  mode === "star"
                    ? "Sun (Young) Star card"
                    : "Milky Way Galaxy card"
                }
                width={168}
                prismatic
                className="animate-float"
              />

              <p className="display-heading text-3xl text-ink">
                {battleMode.objective.toUpperCase()}.
              </p>
              <p className="max-w-[40ch] text-sm font-semibold text-ink-soft">
                The moment your {cardCategories[battleMode.objectiveCategory].name.toLowerCase()}{" "}
                hits the table in {battleMode.name}, the game ends and you win.
              </p>
            </div>
          </article>

          {/* Path 2: score victory */}
          <article className="relative overflow-hidden rounded-3xl border-2 border-earth/40 bg-space-navy p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(63,158,255,0.18), transparent 65%)",
              }}
            />
            <div className="relative flex flex-col gap-6">
              <div className="text-center">
                <p className="font-display text-sm tracking-[0.25em] text-earth">PATH 2</p>
                <h3 className="display-heading mt-2 text-3xl text-ink">SCORE VICTORY</h3>
              </div>

              <p className="mx-auto max-w-[45ch] text-center text-sm font-semibold text-ink-soft">
                {scoreVictoryExplanation}
              </p>

              <ul className="mx-auto grid w-full max-w-xs gap-2" aria-label="Card point values">
                {scoringValues.map((scoring) => {
                  const category = cardCategories[scoring.categoryId];
                  return (
                    <li
                      key={scoring.categoryId}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-space-black/60 px-4 py-2"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-ink-soft">
                        <CelestialBody
                          variant={scoring.categoryId === "planet" ? "earth" : scoring.categoryId}
                          size={18}
                        />
                        {category.name}
                      </span>
                      <span className="font-display text-base" style={{ color: category.hex }}>
                        +{scoring.points}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>

        {/* Worked score battle */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-space-black p-6 sm:p-8">
          <h3 className="text-center font-display text-lg tracking-wide text-ink">
            SCORE BATTLE EXAMPLE
          </h3>
          <p className="mt-2 text-center text-sm font-semibold text-ink-muted">
            {scoreExampleContext}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {scoreExample.map((player) => (
              <div
                key={player.name}
                className={`rounded-2xl border p-5 ${
                  player.winner ? "border-sun/60 bg-sun/5" : "border-white/10 bg-space-navy"
                }`}
              >
                <p className="font-display text-base text-ink">{player.name.toUpperCase()}</p>
                <ul className="mt-3 grid gap-1.5 text-sm font-semibold text-ink-soft">
                  {player.lines.map((scoreLine) => (
                    <li key={scoreLine.label} className="flex justify-between">
                      <span>{scoreLine.label}</span>
                      <span className="text-ink">= {scoreLine.points}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex justify-between border-t border-white/15 pt-3 font-display">
                  <span className="text-ink-muted">TOTAL</span>
                  <span className={player.winner ? "text-sun" : "text-ink"}>{player.total}</span>
                </p>
                {player.winner ? (
                  <p className="mt-4 rounded-full bg-sun py-2 text-center font-display text-base text-space-black shadow-[0_0_24px_rgba(255,216,74,0.4)]">
                    🏁 PLAYER B WINS
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
