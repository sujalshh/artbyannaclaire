export const BANNER_SIZES = [
  { id: "small", label: '2 × 4 ft — party wall', price: 35 },
  { id: "medium", label: "3 × 6 ft — most popular", price: 45 },
  { id: "large", label: "4 × 8 ft — statement piece", price: 55 },
  { id: "custom", label: "Custom size (quoted)", price: 65 },
] as const;

export const RUSH_FEE = 30;

/** Per physical letter; each size step is +$5 (4–5" starts at $15). */
export const LETTER_SIZE_TIERS = [
  { id: "4-5", label: '4"–5" tall', pricePerLetter: 15 },
  { id: "6-7", label: '6"–7" tall', pricePerLetter: 20 },
  { id: "8-9", label: '8"–9" tall', pricePerLetter: 25 },
  { id: "10-11", label: '10"–11" tall', pricePerLetter: 30 },
  { id: "12-14", label: '12"–14" tall', pricePerLetter: 35 },
  { id: "15-18", label: '15"–18" tall', pricePerLetter: 40 },
] as const;

export const EMBELLISHMENT_FEES = {
  pearls: 12,
  bow: 8,
  rhinestones: 10,
  glitter: 6,
  stripes: 0,
  gingham: 0,
} as const;

export const ACCESSORY_PRICING = [
  {
    id: "clip-name",
    name: "Hair claw clip — name in rhinestones",
    from: 28,
    note: "Marble, pearl, or tortoise base",
  },
  {
    id: "clip-letter",
    name: "Hair claw clip — single letter",
    from: 22,
    note: "Initial on clip in crystals",
  },
  {
    id: "paddle-brush",
    name: "Paddle brush — personalized name",
    from: 30,
    note: "Pearls or rhinestones on handle",
  },
  {
    id: "photo-collage",
    name: "Photo collage milestone",
    from: 85,
    note: "Numbers, albums & keepsakes",
  },
  {
    id: "album",
    name: "Pearl-trim memory album",
    from: 75,
    note: "Custom cover & spelling",
  },
] as const;

export function letterTierById(id: string) {
  return LETTER_SIZE_TIERS.find((t) => t.id === id);
}

export function countLetters(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 1;
  return trimmed.replace(/\s/g, "").length;
}

export function estimateDecorativeLetters(sizeId: string, text: string, embellishments: string[]) {
  const tier = letterTierById(sizeId);
  const per = tier?.pricePerLetter ?? 15;
  const qty = countLetters(text);
  let total = per * qty;
  for (const key of embellishments) {
    const fee = EMBELLISHMENT_FEES[key as keyof typeof EMBELLISHMENT_FEES];
    if (fee) total += fee * (key === "pearls" || key === "bow" ? qty : 1);
  }
  return { qty, per, total };
}

export function accessoryFromPrice(productId: string) {
  return ACCESSORY_PRICING.find((p) => p.id === productId)?.from ?? null;
}

/** @deprecated use LETTER_SIZE_TIERS */
export const LETTER_PRICING = LETTER_SIZE_TIERS.map((t) => ({
  size: `${t.label} — one letter`,
  from: t.pricePerLetter,
}));

/** @deprecated use ACCESSORY_PRICING */
export const GIFT_PRICING = ACCESSORY_PRICING.map((p) => ({
  name: p.name,
  from: p.from,
  note: p.note,
}));
