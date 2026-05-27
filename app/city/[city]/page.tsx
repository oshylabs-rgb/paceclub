import { createSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 300;

const CITY_NAMES: Record<string, string> = {
  london: "London",
  stockholm: "Stockholm",
  "new-york": "New York",
  "los-angeles": "Los Angeles",
  chicago: "Chicago",
  austin: "Austin",
  gothenburg: "Gothenburg",
  manchester: "Manchester"
};

export async function generateMetadata({ params }: { params: { city: string } }) {
  const name = CITY_NAMES[params.city] ?? params.city;
  return {
    title: `${name} run clubs`,
    description: `Find a run club in ${name}. Real schedules, real people, free to join.`
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const cityName = CITY_NAMES[params.city] ?? params.city;
  const supabase = createSupabaseServerClient();
  const { data: clubs } = await supabase
    .from("clubs")
    .select("id, slug, name, tagline, city, pace_bands")
    .ilike("city", cityName)
    .order("name");

  return (
    <main className="container py-12">
      <header>
        <p className="text-xs uppercase tracking-wide text-mutedForeground">Run clubs</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">{cityName} run clubs</h1>
        <p className="mt-2 text-mutedForeground max-w-2xl">
          Every run club in {cityName} we know about, listed in one place. Tap one
          to see the schedule, RSVP to the next session, and meet the runners.
        </p>
      </header>

      {clubs && clubs.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((c) => (
            <li key={c.id} className="card">
              <p className="font-display text-lg font-semibold">{c.name}</p>
              <p className="mt-1 text-sm text-mutedForeground">{c.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {(c.pace_bands ?? []).slice(0, 3).map((p: string) => (
                  <span key={p} className="rounded-full bg-muted px-2 py-1">{p}</span>
                ))}
              </div>
              <a href={`/club/${c.slug}`} className="btn-ghost mt-4 w-full text-xs">View club</a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-10">
          <p className="font-display text-lg font-semibold">No clubs listed here yet.</p>
          <p className="mt-2 text-sm text-mutedForeground">
            Run a club in {cityName}? Hit the button below and your club is up in
            five minutes.
          </p>
          <a href="/onboarding" className="btn-primary mt-4">Add your club</a>
        </div>
      )}
    </main>
  );
}
