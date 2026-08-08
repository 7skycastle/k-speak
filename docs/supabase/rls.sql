alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.review_items enable row level security;
alter table public.saved_phrases enable row level security;
alter table public.analytics_events enable row level security;
alter table public.guest_merge_requests enable row level security;
alter table public.country_pack_snapshots enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.eps_assessment_attempts enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

create policy "profiles_update_own" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "lesson_progress_own" on public.lesson_progress
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "lesson_progress_insert_own" on public.lesson_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "lesson_progress_update_own" on public.lesson_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "review_items_select_own" on public.review_items
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "review_items_insert_own" on public.review_items
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "review_items_update_own" on public.review_items
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "saved_phrases_select_own" on public.saved_phrases
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "saved_phrases_insert_own" on public.saved_phrases
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "saved_phrases_update_own" on public.saved_phrases
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "analytics_insert_own_or_guest" on public.analytics_events
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "analytics_update_own" on public.analytics_events
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "guest_merge_insert_own" on public.guest_merge_requests
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "country_pack_read" on public.country_pack_snapshots
  for select to anon, authenticated using (true);

create policy "course_enrollments_select_own" on public.course_enrollments
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "course_enrollments_insert_own" on public.course_enrollments
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "course_enrollments_update_own" on public.course_enrollments
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "eps_assessment_attempts_select_own" on public.eps_assessment_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "eps_assessment_attempts_insert_own" on public.eps_assessment_attempts
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "eps_assessment_attempts_update_own" on public.eps_assessment_attempts
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
