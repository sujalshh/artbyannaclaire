import { GalleryGrid } from "@/components/GalleryGrid";
import { PageShell } from "@/components/PageShell";
import { PricingTable } from "@/components/PricingTable";
import Link from "next/link";
import { PERSONALIZED_PRODUCTS } from "@/types/order";

export const metadata = {
  title: "Personalized | Art by Annaclaire",
  description:
    "Decorative letters, rhinestone claw clips, brushes, albums — color, theme & inspo your way.",
};

export default function PersonalizedPage() {
  return (
    <PageShell>
      <div className="paper-dots px-5 py-12 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-script text-5xl text-ink md:text-6xl">Personalized</h1>
          <p className="mt-4 text-ink-light">
            Letters from $15, clips with your name, pearl brushes, photo milestones —
            pick colors, theme, and upload inspo on the order form.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <PricingTable variant="personalized" />
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-center text-lg font-bold text-ink">What you can book</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PERSONALIZED_PRODUCTS.filter((p) => p.id !== "other").map((p) => (
              <Link
                key={p.id}
                href={`/order?type=personalized&product=${p.id}`}
                className="rounded-2xl border-2 border-pink/25 bg-white/90 px-5 py-4 transition hover:border-pink hover:shadow-md"
              >
                <span className="font-bold text-ink">{p.label}</span>
                <span className="mt-1 block text-sm text-ink-light">{p.hint}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <h2 className="font-script text-center text-3xl text-ink">Gallery</h2>
          <div className="mt-8">
            <GalleryGrid tags={["letter", "gift"]} />
          </div>
        </div>

        <div className="mx-auto mt-12 text-center">
          <Link
            href="/order?type=personalized"
            className="inline-block rounded-full bg-gradient-to-r from-pink to-baby-blue px-10 py-3.5 text-sm font-bold text-ink shadow-sm"
          >
            Build your order
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
