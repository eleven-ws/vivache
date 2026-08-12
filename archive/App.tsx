import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  CircleCheck,
  Clock3,
  Droplets,
  Dumbbell,
  Eye,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  PencilRuler,
  Plus,
  ShieldCheck,
  Shirt,
  Sparkles,
  Waves,
  X,
  type LucideIcon,
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

const METHOD_ICONS: LucideIcon[] = [Eye, PencilRuler, Waves, Dumbbell];

const HERO_SLIDES = [
  {
    src: heroImage,
    alt: "梅田のプライベートジムで姿勢を確認しながら指導を受ける女性",
    width: 1672,
    height: 941,
  },
  {
    src: postureConsultationImage,
    alt: "鏡の前で姿勢と身体のラインを確認する女性とトレーナー",
    width: 1200,
    height: 1500,
  },
  {
    src: movementImage,
    alt: "トレーナーと一緒に身体の動きを確かめる女性",
    width: 1400,
    height: 933,
  },
] as const;

type Variant = "A" | "B";

const FIXED_HERO_COPY = {
  heroTitle: ["美しさは、", "姿勢から。"],
  heroFormula: "姿勢改善 × ボディメイク ＝ VIVACHE",
  heroDescription: "姿勢と身体のラインから、あなたの理想の「きれい」を設計する。",
  heroCta: "ホットペッパーで初回体験を予約",
} as const;

const VARIANT_COPY = {
  A: {
    heroKicker: "PRIVATE BODY STUDIO / UMEDA",
    ...FIXED_HERO_COPY,
    heroSupport: "空き状況を確認して、そのまま予約できます。",
    problemEyebrow: "WHAT WE VALUE",
    problemTitle: "欲しいのは、数字ではなく、鏡を見たときの納得。",
    problemLead: "体重だけを追わず、服を着たときの印象や、ふとした立ち姿まで。VIVACHEは、毎日の中で感じられる変化を大切にします。",
    conceptTitle: "整えてから、鍛える。だから、無理がない。",
    conceptLead: "今の姿勢と動き方を見て、目指したい姿を言葉にする。必要な部分を整えてから鍛えることで、身体に合う方法を一緒に見つけます。",
    methodTitle: "一人ひとりを見るための、4つの時間。",
    methodLead: "決められたメニューに身体を合わせるのではなく、その日の状態と理想に合わせて内容を組み立てます。",
    finalTitle: "自分の身体に向き合う、静かな60分を。",
    finalLead: "初回体験では、今の身体と理想の姿を一緒に整理します。",
  },
  B: {
    heroKicker: "POSTURE FIRST PERSONAL TRAINING",
    ...FIXED_HERO_COPY,
    heroSupport: "空き状況を確認して、そのまま予約できます。",
    problemEyebrow: "CHECK YOUR BODY",
    problemTitle: "その頑張り、今の身体に合っていますか？",
    problemLead: "自己流で回数を重ねる前に、姿勢と動きの癖を確認する。VIVACHEは、遠回りしない身体づくりから始めます。",
    conceptTitle: "きれいを、感覚で終わらせない。",
    conceptLead: "SEE・DESIGN・CONDITION・TRAIN。今の状態と理想の差を整理し、毎回のセッションに落とし込みます。",
    methodTitle: "変わる理由が分かる、4ステップ。",
    methodLead: "姿勢確認からトレーニングまでを一つの流れに。何のために行うかを共有しながら進めます。",
    finalTitle: "今の姿勢を知れば、次にすることが見えてくる。",
    finalLead: "まずは初回体験60分で、身体に合う進め方を確かめてください。",
  },
} as const;

type LineCtaProps = {
  event: TrackingEvent;
  children?: ReactNode;
  className?: string;
  supportText?: string;
};

function LineCta({
  event,
  children = "LINEで相談する",
  className = "",
  supportText,
}: LineCtaProps) {
  return (
    <div className={`cta-wrap ${className}`.trim()}>
      <a
        className="line-cta"
        href={SITE_CONFIG.LINE_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent(event)}
        aria-label={`${String(children)}（LINEが開きます）`}
      >
        <span className="line-cta-icon" aria-hidden="true">
          <MessageCircle size={18} strokeWidth={1.8} />
        </span>
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
      </a>
      {supportText && <p className="cta-support">{supportText}</p>}
    </div>
  );
}

type BookingCtaProps = {
  event: TrackingEvent;
  children?: ReactNode;
  className?: string;
  supportText?: string;
  consultationEvent?: TrackingEvent;
};

function BookingCta({
  event,
  children = "ホットペッパーで予約する",
  className = "",
  supportText,
  consultationEvent,
}: BookingCtaProps) {
  const isConfigured = SITE_CONFIG.HOTPEPPER_URL.length > 0;

  return (
    <div className={`cta-wrap booking-cta-wrap ${className}`.trim()}>
      <a
        className={`line-cta booking-cta${isConfigured ? "" : " is-url-pending"}`}
        href={isConfigured ? SITE_CONFIG.HOTPEPPER_URL : undefined}
        target={isConfigured ? "_blank" : undefined}
        rel={isConfigured ? "noreferrer" : undefined}
        aria-disabled={!isConfigured}
        aria-label={`${String(children)}（ホットペッパーが開きます）`}
        title={isConfigured ? undefined : "ホットペッパーの店舗URLを設定後に利用できます"}
        onClick={(clickEvent) => {
          if (!isConfigured) {
            clickEvent.preventDefault();
            return;
          }
          trackEvent(event);
        }}
      >
        <span className="line-cta-icon" aria-hidden="true">
          <CalendarCheck size={18} strokeWidth={1.8} />
        </span>
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
      </a>
      {supportText && <p className="cta-support">{supportText}</p>}
      {consultationEvent && (
        <a
          className="cta-secondary-link"
          href={SITE_CONFIG.LINE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent(consultationEvent)}
        >
          <MessageCircle aria-hidden="true" size={15} strokeWidth={1.8} />
          予約前にLINEで相談する
          <ArrowUpRight aria-hidden="true" size={14} />
        </a>
      )}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
};

function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align}${light ? " section-heading--light" : ""}`}>
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand-mark" href="#top" aria-label="VIVACHE トップへ">
          <span>VIVACHE</span>
          <small>PERSONAL STUDIO</small>
        </a>

        <nav id="mobile-navigation" className={`global-nav${isOpen ? " is-open" : ""}`} aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <BookingCta event="hotpepper_click_header" className="header-cta">
            初回体験を予約
          </BookingCta>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function FloatingReservation() {
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

  return (
    <aside
      className="floating-reservation"
      style={{ "--scroll-angle": `${progress * 360}deg` } as CSSProperties}
      aria-label="予約導線"
    >
      <a
        href={SITE_CONFIG.HOTPEPPER_URL || undefined}
        target={SITE_CONFIG.HOTPEPPER_URL ? "_blank" : undefined}
        rel={SITE_CONFIG.HOTPEPPER_URL ? "noreferrer" : undefined}
        aria-disabled={!SITE_CONFIG.HOTPEPPER_URL}
        title={SITE_CONFIG.HOTPEPPER_URL ? undefined : "ホットペッパーの店舗URLを設定後に利用できます"}
        onClick={(clickEvent) => {
          if (!SITE_CONFIG.HOTPEPPER_URL) {
            clickEvent.preventDefault();
            return;
          }
          trackEvent("hotpepper_click_floating");
        }}
        aria-label="ホットペッパーで予約する"
      >
        <span className="floating-progress" aria-hidden="true">
          <CalendarCheck size={20} strokeWidth={1.8} />
        </span>
        <span className="floating-label">ホットペッパーで予約</span>
        <ArrowUpRight aria-hidden="true" size={18} />
      </a>
    </aside>
  );
}

function usePageInteractions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
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

function HeroSection({ variant }: { variant: Variant }) {
  const copy = VARIANT_COPY[variant];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(true);
  const slides = variant === "A" ? HERO_SLIDES : HERO_SLIDES.slice(0, 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsAutoplaying(false);
    }
  }, []);

  useEffect(() => {
    if (variant !== "A" || !isAutoplaying) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isAutoplaying, variant]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy reveal is-visible">
        <p className="hero-kicker">{copy.heroKicker}</p>
        <h1 id="hero-title">{copy.heroTitle[0]}<br />{copy.heroTitle[1]}</h1>
        <p className="hero-formula">{copy.heroFormula}</p>
        <p className="hero-description">{copy.heroDescription}</p>
        <BookingCta event="hotpepper_click_fv" consultationEvent="line_click_fv" supportText={copy.heroSupport}>{copy.heroCta}</BookingCta>
        <ul className="hero-meta" aria-label="店舗の特徴">
          <li><MapPin aria-hidden="true" size={16} />北新地徒歩5分</li>
          <li><ShieldCheck aria-hidden="true" size={16} />完全個室</li>
          <li><Shirt aria-hidden="true" size={16} />手ぶらOK</li>
        </ul>
      </div>
      <figure className="hero-visual">
        {slides.map((slide, index) => (
          <img
            className={`hero-slide${index === activeSlide ? " is-active" : ""}`}
            src={slide.src}
            alt={index === activeSlide ? slide.alt : ""}
            width={slide.width}
            height={slide.height}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={index !== activeSlide}
            key={slide.src}
          />
        ))}
        <figcaption>
          <span>北新地徒歩5分 / 梅田14階</span>
          <span>完全個室・完全予約制</span>
        </figcaption>
      </figure>
      <a className="scroll-cue" href="#problem" aria-label="次のセクションへ">
        <span>SCROLL</span><ArrowDown aria-hidden="true" size={16} />
      </a>
    </section>
  );
}

function ProblemSection({ variant }: { variant: Variant }) {
  const copy = VARIANT_COPY[variant];

  return (
    <section className="problem section-dark" id="problem">
      <div className="container problem-grid">
        <SectionHeading
          eyebrow={copy.problemEyebrow}
          title={copy.problemTitle}
          lead={copy.problemLead}
          light
        />
        <ol className="problem-list">
          {PROBLEMS.map((problem, index) => (
            <li className="reveal" key={problem}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{problem}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ConceptSection({ variant }: { variant: Variant }) {
  const copy = VARIANT_COPY[variant];

  return (
    <section className="concept section" id="concept">
      <div className="container">
        <div className="concept-intro reveal">
          <SectionHeading
            eyebrow="CONCEPT"
            title={copy.conceptTitle}
            lead={copy.conceptLead}
          />
          {variant === "A" ? (
            <figure className="concept-documentary">
              <img src={postureConsultationImage} alt="鏡の前で姿勢を確認する女性とトレーナー" width="1200" height="1500" loading="lazy" decoding="async" />
              <figcaption>「どうなりたいか」を聞くことから、セッションは始まります。</figcaption>
            </figure>
          ) : (
            <div className="concept-session-card">
              <span>FIRST SESSION</span>
              <strong>30<span>＋</span>30</strong>
              <p>整える30分と、鍛える30分。<br />初回から両方を体験できます。</p>
              <small>完全個室 / 無理な勧誘なし</small>
            </div>
          )}
        </div>
        {variant === "A" ? (
          <div className="concept-belief reveal">
            <p>VIVACHEに込めた意味</p>
            <strong>いきいきと、前向きに。</strong>
            <span>身体が変わることで、自分を見る目と毎日が少しずつ変わっていく。</span>
          </div>
        ) : (
          <div className="concept-equation-b reveal" aria-label="姿勢を見て整えて鍛えるVIVACHEメソッド">
            <span>SEE</span><b>→</b><span>DESIGN</span><b>→</b><span>CONDITION</span><b>→</b><span>TRAIN</span>
          </div>
        )}
      </div>
    </section>
  );
}

function MethodSection({ variant }: { variant: Variant }) {
  const copy = VARIANT_COPY[variant];

  return (
    <section className="method section" id="method">
      <div className="container">
        <SectionHeading
          eyebrow="VIVACHE METHOD"
          title={copy.methodTitle}
          lead={copy.methodLead}
        />
        <div className="method-grid">
          {METHODS.map((method, index) => {
            const Icon = METHOD_ICONS[index];
            return (
              <article className="method-card reveal" key={method.key} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                <div className="method-topline"><span>0{index + 1}</span><Icon aria-hidden="true" size={23} strokeWidth={1.5} /></div>
                <p className="method-key">{method.key}</p>
                <h3>{method.title}</h3>
                <p>{method.body}</p>
              </article>
            );
          })}
        </div>
        <div className="method-note reveal">
          <Sparkles aria-hidden="true" size={18} />
          <p>マシンピラティスも総合セッションに取り入れ、身体のラインと動きを丁寧に整えます。</p>
        </div>
        {variant === "B" && (
          <figure className="method-documentary reveal">
            <img src={movementImage} alt="動きを確認しながらトレーニングを行う女性とトレーナー" width="1400" height="933" loading="lazy" decoding="async" />
            <figcaption><span>一方的に追い込まない</span><strong>「なぜこの動きが必要か」まで共有します。</strong></figcaption>
          </figure>
        )}
        <BookingCta event="hotpepper_click_method" className="section-cta">初回体験の空き状況を確認する</BookingCta>
      </div>
    </section>
  );
}

function BodymakeSection() {
  return (
    <section className="bodymake section" id="bodymake">
      <div className="container">
        <SectionHeading
          eyebrow="YOUR IDEAL"
          title={<>こんな「きれい」を<br />目指す方へ。</>}
          lead="一つの部位だけでなく、全身のつながりから、自然で美しい身体のラインを目指します。"
        />
        <div className="bodymake-layout">
          <figure className="bodymake-image bodymake-image--main reveal">
            <img src={conditioningImage} alt="姿勢を意識した動きをトレーナーと練習する女性" width="1448" height="1086" loading="lazy" decoding="async" />
            <figcaption>姿勢と動きから整える</figcaption>
          </figure>
          <div className="body-goal-list">
            {BODY_GOALS.map((goal) => (
              <article className="body-goal reveal" key={goal.number}>
                <img src={conditioningImage} alt="" width="1448" height="1086" loading="lazy" decoding="async" />
                <span>{goal.number}</span>
                <div><h3>{goal.title}</h3><p>{goal.body}</p></div>
              </article>
            ))}
          </div>
        </div>
        <p className="image-disclaimer">※掲載写真は理想イメージです。身体の変化には個人差があります。</p>
      </div>
    </section>
  );
}

function ReasonsSection({ variant }: { variant: Variant }) {
  return (
    <section className="reasons section" id="reasons">
      <div className="container">
        <SectionHeading
          eyebrow="WHY VIVACHE"
          title={variant === "A" ? <>選ばれる理由より、<br />任せられる理由。</> : <>迷わず続けられる、<br />5つの理由。</>}
          lead={variant === "A" ? "派手な約束ではなく、目の前の身体を丁寧に見ること。その積み重ねを大切にしています。" : "身体の見方、セッションの進め方、通う環境まで。始める前に知りたいことを明確にしました。"}
        />
        <div className="reason-grid">
          {REASONS.map((reason, index) => (
            <article className={`reason-item reveal${reason.featured ? " reason-item--featured" : ""}`} key={reason.title}>
              <span>0{index + 1}</span>
              <div><h3>{reason.title}</h3><p>{reason.body}</p></div>
              {reason.featured && <BadgeCheck aria-hidden="true" size={32} strokeWidth={1.35} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainerSection({ variant }: { variant: Variant }) {
  return (
    <section className="trainer section-dark" id="trainer">
      <div className="container trainer-layout">
        <figure className="trainer-image reveal">
          <img src={trainerImage} alt="VIVACHEのパーソナルトレーナー" width="1024" height="1536" loading="lazy" decoding="async" />
          <figcaption>PERSONAL TRAINER / CONDITIONING</figcaption>
        </figure>
        <div className="trainer-content">
          <SectionHeading
            eyebrow="TRAINER"
            title={variant === "A" ? <>約16年の経験を、<br />あなたの理想の<br />「きれい」のために。</> : <>1,000名以上を見てきた、<br />ひとりのトレーナーが担当。</>}
            lead={variant === "A" ? "身体の変化は、日々の小さな違和感や気づきから始まります。カウンセリングから毎回のセッションまで一貫して担当し、言葉にならない感覚にも耳を傾けます。" : "大手パーソナルジムでの表彰経験と、10年以上のコンディショニング経験。鍛えるだけに偏らず、今の身体に必要な順番を見極めます。"}
            light
          />
          <div className="trainer-policy">
            <span>VIVACHEの指導方針</span>
            <p>{variant === "A" ? "無理に頑張らせるのではなく、自分の身体が分かる時間にする。" : "担当が変わらないから、小さな変化も次のセッションへつながる。"}</p>
          </div>
          <div className="trainer-biography reveal">
            <p className="trainer-biography-label">BACKGROUND</p>
            <div>
              <p>トレーナー専門学校を卒業後、フィットネスジム、大手パーソナルジムで経験を重ねて独立。約16年にわたり、約1,000名の身体づくりに携わってきました。</p>
              <p>コンディショニングにも10年以上取り組み、鍛えるだけでは見落としやすい身体の癖や、日々の小さな変化まで丁寧に見ています。</p>
            </div>
          </div>
          <ul className="trainer-career">
            <li><Check aria-hidden="true" size={17} />大手パーソナルジム在籍時、最優秀トレーナーとして表彰</li>
            <li><Check aria-hidden="true" size={17} />栄養学・トレーニング・実技研修等の講師経験</li>
            <li><Check aria-hidden="true" size={17} />カウンセリングから毎回のセッションまで一貫して担当</li>
          </ul>
          <p className="fact-note">※経歴・実績数値は公開前に本人確認のうえ確定します。</p>
          <LineCta event="line_click_trainer" className="trainer-cta">体験セッションをLINEで相談する</LineCta>
        </div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section className="program section" id="program">
      <div className="container">
        <SectionHeading
          eyebrow="PROGRAM"
          title={<>暮らしと目標に合う、<br />続け方を。</>}
          lead="短時間の継続から、じっくり取り組むセッションまで。今の身体と通いやすさを踏まえてご提案します。"
        />
        <div className="program-grid">
          {PROGRAMS.map((program) => (
            <article className={`program-card reveal${program.recommended ? " program-card--recommended" : ""}`} key={program.duration}>
              {program.recommended && <span className="recommended">RECOMMENDED</span>}
              <p className="program-duration"><strong>{program.duration}</strong><span>{program.unit}</span></p>
              <h3>{program.title}</h3>
              <p>{program.body}</p>
            </article>
          ))}
        </div>
        <div className="program-secondary reveal">
          <div><span>INTENSIVE</span><strong>短期集中プラン</strong></div>
          <div><span>CONDITIONING</span><strong>整体 / コンディショニング</strong></div>
          <div><span>OPTION</span><strong>食事指導（有料）</strong></div>
        </div>
      </div>
    </section>
  );
}

function PriceSection({ variant }: { variant: Variant }) {
  return (
    <section className="price section" id="price">
      <div className="container">
        <SectionHeading
          eyebrow="PRICE"
          title={variant === "A" ? <>無理なく続けられる方法を、<br />一緒に選びます。</> : <>時間・回数・料金を、<br />始める前に明確に。</>}
          lead="主力は60分のパーソナルトレーニング回数券です。目標と通える頻度を伺い、必要以上のプランをおすすめしません。"
        />
        <div className="price-main reveal">
          <div><span>MAIN PROGRAM</span><h3>60分 パーソナルトレーニング</h3><p>コンディショニングとトレーニングを、一人ひとりに合わせて構成します。</p></div>
          <p className="price-pending"><small>60分 / 回数券</small>詳細はLINEで事前確認できます</p>
        </div>
        <div className="price-heading-row"><h3>短期集中プラン</h3><span>表示価格は税込です</span></div>
        <div className="price-table-wrap reveal">
          <table className="price-table">
            <thead><tr><th>プラン</th><th>回数</th><th>料金（税込）</th></tr></thead>
            <tbody>
              {INTENSIVE_PRICES.map((price) => (
                <tr key={price.name}><th scope="row">{price.name}</th><td>{price.count}</td><td>{price.price}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="price-notes">
          <p><CircleCheck aria-hidden="true" size={17} />30分サブスク・90分・コンディショニングプランもご相談いただけます。</p>
          <p><CircleCheck aria-hidden="true" size={17} />食事指導はご希望の方のみ、有料オプションでご用意します。</p>
        </div>
        <LineCta event="line_click_price" className="section-cta" supportText="ご質問だけでもお気軽にどうぞ。">料金やプランをLINEで相談する</LineCta>
      </div>
    </section>
  );
}

function ExperienceSection({ variant }: { variant: Variant }) {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="FIRST EXPERIENCE"
          title="初回体験の流れ"
          lead="初めての方にも、現在の身体とセッションの考え方を丁寧にお伝えします。"
          align="center"
        />
        <ol className="experience-flow">
          {EXPERIENCE_STEPS.map((item, index) => (
            <li className="reveal" key={item.step}>
              <span className="experience-number">{item.step}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
              {index < EXPERIENCE_STEPS.length - 1 && <ArrowRight className="experience-arrow" aria-hidden="true" size={18} />}
            </li>
          ))}
        </ol>
        <p className="no-pressure"><ShieldCheck aria-hidden="true" size={19} />無理な勧誘は行いません。</p>
        <div className="experience-reservation reveal">
          <div>
            <span>FIRST SESSION / 60 MIN</span>
            <h3>{variant === "A" ? "まずは、身体のことを話すところから。" : "整える30分＋鍛える30分を、一度に体験。"}</h3>
            <p>{variant === "A" ? "運動経験や体力に自信がなくても大丈夫です。気になっていることを聞き、無理のない内容から始めます。" : "姿勢と動きの確認結果をもとに、その場で内容を調整します。持ち物は不要です。"}</p>
          </div>
          <BookingCta event="hotpepper_click_experience" supportText="空き状況を見て日時を選べます。">ホットペッパーで初回体験を予約</BookingCta>
        </div>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="studio section" id="studio">
      <div className="container">
        <SectionHeading
          eyebrow="PRIVATE STUDIO"
          title={<>街の喧騒から少し離れた、<br />自分の身体と向き合う時間。</>}
          lead="北新地から徒歩5分。梅田14階の完全個室で、周りの目を気にせずお過ごしいただけます。"
        />
        <div className="studio-bento">
          <figure className="studio-main reveal">
            <img src={studioImage} alt="大阪の街を望む14階の完全個室トレーニングスタジオ" width="1536" height="1024" loading="lazy" decoding="async" />
            <figcaption><span>UMEDA / 14F</span><strong>PRIVATE STUDIO</strong></figcaption>
          </figure>
          <figure className="studio-detail studio-detail--equipment reveal">
            <img src={studioImage} alt="パワーラックを備えたトレーニングスペース" width="1536" height="1024" loading="lazy" decoding="async" />
            <figcaption>TRAINING AREA</figcaption>
          </figure>
          <figure className="studio-detail studio-detail--pilates reveal">
            <img src={studioImage} alt="スタジオ内のマシンピラティス設備" width="1536" height="1024" loading="lazy" decoding="async" />
            <figcaption>MACHINE PILATES</figcaption>
          </figure>
        </div>
        <ul className="amenity-list" aria-label="設備とアメニティ">
          <li><ShieldCheck aria-hidden="true" />完全個室</li>
          <li><Clock3 aria-hidden="true" />完全予約制</li>
          <li><Shirt aria-hidden="true" />ウェア・シューズ</li>
          <li><Droplets aria-hidden="true" />シャワー・タオル</li>
        </ul>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="faq section" id="faq">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="FAQ"
          title={<>よくある<br />ご質問</>}
          lead="そのほか気になることは、LINEからご質問だけでもお気軽にご相談ください。"
        />
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <details
              className="faq-item reveal"
              key={faq.question}
              onToggle={(event) => {
                if (event.currentTarget.open) trackEvent("faq_open", { index, question: faq.question });
              }}
            >
              <summary>
                <span><b>Q.</b>{faq.question}</span>
                <Plus className="faq-plus" aria-hidden="true" size={21} />
                <Minus className="faq-minus" aria-hidden="true" size={21} />
              </summary>
              <div className="faq-answer"><b>A.</b><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className="access section" id="access">
      <div className="container">
        <SectionHeading eyebrow="ACCESS" title={<>仕事帰りも、<br />手ぶらで。</>} />
        <div className="access-card reveal">
          <div className="access-map">
            <iframe
              src={SITE_CONFIG.MAP_EMBED_URL}
              title="VIVACHE所在地のGoogleマップ"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="access-info">
            <p className="access-brand">VIVACHE</p>
            <h3>{SITE_CONFIG.LOCATION_SHORT}</h3>
            <address className="access-address">{SITE_CONFIG.ADDRESS}</address>
            <dl>
              <div><dt>営業時間</dt><dd>{SITE_CONFIG.OPENING_HOURS}</dd></div>
              <div><dt>土日</dt><dd>{SITE_CONFIG.WEEKEND_HOURS}</dd></div>
              <div><dt>駐車場</dt><dd>専用駐車場なし / 近隣コインパーキング</dd></div>
            </dl>
            <a className="text-link" href={SITE_CONFIG.MAP_URL} target="_blank" rel="noreferrer">
              Google Mapsで開く<ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <p className="pending-info">※電話番号は公開前に追記します。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ variant }: { variant: Variant }) {
  const copy = VARIANT_COPY[variant];

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <img src={heroImage} alt="" width="1672" height="941" loading="lazy" decoding="async" />
      <div className="final-cta-overlay" />
      <div className="final-cta-content reveal">
        <p>{variant === "A" ? "A QUIET HOUR FOR YOUR BODY" : "POSTURE FIRST PERSONAL TRAINING"}</p>
        <h2 id="final-cta-title">{copy.finalTitle}</h2>
        <span>{copy.finalLead}</span>
        <BookingCta event="hotpepper_click_final" consultationEvent="line_click_final" className="final-cta-button" supportText="空き状況を見て日時を選べます。">ホットペッパーで初回体験を予約</BookingCta>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand-mark brand-mark--footer" href="#top"><span>VIVACHE</span><small>PERSONAL STUDIO</small></a>
        <p>姿勢改善 × ボディメイク<br />北新地・梅田の完全個室パーソナルジム</p>
        <div><a href="#faq">FAQ</a><a href="#access">ACCESS</a><span>© VIVACHE</span></div>
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

type AppProps = {
  variant: Variant;
};

export default function App({ variant }: AppProps) {
  const mainRef = useRef<HTMLElement>(null);
  usePageInteractions();

  return (
    <div className={`site-shell variant-${variant.toLowerCase()}`}>
      <SeoFaqData />
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <Header />
      <main id="main-content" ref={mainRef}>
        <HeroSection variant={variant} />
        <ProblemSection variant={variant} />
        <ConceptSection variant={variant} />
        <MethodSection variant={variant} />
        <BodymakeSection />
        <ReasonsSection variant={variant} />
        <TrainerSection variant={variant} />
        <ProgramSection />
        <PriceSection variant={variant} />
        <ExperienceSection variant={variant} />
        <StudioSection />
        <FaqSection />
        <AccessSection />
        <FinalCtaSection variant={variant} />
      </main>
      <Footer />
      <FloatingReservation />
    </div>
  );
}
