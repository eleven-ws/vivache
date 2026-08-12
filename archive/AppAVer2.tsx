import {
  ArrowDown,
  ArrowUpRight,
  CalendarCheck,
  Check,
  Clock3,
  Droplets,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Shirt,
  X,
} from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
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

const HERO_SLIDES = [
  {
    src: heroImage,
    alt: "姿勢を確認しながらパーソナルトレーニングを受ける女性",
    width: 1672,
    height: 941,
    position: "center",
  },
  {
    src: postureConsultationImage,
    alt: "鏡の前で姿勢について相談する女性とトレーナー",
    width: 1200,
    height: 1500,
    position: "center 36%",
  },
] as const;

const isHotPepperReady = SITE_CONFIG.HOTPEPPER_URL.trim().length > 0;
const isLineReady = SITE_CONFIG.LINE_URL.trim().length > 0 && SITE_CONFIG.LINE_URL !== "https://line.me/";

type ActionProps = {
  event: TrackingEvent;
  children: ReactNode;
  className?: string;
};

function BookingAction({ event, children, className = "" }: ActionProps) {
  if (!isHotPepperReady) {
    return null;
  }

  return (
    <a
      className={`av2-action av2-action--booking ${className}`.trim()}
      href={SITE_CONFIG.HOTPEPPER_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent(event)}
    >
      <CalendarCheck aria-hidden="true" size={18} />
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} />
    </a>
  );
}

function LineAction({ event, children, className = "" }: ActionProps) {
  if (!isLineReady) {
    return null;
  }

  return (
    <a
      className={`av2-line-link ${className}`.trim()}
      href={SITE_CONFIG.LINE_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent(event)}
    >
      <MessageCircle aria-hidden="true" size={16} />
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={14} />
    </a>
  );
}

type HeadingProps = {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
};

function Heading({ label, title, lead, light = false }: HeadingProps) {
  return (
    <header className={`av2-heading${light ? " av2-heading--light" : ""}`}>
      <p className="av2-label"><span aria-hidden="true" />{label}</p>
      <h2>{title}</h2>
      {lead && <p className="av2-lead">{lead}</p>}
    </header>
  );
}

function useAVer2Interactions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".av2-reveal"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    elements.forEach((element) => observer.observe(element));
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
    <header className={`av2-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="av2-header-inner">
        <a className="av2-brand" href="#top" aria-label="VIVACHE トップへ">
          <strong>VIVACHE</strong>
          <span>PERSONAL STUDIO</span>
        </a>
        <nav id="av2-navigation" className={`av2-nav${isOpen ? " is-open" : ""}`} aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
          ))}
          <BookingAction event="hotpepper_click_header" className="av2-header-action">初回体験を予約</BookingAction>
        </nav>
        <button
          className="av2-menu"
          type="button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="av2-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="av2-hero" id="top" aria-labelledby="av2-hero-title">
      <div className="av2-hero-copy">
        <p className="av2-hero-kicker">PRIVATE BODY STUDIO / UMEDA</p>
        <h1 id="av2-hero-title">美しさは、<br />姿勢から。</h1>
        <p className="av2-hero-formula">姿勢改善 × ボディメイク ＝ VIVACHE</p>
        <p className="av2-hero-description">姿勢と身体のラインから、あなたの理想の「きれい」を設計する。</p>
        <div className="av2-hero-actions">
          <BookingAction event="hotpepper_click_fv">ホットペッパーで初回体験を予約</BookingAction>
          <LineAction event="line_click_fv">予約前にLINEで相談する</LineAction>
        </div>
        <ul className="av2-hero-meta" aria-label="店舗の特徴">
          <li><MapPin aria-hidden="true" />北新地徒歩5分</li>
          <li><ShieldCheck aria-hidden="true" />完全個室</li>
          <li><Shirt aria-hidden="true" />手ぶらOK</li>
        </ul>
      </div>
      <figure className="av2-hero-visual">
        {HERO_SLIDES.map((slide, index) => (
          <img
            className={index === active ? "is-active" : ""}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            aria-hidden={index !== active}
            width={slide.width}
            height={slide.height}
            style={{ objectPosition: slide.position }}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            key={slide.src}
          />
        ))}
        <figcaption><span>UMEDA / 14F</span><span>PRIVATE PERSONAL STUDIO</span></figcaption>
      </figure>
      <a className="av2-scroll" href="#value" aria-label="次のセクションへ"><span>SCROLL</span><ArrowDown aria-hidden="true" /></a>
    </section>
  );
}

function ValueSection() {
  return (
    <section className="av2-value av2-dark av2-section" id="value">
      <div className="av2-container av2-value-layout">
        <Heading
          label="WHAT WE VALUE"
          title={<>欲しいのは、数字ではなく、<br />鏡を見たときの納得。</>}
          lead="体重だけを追わず、服を着たときの印象や、ふとした立ち姿まで。日常の中で感じられる変化を大切にします。"
          light
        />
        <ol className="av2-value-list">
          {PROBLEMS.map((problem, index) => (
            <li className="av2-reveal" key={problem}>
              <span>{String(index + 1).padStart(2, "0")}</span>
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
    <section className="av2-concept av2-section" id="concept">
      <div className="av2-container av2-concept-layout">
        <Heading
          label="CONCEPT"
          title={<>整えてから、鍛える。<br />だから、無理がない。</>}
          lead="姿勢と動きを確認し、目指す姿を共有する。動きやすい状態に整えてから、必要な筋肉へ取り組みます。"
        />
        <div className="av2-concept-quote av2-reveal">
          <p>VIVACHEに込めた意味</p>
          <strong>いきいきと、前向きに。</strong>
          <span>自分の身体を知ることから、毎日の立ち姿を変えていく。</span>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="av2-method av2-section" id="method">
      <div className="av2-container">
        <div className="av2-method-intro">
          <Heading
            label="VIVACHE METHOD"
            title={<>一人ひとりを見る<br />ための、4つの時間。</>}
            lead="決められたメニューへ身体を合わせるのではなく、その日の状態を見ながら内容を組み立てます。"
          />
          <figure className="av2-method-image av2-reveal">
            <img src={movementImage} alt="トレーナーと身体の動きを確認するセッション" width="1400" height="933" loading="lazy" decoding="async" />
          </figure>
        </div>
        <ol className="av2-method-list">
          {METHODS.map((method, index) => (
            <li className="av2-reveal" key={method.key} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
              <span>0{index + 1}</span>
              <p>{method.key}</p>
              <div><h3>{method.title}</h3><p>{method.body}</p></div>
            </li>
          ))}
        </ol>
        <p className="av2-method-note"><Check aria-hidden="true" />マシンピラティスを、トレーニングとコンディショニングに組み合わせます。</p>
        <BookingAction event="hotpepper_click_method" className="av2-section-action">初回体験の空き状況を確認する</BookingAction>
      </div>
    </section>
  );
}

function GoalSection() {
  return (
    <section className="av2-goals av2-section">
      <div className="av2-container av2-goal-layout">
        <figure className="av2-goal-image av2-reveal">
          <img src={conditioningImage} alt="姿勢を意識した動きを練習する女性" width="1448" height="1086" loading="lazy" decoding="async" />
          <figcaption>姿勢と動きから整える</figcaption>
        </figure>
        <div className="av2-goal-copy">
          <Heading
            label="YOUR IDEAL"
            title={<>全身のつながりから、<br />自然なラインへ。</>}
            lead="一つの部位だけを追い込まず、立ったときの全体のバランスを見ていきます。"
          />
          <ol className="av2-goal-list">
            {BODY_GOALS.map((goal) => (
              <li className="av2-reveal" key={goal.number}>
                <span>{goal.number}</span><div><h3>{goal.title}</h3><p>{goal.body}</p></div>
              </li>
            ))}
          </ol>
          <small>掲載写真はイメージです。身体の変化には個人差があります。</small>
        </div>
      </div>
    </section>
  );
}

function ReasonSection() {
  return (
    <section className="av2-reasons av2-section">
      <div className="av2-container">
        <Heading
          label="WHY VIVACHE"
          title={<>派手な約束より、<br />続けられる理由を。</>}
          lead="セッションの進め方と通う環境を、始める前に分かる言葉でお伝えします。"
        />
        <div className="av2-reason-list">
          {REASONS.map((reason, index) => (
            <article className="av2-reveal" key={reason.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainerSection() {
  return (
    <section className="av2-trainer av2-dark av2-section" id="trainer">
      <div className="av2-container av2-trainer-layout">
        <figure className="av2-trainer-image av2-reveal">
          <img src={trainerImage} alt="VIVACHEの担当トレーナー" width="1024" height="1536" loading="lazy" decoding="async" />
          <figcaption>PERSONAL TRAINER / CONDITIONING</figcaption>
        </figure>
        <div className="av2-trainer-copy">
          <Heading
            label="TRAINER"
            title={<>最初の相談から、<br />毎回のセッションまで。</>}
            lead="担当が変わらないから、姿勢や動きの小さな変化を次のセッションへつなげられます。"
            light
          />
          <blockquote className="av2-reveal">無理に頑張らせるのではなく、自分の身体が分かる時間にする。</blockquote>
          <ul className="av2-trainer-points">
            <li><Check aria-hidden="true" />カウンセリングから一貫して担当</li>
            <li><Check aria-hidden="true" />鍛える前に姿勢と動きを確認</li>
            <li><Check aria-hidden="true" />その日の状態に合わせて内容を調整</li>
          </ul>
          <LineAction event="line_click_trainer" className="av2-trainer-link">身体の悩みをLINEで相談する</LineAction>
        </div>
      </div>
    </section>
  );
}

function ProgramPriceSection() {
  return (
    <section className="av2-program av2-section" id="program">
      <div className="av2-container">
        <Heading
          label="PROGRAM"
          title={<>暮らしと目標に合う、<br />続け方を。</>}
          lead="短時間の継続から、身体へじっくり向き合うセッションまで。通える頻度を伺ってご案内します。"
        />
        <div className="av2-program-list">
          {PROGRAMS.map((program) => (
            <article className="av2-reveal" key={program.duration}>
              <p><strong>{program.duration}</strong><span>MIN</span></p>
              <div><h3>{program.title}</h3><p>{program.duration === "30" ? "仕事の合間にも続けやすい短時間セッション。" : program.duration === "60" ? "整える時間と鍛える時間を組み合わせる基本セッション。" : "身体の状態へ、より時間をかけて向き合うセッション。"}</p></div>
            </article>
          ))}
        </div>
        <div className="av2-price" id="price">
          <div className="av2-price-intro">
            <p>PRICE</p>
            <h3>短期集中プラン</h3>
            <span>表示価格は税込です。目標と通える頻度に合わせてご案内します。</span>
          </div>
          <div className="av2-price-table-wrap av2-reveal">
            <table>
              <thead><tr><th>プラン</th><th>回数</th><th>料金</th></tr></thead>
              <tbody>
                {INTENSIVE_PRICES.map((price) => (
                  <tr key={price.name}><th scope="row">{price.name}</th><td>{price.count}</td><td>{price.price}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <LineAction event="line_click_price" className="av2-price-link">料金・プランをLINEで相談する</LineAction>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="av2-experience av2-section">
      <div className="av2-container av2-experience-layout">
        <div>
          <Heading
            label="FIRST EXPERIENCE"
            title={<>初回体験は、<br />話すところから。</>}
            lead="運動経験や体力に自信がなくても大丈夫です。気になっていることを聞き、無理のない内容から始めます。"
          />
          <p className="av2-no-pressure"><ShieldCheck aria-hidden="true" />無理な勧誘は行いません。</p>
        </div>
        <ol className="av2-experience-list">
          {EXPERIENCE_STEPS.map((step) => (
            <li className="av2-reveal" key={step.step}>
              <span>{step.step}</span><div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <div className="av2-container av2-experience-action">
        <BookingAction event="hotpepper_click_experience">ホットペッパーで初回体験を予約</BookingAction>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="av2-studio av2-section">
      <div className="av2-container">
        <div className="av2-studio-intro">
          <Heading
            label="PRIVATE STUDIO"
            title={<>街の喧騒から少し離れた、<br />自分の身体と向き合う時間。</>}
            lead="北新地から徒歩5分。14階の完全個室で、周囲を気にせずセッションへ集中できます。"
          />
          <ul className="av2-amenities" aria-label="設備とアメニティ">
            <li><ShieldCheck aria-hidden="true" />完全個室</li>
            <li><Clock3 aria-hidden="true" />完全予約制</li>
            <li><Shirt aria-hidden="true" />ウェア・シューズ</li>
            <li><Droplets aria-hidden="true" />シャワー・タオル</li>
          </ul>
        </div>
        <figure className="av2-studio-image av2-reveal">
          <img src={studioImage} alt="大阪の街を望む完全個室トレーニングスタジオ" width="1536" height="1024" loading="lazy" decoding="async" />
          <figcaption>UMEDA / 14F — PRIVATE STUDIO</figcaption>
        </figure>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="av2-faq av2-section" id="faq">
      <div className="av2-container av2-faq-layout">
        <Heading label="FAQ" title={<>始める前に、<br />知っておきたいこと。</>} lead="運動経験や持ち物、通い方についてまとめています。" />
        <div className="av2-faq-list">
          {FAQS.map((faq, index) => (
            <details className="av2-reveal" key={faq.question} onToggle={(event) => event.currentTarget.open && trackEvent("faq_open", { index, question: faq.question })}>
              <summary><span><b>Q.</b>{faq.question}</span><Plus className="av2-plus" aria-hidden="true" /><Minus className="av2-minus" aria-hidden="true" /></summary>
              <div><b>A.</b><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className="av2-access av2-section" id="access">
      <div className="av2-container">
        <Heading label="ACCESS" title={<>仕事帰りも、<br />手ぶらで。</>} />
        <div className="av2-access-layout av2-reveal">
          <div className="av2-map">
            <iframe src={SITE_CONFIG.MAP_EMBED_URL} title="VIVACHE所在地のGoogleマップ" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <div className="av2-access-info">
            <p>VIVACHE</p>
            <h3>{SITE_CONFIG.LOCATION_SHORT}</h3>
            <address>{SITE_CONFIG.ADDRESS}</address>
            <dl>
              <div><dt>営業時間</dt><dd>{SITE_CONFIG.OPENING_HOURS}</dd></div>
              <div><dt>土日</dt><dd>{SITE_CONFIG.WEEKEND_HOURS}</dd></div>
              <div><dt>駐車場</dt><dd>専用駐車場なし / 近隣コインパーキング</dd></div>
            </dl>
            <a href={SITE_CONFIG.MAP_URL} target="_blank" rel="noreferrer">Google Mapsで開く<ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="av2-final" aria-labelledby="av2-final-title">
      <div className="av2-final-inner av2-reveal">
        <p>A QUIET HOUR FOR YOUR BODY</p>
        <h2 id="av2-final-title">自分の身体に向き合う、<br />静かな60分を。</h2>
        <span>今の身体と、目指したい姿を一緒に整理します。</span>
        <div className="av2-final-actions">
          <BookingAction event="hotpepper_click_final">ホットペッパーで初回体験を予約</BookingAction>
          <LineAction event="line_click_final">予約前にLINEで相談する</LineAction>
        </div>
      </div>
    </section>
  );
}

function FloatingBooking() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!isHotPepperReady) return null;

  return (
    <aside className="av2-floating" style={{ "--progress": `${progress * 360}deg` } as CSSProperties} aria-label="予約導線">
      <a href={SITE_CONFIG.HOTPEPPER_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("hotpepper_click_floating")}>
        <span><CalendarCheck aria-hidden="true" /></span>
        <strong>今すぐ予約する</strong>
        <ArrowUpRight aria-hidden="true" />
      </a>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="av2-footer">
      <div className="av2-container">
        <a className="av2-brand" href="#top"><strong>VIVACHE</strong><span>PERSONAL STUDIO</span></a>
        <p>姿勢改善 × ボディメイク<br />北新地・梅田の完全個室パーソナルジム</p>
        <nav aria-label="フッターナビゲーション"><a href="#faq">FAQ</a><a href="#access">ACCESS</a><span>© VIVACHE</span></nav>
      </div>
    </footer>
  );
}

function SeoFaqData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AppAVer2() {
  useAVer2Interactions();

  return (
    <div className="av2-site">
      <SeoFaqData />
      <a className="skip-link" href="#av2-main">本文へ移動</a>
      <Header />
      <main id="av2-main">
        <Hero />
        <ValueSection />
        <ConceptSection />
        <MethodSection />
        <GoalSection />
        <ReasonSection />
        <TrainerSection />
        <ProgramPriceSection />
        <ExperienceSection />
        <StudioSection />
        <FaqSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingBooking />
    </div>
  );
}
