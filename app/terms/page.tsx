export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <main className="container max-w-3xl py-16 prose">
      <h1>Terms of service</h1>
      <p>Last updated 26 May 2026.</p>
      <p>PaceClub is a service operated by Oshylabs Ltd. By using PaceClub you agree to the following.</p>
      <h2>What we provide</h2>
      <p>A tool for run clubs to publish schedules, manage RSVPs and attendance, and communicate with members. A tool for runners to discover clubs, RSVP to sessions, and track attendance.</p>
      <h2>What you owe</h2>
      <ul>
        <li>Be honest with the data you provide.</li>
        <li>Do not use PaceClub to harass other users, post hate speech, or organize anything unlawful.</li>
        <li>Do not abuse the free tier by creating multiple accounts to skip the 50-member cap.</li>
      </ul>
      <h2>What we owe</h2>
      <ul>
        <li>Reasonable uptime. We target 99.5% but make no guarantee.</li>
        <li>Your data is yours. You can export and delete at any time.</li>
        <li>If we materially change these terms, we will email you at least 30 days in advance.</li>
      </ul>
      <h2>Subscriptions</h2>
      <p>Pro plans bill monthly or annually via Stripe in advance. You can cancel any time from the dashboard. Refunds are pro-rata for annual plans within 14 days of payment.</p>
      <h2>Liability</h2>
      <p>PaceClub is a tool to help organize run clubs. We do not organize the clubs ourselves. We are not liable for injuries, lost belongings, or interpersonal disputes that happen at a club session. Members run at their own risk.</p>
      <h2>Termination</h2>
      <p>We may terminate accounts that breach these terms with notice. You may terminate at any time.</p>
      <h2>Governing law</h2>
      <p>England and Wales.</p>
      <h2>Contact</h2>
      <p>arnold.oshenye@oshylabs.eu</p>
    </main>
  );
}
