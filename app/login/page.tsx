"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` }
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container flex min-h-screen items-center justify-center py-20">
      <div className="card w-full max-w-md">
        <h1 className="font-display text-2xl font-semibold">Sign in to PaceClub</h1>
        <p className="mt-2 text-sm text-mutedForeground">
          We send a magic link. No password to remember.
        </p>
        {sent ? (
          <div className="mt-6 rounded-md bg-accent/10 p-4 text-sm">
            Check your inbox. The link expires in 10 minutes.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="email"
            />
            <button type="submit" disabled={loading || !email} className="btn-primary w-full">
              {loading ? "Sending..." : "Email me a magic link"}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>
        )}
      </div>
    </main>
  );
}
