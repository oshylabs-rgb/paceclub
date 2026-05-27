const faqs = [
  {
    q: "Is this a Strava replacement?",
    a: "No. Strava is the best run tracker in the world and we will not compete on tracking. PaceClub sits on top of Strava. Sign in with Strava, link your session to a Strava activity, the activity still lives in Strava."
  },
  {
    q: "What does Pro cost?",
    a: "Free for runners forever. Free for clubs under 50 members forever. £15 a month or £144 a year for clubs over 50. That is roughly 190 SEK a month or 20 USD a month."
  },
  {
    q: "When does v1 launch?",
    a: "We are running a one-week waitlist test right now. If the demand is real, v1 ships within 4 weeks. If not, we will say so publicly and refund anyone who tried to pay early."
  },
  {
    q: "Where can I follow along?",
    a: "Reply to your waitlist confirmation email and you will hit my inbox. We post weekly progress on X at @oshylabs1 and LinkedIn."
  },
  {
    q: "Will there be an App Store and Google Play app?",
    a: "Yes. The web version at paceclub.run ships first because we wanted it usable in one click without a download. The native apps for iOS and Android follow 2 to 3 weeks later, mostly so we can use push notifications for RSVP and waitlist updates. Same accounts, same data, no app store cut on the organizer Pro tier."
  },
  {
    q: "I am an organizer, can I move my existing club over?",
    a: "Yes. v1 imports from a CSV and from your Strava club. We will hand-migrate the first 20 clubs personally."
  },
  {
    q: "I am a brand who wants to sponsor clubs through PaceClub.",
    a: "Email arnold.oshenye@oshylabs.eu. We are not doing this in v1 but we are building the data model to support it in v3."
  }
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="container max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Questions you would actually ask
          </h2>
        </div>
        <div className="mt-10 divide-y divide-border rounded-lg border border-border bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold">
                {f.q}
                <span className="text-mutedForeground transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-mutedForeground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
