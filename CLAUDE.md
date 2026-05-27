# CLAUDE.md — PaceClub project context

**For Windsurf Cascade, Claude Code, or any AI assistant picking up work on this project.**

## What this product is

PaceClub is a PWA that helps runners find a local run club and helps run-club organizers replace the WhatsApp + Excel + Google Forms + Strava admin mess they currently run their clubs on.

- **Markets:** US (primary), UK, Sweden
- **Stack:** Next.js 14 App Router + Supabase + Stripe + Anthropic + Vercel (Node 24)
- **Vercel team:** Vett's projects (`team_Ha87dazpFrZWxGtyiEA0x0zD`)
- **Domain:** paceclub.run
- **Founder:** Arnold Oshenye, Oshylabs Ltd (UK 16883720)

## Revenue model

| Tier | Audience | Price | Cap |
|---|---|---|---|
| Runner Free | Any runner | £0 | Unlimited |
| Club Free | Organizers | £0 | Up to 50 members |
| Club Pro Monthly | Organizers | £15/mo (~190 SEK, ~$20 USD) | Unlimited |
| Club Pro Annual | Organizers | £144/yr | Unlimited |

Path to 39,000 SEK MRR = 207 paying clubs at £15/mo.

## Strategic rules to obey

1. **PWA + Capacitor wrapper (Build Path 2).** Web PWA at paceclub.run is primary. Capacitor wraps for Apple App Store + Google Play submission. Full native (React Native / Expo) is NOT in scope — PaceClub has no deep-hardware requirement that needs it.
2. **Strava is not the competitor.** We sit on top of Strava. Sign in with Strava. Leave activities in Strava. We add the club layer.
3. **Organizer is the paying customer.** Runner is the network-effect engine. Optimize accordingly.
4. **No hyphens or em dashes in any user-facing copy.** This is a hard rule for Arnold's brand voice.
5. **Currency:** GBP is primary. SEK and USD shown alongside for cross-market clarity.

## Code conventions

- TypeScript strict mode.
- Server components by default. Use `"use client"` only when interactivity is needed.
- Stripe live mode from day one (no test-mode detour). Stripe is not present in Phase 3 at all.
- Organizer Stripe payments stay on web (paceclub.run) — keeps the full margin and stays legal under recent Apple/Google B2B-external-payment rules.
- All Supabase mutations behind RLS. Service-role writes only in `/api/stripe/webhook` and `/api/waitlist` routes.
- Zod for input validation on every API route.
- No client-side calls to Anthropic or Stripe. Always server-route.
- Apply the Oshylabs Anthropic JSON hardening (see `lib/anthropic/club-copy.ts`):
  - `max_tokens: 12000` minimum
  - Parse the **last** text block, not the first
  - Strip code fences
  - Slice from first `{` to last `}`
  - Multi-tier JSON repair fallback

## When in doubt, see these files

- `README.md` — setup and deploy
- `supabase/migrations/` — schema is the source of truth
- `lib/anthropic/club-copy.ts` — the standard Anthropic call shape
- Project root `Phase2_PRD_PaceClub_2026-05-26.md` — the canonical PRD

## Known limitations (do not silently fix these without asking)

- No Apple/Google social sign-in. Magic link only at v1.
- No real-time chat. Comms are broadcast email only.
- No Mapbox route designer. Link out to Strava route URLs.
- No multi-language UI. English first. Swedish at v2 if Stockholm clubs convert.

## Outreach voice (when generating copy on behalf of Arnold)

- Human, warm, builder talking to other runners.
- No hyphens, no em dashes, no marketing cliches, no "join us".
- Always provide both an email version and a DM version unprompted.
- B2B and clinic/business outreach routes via Zoho: arnold.oshenye@oshylabs.eu
- Casual consumer outreach routes via Gmail: oshylabs@gmail.com

## Things that should NEVER ship without Arnold's explicit go

Per Arnold's Reversibility rule:

- Buying a domain
- Flipping Stripe to live mode
- Sending outreach in his name
- Production database changes
- Mass operations
