import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/* ── useInView ── */
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

function Reveal({ children, delay = 0, dir = "up", className = "", style = {} }: {
  children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right" | "scale" | "none"; className?: string; style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  const t =
    dir === "up" ? "translateY(40px)" :
    dir === "left" ? "translateX(-40px)" :
    dir === "right" ? "translateX(40px)" :
    dir === "scale" ? "scale(0.96)" : "none";
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : t,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── Tokens ── */
const T = {
  bgMain: "#FFFFFF",
  bgSoft: "#F5F5F3",
  bgDark: "#101012",
  textMain: "#1A1A1A",
  textSoft: "#6B6B6B",
  textDarkSoft: "rgba(255,255,255,0.62)",
  border: "#E8E8E8",
  borderDark: "rgba(255,255,255,0.12)",
};

type ServiceData = {
  title: string;
  group: string;
  accent: string;
  accentBg: string;
  heroImg: string;
  intro: string;
  feel: string[];
  help: string[];
  outcome: string;
  outcomeImg: string;
};

/* ── Base palettes per category ── */
const base = {
  mental:       { accent: "#b39ddb", accentBg: "#ede7f6", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80" },
  relationship: { accent: "#c0707a", accentBg: "#FADADD", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80" },
  career:       { accent: "#5c9e8f", accentBg: "#e0f2ef", img: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=1600&auto=format&fit=crop&q=80" },
  family:       { accent: "#c8924a", accentBg: "#fdf0e0", img: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&auto=format&fit=crop&q=80" },
  specialised:  { accent: "#6a8fbf", accentBg: "#e8f1fb", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80" },
  emotional:    { accent: "#b4699c", accentBg: "#f8edf4", img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1600&auto=format&fit=crop&q=80" },
  care:         { accent: "#6e9558", accentBg: "#eff5ea", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80" },
};

const data: Record<string, ServiceData> = {

  /* ════════ MENTAL HEALTH ════════ */
  depression: {
    title: "Depression Counselling", group: "Mental Health", ...base.mental,
    heroImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
    intro: "Depression can feel heavy, isolating, and difficult to put into words. You are not alone in this — and you don't have to carry it alone either.",
    feel: ["Low energy and motivation", "Loss of interest in things you once loved", "Emotional fatigue", "A quiet sense of distance from yourself"],
    help: ["A safe, judgment-free space to talk", "Practical coping techniques", "Help understanding triggers and patterns", "Patient, paced support at your speed"],
    outcome: "Gradual healing, renewed motivation, and lasting clarity.",
    outcomeImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
  },
  anxiety: {
    title: "Anxiety Counselling", group: "Mental Health", ...base.mental,
    heroImg: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1600&auto=format&fit=crop&q=80",
    intro: "Excessive worry and fear can quietly take over daily life. Counselling helps you understand it — and loosen its grip.",
    feel: ["Constant or racing worry", "Restlessness or tension", "Difficulty focusing", "A sense of dread without clear cause"],
    help: ["Tools to calm the mind and body", "Understanding personal anxiety triggers", "Building confidence in uncertain moments", "Long-term emotional regulation skills"],
    outcome: "Inner calm, steadier days, and lasting mental well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&auto=format&fit=crop&q=80",
  },
  "stress-management": {
    title: "Stress Management", group: "Mental Health", ...base.mental,
    heroImg: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&auto=format&fit=crop&q=80",
    intro: "Daily pressures build up quietly until they feel unmanageable. We help you find your footing again.",
    feel: ["Constant overwhelm", "Irritability or tension", "Difficulty switching off", "Feeling stretched too thin"],
    help: ["Identifying your personal stress triggers", "Relaxation and calming techniques", "Better day-to-day emotional balance", "Sustainable routines, not quick fixes"],
    outcome: "A calmer, steadier, more balanced life.",
    outcomeImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
  },
  overthinking: {
    title: "Overthinking & Negative Thoughts", group: "Mental Health", ...base.mental,
    heroImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
    intro: "Repetitive, overwhelming thoughts can cloud even simple decisions. We help quiet the noise and restore clarity.",
    feel: ["Racing or looping thoughts", "Difficulty deciding or moving forward", "Self-critical inner dialogue", "Mental exhaustion"],
    help: ["Techniques to reduce rumination", "Reframing negative thought patterns", "Tools for confident decision-making", "A calmer, clearer mindset"],
    outcome: "Mental clarity, emotional ease, and confident choices.",
    outcomeImg: "https://images.unsplash.com/photo-1455642305367-68834a9d4337?w=1600&auto=format&fit=crop&q=80",
  },
  sleep: {
    title: "Sleep & Insomnia Support", group: "Mental Health", ...base.mental,
    heroImg: "https://images.unsplash.com/photo-1455642305367-68834a9d4337?w=1600&auto=format&fit=crop&q=80",
    intro: "Restless nights affect everything that follows. We help you rebuild a healthier relationship with rest.",
    feel: ["Trouble falling or staying asleep", "Nighttime overthinking", "Daytime fatigue", "A disrupted routine"],
    help: ["Calming the mind before sleep", "Building effective sleep habits", "Reducing nighttime restlessness", "A more sustainable, balanced lifestyle"],
    outcome: "More restful sleep and steadier, more energised days.",
    outcomeImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
  },

  /* ════════ RELATIONSHIPS ════════ */
  couple: {
    title: "Couple Counselling", group: "Relationships", ...base.relationship,
    heroImg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
    intro: "Every relationship faces friction. Counselling gives you both the space and tools to move through it together.",
    feel: ["Communication breakdowns", "Recurring, unresolved conflict", "Emotional distance", "Difficulty being heard"],
    help: ["A safe space to speak without judgment", "Rebuilding trust and connection", "Practical conflict-resolution skills", "Tools for navigating life changes together"],
    outcome: "A stronger, more balanced, more connected partnership.",
    outcomeImg: "https://images.unsplash.com/photo-1518621012420-8ab10887ea36?w=1600&auto=format&fit=crop&q=80",
  },
  marriage: {
    title: "Marriage Counselling", group: "Relationships", ...base.relationship,
    heroImg: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&auto=format&fit=crop&q=80",
    intro: "Marriage evolves — and so do its challenges. We help couples reconnect with clarity and mutual respect.",
    feel: ["Growing apart over time", "Repeated unresolved arguments", "Feeling unseen by your partner", "Difficulty rebuilding trust"],
    help: ["Constructive conflict resolution", "Rebuilding emotional intimacy", "Mutual understanding of perspectives", "Evidence-based relationship tools"],
    outcome: "Lasting harmony and a stronger foundation together.",
    outcomeImg: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&auto=format&fit=crop&q=80",
  },
  breakup: {
    title: "Breakup & Divorce Counselling", group: "Relationships", ...base.relationship,
    heroImg: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1600&auto=format&fit=crop&q=80",
    intro: "Endings carry real grief. We hold space for it — and help you find solid ground again.",
    feel: ["Emotional pain and uncertainty", "Loss of identity or routine", "Lowered self-esteem", "Difficulty moving forward"],
    help: ["Processing complex emotions safely", "Rebuilding self-esteem and confidence", "Healthy coping strategies", "Support making clear next decisions"],
    outcome: "Renewed clarity, resilience, and inner strength.",
    outcomeImg: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1600&auto=format&fit=crop&q=80",
  },
  "pre-post-marriage": {
    title: "Pre & Post Marriage Counselling", group: "Relationships", ...base.relationship,
    heroImg: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&auto=format&fit=crop&q=80",
    intro: "Whether preparing for marriage or adjusting to its realities, we help you build a strong, lasting foundation.",
    feel: ["Uncertainty about expectations", "Differences in values or goals", "Pressure to 'get it right'", "Adjusting to new roles together"],
    help: ["Exploring values, goals, and expectations", "Strengthening communication early", "Building effective conflict-resolution skills", "Support adapting to married life"],
    outcome: "Clarity, compatibility, and a strong foundation for the road ahead.",
    outcomeImg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
  },
  "domestic-violence": {
    title: "Domestic Violence Support", group: "Relationships", ...base.relationship,
    heroImg: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1600&auto=format&fit=crop&q=80",
    intro: "A safe, confidential space for those experiencing or recovering from abuse — at your own pace, on your own terms.",
    feel: ["Fear or ongoing distress", "Loss of self-worth", "Isolation from support systems", "Uncertainty about next steps"],
    help: ["A non-judgmental, confidential space", "Trauma-informed emotional support", "Developing safety and coping strategies", "Restoring a sense of control and empowerment"],
    outcome: "Strength, stability, and a renewed sense of safety.",
    outcomeImg: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1600&auto=format&fit=crop&q=80",
  },

  /* ════════ CAREER & GROWTH ════════ */
  career: {
    title: "Career Counselling", group: "Career & Growth", ...base.career,
    heroImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80",
    intro: "Career decisions shape so much of life. We help you choose with clarity instead of pressure.",
    feel: ["Uncertainty about direction", "Pressure from outside expectations", "Difficulty identifying strengths", "Fear of making the wrong choice"],
    help: ["Understanding your strengths and interests", "Mapping out realistic paths forward", "Building confidence in decisions", "Long-term goal setting and planning"],
    outcome: "Clarity, confidence, and meaningful professional growth.",
    outcomeImg: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1600&auto=format&fit=crop&q=80",
  },
  motivation: {
    title: "Motivation & Productivity", group: "Career & Growth", ...base.career,
    heroImg: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1600&auto=format&fit=crop&q=80",
    intro: "When direction feels lost, we help you reconnect with purpose and take meaningful, consistent action.",
    feel: ["Lack of drive or focus", "Procrastination or stagnation", "Difficulty starting or finishing tasks", "Feeling stuck without direction"],
    help: ["Identifying personal barriers and goals", "Building consistency and structure", "Reconnecting with your 'why'", "Practical, sustainable action steps"],
    outcome: "Renewed focus, confidence, and lasting productivity.",
    outcomeImg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&auto=format&fit=crop&q=80",
  },
  "time-management": {
    title: "Time Management", group: "Career & Growth", ...base.career,
    heroImg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&auto=format&fit=crop&q=80",
    intro: "Time feels limited when there's no structure around it. We help you build a rhythm that actually works for you.",
    feel: ["Constant sense of overload", "Difficulty prioritising tasks", "Procrastination under pressure", "Stress from feeling perpetually behind"],
    help: ["Setting clear goals and priorities", "Practical daily planning tools", "Reducing stress caused by overload", "Building realistic, sustainable routines"],
    outcome: "Improved productivity and a more balanced daily life.",
    outcomeImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80",
  },
  "work-life-balance": {
    title: "Work-Life Balance", group: "Career & Growth", ...base.career,
    heroImg: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=1600&auto=format&fit=crop&q=80",
    intro: "When work and life blur together, everything suffers. We help you build sustainable structure and boundaries.",
    feel: ["Constant overload and burnout creeping in", "Guilt around rest or downtime", "Strained personal relationships", "Loss of personal time and identity"],
    help: ["Mapping routines and responsibilities", "Practical boundary-setting techniques", "Balancing productivity with well-being", "Sustainable, realistic daily structure"],
    outcome: "Greater satisfaction, clarity, and emotional balance.",
    outcomeImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
  },

  /* ════════ CHILDREN & FAMILY ════════ */
  adolescent: {
    title: "Adolescent Counselling", group: "Children & Family", ...base.family,
    heroImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
    intro: "Growing up brings real emotional weight. We help teenagers navigate it with confidence, clarity, and self-awareness.",
    feel: ["Academic or social pressure", "Identity confusion", "Mood swings or withdrawal", "Difficulty opening up to adults"],
    help: ["A safe, non-judgmental space", "Building self-awareness and confidence", "Healthy coping skills for stress", "Support through major life transitions"],
    outcome: "Confidence, resilience, and balanced emotional growth.",
    outcomeImg: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&auto=format&fit=crop&q=80",
  },
  parenting: {
    title: "Parenting Support", group: "Children & Family", ...base.family,
    heroImg: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&auto=format&fit=crop&q=80",
    intro: "Parenting today can feel overwhelming. We offer practical, compassionate guidance for the everyday challenges you face.",
    feel: ["Difficulty managing behaviour", "Communication gaps with your child", "Parenting stress and overwhelm", "Uncertainty about boundaries and discipline"],
    help: ["Practical, realistic parenting strategies", "Mindful communication techniques", "Consistency without rigidity", "Boundaries grounded in empathy and care"],
    outcome: "A stronger, calmer, more connected relationship with your child.",
    outcomeImg: "https://images.unsplash.com/photo-1511895307984-ee87c1cf0bc6?w=1600&auto=format&fit=crop&q=80",
  },
  family: {
    title: "Family Counselling", group: "Children & Family", ...base.family,
    heroImg: "https://images.unsplash.com/photo-1511895307984-ee87c1cf0bc6?w=1600&auto=format&fit=crop&q=80",
    intro: "Every family faces friction — what matters is how you move through it together.",
    feel: ["Communication gaps between members", "Recurring conflict within the family", "Emotional distance", "Difficulty adjusting to life changes"],
    help: ["A space where every voice is heard", "Rebuilding trust as a unit", "Tools for healthier communication", "Support through major life transitions"],
    outcome: "A more understanding, connected, harmonious family.",
    outcomeImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
  },
  "academic-support": {
    title: "Learning & Academic Support", group: "Children & Family", ...base.family,
    heroImg: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&auto=format&fit=crop&q=80",
    intro: "Academic struggles are often about more than grades. We help students build confidence in how they learn.",
    feel: ["Difficulty focusing or retaining information", "Academic pressure and self-doubt", "Reliance on rote memorisation", "Stress around exams or performance"],
    help: ["Techniques for better recall and revision", "Understanding concepts over memorising", "Healthy, sustainable study habits", "Stress reduction around academics"],
    outcome: "Improved academic confidence and lasting performance.",
    outcomeImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80",
  },

  /* ════════ SPECIALISED SUPPORT ════════ */
  trauma: {
    title: "Trauma & PTSD Counselling", group: "Specialised Support", ...base.specialised,
    heroImg: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&auto=format&fit=crop&q=80",
    intro: "Traumatic experiences can stay with the body long after the moment has passed. Healing is possible, at your pace.",
    feel: ["Intrusive memories or flashbacks", "Heightened fear or anxiety", "Avoidance of reminders", "Emotional numbness or disconnection"],
    help: ["A safe space to process at your own pace", "Grounding and stabilisation techniques", "Building long-term coping skills", "Trauma-informed, compassionate care"],
    outcome: "Recovery, resilience, and an improved quality of life.",
    outcomeImg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&auto=format&fit=crop&q=80",
  },
  adhd: {
    title: "ADHD Support", group: "Specialised Support", ...base.specialised,
    heroImg: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&auto=format&fit=crop&q=80",
    intro: "ADHD affects focus, structure, and daily rhythm. We take a strengths-based approach to help you build what works for you.",
    feel: ["Difficulty with focus or task completion", "Impulsivity or restlessness", "Struggles with organisation and routine", "Self-esteem affected by performance"],
    help: ["Strengths-based, compassionate strategies", "Building structure and routine", "Tools for focus and follow-through", "Support for academic or workplace challenges"],
    outcome: "Greater focus, structure, and everyday confidence.",
    outcomeImg: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1600&auto=format&fit=crop&q=80",
  },
  grief: {
    title: "Grief Counselling", group: "Specialised Support", ...base.specialised,
    heroImg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&auto=format&fit=crop&q=80",
    intro: "Grief is not a straight path. Whatever you're carrying, you don't have to carry it alone.",
    feel: ["Denial — 'this doesn't feel real'", "Anger or bargaining", "Deep sadness or withdrawal", "Slowly finding moments of peace"],
    help: ["A safe, understanding space", "Help processing complex emotions", "Finding meaning at your own pace", "Support that honours your timeline"],
    outcome: "Healing, peace, and the strength to move gently forward.",
    outcomeImg: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&auto=format&fit=crop&q=80",
  },
  lgbtq: {
    title: "LGBTQIA+ Affirmative Counselling", group: "Specialised Support", ...base.specialised,
    heroImg: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&auto=format&fit=crop&q=80",
    intro: "A safe, inclusive, non-judgmental space to explore identity, relationships, and life — fully affirmed.",
    feel: ["Navigating identity or coming out", "Lack of understanding from others", "Anxiety around acceptance", "Seeking community and validation"],
    help: ["Affirmative, judgment-free support", "Building self-acceptance and resilience", "Navigating relationships and family dynamics", "A space that honours your lived experience"],
    outcome: "Dignity, confidence, and lasting emotional well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
  },
  addiction: {
    title: "Addiction & De-Addiction Counselling", group: "Specialised Support", ...base.specialised,
    heroImg: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=1600&auto=format&fit=crop&q=80",
    intro: "Addiction affects every part of life. We provide a confidential, supportive path toward lasting recovery.",
    feel: ["Loss of control over dependency", "Strained relationships", "Shame or isolation", "Cycles that feel hard to break"],
    help: ["Understanding underlying emotional causes", "Building healthier coping mechanisms", "Long-term recovery strategies", "Support for families when needed"],
    outcome: "Regained control and a healthier, freer path forward.",
    outcomeImg: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&auto=format&fit=crop&q=80",
  },

  /* ════════ EMOTIONAL & BEHAVIOURAL ════════ */
  "anger-management": {
    title: "Anger Management", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1600&auto=format&fit=crop&q=80",
    intro: "Anger is a natural emotion — but when it controls you, it harms relationships and well-being. We help you understand it and respond differently.",
    feel: ["Frequent or intense outbursts", "Difficulty calming down after conflict", "Regret following reactions", "Feeling misunderstood by others"],
    help: ["Identifying triggers and underlying causes", "Practical strategies to respond calmly", "Emotional regulation techniques", "Building healthier communication patterns"],
    outcome: "Emotional balance, calmer responses, and healthier relationships.",
    outcomeImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
  },
  "panic-attack": {
    title: "Panic Attack Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&auto=format&fit=crop&q=80",
    intro: "Panic attacks can feel terrifying and uncontrollable. We help you understand them — and build the tools to face them.",
    feel: ["Sudden overwhelming fear or dread", "Physical symptoms — racing heart, breathlessness", "Fear of losing control", "Anticipating the next attack"],
    help: ["Grounding and regulation techniques", "Understanding what triggers panic", "Building confidence in high-anxiety moments", "Reducing anticipatory anxiety over time"],
    outcome: "Reduced anxiety, greater ease, and restored daily confidence.",
    outcomeImg: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1600&auto=format&fit=crop&q=80",
  },
  bipolar: {
    title: "Bipolar Disorder Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
    intro: "Bipolar disorder brings intense highs and lows. We help you recognise patterns and build a more stable, consistent life.",
    feel: ["Unpredictable mood swings", "Difficulty maintaining relationships and routines", "Periods of very high or very low energy", "Feeling misunderstood by those around you"],
    help: ["Recognising early warning signs", "Building structure and consistent routines", "Coping skills for emotional fluctuations", "Collaborative, compassionate long-term support"],
    outcome: "Consistency, control, and a more balanced everyday life.",
    outcomeImg: "https://images.unsplash.com/photo-1455642305367-68834a9d4337?w=1600&auto=format&fit=crop&q=80",
  },
  "low-self-esteem": {
    title: "Low Self-Esteem Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
    intro: "When self-doubt shapes how you see yourself, it affects every area of life. We help you rebuild from the inside out.",
    feel: ["Self-doubt and negative self-talk", "Lack of confidence personally or professionally", "Fear of failure or judgment", "Feelings of inadequacy or comparison"],
    help: ["Building a healthier, more accurate self-image", "Strengthening inner resilience", "Challenging and reframing self-critical thoughts", "Practical steps toward greater self-worth"],
    outcome: "Rebuilt confidence and a stronger sense of your own value.",
    outcomeImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
  },
  "negative-thinking": {
    title: "Negative Thinking Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
    intro: "Persistent self-critical thoughts can distort reality and drain your energy. We help shift perspective in a lasting way.",
    feel: ["Self-critical inner dialogue", "A tendency to expect the worst", "Difficulty accepting positives", "Mental exhaustion from constant negativity"],
    help: ["Awareness and identification of thought patterns", "Practical reframing strategies", "Emotional regulation techniques", "Building a more balanced outlook"],
    outcome: "A more positive mindset and steadier emotional state.",
    outcomeImg: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1600&auto=format&fit=crop&q=80",
  },
  behavioural: {
    title: "Behavioural Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80",
    intro: "Unhelpful behaviour patterns can feel automatic. We help you understand them — and replace them with healthier responses.",
    feel: ["Negative habits that are hard to break", "Difficulty with self-control or impulse", "Stress-triggered behavioural patterns", "Social or interpersonal challenges"],
    help: ["Understanding the roots of behaviour", "Structured strategies for lasting change", "Building healthier responses to triggers", "Support for consistency and motivation"],
    outcome: "Positive, lasting behavioural change and greater well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
  },
  bullying: {
    title: "Bullying Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
    intro: "Bullying leaves real emotional marks. We help you rebuild confidence, safety, and inner resilience.",
    feel: ["Damaged confidence and self-worth", "Anxiety in social situations", "Withdrawal from activities", "Feeling unsafe or targeted"],
    help: ["A safe, supportive space to process experiences", "Building self-awareness and assertiveness", "Healthy coping and resilience strategies", "Restoring a sense of control and safety"],
    outcome: "Confidence, resilience, and a renewed sense of well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&auto=format&fit=crop&q=80",
  },
  phobia: {
    title: "Phobia Counselling", group: "Emotional & Behavioural", ...base.emotional,
    heroImg: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1600&auto=format&fit=crop&q=80",
    intro: "Phobias can quietly shrink the world around you. We use gradual, evidence-based techniques to help you face and reduce fear.",
    feel: ["Intense fear around specific triggers", "Avoidance limiting daily life", "Physical symptoms of anxiety", "Distress even anticipating the trigger"],
    help: ["Gradual, structured exposure techniques", "Understanding the anxiety response", "Grounding and calming tools", "Building confidence in feared situations"],
    outcome: "Increased confidence and improved daily functioning.",
    outcomeImg: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&auto=format&fit=crop&q=80",
  },

  /* ════════ SPECIALISED CARE ════════ */
  individual: {
    title: "Individual Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
    intro: "A confidential, one-to-one space to explore what you're carrying — and find your way forward with clarity.",
    feel: ["A need to talk without judgment", "Difficulty understanding your own emotions", "Feeling stuck in patterns you can't shift", "A sense that something needs to change"],
    help: ["Confidential, personalised support", "Building self-awareness and clarity", "Practical coping skills for daily life", "A consistent space to grow at your pace"],
    outcome: "Greater self-understanding, inner balance, and well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
  },
  couples: {
    title: "Couples Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1518621012420-8ab10887ea36?w=1600&auto=format&fit=crop&q=80",
    intro: "A collaborative space where partners can explore concerns honestly and strengthen their connection.",
    feel: ["Communication that breaks down", "Feeling emotionally distant", "Recurring, unresolved conflict", "Loss of trust or intimacy"],
    help: ["Improving communication and empathy", "Resolving conflicts constructively", "Deepening emotional understanding", "Evidence-based relationship tools"],
    outcome: "Relationship satisfaction, stability, and long-term emotional closeness.",
    outcomeImg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
  },
  divorce: {
    title: "Divorce Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1600&auto=format&fit=crop&q=80",
    intro: "Navigating divorce is emotionally and practically complex. We offer a confidential space to process it with clarity.",
    feel: ["Complex grief and emotional loss", "Difficulty making clear decisions", "Conflict around separation logistics", "Fear about what comes next"],
    help: ["Processing complex emotions safely", "Support making thoughtful, informed decisions", "Managing conflict with compassion", "Building resilience for the road ahead"],
    outcome: "Confidence, stability, and a renewed sense of direction.",
    outcomeImg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&auto=format&fit=crop&q=80",
  },
  "sex-counselling": {
    title: "Sex Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
    intro: "A safe, respectful space to discuss intimacy and sexual well-being — openly and without judgment.",
    feel: ["Concerns around intimacy or desire", "Communication difficulties with a partner", "Anxiety or discomfort around sexuality", "Questions about needs and identity"],
    help: ["Evidence-based, respectful guidance", "Improving communication about needs", "Addressing emotional blocks to intimacy", "Building confidence and healthy sexual expression"],
    outcome: "More fulfilling relationships and overall emotional well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&auto=format&fit=crop&q=80",
  },
  ptsd: {
    title: "PTSD Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&auto=format&fit=crop&q=80",
    intro: "PTSD can make the past feel present. We provide structured, compassionate support for lasting recovery.",
    feel: ["Flashbacks or intrusive memories", "Emotional numbness or hypervigilance", "Difficulty with trust and relationships", "Avoiding places, people, or thoughts"],
    help: ["Trauma-informed, evidence-based care", "Processing painful memories safely", "Coping skills and emotional stabilisation", "Patient, paced support at your speed"],
    outcome: "Recovery, resilience, and a renewed quality of life.",
    outcomeImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
  },
  "suicidal-intervention": {
    title: "Suicidal Intervention Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&auto=format&fit=crop&q=80",
    intro: "Immediate, judgment-free emotional support during crisis. You are not alone — and this moment can pass.",
    feel: ["Feeling hopeless or trapped", "Emotional pain that feels unbearable", "Withdrawal from people and life", "A sense that nothing will get better"],
    help: ["Immediate, non-judgmental support", "Reducing emotional distress and restoring hope", "Safe space to be fully heard", "Extended support for families and caregivers"],
    outcome: "Safety, emotional stability, and a path toward gradual healing.",
    outcomeImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
  },
  psychodynamic: {
    title: "Psychodynamic Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
    intro: "Understanding deep emotional patterns from your past can unlock lasting change in your present.",
    feel: ["Long-standing emotional difficulties", "Patterns that repeat across relationships", "Unresolved feelings from the past", "A sense of not fully understanding yourself"],
    help: ["Exploring past experiences and their influence", "Awareness of unconscious feelings and conflicts", "Resolving deep-rooted emotional difficulties", "A thoughtful, exploratory approach to healing"],
    outcome: "Lasting emotional healing and genuine self-understanding.",
    outcomeImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
  },
  "psychometric-testing": {
    title: "Psychometric Testing", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80",
    intro: "Scientifically designed tools to understand your abilities, personality, and behaviour — with clarity and insight.",
    feel: ["Uncertainty about your own strengths", "Questions about personality or behaviour patterns", "Need for evidence-based self-understanding", "Seeking clarity for academic or career decisions"],
    help: ["Scientifically validated assessments", "Clear, actionable insights about abilities and traits", "Understanding emotional functioning", "Support for personal, academic, and professional growth"],
    outcome: "Clarity, self-knowledge, and informed decisions about your future.",
    outcomeImg: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1600&auto=format&fit=crop&q=80",
  },
  "learning-disability": {
    title: "Learning Disability Support", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
    intro: "Dyslexia, dysgraphia, dyscalculia and more — we help children build confidence and personalised strategies to thrive.",
    feel: ["Academic struggles despite effort", "Frustration with reading, writing, or numbers", "Low confidence linked to performance", "Feeling different from peers"],
    help: ["Personalised, tailored learning strategies", "Building confidence and self-efficacy", "Improving learning skills and coping mechanisms", "Support for emotional well-being alongside academics"],
    outcome: "Greater confidence, improved skills, and overall well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&auto=format&fit=crop&q=80",
  },
  abandonment: {
    title: "Abandonment Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&auto=format&fit=crop&q=80",
    intro: "Feelings of rejection and abandonment can shape how you see yourself and relate to others. Healing is possible.",
    feel: ["Deep fear of being left or rejected", "Difficulty trusting others", "Low emotional security in relationships", "Patterns linked to childhood experiences"],
    help: ["Compassionate space to explore the roots", "Rebuilding self-worth and confidence", "Developing healthier relationship patterns", "Creating a stronger sense of inner stability"],
    outcome: "Trust, confidence, and healthier emotional connections.",
    outcomeImg: "https://images.unsplash.com/photo-1511895307984-ee87c1cf0bc6?w=1600&auto=format&fit=crop&q=80",
  },
  "eating-disorders": {
    title: "Eating Disorders Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
    intro: "Eating disorders are complex and deeply personal. We offer compassionate support to understand patterns and build a healthier relationship with food.",
    feel: ["Unhealthy or restrictive food patterns", "Emotional triggers around eating", "Distorted body image", "Guilt or shame around food and weight"],
    help: ["Understanding patterns, thoughts, and triggers", "Developing healthier coping strategies", "Building a balanced relationship with food", "Emotional support throughout recovery"],
    outcome: "Improved well-being, self-acceptance, and emotional health.",
    outcomeImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
  },
  personality: {
    title: "Personality Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=1600&auto=format&fit=crop&q=80",
    intro: "Understanding your personality — your traits, patterns, and dynamics — unlocks meaningful personal development.",
    feel: ["Confusion about recurring behavioural patterns", "Interpersonal difficulties", "Uncertainty about your own identity", "A desire for deeper self-understanding"],
    help: ["Exploring traits and behavioural patterns", "Understanding interpersonal dynamics", "Developing skills to navigate challenges", "Enhancing natural strengths and managing difficulties"],
    outcome: "Confidence, balance, and meaningful personal growth.",
    outcomeImg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80",
  },
  education: {
    title: "Education Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
    intro: "Choosing the right educational path can feel daunting. We help students make informed, confident decisions.",
    feel: ["Uncertainty about courses or learning paths", "Pressure from family or expectations", "Difficulty identifying strengths or interests", "Fear of making the wrong academic choice"],
    help: ["Understanding interests, strengths, and goals", "Clarity on suitable courses and pathways", "Building confidence in academic decisions", "Support for academic success and adjustment"],
    outcome: "Confident decisions, clarity, and academic success.",
    outcomeImg: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&auto=format&fit=crop&q=80",
  },
  menopause: {
    title: "Menopause Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
    intro: "Menopause brings significant emotional, physical, and lifestyle shifts. We offer compassionate support through every stage.",
    feel: ["Mood changes and emotional volatility", "Physical discomfort and fatigue", "Loss of confidence or identity shifts", "Uncertainty about what's happening to your body"],
    help: ["Understanding emotional and physical changes", "Managing mood changes and stress", "Building confidence through transition", "Practical strategies for a balanced lifestyle"],
    outcome: "Greater balance, confidence, and well-being.",
    outcomeImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1600&auto=format&fit=crop&q=80",
  },
  dementia: {
    title: "Alzheimer's & Dementia Support", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&auto=format&fit=crop&q=80",
    intro: "Structured, compassionate support for individuals with Alzheimer's or dementia — and for the caregivers who love them.",
    feel: ["Memory decline and cognitive change", "Emotional distress and confusion", "Caregiver stress and exhaustion", "Uncertainty about what lies ahead"],
    help: ["Evidence-informed strategies for daily management", "Communication support for individuals and families", "Caregiver guidance and emotional support", "Promoting safety, consistency, and quality of life"],
    outcome: "Improved functioning, caregiver confidence, and quality of life.",
    outcomeImg: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&auto=format&fit=crop&q=80",
  },
  eap: {
    title: "EAP Counselling", group: "Specialised Care", ...base.care,
    heroImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80",
    intro: "Confidential support for personal and work-related challenges — helping employees thrive inside and outside the workplace.",
    feel: ["Work stress and pressure", "Personal challenges affecting performance", "Burnout or emotional exhaustion", "Difficulty balancing work and life"],
    help: ["Confidential, professional guidance", "Practical coping strategies for stress", "Support for workplace and personal challenges", "Tools for improved emotional well-being"],
    outcome: "Improved well-being, productivity, and work performance.",
    outcomeImg: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=1600&auto=format&fit=crop&q=80",
  },
};

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const d = data[params.slug] ?? data.depression;
    return {
      meta: [
        { title: `${d.title} — Stillness` },
        { name: "description", content: d.intro },
        { property: "og:title", content: `${d.title} — Stillness` },
        { property: "og:description", content: d.intro },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => <div className="pt-40 text-center">Service not found</div>,
});

function ServiceDetail() {
  const { slug } = useParams({ from: "/services/$slug" });
  const d = data[slug] ?? data.depression;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .sd-page { font-family: 'DM Sans', sans-serif; }
        .sd-page .display { font-family: 'Cormorant Garamond', serif; }

        @keyframes sd-hero-scale { from { transform: scale(1.12); } to { transform: scale(1); } }
        @keyframes sd-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes sd-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .sd-hero-img { animation: sd-hero-scale 2.2s cubic-bezier(0.16,1,0.3,1) forwards; }
        .sd-pulse-dot { animation: sd-pulse 2.4s ease-in-out infinite; }

        .sd-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px; border-radius: 999px;
          font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
        }

        .sd-feel-card, .sd-help-card {
          padding: 28px 26px; border-radius: 20px;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s;
        }
        .sd-feel-card:hover, .sd-help-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px -16px rgba(0,0,0,0.18);
        }

        .sd-cta-pill {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 40px; border-radius: 999px;
          font-size: 0.95rem; font-weight: 500;
          text-decoration: none; position: relative; overflow: hidden;
          transition: transform 0.35s, box-shadow 0.35s;
        }
        .sd-cta-pill:hover { transform: translateY(-3px) scale(1.02); }

        .sd-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
          text-decoration: none; transition: gap 0.3s, opacity 0.3s;
        }
        .sd-back:hover { gap: 14px; }

        .sd-orbit-ring {
          position: absolute; border-radius: 50%; border: 1px solid currentColor; opacity: 0.15;
          animation: sd-orbit 40s linear infinite;
        }

        @media (max-width: 768px) {
          .sd-feel-help-grid { grid-template-columns: 1fr !important; }
          .sd-hero-content { padding: 0 24px 80px !important; }
          .sd-hero-nav { padding: 0 24px !important; }
          .sd-section { padding: 80px 24px !important; }
          .sd-outcome-section { padding: 80px 24px !important; }
        }
      `}</style>

      <div className="sd-page" style={{ background: T.bgMain, color: T.textMain , marginTop: 80}} >

        {/* ════════ HERO ════════ */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: T.bgDark, color: "#fff" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img src={d.heroImg} alt={d.title} className="sd-hero-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.bgDark} 5%, rgba(16,16,18,0.45) 45%, rgba(16,16,18,0.75) 100%)` }} />
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 20% 30%, ${d.accent}33, transparent 60%)` }} />
          </div>

          <div className="sd-hero-nav" style={{ position: "absolute", top: 32, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 48px", zIndex: 2 }}>
            <Link to="/services" className="sd-back" style={{ color: "rgba(255,255,255,0.75)" }}>
              ← All services
            </Link>
            <div className="sd-pill" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}>
              <span className="sd-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: d.accent, display: "inline-block" }} />
              {d.group}
            </div>
          </div>

          <div className="sd-hero-content" style={{ position: "relative", zIndex: 1, padding: "0 48px 100px", maxWidth: 1100 }}>
            <Reveal dir="up" delay={100}>
              <h1 className="display" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 28 }}>
                {d.title}
              </h1>
            </Reveal>
            <Reveal dir="up" delay={260}>
              <p style={{ fontSize: "1.15rem", lineHeight: 1.8, color: T.textDarkSoft, maxWidth: 600 }}>
                {d.intro}
              </p>
            </Reveal>
          </div>

          <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.5)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", zIndex: 2 }}>
            <span>Scroll</span>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
          </div>
        </section>

        {/* ════════ FEEL / HELP ════════ */}
        <section className="sd-section" style={{ padding: "140px 48px", maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 16, textAlign: "center" }}>
              Understanding the experience
            </p>
            <h2 className="display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 300, textAlign: "center", maxWidth: 760, margin: "0 auto 90px", lineHeight: 1.15 }}>
              What you might be feeling — <em style={{ color: d.accent }}>and how we help.</em>
            </h2>
          </Reveal>

          <div className="sd-feel-help-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <div>
              <Reveal dir="left">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 24 }}>What you may feel</p>
              </Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {d.feel.map((f, i) => (
                  <Reveal key={f} dir="left" delay={120 + i * 90}>
                    <div className="sd-feel-card" style={{ background: T.bgSoft, border: `1px solid ${T.border}` }}>
                      <p className="display" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.textMain }}>{f}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal dir="right">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: T.textSoft, marginBottom: 24 }}>How we help</p>
              </Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {d.help.map((f, i) => (
                  <Reveal key={f} dir="right" delay={120 + i * 90}>
                    <div className="sd-help-card" style={{ background: d.accentBg, border: `1px solid ${d.accent}33` }}>
                      <p className="display" style={{ fontSize: "1.3rem", fontWeight: 400, color: d.accent }}>{f}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ OUTCOME ════════ */}
        <section className="sd-outcome-section" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: T.bgDark, color: "#fff", padding: "120px 48px" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img src={d.outcomeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.4)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${T.bgDark} 0%, rgba(16,16,18,0.55) 40%, ${T.bgDark} 100%)` }} />
          </div>

          <div style={{ position: "absolute", top: "50%", left: "50%", color: d.accent, pointerEvents: "none" }}>
            <div className="sd-orbit-ring" style={{ width: 520, height: 520, top: -260, left: -260 }} />
            <div className="sd-orbit-ring" style={{ width: 720, height: 720, top: -360, left: -360, animationDirection: "reverse", animationDuration: "60s" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760 }}>
            <Reveal dir="scale">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: d.accent, marginBottom: 24 }}>
                The outcome we walk toward
              </p>
              <h2 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: 56, letterSpacing: "-0.01em" }}>
                {d.outcome}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <Link to="/book" className="sd-cta-pill" style={{ background: "#fff", color: T.bgDark }}>
                Book a session
                <span style={{ width: 22, height: 1, background: T.bgDark, opacity: 0.5, display: "inline-block" }} />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ════════ CLOSE ════════ */}
        <section style={{ padding: "100px 48px", textAlign: "center", background: T.bgSoft }}>
          <Reveal>
            <p style={{ fontSize: "0.95rem", color: T.textSoft, marginBottom: 24 }}>
              Not sure this is the right fit?
            </p>
            <Link to="/services" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 30px", borderRadius: 999,
              border: `1px solid ${T.border}`, color: T.textMain,
              fontSize: "0.85rem", textDecoration: "none", background: T.bgMain,
              transition: "all 0.3s",
            }}>
              Explore all services →
            </Link>
          </Reveal>
        </section>

      </div>
    </>
  );
}