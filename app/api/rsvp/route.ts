import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const Input = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const json = await req.json();
  const parsed = Input.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { data, error } = await supabase.rpc("rsvp_to_session", {
    p_session_id: parsed.data.sessionId
  });
  if (error) {
    console.error("rsvp rpc", error);
    return NextResponse.json({ error: "Could not RSVP" }, { status: 500 });
  }
  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ status: row?.status ?? "going", position: row?.position ?? null });
}
