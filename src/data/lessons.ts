import type { CountryPackId, Lesson, LessonReviewCard, LocalizedPhrase } from "../types";

const localized = (
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

const phrase = (
  korean: string,
  romanization: string,
  en: string,
  ja: string,
  zh: string,
  vi: string,
  es: string
): LocalizedPhrase => ({
  korean,
  romanization,
  meaningByCountry: localized(en, ja, zh, vi, es)
});

const commonCountryNotes = localized(
  "Korean often puts the object or place before the action. Say the full phrase first, then compare the rhythm instead of chasing a score.",
  "韓国語は日本語と語順が近いですが、助詞を一対一で置き換えず、最後の요まで一つのかたまりで声に出します。",
  "先开口说韩语，再看简短的句子结构说明。",
  "Hãy nói tiếng Hàn trước, rồi xem ghi chú cấu trúc ngắn.",
  "Primero di la frase en coreano y luego revisa la nota corta."
);

const commonPronunciationNotes = localized(
  "Listen for the sentence ending first. Korean politeness often lives in the final sound, so compare rhythm before judging pronunciation.",
  "ローマ字を長く頼らず、最後の요とパッチムの有無を聞きます。日本語の母音で伸ばしすぎないのがコツです。",
  "先听句尾和停顿，不要只按汉字意思来读。",
  "Hãy nghe phần cuối câu và nhịp nói trước, đừng chỉ đọc theo chữ romanization.",
  "Escucha primero el final de la frase y el ritmo, no solo la romanización."
);

const reviewCards = (day: number, core: LocalizedPhrase, roleplayPrompt: LocalizedPhrase): LessonReviewCard[] => [
  {
    id: "listen",
    kind: "listen",
    promptByCountry: localized(
      "Listen and choose when you would use this sentence.",
      "聞いて、この文を使う場面を選びます。",
      "听句子，选择适合使用的场景。",
      "Nghe và chọn tình huống dùng câu này.",
      "Escucha y elige cuándo usarías esta frase."
    ),
    phrase: core,
    reason: "전체 대화에서 다시 들을 핵심 문장입니다."
  },
  {
    id: "speak",
    kind: "speak",
    promptByCountry: localized(
      "Say it from the meaning, then compare with the native audio.",
      "意味を見て言い、基準音声と比べます。",
      "看意思说韩语，然后和标准音频比较。",
      "Nhìn nghĩa rồi nói tiếng Hàn, sau đó so với âm thanh mẫu.",
      "Di la frase desde el significado y compárala con el audio."
    ),
    phrase: core,
    reason: "내 목소리와 기준 음성을 번갈아 비교할 문장입니다."
  },
  {
    id: "roleplay",
    kind: "roleplay",
    promptByCountry: roleplayPrompt.meaningByCountry,
    phrase: core,
    reason: "상대 말에 바로 답하는 한 턴 역할극입니다."
  }
];

const lessonSeeds = [
  {
    day: 1,
    title: "처음 만났을 때 인사하기",
    situation: "카페나 숙소에서 처음 만난 사람에게 정중하게 인사합니다.",
    phraseId: "hello-nice-meet-you",
    core: phrase(
      "안녕하세요. 만나서 반가워요.",
      "Annyeonghaseyo. Mannaseo bangawoyo.",
      "Hello. Nice to meet you.",
      "こんにちは。お会いできてうれしいです。",
      "你好。很高兴见到你。",
      "Xin chào. Rất vui được gặp bạn.",
      "Hola. Mucho gusto."
    ),
    response: phrase("네, 저도 반가워요.", "Ne, jeodo bangawoyo.", "Yes, nice to meet you too.", "はい、私もうれしいです。", "我也很高兴。", "Vâng, tôi cũng rất vui.", "Sí, igualmente."),
    rescue: phrase("이름이 뭐예요?", "Ireumi mwoyeyo?", "What is your name?", "お名前は何ですか。", "你叫什么名字？", "Bạn tên là gì?", "¿Cómo te llamas?"),
    dialogue: [
      { speaker: "상대", text: "안녕하세요." },
      { speaker: "학습자", text: "안녕하세요. 만나서 반가워요." },
      { speaker: "상대", text: "네, 저도 반가워요." },
      { speaker: "학습자", text: "이름이 뭐예요?" }
    ],
    structurePattern: "안녕하세요 + -요",
    structureExplanation: localized(
      "The polite ending -요 makes the greeting safe for first meetings.",
      "`-요`は初対面でも使いやすい丁寧な終わり方です。",
      "`-요` 是初次见面时安全、礼貌的结尾。",
      "Đuôi `-요` giúp câu nói lịch sự khi gặp lần đầu.",
      "La terminación `-요` hace que la frase sea cortés."
    ),
    swapSlots: [
      phrase("안녕하세요.", "Annyeonghaseyo.", "Hello.", "こんにちは。", "你好。", "Xin chào.", "Hola."),
      phrase("반가워요.", "Bangawoyo.", "Nice to meet you.", "うれしいです。", "很高兴。", "Rất vui.", "Mucho gusto.")
    ],
    sceneWords: ["인사", "이름", "처음"],
    roleplayPrompt: phrase("처음 뵙겠습니다.", "Cheoeum boepgetseumnida.", "Nice to meet you for the first time.", "初めまして。", "初次见面。", "Rất hân hạnh gặp bạn.", "Encantado/a de conocerle.")
  },
  {
    day: 2,
    title: "카페에서 주문하기",
    situation: "카페에서 가장 기본적인 음료를 정중하게 주문합니다.",
    phraseId: "coffee-please",
    core: phrase("아이스 아메리카노 하나 주세요.", "Aiseu amerikano hana juseyo.", "One iced Americano, please.", "アイスアメリカーノを一つください。", "请给我一杯冰美式。", "Cho tôi một Americano đá.", "Un americano helado, por favor."),
    response: phrase("드시고 가세요?", "Deusigo gaseyo?", "For here?", "店内で召し上がりますか。", "在店里喝吗？", "Bạn dùng tại đây không?", "¿Para tomar aquí?"),
    rescue: phrase("포장해 주세요.", "Pojanghae juseyo.", "Please make it to go.", "持ち帰りにしてください。", "请打包。", "Làm ơn gói mang đi.", "Para llevar, por favor."),
    dialogue: [
      { speaker: "직원", text: "안녕하세요. 주문하시겠어요?" },
      { speaker: "학습자", text: "아이스 아메리카노 하나 주세요." },
      { speaker: "직원", text: "드시고 가세요?" },
      { speaker: "학습자", text: "포장해 주세요." }
    ],
    structurePattern: "N 하나 주세요",
    structureExplanation: localized("Use `N 하나 주세요` to ask for one item politely.", "`N 하나 주세요`で一つ注文できます。", "用 `N 하나 주세요` 可以礼貌地点一个东西。", "Dùng `N 하나 주세요` để gọi một món.", "Usa `N 하나 주세요` para pedir una unidad."),
    swapSlots: [
      phrase("물 하나 주세요.", "Mul hana juseyo.", "One water, please.", "水を一つください。", "请给我一瓶水。", "Cho tôi một nước.", "Un agua, por favor."),
      phrase("커피 하나 주세요.", "Keopi hana juseyo.", "One coffee, please.", "コーヒーを一つください。", "请给我一杯咖啡。", "Cho tôi một cà phê.", "Un café, por favor.")
    ],
    sceneWords: ["커피", "하나", "포장"],
    roleplayPrompt: phrase("주문하시겠어요?", "Jumunhasigesseoyo?", "Would you like to order?", "ご注文なさいますか。", "要点单吗？", "Bạn muốn gọi món không?", "¿Desea ordenar?")
  },
  {
    day: 3,
    title: "감사 인사하기",
    situation: "도움을 받았을 때 짧고 자연스럽게 고마움을 전합니다.",
    phraseId: "thank-you",
    core: phrase("감사합니다. 정말 도움이 됐어요.", "Gamsahamnida. Jeongmal doumi dwaesseoyo.", "Thank you. That really helped.", "ありがとうございます。本当に助かりました。", "谢谢。真的帮了我很多。", "Cảm ơn. Điều đó giúp tôi rất nhiều.", "Gracias. Me ayudó mucho."),
    response: phrase("아니에요. 괜찮아요.", "Anieyo. Gwaenchanayo.", "No problem. It is okay.", "いいえ、大丈夫です。", "没事。没关系。", "Không có gì. Không sao.", "No pasa nada. Está bien."),
    rescue: phrase("죄송해요.", "Joesonghaeyo.", "I am sorry.", "すみません。", "对不起。", "Xin lỗi.", "Lo siento."),
    dialogue: [
      { speaker: "상대", text: "여기로 가시면 돼요." },
      { speaker: "학습자", text: "감사합니다. 정말 도움이 됐어요." },
      { speaker: "상대", text: "아니에요. 괜찮아요." }
    ],
    structurePattern: "감사합니다 + 도움이 됐어요",
    structureExplanation: localized("Pair a simple thank-you with why it helped.", "感謝の言葉に、助かった理由を短く足します。", "先感谢，再简单说这很有帮助。", "Nói cảm ơn rồi thêm rằng điều đó có ích.", "Agradece y añade que te ayudó."),
    swapSlots: [
      phrase("감사합니다.", "Gamsahamnida.", "Thank you.", "ありがとうございます。", "谢谢。", "Cảm ơn.", "Gracias."),
      phrase("정말 좋아요.", "Jeongmal joayo.", "It is really good.", "本当にいいです。", "真的很好。", "Thật sự tốt.", "Está muy bien.")
    ],
    sceneWords: ["감사", "도움", "죄송"],
    roleplayPrompt: phrase("이쪽으로 오세요.", "Ijogeuro oseyo.", "Please come this way.", "こちらへどうぞ。", "请往这边来。", "Mời bạn đi lối này.", "Venga por aquí, por favor.")
  },
  {
    day: 4,
    title: "길 묻기",
    situation: "지하철역 근처에서 목적지 방향을 물어봅니다.",
    phraseId: "where-is-station",
    core: phrase("지하철역이 어디예요?", "Jihacheolyeogi eodiyeyo?", "Where is the subway station?", "地下鉄の駅はどこですか。", "地铁站在哪里？", "Ga tàu điện ngầm ở đâu?", "¿Dónde está la estación del metro?"),
    response: phrase("저쪽이에요.", "Jeojjogiyeyo.", "It is over there.", "あちらです。", "在那边。", "Ở phía kia.", "Está por allí."),
    rescue: phrase("여기서 멀어요?", "Yeogiseo meoreoyo?", "Is it far from here?", "ここから遠いですか。", "离这里远吗？", "Có xa đây không?", "¿Está lejos de aquí?"),
    dialogue: [
      { speaker: "학습자", text: "지하철역이 어디예요?" },
      { speaker: "상대", text: "저쪽이에요." },
      { speaker: "학습자", text: "여기서 멀어요?" },
      { speaker: "상대", text: "아니요, 가까워요." }
    ],
    structurePattern: "N이/가 어디예요?",
    structureExplanation: localized("Use this pattern to ask where a place is.", "場所を聞くときの基本形です。", "这是询问地点在哪里的基本句型。", "Dùng mẫu này để hỏi địa điểm ở đâu.", "Usa este patrón para preguntar dónde está un lugar."),
    swapSlots: [
      phrase("화장실이 어디예요?", "Hwajangsiri eodiyeyo?", "Where is the restroom?", "トイレはどこですか。", "洗手间在哪里？", "Nhà vệ sinh ở đâu?", "¿Dónde está el baño?"),
      phrase("카페가 어디예요?", "Kapega eodiyeyo?", "Where is the cafe?", "カフェはどこですか。", "咖啡店在哪里？", "Quán cà phê ở đâu?", "¿Dónde está el café?")
    ],
    sceneWords: ["지하철역", "어디", "저쪽"],
    roleplayPrompt: phrase("어디로 가세요?", "Eodiro gaseyo?", "Where are you going?", "どこへ行きますか。", "你要去哪里？", "Bạn đi đâu?", "¿A dónde va?")
  },
  {
    day: 5,
    title: "가격 묻기",
    situation: "가게에서 물건을 보고 가격을 확인합니다.",
    phraseId: "how-much",
    core: phrase("이거 얼마예요?", "Igeo eolmayeyo?", "How much is this?", "これはいくらですか。", "这个多少钱？", "Cái này bao nhiêu tiền?", "¿Cuánto cuesta esto?"),
    response: phrase("만 원이에요.", "Man woniyeyo.", "It is ten thousand won.", "一万ウォンです。", "一万韩元。", "Mười nghìn won.", "Son diez mil wones."),
    rescue: phrase("카드 돼요?", "Kadeu dwaeyo?", "Can I pay by card?", "カードは使えますか。", "可以刷卡吗？", "Có dùng thẻ được không?", "¿Aceptan tarjeta?"),
    dialogue: [
      { speaker: "학습자", text: "이거 얼마예요?" },
      { speaker: "직원", text: "만 원이에요." },
      { speaker: "학습자", text: "카드 돼요?" },
      { speaker: "직원", text: "네, 돼요." }
    ],
    structurePattern: "이거 얼마예요?",
    structureExplanation: localized("`이거` means this item near you.", "`이거`は自分の近くにある物を指します。", "`이거` 指你附近的这个东西。", "`이거` nghĩa là món này ở gần bạn.", "`이거` significa este objeto cerca de ti."),
    swapSlots: [
      phrase("그거 얼마예요?", "Geugeo eolmayeyo?", "How much is that?", "それはいくらですか。", "那个多少钱？", "Cái đó bao nhiêu?", "¿Cuánto cuesta eso?"),
      phrase("이거 주세요.", "Igeo juseyo.", "This one, please.", "これをください。", "请给我这个。", "Cho tôi cái này.", "Este, por favor.")
    ],
    sceneWords: ["이거", "얼마", "카드"],
    roleplayPrompt: phrase("필요한 거 있으세요?", "Piryohan geo isseuseyo?", "Do you need anything?", "必要なものはありますか。", "需要什么吗？", "Bạn cần gì không?", "¿Necesita algo?")
  },
  {
    day: 6,
    title: "천천히 말해 달라고 하기",
    situation: "상대 말이 빠를 때 정중하게 속도를 낮춰 달라고 합니다.",
    phraseId: "speak-slowly",
    core: phrase("조금 천천히 말해 주세요.", "Jogeum cheoncheonhi malhae juseyo.", "Please speak a little slowly.", "少しゆっくり話してください。", "请说慢一点。", "Làm ơn nói chậm hơn một chút.", "Por favor, hable un poco más despacio."),
    response: phrase("네, 천천히 말할게요.", "Ne, cheoncheonhi malhalgeyo.", "Sure, I will speak slowly.", "はい、ゆっくり話します。", "好的，我慢慢说。", "Vâng, tôi sẽ nói chậm.", "Sí, hablaré despacio."),
    rescue: phrase("한국어를 조금 배웠어요.", "Hangugeoreul jogeum baewosseoyo.", "I learned a little Korean.", "韓国語を少し勉強しました。", "我学了一点韩语。", "Tôi đã học một chút tiếng Hàn.", "Aprendí un poco de coreano."),
    dialogue: [
      { speaker: "상대", text: "여기에서 오른쪽으로 가세요." },
      { speaker: "학습자", text: "죄송해요. 조금 천천히 말해 주세요." },
      { speaker: "상대", text: "네, 천천히 말할게요." }
    ],
    structurePattern: "조금 + 천천히 + V-아/어 주세요",
    structureExplanation: localized("This is a polite rescue phrase when Korean feels too fast.", "速すぎるときに使える丁寧な救助表現です。", "听不清时可以礼貌地请对方慢一点。", "Đây là câu cứu nguy lịch sự khi tiếng Hàn quá nhanh.", "Es una frase de rescate cuando hablan demasiado rápido."),
    swapSlots: [
      phrase("다시 말해 주세요.", "Dasi malhae juseyo.", "Please say it again.", "もう一度言ってください。", "请再说一次。", "Làm ơn nói lại.", "Dígalo otra vez, por favor."),
      phrase("천천히 해 주세요.", "Cheoncheonhi hae juseyo.", "Please do it slowly.", "ゆっくりしてください。", "请慢一点做。", "Làm ơn làm chậm lại.", "Hágalo despacio, por favor.")
    ],
    sceneWords: ["조금", "천천히", "말해"],
    roleplayPrompt: phrase("여기에서 오른쪽으로 가세요.", "Yeogieseo oreunjjogeuro gaseyo.", "Go right from here.", "ここから右へ行ってください。", "从这里往右走。", "Từ đây hãy đi sang phải.", "Desde aquí vaya a la derecha.")
  },
  {
    day: 7,
    title: "다시 말해 달라고 하기",
    situation: "듣지 못한 문장을 부담 없이 다시 요청합니다.",
    phraseId: "say-again",
    core: phrase("다시 한 번 말해 주세요.", "Dasi han beon malhae juseyo.", "Please say that one more time.", "もう一度言ってください。", "请再说一遍。", "Làm ơn nói lại một lần nữa.", "Por favor, dígalo una vez más."),
    response: phrase("네, 다시 말할게요.", "Ne, dasi malhalgeyo.", "Sure, I will say it again.", "はい、もう一度言います。", "好的，我再说一遍。", "Vâng, tôi sẽ nói lại.", "Sí, lo diré otra vez."),
    rescue: phrase("잘 못 들었어요.", "Jal mot deureosseoyo.", "I could not hear well.", "よく聞き取れませんでした。", "我没听清。", "Tôi nghe không rõ.", "No escuché bien."),
    dialogue: [
      { speaker: "상대", text: "예약 번호를 말씀해 주세요." },
      { speaker: "학습자", text: "잘 못 들었어요." },
      { speaker: "학습자", text: "다시 한 번 말해 주세요." },
      { speaker: "상대", text: "네, 다시 말할게요." }
    ],
    structurePattern: "다시 한 번 + V-아/어 주세요",
    structureExplanation: localized("Use it when you missed what someone said.", "聞き取れなかったときに使います。", "没听清时使用。", "Dùng khi bạn chưa nghe rõ.", "Úsalo cuando no escuchaste bien."),
    swapSlots: [
      phrase("다시 해 주세요.", "Dasi hae juseyo.", "Please do it again.", "もう一度してください。", "请再做一次。", "Làm lại giúp tôi.", "Hágalo otra vez, por favor."),
      phrase("한 번 더요.", "Han beon deoyo.", "One more time, please.", "もう一回お願いします。", "再一次。", "Một lần nữa ạ.", "Una vez más, por favor.")
    ],
    sceneWords: ["다시", "한 번", "못 들었어요"],
    roleplayPrompt: phrase("예약 번호를 말씀해 주세요.", "Yeyak beonhoreul malsseumhae juseyo.", "Please tell me your reservation number.", "予約番号をおっしゃってください。", "请说预约号码。", "Vui lòng nói mã đặt chỗ.", "Dígame su número de reserva.")
  },
  {
    day: 8,
    title: "식당에서 추천 받기",
    situation: "메뉴를 고르기 어려울 때 추천을 부탁합니다.",
    phraseId: "recommend-menu",
    core: phrase("추천 메뉴가 뭐예요?", "Chucheon menyuga mwoyeyo?", "What menu item do you recommend?", "おすすめメニューは何ですか。", "推荐菜单是什么？", "Món nào được gợi ý?", "¿Qué plato recomienda?"),
    response: phrase("이 메뉴가 인기 있어요.", "I menyuga ingi isseoyo.", "This menu item is popular.", "このメニューが人気です。", "这个菜很受欢迎。", "Món này được ưa chuộng.", "Este plato es popular."),
    rescue: phrase("맵지 않은 거 있어요?", "Maepji aneun geo isseoyo?", "Do you have something not spicy?", "辛くないものはありますか。", "有不辣的吗？", "Có món nào không cay không?", "¿Tiene algo que no sea picante?"),
    dialogue: [
      { speaker: "학습자", text: "추천 메뉴가 뭐예요?" },
      { speaker: "직원", text: "이 메뉴가 인기 있어요." },
      { speaker: "학습자", text: "맵지 않은 거 있어요?" }
    ],
    structurePattern: "N이/가 뭐예요?",
    structureExplanation: localized("Use this to ask what something is or what option is recommended.", "何かを尋ねるときに使う形です。", "用来询问是什么或推荐什么。", "Dùng để hỏi đó là gì hoặc nên chọn gì.", "Sirve para preguntar qué es o qué recomiendan."),
    swapSlots: [
      phrase("인기 메뉴가 뭐예요?", "Ingi menyuga mwoyeyo?", "What is the popular menu item?", "人気メニューは何ですか。", "人气菜单是什么？", "Món nổi tiếng là gì?", "¿Cuál es el plato popular?"),
      phrase("안 매운 메뉴가 뭐예요?", "An maeun menyuga mwoyeyo?", "What is not spicy?", "辛くないメニューは何ですか。", "不辣的菜是什么？", "Món không cay là món nào?", "¿Qué plato no es picante?")
    ],
    sceneWords: ["추천", "메뉴", "맵지 않은"],
    roleplayPrompt: phrase("메뉴 고르셨어요?", "Menyu goreusyeosseoyo?", "Have you chosen a menu item?", "メニューはお決まりですか。", "选好菜单了吗？", "Bạn đã chọn món chưa?", "¿Ya eligió?")
  },
  {
    day: 9,
    title: "예약 확인하기",
    situation: "숙소나 식당에서 예약을 확인합니다.",
    phraseId: "reservation-check",
    core: phrase("예약 확인하고 싶어요.", "Yeyak hwaginhago sipeoyo.", "I would like to check my reservation.", "予約を確認したいです。", "我想确认预约。", "Tôi muốn kiểm tra đặt chỗ.", "Quiero confirmar mi reservación."),
    response: phrase("성함이 어떻게 되세요?", "Seonghami eotteoke doeseyo?", "May I have your name?", "お名前は何ですか。", "请问您的姓名？", "Tên của bạn là gì ạ?", "¿Cuál es su nombre?"),
    rescue: phrase("제 이름은 ...예요.", "Je ireumeun ...yeyo.", "My name is ...", "私の名前は...です。", "我的名字是……", "Tên tôi là ...", "Mi nombre es ..."),
    dialogue: [
      { speaker: "학습자", text: "예약 확인하고 싶어요." },
      { speaker: "직원", text: "성함이 어떻게 되세요?" },
      { speaker: "학습자", text: "제 이름은 ...예요." }
    ],
    structurePattern: "V-고 싶어요",
    structureExplanation: localized("Use `-고 싶어요` to say what you want to do politely.", "`-고 싶어요`で「したいです」と言えます。", "`-고 싶어요` 表示“想做”。", "Dùng `-고 싶어요` để nói muốn làm gì.", "Usa `-고 싶어요` para decir que quieres hacer algo."),
    swapSlots: [
      phrase("주문하고 싶어요.", "Jumunhago sipeoyo.", "I would like to order.", "注文したいです。", "我想点单。", "Tôi muốn gọi món.", "Quiero ordenar."),
      phrase("예약하고 싶어요.", "Yeyakhago sipeoyo.", "I would like to make a reservation.", "予約したいです。", "我想预约。", "Tôi muốn đặt chỗ.", "Quiero hacer una reserva.")
    ],
    sceneWords: ["예약", "확인", "이름"],
    roleplayPrompt: phrase("무엇을 도와드릴까요?", "Mueoseul dowadeurilkkayo?", "How can I help you?", "何をお手伝いしましょうか。", "需要帮您什么？", "Tôi có thể giúp gì cho bạn?", "¿En qué puedo ayudarle?")
  },
  {
    day: 10,
    title: "괜찮다고 말하기",
    situation: "상대가 걱정할 때 괜찮다고 짧게 답합니다.",
    phraseId: "its-okay",
    core: phrase("괜찮아요. 문제없어요.", "Gwaenchanayo. Munje eopseoyo.", "It is okay. No problem.", "大丈夫です。問題ありません。", "没关系。没有问题。", "Không sao. Không vấn đề gì.", "Está bien. No hay problema."),
    response: phrase("다행이에요.", "Dahaengiyeyo.", "That is a relief.", "よかったです。", "那就好。", "May quá.", "Qué alivio."),
    rescue: phrase("천천히 해도 돼요.", "Cheoncheonhi haedo dwaeyo.", "It is okay to do it slowly.", "ゆっくりでも大丈夫です。", "慢慢来也可以。", "Làm chậm cũng được.", "Puede hacerlo despacio."),
    dialogue: [
      { speaker: "상대", text: "죄송해요. 조금 늦었어요." },
      { speaker: "학습자", text: "괜찮아요. 문제없어요." },
      { speaker: "상대", text: "다행이에요." }
    ],
    structurePattern: "괜찮아요 + 문제없어요",
    structureExplanation: localized("This reassures the other person politely.", "相手を安心させる丁寧な表現です。", "这是让对方安心的礼貌表达。", "Câu này giúp người khác yên tâm.", "Esta frase tranquiliza a la otra persona."),
    swapSlots: [
      phrase("괜찮아요.", "Gwaenchanayo.", "It is okay.", "大丈夫です。", "没关系。", "Không sao.", "Está bien."),
      phrase("문제없어요.", "Munje eopseoyo.", "No problem.", "問題ありません。", "没有问题。", "Không vấn đề gì.", "No hay problema.")
    ],
    sceneWords: ["괜찮아요", "문제", "다행"],
    roleplayPrompt: phrase("죄송해요. 괜찮으세요?", "Joesonghaeyo. Gwaenchaneuseyo?", "I am sorry. Are you okay?", "すみません。大丈夫ですか。", "对不起。您没事吧？", "Xin lỗi. Bạn ổn chứ?", "Lo siento. ¿Está bien?")
  },
  {
    day: 11,
    title: "사진 부탁하기",
    situation: "여행 중 다른 사람에게 사진 촬영을 부탁합니다.",
    phraseId: "take-photo",
    core: phrase("사진 좀 찍어 주실 수 있어요?", "Sajin jom jjigeo jusil su isseoyo?", "Could you take a photo for me?", "写真を撮っていただけますか。", "可以帮我拍张照片吗？", "Bạn có thể chụp ảnh giúp tôi không?", "¿Me podría tomar una foto?"),
    response: phrase("네, 찍어 드릴게요.", "Ne, jjigeo deurilgeyo.", "Sure, I will take it for you.", "はい、撮りますね。", "可以，我帮您拍。", "Vâng, tôi sẽ chụp giúp.", "Sí, se la tomo."),
    rescue: phrase("여기 눌러 주세요.", "Yeogi nulleo juseyo.", "Please press here.", "ここを押してください。", "请按这里。", "Vui lòng bấm ở đây.", "Presione aquí, por favor."),
    dialogue: [
      { speaker: "학습자", text: "사진 좀 찍어 주실 수 있어요?" },
      { speaker: "상대", text: "네, 찍어 드릴게요." },
      { speaker: "학습자", text: "여기 눌러 주세요." }
    ],
    structurePattern: "V-아/어 주실 수 있어요?",
    structureExplanation: localized("This is a polite way to ask someone for help.", "誰かにお願いするときの丁寧な形です。", "这是礼貌地请求帮助的表达。", "Đây là cách nhờ ai đó giúp một cách lịch sự.", "Es una forma cortés de pedir ayuda."),
    swapSlots: [
      phrase("도와주실 수 있어요?", "Dowajusil su isseoyo?", "Could you help me?", "手伝っていただけますか。", "可以帮我吗？", "Bạn có thể giúp tôi không?", "¿Podría ayudarme?"),
      phrase("한 번 더 찍어 주세요.", "Han beon deo jjigeo juseyo.", "Please take one more.", "もう一枚撮ってください。", "请再拍一张。", "Chụp thêm một lần nữa giúp tôi.", "Tome una más, por favor.")
    ],
    sceneWords: ["사진", "찍어", "여기"],
    roleplayPrompt: phrase("네, 어떻게 찍으면 돼요?", "Ne, eotteoke jjigeumyeon dwaeyo?", "Sure, how should I take it?", "はい、どう撮ればいいですか。", "可以，怎么拍？", "Vâng, chụp như thế nào?", "Sí, ¿cómo la tomo?")
  },
  {
    day: 12,
    title: "화장실 위치 묻기",
    situation: "공공장소에서 화장실 위치를 정중하게 묻습니다.",
    phraseId: "where-restroom",
    core: phrase("화장실이 어디에 있어요?", "Hwajangsiri eodie isseoyo?", "Where is the restroom?", "トイレはどこにありますか。", "洗手间在哪里？", "Nhà vệ sinh ở đâu?", "¿Dónde está el baño?"),
    response: phrase("오른쪽에 있어요.", "Oreunjjoge isseoyo.", "It is on the right.", "右側にあります。", "在右边。", "Ở bên phải.", "Está a la derecha."),
    rescue: phrase("감사합니다.", "Gamsahamnida.", "Thank you.", "ありがとうございます。", "谢谢。", "Cảm ơn.", "Gracias."),
    dialogue: [
      { speaker: "학습자", text: "화장실이 어디에 있어요?" },
      { speaker: "상대", text: "오른쪽에 있어요." },
      { speaker: "학습자", text: "감사합니다." }
    ],
    structurePattern: "N이/가 어디에 있어요?",
    structureExplanation: localized("This asks where something is located.", "物や場所の位置を聞く形です。", "用于询问某物或地点在哪里。", "Dùng để hỏi vị trí của một nơi hoặc đồ vật.", "Pregunta dónde se encuentra algo."),
    swapSlots: [
      phrase("엘리베이터가 어디에 있어요?", "Ellibeiteoga eodie isseoyo?", "Where is the elevator?", "エレベーターはどこにありますか。", "电梯在哪里？", "Thang máy ở đâu?", "¿Dónde está el ascensor?"),
      phrase("출구가 어디에 있어요?", "Chulguga eodie isseoyo?", "Where is the exit?", "出口はどこにありますか。", "出口在哪里？", "Lối ra ở đâu?", "¿Dónde está la salida?")
    ],
    sceneWords: ["화장실", "어디", "오른쪽"],
    roleplayPrompt: phrase("무엇을 찾으세요?", "Mueoseul chajeuseyo?", "What are you looking for?", "何をお探しですか。", "您在找什么？", "Bạn đang tìm gì?", "¿Qué busca?")
  },
  {
    day: 13,
    title: "포장 요청하기",
    situation: "음식을 매장에서 먹지 않고 가져가고 싶다고 말합니다.",
    phraseId: "takeout-please",
    core: phrase("포장해 주세요.", "Pojanghae juseyo.", "Please make it to go.", "持ち帰りにしてください。", "请打包。", "Làm ơn gói mang đi.", "Para llevar, por favor."),
    response: phrase("봉투 필요하세요?", "Bongtu piryo haseyo?", "Do you need a bag?", "袋は必要ですか。", "需要袋子吗？", "Bạn có cần túi không?", "¿Necesita bolsa?"),
    rescue: phrase("네, 부탁드려요.", "Ne, butakdeuryeoyo.", "Yes, please.", "はい、お願いします。", "需要，麻烦您。", "Vâng, làm ơn.", "Sí, por favor."),
    dialogue: [
      { speaker: "직원", text: "드시고 가세요?" },
      { speaker: "학습자", text: "포장해 주세요." },
      { speaker: "직원", text: "봉투 필요하세요?" },
      { speaker: "학습자", text: "네, 부탁드려요." }
    ],
    structurePattern: "V-아/어 주세요",
    structureExplanation: localized("A short polite request pattern for stores and cafes.", "店やカフェで使いやすい短い依頼表現です。", "在店里或咖啡馆常用的礼貌请求。", "Mẫu nhờ vả ngắn, lịch sự ở quán và cửa hàng.", "Una petición corta y cortés para tiendas y cafés."),
    swapSlots: [
      phrase("계산해 주세요.", "Gyesanhae juseyo.", "Please ring me up.", "お会計をお願いします。", "请结账。", "Tính tiền giúp tôi.", "La cuenta, por favor."),
      phrase("봉투 주세요.", "Bongtu juseyo.", "Please give me a bag.", "袋をください。", "请给我袋子。", "Cho tôi túi.", "Una bolsa, por favor.")
    ],
    sceneWords: ["포장", "봉투", "부탁"],
    roleplayPrompt: phrase("드시고 가세요?", "Deusigo gaseyo?", "For here?", "店内で召し上がりますか。", "在店里吃吗？", "Bạn dùng tại đây không?", "¿Para comer aquí?")
  },
  {
    day: 14,
    title: "다음에 또 보자고 말하기",
    situation: "짧은 대화를 마치고 다음 만남을 자연스럽게 말합니다.",
    phraseId: "see-you-again",
    core: phrase("다음에 또 만나요.", "Daeume tto mannayo.", "See you again next time.", "また今度会いましょう。", "下次再见。", "Hẹn gặp lại lần sau.", "Nos vemos la próxima vez."),
    response: phrase("네, 연락할게요.", "Ne, yeollakhalgeyo.", "Yes, I will contact you.", "はい、連絡します。", "好的，我会联系你。", "Vâng, tôi sẽ liên lạc.", "Sí, le escribiré."),
    rescue: phrase("오늘 즐거웠어요.", "Oneul jeulgeowosseoyo.", "I had fun today.", "今日は楽しかったです。", "今天很开心。", "Hôm nay tôi rất vui.", "Hoy me divertí."),
    dialogue: [
      { speaker: "친구", text: "오늘 어땠어요?" },
      { speaker: "학습자", text: "오늘 즐거웠어요." },
      { speaker: "친구", text: "저도요." },
      { speaker: "학습자", text: "다음에 또 만나요." }
    ],
    structurePattern: "다음에 또 + V-아요/어요",
    structureExplanation: localized("Use it to close a friendly short conversation.", "短い会話を自然に締める表現です。", "用于自然结束一段友好的简短对话。", "Dùng để kết thúc cuộc trò chuyện ngắn một cách tự nhiên.", "Sirve para cerrar una conversación breve de forma amable."),
    swapSlots: [
      phrase("다음에 또 봐요.", "Daeume tto bwayo.", "See you again next time.", "また今度会いましょう。", "下次再见。", "Hẹn gặp lại lần sau.", "Nos vemos la próxima vez."),
      phrase("오늘 즐거웠어요.", "Oneul jeulgeowosseoyo.", "I had fun today.", "今日は楽しかったです。", "今天很开心。", "Hôm nay tôi rất vui.", "Hoy me divertí.")
    ],
    sceneWords: ["다음", "또", "즐거웠어요"],
    roleplayPrompt: phrase("오늘 어땠어요?", "Oneul eottaesseoyo?", "How was today?", "今日はどうでしたか。", "今天怎么样？", "Hôm nay thế nào?", "¿Qué tal estuvo hoy?")
  },
  {
    day: 15,
    title: "목적지 말하기",
    situation: "택시나 길 안내 상황에서 어디로 가고 싶은지 분명하게 말합니다.",
    phraseId: "go-here-please",
    core: phrase("여기로 가 주세요.", "Yeogiro ga juseyo.", "Please go here.", "ここへ行ってください。", "请去这里。", "Làm ơn đi đến đây.", "Por favor, vaya aquí."),
    response: phrase("네, 알겠습니다.", "Ne, algesseumnida.", "Okay, I understand.", "はい、わかりました。", "好的，明白了。", "Vâng, tôi hiểu rồi.", "Sí, entendido."),
    rescue: phrase("주소를 보여 드릴게요.", "Jusoreul boyeo deurilgeyo.", "I will show you the address.", "住所をお見せします。", "我给您看地址。", "Tôi sẽ cho bạn xem địa chỉ.", "Le muestro la dirección."),
    dialogue: [
      { speaker: "기사", text: "어디로 가세요?" },
      { speaker: "학습자", text: "여기로 가 주세요." },
      { speaker: "기사", text: "네, 알겠습니다." },
      { speaker: "학습자", text: "주소를 보여 드릴게요." }
    ],
    structurePattern: "장소 + 로 가 주세요",
    structureExplanation: localized("Use `-로 가 주세요` to ask someone to go toward a place.", "`-로 가 주세요`で行き先を丁寧に伝えます。", "用 `-로 가 주세요` 礼貌地说明目的地。", "Dùng `-로 가 주세요` để nói điểm đến.", "Usa `-로 가 주세요` para indicar el destino."),
    swapSlots: [
      phrase("호텔로 가 주세요.", "Hotello ga juseyo.", "Please go to the hotel.", "ホテルへ行ってください。", "请去酒店。", "Làm ơn đi đến khách sạn.", "Vaya al hotel, por favor."),
      phrase("역으로 가 주세요.", "Yeogeuro ga juseyo.", "Please go to the station.", "駅へ行ってください。", "请去车站。", "Làm ơn đi đến ga.", "Vaya a la estación, por favor.")
    ],
    sceneWords: ["여기", "주소", "택시"],
    roleplayPrompt: phrase("어디로 가세요?", "Eodiro gaseyo?", "Where are you going?", "どこへ行きますか。", "你要去哪里？", "Bạn đi đâu?", "¿A dónde va?")
  },
  {
    day: 16,
    title: "출구 번호 묻기",
    situation: "지하철역에서 어느 출구로 나가야 하는지 묻습니다.",
    phraseId: "which-exit",
    core: phrase("몇 번 출구예요?", "Myeot beon chulguyeyo?", "Which exit number is it?", "何番出口ですか。", "是几号出口？", "Là cửa ra số mấy?", "¿Qué número de salida es?"),
    response: phrase("삼 번 출구예요.", "Sam beon chulguyeyo.", "It is exit three.", "三番出口です。", "三号出口。", "Cửa ra số ba.", "Es la salida tres."),
    rescue: phrase("지도에서 보여 주세요.", "Jidoeseo boyeo juseyo.", "Please show me on the map.", "地図で見せてください。", "请在地图上给我看。", "Hãy chỉ trên bản đồ giúp tôi.", "Muéstremelo en el mapa."),
    dialogue: [
      { speaker: "학습자", text: "몇 번 출구예요?" },
      { speaker: "상대", text: "삼 번 출구예요." },
      { speaker: "학습자", text: "지도에서 보여 주세요." }
    ],
    structurePattern: "몇 번 + N예요?",
    structureExplanation: localized("Use `몇 번` when asking for a number like an exit or bus.", "`몇 번`は出口やバス番号を聞くときに使います。", "`몇 번` 用来问出口、公交等号码。", "Dùng `몇 번` để hỏi số cửa ra hoặc xe buýt.", "Usa `몇 번` para preguntar un número."),
    swapSlots: [
      phrase("몇 번 버스예요?", "Myeot beon beoseuyeyo?", "Which bus number is it?", "何番バスですか。", "是几路公交？", "Xe buýt số mấy?", "¿Qué número de autobús es?"),
      phrase("몇 번 방이에요?", "Myeot beon bangieyo?", "Which room number is it?", "何号室ですか。", "是几号房？", "Phòng số mấy?", "¿Qué número de habitación es?")
    ],
    sceneWords: ["몇 번", "출구", "지도"],
    roleplayPrompt: phrase("어디로 나가세요?", "Eodiro nagaseyo?", "Where are you exiting?", "どちらへ出ますか。", "你从哪里出去？", "Bạn ra hướng nào?", "¿Por dónde sale?")
  },
  {
    day: 17,
    title: "내릴 곳 말하기",
    situation: "택시나 버스에서 여기서 내리고 싶다고 말합니다.",
    phraseId: "get-off-here",
    core: phrase("여기서 내려 주세요.", "Yeogiseo naeryeo juseyo.", "Please let me off here.", "ここで降ろしてください。", "请在这里下车。", "Cho tôi xuống ở đây.", "Déjeme bajar aquí, por favor."),
    response: phrase("네, 여기서 세울게요.", "Ne, yeogiseo seulkkeyo.", "Okay, I will stop here.", "はい、ここで止めます。", "好的，我在这里停。", "Vâng, tôi sẽ dừng ở đây.", "Sí, paro aquí."),
    rescue: phrase("조금 더 가 주세요.", "Jogeum deo ga juseyo.", "Please go a little farther.", "もう少し進んでください。", "请再往前一点。", "Đi thêm một chút giúp tôi.", "Avance un poco más, por favor."),
    dialogue: [
      { speaker: "학습자", text: "여기서 내려 주세요." },
      { speaker: "기사", text: "네, 여기서 세울게요." },
      { speaker: "학습자", text: "조금 더 가 주세요." }
    ],
    structurePattern: "여기서 + V-아/어 주세요",
    structureExplanation: localized("Use `여기서` to mark the place where an action happens.", "`여기서`は動作をする場所を示します。", "`여기서` 表示动作发生的地方。", "`여기서` chỉ nơi hành động diễn ra.", "`여기서` marca el lugar de la acción."),
    swapSlots: [
      phrase("여기서 기다려 주세요.", "Yeogiseo gidaryeo juseyo.", "Please wait here.", "ここで待ってください。", "请在这里等。", "Hãy chờ ở đây.", "Espere aquí, por favor."),
      phrase("여기서 멈춰 주세요.", "Yeogiseo meomchwo juseyo.", "Please stop here.", "ここで止まってください。", "请在这里停。", "Dừng ở đây giúp tôi.", "Deténgase aquí, por favor.")
    ],
    sceneWords: ["여기서", "내려", "조금 더"],
    roleplayPrompt: phrase("어디서 내리세요?", "Eodiseo naeriseyo?", "Where are you getting off?", "どこで降りますか。", "你在哪里下车？", "Bạn xuống ở đâu?", "¿Dónde baja?")
  },
  {
    day: 18,
    title: "예상 시간 묻기",
    situation: "이동 중 목적지까지 얼마나 걸리는지 확인합니다.",
    phraseId: "how-long",
    core: phrase("얼마나 걸려요?", "Eolmana geollyeoyo?", "How long does it take?", "どのくらいかかりますか。", "要多久？", "Mất bao lâu?", "¿Cuánto tarda?"),
    response: phrase("십 분 정도 걸려요.", "Sip bun jeongdo geollyeoyo.", "It takes about ten minutes.", "10分くらいかかります。", "大概要十分钟。", "Mất khoảng mười phút.", "Tarda unos diez minutos."),
    rescue: phrase("급하지 않아요.", "Geuphaji anayo.", "I am not in a hurry.", "急いでいません。", "我不着急。", "Tôi không vội.", "No tengo prisa."),
    dialogue: [
      { speaker: "학습자", text: "얼마나 걸려요?" },
      { speaker: "상대", text: "십 분 정도 걸려요." },
      { speaker: "학습자", text: "급하지 않아요." }
    ],
    structurePattern: "얼마나 + V-아요/어요?",
    structureExplanation: localized("Use `얼마나` to ask about amount, time, or degree.", "`얼마나`は時間や量を聞くときに使います。", "`얼마나` 用来问时间、数量或程度。", "Dùng `얼마나` để hỏi thời gian hoặc mức độ.", "Usa `얼마나` para preguntar cantidad o tiempo."),
    swapSlots: [
      phrase("얼마나 멀어요?", "Eolmana meoreoyo?", "How far is it?", "どのくらい遠いですか。", "有多远？", "Xa bao nhiêu?", "¿Qué tan lejos está?"),
      phrase("얼마나 비싸요?", "Eolmana bissayo?", "How expensive is it?", "どのくらい高いですか。", "有多贵？", "Đắt bao nhiêu?", "¿Qué tan caro es?")
    ],
    sceneWords: ["얼마나", "걸려요", "십 분"],
    roleplayPrompt: phrase("시간 괜찮으세요?", "Sigan gwaenchaneuseyo?", "Is the timing okay?", "時間は大丈夫ですか。", "时间可以吗？", "Thời gian ổn không?", "¿Le va bien el tiempo?")
  },
  {
    day: 19,
    title: "맵지 않게 요청하기",
    situation: "식당에서 매운맛을 줄여 달라고 부탁합니다.",
    phraseId: "not-spicy",
    core: phrase("맵지 않게 해 주세요.", "Maepji anke hae juseyo.", "Please make it not spicy.", "辛くないようにしてください。", "请做得不辣。", "Làm ơn làm không cay.", "Por favor, que no sea picante."),
    response: phrase("네, 안 맵게 해 드릴게요.", "Ne, an maepge hae deurilgeyo.", "Okay, I will make it not spicy.", "はい、辛くないようにします。", "好的，我给您做不辣。", "Vâng, tôi sẽ làm không cay.", "Sí, lo preparo sin picante."),
    rescue: phrase("조금만 맵게 해 주세요.", "Jogeumman maepge hae juseyo.", "Please make it only a little spicy.", "少しだけ辛くしてください。", "请做得微辣。", "Làm cay một chút thôi.", "Solo un poco picante, por favor."),
    dialogue: [
      { speaker: "직원", text: "맵게 해 드릴까요?" },
      { speaker: "학습자", text: "맵지 않게 해 주세요." },
      { speaker: "직원", text: "네, 안 맵게 해 드릴게요." }
    ],
    structurePattern: "A-지 않게 해 주세요",
    structureExplanation: localized("Use this to ask for something to be made in a certain way.", "`-지 않게`で「そうならないように」と頼めます。", "用 `-지 않게` 表示“不要变成那样”。", "Dùng `-지 않게` để yêu cầu tránh trạng thái đó.", "Usa `-지 않게` para pedir que no quede de cierta forma."),
    swapSlots: [
      phrase("짜지 않게 해 주세요.", "Jjaji anke hae juseyo.", "Please make it not salty.", "塩辛くないようにしてください。", "请做得不咸。", "Làm không mặn giúp tôi.", "Que no sea salado, por favor."),
      phrase("달지 않게 해 주세요.", "Dalji anke hae juseyo.", "Please make it not sweet.", "甘くないようにしてください。", "请做得不甜。", "Làm không ngọt giúp tôi.", "Que no sea dulce, por favor.")
    ],
    sceneWords: ["맵지 않게", "조금만", "식당"],
    roleplayPrompt: phrase("맵게 해 드릴까요?", "Maepge hae deurilkkayo?", "Should I make it spicy?", "辛くしましょうか。", "要做辣一点吗？", "Bạn muốn cay không?", "¿Lo quiere picante?")
  },
  {
    day: 20,
    title: "알레르기 말하기",
    situation: "먹지 못하는 재료가 있을 때 미리 알립니다.",
    phraseId: "allergy",
    core: phrase("저는 땅콩 알레르기가 있어요.", "Jeoneun ttangkong allereugiga isseoyo.", "I have a peanut allergy.", "私はピーナッツアレルギーがあります。", "我对花生过敏。", "Tôi bị dị ứng đậu phộng.", "Tengo alergia al cacahuate."),
    response: phrase("알겠습니다. 빼 드릴게요.", "Algesseumnida. Ppae deurilgeyo.", "Understood. I will leave it out.", "わかりました。抜きますね。", "明白了。我会去掉。", "Tôi hiểu. Tôi sẽ bỏ ra.", "Entendido. Lo quitamos."),
    rescue: phrase("이거 들어가요?", "Igeo deureogayo?", "Does this contain it?", "これは入っていますか。", "这里面有吗？", "Món này có không?", "¿Esto lo contiene?"),
    dialogue: [
      { speaker: "학습자", text: "저는 땅콩 알레르기가 있어요." },
      { speaker: "직원", text: "알겠습니다. 빼 드릴게요." },
      { speaker: "학습자", text: "이거 들어가요?" }
    ],
    structurePattern: "저는 + N 알레르기가 있어요",
    structureExplanation: localized("Use this to clearly state an allergy or food restriction.", "アレルギーや食べられない物をはっきり伝えます。", "用来清楚说明过敏或忌口。", "Dùng để nói rõ dị ứng hoặc món không ăn được.", "Úsalo para decir una alergia claramente."),
    swapSlots: [
      phrase("저는 우유 알레르기가 있어요.", "Jeoneun uyu allereugiga isseoyo.", "I have a milk allergy.", "私は牛乳アレルギーがあります。", "我对牛奶过敏。", "Tôi dị ứng sữa.", "Tengo alergia a la leche."),
      phrase("저는 고기를 못 먹어요.", "Jeoneun gogireul mot meogeoyo.", "I cannot eat meat.", "私は肉を食べられません。", "我不能吃肉。", "Tôi không ăn được thịt.", "No puedo comer carne.")
    ],
    sceneWords: ["알레르기", "땅콩", "빼 주세요"],
    roleplayPrompt: phrase("못 드시는 음식이 있어요?", "Mot deusineun eumsigi isseoyo?", "Is there any food you cannot eat?", "食べられないものはありますか。", "有不能吃的食物吗？", "Có món nào bạn không ăn được không?", "¿Hay algo que no pueda comer?")
  },
  {
    day: 21,
    title: "따로 포장 부탁하기",
    situation: "음식을 나눠 담거나 따로 포장해 달라고 요청합니다.",
    phraseId: "pack-separately",
    core: phrase("따로 포장해 주세요.", "Ttaro pojanghae juseyo.", "Please pack it separately.", "別々に包んでください。", "请分开打包。", "Làm ơn gói riêng.", "Empáquelo por separado, por favor."),
    response: phrase("네, 따로 해 드릴게요.", "Ne, ttaro hae deurilgeyo.", "Okay, I will do it separately.", "はい、別々にします。", "好的，我给您分开。", "Vâng, tôi sẽ làm riêng.", "Sí, lo separo."),
    rescue: phrase("봉투 하나 더 주세요.", "Bongtu hana deo juseyo.", "Please give me one more bag.", "袋をもう一つください。", "请再给我一个袋子。", "Cho tôi thêm một túi.", "Deme una bolsa más, por favor."),
    dialogue: [
      { speaker: "학습자", text: "따로 포장해 주세요." },
      { speaker: "직원", text: "네, 따로 해 드릴게요." },
      { speaker: "학습자", text: "봉투 하나 더 주세요." }
    ],
    structurePattern: "따로 + V-아/어 주세요",
    structureExplanation: localized("Use `따로` when asking to separate items or actions.", "`따로`は別々にしてほしい時に使います。", "`따로` 表示分开、另外。", "Dùng `따로` khi muốn tách riêng.", "Usa `따로` para pedir algo separado."),
    swapSlots: [
      phrase("따로 계산해 주세요.", "Ttaro gyesanhae juseyo.", "Please calculate separately.", "別々に会計してください。", "请分开结账。", "Tính riêng giúp tôi.", "Cobren por separado, por favor."),
      phrase("따로 주세요.", "Ttaro juseyo.", "Please give it separately.", "別にください。", "请分开给我。", "Cho riêng giúp tôi.", "Démelo aparte, por favor.")
    ],
    sceneWords: ["따로", "포장", "봉투"],
    roleplayPrompt: phrase("같이 포장해 드릴까요?", "Gachi pojanghae deurilkkayo?", "Should I pack them together?", "一緒に包みましょうか。", "要一起打包吗？", "Gói chung được không?", "¿Lo empaco junto?")
  },
  {
    day: 22,
    title: "계산 요청하기",
    situation: "식당이나 카페에서 계산을 부탁합니다.",
    phraseId: "check-please",
    core: phrase("계산해 주세요.", "Gyesanhae juseyo.", "Please ring me up.", "お会計をお願いします。", "请结账。", "Tính tiền giúp tôi.", "La cuenta, por favor."),
    response: phrase("카드로 하세요?", "Kadeuro haseyo?", "Will you pay by card?", "カードで払いますか。", "您刷卡吗？", "Bạn trả bằng thẻ không?", "¿Paga con tarjeta?"),
    rescue: phrase("영수증 주세요.", "Yeongsujeung juseyo.", "Please give me a receipt.", "レシートをください。", "请给我收据。", "Cho tôi hóa đơn.", "Deme el recibo, por favor."),
    dialogue: [
      { speaker: "학습자", text: "계산해 주세요." },
      { speaker: "직원", text: "카드로 하세요?" },
      { speaker: "학습자", text: "영수증 주세요." }
    ],
    structurePattern: "N으로 하세요?",
    structureExplanation: localized("Use `-으로` to ask or say the method, like card or cash.", "`-으로`は支払い方法などを表します。", "`-으로` 表示方式，比如刷卡或现金。", "Dùng `-으로` để nói phương thức.", "Usa `-으로` para el método de pago."),
    swapSlots: [
      phrase("현금으로 할게요.", "Hyeongeumeuro halgeyo.", "I will pay in cash.", "現金で払います。", "我用现金。", "Tôi trả bằng tiền mặt.", "Pago en efectivo."),
      phrase("카드로 할게요.", "Kadeuro halgeyo.", "I will pay by card.", "カードで払います。", "我刷卡。", "Tôi trả bằng thẻ.", "Pago con tarjeta.")
    ],
    sceneWords: ["계산", "카드", "영수증"],
    roleplayPrompt: phrase("결제 도와드릴까요?", "Gyeolje dowadeurilkkayo?", "May I help you pay?", "お支払いをお手伝いしましょうか。", "需要帮您付款吗？", "Tôi giúp thanh toán nhé?", "¿Le ayudo con el pago?")
  },
  {
    day: 23,
    title: "물건을 잃어버렸다고 말하기",
    situation: "분실 상황에서 무엇을 잃어버렸는지 말합니다.",
    phraseId: "lost-item",
    core: phrase("지갑을 잃어버렸어요.", "Jigabeul ireobeoryeosseoyo.", "I lost my wallet.", "財布をなくしました。", "我丢了钱包。", "Tôi làm mất ví.", "Perdí mi cartera."),
    response: phrase("어디에서 잃어버리셨어요?", "Eodieseo ireobeorisyeosseoyo?", "Where did you lose it?", "どこでなくしましたか。", "你在哪里丢的？", "Bạn mất ở đâu?", "¿Dónde la perdió?"),
    rescue: phrase("도와주실 수 있어요?", "Dowajusil su isseoyo?", "Could you help me?", "手伝っていただけますか。", "可以帮我吗？", "Bạn có thể giúp tôi không?", "¿Podría ayudarme?"),
    dialogue: [
      { speaker: "학습자", text: "지갑을 잃어버렸어요." },
      { speaker: "상대", text: "어디에서 잃어버리셨어요?" },
      { speaker: "학습자", text: "도와주실 수 있어요?" }
    ],
    structurePattern: "N을/를 잃어버렸어요",
    structureExplanation: localized("Use this when something is lost and you need help.", "物をなくした時に使う表現です。", "丢东西时使用。", "Dùng khi bạn làm mất đồ.", "Úsalo cuando perdiste algo."),
    swapSlots: [
      phrase("휴대폰을 잃어버렸어요.", "Hyudaeponeul ireobeoryeosseoyo.", "I lost my phone.", "携帯をなくしました。", "我丢了手机。", "Tôi làm mất điện thoại.", "Perdí mi teléfono."),
      phrase("가방을 잃어버렸어요.", "Gabang-eul ireobeoryeosseoyo.", "I lost my bag.", "かばんをなくしました。", "我丢了包。", "Tôi làm mất túi.", "Perdí mi bolsa.")
    ],
    sceneWords: ["지갑", "잃어버렸어요", "도움"],
    roleplayPrompt: phrase("무슨 일이에요?", "Museun irieyo?", "What happened?", "どうしましたか。", "发生什么事了？", "Có chuyện gì vậy?", "¿Qué pasó?")
  },
  {
    day: 24,
    title: "예약 바꾸기",
    situation: "예약 시간이나 날짜를 바꾸고 싶다고 말합니다.",
    phraseId: "change-reservation",
    core: phrase("예약을 바꾸고 싶어요.", "Yeyageul bakkugo sipeoyo.", "I would like to change my reservation.", "予約を変更したいです。", "我想改预约。", "Tôi muốn đổi đặt chỗ.", "Quisiera cambiar mi reservación."),
    response: phrase("언제로 바꾸시겠어요?", "Eonjero bakkusigesseoyo?", "When would you like to change it to?", "いつに変更しますか。", "想改到什么时候？", "Bạn muốn đổi sang khi nào?", "¿Para cuándo quiere cambiarla?"),
    rescue: phrase("내일로 가능해요?", "Naeillo ganeunghaeyo?", "Is tomorrow possible?", "明日にできますか。", "明天可以吗？", "Ngày mai được không?", "¿Es posible mañana?"),
    dialogue: [
      { speaker: "학습자", text: "예약을 바꾸고 싶어요." },
      { speaker: "직원", text: "언제로 바꾸시겠어요?" },
      { speaker: "학습자", text: "내일로 가능해요?" }
    ],
    structurePattern: "N을/를 바꾸고 싶어요",
    structureExplanation: localized("Use this when you want to change a reservation, time, or plan.", "予約や時間を変更したい時に使います。", "想更改预约、时间或计划时使用。", "Dùng khi muốn đổi lịch hoặc kế hoạch.", "Úsalo para cambiar una reserva o plan."),
    swapSlots: [
      phrase("시간을 바꾸고 싶어요.", "Siganeul bakkugo sipeoyo.", "I want to change the time.", "時間を変えたいです。", "我想改时间。", "Tôi muốn đổi giờ.", "Quiero cambiar la hora."),
      phrase("날짜를 바꾸고 싶어요.", "Naljjareul bakkugo sipeoyo.", "I want to change the date.", "日付を変えたいです。", "我想改日期。", "Tôi muốn đổi ngày.", "Quiero cambiar la fecha.")
    ],
    sceneWords: ["예약", "바꾸고", "내일"],
    roleplayPrompt: phrase("예약 도와드릴까요?", "Yeyak dowadeurilkkayo?", "May I help with your reservation?", "予約をお手伝いしましょうか。", "需要帮您预约吗？", "Tôi giúp đặt chỗ nhé?", "¿Le ayudo con la reserva?")
  },
  {
    day: 25,
    title: "날씨 이야기하기",
    situation: "가벼운 대화를 시작하기 위해 날씨를 말합니다.",
    phraseId: "nice-weather",
    core: phrase("오늘 날씨 좋네요.", "Oneul nalssi joneyo.", "The weather is nice today.", "今日は天気がいいですね。", "今天天气很好。", "Hôm nay thời tiết đẹp nhỉ.", "Hoy hace buen tiempo."),
    response: phrase("그러게요. 정말 좋네요.", "Geureogeyo. Jeongmal joneyo.", "Yes, it really is nice.", "そうですね。本当にいいですね。", "是啊，真的很好。", "Đúng vậy. Rất đẹp.", "Sí, está muy bien."),
    rescue: phrase("조금 추워요.", "Jogeum chuwoyo.", "It is a little cold.", "少し寒いです。", "有点冷。", "Hơi lạnh.", "Hace un poco de frío."),
    dialogue: [
      { speaker: "학습자", text: "오늘 날씨 좋네요." },
      { speaker: "상대", text: "그러게요. 정말 좋네요." },
      { speaker: "학습자", text: "조금 추워요." }
    ],
    structurePattern: "N 좋네요",
    structureExplanation: localized("Use `-네요` for a soft reaction to what you notice.", "`-네요`は気づいたことをやわらかく言う表現です。", "`-네요` 用来柔和地表达发现或感受。", "Dùng `-네요` để nhận xét nhẹ nhàng.", "Usa `-네요` para una observación suave."),
    swapSlots: [
      phrase("분위기 좋네요.", "Bunwigi joneyo.", "The atmosphere is nice.", "雰囲気がいいですね。", "气氛很好。", "Không khí tốt nhỉ.", "El ambiente está bien."),
      phrase("여기 좋네요.", "Yeogi joneyo.", "This place is nice.", "ここはいいですね。", "这里很好。", "Ở đây đẹp nhỉ.", "Este lugar está bien.")
    ],
    sceneWords: ["날씨", "좋네요", "추워요"],
    roleplayPrompt: phrase("오늘 날씨 어때요?", "Oneul nalssi eottaeyo?", "How is the weather today?", "今日の天気はどうですか。", "今天天气怎么样？", "Thời tiết hôm nay thế nào?", "¿Cómo está el clima hoy?")
  },
  {
    day: 26,
    title: "약속 시간 정하기",
    situation: "친구나 동료와 만날 시간을 정합니다.",
    phraseId: "what-time-meet",
    core: phrase("몇 시에 만날까요?", "Myeot sie mannalkkayo?", "What time shall we meet?", "何時に会いましょうか。", "几点见面？", "Mấy giờ gặp nhau?", "¿A qué hora nos vemos?"),
    response: phrase("세 시에 만나요.", "Se sie mannayo.", "Let us meet at three.", "3時に会いましょう。", "三点见。", "Gặp lúc ba giờ nhé.", "Nos vemos a las tres."),
    rescue: phrase("조금 늦을 것 같아요.", "Jogeum neujeul geot gatayo.", "I think I will be a little late.", "少し遅れそうです。", "我可能会晚一点。", "Tôi nghĩ sẽ trễ một chút.", "Creo que llegaré un poco tarde."),
    dialogue: [
      { speaker: "학습자", text: "몇 시에 만날까요?" },
      { speaker: "친구", text: "세 시에 만나요." },
      { speaker: "학습자", text: "조금 늦을 것 같아요." }
    ],
    structurePattern: "몇 시에 + V-ㄹ까요?",
    structureExplanation: localized("Use `-ㄹ까요?` to suggest or ask what to do together.", "`-ㄹ까요?`は一緒に決める時に使います。", "`-ㄹ까요?` 用来一起商量。", "Dùng `-ㄹ까요?` khi cùng quyết định.", "Usa `-ㄹ까요?` para proponer juntos."),
    swapSlots: [
      phrase("어디에서 만날까요?", "Eodieseo mannalkkayo?", "Where shall we meet?", "どこで会いましょうか。", "在哪里见？", "Gặp ở đâu?", "¿Dónde nos vemos?"),
      phrase("내일 만날까요?", "Naeil mannalkkayo?", "Shall we meet tomorrow?", "明日会いましょうか。", "明天见吗？", "Ngày mai gặp nhé?", "¿Nos vemos mañana?")
    ],
    sceneWords: ["몇 시", "만날까요", "늦을"],
    roleplayPrompt: phrase("언제 만날까요?", "Eonje mannalkkayo?", "When shall we meet?", "いつ会いましょうか。", "什么时候见？", "Khi nào gặp?", "¿Cuándo nos vemos?")
  },
  {
    day: 27,
    title: "좋아하는 것 말하기",
    situation: "음식이나 콘텐츠 취향을 짧게 말합니다.",
    phraseId: "i-like-this",
    core: phrase("이거 정말 좋아해요.", "Igeo jeongmal joahaeyo.", "I really like this.", "これが本当に好きです。", "我真的很喜欢这个。", "Tôi rất thích cái này.", "Esto me gusta mucho."),
    response: phrase("저도 좋아해요.", "Jeodo joahaeyo.", "I like it too.", "私も好きです。", "我也喜欢。", "Tôi cũng thích.", "A mí también me gusta."),
    rescue: phrase("추천해 주세요.", "Chucheonhae juseyo.", "Please recommend something.", "おすすめしてください。", "请推荐一下。", "Hãy gợi ý giúp tôi.", "Recomiéndeme algo, por favor."),
    dialogue: [
      { speaker: "학습자", text: "이거 정말 좋아해요." },
      { speaker: "친구", text: "저도 좋아해요." },
      { speaker: "학습자", text: "추천해 주세요." }
    ],
    structurePattern: "N을/를 좋아해요",
    structureExplanation: localized("Use `좋아해요` for preferences, not only romantic liking.", "`좋아해요`は好みを表す時にも使えます。", "`좋아해요` 可用于表达喜好。", "Dùng `좋아해요` để nói sở thích.", "Usa `좋아해요` para gustos."),
    swapSlots: [
      phrase("이 노래 좋아해요.", "I norae joahaeyo.", "I like this song.", "この歌が好きです。", "我喜欢这首歌。", "Tôi thích bài hát này.", "Me gusta esta canción."),
      phrase("이 음식 좋아해요.", "I eumsik joahaeyo.", "I like this food.", "この食べ物が好きです。", "我喜欢这个食物。", "Tôi thích món này.", "Me gusta esta comida.")
    ],
    sceneWords: ["좋아해요", "추천", "노래"],
    roleplayPrompt: phrase("뭐 좋아해요?", "Mwo joahaeyo?", "What do you like?", "何が好きですか。", "你喜欢什么？", "Bạn thích gì?", "¿Qué le gusta?")
  },
  {
    day: 28,
    title: "병원 증상 말하기",
    situation: "몸이 좋지 않을 때 증상을 짧게 말합니다.",
    phraseId: "head-hurts",
    core: phrase("머리가 아파요.", "Meoriga apayo.", "My head hurts.", "頭が痛いです。", "我头疼。", "Tôi đau đầu.", "Me duele la cabeza."),
    response: phrase("언제부터 아팠어요?", "Eonjebuteo apasseoyo?", "Since when has it hurt?", "いつから痛いですか。", "从什么时候开始疼？", "Đau từ khi nào?", "¿Desde cuándo le duele?"),
    rescue: phrase("약을 사고 싶어요.", "Yageul sago sipeoyo.", "I want to buy medicine.", "薬を買いたいです。", "我想买药。", "Tôi muốn mua thuốc.", "Quiero comprar medicina."),
    dialogue: [
      { speaker: "학습자", text: "머리가 아파요." },
      { speaker: "직원", text: "언제부터 아팠어요?" },
      { speaker: "학습자", text: "약을 사고 싶어요." }
    ],
    structurePattern: "몸 + 이/가 아파요",
    structureExplanation: localized("Use body part + `아파요` to explain symptoms simply.", "体の部分に`아파요`をつけて症状を言います。", "身体部位加 `아파요` 可说明症状。", "Dùng bộ phận cơ thể + `아파요` để nói triệu chứng.", "Usa parte del cuerpo + `아파요` para síntomas."),
    swapSlots: [
      phrase("배가 아파요.", "Baega apayo.", "My stomach hurts.", "お腹が痛いです。", "我肚子疼。", "Tôi đau bụng.", "Me duele el estómago."),
      phrase("목이 아파요.", "Mogi apayo.", "My throat hurts.", "喉が痛いです。", "我嗓子疼。", "Tôi đau họng.", "Me duele la garganta.")
    ],
    sceneWords: ["머리", "아파요", "약"],
    roleplayPrompt: phrase("어디가 아프세요?", "Eodiga apeuseyo?", "Where does it hurt?", "どこが痛いですか。", "哪里疼？", "Bạn đau ở đâu?", "¿Dónde le duele?")
  },
  {
    day: 29,
    title: "서류 확인 부탁하기",
    situation: "은행이나 행정 창구에서 필요한 서류를 확인합니다.",
    phraseId: "check-document",
    core: phrase("이 서류가 필요해요?", "I seoryuga piryohaeyo?", "Do I need this document?", "この書類が必要ですか。", "需要这份文件吗？", "Có cần giấy tờ này không?", "¿Necesito este documento?"),
    response: phrase("네, 필요해요.", "Ne, piryohaeyo.", "Yes, you need it.", "はい、必要です。", "是的，需要。", "Vâng, cần.", "Sí, lo necesita."),
    rescue: phrase("확인해 주세요.", "Hwaginhae juseyo.", "Please check it.", "確認してください。", "请确认。", "Hãy kiểm tra giúp tôi.", "Revíselo, por favor."),
    dialogue: [
      { speaker: "학습자", text: "이 서류가 필요해요?" },
      { speaker: "직원", text: "네, 필요해요." },
      { speaker: "학습자", text: "확인해 주세요." }
    ],
    structurePattern: "N이/가 필요해요?",
    structureExplanation: localized("Use `필요해요` to ask whether something is required.", "`필요해요`で必要かどうかを確認します。", "用 `필요해요` 确认是否需要。", "Dùng `필요해요` để hỏi có cần không.", "Usa `필요해요` para preguntar si hace falta."),
    swapSlots: [
      phrase("여권이 필요해요?", "Yeogwoni piryohaeyo?", "Do I need my passport?", "パスポートが必要ですか。", "需要护照吗？", "Có cần hộ chiếu không?", "¿Necesito pasaporte?"),
      phrase("사진이 필요해요?", "Sajini piryohaeyo?", "Do I need a photo?", "写真が必要ですか。", "需要照片吗？", "Có cần ảnh không?", "¿Necesito una foto?")
    ],
    sceneWords: ["서류", "필요", "확인"],
    roleplayPrompt: phrase("무슨 서류가 필요하세요?", "Museun seoryuga piryo haseyo?", "What document do you need?", "どんな書類が必要ですか。", "需要什么文件？", "Bạn cần giấy tờ gì?", "¿Qué documento necesita?")
  },
  {
    day: 30,
    title: "다음 계획 말하기",
    situation: "30일 과정을 마무리하며 다음에 무엇을 할지 말합니다.",
    phraseId: "next-plan",
    core: phrase("다음에는 더 길게 말하고 싶어요.", "Daeumeneun deo gilge malhago sipeoyo.", "Next time, I want to speak longer.", "次はもっと長く話したいです。", "下次我想说得更长一点。", "Lần sau tôi muốn nói dài hơn.", "La próxima vez quiero hablar más."),
    response: phrase("좋아요. 계속 연습해요.", "Joayo. Gyesok yeonseuphaeyo.", "Good. Let us keep practicing.", "いいですね。続けて練習しましょう。", "好。继续练习吧。", "Tốt. Hãy tiếp tục luyện tập.", "Bien. Sigamos practicando."),
    rescue: phrase("오늘 배운 문장을 다시 말할게요.", "Oneul baeun munjangeul dasi malhalgeyo.", "I will say today's sentence again.", "今日習った文をもう一度言います。", "我再说一遍今天学的句子。", "Tôi sẽ nói lại câu hôm nay.", "Diré otra vez la frase de hoy."),
    dialogue: [
      { speaker: "튜터", text: "다음에는 뭘 하고 싶어요?" },
      { speaker: "학습자", text: "다음에는 더 길게 말하고 싶어요." },
      { speaker: "튜터", text: "좋아요. 계속 연습해요." },
      { speaker: "학습자", text: "오늘 배운 문장을 다시 말할게요." }
    ],
    structurePattern: "다음에는 + V-고 싶어요",
    structureExplanation: localized("Use this to say what you want to do next.", "次にしたいことを言う形です。", "用来表达下一步想做什么。", "Dùng để nói điều bạn muốn làm tiếp theo.", "Usa esto para decir qué quieres hacer después."),
    swapSlots: [
      phrase("다음에는 혼자 주문하고 싶어요.", "Daeumeneun honja jumunhago sipeoyo.", "Next time, I want to order alone.", "次は一人で注文したいです。", "下次我想自己点单。", "Lần sau tôi muốn tự gọi món.", "La próxima vez quiero ordenar solo."),
      phrase("다음에는 친구랑 말하고 싶어요.", "Daeumeneun chingurang malhago sipeoyo.", "Next time, I want to speak with a friend.", "次は友だちと話したいです。", "下次我想和朋友说话。", "Lần sau tôi muốn nói với bạn.", "La próxima vez quiero hablar con un amigo.")
    ],
    sceneWords: ["다음", "길게", "계속"],
    roleplayPrompt: phrase("다음 목표가 뭐예요?", "Daeum mokpyoga mwoyeyo?", "What is your next goal?", "次の目標は何ですか。", "下一个目标是什么？", "Mục tiêu tiếp theo là gì?", "¿Cuál es su próximo objetivo?")
  }
] as const;

const createLesson = (seed: (typeof lessonSeeds)[number]): Lesson => {
  const dialogue = seed.dialogue.map((line) => ({
    speaker: line.speaker,
    korean: line.text,
    meaningByCountry: localized(line.text, line.text, line.text, line.text, line.text)
  }));

  return {
    id: `day-${seed.day}`,
    day: seed.day,
    title: seed.title,
    situation: seed.situation,
    phraseId: seed.phraseId,
    korean: seed.core.korean,
    romanization: seed.core.romanization ?? "",
    meaningByCountry: seed.core.meaningByCountry,
    dialogue,
    responsePhrase: seed.response,
    rescuePhrase: seed.rescue,
    structure: {
      pattern: seed.structurePattern,
      explanationByCountry: seed.structureExplanation
    },
    swapSlots: seed.swapSlots.map((slot, index) => ({ ...slot, label: `바꿔 말하기 ${index + 1}` })),
    sceneWords: [...seed.sceneWords],
    roleplay: {
      prompt: seed.roleplayPrompt,
      expected: seed.core,
      fallback: seed.rescue
    },
    reviewCards: reviewCards(seed.day, seed.core, seed.roleplayPrompt),
    countryNotes: commonCountryNotes,
    pronunciationByCountry: commonPronunciationNotes,
    audioTargets: {
      core: seed.core,
      response: seed.response,
      rescue: seed.rescue,
      dialogue: {
        korean: dialogue.map((line) => line.korean).join(" "),
        meaningByCountry: seed.core.meaningByCountry
      },
      ...Object.fromEntries(seed.swapSlots.map((slot, index) => [`swap-${index + 1}`, slot]))
    },
    steps: [
      {
        id: "situation",
        kind: "situation",
        title: "오늘의 상황",
        body: seed.situation,
        audioTargetId: "dialogue",
        reviewWeight: 1
      },
      {
        id: "dialogue",
        kind: "dialogue",
        title: "전체 대화 듣기",
        body: "짧은 대화를 먼저 듣고, 오늘 내가 말할 차례를 찾아봅니다.",
        korean: dialogue.map((line) => line.korean).join(" "),
        audioTargetId: "dialogue",
        reviewWeight: 2
      },
      {
        id: "phrase",
        kind: "phrase",
        title: "오늘의 한 문장",
        body: "소리와 뜻을 함께 확인합니다.",
        korean: seed.core.korean,
        romanization: seed.core.romanization,
        audioTargetId: "core",
        saveTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "structure",
        kind: "structure",
        title: "문장 뼈대",
        body: "문법 이름보다 먼저 바로 써먹을 문장틀을 확인합니다.",
        audioTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "swap",
        kind: "swap",
        title: "바꿔 말하기",
        body: "단어 하나만 바꿔 같은 장면에서 다시 말합니다.",
        audioTargetId: "swap-1",
        saveTargetId: "swap-1",
        reviewWeight: 2
      },
      {
        id: "natural-listen",
        kind: "listen",
        title: "자연 속도로 듣기",
        body: "먼저 전체 리듬을 들어 봅니다.",
        korean: seed.core.korean,
        audioTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "slow-listen",
        kind: "listen",
        title: "느린 속도로 듣기",
        body: "낯선 소리를 천천히 확인합니다.",
        korean: seed.core.korean,
        audioTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "record",
        kind: "record",
        title: "내 목소리로 말하기",
        body: "한 번 말해 보고, 필요하면 다시 녹음합니다.",
        korean: seed.core.korean,
        audioTargetId: "core",
        saveTargetId: "core",
        reviewWeight: 4
      },
      {
        id: "compare",
        kind: "compare",
        title: "원본과 내 목소리 비교",
        body: "점수 대신 원본과 내 리듬을 번갈아 들어 봅니다.",
        korean: seed.core.korean,
        audioTargetId: "core",
        reviewWeight: 4
      },
      {
        id: "quiz",
        kind: "quiz",
        title: "짧은 확인",
        body: "이 표현을 쓰기 가장 자연스러운 상황은 무엇일까요?",
        choices: [seed.situation, "잠들기 전에 혼잣말할 때", "전화번호를 쓸 때"],
        answer: seed.situation,
        hint: "오늘 처음에 본 실제 상황을 떠올려 보세요.",
        reviewWeight: 3
      },
      {
        id: "roleplay",
        kind: "roleplay",
        title: "짧은 역할극",
        body: "상대의 짧은 반응 뒤에 오늘 문장으로 답합니다.",
        korean: seed.core.korean,
        audioTargetId: "response",
        saveTargetId: "rescue",
        reviewWeight: 3
      },
      {
        id: "summary",
        kind: "summary",
        title: "오늘의 정리",
        body: `오늘은 "${seed.core.korean}" 표현을 연습했습니다. 저장한 문장은 복습에서 다시 말하게 됩니다.`,
        reviewWeight: 1
      }
    ]
  };
};

export const lessons: Lesson[] = lessonSeeds.map(createLesson);

export const getLesson = (id = "day-1") => lessons.find((lesson) => lesson.id === id) ?? lessons[0];

export const getNextLesson = (progress: Record<string, { status: string }>) =>
  lessons.find((lesson) => progress[lesson.id]?.status !== "completed") ?? lessons[lessons.length - 1];
