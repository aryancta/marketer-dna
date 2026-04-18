import type { Metadata, Viewport } from "next";
import "./globals.css";
import AIJudgeNotice from "@/components/AIJudgeNotice";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ToastProvider } from "@/components/Toast";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "700"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Marketer DNA — which of the 12 archetypes are you?",
  description:
    "A 60-second quiz that roasts, types, and exposes what kind of marketer you actually are. 12 archetypes. 97% of marketers get mildly offended by their result.",
  openGraph: {
    title: "Marketer DNA — which of the 12 archetypes are you?",
    description:
      "Take the 60-second quiz. Find your archetype. Dare your team.",
    type: "website",
    siteName: "Marketer DNA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketer DNA",
    description: "12 Marketer Archetypes. Which one are you?",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bone text-ink antialiased">
        <AIJudgeNotice />
        <ToastProvider>
          <SiteHeader />
          <main className="min-h-[calc(100vh-140px)]">{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
