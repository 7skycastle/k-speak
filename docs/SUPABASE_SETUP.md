# Supabase Setup

This app can run in local-only mode, but cloud progress sync needs a dedicated Supabase project.

## Required Environment

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_REDIRECT_URL=http://localhost:5173
```

For Vercel production, set `VITE_SUPABASE_REDIRECT_URL` to `https://k-speak.vercel.app`.

## Validate SQL

Run this before applying database changes:

```bash
npm run supabase:validate
```

The validator checks that `docs/supabase/schema.sql` and `docs/supabase/rls.sql` still match the app's cloud sync contract:

- `profiles`
- `lesson_progress`
- `review_items`
- `analytics_events`
- `guest_merge_requests`
- `country_pack_snapshots`

It also checks the upsert constraints used by `src/services/cloudSync.ts`.

## Apply SQL

Generate a single SQL bundle:

```bash
npm run --silent supabase:bundle
```

Copy the command output into the Supabase SQL editor for the new project and run it once.

The source files remain:

- `docs/supabase/schema.sql`
- `docs/supabase/rls.sql`

## Auth Redirects

In Supabase Auth URL settings, allow:

- `http://localhost:5173`
- `https://k-speak.vercel.app`

## Notes

- The existing `K_study` project should not be reused unless the owner explicitly approves it.
- A previous automated project creation attempt returned `INVALID_ARGUMENT`, so project creation may need to be completed manually in the Supabase dashboard.
- After env vars are added, verify email OTP login and progress merge on two browsers or profiles.
