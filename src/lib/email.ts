import { Resend } from "resend";
import { BRAND } from "@/lib/brand";
import { BANNER_SIZES, letterTierById, RUSH_FEE } from "@/lib/pricing";
import { formatPhoneForEmail } from "@/lib/phone";
import { PERSONALIZED_PRODUCTS } from "@/types/order";

export const DEFAULT_BOOKING_INBOX = "annaclaireweber33@gmail.com";

function bookingInbox() {
  return process.env.BOOKING_TO_EMAIL?.trim() || DEFAULT_BOOKING_INBOX;
}

function bannerSizeLabel(id: string) {
  return BANNER_SIZES.find((s) => s.id === id)?.label ?? id;
}

function productLabel(id: string) {
  return PERSONALIZED_PRODUCTS.find((p) => p.id === id)?.label ?? id;
}

function letterSizeLabel(id: string) {
  const tier = letterTierById(id);
  return tier ? `${tier.label} ($${tier.pricePerLetter}/letter)` : id;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type OrderEmailData = {
  orderType: string;
  fullName: string;
  email: string;
  phone: string;
  occasion: string;
  bannerText: string;
  bannerSize: string;
  rush: boolean;
  notes: string;
  estimatedTotal: string;
  personalizedProduct: string;
  textKind: string;
  customText: string;
  letterSizeId: string;
  colors: string;
  colorNotes: string;
  theme: string;
  clipFinish: string;
  embellishments: string;
  personalizedDetails: string;
};

function buildRows(data: OrderEmailData): [string, string][] {
  const isPersonalized = data.orderType === "personalized";
  const phoneDisplay = formatPhoneForEmail(data.phone);

  const rows: [string, string][] = [
    ["Order type", isPersonalized ? "Personalized" : "Painted banner"],
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", phoneDisplay],
    ["Occasion", data.occasion || "—"],
  ];

  if (data.orderType === "banner") {
    rows.push(
      ["Banner text / headline", data.bannerText],
      ["Banner size", bannerSizeLabel(data.bannerSize)],
      ["Ship within 24 hours", data.rush ? `Yes (+$${RUSH_FEE})` : "No"]
    );
  }

  if (isPersonalized) {
    rows.push(
      ["Product", productLabel(data.personalizedProduct)],
      ["Text type", data.textKind || "—"],
      ["Spelling / text", data.customText || "—"],
      ["Letter size", data.letterSizeId ? letterSizeLabel(data.letterSizeId) : "—"],
      ["Colors", data.colors || "—"],
      ["Color notes", data.colorNotes || "—"],
      ["Theme", data.theme || "—"],
      ["Clip finish", data.clipFinish || "—"],
      ["Embellishments", data.embellishments || "—"],
      ["Extra details", data.personalizedDetails || "—"]
    );
  }

  rows.push(["Estimated total", data.estimatedTotal], ["Notes", data.notes || "—"]);

  return rows;
}

export async function sendOrderEmail(
  data: OrderEmailData,
  files: { filename: string; content: Buffer }[]
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Add it in .env.local or your host’s environment variables."
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL?.trim() || BRAND.emailFrom;
  const isPersonalized = data.orderType === "personalized";
  const rows = buildRows(data);

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #f7c6d4;color:#7a7289;font-size:12px;font-weight:600;">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #f7c6d4;color:#4a4458;">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const subjectProduct = isPersonalized
    ? productLabel(data.personalizedProduct)
    : "Banner";

  const payload: Parameters<Resend["emails"]["send"]>[0] = {
    from,
    to: bookingInbox(),
    replyTo: data.email,
    subject: `[${BRAND.shortName}] ${subjectProduct} order — ${data.fullName}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#faf7f4;"><h1 style="font-family:Georgia,serif;color:#4a4458;">${escapeHtml(BRAND.name)}</h1><p style="color:#7a7289;">New order request</p><table style="width:100%;background:#fff;border-radius:12px;border:1px solid #f7c6d4;">${htmlRows}</table><p style="font-size:12px;color:#7a7289;margin-top:16px;">${files.length} attachment(s) included.</p></div>`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  };

  if (files.length > 0) {
    payload.attachments = files.map((f) => ({
      filename: f.filename,
      content: f.content,
    }));
  }

  const { error } = await resend.emails.send(payload);

  if (error) {
    throw new Error(error.message || "Failed to send email");
  }
}
