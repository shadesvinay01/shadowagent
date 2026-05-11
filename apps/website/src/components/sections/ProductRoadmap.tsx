"use client";

import { motion } from "framer-motion";
import { Milestone, Search, Globe, Mic, Zap } from "lucide-react";

const roadmap = [
  { phase: "Phase 1", title: "Local Core", description: "Ollama integration, WhatsApp & Email stubs, secure keychain.", status: "Completed", icon: <Zap /> },
  { phase: "Phase 2", title: "Autonomous Tools", description: "Real-time calendar sync, full file analysis RAG, production licensing.", status: "Current", icon: <Search /> },
  { phase: "Phase 3", title: "Voice & Vision", description: "Local Whisper voice control, autonomous browser agent, multi-modal support.", status: "Upcoming", icon: <Mic /> },
  { phase: "Phase 4", title: "Shadow Ecosystem", description: "Mobile local agent companion, self-hosted node orchestration.", status: "Vision", icon: <Globe /> },
];

export default function ProductRoadmap() {
  return (
    <section className="py-40 px-6 section-panel">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <Milestone className="w-12 h-12 mx-auto text-cyan-500 mb-6" />
          <h2 className="text-5xl font-syne font-bold mb-4 tracking-tight">The Roadmap</h2>
          <p className="text-white/40 font-manrope">Building the future of digital sovereignty, one node at a time.</p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          {roadmap.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(0,240,255,0.8)] -translate-x-1/2 z-10 border-4 border-[#050508]" />

              <div className="flex-1 w-full pl-16 md:pl-0 md:text-right">
                {i % 2 === 0 ? (
                  <div className="md:pr-20">
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">{item.phase}</span>
                    <h3 className="text-2xl font-syne font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/30 font-manrope leading-relaxed">{item.description}</p>
                  </div>
                ) : (
                  <div className="md:opacity-0 md:pointer-events-none" />
                )}
              </div>

              <div className="flex-1 w-full pl-16 md:pl-20 md:text-left">
                {i % 2 !== 0 ? (
                  <div className="">
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">{item.phase}</span>
                    <h3 className="text-2xl font-syne font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/30 font-manrope leading-relaxed">{item.description}</p>
                  </div>
                ) : (
                  <div className="md:opacity-0 md:pointer-events-none" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
