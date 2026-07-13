"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "motion/react";
import { heroContent } from "@/data/solarcards-rules";
import { solarAssets, cardArt } from "@/data/solarcards-assets";
import { CelestialBody } from "./CelestialBody";
import { SolarCardImage } from "./SolarCardImage";

export function SolarHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  // Far layer drifts less than near layer for depth
  const sunX = useTransform(springX, (v) => v * 10);
  const sunY = useTransform(springY, (v) => v * 8);
  const midX = useTransform(springX, (v) => v * 22);
  const midY = useTransform(springY, (v) => v * 16);
  const cardX = useTransform(springX, (v) => v * 36);
  const cardY = useTransform(springY, (v) => v * 26);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const pushScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const pushY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      className="starfield relative flex min-h-svh items-center justify-center overflow-hidden"
      aria-label="SolarCards Battle Mode introduction"
    >
      {/* Nebula wash behind everything */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 110%, rgba(255,138,36,0.18), transparent 60%), radial-gradient(ellipse 45% 35% at 15% 20%, rgba(63,158,255,0.14), transparent 70%), radial-gradient(ellipse 40% 30% at 88% 30%, rgba(162,118,255,0.14), transparent 70%)",
        }}
      />

      {/* Orbital trail arcing behind the heading */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-64 w-full -translate-y-1/2 opacity-50"
        viewBox="0 0 1440 260"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 210 C 360 40, 1080 40, 1440 210"
          stroke="url(#orbitTrail)"
          strokeWidth="2.5"
        />
        <defs>
          <linearGradient id="orbitTrail" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8A24" stopOpacity="0" />
            <stop offset="0.35" stopColor="#FFD84A" />
            <stop offset="0.65" stopColor="#79E8FF" />
            <stop offset="1" stopColor="#3F9EFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Giant Sun character rising behind the title */}
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { x: sunX, y: sunY }}
        className="pointer-events-none absolute left-1/2 top-[8%] w-[min(78vw,620px)] -translate-x-1/2 animate-flare-pulse"
      >
        <Image
          src={solarAssets.sunCharacter}
          alt=""
          width={900}
          height={900}
          priority
          className="w-full drop-shadow-[0_0_80px_rgba(255,168,36,0.45)]"
        />
      </motion.div>

      {/* Earth and Moon flanking the scene. Hidden on small screens to keep one primary character. */}
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { x: midX, y: midY }}
        className="pointer-events-none absolute hidden sm:block sm:left-[4%] sm:top-[30%] lg:left-[8%]"
      >
        <CelestialBody variant="earth" size={110} className="animate-float" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { x: midX, y: midY }}
        className="pointer-events-none absolute hidden sm:block sm:right-[5%] sm:bottom-[26%] lg:right-[10%]"
      >
        <CelestialBody
          variant="moon"
          size={64}
          className="animate-float [animation-delay:-3s]"
        />
      </motion.div>

      {/* Small asteroids for depth (desktop only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="absolute left-[18%] top-[68%] h-2 w-3 rotate-12 rounded-full bg-[#5a6480] opacity-70" />
        <span className="absolute left-[76%] top-[18%] h-1.5 w-2.5 -rotate-6 rounded-full bg-[#49536e] opacity-60" />
        <span className="absolute left-[30%] top-[16%] h-1 w-2 rotate-45 rounded-full bg-[#5a6480] opacity-50" />
      </div>

      {/* Foreground floating cards */}
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { x: cardX, y: cardY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[5%] bottom-[12%] hidden -rotate-12 animate-float md:block">
          <SolarCardImage src={cardArt.planetJupiter} alt="" width={128} priority />
        </div>
        <div className="absolute right-[6%] top-[18%] hidden rotate-[9deg] animate-float [animation-delay:-2s] md:block">
          <SolarCardImage src={cardArt.moonLuna} alt="" width={116} priority />
        </div>
        <div className="absolute right-[19%] bottom-[8%] hidden rotate-6 animate-float [animation-delay:-4s] lg:block">
          <SolarCardImage src={cardArt.starSunYoung} alt="" width={132} prismatic priority />
        </div>
        <div className="absolute left-[21%] top-[12%] hidden -rotate-6 animate-float [animation-delay:-1s] xl:block">
          <SolarCardImage src={cardArt.anomalyBigBang} alt="" width={110} />
        </div>
        {/* Mobile keeps two cards so the title stays readable */}
        <div className="absolute -left-7 bottom-[7%] -rotate-12 animate-float md:hidden">
          <SolarCardImage src={cardArt.planetJupiter} alt="" width={96} priority />
        </div>
        <div className="absolute -right-6 top-[15%] rotate-12 animate-float [animation-delay:-2s] md:hidden">
          <SolarCardImage src={cardArt.moonLuna} alt="" width={96} priority />
        </div>
      </motion.div>

      {/* Title block with slow camera push on scroll */}
      <motion.div
        style={reducedMotion ? undefined : { scale: pushScale, y: pushY, opacity: fade }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 pt-24 pb-16 text-center"
      >
        <p className="font-display text-sm tracking-[0.35em] text-sun sm:text-base">
          {heroContent.eyebrow}
        </p>
        <h1 className="display-heading text-5xl text-ink sm:text-7xl lg:text-8xl">
          <span className="inline-block -rotate-1">THE COSMOS</span>{" "}
          <span className="inline-block text-sun">IS YOUR</span>{" "}
          <span className="inline-block rotate-1">BATTLEFIELD</span>
        </h1>
        <p className="max-w-[48ch] text-lg font-semibold text-ink-soft">
          {heroContent.supporting}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Game details">
          {heroContent.meta.map((metaItem) => (
            <li
              key={metaItem}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-ink-soft"
            >
              {metaItem}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={heroContent.primaryCta.href}
            className="w-full rounded-full bg-gradient-to-b from-sun to-flare px-8 py-4 text-center font-display text-lg text-space-black shadow-[0_8px_28px_rgba(255,138,36,0.45)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun sm:w-auto"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="w-full rounded-full border-2 border-white/25 px-8 py-[14px] text-center font-display text-lg text-ink transition-colors hover:border-moon hover:text-moon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moon sm:w-auto"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
