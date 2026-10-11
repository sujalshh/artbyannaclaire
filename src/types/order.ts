export type OrderType = "banner" | "personalized";

export const ORDER_TYPES: { id: OrderType; label: string }[] = [
  { id: "banner", label: "Painted banner" },
  { id: "personalized", label: "Personalized piece" },
];

export const PERSONALIZED_PRODUCTS = [
  {
    id: "decorative-letters",
    label: "3D decorative letters",
    hint: "Names, initials & words for shelves & photo walls",
    usesLetterSizing: true,
  },
  {
    id: "clip-name",
    label: "Hair claw — name",
    hint: "Full name in rhinestones on the clip",
    usesLetterSizing: false,
  },
  {
    id: "clip-letter",
    label: "Hair claw — letter",
    hint: "One initial on a claw clip",
    usesLetterSizing: false,
  },
  {
    id: "paddle-brush",
    label: "Paddle brush",
    hint: "Name in pearls or crystals",
    usesLetterSizing: false,
  },
  {
    id: "photo-collage",
    label: "Photo collage / milestone",
    hint: "Age numbers, albums & memory layouts",
    usesLetterSizing: false,
  },
  {
    id: "album",
    label: "Pearl-trim album",
    hint: "Custom cover & photo placement",
    usesLetterSizing: false,
  },
  {
    id: "other",
    label: "Something else",
    hint: "Describe your dream piece below",
    usesLetterSizing: false,
  },
] as const;

export type PersonalizedProductId = (typeof PERSONALIZED_PRODUCTS)[number]["id"];

export const TEXT_KINDS = [
  { id: "single-letter", label: "Single letter / initial" },
  { id: "first-name", label: "First name" },
  { id: "full-name", label: "Full name" },
  { id: "word-phrase", label: "Word or short phrase" },
] as const;

export const THEMES = [
  "Coquette (bows & cherries)",
  "Floral garden",
  "Gingham / preppy",
  "Pearl & cream classic",
  "Pink stripe",
  "Party / disco",
  "Match my inspiration photos",
  "Surprise me — your style",
] as const;

export const COLOR_PALETTE = [
  "Baby pink",
  "Baby blue",
  "Lavender",
  "Mint",
  "Cream / off-white",
  "Gold accents",
  "Custom — I'll describe",
] as const;

export const CLIP_FINISHES = [
  "Baby pink marble",
  "Pearl / iridescent",
  "Baby blue marble",
  "Tortoiseshell",
  "Match inspiration",
] as const;

export const EMBELLISHMENT_OPTIONS = [
  { id: "pearls", label: "Pearl border" },
  { id: "bow", label: "Satin bow" },
  { id: "rhinestones", label: "Rhinestones" },
  { id: "glitter", label: "Soft glitter" },
  { id: "stripes", label: "Painted stripes" },
  { id: "gingham", label: "Gingham / check" },
] as const;

export const OCCASIONS = [
  "Birthday",
  "Baby shower",
  "Graduation",
  "Wedding / bridal",
  "Dorm / room decor",
  "Just because",
  "Holiday",
  "Other",
] as const;

export function normalizeOrderType(raw: string | null): OrderType {
  if (raw === "banner") return "banner";
  if (raw === "personalized" || raw === "letter" || raw === "gift") return "personalized";
  return "banner";
}

export function normalizeProductId(raw: string | null): PersonalizedProductId {
  if (raw && PERSONALIZED_PRODUCTS.some((p) => p.id === raw)) {
    return raw as PersonalizedProductId;
  }
  if (raw === "letter") return "decorative-letters";
  if (raw === "gift") return "clip-name";
  return "decorative-letters";
}
