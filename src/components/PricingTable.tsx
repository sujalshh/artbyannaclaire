import {
  ACCESSORY_PRICING,
  BANNER_SIZES,
  LETTER_SIZE_TIERS,
  RUSH_FEE,
} from "@/lib/pricing";
import { BRAND } from "@/lib/brand";

type Props = {
  variant: "banner" | "personalized";
};

export function PricingTable({ variant }: Props) {
  if (variant === "banner") {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-pink/30 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-pink-soft/50 text-ink">
            <tr>
              <th className="px-4 py-3 font-bold">Size</th>
              <th className="px-4 py-3 font-bold">Starting at</th>
            </tr>
          </thead>
          <tbody>
            {BANNER_SIZES.map((s) => (
              <tr key={s.id} className="border-t border-pink/20">
                <td className="px-4 py-3 text-ink-light">{s.label}</td>
                <td className="px-4 py-3 font-bold text-ink">
                  {s.id === "custom" ? `From $${s.price}` : `$${s.price}`}
                </td>
              </tr>
            ))}
            <tr className="border-t border-pink/20 bg-blue-soft/30">
              <td className="px-4 py-3 text-ink-light">{BRAND.rushLabel}</td>
              <td className="px-4 py-3 font-bold text-ink">+${RUSH_FEE}</td>
            </tr>
          </tbody>
        </table>
        <p className="border-t border-pink/20 px-4 py-3 text-xs text-ink-light">
          Final quote depends on detail level, extra icons, and delivery. Standard
          turnaround {BRAND.turnaroundStandard}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border-2 border-pink/30 bg-white">
        <p className="bg-pink-soft/50 px-4 py-3 text-sm font-bold text-ink">
          3D decorative letters — per letter
        </p>
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-ink">
            <tr>
              <th className="px-4 py-3 font-bold">Height</th>
              <th className="px-4 py-3 font-bold">Each</th>
            </tr>
          </thead>
          <tbody>
            {LETTER_SIZE_TIERS.map((t) => (
              <tr key={t.id} className="border-t border-pink/20">
                <td className="px-4 py-3 text-ink-light">{t.label}</td>
                <td className="px-4 py-3 font-bold text-ink">${t.pricePerLetter}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-pink/20 px-4 py-3 text-xs text-ink-light">
          +$5 per size step up from 4–5&quot;. Pearl borders, bows &amp; extras quoted
          on the order form.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-pink/30 bg-white">
        <p className="bg-blue-soft/50 px-4 py-3 text-sm font-bold text-ink">
          Clips, brushes &amp; keepsakes
        </p>
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-ink">
            <tr>
              <th className="px-4 py-3 font-bold">Piece</th>
              <th className="px-4 py-3 font-bold">From</th>
            </tr>
          </thead>
          <tbody>
            {ACCESSORY_PRICING.map((row) => (
              <tr key={row.id} className="border-t border-pink/20">
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">{row.name}</span>
                  <span className="mt-0.5 block text-xs text-ink-light">{row.note}</span>
                </td>
                <td className="px-4 py-3 font-bold text-ink">${row.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
