-- =====================================================================
-- PaceClub 0002 — core schema for v1
-- Profiles, clubs, club members, sessions, RSVPs, attendance, plans.
-- All tables RLS on from day one.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Profiles (one row per Supabase auth user)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  city text,
  default_pace_band text check (default_pace_band in ('5:00-5:30','5:30-6:00','6:00-6:30','6:30-7:00','7:00+','any')),
  strava_athlete_id bigint,
  strava_access_token text,
  strava_refresh_token text,
  strava_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_email_idx on public.profiles (lower(email));
create unique index if not exists profiles_strava_idx on public.profiles (strava_athlete_id);

-- ---------------------------------------------------------------------
-- Clubs
-- ---------------------------------------------------------------------
create table if not exists public.clubs (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  tagline text,
  city text not null,
  country_code text not null check (length(country_code) = 2),
  cover_image_url text,
  about text,
  pace_bands text[] default array[]::text[],
  social_instagram text,
  social_strava text,
  social_website text,
  contact_email text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'pro_annual')),
  member_cap_warning_sent boolean default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clubs_city_idx on public.clubs (city);
create index if not exists clubs_country_idx on public.clubs (country_code);
create index if not exists clubs_plan_idx on public.clubs (plan);

-- ---------------------------------------------------------------------
-- Club members (a profile's role in a club)
-- ---------------------------------------------------------------------
create table if not exists public.club_members (
  id uuid primary key default uuid_generate_v4(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('runner', 'organizer', 'owner')),
  joined_at timestamptz not null default now(),
  unique (club_id, profile_id)
);

create index if not exists members_club_idx on public.club_members (club_id);
create index if not exists members_profile_idx on public.club_members (profile_id);

-- ---------------------------------------------------------------------
-- Sessions (a recurring or one-off run)
-- ---------------------------------------------------------------------
create table if not exists public.sessions (
  id uuid primary key default uuid_generate_v4(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null,
  duration_minutes int not null default 60,
  meeting_point text,
  pace_band text,
  distance_km numeric(5,2),
  rsvp_cap int,
  recurrence text default 'none' check (recurrence in ('none','weekly','biweekly','monthly')),
  cancelled boolean default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists sessions_club_idx on public.sessions (club_id);
create index if not exists sessions_starts_idx on public.sessions (starts_at);

-- ---------------------------------------------------------------------
-- RSVPs (with waitlist via status)
-- ---------------------------------------------------------------------
create table if not exists public.rsvps (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('going','waitlist','cancelled')),
  position int,
  created_at timestamptz not null default now(),
  unique (session_id, profile_id)
);

create index if not exists rsvps_session_idx on public.rsvps (session_id);
create index if not exists rsvps_profile_idx on public.rsvps (profile_id);
create index if not exists rsvps_status_idx on public.rsvps (status);

-- ---------------------------------------------------------------------
-- Attendance
-- ---------------------------------------------------------------------
create table if not exists public.attendance (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  checked_in_at timestamptz not null default now(),
  checked_in_by uuid references public.profiles(id) on delete set null,
  strava_activity_id bigint,
  unique (session_id, profile_id)
);

create index if not exists attendance_session_idx on public.attendance (session_id);
create index if not exists attendance_profile_idx on public.attendance (profile_id);

-- ---------------------------------------------------------------------
-- Helper: member count per club
-- ---------------------------------------------------------------------
create or replace view public.club_member_counts as
select
  c.id as club_id,
  c.name,
  c.slug,
  c.plan,
  count(distinct cm.profile_id) as member_count
from public.clubs c
left join public.club_members cm on cm.club_id = c.id
group by c.id, c.name, c.slug, c.plan;

-- ---------------------------------------------------------------------
-- Helper: runner attendance streak (consecutive weeks attended)
-- ---------------------------------------------------------------------
create or replace function public.runner_streak(p_profile_id uuid)
returns int
language sql stable as $$
  with weeks as (
    select distinct date_trunc('week', s.starts_at) as wk
    from public.attendance a
    join public.sessions s on s.id = a.session_id
    where a.profile_id = p_profile_id
    order by wk desc
  ),
  numbered as (
    select wk, row_number() over (order by wk desc) as rn from weeks
  ),
  streak as (
    select count(*) as len from numbered
    where wk = date_trunc('week', now()) - ((rn - 1) || ' weeks')::interval
  )
  select len::int from streak;
$$;
