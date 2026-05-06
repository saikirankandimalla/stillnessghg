import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Stillness" },
      { name: "description", content: "Support for every stage of life. Mental health, relationships, career, family, and specialised care." },
      { property: "og:title", content: "Services — Stillness" },
      { property: "og:description", content: "Support for every stage of your life." },
    ],
  }),
  component: Services,
});

/* ── useInView hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, dir = "up", className = "" }: {
  children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const { ref, inView } = useInView();
  const t = dir === "up" ? "translateY(32px)" : dir === "left" ? "translateX(-32px)" : dir === "right" ? "translateX(32px)" : "none";
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : t,
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── Design Tokens ── */
const T = {
  bgMain:   "#FFFFFF",
  bgSoft:   "#F5F5F3",
  textMain: "#1A1A1A",
  textSoft: "#6B6B6B",
  border:   "#E8E8E8",
  accent:   "#FADADD",
  accentDark: "#c0707a", // darker accent for text on accent bg
};

/* ── Data ── */
const groups = [
  {
    label: "Mental Health",
    num: "01",
    tagline: "Find calm within the storm.",
    accent: "#b39ddb",       // soft purple
    accentBg: "#ede7f6",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&auto=format&fit=crop&q=80",
    imgAlt: "Person sitting peacefully by a window with morning light",
    items: [
      { title: "Depression Counselling", desc: "Understand emotional lows, regain clarity, and rebuild motivation.", slug: "depression" },
      { title: "Anxiety Counselling", desc: "Manage worry, calm your mind, and build emotional strength." },
      { title: "Stress Management", desc: "Break overwhelming stress patterns and restore balance." },
      { title: "Overthinking & Negative Thoughts", desc: "Reduce mental overload and develop clarity in decision-making." },
      { title: "Sleep & Insomnia Support", desc: "Improve sleep patterns and manage restlessness." },
    ],
  },
  {
    label: "Relationship & Marriage",
    num: "02",
    tagline: "Build bonds that last.",
    accent: "#c0707a",       // dusty rose
    accentBg: "#FADADD",
    img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&auto=format&fit=crop&q=80",
    imgAlt: "Two people holding hands warmly",
    items: [
      { title: "Couple Counselling", desc: "Improve communication and strengthen emotional connection." },
      { title: "Marriage Counselling", desc: "Resolve conflicts and rebuild trust." },
      { title: "Breakup & Divorce Counselling", desc: "Heal from emotional loss and rebuild confidence." },
      { title: "Pre & Post Marriage Counselling", desc: "Prepare for a strong relationship and navigate married life." },
      { title: "Domestic Violence Support", desc: "Safe space for healing, strength, and recovery." },
    ],
  },
  {
    label: "Career & Growth",
    num: "03",
    tagline: "Move forward with purpose.",
    accent: "#5c9e8f",       // muted teal
    accentBg: "#e0f2ef",
    img: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=900&auto=format&fit=crop&q=80",
    imgAlt: "Person walking confidently on a bright path",
    items: [
      { title: "Career Counselling", desc: "Make confident career decisions aligned with your strengths." },
      { title: "Motivation & Productivity", desc: "Reconnect with purpose and take meaningful action." },
      { title: "Time Management", desc: "Build structure and balance in your daily life." },
      { title: "Work-Life Balance", desc: "Manage stress and improve overall well-being." },
    ],
  },
  {
    label: "Children & Family",
    num: "04",
    tagline: "Nurture the next generation.",
    accent: "#c8924a",       // warm amber
    accentBg: "#fdf0e0",
    img: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=900&auto=format&fit=crop&q=80",
    imgAlt: "Parent and child sharing a gentle moment outdoors",
    items: [
      { title: "Adolescent Counselling", desc: "Support teenagers through emotional and academic challenges." },
      { title: "Parenting Support", desc: "Build confident and connected parenting skills." },
      { title: "Family Counselling", desc: "Improve communication and strengthen family relationships." },
      { title: "Learning & Academic Support", desc: "Help students improve focus, memory, and performance." },
    ],
  },
  {
    label: "Specialised Support",
    num: "05",
    tagline: "Seen, held, understood.",
    accent: "#6a8fbf",       // soft blue
    accentBg: "#e8f1fb",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&auto=format&fit=crop&q=80",
    imgAlt: "Hands cradling a small plant — symbol of care and growth",
    items: [
      { title: "Trauma & PTSD Counselling", desc: "Heal from past experiences and regain stability." },
      { title: "ADHD Support", desc: "Improve focus, organization, and emotional regulation." },
      { title: "Grief Counselling", desc: "Process loss and find emotional healing." },
      { title: "LGBTQIA+ Support", desc: "Safe, inclusive, and affirming counselling space." },
      { title: "Addiction & De-Addiction", desc: "Break dependency patterns and regain control." },
    ],
  },
];

/* ── Component ── */
function Services() {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .svc-page { font-family: 'DM Sans', sans-serif; }
        .svc-page .display { font-family: 'Cormorant Garamond', serif; }

        @keyframes hero-scale { from { transform: scale(1.06); } to { transform: scale(1); } }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .hero-img { animation: hero-scale 1.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .float-badge { animation: float-badge 5s ease-in-out infinite; }

        .group-img-wrap {
          position: relative; overflow: hidden; border-radius: 28px;
          box-shadow: 0 24px 60px -12px rgba(0,0,0,0.10);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .group-img-wrap:hover { transform: scale(1.02); }
        .group-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .group-img-wrap:hover img { transform: scale(1.04); }

        .service-item {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 24px 0;
          border-bottom: 1px solid ${T.border};
          transition: all 0.35s;
          cursor: default;
          position: relative;
        }
        .service-item.linked { cursor: pointer; }
        .service-item:hover { padding-left: 8px; }
        .service-item .bar {
          width: 20px; height: 1px; margin-top: 14px; flex-shrink: 0;
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .service-item:hover .bar { width: 40px; }
        .service-item:last-child { border-bottom: none; }

        .tab-btn {
          padding: 10px 20px; border-radius: 999px;
          border: 1px solid ${T.border};
          background: transparent;
          color: ${T.textSoft};
          font-size: 0.78rem; letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn:hover {
          background: ${T.bgSoft};
          border-color: #d0d0d0;
          color: ${T.textMain};
        }
        .tab-btn.active {
          background: ${T.bgSoft};
          border-color: #d0d0d0;
          color: ${T.textMain};
        }

        .cta-pill {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 36px; border-radius: 999px;
          background: ${T.textMain}; color: ${T.bgMain};
          font-size: 0.9rem; font-weight: 500;
          text-decoration: none;
          transition: all 0.35s;
          position: relative; overflow: hidden;
        }
        .cta-pill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 400px 100%;
          opacity: 0; transition: opacity 0.3s;
        }
        .cta-pill:hover::after { opacity: 1; animation: shimmer 0.8s linear; }
        .cta-pill:hover { transform: translateY(-2px); box-shadow: 0 16px 40px -8px rgba(26,26,26,0.18); }

        .section-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem; font-weight: 300;
          color: rgba(26,26,26,0.04);
          position: absolute; top: -20px; right: 0;
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="svc-page" style={{ background: T.bgMain, color: T.textMain, minHeight: "100vh" }}>

        {/* ════════ HERO ════════ */}
        <section style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 120, paddingBottom: 80, background: T.bgSoft }}>
          {/* Subtle overlay image — very light */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80"
              alt="Peaceful therapeutic environment"
              className="hero-img"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.96) saturate(0.3)", opacity: 0.18 }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${T.bgSoft} 45%, rgba(245,245,243,0.7) 100%)` }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: `1px solid ${T.border}`, background: T.bgMain, marginBottom: 32, fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accentDark, display: "inline-block" }} />
                What we offer
              </div>
              <h1 className="display" style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 28, color: T.textMain }}>
                Support for every<br />
                <em style={{ color: T.accentDark }}>stage of your life.</em>
              </h1>
              <p style={{ fontSize: "1.05rem", color: T.textSoft, lineHeight: 1.85, maxWidth: 460, marginBottom: 48 }}>
                From emotional challenges to personal growth — we provide guidance that helps you move forward with clarity, compassion, and confidence.
              </p>
              {/* quick-nav tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {groups.map((g, i) => (
                  <button
                    key={g.label}
                    className={`tab-btn${activeGroup === i ? " active" : ""}`}
                    onClick={() => {
                      setActiveGroup(i);
                      document.getElementById(`group-${i}`)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      borderColor: activeGroup === i ? g.accent + "88" : undefined,
                      color: activeGroup === i ? g.accent : undefined,
                      background: activeGroup === i ? g.accentBg : undefined,
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* right: stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { n: "20+", label: "Services", icon: "🌿" },
                { n: "5", label: "Focus Areas", icon: "🎯" },
                { n: "98%", label: "Satisfaction", icon: "✨" },
                { n: "24h", label: "Response Time", icon: "⚡" },
              ].map((s, i) => (
                <div key={s.label} className="float-badge" style={{
                  background: T.bgMain,
                  border: `1px solid ${T.border}`,
                  borderRadius: 20,
                  padding: "24px 20px",
                  animationDelay: `${i * 0.6}s`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 10 }}>{s.icon}</div>
                  <div className="display" style={{ fontSize: "2.4rem", fontWeight: 300, color: T.accentDark, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "0.78rem", color: T.textSoft, marginTop: 6, letterSpacing: "0.05em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* scroll hint */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: T.textSoft, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", zIndex: 1 }}>
            <span>Scroll to explore</span>
            <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${T.border}, transparent)` }} />
          </div>
        </section>

        {/* ════════ SERVICE GROUPS ════════ */}
        {groups.map((g, gi) => {
          const isEven = gi % 2 === 0;
          return (
            <section
              key={g.label}
              id={`group-${gi}`}
              style={{
                padding: "110px 48px",
                maxWidth: 1280,
                margin: "0 auto",
                position: "relative",
                background: gi % 2 === 0 ? T.bgMain : T.bgSoft,
              }}
              onMouseEnter={() => setActiveGroup(gi)}
            >
              <div className="section-num">{g.num}</div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 72,
                alignItems: "start",
                direction: isEven ? "ltr" : "rtl",
              }}>

                {/* Image side */}
                <Reveal dir={isEven ? "left" : "right"} delay={0}>
                  <div style={{ direction: "ltr" }}>
                    <div className="group-img-wrap" style={{ height: 520 }}>
                      <img src={g.img} alt={g.imgAlt} />
                      {/* accent overlay */}
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${g.accentBg}cc, transparent 60%)`, mixBlendMode: "multiply" }} />
                      {/* label chip */}
                      <div style={{
                        position: "absolute", top: 24, left: 24,
                        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
                        border: `1px solid ${g.accent}55`, borderRadius: 999,
                        padding: "8px 18px", fontSize: "0.7rem", letterSpacing: "0.2em",
                        textTransform: "uppercase", color: g.accent,
                      }}>
                        {g.num} · {g.label}
                      </div>
                    </div>

                    {/* tagline below image */}
                    <div style={{ marginTop: 24, padding: "20px 24px", borderRadius: 16, background: g.accentBg, border: `1px solid ${g.accent}33` }}>
                      <p className="display" style={{ fontSize: "1.4rem", fontStyle: "italic", fontWeight: 300, color: g.accent }}>{g.tagline}</p>
                    </div>
                  </div>
                </Reveal>

                {/* Content side */}
                <div style={{ direction: "ltr" }}>
                  <Reveal dir={isEven ? "right" : "left"} delay={80}>
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 12 }}>{g.num}</p>
                    <h2 className="display" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, marginBottom: 48, color: T.textMain, lineHeight: 1.1 }}>
                      {g.label}
                    </h2>
                  </Reveal>

                  <div>
                    {g.items.map((item, i) => {
                      const inner = (
                        <Reveal key={item.title} delay={160 + i * 70}>
                          <div
                            className={`service-item${item.slug ? " linked" : ""}`}
                          >
                            <div className="bar" style={{ background: g.accent }} />
                            <div style={{ flex: 1 }}>
                              <h3 className="display" style={{ fontSize: "1.35rem", fontWeight: 400, marginBottom: 6, transition: "color 0.3s", color: T.textMain }}
                                onMouseEnter={e => (e.currentTarget.style.color = g.accent)}
                                onMouseLeave={e => (e.currentTarget.style.color = T.textMain)}>
                                {item.title}
                              </h3>
                              <p style={{ fontSize: "0.85rem", color: T.textSoft, lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                            {item.slug && (
                              <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", border: `1px solid ${g.accent}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: g.accent, opacity: 0.8 }}>→</div>
                            )}
                          </div>
                        </Reveal>
                      );
                      return item.slug ? (
                        <Link key={item.title} to="/services/$slug" params={{ slug: item.slug }} style={{ textDecoration: "none", display: "block" }}>
                          {inner}
                        </Link>
                      ) : inner;
                    })}
                  </div>
                </div>
              </div>

              {/* divider */}
              {gi < groups.length - 1 && (
                <div style={{ marginTop: 80, height: 1, background: `linear-gradient(to right, transparent, ${T.border}, transparent)` }} />
              )}
            </section>
          );
        })}

        {/* ════════ CTA ════════ */}
        <section style={{ padding: "120px 48px", textAlign: "center", position: "relative", overflow: "hidden", background: T.bgSoft }}>
          {/* Subtle image wash */}
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1400&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.05) saturate(0.2)", opacity: 0.12 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.bgSoft} 0%, rgba(245,245,243,0.5) 50%, ${T.bgSoft} 100%)` }} />
          </div>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
            <Reveal>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 20 }}>Start today</p>
              <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: 20, color: T.textMain }}>
                Find the support that <em style={{ color: T.accentDark }}>fits your journey.</em>
              </h2>
              <p style={{ fontSize: "1rem", color: T.textSoft, lineHeight: 1.8, marginBottom: 48 }}>
                Your first session is a gentle conversation — no pressure, no commitment. Just a beginning.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/book" className="cta-pill">
                  Book a session
                  <span style={{ width: 20, height: 1, background: T.bgMain, opacity: 0.4, display: "inline-block" }} />
                </Link>
                <Link to="/about" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 999,
                  border: `1px solid ${T.border}`,
                  color: T.textSoft, fontSize: "0.9rem", textDecoration: "none",
                  transition: "all 0.3s", background: T.bgMain,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c0c0c0"; (e.currentTarget as HTMLAnchorElement).style.color = T.textMain; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = T.border; (e.currentTarget as HTMLAnchorElement).style.color = T.textSoft; }}>
                  Meet our therapists
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}