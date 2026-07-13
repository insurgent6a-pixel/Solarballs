// TODO: replace with official SolarBalls character artwork when supplied.
// Every sphere below is an abstract CSS placeholder, deliberately faceless so
// we never ship an inaccurate copy of a SolarBalls character.

import type { CSSProperties } from "react";

export type CelestialVariant =
  | "moon"
  | "earth"
  | "planet"
  | "dwarf"
  | "star"
  | "galaxy"
  | "anomaly";

const surfaceStyles: Record<CelestialVariant, CSSProperties> = {
  moon: {
    background:
      "radial-gradient(circle at 32% 28%, #d8f8ff 0%, #79e8ff 38%, #2e9cba 78%, #14495c 100%)",
    boxShadow: "0 0 24px rgba(121,232,255,0.35), inset -8px -10px 24px rgba(6,30,40,0.55)",
  },
  earth: {
    background:
      "radial-gradient(circle at 30% 28%, #aee0ff 0%, #3f9eff 40%, #1b5dbb 75%, #0a2a63 100%), radial-gradient(circle at 62% 58%, rgba(94,214,140,0.9) 0%, transparent 26%)",
    backgroundBlendMode: "normal, screen",
    boxShadow: "0 0 28px rgba(63,158,255,0.4), inset -10px -12px 28px rgba(4,20,55,0.6)",
  },
  planet: {
    background:
      "radial-gradient(circle at 32% 26%, #dcc8ff 0%, #a276ff 42%, #5f3bbd 78%, #2a1660 100%)",
    boxShadow: "0 0 26px rgba(162,118,255,0.4), inset -9px -11px 26px rgba(24,10,58,0.6)",
  },
  dwarf: {
    background:
      "radial-gradient(circle at 34% 30%, #e8ddff 0%, #b795ff 45%, #7a55d6 80%, #37206e 100%)",
    boxShadow: "0 0 18px rgba(162,118,255,0.3), inset -6px -8px 18px rgba(24,10,58,0.55)",
  },
  star: {
    background:
      "radial-gradient(circle at 35% 30%, #fff6cf 0%, #ffd84a 42%, #ff8a24 80%, #c24d09 100%)",
    boxShadow:
      "0 0 34px rgba(255,216,74,0.55), 0 0 80px rgba(255,138,36,0.3), inset -8px -10px 22px rgba(150,60,5,0.5)",
  },
  galaxy: {
    background:
      "radial-gradient(circle at 50% 50%, #ffffff 0%, rgba(245,242,255,0.85) 16%, rgba(245,242,255,0.1) 42%, transparent 60%), conic-gradient(from 20deg, rgba(245,242,255,0.9), rgba(162,118,255,0.7), rgba(121,232,255,0.6), rgba(245,242,255,0.85), rgba(255,79,163,0.6), rgba(245,242,255,0.9))",
    boxShadow: "0 0 38px rgba(245,242,255,0.5), 0 0 90px rgba(162,118,255,0.35)",
    filter: "blur(1px)",
  },
  anomaly: {
    background:
      "radial-gradient(circle at 32% 28%, #ffd1e8 0%, #ff4fa3 45%, #b81f6d 80%, #560d33 100%)",
    boxShadow: "0 0 26px rgba(255,79,163,0.45), inset -8px -10px 24px rgba(70,8,40,0.6)",
  },
};

interface CelestialBodyProps {
  variant: CelestialVariant;
  /** Diameter in px. Rendered size, not layout hints. */
  size: number;
  className?: string;
}

export function CelestialBody({ variant, size, className = "" }: CelestialBodyProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full ${className}`}
      style={{ width: size, height: size, ...surfaceStyles[variant] }}
    />
  );
}
