import type { Metadata, Viewport } from "next";
import { Syne, Manrope, Orbitron, Space_Grotesk, Syncopate } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["300", "400", "500", "600", "700"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["400", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", weight: ["300", "400", "700"] });
const syncopate = Syncopate({ subsets: ["latin"], variable: "--font-syncopate", weight: ["400", "700"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050508",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://theshadowagent.com"),
  title: "ShadowAgent | The Ultimate Local AI Desktop Agent for Privacy",
  description: "Experience the power of a fully local AI agent. Control WhatsApp, Emails, Calendar, and Local Files with zero data leakage. ShadowAgent runs 100% on your machine with Ollama support.",
  keywords: "local ai agent, personal ai assistant, private ai, whatsapp automation, email automation, local llm, ollama desktop, shadowagent, tauri ai app, open source ai agent, local rag",
  authors: [{ name: "ShadowAgent Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ShadowAgent | The Ultimate Local AI Desktop Agent",
    description: "Your digital life, fully automated and 100% local. Control WhatsApp, Emails, and Files with total privacy.",
    type: "website",
    url: "https://theshadowagent.com",
    siteName: "ShadowAgent",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShadowAgent - Local AI Operating System",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadowAgent | Local AI Agent",
    description: "100% Local AI. No cloud. No data leaks. Control your digital life securely.",
    images: ["/og-image.png"],
    creator: "@shadowagent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ShadowAgent",
    "operatingSystem": "Windows, macOS, Linux",
    "applicationCategory": "SecurityApplication",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "9",
      "highPrice": "299",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${manrope.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${syncopate.variable} font-space antialiased bg-[#050508] text-white selection:bg-cyan-500/30 overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Cinematic Noise Overlay - Disabled on mobile/touch for performance */}
        {typeof window !== "undefined" && window.innerWidth > 1024 && !window.matchMedia("(pointer: coarse)").matches && (
          <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        )}
        
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
