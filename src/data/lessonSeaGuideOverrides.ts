import type { CountryPackId } from "../types";

type SeaGuidePackId = Extract<CountryPackId, "id-id" | "kh-km" | "mm-my">;

const seaGuideStringOverrides: Record<string, Record<SeaGuidePackId, string>> = {
  "Korean often puts the object or place before the action. Say the whole phrase once, then notice how the last ending carries politeness and intent.": {
    "id-id":
      "Dalam bahasa Korea, benda atau tempat sering muncul sebelum tindakan. Ucapkan dulu seluruh kalimatnya, lalu perhatikan bagaimana akhiran terakhir membawa nuansa sopan dan maksudnya.",
    "kh-km":
      "នៅក្នុងភាសាកូរ៉េ វត្ថុ ឬ ទីកន្លែង ជាញឹកញាប់ស្ថិតមុនសកម្មភាព។ សាកនិយាយប្រយោគទាំងមូលម្តងសិន ហើយបន្ទាប់មកសង្កេតមើលថា ចុងប្រយោគបង្ហាញភាពគួរសម និងចេតនាយ៉ាងដូចម្តេច។",
    "mm-my":
      "ကိုရီးယားဘာသာမှာ ပစ္စည်း ဒါမှမဟုတ် နေရာကို အလုပ်မလုပ်မီ အရင်ပြောလေ့ရှိပါတယ်။ ဝါကျတစ်ခုလုံးကို အရင်ပြောပြီး နောက်ဆုံးအဆုံးသတ်က ယဉ်ကျေးမှုနဲ့ ရည်ရွယ်ချက်ကို ဘယ်လိုသယ်ဆောင်သလဲ စောင့်ကြည့်ပါ။"
  },
  "Listen for the sentence ending first. Korean politeness often lives in the final sound, so match the ending and rhythm before fixing each syllable.": {
    "id-id":
      "Dengarkan dulu akhiran kalimatnya. Dalam bahasa Korea, nuansa sopan sering hidup di bunyi terakhir, jadi cocokkan bagian akhir dan ritmenya sebelum membetulkan tiap suku kata.",
    "kh-km":
      "ស្តាប់ចុងប្រយោគជាមុនសិន។ ភាពគួរសមក្នុងភាសាកូរ៉េជាច្រើនស្ថិតនៅសំឡេងចុងក្រោយ ដូច្នេះសូមចាប់ឱ្យបានចុងប្រយោគ និងចង្វាក់ជាមុន មុនពេលកែតាមព្យាង្គនីមួយៗ។",
    "mm-my":
      "ဝါကျအဆုံးသတ်သံကို အရင်နားထောင်ပါ။ ကိုရီးယားလို ယဉ်ကျေးသဘောအများစုဟာ နောက်ဆုံးသံမှာရှိလေ့ရှိတာကြောင့် အဆုံးသတ်နဲ့ ရစ်သမ်ကို အရင်ကိုက်အောင်လုပ်ပြီးမှ အသံတစ်လုံးချင်းကို ပြင်ပါ။"
  },
  "Listen and choose when you would use this sentence.": {
    "id-id": "Dengarkan lalu pilih kapan kamu akan memakai kalimat ini.",
    "kh-km": "ស្តាប់ ហើយជ្រើសរើសថា អ្នកនឹងប្រើប្រយោគនេះនៅពេលណា។",
    "mm-my": "နားထောင်ပြီး ဒီဝါကျကို ဘယ်အချိန်မှာ သုံးမလဲဆိုတာ ရွေးပါ။"
  },
  "Say it from the meaning, then compare with the native audio.": {
    "id-id": "Ucapkan dari maknanya, lalu bandingkan dengan audio penutur asli.",
    "kh-km": "មើលន័យ ហើយនិយាយវាចេញមក បន្ទាប់មកប្រៀបធៀបជាមួយសំឡេងដើម។",
    "mm-my": "အဓိပ္ပာယ်ကိုကြည့်ပြီး ပြောကြည့်ပါ၊ ပြီးရင် မူရင်းအသံနဲ့ နှိုင်းယှဉ်ပါ။"
  },
  "This core phrase is the easiest way to begin review, so it helps you tune your ear to the sound and rhythm before you try to recall the meaning.": {
    "id-id":
      "Kalimat inti ini adalah cara paling ringan untuk memulai review, jadi telingamu bisa kembali akrab dengan bunyi dan ritmenya sebelum mengingat artinya.",
    "kh-km":
      "ប្រយោគស្នូលនេះជាវិធីស្រាលបំផុតសម្រាប់ចាប់ផ្តើមការរំលឹកឡើងវិញ ដូច្នេះវាជួយឲ្យត្រចៀករបស់អ្នកស្គាល់សំឡេង និងចង្វាក់វិញ មុនពេលរំលឹកន័យឡើងវិញ។",
    "mm-my":
      "ဒီအဓိကဝါကျက review စဖို့ အလွယ်ဆုံးဖြစ်ပြီး အဓိပ္ပာယ်ကို မမှတ်မိခင် အသံနဲ့ ရစ်သမ်ကို နားက ပြန်ရင်းနှီးလာအောင် ကူညီပေးပါတယ်။"
  },
  "This is a strong model sentence for pulling the Korean out from meaning alone, so it is useful for comparing your own speaking habit with the reference audio.": {
    "id-id":
      "Ini kalimat contoh yang kuat untuk melatih mengeluarkan bahasa Korea langsung dari maknanya, jadi cocok untuk membandingkan kebiasaan bicaramu dengan audio acuan.",
    "kh-km":
      "នេះជាប្រយោគគំរូដ៏ល្អសម្រាប់ហាត់ទាញភាសាកូរ៉េចេញពីន័យដោយផ្ទាល់ ដូច្នេះវាសមស្របសម្រាប់ប្រៀបធៀបទម្លាប់និយាយរបស់អ្នកជាមួយសំឡេងយោង។",
    "mm-my":
      "ဒီဝါကျက အဓိပ္ပာယ်ကနေ ကိုရီးယားလိုကို တိုက်ရိုက်ထုတ်ပြောလေ့ကျင့်ဖို့ အရမ်းကောင်းတဲ့ မော်ဒယ်ဝါကျဖြစ်တာကြောင့် သင့်ပြောစကားအလေ့အထနဲ့ ရည်ညွှန်းအသံကို နှိုင်းယှဉ်ဖို့ သင့်တော်ပါတယ်။"
  },
  "Because this sentence has to connect right after the other person speaks, it is the best fit for practicing quick, real-conversation reactions.": {
    "id-id":
      "Karena kalimat ini harus langsung tersambung setelah lawan bicara selesai, ini paling cocok untuk melatih reaksi cepat seperti percakapan nyata.",
    "kh-km":
      "ព្រោះប្រយោគនេះត្រូវភ្ជាប់ភ្លាមៗបន្ទាប់ពីអ្នកម្ខាងទៀតនិយាយចប់ វាសមបំផុតសម្រាប់ហាត់ប្រតិកម្មរហ័សដូចក្នុងការសន្ទនាពិត។",
    "mm-my":
      "ဒီဝါကျက တစ်ဖက်လူပြောပြီးတာနဲ့ ချက်ချင်းဆက်ပြောရတာဖြစ်လို့ တကယ့်စကားပြောလို မြန်မြန်တုံ့ပြန်လေ့ကျင့်ဖို့ အလိုက်ဖက်ဆုံးပါ။"
  },
  "The ending `-yo` makes the greeting polite. Keep `annyeonghaseyo` in one smooth breath and let the tone fall softly at the end.": {
    "id-id":
      "Akhiran `-yo` membuat salam ini terdengar sopan. Ucapkan `annyeonghaseyo` dalam satu aliran napas dan turunkan nada dengan lembut di akhir.",
    "kh-km":
      "បច្ច័យ `-yo` ធ្វើឲ្យការសួរសុខទុក្ខនេះស្តាប់ទៅគួរសម។ និយាយ `annyeonghaseyo` ឲ្យរលូនក្នុងដង្ហើមតែមួយ ហើយបន្ថយសម្លេងទន់ៗនៅចុងប្រយោគ។",
    "mm-my":
      "`-yo` အဆုံးသတ်က နှုတ်ဆက်စကားကို ယဉ်ကျေးစေပါတယ်။ `annyeonghaseyo` ကို အသက်ရှူတစ်ချက်တည်းနဲ့ ချောချောမွေ့မွေ့ပြောပြီး အဆုံးမှာ အသံကို နူးနူးညံ့ညံ့ချပါ။"
  },
  "Use `N hana juseyo` for a simple order. Put the item name first, then finish with `juseyo` as one polite chunk.": {
    "id-id":
      "Gunakan `N hana juseyo` untuk pesanan sederhana. Sebut nama barang lebih dulu, lalu tutup dengan `juseyo` sebagai satu blok sopan.",
    "kh-km":
      "ប្រើ `N hana juseyo` សម្រាប់ការកុម្ម៉ង់ធម្មតា។ និយាយឈ្មោះរបស់មុនសិន ហើយបញ្ចប់ដោយ `juseyo` ជាឃ្លាគួរសមតែមួយ។",
    "mm-my":
      "အလွယ်တကူမှာယူချင်ရင် `N hana juseyo` ကိုသုံးပါ။ ပစ္စည်းအမည်ကို အရင်ပြောပြီး `juseyo` နဲ့ ယဉ်ကျေးတဲ့အစုတစ်ခုလို အဆုံးသတ်ပါ။"
  },
  "Pair `thank you` with a short result such as `that helped`. It sounds warmer than stopping after only `gamsahamnida`.": {
    "id-id":
      "Pasangkan `terima kasih` dengan hasil singkat seperti `itu sangat membantu`. Hasilnya terasa lebih hangat daripada berhenti hanya di `gamsahamnida`.",
    "kh-km":
      "ភ្ជាប់ `អរគុណ` ជាមួយលទ្ធផលខ្លីមួយដូចជា `វាបានជួយខ្ញុំ`។ វាស្តាប់ទៅកក់ក្តៅជាងការឈប់ត្រឹម `gamsahamnida` ប៉ុណ្ណោះ។",
    "mm-my":
      "`ကျေးဇူးတင်ပါတယ်` ကို `အဲဒါ အများကြီးကူညီခဲ့တယ်` လို ရလဒ်တိုတိုနဲ့ တွဲပြောပါ။ `gamsahamnida` တစ်ခုပဲပြောပြီး ရပ်တာထက် ပိုနွေးထွေးပါတယ်။"
  },
  "Use `N-i eodiyeyo?` to ask where a place is. The topic is the place, so say it clearly before `eodiyeyo`.": {
    "id-id":
      "Gunakan `N-i eodiyeyo?` untuk bertanya di mana suatu tempat. Fokusnya ada pada tempat itu, jadi sebutkan dulu dengan jelas sebelum `eodiyeyo`.",
    "kh-km":
      "ប្រើ `N-i eodiyeyo?` ដើម្បីសួរថា ទីកន្លែងមួយស្ថិតនៅឯណា។ ចំណុចសំខាន់គឺទីកន្លែង ដូច្នេះសូមនិយាយឈ្មោះទីនោះឲ្យច្បាស់សិន មុននឹងនិយាយ `eodiyeyo`។",
    "mm-my":
      "နေရာတစ်ခု ဘယ်မှာလဲဆိုတာ မေးချင်ရင် `N-i eodiyeyo?` ကိုသုံးပါ။ အဓိကက နေရာဖြစ်လို့ `eodiyeyo` မပြောခင် နေရာအမည်ကို ရှင်းရှင်းပြောပါ။"
  },
  "`Igeo eolmayeyo?` asks the price of something near you. Switch to `geugeo` when the item is closer to the other person.": {
    "id-id":
      "`Igeo eolmayeyo?` dipakai untuk menanyakan harga barang yang dekat denganmu. Ganti menjadi `geugeo` bila barangnya lebih dekat dengan lawan bicara.",
    "kh-km":
      "`Igeo eolmayeyo?` ប្រើសួរតម្លៃរបស់ដែលនៅជិតអ្នក។ ប្ដូរទៅ `geugeo` នៅពេលរបស់នោះនៅជិតអ្នកម្ខាងទៀតជាង។",
    "mm-my":
      "`Igeo eolmayeyo?` က သင့်နားက ပစ္စည်းဈေးကို မေးတာပါ။ ပစ္စည်းက တစ်ဖက်လူနားနီးနေတယ်ဆိုရင် `geugeo` လို့ ပြောင်းသုံးပါ။"
  },
  "Add `jogeum` before the request to sound softer. You are not refusing the conversation, only asking for a slower pace.": {
    "id-id":
      "Tambahkan `jogeum` sebelum permintaan agar terdengar lebih lembut. Kamu bukan menolak percakapan, hanya meminta kecepatannya diperlambat.",
    "kh-km":
      "បន្ថែម `jogeum` មុនសំណើ ដើម្បីឲ្យស្តាប់ទន់ភ្លន់ជាងមុន។ អ្នកមិនបានបដិសេធការសន្ទនាទេ គ្រាន់តែសុំឲ្យនិយាយយឺតបន្តិចប៉ុណ្ណោះ។",
    "mm-my":
      "တောင်းဆိုချက်ရှေ့မှာ `jogeum` ထည့်လိုက်ရင် အသံပိုပျော့သွားပါတယ်။ စကားမပြောချင်တာ မဟုတ်ဘဲ မြန်နှုန်းကို နည်းနည်းလျှော့ပေးပါလို့သာ ဆိုတာပါ။"
  },
  "`Dasi han beon` means `one more time`. It sounds more polite and complete than saying only `dasi`.": {
    "id-id":
      "`Dasi han beon` berarti `sekali lagi`. Ungkapan ini terdengar lebih lengkap dan sopan daripada hanya mengatakan `dasi`.",
    "kh-km":
      "`Dasi han beon` មានន័យថា `ម្តងទៀត`។ វាស្តាប់ទៅពេញលេញ និងគួរសមជាងការនិយាយតែ `dasi` ប៉ុណ្ណោះ។",
    "mm-my":
      "`Dasi han beon` က `တစ်ခါထပ်` လို့ အဓိပ္ပာယ်ရပါတယ်။ `dasi` တစ်လုံးပဲပြောတာထက် ပိုပြည့်စုံပြီး ယဉ်ကျေးပါတယ်။"
  },
  "Use `mwo-yeyo?` when asking what the recommended option is. It keeps the question open instead of naming one dish first.": {
    "id-id":
      "Gunakan `mwo-yeyo?` saat menanyakan pilihan yang direkomendasikan. Pertanyaannya tetap terbuka tanpa harus menyebut satu menu lebih dulu.",
    "kh-km":
      "ប្រើ `mwo-yeyo?` នៅពេលសួរថា ជម្រើសណាដែលគេណែនាំ។ វាបើកសំណួរឲ្យទូលំទូលាយ ដោយមិនចាំបាច់បញ្ជាក់ម្ហូបមួយមុនទេ។",
    "mm-my":
      "ဘယ်ရွေးချယ်မှုကို အကြံပြုလဲဆိုတာ မေးချင်ရင် `mwo-yeyo?` ကိုသုံးပါ။ ဟင်းတစ်မျိုးကို အရင်မဖော်ပြဘဲ မေးခွန်းကို ဖွင့်ထားပေးပါတယ်။"
  },
  "Use `-go sipeoyo` to say what you want politely. It is useful when checking, changing, or making a reservation.": {
    "id-id":
      "Gunakan `-go sipeoyo` untuk menyampaikan apa yang kamu inginkan dengan sopan. Ini berguna saat mengecek, mengubah, atau membuat reservasi.",
    "kh-km":
      "ប្រើ `-go sipeoyo` ដើម្បីនិយាយអំពីអ្វីដែលអ្នកចង់បានដោយគួរសម។ វាមានប្រយោជន៍ពេលពិនិត្យ ផ្លាស់ប្តូរ ឬធ្វើការកក់។",
    "mm-my":
      "`-go sipeoyo` ကို သုံးပြီး သင်လိုချင်တာကို ယဉ်ကျေးစွာပြောနိုင်ပါတယ်။ စစ်ဆေးတာ၊ ပြောင်းတာ၊ ဘိုကင်လုပ်တာတွေမှာ အသုံးဝင်ပါတယ်။"
  },
  "Two short calming lines together sound natural here: `It's okay` plus `there's no problem`. The second line removes doubt.": {
    "id-id":
      "Dua kalimat penenang pendek terdengar alami di sini: `tidak apa-apa` ditambah `tidak ada masalah`. Kalimat kedua menghilangkan rasa ragu.",
    "kh-km":
      "ប្រយោគខ្លីពីរដែលធ្វើឲ្យស្ងប់ចិត្ត ស្តាប់ទៅធម្មជាតិនៅទីនេះ៖ `មិនអីទេ` បូកជាមួយ `គ្មានបញ្ហាទេ`។ ប្រយោគទីពីរជួយដកចិត្តសង្ស័យចេញ។",
    "mm-my":
      "စိတ်အေးစေတဲ့ စာကြောင်းတိုနှစ်ကြောင်းကို တွဲပြောတာ ဒီနေရာမှာ သဘာဝကျပါတယ်။ `အဆင်ပြေပါတယ်` နဲ့ `ပြဿနာမရှိပါဘူး` ကိုပေါင်းပြောတာပါ။ ဒုတိယကြောင်းက စိတ်ပူတာကို လျှော့ချပေးပါတယ်။"
  },
  "`-ju-sil su isseoyo?` is a polite way to ask a favor. It sounds gentler than a direct command because it asks about possibility.": {
    "id-id":
      "`-ju-sil su isseoyo?` adalah cara sopan untuk meminta bantuan. Ini terdengar lebih lembut daripada perintah langsung karena menanyakan kemungkinan.",
    "kh-km":
      "`-ju-sil su isseoyo?` គឺជាវិធីគួរសមសម្រាប់សុំជំនួយ។ វាទន់ភ្លន់ជាងការបញ្ជាដោយផ្ទាល់ ព្រោះវាសួរអំពីលទ្ធភាព។",
    "mm-my":
      "`-ju-sil su isseoyo?` က အကူအညီတောင်းတဲ့ ယဉ်ကျေးပုံစံပါ။ တိုက်ရိုက်အမိန့်ပေးတာထက် ပိုပျော့သလို ကြားရတာက ဖြစ်နိုင်မလားဆိုပြီး မေးတာကြောင့်ပါ။"
  },
  "`Eodie isseoyo?` asks where something is located right now. It fits fixed places such as a restroom, elevator, or exit.": {
    "id-id":
      "`Eodie isseoyo?` dipakai untuk bertanya sesuatu berada di mana sekarang. Ungkapan ini cocok untuk tempat tetap seperti toilet, lift, atau pintu keluar.",
    "kh-km":
      "`Eodie isseoyo?` ប្រើសួរថា អ្វីមួយស្ថិតនៅឯណាឥឡូវនេះ។ វាសមស្របសម្រាប់ទីតាំងថេរៗដូចជា បន្ទប់ទឹក ជណ្តើរយន្ត ឬច្រកចេញ។",
    "mm-my":
      "`Eodie isseoyo?` က အခုအချိန်မှာ တစ်ခုခု ဘယ်နေရာမှာရှိလဲဆိုတာ မေးတာပါ။ အိမ်သာ၊ လှေကားဓာတ်လှေကား၊ ထွက်ပေါက်လို နေရာအတည်တကျတွေမှာ သင့်တော်ပါတယ်။"
  },
  "`V-aseyo/juseyo` is the short request shape you will use constantly in shops. Here it works because the action is simple and clear.": {
    "id-id":
      "`V-aseyo/juseyo` adalah bentuk permintaan singkat yang akan sering kamu pakai di toko. Bentuk ini cocok karena tindakannya sederhana dan jelas.",
    "kh-km":
      "`V-aseyo/juseyo` គឺជារូបមន្តសំណើខ្លីដែលអ្នកនឹងប្រើជាញឹកញាប់នៅហាង។ នៅទីនេះវាសមស្រប ព្រោះសកម្មភាពសាមញ្ញ និងច្បាស់លាស់។",
    "mm-my":
      "`V-aseyo/juseyo` က ဆိုင်တွေမှာ မကြာခဏသုံးရမယ့် တောင်းဆိုမှုပုံစံတိုတစ်ခုပါ။ ဒီနေရာမှာ အလုပ်လုပ်တာက လုပ်ဆောင်ချက်က ရိုးရှင်းပြီး ရှင်းလင်းလို့ပါ။"
  },
  "`Daeume tto` sets up a warm closing: `next time, again`. It sounds friendlier than ending the conversation with only goodbye.": {
    "id-id":
      "`Daeume tto` menyiapkan penutup yang hangat: `lain kali, lagi`. Ini terdengar lebih ramah daripada menutup percakapan hanya dengan selamat tinggal.",
    "kh-km":
      "`Daeume tto` បង្កើតការបិទសន្ទនាដែលកក់ក្តៅ៖ `លើកក្រោយ ម្តងទៀត`។ វាស្តាប់ទៅរួសរាយជាងការបញ្ចប់តែដោយពាក្យលា។",
    "mm-my":
      "`Daeume tto` က နွေးထွေးတဲ့ အဆုံးသတ်တစ်ခုကို ပေးပါတယ်။ `နောက်တစ်ခါ ထပ်` ဆိုတဲ့ ခံစားချက်ကိုပေးလို့ `တာ့တာ` လို့ပဲ အဆုံးသတ်တာထက် ပိုရင်းနှီးပါတယ်။"
  },
  "Keep `안녕하세요` in one flow and listen for the soft final `-yo`. In `만나서`, the `nn` sound is longer than in English.": {
    "id-id":
      "Ucapkan `안녕하세요` dalam satu aliran dan dengarkan `-yo` lembut di akhir. Pada `만나서`, bunyi `nn` lebih panjang daripada dalam bahasa Inggris.",
    "kh-km":
      "និយាយ `안녕하세요` ឲ្យជាប់លៀនតែមួយ ហើយស្តាប់ `-yo` ទន់ៗនៅចុង។ នៅក្នុង `만나서` សំឡេង `nn` វែងជាងក្នុងភាសាអង់គ្លេសបន្តិច។",
    "mm-my":
      "`안녕하세요` ကို တစ်ကြောင်းတည်းလို ဆက်ပြီးပြောကာ အဆုံးက နူးညံ့တဲ့ `-yo` ကိုနားထောင်ပါ။ `만나서` ထဲက `nn` သံဟာ အင်္ဂလိပ်ထက် ပိုရှည်ပါတယ်။"
  },
  "Stress the item, not `juseyo`. In `아이스`, the first syllable is clean and short, and `하나` should not become `hanaa`.": {
    "id-id":
      "Tekankan nama barangnya, bukan `juseyo`. Dalam `아이스`, suku kata pertama harus bersih dan pendek, dan `하나` jangan berubah menjadi `hanaa`.",
    "kh-km":
      "សង្កត់លើឈ្មោះរបស់ មិនមែនលើ `juseyo` ទេ។ នៅក្នុង `아이스` ព្យាង្គដំបូងគួរតែច្បាស់ និងខ្លី ហើយ `하나` មិនគួរតែអូសទៅជា `hanaa` ទេ។",
    "mm-my":
      "အာရုံစိုက်ရမှာက ပစ္စည်းအမည်ဖြစ်ပြီး `juseyo` မဟုတ်ပါ။ `아이스` မှာ ပထမပုဒ်သံကို တိုတိုရှင်းရှင်းပြောပြီး `하나` ကို `hanaa` လို မရှည်ပါနဲ့။"
  },
  "In `감사합니다`, keep the middle crisp instead of flattening every syllable. `도움이` links smoothly as `doumi` in fast speech.": {
    "id-id":
      "Dalam `감사합니다`, jaga bagian tengahnya tetap tegas, jangan meratakan semua suku kata. `도움이` biasanya tersambung halus seperti `doumi` saat diucapkan cepat.",
    "kh-km":
      "នៅក្នុង `감사합니다` សូមរក្សាផ្នែកកណ្តាលឲ្យច្បាស់ មិនបាច់អានព្យាង្គទាំងអស់ឲ្យស្មើគ្នាទេ។ `도움이` ពេលនិយាយលឿននឹងភ្ជាប់រលូនដូចជា `doumi`។",
    "mm-my":
      "`감사합니다` ထဲမှာ အလယ်ပိုင်းကို တိတိကျကျထားပြီး အသံတစ်လုံးချင်းကို တန်းတူမပြောပါနဲ့။ `도움이` က မြန်မြန်ပြောရင် `doumi` လိုချောချောမွေ့မွေ့ဆက်သွားပါတယ်။"
  },
  "Hold the `yeok` ending in `지하철역` cleanly. `어디예요` should rise slightly at the end because it is a question.": {
    "id-id":
      "Tutup `yeok` pada `지하철역` dengan jelas. `어디예요` perlu naik sedikit di akhir karena itu pertanyaan.",
    "kh-km":
      "បញ្ចប់ `yeok` នៅក្នុង `지하철역` ឲ្យច្បាស់។ `어디예요` គួរលើកសម្លេងបន្តិចនៅចុង ព្រោះវាជាសំណួរ។",
    "mm-my":
      "`지하철역` ထဲက `yeok` အဆုံးသံကို သေသပ်စွာပိတ်ပါ။ `어디예요` က မေးခွန်းဖြစ်လို့ အဆုံးမှာ အသံနည်းနည်းတက်သင့်ပါတယ်။"
  },
  "`얼마예요` often sounds connected, almost like `eolmayeyo`. Keep the `won` in `만 원` short and firm.": {
    "id-id":
      "`얼마예요` biasanya terdengar tersambung, hampir seperti `eolmayeyo`. Jaga `won` dalam `만 원` tetap pendek dan tegas.",
    "kh-km":
      "`얼마예요` ជាញឹកញាប់ស្តាប់ទៅជាប់គ្នា ដូចជា `eolmayeyo`។ រក្សា `won` ក្នុង `만 원` ឲ្យខ្លី និងច្បាស់។",
    "mm-my":
      "`얼마예요` ကို အများအားဖြင့် ဆက်သံနဲ့ ပြောပြီး `eolmayeyo` လိုပဲကြားရတတ်ပါတယ်။ `만 원` ထဲက `won` ကို တိုတိုခိုင်ခိုင်ပြောပါ။"
  },
  "Stretch `천` and `히` just a little in `천천히`, but keep the sentence moving. `말해 주세요` should sound like one request, not three separate words.": {
    "id-id":
      "Panjangkan `천` dan `히` sedikit dalam `천천히`, tetapi ritme kalimat harus tetap berjalan. `말해 주세요` perlu terdengar sebagai satu permintaan, bukan tiga kata terpisah.",
    "kh-km":
      "អូស `천` និង `히` បន្តិចនៅក្នុង `천천히` ប៉ុន្តែរក្សាចង្វាក់ប្រយោគឲ្យទៅមុខជាប់ៗ។ `말해 주세요` គួរស្តាប់ទៅដូចជាសំណើតែមួយ មិនមែនបីពាក្យបែកពីគ្នាទេ។",
    "mm-my":
      "`천천히` ထဲက `천` နဲ့ `히` ကို နည်းနည်းရှည်ပေးပါ၊ ဒါပေမယ့် ဝါကျရစ်သမ်ကို ဆက်သွားစေပါ။ `말해 주세요` ကို စကားလုံးသုံးလုံးကွဲကွဲ မဟုတ်ဘဲ တောင်းဆိုချက်တစ်ခုတည်းလို ကြားရသင့်ပါတယ်။"
  },
  "The `han beon` part carries the key meaning `one more time`. Keep `한` short and make the `beon` ending neat, not nasalized too much.": {
    "id-id":
      "Bagian `han beon` membawa makna inti `sekali lagi`. Ucapkan `한` dengan pendek dan buat akhir `beon` tetap rapi, jangan terlalu sengau.",
    "kh-km":
      "ផ្នែក `han beon` គឺជាចំណុចសំខាន់នៃន័យ `ម្តងទៀត`។ រក្សា `한` ឲ្យខ្លី ហើយបញ្ចប់ `beon` ឲ្យស្អាត មិនបាច់អូសសំឡេងច្រើនពេកទេ។",
    "mm-my":
      "`han beon` အပိုင်းက `တစ်ခါထပ်` ဆိုတဲ့ အဓိပ္ပာယ်ကို သယ်ဆောင်ထားပါတယ်။ `한` ကိုတိုတိုပြောပြီး `beon` အဆုံးသံကို နှာခေါင်းသံများလွန်းမသွားဘဲ သေသပ်အောင်လုပ်ပါ။"
  },
  "In `추천`, the first syllable is tense and clear. Let `뭐예요` rise at the end so it sounds curious, not flat.": {
    "id-id":
      "Dalam `추천`, suku kata pertama harus tegang dan jelas. Biarkan `뭐예요` naik di akhir agar terdengar ingin tahu, bukan datar.",
    "kh-km":
      "នៅក្នុង `추천` ព្យាង្គដំបូងគួរតែច្បាស់ និងមានកម្លាំងបន្តិច។ ឲ្យ `뭐예요` លើកសម្លេងនៅចុង ដើម្បីឲ្យវាស្តាប់ទៅដូចជាការសួរពិត មិនមែនរាបស្មើទេ។",
    "mm-my":
      "`추천` ထဲက ပထမပုဒ်သံကို တင်းတင်းရှင်းရှင်းပြောပါ။ `뭐예요` အဆုံးမှာ အသံကို နည်းနည်းတက်စေပြီး စိတ်ဝင်စားမေးသလို ကြားရအောင်လုပ်ပါ။"
  },
  "In `확인하고`, the `gi` sound links into the next syllable smoothly. `싶어요` should end softly, not too strongly.": {
    "id-id":
      "Dalam `확인하고`, bunyi `gi` tersambung halus ke suku kata berikutnya. `싶어요` perlu berakhir lembut, tidak terlalu keras.",
    "kh-km":
      "នៅក្នុង `확인하고` សំឡេង `gi` ភ្ជាប់រលូនទៅព្យាង្គបន្ទាប់។ `싶어요` គួរបញ្ចប់ទន់ៗ មិនត្រូវខ្លាំងពេកទេ។",
    "mm-my":
      "`확인하고` ထဲက `gi` သံက နောက်ပုဒ်သံနဲ့ ချောချောမွေ့မွေ့ဆက်သွားပါတယ်။ `싶어요` ကို ပျော့ပျော့နူးနူးအဆုံးသတ်ပြီး မပြင်းလွန်းစေပါနဲ့။"
  },
  "Say `괜찮아요` with a calm falling tone. In `문제없어요`, keep the break after `문제` very small so the phrase stays reassuring.": {
    "id-id":
      "Ucapkan `괜찮아요` dengan nada turun yang tenang. Dalam `문제없어요`, buat jeda setelah `문제` sangat kecil agar kalimat tetap menenangkan.",
    "kh-km":
      "និយាយ `괜찮아요` ដោយសម្លេងធ្លាក់ទន់ស្ងប់ៗ។ នៅក្នុង `문제없어요` សូមទុកចន្លោះបន្ទាប់ពី `문제` ឲ្យតូចបំផុត ដើម្បីឲ្យប្រយោគនៅតែស្តាប់ទៅធូរស្រាល។",
    "mm-my":
      "`괜찮아요` ကို တည်ငြိမ်တဲ့ အသံဆင်းနဲ့ပြောပါ။ `문제없어요` ထဲမှာ `문제` နောက်က ခဏနားမှုကို အလွန်တိုအောင်ထားပြီး စိတ်ချရတဲ့ခံစားချက်ကို ထိန်းပါ။"
  },
  "The polite lift is in `주실 수 있어요?`. Keep `사진 좀` light, then let the request part carry the softness.": {
    "id-id":
      "Bagian yang membawa nuansa sopan ada di `주실 수 있어요?`. Ucapkan `사진 좀` dengan ringan, lalu biarkan bagian permintaannya membawa kelembutan.",
    "kh-km":
      "ភាពគួរសមស្ថិតនៅក្នុង `주실 수 있어요?`។ និយាយ `사진 좀` ឲ្យស្រាល បន្ទាប់មកឲ្យផ្នែកសំណើនាំយកទំនុកសំឡេងទន់ភ្លន់។",
    "mm-my":
      "ယဉ်ကျေးသဘောကို အဓိကသယ်ဆောင်တာ `주실 수 있어요?` ပိုင်းမှာပါ။ `사진 좀` ကို ပေါ့ပေါ့ပါးပါးပြောပြီး တောင်းဆိုတဲ့အပိုင်းက နူးညံ့မှုကိုယူသွားစေပါ။"
  },
  "`어디에 있어요` should flow without big pauses. In `오른쪽`, the `jjok` ending is short and clipped.": {
    "id-id":
      "`어디에 있어요` perlu mengalir tanpa jeda besar. Dalam `오른쪽`, akhir `jjok` harus pendek dan terpotong rapi.",
    "kh-km":
      "`어디에 있어요` គួរហូរជាប់គ្នា ដោយមិនមានការឈប់ធំៗ។ នៅក្នុង `오른쪽` ចុង `jjok` គួរតែខ្លី និងច្បាស់។",
    "mm-my":
      "`어디에 있어요` ကို အနားမကြီးဘဲ ဆက်တိုက်ပြောသင့်ပါတယ်။ `오른쪽` ထဲက `jjok` အဆုံးသံကို တိုတိုဖြတ်ထားပါ။"
  }
};

export const applySeaGuideOverrides = (entry: Record<CountryPackId, string>): Record<CountryPackId, string> => {
  const english = entry["us-en"];
  const override = seaGuideStringOverrides[english];
  if (!override) {
    return entry;
  }

  return {
    ...entry,
    "id-id": override["id-id"],
    "kh-km": override["kh-km"],
    "mm-my": override["mm-my"]
  };
};
