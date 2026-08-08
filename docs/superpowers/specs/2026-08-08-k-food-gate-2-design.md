# K-Food Gate 2 Design

- Date: 2026-08-08
- Project: `korean-first-talk` / K-Speak
- Status: Ready for implementation planning
- Depends on: Course Gate 0 foundation, Course Gate 1 travel

## Goal

Ship the first K-Culture expansion as a focused `k-food` route that feels fun on its own, teaches practical Korea-useful language, and quietly strengthens EPS-adjacent basics without turning into a test-prep screen.

## Why K-Food First

- It connects naturally to travel, daily life, and Korea-entry motivation.
- It gives repeated practice with menu words, quantity, requests, warnings, payment, and everyday service exchanges.
- It is easier to make concrete and visual than K-pop or K-drama in an MVP-sized course.
- It avoids brand, copyright, and celebrity dependency.

## Product Position

`k-food` is not a separate app mode with a different shell.
It is a course inside the existing course system, like `travel`.

The learner experience should feel like:

1. Foundation
2. Travel
3. K-Food

After that, later gates can add `k-beauty`, `k-drama`, `k-pop`, or `k-webtoon`.

## Scope

Gate 2 should include:

- One independent 14-day `k-food` course
- Course selection visibility and progress separation
- K-Food lesson data under `src/data/courses/`
- Review scoping by active course
- Shared lesson engine and storage model reuse
- Mobile-safe home and lesson flows

Gate 2 should not include:

- Restaurant ordering marketplace features
- Maps, reservations, coupon features, or user uploads
- Copyrighted brand menus or celebrity tie-ins
- New bottom navigation items
- EPS scoring, EPS certification claims, or exam pass probability

## Course Role

K-Food should sit between travel-friendly Korean and deeper themed culture courses.

It should teach language for:

- ordering food
- asking about ingredients
- handling spice, allergies, and dislikes
- reading simple menu or packaging cues
- paying, sharing, packing, and asking for help

It should also reinforce EPS-friendly basics:

- quantity and counters
- polite requests
- prohibition and caution
- sequence and instruction words
- simple service problem reporting

## Route Shape

Lesson IDs should use the `k-food-day-*` namespace.

The route should mirror the Travel contract:

- exactly 14 lessons
- each lesson has 3 review cards
- each lesson has `core`, `response`, and `rescue` audio targets
- no hard dependency on speech recognition
- browser TTS fallback remains acceptable

Day 14 should use a non-score mission summary, similar to Travel:

- choose food safely
- complete a short order exchange
- handle one problem or clarification

## 14-Day Outline

1. Food court greeting and first order
2. Menu basics and set meal words
3. Quantity, one more, less, extra
4. Spicy level and flavor preferences
5. Allergy, no meat, no peanuts, no seafood
6. Water, side dishes, napkins, utensils
7. Packing food and takeaway requests
8. Cafe drinks, ice, sugar, size
9. Bakery and dessert choices
10. Street food and quick questions
11. Convenience store meals and heating
12. Payment, split payment, receipt
13. Wrong order, missing item, too spicy
14. K-Food mission

## Learning Pattern

Each day should follow the same instructional rhythm:

1. scene
2. short dialogue
3. key sentence
4. natural-speed listening
5. slow repeat
6. optional record/compare
7. one quiz or choice check
8. roleplay
9. summary

This should reuse the existing lesson engine instead of inventing a K-Food-only flow.

## Language Design Rules

- Use real restaurant and cafe situations before explanation-heavy culture notes.
- Keep Korean output short and survivable for beginners.
- Prefer reusable sentence frames over trivia.
- Avoid slang-heavy or fandom-heavy expressions in Gate 2.
- Do not teach unsafe food advice as if universally true.

## Localization Rules

- Match Travel density for all supported packs.
- Keep user-facing strings fully keyed.
- Avoid English fallback for unapproved locale content.
- Country notes should explain what the learner is trying to achieve, not lecture on culture.

## Gating And Release

At Gate 2 launch:

- `foundation`: visible
- `travel`: visible
- `k-culture`: still hidden at top level unless the product explicitly wants the K-Food route exposed as the first `k-culture` slice
- `k-food`: recommended as its own visible course entry
- `eps-topik`: hidden or preparing, unchanged

Recommended product decision:

Expose `k-food` as a visible standalone course first.
Do not force it under a generic `k-culture` umbrella yet.

Reason:
It is clearer for users, easier to QA, and easier to market without building the full multi-track K-Culture selector first.

## Technical Shape

Likely new files:

- `src/data/courses/kFoodLessons.ts`
- `src/data/courses/kFoodLessons.test.ts`
- `src/data/courses/contentApproval.ts`
  add `k-food` locale approval entries
- `src/data/courses/courseRegistry.ts`
  add `k-food`
- `src/engine/courseEngine.ts`
  include `k-food` route lookup
- `src/App.tsx`
  course selector display and route entry
- `src/i18n/ui.ts`
  K-Food labels and mission keys

Likely no new engine needed if Travel abstractions are reused cleanly.

## QA Requirements

- course selector shows `K-Food Korean`
- switching between `travel` and `k-food` preserves each course progress
- K-Food review does not mix with Foundation or Travel review cards
- mobile 375px buttons do not overflow with longer food terms
- Day 14 mission summary contains no percentages
- missing static audio still falls back to browser TTS

## Success Criteria

Gate 2 is good enough when:

- a learner can switch into K-Food from home
- Day 1 starts without special-case UI
- lesson completion creates K-Food-only review items
- Day 14 closes with non-score mission feedback
- full test, build, and mobile QA pass

## Recommended Next Build Order

1. Add `k-food` to course registry and approval manifest
2. Build the 14-lesson data source and contract tests
3. Extend course engine route lookup
4. Wire home selector and lesson routing
5. Add Day 14 mission summary handling
6. Add audio fallback tests and mobile QA coverage
7. Run full verification
