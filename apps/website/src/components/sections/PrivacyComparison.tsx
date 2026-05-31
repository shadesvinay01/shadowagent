"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Cloud, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function PrivacyComparison() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-24 md:py-40 px-4 md:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-7xl font-syne font-bold mb-6 tracking-tighter">
            Cloud AI is a <span className="text-red-500">Security Risk.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-manrope text-sm md:text-base">
            Compare how ShadowAgent protects you versus traditional cloud-based AI assistants.
          </p>
        </div>

        {/* Comparison Slider Container */}
        <div className="relative h-[450px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-black/40 overflow-hidden cursor-ew-resize select-none shadow-2xl">
          
          {/* Layer 1: Cloud AI (Background / Left) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-950/5">
            <div className="text-center space-y-4 md:space-y-6 px-6">
              <Cloud className="w-16 h-16 md:w-24 md:h-24 mx-auto text-red-500 opacity-50" />
              <h3 className="text-3xl md:text-5xl font-syne font-bold text-red-500/80 uppercase">Cloud AI</h3>
              <ul className="text-[10px] md:text-sm font-mono space-y-3 text-red-400/40 uppercase tracking-widest list-none">
                <li className="flex items-center gap-2 justify-center"><AlertTriangle className="w-3 h-3 md:w-4 md:h-4" /> Data stored on servers</li>
                <li className="flex items-center gap-2 justify-center"><AlertTriangle className="w-3 h-3 md:w-4 md:h-4" /> Chats used for training</li>
                <li className="flex items-center gap-2 justify-center"><AlertTriangle className="w-3 h-3 md:w-4 md:h-4" /> Privacy is an "option"</li>
              </ul>
            </div>
          </div>

          {/* Layer 2: ShadowAgent (Foreground / Right / Clipped) */}
          <div 
            className="absolute inset-y-0 right-0 bg-[#050508] backdrop-blur-3xl border-l border-cyan-500/30 overflow-hidden"
            style={{ width: `${100 - sliderPos}%` }}
          >
            {/* Inner Content - Fixed Width to match Layer 1 */}
            <div 
              className="absolute inset-y-0 right-0 flex items-center justify-center"
              style={{ width: '100vw', maxWidth: '1152px' }} // 1152px is max-w-6xl
            >
              <div className="text-center space-y-4 md:space-y-6 px-6">
                <Shield className="w-16 h-16 md:w-24 md:h-24 mx-auto text-cyan-400" />
                <h3 className="text-3xl md:text-5xl font-syne font-bold text-cyan-400 uppercase">ShadowAgent</h3>
                <ul className="text-[10px] md:text-sm font-mono space-y-3 text-cyan-300/60 uppercase tracking-widest list-none">
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-500" /> 100% Local Processing</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-500" /> Zero Data Telemetry</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-500" /> Air-Gapped Security</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Draggable Handle */}
          <div 
            className="absolute inset-y-0 w-1 bg-cyan-500/50 cursor-ew-resize z-50 flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)] active:scale-90 transition-transform">
              <div className="flex gap-1">
                <div className="w-1 h-3 md:h-4 bg-black/20 rounded-full" />
                <div className="w-1 h-3 md:h-4 bg-black/20 rounded-full" />
              </div>
            </div>
            
            {/* Invisible Range Slider */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPos}
              onChange={(e) => setSliderPos(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
