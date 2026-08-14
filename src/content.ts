export const NAV_ITEMS = [
  { label: "CONCEPT", href: "#concept" },
  { label: "METHOD", href: "#method" },
  { label: "TRAINER", href: "#trainer" },
  { label: "PROGRAM", href: "#program" },
  { label: "PRICE", href: "#price" },
  { label: "FAQ", href: "#faq" },
] as const;

export const PROBLEMS = [
  "体重が落ちても、姿勢次第で美しく見えない",
  "自己流では、身体全体のラインを整えにくい",
  "気になる部分だけ鍛えても、全体のバランスが崩れやすい",
  "続けられない方法では、身体づくりが習慣にならない",
] as const;

export const METHODS = [
  {
    key: "DISCOVER",
    title: "今の身体を知る",
    body: "姿勢・身体のライン・動きを丁寧に確認します。",
  },
  {
    key: "DESIGN",
    title: "理想の「きれい」を描く",
    body: "目指したい立ち姿や身体のラインを一緒に共有します。",
  },
  {
    key: "CONDITION",
    title: "動きやすい身体へ整える",
    body: "ストレッチなどを取り入れ、動きやすい状態へ整えます。",
  },
  {
    key: "MAKE",
    title: "必要な筋肉を鍛える",
    body: "理想の身体から逆算し、必要な筋肉へ丁寧にアプローチします。",
  },
] as const;

export const BODY_GOALS = [
  { number: "01", title: "立ち姿", body: "肩甲骨と骨盤を整え、真のきれいへ。" },
  { number: "02", title: "ウエスト", body: "左右のくびれを整え、綺麗に服を着こなす。" },
  { number: "03", title: "ヒップ", body: "同性からも憧れられるメリハリのある身体に。" },
  { number: "04", title: "これから", body: "いつまでも自信を持てるスタイルを維持する。" },
] as const;

export const REASONS = [
  {
    title: "姿勢から考えるボディメイク",
    body: "体重だけではなく、立ち姿と身体のラインから理想像を考えます。",
    featured: false,
  },
  {
    title: "トレーニング × コンディショニング",
    body: "鍛える前に動きやすい状態へ整え、目的に合う動きを積み重ねます。",
    featured: false,
  },
  {
    title: "経験豊富なトレーナーが一貫担当",
    body: "カウンセリングから日々のセッションまで、身体の変化を継続して見守ります。",
    featured: true,
  },
  {
    title: "完全個室・完全予約制",
    body: "周囲を気にせず、自分の身体と向き合えるプライベート空間です。",
    featured: false,
  },
  {
    title: "マシンピラティスも活用",
    body: "トレーニングとコンディショニングに組み合わせ、身体のラインと動きを丁寧に整えます。",
    featured: false,
  },
] as const;

export const PROGRAMS = [
  { duration: "30", unit: "MIN", title: "短時間・継続型", body: "無理なく習慣にしたい方へ。サブスク想定。", recommended: false },
  { duration: "60", unit: "MIN", title: "スタンダード", body: "コンディショニングとトレーニングを組み合わせる主力コース。", recommended: true },
  { duration: "90", unit: "MIN", title: "ロングセッション", body: "身体へじっくり向き合いたい方へ。", recommended: false },
] as const;

export const INTENSIVE_PRICES = [
  { name: "2ヶ月DAY集中プラン", count: "16回", price: "138,000円" },
  { name: "2ヶ月集中プラン", count: "16回", price: "168,000円" },
  { name: "3ヶ月DAY集中プラン", count: "24回", price: "198,000円" },
  { name: "3ヶ月集中プラン", count: "24回", price: "248,000円" },
  { name: "6ヶ月本格プラン", count: "48回", price: "448,000円" },
] as const;

export const EXPERIENCE_STEPS = [
  { step: "01", title: "WEB予約", body: "ホットペッパーで空き状況を確認し、ご希望の日時を予約してください。" },
  { step: "02", title: "カウンセリング", body: "現在の身体と理想のイメージを伺います。" },
  { step: "03", title: "コンディショニング", body: "30分かけて、動きやすい状態へ整えます。" },
  { step: "04", title: "パーソナルトレーニング", body: "30分の体験で、身体に合う動きを確認します。" },
  { step: "05", title: "プラン提案", body: "目標と通い方に合うプランをご案内します。" },
] as const;

export const FAQS = [
  {
    question: "運動が苦手でも大丈夫ですか？",
    answer: "はい。運動経験や体力に合わせて内容を調整します。現在の姿勢や身体の状態、運動経験を確認したうえで、一人ひとりに合わせたトレーニングをご提案します。",
  },
  {
    question: "無理な勧誘はありませんか？",
    answer: "無理にご契約をおすすめすることはありません。内容や料金をご確認いただき、ご納得いただいたうえでご契約いただきます。",
  },
  {
    question: "料金はいくらですか？",
    answer: "目的や通い方に合わせて複数のプランをご用意しています。確定している集中プランは料金セクションでご確認いただけます。その他の詳しい料金は初回体験時にご相談ください。",
  },
  {
    question: "トレーニングに必要な持ち物はありますか？",
    answer: "基本的には手ぶらでお越しいただけます。ウェア・シューズ・タオルのレンタルがあり、水はウォーターサーバーをご利用いただけます。",
  },
  {
    question: "予約のキャンセルや変更はできますか？",
    answer: "可能です。キャンセルは前日まで承っています。予約日時の変更については、空き状況に応じて当日でも対応可能です。",
  },
  {
    question: "駐車場はありますか？",
    answer: "専用駐車場はありません。近隣のコインパーキングをご利用ください。",
  },
  {
    question: "食事指導はありますか？",
    answer: "ご希望の方には、有料オプションで食事指導をご用意しています。",
  },
  {
    question: "1回のトレーニング時間はどのくらいですか？",
    answer: "30分・60分・90分のコースをご用意しています。目的や通える頻度などに合わせてご提案します。",
  },
  {
    question: "どのくらいで身体の変化を感じられますか？",
    answer: "身体の変化には個人差があります。現在の身体の状態や目標、トレーニング頻度などに合わせて進めていきます。",
  },
  {
    question: "支払い方法は何がありますか？",
    answer: "クレジットカード・QRコード決済・現金をご利用いただけます。対応ブランドの詳細はご予約時にご確認ください。",
  },
  {
    question: "どのくらいの頻度で通うのがおすすめですか？",
    answer: "しっかり身体づくりを進めたい方には週2回をおすすめしています。目標やライフスタイルに合わせて、無理なく続けられる頻度をご提案します。",
  },
] as const;
