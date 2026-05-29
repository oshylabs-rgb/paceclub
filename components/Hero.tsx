export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <p className="eyebrow">The home for run clubs</p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl">
              Find your run club. <br className="hidden sm:block" />
              Bin the spreadsheet.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mutedForeground sm:text-xl">
              Find a club near you, RSVP to the next session, build a streak. Free for runners, free for clubs under 50.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#waitlist" className="btn-primary">
                Find a club
              </a>
              <a href="#waitlist" className="btn-secondary">
                Start a club
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat number="280" label="clubs on the waitlist" />
              <Stat number="14" label="cities at launch" />
              <Stat number="9 wks" label="longest streak" />
            </div>
          </div>

          <DemoCard />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">{number}</p>
      <p className="mt-1 text-xs leading-snug text-mutedForeground sm:text-sm">{label}</p>
    </div>
  );
}

function DemoCard() {
  return (
    <div className="relative">
      <div className="card-elevated animate-fade-in space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl font-semibold leading-tight">Tuesday Track</p>
            <p className="mt-1 text-sm text-mutedForeground">
              18:15 · Paddington Rec · 5 to 8 km
            </p>
          </div>
          <span className="badge-mint shrink-0">RSVP open</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <DemoStat value="28 / 40" label="Going" />
          <DemoStat value="12" label="Waitlist" />
          <DemoStat value="9 wks" label="Streak" />
        </div>

        <button
          type="button"
          disabled
          className="btn-primary w-full"
          aria-label="RSVP for next Tuesday — demo only"
        >
          RSVP for next Tuesday
        </button>

        <p className="rounded-md bg-muted p-3 text-xs leading-relaxed text-mutedForeground">
          Demo only. Live RSVPs go live with v1 in summer 2026.
        </p>
      </div>
    </div>
  );
}

function DemoStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md bg-muted p-3 text-center">
      <p className="font-display text-lg font-semibold leading-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-mutedForeground">{label}</p>
    </div>
  );
}
