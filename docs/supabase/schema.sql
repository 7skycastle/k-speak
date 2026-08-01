create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  country_pack_id text not null,
  native_language text not null,
  korean_level text not null,
  learning_goal text not null,
  daily_goal_minutes integer not null,
  character_id text not null,
  reminder_time text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  status text not null,
  current_step_id text not null,
  completed_step_ids text[] not null default '{}',
  metrics jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.review_items (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  phrase_id text not null,
  korean text not null,
  meaning text not null,
  reason text not null,
  priority integer not null,
  due_at timestamptz not null,
  last_result text,
  updated_at timestamptz not null default now(),
  primary key (id, user_id)
);

create table if not exists public.analytics_events (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text,
  name text not null,
  properties jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.guest_merge_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  anonymous_id text not null,
  merged_summary jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.country_pack_snapshots (
  id text primary key,
  version text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.lesson_progress to authenticated;
grant select, insert, update on public.review_items to authenticated;
grant insert, update on public.analytics_events to authenticated;
grant insert on public.guest_merge_requests to authenticated;
grant select on public.country_pack_snapshots to anon, authenticated;
