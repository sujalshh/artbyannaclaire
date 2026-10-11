import { Navbar } from "@/components/Navbar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-[70vh]">{children}</main>
    </>
  );
}
