import type { CountryPackId } from "../types";

export const localized = (
  en: string,
  ja: string,
  zh: string,
  vi: string,
  es: string,
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

const en = (s: string) => localized(s, s, s, s, s, s, s, s, s, s);

export const uiCatalog = {
  // Nav
  "nav.home": localized("Home", "ホーム", "首页", "Trang chủ", "Inicio"),
  "nav.lesson": localized("Lesson", "レッスン", "课程", "Bài học", "Lección"),
  "nav.review": localized("Review", "復習", "复习", "Ôn tập", "Repaso"),
  "nav.settings": localized("Settings", "設定", "设置", "Cài đặt", "Configuración"),
  "nav.ariaLabel": localized("Main menu", "メインメニュー", "主菜单", "Menu chính", "Menú principal"),

  // Common
  "common.start": localized("Start", "開始", "开始", "Bắt đầu", "Comenzar"),
  "common.continue": localized("Continue", "続ける", "继续", "Tiếp tục", "Continuar"),
  "common.next": localized("Next", "次へ", "下一步", "Tiếp theo", "Siguiente"),
  "common.prev": localized("Back", "戻る", "返回", "Quay lại", "Atrás"),
  "common.close": localized("Close", "閉じる", "关闭", "Đóng", "Cerrar"),

  // Course selector
  "course.selector.button": localized(
    "Change course",
    "コースを変更",
    "更换课程",
    "Đổi khóa học",
    "Cambiar curso",
    "Ganti kursus",
    "ប្តូរវគ្គ",
    "သင်တန်းပြောင်းရန်",
    "เปลี่ยนคอร์ส",
    "Tukar kursus"
  ),
  "course.selector.title": localized(
    "Choose course",
    "コースを選択",
    "选择课程",
    "Chọn khóa học",
    "Elige curso",
    "Pilih kursus",
    "ជ្រើសវគ្គ",
    "သင်တန်းရွေးပါ",
    "เลือกคอร์ส",
    "Pilih kursus"
  ),
  "course.foundation.title": localized(
    "Korean First Talk",
    "韓国語ファーストトーク",
    "韩语第一句话",
    "Korean First Talk",
    "Korean First Talk",
    "Korean First Talk",
    "Korean First Talk",
    "Korean First Talk",
    "Korean First Talk",
    "Korean First Talk"
  ),
  "course.travel.title": localized(
    "Korean Travel",
    "旅行韓国語",
    "旅行韩语",
    "Tiếng Hàn du lịch",
    "Coreano para viajar",
    "Bahasa Korea perjalanan",
    "កូរ៉េសម្រាប់ធ្វើដំណើរ",
    "ခရီးသွားကိုရီးယားစာ",
    "ภาษาเกาหลีสำหรับท่องเที่ยว",
    "Korea untuk melancong"
  ),
  "course.kFood.title": localized(
    "K-Food Korean",
    "Kフード韓国語",
    "韩餐韩语",
    "Tiếng Hàn K-Food",
    "Coreano K-Food",
    "Bahasa Korea K-Food",
    "កូរ៉េ K-Food",
    "K-Food ကိုရီးယားစာ",
    "ภาษาเกาหลี K-Food",
    "Korea K-Food"
  ),
  "course.kCulture.title": localized(
    "K-Culture Korean",
    "Kカルチャー韓国語",
    "韩流文化韩语",
    "Tiếng Hàn K-Culture",
    "Coreano K-Culture",
    "Korea K-Culture",
    "កូរ៉េ K-Culture",
    "K-Culture ကိုရီးယားစာ",
    "เกาหลี K-Culture",
    "Korea K-Culture"
  ),
  "course.epsTopik.title": localized(
    "EPS-TOPIK Prep",
    "EPS-TOPIK対策",
    "EPS-TOPIK备考",
    "Luyện EPS-TOPIK",
    "Preparación EPS-TOPIK",
    "Persiapan EPS-TOPIK",
    "ត្រៀម EPS-TOPIK",
    "EPS-TOPIK ပြင်ဆင်မှု",
    "เตรียม EPS-TOPIK",
    "Persediaan EPS-TOPIK"
  ),
  "course.status.notStarted": localized(
    "Not started",
    "未開始",
    "未开始",
    "Chưa bắt đầu",
    "No iniciado",
    "Belum mulai",
    "មិនទាន់ចាប់ផ្តើម",
    "မစရသေးပါ",
    "ยังไม่เริ่ม",
    "Belum bermula"
  ),
  "course.status.inProgress": localized(
    "In progress",
    "進行中",
    "进行中",
    "Đang học",
    "En progreso",
    "Sedang berjalan",
    "កំពុងរៀន",
    "လေ့လာနေသည်",
    "กำลังเรียน",
    "Sedang berjalan"
  ),
  "course.status.completed": localized(
    "Completed",
    "完了",
    "已完成",
    "Đã hoàn thành",
    "Completado",
    "Selesai",
    "បានបញ្ចប់",
    "ပြီးဆုံးပါပြီ",
    "เสร็จแล้ว",
    "Selesai"
  ),
  "course.status.preparing": localized(
    "Preparing",
    "準備中",
    "准备中",
    "Đang chuẩn bị",
    "En preparación",
    "Sedang disiapkan",
    "កំពុងរៀបចំ",
    "ပြင်ဆင်နေသည်",
    "กำลังเตรียม",
    "Sedang disediakan"
  ),
  "course.action.start": localized("Start", "開始", "开始", "Bắt đầu", "Comenzar"),
  "course.action.resume": localized("Resume", "再開", "继续", "Tiếp tục", "Continuar"),
  "course.action.switch": localized("Switch", "切替", "切换", "Chuyển", "Cambiar"),

  // K-Culture route setup
  "culture.setup.kicker": localized("Original K-Culture route", "オリジナルKカルチャールート", "原创韩流文化路线", "Lộ trình K-Culture gốc", "Ruta K-Culture original"),
  "culture.setup.title": localized("Choose your K-Culture route", "Kカルチャールートを選ぶ", "选择你的韩流文化路线", "Chọn lộ trình K-Culture", "Elige tu ruta K-Culture"),
  "culture.setup.notice": localized(
    "K-Speak original learning scenes only. No real lyrics, drama dialogue, celebrities, characters, logos, or voices are used.",
    "K-Speak独自の学習場面のみです。実在の歌詞、ドラマ台詞、有名人、キャラクター、ロゴ、声は使いません。",
    "仅使用 K-Speak 原创学习场景。不使用真实歌词、剧集台词、名人、角色、标志或声音。",
    "Chỉ dùng cảnh học tập gốc của K-Speak. Không dùng lời bài hát, thoại phim, người nổi tiếng, nhân vật, logo hoặc giọng thật.",
    "Solo escenas de aprendizaje originales de K-Speak. No se usan letras, diálogos, celebridades, personajes, logos ni voces reales."
  ),
  "culture.setup.primaryLabel": localized("Primary pack", "メインパック", "主学习包", "Gói chính", "Paquete principal"),
  "culture.setup.samplerLabel": localized("Sampler pack", "お試しパック", "体验包", "Gói thử", "Paquete de muestra"),
  "culture.setup.validation": localized(
    "Choose two different packs.",
    "異なる2つのパックを選んでください。",
    "请选择两个不同的学习包。",
    "Chọn hai gói khác nhau.",
    "Elige dos paquetes diferentes."
  ),
  "culture.setup.locked": localized(
    "This route is locked because a pack lesson has already started.",
    "パックレッスンを開始済みのため、このルートは固定されています。",
    "因为已经开始了学习包课程，此路线已锁定。",
    "Lộ trình này đã khóa vì bạn đã bắt đầu một bài trong gói.",
    "Esta ruta está bloqueada porque ya empezaste una lección del paquete."
  ),
  "culture.setup.createRoute": localized("Create my route", "ルートを作成", "创建我的路线", "Tạo lộ trình của tôi", "Crear mi ruta"),
  "culture.setup.changeRoute": localized("Change route", "ルートを変更", "更改路线", "Đổi lộ trình", "Cambiar ruta"),
  "culture.pack.kPop": localized("K-Pop", "K-Pop", "K-Pop", "K-Pop", "K-Pop"),
  "culture.pack.kDrama": localized("K-Drama", "Kドラマ", "韩剧", "K-Drama", "K-Drama"),
  "culture.pack.kBeauty": localized("K-Beauty", "Kビューティー", "韩妆", "K-Beauty", "K-Beauty"),
  "culture.pack.kWebtoon": localized("K-Webtoon", "Kウェブトゥーン", "韩漫", "K-Webtoon", "K-Webtoon"),
  "culture.pack.kBeauty.description": localized(
    "Beauty words for color, label order, caution checks, and neutral personal impressions.",
    "色、ラベルの順序、注意事項、自然な感想を学ぶ美容表現です。",
    "学习颜色、标签顺序、注意事项和中立个人感受的美妆韩语。",
    "Từ vựng làm đẹp cho màu sắc, thứ tự nhãn, lưu ý và cảm nhận cá nhân trung lập.",
    "Vocabulario de belleza para color, orden de etiqueta, precauciones e impresiones personales neutrales."
  ),
  "culture.pack.kWebtoon.description": localized(
    "Original story scenes for sequence, emotion, relationships, context, and polite everyday speech.",
    "順序、感情、人間関係、文脈、丁寧な日常表現を学ぶ独自ストーリー場面です。",
    "原创故事场景，用于学习顺序、情绪、人物关系、语境和礼貌日常表达。",
    "Cảnh truyện gốc để học thứ tự, cảm xúc, quan hệ, ngữ cảnh và lời nói lịch sự hằng ngày.",
    "Escenas originales para aprender secuencia, emoción, relaciones, contexto y habla cotidiana cortés."
  ),
  "culture.pack.medicalDisclaimer": localized(
    "K-Beauty lessons are language practice, not medical or product advice.",
    "Kビューティーレッスンは語学練習であり、医療や商品アドバイスではありません。",
    "K-Beauty 课程是语言练习，不是医疗或产品建议。",
    "Bài K-Beauty là luyện ngôn ngữ, không phải tư vấn y tế hay sản phẩm.",
    "Las lecciones K-Beauty son práctica de idioma, no consejo médico ni de producto."
  ),
  "culture.pack.webtoonNotice": localized(
    "K-Webtoon lessons use only K-Speak fictional scenes.",
    "KウェブトゥーンレッスンはK-Speakの架空場面のみを使います。",
    "K-Webtoon 课程仅使用 K-Speak 虚构场景。",
    "Bài K-Webtoon chỉ dùng cảnh hư cấu của K-Speak.",
    "Las lecciones K-Webtoon usan solo escenas ficticias de K-Speak."
  ),
  "culture.route.summaryAriaLabel": localized("K-Culture route summary", "Kカルチャールート概要", "韩流文化路线摘要", "Tóm tắt lộ trình K-Culture", "Resumen de ruta K-Culture"),
  "culture.route.position": localized("Route position", "ルート位置", "路线位置", "Vị trí lộ trình", "Posición de ruta"),
  "culture.route.notCreated": localized("Not created yet", "未作成", "尚未创建", "Chưa tạo", "Aún no creada"),
  "culture.route.completionLabel": localized("Completion", "完了条件", "完成条件", "Hoàn thành", "Finalización"),
  "culture.route.firstComplete": localized(
    "First 14-day route completed",
    "最初の14日ルート完了",
    "首个14天路线已完成",
    "Đã hoàn thành lộ trình 14 ngày đầu tiên",
    "Primera ruta de 14 días completada"
  ),

  // Travel mission
  "travel.mission.title": localized(
    "Travel mission",
    "旅行ミッション",
    "旅行任务",
    "Nhiệm vụ du lịch",
    "Misión de viaje",
    "Misi perjalanan",
    "បេសកកម្មធ្វើដំណើរ",
    "ခရီးသွားမစ်ရှင်",
    "ภารกิจท่องเที่ยว",
    "Misi perjalanan"
  ),
  "travel.mission.firstSentence": localized(
    "First sentence",
    "最初の一文",
    "第一句话",
    "Câu đầu tiên",
    "Primera frase",
    "Kalimat pertama",
    "ប្រយោគដំបូង",
    "ပထမစာကြောင်း",
    "ประโยคแรก",
    "Ayat pertama"
  ),
  "travel.mission.shortResponse": localized(
    "Short response",
    "短い返答",
    "简短回答",
    "Câu trả lời ngắn",
    "Respuesta corta",
    "Jawaban singkat",
    "ចម្លើយខ្លី",
    "အဖြေတို",
    "คำตอบสั้น",
    "Jawapan ringkas"
  ),
  "travel.mission.rescueExpression": localized(
    "Rescue expression",
    "助け舟の表現",
    "应急表达",
    "Câu cứu trợ",
    "Frase de ayuda",
    "Ungkapan bantuan",
    "ឃ្លាជំនួយ",
    "အကူအညီစကားစု",
    "ประโยคช่วยเหลือ",
    "Ungkapan bantuan"
  ),
  "travel.mission.success": localized(
    "You did it",
    "できました",
    "你做到了",
    "Bạn làm được rồi",
    "Lo lograste",
    "Berhasil",
    "អ្នកធ្វើបានហើយ",
    "သင်လုပ်နိုင်ခဲ့ပြီ",
    "คุณทำได้แล้ว",
    "Anda berjaya"
  ),
  "travel.mission.practiceMore": localized(
    "Practice more",
    "もう少し練習",
    "继续练习",
    "Luyện thêm",
    "Practica más",
    "Latihan lagi",
    "ហាត់បន្ថែម",
    "ထပ်လေ့ကျင့်ပါ",
    "ฝึกเพิ่ม",
    "Berlatih lagi"
  ),

  // K-Food mission
  "kFood.mission.title": localized(
    "K-Food mission",
    "Kフードミッション",
    "韩餐任务",
    "Nhiệm vụ K-Food",
    "Misión K-Food",
    "Misi K-Food",
    "បេសកកម្ម K-Food",
    "K-Food မစ်ရှင်",
    "ภารกิจ K-Food",
    "Misi K-Food"
  ),
  "kFood.mission.chooseFood": localized(
    "Choose food safely",
    "安全に料理を選ぶ",
    "安全选择食物",
    "Chọn món an toàn",
    "Elegir comida con seguridad",
    "Pilih makanan dengan aman",
    "ជ្រើសអាហារឱ្យមានសុវត្ថិភាព",
    "အစားအစာကို လုံခြုံစွာရွေးပါ",
    "เลือกอาหารอย่างปลอดภัย",
    "Pilih makanan dengan selamat"
  ),
  "kFood.mission.shortOrder": localized(
    "Complete a short order",
    "短い注文を完了する",
    "完成简短点餐",
    "Hoàn thành một lượt gọi món ngắn",
    "Completar un pedido corto",
    "Selesaikan pesanan singkat",
    "បញ្ចប់ការកម្មង់ខ្លី",
    "မှာယူမှုတိုတစ်ခု ပြီးအောင်လုပ်ပါ",
    "สั่งอาหารสั้น ๆ ให้สำเร็จ",
    "Lengkapkan pesanan ringkas"
  ),
  "kFood.mission.resolveProblem": localized(
    "Resolve one problem",
    "問題を一つ解決する",
    "解决一个问题",
    "Xử lý một vấn đề",
    "Resolver un problema",
    "Selesaikan satu masalah",
    "ដោះស្រាយបញ្ហាមួយ",
    "ပြဿနာတစ်ခု ဖြေရှင်းပါ",
    "แก้ปัญหาหนึ่งอย่าง",
    "Selesaikan satu masalah"
  ),
  "kFood.mission.success": localized(
    "You did it",
    "できました",
    "你做到了",
    "Bạn làm được rồi",
    "Lo lograste",
    "Berhasil",
    "អ្នកធ្វើបានហើយ",
    "သင်လုပ်နိုင်ခဲ့ပြီ",
    "คุณทำได้แล้ว",
    "Anda berjaya"
  ),
  "kFood.mission.practiceMore": localized(
    "Practice more",
    "もう少し練習",
    "继续练习",
    "Luyện thêm",
    "Practica más",
    "Latihan lagi",
    "ហាត់បន្ថែម",
    "ထပ်လေ့ကျင့်ပါ",
    "ฝึกเพิ่ม",
    "Berlatih lagi"
  ),

  // Loading state
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

  // Lesson summary
  "lesson.summary.body": localized(
    "Today you practiced the expression \"{phrase}\". Sentences you save will come back for you to say again in review.",
    "今日は「{phrase}」という表現を練習しました。保存した文は復習でもう一度話す機会があります。",
    "今天练习了\"{phrase}\"这个表达。保存的句子会在复习中再次出现，让你重新说一遍。",
    "Hôm nay bạn đã luyện câu \"{phrase}\". Những câu bạn lưu lại sẽ xuất hiện trong phần ôn tập để bạn nói lại.",
    "Hoy practicaste la expresión \"{phrase}\". Las frases que guardes volverán a aparecer en el repaso para que las digas de nuevo."
  ),

  // Level labels
  "level.first-time": localized(
    "I'm starting from zero",
    "ゼロから始めます",
    "从零开始",
    "Tôi bắt đầu từ đầu",
    "Empiezo desde cero"
  ),
  "level.beginner": localized(
    "I know a few basics",
    "基本を少し知っています",
    "我了解一些基础",
    "Tôi biết một chút cơ bản",
    "Conozco lo básico"
  ),
  "level.returning": localized(
    "I'm picking it back up",
    "もう一度学び直します",
    "重新开始学习",
    "Tôi học lại từ đầu",
    "Lo retomo de nuevo"
  ),
  "level.daily": localized(
    "I want more everyday expressions",
    "日常表現をもっと学びたい",
    "我想学更多日常用语",
    "Tôi muốn học thêm từ hàng ngày",
    "Quiero más expresiones cotidianas"
  ),

  // Goal labels
  "goal.travel": localized("Travel", "旅行", "旅行", "Du lịch", "Viaje"),
  "goal.daily": localized("Daily conversation", "日常会話", "日常对话", "Hội thoại hàng ngày", "Conversación diaria"),
  "goal.study": localized("Study abroad", "留学", "留学", "Du học", "Estudiar en el extranjero"),
  "goal.work": localized("Work", "仕事", "工作", "Công việc", "Trabajo"),
  "goal.life": localized("Life in Korea", "韓国での生活", "在韩国生活", "Sống ở Hàn Quốc", "Vida en Corea"),
  "goal.k-content": localized("K-content", "Kコンテンツ", "韩流内容", "Nội dung Hàn Quốc", "Contenido coreano"),

  // Time labels
  "time.now": localized("Now", "今すぐ", "现在", "Ngay bây giờ", "Ahora"),
  "time.hoursLater": localized("{hours}h from now", "{hours}時間後", "{hours}小时后", "{hours}g nữa", "En {hours}h"),
  "time.daysLater": localized("{days}d from now", "{days}日後", "{days}天后", "{days}ngày nữa", "En {days}d"),

  // Kind / source labels
  "kind.listen": localized("Listen", "聴く", "听", "Nghe", "Escuchar"),
  "kind.speak": localized("Speak", "話す", "说", "Nói", "Hablar"),
  "kind.roleplay": localized("Roleplay", "ロールプレイ", "角色扮演", "Nhập vai", "Juego de roles"),
  "kind.core": localized("Core", "コア表現", "核心表达", "Câu chính", "Expresión principal"),
  "kind.response": localized("Response", "返答", "回答", "Phản hồi", "Respuesta"),
  "kind.rescue": localized("Rescue", "助け舟", "应急用语", "Câu cứu", "Frase de rescate"),
  "kind.swap": localized("Variation", "バリエーション", "变式练习", "Biến thể", "Variación"),
  "kind.continuation": localized("Next course", "次のコース", "下一课程", "Khóa tiếp theo", "Siguiente curso"),
  "kind.review": localized("Review", "復習", "复习", "Ôn tập", "Repaso"),

  // Error messages
  "error.sync": localized(
    "An error occurred while syncing with Supabase.",
    "Supabaseとの同期中にエラーが発生しました。",
    "与Supabase同步时出现错误。",
    "Đã xảy ra lỗi khi đồng bộ với Supabase.",
    "Ocurrió un error al sincronizar con Supabase."
  ),
  "error.auth": localized(
    "An error occurred while processing Supabase auth state.",
    "Supabase認証の処理中にエラーが発生しました。",
    "处理Supabase身份验证时出现错误。",
    "Đã xảy ra lỗi khi xử lý xác thực Supabase.",
    "Ocurrió un error al procesar la autenticación de Supabase."
  ),
  "error.invalidEmail": localized(
    "Please check your email address.",
    "メールアドレスをご確認ください。",
    "请检查您的电子邮件地址。",
    "Vui lòng kiểm tra địa chỉ email của bạn.",
    "Por favor revisa tu dirección de correo electrónico."
  ),
  "error.loginFailed": localized(
    "Failed to send login link.",
    "ログインリンクの送信に失敗しました。",
    "发送登录链接失败。",
    "Gửi liên kết đăng nhập thất bại.",
    "Error al enviar el enlace de inicio de sesión."
  ),
  "error.logoutFailed": localized(
    "An error occurred while logging out.",
    "ログアウト中にエラーが発生しました。",
    "退出登录时出现错误。",
    "Đã xảy ra lỗi khi đăng xuất.",
    "Ocurrió un error al cerrar sesión."
  ),
  "error.syncFailed": localized(
    "An error occurred while syncing.",
    "同期中にエラーが発生しました。",
    "同步时出现错误。",
    "Đã xảy ra lỗi khi đồng bộ.",
    "Ocurrió un error al sincronizar."
  ),

  // Onboarding
  "onboarding.title": localized("Setup", "設定", "设置", "Thiết lập", "Configuración"),
  "onboarding.step0.title": localized(
    "Which language should we guide you in?",
    "どの言語でガイドしますか？",
    "您希望以哪种语言指导？",
    "Bạn muốn được hướng dẫn bằng ngôn ngữ nào?",
    "¿En qué idioma quieres que te guiemos?"
  ),
  "onboarding.step0.kicker": localized(
    "No login required",
    "ログイン不要",
    "无需登录",
    "Không cần đăng nhập",
    "Sin necesidad de registro"
  ),
  "onboarding.step1.title": localized(
    "What is your current Korean level?",
    "現在の韓国語レベルは？",
    "您目前的韩语水平如何？",
    "Trình độ tiếng Hàn hiện tại của bạn là gì?",
    "¿Cuál es tu nivel actual de coreano?"
  ),
  "onboarding.step2.title": localized(
    "What Korean do you need most?",
    "どんな韓国語が最も必要ですか？",
    "您最需要哪种韩语？",
    "Bạn cần tiếng Hàn cho mục đích gì nhất?",
    "¿Qué tipo de coreano necesitas más?"
  ),
  "onboarding.step3.title": localized(
    "How many minutes a day works for you?",
    "1日何分学習できますか？",
    "您每天能学习多少分钟？",
    "Bạn có thể học bao nhiêu phút mỗi ngày?",
    "¿Cuántos minutos al día puedes dedicar?"
  ),
  "onboarding.minuteUnit": localized("min", "分", "分钟", "phút", "min"),
  "onboarding.step4.title": localized(
    "Choose a Korean tutor to practice with",
    "練習する韓国語チューターを選んでください",
    "选择一位韩语教师进行练习",
    "Chọn gia sư tiếng Hàn để luyện tập",
    "Elige un tutor de coreano para practicar"
  ),
  "onboarding.step5.title": localized(
    "Confirm your settings",
    "設定を確認してください",
    "确认您的设置",
    "Xác nhận cài đặt của bạn",
    "Confirma tu configuración"
  ),
  "onboarding.field.country": localized("Country pack", "国別パック", "国家包", "Gói quốc gia", "Paquete de país"),
  "onboarding.field.goal": localized("Goal", "目標", "目标", "Mục tiêu", "Objetivo"),
  "onboarding.field.dailyGoal": localized("Daily target", "1日の目標", "每日目标", "Mục tiêu hàng ngày", "Meta diaria"),
  "onboarding.field.tutor": localized("Tutor", "チューター", "教师", "Gia sư", "Tutor"),
  "onboarding.field.reminderTime": localized(
    "First reminder time",
    "最初のリマインダー時間",
    "第一次提醒时间",
    "Thời gian nhắc nhở đầu tiên",
    "Hora del primer recordatorio"
  ),
  "onboarding.cta": localized(
    "Start Day 1 now",
    "Day 1を今すぐ始める",
    "现在开始第1天",
    "Bắt đầu Ngày 1 ngay",
    "Empezar el Día 1 ahora"
  ),

  // Home screen
  "home.hero.title": localized(
    "Start with one sentence today.",
    "今日は一文から始めましょう。",
    "今天从一句话开始。",
    "Hôm nay bắt đầu với một câu.",
    "Empieza con una frase hoy."
  ),
  "home.hero.loggedIn": localized(
    "Saving to {email} account",
    "{email}アカウントに保存中",
    "正在保存到{email}账户",
    "Đang lưu vào tài khoản {email}",
    "Guardando en la cuenta {email}"
  ),
  "home.hero.anonymous": localized(
    "Your progress is saved on this device even before you log in.",
    "ログイン前でも進捗はこのデバイスに保存されます。",
    "即使未登录，您的进度也会保存在此设备上。",
    "Tiến độ của bạn được lưu trên thiết bị này ngay cả trước khi đăng nhập.",
    "Tu progreso se guarda en este dispositivo incluso antes de iniciar sesión."
  ),
  "home.metric.todayLesson": localized("Today's lesson", "今日のレッスン", "今天的课程", "Bài học hôm nay", "Lección de hoy"),
  "home.metric.reviewCount": localized("Review items", "復習項目", "复习项目", "Mục ôn tập", "Elementos de repaso"),
  "home.metric.savedCount": localized("Saved phrases", "保存したフレーズ", "已保存的短语", "Cụm từ đã lưu", "Frases guardadas"),
  "home.metric.tutor": localized("Tutor", "チューター", "教师", "Gia sư", "Tutor"),
  "home.panel.lessonCompleted": localized(
    "Up next: a quick review",
    "次へ：クイック復習",
    "接下来：快速复习",
    "Tiếp theo: ôn tập nhanh",
    "A continuación: repaso rápido"
  ),
  "home.panel.lessonInProgress": localized(
    "Continue your lesson",
    "レッスンを続ける",
    "继续您的课程",
    "Tiếp tục bài học",
    "Continúa tu lección"
  ),
  "home.lesson.meta": localized(
    "{percent}% done · {dailyGoal} min goal",
    "{percent}%完了・目標{dailyGoal}分",
    "{percent}%完成·目标{dailyGoal}分钟",
    "{percent}% xong · mục tiêu {dailyGoal} phút",
    "{percent}% hecho · meta {dailyGoal} min"
  ),
  "home.lesson.resume": localized("Resume", "再開", "继续", "Tiếp tục", "Reanudar"),
  "home.lesson.progressAriaLabel": localized(
    "Day {day} progress {percent}%",
    "Day {day}の進捗{percent}%",
    "第{day}天进度{percent}%",
    "Ngày {day} tiến độ {percent}%",
    "Día {day} progreso {percent}%"
  ),
  "home.review.cta": localized(
    "Check today's review items",
    "今日の復習項目を確認",
    "查看今天的复习项目",
    "Xem các mục ôn tập hôm nay",
    "Ver los elementos de repaso de hoy"
  ),
  "home.review.emptyTitle": localized(
    "No review items yet",
    "復習項目はまだありません",
    "暂无复习项目",
    "Chưa có mục ôn tập",
    "Aún no hay elementos de repaso"
  ),
  "home.review.emptyBody": localized(
    "After finishing a lesson, review items are created based on expressions you found difficult.",
    "レッスンを終えると、難しかった表現に基づいて復習項目が作成されます。",
    "完成课程后，将根据您觉得困难的表达创建复习项目。",
    "Sau khi hoàn thành bài học, các mục ôn tập sẽ được tạo dựa trên những cụm từ bạn thấy khó.",
    "Al terminar una lección, se crean elementos de repaso basados en las expresiones que te resultaron difíciles."
  ),
  "home.login.cta": localized(
    "Log in to restore your progress across devices",
    "ログインして複数デバイス間で進捗を同期",
    "登录以在多设备间同步进度",
    "Đăng nhập để đồng bộ tiến độ trên nhiều thiết bị",
    "Inicia sesión para sincronizar tu progreso en todos los dispositivos"
  ),

  // Continuation path panel
  "continuation.panelCompleted": localized(
    "Day 15+ Program",
    "Day 15以降のプログラム",
    "第15天以上计划",
    "Chương trình từ Ngày 15",
    "Programa Día 15+"
  ),
  "continuation.panelInProgress": localized(
    "What comes after Day 14",
    "Day 14の後は",
    "第14天后的内容",
    "Sau Ngày 14 là gì",
    "Qué viene después del Día 14"
  ),
  "continuation.progress": localized(
    "{count}/14 complete",
    "{count}/14完了",
    "{count}/14完成",
    "{count}/14 hoàn thành",
    "{count}/14 completo"
  ),
  "continuation.listen": localized("Listen", "聴く", "听", "Nghe", "Escuchar"),
  "continuation.slow": localized("Slow", "ゆっくり", "慢速", "Chậm", "Lento"),
  "continuation.save": localized("Save", "保存", "保存", "Lưu", "Guardar"),
  "continuation.saved": localized("Saved", "保存済み", "已保存", "Đã lưu", "Guardado"),
  "continuation.listenAriaLabel": localized(
    "Listen to {phrase}",
    "{phrase}を聴く",
    "听{phrase}",
    "Nghe {phrase}",
    "Escuchar {phrase}"
  ),
  "continuation.slowAriaLabel": localized(
    "Listen slowly to {phrase}",
    "{phrase}をゆっくり聴く",
    "慢速听{phrase}",
    "Nghe chậm {phrase}",
    "Escuchar lentamente {phrase}"
  ),
  "continuation.saveAriaLabel": localized(
    "Save {phrase}",
    "{phrase}を保存",
    "保存{phrase}",
    "Lưu {phrase}",
    "Guardar {phrase}"
  ),

  // Audio readiness panel
  "audio.readinessTitle": localized(
    "Offline audio pack status",
    "オフライン音声パックの状態",
    "离线音频包状态",
    "Trạng thái gói âm thanh ngoại tuyến",
    "Estado del paquete de audio sin conexión"
  ),
  "audio.slots": localized("Audio slots", "音声スロット", "音频槽", "Khe âm thanh", "Slots de audio"),
  "audio.staticFiles": localized(
    "Static files linked",
    "静的ファイルがリンク済み",
    "静态文件已链接",
    "Tệp tĩnh đã được liên kết",
    "Archivos estáticos vinculados"
  ),
  "audio.fallback": localized(
    "Browser fallback",
    "ブラウザフォールバック",
    "浏览器回退",
    "Dự phòng trình duyệt",
    "Alternativa del navegador"
  ),
  "audio.readinessBody": localized(
    "Day 1–30 phrases are locked in at natural and slow speeds. Until free static audio is linked, Korean browser speech synthesis keeps lessons running.",
    "Day 1〜30のフレーズは自然速度・遅い速度で確定済みです。無料の静的音声がリンクされるまで、ブラウザの韓国語音声合成でレッスンを継続します。",
    "第1-30天的短语已在自然和慢速下确定。在免费静态音频链接之前，浏览器韩语语音合成将保持课程运行。",
    "Các câu từ Ngày 1-30 đã được cố định ở tốc độ tự nhiên và chậm. Cho đến khi âm thanh tĩnh miễn phí được liên kết, tổng hợp giọng nói tiếng Hàn của trình duyệt sẽ duy trì các bài học.",
    "Las frases del Día 1-30 están fijadas a velocidades natural y lenta. Hasta que se vincule el audio estático gratuito, la síntesis de voz coreana del navegador mantiene las lecciones en marcha."
  ),
  "audio.naturalSpeed": localized("Natural speed", "自然速度", "自然速度", "Tốc độ tự nhiên", "Velocidad natural"),
  "audio.slowSpeed": localized("Slow speed", "ゆっくり速度", "慢速", "Tốc độ chậm", "Velocidad lenta"),
  "audio.waveformAriaLabel": localized(
    "Playback progress",
    "再生の進捗",
    "播放进度",
    "Tiến độ phát",
    "Progreso de reproducción"
  ),
  "audio.ttsNote": localized(
    "When no free static audio is available, browser TTS is used.",
    "無料の静的音声がない場合、ブラウザのTTSが使用されます。",
    "当没有免费静态音频时，将使用浏览器TTS。",
    "Khi không có âm thanh tĩnh miễn phí, TTS của trình duyệt sẽ được sử dụng.",
    "Cuando no hay audio estático gratuito disponible, se usa el TTS del navegador."
  ),

  // Learning guide panel
  "guide.panelTitle": localized(
    "{nativeLabel} learning tips",
    "{nativeLabel}学習のコツ",
    "{nativeLabel}学习技巧",
    "Mẹo học {nativeLabel}",
    "Consejos para aprender {nativeLabel}"
  ),
  "guide.focus": localized("Focus", "集中ポイント", "学习重点", "Trọng tâm", "Enfoque"),
  "guide.pronunciation": localized("Pronunciation", "発音", "发音", "Phát âm", "Pronunciación"),
  "guide.structure": localized("Structure", "文型", "句型结构", "Cấu trúc", "Estructura"),
  "guide.review": localized("Review habit", "復習習慣", "复习习惯", "Thói quen ôn tập", "Hábito de repaso"),
  "guide.offline": localized("Offline", "オフライン", "离线", "Ngoại tuyến", "Sin conexión"),

  // Lesson screen
  "lesson.tutorKicker": localized("Tutor {name}", "チューター {name}", "教师 {name}", "Gia sư {name}", "Tutor {name}"),
  "lesson.phrase.saved": localized("Phrase saved", "フレーズを保存しました", "短语已保存", "Đã lưu cụm từ", "Frase guardada"),
  "lesson.phrase.save": localized("Save phrase", "フレーズを保存", "保存短语", "Lưu cụm từ", "Guardar frase"),
  "lesson.hint.show": localized("Show hint", "ヒントを表示", "显示提示", "Hiện gợi ý", "Mostrar pista"),
  "lesson.pause": localized("Continue later", "あとで続ける", "稍后继续", "Tiếp tục sau", "Continuar después"),
  "lesson.complete": localized(
    "Done — schedule review",
    "完了 — 復習を予約",
    "完成 — 安排复习",
    "Xong — lên lịch ôn tập",
    "Listo — programar repaso"
  ),
  "lesson.quiz.skip": localized(
    "Skip — I'm not sure",
    "スキップ — わかりません",
    "跳过 — 我不确定",
    "Bỏ qua — tôi không chắc",
    "Omitir — no estoy seguro"
  ),
  "lesson.ttsNote": localized(
    "When no free static audio is available, browser TTS is used.",
    "無料の静的音声がない場合、ブラウザのTTSが使用されます。",
    "当没有免费静态音频时，将使用浏览器TTS。",
    "Khi không có âm thanh tĩnh miễn phí, TTS của trình duyệt sẽ được sử dụng.",
    "Cuando no hay audio estático gratuito disponible, se usa el TTS del navegador."
  ),
  "lesson.continue": localized("Continue", "続ける", "继续", "Tiếp tục", "Continuar"),

  // Roleplay display labels
  "roleplay.partner": localized("Partner", "パートナー", "对话伙伴", "Đối tác", "Compañero"),
  "roleplay.myAnswer": localized("My answer", "私の答え", "我的回答", "Câu trả lời của tôi", "Mi respuesta"),
  "roleplay.rescue": localized("Rescue", "助け舟", "应急用语", "Câu cứu", "Frase de rescate"),

  // Recorder
  "recorder.stop": localized("Stop recording", "録音停止", "停止录音", "Dừng ghi âm", "Detener grabación"),
  "recorder.start": localized("Record my voice", "声を録音する", "录制我的声音", "Ghi âm giọng tôi", "Grabar mi voz"),
  "recorder.retry": localized("Record again", "もう一度録音", "重新录音", "Ghi âm lại", "Grabar de nuevo"),
  "recorder.denied.title": localized(
    "Microphone access denied",
    "マイクへのアクセスが拒否されました",
    "麦克风访问被拒绝",
    "Quyền truy cập micrô bị từ chối",
    "Acceso al micrófono denegado"
  ),
  "recorder.denied.body": localized(
    "Allow microphone access in your browser's address bar settings, or skip this recording step to continue.",
    "ブラウザのアドレスバー設定でマイクへのアクセスを許可するか、この録音ステップをスキップして続けてください。",
    "在浏览器地址栏设置中允许麦克风访问，或跳过此录音步骤继续。",
    "Cho phép quyền truy cập micrô trong cài đặt thanh địa chỉ trình duyệt, hoặc bỏ qua bước ghi âm này để tiếp tục.",
    "Permite el acceso al micrófono en la configuración de la barra de direcciones del navegador, o salta este paso de grabación para continuar."
  ),
  "recorder.unsupported.title": localized(
    "Recording not available",
    "録音が利用できません",
    "录音不可用",
    "Không thể ghi âm",
    "Grabación no disponible"
  ),
  "recorder.unsupported.body": localized(
    "Your browser does not support recording. You can still complete the lesson.",
    "お使いのブラウザは録音をサポートしていません。引き続きレッスンを完了できます。",
    "您的浏览器不支持录音。您仍然可以完成课程。",
    "Trình duyệt của bạn không hỗ trợ ghi âm. Bạn vẫn có thể hoàn thành bài học.",
    "Tu navegador no admite la grabación. Aún puedes completar la lección."
  ),
  "recorder.recognized": localized("You said:", "認識結果：", "识别结果：", "Bạn nói:", "Dijiste:"),
  "recorder.privacy": localized(
    "Speech recognition starts only after you tap record. Your browser or device speech service may process audio for transcription.",
    "音声認識は録音ボタンを押した後にだけ始まります。文字起こしのためにブラウザや端末の音声サービスが音声を処理する場合があります。",
    "语音识别只会在你点按录音后开始。为了转写，浏览器或设备的语音服务可能会处理音频。",
    "Nhận diện giọng nói chỉ bắt đầu sau khi bạn chạm ghi âm. Dịch vụ giọng nói của trình duyệt hoặc thiết bị có thể xử lý âm thanh để chép lại.",
    "El reconocimiento de voz solo comienza después de tocar grabar. El navegador o el servicio de voz del dispositivo pueden procesar el audio para transcribirlo."
  ),
  "recorder.practiceNote": localized(
    "Use this transcript as a rough practice hint, not as an exact pronunciation score.",
    "この文字起こしは大まかな練習のヒントです。正確な発音点数ではありません。",
    "把这段转写当作大致的练习提示，不要当作精确的发音分数。",
    "Hãy xem bản chép lại này như gợi ý luyện tập gần đúng, không phải điểm phát âm chính xác.",
    "Usa esta transcripción como una pista aproximada de práctica, no como una puntuación exacta de pronunciación."
  ),
  "recorder.recognitionUnsupported": localized(
    "Speech recognition is not available in this browser, so only recording playback is provided.",
    "このブラウザでは音声認識が使えないため、録音の再生だけ利用できます。",
    "此浏览器不提供语音识别，因此这里只能回放录音。",
    "Trình duyệt này không có nhận diện giọng nói, vì vậy chỉ có phát lại bản ghi âm.",
    "El reconocimiento de voz no está disponible en este navegador, así que solo se ofrece la reproducción de la grabación."
  ),
  "recorder.recognitionDenied": localized(
    "Speech recognition permission was blocked. You can keep practicing with recording playback.",
    "音声認識の許可がブロックされました。録音の再生だけでも練習を続けられます。",
    "语音识别权限被阻止了。你仍然可以用录音回放继续练习。",
    "Quyền nhận diện giọng nói đã bị chặn. Bạn vẫn có thể tiếp tục luyện tập bằng cách nghe lại bản ghi âm.",
    "Se bloqueó el permiso del reconocimiento de voz. Puedes seguir practicando con la reproducción de la grabación."
  ),
  "recorder.recognitionFailed": localized(
    "Speech recognition could not finish this attempt. Try again if you want another practice hint.",
    "今回の音声認識は最後まで完了できませんでした。もう一度ヒントが欲しければ再試行してください。",
    "这次语音识别没有顺利完成。如果还想看练习提示，请再试一次。",
    "Nhận diện giọng nói không thể hoàn tất lần này. Hãy thử lại nếu bạn muốn thêm gợi ý luyện tập.",
    "El reconocimiento de voz no pudo completar este intento. Vuelve a intentarlo si quieres otra pista de práctica."
  ),

  // Review screen
  "review.empty.title": localized(
    "No review items yet",
    "復習項目はまだありません",
    "暂无复习项目",
    "Chưa có mục ôn tập",
    "Aún no hay elementos de repaso"
  ),
  "review.empty.body": localized(
    "After finishing your first lesson, review items are created based on wrong answers, hints, and repeated recordings.",
    "最初のレッスンを終えると、間違った答え・ヒント・繰り返し録音に基づいて復習項目が作成されます。",
    "完成第一节课后，将根据错误答案、提示和重复录音创建复习项目。",
    "Sau khi hoàn thành bài học đầu tiên, các mục ôn tập sẽ được tạo dựa trên câu trả lời sai, gợi ý và bản ghi âm lặp lại.",
    "Al terminar tu primera lección, se crean elementos de repaso basados en respuestas incorrectas, pistas y grabaciones repetidas."
  ),
  "review.empty.cta": localized("Study Day 1", "Day 1を学ぶ", "学习第1天", "Học Ngày 1", "Estudiar el Día 1"),
  "review.done.title": localized(
    "Today's review is complete",
    "今日の復習が完了しました",
    "今天的复习已完成",
    "Ôn tập hôm nay đã hoàn thành",
    "El repaso de hoy está completo"
  ),
  "review.done.body": localized(
    "You'll get a short check at your next review time.",
    "次の復習時間に短い確認があります。",
    "在下次复习时间将进行简短检查。",
    "Bạn sẽ có một bài kiểm tra ngắn vào thời điểm ôn tập tiếp theo.",
    "Tendrás una revisión rápida en tu próxima sesión de repaso."
  ),
  "review.done.cta": localized(
    "Go to next lesson",
    "次のレッスンへ",
    "前往下一课",
    "Đến bài học tiếp theo",
    "Ir a la siguiente lección"
  ),
  "review.progressTitle": localized("3-minute review", "3分間の復習", "3分钟复习", "Ôn tập 3 phút", "Repaso de 3 minutos"),
  "review.priorityAriaLabel": localized(
    "Review priority {priority}",
    "復習優先度 {priority}",
    "复习优先级 {priority}",
    "Mức ưu tiên ôn tập {priority}",
    "Prioridad de repaso {priority}"
  ),
  "review.note.hard": localized(
    "You marked this as difficult in your last review.",
    "前回の復習でこれを難しいとマークしました。",
    "您在上次复习中将此标记为困难。",
    "Bạn đã đánh dấu mục này là khó trong lần ôn tập trước.",
    "Marcaste esto como difícil en tu último repaso."
  ),
  "review.note.scheduled": localized(
    "Scheduled based on repeat listens, hints, and recordings from your lesson.",
    "レッスンの繰り返し聴取・ヒント・録音に基づいてスケジュールされました。",
    "根据课程中的重复聆听、提示和录音安排。",
    "Được lên lịch dựa trên lần nghe lặp lại, gợi ý và bản ghi âm từ bài học của bạn.",
    "Programado según las escuchas repetidas, pistas y grabaciones de tu lección."
  ),
  "review.instruction.speak": localized(
    "Read the meaning first, say the Korean, then play to compare.",
    "まず意味を読み、韓国語を言い、再生して比較してください。",
    "先阅读含义，说出韩语，然后播放比较。",
    "Đọc nghĩa trước, nói tiếng Hàn, sau đó phát để so sánh.",
    "Lee el significado primero, di el coreano, luego reproduce para comparar."
  ),
  "review.instruction.roleplay": localized(
    "Listen to the partner line then answer with today's phrase.",
    "パートナーのセリフを聴いてから、今日のフレーズで答えてください。",
    "听对话伙伴的台词，然后用今天的短语回答。",
    "Nghe câu của đối tác rồi trả lời bằng câu của hôm nay.",
    "Escucha la línea del compañero y responde con la frase de hoy."
  ),
  "review.action.hard": localized("Still difficult", "まだ難しい", "仍然困难", "Vẫn còn khó", "Todavía difícil"),
  "review.action.success": localized("I remember", "覚えています", "我记得", "Tôi nhớ rồi", "Lo recuerdo"),
  "review.listen": localized("Listen", "聴く", "听", "Nghe", "Escuchar"),
  "review.slow": localized("Slow", "ゆっくり", "慢速", "Chậm", "Lento"),

  // Review overview
  "review.overview.title": localized("Review status", "復習状況", "复习状态", "Trạng thái ôn tập", "Estado del repaso"),
  "review.overview.dueCount": localized("Due today", "今日の予定", "今天到期", "Đến hạn hôm nay", "Vence hoy"),
  "review.overview.hardCount": localized(
    "Marked difficult",
    "難しいとマーク済み",
    "已标记为困难",
    "Đã đánh dấu là khó",
    "Marcado como difícil"
  ),
  "review.overview.highPriority": localized("High priority", "高優先度", "高优先级", "Ưu tiên cao", "Alta prioridad"),
  "review.overview.nextDue": localized(
    "Next scheduled review opens {time} from now.",
    "次の予定復習は{time}後に始まります。",
    "下次计划复习将在{time}后开始。",
    "Buổi ôn tập tiếp theo sẽ mở sau {time} nữa.",
    "El próximo repaso programado abre en {time}."
  ),
  "review.overview.noNextDue": localized(
    "Complete a new lesson to automatically schedule your next review.",
    "新しいレッスンを完了すると、次の復習が自動的にスケジュールされます。",
    "完成新课程以自动安排下次复习。",
    "Hoàn thành bài học mới để tự động lên lịch ôn tập tiếp theo.",
    "Completa una nueva lección para programar automáticamente tu próximo repaso."
  ),

  // Saved phrase box
  "saved.title": localized("Saved phrases", "保存したフレーズ", "已保存的短语", "Cụm từ đã lưu", "Frases guardadas"),
  "saved.filterAriaLabel": localized(
    "Filter saved phrases",
    "保存したフレーズをフィルター",
    "筛选已保存的短语",
    "Lọc cụm từ đã lưu",
    "Filtrar frases guardadas"
  ),
  "saved.filter.all": localized("All", "すべて", "全部", "Tất cả", "Todo"),
  "saved.dayFilterAriaLabel": localized(
    "View saved phrases by day",
    "日別に保存したフレーズを表示",
    "按天查看已保存的短语",
    "Xem cụm từ đã lưu theo ngày",
    "Ver frases guardadas por día"
  ),
  "saved.dayFilter.all": localized("All days", "すべての日", "所有天", "Tất cả các ngày", "Todos los días"),
  "saved.copied": localized("Copied.", "コピーしました。", "已复制。", "Đã sao chép.", "Copiado."),
  "saved.copyFailed": localized(
    "Copying is not supported in this environment.",
    "この環境ではコピーがサポートされていません。",
    "此环境不支持复制。",
    "Sao chép không được hỗ trợ trong môi trường này.",
    "La copia no está disponible en este entorno."
  ),
  "saved.emptyFilter": localized(
    "No saved phrases match this filter.",
    "このフィルターに一致する保存フレーズはありません。",
    "没有与此筛选条件匹配的已保存短语。",
    "Không có cụm từ đã lưu nào khớp với bộ lọc này.",
    "No hay frases guardadas que coincidan con este filtro."
  ),
  "saved.empty": localized(
    "Tap save during a lesson and phrases will appear here.",
    "レッスン中に保存をタップすると、ここにフレーズが表示されます。",
    "在课程中点击保存，短语将显示在这里。",
    "Nhấn lưu trong bài học và các cụm từ sẽ xuất hiện ở đây.",
    "Toca guardar durante una lección y las frases aparecerán aquí."
  ),
  "saved.listen": localized("Listen", "聴く", "听", "Nghe", "Escuchar"),
  "saved.slow": localized("Slow", "ゆっくり", "慢速", "Chậm", "Lento"),
  "saved.copy": localized("Copy", "コピー", "复制", "Sao chép", "Copiar"),
  "saved.remove": localized("Remove", "削除", "删除", "Xóa", "Eliminar"),

  // Settings screen
  "settings.title": localized(
    "My learning settings",
    "学習設定",
    "我的学习设置",
    "Cài đặt học tập của tôi",
    "Mi configuración de aprendizaje"
  ),
  "settings.field.country": localized("Country pack", "国別パック", "国家包", "Gói quốc gia", "Paquete de país"),
  "settings.field.tutor": localized("Tutor", "チューター", "教师", "Gia sư", "Tutor"),
  "settings.field.dailyGoal": localized("Daily target", "1日の目標", "每日目标", "Mục tiêu hàng ngày", "Meta diaria"),
  "settings.minuteOption": localized("{minutes} min", "{minutes}分", "{minutes}分钟", "{minutes} phút", "{minutes} min"),
  "settings.note": localized(
    "The {country} pack and {tutor} are applied to home, lesson, and review guidance.",
    "{country}パックと{tutor}はホーム・レッスン・復習のガイダンスに適用されます。",
    "{country}包和{tutor}适用于主页、课程和复习指导。",
    "Gói {country} và {tutor} được áp dụng cho hướng dẫn trang chủ, bài học và ôn tập.",
    "El paquete {country} y {tutor} se aplican a la guía de inicio, lección y repaso."
  ),
  "settings.account.title": localized("Account", "アカウント", "账户", "Tài khoản", "Cuenta"),
  "settings.field.email": localized("Email", "メール", "电子邮件", "Email", "Correo electrónico"),
  "settings.account.login": localized("Log in / Merge", "ログイン / マージ", "登录 / 合并", "Đăng nhập / Hợp nhất", "Iniciar sesión / Fusionar"),
  "settings.account.logout": localized("Log out", "ログアウト", "退出登录", "Đăng xuất", "Cerrar sesión"),
  "settings.sync.title": localized("Sync status", "同期状態", "同步状态", "Trạng thái đồng bộ", "Estado de sincronización"),
  "settings.sync.button": localized("Check connection", "接続を確認", "检查连接", "Kiểm tra kết nối", "Verificar conexión"),
  "settings.debug.title": localized("Dev event log", "開発イベントログ", "开发事件日志", "Nhật ký sự kiện dev", "Registro de eventos de desarrollo"),
  "settings.debug.empty": localized(
    "No events recorded yet.",
    "まだイベントが記録されていません。",
    "暂无记录的事件。",
    "Chưa có sự kiện nào được ghi lại.",
    "Aún no se han registrado eventos."
  ),

  // Audio playback runtime status
  "audio.status.staticOk": localized(
    "Playing saved free audio.",
    "保存された無料音源を再生しています。",
    "正在播放已保存的免费音频。",
    "Đang phát âm thanh miễn phí đã lưu.",
    "Reproduciendo audio gratuito guardado."
  ),
  "audio.status.ttsFallback": localized(
    "No free audio saved — using browser speech.",
    "無料の保存音声がないため、ブラウザ音声を使用しています。",
    "没有保存免费音频，正在使用浏览器语音。",
    "Chưa có âm thanh miễn phí — đang dùng giọng trình duyệt.",
    "Sin audio gratuito guardado — usando voz del navegador."
  ),
  "audio.status.noKoreanVoice": localized(
    "No Korean voice on this device. Lesson continues as normal.",
    "このデバイスに韓国語音声がありません。レッスンは通常通り続きます。",
    "此设备上没有韩语语音。课程正常继续。",
    "Thiết bị này không có giọng tiếng Hàn. Bài học tiếp tục bình thường.",
    "Sin voz coreana en este dispositivo. La lección continúa con normalidad."
  ),
  "audio.status.unavailable": localized(
    "Audio not available in this browser. You can continue to the next step.",
    "このブラウザでは音声再生が使用できません。次のステップに進めます。",
    "此浏览器不支持音频播放。可以继续下一步。",
    "Âm thanh không khả dụng trên trình duyệt này. Bạn có thể tiếp tục bước tiếp theo.",
    "Audio no disponible en este navegador. Puedes continuar al siguiente paso."
  ),

  // Storage message
  "sync.localOnly": localized(
    "Saved safely on this device. Sync will be available once a Supabase project is configured.",
    "このデバイスに安全に保存されています。Supabaseプロジェクトが設定されると同期が利用可能になります。",
    "已安全保存在此设备上。配置Supabase项目后将可以同步。",
    "Đã lưu an toàn trên thiết bị này. Đồng bộ sẽ khả dụng sau khi cấu hình dự án Supabase.",
    "Guardado de forma segura en este dispositivo. La sincronización estará disponible una vez que se configure un proyecto de Supabase."
  )
  ,
  "home.lesson.day": localized("Day {day}", "{day}日目", "第 {day} 天", "Ngày {day}", "Día {day}"),
  "home.lesson.dayDone": localized("Day {day} done", "{day}日目 完了", "第 {day} 天已完成", "Ngày {day} đã xong", "Día {day} completado"),
  "home.lesson.heading": localized(
    "Day {day}. {title}",
    "{day}日目。{title}",
    "第 {day} 天。{title}",
    "Ngày {day}. {title}",
    "Día {day}. {title}"
  ),
  "saved.dayLabel": localized("Day {day}", "{day}日目", "第 {day} 天", "Ngày {day}", "Día {day}"),
  "settings.field.emailPlaceholder": localized("you@example.com", "you@example.com", "you@example.com", "you@example.com", "you@example.com"),
  "settings.supabase.ready": localized(
    "Supabase is configured. Email sign-in and cloud sync are available.",
    "Supabase は設定済みです。メールログインとクラウド同期が使えます。",
    "Supabase 已配置。可以使用邮件登录和云同步。",
    "Supabase đã được cấu hình. Có thể dùng đăng nhập email và đồng bộ đám mây.",
    "Supabase está configurado. El inicio de sesión por correo y la sincronización en la nube están disponibles."
  ),
  "settings.supabase.localOnly": localized(
    "Supabase is not configured yet. This app is currently saving on this device only.",
    "Supabase はまだ設定されていません。現在はこの端末だけに保存しています。",
    "Supabase 尚未配置。当前仅保存在此设备上。",
    "Supabase chưa được cấu hình. Ứng dụng hiện chỉ lưu trên thiết bị này.",
    "Supabase todavía no está configurado. Esta app guarda por ahora solo en este dispositivo."
  ),
  "settings.debug.eventAt": localized(
    "{name} · {time}",
    "{name} · {time}",
    "{name} · {time}",
    "{name} · {time}",
    "{name} · {time}"
  ),
  "sync.readyToConnect": localized(
    "Supabase environment variables are present. Cloud sync can be connected.",
    "Supabase の環境変数が見つかりました。クラウド同期を接続できます。",
    "已检测到 Supabase 环境变量。可以连接云同步。",
    "Đã có biến môi trường Supabase. Có thể kết nối đồng bộ đám mây.",
    "Las variables de entorno de Supabase están presentes. Se puede conectar la sincronización en la nube."
  ),
  "sync.pendingRetry": localized(
    "Changes are saved on this device and ready to retry syncing.",
    "変更はこの端末に保存されており、再同期を試せます。",
    "更改已保存在此设备上，可以重新尝试同步。",
    "Các thay đổi đã được lưu trên thiết bị này và sẵn sàng thử đồng bộ lại.",
    "Los cambios están guardados en este dispositivo y listos para reintentar la sincronización."
  ),
  "sync.accountMergedCloudReady": localized(
    "Account and local progress were merged. Cloud save can run after Supabase is connected.",
    "アカウントとローカル進捗を統合しました。Supabase 接続後にクラウド保存を実行できます。",
    "账户与本地进度已合并。连接 Supabase 后即可运行云端保存。",
    "Đã hợp nhất tài khoản và tiến độ cục bộ. Có thể lưu đám mây sau khi kết nối Supabase.",
    "La cuenta y el progreso local se fusionaron. El guardado en la nube puede ejecutarse después de conectar Supabase."
  ),
  "sync.accountMergedLocal": localized(
    "Account and local progress were merged in this browser's local storage.",
    "アカウントとローカル進捗をこのブラウザのローカル保存に統合しました。",
    "账户与本地进度已合并到此浏览器的本地存储中。",
    "Đã hợp nhất tài khoản và tiến độ cục bộ vào bộ nhớ cục bộ của trình duyệt này.",
    "La cuenta y el progreso local se fusionaron en el almacenamiento local de este navegador."
  ),
  "sync.loggedOutLocal": localized(
    "Logged out. Guest progress continues to be stored on this device.",
    "ログアウトしました。ゲストの進捗はこの端末に保存され続けます。",
    "已退出登录。访客进度仍会继续保存在此设备上。",
    "Đã đăng xuất. Tiến độ khách vẫn tiếp tục được lưu trên thiết bị này.",
    "Sesión cerrada. El progreso de invitado seguirá guardado en este dispositivo."
  ),
  "sync.authLinkSent": localized(
    "We sent a login link by email. Opening it will start cloud progress merge.",
    "ログインリンクをメールで送りました。開くとクラウド進捗の統合が始まります。",
    "我们已通过邮件发送登录链接。打开后将开始云端进度合并。",
    "Chúng tôi đã gửi liên kết đăng nhập qua email. Mở liên kết đó sẽ bắt đầu hợp nhất tiến độ đám mây.",
    "Enviamos un enlace de inicio de sesión por correo. Al abrirlo comenzará la fusión del progreso en la nube."
  ),
  "sync.supabaseReady": localized(
    "Supabase is ready. Sign in with an email link to run cloud sync.",
    "Supabase の準備ができました。メールリンクでログインするとクラウド同期を実行できます。",
    "Supabase 已就绪。通过邮件链接登录后即可运行云同步。",
    "Supabase đã sẵn sàng. Hãy đăng nhập bằng liên kết email để chạy đồng bộ đám mây.",
    "Supabase está listo. Inicia sesión con un enlace por correo para ejecutar la sincronización en la nube."
  ),
  "sync.merged": localized(
    "Cloud and local progress were merged successfully.",
    "クラウドとローカルの進捗を正常に統合しました。",
    "云端与本地进度已成功合并。",
    "Tiến độ đám mây và cục bộ đã được hợp nhất thành công.",
    "El progreso en la nube y el local se fusionaron correctamente."
  ),
  "audio.readinessPending": localized(
    "Natural and slow playback are available, but some lines still rely on browser speech until free static audio files are linked.",
    "通常速度とゆっくり速度の再生は使えますが、無料の静的音声が紐づくまでは一部の行でブラウザ音声に頼ります。",
    "自然和慢速播放都可用，但在接入免费的静态音频文件前，部分句子仍会依赖浏览器语音。",
    "Phát ở tốc độ thường và chậm đều dùng được, nhưng một số câu vẫn phải dựa vào giọng đọc của trình duyệt cho đến khi có tệp âm thanh tĩnh miễn phí.",
    "La reproducción natural y lenta está disponible, pero algunas líneas todavía dependen de la voz del navegador hasta que se vinculen archivos de audio estáticos gratuitos."
  ),
  "audio.readinessReady": localized(
    "Every tracked line has linked natural and slow static audio, so playback can stay on packaged files.",
    "追跡対象の全ラインに通常速度とゆっくり速度の静的音声が紐づいており、再生はパッケージ済みファイルで完結します。",
    "所有已跟踪句子都已链接自然和慢速静态音频，因此播放可以直接使用打包文件。",
    "Mọi câu đã theo dõi đều có âm thanh tĩnh tốc độ thường và chậm, vì vậy phát lại có thể dùng trọn bộ tệp đã đóng gói.",
    "Cada línea registrada tiene audio estático natural y lento vinculado, así que la reproducción puede mantenerse en archivos ya empaquetados."
  )
} as const;
