import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroOcean from "@/assets/hero-ocean.jpg";
import silhouette from "@/assets/silhouette.jpg";
import stones from "@/assets/stones.jpg";
import ripples from "@/assets/ripples.jpg";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stillness Therapy — Online Support for Anxiety & Healing" },
      { name: "description", content: "Stillness offers calm online therapy for anxiety, burnout, relationships, grief, and personal growth in a safe, confidential space." },
      { property: "og:title", content: "Stillness Therapy — Online Support for Anxiety & Healing" },
      { property: "og:description", content: "Calm online therapy for anxiety, burnout, relationships, grief, and personal growth." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <SplitSection />
      <FloatingClusters />

      {/* ── NEW: Mindscape interactive canvas ── */}
      <MindscapeCanvas />

      <ServiceLayers />

      {/* ── NEW: Editorial horizontal showcase ── */}
      <EditorialShowcase />

      <PhilosophyStrip />
      <Testimonial />

      {/* ── NEW: Animated breath stats ── */}
      <BreathStats />

      <ProcessRibbon />
      <SupportSignals />
      <ClosingCTA />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXISTING SECTIONS — untouched
   ═══════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden flex items-center justify-center">
      <img
        src={heroOcean}
        alt="Calm ocean horizon with soft light from above"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover hero-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/20 to-background/75" />
      <div className="absolute inset-0 bg-window opacity-70" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="500,0 700,0 800,800 400,800" fill="url(#beam)" />
        <polygon points="560,0 640,0 680,800 520,800" fill="url(#beam)" opacity="0.7" />
      </svg>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-glow-soft blur-3xl animate-breathe opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mint-soft blur-3xl animate-breathe opacity-40" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="opacity-0 animate-fade-blur" style={{ animationDelay: "0.6s" }}>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-8">A quiet place to begin</p>
        </div>
        <h1 className="opacity-0 animate-fade-blur font-display text-6xl md:text-8xl tracking-tight text-balance" style={{ animationDelay: "1.2s" }}>
          Take a breath.
          <span className="block mt-2 text-foreground/70">You're safe here.</span>
        </h1>
        <p className="opacity-0 animate-fade-blur mt-8 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed" style={{ animationDelay: "2s" }}>
          You don't have to carry everything alone. We're here to listen, understand, and support you.
        </p>
        <div className="opacity-0 animate-fade-blur mt-12" style={{ animationDelay: "2.6s" }}>
          <Link
            to="/book"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background text-sm tracking-wide animate-glow-pulse hover:bg-foreground/90 transition-colors"
          >
            Start your journey
            <span className="inline-block w-6 h-px bg-background/70" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-[0.3em] uppercase opacity-0 animate-fade-blur" style={{ animationDelay: "3s" }}>
        scroll gently
        <div className="mt-3 mx-auto w-px h-10 bg-foreground/20" />
      </div>
    </section>
  );
}

function SplitSection() {
  const lines = [
    "You are overwhelmed.",
    "You are tired.",
    "You need space.",
    "You are searching.",
    "You are healing.",
    "You are still here.",
  ];
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-10 bg-cement/40">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div className="md:sticky md:top-32 self-start reveal-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">A reminder</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-balance">
            You are not<br />broken.
          </h2>
          <div className="mt-8 w-12 h-px bg-foreground/40" />
        </div>
        <div className="relative pl-8 md:pl-12 border-l border-border/60 space-y-20 md:space-y-28">
          {lines.map((line, i) => (
            <p
              key={i}
              data-delay={i * 80}
              className="reveal-blur font-display text-3xl md:text-5xl text-foreground/80 leading-tight text-balance"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function FloatingClusters() {
  const [rotation, setRotation] = useState(0);
  const [activeItem, setActiveItem] = useState<any>(null);

  const items = [
    {
      word: "Depression",
      angle: 0,
      radius: 220,
      size: "text-5xl md:text-7xl",
      description:
        "Persistent sadness, loss of interest, and emotional exhaustion.",
    },
    {
      word: "Relationship",
      angle: 60,
      radius: 280,
      size: "text-4xl md:text-6xl",
      description:
        "Support for conflicts, communication, trust, and connection.",
    },
    {
      word: "Career",
      angle: 120,
      radius: 230,
      size: "text-5xl md:text-7xl",
      description:
        "Navigate career transitions and professional growth.",
    },
    {
      word: "Anxiety",
      angle: 180,
      radius: 180,
      size: "text-3xl md:text-5xl",
      description:
        "Manage overthinking, fears, panic, and uncertainty.",
    },
    {
      word: "Grief",
      angle: 240,
      radius: 250,
      size: "text-3xl md:text-4xl",
      description:
        "Support through loss, healing, and life transitions.",
    },
    {
      word: "Family",
      angle: 300,
      radius: 210,
      size: "text-3xl md:text-4xl",
      description:
        "Improve family relationships and communication.",
    },
  ];

  // ONLY MOVE POSITIONS
  // WORDS NEVER ROTATE
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-pink-glow-soft opacity-40" />

      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Where to begin
        </p>

        <h2 className="font-display text-4xl md:text-6xl tracking-tight">
          What are you feeling right now?
        </h2>

        <p className="mt-4 text-muted-foreground">
          There are no wrong answers. Choose a word that feels true.
        </p>
      </div>

      <div className="relative h-[700px] max-w-7xl mx-auto">

        {/* LEFT CLUSTER */}
        <div className="absolute left-0 w-[70%] h-full">

          {items.map((item, index) => {
            const angle =
              ((item.angle + rotation) * Math.PI) / 180;

            const centerX = 420;
            const centerY = 320;

            const x =
              centerX + Math.cos(angle) * item.radius;

            const y =
              centerY + Math.sin(angle) * item.radius;

            return (
              <button
                key={index}
                onMouseEnter={() => setActiveItem(item)}
                onClick={() => setActiveItem(item)}
                className={`
                  absolute
                  ${item.size}
                  font-display
                  tracking-tight
                  text-foreground/40
                  hover:text-foreground
                  hover:scale-105
                  blur-[2px]
                  hover:blur-0
                  transition-all
                  duration-700
                  whitespace-nowrap
                  cursor-pointer
                  select-none
                `}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {item.word}
              </button>
            );
          })}
        </div>

        {/* OVERLAY CARD */}
        {activeItem && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setActiveItem(null)}
            />

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-[380px] animate-slideIn">
              <div className="relative rounded-3xl border border-white/10 bg-background/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                <div className="absolute -left-3 top-10 w-6 h-6 rotate-45 bg-background/90 border-l border-b border-white/10" />

                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 text-xl"
                >
                  ✕
                </button>

                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  Support Area
                </p>

                <h3 className="text-3xl font-display mb-4">
                  {activeItem.word}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(40px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }

        .animate-slideIn {
          animation: slideIn .4s ease forwards;
        }
      `}</style>
    </section>
  );
}


function ServiceLayers() {
  const layers = [
    { title: "Emotional wellbeing", body: "Soft teal supports steadiness and safety for anxiety, stress, overthinking, and low mood.", anim: "reveal-blur", tone: "tone-wellbeing" },
    { title: "Relationship & family", body: "Sea-glass tones support openness, empathy, and clearer communication between people.", anim: "reveal-left", tone: "tone-connection" },
    { title: "Career & growth", body: "Deeper ocean blues support focus, confidence, and forward movement when life feels stuck.", anim: "reveal-rise", tone: "tone-growth" },
  ];
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-6xl mx-auto mb-24 reveal-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Support tailored for you</p>
        <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl text-balance">
          A different kind of care for each layer of life.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Each service is shaped with a specific emotional tone so the page feels calmer, safer, and more intuitive for the concern you are facing.
        </p>
      </div>
      <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
        {layers.map((l, i) => (
          <div key={i} className={`relative ${l.anim} ${l.tone} grid md:grid-cols-12 gap-8 items-center`} data-delay={i * 100}>
            <div className="absolute -inset-x-10 -inset-y-20 bg-tone-glow opacity-70 blur-2xl -z-10" />
            <div className="md:col-span-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">0{i + 1}</div>
            <h3 className="md:col-span-5 font-display text-4xl md:text-6xl tracking-tight text-tone">{l.title}</h3>
            <p className="md:col-span-5 text-lg text-muted-foreground leading-relaxed">{l.body}</p>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-24 reveal">
        <Link to="/services" className="inline-flex items-center gap-3 text-sm border-b border-foreground/30 pb-1 hover:border-foreground transition-colors">
          See every kind of support
          <span className="inline-block w-6 h-px bg-foreground/60" />
        </Link>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="relative py-40 md:py-56 px-6 overflow-hidden bg-cement/50">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={silhouette}
          alt="Soft silhouette looking out at calm water"
          width={1080}
          height={1600}
          loading="lazy"
          className="absolute left-1/2 top-1/2 w-[640px] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 opacity-50 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 reveal">In their words</p>
        <blockquote className="reveal-blur font-display text-4xl md:text-6xl tracking-tight leading-tight text-balance">
          "I felt understood for the first time in a long time."
        </blockquote>
        <div className="mt-10 text-sm text-muted-foreground reveal">— Anonymous, after 6 sessions</div>
      </div>
    </section>
  );
}

function SupportSignals() {
  const points = [
    { title: "Confidential care", body: "Private, respectful conversations where you can speak freely without pressure.", tone: "tone-restore" },
    { title: "Evidence-informed support", body: "Practical guidance for anxiety, burnout, relationship stress, grief, and life transitions.", tone: "tone-growth" },
    { title: "Online, flexible sessions", body: "A calmer therapy rhythm that fits work, family life, and changing emotional energy.", tone: "tone-family" },
  ];
  return (
    <section className="px-6 md:px-10 py-32 md:py-40 bg-cement/35">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl reveal-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Why people choose Stillness</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance">
            Calm design, clear support, and space to think again.
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <article
              key={point.title}
              className={`reveal-blur ${point.tone} border border-border/60 bg-background/70 p-8`}
              data-delay={index * 120}
            >
              <div className="mb-6 h-24 bg-tone-glow opacity-70" />
              <h3 className="font-display text-2xl tracking-tight text-tone">{point.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyStrip() {
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 relative reveal-left">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-cement/60 shadow-soft">
            <img src={stones} alt="Smooth stones balanced in still water" width={1024} height={1280} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-pink-glow-soft blur-2xl animate-breathe -z-10" />
        </div>
        <div className="md:col-span-7 reveal-blur" data-delay="200">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Why ocean, why slow</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance leading-[1.05]">
            The mind quiets where the water meets the sky.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Color psychology calls deep blues and seafoam tones the most calming.
            We borrow their rhythm — slow tides, soft horizons — and design every
            session, every page, around the same feeling.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["94%", "feel calmer after first session"],
              ["6mo", "average healing journey"],
              ["100%", "confidential, always"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-foreground">{n}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-snug">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessRibbon() {
  const steps = [
    ["01", "Reach out", "Whenever you're ready. No pressure, no commitment."],
    ["02", "First conversation", "A gentle 30-minute session to feel each other out."],
    ["03", "Your rhythm", "Weekly, fortnightly, or whatever your life allows."],
    ["04", "Walk forward", "Together — at your pace, in your direction."],
  ];
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48 overflow-hidden">
      <img src={ripples} alt="Calm ocean ripples" width={1920} height={1080} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative max-w-7xl mx-auto">
        <div className="reveal-blur mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">How it begins</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance">
            Four small steps. None of them rushed.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-10 relative">
          <div className="hidden md:block absolute top-3 left-[5%] right-[5%] h-px bg-foreground/20" />
          {steps.map(([n, t, b], i) => (
            <div key={n} className="reveal-blur relative" data-delay={i * 150}>
              <div className="w-2.5 h-2.5 rounded-full bg-foreground relative z-10" />
              <div className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">{n}</div>
              <h3 className="mt-2 font-display text-2xl tracking-tight">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-40 md:py-56 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-window opacity-80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-glow-soft blur-3xl animate-breathe" />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="reveal-blur font-display text-5xl md:text-7xl tracking-tight text-balance">
          You don't have to carry this alone.
        </h2>
        <p className="reveal mt-6 text-lg text-muted-foreground" data-delay="200">
          Take the first quiet step. We'll walk the rest at your pace.
        </p>
        <div className="reveal mt-12" data-delay="400">
          <Link
            to="/book"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-sm animate-glow-pulse"
          >
            Book a session
            <span className="inline-block w-6 h-px bg-background/70" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 1 — MINDSCAPE CANVAS
   Interactive particle-neural network. Emotion orbs float and
   connect. Mouse proximity pulls them gently. Clicking one
   ripples outward and navigates to /services.
   ═══════════════════════════════════════════════════════════ */
function MindscapeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const NODES = [
    { label: "Anxiety",      color: "#7C5CBF", r: 52 },
    { label: "Grief",        color: "#C05478", r: 44 },
    { label: "Burnout",      color: "#2E917A", r: 48 },
    { label: "Relationships",color: "#B8832E", r: 60 },
    { label: "Self-Esteem",  color: "#3A72B8", r: 46 },
    { label: "Trauma",       color: "#9D5490", r: 42 },
    { label: "Career",       color: "#547B3E", r: 50 },
    { label: "Family",       color: "#C05478", r: 38 },
    { label: "Sleep",        color: "#2E917A", r: 40 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    type NodeState = {
      label: string; color: string; r: number;
      x: number; y: number; vx: number; vy: number;
      ox: number; oy: number; phase: number; pulse: number;
    };
    let nodes: NodeState[] = [];

    const init = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      nodes = NODES.map((n) => {
        const x = 80 + Math.random() * (W - 160);
        const y = 80 + Math.random() * (H - 160);
        return { ...n, x, y, ox: x, oy: y, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, phase: Math.random() * Math.PI * 2, pulse: 0 };
      });
    };

    init();
    window.addEventListener("resize", init);

    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = "touches" in e ? e.touches[0] : e;
      mouse.current = { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onMove as EventListener);

    let frame = 0;
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, W, H);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const maxD = 220;
          if (d < maxD) {
            const alpha = (1 - d / maxD) * 0.18;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, a.color + Math.round(alpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, b.color + Math.round(alpha * 255).toString(16).padStart(2, "0"));
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - d / maxD) * 1.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((n) => {
        // drift
        const driftAmt = Math.sin(frame * 0.008 + n.phase) * 18;
        const targetX = n.ox + Math.cos(n.phase) * driftAmt;
        const targetY = n.oy + Math.sin(n.phase * 1.3) * driftAmt;

        // mouse attraction
        const mdx = mouse.current.x - n.x;
        const mdy = mouse.current.y - n.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        const attract = md < 180 ? (180 - md) / 180 * 0.04 : 0;

        n.x += (targetX - n.x) * 0.018 + mdx * attract;
        n.y += (targetY - n.y) * 0.018 + mdy * attract;

        // keep in bounds
        n.x = Math.max(n.r + 10, Math.min(W - n.r - 10, n.x));
        n.y = Math.max(n.r + 10, Math.min(H - n.r - 10, n.y));

        // pulse decay
        if (n.pulse > 0) n.pulse *= 0.92;

        const breathScale = 1 + Math.sin(frame * 0.022 + n.phase) * 0.04;
        const r = n.r * breathScale + n.pulse * 20;

        // outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, r * 0.3, n.x, n.y, r * 2.2);
        grd.addColorStop(0, n.color + "33");
        grd.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // core circle
        const coreGrd = ctx.createRadialGradient(n.x - r * 0.3, n.y - r * 0.3, r * 0.1, n.x, n.y, r);
        coreGrd.addColorStop(0, n.color + "ee");
        coreGrd.addColorStop(1, n.color + "88");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = coreGrd;
        ctx.fill();

        // border
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + "55";
        ctx.lineWidth = 1;
        ctx.stroke();

        // label
        ctx.fillStyle = "#ffffff";
        ctx.font = `500 ${Math.max(10, r * 0.28)}px 'DM Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      });
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onMove as EventListener);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // find closest node and pulse it
    (canvas as any).__nodes?.forEach((n: any) => {
      const d = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
      if (d < n.r + 20) n.pulse = 1;
    });
  };

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 50%, transparent 100%)" }}>
      <style>{`
        @keyframes ms-header-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ms-header { animation: ms-header-in 0.8s cubic-bezier(.16,1,.3,1) 0.2s both; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-10 ms-header">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">The emotional landscape</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance max-w-xl">
            Every feeling has a name. And a path forward.
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Move your cursor through the field below. Each orb is a real concern we support — nothing here is too small or too heavy.
          </p>
        </div>
      </div>

      <div className="relative mx-auto" style={{ maxWidth: "100%", height: "520px" }}>
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C5CBF, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C05478, transparent)" }} />
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #2E917A, transparent)" }} />
        </div>

        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="w-full h-full cursor-crosshair"
          aria-label="Interactive emotion landscape — hover to explore"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-8 flex items-center justify-between">
        <p className="text-xs text-muted-foreground tracking-wide">hover · explore · connect</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm border-b border-foreground/25 pb-0.5 hover:border-foreground transition-colors"
        >
          See all support areas
          <span className="inline-block w-5 h-px bg-foreground/50" />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 2 — EDITORIAL SHOWCASE
   Full-bleed horizontal scroll strip. Large overlapping
   editorial cards with oversized type, category colors,
   and a slow parallax on the images.
   ═══════════════════════════════════════════════════════════ */
function EditorialShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const cards = [
    {
      cat: "Mental Health",
      headline: "When the mind won't quiet down.",
      sub: "Anxiety · Depression · Overthinking · Sleep",
      color: "#7C5CBF",
      tint: "#F0EBFA",
      img: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&auto=format&fit=crop&q=70",
      slug: "anxiety",
      num: "01",
    },
    {
      cat: "Relationships",
      headline: "The people we love — and lose.",
      sub: "Couples · Marriage · Breakup · Family",
      color: "#C05478",
      tint: "#FAECF1",
      img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=70",
      slug: "couple",
      num: "02",
    },
    {
      cat: "Career & Growth",
      headline: "Purpose is not a luxury.",
      sub: "Career · Motivation · Work-Life Balance",
      color: "#2E917A",
      tint: "#E5F4F0",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=70",
      slug: "career",
      num: "03",
    },
    {
      cat: "Grief & Trauma",
      headline: "Grief is love with nowhere to go.",
      sub: "Grief · Trauma · PTSD · Loss",
      color: "#3A72B8",
      tint: "#E8F0FA",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=70",
      slug: "grief",
      num: "04",
    },
    {
      cat: "Children & Family",
      headline: "Every family deserves a steadier ground.",
      sub: "Parenting · Adolescent · Academic",
      color: "#B8832E",
      tint: "#FAF1E2",
      img: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&auto=format&fit=crop&q=70",
      slug: "parenting",
      num: "05",
    },
  ];

  // Scroll-to-horizontal-scroll using pin technique
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);

      // move track
      const maxTranslate = track.scrollWidth - track.offsetWidth;
      track.style.transform = `translateX(${-p * maxTranslate}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .es-section { height: 300vh; }
        .es-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
        .es-track { display: flex; gap: 24px; padding: 0 64px; will-change: transform; transition: none; }
        .es-card {
          flex: 0 0 420px;
          height: 580px;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .es-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(.16,1,.3,1); }
        .es-card:hover img { transform: scale(1.06); }
        .es-card-overlay { position: absolute; inset: 0; }
        .es-card-body { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 36px 32px; }
        .es-num { position: absolute; top: 28px; right: 28px; font-size: 4rem; font-weight: 300; font-family: 'Cormorant Garamond', serif; opacity: 0.22; color: #fff; line-height: 1; }
        .es-cat-tag { display: inline-block; padding: 5px 14px; border-radius: 999px; font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; margin-bottom: 14px; background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); color: #fff; width: fit-content; }
        .es-headline { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; line-height: 1.2; color: #fff; margin-bottom: 12px; }
        .es-sub { font-size: 0.72rem; letter-spacing: 0.06em; color: rgba(255,255,255,0.65); }
        .es-arrow { position: absolute; bottom: 36px; right: 32px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; transition: background 0.3s, transform 0.4s cubic-bezier(.16,1,.3,1); }
        .es-card:hover .es-arrow { background: rgba(255,255,255,0.35); transform: rotate(45deg); }
        .es-progress { height: 2px; background: rgba(0,0,0,0.08); }
        .es-progress-bar { height: 100%; transition: width 0.05s linear; }

        @media (max-width: 768px) {
          .es-section { height: auto; }
          .es-sticky { position: relative; height: auto; overflow: visible; }
          .es-track { overflow-x: auto; transform: none !important; padding: 0 24px; scrollbar-width: none; }
          .es-track::-webkit-scrollbar { display: none; }
          .es-card { flex: 0 0 300px; height: 420px; }
        }
      `}</style>

      <div className="es-section" ref={sectionRef}>
        <div className="es-sticky">
          {/* Header */}
          <div className="px-16 mb-10 reveal-blur">
            <div className="flex items-end justify-between max-w-none">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Areas of support</p>
                <h2 className="font-display text-4xl md:text-6xl tracking-tight">
                  Where would you like to begin?
                </h2>
              </div>
              <p className="hidden md:block text-sm text-muted-foreground max-w-[200px] text-right leading-relaxed mb-1">
                Scroll to explore every area we work in
              </p>
            </div>
          </div>

          {/* Scrolling track */}
          <div className="overflow-hidden">
            <div className="es-track" ref={trackRef}>
              {cards.map((card) => (
                <Link
                  key={card.slug}
                  to="/services/$slug"
                  params={{ slug: card.slug }}
                  className="es-card"
                >
                  <img src={card.img} alt={card.cat} loading="lazy" />
                  <div
                    className="es-card-overlay"
                    style={{ background: `linear-gradient(180deg, transparent 25%, ${card.color}bb 75%, ${card.color}ee 100%)` }}
                  />
                  <div className="es-card-body">
                    <span className="es-num">{card.num}</span>
                    <span className="es-cat-tag">{card.cat}</span>
                    <p className="es-headline">{card.headline}</p>
                    <p className="es-sub">{card.sub}</p>
                  </div>
                  <div className="es-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 19L19 5M19 5H8M19 5V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}

              {/* End card */}
              <Link
                to="/services"
                className="es-card flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}
              >
                <div className="text-center px-8">
                  <p className="font-display text-5xl text-white/20 mb-4">40+</p>
                  <p className="font-display text-2xl text-white mb-3">All services</p>
                  <p className="text-sm text-white/50 mb-8 leading-relaxed">Every concern. Every stage of life. One safe space.</p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs tracking-wide">
                    Browse all
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Progress bar */}
          <div className="es-progress mx-16 mt-8">
            <div className="es-progress-bar" style={{ width: `${progress * 100}%`, background: "currentColor" }} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 3 — BREATH STATS
   An animated SVG breath ring that expands/contracts,
   surrounded by cinematic counters that count up on scroll.
   Signature graphic moment.
   ═══════════════════════════════════════════════════════════ */
function BreathStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { end: 40, suffix: "+", label: "Counselling services", color: "#7C5CBF" },
    { end: 94, suffix: "%", label: "Feel calmer after session one", color: "#C05478" },
    { end: 8, suffix: "yrs", label: "Of supporting people through hard times", color: "#2E917A" },
    { end: 100, suffix: "%", label: "Confidential, always", color: "#B8832E" },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts(stats.map((s) => Math.round(s.end * ease)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.025) 50%, transparent 100%)" }}>
      <style>{`
        @keyframes breath-ring {
          0%, 100% { r: 120; opacity: 0.18; }
          50%       { r: 148; opacity: 0.08; }
        }
        @keyframes breath-ring-2 {
          0%, 100% { r: 90; opacity: 0.25; }
          50%       { r: 110; opacity: 0.12; }
        }
        @keyframes breath-ring-3 {
          0%, 100% { r: 60; opacity: 0.35; }
          50%       { r: 72;  opacity: 0.18; }
        }
        @keyframes breath-core {
          0%, 100% { r: 38; }
          50%       { r: 46; }
        }
        .bs-ring-1 { animation: breath-ring   6s ease-in-out infinite; }
        .bs-ring-2 { animation: breath-ring-2 6s ease-in-out infinite 0.8s; }
        .bs-ring-3 { animation: breath-ring-3 6s ease-in-out infinite 1.6s; }
        .bs-core   { animation: breath-core   6s ease-in-out infinite; }
        .bs-stat {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
        }
        .bs-stat.visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* Animated SVG path stroke */
        @keyframes stroke-draw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
        .bs-arc { animation: stroke-draw 2s cubic-bezier(.16,1,.3,1) 0.4s both; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="reveal-blur mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">The numbers behind the stillness</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance">
            Results you can feel. <em className="not-italic text-foreground/50">Numbers you can trust.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left stats */}
          <div className="md:col-span-4 space-y-12">
            {stats.slice(0, 2).map((s, i) => (
              <div
                key={i}
                className={`bs-stat${visible ? " visible" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-6xl md:text-7xl tracking-tight" style={{ color: s.color }}>
                    {counts[i]}
                  </span>
                  <span className="font-display text-3xl" style={{ color: s.color }}>{s.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-snug max-w-[200px]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Centre breath SVG */}
          <div className="md:col-span-4 flex items-center justify-center">
            <svg width="320" height="320" viewBox="0 0 320 320" aria-hidden="true">
              <defs>
                <radialGradient id="bs-grad-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7C5CBF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C05478" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Breathing rings */}
              <circle className="bs-ring-1" cx="160" cy="160" r="120" fill="none" stroke="#7C5CBF" strokeWidth="1" />
              <circle className="bs-ring-2" cx="160" cy="160" r="90" fill="none" stroke="#C05478" strokeWidth="1" />
              <circle className="bs-ring-3" cx="160" cy="160" r="60" fill="none" stroke="#2E917A" strokeWidth="1" />

              {/* Core */}
              <circle className="bs-core" cx="160" cy="160" r="38" fill="url(#bs-grad-center)" />

              {/* Animated arc */}
              {visible && (
                <circle
                  className="bs-arc"
                  cx="160" cy="160" r="95"
                  fill="none"
                  stroke="#7C5CBF"
                  strokeWidth="2"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  strokeLinecap="round"
                  transform="rotate(-90 160 160)"
                  opacity="0.5"
                />
              )}

              {/* Tick marks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 10 * Math.PI) / 180;
                const inner = 130;
                const outer = i % 3 === 0 ? 142 : 136;
                return (
                  <line
                    key={i}
                    x1={160 + inner * Math.cos(angle)}
                    y1={160 + inner * Math.sin(angle)}
                    x2={160 + outer * Math.cos(angle)}
                    y2={160 + outer * Math.sin(angle)}
                    stroke="#7C5CBF"
                    strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                    opacity={visible ? 0.4 : 0}
                    style={{ transition: `opacity 0.8s ease ${0.3 + i * 0.01}s` }}
                  />
                );
              })}

              {/* Centre text */}
              <text x="160" y="156" textAnchor="middle" dominantBaseline="middle" fill="#7C5CBF" fontSize="11" fontFamily="DM Sans, sans-serif" letterSpacing="3" opacity="0.8">
                BREATHE
              </text>
              <text x="160" y="172" textAnchor="middle" dominantBaseline="middle" fill="#7C5CBF" fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="2" opacity="0.45">
                YOU ARE SAFE
              </text>
            </svg>
          </div>

          {/* Right stats */}
          <div className="md:col-span-4 space-y-12">
            {stats.slice(2).map((s, i) => (
              <div
                key={i}
                className={`bs-stat${visible ? " visible" : ""}`}
                style={{ transitionDelay: `${(i + 2) * 150}ms` }}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-6xl md:text-7xl tracking-tight" style={{ color: s.color }}>
                    {counts[i + 2]}
                  </span>
                  <span className="font-display text-3xl" style={{ color: s.color }}>{s.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-snug max-w-[200px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className={`mt-24 text-center bs-stat${visible ? " visible" : ""}`} style={{ transitionDelay: "700ms" }}>
          <blockquote className="font-display text-2xl md:text-3xl text-foreground/40 tracking-tight max-w-2xl mx-auto">
            "The first step toward healing is knowing you don't have to figure it all out alone."
          </blockquote>
        </div>
      </div>
    </section>
  );
}