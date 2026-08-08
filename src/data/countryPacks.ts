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
  },
  {
    id: "id-id",
    label: "Indonesia",
    nativeLabel: "Bahasa Indonesia",
    interfaceLanguage: "id",
    onboardingNote: "Mulai dari satu kalimat yang langsung berguna, lalu tambahkan tata bahasa hanya saat itu membantu.",
    cultureNote: "Dalam bahasa Korea, nada lembut dan akhiran sopan membuat percakapan pertama terasa lebih lancar.",
    roleplaySituation: "Kamu menyapa pegawai kafe dekat stasiun dan mulai berbicara dengan sopan.",
    feedback: ["Sudah terdengar jelas.", "Coba ulang bagian akhir sedikit lebih lembut.", "Kalimat itu sudah cukup natural untuk dipakai hari ini."],
    reminders: ["Tiga menit cukup untuk satu kalimat penting.", "Kembali lagi untuk cek singkat mendengar dan berbicara."],
    comebackMessage: "Lanjutkan lagi dari kalimat yang terakhir kamu latih.",
    learningGuide: {
      focus: "Utamakan kalimat yang benar-benar bisa dipakai hari ini, bukan penjelasan tata bahasa yang panjang.",
      pronunciation: "Dengarkan akhiran kalimat dan ritmenya dulu. Bagian akhir sering membawa nuansa sopan.",
      grammarBridge: "Bahasa Korea sering menaruh tempat atau benda sebelum tindakan, lalu menutup dengan akhiran sopan.",
      reviewHabit: "Simpan kalimat yang terasa berguna untuk kerja, perjalanan, dan urusan harian, lalu ulangi dari lambat ke normal.",
      offlineTip: "Siapkan audio ringan Day 1-14 supaya tetap bisa latihan saat sinyal lemah atau kuota terbatas."
    },
    preferredGoals: ["work", "daily", "travel"],
    defaultDailyGoal: 10,
    notificationWindow: "19:00-21:00",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    currency: "IDR",
    disabledFeatures: [],
    privacyNote: "Dalam prototipe saat ini, rekaman suara tetap tersimpan di perangkat ini.",
    translations: {
      start: "Mulai",
      continue: "Lanjut",
      review: "Ulangi",
      settings: "Pengaturan",
      lesson: "Pelajaran"
    }
  },
  {
    id: "kh-km",
    label: "Cambodia",
    nativeLabel: "ភាសាខ្មែរ",
    interfaceLanguage: "km",
    onboardingNote: "ចាប់ផ្តើមពីប្រយោគមួយដែលអាចយកទៅប្រើបានភ្លាមសិន បន្ទាប់មកទើបបន្ថែមវេយ្យាករណ៍នៅពេលដែលវាជួយអ្នកនិយាយវាម្តងទៀតបានកាន់តែងាយ។",
    cultureNote: "សម្លេងទន់ និងចុងប្រយោគគួរសម ធ្វើឲ្យការសន្ទនាភាសាកូរ៉េលើកដំបូងរលូនជាងមុន។",
    roleplaySituation: "អ្នកសួរសុខទុក្ខបុគ្គលិកកាហ្វេក្បែរស្ថានីយ៍ដោយគួរសម ហើយចាប់ផ្តើមសន្ទនាខ្លីមួយ។",
    feedback: ["ឮច្បាស់ហើយ។", "សាកនិយាយចុងប្រយោគម្តងទៀតឲ្យទន់ជាងមុនបន្តិច។", "ប្រយោគនេះស្តាប់ទៅអាចយកទៅប្រើបានសម្រាប់ថ្ងៃនេះហើយ។"],
    reminders: ["បីនាទីគ្រប់គ្រាន់សម្រាប់ប្រយោគសំខាន់មួយ។", "ត្រឡប់មកវិញសម្រាប់ការត្រួតពិនិត្យស្តាប់ និងនិយាយខ្លីមួយ។"],
    comebackMessage: "បន្តពីប្រយោគដែលអ្នកបានហាត់ចុងក្រោយម្តងទៀត។",
    learningGuide: {
      focus: "ចាំ និងយកប្រយោគជាក់ស្តែងមកប្រើជាមុន ដើម្បីឲ្យការនិយាយមានអារម្មណ៍ថាអាចធ្វើបានតាំងពីដំបូង។",
      pronunciation: "ស្តាប់ផ្នែកចុងប្រយោគជាមុនសិន។ ក្នុងភាសាកូរ៉េ ភាពគួរសមជាញឹកញាប់ស្ថិតនៅចុងប្រយោគ និងចង្វាក់របស់វា។",
      grammarBridge: "គិតជាបន្ទះៗ: ទីកន្លែង ឬ វត្ថុ ជាមុន សកម្មភាពនៅក្រោយ ហើយបិទចុងដោយទម្រង់គួរសម។",
      reviewHabit: "រក្សាប្រយោគមួយក្រុមតូចសម្រាប់ការងារ មន្ទីរពេទ្យ ការិយាល័យ និងជីវិតប្រចាំថ្ងៃ ដើម្បីរំលឹកប្តូរវិញរាល់ថ្ងៃ។",
      offlineTip: "ប្រើកញ្ចប់សំឡេងស្រាលនៅពេលអ៊ីនធឺណិតខ្សោយ ដើម្បីកុំឲ្យការរំលឹកត្រូវផ្អាក។"
    },
    preferredGoals: ["work", "life", "daily"],
    defaultDailyGoal: 10,
    notificationWindow: "19:00-21:00",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    currency: "KHR",
    disabledFeatures: [],
    privacyNote: "នៅក្នុងគំរូបច្ចុប្បន្ន ការថតសំឡេងនឹងស្ថិតនៅលើឧបករណ៍នេះប៉ុណ្ណោះ។",
    translations: {
      start: "ចាប់ផ្តើម",
      continue: "បន្ត",
      review: "រំលឹកឡើងវិញ",
      settings: "ការកំណត់",
      lesson: "មេរៀន"
    }
  },
  {
    id: "mm-my",
    label: "Myanmar",
    nativeLabel: "မြန်မာ",
    interfaceLanguage: "my",
    onboardingNote: "အခုချက်ချင်း အသုံးပြုနိုင်မယ့် ဝါကျတစ်ခုနဲ့ စတင်ပြီး တည်ငြိမ်လာတဲ့အထိ အဲဒီပုံစံကိုပဲ ပြန်လေ့ကျင့်ပါ။",
    cultureNote: "တည်ငြိမ်တဲ့အသံနဲ့ ယဉ်ကျေးတဲ့ အဆုံးသတ်က ကိုရီးယားနေ့စဉ်စကားပြောကို ပိုချောမွေ့စေပါတယ်။",
    roleplaySituation: "ဘူတာအနီးက ကဖေးဝန်ထမ်းကို ယဉ်ကျေးစွာနှုတ်ဆက်ပြီး အသုံးဝင်တဲ့ စကားပြန်လဲမှုတိုတစ်ခုကို လေ့ကျင့်ပါ။",
    feedback: ["ရှင်းရှင်းလင်းလင်းကြားရပါတယ်။", "ဝါကျအဆုံးသတ်ကို တစ်ခါထပ်ပြောကြည့်ပါ။", "ဒီဝါကျကို တကယ်အသုံးချနိုင်လောက်ပြီ။"],
    reminders: ["နေ့စဉ်တိုတောင်းတဲ့စစ်ဆေးမှုတစ်ခုနဲ့ပဲ ဝါကျတစ်ခုကို အသက်ဝင်နေစေနိုင်ပါတယ်။", "နောက်ထပ် တစ်ကြိမ် နားထောင်ပြီး ပြောတဲ့လေ့ကျင့်မှုအတွက် ပြန်လာပါ။"],
    comebackMessage: "ပြီးခဲ့တဲ့အကြိမ်တုန်းက တည်ဆောက်နေတဲ့ဝါကျကနေ ပြန်စပါ။",
    learningGuide: {
      focus: "အက်ဘ်စထရက်ဝေယျာကရဓာတ်တွေမတိုင်မီ အလုပ်၊ ချိန်းဆိုမှု၊ ပြန်မေးခြင်းနဲ့ နေ့စဉ်အကူအညီအတွက် သုံးနိုင်တဲ့ဝါကျတွေကို အရင်သင်ပါ။",
      pronunciation: "ဝါကျတစ်ခုလုံးရဲ့ ရစ်သမ်ကို အရင်ကိုက်အောင်လုပ်ပြီးမှ အသံတစ်လုံးချင်းကို ပြင်ပါ။ ကိုရီးယားလိုမှာ အဆုံးသတ်က အဓိပ္ပာယ်အများကြီးကို သယ်ဆောင်ပါတယ်။",
      grammarBridge: "ကိုရီးယားကို ပြန်သုံးလို့ရတဲ့ ဝါကျပုံစံလို စဉ်းစားပါ: ဘယ်သူ သို့မဟုတ် ဘာဆိုတာ အရင်, ပြီးတော့ လုပ်ဆောင်ချက်, နောက်ဆုံးမှာ ယဉ်ကျေးတဲ့ ပိတ်သတ်မှု။",
      reviewHabit: "ဖိအားရှိတဲ့အချိန်တောင် အဆင်သင့်ဖြစ်နေစေဖို့ အဓိကဝါကျတစ်ခုတည်းကို နားထောင်ခြင်း၊ ပြောခြင်း၊ roleplay တိုတိုနဲ့ ထပ်ခါထပ်ခါ review လုပ်ပါ။",
      offlineTip: "ကွန်နက်ရှင်မတည်ငြိမ်တဲ့အချိန်နဲ့ သွားလာနေချိန်မှာ လေ့ကျင့်နိုင်ဖို့ အသံဖိုင်အစုအတိုကို အဆင်သင့်ထားပါ။"
    },
    preferredGoals: ["work", "daily", "life"],
    defaultDailyGoal: 10,
    notificationWindow: "19:30-21:30",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    currency: "MMK",
    disabledFeatures: [],
    privacyNote: "ဒီ prototype မှာ သင့်အသံဒေတာက လက်ရှိစက်ပေါ်မှာပဲ ရှိနေပါတယ်။",
    translations: {
      start: "စတင်ရန်",
      continue: "ဆက်လုပ်ရန်",
      review: "ပြန်လေ့ကျင့်ရန်",
      settings: "ဆက်တင်များ",
      lesson: "သင်ခန်းစာ"
    }
  },
  {
    id: "th-th",
    label: "Thailand",
    nativeLabel: "ไทย",
    interfaceLanguage: "th",
    onboardingNote: "เริ่มจากประโยคที่ใช้ได้จริงก่อน แล้วค่อยเติมไวยากรณ์เมื่อช่วยให้พูดซ้ำได้ดีขึ้น",
    cultureNote: "ในภาษาเกาหลี น้ำเสียงสุภาพและการลงท้ายที่พอดีช่วยให้บทสนทนาแรกไหลลื่นขึ้นมาก",
    roleplaySituation: "คุณทักพนักงานคาเฟ่ใกล้สถานีรถไฟฟ้าอย่างสุภาพและเริ่มคุยสั้นๆ",
    feedback: ["ฟังชัดดีแล้ว", "ลองเก็บน้ำเสียงช่วงท้ายอีกครั้ง", "ประโยคนี้พร้อมใช้ในชีวิตจริงได้แล้ววันนี้"],
    reminders: ["สามนาทีก็พอสำหรับหนึ่งประโยคสำคัญ", "กลับมาฝึกฟังและพูดสั้นๆ อีกครั้ง"],
    comebackMessage: "กลับมาต่อจากประโยคที่คุณเพิ่งฝึกไว้ล่าสุด",
    learningGuide: {
      focus: "เน้นประโยคที่ใช้ได้จริงในงาน เดินทาง และชีวิตประจำวันก่อนคำอธิบายยาวๆ",
      pronunciation: "ฟังช่วงลงท้ายของประโยคก่อน เพราะความสุภาพและจังหวะมักอยู่ตรงนั้น",
      grammarBridge: "ภาษาเกาหลีมักวางสถานที่หรือสิ่งของก่อนการกระทำ แล้วปิดท้ายด้วยรูปสุภาพ",
      reviewHabit: "บันทึกประโยคที่อยากใช้จริง แล้วทวนจากช้าไปปกติทุกวัน",
      offlineTip: "เตรียมชุดเสียงขนาดเล็กไว้ใช้ตอนเน็ตไม่ดี เพื่อให้การทบทวนไม่สะดุด"
    },
    preferredGoals: ["travel", "daily", "work"],
    defaultDailyGoal: 5,
    notificationWindow: "19:00-21:00",
    dateTimeFormat: "d/M/yyyy HH:mm",
    currency: "THB",
    disabledFeatures: [],
    privacyNote: "ต้นแบบปัจจุบันเก็บเสียงของคุณไว้บนอุปกรณ์นี้",
    translations: {
      start: "เริ่ม",
      continue: "ต่อ",
      review: "ทบทวน",
      settings: "ตั้งค่า",
      lesson: "บทเรียน"
    }
  },
  {
    id: "my-ms",
    label: "Malaysia",
    nativeLabel: "Bahasa Melayu",
    interfaceLanguage: "ms",
    onboardingNote: "Mulakan dengan satu ayat yang berguna dahulu, kemudian tambah tatabahasa hanya apabila ia membantu anda bercakap lagi.",
    cultureNote: "Dalam bahasa Korea, nada yang lembut dan akhiran sopan banyak membantu perbualan pertama terasa lebih lancar.",
    roleplaySituation: "Anda menyapa pekerja kafe berhampiran stesen dengan sopan dan memulakan perbualan ringkas.",
    feedback: ["Itu sudah jelas didengar.", "Cuba sekali lagi pada bahagian akhir ayat.", "Ayat itu sudah cukup semula jadi untuk digunakan hari ini."],
    reminders: ["Tiga minit sudah cukup untuk satu ayat penting.", "Datang semula untuk semakan mendengar dan bercakap yang ringkas."],
    comebackMessage: "Sambung semula daripada ayat yang anda latih sebelum ini.",
    learningGuide: {
      focus: "Utamakan ayat yang boleh terus digunakan dalam urusan harian, kerja, dan perjalanan.",
      pronunciation: "Dengar penghujung ayat dahulu. Dalam bahasa Korea, nada sopan banyak terletak pada bunyi akhir dan ritma.",
      grammarBridge: "Bayangkan pola ayatnya mengikut kelompok: tempat atau benda dahulu, tindakan kemudian, dan penutup sopan di hujung.",
      reviewHabit: "Simpan ayat yang benar-benar mahu digunakan dan ulang dari kelajuan perlahan ke biasa setiap hari.",
      offlineTip: "Sediakan pek audio ringan Day 1-14 supaya latihan boleh diteruskan walaupun rangkaian lemah."
    },
    preferredGoals: ["travel", "daily", "k-content"],
    defaultDailyGoal: 5,
    notificationWindow: "19:00-21:00",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    currency: "MYR",
    disabledFeatures: [],
    privacyNote: "Dalam prototaip semasa, rakaman suara kekal pada peranti ini.",
    translations: {
      start: "Mula",
      continue: "Teruskan",
      review: "Ulang kaji",
      settings: "Tetapan",
      lesson: "Pelajaran"
    }
  }
];

export const getCountryPack = (id: string | undefined) =>
  countryPacks.find((pack) => pack.id === id) ?? countryPacks[0];
