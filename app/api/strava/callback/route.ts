import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/strava/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code || !state) return NextResponse.redirect(`${origin}/dashboard?strava=error`);

  const userIdFromState = state.split(".")[0];

  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user || user.id !== userIdFromState) {
    return NextResponse.redirect(`${origin}/login?next=/dashboard`);
  }

  try {
    const tok = await exchangeCodeForToken(code);
    await supabase
      .from("profiles")
      .update({
        strava_athlete_id: tok.athlete.id,
        strava_access_token: tok.access_token,
        strava_refresh_token: tok.refresh_token,
        strava_expires_at: new Date(tok.expires_at * 1000).toISOString(),
        avatar_url: tok.athlete.profile ?? null,
        full_name: [tok.athlete.firstname, tok.athlete.lastname].filter(Boolean).join(" ") || null
      })
      .eq("id", user.id);
    return NextResponse.redirect(`${origin}/dashboard?strava=connected`);
  } catch (err) {
    console.error("strava callback", err);
    return NextResponse.redirect(`${origin}/dashboard?strava=error`);
  }
}
