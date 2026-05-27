import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { RsvpButton } from "@/components/RsvpButton";

export const dynamic = "force-dynamic";

export default async function SessionPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: session } = await supabase
    .from("sessions")
    .select("*, clubs (name, slug, city)")
    .eq("id", params.id)
    .maybeSingle();
  if (!session) notFound();

  const { count: going } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("session_id", session.id)
    .eq("status", "going");

  const { count: waitlist } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("session_id", session.id)
    .eq("status", "waitlist");

  const myRsvp = user
    ? (
        await supabase
          .from("rsvps")
          .select("status, position")
          .eq("session_id", session.id)
          .eq("profile_id", user.id)
          .maybeSingle()
      ).data
    : null;

  return (
    <main className="container max-w-2xl py-12">
      <p className="text-xs uppercase tracking-wide text-mutedForeground">
        <a href={`/club/${(session.clubs as any)?.slug}`} className="hover:text-foreground">
          {(session.clubs as any)?.name}
        </a>
        {" · "}
        {(session.clubs as any)?.city}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold">{session.title}</h1>
      <p className="mt-2 text-mutedForeground">
        {format(new Date(session.starts_at), "EEEE d MMMM, HH:mm")} · {session.meeting_point ?? "Meeting point TBC"}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="card">
          <div className="font-display text-2xl font-semibold">{going ?? 0}{session.rsvp_cap ? ` / ${session.rsvp_cap}` : ""}</div>
          <div className="text-mutedForeground">Going</div>
        </div>
        <div className="card">
          <div className="font-display text-2xl font-semibold">{waitlist ?? 0}</div>
          <div className="text-mutedForeground">Waitlist</div>
        </div>
        <div className="card">
          <div className="font-display text-2xl font-semibold">{session.distance_km ?? "—"}</div>
          <div className="text-mutedForeground">km</div>
        </div>
      </div>

      {session.description ? (
        <p className="mt-8 whitespace-pre-line text-mutedForeground">{session.description}</p>
      ) : null}

      <div className="mt-8">
        <RsvpButton sessionId={session.id} isAuthed={!!user} current={myRsvp ?? undefined} />
      </div>
    </main>
  );
}
