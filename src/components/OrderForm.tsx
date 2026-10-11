"use client";

import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  PersonalizedOrderFields,
  type PersonalizedFormState,
} from "@/components/PersonalizedOrderFields";
import {
  accessoryFromPrice,
  BANNER_SIZES,
  estimateDecorativeLetters,
  RUSH_FEE,
} from "@/lib/pricing";
import { BRAND } from "@/lib/brand";
import { isValidPhone } from "@/lib/phone";
import {
  normalizeOrderType,
  normalizeProductId,
  OCCASIONS,
  ORDER_TYPES,
  TEXT_KINDS,
  THEMES,
  CLIP_FINISHES,
  type OrderType,
} from "@/types/order";

const defaultPersonalized = (): PersonalizedFormState => ({
  productId: "decorative-letters",
  textKind: TEXT_KINDS[0].id,
  customText: "",
  letterSizeId: "4-5",
  colors: [],
  colorNotes: "",
  theme: THEMES[0],
  clipFinish: CLIP_FINISHES[0],
  embellishments: [],
  extraDetails: "",
});

export function OrderForm() {
  const params = useSearchParams();
  const presetType = normalizeOrderType(params.get("type"));
  const presetProduct = normalizeProductId(params.get("product"));

  const [orderType, setOrderType] = useState<OrderType>(presetType);
  const [personalized, setPersonalized] = useState<PersonalizedFormState>(() => ({
    ...defaultPersonalized(),
    productId: presetType === "personalized" ? presetProduct : defaultPersonalized().productId,
  }));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [bannerText, setBannerText] = useState("");
  const [bannerSize, setBannerSize] = useState<string>(BANNER_SIZES[1].id);
  const [rush, setRush] = useState(false);
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const estimatedTotal = useMemo(() => {
    if (orderType === "banner") {
      const base = BANNER_SIZES.find((s) => s.id === bannerSize)?.price ?? 0;
      const total = base + (rush ? RUSH_FEE : 0);
      return bannerSize === "custom" && !rush
        ? `From $${base}`
        : rush
          ? `$${total} (incl. rush)`
          : `$${total}`;
    }
    if (personalized.productId === "decorative-letters") {
      const { total } = estimateDecorativeLetters(
        personalized.letterSizeId,
        personalized.customText,
        personalized.embellishments
      );
      return personalized.customText.trim()
        ? `From $${total}`
        : `From $${estimateDecorativeLetters(personalized.letterSizeId, "A", []).total} per letter`;
    }
    if (personalized.productId === "other") return "Quoted after review";
    const from = accessoryFromPrice(personalized.productId);
    return from != null ? `From $${from}` : "Quoted after review";
  }, [orderType, bannerSize, rush, personalized]);

  function patchPersonalized(patch: Partial<PersonalizedFormState>) {
    setPersonalized((p) => ({ ...p, ...patch }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!isValidPhone(phone)) {
      setStatus("error");
      setMessage("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    const fd = new FormData();
    fd.set("orderType", orderType);
    fd.set("fullName", fullName);
    fd.set("email", email);
    fd.set("phone", phone);
    fd.set("occasion", occasion);
    fd.set("bannerText", bannerText);
    fd.set("bannerSize", bannerSize);
    fd.set("rush", String(rush));
    fd.set("notes", notes);
    fd.set("estimatedTotal", estimatedTotal);

    fd.set("personalizedProduct", personalized.productId);
    fd.set("textKind", personalized.textKind);
    fd.set("customText", personalized.customText);
    fd.set("letterSizeId", personalized.letterSizeId);
    fd.set("colors", personalized.colors.join(", "));
    fd.set("colorNotes", personalized.colorNotes);
    fd.set("theme", personalized.theme);
    fd.set("clipFinish", personalized.clipFinish);
    fd.set("embellishments", personalized.embellishments.join(", "));
    fd.set("personalizedDetails", personalized.extraDetails);

    if (files) {
      Array.from(files).forEach((f) => fd.append("files", f));
    }

    try {
      const res = await fetch("/api/order", { method: "POST", body: fd });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setMessage(data.message ?? "Sent!");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send");
    }
  }

  const input =
    "w-full rounded-xl border-2 border-pink/30 bg-white px-4 py-3 text-ink placeholder:text-ink-light/60";

  if (status === "success") {
    return (
      <div className="scallop-border bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-pink" />
        <h2 className="font-script mt-4 text-3xl text-ink">Thank you!</h2>
        <p className="mt-3 text-ink-light">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="rounded-2xl border-2 border-pink/25 bg-white p-6 md:p-8">
        <h2 className="text-lg font-bold text-ink">What are you ordering?</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ORDER_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setOrderType(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                orderType === t.id
                  ? "bg-pink text-ink"
                  : "bg-blue-soft/50 text-ink-light hover:bg-blue-soft"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border-2 border-pink/25 bg-white p-6 md:p-8">
        <h2 className="text-lg font-bold text-ink">Your details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold">Full name</label>
            <input required className={input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input required type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Phone</label>
            <input
              required
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={input}
              placeholder="(601) 555-0123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold">Occasion</label>
            <select className={input} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {orderType === "banner" && (
        <section className="rounded-2xl border-2 border-baby-blue/40 bg-blue-soft/30 p-6 md:p-8">
          <h2 className="text-lg font-bold text-ink">Banner details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">Wording / headline</label>
              <textarea
                required
                rows={3}
                className={input}
                placeholder='e.g. "Happy 21st Birthday, Miljana!"'
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Size</label>
              <select className={input} value={bannerSize} onChange={(e) => setBannerSize(e.target.value)}>
                {BANNER_SIZES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} — from ${s.price}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-pink/40 bg-white p-4">
              <input
                type="checkbox"
                checked={rush}
                onChange={(e) => setRush(e.target.checked)}
                className="mt-1 h-4 w-4 accent-pink"
              />
              <span>
                <span className="font-bold text-ink">{BRAND.rushLabel}</span>
                <span className="block text-sm text-ink-light">
                  {BRAND.rushFeeNote} — priority paint & ship when studio capacity
                  allows.
                </span>
              </span>
            </label>
            <p className="text-sm font-semibold text-ink">Estimated: {estimatedTotal}</p>
          </div>
        </section>
      )}

      {orderType === "personalized" && (
        <PersonalizedOrderFields
          state={personalized}
          onChange={patchPersonalized}
          inputClass={input}
          estimatedTotal={estimatedTotal}
        />
      )}

      <section className="rounded-2xl border-2 border-dashed border-baby-blue bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Upload className="h-5 w-5 text-baby-blue" />
          Upload inspiration
        </h2>
        <p className="mt-1 text-sm text-ink-light">
          Pinterest screenshots, inspo pics, or sketches (max 5 files, 3MB each, 4MB total).
        </p>
        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          className="mt-4 block w-full text-sm"
          onChange={(e) => setFiles(e.target.files)}
        />
        <textarea
          rows={3}
          className={`${input} mt-4`}
          placeholder="Anything else we should know?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </section>

      {status === "error" && (
        <p className="rounded-xl bg-pink-soft px-4 py-3 text-sm text-ink">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-gradient-to-r from-pink via-pink-soft to-baby-blue py-4 text-sm font-bold text-ink shadow-md disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </span>
        ) : (
          "Send order request"
        )}
      </button>
      <p className="text-center text-xs text-ink-light">
        No payment on site — {BRAND.name} confirms price & timeline by email. Standard
        turnaround {BRAND.turnaroundStandard}.
      </p>
    </form>
  );
}
