"use client";

import { motion, useMotionValue, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { MessageSquare, Mail, Calendar, FileText, Share2, Zap, Shield, HardDrive } from "lucide-react";
import React from "react";

const bentoItems = [
  {
    title: "WhatsApp Control",
    description: "Read, summarize, and reply to messages entirely locally. Automate your outreach without Meta APIs.",
    icon: <MessageSquare className="w-6 h-6 text-cyan-400" />,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Email Intelligence",
    description: "Drafts replies and organizes your inbox with zero cloud involvement.",
    icon: <Mail className="w-5 h-5 text-purple-400" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Smart Calendar",
    description: "Schedule events without big tech oversight.",
    icon: <Calendar className="w-5 h-5 text-mint-500" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Local Execution",
    description: "Powered by quantized local models. Fast, efficient, and 100% offline-ready.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "File Analysis RAG",
    description: "Search, summarize and cross-reference your PDFs and docs locally.",
    icon: <FileText className="w-5 h-5 text-orange-400" />,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Air-Gapped Secure",
    description: "Zero external network requests — ever.",
    icon: <Shield className="w-5 h-5 text-green-400" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Hardware Optimized",
    description: "Leverages Apple Silicon, CUDA, and ARM acceleration natively.",
    icon: <HardDrive className="w-5 h-5 text-blue-400" />,
    className: "md:col-span-1 md:row-span-1",
  }
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-syne font-bold tracking-tight mb-4 leading-[1.05]"
          >
            Smarter. Faster.<br/><span className="text-white/40">Fully Local.</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl text-lg font-manrope font-light leading-relaxed">
            ShadowAgent integrates directly with your system APIs. No cloud proxies, no latency, no spying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-4">
          {bentoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group card-solid rounded-2xl p-7 overflow-hidden transition-all duration-300 cursor-default ${item.className}`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-auto">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-syne font-bold mb-2 text-white leading-tight">{item.title}</h3>
                  <p className="text-white/55 text-sm font-manrope leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
