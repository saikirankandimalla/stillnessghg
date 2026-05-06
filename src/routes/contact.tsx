import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Stillness · Safe Space" },
      { name: "description", content: "Talk to us. We're here to listen whenever you're ready." },
      { property: "og:title", content: "Contact — Stillness" },
      { property: "og:description", content: "Talk to us. We're here to listen whenever you're ready." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-window opacity-70" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-glow-soft blur-3xl animate-breathe" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-mint-soft blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />

      <section className="relative px-6 md:px-10 py-24 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 reveal">Safe space</p>
        <h1 className="reveal-blur font-display text-5xl md:text-7xl tracking-tight">Talk to us.</h1>
        <p className="reveal mt-6 text-lg text-muted-foreground max-w-xl" data-delay="200">
          We're here to listen whenever you're ready. We'll respond with care and confidentiality.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-16 space-y-10 reveal"
          data-delay="400"
        >
          {[
            { id: "name", label: "Your name", type: "text" },
            { id: "email", label: "Email", type: "email" },
          ].map((f) => (
            <div key={f.id} className="group relative">
              <label htmlFor={f.id} className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                required
                className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:border-foreground/70 focus:outline-none transition-all duration-700 focus:shadow-[0_4px_30px_-10px_var(--pink-glow)]"
              />
            </div>
          ))}
          <div>
            <label htmlFor="msg" className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Whatever you'd like to say
            </label>
            <textarea
              id="msg"
              rows={5}
              required
              className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:border-foreground/70 focus:outline-none transition-all duration-700 resize-none focus:shadow-[0_4px_30px_-10px_var(--pink-glow)]"
            />
          </div>
          <div className="pt-4">
            {!sent ? (
              <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-sm animate-glow-pulse">
                Send gently
                <span className="inline-block w-6 h-px bg-background/70" />
              </button>
            ) : (
              <p className="font-display text-2xl text-foreground/80 animate-fade-blur">
                Thank you. Your message is held with care.
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
