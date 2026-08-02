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
  "Say the Korean first, then check the short structure note.",
  "まず韓国語を声に出してから、短い構造メモを確認します。",
  "先开口说韩语，再看简短的句子结构说明。",
  "Hãy nói tiếng Hàn trước, rồi xem ghi chú cấu trúc ngắn.",
  "Primero di la frase en coreano y luego revisa la nota corta."
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
    steps: [
      {
        id: "situation",
        kind: "situation",
        title: "오늘의 상황",
        body: seed.situation,
        reviewWeight: 1
      },
      {
        id: "dialogue",
        kind: "dialogue",
        title: "전체 대화 듣기",
        body: "짧은 대화를 먼저 듣고, 오늘 내가 말할 차례를 찾아봅니다.",
        korean: dialogue.map((line) => line.korean).join(" "),
        reviewWeight: 2
      },
      {
        id: "phrase",
        kind: "phrase",
        title: "오늘의 한 문장",
        body: "소리와 뜻을 함께 확인합니다.",
        korean: seed.core.korean,
        romanization: seed.core.romanization,
        reviewWeight: 2
      },
      {
        id: "structure",
        kind: "structure",
        title: "문장 뼈대",
        body: "문법 이름보다 먼저 바로 써먹을 문장틀을 확인합니다.",
        reviewWeight: 2
      },
      {
        id: "swap",
        kind: "swap",
        title: "바꿔 말하기",
        body: "단어 하나만 바꿔 같은 장면에서 다시 말합니다.",
        reviewWeight: 2
      },
      {
        id: "meaning",
        kind: "meaning",
        title: "뜻 확인",
        body: "상황에 맞게 짧고 정중하게 사용할 수 있는 표현입니다.",
        reviewWeight: 1
      },
      {
        id: "scene-words",
        kind: "scene-words",
        title: "장면 단어 3개",
        body: "오늘 대화를 꺼낼 때 필요한 단어만 짧게 확인합니다.",
        reviewWeight: 1
      },
      {
        id: "natural-listen",
        kind: "listen",
        title: "자연 속도로 듣기",
        body: "먼저 전체 리듬을 들어 봅니다.",
        korean: seed.core.korean,
        reviewWeight: 2
      },
      {
        id: "slow-listen",
        kind: "listen",
        title: "느린 속도로 듣기",
        body: "낯선 소리를 천천히 확인합니다.",
        korean: seed.core.korean,
        reviewWeight: 2
      },
      {
        id: "record",
        kind: "record",
        title: "내 목소리로 말하기",
        body: "한 번 말해 보고, 필요하면 다시 녹음합니다.",
        korean: seed.core.korean,
        reviewWeight: 4
      },
      {
        id: "compare",
        kind: "compare",
        title: "원본과 내 목소리 비교",
        body: "점수 대신 원본과 내 리듬을 번갈아 들어 봅니다.",
        korean: seed.core.korean,
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
