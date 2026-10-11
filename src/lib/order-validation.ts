import { isValidPhone } from "@/lib/phone";
import { PERSONALIZED_PRODUCTS } from "@/types/order";
import type { OrderEmailData } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateOrder(data: OrderEmailData): string | null {
  if (!data.fullName.trim()) return "Full name is required";
  if (!data.email.trim()) return "Email is required";
  if (!EMAIL_RE.test(data.email)) return "Invalid email address";
  if (!data.phone.trim()) return "Phone number is required";
  if (!isValidPhone(data.phone)) return "Enter a valid phone number (at least 10 digits)";

  if (data.orderType !== "banner" && data.orderType !== "personalized") {
    return "Invalid order type";
  }

  if (data.orderType === "banner") {
    if (!data.bannerText.trim()) return "Banner wording is required";
    if (!data.bannerSize.trim()) return "Banner size is required";
  }

  if (data.orderType === "personalized") {
    const product = PERSONALIZED_PRODUCTS.find((p) => p.id === data.personalizedProduct);
    if (!product) return "Select a product type";

    const needsText = [
      "decorative-letters",
      "clip-name",
      "clip-letter",
      "paddle-brush",
      "photo-collage",
      "album",
    ].includes(data.personalizedProduct);

    if (needsText && !data.customText.trim()) {
      return "Spelling / text is required for this product";
    }

    if (data.personalizedProduct === "other" && !data.personalizedDetails.trim()) {
      return "Describe what you want to order";
    }
  }

  return null;
}
