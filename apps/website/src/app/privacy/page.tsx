"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-3xl">
        <section className="space-y-12">
          <h1 className="text-5xl font-syne font-bold tracking-tighter text-cyan-400">Privacy Protocol</h1>
          
          <div className="space-y-8 text-white/60 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">1. Local Execution</h3>
              <p>ShadowAgent is a locally executed software. All AI processing, data analysis, and tool interactions occur strictly on your machine. We do not have access to your messages, emails, or files.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">2. Telemetry</h3>
              <p>We do not collect telemetry or usage data. Your interactions with the AI agent are completely private and are never transmitted to our servers.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">3. Licensing Data</h3>
              <p>The only data transmitted to our servers is during the initial activation handshake: your email address and license key. Once the JWT token is issued, communication ceases.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">4. Secure Storage</h3>
              <p>Your session tokens for WhatsApp and Email are stored in your OS-native keychain (AES-256 encrypted). ShadowAgent does not store these on any cloud database.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
