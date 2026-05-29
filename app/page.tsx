import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SocialProof } from "@/components/SocialProof";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PricingRecap } from "@/components/PricingRecap";
import { FAQ } from "@/components/FAQ";
import { CTAStrip } from "@/components/CTAStrip";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Nav />

      {/* 1. Hero with built-in demo card to the right */}
      <Hero />

      {/* 2. Social proof */}
      <SocialProof />

      {/* 3. Features (six) */}
      <FeatureGrid />

      {/* 4. Pricing recap */}
      <PricingRecap />

      {/* 5. Waitlist form */}
      <section id="waitlist" className="bg-muted py-20 lg:py-28">
        <div className="container max-w-3xl">
          <div className="card-elevated">
            <p className="eyebrow">Get on the list</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
              Two routes. Both free.
            </h2>
            <p className="mt-3 text-base text-mutedForeground">
              We launch in summer 2026. The first 100 clubs get Pro free for 12 months.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. CTA strip — the only orange on Ink at scale */}
      <CTAStrip />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
