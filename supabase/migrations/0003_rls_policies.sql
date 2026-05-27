-- =====================================================================
-- PaceClub 0003 — RLS policies
-- Default deny. Then explicit allows per table.
-- =====================================================================

alter table public.profiles        enable row level security;
alter table public.clubs           enable row level security;
alter table public.club_members    enable row level security;
alter table public.sessions        enable row level security;
alter table public.rsvps           enable row level security;
alter table public.attendance      enable row level security;

-- profiles --------------------------------------------------------------
create policy "profile owner can read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profile owner can update"
  on public.profiles for update
  using (auth.uid() = id);

create policy "public can read minimal profile fields via club membership"
  on public.profiles for select
  using (
    exists (
      select 1 from public.club_members cm_self
      join public.club_members cm_other on cm_other.club_id = cm_self.club_id
      where cm_self.profile_id = auth.uid()
      and cm_other.profile_id = profiles.id
    )
  );

-- clubs ----------------------------------------------------------------
create policy "anyone can read clubs"
  on public.clubs for select using (true);

create policy "organizers can update their clubs"
  on public.clubs for update
  using (
    exists (
      select 1 from public.club_members
      where club_id = clubs.id
      and profile_id = auth.uid()
      and role in ('owner','organizer')
    )
  );

create policy "authenticated can create club"
  on public.clubs for insert
  with check (auth.uid() is not null and created_by = auth.uid());

-- club_members ---------------------------------------------------------
create policy "members can read membership of their clubs"
  on public.club_members for select
  using (
    exists (
      select 1 from public.club_members cm
      where cm.club_id = club_members.club_id
      and cm.profile_id = auth.uid()
    )
  );

create policy "self can join"
  on public.club_members for insert
  with check (auth.uid() = profile_id);

create policy "owner or self can remove membership"
  on public.club_members for delete
  using (
    auth.uid() = profile_id
    or exists (
      select 1 from public.club_members cm
      where cm.club_id = club_members.club_id
      and cm.profile_id = auth.uid()
      and cm.role in ('owner','organizer')
    )
  );

-- sessions -------------------------------------------------------------
create policy "anyone can read non-cancelled sessions"
  on public.sessions for select
  using (cancelled = false);

create policy "organizers manage sessions"
  on public.sessions for all
  using (
    exists (
      select 1 from public.club_members
      where club_id = sessions.club_id
      and profile_id = auth.uid()
      and role in ('owner','organizer')
    )
  );

-- rsvps ----------------------------------------------------------------
create policy "self can manage own rsvp"
  on public.rsvps for all
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

create policy "organizers can read rsvps for their club sessions"
  on public.rsvps for select
  using (
    exists (
      select 1 from public.sessions s
      join public.club_members cm on cm.club_id = s.club_id
      where s.id = rsvps.session_id
      and cm.profile_id = auth.uid()
      and cm.role in ('owner','organizer')
    )
  );

-- attendance -----------------------------------------------------------
create policy "self can read own attendance"
  on public.attendance for select
  using (profile_id = auth.uid());

create policy "organizers manage attendance"
  on public.attendance for all
  using (
    exists (
      select 1 from public.sessions s
      join public.club_members cm on cm.club_id = s.club_id
      where s.id = attendance.session_id
      and cm.profile_id = auth.uid()
      and cm.role in ('owner','organizer')
    )
  );
