/** Thin orbital seam between sections so the page reads as one continuous journey. */

interface CometDividerProps {
  fromColor?: string;
  toColor?: string;
}

export function CometDivider({ fromColor = "#FF8A24", toColor = "#79E8FF" }: CometDividerProps) {
  return (
    <div aria-hidden="true" className="relative mx-auto h-16 max-w-6xl overflow-hidden px-6">
      <svg className="h-full w-full" viewBox="0 0 1200 64" fill="none" preserveAspectRatio="none">
        <path
          d="M0 50 C 300 10, 900 10, 1200 50"
          stroke={`url(#seam-${fromColor.slice(1)}-${toColor.slice(1)})`}
          strokeWidth="1.5"
          strokeDasharray="6 10"
          opacity="0.5"
        />
        <defs>
          <linearGradient
            id={`seam-${fromColor.slice(1)}-${toColor.slice(1)}`}
            x1="0"
            y1="0"
            x2="1200"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={fromColor} stopOpacity="0" />
            <stop offset="0.5" stopColor={fromColor} />
            <stop offset="0.7" stopColor={toColor} />
            <stop offset="1" stopColor={toColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className="absolute top-[46%] left-1/2 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: toColor, boxShadow: `0 0 12px 3px ${toColor}88` }}
      />
    </div>
  );
}
