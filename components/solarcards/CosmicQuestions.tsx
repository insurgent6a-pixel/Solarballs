import Image from "next/image";
import { cosmicQuestions } from "@/data/solarcards-rules";
import { solarAssets } from "@/data/solarcards-assets";
import { SectionHeading } from "./SectionHeading";
import { CelestialBody } from "./CelestialBody";

function TransmissionAvatar({ character }: { character: "sun" | "earth" | "moon" }) {
  if (character === "sun") {
    return (
      <Image
        src={solarAssets.sunCharacter}
        alt=""
        width={900}
        height={900}
        className="h-14 w-14 shrink-0 drop-shadow-[0_0_14px_rgba(255,168,36,0.5)]"
      />
    );
  }
  // TODO: swap for official Earth and Moon character art when supplied.
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center">
      <CelestialBody variant={character} size={44} />
    </span>
  );
}

export function CosmicQuestions() {
  return (
    <section id="questions" className="relative mx-auto max-w-4xl scroll-mt-36 px-4 py-24 sm:px-6">
      <SectionHeading
        chapter="TRANSMISSIONS"
        heading="Questions From the Solar System"
        question="What happens in unusual situations?"
        accentClass="text-anomaly"
      />

      <div className="mt-12 grid gap-4">
        {cosmicQuestions.map((transmission) => (
          <details
            key={transmission.id}
            className="group rounded-2xl border border-white/10 bg-space-navy open:border-white/25 open:bg-space-surface"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 rounded-2xl p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun sm:p-5 [&::-webkit-details-marker]:hidden">
              <TransmissionAvatar character={transmission.character} />
              <span className="flex-1 font-display text-base text-ink sm:text-lg">
                {transmission.question}
              </span>
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-ink-soft transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              {/* Speech-bubble reply from mission control */}
              <p className="relative ml-0 max-w-[60ch] rounded-2xl rounded-tl-sm border border-white/10 bg-space-black/70 p-4 text-sm font-semibold text-ink-soft sm:ml-[4.5rem]">
                {transmission.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
