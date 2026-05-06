import { createFileRoute, Link, useParams } from "@tanstack/react-router";

const data: Record<string, { title: string; intro: string; feel: string[]; help: string[]; outcome: string }> = {
  depression: {
    title: "Depression Counselling",
    intro: "Depression can feel heavy, isolating, and difficult to understand. You are not alone in this experience.",
    feel: ["Low energy", "Loss of interest", "Emotional fatigue", "A quiet sense of distance from yourself"],
    help: ["A safe space to talk", "Practical coping techniques", "Emotional clarity", "Patient, paced support"],
    outcome: "Gradual healing, strength, and renewed clarity.",
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
  notFoundComponent: () => <div className="pt-40 text-center">Not found</div>,
});

function ServiceDetail() {
  const { slug } = useParams({ from: "/services/$slug" });
  const d = data[slug] ?? data.depression;
  return (
    <div className="pt-32">
      <section className="relative px-6 md:px-10 py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-window opacity-80" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pink-glow-soft blur-3xl animate-breathe" />
        <div className="relative max-w-4xl mx-auto">
          <Link to="/services" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors">
            ← All services
          </Link>
          <h1 className="mt-6 reveal-blur font-display text-5xl md:text-7xl tracking-tight text-balance">
            {d.title}
          </h1>
          <p className="reveal mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed" data-delay="200">
            {d.intro}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="reveal-left">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">What you may feel</p>
          <ul className="space-y-4">
            {d.feel.map((f) => (
              <li key={f} className="flex items-start gap-4 font-display text-2xl text-foreground/80">
                <span className="mt-4 w-6 h-px bg-foreground/40" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal-right">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">How we help</p>
          <ul className="space-y-4">
            {d.help.map((f) => (
              <li key={f} className="flex items-start gap-4 font-display text-2xl text-foreground/80">
                <span className="mt-4 w-6 h-px bg-foreground/40" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-32 text-center bg-cement/40">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 reveal">The outcome we walk toward</p>
        <h2 className="reveal-blur font-display text-4xl md:text-5xl tracking-tight max-w-3xl mx-auto text-balance">
          {d.outcome}
        </h2>
        <div className="mt-12 reveal" data-delay="200">
          <Link to="/book" className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background text-sm animate-glow-pulse">
            Book a session
          </Link>
        </div>
      </section>
    </div>
  );
}
