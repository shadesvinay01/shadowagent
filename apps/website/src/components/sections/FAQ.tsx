"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Does ShadowAgent work completely offline?",
    a: "Yes. Once installed, ShadowAgent requires zero internet connection for normal operation. The only network call is a lightweight annual license validation ping — everything else runs 100% on your hardware."
  },
  {
    q: "Which AI models does ShadowAgent use?",
    a: "ShadowAgent runs quantized open-source models in GGUF and ExLlamaV2 format (e.g., Mistral, LLaMA 3, Phi-3). You can swap or update models freely — we don't lock you into any proprietary model."
  },
  {
    q: "Is my WhatsApp data safe?",
    a: "Completely. ShadowAgent uses whatsapp-web.js to connect via your local browser session. Messages are processed entirely in memory on your machine and never written to any cloud database or external log."
  },
  {
    q: "What are the system requirements?",
    a: "Windows 10+, macOS 12+ (M1/M2 optimized), or Linux. Recommended: 16GB RAM and a modern GPU for faster inference. CPU-only mode works on 8GB RAM systems with smaller models."
  },
  {
    q: "Can I use ShadowAgent for professional / sensitive documents?",
    a: "Absolutely. Lawyers, doctors, and security professionals use ShadowAgent specifically because no data ever leaves their device. Your PDFs and emails stay encrypted at rest on your own hardware."
  },
  {
    q: "What happens when my annual license expires?",
    a: "ShadowAgent continues to work normally — you just won't receive model updates or new feature releases until you renew. We believe in earning your renewal through excellence, not feature-locking."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-syne font-bold tracking-tight">
            Common <span className="text-white/40">Questions.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-white/8 overflow-hidden cursor-pointer"
              style={{ background: open === i ? "rgb(12,12,22)" : "rgb(8,8,16)" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="font-syne font-bold text-white text-sm md:text-base pr-6">{faq.q}</h3>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Plus className="w-5 h-5 text-white/40" />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-white/55 text-sm font-manrope leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
