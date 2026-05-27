import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";

const WaitlistSchema = z.object({
  email: z.string().email().max(200),
  role: z.enum(["runner", "organizer"]),
  city: z.string().max(120).nullable().optional(),
  clubName: z.string().max(200).nullable().optional(),
  pain: z.string().max(2000).nullable().optional(),
  source: z.string().max(500).nullable().optional()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = WaitlistSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("waitlist_signups").insert({
      email: parsed.data.email.toLowerCase().trim(),
      role: parsed.data.role,
      city: parsed.data.city ?? null,
      club_name: parsed.data.clubName ?? null,
      pain: parsed.data.pain ?? null,
      source: parsed.data.source ?? null,
      user_agent: req.headers.get("user-agent") ?? null,
      ip_country: req.headers.get("x-vercel-ip-country") ?? null
    });

    if (error) {
      // Friendly handling on duplicate email
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      console.error("waitlist insert error", error);
      return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist route error", err);
    return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
  }
}
