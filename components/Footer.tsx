export function Footer() {
  return (
    <footer className="border-t border-border bg-muted py-10">
      <div className="container flex flex-col items-start justify-between gap-6 text-sm text-mutedForeground sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-base font-semibold text-foreground">PaceClub</p>
          <p className="mt-1 text-xs">
            A product of Oshylabs Ltd (UK company 16883720). Built in Stockholm.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <a href="/privacy" className="hover:text-foreground">Privacy</a>
          <a href="/terms" className="hover:text-foreground">Terms</a>
          <a href="mailto:arnold.oshenye@oshylabs.eu" className="hover:text-foreground">Email</a>
          <a href="https://x.com/oshylabs1" className="hover:text-foreground" target="_blank" rel="noreferrer">X</a>
        </div>
      </div>
    </footer>
  );
}
