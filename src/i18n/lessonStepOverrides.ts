import type { CountryPackId, LessonStep } from "../types";

type StepTextOverride = {
  title?: Partial<Record<CountryPackId, string>>;
  body?: Partial<Record<CountryPackId, string>>;
};

const stepOverrides: Partial<Record<LessonStep["id"], StepTextOverride>> = {
  situation: {
    title: {
      "id-id": "Situasi hari ini",
      "kh-km": "ស្ថានភាពថ្ងៃនេះ",
      "mm-my": "ဒီနေ့အခြေအနေ",
      "th-th": "สถานการณ์ของวันนี้",
      "my-ms": "Situasi hari ini"
    }
  },
  dialogue: {
    title: {
      "id-id": "Dengarkan dialog lengkap",
      "kh-km": "ស្តាប់សន្ទនាទាំងមូល",
      "mm-my": "စကားပြောတစ်ခုလုံးကို နားထောင်ပါ",
      "th-th": "ฟังบทสนทนาทั้งหมด",
      "my-ms": "Dengar dialog penuh"
    },
    body: {
      "id-id": "Dengarkan dialog pendeknya dulu, lalu cari giliranmu untuk bicara.",
      "kh-km": "ស្តាប់សន្ទនាខ្លីជាមុនសិន បន្ទាប់មកស្វែងរកវេនរបស់អ្នកក្នុងការនិយាយ។",
      "mm-my": "စကားပြောတိုတစ်ခုကို အရင်နားထောင်ပြီးနောက် သင့်ပြောရမယ့်အလှည့်ကို ရှာပါ။",
      "th-th": "ฟังบทสนทนาสั้นๆ ก่อน แล้วหาจังหวะที่คุณต้องพูด",
      "my-ms": "Dengar dialog ringkas dahulu, kemudian cari giliran anda untuk bercakap."
    }
  },
  phrase: {
    title: {
      "id-id": "Kalimat hari ini",
      "kh-km": "ប្រយោគថ្ងៃនេះ",
      "mm-my": "ဒီနေ့ဝါကျ",
      "th-th": "ประโยคของวันนี้",
      "my-ms": "Ayat hari ini"
    },
    body: {
      "id-id": "Dengarkan sambil cek maknanya bersama.",
      "kh-km": "ស្តាប់ទៅជាមួយការពិនិត្យមើលន័យរួមគ្នា។",
      "mm-my": "နားထောင်ပြီး အဓိပ္ပာယ်ကို အတူစစ်ကြည့်ပါ။",
      "th-th": "ฟังไปพร้อมกับเช็กความหมายด้วย",
      "my-ms": "Dengar sambil semak maksudnya bersama."
    }
  },
  structure: {
    title: {
      "id-id": "Struktur kalimat",
      "kh-km": "រចនាសម្ព័ន្ធប្រយោគ",
      "mm-my": "ဝါကျဖွဲ့ပုံ",
      "th-th": "โครงสร้างประโยค",
      "my-ms": "Struktur ayat"
    },
    body: {
      "id-id": "Cek polanya dulu sebelum istilah tata bahasa.",
      "kh-km": "ពិនិត្យលំនាំដែលអ្នកអាចប្រើបានភ្លាម មុនពេលចូលទៅកាន់ពាក្យវេយ្យាករណ៍។",
      "mm-my": "ဗျူဟာဝေယျာကရ သဘောတရားမဝင်ခင် အသုံးချနိုင်တဲ့ pattern ကို အရင်ကြည့်ပါ။",
      "th-th": "ดูรูปแบบที่ใช้ได้ทันที ก่อนจะไปถึงคำศัพท์ไวยากรณ์",
      "my-ms": "Semak pola yang boleh terus digunakan sebelum istilah tatabahasa."
    }
  },
  swap: {
    title: {
      "id-id": "Tukar kata",
      "kh-km": "ប្ដូរពាក្យ",
      "mm-my": "စကားလုံးပြောင်းပါ",
      "th-th": "สลับคำ",
      "my-ms": "Tukar perkataan"
    },
    body: {
      "id-id": "Ganti satu kata lalu ucapkan lagi di situasi yang sama.",
      "kh-km": "ប្ដូរពាក្យមួយ ហើយនិយាយវាម្តងទៀតក្នុងស្ថានភាពដដែល។",
      "mm-my": "စကားလုံးတစ်လုံးကို ပြောင်းပြီး အခြေအနေတူတူမှာ ထပ်ပြောပါ။",
      "th-th": "เปลี่ยนหนึ่งคำ แล้วพูดอีกครั้งในสถานการณ์เดิม",
      "my-ms": "Tukar satu perkataan kemudian sebut semula dalam situasi yang sama."
    }
  },
  "natural-listen": {
    title: {
      "id-id": "Dengar pada kecepatan normal",
      "kh-km": "ស្តាប់ក្នុងល្បឿនធម្មតា",
      "mm-my": "ပုံမှန်အမြန်နှုန်းနဲ့ နားထောင်ပါ",
      "th-th": "ฟังด้วยความเร็วปกติ",
      "my-ms": "Dengar pada kelajuan biasa"
    },
    body: {
      "id-id": "Tangkap ritme penuhnya dulu.",
      "kh-km": "ចាប់យកចង្វាក់ពេញលេញជាមុនសិន។",
      "mm-my": "ရစ်သမ်တစ်ခုလုံးကို အရင်ဖမ်းပါ။",
      "th-th": "จับจังหวะทั้งหมดให้ได้ก่อน",
      "my-ms": "Tangkap ritma penuhnya dahulu."
    }
  },
  "slow-listen": {
    title: {
      "id-id": "Dengar pada kecepatan lambat",
      "kh-km": "ស្តាប់ក្នុងល្បឿនយឺត",
      "mm-my": "ဖြည်းဖြည်းအမြန်နှုန်းနဲ့ နားထောင်ပါ",
      "th-th": "ฟังด้วยความเร็วช้า",
      "my-ms": "Dengar pada kelajuan perlahan"
    },
    body: {
      "id-id": "Periksa bunyi yang belum akrab dengan lebih teliti.",
      "kh-km": "ពិនិត្យសំឡេងដែលមិនទាន់ស្គាល់ឲ្យបានម៉ត់ចត់។",
      "mm-my": "မရင်းနှီးသေးတဲ့ အသံတွေကို ပိုသေချာစွာ စစ်ကြည့်ပါ။",
      "th-th": "ตรวจดูเสียงที่ยังไม่คุ้นให้ละเอียดขึ้น",
      "my-ms": "Periksa bunyi yang belum biasa dengan lebih teliti."
    }
  },
  record: {
    title: {
      "id-id": "Ucapkan dengan suaramu sendiri",
      "kh-km": "និយាយដោយសំឡេងរបស់អ្នកផ្ទាល់",
      "mm-my": "သင့်အသံနဲ့ ပြောပါ",
      "th-th": "พูดด้วยเสียงของคุณเอง",
      "my-ms": "Sebut dengan suara anda sendiri"
    },
    body: {
      "id-id": "Ucapkan sekali, lalu rekam lagi kalau perlu.",
      "kh-km": "និយាយម្តងសិន បន្ទាប់មកថតម្តងទៀតប្រសិនបើចាំបាច់។",
      "mm-my": "တစ်ခါပြောပြီး လိုအပ်ရင် ထပ်ဖမ်းပါ။",
      "th-th": "พูดหนึ่งครั้ง แล้วอัดใหม่ถ้าจำเป็น",
      "my-ms": "Sebut sekali, kemudian rakam semula jika perlu."
    }
  },
  compare: {
    title: {
      "id-id": "Bandingkan suara asli dan suaramu",
      "kh-km": "ប្រៀបធៀបសំឡេងដើម និងសំឡេងរបស់អ្នក",
      "mm-my": "မူရင်းအသံနဲ့ သင့်အသံကို နှိုင်းယှဉ်ပါ",
      "th-th": "เปรียบเทียบเสียงต้นฉบับกับเสียงของคุณ",
      "my-ms": "Bandingkan suara asal dan suara anda"
    },
    body: {
      "id-id": "Dengar bergantian antara suara asli dan ritmemu sendiri, tanpa penilaian skor.",
      "kh-km": "ប្ដូរស្តាប់រវាងសំឡេងដើម និងចង្វាក់របស់អ្នក ដោយមិនមានការដាក់ពិន្ទុ។",
      "mm-my": "မူရင်းအသံနဲ့ သင့်ရစ်သမ်ကို အလှည့်ကျနားထောင်ပါ။ အမှတ်ပေးတာမရှိပါ။",
      "th-th": "สลับฟังระหว่างเสียงต้นฉบับกับจังหวะของคุณเอง โดยไม่มีการให้คะแนน",
      "my-ms": "Selang-seli dengar antara suara asal dan ritma anda sendiri, tanpa pemarkahan."
    }
  },
  quiz: {
    title: {
      "id-id": "Cek cepat",
      "kh-km": "ពិនិត្យរហ័ស",
      "mm-my": "အမြန်စစ်ဆေးမှု",
      "th-th": "เช็กสั้นๆ",
      "my-ms": "Semakan pantas"
    },
    body: {
      "id-id": "Situasi mana yang paling alami untuk ungkapan ini?",
      "kh-km": "ស្ថានភាពណាដែលធម្មជាតិជាងគេសម្រាប់ការប្រើឃ្លានេះ?",
      "mm-my": "ဒီ expression ကို သုံးဖို့ အကောင်းဆုံးအခြေအနေက ဘာလဲ။",
      "th-th": "สถานการณ์ไหนธรรมชาติที่สุดสำหรับการใช้สำนวนนี้",
      "my-ms": "Situasi manakah yang paling semula jadi untuk menggunakan ungkapan ini?"
    }
  },
  roleplay: {
    title: {
      "id-id": "Roleplay singkat",
      "kh-km": "តួនាទីសម្តែងខ្លី",
      "mm-my": "roleplay တို",
      "th-th": "โรลเพลย์สั้นๆ",
      "my-ms": "Main peranan ringkas"
    },
    body: {
      "id-id": "Setelah respons singkat dari lawan bicara, jawab dengan kalimat hari ini.",
      "kh-km": "បន្ទាប់ពីការឆ្លើយតបខ្លីពីអ្នកម្ខាងទៀត សូមឆ្លើយជាមួយប្រយោគរបស់ថ្ងៃនេះ។",
      "mm-my": "တစ်ဖက်လူက တုံ့ပြန်တိုတိုပေးပြီးနောက် ဒီနေ့ဝါကျနဲ့ ပြန်ဖြေပါ။",
      "th-th": "หลังจากอีกฝ่ายตอบสั้นๆ ให้ตอบกลับด้วยประโยคของวันนี้",
      "my-ms": "Selepas respons ringkas daripada pasangan, jawab dengan ayat hari ini."
    }
  },
  summary: {
    title: {
      "id-id": "Rangkuman hari ini",
      "kh-km": "សេចក្តីសរុបថ្ងៃនេះ",
      "mm-my": "ဒီနေ့အကျဉ်းချုပ်",
      "th-th": "สรุปของวันนี้",
      "my-ms": "Rumusan hari ini"
    }
  }
};

export const getLessonStepText = (step: LessonStep, packId: CountryPackId) => {
  const override = stepOverrides[step.id];
  return {
    title: override?.title?.[packId] ?? step.title,
    body: override?.body?.[packId] ?? step.body
  };
};
