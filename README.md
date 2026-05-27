# PaceClub

Find your run club. RSVP. Bin the spreadsheet.

A PWA for runners and run-club organizers. Free for runners. Free for clubs under 50 members. £15/mo Pro above that.

Built on the standard Oshylabs stack: Next.js 14 + Supabase + Stripe + Anthropic + Vercel. Node 24.

## Quick start (local development)

```bash
# 1. Install dependencies
pnpm install            # or npm install

# 2. Copy env vars
cp .env.example .env.local
# Fill in the real values from Supabase, Stripe (test mode), Strava, Anthropic.

# 3. Run the migrations against your Supabase project
# Paste each file in supabase/migrations/*.sql into the Supabase SQL editor in order:
#   0001_waitlist.sql
#   0002_core_schema.sql
#   0003_rls_policies.sql
#   0004_rsvp_function.sql

# 4. Start the dev server
pnpm dev                # or npm run dev

# Visit http://localhost:3000
```

## Production deploy (Vercel)

1. Push this folder to a GitHub repo under your account.
2. Create a new Vercel project from the repo, under the **Vett's projects** team (team ID `team_Ha87dazpFrZWxGtyiEA0x0zD`).
3. Add the env vars from `.env.example` to the Vercel project (Production, Preview, Development).
4. Deploy. First deploy will succeed without Stripe / Strava / Anthropic — only Supabase env vars are required for the waitlist landing page.
5. Attach the custom domain `paceclub.run`:
   - Buy at https://vercel.com/domains/search?q=paceclub.run (or via Loopia).
   - Add it under Project Settings → Domains.

## Phase 3 → Phase 4 progression

This repo is structured so that the **waitlist landing page works as Phase 3 with only the 0001 migration applied**. You do not need to apply 0002–0004 until you decide to build the full app in Phase 4.

| Phase | What goes live | What you need |
|---|---|---|
| Phase 3 | `/` waitlist landing | `0001_waitlist.sql` only, no Stripe, no Strava |
| Phase 4 | Full v1: auth, clubs, sessions, RSVP, attendance, Stripe paywall, Strava OAuth | All four migrations + all env vars |

## Architecture notes

- **PWA + Capacitor wrapper.** Web PWA at paceclub.run ships first (no review queue, no store tax on organizer Stripe payments which stay on web). Capacitor wrapper submitted to Apple App Store and Google Play 2-3 weeks later for ASO traffic and trust. See `capacitor.config.ts` and `Phase5_Store_Launch/`.
- **Strava OAuth on signup.** We do not compete with Strava on tracking. Activities live in Strava. We add the layer above: RSVP, attendance, club pages, comms.
- **Stripe live mode from day one.** No test detour. Stripe stays out of the build entirely during Phase 3 (waitlist has no payment surface). Phase 4 plugs live Stripe keys straight in. See `.env.example`.
- **RLS on every table from day one.** See `supabase/migrations/0003_rls_policies.sql`. Service-role writes are confined to webhooks (`/api/stripe/webhook`) and the public waitlist (`/api/waitlist`).
- **Anthropic JSON hardening.** `lib/anthropic/club-copy.ts` follows the Oshylabs convention: max_tokens 12000, parse last text block, strip fences, slice first `{` to last `}`, multi-tier JSON repair.

## File map

```
app/
  layout.tsx               root layout, fonts, metadata
  page.tsx                 marketing landing + waitlist
  thanks/page.tsx          waitlist thank-you
  login/page.tsx           magic-link auth
  dashboard/page.tsx       authed home (owned clubs + memberships)
  onboarding/page.tsx      5-question club setup wizard
  club/[slug]/page.tsx     public club page (SEO target)
  city/[city]/page.tsx     city directory (SEO target)
  session/[id]/page.tsx    public session page + RSVP button
  privacy/page.tsx         privacy policy
  terms/page.tsx           terms of service
  sitemap.ts               sitemap generator
  robots.ts                robots.txt generator
  api/
    waitlist/route.ts        POST → insert waitlist signup
    auth/callback/route.ts   GET  → magic-link exchange
    clubs/route.ts           POST → create club (AI-gen copy)
    rsvp/route.ts            POST → rsvp_to_session RPC
    checkin/route.ts         POST → bulk attendance
    stripe/checkout/route.ts POST → Pro upgrade checkout
    stripe/webhook/route.ts  POST → subscription lifecycle
    strava/connect/route.ts  GET  → start Strava OAuth
    strava/callback/route.ts GET  → finish Strava OAuth
components/
  Hero.tsx                 landing hero
  WaitlistForm.tsx         dual-track signup form
  FeatureGrid.tsx          6 v1 features
  SocialProof.tsx          mined quote evidence
  FAQ.tsx                  6 FAQs
  Footer.tsx               footer
  RsvpButton.tsx           RSVP with optimistic UI
lib/
  utils.ts                 cn, slugify, currency format helpers
  supabase/client.ts       browser Supabase client
  supabase/server.ts       server + service-role clients
  stripe/client.ts         Stripe SDK + price IDs
  strava/client.ts         Strava OAuth + activity fetch
  anthropic/club-copy.ts   AI-generate club page copy
supabase/
  migrations/0001_waitlist.sql
  migrations/0002_core_schema.sql
  migrations/0003_rls_policies.sql
  migrations/0004_rsvp_function.sql
public/
  manifest.webmanifest     PWA manifest
```

## Known gaps (post-Phase 3, before launch)

- [ ] OG image at `/og.png` (1200×630). See `Phase5_Launch_Prep/og_image_brief.md` for the design brief.
- [ ] App icons at `/icon-192.png` and `/icon-512.png` for PWA install.
- [ ] Seed data: at least 3 real clubs per city directory page or the directories look empty.
- [ ] Resend transactional email templates for waitlist confirmation, magic link styling, RSVP confirmation, RSVP waitlist-bumped.
- [ ] Plausible Analytics or PostHog snippet in `app/layout.tsx`.
- [ ] Sentry for error reporting.
- [ ] Stripe products + prices created in test mode, IDs copied into env vars.
- [ ] Strava API app registered at https://www.strava.com/settings/api, client ID + secret copied into env vars.

## Conventions

- No hyphens or em dashes in user-facing copy.
- Currency: GBP primary, SEK and USD shown in tooltips / FAQ where it helps.
- Tone: human, warm, honest. Builder telling other people what is broken and what they are doing about it. No marketing fluff. No "join us on our journey".

## License

Proprietary. © 2026 Oshylabs Ltd. All rights reserved.
