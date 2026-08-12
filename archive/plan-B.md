# VIVACHE Plan B
## Modern Wellness Graphic 実装計画

> 対応デザイン: `design-B.md`  
> 目的: VIVACHEの価値を初見で素早く理解させ、視認性の高い情報設計と強いCTAでホットペッパー予約とLINE相談へ誘導する。

---

# 1. プロジェクト概要

## サイト形式
- 1ページ完結型ブランドLP
- 補助ページ: `/privacy/`
- CTA: 予約はホットペッパー、相談はLINEに統一
- ドメイン: `vivache.jp`
- GitHub Pages対応
- 静的サイト

## B案の役割
A案よりも以下を重視する。
- 理解速度
- スマホCV
- CTA認知
- 情報のブロック化
- トレーナー実績の視覚化
- 料金への到達しやすさ

---

# 2. 技術構成

## Frontend
- Vite
- React
- TypeScript推奨
- Tailwind CSS
- Lucide React

## Routing
- HashRouter
- `/`
- `/privacy`

## Hosting
- GitHub Pages

## Data
`public/data.json` に以下を集約可能な設計。
- FAQ
- 料金
- プログラム
- アクセス
- トレーナー実績
- CTA URL
- 営業時間

---

# 3. Header

## Desktop
- sticky
- white 92%
- backdrop blur
- logo
- CONCEPT
- METHOD
- TRAINER
- PRICE
- FAQ
- Hot Pepper予約CTA

## Mobile
- logo
- menu
- bottom sticky CTA

## CTA
pill形状。
常に視認性を確保。

---

# 4. FIRST VIEW

## 目的
一画面で以下を理解させる。
1. 姿勢改善
2. ボディメイク
3. 完全個室
4. Hot PepperでWEB予約可能

## Layout
Full-width visual。
写真上にfloating text panel。

## Copy
### H1
**美しさは、姿勢から。**

### Sub
**姿勢改善 × ボディメイク ＝ VIVACHE**

### Description
姿勢と身体のラインから、  
理想の「きれい」を設計する。

### CTA
**ホットペッパーで初回体験を予約する**

## Feature Chips
- 北新地徒歩5分
- 完全個室
- 手ぶらOK

## Visual
- 14階の眺望
- 女性モデル
- パワーラック
- トレーナーとのセッション
- white / sage / neutral

---

# 5. PROBLEM

## Style
dark section。

## Heading
**ただ痩せるだけでは、理想の身体になれない。**

## Grid
2 × 2。

1. 姿勢が悪いと身体全体がきれいに見えない
2. 体重だけ落としても理想のラインにはならない
3. 自己流では必要な筋肉を正しく使いにくい
4. 続けられない方法では身体づくりが習慣にならない

## 目的
ページ序盤の視覚的リズムを作る。

---

# 6. CONCEPT

## Visual Core
巨大タイポグラフィ。

```txt
POSTURE
×
BODYMAKE
=
VIVACHE
```

## Copy
VIVACHE = いきいきと、前向きに。

今の身体を見て、理想の姿を一緒に描き、そこから逆算して整え、鍛える。

## Layout
desktop: equation 55% / text 45%
mobile: equation → text

---

# 7. VIVACHE METHOD

## UI
4 card grid。

### SEE
今の身体を知る

### DESIGN
理想の「きれい」を描く

### CONDITION
動きやすい身体へ整える

### TRAIN
必要な筋肉を鍛える

## Note
必要に応じてマシンピラティスを活用。

## Interaction
hover:
- translateY(-4px)
- border primary
- icon motionは最小限

---

# 8. TARGET / BODYMAKE

## Style
image-driven。

2 × 2 photo grid。

### Item
- 立ち姿
- ウエスト
- ヒップ
- 後ろ姿

## Note
Before/After表現は禁止。
「理想イメージ」として表現。

---

# 9. WHY VIVACHE

## UI
5 card。

1. 姿勢から考えるボディメイク
2. トレーニング × コンディショニング
3. 経験豊富なトレーナーが一貫担当
4. 完全個室・完全予約制
5. 必要に応じてマシンピラティス

## Priority
3番を大型カードにして信頼形成。

---

# 10. TRAINER

## Key Copy
**約16年の経験を、あなた一人の身体のために。**

## Layout
左: trainer photo
右: stats grid

## Stats
- 16 YEARS
- 1,000+
- AWARD
- 10+ YEARS
- 500+
- LECTURER

## Biography
- トレーナー専門学校卒業
- フィットネスジム2年
- 大手パーソナルジム3年
- 在籍時最優秀トレーナーとして表彰
- 独立後フリーランス
- パーソナルトレーナー約16年
- 約1,000名担当
- コンディショニング10年以上
- 500名超に対応
- セミナー講師経験

## TODO
実績表現は公開前に裏取り。

---

# 11. PROGRAM

## Cards

### 30 MIN
短時間・継続型

### 60 MIN
主力・回数券
`RECOMMENDED`

### 90 MIN
しっかり取り組みたい方向け

### INTENSIVE
短期集中

### CONDITIONING
整体 / コンディショニング

### FOOD SUPPORT
有料オプション

## Rule
マシンピラティスは商品として独立させない。

---

# 12. PRICE

## B案の重要セクション

料金を早く理解できる構造。

## Main Card
60min回数券。

## Secondary
- 30min
- 90min
- 集中プラン
- 整体
- 食事指導

## 暫定集中プラン
| プラン | 回数 | 料金（税込） |
|---|---:|---:|
| 2ヶ月DAY集中プラン | 16回 | 138,000円 |
| 2ヶ月集中プラン | 16回 | 168,000円 |
| 3ヶ月DAY集中プラン | 24回 | 198,000円 |
| 3ヶ月集中プラン | 24回 | 248,000円 |
| 6ヶ月本格プラン | 48回 | 448,000円 |

## TODO
- 30min
- 60min
- 90min
- 整体
- 食事指導

---

# 13. FIRST EXPERIENCE

## UI
horizontal timeline。

### STEP 1
WEB予約（ホットペッパー）

### STEP 2
カウンセリング

### STEP 3
コンディショニング 30min

### STEP 4
パーソナルトレーニング 30min

### STEP 5
プラン提案

## Badge
**無理な勧誘はありません**

## CTA
**ホットペッパーで初回体験を予約する**

---

# 14. PRIVATE STUDIO

## UI
Bento Grid。

### Large
14階の眺望

### Medium
トレーニングスペース

### Small
- マシンピラティス
- シャワー
- 更衣室

## Features
- 北新地徒歩5分
- 完全個室
- 完全予約
- 手ぶらOK
- ウェア
- シューズ
- タオル
- ウォーターサーバー

---

# 15. FAQ

## UI
Accordion card。

- 運動初心者
- 勧誘
- 料金
- 持ち物
- キャンセル
- 駐車場
- 食事指導
- 時間
- 効果
- 支払い
- 頻度

## 回答

### 運動が苦手でも大丈夫ですか？
はい。運動経験や体力に合わせて内容を調整します。現在の姿勢や身体の状態、運動経験を確認したうえで、一人ひとりに合わせたトレーニングをご提案します。

### 無理な勧誘はありませんか？
無理にご契約をおすすめすることはありません。内容や料金をご確認いただき、ご納得いただいたうえでご契約いただきます。

### 料金はいくらですか？
目的や通い方に合わせて複数のプランをご用意しています。詳しい料金はPRICEをご確認いただくか、初回体験時にご相談ください。

### 持ち物はありますか？
基本的には手ぶらでお越しいただけます。ウェア・シューズ・タオルのレンタルがあり、水はウォーターサーバーをご利用いただけます。

### キャンセルや変更はできますか？
可能です。キャンセルは前日まで承っています。予約日時の変更は空き状況に応じて当日でも対応可能です。

### 駐車場はありますか？
専用駐車場はありません。近隣のコインパーキングをご利用ください。

### 食事指導はありますか？
ご希望の方には有料オプションで食事指導をご用意しています。

### トレーニング時間は？
30分・60分・90分のコースをご用意しています。

### どのくらいで変化を感じられますか？
身体の変化には個人差があります。現在の身体の状態や目標、トレーニング頻度に合わせて進めていきます。

### 支払い方法は？
クレジットカード・QRコード決済・現金をご利用いただけます。

### 通う頻度は？
しっかり身体づくりを進めたい方には週2回をおすすめしています。目標やライフスタイルに合わせて無理なく続けられる頻度をご提案します。

---

# 16. ACCESS

## UI
大きなGoogle Map。
上にfloating info card。

## Info
- VIVACHE
- 北新地徒歩5分
- 梅田14階
- 平日 10:00〜22:00
- 土日 不定休
- 専用駐車場なし

## TODO
正式住所 / Google Map URL / 電話番号。

---

# 17. FINAL CTA

## Background
studio photo + dark overlay。

## H2
**美しさは、姿勢から。**

## Text
あなたの理想の身体を、一緒に考えることから始めませんか。

## CTA
**ホットペッパーで初回体験を予約する**

---

# 18. Mobile First Rules

- FV image height 68vh
- text panel overlay
- H1 42–48px
- CTA min-height 56px
- bottom sticky CTA
- safe-area対応
- card gap 12px
- priceは縦カード
- horizontal scroll禁止
- touch target 48px以上

---

# 19. SEO

## title案
**VIVACHE｜北新地・梅田の完全個室パーソナルジム｜姿勢改善×ボディメイク**

## description案
北新地徒歩5分、梅田14階の完全個室パーソナルジムVIVACHE。姿勢と身体のラインから理想の「きれい」を設計。トレーニングとコンディショニングを組み合わせ、一人ひとりに合わせた身体づくりをサポートします。

## Schema
- LocalBusiness
- HealthClub
- FAQPage
- WebSite

---

# 20. Tracking

イベント:
- `line_click_fv`
- `line_click_method`
- `line_click_trainer`
- `line_click_price`
- `line_click_final`
- `program_view`
- `faq_open`
- `scroll_25`
- `scroll_50`
- `scroll_75`
- `scroll_100`

ABテスト時:
`variant: "B"`

---

# 21. A/B Test Plan

## 固定
- copy
- section order
- content
- price
- CTA wording
- photos
- LINE / Hot Pepper destination

## 変更
- typography
- spacing
- layout
- color contrast
- card treatment
- CTA prominence
- motion speed

## Primary KPI
Hot Pepper予約CTAクリック率。

## Secondary
- 75% scroll
- Price到達率
- Trainer滞在
- LINE相談開始率
- 体験予約率

## 判定
クリック数だけでなく、最終的にはHot Pepper上の体験予約完了率で勝敗を決める。

---

# 22. 実装順

1. Vite / React / Tailwindセットアップ
2. Tailwind B theme
3. Layout / Header
4. FV
5. Problem
6. Concept
7. Method
8. Target
9. Why
10. Trainer
11. Program
12. Price
13. First Experience
14. Studio
15. FAQ
16. Access
17. Final CTA
18. Privacy
19. SEO
20. Analytics
21. Mobile QA
22. Build / deploy

---

# 23. 完了条件

- GitHub Pagesで正常稼働
- 375pxで横スクロールなし
- CTAリンク正常
- mobile sticky CTA正常
- FAQ正常
- 画像最適化
- alt設定
- H1は1つ
- heading hierarchy正常
- SEO metadataあり
- 料金・住所・実績の未確定項目を公開前に確定
- Lighthouseで致命的問題なし
