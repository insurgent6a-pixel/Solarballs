/**
 * Every gameplay rule shown on /how-to-play lives here, separate from
 * presentation. Components read this file and never carry rule text.
 */

export type GameModeId = "star" | "galaxy";

export type CardCategoryId =
  | "moon"
  | "dwarf"
  | "planet"
  | "star"
  | "galaxy"
  | "anomaly";

export interface GameMode {
  id: GameModeId;
  name: string;
  duration: string;
  deckSize: number;
  objective: string;
  objectiveCategory: CardCategoryId;
  label: string;
}

export interface CardCategory {
  id: CardCategoryId;
  name: string;
  plural: string;
  /** Tailwind color token from the design system. */
  colorClass: string;
  hex: string;
}

export interface DeckEntry {
  categoryId: CardCategoryId;
  count: number;
}

export interface DeckComposition {
  modeId: GameModeId;
  entries: DeckEntry[];
  total: number;
}

export interface TurnPhase {
  step: number;
  name: string;
  badge: "OPTIONAL" | "REQUIRED";
  summary: string;
  detail?: string;
}

export interface PlayerAction {
  id: "summon" | "attack" | "discard";
  name: string;
  iconDescription: string;
  summary: string;
  detail: string;
}

export interface ScoringValue {
  categoryId: CardCategoryId;
  points: number;
}

export interface SpecialQuestion {
  id: string;
  question: string;
  answer: string;
  /** Which character sends the transmission. Sun is the only official art we have. */
  character: "sun" | "earth" | "moon";
}

export interface QuickMove {
  number: string;
  name: string;
  line: string;
}

export interface SetupStep {
  step: number;
  text: string;
}

export interface DrawExample {
  id: string;
  title: string;
  cardsAfterPlaying: number;
  drawCount: number;
  result: string;
}

export interface ScoreExamplePlayer {
  name: string;
  lines: { label: string; points: number }[];
  total: number;
  winner: boolean;
}

export const gameModes: Record<GameModeId, GameMode> = {
  star: {
    id: "star",
    name: "Star Game",
    duration: "7–10 minutes",
    deckSize: 25,
    objective: "Summon a Star",
    objectiveCategory: "star",
    label: "Recommended First Battle",
  },
  galaxy: {
    id: "galaxy",
    name: "Galaxy Game",
    duration: "15–20 minutes",
    deckSize: 50,
    objective: "Summon a Galaxy",
    objectiveCategory: "galaxy",
    label: "Full Cosmic Battle",
  },
};

export const cardCategories: Record<CardCategoryId, CardCategory> = {
  moon: { id: "moon", name: "Moon", plural: "Moons", colorClass: "moon", hex: "#79E8FF" },
  dwarf: { id: "dwarf", name: "Dwarf Planet", plural: "Dwarf Planets", colorClass: "planet", hex: "#A276FF" },
  planet: { id: "planet", name: "Planet", plural: "Planets", colorClass: "earth", hex: "#3F9EFF" },
  star: { id: "star", name: "Star", plural: "Stars", colorClass: "sun", hex: "#FFD84A" },
  galaxy: { id: "galaxy", name: "Galaxy", plural: "Galaxies", colorClass: "galaxy", hex: "#F5F2FF" },
  anomaly: { id: "anomaly", name: "Anomaly", plural: "Anomalies", colorClass: "anomaly", hex: "#FF4FA3" },
};

export const deckCompositions: Record<GameModeId, DeckComposition> = {
  star: {
    modeId: "star",
    entries: [
      { categoryId: "star", count: 1 },
      { categoryId: "planet", count: 5 },
      { categoryId: "moon", count: 12 },
      { categoryId: "dwarf", count: 3 },
      { categoryId: "anomaly", count: 4 },
    ],
    total: 25,
  },
  galaxy: {
    modeId: "galaxy",
    entries: [
      { categoryId: "galaxy", count: 1 },
      { categoryId: "star", count: 2 },
      { categoryId: "planet", count: 8 },
      { categoryId: "moon", count: 25 },
      { categoryId: "dwarf", count: 6 },
      { categoryId: "anomaly", count: 8 },
    ],
    total: 50,
  },
};

export const quickMoves: QuickMove[] = [
  { number: "01", name: "Draw", line: "Start with five cards in your hand." },
  {
    number: "02",
    name: "Build",
    line: "Summon Moons, Planets and other celestial cards into your play area.",
  },
  {
    number: "03",
    name: "Battle",
    line: "Attack enemy cards, protect important cards and disrupt your rivals with Anomalies.",
  },
  {
    number: "04",
    name: "Ascend",
    line: "Summon the objective card before your opponents to win instantly.",
  },
];

export const quickMovesFooter =
  "Understand these four ideas and you already understand the core game.";

export const setupSteps: SetupStep[] = [
  { step: 1, text: "Each player uses their own deck." },
  { step: 2, text: "Shuffle your deck." },
  { step: 3, text: "Draw five cards." },
  { step: 4, text: "Use the table space in front of you as your play area." },
  { step: 5, text: "Place your discard pile on the left." },
  { step: 6, text: "Place your deck on the right." },
];

export const setupCallout =
  "Cards in your hand are not considered in play until they are summoned onto the table.";

export const turnPhases: TurnPhase[] = [
  {
    step: 1,
    name: "Play an Anomaly",
    badge: "OPTIONAL",
    summary:
      "Play an Anomaly before your action to introduce a boost, disruption or special rule.",
    detail:
      "Some Anomalies cost nothing. If an Anomaly replaces your action, the card will say so.",
  },
  {
    step: 2,
    name: "Take One Action",
    badge: "REQUIRED",
    summary: "Choose exactly one action: Summon, Attack or Discard.",
  },
  {
    step: 3,
    name: "Move Your Cards",
    badge: "OPTIONAL",
    summary:
      "Reposition your cards at the end of your turn to attack, defend or protect an important card.",
  },
  {
    step: 4,
    name: "Draw Back to Five",
    badge: "REQUIRED",
    summary: "Draw cards until you have exactly five cards in your hand.",
  },
];

export const playerActions: PlayerAction[] = [
  {
    id: "summon",
    name: "Summon",
    iconDescription: "A card entering orbit",
    summary: "Place one card from your hand onto the table.",
    detail:
      "Some cards are free. Other cards require you to discard cards according to their summoning cost.",
  },
  {
    id: "attack",
    name: "Attack",
    iconDescription: "Two planets colliding",
    summary: "Use one card in Attack Position to battle any enemy card in play.",
    // TODO: Confirm equal-radius battle rule.
    detail:
      "Compare radius values. The higher radius wins. The losing card is discarded.",
  },
  {
    id: "discard",
    name: "Discard",
    iconDescription: "Two cards entering a cosmic portal",
    summary: "Discard up to two cards to cycle your hand.",
    detail: "This uses your action for the turn.",
  },
];

export const attackPositionRules = [
  "Can attack enemy cards",
  "Cannot attack while protected",
  "Uses radius to determine battle outcome",
];

export const defensePositionRules = [
  "Protects the card underneath",
  "Can be attacked by an opponent",
  "Cannot attack",
  "The protected card cannot attack",
];

export const formationCallouts = [
  "You may only reposition cards at the end of your turn.",
  "A protected card cannot attack, even when it remains visually vertical.",
];

export const drawExamples: DrawExample[] = [
  {
    id: "played-one",
    title: "Played one card",
    cardsAfterPlaying: 4,
    drawCount: 1,
    result: "Draw 1",
  },
  {
    id: "anomaly-and-summon",
    title: "Played an Anomaly and summoned a card",
    cardsAfterPlaying: 3,
    drawCount: 2,
    result: "Draw 2",
  },
  {
    id: "discarded-two",
    title: "Discarded two cards",
    cardsAfterPlaying: 3,
    drawCount: 2,
    result: "Draw 2",
  },
];

export const scoringValues: ScoringValue[] = [
  { categoryId: "moon", points: 1 },
  { categoryId: "dwarf", points: 3 },
  { categoryId: "planet", points: 5 },
  { categoryId: "star", points: 20 },
];

export const scoreVictoryExplanation =
  "If all players run out of cards and no one summoned the objective, count every card you have on the table.";

export const scoreExampleContext =
  "Two players in a Galaxy Game — the cards have run out.";

export const scoreExample: ScoreExamplePlayer[] = [
  {
    name: "Player A",
    lines: [
      { label: "4 Moons", points: 4 },
      { label: "4 Planets", points: 20 },
    ],
    total: 24,
    winner: false,
  },
  {
    name: "Player B",
    lines: [
      { label: "1 Star", points: 20 },
      { label: "2 Dwarf Planets", points: 6 },
    ],
    total: 26,
    winner: true,
  },
];

export const cosmicQuestions: SpecialQuestion[] = [
  {
    id: "nothing-to-play",
    question: "What happens if I cannot play anything?",
    answer:
      "Discard one or two cards as your action. At the end of your turn, draw until you have five cards again.",
    character: "sun",
  },
  {
    id: "lost-my-star",
    question: "Can I still win after losing my Star?",
    answer:
      "Yes. You can still win through Score Victory. Certain Anomalies may also recover discarded cards.",
    character: "earth",
  },
  {
    id: "duplicate-characters",
    question: "Can I use multiple versions of the same character?",
    answer:
      "No. Every named character must be unique within your deck. This includes characters that appear in multiple categories, such as Triton or Pluto.",
    character: "moon",
  },
];

export interface MissionNavItem {
  label: string;
  href: string;
  sectionId: string;
}

export const missionNavItems: MissionNavItem[] = [
  { label: "Mission", href: "#mission", sectionId: "mission" },
  { label: "Quick Start", href: "#quick-rules", sectionId: "quick-rules" },
  { label: "Your Turn", href: "#your-turn", sectionId: "your-turn" },
  { label: "Formation", href: "#formation", sectionId: "formation" },
  { label: "Victory", href: "#victory", sectionId: "victory" },
  { label: "Questions", href: "#questions", sectionId: "questions" },
];

export const heroContent = {
  eyebrow: "SOLARCARDS BATTLE MODE",
  heading: "THE COSMOS IS YOUR BATTLEFIELD",
  supporting:
    "Build your celestial system. Attack your rivals. Summon the ultimate celestial card.",
  meta: ["2–4 Players", "7–20 Minutes", "Battle Mode"],
  primaryCta: { label: "BEGIN TRAINING", href: "#mission" },
  secondaryCta: { label: "QUICK RULES", href: "#quick-rules" },
};

export const finalCta = {
  heading: "YOUR COSMIC BATTLE BEGINS NOW",
  supporting: "Build your strongest deck. Outplay your rivals. Conquer the galaxy.",
  primaryLabel: "SHOP SOLARCARDS",
  secondaryLabel: "REVIEW THE RULES",
  secondaryHref: "#quick-rules",
};
