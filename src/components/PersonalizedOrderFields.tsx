"use client";

import {
  accessoryFromPrice,
  estimateDecorativeLetters,
  LETTER_SIZE_TIERS,
} from "@/lib/pricing";
import {
  CLIP_FINISHES,
  COLOR_PALETTE,
  EMBELLISHMENT_OPTIONS,
  PERSONALIZED_PRODUCTS,
  TEXT_KINDS,
  THEMES,
  type PersonalizedProductId,
} from "@/types/order";

export type PersonalizedFormState = {
  productId: PersonalizedProductId;
  textKind: string;
  customText: string;
  letterSizeId: string;
  colors: string[];
  colorNotes: string;
  theme: string;
  clipFinish: string;
  embellishments: string[];
  extraDetails: string;
};

type Props = {
  state: PersonalizedFormState;
  onChange: (patch: Partial<PersonalizedFormState>) => void;
  inputClass: string;
  estimatedTotal: string;
};

export function PersonalizedOrderFields({
  state,
  onChange,
  inputClass,
  estimatedTotal,
}: Props) {
  const isLetters = state.productId === "decorative-letters";
  const isOther = state.productId === "other";
  const isClip =
    state.productId === "clip-name" || state.productId === "clip-letter";
  const isBrush = state.productId === "paddle-brush";
  const needsNameText =
    isLetters ||
    isClip ||
    isBrush ||
    state.productId === "photo-collage" ||
    state.productId === "album";

  function toggleColor(c: string) {
    const next = state.colors.includes(c)
      ? state.colors.filter((x) => x !== c)
      : [...state.colors, c];
    onChange({ colors: next });
  }

  function toggleEmb(id: string) {
    const next = state.embellishments.includes(id)
      ? state.embellishments.filter((x) => x !== id)
      : [...state.embellishments, id];
    onChange({ embellishments: next });
  }

  return (
    <section className="space-y-6 rounded-2xl border-2 border-pink/30 bg-gradient-to-br from-pink-soft/40 via-white to-blue-soft/40 p-6 md:p-8">
      <div>
        <h2 className="text-lg font-bold text-ink">What are we making?</h2>
        <p className="mt-1 text-sm text-ink-light">
          Letters, clips, brushes, albums — pick one and we&apos;ll nail the details.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {PERSONALIZED_PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange({ productId: p.id })}
              className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                state.productId === p.id
                  ? "border-pink bg-white shadow-sm"
                  : "border-pink/20 bg-white/70 hover:border-pink/50"
              }`}
            >
              <span className="block text-sm font-bold text-ink">{p.label}</span>
              <span className="mt-0.5 block text-xs text-ink-light">{p.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {isLetters && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">Letter height</label>
            <select
              className={inputClass}
              value={state.letterSizeId}
              onChange={(e) => onChange({ letterSizeId: e.target.value })}
            >
              {LETTER_SIZE_TIERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} — ${t.pricePerLetter} each
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Text type</label>
            <select
              className={inputClass}
              value={state.textKind}
              onChange={(e) => onChange({ textKind: e.target.value })}
            >
              {TEXT_KINDS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {needsNameText && (
        <div>
          <label className="mb-1 block text-sm font-semibold">
            {isLetters
              ? "Letters / spelling"
              : isClip && state.productId === "clip-letter"
                ? "Initial letter"
                : "Name or text (exact spelling)"}
          </label>
          <input
            required
            className={inputClass}
            placeholder={
              isLetters
                ? "e.g. EMMA or S"
                : state.productId === "clip-letter"
                  ? "A"
                  : "e.g. Madison"
            }
            value={state.customText}
            onChange={(e) => onChange({ customText: e.target.value })}
          />
          {isLetters && state.customText.trim() && (
            <p className="mt-2 text-xs text-ink-light">
              {estimateDecorativeLetters(
                state.letterSizeId,
                state.customText,
                state.embellishments
              ).qty}{" "}
              letter(s) × $
              {letterTierPrice(state.letterSizeId)} before add-ons
            </p>
          )}
        </div>
      )}

      {!isLetters && state.productId !== "other" && (
        <p className="text-sm text-ink-light">
          Starting around{" "}
          <strong className="text-ink">
            ${accessoryFromPrice(state.productId) ?? "—"}
          </strong>{" "}
          — final quote after colors & length.
        </p>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold">Color palette</label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleColor(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                state.colors.includes(c)
                  ? "bg-baby-blue text-ink"
                  : "bg-white text-ink-light ring-1 ring-pink/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          className={`${inputClass} mt-3`}
          placeholder="Custom color notes (optional)"
          value={state.colorNotes}
          onChange={(e) => onChange({ colorNotes: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold">Theme / vibe</label>
          <select
            className={inputClass}
            value={state.theme}
            onChange={(e) => onChange({ theme: e.target.value })}
          >
            {THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {isClip && (
          <div>
            <label className="mb-1 block text-sm font-semibold">Clip finish</label>
            <select
              className={inputClass}
              value={state.clipFinish}
              onChange={(e) => onChange({ clipFinish: e.target.value })}
            >
              {CLIP_FINISHES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {(isLetters || isBrush || state.productId === "album") && (
        <div>
          <label className="mb-2 block text-sm font-semibold">Embellishments</label>
          <div className="flex flex-wrap gap-2">
            {EMBELLISHMENT_OPTIONS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => toggleEmb(e.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  state.embellishments.includes(e.id)
                    ? "bg-pink text-ink"
                    : "bg-white text-ink-light ring-1 ring-pink/30"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Inspiration & extra details
        </label>
        <textarea
          required={isOther}
          rows={3}
          className={inputClass}
          placeholder={
            isOther
              ? "Describe what you want — we’ll quote it"
              : "Pinterest links, ‘like my last order’, deadline, gift message…"
          }
          value={state.extraDetails}
          onChange={(e) => onChange({ extraDetails: e.target.value })}
        />
      </div>

      <p className="rounded-xl bg-white/80 px-4 py-3 text-sm font-semibold text-ink">
        Estimated: {estimatedTotal}
      </p>
    </section>
  );
}

function letterTierPrice(sizeId: string) {
  return LETTER_SIZE_TIERS.find((t) => t.id === sizeId)?.pricePerLetter ?? 15;
}
