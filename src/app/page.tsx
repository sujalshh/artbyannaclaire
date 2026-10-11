import { GalleryGrid } from "@/components/GalleryGrid";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ServiceCards } from "@/components/ServiceCards";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ServiceCards />
        <section id="gallery" className="px-5 pb-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-script text-center text-4xl text-ink md:text-5xl">
              Recent work
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-ink-light">
              Every piece is painted or built by hand — your photos, your colors,
              your celebration.
            </p>
            <div className="mt-8">
              <GalleryGrid limit={8} />
            </div>
          </div>
        </section>
        <section className="paper-dots px-5 py-14 md:px-8">
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-pink/30 bg-white/90 p-8 text-center">
            <h2 className="text-2xl font-bold text-ink">Ready when you are</h2>
            <p className="mt-3 text-ink-light">
              Send wording, size, and inspiration — {BRAND.shortName} replies with
              timing and a firm quote. Need it fast? Add {BRAND.rushLabel} on
              banners.
            </p>
            <Link
              href="/order"
              className="mt-6 inline-block rounded-full bg-pink px-8 py-3 text-sm font-bold text-ink shadow-md"
            >
              Start an order
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
