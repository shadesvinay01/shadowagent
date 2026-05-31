"use client";

import { motion } from "framer-motion";
import { ShieldAlert, EyeOff, Globe, Lock } from "lucide-react";

export default function PrivacyFortress() {
  return (
    <section id="privacy" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 mb-8"
              style={{background: 'rgba(239,68,68,0.08)'}}
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-xs font-manrope font-semibold uppercase tracking-widest">The Cloud Risk</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6 leading-tight tracking-tight">
              Your Data is <br />
              <span className="text-white/40">Not Your Own</span> in the Cloud.
            </h2>
            
            <p className="text-white/55 text-lg mb-10 leading-relaxed font-manrope font-light">
              Mainstream AI agents send every keystroke, email, and contact detail to corporate servers for &quot;training.&quot; ShadowAgent builds an impenetrable fortress around your machine.
            </p>

            <div className="space-y-3">
              {[
                { icon: <EyeOff className="text-white/80 w-5 h-5" />, title: "Zero Data Logging", desc: "We physically cannot see what you ask your agent.", color: "text-green-400" },
                { icon: <Globe className="text-white/80 w-5 h-5" />, title: "Air-Gapped Ready", desc: "Works flawlessly without an internet connection.", color: "text-cyan-400" },
                { icon: <Lock className="text-white/80 w-5 h-5" />, title: "Local Keys Only", desc: "Integration tokens never leave your hardware.", color: "text-purple-400" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-xl border border-white/8 hover:border-white/15 transition-all duration-300"
                  style={{background: 'rgb(10,10,18)'}}
                >
                  <div className="p-2.5 h-fit rounded-lg border border-white/10" style={{background: 'rgb(18,18,32)'}}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-white/45 text-sm font-manrope leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Solid dark panel — no transparent backgrounds */}
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center p-8"
              style={{background: 'rgb(7,7,14)'}}>
              
              <div className="w-full h-full border border-white/8 rounded-2xl overflow-hidden flex flex-col p-6"
                style={{background: 'rgb(4,4,10)'}}>
                {/* Mock titlebar */}
                <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="text-[10px] font-mono text-white/30 tracking-widest">ENCRYPTION // ACTIVE</div>
                </div>
                
                <div className="flex-1 flex flex-col gap-4 relative z-10">
                  {/* Search bar mock */}
                  <div className="h-11 w-full rounded-lg border border-white/8 flex items-center px-4 overflow-hidden relative"
                    style={{background: 'rgb(12,12,22)'}}>
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }} 
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 0.5 }}
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                    />
                    <div className="w-2/5 h-1.5 bg-white/15 rounded-full" />
                  </div>

                  {/* Content block mock */}
                  <div className="h-28 w-full rounded-lg border border-white/8 p-4 space-y-2.5"
                    style={{background: 'rgb(12,12,22)'}}>
                    <div className="w-3/4 h-1.5 bg-white/15 rounded-full" />
                    <div className="w-1/2 h-1.5 bg-white/8 rounded-full" />
                    <div className="w-2/3 h-1.5 bg-white/8 rounded-full" />
                    <div className="w-1/3 h-1.5 bg-white/5 rounded-full" />
                  </div>
                  
                  {/* Status bar at bottom */}
                  <div className="mt-auto p-4 border border-green-500/20 rounded-xl flex items-center gap-4"
                    style={{background: 'rgba(34,197,94,0.06)'}}>
                    <Lock className="text-green-400 w-5 h-5 flex-shrink-0" />
                    <div className="text-xs font-manrope">
                      <span className="text-white font-semibold block mb-0.5">Local Storage Secured</span>
                      <span className="text-white/40">Zero bytes transmitted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
