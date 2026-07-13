import Image from "next/image";
import { CARD_ASPECT } from "@/data/solarcards-assets";

interface SolarCardImageProps {
  src: string;
  alt: string;
  /** Rendered width in px. Height follows the card aspect ratio. */
  width: number;
  className?: string;
  priority?: boolean;
  prismatic?: boolean;
}

/** Official card front with the site's shadow and optional prismatic rim. */
export function SolarCardImage({
  src,
  alt,
  width,
  className = "",
  priority = false,
  prismatic = false,
}: SolarCardImageProps) {
  return (
    <span
      className={`inline-block rounded-xl shadow-[0_14px_40px_rgba(0,0,0,0.6)] ${
        prismatic ? "prismatic-edge" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={Math.round(width * CARD_ASPECT)}
        priority={priority}
        className="rounded-xl"
      />
    </span>
  );
}
