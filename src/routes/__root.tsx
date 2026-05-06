import { Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-display text-foreground">A quiet path, but not this one.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted away.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-2 text-sm hover:border-foreground/50 transition-colors">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stillness Therapy — Calm Online Counselling" },
      { name: "description", content: "Stillness offers calm, confidential online therapy for anxiety, relationships, burnout, grief, and personal growth." },
      { name: "author", content: "Stillness" },
      { property: "og:title", content: "Stillness Therapy — Calm Online Counselling" },
      { property: "og:description", content: "Calm, confidential therapy for anxiety, relationships, burnout, grief, and personal growth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "/" },
    ],
  }),
  shellComponent: RootShell,
  component: SiteLayout,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
