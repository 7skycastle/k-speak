alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.review_items enable row level security;
alter table public.analytics_events enable row level security;
alter table public.guest_merge_requests enable row level security;
alter table public.country_pack_snapshots enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_upsert_own" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "lesson_progress_own" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "review_items_own" on public.review_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "analytics_insert_own_or_guest" on public.analytics_events
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "guest_merge_own" on public.guest_merge_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "country_pack_read" on public.country_pack_snapshots
  for select using (true);
