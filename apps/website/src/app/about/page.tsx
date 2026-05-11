"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { Shield, Users, Heart, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope cursor-none">
      <CustomCursor />
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <section className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-syne font-bold tracking-tighter">About ShadowAgent.</h1>
            <p className="text-xl text-white/40 leading-relaxed">
              We are a collective of developers and privacy advocates dedicated to rebuilding the bridge between AI and personal sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Shield className="text-cyan-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-syne font-bold">Privacy First</h3>
              <p className="text-sm text-white/30 leading-relaxed">
                We believe that artificial intelligence should empower the individual, not the corporation. Our code is built to run 100% locally on your hardware.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Zap className="text-purple-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-syne font-bold">Local Speed</h3>
              <p className="text-sm text-white/30 leading-relaxed">
                By removing the cloud middleman, we achieve zero-latency interactions and total data autonomy.
              </p>
            </div>
          </div>

          <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6">
            <h3 className="text-3xl font-syne font-bold">Our Mission</h3>
            <p className="text-white/60 leading-relaxed italic">
              "To create the most powerful personal AI agent in the world, without ever asking for a single byte of your data."
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
