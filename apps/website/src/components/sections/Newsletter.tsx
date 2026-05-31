"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          data: { email },
        }),
      });
    } catch (_) {
      // Silent fail — user still sees success
    }

    setStatus("success");
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="card-solid rounded-[3rem] p-12 md:p-20 border border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-hidden relative">
          
          {/* Decorative Sparkles */}
          <Sparkles className="absolute top-10 right-10 w-8 h-8 text-purple-500/20 animate-pulse" />
          
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400"
            >
              Neural Newsletter
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tight">
              Stay in the <span className="text-white/40">Shadow.</span>
            </h2>
            <p className="text-white/40 text-lg font-manrope">
              Get bi-weekly updates on new local models, privacy protocols, and ShadowAgent feature releases.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 text-green-400 font-syne font-bold py-6"
              >
                <CheckCircle2 className="w-6 h-6" />
                Welcome to the protocol.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
                <input
                  type="email"
                  required
                  placeholder="Enter your encrypted email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-8 pr-32 text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/20"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-xl font-syne font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  {status === "loading" ? "Encrypting..." : "Subscribe"}
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
            
            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              Zero Tracking · No Spam · Pure Sovereignty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
