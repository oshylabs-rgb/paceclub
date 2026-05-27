import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: ownedClubs } = await supabase
    .from("clubs")
    .select("id, slug, name, city, plan, country_code")
    .eq("created_by", user.id);

  const { data: myMemberships } = await supabase
    .from("club_members")
    .select("role, clubs (id, slug, name, city)")
    .eq("profile_id", user.id);

  return (
    <main className="container py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Your PaceClub</h1>
          <p className="text-sm text-mutedForeground">Signed in as {user.email}</p>
        </div>
        <a href="/onboarding" className="btn-primary">Start a new club</a>
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold">Clubs you organize</h2>
        {ownedClubs && ownedClubs.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {ownedClubs.map((c) => (
              <li key={c.id} className="card">
                <p className="font-display text-lg font-semibold">{c.name}</p>
                <p className="text-sm text-mutedForeground">
                  {c.city} · plan: {c.plan}
                </p>
                <a className="btn-ghost mt-3 text-xs" href={`/club/${c.slug}`}>
                  View page
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-mutedForeground">
            None yet. Hit "Start a new club" to set one up in five minutes.
          </p>
        )}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold">Clubs you run with</h2>
        {myMemberships && myMemberships.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {myMemberships.map((m, i) => (
              <li key={i} className="card">
                <p className="font-display text-lg font-semibold">
                  {(m.clubs as any)?.name}
                </p>
                <p className="text-sm text-mutedForeground">
                  {(m.clubs as any)?.city} · {m.role}
                </p>
                <a
                  className="btn-ghost mt-3 text-xs"
                  href={`/club/${(m.clubs as any)?.slug}`}
                >
                  View page
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-mutedForeground">
            Not joined any clubs yet. Browse the directory at <a href="/city/london" className="underline">/city/london</a>.
          </p>
        )}
      </section>
    </main>
  );
}
