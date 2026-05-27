"use client";

import { useState } from "react";

type Current = { status: string; position: number | null } | undefined;

export function RsvpButton({
  sessionId,
  isAuthed,
  current
}: {
  sessionId: string;
  isAuthed: boolean;
  current?: Current;
}) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Current>(current);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthed) {
    return (
      <a href="/login" className="btn-primary w-full">Sign in to RSVP</a>
    );
  }

  async function handleRsvp() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not RSVP");
      setState({ status: data.status, position: data.position });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not RSVP");
    } finally {
      setLoading(false);
    }
  }

  if (state?.status === "going") {
    return (
      <div className="card border-accent text-center">
        <p className="font-display text-lg font-semibold text-accent">You are in.</p>
        <p className="mt-1 text-sm text-mutedForeground">See you there.</p>
      </div>
    );
  }
  if (state?.status === "waitlist") {
    return (
      <div className="card text-center">
        <p className="font-display text-lg font-semibold">Waitlist position #{state.position}</p>
        <p className="mt-1 text-sm text-mutedForeground">
          We will email you the moment a spot opens.
        </p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleRsvp} disabled={loading} className="btn-primary w-full">
        {loading ? "RSVP..." : "RSVP for this session"}
      </button>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
