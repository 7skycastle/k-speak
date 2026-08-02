import type { CountryPack } from "../types";

export const countryPacks: CountryPack[] = [
  {
    id: "us-en",
    label: "United States",
    nativeLabel: "English",
    interfaceLanguage: "en",
    onboardingNote: "Start with a useful sentence before grammar. You can adjust the pace later.",
    cultureNote: "In Korea, a light bow and polite ending make first meetings feel smoother.",
    roleplaySituation: "You meet a cafe staff member near a subway station and greet them politely.",
    feedback: ["Nice and clear.", "Try the ending one more time.", "That sounded natural enough to use today."],
    reminders: ["Three minutes is enough for one phrase.", "Come back for a short speaking check."],
    comebackMessage: "Pick up from the sentence you practiced last time.",
    learningGuide: {
      focus: "Start by saying the whole sentence aloud before reading grammar.",
      pronunciation: "Listen for the final polite ending. Rhythm matters more than perfect romanization.",
      grammarBridge: "Korean often places the object or place before the action, then finishes with the polite ending.",
      reviewHabit: "Save phrases you could use today, then replay them slowly before trying normal speed.",
      offlineTip: "Keep the compact Day 1-14 audio pack ready for travel or weak network moments."
    },
    preferredGoals: ["travel", "daily", "k-content"],
    defaultDailyGoal: 5,
    notificationWindow: "18:00-21:00",
    dateTimeFormat: "MMM d, h:mm a",
    currency: "USD",
    disabledFeatures: [],
    privacyNote: "Voice recordings stay on this device in the current prototype.",
    translations: {
      start: "Start",
      continue: "Continue",
      review: "Review",
      settings: "Settings",
      lesson: "Lesson"
    }
  },
  {
    id: "jp-ja",
    label: "Japan",
    nativeLabel: "日本語",
    interfaceLanguage: "ja",
    onboardingNote: "韓国語の敬語は日本語と似ていますが、語尾の感覚から短く練習します。",
    cultureNote: "韓国では初対面で「안녕하세요」を丁寧にはっきり言うだけで印象が良くなります。",
    roleplaySituation: "駅の近くのカフェで店員に丁寧にあいさつします。",
    feedback: ["いい流れです。", "語尾を少しだけ長く言ってみましょう。", "今日そのまま使える表現です。"],
    reminders: ["3分だけ韓国語を声に出しましょう。", "昨日の表現を短く確認します。"],
    comebackMessage: "前回練習した表現から続けましょう。",
    learningGuide: {
      focus: "日本語に似た丁寧さを使いながら、まず韓国語の語尾を声に出します。",
      pronunciation: "パッチムと連音を短く確認し、最後の「요」を急がずに言います。",
      grammarBridge: "助詞は日本語と似ていますが、은/는 と 이/가 は固定訳で覚えすぎないようにします。",
      reviewHabit: "保存した文を見ずに一度言ってから、ゆっくり音声で確認します。",
      offlineTip: "通勤中でも使えるように、Day 1-14 の軽量音声を優先します。"
    },
    preferredGoals: ["travel", "daily", "work"],
    defaultDailyGoal: 5,
    notificationWindow: "19:00-22:00",
    dateTimeFormat: "yyyy/MM/dd HH:mm",
    currency: "JPY",
    disabledFeatures: [],
    privacyNote: "この試作版では音声は端末内でのみ扱います。",
    translations: {
      start: "開始",
      continue: "続き",
      review: "復習",
      settings: "設定",
      lesson: "レッスン"
    }
  },
  {
    id: "cn-zh",
    label: "China",
    nativeLabel: "中文",
    interfaceLanguage: "zh",
    onboardingNote: "先从能马上开口的句子开始，语法说明会保持很短。",
    cultureNote: "在韩国，第一次见面时用礼貌结尾说“안녕하세요”很自然。",
    roleplaySituation: "你在地铁站附近的咖啡店，礼貌地向店员打招呼。",
    feedback: ["表达很清楚。", "结尾再慢一点会更自然。", "这是今天就能使用的句子。"],
    reminders: ["用3分钟练一句韩语。", "回来复习昨天觉得难的表达。"],
    comebackMessage: "从你上次练过的句子继续。",
    learningGuide: {
      focus: "先用完整韩语句子开口，不用英语作为中间语言。",
      pronunciation: "注意收音和连读，先听句尾礼貌语气，再跟读。",
      grammarBridge: "用中文说明句子结构，但练习时只保留韩语语序。",
      reviewHabit: "把听不清或说得慢的句子加入复习，第二天重新说一遍。",
      offlineTip: "保留低容量音频包，方便在通勤和网络不稳定时复习。"
    },
    preferredGoals: ["study", "work", "life"],
    defaultDailyGoal: 10,
    notificationWindow: "20:00-22:00",
    dateTimeFormat: "yyyy年M月d日 HH:mm",
    currency: "CNY",
    disabledFeatures: [],
    privacyNote: "当前版本不会把你的录音上传到服务器。",
    translations: {
      start: "开始",
      continue: "继续",
      review: "复习",
      settings: "设置",
      lesson: "课程"
    }
  },
  {
    id: "vn-vi",
    label: "Vietnam",
    nativeLabel: "Tiếng Việt",
    interfaceLanguage: "vi",
    onboardingNote: "Bắt đầu bằng một câu có thể dùng ngay, rồi luyện nghe và nói chậm rãi.",
    cultureNote: "Ở Hàn Quốc, lời chào lịch sự giúp cuộc nói chuyện đầu tiên dễ dàng hơn.",
    roleplaySituation: "Bạn chào nhân viên quán cà phê gần ga tàu điện ngầm.",
    feedback: ["Rất rõ ràng.", "Thử nói phần cuối chậm hơn một chút.", "Câu này có thể dùng ngay hôm nay."],
    reminders: ["Ba phút là đủ cho một câu.", "Quay lại luyện câu bạn thấy khó hôm qua."],
    comebackMessage: "Tiếp tục từ câu bạn đã luyện lần trước.",
    learningGuide: {
      focus: "Bắt đầu bằng câu dùng ngay trong đời sống, sau đó mới xem giải thích ngắn.",
      pronunciation: "Nghe phần cuối câu và phụ âm cuối trước, rồi lặp lại chậm.",
      grammarBridge: "Giải thích bằng tiếng Việt ngắn gọn, nhưng thứ tự luyện nói vẫn theo tiếng Hàn.",
      reviewHabit: "Ôn lại câu đã lưu trước khi đi làm, đi học hoặc ra ngoài.",
      offlineTip: "Ưu tiên gói âm thanh nhẹ để học khi mạng yếu hoặc dùng điện thoại cấu hình thấp."
    },
    preferredGoals: ["work", "life", "daily"],
    defaultDailyGoal: 10,
    notificationWindow: "19:30-21:30",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    currency: "VND",
    disabledFeatures: [],
    privacyNote: "Bản thử nghiệm chỉ xử lý ghi âm trên thiết bị.",
    translations: {
      start: "Bắt đầu",
      continue: "Tiếp tục",
      review: "Ôn tập",
      settings: "Cài đặt",
      lesson: "Bài học"
    }
  },
  {
    id: "mx-es",
    label: "Mexico / Spanish",
    nativeLabel: "Español",
    interfaceLanguage: "es",
    onboardingNote: "Primero habla una frase útil. La gramática aparece solo cuando ayuda.",
    cultureNote: "En Corea, una forma amable como “안녕하세요” abre muchas conversaciones cotidianas.",
    roleplaySituation: "Saludas con cortesía a una persona en una cafeteria cerca del metro.",
    feedback: ["Se entiende bien.", "Prueba el final un poco mas suave.", "Esa frase ya puedes usarla hoy."],
    reminders: ["Tres minutos alcanzan para una frase.", "Vuelve para comparar tu voz con el modelo."],
    comebackMessage: "Retoma desde la frase que practicaste antes.",
    learningGuide: {
      focus: "Habla una frase completa primero; la gramatica aparece solo para ayudarte a usarla.",
      pronunciation: "Escucha el cierre de la frase y repite el ritmo antes de mirar la romanizacion.",
      grammarBridge: "El coreano marca cortesia al final; no todo se resuelve con una sola palabra como please.",
      reviewHabit: "Guarda frases utiles y repitelas lento antes de usarlas a velocidad normal.",
      offlineTip: "Mantén listo el paquete ligero Day 1-14 para practicar sin depender de buena conexion."
    },
    preferredGoals: ["travel", "daily", "k-content"],
    defaultDailyGoal: 5,
    notificationWindow: "18:00-21:00",
    dateTimeFormat: "d MMM, HH:mm",
    currency: "MXN",
    disabledFeatures: [],
    privacyNote: "En este prototipo, tu voz no se envia al servidor.",
    translations: {
      start: "Empezar",
      continue: "Continuar",
      review: "Repasar",
      settings: "Ajustes",
      lesson: "Clase"
    }
  }
];

export const getCountryPack = (id: string | undefined) =>
  countryPacks.find((pack) => pack.id === id) ?? countryPacks[0];
