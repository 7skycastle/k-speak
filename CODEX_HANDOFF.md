# CODEX_HANDOFF

## 1. 프로젝트 개요

`korean-first-talk`는 외국인을 위한 다국가용 한국어 학습 앱의 신규 기준 프로젝트다. 로그인 전 온보딩, Day 1 수업, 녹음 비교, 복습 생성, 비회원 진도 저장, 이메일 기반 로컬 계정 병합을 구현했다.

## 2. 실제 프로젝트 경로

`C:\Users\7skyc\Desktop\Codex\K-speak`

## 3. GitHub 저장소

`https://github.com/7skycastle/k-speak`

## 4. 실행 명령어

```bash
npm install
npm run dev
```

로컬 확인 주소는 `http://localhost:5173`이다.

## 5. 빌드·테스트 명령어

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## 6. 배포 방식

배포 대상은 `https://vercel.com/7skycastles-projects/k-speak`다. Vite 정적 빌드 결과물은 `dist/`에 생성된다. `vercel.json`에 `npm run build`와 `dist`를 명시했다.

## 7. 환경 변수 목록

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_REDIRECT_URL`

## 8. 새 Supabase 연결 방식

새 Supabase 프로젝트를 만든 뒤 `.env.local`과 Vercel 환경 변수에 URL과 anon key를 넣는다. 기존 `K_study` 프로젝트와 프로젝트 ID `bcpoowcqvqynpciiqoav`는 사용하지 않는다.

2026-08-01에 Supabase MCP로 조직 `vjhliyconufnhitdcunc`에 새 프로젝트 생성을 시도했지만 `INVALID_ARGUMENT`가 반환되어 생성되지 않았다. 비용 확인 결과는 월 $0였다. 수동 생성 시 리전은 `ap-northeast-2`, 이름은 `Korean First Talk` 또는 `korean-first-talk`를 권장한다.

## 9. 필요한 테이블과 RLS 정책

SQL 초안은 `docs/supabase/schema.sql`, `docs/supabase/rls.sql`에 있다. 주요 테이블은 `profiles`, `lesson_progress`, `review_items`, `analytics_events`, `guest_merge_requests`, `country_pack_snapshots`다.

## 10. 전체 폴더 구조

- `src/App.tsx`: 전체 화면과 사용자 흐름
- `src/data/`: 국가팩, 캐릭터, 수업, 음성 슬롯, 복습 규칙
- `src/engine/`: 수업 진행과 복습 계산
- `src/services/`: 로컬 저장, 분석 이벤트, Supabase 준비, 동기화 상태
- `src/utils/`: 브라우저 음성 재생
- `docs/supabase/`: 새 Supabase 스키마와 RLS SQL

## 11. 핵심 파일과 역할

- `src/types.ts`: 제품 도메인 타입
- `src/data/lessons.ts`: Day 1~14 수업 데이터
- `src/engine/lessonEngine.ts`: 공통 수업 상태 엔진
- `src/engine/reviewEngine.ts`: 규칙 기반 복습 생성
- `src/services/storage.ts`: 로컬 저장과 비회원·계정 병합
- `src/App.tsx`: 홈, 온보딩, 학습, 복습, 내 정보 화면

## 12. 현재 완성된 기능

- 비회원 온보딩
- 5개 국가팩 샘플
- 4명 한국인 튜터 데이터
- Day 1~14 학습 데이터와 다음 미완료 Day 진행
- 자연·느린 기기 음성 재생
- 브라우저 녹음과 내 목소리 재생
- 녹음 거절·미지원 안내
- 복습 항목 생성과 완료 처리
- 이메일 기반 로컬 계정 병합
- Supabase 이메일 링크 인증 요청과 세션 감지
- Supabase 프로필, 수업 진도, 복습 항목, 이벤트 업서트 동기화 함수
- 분석 이벤트 로컬 기록
- 모바일 우선 하단 메뉴

## 13. 아직 샘플 상태인 기능

- 실제 한국인 녹음 음원
- 실제 Supabase 프로젝트 생성과 환경 변수 입력
- 실제 분석 서비스 전송
- 푸시 알림 발송

## 14. 실제 한국인 음성 적용 방법

`public/audio/day-1/{character}/`에 실제 녹음 파일을 넣고 `src/data/audioCatalog.ts`의 `naturalUrl`, `slowUrl`, `chunkUrls`, `rights`, `usesTtsFallback`을 갱신한다. 허가 정보와 버전을 반드시 남긴다. Day 2~14는 명시적인 TTS fallback 슬롯을 반환하므로 같은 방식으로 실제 음성 슬롯을 추가한다.

## 15. 새 수업 추가 방법

`src/data/lessons.ts`에 `Lesson` 객체를 추가한다. 화면 코드를 복사하지 않고 `steps` 배열만 구성한다. 새 문장 음성 슬롯은 `src/data/audioCatalog.ts`에 추가한다.

## 16. 새 국가팩 추가 방법

`CountryPackId`, `countryPacks`, 캐릭터별 `countryGreetings`, 수업별 `meaningByCountry`를 같은 ID로 확장한다.

## 17. 복습 규칙 수정 방법

`src/data/reviewRules.ts`의 가중치와 due 시간 규칙을 수정한다. 계산 로직은 `src/engine/reviewEngine.ts`에 있다.

## 18. 분석 이벤트 연결 방법

현재 이벤트는 로컬 `analyticsEvents`에 저장된다. 실제 서비스 연결 시 `src/services/analytics.ts`에서 Supabase 또는 분석 SDK 전송을 추가한다. 음성 원본은 전송하지 않는다.

## 19. 확인된 문제와 주의사항

- Supabase 키가 없으면 `local-only` 모드로 동작한다.
- 기기 TTS 품질은 브라우저와 OS에 따라 달라진다.
- 브라우저가 `MediaRecorder`를 지원하지 않으면 녹음 없이 진행한다.
- 실제 앱 출시 전 개인정보 처리방침과 음원 권리 확인이 필요하다.

## 20. 다음 개발 우선순위

1. 새 Supabase 프로젝트 생성 및 `.env.local`/Vercel 환경 변수 설정
2. `schema.sql`, `rls.sql` 적용
3. 실제 한국인 음원 녹음과 슬롯 교체
4. 국가팩 번역과 문화 설명 품질 개선
5. 분석 이벤트 외부 서비스 연결
6. 접근성, 성능, 보안 최종 점검

## 21. 최종 검증 결과

`npm audit`, typecheck, lint, unit test, production build, dev server 응답, Playwright 주요 viewport 렌더링, 온보딩→Day 1 완료→복습 생성→이메일 병합 흐름이 통과했다. 자세한 결과는 `TEST_REPORT.md`에 있다.
