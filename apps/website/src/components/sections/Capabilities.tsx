"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { MessageSquare, Mail, Calendar, FileText, Zap, Shield, HardDrive } from "lucide-react";
import React, { useRef } from "react";

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

function BentoCard({ item, i }: { item: any, i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      onMouseMove={onMouseMove}
      className={`group relative card-solid rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:scale-[0.98] active:scale-[0.96] cursor-default border border-white/5 bg-white/[0.02] ${item.className}`}
    >
      {/* Animated Spotlight Overlay */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 255, 0.07),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="flex flex-col h-full relative z-10">
        <div className="mb-auto">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            {item.icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-syne font-bold mb-3 text-white tracking-tight">{item.title}</h3>
          <p className="text-white/40 text-sm font-manrope leading-relaxed group-hover:text-white/60 transition-colors duration-500">{item.description}</p>
        </div>
      </div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-40 px-6 overflow-hidden">
      {/* Background radial gradient to give depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-24 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-manrope font-bold tracking-[0.4em] uppercase text-cyan-400/60 mb-6"
          >
            Neural Interface Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-syne font-bold tracking-tighter mb-8 leading-[0.95]"
          >
            Smarter. Faster.<br/><span className="text-white/20">Air-Gapped.</span>
          </motion.h2>
          <p className="text-white/40 max-w-2xl text-xl font-manrope font-light leading-relaxed">
            ShadowAgent integrates directly with your local system nodes. No cloud proxies, no latency, no spying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-6">
          {bentoItems.map((item, i) => (
            <BentoCard key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
