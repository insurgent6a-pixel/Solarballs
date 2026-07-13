import { drawExamples } from "@/data/solarcards-rules";
import { SectionHeading } from "./SectionHeading";

const HAND_SIZE = 5;

function HandRow({ kept, drawn }: { kept: number; drawn: number }) {
  return (
    <div aria-hidden="true" className="flex justify-center gap-1.5">
      {Array.from({ length: HAND_SIZE }).map((_, slotIndex) => {
        const isDrawn = slotIndex >= kept;
        return (
          <span
            key={slotIndex}
            className={`h-14 w-10 rounded border-2 ${
              isDrawn
                ? "border-moon bg-moon/15 shadow-[0_0_14px_rgba(121,232,255,0.35)]"
                : "border-black bg-space-surface"
            }`}
          />
        );
      })}
      <span className="sr-only">{`${kept} cards kept, ${drawn} cards drawn`}</span>
    </div>
  );
}

export function DrawExamples() {
  return (
    <section id="draw" className="relative mx-auto max-w-6xl scroll-mt-36 px-4 py-24 sm:px-6">
      <SectionHeading
        chapter="MISSION 08"
        heading="Restore Your Hand"
        question="How many cards do I draw?"
        accentClass="text-moon"
      />

      <p className="mx-auto mt-6 max-w-[50ch] text-center font-semibold text-ink-soft">
        Every turn ends the same way: draw until you hold exactly five cards.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {drawExamples.map((example) => (
          <article key={example.id} className="rounded-2xl border border-white/10 bg-space-navy p-6 text-center">
            <h3 className="min-h-12 font-display text-base tracking-wide text-ink">
              {example.title.toUpperCase()}
            </h3>

            <div className="mt-5 grid gap-3">
              <p className="text-sm font-bold text-ink-muted">
                5 − {HAND_SIZE - example.cardsAfterPlaying} ={" "}
                <span className="text-ink">{example.cardsAfterPlaying} in hand</span>
              </p>
              <HandRow kept={example.cardsAfterPlaying} drawn={example.drawCount} />
              <p className="text-sm font-bold text-ink-muted">
                {example.cardsAfterPlaying} + {example.drawCount} ={" "}
                <span className="text-ink">5 again</span>
              </p>
            </div>

            <p className="mx-auto mt-5 w-fit rounded-full bg-moon/15 px-5 py-2 font-display text-lg text-moon">
              {example.result}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
