"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Why Local AI is the Future of Productivity",
    excerpt: "Exploring the shift from cloud-based models to local execution and why your data belongs on your disk.",
    date: "May 12, 2026",
    author: "ShadowAgent Team",
    category: "Privacy"
  },
  {
    title: "Unlocking WhatsApp Automation without Meta APIs",
    excerpt: "How ShadowAgent uses local session mirroring to automate your outreach securely.",
    date: "May 08, 2026",
    author: "Engine Lead",
    category: "Technical"
  },
  {
    title: "ShadowAgent v1.0.4: The Sovereignty Update",
    excerpt: "New file analysis features, improved local RAG performance, and refined UI animations.",
    date: "May 02, 2026",
    author: "Product Team",
    category: "Updates"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-5xl">
        <div className="space-y-4 mb-20">
          <h1 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter">Journal.</h1>
          <p className="text-xl text-white/40 max-w-xl">Insights into the development of local-first AI and the future of digital sovereignty.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer space-y-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">{post.category}</span>
                <h3 className="text-2xl font-syne font-bold group-hover:text-cyan-400 transition-colors leading-tight">{post.title}</h3>
              </div>
              <p className="text-sm text-white/30 leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-all group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
