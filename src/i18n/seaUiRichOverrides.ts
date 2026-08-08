import type { CountryPackId } from "../types";
import { uiCatalog } from "./ui";

type UiKey = keyof typeof uiCatalog;
type PartialLocalized = Partial<Record<CountryPackId, string>>;

export const seaUiRichOverrides: Partial<Record<UiKey, PartialLocalized>> = {
  "nav.ariaLabel": {
    "id-id": "Menu utama",
    "kh-km": "ម៉ឺនុយមេ",
    "mm-my": "ပင်မမီနူး",
    "th-th": "เมนูหลัก",
    "my-ms": "Menu utama"
  },
  "nav.home": {
    "id-id": "Beranda",
    "kh-km": "ទំព័រដើម",
    "mm-my": "ပင်မစာမျက်နှာ",
    "th-th": "หน้าหลัก",
    "my-ms": "Laman utama"
  },
  "nav.lesson": {
    "id-id": "Pelajaran",
    "kh-km": "មេរៀន",
    "mm-my": "သင်ခန်းစာ",
    "th-th": "บทเรียน",
    "my-ms": "Pelajaran"
  },
  "nav.review": {
    "id-id": "Ulangi",
    "kh-km": "រំលឹកឡើងវិញ",
    "mm-my": "ပြန်လေ့ကျင့်ရန်",
    "th-th": "ทบทวน",
    "my-ms": "Ulang kaji"
  },
  "nav.settings": {
    "id-id": "Pengaturan",
    "kh-km": "ការកំណត់",
    "mm-my": "ဆက်တင်များ",
    "th-th": "ตั้งค่า",
    "my-ms": "Tetapan"
  },
  "common.start": {
    "id-id": "Mulai",
    "kh-km": "ចាប់ផ្តើម",
    "mm-my": "စတင်ရန်",
    "th-th": "เริ่ม",
    "my-ms": "Mula"
  },
  "common.continue": {
    "id-id": "Lanjut",
    "kh-km": "បន្ត",
    "mm-my": "ဆက်လုပ်ရန်",
    "th-th": "ต่อไป",
    "my-ms": "Teruskan"
  },
  "common.next": {
    "id-id": "Berikutnya",
    "kh-km": "បន្ទាប់",
    "mm-my": "နောက်တစ်ခု",
    "th-th": "ถัดไป",
    "my-ms": "Seterusnya"
  },
  "common.prev": {
    "id-id": "Kembali",
    "kh-km": "ថយក្រោយ",
    "mm-my": "နောက်သို့",
    "th-th": "ย้อนกลับ",
    "my-ms": "Kembali"
  },
  "common.close": {
    "id-id": "Tutup",
    "kh-km": "បិទ",
    "mm-my": "ပိတ်ရန်",
    "th-th": "ปิด",
    "my-ms": "Tutup"
  },
  "state.loading.title": {
    "id-id": "Memuat status belajarmu",
    "kh-km": "កំពុងផ្ទុកស្ថានភាពការរៀនរបស់អ្នក",
    "mm-my": "သင့်သင်ယူမှုအခြေအနေကို ဖွင့်နေသည်",
    "th-th": "กำลังโหลดสถานะการเรียนของคุณ",
    "my-ms": "Memuat status pembelajaran anda"
  },
  "state.loading.body": {
    "id-id": "Sedang memeriksa progres sebelumnya dan item review.",
    "kh-km": "កំពុងពិនិត្យមើលវឌ្ឍនភាពមុន និងធាតុរំលឹកឡើងវិញ។",
    "mm-my": "အရင်တိုးတက်မှုနဲ့ review အရာတွေကို စစ်ဆေးနေပါတယ်။",
    "th-th": "กำลังตรวจสอบความคืบหน้าก่อนหน้าและรายการทบทวน",
    "my-ms": "Sedang menyemak kemajuan terdahulu dan item ulang kaji."
  },
  "onboarding.title": {
    "id-id": "Pengaturan awal",
    "kh-km": "ការរៀបចំដំបូង",
    "mm-my": "အစပြင်ဆင်မှု",
    "th-th": "การตั้งค่าเริ่มต้น",
    "my-ms": "Persediaan awal"
  },
  "onboarding.step0.title": {
    "id-id": "Bahasa panduan apa yang kamu mau?",
    "kh-km": "អ្នកចង់ឲ្យយើងណែនាំជាភាសាអ្វី?",
    "mm-my": "ဘယ်ဘာသာနဲ့ လမ်းညွှန်ပေးရမလဲ?",
    "th-th": "คุณต้องการให้เราแนะนำเป็นภาษาอะไร",
    "my-ms": "Bahasa panduan yang anda mahu?"
  },
  "onboarding.step0.kicker": {
    "id-id": "Tidak perlu login",
    "kh-km": "មិនចាំបាច់ចូលគណនី",
    "mm-my": "လော့ဂ်အင်မလိုပါ",
    "th-th": "ไม่ต้องเข้าสู่ระบบ",
    "my-ms": "Tidak perlu log masuk"
  },
  "onboarding.step1.title": {
    "id-id": "Level bahasa Korea kamu sekarang bagaimana?",
    "kh-km": "កម្រិតភាសាកូរ៉េរបស់អ្នកឥឡូវនេះយ៉ាងដូចម្តេច?",
    "mm-my": "လက်ရှိ ကိုရီးယားဘာသာအဆင့် ဘယ်လောက်ရှိလဲ?",
    "th-th": "ตอนนี้ระดับภาษาเกาหลีของคุณเป็นอย่างไร",
    "my-ms": "Bagaimana tahap bahasa Korea anda sekarang?"
  },
  "onboarding.step2.title": {
    "id-id": "Bahasa Korea seperti apa yang paling kamu butuhkan?",
    "kh-km": "ភាសាកូរ៉ែបែបណាដែលអ្នកត្រូវការបំផុត?",
    "mm-my": "ဘယ်လို ကိုရီးယားစကားကို အလိုအပ်ဆုံးလဲ?",
    "th-th": "คุณต้องการภาษาเกาหลีแบบไหนมากที่สุด",
    "my-ms": "Bahasa Korea jenis apa yang paling anda perlukan?"
  },
  "onboarding.step3.title": {
    "id-id": "Berapa menit sehari yang cocok untukmu?",
    "kh-km": "មួយថ្ងៃអ្នកអាចរៀនបានប៉ុន្មាននាទី?",
    "mm-my": "တစ်နေ့ကို ဘယ်နှမိနစ်လောက် လုပ်နိုင်မလဲ?",
    "th-th": "วันละกี่นาทีที่เหมาะกับคุณ",
    "my-ms": "Berapa minit sehari yang sesuai untuk anda?"
  },
  "onboarding.step4.title": {
    "id-id": "Pilih tutor Korea untuk latihan",
    "kh-km": "ជ្រើសរើសគ្រូកូរ៉េសម្រាប់ហាត់",
    "mm-my": "လေ့ကျင့်ဖို့ ကိုရီးယားတူတာကို ရွေးပါ",
    "th-th": "เลือกติวเตอร์ภาษาเกาหลีสำหรับฝึก",
    "my-ms": "Pilih tutor Korea untuk berlatih"
  },
  "onboarding.step5.title": {
    "id-id": "Cek lagi pengaturanmu",
    "kh-km": "ពិនិត្យការកំណត់របស់អ្នកម្តងទៀត",
    "mm-my": "သင့်ဆက်တင်ကို ပြန်စစ်ပါ",
    "th-th": "ตรวจสอบการตั้งค่าของคุณอีกครั้ง",
    "my-ms": "Semak semula tetapan anda"
  },
  "onboarding.field.country": {
    "id-id": "Paket negara",
    "kh-km": "កញ្ចប់ប្រទេស",
    "mm-my": "နိုင်ငံအလိုက်ပက်ကေ့ခ်ျ",
    "th-th": "แพ็กประเทศ",
    "my-ms": "Pek negara"
  },
  "onboarding.field.goal": {
    "id-id": "Tujuan",
    "kh-km": "គោលដៅ",
    "mm-my": "ရည်မှန်းချက်",
    "th-th": "เป้าหมาย",
    "my-ms": "Matlamat"
  },
  "onboarding.field.dailyGoal": {
    "id-id": "Target harian",
    "kh-km": "គោលដៅប្រចាំថ្ងៃ",
    "mm-my": "နေ့စဉ်ပန်းတိုင်",
    "th-th": "เป้าหมายรายวัน",
    "my-ms": "Sasaran harian"
  },
  "onboarding.field.tutor": {
    "id-id": "Tutor",
    "kh-km": "គ្រូណែនាំ",
    "mm-my": "တူတာ",
    "th-th": "ติวเตอร์",
    "my-ms": "Tutor"
  },
  "onboarding.field.reminderTime": {
    "id-id": "Waktu pengingat pertama",
    "kh-km": "ពេលរំលឹកដំបូង",
    "mm-my": "ပထမသတိပေးချိန်",
    "th-th": "เวลาเตือนครั้งแรก",
    "my-ms": "Masa peringatan pertama"
  },
  "onboarding.cta": {
    "id-id": "Mulai Day 1 sekarang",
    "kh-km": "ចាប់ផ្តើម Day 1 ឥឡូវនេះ",
    "mm-my": "Day 1 ကို အခုပဲ စပါ",
    "th-th": "เริ่ม Day 1 ตอนนี้",
    "my-ms": "Mulakan Day 1 sekarang"
  },
  "home.hero.title": {
    "id-id": "Mulai hari ini dengan satu kalimat.",
    "kh-km": "ចាប់ផ្តើមថ្ងៃនេះដោយប្រយោគមួយ។",
    "mm-my": "ဒီနေ့ကို ဝါကျတစ်ကြောင်းနဲ့ စပါ။",
    "th-th": "เริ่มวันนี้ด้วยหนึ่งประโยค",
    "my-ms": "Mulakan hari ini dengan satu ayat."
  },
  "home.hero.loggedIn": {
    "id-id": "Menyimpan ke akun {email}",
    "kh-km": "កំពុងរក្សាទុកទៅគណនី {email}",
    "mm-my": "{email} အကောင့်ထဲသို့ သိမ်းနေသည်",
    "th-th": "กำลังบันทึกไปยังบัญชี {email}",
    "my-ms": "Menyimpan ke akaun {email}"
  },
  "home.hero.anonymous": {
    "id-id": "Progresmu tetap tersimpan di perangkat ini meski belum login.",
    "kh-km": "វឌ្ឍនភាពរបស់អ្នកនៅតែត្រូវបានរក្សាទុកលើឧបករណ៍នេះ ទោះមិនទាន់ចូលគណនីក៏ដោយ។",
    "mm-my": "လော့ဂ်အင်မဝင်ခင်တောင် သင့်တိုးတက်မှုကို ဒီစက်မှာပဲ သိမ်းထားပေးပါတယ်။",
    "th-th": "ความคืบหน้าของคุณจะถูกบันทึกไว้ในอุปกรณ์นี้แม้ยังไม่เข้าสู่ระบบ",
    "my-ms": "Kemajuan anda tetap disimpan pada peranti ini walaupun belum log masuk."
  },
  "home.panel.lessonCompleted": {
    "id-id": "Berikutnya: review cepat",
    "kh-km": "បន្ទាប់៖ រំលឹកឡើងវិញលឿន",
    "mm-my": "နောက်တစ်ခု: review အမြန်",
    "th-th": "ต่อไป: ทบทวนสั้นๆ",
    "my-ms": "Seterusnya: ulang kaji ringkas"
  },
  "home.panel.lessonInProgress": {
    "id-id": "Lanjutkan pelajaranmu",
    "kh-km": "បន្តមេរៀនរបស់អ្នក",
    "mm-my": "သင့်သင်ခန်းစာကို ဆက်ပါ",
    "th-th": "เรียนต่อจากเดิม",
    "my-ms": "Teruskan pelajaran anda"
  },
  "home.review.cta": {
    "id-id": "Lihat item review hari ini",
    "kh-km": "មើលធាតុរំលឹករបស់ថ្ងៃនេះ",
    "mm-my": "ဒီနေ့ review အရာတွေကို ကြည့်ပါ",
    "th-th": "ดูรายการทบทวนของวันนี้",
    "my-ms": "Lihat item ulang kaji hari ini"
  },
  "home.review.emptyTitle": {
    "id-id": "Belum ada item review",
    "kh-km": "មិនទាន់មានធាតុរំលឹកទេ",
    "mm-my": "review အရာမရှိသေးပါ",
    "th-th": "ยังไม่มีรายการทบทวน",
    "my-ms": "Belum ada item ulang kaji"
  },
  "home.review.emptyBody": {
    "id-id": "Setelah menyelesaikan pelajaran, item review akan dibuat dari ungkapan yang terasa sulit.",
    "kh-km": "បន្ទាប់ពីបញ្ចប់មេរៀន ធាតុរំលឹកនឹងត្រូវបង្កើតពីឃ្លាដែលអ្នកមានអារម្មណ៍ថាពិបាក។",
    "mm-my": "သင်ခန်းစာပြီးသွားရင် ခက်တယ်လို့ ခံစားရတဲ့ စကားပုံစံတွေကို အခြေခံပြီး review အရာတွေ ပြန်ဖန်တီးပေးပါတယ်။",
    "th-th": "หลังจบบทเรียน ระบบจะสร้างรายการทบทวนจากสำนวนที่คุณรู้สึกว่ายาก",
    "my-ms": "Selepas menamatkan pelajaran, item ulang kaji akan dibuat berdasarkan ungkapan yang anda rasa sukar."
  },
  "home.login.cta": {
    "id-id": "Login untuk memulihkan progres di semua perangkat",
    "kh-km": "ចូលគណនីដើម្បីស្ដារវឌ្ឍនភាពរបស់អ្នកលើឧបករណ៍ផ្សេងៗ",
    "mm-my": "စက်အမျိုးမျိုးမှာ သင့်တိုးတက်မှုကို ပြန်ယူဖို့ လော့ဂ်အင်ဝင်ပါ",
    "th-th": "เข้าสู่ระบบเพื่อกู้คืนความคืบหน้าบนอุปกรณ์ต่างๆ",
    "my-ms": "Log masuk untuk memulihkan kemajuan anda merentas peranti"
  },
  "guide.focus": {
    "id-id": "Fokus",
    "kh-km": "ចំណុចផ្តោត",
    "mm-my": "အာရုံစိုက်ရန်",
    "th-th": "จุดโฟกัส",
    "my-ms": "Fokus"
  },
  "guide.pronunciation": {
    "id-id": "Pelafalan",
    "kh-km": "ការបញ្ចេញសំឡេង",
    "mm-my": "အသံထွက်",
    "th-th": "การออกเสียง",
    "my-ms": "Sebutan"
  },
  "guide.structure": {
    "id-id": "Struktur",
    "kh-km": "រចនាសម្ព័ន្ធ",
    "mm-my": "ဝါကျဖွဲ့ပုံ",
    "th-th": "โครงสร้าง",
    "my-ms": "Struktur"
  },
  "guide.review": {
    "id-id": "Kebiasaan review",
    "kh-km": "ទម្លាប់រំលឹកឡើងវិញ",
    "mm-my": "ပြန်လေ့ကျင့်တဲ့ အလေ့အထ",
    "th-th": "นิสัยการทบทวน",
    "my-ms": "Tabiat ulang kaji"
  },
  "guide.offline": {
    "id-id": "Offline",
    "kh-km": "ក្រៅបណ្តាញ",
    "mm-my": "အော့ဖ်လိုင်း",
    "th-th": "ออฟไลน์",
    "my-ms": "Luar talian"
  },
  "recorder.stop": {
    "id-id": "Hentikan rekaman",
    "kh-km": "បញ្ឈប់ការថត",
    "mm-my": "အသံဖမ်းခြင်းရပ်ရန်",
    "th-th": "หยุดการอัดเสียง",
    "my-ms": "Hentikan rakaman"
  },
  "recorder.start": {
    "id-id": "Rekam suaraku",
    "kh-km": "ថតសំឡេងរបស់ខ្ញុំ",
    "mm-my": "ကျွန်ုပ်၏အသံကို ဖမ်းပါ",
    "th-th": "อัดเสียงของฉัน",
    "my-ms": "Rakam suara saya"
  },
  "recorder.retry": {
    "id-id": "Rekam lagi",
    "kh-km": "ថតម្តងទៀត",
    "mm-my": "ထပ်ဖမ်းရန်",
    "th-th": "อัดใหม่อีกครั้ง",
    "my-ms": "Rakam semula"
  },
  "recorder.denied.title": {
    "id-id": "Akses mikrofon ditolak",
    "kh-km": "ការចូលប្រើមីក្រូហ្វូនត្រូវបានបដិសេធ",
    "mm-my": "မိုက်ခရိုဖုန်း အသုံးပြုခွင့် ငြင်းပယ်ထားသည်",
    "th-th": "ถูกปฏิเสธการเข้าถึงไมโครโฟน",
    "my-ms": "Akses mikrofon ditolak"
  },
  "recorder.denied.body": {
    "id-id": "Izinkan akses mikrofon di pengaturan bilah alamat browser, atau lewati langkah rekaman ini untuk lanjut.",
    "kh-km": "អនុញ្ញាតការចូលប្រើមីក្រូហ្វូនក្នុងការកំណត់របារអាសយដ្ឋានរបស់កម្មវិធីរុករក ឬរំលងជំហានថតនេះដើម្បីបន្ត។",
    "mm-my": "browser လိပ်စာဘား setting မှာ microphone အသုံးပြုခွင့်ကို ခွင့်ပြုပေးပါ၊ သို့မဟုတ် ဒီ recording step ကိုကျော်ပြီး ဆက်သွားနိုင်ပါတယ်။",
    "th-th": "อนุญาตการเข้าถึงไมโครโฟนในแถบที่อยู่ของเบราว์เซอร์ หรือข้ามขั้นตอนการอัดเสียงนี้เพื่อไปต่อ",
    "my-ms": "Benarkan akses mikrofon dalam tetapan bar alamat pelayar, atau langkau langkah rakaman ini untuk teruskan."
  },
  "recorder.unsupported.title": {
    "id-id": "Rekaman tidak tersedia",
    "kh-km": "មិនអាចថតសំឡេងបាន",
    "mm-my": "recording မရနိုင်ပါ",
    "th-th": "ไม่สามารถอัดเสียงได้",
    "my-ms": "Rakaman tidak tersedia"
  },
  "recorder.unsupported.body": {
    "id-id": "Browser kamu tidak mendukung rekaman. Kamu tetap bisa menyelesaikan pelajaran.",
    "kh-km": "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រការថតសំឡេងទេ។ អ្នកនៅតែអាចបញ្ចប់មេរៀនបាន។",
    "mm-my": "သင့် browser က recording ကို မထောက်ပံ့ပါ။ သင်ခန်းစာကိုတော့ ဆက်ပြီး ပြီးအောင်လုပ်နိုင်ပါတယ်။",
    "th-th": "เบราว์เซอร์ของคุณไม่รองรับการอัดเสียง แต่คุณยังเรียนต่อจนจบบทได้",
    "my-ms": "Pelayar anda tidak menyokong rakaman. Anda masih boleh menamatkan pelajaran."
  },
  "recorder.recognized": {
    "id-id": "Kamu mengatakan:",
    "kh-km": "អ្នកបាននិយាយថា៖",
    "mm-my": "သင်ပြောခဲ့သည်မှာ:",
    "th-th": "คุณพูดว่า:",
    "my-ms": "Anda berkata:"
  },
  "recorder.privacy": {
    "id-id": "Pengenalan suara baru dimulai setelah kamu menekan rekam. Browser atau layanan suara perangkatmu bisa memproses audio untuk transkripsi.",
    "kh-km": "ការសម្គាល់សំឡេងចាប់ផ្តើមតែបន្ទាប់ពីអ្នកចុចថតប៉ុណ្ណោះ។ កម្មវិធីរុករក ឬសេវាសំឡេងលើឧបករណ៍អាចដំណើរការសំឡេងសម្រាប់បម្លែងជាអក្សរ។",
    "mm-my": "အသံမှတ်သားခြင်းက record ကိုနှိပ်ပြီးမှသာ စတင်ပါတယ်။ transcription အတွက် browser သို့မဟုတ် device voice service က အသံကို process လုပ်နိုင်ပါတယ်။",
    "th-th": "ระบบรู้จำเสียงจะเริ่มหลังจากคุณกดอัดเสียงเท่านั้น เบราว์เซอร์หรือบริการเสียงของอุปกรณ์อาจประมวลผลเสียงเพื่อถอดข้อความ",
    "my-ms": "Pengecaman suara hanya bermula selepas anda menekan rakam. Pelayar atau perkhidmatan suara peranti anda mungkin memproses audio untuk transkripsi."
  },
  "recorder.practiceNote": {
    "id-id": "Gunakan transkrip ini sebagai petunjuk latihan kasar, bukan nilai pelafalan yang tepat.",
    "kh-km": "ប្រើអត្ថបទបម្លែងនេះជាគន្លឹះហាត់ប្រហែលៗ មិនមែនជាពិន្ទុបញ្ចេញសំឡេងដែលត្រឹមត្រូវពិតទេ។",
    "mm-my": "ဒီ transcript ကို အကြမ်းဖျင်းလေ့ကျင့်ခွင့်အဖြစ်သာ သုံးပါ၊ တိကျတဲ့ အသံထွက်အမှတ်မဟုတ်ပါ။",
    "th-th": "ใช้ข้อความถอดเสียงนี้เป็นเพียงคำใบ้ในการฝึก ไม่ใช่คะแนนการออกเสียงที่แม่นยำ",
    "my-ms": "Gunakan transkrip ini sebagai petunjuk latihan kasar, bukan skor sebutan yang tepat."
  },
  "recorder.recognitionUnsupported": {
    "id-id": "Pengenalan suara tidak tersedia di browser ini, jadi hanya pemutaran rekaman yang disediakan.",
    "kh-km": "មិនមានការសម្គាល់សំឡេងក្នុងកម្មវិធីរុករកនេះទេ ដូច្នេះមានតែការចាក់ស្តាប់សំឡេងថតប៉ុណ្ណោះ។",
    "mm-my": "ဒီ browser မှာ voice recognition မရနိုင်လို့ recording playback ပဲ ရပါမယ်။",
    "th-th": "เบราว์เซอร์นี้ไม่รองรับการรู้จำเสียง จึงมีเพียงการเล่นเสียงที่อัดไว้เท่านั้น",
    "my-ms": "Pengecaman suara tidak tersedia dalam pelayar ini, jadi hanya main balik rakaman disediakan."
  },
  "recorder.recognitionDenied": {
    "id-id": "Izin pengenalan suara diblokir. Kamu tetap bisa berlatih lewat pemutaran rekaman.",
    "kh-km": "សិទ្ធិការសម្គាល់សំឡេងត្រូវបានទប់ស្កាត់។ អ្នកនៅតែអាចហាត់តាមរយៈការចាក់ស្តាប់សំឡេងថតបាន។",
    "mm-my": "voice recognition permission ကို ပိတ်ထားပါတယ်။ recording playback နဲ့တော့ ဆက်လေ့ကျင့်နိုင်ပါတယ်။",
    "th-th": "สิทธิ์การรู้จำเสียงถูกบล็อก แต่คุณยังฝึกต่อด้วยการฟังเสียงที่อัดไว้ได้",
    "my-ms": "Kebenaran pengecaman suara telah disekat. Anda masih boleh berlatih dengan main balik rakaman."
  },
  "recorder.recognitionFailed": {
    "id-id": "Pengenalan suara tidak bisa menyelesaikan percobaan ini. Coba lagi kalau kamu ingin petunjuk latihan lain.",
    "kh-km": "ការសម្គាល់សំឡេងមិនអាចបញ្ចប់ការព្យាយាមនេះបានទេ។ សាកល្បងម្តងទៀត ប្រសិនបើអ្នកចង់បានគន្លឹះហាត់បន្ថែម។",
    "mm-my": "ဒီတစ်ကြိမ် voice recognition က မပြီးမြောက်ခဲ့ပါ။ နောက်ထပ်လေ့ကျင့်မှု hint လိုချင်ရင် ထပ်စမ်းကြည့်ပါ။",
    "th-th": "การรู้จำเสียงไม่สามารถจบการลองครั้งนี้ได้ ลองใหม่อีกครั้งหากคุณต้องการคำใบ้ในการฝึกเพิ่ม",
    "my-ms": "Pengecaman suara tidak dapat menyelesaikan cubaan ini. Cuba lagi jika anda mahu petunjuk latihan lain."
  },
  "review.empty.cta": {
    "id-id": "Belajar Day 1",
    "kh-km": "រៀន Day 1",
    "mm-my": "Day 1 ကို လေ့လာရန်",
    "th-th": "เรียน Day 1",
    "my-ms": "Belajar Day 1"
  },
  "review.progressTitle": {
    "id-id": "Review 3 menit",
    "kh-km": "ការរំលឹក 3 នាទី",
    "mm-my": "၃ မိနစ် review",
    "th-th": "ทบทวน 3 นาที",
    "my-ms": "Ulang kaji 3 minit"
  },
  "review.priorityAriaLabel": {
    "id-id": "Prioritas review {priority}",
    "kh-km": "អាទិភាពរំលឹក {priority}",
    "mm-my": "review ဦးစားပေး {priority}",
    "th-th": "ลำดับความสำคัญการทบทวน {priority}",
    "my-ms": "Keutamaan ulang kaji {priority}"
  },
  "review.note.hard": {
    "id-id": "Kamu menandai ini sebagai sulit pada review terakhir.",
    "kh-km": "អ្នកបានសម្គាល់វាថាពិបាកក្នុងការរំលឹកលើកមុន។",
    "mm-my": "ပြီးခဲ့တဲ့ review မှာ ဒါကို ခက်တယ်လို့ မှတ်သားထားခဲ့ပါတယ်။",
    "th-th": "คุณเคยทำเครื่องหมายว่านี่ยากในรอบทบทวนครั้งก่อน",
    "my-ms": "Anda menandakan ini sebagai sukar dalam ulang kaji terakhir."
  },
  "review.note.scheduled": {
    "id-id": "Dijadwalkan dari hasil dengar ulang, petunjuk, dan rekaman di pelajaranmu.",
    "kh-km": "ត្រូវបានកំណត់ពេលវេលាពីការស្តាប់ម្តងហើយម្តងទៀត គន្លឹះ និងសំឡេងថតក្នុងមេរៀនរបស់អ្នក។",
    "mm-my": "သင့်သင်ခန်းစာထဲက ထပ်နားထောင်မှု၊ hint တွေနဲ့ recording တွေအပေါ် အခြေခံပြီး schedule ချထားတာပါ။",
    "th-th": "ถูกจัดตารางจากการฟังซ้ำ คำใบ้ และการอัดเสียงในบทเรียนของคุณ",
    "my-ms": "Dijadualkan berdasarkan pendengaran berulang, petunjuk, dan rakaman daripada pelajaran anda."
  },
  "review.instruction.speak": {
    "id-id": "Baca maknanya dulu, ucapkan bahasa Koreanya, lalu putar untuk membandingkan.",
    "kh-km": "អានន័យជាមុន បន្ទាប់មកនិយាយភាសាកូរ៉េ ហើយចាក់ស្តាប់ដើម្បីប្រៀបធៀប។",
    "mm-my": "အဓိပ္ပာယ်ကို အရင်ဖတ်ပါ၊ ကိုရီးယားလို ပြောပြီးနောက် နှိုင်းယှဉ်ဖို့ ဖွင့်ကြည့်ပါ။",
    "th-th": "อ่านความหมายก่อน พูดภาษาเกาหลี แล้วค่อยเปิดฟังเพื่อเปรียบเทียบ",
    "my-ms": "Baca maksud dahulu, sebut bahasa Korea, kemudian mainkan untuk membandingkan."
  },
  "review.instruction.roleplay": {
    "id-id": "Dengarkan kalimat lawan bicara lalu jawab dengan frasa hari ini.",
    "kh-km": "ស្តាប់ប្រយោគរបស់អ្នកម្ខាងទៀត ហើយឆ្លើយដោយប្រើឃ្លារបស់ថ្ងៃនេះ។",
    "mm-my": "တစ်ဖက်လူရဲ့ စာကြောင်းကို နားထောင်ပြီး ဒီနေ့ရဲ့ phrase နဲ့ ပြန်ဖြေပါ။",
    "th-th": "ฟังประโยคของอีกฝ่ายก่อน แล้วตอบด้วยวลีของวันนี้",
    "my-ms": "Dengar ayat pasangan dahulu kemudian jawab dengan frasa hari ini."
  },
  "review.action.hard": {
    "id-id": "Masih sulit",
    "kh-km": "នៅតែពិបាក",
    "mm-my": "ခက်နေသေးသည်",
    "th-th": "ยังยากอยู่",
    "my-ms": "Masih sukar"
  },
  "review.action.success": {
    "id-id": "Saya ingat",
    "kh-km": "ខ្ញុំចាំបានហើយ",
    "mm-my": "မှတ်မိပါပြီ",
    "th-th": "ฉันจำได้",
    "my-ms": "Saya ingat"
  },
  "review.listen": {
    "id-id": "Dengar",
    "kh-km": "ស្តាប់",
    "mm-my": "နားထောင်",
    "th-th": "ฟัง",
    "my-ms": "Dengar"
  },
  "review.slow": {
    "id-id": "Pelan",
    "kh-km": "យឺត",
    "mm-my": "ဖြည်းဖြည်း",
    "th-th": "ช้า",
    "my-ms": "Perlahan"
  },
  "review.overview.title": {
    "id-id": "Status review",
    "kh-km": "ស្ថានភាពការរំលឹក",
    "mm-my": "review အခြေအနေ",
    "th-th": "สถานะการทบทวน",
    "my-ms": "Status ulang kaji"
  },
  "review.overview.dueCount": {
    "id-id": "Jatuh tempo hari ini",
    "kh-km": "ដល់កំណត់ថ្ងៃនេះ",
    "mm-my": "ဒီနေ့ကျရောက်သည်",
    "th-th": "ครบกำหนดวันนี้",
    "my-ms": "Perlu hari ini"
  },
  "review.overview.hardCount": {
    "id-id": "Ditandai sulit",
    "kh-km": "បានសម្គាល់ថាពិបាក",
    "mm-my": "ခက်တယ်ဟု မှတ်ထားသည်",
    "th-th": "ทำเครื่องหมายว่ายาก",
    "my-ms": "Ditandakan sukar"
  },
  "review.overview.highPriority": {
    "id-id": "Prioritas tinggi",
    "kh-km": "អាទិភាពខ្ពស់",
    "mm-my": "ဦးစားပေးမြင့်",
    "th-th": "ความสำคัญสูง",
    "my-ms": "Keutamaan tinggi"
  },
  "review.overview.nextDue": {
    "id-id": "Review terjadwal berikutnya akan terbuka {time} lagi.",
    "kh-km": "ការរំលឹកដែលបានកំណត់បន្ទាប់នឹងបើកនៅក្នុងរយៈពេល {time} ទៀត។",
    "mm-my": "နောက် review schedule ကို {time} နောက်မှာ ဖွင့်ပါမယ်။",
    "th-th": "รอบทบทวนถัดไปจะเปิดในอีก {time}",
    "my-ms": "Ulang kaji berjadual seterusnya akan dibuka dalam {time} lagi."
  },
  "review.overview.noNextDue": {
    "id-id": "Selesaikan pelajaran baru untuk menjadwalkan review berikutnya secara otomatis.",
    "kh-km": "បញ្ចប់មេរៀនថ្មីដើម្បីកំណត់ពេលការរំលឹកបន្ទាប់ដោយស្វ័យប្រវត្តិ។",
    "mm-my": "review နောက်တစ်ခါကို အလိုအလျောက် schedule လုပ်ဖို့ သင်ခန်းစာအသစ်ကို ပြီးအောင်လုပ်ပါ။",
    "th-th": "เรียนบทใหม่ให้จบเพื่อจัดตารางการทบทวนครั้งถัดไปโดยอัตโนมัติ",
    "my-ms": "Selesaikan pelajaran baharu untuk menjadualkan ulang kaji seterusnya secara automatik."
  },
  "saved.title": {
    "id-id": "Kalimat tersimpan",
    "kh-km": "ប្រយោគដែលបានរក្សាទុក",
    "mm-my": "သိမ်းထားသော ဝါကျများ",
    "th-th": "ประโยคที่บันทึกไว้",
    "my-ms": "Ayat disimpan"
  },
  "settings.title": {
    "id-id": "Pengaturan belajar saya",
    "kh-km": "ការកំណត់ការរៀនរបស់ខ្ញុំ",
    "mm-my": "ကျွန်ုပ်၏ သင်ယူမှုဆက်တင်များ",
    "th-th": "การตั้งค่าการเรียนของฉัน",
    "my-ms": "Tetapan pembelajaran saya"
  },
  "review.empty.title": {
    "id-id": "Belum ada review hari ini",
    "kh-km": "ថ្ងៃនេះមិនទាន់មានធាតុរំលឹកទេ",
    "mm-my": "ဒီနေ့ review မရှိသေးပါ",
    "th-th": "วันนี้ยังไม่มีรายการทบทวน",
    "my-ms": "Belum ada ulang kaji untuk hari ini"
  },
  "review.empty.body": {
    "id-id": "Selesaikan pelajaran berikutnya atau simpan kalimat sulit untuk menyiapkan review.",
    "kh-km": "បញ្ចប់មេរៀនបន្ទាប់ ឬរក្សាទុកប្រយោគដែលពិបាក ដើម្បីរៀបចំការរំលឹកឡើងវិញ។",
    "mm-my": "နောက်သင်ခန်းစာကိုပြီးအောင်လုပ်ပါ သို့မဟုတ် ခက်တဲ့ဝါကျတွေကို သိမ်းပြီး review ကို ပြင်ဆင်ပါ။",
    "th-th": "เรียนบทถัดไปให้จบ หรือบันทึกประโยคที่ยากไว้เพื่อเตรียมการทบทวน",
    "my-ms": "Selesaikan pelajaran seterusnya atau simpan ayat yang sukar untuk menyediakan ulang kaji."
  },
  "review.done.title": {
    "id-id": "Review hari ini selesai",
    "kh-km": "ការរំលឹករបស់ថ្ងៃនេះបានបញ្ចប់",
    "mm-my": "ဒီနေ့ review ပြီးပါပြီ",
    "th-th": "ทบทวนของวันนี้เสร็จแล้ว",
    "my-ms": "Ulang kaji hari ini selesai"
  },
  "review.done.body": {
    "id-id": "Kalimat yang sulit akan kembali lagi nanti dengan jeda yang lebih pas.",
    "kh-km": "ប្រយោគដែលពិបាកនឹងត្រលប់មកវិញនៅពេលក្រោយជាមួយចន្លោះពេលដែលសមជាងមុន។",
    "mm-my": "ခက်တဲ့ဝါကျတွေက နောက်တစ်ခါ ပိုသင့်တော်တဲ့အချိန်ကွာဟမှုနဲ့ ပြန်လာပါလိမ့်မယ်။",
    "th-th": "ประโยคที่ยากจะกลับมาอีกครั้งในช่วงเวลาที่เหมาะสมกว่า",
    "my-ms": "Ayat yang sukar akan muncul semula kemudian dengan jarak masa yang lebih sesuai."
  },
  "review.done.cta": {
    "id-id": "Kembali ke beranda",
    "kh-km": "ត្រឡប់ទៅទំព័រដើម",
    "mm-my": "ပင်မစာမျက်နှာသို့ ပြန်ရန်",
    "th-th": "กลับหน้าหลัก",
    "my-ms": "Kembali ke laman utama"
  },
  "audio.readinessTitle": {
    "id-id": "Status paket audio offline",
    "kh-km": "ស្ថានភាពកញ្ចប់សំឡេងក្រៅបណ្តាញ",
    "mm-my": "အော့ဖ်လိုင်းအသံပက်ကေ့ခ်ျအခြေအနေ",
    "th-th": "สถานะแพ็กเสียงออฟไลน์",
    "my-ms": "Status pakej audio luar talian"
  },
  "audio.readinessBody": {
    "id-id": "Kalimat Day 1-30 sudah siap di kecepatan normal dan lambat. Sampai audio statis gratis ditautkan, TTS browser Korea akan menjaga pelajaran tetap berjalan.",
    "kh-km": "ប្រយោគ Day 1-30 ត្រូវបានរៀបចំរួចហើយក្នុងល្បឿនធម្មតា និងយឺត។ រហូតដល់សំឡេងស្ថិតិឥតគិតថ្លៃត្រូវបានភ្ជាប់ TTS កូរ៉េរបស់កម្មវិធីរុករកនឹងបន្តឲ្យមេរៀនដំណើរការ។",
    "mm-my": "Day 1-30 ဝါကျတွေကို ပုံမှန်နဲ့ ဖြည်းဖြည်းနှုန်းနှစ်မျိုးစလုံးအတွက် ပြင်ဆင်ထားပါတယ်။ အခမဲ့ static audio မချိတ်ရသေးခင် browser Korean TTS က သင်ခန်းစာကို ဆက်လက်လည်ပတ်စေပါလိမ့်မယ်။",
    "th-th": "ประโยค Day 1-30 ถูกเตรียมไว้แล้วทั้งความเร็วปกติและช้า ระหว่างที่ยังไม่ได้เชื่อมไฟล์เสียงถาวรฟรี ระบบ TTS ภาษาเกาหลีของเบราว์เซอร์จะช่วยให้บทเรียนใช้งานต่อได้",
    "my-ms": "Ayat Day 1-30 sudah disediakan pada kelajuan biasa dan perlahan. Sehingga audio statik percuma dipautkan, TTS pelayar Korea akan memastikan pelajaran terus berjalan."
  },
  "lesson.tutorKicker": {
    "id-id": "Tutor {name}",
    "kh-km": "គ្រូ {name}",
    "mm-my": "တူတာ {name}",
    "th-th": "ติวเตอร์ {name}",
    "my-ms": "Tutor {name}"
  },
  "lesson.phrase.saved": {
    "id-id": "Kalimat tersimpan",
    "kh-km": "បានរក្សាទុកប្រយោគ",
    "mm-my": "ဝါကျကို သိမ်းပြီးပါပြီ",
    "th-th": "บันทึกประโยคแล้ว",
    "my-ms": "Ayat disimpan"
  },
  "lesson.phrase.save": {
    "id-id": "Simpan kalimat",
    "kh-km": "រក្សាទុកប្រយោគ",
    "mm-my": "ဝါကျကို သိမ်းရန်",
    "th-th": "บันทึกประโยค",
    "my-ms": "Simpan ayat"
  },
  "lesson.hint.show": {
    "id-id": "Tampilkan petunjuk",
    "kh-km": "បង្ហាញគន្លឹះ",
    "mm-my": "hint ကိုပြရန်",
    "th-th": "แสดงคำใบ้",
    "my-ms": "Tunjukkan petunjuk"
  },
  "lesson.pause": {
    "id-id": "Lanjut nanti",
    "kh-km": "បន្តពេលក្រោយ",
    "mm-my": "နောက်မှဆက်လုပ်မည်",
    "th-th": "ค่อยเรียนต่อทีหลัง",
    "my-ms": "Sambung kemudian"
  },
  "lesson.complete": {
    "id-id": "Selesai — jadwalkan review",
    "kh-km": "រួចរាល់ — កំណត់ពេលរំលឹក",
    "mm-my": "ပြီးပါပြီ — review ကို schedule လုပ်ပါ",
    "th-th": "เสร็จแล้ว — จัดตารางทบทวน",
    "my-ms": "Selesai — jadualkan ulang kaji"
  },
  "lesson.quiz.skip": {
    "id-id": "Lewati — saya belum yakin",
    "kh-km": "រំលង — ខ្ញុំមិនទាន់ប្រាកដទេ",
    "mm-my": "ကျော်မည် — မသေချာသေးပါ",
    "th-th": "ข้าม — ฉันยังไม่แน่ใจ",
    "my-ms": "Langkau — saya belum pasti"
  },
  "lesson.ttsNote": {
    "id-id": "Saat belum ada audio statis gratis, TTS browser akan dipakai.",
    "kh-km": "នៅពេលមិនទាន់មានសំឡេងស្ថិតិឥតគិតថ្លៃ TTS របស់កម្មវិធីរុករកនឹងត្រូវបានប្រើ។",
    "mm-my": "အခမဲ့ static audio မရှိသေးတဲ့အခါ browser TTS ကို အသုံးပြုပါမယ်။",
    "th-th": "เมื่อยังไม่มีไฟล์เสียงถาวรฟรี ระบบจะใช้ TTS ของเบราว์เซอร์",
    "my-ms": "Apabila audio statik percuma belum ada, TTS pelayar akan digunakan."
  },
  "lesson.continue": {
    "id-id": "Lanjutkan",
    "kh-km": "បន្ត",
    "mm-my": "ဆက်လုပ်ရန်",
    "th-th": "ต่อไป",
    "my-ms": "Teruskan"
  },
  "roleplay.partner": {
    "id-id": "Lawan bicara",
    "kh-km": "អ្នកសន្ទនា",
    "mm-my": "တစ်ဖက်လူ",
    "th-th": "คู่สนทนา",
    "my-ms": "Pasangan bicara"
  },
  "roleplay.myAnswer": {
    "id-id": "Jawabanku",
    "kh-km": "ចម្លើយរបស់ខ្ញុំ",
    "mm-my": "ကျွန်ုပ်၏အဖြေ",
    "th-th": "คำตอบของฉัน",
    "my-ms": "Jawapan saya"
  },
  "roleplay.rescue": {
    "id-id": "Kalimat penyelamat",
    "kh-km": "ឃ្លាជួយសង្គ្រោះ",
    "mm-my": "အရေးပေါ်ဝါကျ",
    "th-th": "ประโยคช่วยประคอง",
    "my-ms": "Frasa bantuan"
  },
  "audio.slots": {
    "id-id": "Slot audio",
    "kh-km": "ចន្លោះសំឡេង",
    "mm-my": "အသံ slot များ",
    "th-th": "ช่องเสียง",
    "my-ms": "Slot audio"
  },
  "audio.staticFiles": {
    "id-id": "File statis terhubung",
    "kh-km": "ឯកសារស្ថិតិដែលបានភ្ជាប់",
    "mm-my": "ချိတ်ထားသော static file များ",
    "th-th": "ไฟล์ถาวรที่เชื่อมแล้ว",
    "my-ms": "Fail statik dipautkan"
  },
  "audio.fallback": {
    "id-id": "Cadangan browser",
    "kh-km": "ជម្រើសបម្រុងរបស់កម្មវិធីរុករក",
    "mm-my": "browser fallback",
    "th-th": "ตัวสำรองของเบราว์เซอร์",
    "my-ms": "Sandaran pelayar"
  },
  "audio.naturalSpeed": {
    "id-id": "Kecepatan normal",
    "kh-km": "ល្បឿនធម្មតា",
    "mm-my": "ပုံမှန်အမြန်နှုန်း",
    "th-th": "ความเร็วปกติ",
    "my-ms": "Kelajuan biasa"
  },
  "audio.slowSpeed": {
    "id-id": "Kecepatan lambat",
    "kh-km": "ល្បឿនយឺត",
    "mm-my": "အမြန်နှုန်းဖြည်းဖြည်း",
    "th-th": "ความเร็วช้า",
    "my-ms": "Kelajuan perlahan"
  },
  "audio.waveformAriaLabel": {
    "id-id": "Progres pemutaran",
    "kh-km": "វឌ្ឍនភាពការចាក់សំឡេង",
    "mm-my": "ဖွင့်ထားမှုတိုးတက်မှု",
    "th-th": "ความคืบหน้าการเล่นเสียง",
    "my-ms": "Kemajuan main balik"
  },
  "audio.ttsNote": {
    "id-id": "Kalau belum ada audio statis gratis, TTS browser akan dipakai.",
    "kh-km": "ប្រសិនបើមិនទាន់មានសំឡេងស្ថិតិឥតគិតថ្លៃ TTS របស់កម្មវិធីរុករកនឹងត្រូវបានប្រើ។",
    "mm-my": "အခမဲ့ static audio မရှိသေးရင် browser TTS ကို အသုံးပြုပါမယ်။",
    "th-th": "หากยังไม่มีไฟล์เสียงถาวรฟรี ระบบจะใช้ TTS ของเบราว์เซอร์",
    "my-ms": "Jika belum ada audio statik percuma, TTS pelayar akan digunakan."
  },
  "saved.filterAriaLabel": {
    "id-id": "Filter kalimat tersimpan",
    "kh-km": "តម្រងប្រយោគដែលបានរក្សាទុក",
    "mm-my": "သိမ်းထားသောဝါကျများကို စစ်ထုတ်ရန်",
    "th-th": "กรองประโยคที่บันทึกไว้",
    "my-ms": "Tapis ayat disimpan"
  },
  "saved.filter.all": {
    "id-id": "Semua",
    "kh-km": "ទាំងអស់",
    "mm-my": "အားလုံး",
    "th-th": "ทั้งหมด",
    "my-ms": "Semua"
  },
  "saved.dayFilterAriaLabel": {
    "id-id": "Lihat kalimat tersimpan per hari",
    "kh-km": "មើលប្រយោគដែលបានរក្សាទុកតាមថ្ងៃ",
    "mm-my": "နေ့အလိုက် သိမ်းထားသောဝါကျများကို ကြည့်ရန်",
    "th-th": "ดูประโยคที่บันทึกไว้ตามวัน",
    "my-ms": "Lihat ayat disimpan mengikut hari"
  },
  "saved.dayFilter.all": {
    "id-id": "Semua hari",
    "kh-km": "គ្រប់ថ្ងៃ",
    "mm-my": "နေ့အားလုံး",
    "th-th": "ทุกวัน",
    "my-ms": "Semua hari"
  },
  "saved.copied": {
    "id-id": "Tersalin.",
    "kh-km": "បានចម្លង។",
    "mm-my": "ကူးပြီးပါပြီ။",
    "th-th": "คัดลอกแล้ว",
    "my-ms": "Disalin."
  },
  "saved.copyFailed": {
    "id-id": "Menyalin tidak didukung di lingkungan ini.",
    "kh-km": "បរិស្ថាននេះមិនគាំទ្រការចម្លងទេ។",
    "mm-my": "ဒီပတ်ဝန်းကျင်မှာ copy လုပ်တာကို မထောက်ပံ့ပါ။",
    "th-th": "สภาพแวดล้อมนี้ไม่รองรับการคัดลอก",
    "my-ms": "Penyalinan tidak disokong dalam persekitaran ini."
  },
  "saved.emptyFilter": {
    "id-id": "Tidak ada kalimat tersimpan yang cocok dengan filter ini.",
    "kh-km": "មិនមានប្រយោគដែលបានរក្សាទុកណាត្រូវនឹងតម្រងនេះទេ។",
    "mm-my": "ဒီ filter နဲ့ကိုက်ညီတဲ့ သိမ်းထားသောဝါကျမရှိပါ။",
    "th-th": "ไม่มีประโยคที่บันทึกไว้ตรงกับตัวกรองนี้",
    "my-ms": "Tiada ayat disimpan yang sepadan dengan penapis ini."
  },
  "saved.empty": {
    "id-id": "Ketuk simpan saat belajar dan kalimat akan muncul di sini.",
    "kh-km": "ចុចរក្សាទុកនៅពេលរៀន ហើយប្រយោគនឹងបង្ហាញនៅទីនេះ។",
    "mm-my": "သင်ခန်းစာထဲမှာ save ကိုနှိပ်လိုက်ရင် ဝါကျတွေ ဒီမှာပေါ်လာပါမယ်။",
    "th-th": "กดบันทึกระหว่างเรียน แล้วประโยคจะมาแสดงที่นี่",
    "my-ms": "Tekan simpan semasa belajar dan ayat akan muncul di sini."
  },
  "saved.listen": {
    "id-id": "Dengar",
    "kh-km": "ស្តាប់",
    "mm-my": "နားထောင်",
    "th-th": "ฟัง",
    "my-ms": "Dengar"
  },
  "saved.slow": {
    "id-id": "Perlahan",
    "kh-km": "យឺត",
    "mm-my": "ဖြည်းဖြည်း",
    "th-th": "ช้า",
    "my-ms": "Perlahan"
  },
  "saved.copy": {
    "id-id": "Salin",
    "kh-km": "ចម្លង",
    "mm-my": "ကူးရန်",
    "th-th": "คัดลอก",
    "my-ms": "Salin"
  },
  "saved.remove": {
    "id-id": "Hapus",
    "kh-km": "លុប",
    "mm-my": "ဖယ်ရှားရန်",
    "th-th": "ลบ",
    "my-ms": "Buang"
  },
  "saved.dayLabel": {
    "id-id": "Day {day}",
    "kh-km": "ថ្ងៃទី {day}",
    "mm-my": "Day {day}",
    "th-th": "Day {day}",
    "my-ms": "Hari {day}"
  },
  "settings.field.country": {
    "id-id": "Paket negara",
    "kh-km": "កញ្ចប់ប្រទេស",
    "mm-my": "နိုင်ငံအလိုက်ပက်ကေ့ခ်ျ",
    "th-th": "แพ็กประเทศ",
    "my-ms": "Pek negara"
  },
  "settings.field.tutor": {
    "id-id": "Tutor",
    "kh-km": "គ្រូណែនាំ",
    "mm-my": "တူတာ",
    "th-th": "ติวเตอร์",
    "my-ms": "Tutor"
  },
  "settings.field.dailyGoal": {
    "id-id": "Target harian",
    "kh-km": "គោលដៅប្រចាំថ្ងៃ",
    "mm-my": "နေ့စဉ်ပန်းတိုင်",
    "th-th": "เป้าหมายรายวัน",
    "my-ms": "Sasaran harian"
  },
  "settings.minuteOption": {
    "id-id": "{minutes} menit",
    "kh-km": "{minutes} នាទី",
    "mm-my": "{minutes} မိနစ်",
    "th-th": "{minutes} นาที",
    "my-ms": "{minutes} minit"
  },
  "settings.note": {
    "id-id": "Paket {country} dan tutor {tutor} dipakai di panduan beranda, pelajaran, dan review.",
    "kh-km": "កញ្ចប់ {country} និងគ្រូ {tutor} ត្រូវបានអនុវត្តលើការណែនាំទំព័រដើម មេរៀន និងការរំលឹកឡើងវិញ។",
    "mm-my": "{country} pack နဲ့ {tutor} ကို ပင်မ၊ သင်ခန်းစာနဲ့ review လမ်းညွှန်တွေမှာ အသုံးပြုထားပါတယ်။",
    "th-th": "แพ็ก {country} และติวเตอร์ {tutor} จะถูกใช้กับคำแนะนำในหน้าหลัก บทเรียน และการทบทวน",
    "my-ms": "Pek {country} dan tutor {tutor} digunakan pada panduan laman utama, pelajaran, dan ulang kaji."
  },
  "settings.account.title": {
    "id-id": "Akun",
    "kh-km": "គណនី",
    "mm-my": "အကောင့်",
    "th-th": "บัญชี",
    "my-ms": "Akaun"
  },
  "settings.field.email": {
    "id-id": "Email",
    "kh-km": "អ៊ីមែល",
    "mm-my": "အီးမေးလ်",
    "th-th": "อีเมล",
    "my-ms": "E-mel"
  },
  "settings.account.login": {
    "id-id": "Login / Gabungkan",
    "kh-km": "ចូលគណនី / បញ្ចូលគ្នា",
    "mm-my": "လော့ဂ်အင် / ပေါင်းစည်းရန်",
    "th-th": "เข้าสู่ระบบ / รวมข้อมูล",
    "my-ms": "Log masuk / Gabung"
  },
  "settings.account.logout": {
    "id-id": "Logout",
    "kh-km": "ចាកចេញ",
    "mm-my": "ထွက်ရန်",
    "th-th": "ออกจากระบบ",
    "my-ms": "Log keluar"
  },
  "settings.sync.title": {
    "id-id": "Status sinkronisasi",
    "kh-km": "ស្ថានភាពសមកាលកម្ម",
    "mm-my": "sync အခြေအနေ",
    "th-th": "สถานะการซิงก์",
    "my-ms": "Status segerak"
  },
  "settings.sync.button": {
    "id-id": "Cek koneksi",
    "kh-km": "ពិនិត្យការតភ្ជាប់",
    "mm-my": "ချိတ်ဆက်မှုကို စစ်ရန်",
    "th-th": "ตรวจสอบการเชื่อมต่อ",
    "my-ms": "Semak sambungan"
  },
  "settings.debug.title": {
    "id-id": "Log event dev",
    "kh-km": "កំណត់ហេតុព្រឹត្តិការណ៍ dev",
    "mm-my": "dev event log",
    "th-th": "บันทึกเหตุการณ์ dev",
    "my-ms": "Log acara dev"
  },
  "settings.debug.empty": {
    "id-id": "Belum ada event yang tercatat.",
    "kh-km": "មិនទាន់មានព្រឹត្តិការណ៍ត្រូវបានកត់ត្រាទេ។",
    "mm-my": "မှတ်တမ်းတင်ထားတဲ့ event မရှိသေးပါ။",
    "th-th": "ยังไม่มีเหตุการณ์ที่ถูกบันทึก",
    "my-ms": "Belum ada acara direkodkan."
  },
  "settings.field.emailPlaceholder": {
    "id-id": "anda@contoh.com",
    "kh-km": "អ្នក@ឧទាហរណ៍.com",
    "mm-my": "you@example.com",
    "th-th": "you@example.com",
    "my-ms": "anda@contoh.com"
  },
  "settings.supabase.ready": {
    "id-id": "Supabase sudah siap. Login email dan sinkronisasi cloud tersedia.",
    "kh-km": "Supabase បានកំណត់រួចហើយ។ ការចូលតាមអ៊ីមែល និងការសមកាលកម្មលើ cloud អាចប្រើបាន។",
    "mm-my": "Supabase အဆင်သင့်ဖြစ်ပါပြီ။ email login နဲ့ cloud sync ကို အသုံးပြုနိုင်ပါတယ်။",
    "th-th": "Supabase พร้อมแล้ว สามารถใช้อีเมลเข้าสู่ระบบและซิงก์คลาวด์ได้",
    "my-ms": "Supabase sudah sedia. Log masuk e-mel dan segerak awan tersedia."
  },
  "settings.supabase.localOnly": {
    "id-id": "Supabase belum dikonfigurasi. Aplikasi ini saat ini hanya menyimpan di perangkat ini.",
    "kh-km": "Supabase មិនទាន់ត្រូវបានកំណត់ទេ។ កម្មវិធីនេះកំពុងរក្សាទុកតែលើឧបករណ៍នេះប៉ុណ្ណោះ។",
    "mm-my": "Supabase ကို မသတ်မှတ်ရသေးပါ။ ဒီအက်ပ်က လက်ရှိ ဒီစက်ပေါ်မှာပဲ သိမ်းထားပါတယ်။",
    "th-th": "ยังไม่ได้ตั้งค่า Supabase ตอนนี้แอปจะบันทึกไว้ในอุปกรณ์นี้เท่านั้น",
    "my-ms": "Supabase belum dikonfigurasi. Aplikasi ini kini menyimpan pada peranti ini sahaja."
  },
  "settings.debug.eventAt": {
    "id-id": "{name} · {time}",
    "kh-km": "{name} · {time}",
    "mm-my": "{name} · {time}",
    "th-th": "{name} · {time}",
    "my-ms": "{name} · {time}"
  },
  "audio.status.staticOk": {
    "id-id": "Sedang memutar audio gratis yang tersimpan.",
    "kh-km": "កំពុងចាក់សំឡេងឥតគិតថ្លៃដែលបានរក្សាទុក។",
    "mm-my": "သိမ်းထားသော အခမဲ့အသံကို ဖွင့်နေပါတယ်။",
    "th-th": "กำลังเล่นไฟล์เสียงฟรีที่บันทึกไว้",
    "my-ms": "Sedang memainkan audio percuma yang disimpan."
  },
  "audio.status.ttsFallback": {
    "id-id": "Belum ada audio gratis tersimpan — sedang memakai suara browser.",
    "kh-km": "មិនទាន់មានសំឡេងឥតគិតថ្លៃដែលបានរក្សាទុកទេ — កំពុងប្រើសំឡេងកម្មវិធីរុករក។",
    "mm-my": "အခမဲ့အသံကို မသိမ်းရသေးပါ — browser speech ကို သုံးနေပါတယ်။",
    "th-th": "ยังไม่มีไฟล์เสียงฟรีที่บันทึกไว้ — กำลังใช้เสียงจากเบราว์เซอร์",
    "my-ms": "Belum ada audio percuma disimpan — sedang menggunakan suara pelayar."
  },
  "audio.status.noKoreanVoice": {
    "id-id": "Tidak ada suara Korea di perangkat ini. Pelajaran tetap berjalan normal.",
    "kh-km": "មិនមានសំឡេងកូរ៉េលើឧបករណ៍នេះទេ។ មេរៀននៅតែបន្តធម្មតា។",
    "mm-my": "ဒီစက်မှာ Korean voice မရှိပါ။ သင်ခန်းစာက ပုံမှန်အတိုင်း ဆက်သွားပါမယ်။",
    "th-th": "อุปกรณ์นี้ไม่มีเสียงภาษาเกาหลี บทเรียนจะดำเนินต่อได้ตามปกติ",
    "my-ms": "Tiada suara Korea pada peranti ini. Pelajaran terus berjalan seperti biasa."
  },
  "audio.status.unavailable": {
    "id-id": "Audio tidak tersedia di browser ini. Kamu tetap bisa lanjut ke langkah berikutnya.",
    "kh-km": "សំឡេងមិនអាចប្រើបានក្នុងកម្មវិធីរុករកនេះទេ។ អ្នកនៅតែអាចបន្តទៅជំហានបន្ទាប់បាន។",
    "mm-my": "ဒီ browser မှာ audio မရနိုင်ပါ။ နောက်အဆင့်ကို ဆက်သွားနိုင်ပါတယ်။",
    "th-th": "เบราว์เซอร์นี้ไม่รองรับเสียง คุณยังไปต่อขั้นถัดไปได้",
    "my-ms": "Audio tidak tersedia dalam pelayar ini. Anda masih boleh terus ke langkah seterusnya."
  },
  "sync.localOnly": {
    "id-id": "Tersimpan aman di perangkat ini. Sinkronisasi akan tersedia setelah proyek Supabase dikonfigurasi.",
    "kh-km": "បានរក្សាទុកយ៉ាងសុវត្ថិភាពលើឧបករណ៍នេះ។ ការសមកាលកម្មនឹងអាចប្រើបានបន្ទាប់ពីកំណត់គម្រោង Supabase។",
    "mm-my": "ဒီစက်မှာ လုံခြုံစွာ သိမ်းထားပါတယ်။ Supabase project ကို သတ်မှတ်ပြီးရင် sync ကို အသုံးပြုနိုင်ပါမယ်။",
    "th-th": "บันทึกไว้อย่างปลอดภัยในอุปกรณ์นี้ การซิงก์จะพร้อมใช้งานเมื่อกำหนดค่าโปรเจ็กต์ Supabase แล้ว",
    "my-ms": "Disimpan dengan selamat pada peranti ini. Segerak akan tersedia selepas projek Supabase dikonfigurasi."
  },
  "sync.readyToConnect": {
    "id-id": "Variabel lingkungan Supabase sudah ada. Sinkronisasi cloud siap dihubungkan.",
    "kh-km": "អថេរបរិស្ថាន Supabase មានរួចហើយ។ ការសមកាលកម្ម cloud អាចត្រូវបានភ្ជាប់។",
    "mm-my": "Supabase environment variable တွေရှိနေပါပြီ။ cloud sync ကို ချိတ်ဆက်နိုင်ပါတယ်။",
    "th-th": "พบตัวแปรแวดล้อมของ Supabase แล้ว สามารถเชื่อมการซิงก์คลาวด์ได้",
    "my-ms": "Pemboleh ubah persekitaran Supabase sudah ada. Segerak awan boleh disambungkan."
  },
  "sync.pendingRetry": {
    "id-id": "Perubahan tersimpan di perangkat ini dan siap dicoba sinkron lagi.",
    "kh-km": "ការផ្លាស់ប្តូរត្រូវបានរក្សាទុកលើឧបករណ៍នេះ ហើយរួចរាល់សម្រាប់សាកល្បងសមកាលកម្មម្តងទៀត។",
    "mm-my": "ပြောင်းလဲမှုတွေကို ဒီစက်မှာ သိမ်းထားပြီး sync ကို ထပ်ကြိုးစားဖို့ အဆင်သင့်ဖြစ်နေပါတယ်။",
    "th-th": "การเปลี่ยนแปลงถูกบันทึกไว้ในอุปกรณ์นี้แล้ว และพร้อมลองซิงก์อีกครั้ง",
    "my-ms": "Perubahan disimpan pada peranti ini dan sedia untuk cuba segerak semula."
  },
  "sync.accountMergedCloudReady": {
    "id-id": "Akun dan progres lokal digabungkan. Simpan cloud bisa berjalan setelah Supabase terhubung.",
    "kh-km": "គណនី និងវឌ្ឍនភាពមូលដ្ឋានត្រូវបានបញ្ចូលគ្នា។ ការរក្សាទុកលើ cloud អាចដំណើរការបានបន្ទាប់ពីភ្ជាប់ Supabase។",
    "mm-my": "account နဲ့ local progress ကို ပေါင်းစည်းပြီးပါပြီ။ Supabase ချိတ်ပြီးရင် cloud save ကို လုပ်နိုင်ပါတယ်။",
    "th-th": "รวมบัญชีและความคืบหน้าในเครื่องแล้ว การบันทึกคลาวด์จะทำงานได้หลังเชื่อม Supabase",
    "my-ms": "Akaun dan kemajuan setempat telah digabungkan. Simpanan awan boleh dijalankan selepas Supabase disambungkan."
  },
  "sync.accountMergedLocal": {
    "id-id": "Akun dan progres lokal digabungkan di penyimpanan lokal browser ini.",
    "kh-km": "គណនី និងវឌ្ឍនភាពមូលដ្ឋានត្រូវបានបញ្ចូលគ្នាក្នុងអង្គផ្ទុកមូលដ្ឋានរបស់កម្មវិធីរុករកនេះ។",
    "mm-my": "account နဲ့ local progress ကို ဒီ browser ရဲ့ local storage ထဲမှာ ပေါင်းစည်းပြီးပါပြီ။",
    "th-th": "รวมบัญชีและความคืบหน้าไว้ใน local storage ของเบราว์เซอร์นี้แล้ว",
    "my-ms": "Akaun dan kemajuan setempat telah digabungkan dalam storan setempat pelayar ini."
  },
  "sync.loggedOutLocal": {
    "id-id": "Sudah logout. Progres tamu tetap tersimpan di perangkat ini.",
    "kh-km": "បានចាកចេញហើយ។ វឌ្ឍនភាពភ្ញៀវនៅតែត្រូវបានរក្សាទុកលើឧបករណ៍នេះ។",
    "mm-my": "logout ထွက်ပြီးပါပြီ။ guest progress ကို ဒီစက်မှာပဲ ဆက်သိမ်းထားပါမယ်။",
    "th-th": "ออกจากระบบแล้ว ความคืบหน้าของผู้ใช้ชั่วคราวยังคงถูกเก็บไว้ในอุปกรณ์นี้",
    "my-ms": "Telah log keluar. Kemajuan tetamu terus disimpan pada peranti ini."
  },
  "sync.authLinkSent": {
    "id-id": "Kami mengirim tautan login lewat email. Membukanya akan memulai penggabungan progres cloud.",
    "kh-km": "យើងបានផ្ញើតំណចូលតាមអ៊ីមែល។ ការបើកវានឹងចាប់ផ្តើមការបញ្ចូលវឌ្ឍនភាពលើ cloud។",
    "mm-my": "email ကနေ login link ပို့ပြီးပါပြီ။ အဲဒါကိုဖွင့်လိုက်ရင် cloud progress merge စတင်ပါမယ်။",
    "th-th": "เราได้ส่งลิงก์เข้าสู่ระบบทางอีเมลแล้ว เมื่อเปิดลิงก์นั้นจะเริ่มรวมความคืบหน้าบนคลาวด์",
    "my-ms": "Kami telah menghantar pautan log masuk melalui e-mel. Membukanya akan memulakan penggabungan kemajuan awan."
  },
  "sync.supabaseReady": {
    "id-id": "Supabase siap. Login dengan tautan email untuk menjalankan sinkronisasi cloud.",
    "kh-km": "Supabase រួចរាល់ហើយ។ ចូលដោយតំណអ៊ីមែលដើម្បីដំណើរការការសមកាលកម្ម cloud។",
    "mm-my": "Supabase အဆင်သင့်ဖြစ်ပါပြီ။ cloud sync ကို လုပ်ဖို့ email link နဲ့ login ဝင်ပါ။",
    "th-th": "Supabase พร้อมแล้ว เข้าสู่ระบบด้วยลิงก์อีเมลเพื่อเริ่มการซิงก์คลาวด์",
    "my-ms": "Supabase sudah sedia. Log masuk dengan pautan e-mel untuk menjalankan segerak awan."
  },
  "sync.merged": {
    "id-id": "Progres cloud dan lokal berhasil digabungkan.",
    "kh-km": "វឌ្ឍនភាពលើ cloud និងមូលដ្ឋានត្រូវបានបញ្ចូលគ្នាដោយជោគជ័យ។",
    "mm-my": "cloud နဲ့ local progress ကို အောင်မြင်စွာ ပေါင်းစည်းခဲ့ပါတယ်။",
    "th-th": "รวมความคืบหน้าบนคลาวด์และในเครื่องสำเร็จแล้ว",
    "my-ms": "Kemajuan awan dan setempat berjaya digabungkan."
  },
  "audio.readinessPending": {
    "id-id": "Pemutaran normal dan lambat sudah tersedia, tetapi beberapa baris masih memakai suara browser sampai file audio statis gratis terhubung.",
    "kh-km": "ការចាក់សំឡេងល្បឿនធម្មតា និងយឺតអាចប្រើបាន ប៉ុន្តែបន្ទាត់ខ្លះនៅតែពឹងផ្អែកលើសំឡេងកម្មវិធីរុករករហូតដល់ឯកសារសំឡេងស្ថិតិឥតគិតថ្លៃត្រូវបានភ្ជាប់។",
    "mm-my": "ပုံမှန်နဲ့ ဖြည်းဖြည်းဖွင့်တာကို အသုံးပြုနိုင်ပေမယ့် အချို့လိုင်းတွေက အခမဲ့ static audio မချိတ်မချင်း browser speech ကိုပဲ သုံးနေပါသေးတယ်။",
    "th-th": "สามารถเล่นแบบปกติและแบบช้าได้แล้ว แต่บางบรรทัดยังต้องใช้เสียงจากเบราว์เซอร์จนกว่าจะเชื่อมไฟล์เสียงถาวรฟรี",
    "my-ms": "Main balik biasa dan perlahan tersedia, tetapi beberapa baris masih bergantung pada suara pelayar sehingga fail audio statik percuma dipautkan."
  },
  "audio.readinessReady": {
    "id-id": "Semua baris yang dilacak sudah punya audio statis normal dan lambat, jadi pemutaran bisa memakai file paket sepenuhnya.",
    "kh-km": "បន្ទាត់ទាំងអស់ដែលបានតាមដានមានសំឡេងស្ថិតិល្បឿនធម្មតា និងយឺតរួចហើយ ដូច្នេះការចាក់សំឡេងអាចប្រើឯកសារដែលបានវេចខ្ចប់ទាំងស្រុង។",
    "mm-my": "လိုင်းအားလုံးမှာ ပုံမှန်နဲ့ ဖြည်းဖြည်း static audio ချိတ်ပြီးသားဖြစ်လို့ playback ကို packaged file နဲ့ပဲ လုပ်နိုင်ပါတယ်။",
    "th-th": "ทุกบรรทัดที่ติดตามไว้มีไฟล์เสียงถาวรทั้งแบบปกติและช้าแล้ว จึงสามารถเล่นจากไฟล์แพ็กเกจได้ทั้งหมด",
    "my-ms": "Setiap baris yang dijejak sudah mempunyai audio statik biasa dan perlahan, jadi main balik boleh menggunakan fail pakej sepenuhnya."
  },
  "continuation.panelCompleted": {
    "id-id": "Lanjutkan setelah Day 14",
    "kh-km": "បន្តបន្ទាប់ពី Day 14",
    "mm-my": "Day 14 ပြီးနောက် ဆက်သွားရန်",
    "th-th": "ไปต่อหลัง Day 14",
    "my-ms": "Teruskan selepas Day 14"
  },
  "continuation.panelInProgress": {
    "id-id": "Siapkan jalur setelah Day 14",
    "kh-km": "ត្រៀមផ្លូវបន្ទាប់ពី Day 14",
    "mm-my": "Day 14 နောက်လမ်းကြောင်းကို ပြင်ဆင်ရန်",
    "th-th": "เตรียมเส้นทางหลัง Day 14",
    "my-ms": "Sediakan laluan selepas Day 14"
  },
  "continuation.progress": {
    "id-id": "{count} tahap lanjutan selesai",
    "kh-km": "បានបញ្ចប់ផ្នែកបន្ត {count}",
    "mm-my": "ဆက်လက်အဆင့် {count} ခု ပြီးပါပြီ",
    "th-th": "เสร็จแล้ว {count} ช่วงต่อเนื่อง",
    "my-ms": "{count} bahagian lanjutan selesai"
  },
  "continuation.listen": {
    "id-id": "Dengar",
    "kh-km": "ស្តាប់",
    "mm-my": "နားထောင်",
    "th-th": "ฟัง",
    "my-ms": "Dengar"
  },
  "continuation.slow": {
    "id-id": "Pelan",
    "kh-km": "យឺត",
    "mm-my": "ဖြည်းဖြည်း",
    "th-th": "ช้า",
    "my-ms": "Perlahan"
  },
  "continuation.save": {
    "id-id": "Simpan",
    "kh-km": "រក្សាទុក",
    "mm-my": "သိမ်းရန်",
    "th-th": "บันทึก",
    "my-ms": "Simpan"
  },
  "continuation.saved": {
    "id-id": "Tersimpan",
    "kh-km": "បានរក្សាទុក",
    "mm-my": "သိမ်းပြီး",
    "th-th": "บันทึกแล้ว",
    "my-ms": "Disimpan"
  },
  "continuation.listenAriaLabel": {
    "id-id": "Dengarkan {phrase}",
    "kh-km": "ស្តាប់ {phrase}",
    "mm-my": "{phrase} ကို နားထောင်ပါ",
    "th-th": "ฟัง {phrase}",
    "my-ms": "Dengar {phrase}"
  },
  "continuation.slowAriaLabel": {
    "id-id": "Dengarkan pelan {phrase}",
    "kh-km": "ស្តាប់ {phrase} យឺតៗ",
    "mm-my": "{phrase} ကို ဖြည်းဖြည်းနားထောင်ပါ",
    "th-th": "ฟังแบบช้า {phrase}",
    "my-ms": "Dengar perlahan {phrase}"
  },
  "continuation.saveAriaLabel": {
    "id-id": "Simpan {phrase}",
    "kh-km": "រក្សាទុក {phrase}",
    "mm-my": "{phrase} ကို သိမ်းပါ",
    "th-th": "บันทึก {phrase}",
    "my-ms": "Simpan {phrase}"
  }
  ,
  "error.auth": {
    "id-id": "Terjadi kesalahan saat memproses autentikasi Supabase.",
    "kh-km": "\u1798\u17b6\u1793\u1794\u1789\u17d2\u17a0\u17b6\u1796\u17c1\u179b\u178a\u17c6\u178e\u17be\u179a\u1780\u17b6\u179a\u1780\u17b6\u179a\u1795\u17d2\u1791\u17c0\u1784\u1795\u17d2\u1791\u17b6\u178f\u17cb Supabase\u17d4",
    "mm-my": "Supabase \u1021\u1010\u100A\u103A\u1015\u103C\u102F\u1001\u103B\u1000\u103A\u1000\u102D\u102F \u1006\u1031\u102C\u1004\u103A\u101B\u103D\u1000\u103A\u1014\u1031\u1005\u1009\u103A \u1021\u1019\u103E\u102C\u1038\u1016\u103C\u1005\u103A\u101E\u103D\u102C\u1038\u101E\u100A\u103A\u104B",
    "th-th": "\u0e40\u0e01\u0e34\u0e14\u0e02\u0e49\u0e2d\u0e1c\u0e34\u0e14\u0e1e\u0e25\u0e32\u0e14\u0e23\u0e30\u0e2b\u0e27\u0e48\u0e32\u0e07\u0e1b\u0e23\u0e30\u0e21\u0e27\u0e25\u0e1c\u0e25\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19 Supabase",
    "my-ms": "Ralat berlaku semasa memproses pengesahan Supabase."
  },
  "error.invalidEmail": {
    "id-id": "Silakan periksa alamat emailmu.",
    "kh-km": "\u179f\u17bc\u1798\u1796\u17b7\u1793\u17b7\u178f\u17d2\u1799\u17a2\u17b6\u179f\u1799\u178a\u17d2\u178b\u17b6\u1793\u17a2\u17ca\u17b8\u1798\u17c1\u179b\u179a\u1794\u179f\u17cb\u17a2\u17d2\u1793\u1780\u17d4",
    "mm-my": "\u1021\u102e\u1038\u1019\u1031\u1038\u101c\u103a \u101c\u102d\u1015\u103a\u1005\u102c\u1000\u102d\u102f \u1015\u103c\u1014\u103a\u101c\u100a\u103a\u1005\u1005\u103a\u1006\u1031\u1038\u1015\u1031\u1038\u1015\u102b\u104b",
    "th-th": "\u0e42\u0e1b\u0e23\u0e14\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13",
    "my-ms": "Sila semak alamat e-mel anda."
  },
  "error.loginFailed": {
    "id-id": "Gagal mengirim tautan login.",
    "kh-km": "\u1780\u17b6\u179a\u1795\u17d2\u1789\u17be\u178f\u17c6\u178e\u1797\u17d2\u1787\u17b6\u1794\u17cb\u1785\u17bc\u179b\u1794\u17d2\u179a\u17be\u17d0\u1794\u17d2\u179a\u17b6\u179f\u17cb\u1794\u17b6\u1793\u1794\u179a\u17b6\u1794\u17cb\u1794\u17d0\u179a\u17c6\u17a0\u17c2\u17d4",
    "mm-my": "\u101c\u1031\u102c\u1037\u1002\u103a\u1021\u1004\u103a \u101c\u1004\u1037\u103a\u1000\u103a\u1000\u102d\u102f \u1015\u1031\u1038\u1015\u102d\u102f\u1037\u101B\u102C\u1010\u103D\u1004\u103a \u1019\u1021\u102c\u1004\u103A\u1019\u103C\u1004\u103A\u1015\u102B\u104B",
    "th-th": "\u0e2a\u0e48\u0e07\u0e25\u0e34\u0e07\u0e01\u0e4c\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e23\u0e30\u0e1a\u0e1a\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08",
    "my-ms": "Gagal menghantar pautan log masuk."
  },
  "error.logoutFailed": {
    "id-id": "Terjadi kesalahan saat logout.",
    "kh-km": "\u1798\u17b6\u1793\u1794\u1789\u17d2\u17a0\u17b6\u1796\u17c1\u179b\u1785\u17c1\u1789\u1796\u17b8\u1782\u178e\u1793\u17b8\u17d4",
    "mm-my": "\u1011\u103D\u1000\u103A\u101C\u102E\u102C\u1005\u1009\u103A \u1021\u1019\u103E\u102C\u1038\u1016\u103C\u1005\u103A\u101E\u103D\u102C\u1038\u101E\u100A\u103A\u104B",
    "th-th": "\u0e40\u0e01\u0e34\u0e14\u0e02\u0e49\u0e2d\u0e1c\u0e34\u0e14\u0e1e\u0e25\u0e32\u0e14\u0e23\u0e30\u0e2b\u0e27\u0e48\u0e32\u0e07\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e23\u0e30\u0e1a\u0e1a",
    "my-ms": "Ralat berlaku semasa log keluar."
  },
  "error.sync": {
    "id-id": "Terjadi kesalahan saat sinkronisasi.",
    "kh-km": "\u1798\u17b6\u1793\u1794\u1789\u17d2\u17a0\u17b6\u1796\u17c1\u179b\u1792\u17d2\u179c\u17be\u179f\u1798\u1780\u17b6\u179b\u1780\u1798\u17d2\u1798\u17d4",
    "mm-my": "\u1005\u1004\u1037\u103A\u1001\u103A\u101C\u102F\u1015\u103A\u1014\u1031\u1005\u1009\u103A \u1021\u1019\u103E\u102C\u1038\u1016\u103C\u1005\u103A\u101E\u103D\u102C\u1038\u101E\u100A\u103A\u104B",
    "th-th": "\u0e40\u0e01\u0e34\u0e14\u0e02\u0e49\u0e2d\u0e1c\u0e34\u0e14\u0e1e\u0e25\u0e32\u0e14\u0e23\u0e30\u0e2b\u0e27\u0e48\u0e32\u0e07\u0e0b\u0e34\u0e07\u0e01\u0e4c",
    "my-ms": "Ralat berlaku semasa segerak."
  },
  "error.syncFailed": {
    "id-id": "Sinkronisasi gagal.",
    "kh-km": "\u1780\u17b6\u179a\u1792\u17d2\u179c\u17be\u179f\u1798\u1780\u17b6\u179b\u1780\u1798\u17d2\u1798\u1794\u17b6\u1793\u1794\u179a\u17b6\u1794\u17cb\u1794\u17d0\u179a\u17c6\u17a0\u17c2\u17d4",
    "mm-my": "\u1005\u1004\u1037\u103A\u1001\u103A\u1019\u1021\u102C\u1004\u103A\u1019\u103C\u1004\u103A\u1015\u102B\u104B",
    "th-th": "\u0e0b\u0e34\u0e07\u0e01\u0e4c\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08",
    "my-ms": "Segerak gagal."
  },
  "guide.panelTitle": {
    "id-id": "Tips belajar {nativeLabel}",
    "kh-km": "\u1782\u1793\u17d2\u179b\u17b9\u17c7\u179a\u17c0\u1793 {nativeLabel}",
    "mm-my": "{nativeLabel} \u101E\u1004\u103A\u101A\u1030\u101B\u1014\u103A \u1021\u1000\u103C\u1036\u1015\u103C\u102F\u1001\u103B\u1000\u103A",
    "th-th": "\u0e40\u0e04\u0e25\u0e47\u0e14\u0e25\u0e31\u0e1a\u0e40\u0e23\u0e35\u0e22\u0e19 {nativeLabel}",
    "my-ms": "Tip belajar {nativeLabel}"
  },
  "home.lesson.day": {
    "id-id": "Day {day}",
    "kh-km": "Day {day}",
    "mm-my": "Day {day}",
    "th-th": "Day {day}",
    "my-ms": "Day {day}"
  },
  "home.lesson.dayDone": {
    "id-id": "Day {day} selesai",
    "kh-km": "Day {day} \u1794\u17b6\u1793\u1794\u1789\u17d2\u1785\u1794\u17cb",
    "mm-my": "Day {day} \u1015\u103c\u102e\u1038\u1015\u103c\u102e",
    "th-th": "Day {day} \u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27",
    "my-ms": "Day {day} selesai"
  },
  "home.lesson.heading": {
    "id-id": "Day {day}. {title}",
    "kh-km": "Day {day}. {title}",
    "mm-my": "Day {day}. {title}",
    "th-th": "Day {day} · {title}",
    "my-ms": "Day {day}. {title}"
  },
  "home.lesson.meta": {
    "id-id": "{percent}% selesai · target {dailyGoal} menit",
    "kh-km": "{percent}% \u1794\u17b6\u1793\u179a\u17c0\u1793\u17a0\u17be\u1799 · \u1782\u17c4\u179b\u178a\u17c5 {dailyGoal} \u1793\u17b6\u1791\u17b8",
    "mm-my": "{percent}% \u1015\u103C\u102E\u1038\u1015\u103C\u102E · \u1015\u1014\u103A\u1038\u1010\u102D\u102F\u1004\u103A {dailyGoal} \u1019\u102D\u1014\u1005\u103A",
    "th-th": "\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27 {percent}% · \u0e40\u0e1b\u0e49\u0e32\u0e2b\u0e21\u0e32\u0e22 {dailyGoal} \u0e19\u0e32\u0e17\u0e35",
    "my-ms": "{percent}% siap · sasaran {dailyGoal} minit"
  },
  "home.lesson.progressAriaLabel": {
    "id-id": "Progres Day {day} {percent}%",
    "kh-km": "\u179c\u17d2\u178c\u17d2\u178d\u1793\u1797\u17b6\u1796 Day {day} {percent}%",
    "mm-my": "Day {day} \u1010\u102D\u102F\u1038\u1010\u1000\u103A\u1019\u103E\u102F {percent}%",
    "th-th": "\u0e04\u0e27\u0e32\u0e21\u0e04\u0e37\u0e1a\u0e2b\u0e19\u0e49\u0e32 Day {day} {percent}%",
    "my-ms": "Kemajuan Day {day} {percent}%"
  },
  "home.lesson.resume": {
    "id-id": "Lanjutkan",
    "kh-km": "\u1794\u1793\u17d2\u178f",
    "mm-my": "\u1006\u1000\u103A\u101C\u1000\u103A",
    "th-th": "\u0e40\u0e23\u0e35\u0e22\u0e19\u0e15\u0e48\u0e2d",
    "my-ms": "Teruskan"
  },
  "home.metric.reviewCount": {
    "id-id": "Item review",
    "kh-km": "\u1792\u17b6\u178f\u17bb\u17a2\u17bb\u1793\u1787\u17b6\u1790\u17be\u17d0\u1784",
    "mm-my": "\u1015\u103C\u1014\u103A\u101C\u100A\u103A\u1000\u103C\u100A\u1037\u103A\u101B\u1019\u100A\u1037\u103A \u1021\u1005\u102D\u1010\u103A\u1021\u1015\u102D\u102F\u1004\u103A\u1038",
    "th-th": "\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e17\u0e1a\u0e17\u0e27\u0e19",
    "my-ms": "Item ulang kaji"
  },
  "home.metric.savedCount": {
    "id-id": "Kalimat tersimpan",
    "kh-km": "\u1794\u17d2\u179a\u1799\u17c4\u1782\u178a\u17c2\u179b\u1794\u17b6\u1793\u179a\u1780\u17d2\u179f\u17b6\u1791\u17bb\u1780",
    "mm-my": "\u101E\u102D\u1019\u103A\u1038\u1006\u100A\u103A\u1038\u1011\u102C\u1038\u101E\u1031\u102C \u1005\u102C\u1000\u103C\u1031\u102C\u1004\u103A\u1038\u1019\u103B\u102C\u1038",
    "th-th": "\u0e1b\u0e23\u0e30\u0e42\u0e22\u0e04\u0e17\u0e35\u0e48\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e44\u0e27\u0e49",
    "my-ms": "Ayat disimpan"
  },
  "home.metric.todayLesson": {
    "id-id": "Pelajaran hari ini",
    "kh-km": "\u1798\u17c1\u179a\u17c0\u1793\u1790\u17d2\u1784\u17c3\u1793\u17c1\u17c7",
    "mm-my": "\u1012\u102E\u1014\u1031\u1037\u101E\u1004\u103A\u1001\u1014\u103A\u1038\u1005\u102C",
    "th-th": "\u0e1a\u0e17\u0e40\u0e23\u0e35\u0e22\u0e19\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49",
    "my-ms": "Pelajaran hari ini"
  },
  "home.metric.tutor": {
    "id-id": "Tutor",
    "kh-km": "\u1782\u17d2\u179a\u17bc",
    "mm-my": "\u1006\u101B\u102C",
    "th-th": "\u0e15\u0e34\u0e27\u0e40\u0e15\u0e2d\u0e23\u0e4c",
    "my-ms": "Tutor"
  },
  "onboarding.minuteUnit": {
    "id-id": "menit",
    "kh-km": "\u1793\u17b6\u1791\u17b8",
    "mm-my": "\u1019\u102D\u1014\u1005\u103A",
    "th-th": "\u0e19\u0e32\u0e17\u0e35",
    "my-ms": "minit"
  },
  "time.daysLater": {
    "id-id": "{days} hari lagi",
    "kh-km": "\u1793\u17c5\u1794\u1793\u17d2\u1791\u17b6\u1794\u17cb\u1796\u17b8 {days} \u1790\u17d2\u1784\u17c3",
    "mm-my": "{days} \u101B\u1000\u103A\u1021\u1000\u103C\u102C",
    "th-th": "\u0e2d\u0e35\u0e01 {days} \u0e27\u0e31\u0e19",
    "my-ms": "{days} hari lagi"
  },
  "time.hoursLater": {
    "id-id": "{hours} jam lagi",
    "kh-km": "\u1793\u17c5\u1794\u1793\u17d2\u1791\u17b6\u1794\u17cb\u1796\u17b8 {hours} \u1798\u17c9\u17c4\u1784",
    "mm-my": "{hours} \u1014\u102C\u101B\u102E\u1021\u1000\u103C\u102C",
    "th-th": "\u0e2d\u0e35\u0e01 {hours} \u0e0a\u0e21.",
    "my-ms": "{hours} jam lagi"
  },
  "time.now": {
    "id-id": "Sekarang",
    "kh-km": "\u17a5\u17a1\u17bc\u179c\u1793\u17c1\u17c7",
    "mm-my": "\u101a\u1001\u102f",
    "th-th": "\u0e15\u0e2d\u0e19\u0e19\u0e35\u0e49",
    "my-ms": "Sekarang"
  }
};
