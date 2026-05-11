"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-3xl">
        <section className="space-y-12">
          <h1 className="text-5xl font-syne font-bold tracking-tighter text-white/40">Terms of Service</h1>
          
          <div className="space-y-8 text-white/60 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">1. License Grant</h3>
              <p>Upon purchase, ShadowAgent grants you a non-exclusive, non-transferable license to use the software on a single machine for one year. Renewal is required for continued updates and local tool support.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">2. Responsibility</h3>
              <p>Since ShadowAgent runs locally, you are solely responsible for the data you process. ShadowAgent is a tool; how you use it with third-party services (WhatsApp, Email) is your responsibility.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">3. No Warranty</h3>
              <p>ShadowAgent is provided "as is." While we strive for 100% local stability, we are not liable for any data loss or account bans resulting from automation activities on third-party platforms.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
