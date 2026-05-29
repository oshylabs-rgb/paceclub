export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2.5" aria-label="PaceClub home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-xl font-bold text-accentForeground">
            P
          </span>
          <span className="font-display text-lg font-semibold tracking-tightest">PaceClub</span>
        </a>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          <a href="#runners" className="btn-ghost">For runners</a>
          <a href="#clubs" className="btn-ghost">For clubs</a>
        </nav>
        <a href="#waitlist" className="btn-primary text-xs">
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
