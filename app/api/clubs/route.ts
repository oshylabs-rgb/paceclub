import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateClubCopy } from "@/lib/anthropic/club-copy";
import { slugify } from "@/lib/utils";

const ClubInput = z.object({
  clubName: z.string().min(2).max(120),
  city: z.string().min(2).max(120),
  whenWhere: z.string().min(2).max(500),
  vibe: z.string().min(2).max(500),
  paceBands: z.string().min(1).max(500)
});

const CITY_TO_COUNTRY: Record<string, string> = {
  london: "GB", manchester: "GB", edinburgh: "GB", bristol: "GB",
  stockholm: "SE", gothenburg: "SE", malmo: "SE",
  "new york": "US", nyc: "US", "los angeles": "US", la: "US",
  chicago: "US", austin: "US", "san francisco": "US", sf: "US"
};

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const json = await req.json();
  const parsed = ClubInput.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { clubName, city, whenWhere, vibe, paceBands } = parsed.data;
  let slug = slugify(clubName);

  // Ensure slug uniqueness
  for (let suffix = 0; suffix < 10; suffix++) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const { data } = await supabase.from("clubs").select("id").eq("slug", candidate).maybeSingle();
    if (!data) {
      slug = candidate;
      break;
    }
  }

  // AI-generate page copy
  let copy;
  try {
    copy = await generateClubCopy({ clubName, city, whenWhere, vibe, paceBands });
  } catch (err) {
    console.error("Club copy gen failed", err);
    copy = {
      tagline: `${clubName} runs in ${city}.`,
      about: `${clubName} meets ${whenWhere}. ${vibe}.`,
      pace_bands: paceBands.split(",").map((p) => p.trim()).filter(Boolean),
      first_session_title: "Next session",
      first_session_description: whenWhere
    };
  }

  const countryCode = CITY_TO_COUNTRY[city.toLowerCase()] ?? "US";

  const { error: clubError } = await supabase.from("clubs").insert({
    slug,
    name: clubName,
    tagline: copy.tagline,
    about: copy.about,
    city,
    country_code: countryCode,
    pace_bands: copy.pace_bands,
    created_by: user.id,
    plan: "free"
  });
  if (clubError) {
    console.error("club insert", clubError);
    return NextResponse.json({ error: "Could not create club" }, { status: 500 });
  }

  const { data: club } = await supabase.from("clubs").select("id").eq("slug", slug).single();

  await supabase.from("club_members").insert({
    club_id: club!.id,
    profile_id: user.id,
    role: "owner"
  });

  return NextResponse.json({ slug });
}
