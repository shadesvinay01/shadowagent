"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import CustomCursor from "@/components/ui/CustomCursor";

// Dynamic Imports with No SSR for heavy components
const CinematicHero = dynamic(() => import("@/components/sections/CinematicHero"), { ssr: true });
const AgentTerminal = dynamic(() => import("@/components/sections/AgentTerminal"), { ssr: false });
const CinematicReveal = dynamic(() => import("@/components/sections/CinematicReveal"), { ssr: false });
const StatsSection = dynamic(() => import("@/components/sections/StatsSection"), { ssr: false });
const Capabilities = dynamic(() => import("@/components/sections/Capabilities"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), { ssr: false });
const ComparisonTable = dynamic(() => import("@/components/sections/ComparisonTable"), { ssr: false });
const PrivacyComparison = dynamic(() => import("@/components/sections/PrivacyComparison"), { ssr: false });
const PrivacyFortress = dynamic(() => import("@/components/sections/PrivacyFortress"), { ssr: false });
const LiveDemo = dynamic(() => import("@/components/sections/LiveDemo"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });
const Pricing = dynamic(() => import("@/components/sections/Pricing"), { ssr: false });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });
const ProductRoadmap = dynamic(() => import("@/components/sections/ProductRoadmap"), { ssr: false });
const Newsletter = dynamic(() => import("@/components/sections/Newsletter"), { ssr: false });
const DownloadModal = dynamic(() => import("@/components/ui/DownloadModal"), { ssr: false });
const GlassPrism = dynamic(() => import("@/components/canvas/GlassPrism"), { ssr: false });
const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), { ssr: false });

export default function Home() {
  const [showDownload, setShowDownload] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      // Robust check: Width > 768 AND not a touch device (mostly)
      // Mobile browsers in "Desktop Mode" will have high width but still have touch points
      const widthCheck = window.innerWidth > 1024;
      const touchCheck = window.matchMedia("(pointer: coarse)").matches;
      setIsDesktop(widthCheck && !touchCheck);
    };
    
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

      {/* Photorealistic Glass Backdrop — only on desktop and only after hydration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {isDesktop ? (
          <div className="w-full h-full opacity-60">
            <Canvas 
              camera={{ position: [0, 0, 10], fov: 45 }}
              dpr={[1, 1.2]} // Further capped for safety
              gl={{ 
                antialias: false, 
                powerPreference: "high-performance",
                alpha: true,
                stencil: false,
                depth: false,
                preserveDrawingBuffer: false
              }}
            >
              <GlassPrism />
            </Canvas>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#050508]" />
        )}
      </div>

      {/* Sticky Navbar */}
      <Navbar onDownload={() => setShowDownload(true)} />

      {/* All page content sits above the canvas */}
      <div className="relative z-20 overflow-x-hidden">

        <CinematicHero />

        <AgentTerminal />

        <CinematicReveal />

        <StatsSection />

        <Capabilities />

        <HowItWorks />

        <ComparisonTable />

        <PrivacyComparison />

        <PrivacyFortress />

        <LiveDemo />

        <Testimonials />

        <Pricing />

        <FAQ />

        <ProductRoadmap />

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

        <Newsletter />

        <Footer />

      </div>
    </main>
  );
}
