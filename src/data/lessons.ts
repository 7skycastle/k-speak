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

const en = (s: string): Record<CountryPackId, string> => localized(s, s, s, s, s);

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
  "Korean often puts the object or place before the action. Say the whole phrase once, then notice how the last ending carries politeness and intent.",
  "韓国語は日本語と語順が近いですが、助詞を一対一で置き換えるより、文末まで一息で言って全体の流れをつかむほうが自然です。",
  "韩语常把对象或地点放在动作前面。先把整句说出来，再留意句尾怎样表达礼貌和语气。",
  "Tiếng Hàn thường đặt đồ vật hoặc địa điểm trước hành động. Hãy nói trọn câu trước, rồi chú ý cách đuôi câu mang ý lịch sự và mục đích.",
  "En coreano, el objeto o el lugar suele ir antes de la acción. Di primero la frase completa y luego fíjate en cómo el final expresa cortesía e intención."
);

const commonPronunciationNotes = localized(
  "Listen for the sentence ending first. Korean politeness often lives in the final sound, so match the ending and rhythm before fixing each syllable.",
  "ローマ字を長く頼らず、最後の요やパッチムの有無を先に聞きます。母音を伸ばしすぎず、語尾の下がり方までまねるのがコツです。",
  "先听句尾、停顿和连读，不要只按字面意思或罗马字去读。先模仿整句节奏，再修单个音节。",
  "Hãy nghe phần cuối câu, chỗ ngắt và âm nối trước, đừng chỉ đọc theo romanization. Bắt chước nhịp cả câu trước rồi mới sửa từng âm.",
  "Escucha primero el final de la frase, las pausas y los enlaces. No te guíes solo por la romanización: imita antes el ritmo completo y luego corrige sílaba por sílaba."
);

const day14StructureOverrides: Partial<Record<number, Record<CountryPackId, string>>> = {
  1: localized(
    "The ending `-yo` makes the greeting polite. Keep `annyeonghaseyo` in one smooth breath and let the tone fall softly at the end.",
    "`-요`があると初対面でも自然に丁寧になります。`안녕하세요`は途中で切らず、最後をやわらかく下げます。",
    "`-요` 让这句在初次见面时更礼貌自然。`안녕하세요` 尽量一口气说完，句尾轻轻落下。",
    "Đuôi `-요` làm câu chào lịch sự hơn. Hãy nói `안녕하세요` liền mạch và hạ giọng nhẹ ở cuối câu.",
    "La terminación `-요` vuelve el saludo cortés. Di `안녕하세요` de corrido y baja suavemente al final."
  ),
  2: localized(
    "Use `N hana juseyo` for a simple order. Put the item name first, then finish with `juseyo` as one polite chunk.",
    "`N 하나 주세요`は一番使いやすい注文の形です。品目を先に言って、最後の`주세요`をひとかたまりで出します。",
    "`N 하나 주세요` 是最常用的点单句型。先说东西，再把 `주세요` 连起来说完整。",
    "`N 하나 주세요` là mẫu câu gọi món cơ bản nhất. Nói món trước, rồi nói `주세요` thành một cụm lịch sự.",
    "`N 하나 주세요` es una forma muy útil para pedir. Primero di el producto y luego `주세요` como un solo bloque cortés."
  ),
  3: localized(
    "Pair `thank you` with a short result such as `that helped`. It sounds warmer than stopping after only `gamsahamnida`.",
    "`ありがとうございます`だけで終わらず、`助かりました`まで添えると気持ちがもっと自然に伝わります。",
    "不要只说“谢谢”，再加一句“真的帮到我了”会更自然、更有温度。",
    "Đừng chỉ nói cảm ơn. Thêm một câu như `việc đó đã giúp tôi` sẽ nghe tự nhiên và ấm áp hơn.",
    "No te quedes solo con `gracias`. Si añades `me ayudó mucho`, la frase suena más natural, cálida y cercana."
  ),
  4: localized(
    "Use `N-i eodiyeyo?` to ask where a place is. The topic is the place, so say it clearly before `eodiyeyo`.",
    "`N이/가 어디예요?`は場所をたずねる基本形です。知りたい場所を先にはっきり言ってから`어디예요`につなげます。",
    "`N이/가 어디예요?` 是最基础的问路句型。先清楚说出地点，再接 `어디예요`。",
    "`N-i/ga eodiyeyo?` là mẫu câu cơ bản để hỏi địa điểm. Nói rõ nơi cần tìm trước, rồi mới nói `어디예요`.",
    "`N-i/ga eodiyeyo?` sirve para preguntar por un lugar. Nombra primero el sitio y luego cierra con `어디예요`."
  ),
  5: localized(
    "`Igeo eolmayeyo?` asks the price of something near you. Switch to `geugeo` when the item is closer to the other person.",
    "`이거 얼마예요?`は自分の近くの物の値段を聞く形です。相手の近くなら`그거`に替えます。",
    "`이거 얼마예요?` 用来问你手边这个东西的价格。东西更靠近对方时换成 `그거`。",
    "`이거 얼마예요?` dùng để hỏi giá món đồ ở gần bạn. Nếu đồ vật ở phía đối phương thì đổi sang `그거`.",
    "`이거 얼마예요?` pregunta el precio de algo que tienes cerca. Si lo tiene la otra persona, cambia a `그거`."
  ),
  6: localized(
    "Add `jogeum` before the request to sound softer. You are not refusing the conversation, only asking for a slower pace.",
    "`조금`を入れるとお願いがやわらかくなります。会話を断るのでなく、速度だけを下げてほしい気持ちが伝わります。",
    "前面加 `조금` 会更委婉，意思不是拒绝交流，而是请对方说慢一点。",
    "Thêm `조금` sẽ làm câu nhẹ hơn. Bạn không từ chối cuộc nói chuyện, chỉ xin đối phương nói chậm lại.",
    "Añadir `조금` suaviza la petición. No rechazas la conversación; solo pides que hablen un poco más despacio."
  ),
  7: localized(
    "`Dasi han beon` means `one more time`. It sounds more polite and complete than saying only `dasi`.",
    "`다시 한 번`は`もう一度`を丁寧に言う形です。`다시`だけより、お願いとして自然に聞こえます。",
    "`다시 한 번` 就是“再一次”，比只说 `다시` 更完整、更礼貌。",
    "`다시 한 번` nghĩa là `một lần nữa`. Cách nói này lịch sự và đầy đủ hơn chỉ nói `다시`.",
    "`다시 한 번` significa `una vez más`. Suena más completo y amable que decir solo `다시`."
  ),
  8: localized(
    "Use `mwo-yeyo?` when asking what the recommended option is. It keeps the question open instead of naming one dish first.",
    "`뭐예요?`でたずねると、相手におすすめを広く任せられます。最初から一品に絞らない聞き方です。",
    "用 `뭐예요?` 来问时，对方可以自由推荐，不需要你先点出某一道菜。",
    "Dùng `뭐예요?` để hỏi mở rộng hơn, để đối phương tự nhiên gợi ý mà không cần bạn chỉ định trước.",
    "Con `뭐예요?` dejas la pregunta abierta para que la otra persona recomiende con libertad."
  ),
  9: localized(
    "Use `-go sipeoyo` to say what you want politely. It is useful when checking, changing, or making a reservation.",
    "`-고 싶어요`は自分の希望をやわらかく伝える形です。予約の確認・変更・作成のどれにも使えます。",
    "`-고 싶어요` 用来礼貌表达“我想……”。确认、修改、预约时都很常用。",
    "`-고 싶어요` dùng để nói điều bạn muốn một cách lịch sự. Mẫu này dùng tốt khi xác nhận, đổi, hoặc đặt chỗ.",
    "`-고 싶어요` expresa lo que quieres de manera cortés. Sirve para confirmar, cambiar o hacer una reservación."
  ),
  10: localized(
    "Two short calming lines together sound natural here: `It's okay` plus `there's no problem`. The second line removes doubt.",
    "`괜찮아요`だけでも通じますが、`문제없어요`を足すと相手はもっと安心します。",
    "只说 `괜찮아요` 也可以，但再加上 `문제없어요`，更能让对方放心。",
    "Chỉ nói `괜찮아요` đã được, nhưng thêm `문제없어요` sẽ làm đối phương yên tâm hơn.",
    "Solo con `괜찮아요` ya funciona, pero `문제없어요` ayuda a tranquilizar más a la otra persona."
  ),
  11: localized(
    "`-ju-sil su isseoyo?` is a polite way to ask a favor. It sounds gentler than a direct command because it asks about possibility.",
    "`-주실 수 있어요?`は可能かどうかをたずねるので、命令っぽくならず丁寧です。",
    "`-주실 수 있어요?` 是在问“您能不能帮我”，所以比直接要求更礼貌。",
    "`-주실 수 있어요?` hỏi về khả năng giúp đỡ, nên nghe lịch sự hơn một lời yêu cầu trực tiếp.",
    "`-주실 수 있어요?` pregunta si la otra persona puede ayudarte, por eso suena más amable que una orden directa."
  ),
  12: localized(
    "`Eodie isseoyo?` asks where something is located right now. It fits fixed places such as a restroom, elevator, or exit.",
    "`어디에 있어요?`は今その場所がどこにあるかを聞く形です。トイレや出口のような固定された場所によく合います。",
    "`어디에 있어요?` 是在问某样东西或某个地点现在在哪里，特别适合厕所、电梯、出口这类固定地点。",
    "`어디에 있어요?` dùng để hỏi một thứ hoặc một nơi đang ở đâu. Rất hợp với nhà vệ sinh, thang máy, lối ra.",
    "`어디에 있어요?` pregunta dónde está algo en ese momento. Va muy bien con lugares fijos como baño, ascensor o salida."
  ),
  13: localized(
    "`V-aseyo/juseyo` is the short request shape you will use constantly in shops. Here it works because the action is simple and clear.",
    "`-아/어 주세요`は店で何度も使う短い依頼の形です。動作が一つでわかりやすい場面に特によく合います。",
    "`-아/어 주세요` 是店里非常常用的请求句型，动作简单明确时最自然。",
    "`-아/어 주세요` là mẫu nhỏ và rất hay dùng ở cửa hàng. Nó hợp nhất khi hành động cần yêu cầu đơn giản, rõ ràng.",
    "`-아/어 주세요` es una forma corta y muy útil para pedir cosas en tiendas. Funciona mejor cuando la acción es simple."
  ),
  14: localized(
    "`Daeume tto` sets up a warm closing: `next time, again`. It sounds friendlier than ending the conversation with only goodbye.",
    "`다음에 또`を入れると、ただ別れるよりも`また会いたい`気持ちがやわらかく伝わります。",
    "`다음에 또` 会让结束语听起来更有人情味，不只是单纯说再见，而是表示还想再见面。",
    "`다음에 또` làm câu kết thúc ấm áp hơn, không chỉ là tạm biệt mà còn là hẹn gặp lại.",
    "`다음에 또` hace que el cierre suene más cercano: no solo te despides, también dejas abierta la próxima vez."
  )
};

const day14PronunciationOverrides: Partial<Record<number, Record<CountryPackId, string>>> = {
  1: localized(
    "Keep `안녕하세요` in one flow and listen for the soft final `-yo`. In `만나서`, the `nn` sound is longer than in English.",
    "`안녕하세요`は区切らず一息で。最後の`요`をやわらかく下げ、`만나서`の`ㄴ`は少し長めに重ねます。",
    "`안녕하세요` 尽量一口气说完，句尾 `요` 轻轻落下。`만나서` 里的 `ㄴ` 要连得更顺一些。",
    "Nói `안녕하세요` liền mạch, hạ nhẹ ở `요`. Trong `만나서`, âm `n` được giữ dài hơn một chút.",
    "Di `안녕하세요` de corrido y baja suave en `-yo`. En `만나서`, la `n` se sostiene un poco más que en español."
  ),
  2: localized(
    "Stress the item, not `juseyo`. In `아이스`, the first syllable is clean and short, and `하나` should not become `hanaa`.",
    "`주세요`より品名をはっきり。`아이스`の最初は短く、`하나`は母音を引きのばしすぎないのがコツです。",
    "重点放在饮品名，不要把 `주세요` 读得太重。`아이스` 开头要干净，`하나` 不要拖长。",
    "Nhấn vào tên đồ uống hơn là `주세요`. `아이스` mở đầu gọn, và `하나` không cần kéo dài nguyên âm.",
    "Marca más el nombre del producto que `주세요`. `아이스` empieza corto y limpio, y `하나` no debe alargarse."
  ),
  3: localized(
    "In `감사합니다`, keep the middle crisp instead of flattening every syllable. `도움이` links smoothly as `doumi` in fast speech.",
    "`감사합니다`は全部を同じ強さで読まず、真ん中をはっきり。`도움이`は速いと`도우미`に近くつながります。",
    "`감사합니다` 中间音节要清楚，不要每个字都一样重。`도움이` 连读时会更接近 `도우미`。",
    "Trong `감사합니다`, giữ nhịp rõ ở giữa câu. `도움이` thường nói liền mượt, nghe gần như `doumi`.",
    "En `감사합니다`, no aplanes todas las sílabas. `도움이` suele enlazarse y sonar más fluido, casi como `doumi`."
  ),
  4: localized(
    "Hold the `yeok` ending in `지하철역` cleanly. `어디예요` should rise slightly at the end because it is a question.",
    "`지하철역`の最後の`역`をあいまいにしないのが大事です。`어디예요`は質問なので語尾を少し上げます。",
    "`지하철역` 最后的 `역` 要收得清楚。`어디예요` 因为是问句，结尾可以轻微上扬。",
    "Kết thúc `역` trong `지하철역` cần gọn rõ. `어디예요` là câu hỏi nên cuối câu nhấc lên nhẹ.",
    "Cierra bien `yeok` en `지하철역`. Como `어디예요` es pregunta, el final sube un poco."
  ),
  5: localized(
    "`얼마예요` often sounds connected, almost like `eolmayeyo`. Keep the `won` in `만 원` short and firm.",
    "`얼마예요`は切らずに`얼마예요`と流します。`만 원`の`원`は短くはっきり止めます。",
    "`얼마예요` 通常连着说，不要一字一顿。`만 원` 里的 `원` 要短而清楚。",
    "`얼마예요` thường được nói liền. Trong `만 원`, âm `원` nên ngắn và rõ.",
    "`얼마예요` suele salir enlazado. En `만 원`, `won` va corto y claro."
  ),
  6: localized(
    "Stretch `천` and `히` just a little in `천천히`, but keep the sentence moving. `말해 주세요` should sound like one request, not three separate words.",
    "`천천히`は`천`と`히`を少しだけ意識すると聞き取りやすくなります。`말해 주세요`は三つに切らずお願いとしてまとめます。",
    "`천천히` 里的 `천` 和 `히` 可以稍微拉开一点，但整句不要断。`말해 주세요` 要像一个完整请求一起说。",
    "Trong `천천히`, có thể kéo nhẹ `천` và `히`, nhưng nhịp câu vẫn phải liền. `말해 주세요` nên nghe như một lời nhờ trọn vẹn.",
    "En `천천히`, alarga un poco `cheon` y `hi`, pero sin romper el ritmo. `말해 주세요` debe sonar como una sola petición."
  ),
  7: localized(
    "The `han beon` part carries the key meaning `one more time`. Keep `한` short and make the `beon` ending neat, not nasalized too much.",
    "意味の中心は`한 번`です。`한`は短く、`번`の終わりはにごらせすぎず整えて出します。",
    "重点在 `한 번`，表示“再一次”。`한` 要短，`번` 的结尾要收干净。",
    "Phần quan trọng nhất là `한 번`, nghĩa là `một lần nữa`. `한` nói gọn, và cuối `번` đóng âm rõ ràng.",
    "La parte clave es `한 번`, que significa `una vez más`. `한` va corto y el final de `번` debe cerrarse con limpieza."
  ),
  8: localized(
    "In `추천`, the first syllable is tense and clear. Let `뭐예요` rise at the end so it sounds curious, not flat.",
    "`추천`の最初は少ししっかりめに。`뭐예요`は平たく読まず、最後を軽く上げると自然です。",
    "`추천` 开头要清楚有力。`뭐예요` 结尾轻轻上扬，会更像自然提问。",
    "Âm đầu của `추천` cần rõ và chắc. Cuối `뭐예요` nhấc lên nhẹ để nghe đúng là câu hỏi.",
    "En `추천`, la primera sílaba debe salir firme. Sube un poco al final de `뭐예요` para que suene realmente a pregunta."
  ),
  9: localized(
    "In `확인하고`, the `gi` sound links into the next syllable smoothly. `싶어요` should end softly, not too strongly.",
    "`확인하고`は途中を切らずにつなげます。`싶어요`は言い切りすぎず、やわらかく終えると自然です。",
    "`확인하고` 中间连读更自然。`싶어요` 句尾不要太重，轻轻收尾更像韩语口气。",
    "`확인하고` nên nói liền mượt. `싶어요` kết thúc nhẹ sẽ nghe tự nhiên hơn.",
    "`확인하고` suena mejor enlazado. `싶어요` debe cerrar suave, sin demasiada fuerza."
  ),
  10: localized(
    "Say `괜찮아요` with a calm falling tone. In `문제없어요`, keep the break after `문제` very small so the phrase stays reassuring.",
    "`괜찮아요`は落ち着いて下げます。`문제없어요`は`문제`のあとを空けすぎないと、安心させる流れが保てます。",
    "`괜찮아요` 用平稳下行语调说更自然。`문제없어요` 不要把中间停得太开，整句会更安抚人。",
    "Nói `괜찮아요` với giọng dịu và hạ xuống. Trong `문제없어요`, đừng nghỉ quá lâu sau `문제` để câu vẫn liền và trấn an.",
    "Di `괜찮아요` con tono tranquilo y descendente. En `문제없어요`, no hagas una pausa grande después de `문제` para que siga sonando tranquilizador."
  ),
  11: localized(
    "The polite lift is in `주실 수 있어요?`. Keep `사진 좀` light, then let the request part carry the softness.",
    "丁寧さの中心は`주실 수 있어요?`にあります。`사진 좀`は軽く置いて、お願い部分をやわらかく出します。",
    "真正礼貌的感觉在 `주실 수 있어요?`。`사진 좀` 可以轻一点，后半句要更柔和。",
    "Độ lịch sự nằm ở phần `주실 수 있어요?`. `사진 좀` có thể nói nhẹ, rồi để phần nhờ vận mang sự mềm mại.",
    "La cortesía está sobre todo en `주실 수 있어요?`. Di `사진 좀` más ligero y deja que la segunda parte cargue con la amabilidad de la petición."
  ),
  12: localized(
    "`어디에 있어요` should flow without big pauses. In `오른쪽`, the `jjok` ending is short and clipped.",
    "`어디에 있어요`は一続きで流します。`오른쪽`の最後の`쪽`は短く切ると韓国語らしく聞こえます。",
    "`어디에 있어요` 尽量连着说。`오른쪽` 最后的 `쪽` 要短促收住。",
    "`어디에 있어요` nên nói liền. Trong `오른쪽`, âm cuối `쪽` ngắn và gọn.",
    "Di `어디에 있어요` sin pausas grandes. En `오른쪽`, el final `jjok` va corto y bien cerrado."
  ),
  13: localized(
    "In `포장해`, the `jang` should stay clear before moving to `hae`. `부탁드려요` sounds best when the middle is smooth, not overly segmented.",
    "`포장해`では`장`をはっきり出してから`해`へつなげます。`부탁드려요`は細かく切らず、なめらかに流すと自然です。",
    "`포장해` 里的 `장` 要清楚，再顺着接到 `해`。`부탁드려요` 不要切得太碎，连起来更自然。",
    "Trong `포장해`, giữ rõ âm `jang` rồi mới chuyển sang `hae`. `부탁드려요` nghe tự nhiên hơn khi nói mượt, không cắt nhỏ.",
    "En `포장해`, marca bien `jang` antes de pasar a `hae`. `부탁드려요` suena mejor enlazado, no cortado en trozos."
  ),
  14: localized(
    "Give `다음에 또` a warm rhythm, then soften the ending in `만나요`. The sentence should sound inviting, not abrupt.",
    "`다음에 또`は少し弾むように、`만나요`はやわらかく下げます。ぶつ切りにせず、また会いたい気持ちを乗せます。",
    "`다음에 또` 可以带一点轻快节奏，`만나요` 结尾柔和地下去。整句要像在真心邀请再见面。",
    "Nói `다음에 또` với nhịp ấm áp, rồi hạ mềm ở `만나요`. Câu này nên nghe thân thiện, không cộc lốc.",
    "Dale a `다음에 또` un ritmo cálido y baja suave en `만나요`. La frase debe sonar acogedora, no brusca."
  )
};

const day15To30StructureOverrides: Partial<Record<number, Record<CountryPackId, string>>> = {
  15: localized(
    "The destination goes first, then `-로 가 주세요` wraps it into a polite request. The driver hears the place name first, so say it clearly.",
    "行き先を先に言い、`-로 가 주세요`でまとめます。運転手は最初の地名を聞くので、はっきり言うことが大事です。",
    "先说目的地，再用 `-로 가 주세요` 包成礼貌请求。司机首先听到的是地名，所以要说清楚。",
    "Địa điểm đặt trước, rồi `-로 가 주세요` bao thành lời nhờ lịch sự. Tài xế nghe tên nơi đến trước, nên hãy nói rõ.",
    "El destino va primero; luego `-로 가 주세요` lo convierte en una petición cortés. El conductor escucha el lugar primero, así que dilo con claridad."
  ),
  16: localized(
    "`몇 번` asks which number it is. Place the thing being numbered right after — `출구` for exit, `버스` for bus, `방` for room. The structure works for any numbered item.",
    "`몇 번`は番号を聞く形です。出口・バス・部屋など、番号を聞きたいものをすぐ後に置きます。",
    "`몇 번` 用来问号码。直接把要问号码的东西放在后面——出口、公交车、房间都可以用这个句型。",
    "`몇 번` để hỏi số mấy. Đặt thứ cần hỏi số ngay sau — `출구` cho cửa ra, `버스` cho xe buýt, `방` cho phòng.",
    "`몇 번` pregunta cuál es el número. Pon lo que quieres numerar justo después: salida, autobús, habitación. Funciona para cualquier cosa numerada."
  ),
  17: localized(
    "`여기서` pins the action to this spot. Any verb can follow: `내려 주세요` to get off, `세워 주세요` to stop, `기다려 주세요` to wait. The place marker stays the same.",
    "`여기서`はここという場所を示します。降りる・止める・待つなど、どんな動詞とも組み合わせられます。場所の部分は変わりません。",
    "`여기서` 把动作定在这个位置。后面可以跟任何动词：下车、停车、等候。表示地点的部分不变。",
    "`여기서` ghim hành động vào nơi này. Bất kỳ động từ nào cũng dùng được: xuống xe, dừng lại, chờ đây.",
    "`여기서` fija la acción en este lugar. Cualquier verbo puede seguir: bajar, parar, esperar. La marca de lugar no cambia."
  ),
  18: localized(
    "`얼마나` opens questions about quantity or extent. The verb that follows tells what you are measuring: `걸려요` for time, `멀어요` for distance, `비싸요` for price. The question word leads, unlike in English.",
    "`얼마나`は量や程度を聞く疑問語です。後に続く動詞が何を測るかを決めます。英語と違い、疑問語が先に来ます。",
    "`얼마나` 用来问数量或程度。后面的动词决定你在问什么——时间用 `걸려요`，距离用 `멀어요`。疑问词放在最前面，与英语语序不同。",
    "`얼마나` mở đầu câu hỏi về lượng hoặc mức độ. Động từ theo sau cho biết bạn đang đo gì: thời gian dùng `걸려요`, khoảng cách dùng `멀어요`.",
    "`얼마나` abre preguntas sobre cantidad o grado. El verbo que sigue indica qué mides: `걸려요` para tiempo, `멀어요` para distancia. La palabra interrogativa va primero, al contrario que en español."
  ),
  19: localized(
    "`-지 않게` turns any adjective into a \"please make it not X\" request. The adjective comes first: `맵지 않게` (not spicy), `짜지 않게` (not salty), `달지 않게` (not sweet). Then `해 주세요` closes it.",
    "`-지 않게`で「そうならないように」という依頼が作れます。形容詞を先に置き、`해 주세요`で閉じます。辛さ・塩気・甘さなど何にでも使えます。",
    "`-지 않게` 让任何形容词变成'请别做成那样'的请求。形容词放在前面，最后用 `해 주세요` 收尾。辣、咸、甜都能套用。",
    "`-지 않게` biến tính từ thành lời nhờ 'xin đừng làm thành X'. Tính từ đặt trước: `맵지 않게`, `짜지 않게`, rồi `해 주세요` kết thúc.",
    "`-지 않게` convierte cualquier adjetivo en una petición de \"que no quede así\". El adjetivo va primero: `맵지 않게`, `짜지 않게`; luego `해 주세요` cierra."
  ),
  20: localized(
    "`저는` marks you as the subject. `N 알레르기가 있어요` states the allergy. Swap in any ingredient for N — `땅콩` (peanut), `우유` (milk), `밀가루` (flour). Staff understand this pattern immediately.",
    "`저는`が主語を示します。`N 알레르기가 있어요`でアレルギーを伝えます。Nには`땅콩`・`우유`・`밀가루`など任意の食材を入れます。",
    "`저는` 表示主语是你。`N 알레르기가 있어요` 说明过敏原。把 N 换成任意食材——花生、牛奶、面粉。工作人员一听就明白。",
    "`저는` đánh dấu bạn là chủ thể. `N 알레르기가 있어요` nêu dị ứng. Thay N bằng bất kỳ nguyên liệu nào — đậu phộng, sữa, bột mì.",
    "`저는` marca que tú eres el sujeto. `N 알레르기가 있어요` declara la alergia. Sustituye N por cualquier ingrediente: cacahuate, leche, harina."
  ),
  21: localized(
    "`따로` means separately or apart. It floats in front of any verb: `따로 담아 주세요` (pack separately), `따로 계산해 주세요` (bill separately). The verb changes; `따로` stays.",
    "`따로`は「別々に」という意味で、どんな動詞の前にも置けます。詰める・計算するなど動詞を替えるだけで使えます。",
    "`따로` 意思是'分开'，可以放在任何动词前面——分开打包、分开结账。动词换，`따로` 不变。",
    "`따로` nghĩa là riêng hoặc tách biệt. Đặt trước bất kỳ động từ nào: `따로 담아 주세요`, `따로 계산해 주세요`. Động từ thay đổi, `따로` giữ nguyên.",
    "`따로` significa por separado. Va delante de cualquier verbo: `따로 담아 주세요` (envuélvelo aparte), `따로 계산해 주세요` (cóbralo aparte). El verbo cambia; `따로` queda."
  ),
  22: localized(
    "Add `-로/-으로` after the payment method to say how you are paying: `카드로 계산해 주세요` or `현금으로 계산해 주세요`. Without a method, `계산해 주세요` alone is enough.",
    "支払い方法のあとに`-로/-으로`をつけてどう払うかを示します。方法を言わない場合は`계산해 주세요`だけで通じます。",
    "在付款方式后加 `-로/-으로` 表示用什么方式付款：刷卡或付现金。不说方式的话，直接 `계산해 주세요` 就够了。",
    "Thêm `-로/-으로` sau phương thức thanh toán: `카드로 계산해 주세요` hoặc `현금으로 계산해 주세요`. Không cần nói cách, chỉ `계산해 주세요` cũng đủ.",
    "Añade `-로/-으로` al método de pago: `카드로 계산해 주세요` o `현금으로 계산해 주세요`. Sin especificar método, solo `계산해 주세요` es suficiente."
  ),
  23: localized(
    "Name what was lost with the object marker `-을/를`, then end with `잃어버렸어요`. The compound verb `잃어버리다` implies the loss is complete — stronger than just `잃다`.",
    "失くしたものを目的格の`-을/를`で示し、`잃어버렸어요`で締めます。`잃어버리다`は「完全になくしてしまった」というニュアンスで、`잃다`より強い表現です。",
    "用宾语助词 `-을/를` 说明丢了什么，再用 `잃어버렸어요` 收尾。复合动词 `잃어버리다` 表示已经完全丢失，语气比 `잃다` 更强。",
    "Nêu thứ bị mất với trợ từ `-을/를`, rồi kết bằng `잃어버렸어요`. Động từ ghép `잃어버리다` ngụ ý mất hoàn toàn, mạnh hơn chỉ `잃다`.",
    "Nombra lo perdido con la marca de objeto `-을/를`, luego cierra con `잃어버렸어요`. El verbo compuesto `잃어버리다` implica pérdida total, más fuerte que solo `잃다`."
  ),
  24: localized(
    "Use `바꾸고 싶어요` to say what you want to change. Put the target before it: `예약을 바꾸고 싶어요`. For the new time or date, add `-(으)로` after it.",
    "`바꾸고 싶어요`で変えたいことを伝えます。何を変えたいかを先に言い、新しい日時には`-(으)로`をつけて示します。",
    "用 `바꾸고 싶어요` 表达想改变的内容。把目标放在前面：`예약을 바꾸고 싶어요`。新的时间或日期用 `-(으)로` 来表示。",
    "Dùng `바꾸고 싶어요` để nói bạn muốn thay đổi gì. Đặt đối tượng trước: `예약을 바꾸고 싶어요`. Thời gian/ngày mới thêm `-(으)로`.",
    "Usa `바꾸고 싶어요` para decir qué quieres cambiar. Pon el objeto antes: `예약을 바꾸고 싶어요`. La nueva hora o fecha va con `-(으)로`."
  ),
  25: localized(
    "`-네요` adds a soft reaction to something you just noticed. `춥네요` means \"wow, it is cold\" — not just stating a fact but sharing a feeling. It works for anything you observe in the moment.",
    "`-네요`は今気づいたことをやわらかく伝える語尾です。「寒いですね」のように、単に事実を言うより感想を添える感覚です。",
    "`-네요` 是对刚注意到的事物做出温和反应的语尾。`춥네요` 不只是陈述事实，更是分享当下的感受。",
    "`-네요` thêm phản ứng nhẹ về điều bạn vừa nhận ra. `춥네요` không chỉ là sự thật mà còn chia sẻ cảm xúc hiện tại.",
    "`-네요` añade una reacción suave a algo que acabas de notar. `춥네요` no solo constata el frío — comparte la sensación. Sirve para cualquier cosa observada en el momento."
  ),
  26: localized(
    "`-ㄹ까요?` proposes something to do together — \"shall we?\" Put the time or action before it: `두 시에 만날까요?` (shall we meet at two?). It invites the other person to agree.",
    "`-ㄹ까요?`は一緒に何かをする提案です。時間や動詞の前に置くだけで「〜しましょうか?」と聞けます。相手に同意を促す形です。",
    "`-ㄹ까요?` 是一起做某事的提议——'我们要不要……？' 把时间或动作放在前面就行：`두 시에 만날까요?`",
    "`-ㄹ까요?` đề xuất cùng làm gì đó. Đặt thời gian hoặc hành động trước: `두 시에 만날까요?`. Nó mời đối phương đồng ý.",
    "`-ㄹ까요?` propone hacer algo juntos — \"¿nos...?\" Pon el tiempo o la acción antes: `두 시에 만날까요?`. Invita al otro a estar de acuerdo."
  ),
  27: localized(
    "`좋아해요` covers general preferences — food, activities, content. For a noun alone, `N이/가 좋아요` is simpler. Both are natural. Use `좋아해요` when you also want to express the habit of liking something.",
    "`좋아해요`は食べ物や趣味など幅広い好みを表します。名詞だけなら`N이/가 좋아요`が簡単です。習慣的に好きなことを言うときは`좋아해요`が自然です。",
    "`좋아해요` 表达对食物、活动、内容等的喜好。对于单独的名词，`N이/가 좋아요` 更简单。想表达习惯性喜欢某事时，用 `좋아해요` 更自然。",
    "`좋아해요` diễn đạt sở thích chung — thức ăn, hoạt động, nội dung. Với danh từ đơn, `N이/가 좋아요` đơn giản hơn. Khi muốn nói thói quen thích, dùng `좋아해요`.",
    "`좋아해요` expresa preferencias generales: comida, actividades, contenido. Para un sustantivo solo, `N이/가 좋아요` es más sencillo. Usa `좋아해요` cuando quieras expresar el hábito de gustar."
  ),
  28: localized(
    "Body part first, then `아파요`. This is the simplest way to report pain. Add `조금` before `아파요` to soften the intensity, or `많이` to emphasize it.",
    "体の部分を先に言い、`아파요`で締めます。これが痛みを伝える最もシンプルな形です。`조금`で程度を柔らげ、`많이`で強調できます。",
    "先说身体部位，再接 `아파요`。这是报告疼痛的最简单方式。`조금` 放在 `아파요` 前面可以减弱程度，`많이` 则可以加重。",
    "Bộ phận cơ thể đặt trước, rồi `아파요`. Đây là cách đơn giản nhất để nói đau. Thêm `조금` trước `아파요` để nhẹ hơn, hoặc `많이` để nhấn mạnh.",
    "La parte del cuerpo va primero, luego `아파요`. Esta es la forma más simple de reportar dolor. Añade `조금` antes de `아파요` para suavizar, o `많이` para enfatizar."
  ),
  29: localized(
    "`뭐가 필요해요?` asks what is needed. At a counter, it is polite and direct. If you want to ask whether a specific document is needed, switch to `N이/가 필요해요?` with the document name.",
    "`뭐가 필요해요?`は何が必要かを聞く形です。窓口では丁寧で直接的です。特定の書類について聞くなら`N이/가 필요해요?`に変えられます。",
    "`뭐가 필요해요?` 用来问需要什么。在柜台这样问既礼貌又直接。如果要问特定文件，把 N 换成文件名：`N이/가 필요해요?`",
    "`뭐가 필요해요?` hỏi cần gì. Tại quầy, câu này lịch sự và thẳng thắn. Nếu muốn hỏi tài liệu cụ thể, đổi sang `N이/가 필요해요?`.",
    "`뭐가 필요해요?` pregunta qué se necesita. En una ventanilla, es directo y cortés. Si quieres preguntar por un documento específico, cambia a `N이/가 필요해요?`."
  ),
  30: localized(
    "`다음에는` sets the time frame: next time, after this. Then `V-고 싶어요` expresses the wish. Together they make a warm, forward-looking close to any conversation.",
    "`다음에는`で「次回・この次」という時間軸を示し、`V-고 싶어요`で願いを続けます。会話の締めくくりとして前向きな気持ちが伝わります。",
    "`다음에는` 设定时间框架——下次、之后。再加上 `V-고 싶어요` 表达愿望。两者合在一起，为对话画上温暖又期待的句号。",
    "`다음에는` đặt khung thời gian: lần sau, sau đây. Rồi `V-고 싶어요` bày tỏ mong muốn. Cùng nhau tạo cái kết ấm áp, hướng tới tương lai.",
    "`다음에는` fija el marco de tiempo: la próxima vez, después de esto. Luego `V-고 싶어요` expresa el deseo. Juntos forman un cierre cálido y esperanzador."
  )
};

const day15To30PronunciationOverrides: Partial<Record<number, Record<CountryPackId, string>>> = {
  15: localized(
    "Say the destination name first and clearly — the driver listens for it. Then `로 가 주세요` follows as one smooth unit. `로` links directly into `가` without a pause.",
    "行き先をまず明確に言います。運転手が真っ先に聞くからです。その後`로 가 주세요`をひとつながりで続けます。`로`は`가`に直接つなげます。",
    "先清楚说出目的地——司机首先听的是这个。然后 `로 가 주세요` 连成一体跟上，`로` 直接接 `가`，不要停顿。",
    "Nói tên điểm đến trước và rõ ràng — tài xế nghe vào đó. Rồi `로 가 주세요` theo sau liền mạch. `로` nối thẳng vào `가` không ngắt.",
    "Di el destino primero y con claridad — el conductor lo escucha primero. Luego `로 가 주세요` sigue como una unidad fluida. `로` conecta directo a `가` sin pausa."
  ),
  16: localized(
    "`몇` ends in a closed `t` sound that links straight into `번`: say `myeot-beon` without a gap. `출구예요` falls at the end as a statement, not a question.",
    "`몇`は閉じた`t`音で終わり、`번`に直接つながります。`myeot-beon`と続けて言います。`출구예요`は文末を下げて述べる形です。",
    "`몇` 以闭塞的 `t` 音结尾，直接连到 `번`：说成 `myeot-beon`，中间不要停顿。`출구예요` 末尾语调下降，是陈述句。",
    "`몇` kết thúc bằng âm `t` đóng nối thẳng vào `번`: nói `myeot-beon` liền mạch. `출구예요` hạ xuống ở cuối như câu trần thuật.",
    "`몇` termina en un `t` cerrado que enlaza directo a `번`: di `myeot-beon` sin pausa. `출구예요` baja al final como una afirmación."
  ),
  17: localized(
    "Lead with `여기서` so the driver catches the location signal. `내려` has two syllables: `nae-ryeo`. Keep the `r` light — a quick tap, not an English `r`. `주세요` closes softly.",
    "まず`여기서`をはっきり言います。`내려`は「ネリョ」と二音節です。`ㄹ`は軽くはじく音で、英語の`r`と違います。`주세요`はやわらかく締めます。",
    "先说 `여기서` 让司机捕捉到位置信号。`내려` 有两个音节：`nae-ryeo`。`ㄹ` 是轻弹音，不是英语的 `r`。`주세요` 轻轻收尾。",
    "Dẫn đầu bằng `여기서` để tài xế nhận tín hiệu vị trí. `내려` có hai âm tiết: `nae-ryeo`. Giữ `r` nhẹ — gõ nhanh, không phải `r` tiếng Anh. `주세요` kết nhẹ.",
    "Empieza con `여기서` para que el conductor capte la señal de lugar. `내려` tiene dos sílabas: `nae-ryeo`. La `r` es suave, un toque rápido, no la `r` española."
  ),
  18: localized(
    "`걸려요` is the key verb. Its `ㄹㄹ` makes a double-`l` sound: `geol-lyeo-yo`. Say it with a slight roll at `려`. Let the sentence rise at the end — it is a question.",
    "`걸려요`が中心の動詞です。`ㄹㄹ`は二重`l`音で`geol-lyeo-yo`と発音します。文末は質問なので少し上げます。",
    "`걸려요` 是关键动词。`ㄹㄹ` 发成双 `l` 音：`geol-lyeo-yo`。`려` 处稍微带一点弹舌感。句尾上扬，因为这是疑问句。",
    "`걸려요` là động từ chính. `ㄹㄹ` tạo âm đôi `l`: `geol-lyeo-yo`. Nói với chút lăn nhẹ ở `려`. Cuối câu nhấc lên — đây là câu hỏi.",
    "`걸려요` es el verbo clave. Su `ㄹㄹ` suena como `l` doble: `geol-lyeo-yo`. Deja que la oración suba al final — es una pregunta."
  ),
  19: localized(
    "The phrase is long: split naturally after `않게` and before `해 주세요`. `않게` should not be swallowed. `맵지` has a tense initial — the `ㅈ` starts firm.",
    "フレーズが長いので、`않게`の後で自然に区切り、`해 주세요`へ続けます。`않게`を飲み込まないよう注意します。`맵지`の`ㅈ`は緊張音なので、しっかりと始めます。",
    "这句话很长：在 `않게` 后自然停顿，再接 `해 주세요`。`않게` 不要吞掉。`맵지` 的 `ㅈ` 是紧音，起音要有力。",
    "Câu này dài: ngắt tự nhiên sau `않게` trước `해 주세요`. Đừng nuốt `않게`. `맵지` có phụ âm đầu căng — `ㅈ` bắt đầu chắc.",
    "La frase es larga: divide naturalmente después de `않게` y antes de `해 주세요`. No te tragues `않게`. `맵지` tiene una consonante tensa: `ㅈ` empieza firme."
  ),
  20: localized(
    "`알레르기` is a loanword — say it in four Korean syllables: `al-le-reu-gi`. Korean `르` is softer than an English `r`; it is a light tongue tap, not a curl.",
    "`알레르기`は外来語です。韓国語の4音節で「알·레·르·기」と発音します。`르`は英語の`r`より軽く、舌を弾くイメージです。",
    "`알레르기` 是外来词，按韩语四个音节说：`al-le-reu-gi`。韩语的 `르` 比英语的 `r` 要轻，是轻弹舌尖，不是卷舌音。",
    "`알레르기` là từ vay mượn — nói bốn âm tiết tiếng Hàn: `al-le-reu-gi`. `르` tiếng Hàn nhẹ hơn `r` tiếng Anh; là gõ lưỡi nhẹ, không cuộn.",
    "`알레르기` es un préstamo — dilo en cuatro sílabas coreanas: `al-le-reu-gi`. El `르` coreano es más suave que la `r` inglesa: es un toque ligero de lengua, no un enroscamiento."
  ),
  21: localized(
    "`따` has a tense initial — say it with a firm stop. `담아` links straight into `주세요`, almost as `damaajuseyo` in fast speech. The phrase feels quick: two beats — `따로` then `담아 주세요`.",
    "`따`は緊張音で始めます。`담아`は速いと`주세요`に直接つながります。「따로」と「담아 주세요」の二拍でリズムを取るとよいです。",
    "`따` 以紧音开头，要有力。`담아` 快说时直接连到 `주세요`，几乎像 `damaajuseyo`。整句节奏感强：两拍——`따로` 然后 `담아 주세요`。",
    "`따` có phụ âm đầu căng — nói chắc. `담아` nối thẳng vào `주세요`, gần như `damaajuseyo` trong nói nhanh. Câu nhanh gọn: hai nhịp — `따로` rồi `담아 주세요`.",
    "`따` tiene una consonante tensa — dila firme. `담아` enlaza directo a `주세요`, casi como `damaajuseyo` al hablar rápido. La frase es ágil: dos tiempos — `따로` luego `담아 주세요`."
  ),
  22: localized(
    "`계산해 주세요` — `계` sounds like `gye`, not `gay`. Say all six syllables evenly: `gye-san-hae-ju-se-yo`. The stress falls on `계산`, and `해 주세요` follows lightly.",
    "`계`は「ゲ」に近い音です。`gye-san-hae-ju-se-yo`と6音節を均等に言います。`계산`に軽く強調を置き、`해 주세요`は流れるように続けます。",
    "`계` 读作 `gye`，不是 `gay`。六个音节均匀说出：`gye-san-hae-ju-se-yo`。重音落在 `계산`，`해 주세요` 轻轻跟上。",
    "`계` nghe như `gye`, không phải `gay`. Nói đều sáu âm tiết: `gye-san-hae-ju-se-yo`. Trọng âm rơi vào `계산`, `해 주세요` theo sau nhẹ nhàng.",
    "`계` suena como `gye`, no como `gay`. Di las seis sílabas de manera uniforme: `gye-san-hae-ju-se-yo`. El énfasis cae en `계산`; `해 주세요` sigue suave."
  ),
  23: localized(
    "`잃어버렸어요` has six syllables: `il-leo-beo-ryeo-sseo-yo`. Practice in two halves: `잃어` then `버렸어요`. The `르` causes the `ㄹ` to double at the `버렸` boundary.",
    "`잃어버렸어요`は6音節：`il-leo-beo-ryeo-sseo-yo`。「잃어」と「버렸어요」の二つに分けて練習すると覚えやすいです。`버렸`の境目でㄹが重なります。",
    "`잃어버렸어요` 有六个音节：`il-leo-beo-ryeo-sseo-yo`。分两段练习：`잃어` 然后 `버렸어요`。`버렸` 的交界处 `ㄹ` 发生双化。",
    "`잃어버렸어요` có sáu âm tiết: `il-leo-beo-ryeo-sseo-yo`. Luyện theo hai nửa: `잃어` rồi `버렸어요`. `ㄹ` nhân đôi tại ranh giới `버렸`.",
    "`잃어버렸어요` tiene seis sílabas: `il-leo-beo-ryeo-sseo-yo`. Practica en dos mitades: `잃어` luego `버렸어요`. La `ㄹ` se duplica en el límite de `버렸`."
  ),
  24: localized(
    "`바꾸고` — the `꾸` is tense: a hard, short `kk`. `싶어요` ends with a soft falling tone. That softness turns the sentence from a demand into a polite wish.",
    "`바꾸고`の`꾸`は緊張音で短く強く出します。`싶어요`はやわらかく下げることで、要求ではなく丁寧な希望として聞こえます。",
    "`바꾸고` 里的 `꾸` 是紧音：短促有力的 `kk`。`싶어요` 末尾轻轻下落，这种柔和感让句子听起来是礼貌的愿望，而非要求。",
    "`바꾸고` — `꾸` là âm căng: `kk` ngắn và chắc. `싶어요` kết thúc với giọng hạ nhẹ, biến câu từ yêu cầu thành mong muốn lịch sự.",
    "`바꾸고` — la `꾸` es tensa: una `kk` corta y firme. `싶어요` cierra con un tono suave descendente, convirtiendo la frase de demanda en deseo cortés."
  ),
  25: localized(
    "`-네요` rises gently at the end — it should sound like a soft discovery, not a flat statement. `춥네요`: the `춥` lands firm, then `-네요` lifts slightly.",
    "`-네요`は語尾をやわらかく上げます。「発見した」という感じで、平坦に読まないのがポイントです。`춥네요`では`춥`をしっかり出し、`-네요`を軽く上げます。",
    "`-네요` 结尾轻轻上扬——要像温和地发现了什么，不要读成平调。`춥네요`：`춥` 落得有力，再把 `-네요` 微微上扬。",
    "`-네요` nhấc lên nhẹ ở cuối — nên nghe như một khám phá nhẹ, không phải câu trần thuật phẳng. `춥네요`: `춥` chắc, rồi `-네요` nhấc nhẹ.",
    "`-네요` sube suavemente al final — debe sonar como un descubrimiento suave, no como una afirmación plana. `춥네요`: `춥` aterriza firme, luego `-네요` sube un poco."
  ),
  26: localized(
    "The invitation lives in `-까요?` — it rises clearly at the end. Say the time or action before it firmly so the listener knows what is being proposed before the question comes.",
    "提案の核心は`-까요?`の上がり語尾にあります。時間や動詞を先にはっきり言うことで、質問が来る前に何を提案しているかが伝わります。",
    "邀请的语气在 `-까요?` 的上扬尾音中。先把时间或动作说清楚，让听者在问句到来前就知道你在提议什么。",
    "Lời mời nằm ở `-까요?` — nhấc rõ cuối câu. Nói thời gian hoặc hành động trước chắc chắn để người nghe biết bạn đề xuất gì trước khi câu hỏi đến.",
    "La invitación vive en `-까요?` — sube claramente al final. Di el tiempo o la acción antes con firmeza para que el oyente sepa qué se propone antes de que llegue la pregunta."
  ),
  27: localized(
    "`좋아해요` — `좋` starts tense. The `ㅎ` in `좋아` links across: `jo-a-hae-yo`. Do not pause between `좋아` and `해요`. The four syllables should flow as one word.",
    "`좋아해요`の`좋`は緊張音です。`좋아`の`ㅎ`は`해요`に流れ込み、`jo-a-hae-yo`と4音節でつながります。途中で区切らないことが大事です。",
    "`좋아해요`：`좋` 以紧音起头。`좋아` 里的 `ㅎ` 连到 `해요`：`jo-a-hae-yo`，四个音节流畅相连。`좋아` 和 `해요` 之间不要停顿。",
    "`좋아해요` — `좋` bắt đầu căng. `ㅎ` trong `좋아` nối sang `해요`: `jo-a-hae-yo`. Đừng ngắt giữa `좋아` và `해요`. Bốn âm tiết chảy như một từ.",
    "`좋아해요` — `좋` empieza tensa. La `ㅎ` de `좋아` enlaza con `해요`: `jo-a-hae-yo`. No hagas pausa entre `좋아` y `해요`. Las cuatro sílabas fluyen como una sola palabra."
  ),
  28: localized(
    "`아파요` — the `파` is aspirated: put a small puff of air on it. Compare `아바요` (wrong, no breath) with `아파요` (right, with the breath). The difference is that one breath.",
    "`아파요`の`파`は激音で、息を出して発音します。`아바요`（息なし）と`아파요`（息あり）を比べると違いがわかります。その一息が大切です。",
    "`아파요` 里的 `파` 是送气音：发音时要有一小股气。比较 `아바요`（错，无气）和 `아파요`（对，有气）——区别就在那一口气。",
    "`아파요` — `파` là âm bật hơi: thêm chút hơi thở vào. So sánh `아바요` (sai, không thở) với `아파요` (đúng, có hơi). Sự khác biệt chỉ là một hơi thở.",
    "`아파요` — la `파` es aspirada: suéltale un pequeño soplo de aire. Compara `아바요` (incorrecto, sin aire) con `아파요` (correcto, con aire). La diferencia es ese soplo."
  ),
  29: localized(
    "`필요해요` — `필` is `pil`, not `fil`. Korean has no `f` sound; it is a lightly aspirated `p`. Say `pil-lyo-hae-yo` with a slight pause between `필` and `요` to keep it clear.",
    "`필`は`pil`で、`fil`ではありません。韓国語に`f`音はなく、軽い激音の`p`です。`pil-lyo-hae-yo`と発音し、`필`と`요`の間に軽い区切りを入れます。",
    "`필` 是 `pil`，不是 `fil`。韩语没有 `f` 音，是轻送气的 `p`。说 `pil-lyo-hae-yo`，在 `필` 和 `요` 之间稍微区分一下，让整体更清晰。",
    "`필` là `pil`, không phải `fil`. Tiếng Hàn không có âm `f`; đây là `p` bật hơi nhẹ. Nói `pil-lyo-hae-yo` với ngắt nhẹ giữa `필` và `요` cho rõ.",
    "`필` es `pil`, no `fil`. El coreano no tiene sonido `f`; es una `p` levemente aspirada. Di `pil-lyo-hae-yo` con una leve separación entre `필` y `요` para mayor claridad."
  ),
  30: localized(
    "Give `다음에는` a little weight — it sets the whole sentence forward in time. Then let `고 싶어요` land gently with a slightly rising, hopeful tone. The ending should feel open, not closed.",
    "`다음에는`にしっかり重みを置きます。未来に向けて文全体のトーンを決めるからです。`고 싶어요`はやわらかく、少し上向きの希望のトーンで締めます。",
    "`다음에는` 要稍微加重——它把整句话推向未来。然后 `고 싶어요` 轻轻落下，语调微微上扬，带着希望感。结尾要开放，不要封闭。",
    "Cho `다음에는` thêm chút trọng lượng — nó đẩy cả câu về phía tương lai. Rồi `고 싶어요` hạ nhẹ với giọng hơi nhấc lên, đầy hy vọng. Kết thúc nên mở, không đóng.",
    "Dale un poco de peso a `다음에는` — sitúa toda la frase en el futuro. Luego `고 싶어요` aterriza suave con un tono levemente ascendente y esperanzador. El final debe sentirse abierto, no cerrado."
  )
};

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
    reason:
      "복습을 시작할 때 가장 부담이 적은 핵심 문장이라, 뜻을 떠올리기 전에 먼저 소리와 리듬을 귀에 익히기 좋습니다."
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
    reason:
      "뜻을 보고 바로 한국어로 꺼내 보는 연습에 잘 맞는 대표 문장이라, 내 말버릇과 기준 음성의 차이를 비교하기 좋습니다."
  },
  {
    id: "roleplay",
    kind: "roleplay",
    promptByCountry: roleplayPrompt.meaningByCountry,
    phrase: core,
    reason:
      "상대 말 다음에 바로 연결해야 하는 문장이라, 실제 대화처럼 짧게 반응하는 순발력 복습에 가장 잘 맞습니다."
  }
];

const lessonSeeds = [
  {
    day: 1,
    title: en("Greeting someone for the first time"),
    situation: en("Politely greeting someone you just met at a cafe or guesthouse."),
    quizDistractors: ["When ordering food at a restaurant", "When asking for the bill"] as [string, string],
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
      { speaker: "상대", speakerRole: "partner", text: "안녕하세요." },
      { speaker: "학습자", speakerRole: "learner", text: "안녕하세요. 만나서 반가워요." },
      { speaker: "상대", speakerRole: "partner", text: "네, 저도 반가워요." },
      { speaker: "학습자", speakerRole: "learner", text: "이름이 뭐예요?" }
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
    title: en("Ordering at a cafe"),
    situation: en("Ordering a basic drink politely at a cafe."),
    quizDistractors: ["When greeting someone new", "When asking for directions"] as [string, string],
    phraseId: "coffee-please",
    core: phrase("아이스 아메리카노 하나 주세요.", "Aiseu amerikano hana juseyo.", "One iced Americano, please.", "アイスアメリカーノを一つください。", "请给我一杯冰美式。", "Cho tôi một Americano đá.", "Un americano helado, por favor."),
    response: phrase("드시고 가세요?", "Deusigo gaseyo?", "For here?", "店内で召し上がりますか。", "在店里喝吗？", "Bạn dùng tại đây không?", "¿Para tomar aquí?"),
    rescue: phrase("포장해 주세요.", "Pojanghae juseyo.", "Please make it to go.", "持ち帰りにしてください。", "请打包。", "Làm ơn gói mang đi.", "Para llevar, por favor."),
    dialogue: [
      { speaker: "직원", speakerRole: "staff", text: "안녕하세요. 주문하시겠어요?" },
      { speaker: "학습자", speakerRole: "learner", text: "아이스 아메리카노 하나 주세요." },
      { speaker: "직원", speakerRole: "staff", text: "드시고 가세요?" },
      { speaker: "학습자", speakerRole: "learner", text: "포장해 주세요." }
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
    title: en("Saying thank you"),
    situation: en("Expressing gratitude naturally when someone has helped you."),
    quizDistractors: ["When making a reservation", "When asking the price"] as [string, string],
    phraseId: "thank-you",
    core: phrase("감사합니다. 정말 도움이 됐어요.", "Gamsahamnida. Jeongmal doumi dwaesseoyo.", "Thank you. That really helped.", "ありがとうございます。本当に助かりました。", "谢谢。真的帮了我很多。", "Cảm ơn. Điều đó giúp tôi rất nhiều.", "Gracias. Me ayudó mucho."),
    response: phrase("아니에요. 괜찮아요.", "Anieyo. Gwaenchanayo.", "No problem. It is okay.", "いいえ、大丈夫です。", "没事。没关系。", "Không có gì. Không sao.", "No pasa nada. Está bien."),
    rescue: phrase("죄송해요.", "Joesonghaeyo.", "I am sorry.", "すみません。", "对不起。", "Xin lỗi.", "Lo siento."),
    dialogue: [
      { speaker: "상대", speakerRole: "partner", text: "여기로 가시면 돼요." },
      { speaker: "학습자", speakerRole: "learner", text: "감사합니다. 정말 도움이 됐어요." },
      { speaker: "상대", speakerRole: "partner", text: "아니에요. 괜찮아요." }
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
    title: en("Asking for directions"),
    situation: en("Asking which way to go near a subway station."),
    quizDistractors: ["When saying thank you", "When requesting takeout"] as [string, string],
    phraseId: "where-is-station",
    core: phrase("지하철역이 어디예요?", "Jihacheolyeogi eodiyeyo?", "Where is the subway station?", "地下鉄の駅はどこですか。", "地铁站在哪里？", "Ga tàu điện ngầm ở đâu?", "¿Dónde está la estación del metro?"),
    response: phrase("저쪽이에요.", "Jeojjogiyeyo.", "It is over there.", "あちらです。", "在那边。", "Ở phía kia.", "Está por allí."),
    rescue: phrase("여기서 멀어요?", "Yeogiseo meoreoyo?", "Is it far from here?", "ここから遠いですか。", "离这里远吗？", "Có xa đây không?", "¿Está lejos de aquí?"),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "지하철역이 어디예요?" },
      { speaker: "상대", speakerRole: "partner", text: "저쪽이에요." },
      { speaker: "학습자", speakerRole: "learner", text: "여기서 멀어요?" },
      { speaker: "상대", speakerRole: "partner", text: "아니요, 가까워요." }
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
    title: en("Asking the price"),
    situation: en("Checking the price of something you see at a shop."),
    quizDistractors: ["When greeting someone for the first time", "When asking how long it takes"] as [string, string],
    phraseId: "how-much",
    core: phrase("이거 얼마예요?", "Igeo eolmayeyo?", "How much is this?", "これはいくらですか。", "这个多少钱？", "Cái này bao nhiêu tiền?", "¿Cuánto cuesta esto?"),
    response: phrase("만 원이에요.", "Man woniyeyo.", "It is ten thousand won.", "一万ウォンです。", "一万韩元。", "Mười nghìn won.", "Son diez mil wones."),
    rescue: phrase("카드 돼요?", "Kadeu dwaeyo?", "Can I pay by card?", "カードは使えますか。", "可以刷卡吗？", "Có dùng thẻ được không?", "¿Aceptan tarjeta?"),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "이거 얼마예요?" },
      { speaker: "직원", speakerRole: "staff", text: "만 원이에요." },
      { speaker: "학습자", speakerRole: "learner", text: "카드 돼요?" },
      { speaker: "직원", speakerRole: "staff", text: "네, 돼요." }
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
    title: en("Asking someone to speak slowly"),
    situation: en("The other person is speaking quickly and you politely ask them to slow down."),
    quizDistractors: ["When checking in at a hotel", "When setting a meeting time"] as [string, string],
    phraseId: "speak-slowly",
    core: phrase("조금 천천히 말해 주세요.", "Jogeum cheoncheonhi malhae juseyo.", "Please speak a little slowly.", "少しゆっくり話してください。", "请说慢一点。", "Làm ơn nói chậm hơn một chút.", "Por favor, hable un poco más despacio."),
    response: phrase("네, 천천히 말할게요.", "Ne, cheoncheonhi malhalgeyo.", "Sure, I will speak slowly.", "はい、ゆっくり話します。", "好的，我慢慢说。", "Vâng, tôi sẽ nói chậm.", "Sí, hablaré despacio."),
    rescue: phrase("한국어를 조금 배웠어요.", "Hangugeoreul jogeum baewosseoyo.", "I learned a little Korean.", "韓国語を少し勉強しました。", "我学了一点韩语。", "Tôi đã học một chút tiếng Hàn.", "Aprendí un poco de coreano."),
    dialogue: [
      { speaker: "상대", speakerRole: "partner", text: "여기에서 오른쪽으로 가세요." },
      { speaker: "학습자", speakerRole: "learner", text: "죄송해요. 조금 천천히 말해 주세요." },
      { speaker: "상대", speakerRole: "partner", text: "네, 천천히 말할게요." }
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
    title: en("Asking someone to repeat themselves"),
    situation: en("You missed a sentence and ask for it again without pressure."),
    quizDistractors: ["When ordering at a cafe", "When saying where to stop"] as [string, string],
    phraseId: "say-again",
    core: phrase("다시 한 번 말해 주세요.", "Dasi han beon malhae juseyo.", "Please say that one more time.", "もう一度言ってください。", "请再说一遍。", "Làm ơn nói lại một lần nữa.", "Por favor, dígalo una vez más."),
    response: phrase("네, 다시 말할게요.", "Ne, dasi malhalgeyo.", "Sure, I will say it again.", "はい、もう一度言います。", "好的，我再说一遍。", "Vâng, tôi sẽ nói lại.", "Sí, lo diré otra vez."),
    rescue: phrase("잘 못 들었어요.", "Jal mot deureosseoyo.", "I could not hear well.", "よく聞き取れませんでした。", "我没听清。", "Tôi nghe không rõ.", "No escuché bien."),
    dialogue: [
      { speaker: "상대", speakerRole: "partner", text: "예약 번호를 말씀해 주세요." },
      { speaker: "학습자", speakerRole: "learner", text: "잘 못 들었어요." },
      { speaker: "학습자", speakerRole: "learner", text: "다시 한 번 말해 주세요." },
      { speaker: "상대", speakerRole: "partner", text: "네, 다시 말할게요." }
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
    title: en("Getting a recommendation at a restaurant"),
    situation: en("You cannot decide what to order and ask for a suggestion."),
    quizDistractors: ["When asking someone to speak slowly", "When changing a reservation"] as [string, string],
    phraseId: "recommend-menu",
    core: phrase("추천 메뉴가 뭐예요?", "Chucheon menyuga mwoyeyo?", "What menu item do you recommend?", "おすすめメニューは何ですか。", "推荐菜单是什么？", "Món nào được gợi ý?", "¿Qué plato recomienda?"),
    response: phrase("이 메뉴가 인기 있어요.", "I menyuga ingi isseoyo.", "This menu item is popular.", "このメニューが人気です。", "这个菜很受欢迎。", "Món này được ưa chuộng.", "Este plato es popular."),
    rescue: phrase("맵지 않은 거 있어요?", "Maepji aneun geo isseoyo?", "Do you have something not spicy?", "辛くないものはありますか。", "有不辣的吗？", "Có món nào không cay không?", "¿Tiene algo que no sea picante?"),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "추천 메뉴가 뭐예요?" },
      { speaker: "직원", speakerRole: "staff", text: "이 메뉴가 인기 있어요." },
      { speaker: "학습자", speakerRole: "learner", text: "맵지 않은 거 있어요?" }
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
    title: en("Confirming a reservation"),
    situation: en("Confirming your reservation at a guesthouse or restaurant."),
    quizDistractors: ["When asking for directions on the street", "When talking about the weather"] as [string, string],
    phraseId: "reservation-check",
    core: phrase("예약 확인하고 싶어요.", "Yeyak hwaginhago sipeoyo.", "I would like to check my reservation.", "予約を確認したいです。", "我想确认预约。", "Tôi muốn kiểm tra đặt chỗ.", "Quiero confirmar mi reservación."),
    response: phrase("성함이 어떻게 되세요?", "Seonghami eotteoke doeseyo?", "May I have your name?", "お名前は何ですか。", "请问您的姓名？", "Tên của bạn là gì ạ?", "¿Cuál es su nombre?"),
    rescue: phrase("제 이름은 ...예요.", "Je ireumeun ...yeyo.", "My name is ...", "私の名前は...です。", "我的名字是……", "Tên tôi là ...", "Mi nombre es ..."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "예약 확인하고 싶어요." },
      { speaker: "직원", speakerRole: "staff", text: "성함이 어떻게 되세요?" },
      { speaker: "학습자", speakerRole: "learner", text: "제 이름은 ...예요." }
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
    title: en("Saying you are okay"),
    situation: en("Someone is worried and you give a short, reassuring answer."),
    quizDistractors: ["When ordering food", "When saying you lost something"] as [string, string],
    phraseId: "its-okay",
    core: phrase("괜찮아요. 문제없어요.", "Gwaenchanayo. Munje eopseoyo.", "It is okay. No problem.", "大丈夫です。問題ありません。", "没关系。没有问题。", "Không sao. Không vấn đề gì.", "Está bien. No hay problema."),
    response: phrase("다행이에요.", "Dahaengiyeyo.", "That is a relief.", "よかったです。", "那就好。", "May quá.", "Qué alivio."),
    rescue: phrase("천천히 해도 돼요.", "Cheoncheonhi haedo dwaeyo.", "It is okay to do it slowly.", "ゆっくりでも大丈夫です。", "慢慢来也可以。", "Làm chậm cũng được.", "Puede hacerlo despacio."),
    dialogue: [
      { speaker: "상대", speakerRole: "partner", text: "죄송해요. 조금 늦었어요." },
      { speaker: "학습자", speakerRole: "learner", text: "괜찮아요. 문제없어요." },
      { speaker: "상대", speakerRole: "partner", text: "다행이에요." }
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
    title: en("Asking someone to take a photo"),
    situation: en("Asking a stranger to take a photo during your trip."),
    quizDistractors: ["When confirming a reservation", "When asking for the bill"] as [string, string],
    phraseId: "take-photo",
    core: phrase("사진 좀 찍어 주실 수 있어요?", "Sajin jom jjigeo jusil su isseoyo?", "Could you take a photo for me?", "写真を撮っていただけますか。", "可以帮我拍张照片吗？", "Bạn có thể chụp ảnh giúp tôi không?", "¿Me podría tomar una foto?"),
    response: phrase("네, 찍어 드릴게요.", "Ne, jjigeo deurilgeyo.", "Sure, I will take it for you.", "はい、撮りますね。", "可以，我帮您拍。", "Vâng, tôi sẽ chụp giúp.", "Sí, se la tomo."),
    rescue: phrase("여기 눌러 주세요.", "Yeogi nulleo juseyo.", "Please press here.", "ここを押してください。", "请按这里。", "Vui lòng bấm ở đây.", "Presione aquí, por favor."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "사진 좀 찍어 주실 수 있어요?" },
      { speaker: "상대", speakerRole: "partner", text: "네, 찍어 드릴게요." },
      { speaker: "학습자", speakerRole: "learner", text: "여기 눌러 주세요." }
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
    title: en("Asking where the restroom is"),
    situation: en("Politely asking where the restroom is in a public place."),
    quizDistractors: ["When getting directions outside", "When ordering takeout"] as [string, string],
    phraseId: "where-restroom",
    core: phrase("화장실이 어디에 있어요?", "Hwajangsiri eodie isseoyo?", "Where is the restroom?", "トイレはどこにありますか。", "洗手间在哪里？", "Nhà vệ sinh ở đâu?", "¿Dónde está el baño?"),
    response: phrase("오른쪽에 있어요.", "Oreunjjoge isseoyo.", "It is on the right.", "右側にあります。", "在右边。", "Ở bên phải.", "Está a la derecha."),
    rescue: phrase("감사합니다.", "Gamsahamnida.", "Thank you.", "ありがとうございます。", "谢谢。", "Cảm ơn.", "Gracias."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "화장실이 어디에 있어요?" },
      { speaker: "상대", speakerRole: "partner", text: "오른쪽에 있어요." },
      { speaker: "학습자", speakerRole: "learner", text: "감사합니다." }
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
    title: en("Requesting takeout"),
    situation: en("You want to take your food to go instead of eating in."),
    quizDistractors: ["When sitting down to eat at a restaurant", "When greeting someone"] as [string, string],
    phraseId: "takeout-please",
    core: phrase("포장해 주세요.", "Pojanghae juseyo.", "Please make it to go.", "持ち帰りにしてください。", "请打包。", "Làm ơn gói mang đi.", "Para llevar, por favor."),
    response: phrase("봉투 필요하세요?", "Bongtu piryo haseyo?", "Do you need a bag?", "袋は必要ですか。", "需要袋子吗？", "Bạn có cần túi không?", "¿Necesita bolsa?"),
    rescue: phrase("네, 부탁드려요.", "Ne, butakdeuryeoyo.", "Yes, please.", "はい、お願いします。", "需要，麻烦您。", "Vâng, làm ơn.", "Sí, por favor."),
    dialogue: [
      { speaker: "직원", speakerRole: "staff", text: "드시고 가세요?" },
      { speaker: "학습자", speakerRole: "learner", text: "포장해 주세요." },
      { speaker: "직원", speakerRole: "staff", text: "봉투 필요하세요?" },
      { speaker: "학습자", speakerRole: "learner", text: "네, 부탁드려요." }
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
    title: en("Saying see you again"),
    situation: en("After a short conversation, you naturally say you will meet again."),
    quizDistractors: ["When saying goodbye permanently", "When confirming a reservation"] as [string, string],
    phraseId: "see-you-again",
    core: phrase("다음에 또 만나요.", "Daeume tto mannayo.", "See you again next time.", "また今度会いましょう。", "下次再见。", "Hẹn gặp lại lần sau.", "Nos vemos la próxima vez."),
    response: phrase("네, 연락할게요.", "Ne, yeollakhalgeyo.", "Yes, I will contact you.", "はい、連絡します。", "好的，我会联系你。", "Vâng, tôi sẽ liên lạc.", "Sí, le escribiré."),
    rescue: phrase("오늘 즐거웠어요.", "Oneul jeulgeowosseoyo.", "I had fun today.", "今日は楽しかったです。", "今天很开心。", "Hôm nay tôi rất vui.", "Hoy me divertí."),
    dialogue: [
      { speaker: "친구", speakerRole: "friend", text: "오늘 어땠어요?" },
      { speaker: "학습자", speakerRole: "learner", text: "오늘 즐거웠어요." },
      { speaker: "친구", speakerRole: "friend", text: "저도요." },
      { speaker: "학습자", speakerRole: "learner", text: "다음에 또 만나요." }
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
    title: en("Telling the destination"),
    situation: en("In a taxi or navigation situation, you clearly state where you want to go."),
    quizDistractors: ["When asking someone to take a photo", "When checking the weather"] as [string, string],
    phraseId: "go-here-please",
    core: phrase("여기로 가 주세요.", "Yeogiro ga juseyo.", "Please take me here.", "ここまでお願いします。", "请带我到这里。", "Làm ơn đưa tôi tới đây.", "Lléveme aquí, por favor."),
    response: phrase("네, 알겠습니다.", "Ne, algesseumnida.", "Okay, I understand.", "はい、わかりました。", "好的，明白了。", "Vâng, tôi hiểu rồi.", "Sí, entendido."),
    rescue: phrase("주소를 보여 드릴게요.", "Jusoreul boyeo deurilgeyo.", "I will show you the address.", "住所をお見せします。", "我给您看地址。", "Tôi sẽ cho bạn xem địa chỉ.", "Le muestro la dirección."),
    dialogue: [
      { speaker: "기사", speakerRole: "driver", text: "어디로 가세요?" },
      { speaker: "학습자", speakerRole: "learner", text: "여기로 가 주세요." },
      { speaker: "기사", speakerRole: "driver", text: "네, 알겠습니다." },
      { speaker: "학습자", speakerRole: "learner", text: "주소를 보여 드릴게요." }
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
    title: en("Asking for the exit number"),
    situation: en("At a subway station, you ask which exit to use."),
    quizDistractors: ["When asking the price at a shop", "When saying you are okay"] as [string, string],
    phraseId: "which-exit",
    core: phrase("몇 번 출구예요?", "Myeot beon chulguyeyo?", "Which exit number is it?", "何番出口ですか。", "是几号出口？", "Là cửa ra số mấy?", "¿Qué número de salida es?"),
    response: phrase("삼 번 출구예요.", "Sam beon chulguyeyo.", "It is exit three.", "三番出口です。", "三号出口。", "Cửa ra số ba.", "Es la salida tres."),
    rescue: phrase("지도에서 보여 주세요.", "Jidoeseo boyeo juseyo.", "Please show me on the map.", "地図で見せてください。", "请在地图上给我看。", "Hãy chỉ trên bản đồ giúp tôi.", "Muéstremelo en el mapa."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "몇 번 출구예요?" },
      { speaker: "상대", speakerRole: "partner", text: "삼 번 출구예요." },
      { speaker: "학습자", speakerRole: "learner", text: "지도에서 보여 주세요." }
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
    title: en("Saying where to stop"),
    situation: en("In a taxi or bus, you say you want to get off here."),
    quizDistractors: ["When ordering at a cafe", "When asking for a menu recommendation"] as [string, string],
    phraseId: "get-off-here",
    core: phrase("여기서 내려 주세요.", "Yeogiseo naeryeo juseyo.", "Please let me off here.", "ここで降ろしてください。", "请在这里下车。", "Cho tôi xuống ở đây.", "Déjeme bajar aquí, por favor."),
    response: phrase("네, 여기서 세울게요.", "Ne, yeogiseo seoulgeyo.", "Okay, I'll stop here.", "はい、ここで止めます。", "好的，我在这里停。", "Vâng, tôi sẽ dừng ở đây.", "Sí, paro aquí."),
    rescue: phrase("조금 더 가 주세요.", "Jogeum deo ga juseyo.", "Please go a little farther.", "もう少し進んでください。", "请再往前一点。", "Đi thêm một chút giúp tôi.", "Avance un poco más, por favor."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "여기서 내려 주세요." },
      { speaker: "기사", speakerRole: "driver", text: "네, 여기서 세울게요." },
      { speaker: "학습자", speakerRole: "learner", text: "조금 더 가 주세요." }
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
    title: en("Asking how long it will take"),
    situation: en("During travel, you check how long it will take to reach the destination."),
    quizDistractors: ["When asking someone to slow down", "When setting a meeting time"] as [string, string],
    phraseId: "how-long",
    core: phrase("얼마나 걸려요?", "Eolmana geollyeoyo?", "How long does it take?", "どのくらいかかりますか。", "要多久？", "Mất bao lâu?", "¿Cuánto tarda?"),
    response: phrase("십 분 정도 걸려요.", "Sip bun jeongdo geollyeoyo.", "It takes about ten minutes.", "10分くらいかかります。", "大概要十分钟。", "Mất khoảng mười phút.", "Tarda unos diez minutos."),
    rescue: phrase("급하지 않아요.", "Geuphaji anayo.", "I am not in a hurry.", "急いでいません。", "我不着急。", "Tôi không vội.", "No tengo prisa."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "얼마나 걸려요?" },
      { speaker: "상대", speakerRole: "partner", text: "십 분 정도 걸려요." },
      { speaker: "학습자", speakerRole: "learner", text: "급하지 않아요." }
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
    title: en("Asking for no spice"),
    situation: en("At a restaurant, you ask to reduce the spiciness of your food."),
    quizDistractors: ["When greeting someone for the first time", "When saying what you like"] as [string, string],
    phraseId: "not-spicy",
    core: phrase("맵지 않게 해 주세요.", "Maepji anke hae juseyo.", "Please make it not spicy.", "辛くないようにしてください。", "请做得不辣。", "Làm ơn làm không cay.", "Por favor, que no sea picante."),
    response: phrase("네, 안 맵게 해 드릴게요.", "Ne, an maepge hae deurilgeyo.", "Okay, I will make it not spicy.", "はい、辛くないようにします。", "好的，我给您做不辣。", "Vâng, tôi sẽ làm không cay.", "Sí, lo preparo sin picante."),
    rescue: phrase("조금만 맵게 해 주세요.", "Jogeumman maepge hae juseyo.", "Please make it only a little spicy.", "少しだけ辛くしてください。", "请做得微辣。", "Làm cay một chút thôi.", "Solo un poco picante, por favor."),
    dialogue: [
      { speaker: "직원", speakerRole: "staff", text: "맵게 해 드릴까요?" },
      { speaker: "학습자", speakerRole: "learner", text: "맵지 않게 해 주세요." },
      { speaker: "직원", speakerRole: "staff", text: "네, 안 맵게 해 드릴게요." }
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
    title: en("Mentioning an allergy"),
    situation: en("You let someone know in advance about an ingredient you cannot eat."),
    quizDistractors: ["When asking someone to repeat", "When asking which exit to use"] as [string, string],
    phraseId: "allergy",
    core: phrase("저는 땅콩 알레르기가 있어요.", "Jeoneun ttangkong allereugiga isseoyo.", "I have a peanut allergy.", "私はピーナッツアレルギーがあります。", "我对花生过敏。", "Tôi bị dị ứng đậu phộng.", "Tengo alergia al cacahuate."),
    response: phrase("알겠습니다. 빼 드릴게요.", "Algesseumnida. Ppae deurilgeyo.", "Understood. I will leave it out.", "わかりました。抜きますね。", "明白了。我会去掉。", "Tôi hiểu. Tôi sẽ bỏ ra.", "Entendido. Lo quitamos."),
    rescue: phrase("이거 들어가요?", "Igeo deureogayo?", "Does this contain it?", "これは入っていますか。", "这里面有吗？", "Món này có không?", "¿Esto lo contiene?"),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "저는 땅콩 알레르기가 있어요." },
      { speaker: "직원", speakerRole: "staff", text: "알겠습니다. 빼 드릴게요." },
      { speaker: "학습자", speakerRole: "learner", text: "이거 들어가요?" }
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
    title: en("Requesting separate packaging"),
    situation: en("You ask for food to be divided or packaged separately."),
    quizDistractors: ["When asking for directions", "When confirming an order"] as [string, string],
    phraseId: "pack-separately",
    core: phrase("따로 포장해 주세요.", "Ttaro pojanghae juseyo.", "Please pack it separately.", "別々に包んでください。", "请分开打包。", "Làm ơn gói riêng.", "Empáquelo por separado, por favor."),
    response: phrase("네, 따로 해 드릴게요.", "Ne, ttaro hae deurilgeyo.", "Okay, I will do it separately.", "はい、別々にします。", "好的，我给您分开。", "Vâng, tôi sẽ làm riêng.", "Sí, lo separo."),
    rescue: phrase("봉투 하나 더 주세요.", "Bongtu hana deo juseyo.", "Please give me one more bag.", "袋をもう一つください。", "请再给我一个袋子。", "Cho tôi thêm một túi.", "Deme una bolsa más, por favor."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "따로 포장해 주세요." },
      { speaker: "직원", speakerRole: "staff", text: "네, 따로 해 드릴게요." },
      { speaker: "학습자", speakerRole: "learner", text: "봉투 하나 더 주세요." }
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
    title: en("Asking for the bill"),
    situation: en("At a restaurant or cafe, you ask for the check."),
    quizDistractors: ["When checking your reservation", "When asking someone to speak slowly"] as [string, string],
    phraseId: "check-please",
    core: phrase("계산해 주세요.", "Gyesanhae juseyo.", "Check, please.", "お会計をお願いします。", "请结账。", "Tính tiền giúp tôi.", "La cuenta, por favor."),
    response: phrase("카드로 하세요?", "Kadeuro haseyo?", "Will you pay by card?", "カードで払いますか。", "您刷卡吗？", "Bạn trả bằng thẻ không?", "¿Paga con tarjeta?"),
    rescue: phrase("영수증 주세요.", "Yeongsujeung juseyo.", "Please give me a receipt.", "レシートをください。", "请给我收据。", "Cho tôi hóa đơn.", "Deme el recibo, por favor."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "계산해 주세요." },
      { speaker: "직원", speakerRole: "staff", text: "카드로 하세요?" },
      { speaker: "학습자", speakerRole: "learner", text: "영수증 주세요." }
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
    title: en("Saying you lost something"),
    situation: en("In a lost-item situation, you tell someone what you have lost."),
    quizDistractors: ["When having a meal at a restaurant", "When asking for the exit number"] as [string, string],
    phraseId: "lost-item",
    core: phrase("지갑을 잃어버렸어요.", "Jigabeul ireobeoryeosseoyo.", "I lost my wallet.", "財布をなくしました。", "我丢了钱包。", "Tôi làm mất ví.", "Perdí mi cartera."),
    response: phrase("어디에서 잃어버리셨어요?", "Eodieseo ireobeorisyeosseoyo?", "Where did you lose it?", "どこでなくしましたか。", "你在哪里丢的？", "Bạn mất ở đâu?", "¿Dónde la perdió?"),
    rescue: phrase("도와주실 수 있어요?", "Dowajusil su isseoyo?", "Could you help me?", "手伝っていただけますか。", "可以帮我吗？", "Bạn có thể giúp tôi không?", "¿Podría ayudarme?"),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "지갑을 잃어버렸어요." },
      { speaker: "상대", speakerRole: "partner", text: "어디에서 잃어버리셨어요?" },
      { speaker: "학습자", speakerRole: "learner", text: "도와주실 수 있어요?" }
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
    title: en("Changing a reservation"),
    situation: en("You want to change the time or date of a reservation."),
    quizDistractors: ["When asking for no spice", "When saying what you like"] as [string, string],
    phraseId: "change-reservation",
    core: phrase("예약을 바꾸고 싶어요.", "Yeyageul bakkugo sipeoyo.", "I would like to change my reservation.", "予約を変更したいです。", "我想改预约。", "Tôi muốn đổi đặt chỗ.", "Quisiera cambiar mi reservación."),
    response: phrase("언제로 바꾸시겠어요?", "Eonjero bakkusigesseoyo?", "When would you like to change it to?", "いつに変更しますか。", "想改到什么时候？", "Bạn muốn đổi sang khi nào?", "¿Para cuándo quiere cambiarla?"),
    rescue: phrase("내일로 가능해요?", "Naeillo ganeunghaeyo?", "Is tomorrow possible?", "明日にできますか。", "明天可以吗？", "Ngày mai được không?", "¿Es posible mañana?"),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "예약을 바꾸고 싶어요." },
      { speaker: "직원", speakerRole: "staff", text: "언제로 바꾸시겠어요?" },
      { speaker: "학습자", speakerRole: "learner", text: "내일로 가능해요?" }
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
    title: en("Talking about the weather"),
    situation: en("You start a light conversation by mentioning the weather."),
    quizDistractors: ["When asking about document requirements", "When making a reservation"] as [string, string],
    phraseId: "nice-weather",
    core: phrase("오늘 날씨 좋네요.", "Oneul nalssi jonneyo.", "The weather's nice today.", "今日は天気がいいですね。", "今天天气真不错。", "Hôm nay thời tiết đẹp nhỉ.", "Hoy hace muy buen tiempo."),
    response: phrase("그러게요. 정말 좋네요.", "Geureogeyo. Jeongmal jonneyo.", "Right? It's really nice.", "そうですね。本当にいいですね。", "是啊，真的很好。", "Đúng vậy. Thật sự đẹp nhỉ.", "Sí, ¿verdad? Está muy agradable."),
    rescue: phrase("조금 추워요.", "Jogeum chuwoyo.", "It is a little cold.", "少し寒いです。", "有点冷。", "Hơi lạnh.", "Hace un poco de frío."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "오늘 날씨 좋네요." },
      { speaker: "상대", speakerRole: "partner", text: "그러게요. 정말 좋네요." },
      { speaker: "학습자", speakerRole: "learner", text: "조금 추워요." }
    ],
    structurePattern: "N 좋네요",
    structureExplanation: localized("Use `-네요` for a soft reaction to what you notice.", "`-네요`は気づいたことをやわらかく言う表現です。", "`-네요` 用来柔和地表达发现或感受。", "Dùng `-네요` để nhận xét nhẹ nhàng.", "Usa `-네요` para una observación suave."),
    swapSlots: [
      phrase("분위기 좋네요.", "Bunwigi jonneyo.", "The atmosphere is nice.", "雰囲気がいいですね。", "气氛很好。", "Không khí ở đây thật dễ chịu nhỉ.", "Qué buen ambiente hay aquí."),
      phrase("여기 좋네요.", "Yeogi jonneyo.", "This place is nice.", "ここはいいですね。", "这里真不错。", "Chỗ này đẹp nhỉ.", "Qué bien está este lugar.")
    ],
    sceneWords: ["날씨", "좋네요", "추워요"],
    roleplayPrompt: phrase("오늘 날씨 어때요?", "Oneul nalssi eottaeyo?", "How is the weather today?", "今日の天気はどうですか。", "今天天气怎么样？", "Thời tiết hôm nay thế nào?", "¿Cómo está el clima hoy?")
  },
  {
    day: 26,
    title: en("Setting a meeting time"),
    situation: en("You set a time to meet with a friend or colleague."),
    quizDistractors: ["When mentioning an allergy", "When asking for directions"] as [string, string],
    phraseId: "what-time-meet",
    core: phrase("몇 시에 만날까요?", "Myeot sie mannalkkayo?", "What time shall we meet?", "何時に会いましょうか。", "几点见面？", "Mấy giờ gặp nhau?", "¿A qué hora nos vemos?"),
    response: phrase("세 시에 만나요.", "Se sie mannayo.", "Let us meet at three.", "3時に会いましょう。", "三点见。", "Gặp lúc ba giờ nhé.", "Nos vemos a las tres."),
    rescue: phrase("조금 늦을 것 같아요.", "Jogeum neujeul geot gatayo.", "I think I will be a little late.", "少し遅れそうです。", "我可能会晚一点。", "Tôi nghĩ sẽ trễ một chút.", "Creo que llegaré un poco tarde."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "몇 시에 만날까요?" },
      { speaker: "친구", speakerRole: "friend", text: "세 시에 만나요." },
      { speaker: "학습자", speakerRole: "learner", text: "조금 늦을 것 같아요." }
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
    title: en("Saying what you like"),
    situation: en("You briefly share your preferences about food or a topic."),
    quizDistractors: ["When confirming a time to meet", "When saying where to stop"] as [string, string],
    phraseId: "i-like-this",
    core: phrase("이거 정말 좋아해요.", "Igeo jeongmal joahaeyo.", "I really like this.", "これが本当に好きです。", "我真的很喜欢这个。", "Tôi rất thích cái này.", "Esto me gusta mucho."),
    response: phrase("저도 좋아해요.", "Jeodo joahaeyo.", "I like it too.", "私も好きです。", "我也喜欢。", "Tôi cũng thích.", "A mí también me gusta."),
    rescue: phrase("추천해 주세요.", "Chucheonhae juseyo.", "Please recommend something.", "おすすめしてください。", "请推荐一下。", "Hãy gợi ý giúp tôi.", "Recomiéndeme algo, por favor."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "이거 정말 좋아해요." },
      { speaker: "친구", speakerRole: "friend", text: "저도 좋아해요." },
      { speaker: "학습자", speakerRole: "learner", text: "추천해 주세요." }
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
    title: en("Describing symptoms at a clinic"),
    situation: en("You briefly describe your symptoms when you are not feeling well."),
    quizDistractors: ["When asking for the bill", "When requesting separate packaging"] as [string, string],
    phraseId: "head-hurts",
    core: phrase("머리가 아파요.", "Meoriga apayo.", "My head hurts.", "頭が痛いです。", "我头疼。", "Tôi đau đầu.", "Me duele la cabeza."),
    response: phrase("언제부터 아팠어요?", "Eonjebuteo apasseoyo?", "Since when has it hurt?", "いつから痛いですか。", "从什么时候开始疼？", "Đau từ khi nào?", "¿Desde cuándo le duele?"),
    rescue: phrase("약을 사고 싶어요.", "Yageul sago sipeoyo.", "I want to buy medicine.", "薬を買いたいです。", "我想买药。", "Tôi muốn mua thuốc.", "Quiero comprar medicina."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "머리가 아파요." },
      { speaker: "직원", speakerRole: "staff", text: "언제부터 아팠어요?" },
      { speaker: "학습자", speakerRole: "learner", text: "약을 사고 싶어요." }
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
    title: en("Asking which documents you need"),
    situation: en("At a bank or government counter, you check what documents are needed."),
    quizDistractors: ["When ordering at a cafe", "When talking about the weather"] as [string, string],
    phraseId: "check-document",
    core: phrase("이 서류가 필요해요?", "I seoryuga piryohaeyo?", "Do I need this document?", "この書類が必要ですか。", "需要这份文件吗？", "Có cần giấy tờ này không?", "¿Necesito este documento?"),
    response: phrase("네, 필요해요.", "Ne, piryohaeyo.", "Yes, you need it.", "はい、必要です。", "是的，需要。", "Vâng, cần.", "Sí, lo necesita."),
    rescue: phrase("확인해 주세요.", "Hwaginhae juseyo.", "Please check it.", "確認してください。", "请确认。", "Hãy kiểm tra giúp tôi.", "Revíselo, por favor."),
    dialogue: [
      { speaker: "학습자", speakerRole: "learner", text: "이 서류가 필요해요?" },
      { speaker: "직원", speakerRole: "staff", text: "네, 필요해요." },
      { speaker: "학습자", speakerRole: "learner", text: "확인해 주세요." }
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
    title: en("Talking about your next plan"),
    situation: en("Wrapping up the 30-day program, you say what you will do next."),
    quizDistractors: ["When asking the price", "When asking someone to repeat"] as [string, string],
    phraseId: "next-plan",
    core: phrase("다음에는 더 길게 말하고 싶어요.", "Daeumeneun deo gilge malhago sipeoyo.", "Next time, I want to speak longer.", "次はもっと長く話したいです。", "下次我想说得更长一点。", "Lần sau tôi muốn nói dài hơn.", "La próxima vez quiero hablar más."),
    response: phrase("좋아요. 계속 연습해요.", "Joayo. Gyesok yeonseuphaeyo.", "Good. Let us keep practicing.", "いいですね。続けて練習しましょう。", "好。继续练习吧。", "Tốt. Hãy tiếp tục luyện tập.", "Bien. Sigamos practicando."),
    rescue: phrase("오늘 배운 문장을 다시 말할게요.", "Oneul baeun munjangeul dasi malhalgeyo.", "I will say today's sentence again.", "今日習った文をもう一度言います。", "我再说一遍今天学的句子。", "Tôi sẽ nói lại câu hôm nay.", "Diré otra vez la frase de hoy."),
    dialogue: [
      { speaker: "튜터", speakerRole: "tutor", text: "다음에는 뭘 하고 싶어요?" },
      { speaker: "학습자", speakerRole: "learner", text: "다음에는 더 길게 말하고 싶어요." },
      { speaker: "튜터", speakerRole: "tutor", text: "좋아요. 계속 연습해요." },
      { speaker: "학습자", speakerRole: "learner", text: "오늘 배운 문장을 다시 말할게요." }
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

const extraDialogueMeanings: Record<string, Record<CountryPackId, string>> = {
  "안녕하세요. 주문하시겠어요?": localized(
    "Hello, may I take your order?",
    "いらっしゃいませ。ご注文はお決まりですか。",
    "您好，请问要点什么？",
    "Xin chào, bạn muốn gọi món gì?",
    "Hola, ¿qué desea ordenar?"
  ),
  "여기로 가시면 돼요.": localized(
    "You can go this way.",
    "こちらへ行けばいいですよ。",
    "往这边走就行了。",
    "Đi lối này là được.",
    "Puede ir por aquí."
  ),
  "아니요, 가까워요.": localized(
    "No, it is close.",
    "いいえ、近いですよ。",
    "不，很近的。",
    "Không, ở gần thôi.",
    "No, está cerca."
  ),
  "네, 돼요.": localized(
    "Yes, you can.",
    "はい、使えますよ。",
    "可以的。",
    "Được ạ.",
    "Sí, se puede."
  ),
  "죄송해요. 조금 천천히 말해 주세요.": localized(
    "I'm sorry. Could you please speak a little more slowly?",
    "すみません。もう少しゆっくり話してください。",
    "对不起，请说慢一点。",
    "Xin lỗi. Bạn có thể nói chậm hơn không?",
    "Lo siento. ¿Podría hablar un poco más despacio?"
  ),
  "죄송해요. 조금 늦었어요.": localized(
    "I'm sorry. I'm a little late.",
    "すみません。少し遅れました。",
    "对不起，我有点晚了。",
    "Xin lỗi. Tôi đến hơi muộn.",
    "Lo siento. Llegué un poco tarde."
  ),
  "저도요.": localized(
    "Me too.",
    "私もです。",
    "我也是。",
    "Tôi cũng vậy.",
    "Yo también."
  ),
  "다음에는 뭘 하고 싶어요?": localized(
    "What do you want to do next?",
    "次は何をしたいですか。",
    "下一步你想做什么？",
    "Lần sau bạn muốn làm gì?",
    "¿Qué quieres hacer después?"
  )
};

const createLesson = (seed: (typeof lessonSeeds)[number]): Lesson => {
  const phraseByKorean: Record<string, Record<CountryPackId, string>> = {};
  for (const p of [seed.core, seed.response, seed.rescue, seed.roleplayPrompt, ...seed.swapSlots]) {
    phraseByKorean[p.korean] = p.meaningByCountry;
  }

  const dialogue = seed.dialogue.map((line) => ({
    speaker: line.speaker,
    speakerRole: line.speakerRole,
    korean: line.text,
    meaningByCountry:
      phraseByKorean[line.text] ??
      extraDialogueMeanings[line.text] ??
      localized(line.text, line.text, line.text, line.text, line.text)
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
      explanationByCountry: day14StructureOverrides[seed.day] ?? day15To30StructureOverrides[seed.day] ?? seed.structureExplanation
    },
    swapSlots: seed.swapSlots.map((slot, index) => ({ ...slot, label: `Swap ${index + 1}` })),
    sceneWords: [...seed.sceneWords],
    roleplay: {
      prompt: seed.roleplayPrompt,
      expected: seed.core,
      fallback: seed.rescue
    },
    reviewCards: reviewCards(seed.day, seed.core, seed.roleplayPrompt),
    countryNotes: commonCountryNotes,
    pronunciationByCountry: day14PronunciationOverrides[seed.day] ?? day15To30PronunciationOverrides[seed.day] ?? commonPronunciationNotes,
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
        title: "Today's situation",
        body: seed.situation["us-en"],
        audioTargetId: "dialogue",
        reviewWeight: 1
      },
      {
        id: "dialogue",
        kind: "dialogue",
        title: "Listen to the full dialogue",
        body: "Listen to the short dialogue first, then find your turn to speak.",
        korean: dialogue.map((line) => line.korean).join(" "),
        audioTargetId: "dialogue",
        reviewWeight: 2
      },
      {
        id: "phrase",
        kind: "phrase",
        title: "Today's phrase",
        body: "Listen and check the meaning together.",
        korean: seed.core.korean,
        romanization: seed.core.romanization,
        audioTargetId: "core",
        saveTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "structure",
        kind: "structure",
        title: "Sentence structure",
        body: "Check the pattern you can use right away, before grammar terms.",
        audioTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "swap",
        kind: "swap",
        title: "Swap words",
        body: "Change one word and say it again in the same situation.",
        audioTargetId: "swap-1",
        saveTargetId: "swap-1",
        reviewWeight: 2
      },
      {
        id: "natural-listen",
        kind: "listen",
        title: "Listen at natural speed",
        body: "Take in the full rhythm first.",
        korean: seed.core.korean,
        audioTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "slow-listen",
        kind: "listen",
        title: "Listen at slow speed",
        body: "Check unfamiliar sounds carefully.",
        korean: seed.core.korean,
        audioTargetId: "core",
        reviewWeight: 2
      },
      {
        id: "record",
        kind: "record",
        title: "Speak in your own voice",
        body: "Say it once, then re-record if needed.",
        korean: seed.core.korean,
        audioTargetId: "core",
        saveTargetId: "core",
        reviewWeight: 4
      },
      {
        id: "compare",
        kind: "compare",
        title: "Compare original and your voice",
        body: "Alternate between the original and your rhythm — no scoring.",
        korean: seed.core.korean,
        audioTargetId: "core",
        reviewWeight: 4
      },
      {
        id: "quiz",
        kind: "quiz",
        title: "Quick check",
        body: "Which situation is most natural for using this expression?",
        choices: [seed.situation["us-en"], ...seed.quizDistractors],
        answer: seed.situation["us-en"],
        hint: "Think back to the real situation you saw at the start of today's lesson.",
        reviewWeight: 3
      },
      {
        id: "roleplay",
        kind: "roleplay",
        title: "Short roleplay",
        body: "After a short response from your partner, reply with today's phrase.",
        korean: seed.core.korean,
        audioTargetId: "response",
        saveTargetId: "rescue",
        reviewWeight: 3
      },
      {
        id: "summary",
        kind: "summary",
        title: "Today's wrap-up",
        body: `Today you practiced "${seed.core.korean}". Phrases you save come back in review.`,
        reviewWeight: 1
      }
    ]
  };
};

export const lessons: Lesson[] = lessonSeeds.map(createLesson);

export const getLesson = (id = "day-1") => lessons.find((lesson) => lesson.id === id) ?? lessons[0];

export const getNextLesson = (progress: Record<string, { status: string }>) =>
  lessons.find((lesson) => progress[lesson.id]?.status !== "completed") ?? lessons[lessons.length - 1];
