interface SectionHeadingProps {
  chapter: string;
  heading: string;
  question?: string;
  accentClass?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  chapter,
  heading,
  question,
  accentClass = "text-sun",
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      <p
        className={`font-display text-sm tracking-[0.3em] uppercase ${accentClass}`}
      >
        <span aria-hidden="true" className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-current opacity-60" />
        {chapter}
        <span aria-hidden="true" className="ml-3 inline-block h-px w-8 translate-y-[-3px] bg-current opacity-60" />
      </p>
      <h2 className="display-heading max-w-[16ch] text-4xl text-ink sm:text-5xl lg:text-6xl">
        {heading}
      </h2>
      {question ? (
        <p className="max-w-[45ch] text-base text-ink-muted italic">{question}</p>
      ) : null}
    </div>
  );
}
