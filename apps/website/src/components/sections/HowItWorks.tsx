"use client";

import { motion } from "framer-motion";
import { Download, Settings, Cpu, Play } from "lucide-react";

const steps = [
  {
    title: "1. Download & Install",
    desc: "Deploy the binary to your local machine. No administrative rights required.",
    icon: <Download className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "2. Connect Tools",
    desc: "Scan WhatsApp QR and link your email via secure local IMAP.",
    icon: <Settings className="w-8 h-8 text-purple-400" />
  },
  {
    title: "3. Local Activation",
    desc: "Your machine initializes the local model weights (GGUF/ExLlamaV2).",
    icon: <Cpu className="w-8 h-8 text-green-400" />
  },
  {
    title: "4. ShadowAgent Working",
    desc: "Start automating your life with zero data leaving your device.",
    icon: <Play className="w-8 h-8 text-cyan-400" />
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-purple-400 mb-4">Setup</p>
            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-8 leading-tight">
              How it <span className="text-white/40">Starts.</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed font-manrope">
              Setting up ShadowAgent takes less than 3 minutes. No complex cloud configuration, no API keys from big tech.
            </p>
            {/* Terminal Log — solid dark background */}
            <div className="p-6 rounded-2xl border border-white/10" style={{background: 'rgb(8,8,16)'}}>
              <div className="text-xs font-mono text-cyan-400 mb-3 tracking-widest">SYSTEM_LOG // STATUS</div>
              <div className="space-y-2 text-[11px] font-mono text-white/40">
                <p><span className="text-white/20">{">"}</span> INITIALIZING LOCAL_CORE...</p>
                <p><span className="text-white/20">{">"}</span> SCANNING SYSTEM PORTS... <span className="text-green-400">OK</span></p>
                <p><span className="text-white/20">{">"}</span> LOCAL_DB_ENCRYPTED: <span className="text-green-400">YES</span></p>
                <p className="text-cyan-400 animate-pulse"><span className="text-white/20">{">"}</span> READY FOR AGENT DEPLOYMENT</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-300 group"
                style={{background: 'rgb(10,10,20)'}}
              >
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                <h4 className="text-lg font-syne font-bold text-white mb-3">{step.title}</h4>
                <p className="text-white/50 text-sm font-manrope leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
