import {
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
  useRef,
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

const TRAINER_STATS = [
  { value: "16", unit: "年", label: "トレーナー歴" },
  { value: "1,000+", unit: "名", label: "担当したお客様" },
  { value: "10+", unit: "年", label: "コンディショニング歴" },
  { value: "500+", unit: "名", label: "身体の悩みに対応" },
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
    <div className={`av3-action-wrap ${className}`.trim()}>
      <a
        className="av3-booking"
        href={SITE_CONFIG.HOTPEPPER_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent(event)}
        aria-label={`${String(children)}（ホットペッパーが開きます）`}
      >
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} />
      </a>
      {supportText && <p className="av3-action-support">{supportText}</p>}
    </div>
  );
}

function LineAction({ event, children, className = "", supportText }: ActionProps) {
  if (!isLineReady) return null;

  return (
    <div className={`av3-action-wrap ${className}`.trim()}>
      <a
        className="av3-line"
        href={SITE_CONFIG.LINE_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent(event)}
        aria-label={`${String(children)}（LINEが開きます）`}
      >
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.6} />
      </a>
      {supportText && <p className="av3-action-support">{supportText}</p>}
    </div>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
};

function Heading({ eyebrow, title, lead, align = "left" }: HeadingProps) {
  return (
    <header className={`av3-heading av3-heading--${align}`}>
      {eyebrow && <p className="av3-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {lead && <p className="av3-lead">{lead}</p>}
    </header>
  );
}

function useAVer3Interactions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".av3-reveal"));
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
    <header className={`av3-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="av3-header-inner">
        <a className="av3-brand" href="#top" aria-label="VIVACHE トップへ">
          <strong>VIVACHE</strong>
          <span>PERSONAL STUDIO</span>
        </a>
        <nav
          id="av3-navigation"
          className={`av3-nav${isOpen ? " is-open" : ""}`}
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          {isHotPepperReady && (
            <a
              className="av3-header-booking"
              href={SITE_CONFIG.HOTPEPPER_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("hotpepper_click_header")}
            >
              初回体験を予約
            </a>
          )}
        </nav>
        <button
          className="av3-menu-button"
          type="button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="av3-navigation"
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
    <section className="av3-hero" id="top" aria-labelledby="av3-hero-title">
      <div className="av3-container av3-hero-grid">
        <div className="av3-hero-copy">
          <p className="av3-hero-place">北新地徒歩5分、完全個室のパーソナルジム</p>
          <h1 id="av3-hero-title">
            美しさは、
            <br />
            姿勢から。
          </h1>
          <p className="av3-hero-formula">姿勢改善 × ボディメイク ＝ VIVACHE</p>
          <p className="av3-hero-description">
            姿勢と身体のラインから、あなたの理想の「きれい」を設計する。
          </p>
          <BookingAction
            event="hotpepper_click_fv"
            supportText="空き状況を確認して、そのまま予約できます。"
          >
            ホットペッパーで初回体験を予約
          </BookingAction>
          <LineAction event="line_click_fv">予約前にLINEで相談する</LineAction>
          <ul className="av3-hero-facts" aria-label="店舗の特徴">
            <li>完全予約制・完全個室</li>
            <li>手ぶらで通える</li>
            <li>平日は22時まで</li>
          </ul>
        </div>
        <div className="av3-hero-visual">
          <figure className="av3-hero-photo">
            <img
              src={postureConsultationImage}
              alt="梅田の完全個室ジムで、鏡の前で姿勢を確認する女性とトレーナー"
              width={1200}
              height={1500}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <figure className="av3-hero-photo av3-hero-photo--sub">
            <img
              src={heroImage}
              alt="14階の窓辺で立ち姿を整える女性"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
            <figcaption>梅田14階、窓の広いプライベートスタジオ。</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="av3-problem av3-section" id="problem" aria-labelledby="av3-problem-title">
      <div className="av3-container">
        <div className="av3-problem-statement av3-reveal">
          <h2 id="av3-problem-title">
            ただ痩せるだけでは、
            <br />
            理想の身体になれない。
          </h2>
          <p>
            体重は落ちたのに、鏡の中の立ち姿はあまり変わらない。カウンセリングでよく伺うのは、そんな経験です。服を着たときの印象を決めているのは、体重計の数字よりも姿勢と身体のラインです。
          </p>
        </div>
        <ol className="av3-problem-list">
          {PROBLEMS.map((problem, index) => (
            <li className="av3-reveal" key={problem}>
              <span className="av3-problem-number">{String(index + 1).padStart(2, "0")}</span>
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
    <section className="av3-concept av3-section" id="concept" aria-labelledby="av3-concept-title">
      <div className="av3-container av3-concept-grid">
        <div className="av3-concept-copy">
          <Heading
            title={
              <span id="av3-concept-title">
                整えてから、
                <br />
                鍛える。
              </span>
            }
            lead="最初に確認するのは、今の姿勢と動きの癖です。目指す姿を言葉にしてから、必要な順番を決める。鍛えるのは、そのあとで十分です。"
          />
          <div className="av3-concept-name av3-reveal">
            <p className="av3-concept-name-label">VIVACHEという名前について</p>
            <p className="av3-concept-name-copy">いきいきと、前向きに。</p>
            <p>
              身体が変わると、自分を見る目が変わる。毎日が少し前向きになる。その入り口が姿勢だと考えています。
            </p>
          </div>
        </div>
        <figure className="av3-concept-photo av3-reveal">
          <img
            src={postureConsultationImage}
            alt="カウンセリングで理想の身体像を話し合う女性とトレーナー"
            width={1200}
            height={1500}
            loading="lazy"
            decoding="async"
          />
          <figcaption>セッションは「どうなりたいか」を聞くことから始まります。</figcaption>
        </figure>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="av3-method av3-section" id="method" aria-labelledby="av3-method-title">
      <div className="av3-container">
        <Heading
          eyebrow="VIVACHE METHOD"
          title={
            <span id="av3-method-title">
              理想から逆算する、
              <br />
              4つのステップ。
            </span>
          }
          lead="毎回のセッションを、この順番で組み立てます。姿勢を見ないまま鍛え始めることはありません。"
        />
        <ol className="av3-method-flow">
          {METHODS.map((method, index) => (
            <li
              className="av3-reveal"
              key={method.key}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className="av3-method-number">0{index + 1}</span>
              <p className="av3-method-key">{method.key}</p>
              <h3>{method.title}</h3>
              <p className="av3-method-body">{method.body}</p>
            </li>
          ))}
        </ol>
        <p className="av3-method-note">
          マシンピラティスは、必要に応じてセッションの中で組み合わせます。
        </p>
        <BookingAction event="hotpepper_click_method" className="av3-section-action">
          初回体験の空き状況を確認する
        </BookingAction>
      </div>
    </section>
  );
}

function BodymakeSection() {
  return (
    <section className="av3-bodymake av3-section" id="bodymake" aria-labelledby="av3-bodymake-title">
      <div className="av3-container av3-bodymake-grid">
        <figure className="av3-bodymake-photo av3-reveal">
          <img
            src={conditioningImage}
            alt="姿勢を意識した動きをトレーナーと練習する女性"
            width={1448}
            height={1086}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="av3-bodymake-copy">
          <Heading
            title={
              <span id="av3-bodymake-title">
                目指す「きれい」は、
                <br />
                人によって違う。
              </span>
            }
            lead="気になる部位だけを追い込むより、全身のつながりを見た方が、立ち姿は自然に変わります。"
          />
          <ol className="av3-goal-list">
            {BODY_GOALS.map((goal) => (
              <li className="av3-reveal" key={goal.number}>
                <h3>{goal.title}</h3>
                <p>{goal.body}</p>
              </li>
            ))}
          </ol>
          <small className="av3-fine-print">
            掲載写真はイメージです。身体の変化には個人差があります。
          </small>
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="av3-reasons av3-section" id="reasons" aria-labelledby="av3-reasons-title">
      <div className="av3-container">
        <Heading
          title={<span id="av3-reasons-title">通い続けられる理由。</span>}
          lead="始める前に知りたいことを、先に書いておきます。"
        />
        <ol className="av3-reason-list">
          {REASONS.map((reason, index) => (
            <li className="av3-reveal" key={reason.title}>
              <span className="av3-reason-number">0{index + 1}</span>
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
    <section className="av3-trainer av3-section" id="trainer" aria-labelledby="av3-trainer-title">
      <div className="av3-container av3-trainer-grid">
        <figure className="av3-trainer-photo av3-reveal">
          <img
            src={trainerImage}
            alt="VIVACHEの担当パーソナルトレーナー"
            width={1024}
            height={1536}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="av3-trainer-copy">
          <Heading
            eyebrow="TRAINER"
            title={
              <span id="av3-trainer-title">
                約16年の経験を、あなたの
                <br />
                理想の「きれい」のために。
              </span>
            }
          />
          <div className="av3-trainer-bio av3-reveal">
            <p>
              トレーナー専門学校を卒業後、フィットネスジムで2年、大手パーソナルジムで3年。在籍中に最優秀トレーナーとして表彰を受け、独立しました。以来、約1,000名の身体づくりに携わっています。
            </p>
            <p>
              コンディショニングの経験は10年以上。500名以上の身体の悩みと向き合ってきました。鍛える前に整える、という順番はこの経験から来ています。
            </p>
          </div>
          <dl className="av3-trainer-stats av3-reveal">
            {TRAINER_STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  <strong>{stat.value}</strong>
                  <span>{stat.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          <ul className="av3-trainer-notes">
            <li>栄養学・トレーニング・実技研修などのセミナー講師経験</li>
            <li>カウンセリングから毎回のセッションまで、同じトレーナーが担当</li>
          </ul>
          <blockquote className="av3-trainer-policy av3-reveal">
            無理に頑張らせるのではなく、自分の身体が分かる時間にする。
          </blockquote>
          <p className="av3-fine-print">※経歴・実績数値は公開前に本人確認のうえ確定します。</p>
          <LineAction
            event="line_click_trainer"
            className="av3-section-action av3-section-action--left"
            supportText="ご質問だけでもお気軽にどうぞ。"
          >
            身体の悩みをLINEで相談する
          </LineAction>
        </div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section className="av3-program av3-section" id="program" aria-labelledby="av3-program-title">
      <div className="av3-container">
        <Heading
          eyebrow="PROGRAM"
          title={<span id="av3-program-title">続け方は、暮らしに合わせて。</span>}
          lead="主力は60分のパーソナルトレーニングです。通える頻度を伺ってからご提案します。"
        />
        <ol className="av3-program-list">
          {PROGRAMS.map((program) => (
            <li
              className={`av3-reveal${program.recommended ? " is-main" : ""}`}
              key={program.duration}
            >
              <p className="av3-program-duration">
                <strong>{program.duration}</strong>
                <span>MIN</span>
              </p>
              <h3>{program.title}</h3>
              <p className="av3-program-body">{program.body}</p>
            </li>
          ))}
        </ol>
        <p className="av3-program-others">
          このほかに、短期集中プラン、整体・コンディショニング、食事指導（有料オプション）があります。
        </p>
      </div>
    </section>
  );
}

function PriceSection() {
  return (
    <section className="av3-price av3-section" id="price" aria-labelledby="av3-price-title">
      <div className="av3-container">
        <Heading
          eyebrow="PRICE"
          title={<span id="av3-price-title">先に、料金の話を。</span>}
          lead="確定している短期集中プランの料金です。60分回数券などその他の料金は、LINEで先にご案内できます。"
        />
        <div className="av3-price-table-wrap av3-reveal">
          <table className="av3-price-table">
            <caption className="av3-visually-hidden">短期集中プランの料金一覧（税込）</caption>
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
                  <td className="av3-price-value">{price.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="av3-price-note">
          ご契約は内容と料金にご納得いただいてからで大丈夫です。無理な勧誘は行いません。
        </p>
        <LineAction
          event="line_click_price"
          className="av3-section-action"
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
    <section
      className="av3-experience av3-section"
      id="experience"
      aria-labelledby="av3-experience-title"
    >
      <div className="av3-container av3-experience-grid">
        <div className="av3-experience-copy">
          <Heading
            title={
              <span id="av3-experience-title">
                初回体験は、
                <br />
                60分。
              </span>
            }
            lead="カウンセリングのあと、整える30分と鍛える30分を続けて体験できます。持ち物は要りません。"
          />
          <p className="av3-no-pressure">
            体験後にプランのご案内はしますが、その場で契約を求めることはありません。
          </p>
          <BookingAction
            event="hotpepper_click_experience"
            className="av3-section-action--left"
            supportText="空き状況を見て日時を選べます。"
          >
            ホットペッパーで初回体験を予約
          </BookingAction>
        </div>
        <ol className="av3-experience-steps">
          {EXPERIENCE_STEPS.map((step) => (
            <li className="av3-reveal" key={step.step}>
              <span className="av3-step-number">{step.step}</span>
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
    <section className="av3-studio av3-section" id="studio" aria-labelledby="av3-studio-title">
      <div className="av3-container">
        <Heading
          title={
            <span id="av3-studio-title">
              街の喧騒から少し離れた、
              <br />
              自分の身体と向き合う時間。
            </span>
          }
          lead="北新地から徒歩5分、梅田14階。セッション中はお客様1名とトレーナー1名だけの完全個室です。"
        />
        <figure className="av3-studio-main av3-reveal">
          <img
            src={studioImage}
            alt="大阪の街を望む、梅田14階の完全個室トレーニングスタジオ"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
          />
          <figcaption>パワーラックとマシンピラティスを備えたトレーニングエリア。</figcaption>
        </figure>
        <div className="av3-studio-detail av3-reveal">
          <figure>
            <img
              src={movementImage}
              alt="窓際で身体の動きを確認する女性とトレーナー"
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="av3-studio-amenities">
            <h3>仕事帰りに、そのまま。</h3>
            <p>
              ウェア、シューズ、タオルはレンタルをご用意しています。シャワーと更衣室、ウォーターサーバーもあるので、オフィスから手ぶらで来て、そのまま帰れます。
            </p>
            <dl>
              <div>
                <dt>設備</dt>
                <dd>パワーラック / マシンピラティス / シャワー / 更衣室</dd>
              </div>
              <div>
                <dt>レンタル</dt>
                <dd>ウェア / シューズ / タオル</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="av3-faq av3-section" id="faq" aria-labelledby="av3-faq-title">
      <div className="av3-container av3-faq-grid">
        <Heading
          title={
            <span id="av3-faq-title">
              よくある
              <br />
              ご質問
            </span>
          }
          lead="ここにない質問は、LINEからどうぞ。ご質問だけのご連絡も歓迎です。"
        />
        <div className="av3-faq-list">
          {FAQS.map((faq, index) => (
            <details
              className="av3-faq-item av3-reveal"
              key={faq.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent("faq_open", { index, question: faq.question });
                }
              }}
            >
              <summary>
                <span>{faq.question}</span>
                <Plus className="av3-faq-plus" aria-hidden="true" size={19} strokeWidth={1.4} />
                <Minus className="av3-faq-minus" aria-hidden="true" size={19} strokeWidth={1.4} />
              </summary>
              <p className="av3-faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className="av3-access av3-section" id="access" aria-labelledby="av3-access-title">
      <div className="av3-container">
        <Heading
          eyebrow="ACCESS"
          title={
            <span id="av3-access-title">
              仕事帰りも、
              <br />
              手ぶらで。
            </span>
          }
        />
        <div className="av3-access-grid av3-reveal">
          <div className="av3-access-map">
            <iframe
              src={SITE_CONFIG.MAP_EMBED_URL}
              title="VIVACHE所在地のGoogleマップ"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="av3-access-info">
            <p className="av3-access-brand">VIVACHE</p>
            <h3>{SITE_CONFIG.LOCATION_SHORT}</h3>
            <address>{SITE_CONFIG.ADDRESS}</address>
            <dl>
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
            <a className="av3-text-link" href={SITE_CONFIG.MAP_URL} target="_blank" rel="noreferrer">
              Google Mapsで開く
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
            </a>
            <p className="av3-fine-print">※電話番号は公開前に追記します。</p>
          </div>
        </div>
        <p className="av3-access-summary">
          VIVACHEは、大阪・梅田/北新地エリアの完全個室パーソナルジムです。姿勢改善とボディメイクを組み合わせ、30〜40代の女性を中心に、一人ひとりの理想の「きれい」に合わせた身体づくりをサポートしています。
        </p>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="av3-final" aria-labelledby="av3-final-title">
      <div className="av3-container av3-final-inner av3-reveal">
        <h2 id="av3-final-title">
          まずは、あなたの理想の身体を
          <br />
          一緒に考えることから。
        </h2>
        <p>初回体験60分で、今の姿勢と、これからの進め方をお話しします。</p>
        <BookingAction
          event="hotpepper_click_final"
          className="av3-final-booking"
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
    <footer className="av3-footer">
      <div className="av3-container av3-footer-inner">
        <a className="av3-brand av3-brand--footer" href="#top">
          <strong>VIVACHE</strong>
          <span>PERSONAL STUDIO</span>
        </a>
        <div className="av3-footer-note">
          <p>姿勢改善 × ボディメイク。北新地・梅田の完全個室パーソナルジム。</p>
          <address>{SITE_CONFIG.ADDRESS}</address>
        </div>
        <nav className="av3-footer-nav" aria-label="フッターナビゲーション">
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
    <div className="av3-mobile-bar" aria-label="予約導線">
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
    <aside className={`av3-floating${isVisible ? " is-visible" : ""}`} aria-label="予約導線">
      <a
        href={SITE_CONFIG.HOTPEPPER_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("hotpepper_click_floating")}
      >
        初回体験を予約
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
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

export default function AppAVer3() {
  const mainRef = useRef<HTMLElement>(null);
  useAVer3Interactions();

  return (
    <div className={`av3-site${isHotPepperReady ? " av3-has-bar" : ""}`}>
      <SeoStructuredData />
      <a className="skip-link" href="#av3-main">
        本文へ移動
      </a>
      <Header />
      <main id="av3-main" ref={mainRef}>
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
