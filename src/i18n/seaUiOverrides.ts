import type { CountryPackId } from "../types";
import { uiCatalog } from "./ui";

type UiKey = keyof typeof uiCatalog;

type PartialLocalized = Partial<Record<CountryPackId, string>>;

export const seaUiOverrides: Partial<Record<UiKey, PartialLocalized>> = {
  "nav.home": {
    "id-id": "Beranda",
    "kh-km": "Home",
    "mm-my": "Home",
    "th-th": "หน้าหลัก",
    "my-ms": "Laman utama"
  },
  "nav.lesson": {
    "id-id": "Pelajaran",
    "kh-km": "Lesson",
    "mm-my": "Lesson",
    "th-th": "บทเรียน",
    "my-ms": "Pelajaran"
  },
  "nav.review": {
    "id-id": "Ulangi",
    "kh-km": "Review",
    "mm-my": "Review",
    "th-th": "ทบทวน",
    "my-ms": "Ulang kaji"
  },
  "nav.settings": {
    "id-id": "Pengaturan",
    "kh-km": "Settings",
    "mm-my": "Settings",
    "th-th": "ตั้งค่า",
    "my-ms": "Tetapan"
  },
  "common.start": {
    "id-id": "Mulai",
    "kh-km": "Start",
    "mm-my": "Start",
    "th-th": "เริ่ม",
    "my-ms": "Mula"
  },
  "common.continue": {
    "id-id": "Lanjut",
    "kh-km": "Continue",
    "mm-my": "Continue",
    "th-th": "ต่อ",
    "my-ms": "Teruskan"
  },
  "common.next": {
    "id-id": "Berikutnya",
    "kh-km": "Next",
    "mm-my": "Next",
    "th-th": "ถัดไป",
    "my-ms": "Seterusnya"
  },
  "common.prev": {
    "id-id": "Kembali",
    "kh-km": "Back",
    "mm-my": "Back",
    "th-th": "ย้อนกลับ",
    "my-ms": "Kembali"
  },
  "common.close": {
    "id-id": "Tutup",
    "kh-km": "Close",
    "mm-my": "Close",
    "th-th": "ปิด",
    "my-ms": "Tutup"
  },
  "goal.travel": {
    "id-id": "Perjalanan",
    "kh-km": "Travel",
    "mm-my": "Travel",
    "th-th": "ท่องเที่ยว",
    "my-ms": "Perjalanan"
  },
  "goal.daily": {
    "id-id": "Percakapan harian",
    "kh-km": "Daily conversation",
    "mm-my": "Daily conversation",
    "th-th": "บทสนทนาประจำวัน",
    "my-ms": "Perbualan harian"
  },
  "goal.study": {
    "id-id": "Belajar",
    "kh-km": "Study",
    "mm-my": "Study",
    "th-th": "เรียนต่อ",
    "my-ms": "Belajar"
  },
  "goal.work": {
    "id-id": "Kerja",
    "kh-km": "Work",
    "mm-my": "Work",
    "th-th": "งาน",
    "my-ms": "Kerja"
  },
  "goal.life": {
    "id-id": "Hidup di Korea",
    "kh-km": "Life in Korea",
    "mm-my": "Life in Korea",
    "th-th": "การใช้ชีวิตในเกาหลี",
    "my-ms": "Hidup di Korea"
  },
  "goal.k-content": {
    "id-id": "Konten Korea",
    "kh-km": "K-content",
    "mm-my": "K-content",
    "th-th": "คอนเทนต์เกาหลี",
    "my-ms": "Kandungan Korea"
  },
  "guide.focus": {
    "id-id": "Fokus",
    "kh-km": "Focus",
    "mm-my": "Focus",
    "th-th": "จุดเน้น",
    "my-ms": "Fokus"
  },
  "guide.pronunciation": {
    "id-id": "Pelafalan",
    "kh-km": "Pronunciation",
    "mm-my": "Pronunciation",
    "th-th": "การออกเสียง",
    "my-ms": "Sebutan"
  },
  "guide.structure": {
    "id-id": "Struktur",
    "kh-km": "Structure",
    "mm-my": "Structure",
    "th-th": "โครงสร้าง",
    "my-ms": "Struktur"
  },
  "guide.review": {
    "id-id": "Kebiasaan review",
    "kh-km": "Review habit",
    "mm-my": "Review habit",
    "th-th": "นิสัยการทบทวน",
    "my-ms": "Tabiat ulang kaji"
  },
  "guide.offline": {
    "id-id": "Offline",
    "kh-km": "Offline",
    "mm-my": "Offline",
    "th-th": "ออฟไลน์",
    "my-ms": "Luar talian"
  },
  "review.action.hard": {
    "id-id": "Masih sulit",
    "kh-km": "Still difficult",
    "mm-my": "Still difficult",
    "th-th": "ยังยากอยู่",
    "my-ms": "Masih sukar"
  },
  "review.action.success": {
    "id-id": "Saya ingat",
    "kh-km": "I remember",
    "mm-my": "I remember",
    "th-th": "ฉันจำได้แล้ว",
    "my-ms": "Saya ingat"
  },
  "saved.title": {
    "id-id": "Kalimat tersimpan",
    "kh-km": "Saved phrases",
    "mm-my": "Saved phrases",
    "th-th": "ประโยคที่บันทึกไว้",
    "my-ms": "Ayat disimpan"
  },
  "settings.title": {
    "id-id": "Pengaturan belajar saya",
    "kh-km": "My learning settings",
    "mm-my": "My learning settings",
    "th-th": "การตั้งค่าการเรียนของฉัน",
    "my-ms": "Tetapan pembelajaran saya"
  }
};
