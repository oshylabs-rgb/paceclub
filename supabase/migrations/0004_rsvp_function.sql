-- =====================================================================
-- PaceClub 0004 — RSVP with cap-aware waitlist
-- Atomic so two simultaneous RSVPs cannot oversubscribe the cap.
-- =====================================================================

create or replace function public.rsvp_to_session(p_session_id uuid)
returns table (status text, position int)
language plpgsql security definer as $$
declare
  v_cap int;
  v_going int;
  v_status text;
  v_position int;
begin
  -- pull cap with a row lock so concurrent callers serialise
  select rsvp_cap into v_cap
  from public.sessions
  where id = p_session_id
  for update;

  if v_cap is null then
    v_status := 'going';
    v_position := null;
  else
    select count(*) into v_going
    from public.rsvps
    where session_id = p_session_id and status = 'going';

    if v_going < v_cap then
      v_status := 'going';
      v_position := null;
    else
      v_status := 'waitlist';
      select coalesce(max(position), 0) + 1 into v_position
      from public.rsvps
      where session_id = p_session_id and status = 'waitlist';
    end if;
  end if;

  insert into public.rsvps (session_id, profile_id, status, position)
  values (p_session_id, auth.uid(), v_status, v_position)
  on conflict (session_id, profile_id)
  do update set status = excluded.status, position = excluded.position
  returning rsvps.status, rsvps.position into v_status, v_position;

  status := v_status;
  position := v_position;
  return next;
end;
$$;

revoke all on function public.rsvp_to_session(uuid) from public;
grant execute on function public.rsvp_to_session(uuid) to authenticated;
