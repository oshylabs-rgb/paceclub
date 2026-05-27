import { NextResponse } from "next/server";
import { buildAuthorizeUrl } from "@/lib/strava/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL!));

  // state = signed-but-simple: use user id + random
  const state = `${user.id}.${crypto.randomUUID()}`;
  const url = buildAuthorizeUrl(state);
  return NextResponse.redirect(url);
}
