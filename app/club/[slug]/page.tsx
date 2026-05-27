import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("name, city, tagline, country_code")
    .eq("slug", params.slug)
    .maybeSingle();
  if (!club) return { title: "Club not found" };
  return {
    title: `${club.name} — run club in ${club.city}`,
    description: club.tagline ?? `${club.name} is a run club in ${club.city}.`
  };
}

export default async function ClubPage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();
  if (!club) notFound();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, title, starts_at, meeting_point, pace_band, rsvp_cap, distance_km")
    .eq("club_id", club.id)
    .eq("cancelled", false)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true })
    .limit(6);

  const { data: counts } = await supabase
    .from("club_member_counts")
    .select("member_count")
    .eq("club_id", club.id)
    .maybeSingle();

  return (
    <main>
      <header className="border-b border-border bg-muted">
        <div className="container py-12">
          <p className="text-xs uppercase tracking-wide text-mutedForeground">
            {club.city}, {club.country_code}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold">{club.name}</h1>
          {club.tagline ? <p className="mt-2 text-mutedForeground">{club.tagline}</p> : null}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {(club.pace_bands ?? []).map((p: string) => (
              <span key={p} className="rounded-full bg-white px-3 py-1 font-medium">{p}</span>
            ))}
            <span className="rounded-full bg-white px-3 py-1 font-medium">
              {counts?.member_count ?? 0} members
            </span>
          </div>
        </div>
      </header>

      <section className="container grid gap-8 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <article className="prose max-w-none">
            <h2 className="font-display text-2xl font-semibold">About</h2>
            <p className="whitespace-pre-line text-mutedForeground">{club.about}</p>
          </article>

          <div>
            <h2 className="font-display text-2xl font-semibold">Upcoming sessions</h2>
            {sessions && sessions.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {sessions.map((s) => (
                  <li key={s.id} className="card flex items-center justify-between">
                    <div>
                      <p className="font-display text-base font-semibold">{s.title}</p>
                      <p className="text-xs text-mutedForeground">
                        {format(new Date(s.starts_at), "EEE d MMM, HH:mm")} · {s.meeting_point ?? "TBC"} · {s.pace_band ?? "all paces"}
                      </p>
                    </div>
                    <a href={`/session/${s.id}`} className="btn-primary text-xs">RSVP</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-mutedForeground">No upcoming sessions yet.</p>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card">
            <p className="font-display text-base font-semibold">Run with this club</p>
            <p className="mt-2 text-sm text-mutedForeground">
              Sign in once. RSVP to any session. Build your attendance streak.
            </p>
            <a href="/login" className="btn-primary mt-4 w-full">Sign in</a>
          </div>
          {club.social_instagram ? (
            <div className="card">
              <p className="font-display text-base font-semibold">Find them online</p>
              <a className="mt-2 block text-sm" href={club.social_instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
