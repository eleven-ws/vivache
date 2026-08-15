import {
  ArrowRight,
  ArrowUp,
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
import logotypeImage from "../image/vivache-logotype.png";
import logotypeLightImage from "../image/vivache-logotype-light.png";
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

const HERO_IMAGES = [
  { src: studioImage, width: 1536, height: 1024 },
  { src: heroImage, width: 1672, height: 941 },
  { src: conditioningImage, width: 1448, height: 1086 },
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
  showWhenUnavailable?: boolean;
};

function BookingAction({
  event,
  children,
  className = "",
  supportText,
  showWhenUnavailable = false,
}: ActionProps) {
  if (!isHotPepperReady && !showWhenUnavailable) return null;

  return (
    <div className={`av5-action-wrap ${className}`.trim()}>
      <a
        className={`av5-booking${isHotPepperReady ? "" : " is-disabled"}`}
        href={isHotPepperReady ? SITE_CONFIG.HOTPEPPER_URL : undefined}
        target={isHotPepperReady ? "_blank" : undefined}
        rel={isHotPepperReady ? "noreferrer" : undefined}
        onClick={(clickEvent) => {
          if (!isHotPepperReady) {
            clickEvent.preventDefault();
            return;
          }
          trackEvent(event);
        }}
        aria-disabled={!isHotPepperReady || undefined}
        aria-label={`${String(children)}（${isHotPepperReady ? "ホットペッパーが開きます" : "予約リンク準備中"}）`}
        title={isHotPepperReady ? undefined : "予約ページのURLを設定後に利用できます"}
      >
        <span>{children}</span>
        <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
      </a>
      {supportText && <p className="av5-action-support">{supportText}</p>}
    </div>
  );
}

function LineAction({
  event,
  children,
  className = "",
  supportText,
  showWhenUnavailable = false,
}: ActionProps) {
  if (!isLineReady && !showWhenUnavailable) return null;

  return (
    <div className={`av5-action-wrap ${className}`.trim()}>
      <a
        className={`av5-line${isLineReady ? "" : " is-disabled"}`}
        href={isLineReady ? SITE_CONFIG.LINE_URL : undefined}
        target={isLineReady ? "_blank" : undefined}
        rel={isLineReady ? "noreferrer" : undefined}
        onClick={(clickEvent) => {
          if (!isLineReady) {
            clickEvent.preventDefault();
            return;
          }
          trackEvent(event);
        }}
        aria-disabled={!isLineReady || undefined}
        aria-label={`${String(children)}（${isLineReady ? "LINEが開きます" : "LINEリンク準備中"}）`}
        title={isLineReady ? undefined : "LINE公式アカウントのURLを設定後に利用できます"}
      >
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
      </a>
      {supportText && <p className="av5-action-support">{supportText}</p>}
    </div>
  );
}

type HeadingProps = {
  en: string;
  ja: string;
  aside?: ReactNode;
  light?: boolean;
};

/** 縦のグラデーションバー＝姿勢の軸をモチーフにした見出し */
function Heading({ en, ja, aside, light = false }: HeadingProps) {
  return (
    <header className={`av5-heading${light ? " av5-heading--light" : ""}`}>
      <div className="av5-heading-main">
        <span className="av5-heading-axis" aria-hidden="true" />
        <div>
          <p className="av5-heading-en">{en}</p>
          <p className="av5-heading-ja">{ja}</p>
        </div>
        <span className="av5-heading-rule" aria-hidden="true" />
      </div>
      {aside && <p className="av5-heading-aside">{aside}</p>}
    </header>
  );
}

function useAVer5Interactions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".av5-reveal"));
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
    <header className={`av5-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="av5-header-inner">
        <a className="av5-brand" href="#top" aria-label="VIVACHE トップへ">
          <img src={logotypeImage} alt="VIVACHE PERSONAL GYM" width={1034} height={217} />
        </a>
        <nav
          id="av5-navigation"
          className={`av5-nav${isOpen ? " is-open" : ""}`}
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              <span className="av5-nav-en">{item.label}</span>
              <span className="av5-nav-ja">{NAV_JA[item.label]}</span>
            </a>
          ))}
        </nav>
        <button
          className="av5-menu-button"
          type="button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="av5-navigation"
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
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="av5-hero" id="top" aria-labelledby="av5-hero-title">
      <div className="av5-hero-frame">
        <div className="av5-hero-images" aria-hidden="true">
          {HERO_IMAGES.map((image, index) => (
            <img
              className={`av5-hero-bg${index === activeImage ? " is-active" : ""}`}
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              key={image.src}
            />
          ))}
        </div>
        <div className="av5-hero-scrim" aria-hidden="true" />
        <div className="av5-hero-content">
          <p className="av5-hero-kicker">PERSONAL TRAINING &amp; CONDITIONING</p>
          <h1 id="av5-hero-title">
            美しさは、
            <br />
            姿勢から。
          </h1>
          <p className="av5-hero-formula">姿勢改善 × ボディメイク ＝ VIVACHE</p>
          <p className="av5-hero-description">
            姿勢と身体のラインから、あなたの理想の「きれい」を設計する。
          </p>
          <div className="av5-hero-actions">
            <BookingAction
              event="hotpepper_click_fv"
              supportText="空き状況を確認して、そのまま予約できます。"
            >
              ホットペッパーで初回体験を予約
            </BookingAction>
            <LineAction event="line_click_fv">予約前にLINEで相談する</LineAction>
          </div>
        </div>
      </div>
      <ul className="av5-hero-chips" aria-label="店舗の特徴">
        <li>北新地徒歩5分</li>
        <li>梅田14階・完全個室</li>
        <li>手ぶらOK・平日22時まで</li>
      </ul>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="av5-problem av5-section av5-band av5-band--soft" id="problem" aria-labelledby="av5-problem-title">
      <div className="av5-container">
        <Heading en="PROBLEM" ja="こんな経験はありませんか" />
        <div className="av5-problem-statement av5-reveal">
          <h2 id="av5-problem-title">ただ痩せるだけでは、理想の身体になれない。</h2>
          <p>
            体重は落ちたのに、鏡の中の立ち姿はあまり変わらない。カウンセリングでよく伺うのは、そんな経験です。服を着たときの印象を決めているのは、体重計の数字よりも姿勢と身体のラインです。
          </p>
        </div>
        <ol className="av5-problem-grid">
          {PROBLEMS.map((problem, index) => (
            <li className="av5-card av5-reveal" key={problem}>
              <span className="av5-card-number">{String(index + 1).padStart(2, "0")}</span>
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
    <section className="av5-concept av5-section" id="concept" aria-labelledby="av5-concept-title">
      <div className="av5-container av5-concept-grid">
        <div className="av5-concept-copy">
          <Heading en="CONCEPT" ja="コンセプト" />
          <h2 id="av5-concept-title" className="av5-statement">
            美しさは、姿勢から。
          </h2>
          <p className="av5-text">
            どれだけ鍛えても、身体の土台である姿勢が崩れたままでは、本当の美しさには近づけません。VIVACHEは、骨盤や肩甲骨から丁寧に整え、一人ひとりの「なりたい姿」から身体づくりを考えます。
          </p>
          <p className="av5-text">
            ただ痩せるだけでも、ただ鍛えるだけでもない。目指すのは、理想の先にある、あなたらしい「きれい」。身体が変わり、自信が生まれることで、毎日が少しずつ前向きになります。
          </p>
          <p className="av5-text">
            VIVACHEという名前には「いきいきと、前向きに。」という想いを込めています。身体を整え、心まで前向きになれる場所を、私たちはつくります。
          </p>
        </div>
        <figure className="av5-offset-photo av5-reveal">
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
    <section className="av5-method av5-section av5-band av5-band--main" id="method" aria-labelledby="av5-method-heading">
      <div className="av5-container">
        <Heading en="METHOD" ja="VIVACHEメソッド" />
        <p className="av5-section-intro" id="av5-method-heading">
          理想から逆算する、4つのステップ。姿勢を見ないまま鍛え始めることはありません。
        </p>
        <ol className="av5-method-grid">
          {METHODS.map((method, index) => (
            <li
              className="av5-card av5-method-card av5-reveal"
              key={method.key}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className="av5-method-number">0{index + 1}</span>
              <p className="av5-method-key">{method.key}</p>
              <h3>{method.title}</h3>
              <p className="av5-method-body">{method.body}</p>
            </li>
          ))}
        </ol>
        <BookingAction event="hotpepper_click_method" className="av5-section-action">
          初回体験の空き状況を確認する
        </BookingAction>
      </div>
    </section>
  );
}

function BodymakeSection() {
  return (
    <section className="av5-bodymake av5-section" id="bodymake" aria-labelledby="av5-bodymake-heading">
      <div className="av5-container">
        <Heading en="BODYMAKE" ja="目指す身体" />
        <p className="av5-section-intro av5-section-intro--wide" id="av5-bodymake-heading">
          目指す身体は、千差万別。気になる部位を変えていくために、全身のバランスからつながりを作って整えます。
        </p>
        <ol className="av5-goal-grid">
          {BODY_GOALS.map((goal, index) => (
            <li className="av5-photo-card av5-reveal" key={goal.number}>
              <img
                src={GOAL_IMAGES[index]}
                alt=""
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
              <div className="av5-photo-card-label">
                <h3>{goal.title}</h3>
                <p>{goal.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="av5-fine-print">掲載写真はイメージです。身体の変化には個人差があります。</p>
      </div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="av5-reasons av5-section" id="reasons" aria-label="通い続けられる理由">
      <div className="av5-container">
        <Heading en="REASON" ja="通い続けられる理由" />
        <ol className="av5-reason-list">
          {REASONS.map((reason, index) => (
            <li className="av5-reveal" key={reason.title}>
              <span className="av5-reason-number">0{index + 1}</span>
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
    <section className="av5-trainer av5-section av5-band av5-band--main" id="trainer" aria-labelledby="av5-trainer-heading">
      <div className="av5-container">
        <Heading en="TRAINER" ja="トレーナー紹介" />
        <div className="av5-trainer-card av5-reveal">
          <figure className="av5-trainer-photo">
            <img
              src={trainerImage}
              alt="VIVACHEの担当パーソナルトレーナー 田坂 昂大"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="av5-trainer-body">
            <h3 id="av5-trainer-heading" className="av5-trainer-message">
              約16年の経験を、あなたの理想の
              <br />
              「きれい」のために。
            </h3>
            <p className="av5-trainer-name">田坂 昂大</p>
            <p className="av5-profile-label">PROFILE</p>
            <div className="av5-trainer-bio">
              <p>
                トレーナー専門学校を卒業後、フィットネスジムで2年、大手パーソナルジムで3年。在籍中に最優秀トレーナーとして表彰を受け、独立しました。以来、約1,000名の身体づくりに携わっています。
              </p>
              <p>
                コンディショニングの経験は10年以上。500名以上の身体の悩みと向き合ってきました。鍛える前に整える、という順番はこの経験から来ています。
              </p>
            </div>
            <ul className="av5-trainer-facts">
              <li>大手パーソナルジム在籍時、最優秀トレーナーとして表彰</li>
              <li>栄養学・トレーニング・実技研修などのセミナー講師経験</li>
              <li>カウンセリングから毎回のセッションまで、同じトレーナーが担当</li>
            </ul>
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
    <section className="av5-program av5-section" id="program" aria-labelledby="av5-program-heading">
      <div className="av5-container">
        <Heading en="PROGRAM" ja="プログラム" />
        <p className="av5-section-intro" id="av5-program-heading">
          主力は60分のパーソナルトレーニングです。通える頻度を伺ってからご提案します。
        </p>
        <ol className="av5-program-grid">
          {PROGRAMS.map((program) => (
            <li
              className={`av5-card av5-program-card av5-reveal${program.recommended ? " is-main" : ""}`}
              key={program.duration}
            >
              <p className="av5-program-duration">
                <strong>{program.duration}</strong>
                <span>MIN</span>
              </p>
              <h3>{program.title}</h3>
              <p className="av5-program-body">{program.body}</p>
            </li>
          ))}
        </ol>
        <p className="av5-note">
          このほかに、短期集中プラン、整体・コンディショニング、食事指導（有料オプション）があります。
        </p>
      </div>
    </section>
  );
}

function PriceSection() {
  return (
    <section className="av5-price av5-section av5-band av5-band--soft" id="price" aria-labelledby="av5-price-heading">
      <div className="av5-container">
        <Heading en="PRICE" ja="メニュー・料金" />
        <p className="av5-section-intro av5-section-intro--wide" id="av5-price-heading">
          確定している短期集中プランの料金です。60分回数券などその他の料金は、LINEで先にご案内できます。
        </p>
        <div className="av5-price-table-wrap av5-reveal">
          <table className="av5-price-table">
            <caption className="av5-visually-hidden">短期集中プランの料金一覧（税込）</caption>
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
                  <td className="av5-price-value">{price.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="av5-price-notes">
          {PRICE_NOTES.map((note) => (
            <article className="av5-card av5-price-note av5-reveal" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </article>
          ))}
        </div>
        <p className="av5-note">
          ご契約は内容と料金にご納得いただいてからで大丈夫です。無理な勧誘は行いません。
        </p>
        <LineAction
          event="line_click_price"
          className="av5-section-action"
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
    <section className="av5-experience av5-section" id="experience" aria-labelledby="av5-experience-heading">
      <div className="av5-container av5-experience-grid">
        <div className="av5-experience-copy">
          <Heading en="FLOW" ja="初回体験の流れ" />
          <p className="av5-section-intro" id="av5-experience-heading">
            初回体験は60分。カウンセリングのあと、整える30分と鍛える30分を続けて体験できます。持ち物は要りません。
          </p>
          <p className="av5-no-pressure">
            体験後にプランのご案内はしますが、その場で契約を求めることはありません。
          </p>
          <BookingAction event="hotpepper_click_experience" supportText="空き状況を見て日時を選べます。">
            ホットペッパーで初回体験を予約
          </BookingAction>
        </div>
        <ol className="av5-experience-steps">
          {EXPERIENCE_STEPS.map((step) => (
            <li className="av5-reveal" key={step.step}>
              <span className="av5-step-number">{step.step}</span>
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
    <section className="av5-studio av5-section av5-band av5-band--main" id="studio" aria-labelledby="av5-studio-heading">
      <div className="av5-container">
        <Heading en="STUDIO" ja="スタジオ" />
        <p className="av5-section-intro" id="av5-studio-heading">
          街の喧騒から少し離れた、自分の身体と向き合う時間。北新地から徒歩5分、梅田14階。セッション中はお客様1名とトレーナー1名だけの完全個室です。
        </p>
        <div className="av5-studio-gallery">
          <figure className="av5-studio-main av5-reveal">
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
          <figure className="av5-studio-sub av5-reveal">
            <img
              src={movementImage}
              alt="窓際で身体の動きを確認する女性とトレーナー"
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="av5-studio-sub av5-reveal">
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
        <dl className="av5-studio-amenities av5-reveal">
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
    <section className="av5-faq av5-section" id="faq" aria-labelledby="av5-faq-heading">
      <div className="av5-container">
        <Heading en="FAQ" ja="よくある質問" />
        <div className="av5-faq-list" id="av5-faq-heading">
          {FAQS.map((faq, index) => (
            <details
              className="av5-faq-item av5-reveal"
              key={faq.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent("faq_open", { index, question: faq.question });
                }
              }}
            >
              <summary>
                <span>{faq.question}</span>
                <Plus className="av5-faq-plus" aria-hidden="true" size={19} strokeWidth={1.6} />
                <Minus className="av5-faq-minus" aria-hidden="true" size={19} strokeWidth={1.6} />
              </summary>
              <p className="av5-faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className="av5-access av5-section" id="access" aria-labelledby="av5-access-heading">
      <div className="av5-container">
        <Heading en="ACCESS" ja="アクセス" />
        <div className="av5-access-grid av5-reveal" id="av5-access-heading">
          <div className="av5-access-map">
            <iframe
              src={SITE_CONFIG.MAP_EMBED_URL}
              title="VIVACHE所在地のGoogleマップ"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="av5-access-info">
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
            <a className="av5-text-link" href={SITE_CONFIG.MAP_URL} target="_blank" rel="noreferrer">
              Google Mapsで開く
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
          </div>
        </div>
        <p className="av5-access-summary">
          VIVACHEは、大阪・梅田/北新地エリアの完全個室パーソナルジムです。姿勢改善とボディメイクを組み合わせ、30〜40代の女性を中心に、一人ひとりの理想の「きれい」に合わせた身体づくりをサポートしています。仕事帰りも、手ぶらで。
        </p>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="av5-final" aria-labelledby="av5-final-title">
      <img
        className="av5-final-bg"
        src={heroImage}
        alt=""
        width={1672}
        height={941}
        loading="lazy"
        decoding="async"
      />
      <div className="av5-final-scrim" aria-hidden="true" />
      <div className="av5-container av5-final-inner av5-reveal">
        <p className="av5-final-en">FIRST SESSION / 60 MIN</p>
        <h2 id="av5-final-title">
          まずは、あなたの理想の身体を
          <br />
          一緒に考えることから。
        </h2>
        <p className="av5-final-lead">初回体験60分で、今の姿勢と、これからの進め方をお話しします。</p>
        <BookingAction
          event="hotpepper_click_final"
          className="av5-final-booking"
          supportText={isHotPepperReady ? "空き状況を見て日時を選べます。" : undefined}
          showWhenUnavailable
        >
          ホットペッパーで初回体験を予約
        </BookingAction>
        <LineAction event="line_click_final" showWhenUnavailable>
          予約前にLINEで相談する
        </LineAction>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="av5-footer">
      <div className="av5-container av5-footer-inner">
        <a className="av5-footer-top" href="#top">
          TOP
        </a>
        <div className="av5-footer-note">
          <p className="av5-footer-brand">
            <img
              src={logotypeLightImage}
              alt="VIVACHE PERSONAL GYM"
              width={1034}
              height={217}
              loading="lazy"
            />
          </p>
          <p>姿勢改善 × ボディメイク。北新地・梅田の完全個室パーソナルジム。</p>
          <address>{SITE_CONFIG.ADDRESS}</address>
        </div>
        <nav className="av5-footer-nav" aria-label="フッターナビゲーション">
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
    <div className="av5-mobile-bar" aria-label="予約導線">
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

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > window.innerHeight * 0.6);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      className={`av5-back-to-top${isVisible ? " is-visible" : ""}`}
      type="button"
      onClick={scrollToTop}
      aria-label="ページ上部へ戻る"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      title="ページ上部へ戻る"
    >
      <ArrowUp aria-hidden="true" size={18} strokeWidth={1.8} />
      <span aria-hidden="true">TOP</span>
    </button>
  );
}

function FloatingBooking() {
  return (
    <aside className="av5-floating" aria-label="予約導線">
      <a
        href={isHotPepperReady ? SITE_CONFIG.HOTPEPPER_URL : undefined}
        target={isHotPepperReady ? "_blank" : undefined}
        rel={isHotPepperReady ? "noreferrer" : undefined}
        aria-disabled={!isHotPepperReady}
        title={isHotPepperReady ? undefined : "ホットペッパーの店舗URLを設定後に利用できます"}
        onClick={(clickEvent) => {
          if (!isHotPepperReady) {
            clickEvent.preventDefault();
            return;
          }
          trackEvent("hotpepper_click_floating");
        }}
        aria-label="今すぐ予約する（ホットペッパーが開きます）"
      >
        <span className="av5-floating-label">今すぐ予約する</span>
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

export default function AppAVer5() {
  useAVer5Interactions();

  return (
    <div className={`av5-site${isHotPepperReady ? " av5-has-bar" : ""}`}>
      <SeoStructuredData />
      <a className="skip-link" href="#av5-main">
        本文へ移動
      </a>
      <Header />
      <main id="av5-main">
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
      <BackToTopButton />
      <MobileBookingBar />
    </div>
  );
}
