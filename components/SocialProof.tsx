const quotes = [
  {
    quote:
      "I am managing 240 runners across five WhatsApp groups, an Excel attendance sheet and a Google Form that breaks every fortnight. Someone please just build one tool.",
    source: "Run club organizer, London, Reddit comment 2026"
  },
  {
    quote:
      "Strava Clubs is fine for the activity feed but you cannot run RSVP caps, you cannot change the organizer on an event, and after 1,000 members you lose member control entirely.",
    source: "Strava Community Hub thread, 2026"
  },
  {
    quote:
      "Running clubs are the new night out.",
    source: "The Sauce Magazine, London, 2026"
  }
];

export function SocialProof() {
  return (
    <section className="bg-muted py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            We are not the only ones who think this is broken
          </h2>
          <p className="mt-4 text-mutedForeground">
            The pain is well-documented. We are just the first ones building
            the tool that actually fixes it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <blockquote key={q.source} className="card">
              <p className="font-display text-base leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
              <footer className="mt-4 text-xs text-mutedForeground">{q.source}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
