# ANALYTICS_EVENTS

## 이벤트 이름

- `app_first_open`
- `onboarding_completed`
- `day_1_start`
- `lesson_resume`
- `first_audio_played`
- `slow_audio_played`
- `first_recording_attempt`
- `recording_permission_denied`
- `recording_unavailable`
- `recording_finished`
- `wrong_answer_continue`
- `lesson_step_completed`
- `lesson_paused`
- `day_1_completed`
- `review_completed`
- `signup_or_login`

## 발생 조건

이벤트는 `src/services/analytics.ts`의 `trackEvent`를 통해 로컬 상태에 저장된다. 주요 온보딩, 수업, 녹음, 복습, 로그인 병합 순간에 발생한다.

## 속성

익명 사용자 ID, 회원 이메일, 국가팩, 한국어 수준, 학습 목적, 캐릭터, 수업 ID, 단계 ID, 성공 여부, 오류 코드, 발생 시간을 담을 수 있다.

## 측정 목적

첫 실행에서 Day 1 시작까지의 이탈, 첫 음성 재생, 첫 녹음 시도, 권한 거절, Day 1 완료, 복습 완료, 로그인 병합 전환을 측정한다.

## 개인정보 제외 항목

개인 음성 원본, 음성 파일 URL, 민감한 개인 연락처, 결제 정보는 이벤트에 넣지 않는다.

## 주요 지표 계산 방식

- 온보딩 완료율: `onboarding_completed / app_first_open`
- 첫 음성 재생률: `first_audio_played / day_1_start`
- Day 1 완료율: `day_1_completed / day_1_start`
- 녹음 권한 거절률: `recording_permission_denied / first_recording_attempt`
- 복습 전환율: `review_completed / day_1_completed`
