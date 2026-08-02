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
  "nav.home": localized("Home", "ホーム", "首页", "Trang chủ", "Inicio"),
  "nav.lesson": localized("Lesson", "レッスン", "课程", "Bài học", "Lección"),
  "nav.review": localized("Review", "復習", "复习", "Ôn tập", "Repaso"),
  "nav.settings": localized("Settings", "設定", "设置", "Cài đặt", "Configuración"),
  "nav.ariaLabel": en("Main menu"),
  "common.start": localized("Start", "開始", "开始", "Bắt đầu", "Comenzar"),
  "common.continue": localized("Continue", "続ける", "继续", "Tiếp tục", "Continuar"),
  "common.next": localized("Next", "次へ", "下一步", "Tiếp theo", "Siguiente"),
  "common.prev": en("Back"),
  "common.close": en("Close"),
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
  ),

  // Level labels
  "level.first-time": en("I'm starting from zero"),
  "level.beginner": en("I know a few basics"),
  "level.returning": en("I'm picking it back up"),
  "level.daily": en("I want more everyday expressions"),

  // Goal labels
  "goal.travel": en("Travel"),
  "goal.daily": en("Daily conversation"),
  "goal.study": en("Study abroad"),
  "goal.work": en("Work"),
  "goal.life": en("Life in Korea"),
  "goal.k-content": en("K-content"),

  // Time labels (for formatDueLabel)
  "time.now": en("Now"),
  "time.hoursLater": en("{hours}h from now"),
  "time.daysLater": en("{days}d from now"),

  // Kind / source labels
  "kind.listen": en("Listen"),
  "kind.speak": en("Speak"),
  "kind.roleplay": en("Roleplay"),
  "kind.core": en("Core"),
  "kind.response": en("Response"),
  "kind.rescue": en("Rescue"),
  "kind.swap": en("Variation"),
  "kind.continuation": en("Next course"),
  "kind.review": en("Review"),

  // Error messages
  "error.sync": en("An error occurred while syncing with Supabase."),
  "error.auth": en("An error occurred while processing Supabase auth state."),
  "error.invalidEmail": en("Please check your email address."),
  "error.loginFailed": en("Failed to send login link."),
  "error.logoutFailed": en("An error occurred while logging out."),
  "error.syncFailed": en("An error occurred while syncing."),

  // Onboarding
  "onboarding.title": en("Setup"),
  "onboarding.step0.title": en("Which language should we guide you in?"),
  "onboarding.step0.kicker": en("No login required"),
  "onboarding.step1.title": en("What is your current Korean level?"),
  "onboarding.step2.title": en("What Korean do you need most?"),
  "onboarding.step3.title": en("How many minutes a day works for you?"),
  "onboarding.minuteUnit": en("min"),
  "onboarding.step4.title": en("Choose a Korean tutor to practice with"),
  "onboarding.step5.title": en("Confirm your settings"),
  "onboarding.field.country": en("Country pack"),
  "onboarding.field.goal": en("Goal"),
  "onboarding.field.dailyGoal": en("Daily target"),
  "onboarding.field.tutor": en("Tutor"),
  "onboarding.field.reminderTime": en("First reminder time"),
  "onboarding.cta": en("Start Day 1 now"),

  // Home screen
  "home.hero.title": en("Start with one sentence today."),
  "home.hero.loggedIn": en("Saving to {email} account"),
  "home.hero.anonymous": en("Your progress is saved on this device even before you log in."),
  "home.metric.todayLesson": en("Today's lesson"),
  "home.metric.reviewCount": en("Review items"),
  "home.metric.savedCount": en("Saved phrases"),
  "home.metric.tutor": en("Tutor"),
  "home.panel.lessonCompleted": en("Up next: a quick review"),
  "home.panel.lessonInProgress": en("Continue your lesson"),
  "home.lesson.meta": en("{percent}% done · {dailyGoal} min goal"),
  "home.lesson.resume": en("Resume"),
  "home.lesson.progressAriaLabel": en("Day {day} progress {percent}%"),
  "home.review.cta": en("Check today's review items"),
  "home.review.emptyTitle": en("No review items yet"),
  "home.review.emptyBody": en("After finishing a lesson, review items are created based on expressions you found difficult."),
  "home.login.cta": en("Log in to restore your progress across devices"),

  // Continuation path panel
  "continuation.panelCompleted": en("Day 15+ Program"),
  "continuation.panelInProgress": en("What comes after Day 14"),
  "continuation.progress": en("{count}/14 complete"),
  "continuation.listen": en("Listen"),
  "continuation.slow": en("Slow"),
  "continuation.save": en("Save"),
  "continuation.saved": en("Saved"),
  "continuation.listenAriaLabel": en("Listen to {phrase}"),
  "continuation.slowAriaLabel": en("Listen slowly to {phrase}"),
  "continuation.saveAriaLabel": en("Save {phrase}"),

  // Audio readiness panel
  "audio.readinessTitle": en("Offline audio pack status"),
  "audio.slots": en("Audio slots"),
  "audio.staticFiles": en("Static files linked"),
  "audio.fallback": en("Browser fallback"),
  "audio.readinessBody": en("Day 1–30 phrases are locked in at natural and slow speeds. Until free static audio is linked, Korean browser speech synthesis keeps lessons running."),
  "audio.naturalSpeed": en("Natural speed"),
  "audio.slowSpeed": en("Slow speed"),
  "audio.waveformAriaLabel": en("Playback progress"),
  "audio.ttsNote": en("When no free static audio is available, browser TTS is used."),

  // Learning guide panel
  "guide.panelTitle": en("{nativeLabel} learning tips"),
  "guide.focus": en("Focus"),
  "guide.pronunciation": en("Pronunciation"),
  "guide.structure": en("Structure"),
  "guide.review": en("Review habit"),
  "guide.offline": en("Offline"),

  // Lesson screen
  "lesson.tutorKicker": en("Tutor {name}"),
  "lesson.phrase.saved": en("Phrase saved"),
  "lesson.phrase.save": en("Save phrase"),
  "lesson.hint.show": en("Show hint"),
  "lesson.pause": en("Continue later"),
  "lesson.complete": en("Done — schedule review"),
  "lesson.quiz.skip": en("Skip — I'm not sure"),
  "lesson.ttsNote": en("When no free static audio is available, browser TTS is used."),
  "lesson.continue": en("Continue"),

  // Roleplay display labels
  "roleplay.partner": en("Partner"),
  "roleplay.myAnswer": en("My answer"),
  "roleplay.rescue": en("Rescue"),

  // Recorder
  "recorder.stop": en("Stop recording"),
  "recorder.start": en("Record my voice"),
  "recorder.retry": en("Record again"),
  "recorder.denied.title": en("Microphone access denied"),
  "recorder.denied.body": en("Allow microphone access in your browser's address bar settings, or skip this recording step to continue."),
  "recorder.unsupported.title": en("Recording not available"),
  "recorder.unsupported.body": en("Your browser does not support recording. You can still complete the lesson."),

  // Review screen
  "review.empty.title": en("No review items yet"),
  "review.empty.body": en("After finishing your first lesson, review items are created based on wrong answers, hints, and repeated recordings."),
  "review.empty.cta": en("Study Day 1"),
  "review.done.title": en("Today's review is complete"),
  "review.done.body": en("You'll get a short check at your next review time."),
  "review.done.cta": en("Go to next lesson"),
  "review.progressTitle": en("3-minute review"),
  "review.priorityAriaLabel": en("Review priority {priority}"),
  "review.note.hard": en("You marked this as difficult in your last review."),
  "review.note.scheduled": en("Scheduled based on repeat listens, hints, and recordings from your lesson."),
  "review.instruction.speak": en("Read the meaning first, say the Korean, then play to compare."),
  "review.instruction.roleplay": en("Listen to the partner line then answer with today's phrase."),
  "review.action.hard": en("Still difficult"),
  "review.action.success": en("I remember"),
  "review.listen": en("Listen"),
  "review.slow": en("Slow"),

  // Review overview
  "review.overview.title": en("Review status"),
  "review.overview.dueCount": en("Due today"),
  "review.overview.hardCount": en("Marked difficult"),
  "review.overview.highPriority": en("High priority"),
  "review.overview.nextDue": en("Next scheduled review opens {time} from now."),
  "review.overview.noNextDue": en("Complete a new lesson to automatically schedule your next review."),

  // Saved phrase box
  "saved.title": en("Saved phrases"),
  "saved.filterAriaLabel": en("Filter saved phrases"),
  "saved.filter.all": en("All"),
  "saved.dayFilterAriaLabel": en("View saved phrases by day"),
  "saved.dayFilter.all": en("All days"),
  "saved.copied": en("Copied."),
  "saved.copyFailed": en("Copying is not supported in this environment."),
  "saved.emptyFilter": en("No saved phrases match this filter."),
  "saved.empty": en("Tap save during a lesson and phrases will appear here."),
  "saved.listen": en("Listen"),
  "saved.slow": en("Slow"),
  "saved.copy": en("Copy"),
  "saved.remove": en("Remove"),

  // Settings screen
  "settings.title": en("My learning settings"),
  "settings.field.country": en("Country pack"),
  "settings.field.tutor": en("Tutor"),
  "settings.field.dailyGoal": en("Daily target"),
  "settings.minuteOption": en("{minutes} min"),
  "settings.note": en("The {country} pack and {tutor} are applied to home, lesson, and review guidance."),
  "settings.account.title": en("Account"),
  "settings.field.email": en("Email"),
  "settings.account.login": en("Log in / Merge"),
  "settings.account.logout": en("Log out"),
  "settings.sync.title": en("Sync status"),
  "settings.sync.button": en("Check connection"),
  "settings.debug.title": en("Dev event log"),
  "settings.debug.empty": en("No events recorded yet."),

  // Storage message
  "sync.localOnly": en("Saved safely on this device. Sync will be available once a Supabase project is configured.")
} as const;
