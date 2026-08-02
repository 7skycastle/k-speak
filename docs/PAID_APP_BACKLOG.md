# PAID_APP_BACKLOG

다국적 유료앱 전환 작업 목록.

- 작성: 2026-08-03 (Opus 5 조사 기반)
- 목적: **하위 모델(Sonnet/Haiku)이 재탐색 없이 바로 실행**할 수 있는 단위로 분해
- 실행 규칙: 각 태스크의 `완료 기준` 커맨드가 통과해야 done. 임의로 범위를 넓히지 말 것.

---

## 0. 조사로 확정된 코드 사실 (재확인 불필요)

| # | 사실 | 근거 |
|---|---|---|
| F1 | App.tsx에 한국어 UI 문자열 **104개** 하드코딩 | `grep -cE '"[^"]*[가-힣][^"]*"' src/App.tsx` → 104 |
| F2 | `countryPacks.translations` 는 정의만 되고 **사용처 0** | `grep -c "translations\." src/App.tsx` → 0 |
| F3 | 레슨 `title`/`situation` **74개가 한국어 전용** | `src/data/lessons.ts`, 렌더링 `src/App.tsx:495`, `:811` |
| F4 | 레슨 스텝 12개의 title/body가 한국어 하드코딩 | `src/data/lessons.ts:1015-1123` |
| F5 | **대화문 번역이 가짜** — 5개 언어에 한국어 원문을 그대로 주입 | `src/data/lessons.ts:972-976` `localized(line.text, line.text, line.text, line.text, line.text)` |
| F6 | 퀴즈 오답 2개가 **30일 전부 동일** | `src/data/lessons.ts:1102` `["잠들기 전에 혼잣말할 때", "전화번호를 쓸 때"]` |
| F7 | `speaker`가 한국어 문자열이고 **UI 로직에 결합** | 6종(학습자 56/상대 18/직원 16/친구 4/기사 3/튜터 2), 비교문 `src/App.tsx:915` |
| F8 | 프로덕션 음성 **0개**. audioCatalog 명시 슬롯은 Day1 4개뿐, 전부 `naturalUrl` 없음 | `src/data/audioCatalog.ts` |
| F9 | `public/`의 오디오 82개는 전부 `audio/audition/` 오디션 샘플 | `find public -type f` |
| F10 | **PWA 자산 없음** (manifest, service worker, 아이콘 전무), `index.html` `lang="ko"` 고정 | `public/` = `audio`, `tts-review.html` |
| F11 | 분석 이벤트는 localStorage 최근 200개만 적재, **전송 없음** | `src/services/analytics.ts` |
| F12 | 결제/구독/엔타이틀먼트 코드 **전무**. Supabase 미설정 | 전체 grep |
| F13 | 발음부호 누락은 **미커밋 override 블록에 한정** (베트남어 무성조 ~14곳, 스페인어 ~7곳). 핵심 `phrase()` 데이터는 정상 | `src/data/lessons.ts:47-284` |
| F14 | 기준선: 테스트 8파일 30개 통과, 빌드 gzip 103.99 kB | `npm run test` 실행 확인 |

**모델 배정 범례** — 🟢 Haiku(기계적/반복) · 🔵 Sonnet(구현/리팩터) · 🟣 Opus(설계 판단) · 👤 사람(위임 불가)

---

## EPIC A — i18n 기반 ⛔ 최우선 / 모든 것의 선행조건

> 이 EPIC이 끝나기 전에는 어떤 국가에도 유료 출시가 불가능하다.
> 한국어를 못 읽는 사용자는 현재 앱을 조작할 수 없다.

### A1. i18n 코어 레이어 신설 🔵 Sonnet · S
- 신규 `src/i18n/index.ts`
- **외부 라이브러리 도입 금지.** 기존 `Record<CountryPackId, string>` 패턴을 그대로 확장할 것 (`src/data/lessons.ts:3` `localized()` 헬퍼가 선례)
- API: `type UiKey`, `const ui: Record<UiKey, Record<CountryPackId, string>>`, `t(key: UiKey, packId: CountryPackId): string`
- 보간 지원 필요: `t("summary.body", pack, { phrase })`
- 미정의 키는 `us-en` 폴백
- **완료 기준**: `t("nav.home", "jp-ja")` 가 일본어 반환 / `npm run lint` 통과 / 신규 유닛테스트 통과

### A2. App.tsx 문자열 추출 🟢 Haiku · M · (선행 A1)
- 대상 104개, 줄번호 군집: `74-86`(레벨/목표 라벨), `107`, `116-124`(kind 라벨), `165`·`173`(에러), `216`, `273-277`(하단 네비), `318-427`(온보딩 6단계), `483-622`(홈), `828-1044`(레슨), `1076-1172`(복습), `1201-1410`(설정)
- `src/services/storage.ts:23` 한국어 메시지도 포함
- 기계적 치환만. **로직 변경 금지**
- **완료 기준**: `grep -cE '"[^"]*[가-힣][^"]*"' src/App.tsx` → **0** / `npm run test` 30개 유지 / `npm run build` 통과

### A3. UI 문자열 5개 언어 번역 🔵 Sonnet · M → 👤 원어민 검수
- 104키 × 5언어 = **520 문자열**
- 스페인어 발음부호·베트남어 성조 **정자 필수** (F13 재발 방지)
- 일본어는 기존 `countryPacks.ts` 톤과 일치시킬 것 (품질 기준선이 가장 높음)
- **완료 기준**: 언어별 누락 키 0 테스트 / 👤 언어당 1인 검수 (위임 불가)

### A4. 레슨 title / situation 다국어화 🔵 Sonnet · M
- `lessonSeeds` 74개 필드 → `Record<CountryPackId, string>` 승격
- `src/types.ts` `Lesson.title`, `Lesson.situation` 타입 변경
- 렌더링부 `src/App.tsx:495`, `:811` 수정
- ⚠️ `situation`은 퀴즈 정답으로도 쓰임(`lessons.ts:1103`) → B2와 충돌 주의, **B2를 먼저 하거나 동시에 처리**
- **완료 기준**: `npm run lint` / `npm run test` / 5개 국가팩 전환 시 한국어 잔존 0

### A5. 레슨 스텝 템플릿 다국어화 🔵 Sonnet · S
- `src/data/lessons.ts:1015-1123` 의 step title 12개 + body 12개
- `summary` body는 보간 필요: `오늘은 "{phrase}" 표현을 연습했습니다...`
- **완료 기준**: `grep -cE '"[^"]*[가-힣][^"]*"' src/data/lessons.ts` 가 한국어 학습 콘텐츠(핵심 문장·대화문)만 남기고 UI 문구는 0

### A6. speaker 역할 enum 분리 🔵 Sonnet · S · ⚠️ 로직 결합
- 현재 한국어 문자열을 UI 분기 조건으로 사용 중 (`src/App.tsx:915` `line.speaker === "학습자"`)
- `speakerRole: "learner" | "staff" | "partner" | "driver" | "friend" | "tutor"` 로 변경, 표시명은 i18n
- 매핑: 학습자→learner, 직원→staff, 상대→partner, 기사→driver, 친구→friend, 튜터→tutor
- **완료 기준**: App.tsx에서 한국어 문자열 비교 제거 / 대화 화면 스타일 분기 정상

### A7. index.html 언어 대응 🟢 Haiku · S
- `lang="ko"` → 온보딩 선택 언어로 런타임 설정
- `description` meta, OG 태그 추가 (랜딩/공유/스토어용)
- **완료 기준**: 국가팩 전환 시 `document.documentElement.lang` 변경 확인

---

## EPIC B — 콘텐츠 품질 (유료 기준 미달분)

### B1. 대화문 가짜 번역 수정 🔵 Sonnet · L · ⚠️ 사실상 미구현 기능
- `src/data/lessons.ts:972-976` 이 5개 언어 전부에 한국어 원문을 넣고 있음
- 30일 × 3줄 = **90줄 × 5언어 = 450 번역**
- `LessonDialogueLine.meaningByCountry`를 실제 번역으로 채우고, seed에 번역 필드 추가
- **완료 기준**: 어떤 국가팩에서도 `meaningByCountry[pack] !== korean` 검증 테스트 통과

### B2. 퀴즈 오답 선택지 개별화 🔵 Sonnet · M · ⚠️ 유료 품질 결함
- `src/data/lessons.ts:1102` — Day 2부터 정답이 자명함(오답 2개가 30일 내내 동일)
- Day별 그럴듯한 오답 2개 = **60개 × 5언어**
- 오답은 "같은 장면이지만 표현이 틀린 상황" 또는 "비슷하지만 다른 장면"으로 구성
- **완료 기준**: 전 레슨 오답 중복 0 테스트 추가 / 정답 위치 셔플 확인

### B3. Day 15-30 구조 설명 품질 통일 🔵 Sonnet · M
- Day 1-14는 `day14StructureOverrides`(`lessons.ts:47-146`)로 상세하나, Day 15-30은 한 줄
- 예: Day 19 현재 `"Use this to ask for something to be made in a certain way."` → Day 1-14 수준으로 확장
- **완료 기준**: Day 15-30 설명 평균 길이가 Day 1-14의 80% 이상

### B4. Day 15-30 발음 노트 추가 🔵 Sonnet · M
- `day14PronunciationOverrides`(`lessons.ts:148-284`)가 Day 1-14만 커버, 나머지는 공통 노트로 대체됨
- Day 15-30 각각 고유 발음 포인트 작성
- **완료 기준**: `pronunciationByCountry`가 공통 노트로 폴백되는 레슨 0

### B5. 발음부호 정규화 🟢 Haiku · S
- **범위: `src/data/lessons.ts:47-284` 미커밋 override 블록에 한정.** 핵심 `phrase()` 데이터는 정상이므로 건드리지 말 것
- 베트남어 무성조 ~14곳 (`Dung khong chi noi cam on` → `Đừng chỉ nói cảm ơn`)
- 스페인어 ~7곳 (`Anadir`→`Añadir`, `peticion`→`petición` 3곳, `terminacion`→`terminación`, `tambien`→`también`, `mas natural`→`más natural`)
- **완료 기준**: 위 패턴 grep 결과 0 / 👤 베트남어는 원어민 확인 권장

---

## EPIC C — 오디오 (유료화 3대 블로커 중 하나)

### C1. TTS 정책 개정 🟢 Haiku · S · 🟣 판단은 완료됨
- 정책을 **"유료 TTS 금지" → "런타임 의존 금지 / 빌드타임 생성 허용"** 으로 변경
- 대상 문서: `AUDIO_SPEC.md`, `AI_PROJECT_BRIEF.md`(§7, §9), `CODEX_HANDOFF.md`
- `scripts/audio`의 차단 로직은 **런타임 기준으로 유지** (기존 검증 깨뜨리지 말 것)
- 근거: 186문장×4튜터×2속도 ≈ 22,400자 → 일반 뉴럴 TTS 단가(100만 자당 ~$16) 기준 **1회 1달러 미만**. 운영비·장애 리스크라는 원래 정책 의도는 그대로 지켜짐
- **완료 기준**: `npm run audio:validate`, `npm run tts:validate` 기존대로 통과

### C2. 정적 음성 생성 🔵 Sonnet · M · (선행 C1)
- 기존 `tools/tts` 파이프라인 사용 (이미 구축돼 있음)
- 186문장 × 4튜터 × 2속도 = 1,488파일, mp3 64kbps, `public/audio/{lessonId}/{characterId}/`
- 용량 예산: 개당 ~20KB → **총 30MB 내외**. 초과 시 비트레이트 조정
- **완료 기준**: 파일 수 일치 / `npm run build` 후 배포 용량 확인

### C3. audioCatalog 실데이터 연결 🟢 Haiku · M · (선행 C2)
- 현재 명시 슬롯 4개뿐이고 나머지는 `findAudioSlot`의 런타임 생성 폴백에 의존 (`audioCatalog.ts:64-73`)
- 1,488 엔트리에 `naturalUrl`/`slowUrl` 연결
- **완료 기준**: `AUDIO_REQUIRE_STATIC_FILES=true npm run audio:validate` **통과** (현재는 실패해야 정상)

### C4. 음성 청취 검수 👤 사람 · 위임 불가
- 원어민이 전 문장 청취. 억양 오류·오독 목록화 후 재생성
- 라이선스 최종 확인 (`docs/AUDIO_LICENSES.md`)
- **이 태스크 없이 유료 출시 금지**

---

## EPIC D — 발음 피드백 (무료/유료를 가르는 핵심 기능)

### D1. SpeechRecognition 래퍼 🔵 Sonnet · M
- 신규 `src/utils/speechRecognition.ts`, `ko-KR`
- 지원 현황: Chrome/Edge 확실, **Firefox 미지원**, Safari/iOS는 실기기 검증 필요
- 미지원 환경은 기존 record/compare로 폴백 (기존 폴백 원칙 유지)
- **완료 기준**: 미지원 브라우저에서 레슨 완주 가능 / 유닛테스트

### D2. 어절 단위 채점 🔵 Sonnet · M
- 인식 결과 vs 목표 문장 비교. 정규화(띄어쓰기·조사 변이) 후 어절 매칭
- 산출: 일치율(%) + 틀린 어절 인덱스 배열
- ⚠️ 과도한 관대함 금지 — Speak도 이 부분이 약점으로 지적됨
- **완료 기준**: 정상/부분오류/완전오류 케이스 테스트 통과

### D3. 채점 UI 🔵 Sonnet · M
- `compare` 스텝에 결과 표시, 틀린 어절 하이라이트, 재시도 버튼
- 점수는 감점형이 아니라 "다시 해볼 어절" 안내형으로 (기존 학습 철학 유지)
- **완료 기준**: 모바일 360/390/430 뷰포트 확인

---

## EPIC E — 계정 / 결제 / 엔타이틀먼트

### E1. Supabase 프로젝트 생성 및 스키마 적용 👤 사람 + 🟢 Haiku
- 프로젝트 생성 → `docs/supabase/schema.sql`, `docs/supabase/rls.sql` 적용 → Vercel env 설정
- ⚠️ 기존 `K_study` 프로젝트 건드리지 말 것 (핸드오프 문서 지시)
- **완료 기준**: `npm run supabase:validate` 통과 + 실제 OTP 로그인 1회 성공

### E2. entitlement 스키마 확장 🔵 Sonnet · M
- 현재 상태는 localStorage 단일 키(`storage.ts:3`)에 tier 개념 없음
- `entitlements` 테이블 + `UserState`에 tier 필드
- **완료 기준**: RLS로 타 사용자 entitlement 조회 차단 검증

### E3. 결제 연동 🔵 Sonnet · L · 🟣 사업자 선택은 결정됨
- **Paddle 권장** — Merchant of Record라 5개국 VAT/세금계산서를 대행. Stripe는 직접 처리 필요
- 웹 결제 우선(수수료 3~5%), 스토어 IAP(15~30%)는 EPIC F 이후
- **완료 기준**: 샌드박스 결제 → entitlement 반영 → 유료 콘텐츠 해금 E2E 1회

### E4. 서버측 엔타이틀먼트 검증 🔵 Sonnet · M · ⚠️ 보안
- **클라이언트 게이팅만으로는 우회됨.** 유료 레슨/음성 접근은 서버 판정 필수
- **완료 기준**: 클라이언트 상태 조작으로 유료 콘텐츠 접근 불가 확인

### E5. 무료/유료 경계 UI 🔵 Sonnet · M
| | 무료 | 유료 |
|---|---|---|
| 레슨 | Day 1~5 | Day 6~30 |
| 음성 | 브라우저 TTS | 정적 튜터 음성 4종 |
| 발음 | 녹음/비교 | 인식 채점 + 오답 어절 |
| 복습 | 최근 5개 | 전체 + 스케줄링 |
| 저장 | 로컬 | 클라우드 동기화 |
- **완료 기준**: 페이월 도달 이벤트 기록 / 무료 사용자의 Day 1~5 완주 정상

### E6. 지역별 가격표 🟣 Opus 설계 → 🔵 Sonnet 구현 · M
- **구매력 차이 반영 필수.** 미국 $9.99와 베트남 $9.99는 다른 상품
- `countryPacks`에 `currency` 필드가 이미 있으므로 여기에 부착
- 초안(일회성 기준): US/JP $6.99~9.99 · ES $4.99~6.99 · VN $1.99~2.99
- **모델 권장: 구독이 아니라 일회성 언락.** Day 30은 2~4주에 소진되어 구독이 즉시 해지됨. 구독 전환은 Day 31~90 확장 이후

---

## EPIC F — PWA / 유통

### F1. PWA manifest + 아이콘 🟢 Haiku · S
- `public/manifest.webmanifest`, 아이콘 192/512/maskable, `theme-color`는 기존 `#f9faf5` 유지
- **완료 기준**: Lighthouse PWA 설치 가능 판정

### F2. Service Worker + 오프라인 캐시 🔵 Sonnet · M · (선행 C2)
- 앱 셸 + 현재 Day 음성 프리캐시. 전체 30MB를 한 번에 받지 말 것
- 기존 오프라인 폴백 원칙과 정합
- **완료 기준**: 비행기 모드에서 진행 중 레슨 완주 가능

### F3. 스토어 래핑 (Capacitor) 🔵 Sonnet · L · Phase 2
- ⚠️ EPIC A/C/D 완료 전 제출 금지 — 한국어 UI + TTS 음성 상태로는 리젝 또는 혹평
- IAP 수수료(15~30%)를 감안해 웹 결제 병행 유지

### F4. 랜딩 페이지 🔵 Sonnet · M
- 5개 언어. 전환 목적(설치/결제)
- **완료 기준**: 국가별 유입 → 앱 진입 추적 가능

---

## EPIC G — 법무 / 개인정보 (유료 서비스 최소 의무)

### G1. 개인정보처리방침 + 이용약관 🔵 Sonnet 초안 → 👤 검토 필수
- 5개 언어. 스페인어권 = **GDPR 사정권**
- 현재 `countryPacks.privacyNote`가 "프로토타입" 문구 → 유료 문구로 교체 필요
- **완료 기준**: 👤 법률 검토 (위임 불가)

### G2. 녹음 데이터 정책 명문화 🔵 Sonnet · S
- **현재 "기기에만 저장"은 자산이다.** 유지하고 마케팅 포인트로 명시
- D1~D3에서 음성인식 도입 시 서버 전송 여부가 바뀌면 정책 갱신 필수

### G3. GDPR 삭제 요청 경로 🔵 Sonnet · M · (선행 E1)
- 계정/진도/entitlement 삭제 플로우
- **완료 기준**: 삭제 후 재로그인 시 데이터 잔존 0

---

## EPIC H — 계측

### H1. 분석 전송 연동 🔵 Sonnet · M
- 현재 `src/services/analytics.ts`는 localStorage 최근 200개만 적재하고 전송하지 않음
- `ANALYTICS_EVENTS.md` 스키마 준수. **녹음 원본·음성 URL·결제정보 전송 금지**(기존 정책)
- **완료 기준**: 이벤트 대시보드에서 온보딩 퍼널 확인

### H2. 유료 퍼널 이벤트 🔵 Sonnet · S
- 필수 지표: 온보딩 이탈률 / Day별 이탈 지점 / 페이월 도달률 / 결제 전환율 / 국가별 분해
- **완료 기준**: 위 5개 지표 산출 가능

---

## 실행 순서 (임계 경로)

```
Phase 0 — 유료화 가능 상태          [A → B → C → D]
  A1 → A2 → A3(+👤검수)
  A1 → A4 ┐
  A1 → A5 ├→ (A6, A7 병렬)
  B2 ────┘   ※ A4와 퀴즈 정답 필드가 충돌하므로 B2 선행/동시
  B1, B3, B4, B5 는 A 완료 후 병렬
  C1 → C2 → C3 → C4(👤)
  D1 → D2 → D3            ※ C와 병렬 가능
  ▶ 이 시점에 "유료로 팔 수 있는 제품"이 된다

Phase 1 — 단일 국가 유료 검증       [E → G → H]
  E1 → E2 → E4 → E3 → E5
  E6(🟣) 는 E3와 병렬
  G1(👤), G2, H1 → H2
  ▶ 일본 또는 베트남 1개국만 출시. 5개국 동시 출시 금지

Phase 2 — 확장                      [F + 콘텐츠]
  F1 → F2 → F4 → F3
  Day 31~90 또는 EPS-TOPIK 트랙 → 구독 모델 전환 검토
```

**병렬 가능 최대 폭**: Phase 0에서 `A계열`, `C계열`, `D계열` 3갈래 동시 진행 가능.
**직렬 강제**: A1은 모든 i18n 작업의 선행. C1→C2→C3는 순서 고정. E4는 E3보다 먼저(보안).

---

## 위임 불가 항목 (사람이 해야 함)

| 항목 | 이유 |
|---|---|
| A3 번역 원어민 검수 | 유료 제품의 번역 오류는 환불 사유 |
| B5 베트남어 성조 확인 | 성조 오류는 의미가 바뀜 |
| C4 음성 청취 검수 | 억양·오독은 자동 검증 불가 |
| E1 Supabase 프로젝트 생성 | 계정 소유·과금 주체 |
| G1 약관 법률 검토 | 법적 책임 |

## 하지 말 것

- 5개국 동시 출시
- EPIC D 없이 구독 모델 판매
- EPIC A/C 완료 전 스토어 제출
- 중국 본토 초기 포함 (앱마켓·결제·ICP가 별도 프로젝트급. 기존 문서에도 "마지막에 별도 계획"으로 명시)
- 커뮤니티·푸시·게임화 추가 — `docs/LEARNING_PROGRAM_DEVELOPMENT.md:230`의 기존 판단 유지
- 기존 폴백 원칙 훼손 (브라우저 TTS 폴백, 녹음 거부 시 레슨 완주, 오프라인 동작)

## 회귀 방지 기준선

모든 태스크 완료 시 아래가 유지되어야 한다.

```bash
npm run lint && npm run test && npm run build
npm run audio:validate && npm run tts:validate && npm run supabase:validate
npm run qa:mobile
```

- 테스트: 최소 30개 통과 (신규 태스크는 테스트 추가 권장)
- 빌드 gzip: 103.99 kB 기준. 크게 늘면 원인 확인
- 미커밋 상태 주의: `src/data/lessons.ts`, `src/data/lessons.test.ts`에 콘텐츠 개선분 212줄이 커밋되지 않음. **EPIC 시작 전 커밋할 것**
