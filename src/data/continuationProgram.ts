import type { CountryPackId, LearningGoal } from "../types";

type LocalizedText = Record<CountryPackId, string>;

const localized = (
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
): LocalizedText => ({
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

export interface ContinuationModule {
  dayRange: LocalizedText;
  title: LocalizedText;
  outcome: LocalizedText;
  samplePhrases: string[];
}

export interface ContinuationTrack {
  id: LearningGoal;
  title: LocalizedText;
  promise: LocalizedText;
  modules: ContinuationModule[];
}

export const continuationTracks: ContinuationTrack[] = [
  {
    id: "travel",
    title: localized(
      "Day 15-30 Travel survival Korean",
      "Day 15-30 旅行サバイバル韓国語",
      "Day 15-30 旅行生存韩语",
      "Day 15-30 Tiếng Hàn sinh tồn khi đi lại",
      "Day 15-30 Coreano de supervivencia para viajar",
      "Day 15-30 Bahasa Korea untuk bertahan saat bepergian",
      "Day 15-30 ភាសាកូរ៉េសម្រាប់ការធ្វើដំណើរ",
      "Day 15-30 ခရီးသွားရင်း အသုံးချနိုင်တဲ့ ကိုရီးယားစကား",
      "Day 15-30 ภาษาเกาหลีเอาตัวรอดเวลาเดินทาง",
      "Day 15-30 Bahasa Korea untuk kegunaan semasa perjalanan"
    ),
    promise: localized(
      "Keep speaking through directions, reservations, ordering, and help requests in the order you would actually need them on the move.",
      "移動中に本当に必要になる順で、道案内、予約、注文、助けを求める表現をつないで話せるようにします。",
      "按你在移动途中真正会用到的顺序，继续练习问路、确认预约、点单和求助。",
      "Tiếp tục nói qua các tình huống hỏi đường, đặt chỗ, gọi món và nhờ giúp đúng theo thứ tự bạn thật sự cần khi di chuyển.",
      "Sigue hablando en situaciones de trayecto: direcciones, reservaciones, pedidos y ayuda, en el orden en que realmente las necesitarías.",
      "Terus latih bicara untuk arah jalan, reservasi, memesan, dan meminta bantuan sesuai urutan yang benar-benar kamu butuhkan saat bergerak.",
      "បន្តនិយាយតាមលំដាប់ស្ថានការណ៍ដែលអ្នកត្រូវការពិតពេលធ្វើដំណើរ ដូចជា សួរផ្លូវ កក់ទុក កុម្ម៉ង់ និងសុំជំនួយ។",
      "သွားလာနေချိန်မှာ တကယ်လိုအပ်မယ့် အစဉ်အတိုင်း လမ်းမေးခြင်း၊ ဘိုကင်စစ်ခြင်း၊ အော်ဒါတင်ခြင်းနဲ့ အကူအညီတောင်းခြင်းကို ဆက်ပြောလေ့ကျင့်ပါ။",
      "ฝึกพูดต่อเนื่องในสถานการณ์ที่ต้องใช้จริงระหว่างเดินทาง เช่น ถามทาง ยืนยันการจอง สั่งของ และขอความช่วยเหลือ",
      "Teruskan latihan bertutur untuk arah jalan, tempahan, pesanan, dan permintaan bantuan mengikut urutan yang benar-benar diperlukan semasa bergerak."
    ),
    modules: [
      {
        dayRange: localized(
          "Day 15-18",
          "Day 15-18",
          "Day 15-18",
          "Day 15-18",
          "Day 15-18",
          "Hari 15-18",
          "ថ្ងៃទី 15-18",
          "Day 15-18",
          "วันที่ 15-18",
          "Hari 15-18"
        ),
        title: localized(
          "Directions and movement",
          "道順と移動",
          "问路与移动",
          "Chỉ đường và di chuyển",
          "Direcciones y desplazamiento",
          "Arah dan perpindahan",
          "ការសួរផ្លូវ និងការផ្លាស់ទី",
          "လမ်းကြောင်းနဲ့ သွားလာမှု",
          "การถามทางและการเดินทางต่อ",
          "Arah dan pergerakan"
        ),
        outcome: localized(
          "Ask for the right exit, route, or destination and confirm it without freezing.",
          "出口・経路・行き先をたずねて、その場で固まらず確認できるようにします。",
          "学会询问正确出口、路线或目的地，并顺着确认下去。",
          "Hỏi đúng cửa ra, lộ trình hoặc điểm đến rồi xác nhận tiếp mà không bị khựng lại.",
          "Pregunta por la salida, ruta o destino correctos y confírmalo sin quedarte bloqueado.",
          "Bisa menanyakan pintu keluar, rute, atau tujuan yang benar lalu mengonfirmasinya tanpa macet.",
          "សួរច្រកចេញ ផ្លូវ ឬគោលដៅឲ្យត្រឹមត្រូវ ហើយបន្តបញ្ជាក់បានដោយមិនជាប់គាំង។",
          "ထွက်ပေါက်၊ လမ်းကြောင်း ဒါမှမဟုတ် သွားမယ့်နေရာကို မှန်မှန်ကန်ကန်မေးပြီး မတုံ့ဆိုင်းဘဲ အတည်ပြုနိုင်အောင် လေ့ကျင့်ပါ။",
          "ถามทางออก เส้นทาง หรือจุดหมายให้ถูก แล้วคอนเฟิร์มต่อได้โดยไม่สะดุด",
          "Tanya pintu keluar, laluan, atau destinasi yang betul dan sahkan tanpa tersekat."
        ),
        samplePhrases: ["여기로 가 주세요.", "몇 번 출구예요?", "여기서 내려 주세요."]
      },
      {
        dayRange: localized("Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Hari 19-22", "ថ្ងៃទី 19-22", "Day 19-22", "วันที่ 19-22", "Hari 19-22"),
        title: localized(
          "Cafe and restaurant extensions",
          "カフェと食堂の拡張表現",
          "咖啡馆和餐厅扩展表达",
          "Mở rộng câu dùng ở quán cà phê và nhà hàng",
          "Extensiones para café y restaurante",
          "Perluasan percakapan di kafe dan restoran",
          "ការពង្រីកសំណើនៅកាហ្វេ និងភោជនីយដ្ឋាន",
          "ကဖေးနဲ့ စားသောက်ဆိုင်မှာ ပြောစကားတိုးချဲ့ခြင်း",
          "ขยายบทพูดในคาเฟ่และร้านอาหาร",
          "Pengembangan ayat di kafe dan restoran"
        ),
        outcome: localized(
          "Handle changes, requests, packing, and paying with short practical sentences.",
          "変更、依頼、持ち帰り、支払いを短く実用的な文でこなせるようにします。",
          "用短而实用的句子处理调整、请求、打包和付款。",
          "Xử lý đổi món, yêu cầu thêm, đóng gói và thanh toán bằng những câu ngắn, thực dụng.",
          "Resuelve cambios, peticiones, empaque y pago con frases cortas y útiles.",
          "Menangani perubahan, permintaan, bungkus, dan pembayaran dengan kalimat singkat yang praktis.",
          "ដោះស្រាយការផ្លាស់ប្តូរ សំណើ ការវេចខ្ចប់ និងការបង់ប្រាក់ដោយប្រើប្រយោគខ្លីៗដែលអាចប្រើបានភ្លាម។",
          "ပြောင်းလဲမှု၊ တောင်းဆိုမှု၊ ထုပ်ပိုးခြင်းနဲ့ ပေးချေခြင်းကို ဝါကျတိုတို အသုံးဝင်ဝင်နဲ့ ကိုင်တွယ်နိုင်အောင် လေ့ကျင့်ပါ။",
          "จัดการการเปลี่ยน ขอเพิ่มเติม แพ็กกลับ และจ่ายเงินด้วยประโยคสั้นที่ใช้ได้จริง",
          "Kendalikan perubahan, permintaan, pembungkusan, dan bayaran dengan ayat ringkas yang praktikal."
        ),
        samplePhrases: ["맵지 않게 해 주세요.", "계산해 주세요.", "따로 포장해 주세요."]
      },
      {
        dayRange: localized("Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Hari 23-30", "ថ្ងៃទី 23-30", "Day 23-30", "วันที่ 23-30", "Hari 23-30"),
        title: localized(
          "Problems and recovery",
          "トラブルと立て直し",
          "问题与补救",
          "Sự cố và xử lý tiếp",
          "Problemas y recuperación",
          "Masalah dan pemulihan",
          "បញ្ហា និងការស្តារស្ថានភាព",
          "ပြဿနာနဲ့ ပြန်ထိန်းခြင်း",
          "ปัญหาและการกู้สถานการณ์",
          "Masalah dan pemulihan situasi"
        ),
        outcome: localized(
          "Stay in the conversation during loss, cancellation, or urgent help situations.",
          "紛失、変更、緊急の助けが必要な場面でも会話から落ちないようにします。",
          "在丢失物品、取消变更或紧急求助时，也能继续把话接下去。",
          "Giữ được mạch nói khi mất đồ, đổi lịch hoặc cần nhờ giúp gấp.",
          "Mantente dentro de la conversación incluso al perder algo, cambiar un plan o pedir ayuda urgente.",
          "Tetap bisa melanjutkan percakapan saat kehilangan barang, mengganti rencana, atau membutuhkan bantuan mendesak.",
          "រក្សាការសន្ទនាឲ្យបន្តទៅបាន ទោះជានៅពេលបាត់បង់របស់ ផ្លាស់ប្តូរ ឬត្រូវការជំនួយបន្ទាន់ក៏ដោយ។",
          "ပစ္စည်းပျောက်ခြင်း၊ အစီအစဉ်ပြောင်းခြင်း ဒါမှမဟုတ် အရေးပေါ်အကူအညီလိုအပ်ချိန်မှာတောင် စကားပြောကို ဆက်ထိန်းနိုင်အောင် လေ့ကျင့်ပါ။",
          "ยังคุยต่อได้แม้ในสถานการณ์ของหาย เปลี่ยนแผน หรือจำเป็นต้องขอความช่วยเหลือด่วน",
          "Teruskan perbualan walaupun dalam situasi kehilangan barang, pembatalan, atau keperluan bantuan segera."
        ),
        samplePhrases: ["지갑을 잃어버렸어요.", "예약을 바꾸고 싶어요.", "도와주실 수 있어요?"]
      }
    ]
  },
  {
    id: "daily",
    title: localized(
      "Day 15-30 Everyday conversation extension",
      "Day 15-30 日常会話の拡張",
      "Day 15-30 日常会话扩展",
      "Day 15-30 Mở rộng hội thoại hằng ngày",
      "Day 15-30 Extensión de conversación diaria",
      "Day 15-30 Perluasan percakapan harian",
      "Day 15-30 ការពង្រីកសន្ទនាប្រចាំថ្ងៃ",
      "Day 15-30 နေ့စဉ်စကားပြော တိုးချဲ့လမ်းကြောင်း",
      "Day 15-30 ขยายบทสนทนาในชีวิตประจำวัน",
      "Day 15-30 Pengembangan perbualan harian"
    ),
    promise: localized(
      "Move beyond greetings into habits, plans, preferences, and short reactions that keep a daily conversation going.",
      "あいさつだけで終わらず、習慣、予定、好み、短い反応まで広げて日常会話を続けられるようにします。",
      "不只停留在打招呼，而是继续说习惯、计划、喜好和简短反应，让日常对话接得下去。",
      "Đi qua phần chào hỏi để nói tiếp về thói quen, kế hoạch, sở thích và phản ứng ngắn giúp cuộc trò chuyện hằng ngày tiếp tục.",
      "Ve más allá del saludo y entra en hábitos, planes, gustos y reacciones breves para sostener una conversación diaria.",
      "Melampaui salam awal menuju kebiasaan, rencana, preferensi, dan reaksi singkat yang menjaga percakapan harian tetap hidup.",
      "ទៅឆ្ងាយជាងការសួរសុខទុក្ខ ដល់ទម្លាប់ ផែនការ ចំណូលចិត្ត និងប្រតិកម្មខ្លីៗដែលធ្វើឲ្យសន្ទនាប្រចាំថ្ងៃបន្តទៅបាន។",
      "နှုတ်ဆက်တာနဲ့မရပ်ဘဲ အလေ့အထ၊ အစီအစဉ်၊ ကြိုက်နှစ်သက်မှုနဲ့ တုံ့ပြန်စကားတိုတွေထိ ဆက်ပြီး နေ့စဉ်စကားပြောကို သွားအောင်လုပ်ပါ။",
      "ก้าวเลยจากการทักทายไปสู่การพูดเรื่องนิสัย แผน ความชอบ และการตอบสนองสั้นๆ ที่ทำให้บทสนทนาประจำวันไหลต่อได้",
      "Bergerak lebih jauh daripada ucapan salam kepada tabiat, rancangan, pilihan, dan reaksi ringkas yang mengekalkan perbualan harian."
    ),
    modules: [
      {
        dayRange: localized("Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Hari 15-18", "ថ្ងៃទី 15-18", "Day 15-18", "วันที่ 15-18", "Hari 15-18"),
        title: localized(
          "Light small talk",
          "軽い雑談",
          "轻松寒暄",
          "Tán chuyện nhẹ",
          "Charla ligera",
          "Obrolan ringan",
          "ការសន្ទនាស្រាលៗ",
          "စကားပေါ့ပေါ့ပါးပါး",
          "คุยเล่นเบาๆ",
          "Sembang ringan"
        ),
        outcome: localized(
          "Connect a first greeting to one more natural sentence instead of stopping after hello.",
          "あいさつだけで止まらず、もう一文自然につなげられるようにします。",
          "不只说完你好就停下，而是自然地再接上一句。",
          "Nối lời chào đầu tiên sang thêm một câu tự nhiên nữa thay vì dừng lại sau khi chào.",
          "Conecta el saludo inicial con una frase más natural en vez de detenerte después del hola.",
          "Menghubungkan salam pertama ke satu kalimat alami berikutnya, bukan berhenti setelah menyapa.",
          "ភ្ជាប់ការសួរសុខទុក្ខដំបូងទៅប្រយោគធម្មជាតិមួយទៀត ជំនួសឲ្យឈប់ត្រឹមពាក្យសួរសុខទុក្ខ។",
          "နှုတ်ဆက်ပြီးတာနဲ့ မရပ်ဘဲ သဘာဝကျတဲ့ နောက်ဝါကျတစ်ကြောင်းကို ဆက်ပြောနိုင်အောင် လေ့ကျင့်ပါ။",
          "ต่อจากคำทักทายแรกไปสู่ประโยคธรรมชาติอีกหนึ่งประโยค แทนที่จะหยุดแค่สวัสดี",
          "Sambungkan ucapan salam pertama kepada satu lagi ayat yang lebih semula jadi, bukan berhenti selepas sapaan."
        ),
        samplePhrases: ["오늘 날씨 좋네요.", "요즘 어떻게 지내세요?", "저도 좋아해요."]
      },
      {
        dayRange: localized("Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Hari 19-22", "ថ្ងៃទី 19-22", "Day 19-22", "วันที่ 19-22", "Hari 19-22"),
        title: localized(
          "Plans and timing",
          "予定と時間",
          "计划与时间",
          "Kế hoạch và thời gian",
          "Planes y horarios",
          "Rencana dan waktu",
          "ផែនការ និងពេលវេលា",
          "အစီအစဉ်နဲ့ အချိန်",
          "แผนและเวลา",
          "Rancangan dan masa"
        ),
        outcome: localized(
          "Set a time, move an appointment, and react naturally when something changes.",
          "時間を決め、予定を動かし、変更が出ても自然に反応できるようにします。",
          "学会约时间、改时间，并在事情变化时自然回应。",
          "Chốt giờ hẹn, dời lịch và phản ứng tự nhiên khi có thay đổi.",
          "Fija una hora, mueve una cita y reacciona con naturalidad cuando algo cambia.",
          "Menentukan waktu, memindahkan janji, dan bereaksi alami ketika ada perubahan.",
          "កំណត់ម៉ោង ផ្លាស់ប្តូរការណាត់ ហើយឆ្លើយតបបានធម្មជាតិនៅពេលមានអ្វីផ្លាស់ប្តូរ។",
          "အချိန်ချိန်းခြင်း၊ ချိန်းဆိုမှုရွှေ့ခြင်းနဲ့ အပြောင်းအလဲရှိလာချိန် သဘာဝကျကျ တုံ့ပြန်နိုင်အောင် လေ့ကျင့်ပါ။",
          "นัดเวลา เลื่อนนัด และตอบสนองอย่างเป็นธรรมชาติเมื่อมีอะไรเปลี่ยน",
          "Tetapkan masa, alihkan janji temu, dan beri reaksi secara semula jadi apabila ada perubahan."
        ),
        samplePhrases: ["몇 시에 만날까요?", "조금 늦을 것 같아요.", "내일 괜찮으세요?"]
      },
      {
        dayRange: localized("Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Hari 23-30", "ថ្ងៃទី 23-30", "Day 23-30", "วันที่ 23-30", "Hari 23-30"),
        title: localized(
          "Preferences and reactions",
          "好みと反応",
          "喜好与反应",
          "Sở thích và phản ứng",
          "Gustos y reacciones",
          "Preferensi dan reaksi",
          "ចំណូលចិត្ត និងប្រតិកម្ម",
          "ကြိုက်နှစ်သက်မှုနဲ့ တုံ့ပြန်မှု",
          "ความชอบและการตอบสนอง",
          "Pilihan dan reaksi"
        ),
        outcome: localized(
          "Say what you like and give short natural responses that sound warmer and less textbook.",
          "好きなものを言い、教科書っぽすぎない短く自然な反応を返せるようにします。",
          "说出自己的喜好，并给出更自然、更有人味的短回应。",
          "Nói điều mình thích và đưa ra những phản ứng ngắn tự nhiên, bớt cảm giác sách giáo khoa.",
          "Di lo que te gusta y responde con frases breves más cálidas y menos acartonadas.",
          "Mengatakan apa yang kamu suka dan memberi respons singkat yang lebih hangat dan alami.",
          "និយាយអំពីអ្វីដែលអ្នកចូលចិត្ត និងឆ្លើយតបខ្លីៗដែលស្តាប់ទៅធម្មជាតិ និងកក់ក្តៅជាងមុន។",
          "ကိုယ်ကြိုက်တာကို ပြောပြီး စာအုပ်သင်ခန်းစာဆန်လွန်းမနေတဲ့ နွေးထွေးတဲ့ တုံ့ပြန်စကားတိုတိုကို ပေးနိုင်အောင် လေ့ကျင့်ပါ။",
          "พูดสิ่งที่ชอบและตอบสั้นๆ แบบธรรมชาติที่ฟังอบอุ่นและไม่แข็งเหมือนตำรา",
          "Nyatakan apa yang anda suka dan beri respons ringkas yang lebih hangat serta kurang kaku seperti buku teks."
        ),
        samplePhrases: ["이거 정말 좋아해요.", "분위기 좋네요.", "다음에 같이 가요."]
      }
    ]
  },
  {
    id: "study",
    title: localized(
      "Day 15-30 Study and TOPIK starter path",
      "Day 15-30 学習とTOPIK入門",
      "Day 15-30 学习与TOPIK入门",
      "Day 15-30 Lộ trình học và khởi động TOPIK",
      "Day 15-30 Ruta de estudio e inicio de TOPIK",
      "Day 15-30 Jalur belajar dan awal TOPIK",
      "Day 15-30 ផ្លូវរៀន និងការត្រៀម TOPIK ដំបូង",
      "Day 15-30 လေ့လာရေးနဲ့ TOPIK စတင်လမ်းကြောင်း",
      "Day 15-30 เส้นทางการเรียนและเริ่มต้น TOPIK",
      "Day 15-30 Laluan belajar dan permulaan TOPIK"
    ),
    promise: localized(
      "Practice the questions and checks you need for class, assignments, and preparing for tests.",
      "授業、課題、試験準備に必要な質問と確認の言い方を練習します。",
      "练习上课、作业和备考时真正需要的提问与确认表达。",
      "Luyện những câu hỏi và câu kiểm tra bạn cần cho lớp học, bài tập và chuẩn bị kiểm tra.",
      "Practica las preguntas y comprobaciones que necesitas para clase, tareas y preparación de exámenes.",
      "Latih pertanyaan dan pengecekan yang kamu perlukan untuk kelas, tugas, dan persiapan ujian.",
      "ហាត់សំណួរ និងការបញ្ជាក់ដែលអ្នកត្រូវការសម្រាប់ថ្នាក់រៀន កិច្ចការ និងការត្រៀមប្រឡង។",
      "အတန်း၊ အိမ်စာနဲ့ စာမေးပွဲပြင်ဆင်မှုအတွက် တကယ်လိုအပ်တဲ့ မေးခွန်းနဲ့ စစ်ဆေးစကားတွေကို လေ့ကျင့်ပါ။",
      "ฝึกคำถามและประโยคเช็กความเข้าใจที่ต้องใช้ในห้องเรียน งานที่ได้รับ และการเตรียมสอบ",
      "Latih soalan dan semakan yang anda perlukan untuk kelas, tugasan, dan persediaan ujian."
    ),
    modules: [
      {
        dayRange: localized("Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Hari 15-18", "ថ្ងៃទី 15-18", "Day 15-18", "วันที่ 15-18", "Hari 15-18"),
        title: localized(
          "Asking in class",
          "授業で質問する",
          "课堂提问",
          "Hỏi trong lớp",
          "Preguntar en clase",
          "Bertanya di kelas",
          "ការសួរក្នុងថ្នាក់",
          "အတန်းထဲမှာ မေးခြင်း",
          "การถามในห้องเรียน",
          "Bertanya di kelas"
        ),
        outcome: localized(
          "Ask again, request clarification, and check what you missed without shutting down.",
          "もう一度たずねたり、説明を求めたり、聞き逃した部分を確認したりできるようにします。",
          "学会重问、请对方说明，并确认自己漏掉的部分，而不是直接卡住。",
          "Hỏi lại, xin giải thích thêm và kiểm tra phần mình bỏ lỡ mà không bị khựng.",
          "Pide que repitan, solicita aclaraciones y verifica lo que te perdiste sin bloquearte.",
          "Bisa meminta pengulangan, klarifikasi, dan mengecek bagian yang terlewat tanpa menutup diri.",
          "សួរឡើងវិញ សុំការពន្យល់បន្ថែម និងពិនិត្យមើលអ្វីដែលអ្នកខកខាន ដោយមិនបិទខ្លួនឯង។",
          "ပြန်မေးခြင်း၊ ရှင်းပြချက်တောင်းခြင်းနဲ့ ကိုယ်လွတ်သွားတာကို စစ်ဆေးခြင်းကို မပိတ်မိဘဲ လုပ်နိုင်အောင် လေ့ကျင့်ပါ။",
          "ถามซ้ำ ขอคำอธิบายเพิ่ม และเช็กส่วนที่พลาดไปได้โดยไม่หลุดจากบทสนทนา",
          "Tanya semula, minta penjelasan, dan semak bahagian yang terlepas tanpa terus terhenti."
        ),
        samplePhrases: ["이 부분을 다시 설명해 주세요.", "질문이 있어요.", "숙제가 뭐예요?"]
      },
      {
        dayRange: localized("Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Hari 19-22", "ថ្ងៃទី 19-22", "Day 19-22", "วันที่ 19-22", "Hari 19-22"),
        title: localized(
          "Study plans",
          "学習計画",
          "学习计划",
          "Kế hoạch học",
          "Planes de estudio",
          "Rencana belajar",
          "ផែនការរៀន",
          "လေ့လာရေးအစီအစဉ်",
          "แผนการเรียน",
          "Rancangan belajar"
        ),
        outcome: localized(
          "Talk about test dates, study time, and your learning goals in a simple way.",
          "試験日、勉強時間、学習目標についてシンプルに話せるようにします。",
          "用简单的话说出考试日期、学习时间和自己的学习目标。",
          "Nói đơn giản về ngày kiểm tra, thời gian học và mục tiêu học của bạn.",
          "Habla de fechas de examen, tiempo de estudio y metas de aprendizaje de forma sencilla.",
          "Membicarakan tanggal ujian, waktu belajar, dan target belajarmu dengan cara sederhana.",
          "និយាយអំពីថ្ងៃប្រឡង ពេលរៀន និងគោលដៅរៀនរបស់អ្នកដោយសាមញ្ញ។",
          "စာမေးပွဲရက်၊ စာလေ့လာချိန်နဲ့ ကိုယ့်ရည်မှန်းချက်ကို ရိုးရိုးရှင်းရှင်းပြောနိုင်အောင် လေ့ကျင့်ပါ။",
          "พูดเรื่องวันสอบ เวลาเรียน และเป้าหมายการเรียนของตัวเองแบบง่ายๆ ได้",
          "Bercakap tentang tarikh ujian, masa belajar, dan matlamat pembelajaran anda dengan cara yang mudah."
        ),
        samplePhrases: ["TOPIK을 준비하고 있어요.", "매일 조금씩 공부해요.", "시험이 언제예요?"]
      },
      {
        dayRange: localized("Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Hari 23-30", "ថ្ងៃទី 23-30", "Day 23-30", "วันที่ 23-30", "Hari 23-30"),
        title: localized(
          "Campus life",
          "学校生活",
          "校园生活",
          "Đời sống học đường",
          "Vida en el campus",
          "Kehidupan kampus",
          "ជីវិតក្នុងសាលា",
          "ကျောင်းဝင်းထဲက နေထိုင်မှု",
          "ชีวิตในสถาบันการศึกษา",
          "Kehidupan kampus"
        ),
        outcome: localized(
          "Use the phrases you need for the library, office, and school administration.",
          "図書館、事務室、学校の手続きで必要な表現を使えるようにします。",
          "学会在图书馆、办公室和学校行政场景中使用需要的表达。",
          "Dùng được những câu bạn cần ở thư viện, văn phòng và các thủ tục trường học.",
          "Usa las frases que necesitas para biblioteca, oficina y trámites escolares.",
          "Menggunakan frasa yang kamu perlukan di perpustakaan, kantor, dan administrasi sekolah.",
          "ប្រើប្រយោគដែលអ្នកត្រូវការនៅបណ្ណាល័យ ការិយាល័យ និងការងាររដ្ឋបាលសាលា។",
          "စာကြည့်တိုက်၊ ရုံးနဲ့ ကျောင်းအုပ်ချုပ်ရေးကိစ္စတွေမှာ လိုတဲ့ စကားတွေကို သုံးနိုင်အောင် လေ့ကျင့်ပါ။",
          "ใช้ประโยคที่ต้องการในห้องสมุด สำนักงาน และงานธุรการของสถานศึกษาได้",
          "Gunakan frasa yang anda perlukan untuk perpustakaan, pejabat, dan urusan pentadbiran sekolah."
        ),
        samplePhrases: ["도서관이 어디에 있어요?", "신청하고 싶어요.", "확인 부탁드립니다."]
      }
    ]
  },
  {
    id: "work",
    title: localized(
      "Day 15-30 Work and job-site Korean",
      "Day 15-30 仕事と現場の韓国語",
      "Day 15-30 工作与现场韩语",
      "Day 15-30 Tiếng Hàn cho công việc và nơi làm",
      "Day 15-30 Coreano para trabajo y lugar laboral",
      "Day 15-30 Bahasa Korea untuk kerja dan tempat kerja",
      "Day 15-30 ភាសាកូរ៉េសម្រាប់ការងារ និងកន្លែងធ្វើការ",
      "Day 15-30 အလုပ်နဲ့ လုပ်ငန်းခွင်သုံး ကိုရီးယားစကား",
      "Day 15-30 ภาษาเกาหลีสำหรับงานและสถานที่ทำงาน",
      "Day 15-30 Bahasa Korea untuk kerja dan tapak kerja"
    ),
    promise: localized(
      "Use short, clear Korean for attendance, timing, safety, and practical requests at work.",
      "出勤、時間、安全、実務的な依頼に使える短くて明確な韓国語を身につけます。",
      "练习在工作中用于出勤、时间、安全和实际请求的短而清楚的韩语。",
      "Dùng tiếng Hàn ngắn gọn, rõ ràng cho chấm công, thời gian, an toàn và các yêu cầu thực tế ở nơi làm việc.",
      "Usa coreano breve y claro para asistencia, horarios, seguridad y peticiones prácticas en el trabajo.",
      "Gunakan bahasa Korea yang singkat dan jelas untuk kehadiran, waktu, keselamatan, dan permintaan praktis di tempat kerja.",
      "ប្រើភាសាកូរ៉េខ្លីៗ និងច្បាស់សម្រាប់ការចូលធ្វើការ ពេលវេលា សុវត្ថិភាព និងសំណើការងារជាក់ស្តែង។",
      "အလုပ်မှာ တက်ရောက်မှု၊ အချိန်၊ လုံခြုံရေးနဲ့ လက်တွေ့တောင်းဆိုမှုတွေအတွက် ကိုရီးယားလိုတိုတိုရှင်းရှင်းကို သုံးနိုင်အောင် လေ့ကျင့်ပါ။",
      "ใช้ภาษาเกาหลีสั้นๆ ชัดๆ สำหรับการเข้างาน เวลา ความปลอดภัย และคำขอที่ใช้จริงในที่ทำงาน",
      "Gunakan bahasa Korea yang ringkas dan jelas untuk kehadiran, masa, keselamatan, dan permintaan praktikal di tempat kerja."
    ),
    modules: [
      {
        dayRange: localized("Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Hari 15-18", "ថ្ងៃទី 15-18", "Day 15-18", "วันที่ 15-18", "Hari 15-18"),
        title: localized(
          "Arrival and schedule",
          "出勤と予定",
          "到岗与安排",
          "Đến nơi và lịch làm",
          "Llegada y horario",
          "Kedatangan dan jadwal",
          "ការមកដល់ និងកាលវិភាគ",
          "ရောက်ရှိခြင်းနဲ့ အချိန်ဇယား",
          "การมาถึงและตารางงาน",
          "Ketibaan dan jadual"
        ),
        outcome: localized(
          "Say when you are arriving, when you may be late, and when work starts.",
          "いつ着くか、遅れそうか、仕事が何時に始まるかを言えるようにします。",
          "学会说自己什么时候到、会不会晚、工作几点开始。",
          "Nói được lúc bạn đến, lúc bạn có thể trễ và lúc công việc bắt đầu.",
          "Di a qué hora llegas, si podrías retrasarte y cuándo empieza el trabajo.",
          "Bisa mengatakan kapan kamu tiba, kapan mungkin terlambat, dan kapan kerja dimulai.",
          "និយាយបានថាអ្នកមកដល់ពេលណា អាចយឺតពេលណា និងការងារចាប់ផ្តើមពេលណា។",
          "ဘယ်အချိန်ရောက်မလဲ၊ နောက်ကျနိုင်မလား၊ အလုပ်ဘယ်အချိန်စမလဲဆိုတာ ပြောနိုင်အောင် လေ့ကျင့်ပါ။",
          "พูดได้ว่าจะมาถึงเมื่อไร อาจจะสายไหม และงานเริ่มเมื่อไร",
          "Nyatakan bila anda tiba, bila mungkin lewat, dan bila kerja bermula."
        ),
        samplePhrases: ["지금 가고 있어요.", "조금 늦을 것 같아요.", "몇 시에 시작해요?"]
      },
      {
        dayRange: localized("Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Hari 19-22", "ថ្ងៃទី 19-22", "Day 19-22", "วันที่ 19-22", "Hari 19-22"),
        title: localized(
          "Task requests",
          "作業の依頼",
          "工作请求",
          "Yêu cầu về việc làm",
          "Peticiones de tarea",
          "Permintaan tugas",
          "សំណើការងារ",
          "အလုပ်တာဝန်တောင်းဆိုမှု",
          "คำขอเกี่ยวกับงาน",
          "Permintaan tugasan"
        ),
        outcome: localized(
          "Ask someone to show you again, explain more slowly, or confirm the task clearly.",
          "もう一度見せてもらったり、ゆっくり説明してもらったり、作業内容をはっきり確認したりできるようにします。",
          "学会请别人再示范一次、慢一点说明，或把任务确认清楚。",
          "Biết cách nhờ người khác chỉ lại, giải thích chậm hơn hoặc xác nhận rõ nhiệm vụ.",
          "Pide que te muestren otra vez, expliquen más despacio o confirmen claramente la tarea.",
          "Meminta orang lain menunjukkan lagi, menjelaskan lebih lambat, atau mengonfirmasi tugas dengan jelas.",
          "សុំឲ្យគេបង្ហាញម្តងទៀត ពន្យល់យឺតជាងមុន ឬបញ្ជាក់ការងារឲ្យច្បាស់បាន។",
          "တစ်ခါထပ်ပြပေးဖို့၊ ပိုဖြည်းဖြည်းရှင်းပြဖို့၊ ဒါမှမဟုတ် အလုပ်တာဝန်ကို ရှင်းရှင်းလင်းလင်း အတည်ပြုဖို့ မေးနိုင်အောင် လေ့ကျင့်ပါ။",
          "ขอให้เขาแสดงอีกครั้ง อธิบายช้าลง หรือยืนยันงานให้ชัดเจนได้",
          "Minta orang lain tunjuk sekali lagi, jelaskan dengan lebih perlahan, atau sahkan tugasan dengan jelas."
        ),
        samplePhrases: ["한 번만 더 보여 주세요.", "제가 다시 볼게요.", "이렇게 하면 돼요?"]
      },
      {
        dayRange: localized("Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Hari 23-30", "ថ្ងៃទី 23-30", "Day 23-30", "วันที่ 23-30", "Hari 23-30"),
        title: localized(
          "Safety and urgent help",
          "安全と緊急対応",
          "安全与紧急求助",
          "An toàn và nhờ giúp khẩn",
          "Seguridad y ayuda urgente",
          "Keselamatan dan bantuan mendesak",
          "សុវត្ថិភាព និងជំនួយបន្ទាន់",
          "လုံခြုံရေးနဲ့ အရေးပေါ်အကူအညီ",
          "ความปลอดภัยและการขอความช่วยเหลือด่วน",
          "Keselamatan dan bantuan segera"
        ),
        outcome: localized(
          "Call for help, explain pain or danger, and respond quickly in tense moments.",
          "助けを呼び、痛みや危険を伝え、緊張した場面でもすばやく反応できるようにします。",
          "学会呼救、说明疼痛或危险，并在紧张时刻快速回应。",
          "Gọi trợ giúp, nói rõ đau ở đâu hoặc có nguy hiểm gì và phản ứng nhanh khi tình huống căng thẳng.",
          "Pide ayuda, explica dolor o peligro y responde rápido en momentos tensos.",
          "Memanggil bantuan, menjelaskan rasa sakit atau bahaya, dan merespons cepat dalam situasi tegang.",
          "ហៅជំនួយ ពន្យល់អំពីការឈឺចាប់ ឬគ្រោះថ្នាក់ និងឆ្លើយតបទាន់ពេលក្នុងពេលតានតឹង។",
          "အကူအညီခေါ်ခြင်း၊ နာကျင်မှု သို့မဟုတ် အန္တရာယ်ကို ရှင်းပြခြင်းနဲ့ တင်းကျပ်တဲ့အချိန်မှာ မြန်မြန်တုံ့ပြန်နိုင်အောင် လေ့ကျင့်ပါ။",
          "เรียกขอความช่วยเหลือ อธิบายอาการเจ็บหรืออันตราย และตอบสนองได้เร็วในช่วงตึงเครียด",
          "Panggil bantuan, jelaskan kesakitan atau bahaya, dan beri respons cepat dalam saat tegang."
        ),
        samplePhrases: ["몸이 안 좋아요.", "위험해요.", "관리자분을 불러 주세요."]
      }
    ]
  },
  {
    id: "life",
    title: localized(
      "Day 15-30 Living in Korea path",
      "Day 15-30 韓国生活ルート",
      "Day 15-30 韩国生活路线",
      "Day 15-30 Lộ trình sống ở Hàn Quốc",
      "Day 15-30 Ruta para vivir en Corea",
      "Day 15-30 Jalur hidup di Korea",
      "Day 15-30 ផ្លូវសម្រាប់រស់នៅកូរ៉េ",
      "Day 15-30 ကိုရီးယားမှာ နေထိုင်ရေးလမ်းကြောင်း",
      "Day 15-30 เส้นทางการใช้ชีวิตในเกาหลี",
      "Day 15-30 Laluan kehidupan di Korea"
    ),
    promise: localized(
      "Prepare the core phrases you need for hospitals, housing, offices, and daily admin situations.",
      "病院、住まい、役所、日常の手続きで必要な中核フレーズを準備します。",
      "准备你在医院、住房、办公室和日常行政场景中需要的核心句子。",
      "Chuẩn bị những câu cốt lõi bạn cần cho bệnh viện, nhà ở, văn phòng và các thủ tục hằng ngày.",
      "Prepara las frases clave que necesitas para hospitales, vivienda, oficinas y trámites diarios.",
      "Siapkan frasa inti yang kamu butuhkan untuk rumah sakit, tempat tinggal, kantor, dan urusan harian.",
      "ត្រៀមប្រយោគស្នូលដែលអ្នកត្រូវការសម្រាប់មន្ទីរពេទ្យ លំនៅដ្ឋាន ការិយាល័យ និងការងាររដ្ឋបាលប្រចាំថ្ងៃ។",
      "ဆေးရုံ၊ နေထိုင်ရေး၊ ရုံးနဲ့ နေ့စဉ်အုပ်ချုပ်ရေးကိစ္စတွေအတွက် လိုအပ်တဲ့ အဓိကဝါကျတွေကို ပြင်ဆင်ပါ။",
      "เตรียมประโยคหลักที่ต้องใช้ในโรงพยาบาล ที่พัก สำนักงาน และงานเอกสารในชีวิตประจำวัน",
      "Sediakan frasa teras yang anda perlukan untuk hospital, tempat tinggal, pejabat, dan urusan harian."
    ),
    modules: [
      {
        dayRange: localized("Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Hari 15-18", "ថ្ងៃទី 15-18", "Day 15-18", "วันที่ 15-18", "Hari 15-18"),
        title: localized(
          "Home and neighborhood",
          "家と近所",
          "住处与附近",
          "Nhà ở và khu quanh nhà",
          "Casa y vecindario",
          "Rumah dan sekitar",
          "ផ្ទះ និងតំបន់ជុំវិញ",
          "အိမ်နဲ့ ပတ်ဝန်းကျင်",
          "บ้านและละแวกใกล้เคียง",
          "Rumah dan kawasan sekitar"
        ),
        outcome: localized(
          "Ask about addresses, deliveries, and nearby places without getting stuck.",
          "住所、配達、近くの場所について自然にたずねられるようにします。",
          "学会顺畅询问地址、配送和附近地点。",
          "Hỏi được về địa chỉ, giao hàng và những nơi gần đó mà không bị khựng.",
          "Pregunta por direcciones, entregas y lugares cercanos sin trabarte.",
          "Menanyakan alamat, pengantaran, dan tempat terdekat tanpa tersendat.",
          "សួរអំពីអាសយដ្ឋាន ការដឹកជញ្ជូន និងកន្លែងនៅជិតៗបានដោយមិនជាប់គាំង។",
          "လိပ်စာ၊ ပို့ဆောင်မှုနဲ့ နီးနားနေရာတွေကို မတုံ့ဆိုင်းဘဲ မေးနိုင်အောင် လေ့ကျင့်ပါ။",
          "ถามที่อยู่ การจัดส่ง และสถานที่ใกล้เคียงได้โดยไม่ติดขัด",
          "Tanya tentang alamat, penghantaran, dan tempat berdekatan tanpa tersekat."
        ),
        samplePhrases: ["이 주소가 맞아요?", "근처에 마트가 있어요?", "배달 가능해요?"]
      },
      {
        dayRange: localized("Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Hari 19-22", "ថ្ងៃទី 19-22", "Day 19-22", "วันที่ 19-22", "Hari 19-22"),
        title: localized(
          "Hospital and pharmacy",
          "病院と薬局",
          "医院与药店",
          "Bệnh viện và hiệu thuốc",
          "Hospital y farmacia",
          "Rumah sakit dan apotek",
          "មន្ទីរពេទ្យ និងហាងឱសថ",
          "ဆေးရုံနဲ့ ဆေးဆိုင်",
          "โรงพยาบาลและร้านขายยา",
          "Hospital dan farmasi"
        ),
        outcome: localized(
          "Explain symptoms and ask for the next step more clearly.",
          "症状を説明し、次にどうすればいいかをよりはっきり聞けるようにします。",
          "更清楚地说明症状，并问下一步该怎么办。",
          "Nói rõ triệu chứng và hỏi bước tiếp theo một cách rõ ràng hơn.",
          "Explica síntomas y pregunta con claridad cuál es el siguiente paso.",
          "Menjelaskan gejala dan menanyakan langkah berikutnya dengan lebih jelas.",
          "ពន្យល់អំពីរោគសញ្ញា និងសួរអំពីជំហានបន្ទាប់បានច្បាស់ជាងមុន។",
          "ရောဂါလက္ခဏာကို ပိုရှင်းရှင်းပြောပြီး နောက်ဘာလုပ်ရမလဲကို ပိုသေချာစွာ မေးနိုင်အောင် လေ့ကျင့်ပါ။",
          "อธิบายอาการและถามขั้นตอนถัดไปได้ชัดเจนขึ้น",
          "Jelaskan gejala dan tanya langkah seterusnya dengan lebih jelas."
        ),
        samplePhrases: ["머리가 아파요.", "약을 먹고 있어요.", "예약해야 해요?"]
      },
      {
        dayRange: localized("Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Hari 23-30", "ថ្ងៃទី 23-30", "Day 23-30", "วันที่ 23-30", "Hari 23-30"),
        title: localized(
          "Office and paperwork",
          "窓口と書類",
          "窗口与文件",
          "Văn phòng và giấy tờ",
          "Oficina y documentos",
          "Kantor dan dokumen",
          "ការិយាល័យ និងឯកសារ",
          "ရုံးနဲ့ စာရွက်စာတမ်း",
          "สำนักงานและเอกสาร",
          "Pejabat dan dokumen"
        ),
        outcome: localized(
          "Request, confirm, and submit documents with less hesitation.",
          "書類の依頼、確認、提出をためらわずにできるようにします。",
          "学会更少犹豫地请求、确认并提交文件。",
          "Biết cách yêu cầu, xác nhận và nộp giấy tờ với ít do dự hơn.",
          "Pide, confirma y entrega documentos con menos vacilación.",
          "Meminta, mengonfirmasi, dan menyerahkan dokumen dengan lebih mantap.",
          "ស្នើសុំ បញ្ជាក់ និងដាក់ស្នើឯកសារបានដោយមិនស្ទាក់ស្ទើរពេក។",
          "စာရွက်စာတမ်းတောင်းခြင်း၊ အတည်ပြုခြင်းနဲ့ တင်သွင်းခြင်းကို ယုံယုံကြည်ကြည် ပိုလုပ်နိုင်အောင် လေ့ကျင့်ပါ။",
          "ขอ ยืนยัน และยื่นเอกสารได้โดยลังเลน้อยลง",
          "Minta, sahkan, dan serahkan dokumen dengan kurang teragak-agak."
        ),
        samplePhrases: ["통장을 만들고 싶어요.", "이 서류가 필요해요?", "확인해 주세요."]
      }
    ]
  },
  {
    id: "k-content",
    title: localized(
      "Day 15-30 K-content conversation path",
      "Day 15-30 Kコンテンツ会話ルート",
      "Day 15-30 韩流内容会话路线",
      "Day 15-30 Lộ trình trò chuyện về K-content",
      "Day 15-30 Ruta de conversación sobre contenido coreano",
      "Day 15-30 Jalur percakapan K-content",
      "Day 15-30 ផ្លូវសន្ទនាអំពី K-content",
      "Day 15-30 K-content စကားပြောလမ်းကြောင်း",
      "Day 15-30 เส้นทางบทสนทนาเกี่ยวกับ K-content",
      "Day 15-30 Laluan perbualan K-content"
    ),
    promise: localized(
      "Talk about what you like, ask for recommendations, and share short reactions about Korean content.",
      "好きなものを話し、おすすめを聞き、韓国コンテンツについて短い感想を共有できるようにします。",
      "说你喜欢什么、问推荐什么，并分享对韩流内容的简短反应。",
      "Nói về điều bạn thích, hỏi gợi ý và chia sẻ phản ứng ngắn về nội dung Hàn Quốc.",
      "Habla de lo que te gusta, pide recomendaciones y comparte reacciones breves sobre contenido coreano.",
      "Bicarakan hal yang kamu suka, minta rekomendasi, dan bagikan reaksi singkat tentang konten Korea.",
      "និយាយអំពីអ្វីដែលអ្នកចូលចិត្ត សួរអំពីអ្វីដែលគេណែនាំ និងចែករំលែកប្រតិកម្មខ្លីៗអំពីមាតិកាកូរ៉េ។",
      "ကိုယ်ကြိုက်တာကို ပြော၊ အကြံပြုချက်တောင်းပြီး ကိုရီးယား content အကြောင်း တုံ့ပြန်ချက်တိုတိုကို မျှဝေနိုင်အောင် လေ့ကျင့်ပါ။",
      "พูดถึงสิ่งที่ชอบ ขอคำแนะนำ และแชร์ความรู้สึกสั้นๆ เกี่ยวกับคอนเทนต์เกาหลี",
      "Bercakap tentang apa yang anda suka, minta cadangan, dan kongsi reaksi ringkas tentang kandungan Korea."
    ),
    modules: [
      {
        dayRange: localized("Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Day 15-18", "Hari 15-18", "ថ្ងៃទី 15-18", "Day 15-18", "วันที่ 15-18", "Hari 15-18"),
        title: localized(
          "Saying what you like",
          "好きなものを言う",
          "说出自己的喜好",
          "Nói điều bạn thích",
          "Decir lo que te gusta",
          "Mengatakan apa yang kamu suka",
          "និយាយអំពីអ្វីដែលអ្នកចូលចិត្ត",
          "ကိုယ်ကြိုက်တာကို ပြောခြင်း",
          "พูดสิ่งที่ตัวเองชอบ",
          "Mengatakan apa yang anda suka"
        ),
        outcome: localized(
          "Express your taste in songs, dramas, or shows with simple natural Korean.",
          "歌、ドラマ、番組の好みをシンプルで自然な韓国語で言えるようにします。",
          "用简单自然的韩语说出你对歌曲、韩剧或节目的喜好。",
          "Diễn đạt sở thích về bài hát, phim hay chương trình bằng tiếng Hàn đơn giản và tự nhiên.",
          "Expresa tus gustos en canciones, dramas o programas con coreano simple y natural.",
          "Mengekspresikan selera musik, drama, atau acara dengan bahasa Korea yang sederhana dan alami.",
          "បង្ហាញចំណូលចិត្តរបស់អ្នកចំពោះបទចម្រៀង រឿងភាគ ឬកម្មវិធី ដោយប្រើភាសាកូរ៉េសាមញ្ញ និងធម្មជាតិ។",
          "သီချင်း၊ ဒရာမာ၊ အစီအစဉ်တွေအပေါ် ကိုယ့်အကြိုက်ကို ရိုးရှင်းပြီး သဘာဝကျတဲ့ ကိုရီးယားလိုနဲ့ ပြောနိုင်အောင် လေ့ကျင့်ပါ။",
          "บอกความชอบต่อเพลง ซีรีส์ หรือรายการต่างๆ ด้วยภาษาเกาหลีที่ง่ายและเป็นธรรมชาติ",
          "Nyatakan cita rasa anda terhadap lagu, drama, atau rancangan dengan bahasa Korea yang mudah dan semula jadi."
        ),
        samplePhrases: ["이 노래 좋아해요.", "요즘 이 드라마를 봐요.", "가사가 좋아요."]
      },
      {
        dayRange: localized("Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Day 19-22", "Hari 19-22", "ថ្ងៃទី 19-22", "Day 19-22", "วันที่ 19-22", "Hari 19-22"),
        title: localized(
          "Asking for recommendations",
          "おすすめを聞く",
          "询问推荐",
          "Hỏi gợi ý",
          "Pedir recomendaciones",
          "Meminta rekomendasi",
          "សួរអំពីអ្វីដែលគេណែនាំ",
          "အကြံပြုချက်တောင်းခြင်း",
          "ขอคำแนะนำ",
          "Meminta cadangan"
        ),
        outcome: localized(
          "Receive suggestions, ask where to watch, and react without sounding stiff.",
          "おすすめを受け取り、どこで見られるかを聞き、かたくなりすぎず反応できるようにします。",
          "学会接收推荐、问在哪里能看，并自然回应不显得生硬。",
          "Nhận gợi ý, hỏi xem ở đâu và phản ứng lại một cách tự nhiên.",
          "Recibe sugerencias, pregunta dónde verlo y reacciona sin sonar rígido.",
          "Menerima saran, menanyakan tempat menonton, dan merespons tanpa terdengar kaku.",
          "ទទួលយោបល់ សួរថាមើលនៅណា ហើយឆ្លើយតបបានធម្មជាតិដោយមិនរឹង។",
          "အကြံပြုချက်ကို လက်ခံ၊ ဘယ်မှာကြည့်ရမလဲ မေးပြီး မတင်းမာဘဲ တုံ့ပြန်နိုင်အောင် လေ့ကျင့်ပါ။",
          "รับคำแนะนำ ถามว่าดูที่ไหน และตอบกลับได้โดยไม่ฟังดูแข็ง",
          "Terima cadangan, tanya di mana hendak menonton, dan beri reaksi tanpa kedengaran kaku."
        ),
        samplePhrases: ["추천해 주세요.", "어디에서 볼 수 있어요?", "재미있을 것 같아요."]
      },
      {
        dayRange: localized("Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Day 23-30", "Hari 23-30", "ថ្ងៃទី 23-30", "Day 23-30", "วันที่ 23-30", "Hari 23-30"),
        title: localized(
          "Sharing reactions",
          "感想を伝える",
          "分享感受",
          "Chia sẻ cảm nhận",
          "Compartir reacciones",
          "Membagikan reaksi",
          "ចែករំលែកប្រតិកម្ម",
          "တုံ့ပြန်ချက် မျှဝေခြင်း",
          "แชร์ความรู้สึกตอบสนอง",
          "Berkongsi reaksi"
        ),
        outcome: localized(
          "Say what was good, moving, surprising, or what you want to watch next.",
          "よかった点、感動した点、驚いた点、次に見たいものを言えるようにします。",
          "说出哪里好、哪里感人、哪里让你惊讶，以及接下来想看什么。",
          "Nói được điều gì hay, cảm động, bất ngờ và điều bạn muốn xem tiếp theo.",
          "Di qué te gustó, qué te emocionó, qué te sorprendió y qué quieres ver después.",
          "Mengatakan apa yang bagus, menyentuh, mengejutkan, atau apa yang ingin kamu tonton berikutnya.",
          "និយាយអំពីអ្វីដែលល្អ ប៉ះពាល់ចិត្ត ឬគួរឲ្យភ្ញាក់ផ្អើល និងអ្វីដែលអ្នកចង់មើលបន្ទាប់។",
          "ဘာကကောင်းလဲ၊ ဘာကစိတ်ထိခိုက်စေတယ်၊ ဘာကအံ့သြစေတယ်နဲ့ နောက်ဘာကြည့်ချင်လဲဆိုတာ ပြောနိုင်အောင် လေ့ကျင့်ပါ။",
          "พูดได้ว่าอะไรดี อะไรซึ้ง อะไรน่าประหลาดใจ และอยากดูอะไรต่อไป",
          "Katakan apa yang bagus, menyentuh, mengejutkan, atau apa yang anda mahu tonton seterusnya."
        ),
        samplePhrases: ["정말 재미있었어요.", "조금 슬펐어요.", "다음 편도 보고 싶어요."]
      }
    ]
  }
];

export const getContinuationTrack = (goal: LearningGoal | undefined) =>
  continuationTracks.find((track) => track.id === goal) ?? continuationTracks[0];
