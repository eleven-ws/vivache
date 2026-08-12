# VIVACHE Design B
## Modern Wellness Graphic / 軽快さと視認性で行動を取る案

### 目的
VIVACHEの価値を、一目で理解できる・行動しやすい・現代的なUIとして表現する。
A案が「静かな高級感」なら、B案は「クリア / ポジティブ / アクティブ / 都会的」。

### A/Bテスト仮説
コピーの視認性、情報ブロックの明快さ、CTAの存在感を強めた方が、ブランドを初見で理解しやすくなり、Hot Pepper予約CTAのクリック率が上がる。

### テストで固定する要素
- FVコピー
- セクション順
- 料金
- CTA文言
- トレーナー経歴
- Hot Pepper予約 / LINE相談導線
- FAQ内容
- 写真素材

変更するのはビジュアルシステム・レイアウト・演出のみ。

---

# 1. Brand Direction

## Design Concept
**POSITIVE BODY SYSTEM**

「姿勢改善 × ボディメイク」を、分かりやすい視覚システムで見せる。
ブランドサイト＋コンバージョンLPの中間。

### キーワード
Modern / Clear / Positive / Urban / Active / Structured / Friendly / Confident

### 避ける表現
- 原色スポーツカラー
- 黒背景主体
- 女性向けピンク
- 複雑な装飾
- 巨大なカード影
- SaaSっぽい青
- TikTok的な派手演出
- 医療・整体院風ブルー

---

# 2. Color System

```css
:root {
  --color-bg: #F8F8F4;
  --color-surface: #FFFFFF;
  --color-text: #202420;
  --color-text-muted: #70756F;
  --color-line: #E3E6DF;
  --color-primary: #63745F;
  --color-primary-soft: #E6ECE2;
  --color-accent: #D4C4AF;
  --color-dark: #273028;
  --color-white: #FFFFFF;
}
```

A案より白を増やし、sageのコントラストを高める。

CTA：
```txt
background: #63745F
text: white
border-radius: 999px
```

---

# 3. Typography

日本語：Noto Sans JP または Zen Kaku Gothic New
英字：Manrope / DM Sans

Serifは基本使用しない。

H1 desktop 68–80px / mobile 42–48px
H2 desktop 44–56px / mobile 30–36px
本文16px / line-height 1.9

---

# 4. Layout System

```txt
max-width: 1240px
desktop side padding: 48px
tablet: 28px
mobile: 20px

section spacing:
desktop 120–150px
mobile 80–96px
```

Radius：10 / 18 / 28 / pill。
A案より「ブロック」で情報を整理する。

---

# 5. FIRST VIEW

Full-width photo + floating text block。

人物＋14階の眺望＋トレーニング設備を全面写真で見せる。
左下に白い半透明パネル。

```txt
美しさは、姿勢から。

姿勢改善 × ボディメイク
＝ VIVACHE

姿勢と身体のラインから、
理想の「きれい」を設計する。

[ ホットペッパーで初回体験を予約 ]
[ 予約前にLINEで相談する ]
```

Feature chips：
- 北新地徒歩5分
- 完全個室
- 手ぶらOK

---

# 6. PROBLEM

背景 #202420 / 文字白。
ページ内で一度だけ大胆に反転。

**「ただ痩せるだけでは、理想の身体になれない。」**

悩み4つを2×2グリッド。

---

# 7. CONCEPT

巨大タイポグラフィでEquationを見せる。

```txt
POSTURE
   ×
BODYMAKE
   =
VIVACHE
```

横にブランド説明。
**VIVACHE = いきいきと、前向きに。**

---

# 8. METHOD

ここだけ4カードで明快に整理。

```txt
01 SEE
02 DESIGN
03 CONDITION
04 TRAIN
```

icon + title + short description。
hoverでtranslateY(-4px)。

---

# 9. TARGET / BODYMAKE

2×2画像グリッド。

- 立ち姿
- ウエスト
- ヒップ
- 後ろ姿

写真に短いコピーをoverlay。
Before/Afterではなく「理想イメージ」であることを明示。

---

# 10. WHY VIVACHE

5項目を2+3グリッド。
icon circle + title + 2行説明。

「経験豊富なトレーナーが一貫担当」を大きめにして主役化。

---

# 11. TRAINER

Hero-style section。

左：大きなトレーナー写真
右：数字カード2列3行

```txt
16 YEARS
1,000+
AWARD
10+ YEARS
500+
LECTURER
```

A案より数字を強く見せる。

Key Copy：
**「約16年の経験を、あなた一人の身体のために。」**

---

# 12. PROGRAM

大カテゴリで整理。

PERSONAL
- 30
- 60
- 90

INTENSIVE
- 集中プラン

CONDITIONING
- 整体 / コンディショニング

OPTION
- 食事指導

60minにRECOMMENDED badge。

---

# 13. PRICE

B案では価格を強く見せる。

60min回数券を中央大型カード。
他プランはサブ。

price 36–42px。
「結局いくら？」をすぐ解消する。

---

# 14. FIRST EXPERIENCE

horizontal timeline。

```txt
WEB予約
→ COUNSELING
→ CONDITION
→ TRAIN
→ PROPOSAL
```

背景primary-soft。

badge：
**無理な勧誘はありません**

CTA：
**ホットペッパーで初回体験を予約する**

---

# 15. PRIVATE STUDIO

Bento Grid。

- 大：眺望
- 中：トレーニング空間
- 小：マシンピラティス
- 小：シャワー
- 小：更衣室

Overlay：
**梅田14階 / PRIVATE STUDIO**

Feature chips：
- 完全個室
- 完全予約
- 手ぶらOK
- シャワーあり
- ウェア / シューズ / タオル

---

# 16. FAQ

white card / radius 14px / border。
+ icon circle。

回答open時にprimary-soft背景。

---

# 17. ACCESS

Mapを全幅で大きく。
上にfloating information card。

```txt
VIVACHE
北新地徒歩5分
梅田14階
平日 10:00–22:00
土日 不定休
```

---

# 18. FINAL CTA

photo + dark overlay。

**「美しさは、姿勢から。」**

「あなたの理想の身体を、一緒に考えることから始めませんか。」

大きなHot Pepper予約CTAと、小さなLINE相談導線。

---

# 19. Interaction

- section fade-up 16px / 450ms
- cards hover y -4px / 180ms
- CTA hover scale 1.02 / 160ms
- Mobile sticky CTA bottom 12px
- safe-area対応

A案より反応を速くする。

---

# 20. Mobile

- FV image height 68vh
- text panel bottom overlay
- section title 32px
- card gap 12px
- CTA min-height 56px
- touch target 48px以上
- 料金はカード化
- horizontal scroll UI禁止

---

# 21. B案の評価指標

1. FV CTA CTR
2. 25 / 50 / 75 / 100% scroll
3. Trainer section滞在率
4. Price section到達率
5. Final CTA CTR
6. LINE相談開始率
7. 体験予約率

B案の勝ち条件：
- FV CTA CTRがAより高い
- Price到達前の離脱が少ない
- Hot Pepper予約CTAのクリック率が高い
- Mobile CVが高い

---

# 22. A案との比較

| 項目 | Design A | Design B |
|---|---|---|
| 印象 | 静か・高級 | 明快・現代的 |
| 参考方向 | ホテル・建築誌 | Wellness Brand |
| Typography | Serif + Sans | Sans中心 |
| CTA | 控えめ | 明確 |
| 写真 | Editorial | Dynamic |
| Layout | 余白・罫線 | Grid・Block |
| Radius | 小さい | 中程度 |
| Animation | ゆっくり | 軽快 |
| Main Strength | ブランド信頼 | 理解・CV |
| 仮説 | 高級感で選ばれる | 分かりやすさで動く |
