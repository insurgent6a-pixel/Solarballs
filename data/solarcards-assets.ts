/**
 * Central artwork registry. Swap any path here when official art arrives;
 * components never hardcode image paths.
 *
 * A `null` value means no official asset was supplied. Components fall back
 * to a CSS celestial placeholder and carry their own TODO markers.
 */

export interface SolarAssetPaths {
  /** Official SolarBalls wordmark, transparent PNG, 2000x500. */
  solarballsLogo: string;
  /** Official SolarBalls Sun character, transparent PNG, 900x900. */
  sunCharacter: string;
  // TODO: no official SolarCards logo supplied. Nav renders the SolarBalls logo instead.
  solarcardsLogo: string | null;
  // TODO: no official Earth artwork supplied. Using CSS placeholder sphere.
  earthCharacter: string | null;
  // TODO: no official Moon artwork supplied. Using CSS placeholder sphere.
  moonCharacter: string | null;
  // TODO: no official planet artwork supplied. Using CSS placeholder spheres.
  planetArtwork: string | null;
  // TODO: no official galaxy artwork supplied. Using CSS prismatic swirl placeholder.
  galaxyArtwork: string | null;
  // TODO: no official card back artwork supplied.
  cardBack: string | null;
  // TODO: no official booster pack artwork supplied.
  boosterPack: string | null;
  // TODO: no official deck box artwork supplied.
  deckBox: string | null;
}

export const solarAssets: SolarAssetPaths = {
  solarballsLogo: "/solarcards/solarballs-logo.png",
  sunCharacter: "/solarcards/sun-character.png",
  solarcardsLogo: null,
  earthCharacter: null,
  moonCharacter: null,
  planetArtwork: null,
  galaxyArtwork: null,
  cardBack: null,
  boosterPack: null,
  deckBox: null,
};

/**
 * Official card fronts, downscaled to 480px wide from the 2nd Edition set.
 * Source: ~/Downloads/solarcards (full print-resolution files).
 */
export interface CardArtPaths {
  starSunYoung: string;
  galaxyMilkyWay: string;
  planetJupiter: string;
  planetEarth: string;
  planetNeptune: string;
  dwarfPluto: string;
  moonLuna: string;
  moonEuropa: string;
  anomalyBigBang: string;
}

export const cardArt: CardArtPaths = {
  starSunYoung: "/solarcards/cards/star-sun-young.png",
  galaxyMilkyWay: "/solarcards/cards/galaxy-milky-way.png",
  planetJupiter: "/solarcards/cards/planet-jupiter-young.png",
  planetEarth: "/solarcards/cards/planet-earth-young.png",
  planetNeptune: "/solarcards/cards/planet-neptune-young.png",
  dwarfPluto: "/solarcards/cards/dwarf-pluto-young.png",
  moonLuna: "/solarcards/cards/moon-luna.png",
  moonEuropa: "/solarcards/cards/moon-europa.png",
  anomalyBigBang: "/solarcards/cards/anomaly-big-bang.png",
};

/** Card PNGs are 480x655. Height derives from width to avoid layout shift. */
export const CARD_ASPECT = 655 / 480;

export interface ExternalLinks {
  shop: string;
}

// TODO: confirm the live shop URL before launch.
export const externalLinks: ExternalLinks = {
  shop: "https://solarballs.store",
};
