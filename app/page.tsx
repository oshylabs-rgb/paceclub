import { Hero } from "@/components/Hero";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FeatureGrid } from "@/components/FeatureGrid";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <header className="border-b border-border bg-white/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent font-display text-lg font-bold text-white">
              P
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">PaceClub</span>
          </div>
          <a href="#waitlist" className="btn-primary text-xs">
            Join the waitlist
          </a>
        </div>
      </header>

      <Hero />

      <section id="waitlist" className="bg-muted py-20">
        <div className="container max-w-3xl">
          <div className="card">
            <h2 className="font-display text-2xl font-semibold">Get on the waitlist</h2>
            <p className="mt-2 text-sm text-mutedForeground">
              Two routes. Both free. We launch in summer 2026 and the first 100 clubs get Pro free for 12 months.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <FeatureGrid />
      <SocialProof />
      <FAQ />
      <Footer />
    </main>
  );
}
