# DATABASE_AND_SYNC

## 새 Supabase 프로젝트 연결 방식

이번 구현은 기존 `K_study` 프로젝트 및 프로젝트 ID `bcpoowcqvqynpciiqoav`와 무관하게 설계했다. 새 Supabase 프로젝트를 만든 뒤 `.env.local`에 URL과 anon key를 넣는다.

## 필요한 환경 변수 목록

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_REDIRECT_URL`

## 생성해야 할 테이블 목록

- `profiles`: 계정 기본 설정
- `guest_merge_requests`: 비회원 진도 병합 기록
- `lesson_progress`: 수업 진행 상태
- `review_items`: 복습 대상 문장
- `analytics_events`: 제품 분석 이벤트
- `country_pack_snapshots`: 국가팩 버전 스냅샷

## 테이블별 목적

`profiles`는 국가팩, 튜터, 목표 시간을 저장한다. `lesson_progress`는 단계와 메트릭을 저장한다. `review_items`는 due 시간과 우선순위를 저장한다. `analytics_events`는 음성 원본 없이 행동 이벤트만 저장한다.

## RLS 정책 설계

사용자는 자신의 `auth.uid()`와 연결된 행만 읽고 쓸 수 있다. `analytics_events`는 삽입만 허용하고 직접 조회는 제한한다. 자세한 SQL 초안은 `docs/supabase/schema.sql`, `docs/supabase/rls.sql`에 있다.

## 로컬 저장 구조

브라우저 `localStorage`의 `korean-first-talk:user-state:v1`에 `UserState`를 저장한다. 이메일 로그인 시 `korean-first-talk:cloud-profile:{email}`에 로컬 계정 스냅샷을 만든다.

## 비회원 진도 저장 방식

익명 ID를 만들고 온보딩, 수업 진행, 복습 항목, 이벤트를 모두 로컬에 저장한다.

## 로그인 후 클라우드 병합 방식

완료 수업은 잃지 않고, 더 많이 진행한 단계가 `currentStepId`가 된다. 복습 항목은 ID 기준으로 중복 생성을 막는다.

## 네트워크 오류 시 재동기화 방식

Supabase 환경 변수가 없거나 네트워크 오류가 있으면 `sync.pending`을 유지하고 로컬 상태를 우선 저장한다. 재연결 후 업로드 함수를 연결한다.
