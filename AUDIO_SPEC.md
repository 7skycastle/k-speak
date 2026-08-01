# AUDIO_SPEC

## 캐릭터 음성 규격

캐릭터는 `voiceId`, 실제 녹음 여부, TTS 대체 여부를 가진다. 기본 캐릭터는 하늘, 준, 미나, 태호다.

## 음원 파일 규칙

Day 1 음성 슬롯은 `src/data/audioCatalog.ts`에 정의되어 있다. 실제 파일을 추가할 때는 `public/audio/day-1/{character}/natural.mp3`, `slow.mp3`, 필요한 경우 chunk 파일을 배치하고 슬롯 URL을 갱신한다. Day 2~14는 명시적인 TTS fallback 슬롯을 반환하므로 실제 음원 적용 시 같은 방식으로 슬롯을 추가한다.

## 자연·느린 발음 구조

자연 속도와 느린 속도는 별도 슬롯으로 관리한다. 현재는 실제 녹음 파일이 없으므로 브라우저 기기 TTS를 사용한다.

## 실제 음성과 TTS 구분

`hasRecordedVoice`, `usesTtsFallback`, `AudioSlot.usesTtsFallback`으로 내부 식별한다. 실제 원어민 음성이 없는 상태에서 허위로 실제 녹음이라고 표시하지 않는다.

## 저작권 및 교체 절차

음원 슬롯에는 권리 정보와 교체 메모를 남긴다. 실제 한국인 녹음 파일을 적용할 때는 사용 허가, 버전, 교체 이력을 함께 갱신한다.
