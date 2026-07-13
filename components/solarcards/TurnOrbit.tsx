"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { turnPhases } from "@/data/solarcards-rules";
import { solarAssets } from "@/data/solarcards-assets";
import { SectionHeading } from "./SectionHeading";

const phaseAccents = ["#FF4FA3", "#FFD84A", "#3F9EFF", "#79E8FF"];
const phaseShortNames = ["Anomaly", "Action", "Formation", "Draw"];

export function TurnOrbit() {
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((observedEntry) => {
          if (observedEntry.isIntersecting) {
            const stepNumber = Number(
              (observedEntry.target as HTMLElement).dataset.step,
            );
            if (stepNumber) setActiveStep(stepNumber);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    stepRefs.current.forEach((stepBlock) => {
      if (stepBlock) observer.observe(stepBlock);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="your-turn" className="relative scroll-mt-36 overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 40%, rgba(255,138,36,0.1), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          chapter="MISSION 05"
          heading="Every Turn Follows One Orbit"
          question="What happens during my turn?"
        />

        {/* Persistent phase summary. Sticky so the four-step shape never leaves view. */}
        <div className="sticky top-[6.75rem] z-30 mx-auto mt-10 max-w-fit rounded-full border border-white/15 bg-space-black/90 px-2 py-1.5 backdrop-blur-md">
          <ol className="flex items-center gap-1 sm:gap-2">
            {turnPhases.map((phase, phaseIndex) => (
              <li key={phase.step} className="flex items-center gap-1 sm:gap-2">
                <a
                  href={`#turn-step-${phase.step}`}
                  aria-current={activeStep === phase.step ? "step" : undefined}
                  className="flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-sun sm:px-3 sm:text-sm"
                  style={{
                    color: activeStep === phase.step ? phaseAccents[phaseIndex] : "#7F8CAC",
                  }}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full font-display text-[10px]"
                    style={{
                      backgroundColor:
                        activeStep === phase.step ? phaseAccents[phaseIndex] : "rgba(255,255,255,0.1)",
                      color: activeStep === phase.step ? "#03040A" : "#B9C4DF",
                    }}
                  >
                    {phase.step}
                  </span>
                  <span className="hidden sm:inline">{phaseShortNames[phaseIndex]}</span>
                </a>
                {phaseIndex < turnPhases.length - 1 ? (
                  <span aria-hidden="true" className="h-px w-2 bg-white/20 sm:w-4" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Orbit diagram, sticky beside the scrolling steps on desktop */}
          <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-md lg:sticky lg:top-44 lg:block">
            <span
              className="absolute inset-[8%] rounded-full border-2 border-dashed border-white/15"
              style={{
                boxShadow: `0 0 40px ${phaseAccents[activeStep - 1]}22 inset`,
              }}
            />
            <div className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2">
              <Image
                src={solarAssets.sunCharacter}
                alt=""
                width={900}
                height={900}
                className="w-full animate-flare-pulse drop-shadow-[0_0_40px_rgba(255,168,36,0.4)]"
              />
            </div>
            {turnPhases.map((phase, phaseIndex) => {
              const angle = (phaseIndex / turnPhases.length) * Math.PI * 2 - Math.PI / 2;
              const left = 50 + Math.cos(angle) * 42;
              const top = 50 + Math.sin(angle) * 42;
              const isActive = activeStep === phase.step;
              return (
                <div
                  key={phase.step}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
                  }}
                >
                  <div
                    className="flex flex-col items-center gap-1 rounded-xl border-2 bg-space-black px-4 py-3 transition-colors duration-500"
                    style={{
                      borderColor: isActive ? phaseAccents[phaseIndex] : "rgba(255,255,255,0.12)",
                      boxShadow: isActive ? `0 0 28px ${phaseAccents[phaseIndex]}55` : "none",
                    }}
                  >
                    <span className="display-heading text-2xl" style={{ color: phaseAccents[phaseIndex] }}>
                      {phase.step}
                    </span>
                    <span className="font-display text-xs uppercase text-ink">
                      {phaseShortNames[phaseIndex]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step details form the vertical orbit path on mobile */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-[1.35rem] w-0.5 bg-gradient-to-b from-anomaly via-sun to-moon opacity-40 lg:hidden"
            />
            <div className="grid gap-8">
              {turnPhases.map((phase, phaseIndex) => (
                <article
                  key={phase.step}
                  id={`turn-step-${phase.step}`}
                  data-step={phase.step}
                  ref={(stepBlock) => {
                    stepRefs.current[phaseIndex] = stepBlock;
                  }}
                  className={`relative scroll-mt-44 rounded-2xl border p-6 pl-16 transition-colors lg:pl-6 ${
                    activeStep === phase.step
                      ? "border-white/25 bg-space-surface"
                      : "border-white/10 bg-space-navy"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-6 left-2.5 flex h-8 w-8 items-center justify-center rounded-full font-display text-base lg:hidden"
                    style={{ backgroundColor: phaseAccents[phaseIndex], color: "#03040A" }}
                  >
                    {phase.step}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl tracking-wide text-ink">
                      STEP {phase.step} — {phase.name.toUpperCase()}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 font-display text-[10px] tracking-widest ${
                        phase.badge === "REQUIRED"
                          ? "bg-flare/20 text-flare"
                          : "bg-moon/15 text-moon"
                      }`}
                    >
                      {phase.badge}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[55ch] font-semibold text-ink-soft">{phase.summary}</p>
                  {phase.detail ? (
                    <p className="mt-2 max-w-[55ch] text-sm text-ink-muted">{phase.detail}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
