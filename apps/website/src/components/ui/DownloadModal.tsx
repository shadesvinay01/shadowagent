"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, Sparkles, CheckCircle2, Shield, Zap, Cpu, Terminal } from "lucide-react";

export default function DownloadModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    useCase: "all",
    platform: "windows",
    aiSetup: "ollama",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [queueNumber, setQueueNumber] = useState(0);

  useEffect(() => {
    // Generate a random queue number between 240 and 480 or read if already submitted
    const saved = localStorage.getItem("shadow_waitlist_info");
    if (saved) {
      const parsed = JSON.parse(saved);
      setQueueNumber(parsed.queue || 342);
      setStatus("success");
      setFormData(parsed.data);
    } else {
      setQueueNumber(Math.floor(Math.random() * 240) + 240);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus("loading");
    
    // Simulate premium network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const info = {
      queue: queueNumber,
      data: formData,
      registeredAt: new Date().toISOString(),
    };
    
    localStorage.setItem("shadow_waitlist_info", JSON.stringify(info));
    setStatus("success");
  };

  const handleReset = () => {
    localStorage.removeItem("shadow_waitlist_info");
    setStatus("idle");
    setFormData({
      name: "",
      email: "",
      useCase: "all",
      platform: "windows",
      aiSetup: "ollama",
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[500] flex items-center justify-center p-6 overflow-y-auto"
        style={{ background: "rgba(3,3,6,0.85)", backdropFilter: "blur(24px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          className="w-full max-w-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)] relative my-8"
          style={{ background: "rgb(6,6,12)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Glowing Core */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 relative z-10" style={{ background: "rgb(8,8,16)" }}>
            <div>
              <h3 className="font-syne font-black text-white text-2xl tracking-tight flex items-center gap-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                Request Beta Access
              </h3>
              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-1.5">ShadowAgent // Waitlist Vault</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 rounded-2xl border border-white/5 text-white/40 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-10 relative z-10">
            {status !== "success" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm text-white/50 leading-relaxed font-manrope">
                  ShadowAgent is currently in private preview. Request an invite to secure your spot in the local autonomous AI beta program.
                </p>

                {/* Name field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Full Name</label>
                  <div className="relative rounded-2xl border border-white/5 focus-within:border-cyan-500/50 bg-white/[0.02] transition-all flex items-center px-4 py-3">
                    <User className="w-4 h-4 text-white/20 mr-3 flex-shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-none outline-none focus:ring-0 text-sm text-white placeholder:text-white/10 w-full"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Email Address</label>
                  <div className="relative rounded-2xl border border-white/5 focus-within:border-cyan-500/50 bg-white/[0.02] transition-all flex items-center px-4 py-3">
                    <Mail className="w-4 h-4 text-white/20 mr-3 flex-shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-transparent border-none outline-none focus:ring-0 text-sm text-white placeholder:text-white/10 w-full"
                    />
                  </div>
                </div>

                {/* Use Case Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Primary Intent</label>
                    <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 flex items-center">
                      <Zap className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                      <select
                        value={formData.useCase}
                        onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                        className="bg-transparent border-none outline-none focus:ring-0 text-sm text-white w-full cursor-pointer [&>option]:bg-neutral-950"
                      >
                        <option value="all">Full Suite (All Tools)</option>
                        <option value="whatsapp">WhatsApp Auto-Pilot</option>
                        <option value="email">Smart Email Assistant</option>
                        <option value="files">RAG Memory & Local Files</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Preferred Local LLM</label>
                    <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 flex items-center">
                      <Cpu className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                      <select
                        value={formData.aiSetup}
                        onChange={(e) => setFormData({ ...formData, aiSetup: e.target.value })}
                        className="bg-transparent border-none outline-none focus:ring-0 text-sm text-white w-full cursor-pointer [&>option]:bg-neutral-950"
                      >
                        <option value="ollama">Ollama (Llama 3 / 3.1)</option>
                        <option value="llama.cpp">Llama.cpp / GGUF</option>
                        <option value="lmstudio">LM Studio Local Server</option>
                        <option value="cloud-fallback">Encrypted Cloud Tunnel</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Operating System select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Operating System Platform</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["windows", "macos", "linux"].map((os) => (
                      <button
                        key={os}
                        type="button"
                        onClick={() => setFormData({ ...formData, platform: os })}
                        className={`py-3 rounded-2xl border text-xs font-syne font-black uppercase tracking-wider transition-all ${
                          formData.platform === os
                            ? "bg-white text-black border-white"
                            : "bg-white/[0.01] text-white/40 border-white/5 hover:border-white/10 hover:text-white/60"
                        }`}
                      >
                        {os}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full relative py-4 bg-white text-black font-syne font-black rounded-2xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 group mt-4 overflow-hidden"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Securing Cryptographic Seat...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-black group-hover:animate-pulse" />
                      Request Demo & Join Waitlist
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-4"
              >
                <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl font-syne font-black uppercase tracking-tight text-white">Waitlist Enlisted</h4>
                  <p className="text-sm text-white/50 leading-relaxed font-manrope max-w-sm mx-auto">
                    Welcome to the shadow, <span className="text-cyan-400 font-bold">{formData.name}</span>. Your cryptographic seat has been securely registered in our system.
                  </p>
                </div>

                {/* Queue status card */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] max-w-md mx-auto space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-[9px] font-mono text-cyan-400 bg-cyan-400/10 rounded-bl-xl border-l border-b border-white/5 uppercase tracking-widest">
                    ACTIVE
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Your Position</p>
                      <p className="text-3xl font-syne font-extrabold text-white">#{queueNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Platform</p>
                      <p className="text-sm font-syne font-black uppercase text-cyan-400 mt-1">{formData.platform}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-white/40">
                      <span>Registered Email:</span>
                      <span className="text-white/60 font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-white/40">
                      <span>Intent Routing:</span>
                      <span className="text-white/60 font-semibold uppercase">{formData.useCase}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-xs text-white/30 font-manrope max-w-xs mx-auto leading-relaxed">
                    We will send your early access invite key and private installation binaries to your email as soon as your slot clears.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] text-[10px] font-syne font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                    >
                      Update Application
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-syne font-black uppercase tracking-widest transition-all"
                    >
                      Close Vault
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="px-10 pb-10 text-center space-y-2">
            <div className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">
              End-to-End Encrypted Handshake
            </div>
            <div className="text-[10px] text-white/40 font-manrope">
              Questions? Reach out to <a href="mailto:hello@theshadowagent.com" className="text-cyan-400 hover:underline">hello@theshadowagent.com</a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
