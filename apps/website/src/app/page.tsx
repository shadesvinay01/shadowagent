"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import GlassPrism from "@/components/canvas/GlassPrism";
import Navbar from "@/components/layout/Navbar";
import LogoMark from "@/components/ui/LogoMark";
import CinematicHero from "@/components/sections/CinematicHero";
import CinematicReveal from "@/components/sections/CinematicReveal";
import StatsSection from "@/components/sections/StatsSection";
import Capabilities from "@/components/sections/Capabilities";
import HowItWorks from "@/components/sections/HowItWorks";
import ComparisonTable from "@/components/sections/ComparisonTable";
import PrivacyFortress from "@/components/sections/PrivacyFortress";
import LiveDemo from "@/components/sections/LiveDemo";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import CustomCursor from "@/components/ui/CustomCursor";
import DownloadModal from "@/components/ui/DownloadModal";

export default function Home() {
  const [showDownload, setShowDownload] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-cyan-500/20 cursor-none overflow-x-hidden">

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Download Modal */}
      {showDownload && <DownloadModal onClose={() => setShowDownload(false)} />}

      {/* Photorealistic Glass Backdrop — only on desktop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isDesktop ? (
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ 
              antialias: false, 
              powerPreference: "high-performance",
              alpha: true,
              stencil: false,
              depth: false
            }}
          >
            <GlassPrism />
          </Canvas>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#0a0a15] to-[#050508]" />
        )}
      </div>

      {/* Sticky Navbar */}
      <Navbar onDownload={() => setShowDownload(true)} />

      {/* All page content sits above the canvas */}
      <div className="relative z-20 overflow-x-hidden">

        <CinematicHero />

        <CinematicReveal />

        <StatsSection />

        <Capabilities />

        <HowItWorks />

        <ComparisonTable />

        <PrivacyFortress />

        <LiveDemo />

        <Testimonials />

        <Pricing />

        <FAQ />

        {/* Final CTA */}
        <section className="py-36 px-6 text-center relative overflow-hidden section-panel">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-white/40 mb-6">Get Started</p>
          <h2 className="text-5xl md:text-7xl font-syne font-bold mb-14 tracking-tight leading-[1.05]">
            Take Back Your <br /><span className="text-white/35">Digital Sovereignty.</span>
          </h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
            <button
              onClick={() => setShowDownload(true)}
              className="relative px-14 py-6 bg-white text-black font-syne font-black rounded-full text-xl hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 shadow-[0_0_80px_rgba(255,255,255,0.25)] flex items-center gap-4 group"
            >
              Initialize ShadowAgent
              <Zap className="w-5 h-5 fill-black group-hover:animate-bounce" />
            </button>
          </motion.div>
          <p className="mt-8 text-white/30 text-xs font-manrope tracking-[0.2em] uppercase">
            v1.0.4-stable · Windows · macOS · Linux
          </p>
        </section>

        {/* Footer */}
        <footer className="py-16 section-panel">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2.5">
                <LogoMark size={34} />
                <span className="text-xl font-syne font-bold tracking-tight">SHADOWAGENT</span>
              </div>
              <p className="text-white/40 text-sm font-manrope max-w-xs leading-relaxed">
                The only AI agent that values your privacy as much as you do. 100% local. 100% yours.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 md:gap-20">
              <div>
                <h5 className="text-white font-syne font-bold mb-4 text-sm tracking-wide uppercase">Product</h5>
                <ul className="text-white/40 text-sm font-manrope space-y-3">
                  <li className="hover:text-white transition-colors cursor-pointer">Features</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Security</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-syne font-bold mb-4 text-sm tracking-wide uppercase">Company</h5>
                <ul className="text-white/40 text-sm font-manrope space-y-3">
                  <li className="hover:text-white transition-colors cursor-pointer">About</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                  <li className="hover:text-white transition-colors cursor-pointer">License</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-manrope">
            <p>© 2026 ShadowAgent. All rights reserved locally.</p>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
