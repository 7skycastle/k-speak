import type { TutorCharacter } from "../types";

export const tutorCharacters: TutorCharacter[] = [
  {
    id: "haneul",
    name: "하늘",
    intro: "차분하게 속도를 맞춰 주는 서울 출신 튜터",
    tone: "부드럽고 안정적인 말투",
    learnerFeeling: "처음 말해도 부담이 적음",
    recommendedFor: "처음 시작하거나 긴장하는 학습자",
    voiceId: "voice-haneul-01",
    hasRecordedVoice: false,
    usesTtsFallback: true,
    voiceProfile: {
      provider: "browser_speech_synthesis",
      sourceType: "browser_speech_synthesis",
      voiceId: "ko-KR-browser-soft-female",
      displayName: "Browser Korean voice, soft female profile",
      licenseStatus: "browser_runtime",
      commercialUse: "browser_runtime",
      rateNatural: 1,
      rateSlow: 0.72
    },
    countryGreetings: {
      "us-en": "Let's keep it light and useful.",
      "jp-ja": "ゆっくり一緒に練習しましょう。",
      "cn-zh": "我们慢慢练一句可以马上用的话。",
      "vn-vi": "Mình luyện chậm và rõ nhé.",
      "mx-es": "Vamos con una frase corta y util."
    }
  },
  {
    id: "jun",
    name: "준",
    intro: "짧고 명확하게 실전 표현을 잡아 주는 튜터",
    tone: "밝고 간결한 말투",
    learnerFeeling: "빠르게 한 문장을 완성하는 느낌",
    recommendedFor: "여행과 일상회화 목적 학습자",
    voiceId: "voice-jun-01",
    hasRecordedVoice: false,
    usesTtsFallback: true,
    voiceProfile: {
      provider: "browser_speech_synthesis",
      sourceType: "browser_speech_synthesis",
      voiceId: "ko-KR-browser-clear-male",
      displayName: "Browser Korean voice, clear male profile",
      licenseStatus: "browser_runtime",
      commercialUse: "browser_runtime",
      rateNatural: 1,
      rateSlow: 0.72
    },
    countryGreetings: {
      "us-en": "One phrase, real use. Ready?",
      "jp-ja": "すぐ使える一言から始めます。",
      "cn-zh": "先学一句马上能用的韩语。",
      "vn-vi": "Bắt đầu bằng một câu dùng được ngay.",
      "mx-es": "Una frase real para usar hoy."
    }
  },
  {
    id: "mina",
    name: "미나",
    intro: "친근한 반응으로 말하기를 계속 이어 주는 튜터",
    tone: "따뜻하고 격려하는 말투",
    learnerFeeling: "틀려도 계속 말하고 싶어짐",
    recommendedFor: "회화 자신감을 만들고 싶은 학습자",
    voiceId: "voice-mina-01",
    hasRecordedVoice: false,
    usesTtsFallback: true,
    voiceProfile: {
      provider: "browser_speech_synthesis",
      sourceType: "browser_speech_synthesis",
      voiceId: "ko-KR-browser-warm-female",
      displayName: "Browser Korean voice, warm female profile",
      licenseStatus: "browser_runtime",
      commercialUse: "browser_runtime",
      rateNatural: 1,
      rateSlow: 0.72
    },
    countryGreetings: {
      "us-en": "You do not need perfect Korean to start.",
      "jp-ja": "完璧でなくても大丈夫です。",
      "cn-zh": "不用完美，也可以开始说。",
      "vn-vi": "Không cần hoàn hảo mới bắt đầu được.",
      "mx-es": "No tiene que sonar perfecto para empezar."
    }
  },
  {
    id: "taeho",
    name: "태호",
    intro: "발음의 리듬과 반복을 잘 짚어 주는 튜터",
    tone: "또렷하고 실용적인 말투",
    learnerFeeling: "내 목소리를 비교하며 개선하는 느낌",
    recommendedFor: "듣기와 말하기를 함께 잡고 싶은 학습자",
    voiceId: "voice-taeho-01",
    hasRecordedVoice: false,
    usesTtsFallback: true,
    voiceProfile: {
      provider: "browser_speech_synthesis",
      sourceType: "browser_speech_synthesis",
      voiceId: "ko-KR-browser-coach-male",
      displayName: "Browser Korean voice, coach male profile",
      licenseStatus: "browser_runtime",
      commercialUse: "browser_runtime",
      rateNatural: 1,
      rateSlow: 0.72
    },
    countryGreetings: {
      "us-en": "Listen once, then make it yours.",
      "jp-ja": "聞いて、自分の声で試しましょう。",
      "cn-zh": "先听，再用自己的声音试试。",
      "vn-vi": "Nghe một lần, rồi nói bằng giọng của bạn.",
      "mx-es": "Escucha una vez y luego dilo con tu voz."
    }
  }
];

export const getCharacter = (id: string | undefined) =>
  tutorCharacters.find((character) => character.id === id) ?? tutorCharacters[0];
