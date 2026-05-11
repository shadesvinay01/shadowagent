"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Cloud, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function PrivacyComparison() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-syne font-bold mb-8 tracking-tighter">
            Cloud AI is a <span className="text-red-500">Security Risk.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-manrope">
            Compare how ShadowAgent protects you versus traditional cloud-based AI assistants.
          </p>
        </div>

        <div className="relative h-[600px] rounded-[3rem] border border-white/5 bg-black/40 overflow-hidden cursor-ew-resize select-none">
          {/* Left Side: Cloud (Red) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-950/10">
            <div className="text-center space-y-6 opacity-30">
              <Cloud className="w-24 h-24 mx-auto text-red-500" />
              <h3 className="text-5xl font-syne font-bold text-red-500">CLOUD AI</h3>
              <ul className="text-sm font-mono space-y-2 text-red-400/60 uppercase tracking-widest">
                <li className="flex items-center gap-2 justify-center"><AlertTriangle className="w-4 h-4" /> Data stored on servers</li>
                <li className="flex items-center gap-2 justify-center"><AlertTriangle className="w-4 h-4" /> Private chats used for training</li>
                <li className="flex items-center gap-2 justify-center"><AlertTriangle className="w-4 h-4" /> Subscription dependencies</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Local (ShadowAgent) */}
          <div 
            className="absolute inset-y-0 right-0 bg-cyan-950/20 backdrop-blur-3xl border-l border-cyan-500/30 transition-all duration-75"
            style={{ width: `${100 - sliderPos}%` }}
          >
            <div className="absolute inset-0 w-[100vw] h-full flex items-center justify-center overflow-hidden" style={{ width: '1000px', right: 0 }}>
              <div className="text-center space-y-6">
                <Shield className="w-24 h-24 mx-auto text-cyan-400" />
                <h3 className="text-5xl font-syne font-bold text-cyan-400">SHADOWAGENT</h3>
                <ul className="text-sm font-mono space-y-2 text-cyan-300/60 uppercase tracking-widest">
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-4 h-4" /> 100% Local Processing</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-4 h-4" /> Zero External Telemetry</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-4 h-4" /> One-Time Purchase</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Draggable Handle */}
          <div 
            className="absolute inset-y-0 w-1 bg-white/40 cursor-ew-resize z-50 flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.5)] active:scale-90 transition-transform">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-black/20 rounded-full" />
                <div className="w-1 h-4 bg-black/20 rounded-full" />
              </div>
            </div>
            
            {/* Hidden Input to handle dragging */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPos}
              onChange={(e) => setSliderPos(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
