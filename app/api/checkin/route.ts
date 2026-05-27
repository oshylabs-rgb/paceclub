import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const Input = z.object({
  sessionId: z.string().uuid(),
  profileIds: z.array(z.string().uuid()).min(1).max(500)
});

/**
 * Organizer-only bulk check-in.
 * RLS handles authorization (only organizers/owners can write to attendance for their club's sessions).
 */
export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const json = await req.json();
  const parsed = Input.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const rows = parsed.data.profileIds.map((pid) => ({
    session_id: parsed.data.sessionId,
    profile_id: pid,
    checked_in_by: user.id
  }));

  const { error } = await supabase
    .from("attendance")
    .upsert(rows, { onConflict: "session_id,profile_id" });
  if (error) {
    console.error("checkin", error);
    return NextResponse.json({ error: "Could not record attendance" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, recorded: rows.length });
}
