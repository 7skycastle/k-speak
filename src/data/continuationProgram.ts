import type { LearningGoal } from "../types";

export interface ContinuationModule {
  dayRange: string;
  title: string;
  outcome: string;
  samplePhrases: string[];
}

export interface ContinuationTrack {
  id: LearningGoal;
  title: string;
  promise: string;
  modules: ContinuationModule[];
}

export const continuationTracks: ContinuationTrack[] = [
  {
    id: "travel",
    title: "Day 15-30 여행 생존 말하기",
    promise: "길 찾기, 예약, 주문, 도움 요청을 실제 이동 동선에 맞춰 다시 말합니다.",
    modules: [
      {
        dayRange: "Day 15-18",
        title: "이동과 길 안내",
        outcome: "역, 버스, 택시에서 목적지를 묻고 확인합니다.",
        samplePhrases: ["여기로 가 주세요.", "몇 번 출구예요?", "여기서 내려 주세요."]
      },
      {
        dayRange: "Day 19-22",
        title: "식당과 카페 확장",
        outcome: "맵기, 알레르기, 포장, 계산을 짧게 처리합니다.",
        samplePhrases: ["맵지 않게 해 주세요.", "계산해 주세요.", "따로 포장해 주세요."]
      },
      {
        dayRange: "Day 23-30",
        title: "문제 해결",
        outcome: "분실, 취소, 도움 요청 상황에서 당황하지 않고 말합니다.",
        samplePhrases: ["도와주실 수 있어요?", "예약을 바꾸고 싶어요.", "잃어버렸어요."]
      }
    ]
  },
  {
    id: "daily",
    title: "Day 15-30 일상 대화 넓히기",
    promise: "인사 다음에 이어지는 날씨, 약속, 취향, 짧은 감정 표현을 연습합니다.",
    modules: [
      {
        dayRange: "Day 15-18",
        title: "가벼운 안부",
        outcome: "처음 만난 사람과 한 문장 더 이어갑니다.",
        samplePhrases: ["오늘 날씨 좋네요.", "요즘 어떻게 지내요?", "저도 좋아해요."]
      },
      {
        dayRange: "Day 19-22",
        title: "약속과 시간",
        outcome: "시간을 정하고 늦거나 바꾸는 상황을 말합니다.",
        samplePhrases: ["몇 시에 만날까요?", "조금 늦을 것 같아요.", "내일 괜찮아요?"]
      },
      {
        dayRange: "Day 23-30",
        title: "취향과 반응",
        outcome: "좋아하는 것과 간단한 감상을 자연스럽게 말합니다.",
        samplePhrases: ["이거 정말 좋아해요.", "재미있었어요.", "다음에 또 같이 가요."]
      }
    ]
  },
  {
    id: "study",
    title: "Day 15-30 공부와 TOPIK 입문",
    promise: "수업, 과제, 시험 준비에 필요한 질문과 확인 표현을 말합니다.",
    modules: [
      {
        dayRange: "Day 15-18",
        title: "수업에서 질문하기",
        outcome: "모르는 부분을 다시 묻고 설명을 요청합니다.",
        samplePhrases: ["이 부분을 다시 설명해 주세요.", "예문이 있어요?", "숙제가 뭐예요?"]
      },
      {
        dayRange: "Day 19-22",
        title: "공부 계획",
        outcome: "시험 날짜, 공부 시간, 목표를 짧게 말합니다.",
        samplePhrases: ["TOPIK을 준비하고 있어요.", "매일 조금씩 공부해요.", "시험이 언제예요?"]
      },
      {
        dayRange: "Day 23-30",
        title: "학교 생활",
        outcome: "교실, 도서관, 행정실에서 필요한 말을 합니다.",
        samplePhrases: ["도서관이 어디예요?", "신청하고 싶어요.", "확인 부탁드립니다."]
      }
    ]
  },
  {
    id: "work",
    title: "Day 15-30 일과 현장 한국어",
    promise: "출근, 일정, 안전, 요청 표현을 짧고 분명하게 말합니다.",
    modules: [
      {
        dayRange: "Day 15-18",
        title: "출근과 일정",
        outcome: "도착, 지각, 쉬는 시간을 간단히 말합니다.",
        samplePhrases: ["지금 도착했어요.", "조금 늦을 것 같아요.", "몇 시에 시작해요?"]
      },
      {
        dayRange: "Day 19-22",
        title: "업무 요청",
        outcome: "천천히 설명을 부탁하고 다시 확인합니다.",
        samplePhrases: ["한 번만 더 보여 주세요.", "제가 해 볼게요.", "이렇게 하면 돼요?"]
      },
      {
        dayRange: "Day 23-30",
        title: "안전과 도움",
        outcome: "아프거나 위험한 상황에서 바로 도움을 요청합니다.",
        samplePhrases: ["몸이 안 좋아요.", "위험해요.", "관리자님을 불러 주세요."]
      }
    ]
  },
  {
    id: "life",
    title: "Day 15-30 한국 생활 정착",
    promise: "병원, 집, 은행, 행정 상황에서 필요한 핵심 문장을 준비합니다.",
    modules: [
      {
        dayRange: "Day 15-18",
        title: "집과 동네",
        outcome: "주소, 배달, 주변 시설을 묻습니다.",
        samplePhrases: ["이 주소가 맞아요?", "근처에 약국이 있어요?", "배달 가능해요?"]
      },
      {
        dayRange: "Day 19-22",
        title: "병원과 약국",
        outcome: "증상과 요청을 짧게 말합니다.",
        samplePhrases: ["머리가 아파요.", "약을 사고 싶어요.", "예약해야 해요?"]
      },
      {
        dayRange: "Day 23-30",
        title: "은행과 행정",
        outcome: "신청, 확인, 서류 요청을 말합니다.",
        samplePhrases: ["통장을 만들고 싶어요.", "이 서류가 필요해요?", "확인해 주세요."]
      }
    ]
  },
  {
    id: "k-content",
    title: "Day 15-30 K-콘텐츠 대화",
    promise: "좋아하는 콘텐츠를 말하고, 추천을 묻고, 감상을 나눕니다.",
    modules: [
      {
        dayRange: "Day 15-18",
        title: "좋아하는 것 말하기",
        outcome: "가수, 드라마, 노래 취향을 짧게 표현합니다.",
        samplePhrases: ["이 노래 좋아해요.", "요즘 이 드라마를 봐요.", "누구 좋아해요?"]
      },
      {
        dayRange: "Day 19-22",
        title: "추천 묻기",
        outcome: "콘텐츠 추천을 받고 반응합니다.",
        samplePhrases: ["추천해 주세요.", "어디서 볼 수 있어요?", "재미있을 것 같아요."]
      },
      {
        dayRange: "Day 23-30",
        title: "감상 나누기",
        outcome: "재미, 감동, 다음 계획을 자연스럽게 말합니다.",
        samplePhrases: ["정말 재미있었어요.", "조금 슬펐어요.", "다음 편도 볼 거예요."]
      }
    ]
  }
];

export const getContinuationTrack = (goal: LearningGoal | undefined) =>
  continuationTracks.find((track) => track.id === goal) ?? continuationTracks[0];
