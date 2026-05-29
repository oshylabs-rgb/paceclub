export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container grid gap-10 sm:grid-cols-3">
        <div>
          <p className="eyebrow">Product</p>
          <ul className="mt-4 space-y-3 text-sm text-mutedForeground">
            <li><a href="#runners" className="hover:text-foreground">For runners</a></li>
            <li><a href="#clubs" className="hover:text-foreground">For clubs</a></li>
            <li><a href="#waitlist" className="hover:text-foreground">Join the waitlist</a></li>
            <li><a href="/login" className="hover:text-foreground">Sign in</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-3 text-sm text-mutedForeground">
            <li><a href="/privacy" className="hover:text-foreground">Privacy</a></li>
            <li><a href="/terms" className="hover:text-foreground">Terms</a></li>
            <li><a href="mailto:arnold.oshenye@oshylabs.eu" className="hover:text-foreground">Email</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Follow along</p>
          <ul className="mt-4 space-y-3 text-sm text-mutedForeground">
            <li><a href="https://x.com/oshylabs1" target="_blank" rel="noreferrer" className="hover:text-foreground">X</a></li>
            <li><a href="https://www.linkedin.com/in/arnold-oshenye/" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-lg font-bold text-accentForeground">
            P
          </span>
          <div>
            <p className="font-display text-base font-semibold tracking-tightest">PaceClub</p>
            <p className="text-xs text-mutedForeground">paceclub.run</p>
          </div>
        </div>
        <div className="text-xs leading-relaxed text-mutedForeground sm:text-right">
          <p>Made by Arnold and runners across two cities.</p>
          <p className="mt-1">Oshylabs Ltd · Co. 16883720 · v1.0 · May 2026</p>
        </div>
      </div>
    </footer>
  );
}
