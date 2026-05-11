"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <section className="space-y-16">
          <div className="space-y-4">
             <h1 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter text-cyan-400">Privacy Protocol.</h1>
             <p className="text-white/40 text-xl font-light italic">Your data, your machine, your sovereignty.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">1. Local Execution</h3>
              <p className="text-white/50 text-sm leading-relaxed">ShadowAgent is a locally executed software. All AI processing, data analysis, and tool interactions occur strictly on your machine. We do not have access to your messages, emails, or files.</p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">2. Zero Telemetry</h3>
              <p className="text-white/50 text-sm leading-relaxed">We do not collect telemetry or usage data. Your interactions with the AI agent are completely private and are never transmitted to our servers for "improvement" purposes.</p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">3. Licensing Data</h3>
              <p className="text-white/50 text-sm leading-relaxed">The only data transmitted to our servers is during the initial activation handshake: your email address and license key. Once the JWT token is issued, communication ceases.</p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">4. Secure Storage</h3>
              <p className="text-white/50 text-sm leading-relaxed">Your session tokens for WhatsApp and Email are stored in your OS-native keychain (AES-256 encrypted). ShadowAgent does not store these on any cloud database.</p>
            </div>
          </div>

          <div className="space-y-8 max-w-2xl">
            <h3 className="text-2xl font-syne font-bold">Cookies & Local Storage</h3>
            <p className="text-white/40 text-sm">
              Our website uses minimal functional cookies to remember your preferences and session during the purchase process. We do not use tracking pixels (like Meta Pixel or Google Analytics) that compromise your digital footprint.
            </p>
            <h3 className="text-2xl font-syne font-bold">Third Party Models</h3>
            <p className="text-white/40 text-sm">
              ShadowAgent uses Ollama for local model execution. When you download a model (e.g., Llama 3), it is pulled directly from the model provider's repository to your local machine. No data is sent back to these providers during inference.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
