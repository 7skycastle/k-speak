import type { TutorCharacter } from "../types";

export const tutorCharacters: TutorCharacter[] = [
  {
    id: "haneul",
    name: "Haneul",
    intro: "A calm tutor who helps you match the pace before pushing the sentence.",
    tone: "Soft, steady, reassuring",
    learnerFeeling: "Good when speaking still feels a little intimidating",
    recommendedFor: "First-time learners and learners who want a gentle start",
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
      "jp-ja": "Let's keep it light and useful.",
      "cn-zh": "Let's keep it light and useful.",
      "vn-vi": "Mình luyện nhẹ và rõ nhé.",
      "mx-es": "Vamos con una frase corta y util.",
      "id-id": "Kita mulai dari satu kalimat yang ringan dan berguna.",
      "kh-km": "ចាប់ផ្តើមពីប្រយោគខ្លីមួយដែលអាចយកទៅប្រើបានសិន។",
      "mm-my": "အသုံးဝင်တဲ့ ဝါကျတိုတစ်ခုနဲ့ စလိုက်ရအောင်။",
      "th-th": "เริ่มจากประโยคสั้นๆ ที่ใช้ได้จริงกันก่อน",
      "my-ms": "Mari mula dengan satu ayat yang ringkas dan berguna."
    }
  },
  {
    id: "jun",
    name: "Jun",
    intro: "A direct tutor who turns practical Korean into short repeatable chunks.",
    tone: "Clear, concise, practical",
    learnerFeeling: "Good when you want to build usable sentences quickly",
    recommendedFor: "Travel and day-to-day conversation goals",
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
      "jp-ja": "One phrase, real use. Ready?",
      "cn-zh": "One phrase, real use. Ready?",
      "vn-vi": "Bắt đầu bằng một câu dùng được ngay.",
      "mx-es": "Una frase real para usar hoy.",
      "id-id": "Satu kalimat, langsung bisa dipakai. Siap?",
      "kh-km": "ប្រយោគមួយដែលអ្នកអាចយកទៅប្រើបានភ្លាម។ រួចរាល់ហើយទេ?",
      "mm-my": "အခုချက်ချင်းသုံးနိုင်တဲ့ ဝါကျတစ်ကြောင်းပါ။ အဆင်သင့်လား?",
      "th-th": "หนึ่งประโยคที่เอาไปใช้ได้เลย พร้อมไหม",
      "my-ms": "Satu ayat yang boleh terus digunakan. Sedia?"
    }
  },
  {
    id: "mina",
    name: "Mina",
    intro: "A warm tutor who keeps the conversation moving with encouraging follow-ups.",
    tone: "Friendly, encouraging, lively",
    learnerFeeling: "Good when you want momentum and speaking confidence",
    recommendedFor: "Learners who want to keep talking instead of stopping early",
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
      "jp-ja": "You do not need perfect Korean to start.",
      "cn-zh": "You do not need perfect Korean to start.",
      "vn-vi": "Không cần hoàn hảo mới bắt đầu được.",
      "mx-es": "No tiene que sonar perfecto para empezar.",
      "id-id": "Tidak perlu bahasa Korea yang sempurna untuk mulai.",
      "kh-km": "អ្នកមិនចាំបាច់ចេះភាសាកូរ៉េឲ្យល្អឥតខ្ចោះទេ ដើម្បីចាប់ផ្តើម។",
      "mm-my": "စဖို့ ကိုရီးယားလိုကို ပြီးပြည့်စုံနေဖို့ မလိုပါဘူး။",
      "th-th": "ไม่ต้องพูดเกาหลีได้สมบูรณ์แบบก็เริ่มได้",
      "my-ms": "Tidak perlu bahasa Korea yang sempurna untuk bermula."
    }
  },
  {
    id: "taeho",
    name: "Taeho",
    intro: "A rhythm-focused tutor who helps you compare, repeat, and tighten pronunciation.",
    tone: "Observant, practical, coaching",
    learnerFeeling: "Good when you want to compare your voice and hear quick improvements",
    recommendedFor: "Learners who want strong listen-and-repeat practice",
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
      "jp-ja": "Listen once, then make it yours.",
      "cn-zh": "Listen once, then make it yours.",
      "vn-vi": "Nghe một lần, rồi nói theo cách của bạn.",
      "mx-es": "Escucha una vez y luego dilo con tu voz.",
      "id-id": "Dengar sekali, lalu ucapkan dengan gayamu sendiri.",
      "kh-km": "ស្តាប់ម្តងសិន បន្ទាប់មកនិយាយវាចេញដោយសម្លេងរបស់អ្នកផ្ទាល់។",
      "mm-my": "တစ်ခါနားထောင်ပြီး သင့်အသံနဲ့ ပြန်ပြောပါ။",
      "th-th": "ฟังก่อนหนึ่งครั้ง แล้วพูดด้วยจังหวะของตัวเอง",
      "my-ms": "Dengar sekali, kemudian sebut dengan suara sendiri."
    }
  }
];

export const getCharacter = (id: string | undefined) =>
  tutorCharacters.find((character) => character.id === id) ?? tutorCharacters[0];
