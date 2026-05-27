import type { Metadata } from "next";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://paceclub.run";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "PaceClub — find your run club, replace your spreadsheets",
    template: "%s — PaceClub"
  },
  description:
    "PaceClub is the simplest way to find a local run club, RSVP to the next session and build attendance streaks. Free for runners. Free for clubs under 50 members.",
  keywords: [
    "run club",
    "run club near me",
    "running group",
    "running community",
    "track club",
    "find run club",
    "run club London",
    "run club Stockholm",
    "run club NYC"
  ],
  openGraph: {
    type: "website",
    url: APP_URL,
    title: "PaceClub — find your run club",
    description:
      "Find a run club near you, RSVP to the next session, build attendance streaks. Free for runners. Free for clubs under 50 members.",
    siteName: "PaceClub",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PaceClub" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "PaceClub — find your run club",
    description: "Find a run club, RSVP, build attendance streaks. Free for runners.",
    creator: "@oshylabs1"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ff5a1f" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
