import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Lab — Stillness · Interactive Healing" },
      { name: "description", content: "Take a moment for yourself. Breathe, release, focus, and listen — small interactive practices." },
    ],
  }),
  component: Lab,
});

// ─── Shared helpers ────────────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg:        #FCFCFB;
    --blue:      #DCEAF7;
    --pink:      #FADFE4;
    --mint:      #DFF1E7;
    --glow:      #F4F0FF;
    --sage:      #5a9467;
    --moss:      #3d7a52;
    --clay:      #c4956a;
    --dusk:      #7b6fa0;
    --mist:      #7aaec2;
    --ink:       #2a2a35;
    --ink-soft:  #4a4a5a;
    --ink-muted: rgba(42,42,53,0.5);
    --blue-dk:   #4a89c4;
    --pink-dk:   #d4607a;
    --mint-dk:   #3a9e68;
    --glow-dk:   #7c6fc4;
    --divider:   rgba(42,42,53,0.08);
    --card-bg:   rgba(255,255,255,0.72);
    --shadow-blue: rgba(74,137,196,0.15);
    --shadow-pink: rgba(212,96,122,0.15);
    --shadow-mint: rgba(58,158,104,0.15);
    --shadow-glow: rgba(124,111,196,0.15);
  }

  * { box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    margin: 0;
  }

  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes blob {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(30px,-50px) scale(1.1); }
    66%     { transform: translate(-20px,20px) scale(0.9); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes gentleFloat {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes ripple {
    0%   { transform: scale(0.8); opacity:1; }
    100% { transform: scale(2.4); opacity:0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes breathePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(143,173,148,0.4); }
    50%     { box-shadow: 0 0 0 32px rgba(143,173,148,0); }
  }
  @keyframes equalizer {
    0%,100% { transform: scaleY(0.3); }
    50%     { transform: scaleY(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes drawCircle {
    to { stroke-dashoffset: 0; }
  }
  @keyframes twinkle {
    0%,100% { opacity:0.2; transform:scale(1); }
    50%     { opacity:1;   transform:scale(1.3); }
  }
  @keyframes mandalaRotate {
    to { transform: rotate(360deg); }
  }
  @keyframes mandalaRotateReverse {
    to { transform: rotate(-360deg); }
  }
  @keyframes petalBloom {
    from { transform: scale(0) rotate(-30deg); opacity:0; }
    to   { transform: scale(1) rotate(0deg);  opacity:1; }
  }

  .animate-blob      { animation: blob 7s infinite; }
  .animate-float     { animation: gentleFloat 3s ease-in-out infinite; }
  .animate-fadeUp    { animation: fadeUp 0.8s ease-out forwards; }
  .animate-fadeIn    { animation: fadeIn 0.8s ease-out forwards; }
  .anim-delay-200    { animation-delay: 0.2s; }
  .anim-delay-400    { animation-delay: 0.4s; }
  .anim-delay-600    { animation-delay: 0.6s; }
  .anim-delay-2000   { animation-delay: 2s; }
  .anim-delay-4000   { animation-delay: 4s; }
`;

// ─── Root component ────────────────────────────────────────────────────────

function Lab() {
  return (
    <div style={{
      background: "#FCFCFB",
      minHeight: "100vh",
      overflowX: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      color: "#2a2a35",
    }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Ambient background orbs — soft pastel, light theme */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        <div className="animate-blob" style={{ position:"absolute", top:"-8%", right:"-8%", width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle, rgba(220,234,247,0.7) 0%, transparent 70%)", filter:"blur(70px)" }} />
        <div className="animate-blob anim-delay-2000" style={{ position:"absolute", bottom:"-8%", left:"-8%", width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle, rgba(250,223,228,0.65) 0%, transparent 70%)", filter:"blur(70px)" }} />
        <div className="animate-blob anim-delay-4000" style={{ position:"absolute", top:"38%", left:"28%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(223,241,231,0.6) 0%, transparent 70%)", filter:"blur(70px)" }} />
        <div className="animate-blob" style={{ position:"absolute", top:"15%", left:"55%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(244,240,255,0.65) 0%, transparent 70%)", filter:"blur(60px)", animationDelay:"1s" }} />
      </div>

      <div style={{ position:"relative", zIndex:1 }}>
        <HeroSection />
        <Breathing />
        <ThoughtRelease />
        <MandalaFocus />
        <GratitudeJar />
        <MoodGarden />
        <CalmGame />
        <SoundSpace />
        <BodyScan />
        <PunchBag />
        <FooterCTA />
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection() {
  const pills = [
    { label:"Breathe",   color:"rgba(220,234,247,0.8)",  border:"rgba(74,137,196,0.35)",  text:"#4a89c4" },
    { label:"Release",   color:"rgba(250,223,228,0.8)",  border:"rgba(212,96,122,0.35)",  text:"#d4607a" },
    { label:"Focus",     color:"rgba(244,240,255,0.8)",  border:"rgba(124,111,196,0.35)", text:"#7c6fc4" },
    { label:"Listen",    color:"rgba(220,234,247,0.8)",  border:"rgba(74,137,196,0.35)",  text:"#3a7ab0" },
    { label:"Garden",    color:"rgba(223,241,231,0.8)",  border:"rgba(58,158,104,0.35)",  text:"#3a9e68" },
    { label:"Gratitude", color:"rgba(244,240,255,0.8)",  border:"rgba(124,111,196,0.3)",  text:"#9c8fda" },
    { label:"Body",      color:"rgba(223,241,231,0.8)",  border:"rgba(90,148,103,0.35)",  text:"#5a9467" },
    { label:"Punch Bag", color:"rgba(250,223,228,0.8)",  border:"rgba(212,96,122,0.35)",  text:"#d4607a" },
  ];

  return (
    <section style={{ padding:"120px 40px 80px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ opacity:0 }} className="animate-fadeUp anim-delay-200">
        <p style={{ fontSize:11, letterSpacing:"0.35em", textTransform:"uppercase", color:"#5a9467", marginBottom:24, fontWeight:500 }}>
          ✦ Interactive Healing Lab
        </p>
        <h1 className="serif" style={{ fontSize:"clamp(42px,6vw,76px)", fontWeight:300, lineHeight:1.1, color:"#2a2a35", margin:"0 0 28px", letterSpacing:"-0.5px" }}>
          Take a moment<br />
          <em style={{ color:"#5a9467" }}>for yourself.</em>
        </h1>
      </div>

      <p style={{ opacity:0, fontSize:18, lineHeight:1.8, color:"rgba(42,42,53,0.6)", maxWidth:520, margin:"0 0 48px", fontWeight:300 }} className="animate-fadeUp anim-delay-400">
        Eight practices designed to help you breathe, release, focus, and return to peace. No login. No measurement. Just presence.
      </p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:10, opacity:0 }} className="animate-fadeUp anim-delay-600">
        {pills.map((p) => (
          <span key={p.label} style={{ padding:"8px 18px", borderRadius:50, background:p.color, border:`1px solid ${p.border}`, fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase", color:p.text, fontWeight:600 }}>
            {p.label}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── 01 Breathing ─────────────────────────────────────────────────────────

function Breathing() {
  const [phase, setPhase] = useState<"Inhale"|"Hold"|"Exhale">("Inhale");
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sequence: { phase:"Inhale"|"Hold"|"Exhale"; dur:number }[] = [
      { phase:"Inhale", dur:4 },
      { phase:"Hold",   dur:4 },
      { phase:"Exhale", dur:4 },
    ];
    let idx = 0;

    const runPhase = () => {
      const { phase: p, dur } = sequence[idx % 3];
      setPhase(p);
      setCount(dur);
      if (idx % 3 === 2) setCycles(c => c + 1);

      let remaining = dur;
      const tick = setInterval(() => {
        remaining -= 1;
        setCount(remaining);
        if (remaining <= 0) {
          clearInterval(tick);
          idx++;
          timerRef.current = setTimeout(runPhase, 200);
        }
      }, 1000);
    };

    timerRef.current = setTimeout(runPhase, 800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const size = phase === "Inhale" ? 280 : phase === "Hold" ? 280 : 160;
  const phaseColor: Record<string,string> = {
    Inhale: "rgba(74,137,196,",
    Hold:   "rgba(124,111,196,",
    Exhale: "rgba(58,158,104,",
  };
  const c = phaseColor[phase];

  return (
    <section style={{ padding:"80px 40px", borderTop:`1px solid rgba(42,42,53,0.07)` }}>
      <SectionHeader eyebrow="01 — Breathe" title="Follow the rhythm." subtitle="Box breathing: 4-4-4. Proven to calm your nervous system in minutes." color="#4a89c4" />

      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:48, marginTop:64 }}>
        <div style={{ position:"relative", width:360, height:360, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ position:"absolute", width:size+80, height:size+80, borderRadius:"50%", background:`radial-gradient(circle, ${c}0.18) 0%, transparent 70%)`, filter:"blur(40px)", transition:"all 4s ease-in-out" }} />
          {[size+80, size+40, size].map((s, i) => (
            <div key={i} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", border:`1.5px solid ${c}${0.4 - i*0.1})`, transition:"all 4s ease-in-out", background: i === 2 ? `${c}0.06)` : "transparent" }} />
          ))}
          <div style={{ position:"relative", textAlign:"center" }}>
            <div className="serif" style={{ fontSize:72, color:"#2a2a35", lineHeight:1, fontWeight:300 }}>{count}</div>
            <div style={{ fontSize:13, letterSpacing:"0.3em", textTransform:"uppercase", color:`${c}0.9)`, marginTop:8, fontWeight:500 }}>{phase}</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:40 }}>
          {[
            {label:"Inhale", dur:"4s", c:"#4a89c4"},
            {label:"Hold",   dur:"4s", c:"#7c6fc4"},
            {label:"Exhale", dur:"4s", c:"#3a9e68"},
          ].map(b => (
            <div key={b.label} style={{ textAlign:"center" }}>
              <div className="serif" style={{ fontSize:28, color:b.c, fontWeight:300 }}>{b.dur}</div>
              <div style={{ fontSize:11, color:"rgba(42,42,53,0.45)", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:4 }}>{b.label}</div>
            </div>
          ))}
        </div>

        {cycles > 0 && (
          <div style={{ padding:"10px 24px", borderRadius:50, background:"#DFF1E7", border:"1px solid rgba(58,158,104,0.3)", fontSize:13, color:"#3a9e68", fontWeight:600 }}>
            ✦ {cycles} cycle{cycles > 1 ? "s" : ""} completed
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 02 Thought Release ────────────────────────────────────────────────────

function ThoughtRelease() {
  const [text, setText] = useState("");
  const [dissolving, setDissolving] = useState(false);
  const [released, setReleased] = useState(0);
  const [particles, setParticles] = useState<{id:number;x:number;y:number;color:string}[]>([]);

  const handleRelease = () => {
    if (!text.trim()) return;
    const colors = ["#8fad94","#b0a8d4","#d4b08a","#a8c9d4"];
    setParticles(Array.from({length:12},(_,i)=>({ id:Date.now()+i, x:Math.random()*100, y:Math.random()*100, color:colors[Math.floor(Math.random()*4)] })));
    setDissolving(true);
    setReleased(r => r+1);
    setTimeout(() => { setText(""); setDissolving(false); setParticles([]); }, 3500);
  };

  return (
    <section style={{ padding:"80px 40px", borderTop:`1px solid rgba(42,42,53,0.07)`, background:"linear-gradient(135deg, rgba(250,223,228,0.3) 0%, rgba(244,240,255,0.3) 100%)" }}>
      <SectionHeader eyebrow="02 — Release" title="Write it. Let it go." subtitle="Name what's weighing on you, then watch it dissolve." color="#d4607a" />

      <div style={{ maxWidth:640, margin:"48px auto 0", position:"relative" }}>
        {/* Floating particles */}
        {particles.map(p => (
          <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, width:6, height:6, borderRadius:"50%", background:p.color, animation:"fadeUp 3s ease-out forwards", pointerEvents:"none", zIndex:10 }} />
        ))}

        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setDissolving(false); }}
          placeholder="Whatever is on your mind…"
          rows={7}
          style={{
            width:"100%", background:"rgba(255,255,255,0.75)", backdropFilter:"blur(10px)",
            border:"1px solid rgba(212,96,122,0.25)", borderRadius:20, padding:"24px",
            fontSize:17, color:"#2a2a35", fontFamily:"'Cormorant Garamond', serif",
            fontWeight:300, lineHeight:1.8, resize:"none", outline:"none",
            transition:`all ${dissolving?"3.5s":"0.3s"} ease`,
            opacity: dissolving ? 0 : 1,
            filter: dissolving ? "blur(12px)" : "none",
            transform: dissolving ? "scale(0.96)" : "scale(1)",
            boxShadow:"0 4px 24px rgba(212,96,122,0.08)",
          }}
        />

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:20 }}>
          <button
            onClick={handleRelease}
            disabled={!text.trim()}
            style={{
              padding:"12px 32px", borderRadius:50,
              background: text.trim() ? "linear-gradient(135deg, #d4607a, #7c6fc4)" : "rgba(42,42,53,0.06)",
              border:"none", color: text.trim() ? "white" : "rgba(42,42,53,0.3)",
              fontSize:14, cursor: text.trim() ? "pointer" : "not-allowed", letterSpacing:"0.05em",
              transition:"all 0.3s ease", fontWeight:600,
              boxShadow: text.trim() ? "0 6px 24px rgba(212,96,122,0.25)" : "none",
            }}
          >
            ✦ Let it dissolve
          </button>
          {released > 0 && (
            <span style={{ fontSize:13, color:"rgba(42,42,53,0.45)", fontWeight:500 }}>
              {released} thought{released>1?"s":""} released
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── 03 Mandala Focus (NEW) ────────────────────────────────────────────────

function MandalaFocus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [petals, setPetals] = useState(6);
  const [hue, setHue] = useState(140);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState(0);
  const lastPos = useRef<{x:number;y:number}|null>(null);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    if (!lastPos.current) { lastPos.current = {x,y}; return; }

    ctx.strokeStyle = `hsla(${hue}, 60%, 70%, 0.7)`;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    for (let i = 0; i < petals; i++) {
      const angle = (Math.PI * 2 / petals) * i;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x - cx, lastPos.current.y - cy);
      ctx.lineTo(x - cx, y - cy);
      ctx.stroke();
      // Mirror
      ctx.scale(1, -1);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x - cx, lastPos.current.y - cy);
      ctx.lineTo(x - cx, y - cy);
      ctx.stroke();
      ctx.restore();
    }

    lastPos.current = {x, y};
    setStrokes(s => s + 1);
  }, [drawing, petals, hue]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokes(0);
  };

  return (
    <section style={{ padding:"80px 40px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
      <SectionHeader eyebrow="03 — Mandala" title="Draw your focus." subtitle="Symmetrical drawing activates bilateral brain stimulation — grounding you in the present moment." color="rgba(196,149,106,0.8)" />

      <div style={{ maxWidth:700, margin:"48px auto 0", display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
        {/* Controls */}
        <div style={{ display:"flex", gap:32, flexWrap:"wrap", justifyContent:"center" }}>
          <label style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:12, color:"rgba(185,210,195,0.6)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Symmetry: {petals}
            <input type="range" min={3} max={16} value={petals} onChange={e=>setPetals(+e.target.value)} style={{ accentColor:"#8fad94", width:100 }} />
          </label>
          <label style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:12, color:"rgba(185,210,195,0.6)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Color
            <input type="range" min={0} max={360} value={hue} onChange={e=>setHue(+e.target.value)} style={{ accentColor:`hsl(${hue},60%,60%)`, width:100 }} />
          </label>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={e=>{setDrawing(true); lastPos.current=null;}}
          onMouseUp={()=>{setDrawing(false); lastPos.current=null;}}
          onMouseLeave={()=>{setDrawing(false); lastPos.current=null;}}
          onMouseMove={draw}
          onTouchStart={e=>{e.preventDefault(); setDrawing(true); lastPos.current=null;}}
          onTouchEnd={()=>{setDrawing(false); lastPos.current=null;}}
          onTouchMove={e=>{e.preventDefault(); draw(e);}}
          style={{
            background:"rgba(10,18,12,0.8)",
            border:"1px solid rgba(196,149,106,0.2)",
            borderRadius:16,
            cursor:"crosshair",
            touchAction:"none",
            maxWidth:"100%",
          }}
        />

        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <button onClick={clearCanvas} style={{ padding:"10px 28px", borderRadius:50, background:"rgba(196,149,106,0.15)", border:"1px solid rgba(196,149,106,0.3)", color:"rgba(212,176,138,0.9)", fontSize:13, cursor:"pointer", letterSpacing:"0.05em" }}>
            Clear & Begin Again
          </button>
          {strokes > 0 && <span style={{ fontSize:12, color:"rgba(185,210,195,0.4)" }}>{strokes} strokes</span>}
        </div>
        <p style={{ fontSize:13, color:"rgba(185,210,195,0.4)", textAlign:"center", maxWidth:360 }}>
          Click or touch and drag to paint. Each stroke mirrors itself — creating order from movement.
        </p>
      </div>
    </section>
  );
}

// ─── 04 Gratitude Jar (NEW) ────────────────────────────────────────────────

function GratitudeJar() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<{id:number;text:string;color:string}[]>([]);
  const [animating, setAnimating] = useState<number|null>(null);
  const colors = ["rgba(143,173,148,0.3)","rgba(123,111,160,0.3)","rgba(196,149,106,0.3)","rgba(184,205,212,0.3)","rgba(126,176,110,0.3)"];

  const addNote = () => {
    if (!input.trim()) return;
    const id = Date.now();
    const color = colors[notes.length % colors.length];
    setNotes(n => [...n, { id, text: input.trim(), color }]);
    setAnimating(id);
    setInput("");
    setTimeout(() => setAnimating(null), 600);
  };

  return (
    <section style={{ padding:"80px 40px", borderTop:"1px solid rgba(255,255,255,0.06)", background:"linear-gradient(135deg, rgba(196,149,106,0.04) 0%, rgba(143,173,148,0.04) 100%)" }}>
      <SectionHeader eyebrow="04 — Gratitude" title="Fill your jar." subtitle="Research shows 3 things daily rewires your brain toward positivity within 3 weeks." color="rgba(196,149,106,0.8)" />

      <div style={{ maxWidth:680, margin:"48px auto 0" }}>
        {/* Jar visual */}
        <div style={{ position:"relative", width:220, margin:"0 auto 40px", minHeight:260 }}>
          {/* Jar outline SVG */}
          <svg viewBox="0 0 220 280" width="220" height="280" style={{ position:"absolute", top:0, left:0 }}>
            <path d="M60 40 Q55 20 80 15 L140 15 Q165 20 160 40 L175 240 Q175 265 110 265 Q45 265 45 240 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(196,149,106,0.3)" strokeWidth="1.5" />
            <path d="M75 15 L145 15 Q155 15 155 25 L155 35 L65 35 L65 25 Q65 15 75 15 Z" fill="rgba(196,149,106,0.1)" stroke="rgba(196,149,106,0.3)" strokeWidth="1" />
          </svg>
          {/* Notes inside jar */}
          <div style={{ position:"absolute", left:55, top:55, right:55, bottom:30, display:"flex", flexWrap:"wrap", gap:4, alignContent:"flex-end", overflow:"hidden" }}>
            {notes.slice(-12).map(n => (
              <div key={n.id} style={{
                background: n.color, borderRadius:4, padding:"3px 6px",
                fontSize:9, color:"rgba(235,245,238,0.8)",
                animation: animating===n.id ? "petalBloom 0.5s ease-out" : "none",
                maxWidth:"100%", wordBreak:"break-word",
              }}>
                ✦
              </div>
            ))}
          </div>
          {notes.length === 0 && (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", paddingTop:40 }}>
              <span style={{ fontSize:11, color:"rgba(185,210,195,0.3)", textAlign:"center", letterSpacing:"0.1em" }}>your jar is<br />waiting</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display:"flex", gap:12 }}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addNote()}
            placeholder="I'm grateful for…"
            style={{
              flex:1, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(196,149,106,0.25)",
              borderRadius:12, padding:"14px 20px", fontSize:16, color:"rgba(235,245,238,0.9)",
              fontFamily:"'Cormorant Garamond', serif", fontWeight:300, outline:"none",
            }}
          />
          <button onClick={addNote} style={{ padding:"14px 24px", borderRadius:12, background:"rgba(196,149,106,0.2)", border:"1px solid rgba(196,149,106,0.4)", color:"rgba(212,176,138,0.9)", fontSize:20, cursor:"pointer" }}>
            +
          </button>
        </div>

        {/* List */}
        {notes.length > 0 && (
          <div style={{ marginTop:24, display:"flex", flexDirection:"column", gap:8, maxHeight:200, overflowY:"auto" }}>
            {[...notes].reverse().slice(0,10).map(n => (
              <div key={n.id} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"10px 16px", background:n.color, borderRadius:12 }}>
                <span style={{ color:"rgba(196,149,106,0.7)", fontSize:14, marginTop:1 }}>✦</span>
                <span style={{ fontSize:15, color:"rgba(235,245,238,0.85)", lineHeight:1.5 }}>{n.text}</span>
              </div>
            ))}
          </div>
        )}

        {notes.length > 0 && (
          <p style={{ marginTop:16, fontSize:13, color:"rgba(185,210,195,0.4)", textAlign:"center" }}>
            {notes.length} gratitude{notes.length>1?"s":""} collected today
          </p>
        )}
      </div>
    </section>
  );
}

// ─── 05 Mood Garden (NEW) ─────────────────────────────────────────────────

const MOODS = [
  { emoji:"😌", label:"Calm",    color:"#8fad94" },
  { emoji:"😊", label:"Happy",   color:"#d4b08a" },
  { emoji:"😔", label:"Sad",     color:"#7b6fa0" },
  { emoji:"😤", label:"Angry",   color:"#c47a6a" },
  { emoji:"😰", label:"Anxious", color:"#a8c9d4" },
  { emoji:"😴", label:"Tired",   color:"#9b94b0" },
  { emoji:"🌟", label:"Grateful",color:"#c4b86a" },
  { emoji:"💪", label:"Strong",  color:"#6aad8a" },
];

function MoodGarden() {
  const [selected, setSelected] = useState<string|null>(null);
  const [history, setHistory] = useState<{mood:string;time:string;color:string}[]>([]);
  const [bloomed, setBloomed] = useState(false);

  const select = (m: typeof MOODS[0]) => {
    setSelected(m.label);
    setBloomed(false);
    setTimeout(() => setBloomed(true), 100);
    const time = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    setHistory(h => [...h.slice(-7), { mood:m.label, time, color:m.color }]);
  };

  const current = MOODS.find(m => m.label === selected);

  return (
    <section style={{ padding:"80px 40px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
      <SectionHeader eyebrow="05 — Mood Garden" title="How are you right now?" subtitle="Naming your emotion reduces its intensity by up to 50% — it's called 'affect labeling'." color="rgba(143,173,148,0.8)" />

      <div style={{ maxWidth:680, margin:"48px auto 0", display:"flex", flexDirection:"column", alignItems:"center", gap:40 }}>
        {/* Mood picker */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, width:"100%" }}>
          {MOODS.map(m => (
            <button key={m.label} onClick={()=>select(m)} style={{
              padding:"20px 12px", borderRadius:16, cursor:"pointer",
              background: selected===m.label ? `${m.color}25` : "rgba(255,255,255,0.03)",
              border: `1px solid ${selected===m.label ? m.color+"60" : "rgba(255,255,255,0.08)"}`,
              display:"flex", flexDirection:"column", alignItems:"center", gap:8,
              transition:"all 0.3s ease",
              transform: selected===m.label ? "scale(1.05)" : "scale(1)",
            }}>
              <span style={{ fontSize:28 }}>{m.emoji}</span>
              <span style={{ fontSize:11, color: selected===m.label ? m.color : "rgba(185,210,195,0.5)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Response */}
        {selected && current && (
          <div style={{
            width:"100%", padding:"28px 32px",
            background:`${current.color}12`,
            border:`1px solid ${current.color}30`,
            borderRadius:20,
            animation: bloomed ? "petalBloom 0.5s ease-out" : "none",
            textAlign:"center",
          }}>
            <div style={{ fontSize:40, marginBottom:12 }}>{current.emoji}</div>
            <p className="serif" style={{ fontSize:22, color:"rgba(235,245,238,0.9)", margin:"0 0 8px", fontWeight:300 }}>
              Feeling <em style={{ color:current.color }}>{selected}</em> is valid.
            </p>
            <p style={{ fontSize:14, color:"rgba(185,210,195,0.6)", margin:0, lineHeight:1.7 }}>
              {getMoodMessage(selected)}
            </p>
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <div style={{ width:"100%", display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
            {history.map((h,i) => (
              <div key={i} style={{ padding:"6px 14px", borderRadius:50, background:`${h.color}20`, border:`1px solid ${h.color}40`, fontSize:12, color:"rgba(185,210,195,0.6)" }}>
                {h.mood} <span style={{ opacity:0.5 }}>{h.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function getMoodMessage(mood: string): string {
  const messages: Record<string,string> = {
    Calm:     "You're in a good place. Savour this stillness — let it fill you completely.",
    Happy:    "Joy is contagious. Let yourself feel it fully without rushing past it.",
    Sad:      "Sadness is a sign you care deeply. Be gentle with yourself today.",
    Angry:    "Your anger carries information. Take three slow breaths before responding to anything.",
    Anxious:  "Place both feet flat on the floor. Feel the ground beneath you. You are safe.",
    Tired:    "Rest is not laziness — it's maintenance. Your body is asking for care.",
    Grateful: "Gratitude rewires your brain. You've already begun healing by noticing the good.",
    Strong:   "Channel this energy with intention. You have more capacity than you realise.",
  };
  return messages[mood] ?? "Whatever you feel is welcome here.";
}

// ─── 06 Focus Game ────────────────────────────────────────────────────────

function CalmGame() {
  const ref = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(1);
  const [dots] = useState(() =>
    Array.from({ length: 32 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
      size: Math.random()*3+2,
      h: Math.floor(Math.random()*360),
    }))
  );
  const state = useRef(dots);
  const [, force] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const tick = () => {
      state.current = state.current.map(d => {
        let nx = d.x + d.vx * speed, ny = d.y + d.vy * speed;
        let { vx, vy } = d;
        if (nx < 0 || nx > 100) vx = -vx;
        if (ny < 0 || ny > 100) vy = -vy;
        return { ...d, x: Math.max(0,Math.min(100,nx)), y: Math.max(0,Math.min(100,ny)), vx, vy };
      });
      force(n => (n+1)%10000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, visible]);

  const calmLevel = Math.max(0, Math.round((1 - speed) * 100));

  return (
    <section style={{ padding:"80px 40px", borderTop:"1px solid rgba(255,255,255,0.06)", background:"linear-gradient(135deg, rgba(123,111,160,0.04) 0%, rgba(184,205,212,0.04) 100%)" }}>
      <SectionHeader eyebrow="06 — Focus" title="Bring the chaos to calm." subtitle="Each tap slows the noise. A metaphor for your mind — and a practice for your attention." color="rgba(123,111,160,0.8)" />

      <div style={{ maxWidth:700, margin:"48px auto 0" }}>
        <div
          ref={ref}
          onClick={() => setSpeed(s => Math.max(0.02, s * 0.5))}
          style={{
            position:"relative", height:400, borderRadius:24,
            background:"rgba(10,18,12,0.8)", border:"1px solid rgba(123,111,160,0.2)",
            overflow:"hidden", cursor:"pointer",
          }}
        >
          {state.current.map((d, i) => (
            <span key={i} style={{
              position:"absolute", borderRadius:"50%",
              left:`${d.x}%`, top:`${d.y}%`,
              width:d.size, height:d.size,
              transform:"translate(-50%,-50%)",
              background:`hsla(${d.h}, 60%, 70%, 0.75)`,
              boxShadow:`0 0 ${d.size*3}px hsla(${d.h}, 60%, 70%, 0.4)`,
            }} />
          ))}
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", paddingBottom:24 }}>
            <div style={{ fontSize:13, color:"rgba(185,210,195,0.8)", letterSpacing:"0.15em", textTransform:"uppercase" }}>
              {speed < 0.1 ? "✦ stillness" : "tap to calm"}
            </div>
          </div>
        </div>

        {/* Calm meter */}
        <div style={{ marginTop:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"rgba(185,210,195,0.5)", marginBottom:8 }}>
            <span>Chaos</span><span>Calm: {calmLevel}%</span>
          </div>
          <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${calmLevel}%`, background:"linear-gradient(90deg, rgba(123,111,160,0.7), rgba(143,173,148,0.7))", borderRadius:4, transition:"width 0.5s ease" }} />
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:20 }}>
          <button onClick={()=>setSpeed(1)} style={{ padding:"10px 24px", borderRadius:50, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(185,210,195,0.6)", fontSize:12, cursor:"pointer", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── 07 Sound Space ───────────────────────────────────────────────────────

function SoundSpace() {
  const [active, setActive] = useState<string|null>(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement|null>(null);

  const sounds = [
    { id:"rain",   label:"Rain",    emoji:"🌧️", desc:"Gentle rainfall",     url:"https://assets.mixkit.co/active_storage/sfx/2303/2303-preview.mp3", color:"rgba(184,205,212,0.3)" },
    { id:"ocean",  label:"Ocean",   emoji:"🌊", desc:"Waves and tide",       url:"https://assets.mixkit.co/active_storage/sfx/2269/2269-preview.mp3", color:"rgba(74,124,89,0.3)" },
    { id:"forest", label:"Forest",  emoji:"🌲", desc:"Birds and breeze",     url:"https://assets.mixkit.co/active_storage/sfx/2267/2267-preview.mp3", color:"rgba(143,173,148,0.3)" },
    { id:"silence",label:"Silence", emoji:"🔇", desc:"Pure quiet",           url:null, color:"rgba(123,111,160,0.3)" },
  ];

  const toggle = (id: string, url: string|null) => {
    if (active === id) {
      audioRef.current?.pause();
      setActive(null); return;
    }
    audioRef.current?.pause();
    if (url) {
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.src = url;
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.play().catch(()=>{});
    }
    setActive(id);
  };

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const activeSnd = sounds.find(s => s.id === active);

  return (
    <section style={{ padding:"80px 40px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
      <SectionHeader eyebrow="07 — Sound Space" title="Listen. Relax." subtitle="Choose a soundscape and let it carry you somewhere still." color="rgba(184,205,212,0.8)" />

      <div style={{ maxWidth:600, margin:"48px auto 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {sounds.map(s => (
            <button key={s.id} onClick={()=>toggle(s.id, s.url)} style={{
              padding:"24px 20px", borderRadius:20, cursor:"pointer", textAlign:"left",
              background: active===s.id ? s.color : "rgba(255,255,255,0.03)",
              border:`1px solid ${active===s.id ? "rgba(184,205,212,0.4)" : "rgba(255,255,255,0.07)"}`,
              transition:"all 0.35s ease",
              transform: active===s.id ? "scale(1.02)" : "scale(1)",
            }}>
              <div style={{ fontSize:32, marginBottom:10 }}>{s.emoji}</div>
              <div style={{ fontSize:15, color:"rgba(235,245,238,0.9)", fontWeight:500, marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:12, color:"rgba(185,210,195,0.5)" }}>{s.desc}</div>
              {active===s.id && (
                <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:20, marginTop:12 }}>
                  {[...Array(5)].map((_,i) => (
                    <div key={i} style={{ width:3, background:"rgba(184,205,212,0.7)", borderRadius:2, animation:`equalizer 0.5s ease-in-out infinite`, animationDelay:`${i*0.1}s` }} />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ marginTop:24 }}>
            <p className="serif" style={{ textAlign:"center", fontSize:18, color:"rgba(185,210,195,0.7)", fontWeight:300, margin:"0 0 20px" }}>
              {activeSnd?.label} playing softly…
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:16 }}>🔉</span>
              <input type="range" min={0} max={100} value={volume*100} onChange={e=>setVolume(+e.target.value/100)} style={{ flex:1, accentColor:"#a8c9d4" }} />
              <span style={{ fontSize:16 }}>🔊</span>
            </div>
            <div style={{ textAlign:"center", marginTop:16 }}>
              <button onClick={()=>toggle(active, null)} style={{ padding:"10px 28px", borderRadius:50, background:"rgba(184,205,212,0.1)", border:"1px solid rgba(184,205,212,0.3)", color:"rgba(168,201,212,0.8)", fontSize:13, cursor:"pointer" }}>
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 08 Body Scan (NEW) ───────────────────────────────────────────────────

const BODY_PARTS = [
  { id:"head",    label:"Head & Face",   y:8,   msg:"Relax your forehead, jaw, and eyes. Let your tongue drop from the roof of your mouth." },
  { id:"neck",    label:"Neck & Shoulders", y:22, msg:"Roll your shoulders down away from your ears. Release any tension you've been holding here." },
  { id:"chest",   label:"Chest & Heart", y:35,  msg:"Take one deep breath. Feel your chest rise and fall. Your heart is working for you." },
  { id:"belly",   label:"Belly",         y:50,  msg:"Soften your stomach. You don't need to hold it in. Let it expand naturally." },
  { id:"hips",    label:"Hips & Lower Back", y:62, msg:"Notice any tightness in your lower back or hips. Imagine it melting with each exhale." },
  { id:"legs",    label:"Legs",          y:76,  msg:"Let your legs be heavy. You don't need to go anywhere right now." },
  { id:"feet",    label:"Feet",          y:90,  msg:"Feel the ground beneath your feet. This is where you are. You are here. You are safe." },
];

function BodyScan() {
  const [active, setActive] = useState<string|null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [autoPlay, setAutoPlay] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const [autoIdx, setAutoIdx] = useState(0);

  const select = (id: string) => {
    setActive(id);
    setCompleted(c => new Set([...c, id]));
  };

  useEffect(() => {
    if (!autoPlay) { if (autoRef.current) clearInterval(autoRef.current); return; }
    setAutoIdx(0); setCompleted(new Set()); setActive(BODY_PARTS[0].id);
    let i = 0;
    autoRef.current = setInterval(() => {
      i++;
      if (i >= BODY_PARTS.length) { clearInterval(autoRef.current!); setAutoPlay(false); return; }
      setActive(BODY_PARTS[i].id);
      setAutoIdx(i);
      setCompleted(c => new Set([...c, BODY_PARTS[i].id]));
    }, 6000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [autoPlay]);

  const current = BODY_PARTS.find(b => b.id === active);

  return (
    <section style={{ padding:"80px 40px", borderTop:"1px solid rgba(255,255,255,0.06)", background:"linear-gradient(135deg, rgba(184,205,212,0.04) 0%, rgba(74,124,89,0.04) 100%)" }}>
      <SectionHeader eyebrow="08 — Body Scan" title="Come back to your body." subtitle="A guided scan releases stored tension and reconnects mind to body — try the full sequence." color="rgba(184,205,212,0.8)" />

      <div style={{ maxWidth:680, margin:"48px auto 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
        {/* Body parts list */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {BODY_PARTS.map((b, i) => {
            const done = completed.has(b.id);
            const isActive = active === b.id;
            return (
              <button key={b.id} onClick={()=>select(b.id)} style={{
                display:"flex", alignItems:"center", gap:14, padding:"14px 18px",
                borderRadius:14, cursor:"pointer", textAlign:"left",
                background: isActive ? "rgba(184,205,212,0.12)" : done ? "rgba(143,173,148,0.06)" : "rgba(255,255,255,0.03)",
                border:`1px solid ${isActive ? "rgba(184,205,212,0.4)" : done ? "rgba(143,173,148,0.2)" : "rgba(255,255,255,0.07)"}`,
                transition:"all 0.3s ease",
              }}>
                <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background: done ? "rgba(143,173,148,0.3)" : "rgba(255,255,255,0.05)", border:`1px solid ${done ? "rgba(143,173,148,0.5)" : "rgba(255,255,255,0.1)"}`, fontSize:10, color:"rgba(143,173,148,0.8)" }}>
                  {done ? "✓" : i+1}
                </div>
                <span style={{ fontSize:14, color: isActive ? "rgba(184,205,212,0.95)" : done ? "rgba(185,210,195,0.7)" : "rgba(185,210,195,0.5)" }}>{b.label}</span>
              </button>
            );
          })}

          <button onClick={()=>setAutoPlay(p=>!p)} style={{ marginTop:8, padding:"12px 20px", borderRadius:50, background: autoPlay ? "rgba(184,205,212,0.2)" : "rgba(255,255,255,0.04)", border:`1px solid ${autoPlay?"rgba(184,205,212,0.4)":"rgba(255,255,255,0.1)"}`, color:"rgba(184,205,212,0.8)", fontSize:12, cursor:"pointer", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            {autoPlay ? "⏹ Stop guided scan" : "▶ Start guided scan"}
          </button>
        </div>

        {/* Active message */}
        <div style={{ position:"sticky", top:40 }}>
          {current ? (
            <div style={{ padding:"28px", background:"rgba(184,205,212,0.06)", border:"1px solid rgba(184,205,212,0.15)", borderRadius:20, animation:"petalBloom 0.4s ease-out" }}>
              <h3 className="serif" style={{ fontSize:22, color:"rgba(235,245,238,0.9)", margin:"0 0 16px", fontWeight:300 }}>
                {current.label}
              </h3>
              <p style={{ fontSize:15, color:"rgba(185,210,195,0.75)", lineHeight:1.8, margin:0 }}>
                {current.msg}
              </p>
              {autoPlay && (
                <div style={{ marginTop:20, height:3, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", background:"rgba(184,205,212,0.5)", borderRadius:3, animation:"drawCircle 6s linear forwards" }} />
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding:"28px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:20, textAlign:"center" }}>
              <div style={{ fontSize:40, marginBottom:16 }}>🧘</div>
              <p style={{ fontSize:14, color:"rgba(185,210,195,0.4)", lineHeight:1.8, margin:0 }}>
                Select a body region to focus your attention there, or start the guided sequence.
              </p>
            </div>
          )}

          {completed.size === BODY_PARTS.length && (
            <div style={{ marginTop:16, padding:"16px 20px", background:"rgba(143,173,148,0.1)", border:"1px solid rgba(143,173,148,0.25)", borderRadius:16, textAlign:"center" }}>
              <p style={{ margin:0, fontSize:14, color:"rgba(143,173,148,0.9)" }}>
                ✦ Full scan complete — your body has been seen.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section style={{ padding:"100px 40px", borderTop:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
      <h2 className="serif" style={{ fontSize:"clamp(32px,4vw,52px)", fontWeight:300, color:"rgba(235,245,238,0.95)", margin:"0 0 20px", lineHeight:1.2 }}>
        Return whenever you need stillness.
      </h2>
      <p style={{ fontSize:16, color:"rgba(185,210,195,0.6)", maxWidth:480, margin:"0 auto 40px", lineHeight:1.8 }}>
        These practices are always here. Visit whenever your mind needs rest, your heart needs healing, or your spirit needs grounding.
      </p>
      <button style={{ padding:"16px 40px", borderRadius:50, background:"linear-gradient(135deg, rgba(143,173,148,0.3), rgba(123,111,160,0.3))", border:"1px solid rgba(143,173,148,0.4)", color:"rgba(235,245,238,0.9)", fontSize:15, cursor:"pointer", letterSpacing:"0.05em", transition:"all 0.3s ease" }}>
        ✦ Begin Your Practice
      </button>
    </section>
  );
}

// ─── Shared SectionHeader ─────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle, color }: { eyebrow:string; title:string; subtitle:string; color:string }) {
  return (
    <div style={{ maxWidth:560 }}>
      <p style={{ fontSize:11, letterSpacing:"0.35em", textTransform:"uppercase", color, marginBottom:16, fontFamily:"'DM Sans', sans-serif" }}>{eyebrow}</p>
      <h2 className="serif" style={{ fontSize:"clamp(32px,3.5vw,48px)", fontWeight:300, color:"rgba(235,245,238,0.95)", margin:"0 0 16px", lineHeight:1.2 }}>{title}</h2>
      <p style={{ fontSize:15, color:"rgba(185,210,195,0.65)", lineHeight:1.8, margin:0 }}>{subtitle}</p>
    </div>
  );
}