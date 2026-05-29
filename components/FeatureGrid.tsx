const features = [
  {
    title: "One page per club",
    body: "City, pace bands, schedule, photo. Ranks on Google for your city's run club search."
  },
  {
    title: "RSVP with caps",
    body: "Set a session limit. When it fills, runners auto-waitlist. No more 60 people for a 30-runner workout."
  },
  {
    title: "Attendance in one tap",
    body: "Check runners in from your phone. Streaks built automatically. CSV export at month end."
  },
  {
    title: "One message to everyone",
    body: "Replaces the WhatsApp broadcast and the email blast and the Instagram story. One message."
  },
  {
    title: "Strava-friendly",
    body: "Sign in with Strava. Sessions auto-link to your activity. We do not compete on tracking."
  },
  {
    title: "Free up to 50 members",
    body: "Most clubs never need to pay. Pro is £15 a month and only kicks in when you cross 50."
  }
];

export function FeatureGrid() {
  return (
    <section id="how" className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
            What PaceClub actually does
          </h2>
          <p className="mt-4 text-base text-mutedForeground sm:text-lg">
            Every feature traces back to a real club organizer asking for it.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="card">
              <h3 className="font-display text-lg font-semibold tracking-tightest">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mutedForeground">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
