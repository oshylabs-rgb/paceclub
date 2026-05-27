export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-mutedForeground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Building in public from Stockholm and London
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find your run club. <br className="hidden sm:block" />
              <span className="text-accent">Bin the spreadsheet.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-mutedForeground">
              Run clubs are the new night out. Strava tracks your run. WhatsApp,
              Excel and Google Forms run your club. PaceClub does the second
              one properly. Free for runners. Free for clubs under 50 members.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#waitlist" className="btn-primary">
                Join the waitlist
              </a>
              <a href="#how" className="btn-ghost">
                How it works
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-mutedForeground">
              <div>
                <div className="text-lg font-semibold text-foreground">59%</div>
                <div>Global run club growth 2024</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">3.5x</div>
                <div>More clubs on Strava in 2025</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Web + iOS + Android</div>
                <div>Web first, App Store + Play to follow</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card animate-fade-in space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg font-semibold">Tuesday Track</p>
                  <p className="text-xs text-mutedForeground">
                    18:15 · Paddington Rec · 5 to 8 km · all paces
                  </p>
                </div>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  RSVP open
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-md bg-muted p-3">
                  <div className="text-base font-semibold text-foreground">28 / 40</div>
                  <div className="text-mutedForeground">Going</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-base font-semibold text-foreground">12</div>
                  <div className="text-mutedForeground">Waitlist</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-base font-semibold text-foreground">9 wks</div>
                  <div className="text-mutedForeground">Streak</div>
                </div>
              </div>
              <button className="btn-primary w-full" disabled>
                RSVP for next Tuesday
              </button>
              <div className="rounded-md bg-muted p-3 text-xs text-mutedForeground">
                Demo only. Live RSVPs go live with v1 in summer 2026.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
