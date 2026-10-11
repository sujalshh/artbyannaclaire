"use client";

import dynamic from "next/dynamic";

const ButterflyField = dynamic(
  () => import("@/components/ButterflyField").then((m) => m.ButterflyField),
  { ssr: false }
);

export function ButterflyLayer() {
  return <ButterflyField />;
}
