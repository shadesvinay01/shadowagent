"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { Shield, Users, Heart, Zap, Globe, Code, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-5xl">
        <section className="space-y-24">
          
          {/* Header */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter">About ShadowAgent.</h1>
            <p className="text-2xl text-white/40 leading-relaxed font-light">
              Reclaiming the digital frontier, one local node at a time.
            </p>
          </div>

          {/* Core Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>
                ShadowAgent began as a response to the growing centralization of AI. We saw a future where every conversation and every thought was being piped into corporate data lakes for "training."
              </p>
              <p>
                Our mission is to prove that performance does not have to come at the cost of privacy. By leveraging the latest in local model execution and Rust-based architecture, we've built a platform that is faster, safer, and entirely yours.
              </p>
            </div>
            <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-200" />
               <Cpu className="w-32 h-32 text-cyan-400/20 animate-pulse" />
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield />, title: "Trustless", desc: "You don't have to trust us because we don't have your data." },
              { icon: <Globe />, title: "Decentralized", desc: "No server outages. No cloud dependencies. Just your hardware." },
              { icon: <Code />, title: "Open Hearted", desc: "Built by developers who value code integrity and user freedom." }
            ].map((pillar, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                <div className="text-cyan-400 w-8 h-8">{pillar.icon}</div>
                <h3 className="text-xl font-syne font-bold">{pillar.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Philosophy Section */}
          <div className="p-16 md:p-24 rounded-[4rem] bg-cyan-500/5 border border-cyan-500/10 text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(6,182,212,0.15),transparent)] pointer-events-none" />
             <h3 className="text-4xl md:text-5xl font-syne font-bold tracking-tight">Our Zero-Data Philosophy</h3>
             <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
               We believe the next era of computing will be defined by "Local Sovereignty." Where the user owns the model, the weights, and the history.
             </p>
             <button className="px-8 py-4 bg-white text-black font-syne font-bold rounded-full hover:scale-105 transition-all">Join the Revolution</button>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}
