"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "100% Local Processing", shadow: true, chatgpt: false, copilot: false },
  { feature: "Zero Cloud Data Sent", shadow: true, chatgpt: false, copilot: false },
  { feature: "WhatsApp Automation", shadow: true, chatgpt: false, copilot: false },
  { feature: "Email Management", shadow: true, chatgpt: false, copilot: true },
  { feature: "Calendar Scheduling", shadow: true, chatgpt: false, copilot: true },
  { feature: "Local PDF/Doc RAG", shadow: true, chatgpt: false, copilot: false },
  { feature: "Air-Gapped Operation", shadow: true, chatgpt: false, copilot: false },
  { feature: "One-Time Annual Fee", shadow: true, chatgpt: false, copilot: false },
  { feature: "Open Model Support", shadow: true, chatgpt: false, copilot: false },
  { feature: "Works Without Internet", shadow: true, chatgpt: false, copilot: false },
];

const Cell = ({ val }: { val: boolean }) =>
  val ? (
    <div className="flex justify-center">
      <div className="w-6 h-6 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-green-400" />
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/8 flex items-center justify-center">
        <X className="w-3.5 h-3.5 text-white/20" />
      </div>
    </div>
  );

export default function ComparisonTable() {
  return (
    <section className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">Comparison</p>
          <h2 className="text-4xl md:text-5xl font-syne font-bold tracking-tight">
            Why <span className="text-white/40">Not the Others?</span>
          </h2>
          <p className="text-white/50 font-manrope mt-4 max-w-xl mx-auto">
            Every alternative sends your data to the cloud. ShadowAgent is the only AI agent built for complete local sovereignty.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/8 overflow-hidden"
          style={{ background: "rgb(7,7,14)" }}
        >
          {/* Header */}
          <div className="grid grid-cols-4 px-6 py-4 border-b border-white/8" style={{ background: "rgb(10,10,20)" }}>
            <div className="text-xs font-manrope font-semibold text-white/40 uppercase tracking-wider">Feature</div>
            <div className="text-center">
              <span className="text-sm font-syne font-bold text-white">ShadowAgent</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-syne font-bold text-white/40">ChatGPT</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-syne font-bold text-white/40">Copilot</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 px-6 py-4 items-center border-b border-white/5 hover:bg-white/2 transition-colors ${
                i === rows.length - 1 ? "border-b-0" : ""
              }`}
            >
              <div className="text-sm font-manrope text-white/60">{row.feature}</div>
              <Cell val={row.shadow} />
              <Cell val={row.chatgpt} />
              <Cell val={row.copilot} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
