import Image from "next/image";
import { finalCta } from "@/data/solarcards-rules";
import { solarAssets, externalLinks, cardArt } from "@/data/solarcards-assets";
import { SolarCardImage } from "./SolarCardImage";

const orbitingCards: { src: string; position: string; rotation: string }[] = [
  { src: cardArt.planetNeptune, position: "left-[6%] top-[16%]", rotation: "-rotate-12" },
  { src: cardArt.moonEuropa, position: "right-[8%] top-[12%]", rotation: "rotate-[10deg]" },
  { src: cardArt.planetEarth, position: "left-[12%] bottom-[14%]", rotation: "rotate-6" },
  { src: cardArt.dwarfPluto, position: "right-[12%] bottom-[18%]", rotation: "-rotate-6" },
];

export function FinalCta() {
  return (
    <section className="starfield relative overflow-hidden py-32 sm:py-40" aria-label="Get SolarCards">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,138,36,0.16), transparent 60%), radial-gradient(ellipse 45% 40% at 20% 25%, rgba(162,118,255,0.12), transparent 70%)",
        }}
      />

      {/* A finished solar system: cards orbiting the objective */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
        {orbitingCards.map((card) => (
          <div key={card.src} className={`absolute ${card.position} ${card.rotation} animate-float`}>
            <SolarCardImage src={card.src} alt="" width={104} className="opacity-90" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-7 px-4 text-center">
        <SolarCardImage
          src={cardArt.starSunYoung}
          alt="Sun (Young) Star card"
          width={128}
          prismatic
          className="animate-float"
        />

        <h2 className="display-heading text-4xl text-ink sm:text-6xl">{finalCta.heading}</h2>
        <p className="max-w-[42ch] text-lg font-semibold text-ink-soft">{finalCta.supporting}</p>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={externalLinks.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-gradient-to-b from-sun to-flare px-9 py-4 font-display text-lg text-space-black shadow-[0_8px_28px_rgba(255,138,36,0.45)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun sm:w-auto"
          >
            {finalCta.primaryLabel}
          </a>
          <a
            href={finalCta.secondaryHref}
            className="w-full rounded-full border-2 border-white/25 px-9 py-[14px] font-display text-lg text-ink transition-colors hover:border-moon hover:text-moon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moon sm:w-auto"
          >
            {finalCta.secondaryLabel}
          </a>
        </div>

        <Image
          src={solarAssets.solarballsLogo}
          alt="SolarBalls"
          width={160}
          height={40}
          className="mt-6 opacity-80"
        />
      </div>
    </section>
  );
}
