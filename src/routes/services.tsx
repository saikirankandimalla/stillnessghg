import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

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

/* ── useInView ── */
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

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── Design Tokens ── */
const T = {
  bg: "#F7F6F3",
  surface: "#FFFFFF",
  ink: "#111110",
  inkSoft: "#6B6B6F",
  inkFaint: "#A8A8AD",
  border: "#E8E7E3",
  accent: "#FADADD",   // Stillness blush
  // category palette
  cats: {
    mental:       { color: "#7C5CBF", tint: "#F0EBFA" },
    relationship: { color: "#C05478", tint: "#FAECF1" },
    career:       { color: "#2E917A", tint: "#E5F4F0" },
    family:       { color: "#B8832E", tint: "#FAF1E2" },
    specialised:  { color: "#3A72B8", tint: "#E8F0FA" },
    emotional:    { color: "#9D5490", tint: "#F8ECF6" },
    care:         { color: "#547B3E", tint: "#ECF4E7" },
  } as Record<string, { color: string; tint: string }>,
};

/* ── Data ── */
const categories = [
  { key: "all",          label: "All Services" },
  { key: "mental",       label: "Mental Health" },
  { key: "relationship", label: "Relationships" },
  { key: "career",       label: "Career & Growth" },
  { key: "family",       label: "Children & Family" },
  { key: "specialised",  label: "Specialised Support" },
  { key: "emotional",    label: "Emotional & Behavioural" },
  { key: "care",         label: "Specialised Care" },
];

type Service = { title: string; desc: string; slug: string; cat: string; img: string };

const services: Service[] = [
  { title: "Depression Counselling", desc: "Understand emotional lows, regain clarity, and rebuild motivation.", slug: "depression", cat: "mental", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=80" },
  { title: "Anxiety Counselling", desc: "Manage worry, calm your mind, and build emotional strength.", slug: "anxiety", cat: "mental", img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&auto=format&fit=crop&q=80" },
  { title: "Stress Management", desc: "Break overwhelming stress patterns and restore balance.", slug: "stress-management", cat: "mental", img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80" },
  { title: "Overthinking & Negative Thoughts", desc: "Reduce mental overload and develop clarity in decisions.", slug: "overthinking", cat: "mental", img: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&auto=format&fit=crop&q=80" },
  { title: "Sleep & Insomnia Support", desc: "Improve sleep patterns and manage restlessness.", slug: "sleep", cat: "mental", img: "https://images.unsplash.com/photo-1455642305367-68834a9d4337?w=600&auto=format&fit=crop&q=80" },
  { title: "Couple Counselling", desc: "Improve communication and strengthen emotional connection.", slug: "couple", cat: "relationship", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80" },
  { title: "Marriage Counselling", desc: "Resolve conflicts and rebuild trust.", slug: "marriage", cat: "relationship", img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=80" },
  { title: "Breakup & Divorce Counselling", desc: "Heal from emotional loss and rebuild confidence.", slug: "breakup", cat: "relationship", img: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&auto=format&fit=crop&q=80" },
  { title: "Pre & Post Marriage Counselling", desc: "Prepare for a strong relationship and married life.", slug: "pre-post-marriage", cat: "relationship", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80" },
  { title: "Domestic Violence Support", desc: "Safe space for healing, strength, and recovery.", slug: "domestic-violence", cat: "relationship", img: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&auto=format&fit=crop&q=80" },
  { title: "Career Counselling", desc: "Make confident career decisions aligned with your strengths.", slug: "career", cat: "career", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80" },
  { title: "Motivation & Productivity", desc: "Reconnect with purpose and take meaningful action.", slug: "motivation", cat: "career", img: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=600&auto=format&fit=crop&q=80" },
  { title: "Time Management", desc: "Build structure and balance in your daily life.", slug: "time-management", cat: "career", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80" },
  { title: "Work-Life Balance", desc: "Manage stress and improve overall well-being.", slug: "work-life-balance", cat: "career", img: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=600&auto=format&fit=crop&q=80" },
  { title: "Adolescent Counselling", desc: "Support teenagers through emotional and academic challenges.", slug: "adolescent", cat: "family", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80" },
  { title: "Parenting Support", desc: "Build confident and connected parenting skills.", slug: "parenting", cat: "family", img: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&auto=format&fit=crop&q=80" },
  { title: "Family Counselling", desc: "Improve communication and strengthen family relationships.", slug: "family", cat: "family", img: "https://images.unsplash.com/photo-1511895307984-ee87c1cf0bc6?w=600&auto=format&fit=crop&q=80" },
  { title: "Learning & Academic Support", desc: "Help students improve focus, memory, and performance.", slug: "academic-support", cat: "family", img: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&auto=format&fit=crop&q=80" },
  { title: "Trauma & PTSD Counselling", desc: "Heal from past experiences and regain stability.", slug: "trauma", cat: "specialised", img: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=600&auto=format&fit=crop&q=80" },
  { title: "ADHD Support", desc: "Improve focus, organization, and emotional regulation.", slug: "adhd", cat: "specialised", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80" },
  { title: "Grief Counselling", desc: "Process loss and find emotional healing.", slug: "grief", cat: "specialised", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80" },
  { title: "LGBTQIA+ Support", desc: "Safe, inclusive, and affirming counselling space.", slug: "lgbtq", cat: "specialised", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80" },
  { title: "Addiction & De-Addiction", desc: "Break dependency patterns and regain control.", slug: "addiction", cat: "specialised", img: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=600&auto=format&fit=crop&q=80" },
  { title: "Anger Management", desc: "Understand triggers and respond calmly and constructively.", slug: "anger-management", cat: "emotional", img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&auto=format&fit=crop&q=80" },
  { title: "Panic Attack Counselling", desc: "Build grounding and regulation skills for intense moments.", slug: "panic-attack", cat: "emotional", img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80" },
  { title: "Bipolar Disorder Counselling", desc: "Recognize early signs and manage emotional fluctuations.", slug: "bipolar", cat: "emotional", img: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&auto=format&fit=crop&q=80" },
  { title: "Low Self-Esteem Counselling", desc: "Rebuild self-worth and inner confidence.", slug: "low-self-esteem", cat: "emotional", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=80" },
  { title: "Negative Thinking Counselling", desc: "Reframe self-critical thoughts into a balanced mindset.", slug: "negative-thinking", cat: "emotional", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=80" },
  { title: "Behavioural Counselling", desc: "Replace unhelpful habits with healthier responses.", slug: "behavioural", cat: "emotional", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80" },
  { title: "Bullying Counselling", desc: "Rebuild confidence, safety, and emotional resilience.", slug: "bullying", cat: "emotional", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80" },
  { title: "Phobia Counselling", desc: "Gradual, structured techniques to face and reduce fear.", slug: "phobia", cat: "emotional", img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&auto=format&fit=crop&q=80" },
  { title: "Individual Counselling", desc: "A confidential space for clarity, self-awareness, and growth.", slug: "individual", cat: "care", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=80" },
  { title: "Couples Counselling", desc: "Build trust, empathy, and healthier relationship patterns.", slug: "couples", cat: "care", img: "https://images.unsplash.com/photo-1518621012420-8ab10887ea36?w=600&auto=format&fit=crop&q=80" },
  { title: "Divorce Counselling", desc: "Navigate separation with clarity, healing, and stability.", slug: "divorce", cat: "care", img: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&auto=format&fit=crop&q=80" },
  { title: "Sex Counselling", desc: "A respectful space to address intimacy and sexual well-being.", slug: "sex-counselling", cat: "care", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80" },
  { title: "PTSD Counselling", desc: "Process trauma and rebuild emotional stability.", slug: "ptsd", cat: "care", img: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=600&auto=format&fit=crop&q=80" },
  { title: "Suicidal Intervention", desc: "Immediate, judgment-free support during crisis.", slug: "suicidal-intervention", cat: "care", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80" },
  { title: "Psychodynamic Counselling", desc: "Understand deep emotional patterns rooted in the past.", slug: "psychodynamic", cat: "care", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=80" },
  { title: "Psychometric Testing", desc: "Scientific insight into abilities, personality, and behavior.", slug: "psychometric-testing", cat: "care", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80" },
  { title: "Learning Disability Support", desc: "Support for dyslexia, dysgraphia, dyscalculia, and more.", slug: "learning-disability", cat: "care", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80" },
  { title: "Abandonment Counselling", desc: "Heal from feelings of rejection and rebuild trust.", slug: "abandonment", cat: "care", img: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&auto=format&fit=crop&q=80" },
  { title: "Eating Disorders Counselling", desc: "Build a balanced, healthier relationship with food.", slug: "eating-disorders", cat: "care", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=80" },
  { title: "Personality Counselling", desc: "Understand your traits, patterns, and dynamics.", slug: "personality", cat: "care", img: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&auto=format&fit=crop&q=80" },
  { title: "Education Counselling", desc: "Clarity on courses, learning pathways, and academic goals.", slug: "education", cat: "care", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80" },
  { title: "Menopause Counselling", desc: "Support through emotional, physical, and lifestyle changes.", slug: "menopause", cat: "care", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=80" },
  { title: "Alzheimer's & Dementia Support", desc: "Structured support for memory decline and caregivers.", slug: "dementia", cat: "care", img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80" },
  { title: "EAP Counselling", desc: "Confidential workplace and personal well-being support.", slug: "eap", cat: "care", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80" },
];

/* ── Animated canvas hook ── */
function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PALETTE = ["#7C5CBF","#C05478","#2E917A","#B8832E","#3A72B8","#9D5490","#547B3E"];
    const pts = Array.from({ length: 44 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035 - 0.00025,
      r: 1.4 + Math.random() * 2.2,
      a: 0.12 + Math.random() * 0.35,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * W;
          const dy = (pts[i].y - pts[j].y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 90) * 0.09;
            ctx.strokeStyle = pts[i].color;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pts[i].x * W, pts[i].y * H);
            ctx.lineTo(pts[j].x * W, pts[j].y * H);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // dots
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        const pulse = Math.sin(frame * 0.018 + p.phase) * 0.5 + 0.5;
        ctx.save();
        ctx.globalAlpha = p.a * (0.55 + pulse * 0.45);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * (0.85 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

/* ════════════════════════════════════════════════
   HERO SUBCOMPONENTS
   ════════════════════════════════════════════════ */

/* Morphing SVG orb — ambient atmosphere */
function MorphOrb({ color, size, style }: { color: string; size: number; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", width: size, height: size, pointerEvents: "none", ...style }}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ animation: "svc3-morph 12s ease-in-out infinite" }}>
        <defs>
          <radialGradient id={`og-${color.replace("#","")}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          fill={`url(#og-${color.replace("#","")})`}
          d="M 100,30 C 130,10 170,40 175,80 C 180,120 160,165 120,175 C 80,185 35,160 25,120 C 15,80 40,20 80,15 C 90,13 95,32 100,30 Z"
          style={{ animation: "svc3-path 10s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}

/* Floating ticker strip */
const tickerItems = ["Depression", "Anxiety", "Grief", "Relationships", "Career", "ADHD", "Trauma", "Sleep", "Parenting", "Self-Esteem"];

function Ticker() {
  return (
    <div style={{ overflow: "hidden", width: "100%", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "10px 0", background: T.surface }}>
      <div style={{ display: "flex", animation: "svc3-ticker 22s linear infinite", width: "max-content", gap: 0 }}>
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} style={{ padding: "0 28px", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.inkSoft, whiteSpace: "nowrap" }}>
            {item}
            <span style={{ marginLeft: 28, color: T.border }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* Stat pill */
function StatPill({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "16px 22px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, minWidth: 110 }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: "0.7rem", color: T.inkSoft, marginTop: 4, letterSpacing: "0.04em" }}>{label}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════ */
function Services() {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  const { location } = useRouterState();
  const isSlugPath = location.pathname.startsWith("/services/") && location.pathname !== "/services";
  if (isSlugPath) return <Outlet />;

  const filtered = useMemo(() => services.filter(s => {
    const matchCat = activeCat === "all" || s.cat === activeCat;
    const q = query.trim().toLowerCase();
    const matchQ = !q || s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  }), [activeCat, query]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .svc3-root { font-family: 'DM Sans', sans-serif; background: ${T.bg}; color: ${T.ink}; }
        .svc3-root .display { font-family: 'Cormorant Garamond', serif; }

        /* ── Keyframes ── */
        @keyframes svc3-fade-rise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes svc3-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes svc3-morph {
          0%,100% { transform: scale(1) rotate(0deg); }
          33%     { transform: scale(1.07) rotate(6deg); }
          66%     { transform: scale(0.94) rotate(-4deg); }
        }
        @keyframes svc3-path {
          0%,100% { d: path("M 100,30 C 130,10 170,40 175,80 C 180,120 160,165 120,175 C 80,185 35,160 25,120 C 15,80 40,20 80,15 C 90,13 95,32 100,30 Z"); }
          50%     { d: path("M 95,25 C 140,5 180,50 170,95 C 160,140 130,170 90,178 C 50,186 20,155 18,110 C 16,65 50,10 85,18 C 91,20 90,26 95,25 Z"); }
        }
        @keyframes svc3-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes svc3-pulse-ring {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.5; }
          50%     { transform: translate(-50%,-50%) scale(1.1); opacity: 0.15; }
        }
        @keyframes svc3-card-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes svc3-line-grow {
          from { scaleY: 0; }
          to   { scaleY: 1; }
        }

        /* ── Hero layout ── */
        .svc3-hero {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 92vh;
          overflow: hidden;
          background: ${T.ink};
        }

        /* Left panel */
        .svc3-hero-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 56px 80px 64px;
          z-index: 2;
        }

        /* Right panel */
        .svc3-hero-right {
          position: relative;
          overflow: hidden;
        }

        .svc3-hero-right-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.55;
          transition: transform 12s ease;
          animation: svc3-img-drift 18s ease-in-out infinite alternate;
        }

        @keyframes svc3-img-drift {
          from { transform: scale(1.05) translate(0,0); }
          to   { transform: scale(1.12) translate(-12px, -8px); }
        }

        .svc3-hero-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, ${T.ink} 0%, ${T.ink}88 30%, transparent 60%);
          z-index: 1;
        }

        .svc3-hero-right-card {
          position: absolute;
          bottom: 52px;
          right: 40px;
          z-index: 3;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 24px 28px;
          min-width: 200px;
          animation: svc3-fade-rise 0.9s cubic-bezier(.16,1,.3,1) 1s both;
        }

        /* Vertical divider line */
        .svc3-hero-divider {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%;
          width: 1px;
          background: rgba(255,255,255,0.08);
          z-index: 10;
          transform-origin: top;
          animation: svc3-fade-rise 1.2s ease 0.3s both;
        }

        /* Hero text reveals */
        .svc3-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.5);
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          margin-bottom: 28px;
          opacity: 0;
          animation: svc3-fade-rise 0.7s cubic-bezier(.16,1,.3,1) 0.2s forwards;
        }

        .svc3-hero-h1 {
          color: #fff;
          font-size: clamp(2.8rem, 4.5vw, 5rem);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin-bottom: 28px;
          opacity: 0;
          animation: svc3-fade-rise 0.8s cubic-bezier(.16,1,.3,1) 0.35s forwards;
        }

        .svc3-hero-sub {
          color: rgba(255,255,255,0.58);
          font-size: 0.95rem;
          line-height: 1.85;
          max-width: 360px;
          margin-bottom: 48px;
          opacity: 0;
          animation: svc3-fade-rise 0.7s cubic-bezier(.16,1,.3,1) 0.5s forwards;
        }

        .svc3-hero-cta-row {
          display: flex; align-items: center; gap: 16px;
          opacity: 0;
          animation: svc3-fade-rise 0.7s cubic-bezier(.16,1,.3,1) 0.65s forwards;
        }

        .svc3-hero-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 30px; border-radius: 999px;
          background: #fff; color: ${T.ink};
          font-size: 0.85rem; font-weight: 500;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
        }
        .svc3-hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(255,255,255,0.35); }

        .svc3-hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.65); font-size: 0.82rem;
          border: none; background: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.25s;
          text-decoration: none;
        }
        .svc3-hero-btn-ghost:hover { color: #fff; }

        .svc3-hero-stats {
          display: flex; gap: 12px; margin-top: 56px;
          opacity: 0;
          animation: svc3-fade-rise 0.7s cubic-bezier(.16,1,.3,1) 0.8s forwards;
        }

        /* Canvas */
        .svc3-canvas {
          position: absolute;
          inset: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* Pulse rings */
        .svc3-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07);
          animation: svc3-pulse-ring 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* Spinning orbit */
        .svc3-spin { animation: svc3-spin-slow 10s linear infinite; }

        /* ── Filter bar ── */
        .svc3-filter-bar {
          position: sticky; top: 0; z-index: 20;
          background: ${T.bg}ee;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${T.border};
        }

        .svc3-filter-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 32px;
          display: flex; align-items: stretch;
        }

        .svc3-search-wrap {
          position: relative;
          flex: 0 0 260px;
          border-right: 1px solid ${T.border};
          display: flex; align-items: center;
        }

        .svc3-search {
          width: 100%; padding: 16px 16px 16px 44px;
          border: none; background: transparent;
          font-size: 0.85rem; color: ${T.ink};
          font-family: 'DM Sans', sans-serif;
          outline: none;
        }
        .svc3-search::placeholder { color: ${T.inkFaint}; }

        .svc3-pills-wrap {
          display: flex; gap: 0; overflow-x: auto;
          scrollbar-width: none; flex: 1;
          padding: 0 8px;
        }
        .svc3-pills-wrap::-webkit-scrollbar { display: none; }

        .svc3-pill {
          padding: 18px 18px;
          border: none; border-bottom: 2px solid transparent;
          background: transparent;
          color: ${T.inkSoft}; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          white-space: nowrap; font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }
        .svc3-pill:hover { color: ${T.ink}; }
        .svc3-pill.active { color: ${T.ink}; border-bottom-color: ${T.ink}; }

        /* ── Grid ── */
        .svc3-grid-section { max-width: 1280px; margin: 0 auto; padding: 48px 32px 72px; }

        .svc3-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* ── Cards ── */
        .svc3-card {
          position: relative;
          background: ${T.surface};
          border: 1px solid ${T.border};
          border-radius: 24px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          color: ${T.ink};
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s cubic-bezier(.16,1,.3,1), transform 0.55s cubic-bezier(.16,1,.3,1), box-shadow 0.45s, border-color 0.4s;
        }
        .svc3-card.svc3-card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .svc3-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 32px 56px -20px rgba(17,17,16,0.18);
          border-color: transparent;
        }

        .svc3-card-img-wrap { position: relative; height: 170px; overflow: hidden; }
        .svc3-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.65s cubic-bezier(.16,1,.3,1); }
        .svc3-card:hover .svc3-card-img { transform: scale(1.09); }

        .svc3-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.38) 100%);
        }

        .svc3-cat-badge {
          position: absolute; top: 12px; left: 12px;
          padding: 5px 12px; border-radius: 999px;
          background: rgba(255,255,255,0.93); backdrop-filter: blur(10px);
          font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
        }

        .svc3-card-body { padding: 22px 20px; position: relative; overflow: hidden; }

        .svc3-card-glow {
          position: absolute; top: -45%; right: -25%;
          width: 210px; height: 210px; border-radius: 50%;
          opacity: 0; transition: opacity 0.5s;
          filter: blur(38px); pointer-events: none;
        }
        .svc3-card:hover .svc3-card-glow { opacity: 0.32; }

        .svc3-card-inner { position: relative; z-index: 1; }
        .svc3-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }

        .svc3-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.38rem; font-weight: 500; line-height: 1.22;
        }

        .svc3-card-desc { font-size: 0.83rem; color: ${T.inkSoft}; line-height: 1.7; }

        .svc3-arrow {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid ${T.border}; background: ${T.surface};
          flex-shrink: 0;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), border-color 0.3s;
        }
        .svc3-card:hover .svc3-arrow { transform: rotate(45deg); }

        /* ── CTA ── */
        .svc3-cta {
          position: relative; overflow: hidden;
          background: ${T.ink}; color: #fff;
          padding: 110px 32px;
          text-align: center;
        }

        .svc3-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          font-weight: 300; line-height: 1.15;
          margin-bottom: 40px; position: relative; z-index: 1;
        }

        .svc3-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; border-radius: 999px;
          background: #fff; color: ${T.ink};
          font-size: 0.88rem; font-weight: 500;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative; z-index: 1; text-decoration: none;
        }
        .svc3-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 36px -8px rgba(255,255,255,0.3); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .svc3-hero { grid-template-columns: 1fr; min-height: auto; }
          .svc3-hero-right { height: 300px; }
          .svc3-hero-left { padding: 80px 28px 60px; }
          .svc3-hero-divider { display: none; }
          .svc3-filter-inner { flex-direction: column; }
          .svc3-search-wrap { flex: none; border-right: none; border-bottom: 1px solid ${T.border}; }
          .svc3-grid-section { padding: 36px 16px 56px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="svc3-root">

        {/* ════════ HERO — FULL BLEED SPLIT ════════ */}
        <section className="svc3-hero">

          {/* Vertical divider */}
          <div className="svc3-hero-divider" />

          {/* ── LEFT PANEL ── */}
          <div className="svc3-hero-left">
            {/* Canvas particles live behind the text */}
            <canvas ref={canvasRef} className="svc3-canvas" />

            {/* Ambient morph orbs */}
            <MorphOrb color="#7C5CBF" size={340} style={{ top: -80, left: -100, zIndex: 0 }} />
            <MorphOrb color="#C05478" size={280} style={{ bottom: 40, right: -60, zIndex: 0, animationDelay: "-4s" }} />

            {/* Pulse rings centred on left panel */}
            <div className="svc3-ring" style={{ width: 300, height: 300, animationDelay: "0s" }} />
            <div className="svc3-ring" style={{ width: 440, height: 440, animationDelay: "1.2s" }} />
            <div className="svc3-ring" style={{ width: 580, height: 580, animationDelay: "2.4s" }} />

            <div style={{ position: "relative", zIndex: 3 }}>
              <div className="svc3-hero-eyebrow">
                <svg className="svc3-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="4 4"/>
                </svg>
                {services.length}+ counselling services
              </div>

              <h1 className="svc3-hero-h1 display">
                Whatever<br />
                you're<br />
                <em style={{ fontStyle: "italic", color: T.accent }}>carrying,</em><br />
                there's support.
              </h1>

              <p className="svc3-hero-sub">
                Browse every counselling service we offer — from anxiety and grief to career clarity and family healing. One calm space, many paths forward.
              </p>

              <div className="svc3-hero-cta-row">
                <Link to="/book" className="svc3-hero-btn-primary">
                  Book a session
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href="#svc-grid" className="svc3-hero-btn-ghost">
                  Browse services
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              <div className="svc3-hero-stats">
                <StatPill value="40+" label="Services" color={T.accent} />
                <StatPill value="7" label="Care areas" color="#7C5CBF" />
                <StatPill value="∞" label="Support paths" color="#2E917A" />
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="svc3-hero-right">
            <img
              className="svc3-hero-right-img"
              src="https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1200&auto=format&fit=crop&q=80"
              alt="Peaceful nature scene"
            />
            <div className="svc3-hero-right-overlay" />

            {/* Floating glass card */}
            <div className="svc3-hero-right-card" style={{ zIndex: 4, position: "absolute" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
                Current focus areas
              </p>
              {[
                { label: "Mental Health", color: "#7C5CBF", w: "85%" },
                { label: "Relationships", color: "#C05478", w: "72%" },
                { label: "Career & Growth", color: "#2E917A", w: "60%" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>{item.label}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 2, background: item.color, width: item.w,
                      animation: `svc3-fade-rise 1s ease ${0.9 + i * 0.15}s both`,
                      transition: "width 1s cubic-bezier(.16,1,.3,1)",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ════════ TICKER ════════ */}
        <Ticker />

        {/* ════════ FILTER BAR ════════ */}
        <div className="svc3-filter-bar" id="svc-grid">
          <div className="svc3-filter-inner">
            <div className="svc3-search-wrap">
              <svg style={{ position: "absolute", left: 16, pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke={T.inkFaint} strokeWidth="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={T.inkFaint} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                className="svc3-search"
                type="text"
                placeholder="Search services…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="svc3-pills-wrap">
              {categories.map(c => (
                <button
                  key={c.key}
                  className={`svc3-pill${activeCat === c.key ? " active" : ""}`}
                  onClick={() => setActiveCat(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ════════ GRID ════════ */}
        <div className="svc3-grid-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
            <p style={{ fontSize: "0.78rem", color: T.inkSoft }}>
              Showing <strong style={{ color: T.ink }}>{filtered.length}</strong> service{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>🔍</div>
              <p className="display" style={{ fontSize: "1.6rem", fontWeight: 300, marginBottom: 8 }}>Nothing matches that search</p>
              <p style={{ color: T.inkSoft, fontSize: "0.88rem" }}>Try a different keyword or browse all services.</p>
            </div>
          ) : (
            <div className="svc3-grid">
              {filtered.map((s, i) => {
                const cat = T.cats[s.cat] ?? { color: T.inkSoft, tint: T.bg };
                const catLabel = categories.find(c => c.key === s.cat)?.label ?? s.cat;
                return (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="svc3-card"
                    ref={(el) => {
                      if (el) {
                        setTimeout(() => el.classList.add("svc3-card-visible"), (i % 12) * 50 + 60);
                      }
                    }}
                  >
                    <div className="svc3-card-img-wrap">
                      <img className="svc3-card-img" src={s.img} alt={s.title} loading="lazy" />
                      <div className="svc3-card-overlay" />
                      <div className="svc3-cat-badge" style={{ color: cat.color }}>{catLabel}</div>
                    </div>
                    <div className="svc3-card-body">
                      <div className="svc3-card-glow" style={{ background: cat.color }} />
                      <div className="svc3-card-inner">
                        <div className="svc3-card-head">
                          <h3 className="svc3-card-title">{s.title}</h3>
                          <div className="svc3-arrow" style={{ borderColor: `${cat.color}44`, color: cat.color }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <p className="svc3-card-desc">{s.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ════════ CTA ════════ */}
        <section className="svc3-cta">
          <MorphOrb color="#7C5CBF" size={400} style={{ top: -100, left: "15%", opacity: 0.3 }} />
          <MorphOrb color="#2E917A" size={350} style={{ bottom: -80, right: "10%", opacity: 0.25, animationDelay: "-5s" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto" }}>
            <Reveal>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
                Ready when you are
              </p>
              <h2 className="svc3-cta-title">
                Your first session is<br />just a <em style={{ fontStyle: "italic", color: T.accent }}>gentle conversation.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <Link to="/book" className="svc3-cta-btn">
                Book a session
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}