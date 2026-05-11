"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <section className="space-y-16">
          <div className="space-y-4">
             <h1 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter text-white/20">Terms.</h1>
             <p className="text-white/40 text-xl font-light italic">The protocol for using ShadowAgent.</p>
          </div>
          
          <div className="space-y-12 text-white/50 leading-relaxed max-w-2xl">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-xs">1. Software License</h3>
              <p className="text-sm">ShadowAgent is a subscription-based local software. Each purchase grants a one-year license for one device. Reverse engineering or attempting to bypass the local licensing server is a violation of these terms.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-xs">2. User Responsibility</h3>
              <p className="text-sm">You are solely responsible for the content you generate and the automation you perform. ShadowAgent does not moderate your local data. Use automation tools (WhatsApp, Email) in accordance with the third-party provider's terms.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-xs">3. Intellectual Property</h3>
              <p className="text-sm">The "ShadowAgent" brand, logo, and proprietary Rust architecture are the intellectual property of the ShadowAgent Collective. You may not distribute modified versions of the binary without explicit permission.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-xs">4. Limitation of Liability</h3>
              <p className="text-sm">In no event shall ShadowAgent be liable for any indirect, incidental, or consequential damages (including account bans from third-party services) resulting from the use of this software.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-xs">5. Governing Law</h3>
              <p className="text-sm">The protocol is governed by the laws of digital sovereignty. Any disputes shall be resolved through transparent, peer-to-peer communication.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
