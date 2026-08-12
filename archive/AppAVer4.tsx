import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Minus,
  Plus,
  X,
} from "lucide-react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import conditioningImage from "../image/conditioning-session.webp";
import heroImage from "../image/hero-session.webp";
import movementImage from "../image/movement-session.jpg";
import postureConsultationImage from "../image/posture-consultation.jpg";
import studioImage from "../image/private-studio.webp";
import trainerImage from "../image/trainer-portrait.webp";
import {
  BODY_GOALS,
  EXPERIENCE_STEPS,
  FAQS,
  INTENSIVE_PRICES,
  METHODS,
  NAV_ITEMS,
  PROBLEMS,
  PROGRAMS,
  REASONS,
} from "./content";
import { SITE_CONFIG, trackEvent, type TrackingEvent } from "./siteConfig";

const isHotPepperReady = SITE_CONFIG.HOTPEPPER_URL.trim().length > 0;
const isLineReady =
  SITE_CONFIG.LINE_URL.trim().length > 0 && SITE_CONFIG.LINE_URL !== "https://line.me/";

const NAV_JA: Record<string, string> = {
  CONCEPT: "コンセプト",
  METHOD: "メソッド",
  TRAINER: "トレーナー",
  PROGRAM: "プログラム",
  PRICE: "料金",
  FAQ: "よくある質問",
};

const GOAL_IMAGES = [
  postureConsultationImage,
  conditioningImage,
  movementImage,
  heroImage,
] as const;

const PRICE_NOTES = [
  {
    title: "支払い方法",
    body: "クレジットカード、QRコード決済、現金がご利用いただけます。対応ブランドはご予約時にご確認ください。",
  },
  {
    title: "予約・キャンセル",
    body: "ご予約はホットペッパーから。キャンセルは前日まで、日時の変更は空き状況に応じて当日でも対応します。",
  },
  {
    title: "レンタル",
    body: "ウェア、シューズ、タオルをご用意しています。ウォーターサーバーもあるので、手ぶらでどうぞ。",
  },
] as const;

type ActionProps = {
  event: TrackingEvent;
  children: ReactNode;
  className?: string;
  supportText?: string;
};

function BookingAction({ event, children, className = "", supportText }: ActionProps) {
  if (!isHotPepperReady) return null;

  return (
    <div className={`av4-action-wrap ${className}`.trim()}>
      <a
        className="av4-booking"
        href={SITE_CONFIG.HOTPEPPER_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent(event)}
        aria-label={`${String(children)}（ホットペッパーが開きます）`}
      >
        <span>{children}</span>
        <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
      </a>
      {supportText && <p className="av4-action-support">{supportText}</p>}
    </div>
  );
}

function LineAction({ event, children, className = "", supportText }: ActionProps) {
  if (!isLineReady) return null;

  return (
    <div className={`av4-action-wrap ${className}`.trim()}>
      <a
        className="av4-line"
        href={SITE_CONFIG.LINE_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent(event)}
        aria-label={`${String(children)}（LINEが開きます）`}
      >
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
      </a>
      {supportText && <p className="av4-action-support">{supportText}</p>}
    </div>
  );
}

type HeadingProps = {
  en: string;
  ja: string;
  aside?: ReactNode;
  light?: boolean;
};

function Heading({ en, ja, aside, light = false }: HeadingProps) {
  return (
    <header className={`av4-heading${light ? " av4-heading--light" : ""}`}>
      <div className="av4-heading-main">
        <span className="av4-heading-slash" aria-hidden="true" />
        <div>
          <p className="av4-heading-en">{en}</p>
          <p className="av4-heading-ja">{ja}</p>
        </div>
      </div>
      {aside && <p className="av4-heading-aside">{aside}</p>}
    </header>
  );
}

function useAVer4Interactions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".av4-reveal"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -6%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sent = new Set<number>();
    let frame = 0;
    const thresholds = [25, 50, 75, 100] as const;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
        thresholds.forEach((threshold) => {
          if (percent >= threshold && !sent.has(threshold)) {
            sent.add(threshold);
            trackEvent(`scroll_${threshold}` as TrackingEvent);
          }
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const program = document.getElementById("program");
    if (!program || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("program_view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(program);
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className={`av4-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="av4-header-inner">
        <a className="av4-brand" href="#top" aria-label="VIVACHE トップへ">
          <strong>VIVACHE</strong>
          <span>PERSONAL STUDIO</span>
        </a>
        <nav
          id="av4-navigation"
          className={`av4-nav${isOpen ? " is-open" : ""}`}
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              <span className="av4-nav-en">{item.label}</span>
              <span className="av4-nav-ja">{NAV_JA[item.label]}</span>
            </a>
          ))}
        </nav>
        <button
          className="av4-menu-button"
          type="button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="av4-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="av4-hero" id="top" aria-labelledby="av4-hero-title">
      <img
        className="av4-hero-bg"
        src={studioImage}
        alt=""
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
      />
      <div className="av4-hero-scrim" aria-hidden="true" />
      <div className="av4-hero-content">
        <p className="av4-hero-kicker">PERSONAL TRAINING &amp; CONDITIONING</p>
        <h1 id="av4-hero-title">
          美しさは、
          <br />
          姿勢から。
        </h1>
        <p className="av4-hero-formula">姿勢改善 × ボディメイク ＝ VIVACHE</p>
        <p className="av4-hero-description">
          姿勢と身体のラインから、あなたの理想の「きれい」を設計する。
        </p>
        <div className="av4-hero-actions">
          <BookingAction
            event="hotpepper_click_fv"
            supportText="空き状況を確認して、そのまま予約できます。"
          >
            ホットペッパーで初回体験を予約
          </BookingAction>
          <LineAction event="line_click_fv">予約前にLINEで相談する</LineAction>
        </div>
        <ul className="av4-hero-meta" aria-label="店舗の特徴">
          <li>北新地徒歩5分</li>
          <li>梅田14階</li>
          <li>完全個室</li>
        </ul>
      </div>
      <p className="av4-scroll-cue" aria-hidden="true">
        <span>SCROLL</span>
      </p>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="av4-problem av4-section" id="problem" aria-labelledby="av4-problem-title">
      <div className="av4-container">
        <Heading en="PROBLEM" ja="こんな経験はありませんか" />
        <div className="av4-problem-statement av4-reveal">
          <h2 id="av4-problem-title">ただ痩せるだけでは、理想の身体になれない。</h2>
          <p>
            体重は落ちたのに、鏡の中の立ち姿はあまり変わらない。カウンセリングでよく伺うのは、そんな経験です。服を着たときの印象を決めているのは、体重計の数字よりも姿勢と身体のラインです。
          </p>
        </div>
        <ol className="av4-problem-grid">
          {PROBLEMS.map((problem, index) => (
            <li className="av4-card av4-reveal" key={problem}>
              <span className="av4-card-number">{String(index + 1).padStart(2, "0")}</span>
              <p>{problem}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ConceptSection() {
  return (
    <section className="av4-concept av4-section" id="concept" aria-labelledby="av4-concept-title">
      <div className="av4-container av4-concept-grid">
        <div className="av4-concept-copy">
          <Heading en="CONCEPT" ja="コンセプト" />
          <h2 id="av4-concept-title" className="av4-statement">
            「整えてから、鍛える。」
          </h2>
          <p className="av4-text">
            最初に確認するのは、今の姿勢と動きの癖です。目指す姿を言葉にしてから、必要な順番を決める。鍛えるのは、そのあとで十分です。
          </p>
          <p className="av4-text">
            VIVACHEという名前には「いきいきと、前向きに。」という意味を込めました。身体が変わると、自分を見る目が変わる。その入り口が姿勢だと考えています。
          </p>
        </div>
        <figure className="av4-offset-photo av4-reveal">
          <img
            src={postureConsultationImage}
            alt="鏡の前で姿勢を確認する女性とトレーナー"
            width={1200}
            height={1500}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="av4-method av4-section av4-skew-top" id="method" aria-labelledby="av4-method-heading">
      <div className="av4-container">
        <Heading
          en="METHOD"
          ja="VIVACHEメソッド"
          aside="毎回のセッションを、この順番で組み立てます"
        />
        <p className="av4-section-intro" id="av4-method-heading">
          理想から逆算する、4つのステップ。姿勢を見ないまま鍛え始めることはありません。
        </p>
        <ol className="av4-method-grid">
          {METHODS.map((method, index) => (
            <li
              className="av4-card av4-method-card av4-reveal"
              key={method.key}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className="av4-method-number">0{index + 1}</span>
              <p className="av4-method-key">{method.key}</p>
              <h3>{method.title}</h3>
              <p className="av4-method-body">{method.body}</p>
            </li>
          ))}
        </ol>
        <p className="av4-note">マシンピラティスは、必要に応じてセッションの中で組み合わせます。</p>
        <BookingAction event="hotpepper_click_method" className="av4-section-action">
          初回体験の空き状況を確認する
        </BookingAction>
      </div>
    </section>
  );
}

function BodymakeSection() {
  return (
    <section className="av4-bodymake av4-section" id="bodymake" aria-labelledby="av4-bodymake-heading">
      <div className="av4-container">
        <Heading en="BODYMAKE" ja="目指す身体" />
        <p className="av4-section-intro" id="av4-bodymake-heading">
          目指す「きれい」は、人によって違う。気になる部位だけを追い込むより、全身のつながりを見た方が、立ち姿は自然に変わります。
        </p>
        <ol className="av4-goal-grid">
          {BODY_GOALS.map((goal, index) => (
            <li className="av4-photo-card av4-reveal" key={goal.number}>
              <img
                src={GOAL_IMAGES[index]}
                alt=""
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
              <span className="av4-photo-card-frame" aria-hidden="true" />
              <div className="av4-photo-card-label">
                <h3>{goal.title}</h3>
                <p>{goal.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="av4-fine-print">掲載写真はイメージです。身体の変化には個人差があります。</p>
      </div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="av4-reasons av4-section" id="reasons" aria-labelledby="av4-reasons-heading">
      <div className="av4-container">
        <Heading en="REASON" ja="通い続けられる理由" />
        <p className="av4-section-intro" id="av4-reasons-heading">
          始める前に知りたいことを、先に書いておきます。
        </p>
        <ol className="av4-reason-list">
          {REASONS.map((reason, index) => (
            <li className="av4-reveal" key={reason.title}>
              <span className="av4-reason-number">0{index + 1}</span>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TrainerSection() {
  return (
    <section className="av4-trainer av4-section av4-skew-top" id="trainer" aria-labelledby="av4-trainer-heading">
      <div className="av4-container">
        <Heading en="TRAINER" ja="トレーナー紹介" />
        <div className="av4-trainer-card av4-reveal">
          <figure className="av4-trainer-photo">
            <img
              src={trainerImage}
              alt="VIVACHEの担当パーソナルトレーナー"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="av4-trainer-body">
            <h3 id="av4-trainer-heading" className="av4-trainer-message">
              約16年の経験を、あなたの理想の「きれい」のために。
            </h3>
            <p className="av4-profile-label">PROFILE</p>
            <div className="av4-trainer-bio">
              <p>
                トレーナー専門学校を卒業後、フィットネスジムで2年、大手パーソナルジムで3年。在籍中に最優秀トレーナーとして表彰を受け、独立しました。以来、約1,000名の身体づくりに携わっています。
              </p>
              <p>
                コンディショニングの経験は10年以上。500名以上の身体の悩みと向き合ってきました。鍛える前に整える、という順番はこの経験から来ています。
              </p>
            </div>
            <ul className="av4-trainer-facts">
              <li>大手パーソナルジム在籍時、最優秀トレーナーとして表彰</li>
              <li>栄養学・トレーニング・実技研修などのセミナー講師経験</li>
              <li>カウンセリングから毎回のセッションまで、同じトレーナーが担当</li>
            </ul>
            <p className="av4-fine-print">※経歴・実績数値は公開前に本人確認のうえ確定します。</p>
            <LineAction event="line_click_trainer" supportText="ご質問だけでもお気軽にどうぞ。">
              身体の悩みをLINEで相談する
            </LineAction>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section className="av4-program av4-section" id="program" aria-labelledby="av4-program-heading">
      <div className="av4-container">
        <Heading en="PROGRAM" ja="プログラム" />
        <p className="av4-section-intro" id="av4-program-heading">
          主力は60分のパーソナルトレーニングです。通える頻度を伺ってからご提案します。
        </p>
        <ol className="av4-program-grid">
          {PROGRAMS.map((program) => (
            <li
              className={`av4-card av4-program-card av4-reveal${program.recommended ? " is-main" : ""}`}
              key={program.duration}
            >
              <p className="av4-program-duration">
                <strong>{program.duration}</strong>
                <span>MIN</span>
              </p>
              <h3>{program.title}</h3>
              <p className="av4-program-body">{program.body}</p>
            </li>
          ))}
        </ol>
        <p className="av4-note">
          このほかに、短期集中プラン、整体・コンディショニング、食事指導（有料オプション）があります。
        </p>
      </div>
    </section>
  );
}

function PriceSection() {
  return (
    <section className="av4-price av4-section av4-skew-top" id="price" aria-labelledby="av4-price-heading">
      <div className="av4-container">
        <Heading en="PRICE" ja="メニュー・料金" aside="※全て税込価格" />
        <p className="av4-section-intro" id="av4-price-heading">
          確定している短期集中プランの料金です。60分回数券などその他の料金は、LINEで先にご案内できます。
        </p>
        <div className="av4-price-table-wrap av4-reveal">
          <table className="av4-price-table">
            <caption className="av4-visually-hidden">短期集中プランの料金一覧（税込）</caption>
            <thead>
              <tr>
                <th scope="col">プラン</th>
                <th scope="col">回数</th>
                <th scope="col">料金（税込）</th>
              </tr>
            </thead>
            <tbody>
              {INTENSIVE_PRICES.map((price) => (
                <tr key={price.name}>
                  <th scope="row">{price.name}</th>
                  <td>{price.count}</td>
                  <td className="av4-price-value">{price.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="av4-price-notes">
          {PRICE_NOTES.map((note) => (
            <article className="av4-card av4-price-note av4-reveal" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </article>
          ))}
        </div>
        <p className="av4-note">
          ご契約は内容と料金にご納得いただいてからで大丈夫です。無理な勧誘は行いません。
        </p>
        <LineAction
          event="line_click_price"
          className="av4-section-action"
          supportText="ご質問だけでもお気軽にどうぞ。"
        >
          料金やプランをLINEで相談する
        </LineAction>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="av4-experience av4-section" id="experience" aria-labelledby="av4-experience-heading">
      <div className="av4-container av4-experience-grid">
        <div className="av4-experience-copy">
          <Heading en="FLOW" ja="初回体験の流れ" />
          <p className="av4-section-intro" id="av4-experience-heading">
            初回体験は60分。カウンセリングのあと、整える30分と鍛える30分を続けて体験できます。持ち物は要りません。
          </p>
          <p className="av4-no-pressure">
            体験後にプランのご案内はしますが、その場で契約を求めることはありません。
          </p>
          <BookingAction event="hotpepper_click_experience" supportText="空き状況を見て日時を選べます。">
            ホットペッパーで初回体験を予約
          </BookingAction>
        </div>
        <ol className="av4-experience-steps">
          {EXPERIENCE_STEPS.map((step) => (
            <li className="av4-reveal" key={step.step}>
              <span className="av4-step-number">{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="av4-studio av4-section" id="studio" aria-labelledby="av4-studio-heading">
      <div className="av4-container">
        <Heading en="STUDIO" ja="スタジオ" />
        <p className="av4-section-intro" id="av4-studio-heading">
          街の喧騒から少し離れた、自分の身体と向き合う時間。北新地から徒歩5分、梅田14階。セッション中はお客様1名とトレーナー1名だけの完全個室です。
        </p>
        <div className="av4-studio-gallery">
          <figure className="av4-studio-main av4-reveal">
            <img
              src={studioImage}
              alt="大阪の街を望む、梅田14階の完全個室トレーニングスタジオ"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <figcaption>パワーラックとマシンピラティスを備えたトレーニングエリア</figcaption>
          </figure>
          <figure className="av4-studio-sub av4-reveal">
            <img
              src={movementImage}
              alt="窓際で身体の動きを確認する女性とトレーナー"
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="av4-studio-sub av4-reveal">
            <img
              src={conditioningImage}
              alt="マットの上で姿勢を整える女性とトレーナー"
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <dl className="av4-studio-amenities av4-reveal">
          <div>
            <dt>設備</dt>
            <dd>パワーラック / マシンピラティス / シャワー / 更衣室</dd>
          </div>
          <div>
            <dt>レンタル</dt>
            <dd>ウェア / シューズ / タオル（ウォーターサーバーあり）</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="av4-faq av4-section" id="faq" aria-labelledby="av4-faq-heading">
      <div className="av4-container">
        <Heading
          en="FAQ"
          ja="よくある質問"
          aside="ここにない質問は、LINEからどうぞ"
        />
        <div className="av4-faq-list" id="av4-faq-heading">
          {FAQS.map((faq, index) => (
            <details
              className="av4-faq-item av4-reveal"
              key={faq.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent("faq_open", { index, question: faq.question });
                }
              }}
            >
              <summary>
                <span>{faq.question}</span>
                <Plus className="av4-faq-plus" aria-hidden="true" size={19} strokeWidth={1.6} />
                <Minus className="av4-faq-minus" aria-hidden="true" size={19} strokeWidth={1.6} />
              </summary>
              <p className="av4-faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className="av4-access av4-section" id="access" aria-labelledby="av4-access-heading">
      <div className="av4-container">
        <Heading en="ACCESS" ja="アクセス" />
        <div className="av4-access-grid av4-reveal" id="av4-access-heading">
          <div className="av4-access-map">
            <iframe
              src={SITE_CONFIG.MAP_EMBED_URL}
              title="VIVACHE所在地のGoogleマップ"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="av4-access-info">
            <h3>{SITE_CONFIG.LOCATION_SHORT}</h3>
            <dl>
              <div>
                <dt>所在地</dt>
                <dd>
                  <address>{SITE_CONFIG.ADDRESS}</address>
                </dd>
              </div>
              <div>
                <dt>営業時間</dt>
                <dd>{SITE_CONFIG.OPENING_HOURS}</dd>
              </div>
              <div>
                <dt>土日</dt>
                <dd>{SITE_CONFIG.WEEKEND_HOURS}</dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>専用駐車場なし。近隣のコインパーキングをご利用ください。</dd>
              </div>
            </dl>
            <a className="av4-text-link" href={SITE_CONFIG.MAP_URL} target="_blank" rel="noreferrer">
              Google Mapsで開く
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
            <p className="av4-fine-print">※電話番号は公開前に追記します。</p>
          </div>
        </div>
        <p className="av4-access-summary">
          VIVACHEは、大阪・梅田/北新地エリアの完全個室パーソナルジムです。姿勢改善とボディメイクを組み合わせ、30〜40代の女性を中心に、一人ひとりの理想の「きれい」に合わせた身体づくりをサポートしています。仕事帰りも、手ぶらで。
        </p>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="av4-final" aria-labelledby="av4-final-title">
      <div className="av4-container av4-final-inner av4-reveal">
        <p className="av4-final-en">FIRST SESSION / 60 MIN</p>
        <h2 id="av4-final-title">
          まずは、あなたの理想の身体を
          <br />
          一緒に考えることから。
        </h2>
        <p className="av4-final-lead">初回体験60分で、今の姿勢と、これからの進め方をお話しします。</p>
        <BookingAction
          event="hotpepper_click_final"
          className="av4-final-booking"
          supportText="空き状況を見て日時を選べます。"
        >
          ホットペッパーで初回体験を予約
        </BookingAction>
        <LineAction event="line_click_final">予約前にLINEで相談する</LineAction>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="av4-footer">
      <div className="av4-container av4-footer-inner">
        <a className="av4-footer-top" href="#top">
          TOP
        </a>
        <div className="av4-footer-note">
          <p className="av4-footer-brand">VIVACHE</p>
          <p>姿勢改善 × ボディメイク。北新地・梅田の完全個室パーソナルジム。</p>
          <address>{SITE_CONFIG.ADDRESS}</address>
        </div>
        <nav className="av4-footer-nav" aria-label="フッターナビゲーション">
          <a href="#faq">FAQ</a>
          <a href="#access">ACCESS</a>
          <span>© VIVACHE</span>
        </nav>
      </div>
    </footer>
  );
}

function MobileBookingBar() {
  if (!isHotPepperReady) return null;

  return (
    <div className="av4-mobile-bar" aria-label="予約導線">
      <a
        href={SITE_CONFIG.HOTPEPPER_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("hotpepper_click_floating")}
      >
        ホットペッパーで初回体験を予約
      </a>
    </div>
  );
}

function FloatingBooking() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!isHotPepperReady) return null;

  return (
    <aside className={`av4-floating${isVisible ? " is-visible" : ""}`} aria-label="予約導線">
      <a
        href={SITE_CONFIG.HOTPEPPER_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("hotpepper_click_floating")}
      >
        ホットペッパーで初回体験を予約
        <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
      </a>
    </aside>
  );
}

function SeoStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthClub", "LocalBusiness"],
        "@id": "https://vivache.jp/#business",
        name: "VIVACHE",
        url: "https://vivache.jp/",
        description:
          "北新地徒歩5分、梅田14階の完全個室パーソナルジム。姿勢改善とボディメイクを組み合わせ、30〜40代女性を中心に一人ひとりの身体づくりをサポートします。",
        image: "https://vivache.jp/image/hero-session.webp",
        areaServed: ["北新地", "梅田", "大阪市北区", "大阪市"],
        address: {
          "@type": "PostalAddress",
          postalCode: "530-0047",
          addressRegion: "大阪府",
          addressLocality: "大阪市北区",
          streetAddress: "西天満4丁目15-18 プラザ梅新 1402",
          addressCountry: "JP",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "22:00",
          },
        ],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "完全個室", value: true },
          { "@type": "LocationFeatureSpecification", name: "シャワー", value: true },
          { "@type": "LocationFeatureSpecification", name: "ウェア・シューズ・タオルレンタル", value: true },
        ],
        makesOffer: INTENSIVE_PRICES.map((price) => ({
          "@type": "Offer",
          name: `${price.name}（${price.count}）`,
          price: price.price.replace(/[^0-9]/g, ""),
          priceCurrency: "JPY",
        })),
        priceRange: "¥¥",
      },
      {
        "@type": "FAQPage",
        "@id": "https://vivache.jp/#faq",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function AppAVer4() {
  useAVer4Interactions();

  return (
    <div className={`av4-site${isHotPepperReady ? " av4-has-bar" : ""}`}>
      <SeoStructuredData />
      <a className="skip-link" href="#av4-main">
        本文へ移動
      </a>
      <Header />
      <main id="av4-main">
        <HeroSection />
        <ProblemSection />
        <ConceptSection />
        <MethodSection />
        <BodymakeSection />
        <ReasonsSection />
        <TrainerSection />
        <ProgramSection />
        <PriceSection />
        <ExperienceSection />
        <StudioSection />
        <FaqSection />
        <AccessSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <FloatingBooking />
      <MobileBookingBar />
    </div>
  );
}
