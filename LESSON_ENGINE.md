# LESSON_ENGINE

## 공통 수업 단계

수업은 `src/data/lessons.ts`의 `Lesson.steps` 배열로 정의된다. 화면은 단계 `kind`에 따라 상황, 문장, 듣기, 녹음, 비교, 퀴즈, 역할극, 정리를 렌더링한다.

## 수업 데이터 스키마

핵심 타입은 `src/types.ts`의 `Lesson`, `LessonStep`, `LessonProgress`, `StepMetrics`다. 새 Day는 같은 스키마로 데이터만 추가한다.

## 진행 상태

`src/engine/lessonEngine.ts`가 `createLessonProgress`, `completeStep`, `updateStepMetrics`, `getLessonPercent`를 제공한다. 완료 단계 목록과 현재 단계 ID를 분리해 중단 후 복구를 단순하게 한다.

## 정답·힌트 처리

퀴즈 단계에서 정답이 틀려도 흐름을 막지 않는다. `answeredCorrectly`, `usedHint`, `responseMs`는 복습 우선순위 계산에 들어간다.

## 음성 비교

원본 재생은 현재 기기 TTS로 대체된다. 녹음은 브라우저 `MediaRecorder`를 사용하며, 녹음 파일은 서버로 업로드하지 않는다. 사용자는 원본과 자신의 녹음을 번갈아 들을 수 있다.

## 역할극

역할극 상황은 국가팩의 `roleplaySituation`에서 가져와 국가별 맥락을 바꿀 수 있다.

## Day 추가 방법

현재 Day 1~14가 `src/data/lessons.ts`에 같은 스키마로 들어 있다. 새 Day는 `Lesson` 객체를 추가하고, 필요한 음성 슬롯을 `src/data/audioCatalog.ts`에 추가한다. 화면 컴포넌트 복사는 필요 없다.
