import { NextResponse } from "next/server";
import { sendOrderEmail, type OrderEmailData } from "@/lib/email";
import { validateOrder } from "@/lib/order-validation";

export const runtime = "nodejs";

/** Vercel request body limit is ~4.5MB — keep uploads under 4MB total */
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

function safeFilename(name: string) {
  const base = name.split(/[/\\]/).pop() ?? "upload";
  return base.replace(/[^\w.\-()+ ]/g, "_").slice(0, 120) || "upload";
}

function parseOrderForm(form: FormData): OrderEmailData {
  return {
    orderType: String(form.get("orderType") ?? ""),
    fullName: String(form.get("fullName") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    occasion: String(form.get("occasion") ?? "").trim(),
    bannerText: String(form.get("bannerText") ?? "").trim(),
    bannerSize: String(form.get("bannerSize") ?? "").trim(),
    rush: form.get("rush") === "true",
    notes: String(form.get("notes") ?? "").trim(),
    estimatedTotal: String(form.get("estimatedTotal") ?? "").trim(),
    personalizedProduct: String(form.get("personalizedProduct") ?? "").trim(),
    textKind: String(form.get("textKind") ?? "").trim(),
    customText: String(form.get("customText") ?? "").trim(),
    letterSizeId: String(form.get("letterSizeId") ?? "").trim(),
    colors: String(form.get("colors") ?? "").trim(),
    colorNotes: String(form.get("colorNotes") ?? "").trim(),
    theme: String(form.get("theme") ?? "").trim(),
    clipFinish: String(form.get("clipFinish") ?? "").trim(),
    embellishments: String(form.get("embellishments") ?? "").trim(),
    personalizedDetails: String(form.get("personalizedDetails") ?? "").trim(),
  };
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const data = parseOrderForm(form);

    const validationError = validateOrder(data);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const files: { filename: string; content: Buffer }[] = [];
    let totalBytes = 0;
    const uploads = form.getAll("files");

    for (const entry of uploads.slice(0, MAX_FILES)) {
      if (!(entry instanceof File) || entry.size === 0) continue;

      if (entry.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: `Each file must be under 3MB (${entry.name} is too large)` },
          { status: 400 }
        );
      }

      totalBytes += entry.size;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return NextResponse.json(
          { error: "Total upload size must be under 4MB (Vercel limit)" },
          { status: 400 }
        );
      }

      const buf = Buffer.from(await entry.arrayBuffer());
      files.push({ filename: safeFilename(entry.name), content: buf });
    }

    await sendOrderEmail(data, files);

    return NextResponse.json({
      success: true,
      message:
        "Your order request is in! Annaclaire will confirm details and timing by email or text.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send order";
    console.error("[order]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
