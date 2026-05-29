export function PricingRecap() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="container max-w-4xl">
        <div className="card-elevated grid gap-10 p-10 sm:p-14 md:grid-cols-2">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
              Free for runners. Free for clubs under 50.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mutedForeground">
              Pro is £15 a month, only above 50 members. Around 190 SEK or 20 USD. No per seat shenanigans, no trial-then-pay surprises.
            </p>
          </div>
          <ul className="space-y-4 text-sm text-foreground">
            <Row label="Runner" detail="Forever free" />
            <Row label="Club under 50 members" detail="Forever free" />
            <Row label="Club over 50 members" detail="£15 / month" />
            <Row label="Annual" detail="£144 / year (save 20%)" />
          </ul>
        </div>
      </div>
    </section>
  );
}

function Row({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="flex items-baseline justify-between border-b border-border pb-3 last:border-0 last:pb-0">
      <span>{label}</span>
      <span className="font-display font-semibold tracking-tightest">{detail}</span>
    </li>
  );
}
