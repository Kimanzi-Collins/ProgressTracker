import type { Metadata, Viewport } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const viewport: Viewport = {
  themeColor: "#06070a",
};

export const metadata: Metadata = {
  title: "CYBERSYNC 200 // AfricaHackon Squad Vanguard",
  description:
    "Awwwards-level progress engine, daily streak tracker, weakness diagnosis, and practical hands-on cybersecurity hub for AfricaHackon Cohort 6.",
  openGraph: {
    title: "CYBERSYNC 200 // AfricaHackon Squad Vanguard",
    description: "7-Member Squad Progress Tracker & Diagnostic Lab Hub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-void-950 text-zinc-100 min-h-screen selection:bg-cyber-green selection:text-void-950">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
