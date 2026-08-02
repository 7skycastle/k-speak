import type { CountryPackId } from "../types";

export const localized = (
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

export const uiCatalog = {
  "nav.home": localized("Home", "ホーム", "首页", "Trang chủ", "Inicio"),
  "nav.lesson": localized("Lesson", "レッスン", "课程", "Bài học", "Lección"),
  "nav.review": localized("Review", "復習", "复习", "Ôn tập", "Repaso"),
  "nav.settings": localized("Settings", "設定", "设置", "Cài đặt", "Configuración"),
  "common.start": localized("Start", "開始", "开始", "Bắt đầu", "Comenzar"),
  "common.continue": localized("Continue", "続ける", "继续", "Tiếp tục", "Continuar"),
  "common.next": localized("Next", "次へ", "下一步", "Tiếp theo", "Siguiente"),
  "state.loading.title": localized(
    "Loading your learning status",
    "学習状況を読み込んでいます",
    "正在加载学习状态",
    "Đang tải trạng thái học tập",
    "Cargando tu estado de aprendizaje"
  ),
  "state.loading.body": localized(
    "Checking your previous progress and review items.",
    "これまでの進捗と復習項目を確認しています。",
    "正在确认之前的学习进度和复习内容。",
    "Đang kiểm tra tiến độ trước đó và các mục cần ôn tập.",
    "Comprobando tu progreso anterior y los elementos de repaso."
  ),
  "lesson.summary.body": localized(
    "Today you practiced the expression \"{phrase}\". Sentences you save will come back for you to say again in review.",
    "今日は「{phrase}」という表現を練習しました。保存した文は復習でもう一度話す機会があります。",
    "今天练习了\"{phrase}\"这个表达。保存的句子会在复习中再次出现，让你重新说一遍。",
    "Hôm nay bạn đã luyện câu \"{phrase}\". Những câu bạn lưu lại sẽ xuất hiện trong phần ôn tập để bạn nói lại.",
    "Hoy practicaste la expresión \"{phrase}\". Las frases que guardes volverán a aparecer en el repaso para que las digas de nuevo."
  )
} as const;
