import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { BowColumn } from "@/components/HangingBow";
import { CherryAccent } from "@/components/CherryAccent";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="paper-dots relative overflow-x-hidden px-5 pb-16 pt-12 md:px-8 md:pt-16">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-pink-soft/80 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-blue-soft/90 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-light">
          <Sparkles className="h-3.5 w-3.5 text-pink" />
          Handmade · Painted · Personal
        </p>
        <div className="mx-auto mt-6 flex max-w-4xl items-start justify-center gap-1 sm:gap-3 md:gap-5">
          <BowColumn side="left" />
          <h1 className="font-script min-w-0 flex-1 py-1 text-center text-5xl leading-tight text-ink sm:flex-none md:text-6xl lg:text-7xl">
            <span className="relative inline-block">
              <CherryAccent className="absolute -top-5 left-[0.42em] -translate-x-1/2 -rotate-6 md:-top-6" />
              Art
            </span>{" "}
            by Annaclaire
          </h1>
          <BowColumn side="right" />
        </div>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-light">
          Custom letters, pearl-trim keepsakes, and occasion banners painted
          from your ideas — soft, pretty, and made to photograph beautifully.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/order?type=personalized"
            className="rounded-full bg-pink px-6 py-3 text-sm font-bold text-ink shadow-md transition hover:scale-[1.02]"
          >
            Order something personalized
          </Link>
          <Link
            href="/order?type=banner"
            className="rounded-full border-2 border-pink/40 bg-white/70 px-6 py-3 text-sm font-bold text-ink transition hover:bg-pink-soft"
          >
            Design a banner
          </Link>
          <Link
            href="/#gallery"
            className="rounded-full border-2 border-baby-blue bg-white/70 px-6 py-3 text-sm font-bold text-ink transition hover:bg-blue-soft"
          >
            See the gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
