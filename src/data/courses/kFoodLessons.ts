import type { BridgeSkillId, CountryPackId, KFoodMissionCheck, Lesson, LocalizedPhrase } from "../../types";

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

interface KFoodLessonSource {
  id: string;
  title: string;
  scene: string;
  korean: string;
  romanization: string;
  meaning: string;
  bridgeSkillIds: BridgeSkillId[];
}

const kFoodSources: KFoodLessonSource[] = [
  {
    id: "k-food-day-1",
    title: "First food-court order",
    scene: "food court",
    korean: "이거 하나 주세요.",
    romanization: "Igeo hana juseyo.",
    meaning: "One of this, please.",
    bridgeSkillIds: ["quantity", "polite-request"]
  },
  {
    id: "k-food-day-2",
    title: "Menu and set meals",
    scene: "menu board",
    korean: "이 세트에 뭐가 들어 있어요?",
    romanization: "I seteu-e mwoga deureo isseoyo?",
    meaning: "What is included in this set?",
    bridgeSkillIds: ["practical-reading", "question"]
  },
  {
    id: "k-food-day-3",
    title: "More and less",
    scene: "counter",
    korean: "밥은 조금만 주세요.",
    romanization: "Babeun jogeumman juseyo.",
    meaning: "Please give me only a little rice.",
    bridgeSkillIds: ["quantity", "polite-request"]
  },
  {
    id: "k-food-day-4",
    title: "Spice and flavor",
    scene: "restaurant",
    korean: "안 맵게 해 주세요.",
    romanization: "An maepge hae juseyo.",
    meaning: "Please make it not spicy.",
    bridgeSkillIds: ["condition", "request"]
  },
  {
    id: "k-food-day-5",
    title: "Allergies and ingredients",
    scene: "ordering desk",
    korean: "땅콩이 들어가요?",
    romanization: "Ttangkongi deureogayo?",
    meaning: "Does it contain peanuts?",
    bridgeSkillIds: ["warning", "ingredient"]
  },
  {
    id: "k-food-day-6",
    title: "Table items",
    scene: "dining table",
    korean: "물하고 젓가락 주세요.",
    romanization: "Mulhago jeotgarak juseyo.",
    meaning: "Water and chopsticks, please.",
    bridgeSkillIds: ["items", "request"]
  },
  {
    id: "k-food-day-7",
    title: "Takeaway",
    scene: "restaurant counter",
    korean: "포장해 주세요.",
    romanization: "Pojanghae juseyo.",
    meaning: "Please pack it to go.",
    bridgeSkillIds: ["service-request"]
  },
  {
    id: "k-food-day-8",
    title: "Cafe options",
    scene: "cafe",
    korean: "얼음은 빼 주세요.",
    romanization: "Eoreumeun ppae juseyo.",
    meaning: "Please leave out the ice.",
    bridgeSkillIds: ["option", "request"]
  },
  {
    id: "k-food-day-9",
    title: "Bakery and dessert",
    scene: "bakery",
    korean: "덜 단 디저트가 있어요?",
    romanization: "Deol dan dijeoteuga isseoyo?",
    meaning: "Do you have a less sweet dessert?",
    bridgeSkillIds: ["comparison", "preference"]
  },
  {
    id: "k-food-day-10",
    title: "Street food",
    scene: "street stall",
    korean: "이건 어떻게 먹어요?",
    romanization: "Igeon eotteoke meogeoyo?",
    meaning: "How do I eat this?",
    bridgeSkillIds: ["instruction", "sequence"]
  },
  {
    id: "k-food-day-11",
    title: "Convenience-store meals",
    scene: "convenience store",
    korean: "이거 데워 주세요.",
    romanization: "Igeo dewo juseyo.",
    meaning: "Please heat this up.",
    bridgeSkillIds: ["instruction", "request"]
  },
  {
    id: "k-food-day-12",
    title: "Payment and receipt",
    scene: "checkout",
    korean: "따로 계산할 수 있어요?",
    romanization: "Ttaro gyesanhal su isseoyo?",
    meaning: "Can we pay separately?",
    bridgeSkillIds: ["payment", "question"]
  },
  {
    id: "k-food-day-13",
    title: "Fixing an order",
    scene: "service counter",
    korean: "주문한 음식이 아직 안 나왔어요.",
    romanization: "Jumunhan eumsigi ajik an nawasseoyo.",
    meaning: "The food I ordered has not come out yet.",
    bridgeSkillIds: ["problem-report", "time-date"]
  },
  {
    id: "k-food-day-14",
    title: "K-Food mission",
    scene: "mixed food mission",
    korean: "재료를 확인하고 주문할게요.",
    romanization: "Jaeryoreul hwaginhago jumunhalgeyo.",
    meaning: "I will check the ingredients and order.",
    bridgeSkillIds: ["ingredient", "request", "problem-report"]
  }
];

const kFoodMissionChecks = (): KFoodMissionCheck[] => [
  { id: "choose-food", label: "Choose food safely" },
  { id: "short-order", label: "Complete a short order" },
  { id: "resolve-problem", label: "Resolve one problem" }
];

const makeKFoodLesson = (source: KFoodLessonSource, index: number): Lesson => {
  const core = phrase(source.korean, source.romanization, source.meaning);
  const response = phrase("네, 확인해 드릴게요.", "Ne, hwaginhae deurilgeyo.", "Yes, I will check for you.");
  const rescue = phrase(
    "천천히 다시 말씀해 주세요.",
    "Cheoncheonhi dasi malsseumhae juseyo.",
    "Please say that again slowly."
  );

  return {
    id: source.id,
    courseId: "k-food",
    day: index + 1,
    title: localized(source.title),
    situation: localized(`K-Food scene: ${source.scene}`),
    phraseId: `${source.id}:core`,
    korean: source.korean,
    romanization: source.romanization,
    meaningByCountry: localized(source.meaning),
    dialogue: [
      { speaker: "Learner", speakerRole: "learner", ...core },
      { speaker: "Staff", speakerRole: "staff", ...response }
    ],
    responsePhrase: response,
    rescuePhrase: rescue,
    structure: {
      pattern: "N 주세요 / N 들어가요?",
      explanationByCountry: localized("Use a short food word before a polite request or ingredient question.")
    },
    swapSlots: [
      phrase("물 하나 주세요.", "Mul hana juseyo.", "One water, please."),
      phrase("고수가 들어가요?", "Gosuga deureogayo?", "Does it contain cilantro?")
    ],
    sceneWords: ["주세요", "들어가요", "계산"],
    roleplay: {
      prompt: core,
      expected: core,
      fallback: rescue
    },
    reviewCards: [
      {
        id: "listen",
        kind: "listen",
        promptByCountry: localized("Listen and choose the food-order meaning."),
        phrase: core,
        reasonByCountry: localized("This sentence helps you handle a real food situation.")
      },
      {
        id: "speak",
        kind: "speak",
        promptByCountry: localized("Say the sentence once."),
        phrase: core,
        reasonByCountry: localized("Speaking it out loud makes ordering feel easier.")
      },
      {
        id: "roleplay",
        kind: "roleplay",
        promptByCountry: localized("Use it in a short food-order turn."),
        phrase: core,
        reasonByCountry: localized("It prepares you for a real counter or table exchange.")
      }
    ],
    bridgeSkillIds: source.bridgeSkillIds,
    kFoodMissionChecks: source.id === "k-food-day-14" ? kFoodMissionChecks() : undefined,
    countryNotes: localized("Start with the polite request, then add details like spice, ingredient, or payment."),
    pronunciationByCountry: localized("Keep 주세요 smooth and let the final 요 stay light."),
    audioTargets: {
      core,
      response,
      rescue
    },
    steps: [
      { id: "situation", kind: "situation", title: "Scene", body: `K-Food scene: ${source.scene}` },
      { id: "dialogue", kind: "dialogue", title: "Listen", body: "Hear the short food exchange.", audioTargetId: "core" },
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
        choices: [source.meaning, "Please cancel it.", "I do not need a receipt."],
        answer: source.meaning
      },
      { id: "roleplay", kind: "roleplay", title: "One turn", body: "Use the sentence in the food scene.", audioTargetId: "response" },
      { id: "summary", kind: "summary", title: "Summary", body: "Save the sentence and review it later.", saveTargetId: "core" }
    ]
  };
};

export const kFoodLessons: Lesson[] = kFoodSources.map(makeKFoodLesson);
export const kFoodLessonIds = kFoodLessons.map((lesson) => lesson.id);
export const getKFoodLesson = (lessonId: string) => kFoodLessons.find((lesson) => lesson.id === lessonId);
