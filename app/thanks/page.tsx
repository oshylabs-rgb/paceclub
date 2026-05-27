export default function ThanksPage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-4xl font-semibold">You are on the list.</h1>
      <p className="mt-4 max-w-md text-mutedForeground">
        Watch your inbox. Reply to the confirmation email any time and you will
        hit my inbox directly. I read every reply.
      </p>
      <a href="/" className="btn-primary mt-8">
        Back to the start
      </a>
    </main>
  );
}
