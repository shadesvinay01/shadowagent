"use client";

import { motion } from "framer-motion";

const testimonials = [
  { name: "Alex R.", role: "Security Engineer", text: "Finally an AI that doesn't phone home. ShadowAgent runs flawlessly on my air-gapped setup." },
  { name: "Priya S.", role: "Freelance Consultant", text: "I manage 3 clients' emails through ShadowAgent. Drafts are perfect and nothing leaves my machine." },
  { name: "Marcus T.", role: "Privacy Advocate", text: "I've reviewed the source — there are zero telemetry calls. This is the real deal for local AI." },
  { name: "Aisha K.", role: "Content Creator", text: "WhatsApp automation and social post scheduling locally? It's like having a silent assistant." },
  { name: "Tom W.", role: "CTO, Startup", text: "Ran it on a MacBook M2 — 12ms latency responses. Blew my mind. No cloud required." },
  { name: "Lena M.", role: "Data Scientist", text: "The local RAG over my research PDFs is incredibly accurate. Zero privacy concerns." },
  { name: "Dev P.", role: "Indie Hacker", text: "Replaced 4 SaaS tools with ShadowAgent. One license, everything local, privacy guaranteed." },
  { name: "Sara B.", role: "Lawyer", text: "Client confidentiality is everything. ShadowAgent is the only AI tool I trust for sensitive docs." },
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 rounded-2xl border border-white/8 p-6 mx-3"
      style={{ background: "rgb(10,10,18)" }}
    >
      <p className="text-white/70 text-sm font-manrope leading-relaxed mb-5">&ldquo;{item.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-sm font-syne font-bold text-white"
          style={{ background: "rgb(18,18,32)" }}
        >
          {item.name[0]}
        </div>
        <div>
          <p className="text-white text-sm font-syne font-bold">{item.name}</p>
          <p className="text-white/40 text-xs font-manrope">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials]; // duplicate for seamless loop

  return (
    <section className="relative py-24 px-0 section-panel overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6 mb-14">
        <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">Testimonials</p>
        <h2 className="text-4xl md:text-5xl font-syne font-bold tracking-tight">
          Trusted by Privacy <span className="text-white/40">Champions.</span>
        </h2>
      </div>

      {/* Scrolling ticker row 1 */}
      <div className="relative flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((t, i) => <TestimonialCard key={i} item={t} />)}
        </motion.div>
      </div>

      {/* Scrolling ticker row 2 (reversed) */}
      <div className="relative flex overflow-hidden mt-4" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((t, i) => <TestimonialCard key={i} item={t} />)}
        </motion.div>
      </div>
    </section>
  );
}
