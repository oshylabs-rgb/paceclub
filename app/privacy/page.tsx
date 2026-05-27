export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="container max-w-3xl py-16 prose">
      <h1>Privacy policy</h1>
      <p>Last updated 26 May 2026.</p>
      <p>
        PaceClub is operated by Oshylabs Ltd (UK company 16883720, registered at 100 St Pier Court, 549 Green Street, London E13 9GU). We are registered with the UK Information Commissioner's Office under registration C1892619.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Account data:</strong> email address, name (if you provide it), city (optional).</li>
        <li><strong>Strava data:</strong> if you connect Strava, we store your Strava athlete ID, access token, refresh token, and basic profile data (name, avatar).</li>
        <li><strong>Club data:</strong> club name, schedule, member list, RSVPs, attendance.</li>
        <li><strong>Payment data:</strong> Stripe handles all payment information. We store the Stripe customer ID and subscription ID only.</li>
        <li><strong>Analytics:</strong> aggregate, anonymous page views via Plausible Analytics. No cookies used for tracking.</li>
      </ul>
      <h2>What we do with it</h2>
      <ul>
        <li>Show your club page and sessions.</li>
        <li>Send transactional emails (RSVP confirmations, magic link sign-ins, club leader messages).</li>
        <li>Authenticate you against Strava if you have connected it.</li>
        <li>Process subscription payments via Stripe.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>Sub-processors only, listed:</p>
      <ul>
        <li>Supabase (database, EU region).</li>
        <li>Vercel (hosting, EU region).</li>
        <li>Stripe (payments).</li>
        <li>Resend (transactional email).</li>
        <li>Strava (only the data you explicitly authorize).</li>
        <li>Anthropic (only club page copy you ask us to generate).</li>
      </ul>
      <p>We never sell your data. That is a stupid way to run a business.</p>
      <h2>Your rights</h2>
      <p>You can delete your account and all associated data at any time from the dashboard, or by emailing arnold.oshenye@oshylabs.eu. We respond within 14 days.</p>
      <h2>Contact</h2>
      <p>Email arnold.oshenye@oshylabs.eu for any privacy question.</p>
    </main>
  );
}
