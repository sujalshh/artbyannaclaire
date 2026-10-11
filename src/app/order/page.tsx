import { OrderForm } from "@/components/OrderForm";
import { PageShell } from "@/components/PageShell";
import { Suspense } from "react";

export const metadata = {
  title: "Order | Art by Annaclaire",
  description: "Request a custom banner, letter, or gift — upload inspiration and details.",
};

function OrderFormFallback() {
  return (
    <div className="rounded-2xl border-2 border-pink/25 bg-white p-12 text-center text-ink-light">
      Loading form…
    </div>
  );
}

export default function OrderPage() {
  return (
    <PageShell>
      <div className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-script text-center text-5xl text-ink">Start your order</h1>
          <p className="mt-4 text-center text-sm text-ink-light">
            Tell us what you’re dreaming up. Attach mockups or reference photos —
            we’ll email back with confirmation and payment details.
          </p>
          <div className="mt-10">
            <Suspense fallback={<OrderFormFallback />}>
              <OrderForm />
            </Suspense>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
