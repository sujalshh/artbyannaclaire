import { GalleryGrid } from "@/components/GalleryGrid";
import { PageShell } from "@/components/PageShell";
import { PricingTable } from "@/components/PricingTable";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "Painted banners | Art by Annaclaire",
  description: "Hand-painted occasion banners from $35, optional ship within 24 hours.",
};

export default function BannersPage() {
  return (
    <PageShell>
      <div className="paper-dots px-5 py-12 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-script text-5xl text-ink">Painted banners</h1>
          <p className="mt-4 text-ink-light">
            Kraft paper show-stoppers for birthdays, showers, and milestones. Share
            your text, size, and inspiration — we paint the rest. Add{" "}
            <strong className="font-semibold text-ink">{BRAND.rushLabel}</strong>{" "}
            when you need it shipped in 24 hours (+$30).
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-lg">
          <PricingTable variant="banner" />
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <GalleryGrid tag="banner" />
        </div>
        <div className="mx-auto mt-12 text-center">
          <Link
            href="/order?type=banner"
            className="inline-block rounded-full bg-gradient-to-r from-pink to-baby-blue px-8 py-3 text-sm font-bold text-ink shadow-sm"
          >
            Design your banner
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
