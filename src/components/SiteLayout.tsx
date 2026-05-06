import { Link, Outlet, useRouterState } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/playground", label: "Lab" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout() {
  const { location } = useRouterState();
  const pageClass = getPageClass(location.pathname);
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${pageClass}`}>
      <Header pathname={location.pathname} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function getPageClass(pathname: string) {
  if (pathname === "/") return "page-home";
  if (pathname.startsWith("/about")) return "page-about";
  if (pathname.startsWith("/services")) return "page-services";
  if (pathname.startsWith("/playground")) return "page-lab";
  if (pathname.startsWith("/blog")) return "page-journal";
  if (pathname.startsWith("/contact")) return "page-contact";
  if (pathname.startsWith("/book")) return "page-book";
  return "page-home";
}

function Header({ pathname }: { pathname: string }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative w-7 h-7 inline-flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-pink-glow-soft animate-breathe" />
            <span className="relative w-2 h-2 rounded-full bg-foreground/70" />
          </span>
          <span className="font-display text-lg tracking-tight">stillness</span>
        </Link>
        <nav className="hidden md:flex items-center gap-9 text-sm">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative transition-colors duration-500 ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-foreground/60" />
                )}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/book"
          className="hidden md:inline-flex items-center text-sm px-5 py-2 rounded-full border border-foreground/15 hover:border-foreground/40 transition-all duration-700"
        >
          Book a session
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10 text-sm">
        <div className="md:col-span-2">
          <div className="font-display text-2xl tracking-tight mb-4">stillness</div>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            A quiet space for emotional clarity. We listen, we understand,
            we walk with you — at your own pace.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Explore</div>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground text-muted-foreground">Services</Link></li>
            <li><Link to="/playground" className="hover:text-foreground text-muted-foreground">Lab</Link></li>
            <li><Link to="/blog" className="hover:text-foreground text-muted-foreground">Journal</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Quiet contact</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>hello@stillness.care</li>
            <li>Mon — Sat · 9 to 7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © 2026 Stillness. A safe, confidential space.
      </div>
    </footer>
  );
}
