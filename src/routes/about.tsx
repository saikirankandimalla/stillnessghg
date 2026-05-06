import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Stillness" },
      {
        name: "description",
        content:
          "Real people. Real support. A space built for those who feel overwhelmed, unheard, or emotionally stuck.",
      },
      { property: "og:title", content: "About — Stillness" },
      {
        property: "og:description",
        content: "Real people. Real support. A space built for healing.",
      },
    ],
  }),
  component: About,
});

/* ── Design Tokens ── */
const T = {
  bgMain:    "#FFFFFF",
  bgSoft:    "#F5F5F3",
  textMain:  "#1A1A1A",
  textSoft:  "#6B6B6B",
  border:    "#E8E8E8",
  accent:    "#FADADD",
  accentDark:"#c0707a",
  gold:      "#a07840",   // replaces #c8a464 on light bg
};

/* ─── tiny hook ─── */
function useInView(threshold = 0.15) {
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

/* ─── animated number counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── fade-slide wrapper ─── */
function Reveal({
  children, delay = 0, dir = "up", className = "",
}: {
  children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const { ref, inView } = useInView();
  const translate =
    dir === "up" ? "translateY(36px)"
    : dir === "left" ? "translateX(-36px)"
    : dir === "right" ? "translateX(36px)"
    : "none";
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : translate,
      transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .about-page { font-family: 'DM Sans', sans-serif; }
        .about-page .display { font-family: 'Cormorant Garamond', serif; }

        @keyframes float-slow {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes float-med {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-1.5deg); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .float-slow { animation: float-slow 9s ease-in-out infinite; }
        .float-med  { animation: float-med 7s ease-in-out infinite 1.5s; }

        .hero-img-card {
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 60px -12px rgba(0,0,0,0.10);
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-img-card:hover { transform: scale(1.025) !important; }

        .stat-card {
          background: ${T.bgMain};
          border: 1px solid ${T.border};
          border-radius: 20px;
          padding: 28px 32px;
          transition: all 0.4s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .stat-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .value-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid ${T.border};
          background: ${T.bgMain};
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          transition: all 0.3s;
        }
        .value-pill:hover {
          border-color: ${T.accentDark}55;
          background: ${T.accent}44;
          transform: scale(1.04);
        }

        .therapist-card {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .therapist-card:hover { transform: translateY(-8px); }
        .therapist-card .overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 30%, transparent 75%);
          transition: opacity 0.4s;
        }
        .therapist-card:hover .overlay { opacity: 0.95; }
        .therapist-card .card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 32px;
          transform: translateY(8px);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .therapist-card:hover .card-content { transform: translateY(0); }
        .therapist-card .extra-info {
          max-height: 0; overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .therapist-card:hover .extra-info { max-height: 80px; }

        .process-step {
          position: relative;
          padding: 36px 40px;
          border-radius: 24px;
          background: ${T.bgMain};
          border: 1px solid ${T.border};
          transition: all 0.4s;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .process-step::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${T.accentDark}66, transparent);
          transform: scaleX(0);
          transition: transform 0.5s;
        }
        .process-step:hover { background: #fff8f8; transform: translateY(-3px); box-shadow: 0 8px 32px rgba(192,112,122,0.08); }
        .process-step:hover::before { transform: scaleX(1); }

        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }

        .testimonial-card {
          background: ${T.bgMain};
          border: 1px solid ${T.border};
          border-radius: 24px;
          padding: 36px;
          transition: all 0.4s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .testimonial-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
          transform: translateY(-4px);
          border-color: ${T.accentDark}33;
        }

        .cta-glow {
          position: absolute; inset: -2px;
          border-radius: 999px;
          background: linear-gradient(135deg, ${T.accent}, ${T.accentDark}44);
          filter: blur(12px);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .cta-btn:hover .cta-glow { opacity: 0.6; }
        .cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
      `}</style>

      <div className="about-page" style={{ background: T.bgMain, color: T.textMain, minHeight: "100vh" }}>

        {/* ═══ HERO ═══ */}
        <section style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: 120,
          paddingBottom: 80,
          background: T.bgSoft,
        }}>
          {/* ambient blobs — very subtle on light bg */}
          <div style={{ position: "absolute", top: "15%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: `${T.accent}55`, filter: "blur(80px)" }} className="float-slow" />
          <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: `${T.accentDark}18`, filter: "blur(60px)" }} className="float-med" />

          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

            {/* LEFT */}
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: `1px solid ${T.border}`, background: T.bgMain, marginBottom: 32, fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accentDark, display: "inline-block" }} />
                  About Stillness
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 28, color: T.textMain }}>
                  Real people.<br />
                  <em style={{ color: T.accentDark }}>Real support.</em>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p style={{ fontSize: "1.1rem", color: T.textSoft, lineHeight: 1.8, maxWidth: 460, marginBottom: 48 }}>
                  We created Stillness for people who feel overwhelmed, unheard, or emotionally stuck — a quiet sanctuary where healing begins with simply being heard, without judgment, without rush.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { icon: "🌿", label: "Safe Space" },
                    { icon: "🔒", label: "Fully Confidential" },
                    { icon: "💬", label: "Real Therapists" },
                    { icon: "✨", label: "Judgment-Free" },
                  ].map((v) => (
                    <span key={v.label} className="value-pill">
                      <span>{v.icon}</span>
                      <span style={{ color: T.textMain }}>{v.label}</span>
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* RIGHT: floating image collage */}
            <div style={{ position: "relative", height: 580 }}>
              <div className="hero-img-card float-slow" style={{ position: "absolute", top: 0, right: 0, width: "68%", height: 420, transform: "rotate(2deg)" }}>
                <img src={therapist1} alt="Therapist Anaya" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `${T.accent}33`, mixBlendMode: "multiply" }} />
              </div>

              <div className="hero-img-card float-med" style={{ position: "absolute", bottom: 20, left: 0, width: "55%", height: 300, transform: "rotate(-1.5deg)" }}>
                <img src={therapist2} alt="Therapist Devan" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>

              {/* Founded badge */}
              {/* <div style={{ position: "absolute", top: 30, left: 24, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 20, padding: "18px 22px", zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }} className="float-med">
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.textSoft, marginBottom: 6 }}>Founded</div>
                <div className="display" style={{ fontSize: "2rem", fontWeight: 300, color: T.textMain }}>2019</div>
              </div> */}

              {/* Review snippet */}
              <div style={{ position: "absolute", bottom: 40, right: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 20, padding: "18px 22px", zIndex: 10, maxWidth: 220, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }} className="float-slow">
                <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: T.gold, fontSize: "0.75rem" }}>★</span>)}
                </div>
                <div style={{ fontSize: "0.82rem", color: T.textSoft, lineHeight: 1.5 }}>"I finally felt understood. This changed everything."</div>
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: T.textSoft, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <span>Scroll</span>
            <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${T.border}, transparent)` }} />
          </div>
        </section>

        {/* ═══ STATS BAND ═══ */}
        <section style={{ padding: "80px 48px", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { n: 2400, suf: "+", label: "People Supported", desc: "Across all sessions" },
              { n: 98,   suf: "%", label: "Satisfaction Rate", desc: "From client feedback" },
              { n: 5,    suf: " yrs", label: "Years of Practice", desc: "Established 2019" },
              { n: 3,    suf: "k+", label: "Sessions Held", desc: "And still going" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="stat-card">
                  <div className="display" style={{ fontSize: "3rem", fontWeight: 300, color: T.accentDark, lineHeight: 1 }}>
                    <Counter to={s.n} suffix={s.suf} />
                  </div>
                  <div style={{ marginTop: 12, fontWeight: 500, fontSize: "0.9rem", color: T.textMain }}>{s.label}</div>
                  <div style={{ marginTop: 4, fontSize: "0.78rem", color: T.textSoft }}>{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ STORY BLOCKS ═══ */}
        <section style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto", background: T.bgSoft }}>
          <Reveal>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 16 }}>Our story</p>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, marginBottom: 80, maxWidth: 600, color: T.textMain }}>
              Why we built <em style={{ color: T.accentDark }}>Stillness</em>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
            {[
              { num: "01", heading: "The need was real", body: "We saw how many people were quietly struggling — not in crisis, but lost in a fog of anxiety, loneliness, and confusion — with no one truly listening. We knew we had to do something.", icon: "🫁" },
              { num: "02", heading: "We made it human", body: "No bots. No cold intake forms. Just warm, trained therapists who show up fully present. Every session is tailored around you — your story, your pace, your truth.", icon: "🤝" },
              { num: "03", heading: "And kept it safe", body: "Everything shared within Stillness stays within Stillness. Full confidentiality, ethical practice, and a zero-judgment philosophy — because you deserve a space that protects you.", icon: "🔐" },
            ].map((b, i) => (
              <Reveal key={b.num} delay={i * 120}>
                <div className="process-step" style={{ height: "100%" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 20 }}>{b.icon}</div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 16 }}>{b.num}</div>
                  <h3 className="display" style={{ fontSize: "1.7rem", fontWeight: 400, marginBottom: 16, color: T.textMain }}>{b.heading}</h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: T.textSoft }}>{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ APPROACH ═══ */}
        <section style={{ padding: "100px 48px", background: T.bgMain, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 16, textAlign: "center" }}>How we support you</p>
              <h2 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, textAlign: "center", marginBottom: 80, color: T.textMain }}>
                Listen. Understand. Guide.
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { step: "01", title: "Listen",     desc: "We begin by giving you full space to speak — without interruption, without agenda. Your words matter here.", detail: "Every session opens with stillness. We don't rush to fix; we listen to understand.",   color: "#b39ddb" },
                { step: "02", title: "Understand", desc: "We reflect, explore and connect the dots of your experience, helping you see patterns and possibilities.",    detail: "Your therapist reads between the lines — the fears beneath the words, the hopes within the pain.", color: T.accentDark },
                { step: "03", title: "Guide",      desc: "Together we move toward clarity — not with prescriptions, but with compassionate, evidence-based guidance.",   detail: "Each path forward is yours alone. We just help illuminate the way.",               color: "#5c9e8f" },
              ].map((s, i) => (
                <Reveal key={s.step} delay={i * 130}>
                  <div style={{ textAlign: "center", padding: "48px 32px", borderRadius: 28, border: `1px solid ${T.border}`, background: T.bgMain, transition: "all 0.4s", cursor: "default" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#fff8f8"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(192,112,122,0.08)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${s.color}44`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = T.bgMain; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = T.border; }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: `${s.color}18`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "0.75rem", color: s.color, letterSpacing: "0.15em" }}>{s.step}</div>
                    <h3 className="display" style={{ fontSize: "2.2rem", fontWeight: 300, color: s.color, marginBottom: 16 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: T.textSoft, lineHeight: 1.8, marginBottom: 16 }}>{s.desc}</p>
                    <p style={{ fontSize: "0.8rem", color: T.textSoft, lineHeight: 1.7, fontStyle: "italic", opacity: 0.7 }}>{s.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THERAPISTS ═══ */}
        <section style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 12 }}>The team</p>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, marginBottom: 16, color: T.textMain }}>
              Two voices. One mission.
            </h2>
            <p style={{ fontSize: "1rem", color: T.textSoft, maxWidth: 520, marginBottom: 64, lineHeight: 1.8 }}>
              Our therapists bring deep expertise and genuine warmth to every conversation — trained in evidence-based methods, committed to your growth.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { name: "Anaya R.", role: "Lead Therapist · Anxiety & Burnout", bio: "Helping individuals find clarity, emotional strength, and balance — specialising in anxiety, life transitions, and self-worth. 8+ years of practice.", tags: ["Anxiety", "Burnout", "Self-worth", "CBT"], img: therapist1, delay: 0 },
              { name: "Devan M.", role: "Lead Therapist · Relationships & Growth", bio: "Focused on building resilience, understanding relationship dynamics, and supporting personal growth through empathy-led, evidence-based care.", tags: ["Relationships", "Resilience", "ACT", "Grief"], img: therapist2, delay: 120 },
            ].map((t) => (
              <Reveal key={t.name} delay={t.delay}>
                <div className="therapist-card" style={{ height: 560 }}>
                  <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div className="overlay" />
                  <div className="card-content">
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }} className="extra-info">
                      {t.tags.map(tag => (
                        <span key={tag} style={{ padding: "4px 12px", borderRadius: 999, background: `${T.accent}cc`, border: `1px solid ${T.accentDark}44`, fontSize: "0.7rem", letterSpacing: "0.1em", color: T.accentDark }}>{tag}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 8 }}>{t.role}</p>
                    <h3 className="display" style={{ fontSize: "2.2rem", fontWeight: 300, marginBottom: 10, color: "#fff" }}>{t.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }} className="extra-info">{t.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section style={{ padding: "100px 48px", background: T.bgSoft, borderTop: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 12, textAlign: "center" }}>What people say</p>
              <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, textAlign: "center", marginBottom: 64, color: T.textMain }}>
                Words from those we've walked with
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { quote: "For the first time in years I felt truly heard. No advice, no judgment — just understanding. Stillness gave me back my breath.", author: "Priya S.", role: "Design professional, Mumbai" },
                { quote: "I was sceptical about therapy. After the first session I couldn't believe how much lighter I felt. Devan has a rare gift for listening.", author: "Arjun K.", role: "Startup founder, Hyderabad" },
                { quote: "Anaya helped me understand why I kept repeating the same patterns. The clarity I gained here changed my relationships forever.", author: "Meera T.", role: "Teacher, Bangalore" },
              ].map((t, i) => (
                <Reveal key={t.author} delay={i * 100}>
                  <div className="testimonial-card">
                    <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                      {[...Array(5)].map((_, j) => <span key={j} style={{ color: T.gold, fontSize: "0.8rem" }}>★</span>)}
                    </div>
                    <p className="display" style={{ fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, lineHeight: 1.7, color: T.textMain, marginBottom: 24 }}>"{t.quote}"</p>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "0.85rem", color: T.textMain }}>{t.author}</div>
                      <div style={{ fontSize: "0.75rem", color: T.textSoft, marginTop: 3 }}>{t.role}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TRUST MARQUEE ═══ */}
        <section style={{ padding: "64px 0", overflow: "hidden", borderTop: `1px solid ${T.border}`, background: T.bgMain }}>
          <div className="marquee-wrap" style={{ display: "flex", gap: 0 }}>
            <div className="marquee-track" style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}>
              {[...Array(2)].map((_, rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center" }}>
                  {["Safe", "Private", "Confidential", "Judgment-Free", "Evidence-Based", "Human", "Caring", "Trusted"].map((w) => (
                    <span key={w} style={{ display: "inline-flex", alignItems: "center", gap: 40 }}>
                      <span className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: T.border, padding: "0 40px", letterSpacing: "-0.01em" }}>{w}</span>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accentDark, opacity: 0.4, flexShrink: 0 }} />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CLOSING CTA ═══ */}
        <section style={{ padding: "120px 48px", textAlign: "center", position: "relative", overflow: "hidden", background: T.bgSoft }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${T.accent}44, transparent 70%)` }} />
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 24 }}>Begin your journey</p>
              <h2 className="display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: 24, color: T.textMain }}>
                You are not alone.<br />
                <em style={{ color: T.accentDark }}>And you don't have to figure it all out by yourself.</em>
              </h2>
              <p style={{ fontSize: "1rem", color: T.textSoft, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 48px" }}>
                Your first step can be small. A single conversation. No pressure, no commitment. Just a gentle beginning.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                <Link to="/book" className="cta-btn">
                  <div className="cta-glow" />
                  <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 36px", borderRadius: 999, background: T.textMain, color: T.bgMain, fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.02em", textDecoration: "none" }}>
                    Begin gently
                    <span style={{ width: 24, height: 1, background: T.bgMain, display: "inline-block", opacity: 0.5 }} />
                  </span>
                </Link>
                <Link to="/therapists" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 999, border: `1px solid ${T.border}`, color: T.textSoft, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.3s", background: T.bgMain }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c0c0c0"; (e.currentTarget as HTMLAnchorElement).style.color = T.textMain; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = T.border; (e.currentTarget as HTMLAnchorElement).style.color = T.textSoft; }}>
                  Meet the therapists
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}