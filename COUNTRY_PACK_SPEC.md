# COUNTRY_PACK_SPEC

## 국가팩 공통 스키마

국가팩은 `src/types.ts`의 `CountryPack`으로 정의하고 `src/data/countryPacks.ts`에서 관리한다. 컴포넌트 안에 번역이나 문화 설명을 직접 넣지 않는다.

## 5개 국가별 차이

- 미국 영어권: 짧고 실용적인 표현 중심
- 일본: 존댓말 감각과 유사점을 활용
- 중국: 유학·취업·생활 목적 우선
- 베트남: 일과 생활 목적의 꾸준한 연습
- 멕시코·스페인어권: 여행과 K-콘텐츠 맥락 강화

각 국가팩에는 온보딩 설명, Day 1 문화 설명, 피드백 문구 3개, 역할극 상황, 알림 문구 2개, 복귀 문구가 들어 있다.

## 번역과 문화 설명 분리

`translations`는 짧은 UI 라벨용이고, `cultureNote`, `roleplaySituation`, `feedback`, `reminders`는 학습 맥락용이다.

## 새로운 국가 추가 방법

1. `CountryPackId`에 새 ID를 추가한다.
2. `countryPacks` 배열에 같은 스키마의 데이터를 추가한다.
3. 캐릭터별 `countryGreetings`에 새 국가 반응을 추가한다.
4. 수업의 `meaningByCountry`에 번역을 추가한다.
