# TEST_REPORT

## 실행한 테스트

- `npm audit --audit-level=moderate`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- Playwright 렌더링 검사
- Playwright 핵심 사용자 흐름 검사
- Playwright 중단·재개, 설정 변경, 이메일 검증 흐름 검사

## 테스트 환경

- Windows
- Node.js `v24.12.0`
- npm `11.6.2`
- Vite dev server `http://localhost:5173`
- Playwright Chromium

## 성공 결과

- npm audit: 취약점 0건
- TypeScript typecheck: 통과
- lint 스크립트: 통과
- Vitest: 4개 파일, 9개 테스트 통과
- production build: 통과
- dev server HTTP 응답: 200

## 화면별 검수 결과

다음 viewport에서 초기 화면의 가로 스크롤 없음, 하단 메뉴 viewport 내부 위치, 콘솔 오류 없음 확인:

- 360 x 780
- 390 x 844
- 430 x 932
- 768 x 1024
- 1280 x 900

국가팩 온보딩 화면에서 390px 기준 가로 스크롤 없음 확인:

- United States
- Japan
- China
- Vietnam
- Mexico / Spanish

## 주요 사용자 흐름 결과

Playwright로 다음 흐름을 자동 확인했다.

1. 로컬 저장 초기화
2. 온보딩 6단계 완료
3. Day 1 수업 시작
4. 12개 수업 단계 완료
5. Day 1 상태가 `completed`로 저장됨
6. 복습 항목 1개 생성
7. 내 정보 화면에서 `learner@example.com` 이메일 로그인
8. 비회원 진도가 로컬 계정 진도에 병합됨

추가 검토에서 다음 흐름을 자동 확인했다.

1. Day 1 진행 중 `나중에 이어하기` 선택
2. 홈 화면으로 복귀
3. 학습 탭에서 `character-hello` 단계로 정확히 재개
4. 설정 화면에서 국가팩을 중국으로 변경
5. `nativeLanguage`가 `中文`, 하루 목표가 10분으로 갱신됨
6. 잘못된 이메일 입력 시 오류 배너 표시
7. 공백과 대문자가 포함된 이메일이 `learner@example.com`으로 정규화되어 병합됨

Day 2~14 확장 후 다음도 확인했다.

- Day 1~14가 연속 day 번호로 존재
- 모든 수업이 듣기, 녹음, 비교 단계를 포함
- 모든 국가팩에 의미 번역 존재
- 모든 튜터와 수업 조합에 TTS fallback 음성 메타데이터 존재

브라우저 흐름에서 Day 1 완료 후 학습 탭 진입 시 Day 2가 `situation` 단계에서 시작되는 것도 확인했다.

## 독립 검토에서 수정한 문제

- `나중에 이어하기` 버튼이 저장만 하고 화면 이동을 하지 않아 작동하지 않는 것처럼 보이던 문제 수정
- `다시 녹음` 버튼이 복습 가중치에 기록되지 않던 문제 수정
- 설정 화면 국가팩 변경 시 `nativeLanguage`와 기본 학습 목표가 함께 갱신되지 않던 문제 수정
- 이메일 병합 시 공백과 대소문자가 정규화되지 않던 문제 수정
- 잘못된 이메일 입력 시 아무 반응이 없던 문제를 오류 배너로 수정
- 계정 병합 보존 규칙에 대한 단위 테스트 추가

## 남은 문제

- 실제 Supabase 프로젝트가 없어 클라우드 업로드는 연결 준비 상태다.
- 실제 한국인 녹음 음원이 없어 기기 TTS 샘플로 재생한다.
- 실제 푸시 알림, 결제, 공개 배포는 이번 범위에서 제외했다.

## 재현 방법

```bash
npm install
npm run dev -- --port 5173
npm run typecheck
npm run lint
npm run test
npm run build
```
