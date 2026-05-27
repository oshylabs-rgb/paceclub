-- =====================================================================
-- PaceClub 0001 — waitlist
-- Phase 3 only. Captures dual-track signups (runner / organizer).
-- =====================================================================

create extension if not exists "uuid-ossp";

create table if not exists public.waitlist_signups (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  role text not null check (role in ('runner', 'organizer')),
  city text,
  club_name text,
  pain text,
  source text,
  user_agent text,
  ip_country text,
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_email_unique
  on public.waitlist_signups (lower(email));

create index if not exists waitlist_role_idx on public.waitlist_signups (role);
create index if not exists waitlist_city_idx on public.waitlist_signups (city);
create index if not exists waitlist_created_idx on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

-- No client reads. All writes go through service role on the API route.
create policy "service role only - select"
  on public.waitlist_signups for select
  using (auth.role() = 'service_role');

create policy "service role only - insert"
  on public.waitlist_signups for insert
  with check (auth.role() = 'service_role');

-- Counts view for daily Phase 3 reporting
create or replace view public.waitlist_counts as
select
  role,
  city,
  count(*) as signups,
  count(distinct lower(email)) as unique_emails,
  max(created_at) as last_signup
from public.waitlist_signups
group by role, city
order by signups desc;

comment on table public.waitlist_signups is 'Phase 3 waitlist signups. Two roles: runner and organizer.';
