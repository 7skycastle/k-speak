import type {
  BridgeSkillId,
  CountryPackId,
  Lesson,
  LocalizedPhrase,
  TravelMissionCheck
} from "../../types";

const localized = (
  en: string,
  ja = en,
  zh = en,
  vi = en,
  es = en,
  id = en,
  km = en,
  my = en,
  th = en,
  ms = en
): Record<CountryPackId, string> => ({
  "us-en": en,
  "jp-ja": ja,
  "cn-zh": zh,
  "vn-vi": vi,
  "mx-es": es,
  "id-id": id,
  "kh-km": km,
  "mm-my": my,
  "th-th": th,
  "my-ms": ms
});

const phrase = (korean: string, romanization: string, meaning: string): LocalizedPhrase => ({
  korean,
  romanization,
  meaningByCountry: localized(meaning)
});

interface TravelLessonSource {
  id: string;
  title: string;
  scene: string;
  korean: string;
  romanization: string;
  meaning: string;
  bridgeSkillIds: BridgeSkillId[];
}

const travelSources: TravelLessonSource[] = [
  {
    id: "travel-day-1",
    title: "Airport Arrival",
    scene: "Arriving at the airport",
    korean: "안녕하세요. 한국어를 잘 못해요.",
    romanization: "Annyeonghaseyo. Hangugeoreul jal motaeyo.",
    meaning: "Hello. I do not speak Korean well.",
    bridgeSkillIds: ["polite-ending", "request"]
  },
  {
    id: "travel-day-2",
    title: "Immigration And Baggage",
    scene: "Finding baggage claim",
    korean: "수하물 찾는 곳이 어디예요?",
    romanization: "Suhamul chatneun gosi eodiyeyo?",
    meaning: "Where is baggage claim?",
    bridgeSkillIds: ["sign", "location-direction"]
  },
  {
    id: "travel-day-3",
    title: "Transit Card And SIM",
    scene: "Buying transit basics",
    korean: "교통카드 하나 주세요.",
    romanization: "Gyotongkadeu hana juseyo.",
    meaning: "One transit card, please.",
    bridgeSkillIds: ["price-quantity", "request"]
  },
  {
    id: "travel-day-4",
    title: "Subway And Bus",
    scene: "Checking a route",
    korean: "홍대입구역에 가요?",
    romanization: "Hongdaeipguyeoge gayo?",
    meaning: "Does this go to Hongdae Station?",
    bridgeSkillIds: ["location-direction", "number-listening"]
  },
  {
    id: "travel-day-5",
    title: "Finding The Way",
    scene: "Asking for an exit",
    korean: "3번 출구가 어디예요?",
    romanization: "Sam beon chulguga eodiyeyo?",
    meaning: "Where is exit 3?",
    bridgeSkillIds: ["location-direction", "number-listening"]
  },
  {
    id: "travel-day-6",
    title: "Hotel Check-In",
    scene: "Checking in at lodging",
    korean: "예약했어요. 이름은 민준이에요.",
    romanization: "Yeyakaesseoyo. Ireumeun Minjunieyo.",
    meaning: "I made a reservation. My name is Minjun.",
    bridgeSkillIds: ["time-date", "request"]
  },
  {
    id: "travel-day-7",
    title: "Room Problem",
    scene: "Reporting a room issue",
    korean: "방에 수건이 없어요.",
    romanization: "Bange sugeoni eopseoyo.",
    meaning: "There are no towels in the room.",
    bridgeSkillIds: ["request", "situation-match"]
  },
  {
    id: "travel-day-8",
    title: "Restaurant Order",
    scene: "Ordering at a restaurant",
    korean: "이 메뉴 하나 주세요.",
    romanization: "I menyu hana juseyo.",
    meaning: "One of this menu, please.",
    bridgeSkillIds: ["price-quantity", "request"]
  },
  {
    id: "travel-day-9",
    title: "Allergy And Spice",
    scene: "Explaining food limits",
    korean: "땅콩은 못 먹어요. 안 맵게 해 주세요.",
    romanization: "Ttangkong-eun mot meogeoyo. An maepge hae juseyo.",
    meaning: "I cannot eat peanuts. Please make it not spicy.",
    bridgeSkillIds: ["prohibition", "condition"]
  },
  {
    id: "travel-day-10",
    title: "Cafe Takeout",
    scene: "Ordering to go",
    korean: "포장해 주세요.",
    romanization: "Pojanghae juseyo.",
    meaning: "Please make it to go.",
    bridgeSkillIds: ["request", "next-response"]
  },
  {
    id: "travel-day-11",
    title: "Shopping",
    scene: "Asking for size",
    korean: "이거 더 큰 사이즈 있어요?",
    romanization: "Igeo deo keun saijeu isseoyo?",
    meaning: "Do you have this in a larger size?",
    bridgeSkillIds: ["comparison", "price-quantity"]
  },
  {
    id: "travel-day-12",
    title: "Payment And Refund",
    scene: "Paying and asking for a receipt",
    korean: "카드로 결제할게요. 영수증 주세요.",
    romanization: "Kadeuro gyeoljehalgeyo. Yeongsujeung juseyo.",
    meaning: "I will pay by card. Please give me a receipt.",
    bridgeSkillIds: ["label-instruction", "price-quantity"]
  },
  {
    id: "travel-day-13",
    title: "Asking For Help",
    scene: "Explaining that you are lost",
    korean: "길을 잃었어요. 도와주세요.",
    romanization: "Gireul ireosseoyo. Dowajuseyo.",
    meaning: "I am lost. Please help me.",
    bridgeSkillIds: ["situation-match", "request"]
  },
  {
    id: "travel-day-14",
    title: "Travel Mission",
    scene: "Finishing a mixed travel mission",
    korean: "천천히 다시 말씀해 주세요.",
    romanization: "Cheoncheonhi dasi malsseumhae juseyo.",
    meaning: "Please say it again slowly.",
    bridgeSkillIds: ["next-response", "situation-match", "request"]
  }
];

const missionChecks = (): TravelMissionCheck[] => [
  {
    id: "first-sentence",
    promptByCountry: localized("Start the travel situation with the first sentence."),
    successLabelByCountry: localized("You did it"),
    practiceMoreLabelByCountry: localized("Practice more")
  },
  {
    id: "short-response",
    promptByCountry: localized("Understand the short reply."),
    successLabelByCountry: localized("You did it"),
    practiceMoreLabelByCountry: localized("Practice more")
  },
  {
    id: "rescue-expression",
    promptByCountry: localized("Choose a rescue expression when you are stuck."),
    successLabelByCountry: localized("You did it"),
    practiceMoreLabelByCountry: localized("Practice more")
  }
];

const makeTravelLesson = (source: TravelLessonSource, index: number): Lesson => {
  const core = phrase(source.korean, source.romanization, source.meaning);
  const response = phrase("네, 알겠습니다.", "Ne, algesseumnida.", "Yes, I understand.");
  const rescue = phrase("천천히 말씀해 주세요.", "Cheoncheonhi malsseumhae juseyo.", "Please speak slowly.");

  return {
    id: source.id,
    courseId: "travel",
    day: index + 1,
    title: localized(source.title),
    situation: localized(`Travel scene: ${source.scene}`),
    phraseId: `${source.id}:core`,
    korean: source.korean,
    romanization: source.romanization,
    meaningByCountry: localized(source.meaning),
    dialogue: [
      { speaker: "Traveler", speakerRole: "learner", ...core },
      { speaker: "Staff", speakerRole: "staff", ...response }
    ],
    responsePhrase: phrase("네, 감사합니다.", "Ne, gamsahamnida.", "Yes, thank you."),
    rescuePhrase: rescue,
    structure: {
      pattern: "N 주세요 / N이 어디예요?",
      explanationByCountry: localized("Use a short noun before the polite ending to ask clearly.")
    },
    swapSlots: [
      phrase("물 하나 주세요.", "Mul hana juseyo.", "One water, please."),
      phrase("화장실이 어디예요?", "Hwajangsiri eodiyeyo?", "Where is the restroom?")
    ],
    sceneWords: ["안녕하세요", "주세요", "어디예요"],
    roleplay: {
      prompt: core,
      expected: core,
      fallback: phrase("도와주세요.", "Dowajuseyo.", "Please help me.")
    },
    reviewCards: [
      {
        id: "listen",
        kind: "listen",
        promptByCountry: localized("Listen and choose the travel meaning."),
        phrase: core,
        reasonByCountry: localized("This is the key travel sentence.")
      },
      {
        id: "speak",
        kind: "speak",
        promptByCountry: localized("Say the sentence once."),
        phrase: core,
        reasonByCountry: localized("It helps you start the situation.")
      },
      {
        id: "roleplay",
        kind: "roleplay",
        promptByCountry: localized("Use it in a short travel turn."),
        phrase: core,
        reasonByCountry: localized("It prepares you for a real travel exchange.")
      }
    ],
    bridgeSkillIds: source.bridgeSkillIds,
    travelMissionChecks: source.id === "travel-day-14" ? missionChecks() : undefined,
    countryNotes: localized("Use the full polite sentence first, then repeat the noun if needed."),
    pronunciationByCountry: localized("Keep the final 요 soft and do not rush the middle syllables."),
    audioTargets: {
      core,
      response,
      rescue
    },
    steps: [
      { id: "situation", kind: "situation", title: "Scene", body: `Travel scene: ${source.scene}` },
      { id: "dialogue", kind: "dialogue", title: "Listen", body: "Hear the short exchange.", audioTargetId: "core" },
      {
        id: "phrase",
        kind: "phrase",
        title: "Key sentence",
        body: source.meaning,
        korean: source.korean,
        romanization: source.romanization,
        audioTargetId: "core",
        saveTargetId: "core"
      },
      { id: "listen", kind: "listen", title: "Natural speed", body: "Listen once at natural speed.", audioTargetId: "core" },
      {
        id: "repeat",
        kind: "repeat",
        title: "Slow repeat",
        body: "Repeat slowly and keep the polite ending.",
        audioTargetId: "core"
      },
      { id: "record", kind: "record", title: "Try speaking", body: "Record only when you are ready.", audioTargetId: "core" },
      {
        id: "quiz",
        kind: "quiz",
        title: "Meaning check",
        body: "Choose the meaning.",
        choices: [source.meaning, "I do not need help.", "Please cancel it."],
        answer: source.meaning
      },
      { id: "roleplay", kind: "roleplay", title: "One turn", body: "Use the sentence in the scene.", audioTargetId: "response" },
      { id: "summary", kind: "summary", title: "Summary", body: "Save the sentence and review it later.", saveTargetId: "core" }
    ]
  };
};

export const travelLessons: Lesson[] = travelSources.map(makeTravelLesson);
export const travelLessonIds = travelLessons.map((lesson) => lesson.id);
export const getTravelLesson = (lessonId: string) => travelLessons.find((lesson) => lesson.id === lessonId);
