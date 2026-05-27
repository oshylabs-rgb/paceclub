const features = [
  {
    title: "One page per club",
    body: "City, pace bands, schedule, photo, social links. Ranks on Google for [your city] run club so new runners find you."
  },
  {
    title: "RSVP with caps and waitlist",
    body: "Set a session limit. When it fills, runners auto-waitlist. No more 60 people turning up for a 30-runner workout."
  },
  {
    title: "Attendance in one tap",
    body: "Check runners in from your phone. Streaks built automatically. CSV export for sponsors at month end."
  },
  {
    title: "One message to everyone",
    body: "Replaces the WhatsApp broadcast list and the email blast and the Instagram story. One message, every member."
  },
  {
    title: "Strava-friendly",
    body: "Sign in with Strava. Sessions auto-link to your Strava activity. We do not compete with Strava on tracking. We sit on top of it."
  },
  {
    title: "Free up to 50 members",
    body: "Most clubs never need to pay. Pro is £15 a month and only kicks in when you cross 50. No per-seat shenanigans."
  }
];

export function FeatureGrid() {
  return (
    <section id="how" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            What PaceClub actually does
          </h2>
          <p className="mt-4 text-mutedForeground">
            We built the v1 scope by reading three years of organizer complaints
            on the Strava Community Hub. Every feature traces back to a
            real club leader asking for it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card">
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-mutedForeground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
