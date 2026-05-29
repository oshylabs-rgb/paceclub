export function CTAStrip() {
  return (
    <section className="bg-foreground py-24 text-background lg:py-32">
      <div className="container max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightest text-background sm:text-5xl">
          Stop running your club on spreadsheets.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-background/70 sm:text-lg">
          Find a club in your city this weekend, or start your own in two minutes.
        </p>
        <a href="#waitlist" className="btn-on-ink mt-10 inline-flex">
          Join the waitlist
        </a>
      </div>
    </section>
  );
}
