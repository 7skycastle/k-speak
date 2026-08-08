import { localized, phrase } from "../../i18n/kFoodCourse";
import type { BridgeSkillId, CulturePackId, Lesson, LocalizedPhrase } from "../../types";

export const CULTURE_ORIGINAL_CONTENT_NOTICE = {
  ko: "실제 작품이 아닌 K-Speak 자체 제작 학습 장면입니다.",
  en: "These are K-Speak original learning scenes, not real works, lyrics, characters, or celebrity content."
};

type CultureLessonGroup = "common" | CulturePackId | "synthesis";

interface CultureLessonSource {
  id: string;
  group: CultureLessonGroup;
  title: string;
  scene: string;
  korean: string;
  romanization: string;
  meaning: string;
  response: LocalizedPhrase;
  everydayAlternative?: LocalizedPhrase;
  bridgeSkillIds: BridgeSkillId[];
}

const response = phrase("네, 자연스럽게 말해 볼게요.", "Ne, jayeonseureopge malhae bolgeyo.", "Yes, I will try saying it naturally.");
const rescue = phrase("일상에서는 조금 더 부드럽게 말해요.", "Ilsangeseoneun jogeum deo budeureopge malhaeyo.", "In daily life, say it a little more softly.");

const common: CultureLessonSource[] = [
  {
    id: "k-culture-common-1",
    group: "common",
    title: "Polite and casual distance",
    scene: "Talking about a favorite scene with a new Korean friend",
    korean: "이렇게 말하면 더 자연스러워요.",
    romanization: "Ireoke malhamyeon deo jayeonseureowoyo.",
    meaning: "If you say it like this, it sounds more natural.",
    response,
    bridgeSkillIds: ["polite-ending", "comparison"]
  },
  {
    id: "k-culture-common-2",
    group: "common",
    title: "Short reactions and feelings",
    scene: "Reacting after watching a short clip",
    korean: "정말요? 저는 너무 좋아요.",
    romanization: "Jeongmallyo? Jeoneun neomu joayo.",
    meaning: "Really? I like it a lot.",
    response,
    bridgeSkillIds: ["next-response", "preference"]
  },
  {
    id: "k-culture-common-3",
    group: "common",
    title: "Numbers, time, schedules, notices",
    scene: "Checking a content event schedule",
    korean: "공연은 일곱 시에 시작해요.",
    romanization: "Gongyeoneun ilgop sie sijakaeyo.",
    meaning: "The performance starts at seven.",
    response,
    bridgeSkillIds: ["time", "schedule-table"]
  },
  {
    id: "k-culture-common-4",
    group: "common",
    title: "From content language to everyday Korean",
    scene: "Changing a dramatic line into polite daily Korean",
    korean: "일상에서는 이렇게 말해요.",
    romanization: "Ilsangeseoneun ireoke malhaeyo.",
    meaning: "In daily life, we say it like this.",
    response,
    bridgeSkillIds: ["polite-ending", "situation-match"]
  }
];

const kPop: CultureLessonSource[] = [
  {
    id: "k-culture-k-pop-1",
    group: "k-pop",
    title: "Schedule and ticket",
    scene: "Checking where to confirm an event schedule",
    korean: "표는 어디에서 확인해요?",
    romanization: "Pyoneun eodieseo hwaginhaeyo?",
    meaning: "Where do I check the ticket?",
    response,
    bridgeSkillIds: ["question", "practical-reading"]
  },
  {
    id: "k-culture-k-pop-2",
    group: "k-pop",
    title: "Venue notice",
    scene: "Reading a venue entrance notice",
    korean: "입장은 여섯 시부터예요.",
    romanization: "Ipjangeun yeoseot sibuteoyeyo.",
    meaning: "Entry starts at six.",
    response,
    bridgeSkillIds: ["time", "practical-reading"]
  },
  {
    id: "k-culture-k-pop-3",
    group: "k-pop",
    title: "Cheering and fan talk",
    scene: "Talking about a favorite original song style",
    korean: "어떤 노래를 가장 좋아해요?",
    romanization: "Eotteon noraereul gajang joahaeyo?",
    meaning: "What kind of song do you like most?",
    response,
    bridgeSkillIds: ["question", "preference"]
  },
  {
    id: "k-culture-k-pop-4",
    group: "k-pop",
    title: "Goods and quantity",
    scene: "Buying original event goods",
    korean: "이 상품은 두 개만 살 수 있어요?",
    romanization: "I sangpumeun du gaeman sal su isseoyo?",
    meaning: "Can I buy only two of this item?",
    response,
    bridgeSkillIds: ["quantity", "question"]
  },
  {
    id: "k-culture-k-pop-5",
    group: "k-pop",
    title: "Comment to conversation",
    scene: "Turning an online-style reaction into a polite comment",
    korean: "정말 멋져요. 다음 무대도 기대돼요.",
    romanization: "Jeongmal meotjyeoyo. Daeum mudaedo gidaedwaeyo.",
    meaning: "It is really cool. I am looking forward to the next stage too.",
    response,
    everydayAlternative: phrase(
      "정말 좋았어요. 다음 것도 기대돼요.",
      "Jeongmal joasseoyo. Daeum geotdo gidaedwaeyo.",
      "It was really good. I am looking forward to the next one too."
    ),
    bridgeSkillIds: ["next-response", "preference"]
  },
  {
    id: "k-culture-k-pop-6",
    group: "k-pop",
    title: "Review and recommendation",
    scene: "Recommending an original performance to a friend",
    korean: "친구에게 이 공연을 추천하고 싶어요.",
    romanization: "Chinguege i gongyeoneul chucheonhago sipeoyo.",
    meaning: "I want to recommend this performance to a friend.",
    response,
    bridgeSkillIds: ["preference", "request"]
  }
];

const kDrama: CultureLessonSource[] = [
  {
    id: "k-culture-k-drama-1",
    group: "k-drama",
    title: "Meeting and relationship",
    scene: "Meeting someone after a story discussion",
    korean: "처음 뵙겠습니다. 말 많이 들었어요.",
    romanization: "Cheoeum boepgetseumnida. Mal mani deureosseoyo.",
    meaning: "Nice to meet you. I have heard a lot about you.",
    response,
    bridgeSkillIds: ["polite-ending", "next-response"]
  },
  {
    id: "k-culture-k-drama-2",
    group: "k-drama",
    title: "Request and refusal",
    scene: "Softly refusing a request",
    korean: "미안하지만 오늘은 어려울 것 같아요.",
    romanization: "Mianhajiman oneureun eoryeoul geot gatayo.",
    meaning: "I am sorry, but today seems difficult.",
    response,
    bridgeSkillIds: ["condition", "request"]
  },
  {
    id: "k-culture-k-drama-3",
    group: "k-drama",
    title: "Apology and comfort",
    scene: "Comforting a friend in a daily situation",
    korean: "괜찮아요. 너무 걱정하지 마세요.",
    romanization: "Gwaenchanayo. Neomu geokjeonghaji maseyo.",
    meaning: "It is okay. Please do not worry too much.",
    response,
    bridgeSkillIds: ["prohibition", "next-response"]
  },
  {
    id: "k-culture-k-drama-4",
    group: "k-drama",
    title: "Misunderstanding and checking",
    scene: "Checking a misunderstanding politely",
    korean: "제가 잘못 이해한 건가요?",
    romanization: "Jega jalmot ihaehan geongayo?",
    meaning: "Did I misunderstand?",
    response,
    bridgeSkillIds: ["question", "situation-match"]
  },
  {
    id: "k-culture-k-drama-5",
    group: "k-drama",
    title: "Dramatic to everyday",
    scene: "Softening a dramatic expression",
    korean: "일상에서는 조금 부드럽게 말해요.",
    romanization: "Ilsangeseoneun jogeum budeureopge malhaeyo.",
    meaning: "In daily life, say it a little more softly.",
    response,
    everydayAlternative: phrase(
      "저는 이렇게 말하는 게 더 좋아요.",
      "Jeoneun ireoke malhaneun ge deo joayo.",
      "I prefer saying it this way."
    ),
    bridgeSkillIds: ["comparison", "polite-ending"]
  },
  {
    id: "k-culture-k-drama-6",
    group: "k-drama",
    title: "Scene opinion",
    scene: "Sharing an opinion about an original scene",
    korean: "그 장면이 가장 기억에 남아요.",
    romanization: "Geu jangmyeoni gajang gieoge namayo.",
    meaning: "That scene stays in my memory the most.",
    response,
    bridgeSkillIds: ["preference", "situation-match"]
  }
];

const synthesis: CultureLessonSource[] = [
  {
    id: "k-culture-synthesis-1",
    group: "synthesis",
    title: "Transfer to another situation",
    scene: "Using a culture expression in a daily conversation",
    korean: "이 표현은 다른 상황에서도 쓸 수 있어요.",
    romanization: "I pyohyeoneun dareun sanghwangeseodo sseul su isseoyo.",
    meaning: "You can use this expression in another situation too.",
    response,
    bridgeSkillIds: ["situation-match", "comparison"]
  },
  {
    id: "k-culture-synthesis-2",
    group: "synthesis",
    title: "Mixed culture roleplay",
    scene: "Finishing a short K-Culture conversation",
    korean: "제가 좋아하는 콘텐츠를 한국어로 말해 볼게요.",
    romanization: "Jega joahaneun kontencheureul hangugeoro malhae bolgeyo.",
    meaning: "I will try talking about the content I like in Korean.",
    response,
    bridgeSkillIds: ["preference", "next-response", "polite-ending"]
  }
];

const cultureSources = [...common, ...kPop, ...kDrama, ...synthesis];

const makeCultureLesson = (source: CultureLessonSource, index: number): Lesson => {
  const core = phrase(source.korean, source.romanization, source.meaning);
  const alternative = source.everydayAlternative ?? core;

  return {
    id: source.id,
    courseId: "k-culture",
    day: index + 1,
    title: localized(source.title),
    situation: localized(`K-Culture scene: ${source.scene}`),
    phraseId: `${source.id}:core`,
    korean: source.korean,
    romanization: source.romanization,
    meaningByCountry: localized(source.meaning),
    dialogue: [
      { speaker: "Learner", speakerRole: "learner", ...core },
      { speaker: "Friend", speakerRole: "friend", ...source.response }
    ],
    responsePhrase: source.response,
    rescuePhrase: rescue,
    structure: {
      pattern: "A/V-아요/어요 / N은/는",
      explanationByCountry: localized("Use a polite ending and keep content talk safe for daily conversation.")
    },
    swapSlots: [
      alternative,
      phrase("다시 한번 말해 주세요.", "Dasi hanbeon malhae juseyo.", "Please say it one more time.")
    ],
    sceneWords: ["자연스러워요", "좋아요", "기대돼요"],
    roleplay: {
      prompt: core,
      expected: alternative,
      fallback: rescue
    },
    reviewCards: [
      {
        id: "listen",
        kind: "listen",
        promptByCountry: localized("Listen and choose the safe culture meaning."),
        phrase: core,
        reasonByCountry: localized("It helps you enjoy K-content without copying real lyrics or dialogue.")
      },
      {
        id: "speak",
        kind: "speak",
        promptByCountry: localized("Say the everyday Korean version once."),
        phrase: alternative,
        reasonByCountry: localized("A polite daily version is easier to reuse with Korean speakers.")
      },
      {
        id: "roleplay",
        kind: "roleplay",
        promptByCountry: localized("Use it in a short culture conversation."),
        phrase: core,
        reasonByCountry: localized("It connects content interest to real conversation practice.")
      }
    ],
    bridgeSkillIds: source.bridgeSkillIds,
    countryNotes: localized(CULTURE_ORIGINAL_CONTENT_NOTICE.en),
    pronunciationByCountry: localized("Keep the final 요 light and do not copy dramatic intonation."),
    audioTargets: {
      core,
      response: source.response,
      rescue
    },
    steps: [
      { id: "situation", kind: "situation", title: "Scene", body: `K-Culture scene: ${source.scene}` },
      {
        id: "dialogue",
        kind: "dialogue",
        title: "Listen",
        body: "Hear the original short exchange.",
        audioTargetId: "core"
      },
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
      {
        id: "structure",
        kind: "structure",
        title: "Everyday version",
        body: alternative.meaningByCountry["us-en"],
        korean: alternative.korean,
        romanization: alternative.romanization,
        audioTargetId: "core"
      },
      { id: "listen", kind: "listen", title: "Natural speed", body: "Listen once at natural speed.", audioTargetId: "core" },
      {
        id: "repeat",
        kind: "repeat",
        title: "Slow repeat",
        body: "Repeat slowly without copying a dramatic tone.",
        audioTargetId: "core"
      },
      { id: "record", kind: "record", title: "Try speaking", body: "Record only when you are ready.", audioTargetId: "core" },
      {
        id: "quiz",
        kind: "quiz",
        title: "Meaning check",
        body: "Choose the meaning.",
        choices: [source.meaning, "Please cancel the ticket.", "I do not understand the notice."],
        answer: source.meaning
      },
      {
        id: "summary",
        kind: "summary",
        title: "Summary",
        body: CULTURE_ORIGINAL_CONTENT_NOTICE.en,
        saveTargetId: "core"
      }
    ]
  };
};

export const cultureLessons: Lesson[] = cultureSources.map(makeCultureLesson);
export const cultureLessonIds = cultureLessons.map((lesson) => lesson.id);
export const getCultureLesson = (lessonId: string) => cultureLessons.find((lesson) => lesson.id === lessonId);
export const getCulturePackLessonIds = (packId: CulturePackId) =>
  cultureLessons.filter((lesson) => lesson.id.startsWith(`k-culture-${packId}-`)).map((lesson) => lesson.id);
