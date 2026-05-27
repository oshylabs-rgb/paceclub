import Anthropic from "@anthropic-ai/sdk";

/**
 * Generates initial club page copy from a 5-question onboarding.
 * Applies the Oshylabs JSON hardening rules:
 *  - max_tokens >= 12000
 *  - parse last text block
 *  - strip code fences
 *  - slice from first { to last }
 *  - multi-tier JSON repair fallback
 */
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

export interface OnboardingInput {
  clubName: string;
  city: string;
  whenWhere: string; // freeform e.g. "Tuesdays 18:15 at Bacchis Syre"
  vibe: string; // freeform e.g. "social, slow, all paces welcome"
  paceBands: string; // freeform e.g. "5:00-5:30, 5:30-6:00, anyone"
}

export interface ClubCopy {
  tagline: string;
  about: string;
  pace_bands: string[];
  first_session_title: string;
  first_session_description: string;
}

const SYSTEM = `You write run-club page copy in plain, warm prose with no hyphens, no em dashes, and no marketing fluff. Keep reasoning to 2 sentences max.`;

const PROMPT = (i: OnboardingInput) => `Generate club page copy for a run club called "${i.clubName}" in ${i.city}.

Session info: ${i.whenWhere}
Vibe: ${i.vibe}
Pace bands: ${i.paceBands}

Return ONLY a JSON object with this exact shape:
{
  "tagline": "one short sentence under 90 chars",
  "about": "two short paragraphs of plain text",
  "pace_bands": ["array of pace band strings exactly as written by the user, deduplicated"],
  "first_session_title": "short session title",
  "first_session_description": "two-sentence description of the first session"
}

Rules: no hyphens, no em dashes, no exclamation marks, no marketing cliches, no "join us" filler.`;

export async function generateClubCopy(input: OnboardingInput): Promise<ClubCopy> {
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 12000,
    system: SYSTEM,
    messages: [{ role: "user", content: PROMPT(input) }]
  });

  // Take last text block
  const blocks = res.content.filter((b) => b.type === "text");
  const raw = (blocks[blocks.length - 1] as { text: string } | undefined)?.text ?? "";

  // Strip fences
  const stripped = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Slice first { to last }
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in response");
  const sliced = stripped.slice(start, end + 1);

  try {
    return JSON.parse(sliced) as ClubCopy;
  } catch {
    // Tier 1: strip trailing commas
    const t1 = sliced.replace(/,\s*([}\]])/g, "$1");
    try {
      return JSON.parse(t1) as ClubCopy;
    } catch {
      // Tier 2: aggressive close
      try {
        return JSON.parse(t1 + "}}}}") as ClubCopy;
      } catch {
        // Tier 3: trim back to last }
        const lastClose = t1.lastIndexOf("}");
        if (lastClose === -1) throw new Error("JSON repair failed");
        return JSON.parse(t1.slice(0, lastClose + 1)) as ClubCopy;
      }
    }
  }
}
