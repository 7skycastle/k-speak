import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "day-1",
    day: 1,
    title: "처음 만났을 때 인사하기",
    situation: "카페나 숙소에서 처음 만난 사람에게 정중하게 인사합니다.",
    phraseId: "hello-nice-meet-you",
    korean: "안녕하세요. 만나서 반가워요.",
    romanization: "Annyeonghaseyo. Mannaseo bangawoyo.",
    meaningByCountry: {
      "us-en": "Hello. Nice to meet you.",
      "jp-ja": "こんにちは。お会いできてうれしいです。",
      "cn-zh": "你好。很高兴见到你。",
      "vn-vi": "Xin chào. Rất vui được gặp bạn.",
      "mx-es": "Hola. Mucho gusto."
    },
    steps: [
      {
        id: "situation",
        kind: "situation",
        title: "오늘의 상황",
        body: "처음 만난 사람에게 밝고 정중하게 인사하는 장면입니다.",
        reviewWeight: 1
      },
      {
        id: "character-hello",
        kind: "character",
        title: "튜터가 먼저 말해요",
        body: "짧게 듣고, 너무 완벽하게 따라 하려고 하지 않아도 됩니다.",
        reviewWeight: 1
      },
      {
        id: "phrase",
        kind: "phrase",
        title: "오늘의 한 문장",
        body: "두 문장처럼 들리지만 한 번에 자연스럽게 이어 말할 수 있습니다.",
        korean: "안녕하세요. 만나서 반가워요.",
        romanization: "Annyeonghaseyo. Mannaseo bangawoyo.",
        reviewWeight: 2
      },
      {
        id: "meaning",
        kind: "meaning",
        title: "뜻 확인",
        body: "처음 만난 사람에게 쓰는 가장 안전한 인사입니다.",
        reviewWeight: 1
      },
      {
        id: "natural-listen",
        kind: "listen",
        title: "자연 속도로 듣기",
        body: "먼저 실제 대화 속도에 가까운 리듬으로 들어 보세요.",
        korean: "안녕하세요. 만나서 반가워요.",
        reviewWeight: 2
      },
      {
        id: "slow-listen",
        kind: "listen",
        title: "느린 속도로 듣기",
        body: "소리의 덩어리를 나눠서 확인합니다.",
        korean: "안녕하세요 / 만나서 / 반가워요",
        reviewWeight: 2
      },
      {
        id: "chunk-repeat",
        kind: "repeat",
        title: "짧게 나눠 듣기",
        body: "어려운 부분만 다시 눌러 들을 수 있습니다.",
        korean: "안녕하세요 / 만나서 / 반가워요",
        reviewWeight: 2
      },
      {
        id: "record",
        kind: "record",
        title: "내 목소리로 말하기",
        body: "녹음이 안 되는 환경이면 건너뛰어도 수업은 완료할 수 있습니다.",
        korean: "안녕하세요. 만나서 반가워요.",
        reviewWeight: 4
      },
      {
        id: "compare",
        kind: "compare",
        title: "원본과 내 목소리 비교",
        body: "점수 대신 두 소리를 번갈아 듣고 리듬 차이를 느껴 봅니다.",
        korean: "안녕하세요. 만나서 반가워요.",
        reviewWeight: 4
      },
      {
        id: "quiz",
        kind: "quiz",
        title: "짧은 확인",
        body: "이 표현을 쓰기 가장 자연스러운 상황은 무엇일까요?",
        choices: ["처음 만났을 때", "잠들기 전에", "계산이 끝난 뒤"],
        answer: "처음 만났을 때",
        hint: "처음 만난 사람에게 쓰는 인사입니다.",
        reviewWeight: 3
      },
      {
        id: "roleplay",
        kind: "roleplay",
        title: "짧은 역할극",
        body: "상대가 먼저 고개를 살짝 숙입니다. 당신은 오늘 문장으로 답합니다.",
        korean: "안녕하세요. 만나서 반가워요.",
        reviewWeight: 3
      },
      {
        id: "summary",
        kind: "summary",
        title: "오늘의 정리",
        body: "오늘은 처음 만난 사람에게 안전하게 인사하는 표현을 익혔습니다. 내일은 카페에서 주문하는 문장을 연습합니다.",
        reviewWeight: 1
      }
    ]
  }
];

export const getLesson = (id = "day-1") => lessons.find((lesson) => lesson.id === id) ?? lessons[0];
