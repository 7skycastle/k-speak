import type { BridgeSkillId, CountryPackId, LocalizedPhrase } from "../types";

export const localized = (
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

export const phrase = (korean: string, romanization: string, meaning: string): LocalizedPhrase => ({
  korean,
  romanization,
  meaningByCountry: localized(meaning)
});

export interface KFoodLessonSource {
  id: string;
  title: string;
  scene: string;
  korean: string;
  romanization: string;
  meaning: string;
  bridgeSkillIds: BridgeSkillId[];
}

export const kFoodLessonSources: KFoodLessonSource[] = [
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
    bridgeSkillIds: ["problem-report", "time"]
  },
  {
    id: "k-food-day-14",
    title: "K-Food mission",
    scene: "mixed food mission",
    korean: "재료를 확인하고 주문할게요.",
    romanization: "Jaeryoreul hwaginhago jumunhalgeyo.",
    meaning: "I will check the ingredients and order.",
    bridgeSkillIds: ["ingredient", "order", "problem-report"]
  }
];

export const kFoodCourseCopy = {
  response: phrase("네, 확인해 드릴게요.", "Ne, hwaginhae deurilgeyo.", "Yes, I will check for you."),
  rescue: phrase(
    "천천히 다시 말씀해 주세요.",
    "Cheoncheonhi dasi malsseumhae juseyo.",
    "Please say that again slowly."
  ),
  structurePattern: "N 주세요 / N 들어가요?",
  structureExplanation: localized("Use a short food word before a polite request or ingredient question."),
  swapSlots: [
    phrase("물 하나 주세요.", "Mul hana juseyo.", "One water, please."),
    phrase("고수가 들어가요?", "Gosuga deureogayo?", "Does it contain cilantro?")
  ],
  sceneWords: ["주세요", "들어가요", "계산"],
  review: {
    listenPrompt: localized("Listen and choose the food-order meaning."),
    listenReason: localized("This sentence helps you handle a real food situation."),
    speakPrompt: localized("Say the sentence once."),
    speakReason: localized("Speaking it out loud makes ordering feel easier."),
    roleplayPrompt: localized("Use it in a short food-order turn."),
    roleplayReason: localized("It prepares you for a real counter or table exchange.")
  },
  countryNotes: localized("Start with the polite request, then add details like spice, ingredient, or payment."),
  pronunciation: localized("Keep 주세요 smooth and let the final 요 stay light."),
  steps: {
    situationTitle: "Scene",
    dialogueTitle: "Listen",
    dialogueBody: "Hear the short food exchange.",
    phraseTitle: "Key sentence",
    listenTitle: "Natural speed",
    listenBody: "Listen once at natural speed.",
    repeatTitle: "Slow repeat",
    repeatBody: "Repeat slowly and keep the polite ending.",
    recordTitle: "Try speaking",
    recordBody: "Record only when you are ready.",
    quizTitle: "Meaning check",
    quizBody: "Choose the meaning.",
    quizDistractors: ["Please cancel it.", "I do not need a receipt."],
    roleplayTitle: "One turn",
    roleplayBody: "Use the sentence in the food scene.",
    summaryTitle: "Summary",
    summaryBody: "Save the sentence and review it later."
  }
};
