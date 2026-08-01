# 국가별 상위 학습앱 프로그램 차용 전략

작성일: 2026-08-02  
목적: 국가별로 강한 한국어/언어 학습 앱의 공개 기능을 분석하고, `korean-first-talk`의 실제 14일 학습 프로그램에 반영할 수 있는 방식을 정리한다.

## 1. 사용 원칙

앱스토어 순위는 국가, 기기, 날짜, 카테고리, 광고 집행에 따라 계속 바뀐다. 따라서 이 문서는 "현재 1위 앱을 그대로 따라 하기"가 아니라, 각 국가에서 반복적으로 강한 앱들이 공통으로 증명한 학습 장치를 우리 프로그램에 흡수하기 위한 자료다.

반영 가능:

- 짧은 수업 길이
- 말하기 중심 역할극
- 기준 음성과 내 녹음 비교
- 오답노트와 간격 복습
- 전체 대화 듣기
- 국가 언어 설명
- 오프라인/저용량 음원
- TOPIK/EPS-TOPIK 같은 목적형 경로

반영 금지:

- 경쟁 앱의 화면 구성, 캐릭터, 영상 연출 복제
- K-POP 가사, 드라마 대사, 방송 장면 무단 사용
- 실제 사람 목소리 복제
- 불안정한 발음 점수로 진도 차단
- 국가별 앱을 별도 코드로 복제

## 2. 글로벌 상위권 앱에서 차용할 프로그램

### TEUIDA 계열: 말하기 자신감과 짧은 상황 몰입

공개 앱 페이지 기준 TEUIDA는 한국어와 일본어 말하기를 위한 대화형 수업, 실제 상황 기반 speaking practice, AI 피드백을 핵심으로 내세운다.  
참고: [TEUIDA App Store](https://apps.apple.com/us/app/teuida-learn-korean-japanese/id1471928391), [TEUIDA Google Play](https://play.google.com/store/apps/details?id=net.teuida.teuida)

우리 앱에 반영:

- 각 Day 마지막에 "한 턴 역할극"을 반드시 넣는다.
- 역할극은 영상이 아니라 정적 상황 카드 + 기준 음성 + 사용자 녹음으로 시작한다.
- 발음 점수는 쓰지 않고, `기준 음성 -> 내 녹음 -> 기준 음성` 비교로 자신감을 만든다.
- Day 1은 설명보다 먼저 "안녕하세요"를 듣고 말하게 한다.

구현 형태:

- `dialogue.turns`: 전체 대화 4줄
- `roleplay.prompt`: 상대가 말하는 한 문장
- `roleplay.expectedPhraseId`: 사용자가 말할 핵심 문장
- `recording.mode`: scoreless A/B compare

### LingoDeer 계열: 구조가 보이는 짧은 문법

LingoDeer는 아시아 언어 학습에서 알파벳/문법/문장 구조, 체계적 레슨, 약점 복습을 강점으로 설명한다.  
참고: [LingoDeer Official](https://www.lingodeer.com/), [LingoDeer App Store](https://apps.apple.com/us/app/lingodeer-learn-languages/id1261193709)

우리 앱에 반영:

- 말하기 뒤에 40초짜리 "문장 뼈대" 설명을 제공한다.
- 문법명을 먼저 노출하지 않고, 문장틀을 먼저 보여준다.
- `주세요`, `어디예요`, `-고 싶어요`, `-아/어 주세요`처럼 Day별 구조를 하나만 잡는다.
- 약점 복습은 문법 단원명이 아니라 실제 문장 행동으로 돌아가게 한다.

구현 형태:

- `structure.pattern`: `N 하나 주세요`
- `structure.shortExplanation`: 국가 언어별 1~2문장
- `structure.swapSlots`: 바꿔 말하기 후보
- `review.reason`: "요청 표현", "위치 묻기", "다시 말해 달라 하기"

### Nemo 계열: 원어민 기준 음성과 내 목소리 비교

Nemo Korean은 원어민 음성, 오프라인 사용, 사용자의 발음을 녹음해서 교사 음성과 비교하는 Speech Studio를 공개 기능으로 설명한다.  
참고: [Nemo Korean App Store](https://apps.apple.com/us/app/korean-by-nemo/id487077174), [Nemo Korean Google Play](https://play.google.com/store/apps/details?id=com.nemoapps.android.korean)

우리 앱에 반영:

- 모든 핵심 문장에 `normal.wav`와 `slow.wav`를 고정 연결한다.
- 사용자의 녹음은 채점하지 않고 기준 음성과 번갈아 듣는다.
- 다운로드 가능한 정적 음원을 기본으로 둔다.
- 오프라인에서도 Day 복습 음원은 재생 가능하게 설계한다.

구현 형태:

- `audio.normal`, `audio.slow`, `audio.chunk[]`
- `recording.comparePlaylist`: native normal, user, native slow, user
- `offlineAudio.requiredFor`: Day 1~14 core phrases

### Drops 계열: 5분, 시각 단어, 낮은 진입 부담

Drops는 5분짜리 세션, 시각 기반 단어 학습, 게임형 단어 연습을 주요 특징으로 홍보한다.  
참고: [Drops Official](https://languagedrops.com/), [Drops Learn Korean App Store](https://apps.apple.com/us/app/drops-learn-korean-language/id939540371)

우리 앱에 반영:

- 단어 게임을 메인으로 만들지 않고, Day 후반 30초짜리 "장면 단어 3개"로 제한한다.
- 사진/아이콘은 실제 상황 이해를 돕는 보조 장치로만 쓴다.
- 저용량 국가팩에서는 영상 대신 가벼운 이미지와 음원을 우선한다.

구현 형태:

- `sceneWords`: 장소, 물건, 행동 단어 3개
- `visualCue`: 저작권 문제 없는 자체 이미지 또는 아이콘
- `review.cardType`: picture-to-phrase

### Cake 계열: 실제 표현, 저장, 짧은 반복

Cake는 실생활 영어 표현, 짧은 클립, 반복 학습, 저장/복습 기능을 강조한다. 한국어 앱에서도 K-콘텐츠 관심을 수업 진입 동기로 쓰는 패턴은 유효하다.  
참고: [Cake Official](https://mycake.me/), [Cake App Store](https://apps.apple.com/us/app/cake-learn-english-korean/id1350420987)

우리 앱에 반영:

- K-콘텐츠는 "오늘의 장면" 동기로만 사용하고, 저작권 있는 원문을 쓰지 않는다.
- 저장한 문장은 복습, 듣기 모드, 문장함에서 재사용한다.
- "실제 한국어에서는 이렇게 말해요"를 짧게 제공한다.

구현 형태:

- `usageNote`: textbook vs real-life note
- `saveablePhraseIds`
- `sentenceBox.tags`: cafe, travel, help, polite, hard

### TTMIK/Pimsleur 계열: 예열, 반복, 오디오 중심 회상

Talk To Me In Korean은 예열, 본 수업, 말하기 연습, 복습 퀴즈처럼 예측 가능한 학습 루프를 제공한다. Pimsleur는 오디오 중심의 듣고 답하기, 손을 쓰지 않는 반복 학습, 오프라인 연습을 강점으로 설명한다.  
참고: [TTMIK Courses](https://courses.talktomeinkorean.com/), [Pimsleur Google Play](https://play.google.com/store/apps/details?id=com.simonandschuster.pimsleur.unified.android)

우리 앱에 반영:

- 모든 Day 시작은 어제 문장 1개 회상으로 연다.
- 새 문장을 배운 뒤에는 화면을 보지 않고 답하는 오디오 회상 단계를 넣는다.
- 출퇴근/이동 중에는 버튼 3개만 제공한다: 다시 듣기, 천천히, 다음.
- Day 1~14 전체 대화는 연속 재생 가능해야 한다.

구현 형태:

- `dailyRecall.previousPhraseId`
- `audioOnly.script`
- `review.promptMode`: listen-and-answer
- `playlist.dayRange`: 1-14

### Eggbun 계열: 챗봇 느낌의 단계형 대화

Eggbun은 챗봇 방식의 한국어 학습, 한글/문장/퀴즈를 대화처럼 진행하는 방식을 내세운다.  
참고: [Eggbun App Store](https://apps.apple.com/us/app/eggbun-learn-korean-fun/id965620390), [Eggbun Google Play](https://play.google.com/store/apps/details?id=com.eggbun.education)

우리 앱에 반영:

- 자유 AI 채팅을 초반 핵심으로 넣지 않는다.
- 대신 정해진 선택지와 한 턴 발화로 "대화하는 느낌"을 만든다.
- 학습자는 틀려도 다음 단계로 갈 수 있고, 복습에만 반영된다.

구현 형태:

- `scriptedChat.steps`
- `choiceFeedback`
- `review.addOnMiss`: true

### Memrise/Video Shadowing 계열: 실제 말투 노출

Memrise와 Cake류 앱은 원어민 영상, 실제 표현, 따라 말하기를 전면에 둔다. 우리 앱은 저작권 있는 영상이나 대사를 쓰지 않고, 자체 제작한 짧은 기준 음성과 상황 이미지로 같은 학습 효과를 만든다.  
참고: [Memrise Korean](https://www.memrise.com/en-us/learn-korean), [Cake Official](https://mycake.me/)

우리 앱에 반영:

- "교과서 표현"과 "실제 매장/길거리 표현" 차이를 한 줄로 알려준다.
- 영상 대신 자체 제작 상황 이미지와 정적 기준 음원을 쓴다.
- 사용자는 자막 켜기/끄기, 느린 속도, chunk 반복으로 shadowing한다.

구현 형태:

- `usageNote.realLife`
- `subtitleToggle.default`
- `shadowing.chunks`

## 3. 국가별 차용 전략

### 일본

강한 패턴:

- 짧은 퀴즈형 한글/받침 학습
- 3분/10문제 단위의 부담 낮은 세션
- 일본어와 한국어의 어순 유사성을 활용한 설명
- 카페, 여행, 콘서트, 친구 대화 같은 즉시 사용 장면
- 문장 복사, 저장, 다시 듣기 수요

대표 참고 후보:

- [韓国語学習パッチムトレーニング App Store](https://apps.apple.com/jp/app/%E9%9F%93%E5%9B%BD%E8%AA%9E%E5%AD%A6%E7%BF%92%E3%83%91%E3%83%83%E3%83%81%E3%83%A0%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0/id809844915)
- [パッチムトレーニング Google Play](https://play.google.com/store/apps/details?hl=ja&id=com.nakashimajohn.korean)
- [TEUIDA Japan App Store](https://apps.apple.com/jp/app/teuida-learn-korean-japanese/id1471928391)
- [LingoDeer Japan App Store](https://apps.apple.com/jp/app/lingodeer-learn-languages/id1261193709)
- [Eggbun Japan App Store](https://apps.apple.com/jp/app/eggbun-learn-korean-fun/id965620390)

우리 앱 반영:

- Day 0 또는 Day 중간에 3분짜리 한글/받침/연음 미니 드릴을 삽입한다.
- 한 번에 10문제 이하의 선택형 퀴즈로 만들고, 틀려도 본 수업 진입을 막지 않는다.
- 일본어 설명에는 `です/ます`와 `-요`, 일본어 조사와 한국어 조사의 차이를 짧게 넣는다.
- Day 2 카페, Day 11 사진, Day 14 친구 대화는 일본어권 진입 장면으로 특히 강화한다.
- 일본어식 발음 힌트는 초반 3일만 강하게, 이후 점진적으로 줄인다.

### 영어권/미국

강한 패턴:

- 첫날부터 말하기
- 짧은 역할극
- 간결한 영어 설명
- 발음 채점보다 원어민/내 녹음 비교
- 다양한 일상 장면

대표 참고 후보:

- [TEUIDA App Store](https://apps.apple.com/us/app/teuida-learn-korean-japanese/id1471928391)
- [Duolingo App Store](https://apps.apple.com/us/app/duolingo-language-lessons/id570060128)
- [Nemo Korean App Store](https://apps.apple.com/us/app/korean-by-nemo/id487077174)

우리 앱 반영:

- 영어권 기본팩은 설명을 가장 짧게 유지한다.
- "한국어는 끝에 예의가 붙는다"처럼 기억 가능한 설명을 쓴다.
- 단어별 재생과 자막 토글을 제공한다.
- 역할극은 cafe, friend, travel, online chat, work 순서로 확장한다.

### 중국 본토

강한 패턴:

- 중국어 기반 설명
- 한자어 연결
- TOPIK, 유학, 취업, 장기 학습 경로
- 오답노트와 반복 복습
- Android 마켓 분산, Google 의존 회피 필요

대표 참고 후보:

- [沪江开心词场 Official](https://www.hujiang.com/cichang/)
- [羊驼韩语 Official](https://www.ytkorean.com/)
- [LingoDeer China App Store](https://apps.apple.com/cn/app/lingodeer-learn-languages/id1261193709)

우리 앱 반영:

- 중국어 간체팩에서는 영어를 중간 언어로 쓰지 않는다.
- 한자어는 기억 보조로 연결하되, 한국어 실제 쓰임 차이를 표시한다.
- 회화 Day와 TOPIK Day를 같은 복습함으로 연결한다.
- 오답노트는 "틀린 문제"보다 "다시 써야 할 실제 문장"으로 표시한다.

### 대만

강한 패턴:

- 번체 중국어 설명
- 한자어 이해와 회화 균형
- 통근 중 듣기
- Day 14 이후 경로에 대한 기대

대표 참고 후보:

- [LingoDeer Taiwan App Store](https://apps.apple.com/tw/app/lingodeer-learn-languages/id1261193709)
- [Drops Taiwan App Store](https://apps.apple.com/tw/app/drops-learn-korean-language/id939540371)

우리 앱 반영:

- 번체팩은 간체 문장 변환이 아니라 별도 문체로 작성한다.
- 전체 대화 연속 듣기와 오디오 전용 복습을 우선 개발한다.
- Day 14 완료 시 Day 15~30 여행/생활 경로를 보여준다.

### 베트남

강한 패턴:

- 한국어 학습 목적이 회화, TOPIK, EPS-TOPIK, 취업으로 나뉜다.
- 회사, 공장, 기숙사, 병원, 행정 상황이 중요하다.
- 저용량, 다운로드, 오프라인 수요가 높다.
- 까먹기 직전 복습하는 "골든타임" 식의 반복 학습 메시지가 잘 맞는다.

대표 참고 후보:

- [Migii TOPIK Google Play](https://play.google.com/store/apps/details?id=com.eup.migiitopik)
- [MochiVocab Google Play](https://play.google.com/store/apps/details?id=com.mochimochi.android.en)
- [LingoDeer App Store](https://apps.apple.com/us/app/lingodeer-learn-languages/id1261193709)

우리 앱 반영:

- 베트남어팩은 TOPIK과 EPS-TOPIK 목적을 분리해 안내한다.
- Day 15 이후에는 회사/공장/기숙사/병원/도움 요청 문장을 우선한다.
- Day 1~14 음원은 다운로드 가능한 저용량 세트로 제공한다.
- 복습 문구는 "틀렸어요"보다 "잊기 전에 다시 말해요"처럼 부담이 낮은 문장으로 쓴다.

### 인도네시아

강한 패턴:

- 무료 초급 범위에 대한 기대
- Bahasa Indonesia 설명
- 저사양 Android, 낮은 데이터 사용량
- 여행, 공부, 일상 회화 동기
- 라이브 선생님/반 배정 수요가 있어 목표 선택과 학습 경로 안내가 중요하다.

대표 참고 후보:

- [Cakap Official](https://cakap.com/en/)
- [Drops Google Play](https://play.google.com/store/apps/details?id=com.languagedrops.drops.international)
- [Nemo Korean Google Play](https://play.google.com/store/apps/details?id=com.nemoapps.android.korean)
- [Duolingo Google Play](https://play.google.com/store/apps/details?id=com.duolingo)

우리 앱 반영:

- 영상 자동 재생 없이 음원과 텍스트 중심으로 설계한다.
- 로마자 표기는 선택형으로 제공하고, 학습이 진행되면 한글 중심으로 이동한다.
- 회원가입 없이 Day 1 완료가 가능해야 한다.
- 다운로드 음원 크기와 네트워크 실패 안내를 명확히 한다.
- 온보딩에서 "여행", "공부", "일", "K-콘텐츠" 목표를 고르게 하고, Day 1~14 문장은 공통으로 유지한다.

### 태국

강한 패턴:

- 한글 소리 구분, 받침, 평음/경음/격음 설명 수요
- 드라마, 팬미팅, 콘서트, 카페, 여행 장면 동기
- 짧은 chunk 반복과 느린 음성 필요
- 저장한 문장과 일상 대화 표현을 반복해서 다시 보는 흐름이 중요하다.

대표 참고 후보:

- [Cake Thailand App Store](https://apps.apple.com/th/app/cake-%E0%B9%80%E0%B8%A3-%E0%B8%A2%E0%B8%99%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%AD-%E0%B8%87%E0%B8%81%E0%B8%A4%E0%B8%A9-%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%AB%E0%B8%A5/id1350420987)
- [Ling Thailand App Store](https://apps.apple.com/th/app/language-learning-with-ling/id1403783779)
- [Drops App Store](https://apps.apple.com/us/app/drops-learn-korean-language/id939540371)
- [LingoDeer App Store](https://apps.apple.com/us/app/lingodeer-learn-languages/id1261193709)

우리 앱 반영:

- 태국어팩에는 `ㄱ/ㅋ/ㄲ`, `ㄷ/ㅌ/ㄸ`, 받침 소리 차이를 짧은 드릴로 제공한다.
- K-콘텐츠 장면은 자체 제작 상황문으로 만든다.
- 모든 핵심 문장에 chunk 반복을 강하게 노출한다.
- 저장 문장함에서 "오늘 다시 말할 문장" 3개를 자동으로 꺼내 준다.

## 4. 우리 앱에 바로 넣을 프로그램 단위

### A. First Talk Roleplay

차용 근거: TEUIDA, Eggbun  
반영 위치: 모든 Day 마지막 단계

구성:

- 상대가 한 문장 말한다.
- 학습자는 오늘 핵심 문장으로 답한다.
- 앱은 정답/오답 점수 대신 "다시 듣기", "내 녹음 듣기", "한 번 더 말하기"를 제공한다.

예시 Day 4:

- 상대: 어디로 가세요?
- 학습자: 지하철역이 어디예요?

### B. Sentence Skeleton

차용 근거: LingoDeer  
반영 위치: 핵심 문장 듣기 직후

구성:

- 문장 전체 뜻
- 문장 뼈대
- 바꿔 넣을 수 있는 단어 2~3개

예시:

- 핵심: 아이스 아메리카노 하나 주세요.
- 뼈대: `N 하나 주세요`
- 바꾸기: 물, 커피, 김밥

### C. Native/User A-B Studio

차용 근거: Nemo  
반영 위치: 녹음 단계

구성:

- 기준 음성 자연 속도
- 내 녹음
- 기준 음성 느린 속도
- 내 녹음
- 다시 녹음

중요:

- "발음 점수 72점" 같은 표현을 쓰지 않는다.
- "다시 들어볼 부분"과 "천천히 따라 하기"만 제공한다.

### D. 3-Word Scene Pack

차용 근거: Drops  
반영 위치: Day 후반 30초

구성:

- 오늘 장면에 필요한 단어 3개
- 이미지 또는 아이콘
- 핵심 문장에 넣어 바꿔 말하기

예시 Day 5:

- 이거
- 카드
- 얼마

### E. Saved Sentence Box

차용 근거: Cake, Nemo  
반영 위치: 수업 완료와 복습

구성:

- 저장
- 복사
- 다시 듣기
- 태그 분류

기본 태그:

- cafe
- travel
- help
- polite
- hard

### F. Wrong-Note Review As Real Conversation

차용 근거: 중국어권 학습앱, LingoDeer  
반영 위치: 복습 탭

구성:

- 틀린 문제를 그대로 반복하지 않는다.
- 같은 상황에서 다시 말하게 한다.
- "문법 오답"보다 "실제 대화에서 다시 쓸 문장"으로 저장한다.

예시:

- 원인: Day 6 느린 음성 3회 이상 재생
- 복습: 빠른 상대 음성을 듣고 "조금 천천히 말해 주세요"라고 말하기

### G. Country Explanation Pack

차용 근거: 국가별 상위 앱 공통  
반영 위치: 문장 뼈대 설명, 발음 힌트, 복습 메시지

공통 한국어 원문은 바꾸지 않는다. 바꾸는 것은 설명 방식이다.

- 일본어권: 어순, 조사, `-요`
- 영어권: word order, politeness ending
- 중국어권: 한자어, TOPIK path
- 대만: 번체 문체, 통근 듣기
- 베트남: TOPIK/EPS-TOPIK, 생활 안전 문장
- 인도네시아: Bahasa, 저용량, 선택형 로마자
- 태국: 소리 대조, 받침, chunk 반복

## 5. Day 1~14에 반영할 우선순위

1. 모든 Day에 4줄 전체 대화를 추가한다.
2. 모든 Day에 상대 반응과 구출 문장을 추가한다.
3. 모든 Day에 문장 뼈대와 바꿔 말하기 슬롯을 추가한다.
4. 모든 Day에 역할극 한 턴을 추가한다.
5. 모든 Day 완료 후 복습 카드 3개를 생성한다.
6. 저장 문장함이 Day, 태그, 어려움 상태로 다시 찾을 수 있게 한다.
7. 일본어권/영어권 설명팩을 먼저 완성한다.
8. 베트남/인도네시아/태국팩은 오프라인 음원과 저용량 UX를 함께 묶어서 만든다.

## 6. 우선 반영하지 않을 것

- 무제한 AI 채팅
- 영상 기반 수업
- 발음 점수 진도 제한
- 국가별 별도 앱 코드
- 저작권 있는 K-POP/드라마 소재
- 과한 게임화와 순위 경쟁
- Day 수만 늘리는 커리큘럼 확장

## 7. 실제 다음 작업 제안

다음 개발은 구조 개선보다 콘텐츠 데이터 확장이 먼저다.

작업 1: `lesson` 데이터에 실제 학습 필드 추가

- `dialogue`
- `responsePhrase`
- `rescuePhrase`
- `structure`
- `swapSlots`
- `roleplay`
- `reviewCards`
- `countryNotes`

작업 2: Day 1~14 콘텐츠 채우기

- 한국어 원문
- 영어 설명
- 일본어 설명
- 자연 속도/느린 속도/chunk 음원 ID

작업 3: UI에 최소 반영

- 전체 대화 듣기
- 문장 뼈대
- A/B 녹음 비교
- 한 턴 역할극
- 저장/복사
- 복습 카드

이 순서가 가장 현실적이다. 앱을 크게 만들지 않고도, 사용자 입장에서는 "정말 한국어를 배우고 있다"는 밀도가 올라간다.
