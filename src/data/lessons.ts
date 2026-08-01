import type { CountryPackId, Lesson } from "../types";

const dayOneLesson: Lesson =
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
  };

const localizedMeanings = (
  en: string,
  ja: string,
  zh: string,
  vi: string,
  es: string
): Record<CountryPackId, string> => ({
  "us-en": en,
  "jp-ja": ja,
  "cn-zh": zh,
  "vn-vi": vi,
  "mx-es": es
});

const lessonSeeds = [
  {
    day: 2,
    title: "카페에서 주문하기",
    situation: "카페에서 가장 기본적인 음료를 정중하게 주문합니다.",
    phraseId: "coffee-please",
    korean: "아이스 아메리카노 하나 주세요.",
    romanization: "Aiseu amerikano hana juseyo.",
    meaningByCountry: localizedMeanings(
      "One iced Americano, please.",
      "アイスアメリカーノを一つください。",
      "请给我一杯冰美式。",
      "Cho tôi một Americano đá.",
      "Un americano helado, por favor."
    )
  },
  {
    day: 3,
    title: "감사 인사하기",
    situation: "도움을 받았을 때 짧고 자연스럽게 고마움을 전합니다.",
    phraseId: "thank-you",
    korean: "감사합니다. 정말 도움이 됐어요.",
    romanization: "Gamsahamnida. Jeongmal doumi dwaesseoyo.",
    meaningByCountry: localizedMeanings(
      "Thank you. That really helped.",
      "ありがとうございます。本当に助かりました。",
      "谢谢。真的帮了我很多。",
      "Cảm ơn. Điều đó giúp tôi rất nhiều.",
      "Gracias. Me ayudo mucho."
    )
  },
  {
    day: 4,
    title: "길 묻기",
    situation: "지하철역 근처에서 목적지 방향을 물어봅니다.",
    phraseId: "where-is-station",
    korean: "지하철역이 어디예요?",
    romanization: "Jihacheolyeogi eodiyeyo?",
    meaningByCountry: localizedMeanings(
      "Where is the subway station?",
      "地下鉄の駅はどこですか。",
      "地铁站在哪里？",
      "Ga tàu điện ngầm ở đâu?",
      "¿Donde esta la estacion del metro?"
    )
  },
  {
    day: 5,
    title: "가격 묻기",
    situation: "가게에서 물건을 보고 가격을 확인합니다.",
    phraseId: "how-much",
    korean: "이거 얼마예요?",
    romanization: "Igeo eolmayeyo?",
    meaningByCountry: localizedMeanings(
      "How much is this?",
      "これはいくらですか。",
      "这个多少钱？",
      "Cái này bao nhiêu tiền?",
      "¿Cuanto cuesta esto?"
    )
  },
  {
    day: 6,
    title: "천천히 말해 달라고 하기",
    situation: "상대 말이 빠를 때 정중하게 속도를 낮춰 달라고 합니다.",
    phraseId: "speak-slowly",
    korean: "조금 천천히 말해 주세요.",
    romanization: "Jogeum cheoncheonhi malhae juseyo.",
    meaningByCountry: localizedMeanings(
      "Please speak a little slowly.",
      "少しゆっくり話してください。",
      "请说慢一点。",
      "Làm ơn nói chậm hơn một chút.",
      "Por favor, hable un poco mas despacio."
    )
  },
  {
    day: 7,
    title: "다시 말해 달라고 하기",
    situation: "듣지 못한 문장을 부담 없이 다시 요청합니다.",
    phraseId: "say-again",
    korean: "다시 한 번 말해 주세요.",
    romanization: "Dasi han beon malhae juseyo.",
    meaningByCountry: localizedMeanings(
      "Please say that one more time.",
      "もう一度言ってください。",
      "请再说一遍。",
      "Làm ơn nói lại một lần nữa.",
      "Por favor, digalo una vez mas."
    )
  },
  {
    day: 8,
    title: "식당에서 추천 받기",
    situation: "메뉴를 고르기 어려울 때 추천을 부탁합니다.",
    phraseId: "recommend-menu",
    korean: "추천 메뉴가 뭐예요?",
    romanization: "Chucheon menyuga mwoyeyo?",
    meaningByCountry: localizedMeanings(
      "What menu item do you recommend?",
      "おすすめメニューは何ですか。",
      "推荐菜单是什么？",
      "Món nào được gợi ý?",
      "¿Que plato recomienda?"
    )
  },
  {
    day: 9,
    title: "예약 확인하기",
    situation: "숙소나 식당에서 예약을 확인합니다.",
    phraseId: "reservation-check",
    korean: "예약 확인하고 싶어요.",
    romanization: "Yeyak hwaginhago sipeoyo.",
    meaningByCountry: localizedMeanings(
      "I would like to check my reservation.",
      "予約を確認したいです。",
      "我想确认预约。",
      "Tôi muốn kiểm tra đặt chỗ.",
      "Quiero confirmar mi reservacion."
    )
  },
  {
    day: 10,
    title: "괜찮다고 말하기",
    situation: "상대가 걱정할 때 괜찮다고 짧게 답합니다.",
    phraseId: "its-okay",
    korean: "괜찮아요. 문제없어요.",
    romanization: "Gwaenchanayo. Munje eopseoyo.",
    meaningByCountry: localizedMeanings(
      "It is okay. No problem.",
      "大丈夫です。問題ありません。",
      "没关系。没有问题。",
      "Không sao. Không vấn đề gì.",
      "Esta bien. No hay problema."
    )
  },
  {
    day: 11,
    title: "사진 부탁하기",
    situation: "여행 중 다른 사람에게 사진 촬영을 부탁합니다.",
    phraseId: "take-photo",
    korean: "사진 좀 찍어 주실 수 있어요?",
    romanization: "Sajin jom jjigeo jusil su isseoyo?",
    meaningByCountry: localizedMeanings(
      "Could you take a photo for me?",
      "写真を撮っていただけますか。",
      "可以帮我拍张照片吗？",
      "Bạn có thể chụp ảnh giúp tôi không?",
      "¿Me podria tomar una foto?"
    )
  },
  {
    day: 12,
    title: "화장실 위치 묻기",
    situation: "공공장소에서 화장실 위치를 정중하게 묻습니다.",
    phraseId: "where-restroom",
    korean: "화장실이 어디에 있어요?",
    romanization: "Hwajangsiri eodie isseoyo?",
    meaningByCountry: localizedMeanings(
      "Where is the restroom?",
      "トイレはどこにありますか。",
      "洗手间在哪里？",
      "Nhà vệ sinh ở đâu?",
      "¿Donde esta el bano?"
    )
  },
  {
    day: 13,
    title: "포장 요청하기",
    situation: "음식을 매장에서 먹지 않고 가져가고 싶다고 말합니다.",
    phraseId: "takeout-please",
    korean: "포장해 주세요.",
    romanization: "Pojanghae juseyo.",
    meaningByCountry: localizedMeanings(
      "Please make it to go.",
      "持ち帰りにしてください。",
      "请打包。",
      "Làm ơn gói mang đi.",
      "Para llevar, por favor."
    )
  },
  {
    day: 14,
    title: "다음에 또 보자고 말하기",
    situation: "짧은 대화를 마치고 다음 만남을 자연스럽게 말합니다.",
    phraseId: "see-you-again",
    korean: "다음에 또 만나요.",
    romanization: "Daeume tto mannayo.",
    meaningByCountry: localizedMeanings(
      "See you again next time.",
      "また今度会いましょう。",
      "下次再见。",
      "Hẹn gặp lại lần sau.",
      "Nos vemos la proxima vez."
    )
  }
];

const createDailyLesson = (seed: (typeof lessonSeeds)[number]): Lesson => ({
  id: `day-${seed.day}`,
  day: seed.day,
  title: seed.title,
  situation: seed.situation,
  phraseId: seed.phraseId,
  korean: seed.korean,
  romanization: seed.romanization,
  meaningByCountry: seed.meaningByCountry,
  steps: [
    {
      id: "situation",
      kind: "situation",
      title: "오늘의 상황",
      body: seed.situation,
      reviewWeight: 1
    },
    {
      id: "character-hello",
      kind: "character",
      title: "튜터가 먼저 말해요",
      body: "오늘 표현을 실제로 쓰는 장면을 짧게 떠올려 봅니다.",
      reviewWeight: 1
    },
    {
      id: "phrase",
      kind: "phrase",
      title: "오늘의 한 문장",
      body: "소리와 뜻을 함께 확인합니다.",
      korean: seed.korean,
      romanization: seed.romanization,
      reviewWeight: 2
    },
    {
      id: "meaning",
      kind: "meaning",
      title: "뜻 확인",
      body: "상황에 맞게 짧고 정중하게 사용할 수 있는 표현입니다.",
      reviewWeight: 1
    },
    {
      id: "natural-listen",
      kind: "listen",
      title: "자연 속도로 듣기",
      body: "먼저 전체 리듬을 들어 봅니다.",
      korean: seed.korean,
      reviewWeight: 2
    },
    {
      id: "slow-listen",
      kind: "listen",
      title: "느린 속도로 듣기",
      body: "낯선 소리를 천천히 확인합니다.",
      korean: seed.korean,
      reviewWeight: 2
    },
    {
      id: "record",
      kind: "record",
      title: "내 목소리로 말하기",
      body: "한 번 말해 보고, 필요하면 다시 녹음합니다.",
      korean: seed.korean,
      reviewWeight: 4
    },
    {
      id: "compare",
      kind: "compare",
      title: "원본과 내 목소리 비교",
      body: "점수 대신 원본과 내 리듬을 번갈아 들어 봅니다.",
      korean: seed.korean,
      reviewWeight: 4
    },
    {
      id: "quiz",
      kind: "quiz",
      title: "짧은 확인",
      body: "이 표현을 쓰기 가장 자연스러운 상황은 무엇일까요?",
      choices: [seed.situation, "잠들기 전에 혼잣말할 때", "전화번호를 쓸 때"],
      answer: seed.situation,
      hint: "오늘 처음에 본 실제 상황을 떠올려 보세요.",
      reviewWeight: 3
    },
    {
      id: "roleplay",
      kind: "roleplay",
      title: "짧은 역할극",
      body: "상대의 짧은 반응 뒤에 오늘 문장으로 답합니다.",
      korean: seed.korean,
      reviewWeight: 3
    },
    {
      id: "summary",
      kind: "summary",
      title: "오늘의 정리",
      body: `오늘은 "${seed.korean}" 표현을 연습했습니다. 다음 수업에서도 실제 대화에 바로 쓰는 문장을 이어갑니다.`,
      reviewWeight: 1
    }
  ]
});

export const lessons: Lesson[] = [dayOneLesson, ...lessonSeeds.map(createDailyLesson)];

export const getLesson = (id = "day-1") => lessons.find((lesson) => lesson.id === id) ?? lessons[0];

export const getNextLesson = (progress: Record<string, { status: string }>) =>
  lessons.find((lesson) => progress[lesson.id]?.status !== "completed") ?? lessons[lessons.length - 1];
