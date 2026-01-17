-- 1) Create an admin allowlist table (for authenticated admins only)
create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;

-- Only existing admins can read the admin list via API
drop policy if exists "Admins can read admin list" on public.app_admins;
create policy "Admins can read admin list"
on public.app_admins
for select
to authenticated
using (exists (select 1 from public.app_admins a where a.user_id = auth.uid()));

-- 2) follow_up_leads: public can INSERT, only admins can SELECT
alter table public.follow_up_leads enable row level security;

-- Remove any old policies that might exist
drop policy if exists "Anyone can submit follow-up leads" on public.follow_up_leads;
drop policy if exists "Public can submit follow-up leads" on public.follow_up_leads;
drop policy if exists "Admins can read follow up leads" on public.follow_up_leads;
drop policy if exists "Admins can read follow-up leads" on public.follow_up_leads;

-- Table privileges: anon can only insert. authenticated can select (but RLS still applies)
revoke all on table public.follow_up_leads from anon;
grant insert on table public.follow_up_leads to anon;

revoke all on table public.follow_up_leads from authenticated;
grant insert on table public.follow_up_leads to authenticated;
grant select on table public.follow_up_leads to authenticated;

-- Policies
create policy "Public can submit follow-up leads"
on public.follow_up_leads
for insert
to anon, authenticated
with check (true);

create policy "Admins can read follow-up leads"
on public.follow_up_leads
for select
to authenticated
using (exists (select 1 from public.app_admins a where a.user_id = auth.uid()));