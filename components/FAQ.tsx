const faqs = [
  {
    q: "Is this a Strava replacement?",
    a: "No. Strava is the best run tracker in the world and we do not compete on tracking. PaceClub sits on top of Strava. Sign in with Strava, link your session to a Strava activity, the activity still lives in Strava."
  },
  {
    q: "What does Pro cost?",
    a: "Free for runners forever. Free for clubs under 50 members forever. £15 a month or £144 a year for clubs over 50. Around 190 SEK a month or 20 USD a month."
  },
  {
    q: "When does v1 launch?",
    a: "We are running a one-week waitlist test right now. If the demand is real, v1 ships within four weeks. If not, we will say so publicly."
  },
  {
    q: "Will there be an App Store and Google Play app?",
    a: "Yes. The web version at paceclub.run ships first because we wanted it usable in one click without a download. The native apps for iOS and Android follow two to three weeks later, mostly so we can use push notifications for RSVP and waitlist updates."
  },
  {
    q: "I am an organizer, can I move my existing club over?",
    a: "Yes. v1 imports from a CSV and from your Strava club. We will hand-migrate the first 20 clubs personally."
  },
  {
    q: "Where can I follow along?",
    a: "Reply to your waitlist confirmation email and you will hit my inbox. We post weekly progress on X at @oshylabs1 and on LinkedIn."
  }
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Questions you would actually ask</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
            The obvious six
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border rounded-lg border border-border bg-background">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold tracking-tightest">
                {f.q}
                <span className="text-mutedForeground transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-mutedForeground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
