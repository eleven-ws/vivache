# VIVACHE Design A
## Quiet Luxury Editorial / 静かな上質感で信頼を取る案

### 目的
VIVACHEの「姿勢から、あなたのきれいを設計する」という思想を、静か・上質・知的・女性に寄り添う世界観で表現する。

### A/Bテスト仮説
高級感と余白を強くした方が、完全個室・経験豊富なトレーナー・姿勢設計という価値が伝わり、ホットペッパー予約CTAのクリック率と体験予約率が上がる。

### テストで固定する要素
- FVコピー
- セクション順
- 料金
- CTA文言
- トレーナー経歴
- ホットペッパー予約 / LINE相談導線
- FAQ内容
- 写真素材

変更するのはビジュアルシステム・レイアウト・演出のみ。

---

# 1. Brand Direction

## Design Concept
**CALM BODY ARCHITECTURE**

身体を「鍛える対象」ではなく、丁寧に設計する対象として扱う。
ホテル、建築誌、ウェルネスブランドのような静謐さを持たせる。

### キーワード
Quiet / Refined / Editorial / Architectural / Natural / Intelligent / Private / Timeless

### 避ける表現
- 黒×金のパーソナルジム
- 強い筋肉写真
- ネオンカラー
- ピンク主体
- 美容サロン風の過剰な曲線
- 大量のグラデーション
- 丸カードだらけのSaaS風UI
- 過剰なアニメーション
- 「痩せる」「激変」を煽る赤文字

---

# 2. Color System

```css
:root {
  --color-bg: #F6F3ED;
  --color-surface: #FCFBF8;
  --color-text: #22231F;
  --color-text-muted: #6F706A;
  --color-line: #D8D4CC;
  --color-primary: #707866;
  --color-primary-dark: #4F5749;
  --color-accent: #A99683;
  --color-white: #FFFFFF;
}
```

使用比率：Warm Ivory 70% / Charcoal 15% / Sage 10% / Taupe 5%。

CTAはブランド配色を使用。ホットペッパー予約とLINE相談は、アイコンと文言で役割を区別する。

---

# 3. Typography

日本語：
- 見出し：Noto Serif JP
- 本文：Noto Sans JP

英字：
- 大見出し・数字：Cormorant Garamond または DM Serif Display
- UI：Inter

H1 desktop 64–76px / mobile 40–48px
H2 desktop 42–52px / mobile 30–36px
本文 15–16px / line-height 2.0

---

# 4. Layout System

```txt
max-width: 1180px
desktop side padding: 40px
tablet: 28px
mobile: 20px

section spacing:
desktop 140–180px
mobile 88–112px
```

12カラム。角丸0–8px。影は原則使わず、余白と罫線で構造を作る。

---

# 5. FIRST VIEW

左55%：コピー / 右45%：人物＋空間写真。
min-height 88vh。

```txt
PERSONAL TRAINING & CONDITIONING

美しさは、姿勢から。

姿勢改善 × ボディメイク ＝ VIVACHE

姿勢と身体のラインから、
あなたの理想の「きれい」を設計する。

[ ホットペッパーで初回体験を予約 ]
[ 予約前にLINEで相談する ]

北新地徒歩5分 / 梅田14階 / 完全個室
```

写真は30〜40代女性、自然光、14階の眺望、過度な筋肉表現なし。

---

# 6. PROBLEM

背景を白寄りにし、言葉を読ませる。
見出し：
**「ただ痩せるだけでは、理想の身体になれない。」**

悩み4つを縦並び。アイコンではなく01/02/03/04の数字で整理。

---

# 7. CONCEPT

左右2カラム。
左：ブランドネームの意味とコンセプト文章。
右：美しい立ち姿の人物写真。

大型コピー：
**BODY → CONFIDENCE → LIFE**

補足：
「身体が変われば、自分を見る目が変わる。」

---

# 8. VIVACHE METHOD

```txt
SEE → DESIGN → CONDITION → TRAIN
```

カード化せず、大きな英字＋短い日本語説明＋細い矢印。
Desktop横4列 / Mobile縦1列。

---

# 9. TARGET / BODYMAKE

「悩み」ではなく「理想の身体像」。
- 立ち姿
- ウエスト
- ヒップ
- 後ろ姿
- 年齢を重ねても美しく

写真と短いコピーを交互に配置。

---

# 10. WHY VIVACHE

5つの理由は縦リスト。
01 / TITLE / 2〜3行説明。
区切り線中心でカード化しない。

---

# 11. TRAINER

この案の最重要セクション。

左：縦長ポートレート
右：プロフィール＋実績

```txt
16 YEARS
1,000+ CLIENTS
10+ YEARS CONDITIONING
500+ SUPPORT
AWARD
LECTURER
```

数字をSerifで大きく見せる。

TOPでは「大手パーソナルジム在籍時、最優秀トレーナーとして表彰」。
RIZAP名を出す場合は詳細本文中に1回のみ。

---

# 12. PROGRAM / PRICE

3カテゴリで整理。

PERSONAL TRAINING
- 30min
- 60min
- 90min

SPECIAL PROGRAM
- 短期集中プラン

CONDITIONING
- 整体 / コンディショニング

OPTION
- 食事指導（有料）

60min回数券を主役として軽く強調。
価格は装飾より可読性を優先。

---

# 13. FIRST EXPERIENCE

縦型タイムライン。

```txt
01 WEB予約（ホットペッパー）
02 カウンセリング
03 コンディショニング 30min
04 パーソナルトレーニング 30min
05 プラン提案
```

「無理な勧誘は行いません。」を明記。

---

# 14. PRIVATE STUDIO

写真中心。
- 14階の眺望
- トレーニングエリア
- マシンピラティス
- シャワー / 更衣室

コピー：
**「街の喧騒から少し離れた、自分の身体と向き合う時間。」**

---

# 15. FAQ

border-bottomのみのAccordion。
角丸なし。+ / − icon。hoverでsage。

---

# 16. ACCESS

左右2カラム。
左：Google Map
右：店舗情報

「北新地徒歩5分 / 梅田14階」を大きく表示。

---

# 17. FINAL CTA

背景 #707866 / 文字白。

**「まずは、あなたの理想の身体を一緒に考えることから。」**

ホットペッパー予約を主CTA、LINE相談を小さな副導線として配置。

---

# 18. Interaction

- fade-up 24px
- duration 700ms
- easing cubic-bezier(.22,.61,.36,1)
- image hover scale 1.00 → 1.025 / 600ms
- button 200ms

過剰なパララックスは禁止。

---

# 19. Mobile

- 1-column
- H1 約42px
- section spacing 96px
- sticky CTA 58px
- safe-area対応
- 写真比率4:5
- 料金表は縦カード化し横スクロール禁止

---

# 20. A案の評価指標

1. FV → Hot Pepper予約CTAクリック率
2. Price到達率
3. Trainer到達率
4. Final CTAクリック率
5. LINE相談開始率
6. Hot Pepper上の体験予約完了率

A案の勝ち条件：
- Hot Pepper予約CTAのCTRがB案より高い
- 70%以上のスクロール深度が高い
- 体験予約率が高い
- 30〜40代女性の離脱率が低い
