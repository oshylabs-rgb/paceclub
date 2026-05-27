"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    clubName: "",
    city: "",
    whenWhere: "",
    vibe: "",
    paceBands: ""
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm({ ...form, [key]: value });
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/clubs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Could not create club");
      }
      const data = (await res.json()) as { slug: string };
      router.push(`/club/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create club");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-2xl py-20">
      <h1 className="font-display text-3xl font-semibold">Start your club page</h1>
      <p className="mt-2 text-sm text-mutedForeground">
        Five questions. We auto-write the rest. You can edit anything after.
      </p>

      <div className="card mt-8 space-y-6">
        <p className="text-xs uppercase tracking-wide text-mutedForeground">Step {step} of 5</p>

        {step === 1 && (
          <Field label="Club name">
            <input className="input" value={form.clubName} onChange={(e) => update("clubName", e.target.value)} />
          </Field>
        )}
        {step === 2 && (
          <Field label="City">
            <input className="input" placeholder="London, Stockholm, NYC..." value={form.city} onChange={(e) => update("city", e.target.value)} />
          </Field>
        )}
        {step === 3 && (
          <Field label="When and where do you usually meet?">
            <input className="input" placeholder="Tuesdays 18:15 at Paddington Rec" value={form.whenWhere} onChange={(e) => update("whenWhere", e.target.value)} />
          </Field>
        )}
        {step === 4 && (
          <Field label="What's the vibe?">
            <input className="input" placeholder="Social, slow, all paces welcome" value={form.vibe} onChange={(e) => update("vibe", e.target.value)} />
          </Field>
        )}
        {step === 5 && (
          <Field label="Pace bands (comma-separated)">
            <input className="input" placeholder="5:00-5:30, 5:30-6:00, any" value={form.paceBands} onChange={(e) => update("paceBands", e.target.value)} />
          </Field>
        )}

        <div className="flex justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-ghost">Back</button>
          ) : <span />}
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="btn-primary">Next</button>
          ) : (
            <button onClick={submit} disabled={loading} className="btn-primary">
              {loading ? "Creating..." : "Create club page"}
            </button>
          )}
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
