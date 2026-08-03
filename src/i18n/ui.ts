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

const en = (s: string) => localized(s, s, s, s, s);

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

  // Storage message
  "sync.localOnly": localized(
    "Saved safely on this device. Sync will be available once a Supabase project is configured.",
    "このデバイスに安全に保存されています。Supabaseプロジェクトが設定されると同期が利用可能になります。",
    "已安全保存在此设备上。配置Supabase项目后将可以同步。",
    "Đã lưu an toàn trên thiết bị này. Đồng bộ sẽ khả dụng sau khi cấu hình dự án Supabase.",
    "Guardado de forma segura en este dispositivo. La sincronización estará disponible una vez que se configure un proyecto de Supabase."
  )
} as const;
