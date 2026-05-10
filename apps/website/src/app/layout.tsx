import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "ShadowAgent | Your Personal AI Agent. 100% Local.",
  description: "Control WhatsApp, Email, Calendar, and Files locally with zero data sent to any server. Complete privacy for your digital life.",
  keywords: "local ai, personal agent, privacy first, ai automation, whatsapp automation, local llm",
  openGraph: {
    title: "ShadowAgent | Local AI Agent",
    description: "The AI that never leaves your device.",
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
      <body className={`${syne.variable} ${manrope.variable} font-manrope antialiased bg-[#050508] text-white selection:bg-cyan-500/30`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
