import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroOcean from "@/assets/hero-ocean.jpg";
import silhouette from "@/assets/silhouette.jpg";
import stones from "@/assets/stones.jpg";
import ripples from "@/assets/ripples.jpg";

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
      <ServiceLayers />
      <PhilosophyStrip />
      <Testimonial />
      <ProcessRibbon />
      <SupportSignals />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden flex items-center justify-center">
      {/* Ocean photograph */}
      <img
        src={heroOcean}
        alt="Calm ocean horizon with soft light from above"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover hero-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/20 to-background/75" />
      <div className="absolute inset-0 bg-window opacity-70" />
      {/* Light beams */}
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

      {/* scroll cue */}
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
        {/* Left fixed */}
        <div className="md:sticky md:top-32 self-start reveal-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">A reminder</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05] text-balance">
            You are not<br />broken.
          </h2>
          <div className="mt-8 w-12 h-px bg-foreground/40" />
        </div>
        {/* Right scrolling thoughts */}
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

function FloatingClusters() {
  const items = [
    { word: "Depression", x: "12%", y: "20%", size: "text-5xl md:text-7xl", delay: "0s" },
    { word: "Relationship", x: "55%", y: "10%", size: "text-4xl md:text-6xl", delay: "1s" },
    { word: "Career", x: "70%", y: "55%", size: "text-5xl md:text-7xl", delay: "2s" },
    { word: "Anxiety", x: "20%", y: "65%", size: "text-3xl md:text-5xl", delay: "1.5s" },
    { word: "Grief", x: "45%", y: "78%", size: "text-3xl md:text-4xl", delay: "0.5s" },
    { word: "Family", x: "80%", y: "25%", size: "text-3xl md:text-4xl", delay: "2.5s" },
  ];
  const [ripple, setRipple] = useState<{ id: number; x: number; y: number } | null>(null);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-pink-glow-soft opacity-40" />
      <div className="max-w-6xl mx-auto text-center mb-20 relative reveal-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Where to begin</p>
        <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance">
          What are you feeling right now?
        </h2>
        <p className="mt-4 text-muted-foreground">There are no wrong answers. Choose a word that feels true.</p>
      </div>
      <div className="relative h-[480px] md:h-[560px] max-w-6xl mx-auto">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
              setRipple({ id: Date.now(), x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            style={{ left: it.x, top: it.y, animationDelay: it.delay }}
            className={`absolute font-display ${it.size} tracking-tight text-foreground/40 hover:text-foreground hover:scale-[1.06] blur-[2px] hover:blur-0 transition-all duration-1000 ease-out animate-drift cursor-pointer`}
          >
            {it.word}
          </button>
        ))}
        {ripple && (
          <span
            key={ripple.id}
            className="fixed pointer-events-none rounded-full border border-foreground/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              transform: "translate(-50%, -50%)",
              animation: "ripple 1.6s ease-out forwards",
            }}
            onAnimationEnd={() => setRipple(null)}
          />
        )}
      </div>
      <style>{`@keyframes ripple { to { width: 600px; height: 600px; opacity: 0; } }`}</style>
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
      {/* Real silhouette photograph */}
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
        <blockquote
          className="reveal-blur font-display text-4xl md:text-6xl tracking-tight leading-tight text-balance"
        >
          "I felt understood for the first time in a long time."
        </blockquote>
        <div className="mt-10 text-sm text-muted-foreground reveal">— Anonymous, after 6 sessions</div>
      </div>
    </section>
  );
}

function SupportSignals() {
  const points = [
    {
      title: "Confidential care",
      body: "Private, respectful conversations where you can speak freely without pressure.",
      tone: "tone-restore",
    },
    {
      title: "Evidence-informed support",
      body: "Practical guidance for anxiety, burnout, relationship stress, grief, and life transitions.",
      tone: "tone-growth",
    },
    {
      title: "Online, flexible sessions",
      body: "A calmer therapy rhythm that fits work, family life, and changing emotional energy.",
      tone: "tone-family",
    },
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
