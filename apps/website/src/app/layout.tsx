import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "ShadowAgent | The Ultimate Local AI Desktop Agent for Privacy",
  description: "Experience the power of a fully local AI agent. Control WhatsApp, Emails, Calendar, and Local Files with zero data leakage. ShadowAgent runs 100% on your machine with Ollama support.",
  keywords: "local ai agent, personal ai assistant, private ai, whatsapp automation, email automation, local llm, ollama desktop, shadowagent, tauri ai app, open source ai agent, local rag",
  authors: [{ name: "ShadowAgent Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ShadowAgent | Local AI Agent",
    description: "Your digital life, fully automated and 100% local.",
    type: "website",
    url: "https://shadowagent.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${manrope.variable} font-manrope antialiased bg-[#050508] text-white selection:bg-cyan-500/30 overflow-x-hidden`}>
        {/* Cinematic Noise Overlay */}
        <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
