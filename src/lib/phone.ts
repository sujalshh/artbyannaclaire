export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

/** US-friendly: at least 10 digits */
export function isValidPhone(phone: string) {
  const digits = phoneDigits(phone);
  return digits.length >= 10 && digits.length <= 15;
}

export function formatPhoneForEmail(phone: string) {
  const d = phoneDigits(phone);
  if (d.length === 10) {
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return phone.trim();
}
