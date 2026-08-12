# VIVACHE Design A-ver4
## Fresh Studio Graphic / orbody-gym.com のデザイン言語を再構築した案

### 出典
https://orbody-gym.com/ （飯田橋のパーソナルジム orBody）のTOPページを解析し、そのビジュアルシステムをVIVACHEのブランド骨格（README.md固定コンテンツ）に適応した。

### 参照元から抽出したデザイン言語
- 本文・和文見出し: Zen Kaku Gothic New / 文字色 #3B3B3B
- 英字ディスプレイ: Josefin Sans（H1 60px 700 / セクション見出し 42px、字間 0.2em）
- セクション見出しパターン: 斜めスラッシュ + 英字大文字 + 日本語小見出し（例: CONCEPT / コンセプト）
- ナビ: 英字大文字 + 日本語小ラベルの2段組
- 配色: ペールミント #EFF5F4 / クリーム #F5F2EA / カーキ #B8B6A9 / ダーク #3B3B3B / 白
- シグネチャー: CTAのグラデーション linear-gradient(225deg, #D9AFD9 0%, #97D9E1 100%)（白文字・radius 5px・右下固定）
- セクション間の斜めカット（クリーム→ミント→白）
- 写真カード: 暗めオーバーレイ + 白のインナーフレーム + 中央白文字ラベル
- 白カード: ソフトシャドウ + タイトル下ヘアライン
- 料金表: カーキ背景のヘッダーセル + 白い数値セル + ヘアライン罫線
- 写真のオフセット背景ブロック（写真の背後にカーキの矩形をずらして敷く）
- ヒーロー: 全面写真 + 左下に白の大見出し + 右下グラデーションCTA + スクロールキュー

---

# 1. VIVACHEへの適応方針

- コンテンツ・セクション順・CTA文言・料金・FAQはREADME.mdの固定仕様を変更しない
- コピーはA-ver3で改稿したペルソナ訴求版を踏襲する（デザインのみ比較可能にする）
- orBodyの「無料カウンセリング予約」ボタンは、VIVACHEの主導線であるホットペッパー予約に置き換える
- 参照元のInstagram/LINEフローティング円形ボタンは、README固定のイベント設計に無いため採用しない（LINE導線はセクション内CTAで担保）

# 2. Color System

```css
--av4-ink: #3B3B3B;
--av4-muted: #707070;
--av4-mint: #EFF5F4;
--av4-cream: #F5F2EA;
--av4-khaki: #B8B6A9;
--av4-white: #FFFFFF;
--av4-grad: linear-gradient(225deg, #D9AFD9 0%, #97D9E1 100%);
```

使用比率: 白 40% / ミント 25% / クリーム 25% / カーキ 5% / グラデーション 5%。

# 3. Typography

- 英字ディスプレイ: Josefin Sans（300/400/700）
- 和文: Zen Kaku Gothic New
- H1: 白 / Josefin併用の2段（英字キッカー + 和文大見出し）
- セクション見出し: スラッシュ + 英字42px(字間0.2em) + 和文14px

# 4. Section Mapping

| VIVACHEセクション | 適用する orBody パターン |
|---|---|
| FIRST VIEW | 全面写真ヒーロー + 左下白見出し + 右下グラデーションCTA + スクロールキュー |
| PROBLEM | クリーム背景 + 白カード2×2（ソフトシャドウ + タイトルヘアライン） |
| CONCEPT | 2カラム: 左テキスト + 右写真（カーキのオフセット背景ブロック） |
| METHOD | ミント背景（斜めカット） + 白カード4枚 + Josefin数字 |
| BODYMAKE | 写真カードグリッド（白インナーフレーム + 中央白ラベル） |
| WHY | 白背景 + ヘアライン行リスト |
| TRAINER | ミント背景 + 白カード（写真 + PROFILEヘアライン + 実績） |
| PROGRAM | 白背景 + 3カラム + カーキのアクセント |
| PRICE | カーキヘッダーの料金表 + 補足白カード3枚（支払い/予約/レンタル） |
| EXPERIENCE | 番号 + 縦ラインのステップ |
| STUDIO | ギャラリー風写真構成（大1 + 小2） |
| FAQ | ヘアラインのアコーディオン |
| ACCESS | 地図 + 店舗情報dl + カーキのフッターバンド |
| FINAL CTA | ダーク#3B3B3B帯 + グラデーションCTA |

# 5. CTA

- 画面追従: 右下固定のグラデーションボタン「ホットペッパーで初回体験を予約」(desktop) / 画面下部固定バー(mobile)
- ボタン: グラデーション背景 / 白文字 / radius 5px / 右矢印
- LINE相談: 白地 + ダーク枠の控えめなセカンダリボタン
- Hot Pepper・LINEの正式URL未設定時は外部CTAを表示しない（README準拠）

# 6. Interaction

- fade-up 20px / 700ms
- 写真カード hover: オーバーレイを僅かに明るく + scale 1.02
- ボタン hover: 明度アップ / active: 1px沈み込み
- prefers-reduced-motion 対応

# 7. SEO / GEO

- A-ver3と同じ構造化データ（HealthClub + Offer + FAQPage）とエンティティ要約文を継承
- `/A-ver4` は比較検証用のため noindex, nofollow
