// サイト全体で使うコンテンツデータ。
// ページを編集するときは、まずここを更新してから `npm run build` を実行してください。

export const site = {
  name: "実験空間 Studio Zero",
  nameEn: "Studio Zero",
  url: "https://gackun1.github.io/website_studio-zero/",
  description:
    "実験空間 Studio Zero は、作家・東條麗子が主宰するアートスペースです。絵画、オブジェ、身近な素材を使った「手いたずら」を制作しています。",
  instagram: "https://www.instagram.com/reiko.0t/",
  instagramHandle: "@reiko.0t",
  facebook: "https://www.facebook.com/reiko.tojo.146",
};

export const nav = [
  { href: "index.html", label: "Home", ja: "ホーム" },
  { href: "about.html", label: "About", ja: "スタジオと作家" },
  { href: "exhibition.html", label: "Exhibition", ja: "企画展" },
  { href: "gallery.html", label: "Gallery", ja: "作品" },
  { href: "activities.html", label: "Activities", ja: "活動記録" },
  { href: "contact.html", label: "Contact", ja: "お問い合わせ" },
];

// 企画展『-MASUKU-』の出品作。価格・サイズ・素材は旧サイトの掲載内容による。
export const masuku = [
  {
    no: "01",
    material: "植物",
    size: "250 × 200 × 100 mm",
    price: "¥5,500",
    text: "乾いた草の茎を編んで、口元を覆う形にしています。",
  },
  {
    no: "02",
    material: "アクリル絵具、ボール紙",
    size: "520 × 300 × 70 mm",
    price: "¥8,100",
    text: "青と緑に塗ったボール紙でつくった、大きく波打つマスクです。",
  },
  {
    no: "03",
    material: "ステンレス針金",
    size: "250 × 180 × 50 mm",
    price: "¥4,800",
    text: "一本の針金で、プリーツマスクの輪郭をかたどっています。",
  },
  {
    no: "04",
    material: "ボール紙、石膏",
    size: "300 × 1020 × 100 mm",
    price: "¥21,000",
    text: "折り返した白い波の上に、小さなマスクをひとつ置いたレリーフ。高さは1メートルを超えます。",
  },
  {
    no: "05",
    material: "石膏、綿",
    size: "450 × 700 × 500 mm",
    price: "¥54,000",
    text: "吊り下げた石膏の器から、赤い模様が流れ落ちる立体作品です。",
  },
  {
    no: "06",
    material: "ジーンズ",
    size: "230 × 230 × 230 mm",
    price: "¥7,560",
    text: "履き古したジーンズでつくったマスクを、球体にかけています。",
  },
  {
    no: "07",
    material: "綿、布、ボール紙",
    size: "250 × 250 × 120 mm",
    price: "¥8,640",
    text: "綿の上に、灰色のマスクを重ねた作品です。",
  },
  {
    no: "08",
    material: "毛糸",
    size: "180 × 350 × 80 mm",
    price: "¥5,400",
    text: "赤い毛糸で編んだマスク。紐を長く垂らしています。",
  },
  {
    no: "09",
    material: "新聞紙",
    size: "180 × 150 × 20 mm",
    price: "¥980",
    text: "新聞紙で折ったマスクを何枚も重ねています。見出しの文字がそのまま見えます。",
  },
];

// ギャラリー掲載作品。id は Instagram 投稿の通し番号（images/works/w{id}.webp）。
// 投稿コード・投稿日・作家自身の投稿文は scripts/posts.json から自動で引く。
export const categories = [
  { key: "painting", label: "絵画", en: "Painting" },
  { key: "object", label: "オブジェ", en: "Object" },
  { key: "season", label: "しつらえ", en: "Seasonal" },
  { key: "tewaza", label: "手いたずら", en: "Tewaza" },
  { key: "exhibit", label: "展示・雪アート", en: "Exhibition" },
];

export const works = [
  // 絵画
  { id: "000", cat: "painting", title: "2026年 春の線描" },
  { id: "001", cat: "painting", title: "2026年 春の線描" },
  { id: "002", cat: "painting", title: "雪、ミモザ" },
  { id: "003", cat: "painting", title: "ミモザ" },
  { id: "025", cat: "painting", title: "白の線描 二面" },
  { id: "039", cat: "painting", title: "白の線描（連作より）" },
  { id: "038", cat: "painting", title: "白の線描（連作より）" },
  { id: "037", cat: "painting", title: "白の線描（連作より）" },
  { id: "036", cat: "painting", title: "白の線描（連作より）" },
  { id: "034", cat: "painting", title: "白の線描（連作より）" },
  { id: "033", cat: "painting", title: "白の線描（連作より）" },
  { id: "031", cat: "painting", title: "白の線描（連作より）" },
  { id: "029", cat: "painting", title: "白の線描（連作より）" },
  { id: "047", cat: "painting", title: "黒の画面に" },
  { id: "045", cat: "painting", title: "黒の画面に" },
  { id: "053", cat: "painting", title: "ドリームキャッチャーと蘭" },
  { id: "055", cat: "painting", title: "ボールペンで潰す" },
  { id: "056", cat: "painting", title: "過去の記録作品を潰す" },
  { id: "057", cat: "painting", title: "JAALAヨコハマ展 出品作" },
  { id: "128", cat: "painting", title: "青のコラージュ" },
  { id: "141", cat: "painting", title: "黒と白の構成" },

  // オブジェ
  { id: "048", cat: "object", title: "1947.5.3 — 新聞の球体" },
  { id: "049", cat: "object", title: "新聞の球体（展示風景）" },
  { id: "087", cat: "object", title: "Peace & Love" },
  { id: "126", cat: "object", title: "1945・8・15 のダルマ" },
  { id: "129", cat: "object", title: "ダルマと献花" },
  { id: "110", cat: "object", title: "アマビエ張り子" },
  { id: "111", cat: "object", title: "アマビエ張り子" },
  { id: "109", cat: "object", title: "アマビエ張り子と花" },
  { id: "113", cat: "object", title: "アマビエ張り子（白黒）" },
  { id: "016", cat: "object", title: "張り子の顔" },
  { id: "023", cat: "object", title: "皮の人形たち" },
  { id: "024", cat: "object", title: "皮の人形" },
  { id: "083", cat: "object", title: "皮の人形" },
  { id: "060", cat: "object", title: "マッチ棒の立方体" },
  { id: "133", cat: "object", title: "マッチ棒の立方体" },
  { id: "059", cat: "object", title: "マッチ棒の立方体" },
  { id: "065", cat: "object", title: "ワイヤーの樹" },
  { id: "064", cat: "object", title: "ワイヤーの樹" },
  { id: "063", cat: "object", title: "ワイヤーの樹" },
  { id: "066", cat: "object", title: "ワイヤーの樹" },
  { id: "067", cat: "object", title: "ワイヤーの樹とガラス" },
  { id: "040", cat: "object", title: "ステンドグラスの習作" },
  { id: "041", cat: "object", title: "ステンドグラスの台" },
  { id: "012", cat: "object", title: "ステンドグラスと花びら" },
  { id: "131", cat: "object", title: "白いいきものたち" },
  { id: "058", cat: "object", title: "紙雛" },

  // しつらえ
  { id: "044", cat: "season", title: "門松 2024" },
  { id: "043", cat: "season", title: "地域へ届けた門松" },
  { id: "042", cat: "season", title: "塞の神と門松" },
  { id: "004", cat: "season", title: "門松 2026" },
  { id: "017", cat: "season", title: "門松 2025" },
  { id: "019", cat: "season", title: "門松 2025" },
  { id: "062", cat: "season", title: "頌春 2023" },
  { id: "005", cat: "season", title: "しめ飾り" },
  { id: "006", cat: "season", title: "しめ飾り" },
  { id: "007", cat: "season", title: "布巻きのリング" },
  { id: "026", cat: "season", title: "ラッキーリング 5月" },
  { id: "027", cat: "season", title: "ラッキーリング 5月" },
  { id: "028", cat: "season", title: "ラッキーリング 5月" },
  { id: "079", cat: "season", title: "杉玉" },
  { id: "081", cat: "season", title: "杉玉の試作" },
  { id: "072", cat: "season", title: "窓辺の一輪挿し" },
  { id: "073", cat: "season", title: "小さな草" },
  { id: "074", cat: "season", title: "小さい春" },
  { id: "084", cat: "season", title: "酒瓶に挿す" },
  { id: "088", cat: "season", title: "タバスコの空き瓶に" },
  { id: "091", cat: "season", title: "紫陽花" },
  { id: "092", cat: "season", title: "水に透ける花" },
  { id: "099", cat: "season", title: "集めた花" },

  // 手いたずら
  { id: "008", cat: "tewaza", title: "空き缶の紅葉" },
  { id: "015", cat: "tewaza", title: "空き缶の花" },
  { id: "022", cat: "tewaza", title: "空き缶のひまわり" },
  { id: "050", cat: "tewaza", title: "ジーンズのバッグ" },
  { id: "052", cat: "tewaza", title: "ジーンズのバッグ" },
  { id: "013", cat: "tewaza", title: "ジーンズのバッグ" },
  { id: "014", cat: "tewaza", title: "ジーンズのバッグ" },
  { id: "021", cat: "tewaza", title: "大地の運動会「のぼり旗」" },
  { id: "020", cat: "tewaza", title: "のぼり旗（裏面）" },
  { id: "082", cat: "tewaza", title: "オニグルミの殻" },
  { id: "097", cat: "tewaza", title: "オニグルミの実" },
  { id: "121", cat: "tewaza", title: "オニグルミ" },
  { id: "085", cat: "tewaza", title: "マスク用チャーム" },
  { id: "096", cat: "tewaza", title: "マスクチャーム" },
  { id: "095", cat: "tewaza", title: "マスクチャーム" },
  { id: "120", cat: "tewaza", title: "新聞紙のマスク" },
  { id: "125", cat: "tewaza", title: "新聞紙のマスク" },
  { id: "136", cat: "tewaza", title: "新聞紙のマスク" },

  // 展示・雪アート
  { id: "077", cat: "exhibit", title: "杉玉・アートするって面白SUGIDAMA" },
  { id: "076", cat: "exhibit", title: "アートするって面白SUGIDAMA" },
  { id: "078", cat: "exhibit", title: "雪の中の杉玉" },
  { id: "106", cat: "exhibit", title: "雪壁ギャラリー" },
  { id: "104", cat: "exhibit", title: "雪アート最終日" },
  { id: "103", cat: "exhibit", title: "展示会終わり" },
  { id: "107", cat: "exhibit", title: "雪壁ギャラリー" },
  { id: "090", cat: "exhibit", title: "越後妻有国際メールアート展 準備" },
  { id: "089", cat: "exhibit", title: "メールアート展用 その2" },
];

// 活動記録（新しい順）。出典は作家の Instagram 投稿および十日町市の報道資料。
export const activities = [
  {
    year: "2026",
    items: [
      { date: "2026.05", title: "線描の新作「雪、ミモザ」", text: "年明けから憂鬱な知らせが続くなかで描いた線描。描いているあいだ、カスミソウが長持ちしていることに慰められたと書いています。", img: "002" },
    ],
  },
  {
    year: "2024",
    items: [
      { date: "2024.09", title: "大地の運動会に「のぼり旗」で参加", text: "布をつなぎ合わせた手づくりの「のぼり旗」を掲げて参加しました。", img: "021" },
      { date: "2024.03 – 04", title: "白の線描 連作（約20点）", text: "黒地に白の細い線を重ねる連作。「額装して並べてみたくなった」という約20枚が生まれました。", img: "038" },
      { date: "2024.03", title: "奈良でステンドグラスのワークショップ", text: "奈良滞在中に基本を学び、余ったガラスの形を活かしてカットとハンダ付けを練習しました。", img: "040" },
      { date: "2024.01", title: "地域の門松と塞の神", text: "自宅用に加え、お世話になっている地域のための門松を制作して届けました。七日の塞の神にあわせ、花を足して飾り続けました。", img: "043" },
    ],
  },
  {
    year: "2023",
    items: [
      { date: "2023.07 – 08", title: "ギャラリー湯山で展示", text: "「過去の記録作品」をボールペンや太いマジックで“潰す”試みを展示（8/30までの土日祝）。", img: "055" },
      { date: "2023.05", title: "JAALAヨコハマ展に出品", text: "展覧会に向けて制作した手仕事を出品しました。", img: "057" },
    ],
  },
  {
    year: "2022",
    items: [
      {
        date: "2022.01.29 – 03.13",
        title: "「大地の芸術祭」の里 越後妻有2022冬 SNOWART",
        text: "まつだい「農舞台」フィールドミュージアムの「雪アート」に、新潟ユニット（池原浩子、井上智子、関根哲男、茅原登喜子、東條麗子、前山忠）の一員として参加。雪の結晶をかたどった迷路に、杉玉の作品「杉玉・アートするって面白SUGIDAMA」を展示しました。",
        img: "077",
        source: { label: "十日町市 報道資料（2021年12月20日）", href: "https://www.city.tokamachi.lg.jp/material/files/group/3/kaiken20211220-3.pdf" },
      },
    ],
  },
  {
    year: "2021",
    items: [
      { date: "2021.12", title: "杉玉の試作", text: "翌年の雪アートに向けて試作を開始。枯れ杉はもろすぎるため、緑の枝で組み直しました。", img: "081" },
      { date: "2021.08", title: "「Peace & Love」", text: "「平和の希求を諦めない ― 七転び八起き ―」と題した、だるまの形のコラージュ作品です。", img: "087" },
      { date: "2021.07", title: "越後妻有国際メールアート展", text: "郵便で届けるアート作品の展覧会に向けて、オリンピックの古い絵葉書などを用いた作品を準備しました。", img: "090" },
      { date: "2021.02 – 03", title: "雪アート「雪壁ギャラリー」", text: "雪の壁を掘ってつくる小さなギャラリーに作品を展示しました。", img: "106" },
    ],
  },
  {
    year: "2020",
    items: [
      { date: "2020", title: "企画展『-MASUKU-』", text: "植物、針金、ジーンズ、新聞紙など、さまざまな素材でつくったマスク9点を発表しました。", img: "136", href: "exhibition.html" },
    ],
  },
];
