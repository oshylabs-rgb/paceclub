import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">Confirmed</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tightest sm:text-5xl">
          You are on the list.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-mutedForeground sm:text-lg">
          Watch your inbox. Reply to the confirmation email any time and you will hit my inbox directly. I read every reply.
        </p>
        <a href="/" className="btn-primary mt-10">
          Back to the start
        </a>
      </main>
      <Footer />
    </>
  );
}
