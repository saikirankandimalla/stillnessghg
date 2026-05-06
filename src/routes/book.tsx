import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a session — Stillness" },
      { name: "description", content: "Take the first step toward clarity and support." },
      { property: "og:title", content: "Book a session — Stillness" },
      { property: "og:description", content: "Take the first step toward clarity and support." },
    ],
  }),
  component: Book,
});

/* ── Design Tokens (matches services.tsx) ── */
const T = {
  bgMain:    "#FFFFFF",
  bgSoft:    "#F5F5F3",
  textMain:  "#1A1A1A",
  textSoft:  "#6B6B6B",
  border:    "#E8E8E8",
  accent:    "#FADADD",
  accentDark:"#c0707a",
};

/* ── Data ── */
const services = [
  { id: "depression",    label: "Depression Counselling",        category: "Mental Health",         price: 1200 },
  { id: "anxiety",       label: "Anxiety Counselling",           category: "Mental Health",         price: 1200 },
  { id: "stress",        label: "Stress Management",             category: "Mental Health",         price: 1000 },
  { id: "couple",        label: "Couple Counselling",            category: "Relationship",          price: 1500 },
  { id: "marriage",      label: "Marriage Counselling",          category: "Relationship",          price: 1500 },
  { id: "career",        label: "Career Counselling",            category: "Career & Growth",       price: 1000 },
  { id: "adolescent",    label: "Adolescent Counselling",        category: "Children & Family",     price: 1000 },
  { id: "trauma",        label: "Trauma & PTSD Counselling",     category: "Specialised Support",   price: 1500 },
  { id: "grief",         label: "Grief Counselling",             category: "Specialised Support",   price: 1200 },
  { id: "lgbtq",         label: "LGBTQIA+ Support",              category: "Specialised Support",   price: 1200 },
];

const counsellors = [
  { id: "priya",   name: "Dr. Priya Sharma",   title: "Clinical Psychologist",         exp: "8 yrs", lang: "English, Hindi",    avatar: "PS", color: "#d4a5c9" },

  { id: "kavitha", name: "Kavitha Nair",       title: "Child & Adolescent Therapist",  exp: "9 yrs", lang: "English, Malayalam", avatar: "KN", color: "#d4c3a5" },
];

const timeSlots = [
  "8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","2:00 PM","3:00 PM","4:00 PM",
  "5:00 PM","6:00 PM","7:00 PM","8:00 PM",
];

function getNext14Days() {
  const days: { date: Date; label: string; day: string }[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return days;
}

declare global { interface Window { Razorpay: any; } }

/* ── Main Component ── */
function Book() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService]     = useState<string | null>(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate]           = useState<Date | null>(null);
  const [selectedTime, setSelectedTime]           = useState<string | null>(null);
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");
  const [note, setNote]     = useState("");
  const [paid, setPaid]     = useState(false);
  const [paying, setPaying] = useState(false);

  const days = getNext14Days();
  const svc  = services.find(s => s.id === selectedService);
  const coun = counsellors.find(c => c.id === selectedCounsellor);

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedCounsellor;
    if (step === 3) return !!selectedDate && !!selectedTime;
    if (step === 4) return name.trim() && email.trim() && phone.trim();
    return false;
  };

  const loadRazorpay = () =>
    new Promise<boolean>(resolve => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload  = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const handlePayment = async () => {
    setPaying(true);
    const loaded = await loadRazorpay();
    if (!loaded) { alert("Razorpay failed to load. Check your connection."); setPaying(false); return; }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // 🔑 Replace with your key
      amount: (svc?.price ?? 1200) * 100,
      currency: "INR",
      name: "Stillness",
      description: `${svc?.label} with ${coun?.name}`,
      image: "",
      prefill: { name, email, contact: phone },
      notes: {
        service:    svc?.label,
        counsellor: coun?.name,
        date:       selectedDate?.toLocaleDateString("en-IN"),
        time:       selectedTime,
        note,
      },
      theme: { color: T.accentDark },
      handler: (_response: any) => {
        setPaying(false);
        setPaid(true);
        setStep(6);
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const STEPS = [
    "Service",
    "Counsellor",
    "Date & Time",
    "Your Details",
    "Payment",
    "Confirmed",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .book-page { font-family: 'DM Sans', sans-serif; background: ${T.bgMain}; color: ${T.textMain}; min-height: 100vh; }
        .book-page .display { font-family: 'Cormorant Garamond', serif; }

        .step-card {
          background: ${T.bgMain};
          border: 1px solid ${T.border};
          border-radius: 20px;
          padding: 28px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .step-card:hover { border-color: ${T.accentDark}66; box-shadow: 0 4px 24px rgba(192,112,122,0.08); }
        .step-card.selected { border-color: ${T.accentDark}; background: #fff8f8; box-shadow: 0 4px 24px rgba(192,112,122,0.1); }

        .date-chip {
          display: flex; flex-direction: column; align-items: center;
          padding: 12px 10px; border-radius: 14px;
          border: 1px solid ${T.border};
          cursor: pointer; transition: all 0.22s;
          min-width: 54px; background: ${T.bgMain};
        }
        .date-chip:hover { border-color: ${T.accentDark}66; }
        .date-chip.selected { border-color: ${T.accentDark}; background: #fff8f8; }

        .time-chip {
          padding: 10px 16px; border-radius: 999px;
          border: 1px solid ${T.border};
          cursor: pointer; transition: all 0.22s;
          font-size: 0.82rem; background: ${T.bgMain};
          color: ${T.textMain};
        }
        .time-chip:hover { border-color: ${T.accentDark}66; }
        .time-chip.selected { border-color: ${T.accentDark}; background: #fff8f8; color: ${T.accentDark}; }
        .time-chip.disabled { opacity: 0.35; cursor: not-allowed; }

        .book-input {
          width: 100%; padding: 12px 16px;
          border: 1px solid ${T.border}; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          color: ${T.textMain}; background: ${T.bgMain};
          outline: none; transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .book-input:focus { border-color: ${T.accentDark}; }
        .book-input::placeholder { color: ${T.textSoft}; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 999px;
          background: ${T.textMain}; color: ${T.bgMain};
          font-size: 0.9rem; font-weight: 500; border: none;
          cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(26,26,26,0.15); }
        .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

        .btn-pay {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 40px; border-radius: 999px;
          background: ${T.accentDark}; color: #fff;
          font-size: 0.95rem; font-weight: 500; border: none;
          cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .btn-pay:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(192,112,122,0.3); }
        .btn-pay:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 999px;
          background: transparent; color: ${T.textSoft};
          font-size: 0.85rem; border: 1px solid ${T.border};
          cursor: pointer; transition: all 0.25s; font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { border-color: #d0d0d0; color: ${T.textMain}; }

        .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid ${T.border}; font-size: 0.88rem; }
        .summary-row:last-child { border-bottom: none; }

        @keyframes check-pop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .check-pop { animation: check-pop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

        .stepper-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 500; transition: all 0.3s;
          flex-shrink: 0;
        }
      `}</style>

      <div className="book-page">

        {/* ── Hero ── */}
        <section style={{ background: T.bgSoft, paddingTop: 120, paddingBottom: 64, textAlign: "center", borderBottom: `1px solid ${T.border}` }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.textSoft, marginBottom: 16 }}>Begin gently</p>
          <h1 className="display" style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16, color: T.textMain }}>
            Book your session.
          </h1>
          <p style={{ color: T.textSoft, fontSize: "1rem" }}>Take the first step toward clarity and support.</p>
        </section>

        {/* ── Stepper ── */}
        <div style={{ background: T.bgMain, borderBottom: `1px solid ${T.border}`, padding: "20px 48px", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", gap: 0 }}>
            {STEPS.map((label, i) => {
              const num    = i + 1;
              const done   = step > num;
              const active = step === num;
              return (
                <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div className="stepper-dot" style={{
                      background: done ? T.accentDark : active ? T.accentDark : T.border,
                      color: done || active ? "#fff" : T.textSoft,
                      border: active ? `2px solid ${T.accentDark}` : "none",
                    }}>
                      {done ? "✓" : num}
                    </div>
                    <span style={{ fontSize: "0.62rem", color: active ? T.accentDark : T.textSoft, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: done ? T.accentDark + "55" : T.border, margin: "0 8px", marginBottom: 18 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Step Content ── */}
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "52px 24px 80px" }}>

          {/* STEP 1 — Select Service */}
          {step === 1 && (
            <div>
              <h2 className="display" style={{ fontSize: "2rem", fontWeight: 300, marginBottom: 8 }}>What brings you here?</h2>
              <p style={{ color: T.textSoft, marginBottom: 32, fontSize: "0.9rem" }}>Choose the area you'd like support with.</p>

              {/* Group by category */}
              {Array.from(new Set(services.map(s => s.category))).map(cat => (
                <div key={cat} style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.textSoft, marginBottom: 12 }}>{cat}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {services.filter(s => s.category === cat).map(s => (
                      <div
                        key={s.id}
                        className={`step-card${selectedService === s.id ? " selected" : ""}`}
                        onClick={() => setSelectedService(s.id)}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <p style={{ fontWeight: 500, fontSize: "0.92rem", marginBottom: 4, color: selectedService === s.id ? T.accentDark : T.textMain }}>{s.label}</p>
                          {selectedService === s.id && <span style={{ color: T.accentDark, fontSize: "1rem" }}>✓</span>}
                        </div>
                        <p style={{ fontSize: "0.78rem", color: T.textSoft }}>₹{s.price.toLocaleString("en-IN")} · 50 min</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2 — Select Counsellor */}
          {step === 2 && (
            <div>
              <h2 className="display" style={{ fontSize: "2rem", fontWeight: 300, marginBottom: 8 }}>Choose your counsellor.</h2>
              <p style={{ color: T.textSoft, marginBottom: 32, fontSize: "0.9rem" }}>A voice that feels right for you.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {counsellors.map(c => (
                  <div
                    key={c.id}
                    className={`step-card${selectedCounsellor === c.id ? " selected" : ""}`}
                    onClick={() => setSelectedCounsellor(c.id)}
                    style={{ display: "flex", flexDirection: "column", gap: 14 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.color + "44", border: `1.5px solid ${c.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, fontSize: "0.85rem", color: c.color, flexShrink: 0 }}>
                        {c.avatar}
                      </div>
                      <div>
                        <p style={{ fontWeight: 500, fontSize: "0.9rem", color: selectedCounsellor === c.id ? T.accentDark : T.textMain }}>{c.name}</p>
                        <p style={{ fontSize: "0.77rem", color: T.textSoft }}>{c.title}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[`${c.exp} exp`, c.lang].map(tag => (
                        <span key={tag} style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 999, background: T.bgSoft, color: T.textSoft, border: `1px solid ${T.border}` }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="display" style={{ fontSize: "2rem", fontWeight: 300, marginBottom: 8 }}>Pick a date & time.</h2>
              <p style={{ color: T.textSoft, marginBottom: 32, fontSize: "0.9rem" }}>Mornings, evenings, weekends — your pace.</p>

              {/* Date strip */}
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.textSoft, marginBottom: 12 }}>Date</p>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 36 }}>
                {days.map(d => (
                  <div
                    key={d.label}
                    className={`date-chip${selectedDate?.toDateString() === d.date.toDateString() ? " selected" : ""}`}
                    onClick={() => setSelectedDate(d.date)}
                  >
                    <span style={{ fontSize: "0.65rem", color: T.textSoft, marginBottom: 2 }}>{d.day}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 500, color: selectedDate?.toDateString() === d.date.toDateString() ? T.accentDark : T.textMain }}>{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.textSoft, marginBottom: 12 }}>Time</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {timeSlots.map((t, i) => {
                  const busy = [1, 4, 7].includes(i);
                  return (
                    <div
                      key={t}
                      className={`time-chip${busy ? " disabled" : selectedTime === t ? " selected" : ""}`}
                      onClick={() => !busy && setSelectedTime(t)}
                    >
                      {t}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: "0.75rem", color: T.textSoft, marginTop: 16 }}>Greyed slots are unavailable. All times in IST.</p>
            </div>
          )}

          {/* STEP 4 — Your Details */}
          {step === 4 && (
            <div>
              <h2 className="display" style={{ fontSize: "2rem", fontWeight: 300, marginBottom: 8 }}>A little about you.</h2>
              <p style={{ color: T.textSoft, marginBottom: 32, fontSize: "0.9rem" }}>So we can send your confirmation and reminder.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: T.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Full Name</label>
                  <input className="book-input" placeholder="e.g. Priya Sharma" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: T.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email</label>
                  <input className="book-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: T.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Phone (WhatsApp)</label>
                  <input className="book-input" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: T.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Anything you'd like us to know? <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <textarea className="book-input" rows={3} placeholder="Share as little or as much as you'd like..." value={note} onChange={e => setNote(e.target.value)} style={{ resize: "vertical" }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 — Payment / Review */}
          {step === 5 && (
            <div>
              <h2 className="display" style={{ fontSize: "2rem", fontWeight: 300, marginBottom: 8 }}>Review & Pay.</h2>
              <p style={{ color: T.textSoft, marginBottom: 32, fontSize: "0.9rem" }}>A gentle confirmation arrives in your inbox after payment.</p>

              {/* Summary card */}
              <div style={{ background: T.bgSoft, borderRadius: 20, padding: "28px 32px", border: `1px solid ${T.border}`, marginBottom: 32, maxWidth: 480 }}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.textSoft, marginBottom: 16 }}>Session summary</p>
                {[
                  ["Service",    svc?.label ?? "—"],
                  ["Counsellor", coun?.name ?? "—"],
                  ["Date",       selectedDate?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) ?? "—"],
                  ["Time",       selectedTime ?? "—"],
                  ["Name",       name],
                  ["Email",      email],
                  ["Phone",      phone],
                ].map(([k, v]) => (
                  <div key={k} className="summary-row">
                    <span style={{ color: T.textSoft }}>{k}</span>
                    <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 500 }}>Total</span>
                  <span className="display" style={{ fontSize: "1.6rem", fontWeight: 400, color: T.accentDark }}>₹{(svc?.price ?? 1200).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <p style={{ fontSize: "0.78rem", color: T.textSoft, marginBottom: 28, maxWidth: 400, lineHeight: 1.7 }}>
                Payments are processed securely via Razorpay. You can reschedule or cancel anytime — without explanation.
              </p>

              <button className="btn-pay" onClick={handlePayment} disabled={paying}>
                {paying ? "Opening payment…" : `Pay ₹${(svc?.price ?? 1200).toLocaleString("en-IN")}`}
                {!paying && <span style={{ fontSize: "1rem" }}>→</span>}
              </button>
            </div>
          )}

          {/* STEP 6 — Confirmation */}
          {step === 6 && paid && (
            <div style={{ textAlign: "center", paddingTop: 24 }}>
              <div className="check-pop" style={{ width: 72, height: 72, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "1.8rem" }}>✓</div>
              <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 300, marginBottom: 12, color: T.textMain }}>You're all set.</h2>
              <p style={{ color: T.textSoft, fontSize: "1rem", lineHeight: 1.8, maxWidth: 420, margin: "0 auto 40px" }}>
                A confirmation has been sent to <strong>{email}</strong>. We look forward to being with you on <strong>{selectedDate?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</strong> at <strong>{selectedTime}</strong>.
              </p>

              <div style={{ background: T.bgSoft, borderRadius: 20, padding: "24px 28px", border: `1px solid ${T.border}`, maxWidth: 400, margin: "0 auto 40px", textAlign: "left" }}>
                {[
                  ["Service",    svc?.label ?? "—"],
                  ["Counsellor", coun?.name ?? "—"],
                  ["Date & Time", `${selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · ${selectedTime}`],
                ].map(([k, v]) => (
                  <div key={k} className="summary-row">
                    <span style={{ color: T.textSoft, fontSize: "0.82rem" }}>{k}</span>
                    <span style={{ fontWeight: 500, fontSize: "0.88rem" }}>{v}</span>
                  </div>
                ))}
              </div>

              <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 999, border: `1px solid ${T.border}`, color: T.textSoft, textDecoration: "none", fontSize: "0.85rem", transition: "all 0.25s" }}>
                ← Back to home
              </Link>
            </div>
          )}

          {/* ── Navigation ── */}
          {step < 6 && (
            <div style={{ marginTop: 48, display: "flex", gap: 12, alignItems: "center" }}>
              {step > 1 && (
                <button className="btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              {step < 5 && (
                <button className="btn-primary" disabled={!canProceed()} onClick={() => setStep(s => s + 1)}>
                  Continue →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}