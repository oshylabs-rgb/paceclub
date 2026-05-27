"use client";

import { useState } from "react";

type Role = "runner" | "organizer";

export function WaitlistForm() {
  const [role, setRole] = useState<Role>("runner");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [clubName, setClubName] = useState("");
  const [pain, setPain] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          role,
          city: city || null,
          clubName: clubName || null,
          pain: pain || null,
          source: typeof window !== "undefined" ? window.location.search : ""
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong. Try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mt-6 rounded-md bg-accent/10 p-5 text-sm text-foreground">
        <p className="font-semibold">You are in.</p>
        <p className="mt-2 text-mutedForeground">
          We will email you the moment v1 opens. Reply to that email any time
          and you will hit my inbox directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRole("runner")}
          className={`flex-1 rounded-md border px-4 py-3 text-sm font-semibold transition ${
            role === "runner"
              ? "border-accent bg-accent text-white"
              : "border-border bg-white hover:bg-muted"
          }`}
        >
          I am a runner
        </button>
        <button
          type="button"
          onClick={() => setRole("organizer")}
          className={`flex-1 rounded-md border px-4 py-3 text-sm font-semibold transition ${
            role === "organizer"
              ? "border-accent bg-accent text-white"
              : "border-border bg-white hover:bg-muted"
          }`}
        >
          I run a club
        </button>
      </div>

      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        autoComplete="email"
      />
      <input
        type="text"
        placeholder="City (London, Stockholm, NYC…)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />

      {role === "organizer" ? (
        <>
          <input
            type="text"
            placeholder="Club name (so I can build you a page)"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="What is the one tool you would pay to retire? (WhatsApp broadcast, Excel attendance, Google Forms RSVP…)"
            value={pain}
            onChange={(e) => setPain(e.target.value)}
            className="input min-h-[100px]"
          />
        </>
      ) : (
        <input
          type="text"
          placeholder="What is missing from how you find a club today?"
          value={pain}
          onChange={(e) => setPain(e.target.value)}
          className="input"
        />
      )}

      <button type="submit" disabled={loading || !email} className="btn-primary w-full">
        {loading ? "Adding you…" : role === "organizer" ? "Reserve my club's page" : "Save my spot"}
      </button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <p className="text-xs text-mutedForeground">
        No spam. One email when v1 opens. Unsubscribe in one click. We never sell
        your data because that is a stupid way to run a business.
      </p>
    </form>
  );
}
