"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Shield, Zap, Globe, Cpu, Lock, 
  Terminal, BarChart3, Rocket, AlertCircle, CheckCircle2, 
  MessageSquare, Mail, Calendar, FileText, Share2, 
  Download, QrCode, Key, MessageCircle, TrendingUp, DollarSign, Target, Megaphone,
  User, Layers, ShieldAlert, CpuIcon, Network, Globe2, Info
} from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";

const slides = [
  {
    id: "cover",
    title: "ShadowAgent",
    subtitle: "ShadowAgent",
    tagline: "RECLAIMING DIGITAL SOVEREIGNTY",
    description: "The Ghost in the Machine.",
    notes: "Welcome to the future of personal computing. This is ShadowAgent.",
    bgText: "SOVEREIGNTY",
    gradient: "from-cyan-500/20 via-purple-500/10 to-transparent",
    icon: <Shield className="w-32 h-32 text-cyan-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]" />
  },
  {
    id: "problem",
    title: "THE CRISIS",
    subtitle: "THE PANOPTICON",
    description: "Every interaction is a data point. Every prompt is a security leak.",
    bullets: [
      "Privacy is dead in the age of Cloud AI.",
      "Your chats, emails, and files are products.",
      "The cloud is a massive point of failure.",
      "Corporate surveillance is the new default."
    ],
    bgText: "PANOPTICON",
    gradient: "from-red-500/20 to-transparent",
    icon: <ShieldAlert className="w-24 h-24 text-red-500" />
  },
  {
    id: "solution",
    title: "THE REVEAL",
    subtitle: "SHADOWAGENT",
    description: "Local intelligence. Zero compromise. Your mind, your machine.",
    bullets: [
      "100% Local Neural Processing.",
      "Zero Data Leakage by Design.",
      "Air-Gapped Privacy Orchestration.",
      "Built for the Sovereign Individual."
    ],
    bgText: "INTELLIGENCE",
    gradient: "from-mint-500/20 to-transparent",
    icon: <CheckCircle2 className="w-24 h-24 text-mint-400" />
  },
  {
    id: "features",
    title: "CAPABILITIES",
    subtitle: "THE NEURAL GRID",
    description: "A unified system for total digital automation.",
    features: [
      { title: "Neural WhatsApp", desc: "Local message orchestration." },
      { title: "Sovereign Email", desc: "Private drafting engine." },
      { title: "System RAG", desc: "Local vector file search." },
      { title: "Smart Scheduling", desc: "Autonomous local calendar." },
      { title: "NPU Optimized", desc: "Hardware-level acceleration." },
      { title: "Secure Plugins", desc: "Extensible local ecosystem." }
    ],
    bgText: "AUTOMATION",
    gradient: "from-purple-500/20 to-transparent",
    icon: <CpuIcon className="w-24 h-24 text-purple-400" />
  },
  {
    id: "privacy",
    title: "FORTRESS",
    subtitle: "SHADOW VS CLOUD",
    boldStatement: "YOUR DATA NEVER LEAVES YOUR DEVICE.",
    comparison: [
      { feature: "Data Location", shadow: "Local Machine", cloud: "Central Cloud" },
      { feature: "Access Key", shadow: "User-Owned", cloud: "Company-Owned" },
      { feature: "Privacy", shadow: "100% Guaranteed", cloud: "Terms Apply" },
      { feature: "Latency", shadow: "0ms Execution", cloud: "Network Dep." }
    ],
    bgText: "SECURITY",
    gradient: "from-cyan-500/20 to-transparent",
    icon: <Lock className="w-24 h-24 text-cyan-400" />
  },
  {
    id: "market",
    title: "DYNAMICS",
    subtitle: "THE MARKET SHIFT",
    stats: [
      { val: "$50B+", label: "Personal AI 2028" },
      { val: "85%", label: "Privacy Concerns" },
      { val: "10x", label: "Edge AI Growth" },
      { val: "0", label: "Shadow Data Leaks" }
    ],
    bgText: "EXPANSION",
    gradient: "from-orange-500/20 to-transparent",
    icon: <BarChart3 className="w-24 h-24 text-orange-400" />
  },
  {
    id: "business",
    title: "ARCHITECTURE",
    subtitle: "BUSINESS MODEL",
    model: [
      { plan: "Free", price: "$0", desc: "Core local agent." },
      { plan: "Pro", price: "$99/yr", desc: "Advanced automation." },
      { plan: "Enterprise", price: "$499/yr", desc: "Multi-node support." }
    ],
    bgText: "PROFIT",
    gradient: "from-green-500/20 to-transparent",
    icon: <DollarSign className="w-24 h-24 text-green-400" />
  },
  {
    id: "roadmap",
    title: "FUTURE",
    subtitle: "THE ROADMAP",
    roadmap: [
      { date: "Q3 2026", goal: "Mobile Sovereignty." },
      { date: "Q4 2026", goal: "P2P Neural Network." },
      { date: "Q1 2027", goal: "Shadow OS Launch." }
    ],
    bgText: "HORIZON",
    gradient: "from-yellow-500/20 to-transparent",
    icon: <Globe2 className="w-24 h-24 text-yellow-400" />
  },
  {
    id: "team",
    title: "FOUNDERS",
    subtitle: "THE SOVEREIGNS",
    team: [
      { name: "S. Vinay", role: "CEO / Architect" },
      { name: "Shadow One", role: "CTO / Rust Dev" },
      { name: "V. Design", role: "Product Expert" }
    ],
    bgText: "THE TEAM",
    gradient: "from-cyan-500/20 to-transparent",
    icon: <User className="w-24 h-24 text-cyan-400" />
  },
  {
    id: "the-ask",
    title: "THE ASK",
    subtitle: "JOIN THE SHADOW",
    askDetails: {
      amount: "$500,000",
      round: "Seed Round",
      usage: ["Product Polish", "Marketing", "Research"]
    },
    bgText: "INVESTMENT",
    gradient: "from-purple-500/20 to-transparent",
    icon: <Target className="w-24 h-24 text-purple-400" />
  },
  {
    id: "closing",
    title: "FINALIZE",
    subtitle: "RECLAIM YOURSELF.",
    tagline: "The Future is Local.",
    bgText: "SHADOWAGENT",
    gradient: "from-cyan-500/30 to-transparent",
    icon: <LogoMark size={120} />
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection < 0 || currentSlide + newDirection >= slides.length) return;
    setDirection(newDirection);
    setCurrentSlide(prev => prev + newDirection);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "n") setShowNotes(prev => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-[#020204] text-white overflow-hidden flex flex-col font-space selection:bg-cyan-500/30 uppercase">
      
      {/* Background HUD Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic Gradient */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-20 blur-[150px]`}
          />
        </AnimatePresence>
        
        {/* Grid and Noise */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 noise-fallback opacity-[0.05]" />
        <div className="scanline-overlay" />

        {/* Huge Background Parallax Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.bgText}
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{ opacity: 0.03, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.2, x: 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          >
            <h1 className="text-[25vw] font-orbitron font-black text-white/10 tracking-tighter whitespace-nowrap">
              {slide.bgText}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Navigation */}
      <div className="p-10 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <LogoMark size={40} className="text-cyan-400" />
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-2xl tracking-tighter text-white/90">SHADOW_AGENT</span>
            <span className="text-[8px] font-mono tracking-[0.4em] text-cyan-400/50">LOCAL_NEURAL_ENGINE_v.2.0</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => setShowNotes(!showNotes)} className="text-[9px] font-bold tracking-widest text-white/30 hover:text-cyan-400 transition-colors uppercase border-b border-white/10 pb-1">
             Speaker_Notes [N]
           </button>
           <div className="font-orbitron font-bold text-xs bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-white/40">
             {currentSlide + 1} // {slides.length}
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center px-10 md:px-24">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, filter: 'blur(20px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center"
          >
            {/* Left side: Content (7 cols) */}
            <div className="lg:col-span-7 space-y-12 relative">
               {/* HUD Brackets */}
               <div className="hud-bracket hud-bracket-tl -translate-x-4 -translate-y-4" />
               <div className="hud-bracket hud-bracket-tr translate-x-4 -translate-y-4" />
               
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="font-syncopate font-bold text-[10px] tracking-[0.8em] text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    {slide.title}
                  </p>
                  <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter text-white/95 mb-10 text-glow-cyan">
                    {slide.subtitle}
                  </h1>
                  
                  {slide.description && (
                    <p className="text-xl md:text-2xl text-white/40 font-light max-w-2xl lowercase tracking-tight border-l-2 border-white/10 pl-8">
                      {slide.description}
                    </p>
                  )}

                  {slide.tagline && (
                    <p className="font-syncopate font-bold text-lg md:text-2xl text-cyan-400 mt-12 tracking-widest">
                      {slide.tagline}
                    </p>
                  )}

                  {/* Bullet Grid */}
                  {slide.bullets && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                      {slide.bullets.map((b, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className={`h-8 w-1 ${slide.id === 'problem' ? 'bg-red-500' : 'bg-cyan-500'} group-hover:scale-y-150 transition-transform`} />
                          <p className="text-sm font-bold text-white/30 lowercase group-hover:text-white/60 transition-colors leading-relaxed">{b}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparison Table */}
                  {slide.comparison && (
                    <div className="mt-12 glass-premium rounded-3xl overflow-hidden border-white/20">
                       <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-cyan-500/5">
                          <div className="text-[10px] font-bold text-white/20 tracking-widest">LOGIC</div>
                          <div className="text-center text-[10px] font-black text-cyan-400 tracking-widest underline decoration-cyan-500/40 underline-offset-8">SHADOWAGENT</div>
                          <div className="text-center text-[10px] font-bold text-white/20 tracking-widest">CLOUD_AI</div>
                       </div>
                       {slide.comparison.map((row, i) => (
                         <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                           <div className="text-xs font-bold text-white/40">{row.feature}</div>
                           <div className="text-center text-xs font-black text-cyan-400">{row.shadow}</div>
                           <div className="text-center text-xs text-white/10 font-light">{row.cloud}</div>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Feature Grid */}
                  {slide.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                       {slide.features.map((f, i) => (
                         <div key={i} className="glass-premium p-6 rounded-2xl hover:bg-cyan-500/5 transition-all group">
                            <h4 className="font-orbitron font-bold text-xs text-cyan-400 mb-2">{f.title}</h4>
                            <p className="text-[10px] text-white/30 lowercase group-hover:text-white/60 transition-colors">{f.desc}</p>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Stats Grid */}
                  {slide.stats && (
                    <div className="grid grid-cols-2 gap-4 mt-12">
                       {slide.stats.map((s, i) => (
                         <div key={i} className="glass-premium p-10 rounded-3xl text-center border-white/5">
                            <h2 className="font-orbitron font-black text-5xl text-white mb-2">{s.val}</h2>
                            <p className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">{s.label}</p>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* The Ask details */}
                  {slide.askDetails && (
                    <div className="mt-12 glass-premium p-12 rounded-[3rem] border-cyan-500/20 flex flex-col md:flex-row gap-12 items-center">
                       <div className="text-center md:text-left">
                          <p className="text-[10px] font-bold text-cyan-400 tracking-widest mb-4">CAPITAL_REQUIREMENT</p>
                          <h2 className="font-orbitron font-black text-7xl text-white">{slide.askDetails.amount}</h2>
                          <p className="text-sm font-bold text-white/20 mt-2 tracking-widest">{slide.askDetails.round}</p>
                       </div>
                       <div className="space-y-4">
                          {slide.askDetails.usage.map((u, i) => (
                            <div key={i} className="flex items-center gap-4 text-xs font-bold text-white/40">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                              {u}
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
               </motion.div>
            </div>

            {/* Right side: Visual (5 cols) */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative aspect-square w-full glass-premium rounded-[5rem] flex items-center justify-center group overflow-hidden border-white/10"
              >
                <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:30px_30px] opacity-20" />
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                   transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                   className="relative z-10 filter drop-shadow-[0_0_50px_rgba(0,240,255,0.3)]"
                >
                  {slide.icon}
                </motion.div>
                
                {/* HUD Overlay */}
                <div className="absolute top-10 left-10 text-[7px] font-mono text-cyan-400/40 tracking-[0.5em]">SYSTEM_READY // 0xAF23</div>
                <div className="absolute bottom-10 right-10 text-[7px] font-mono text-cyan-400/40 tracking-[0.5em]">LOCAL_NEURAL_ENGINE</div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker Notes Overlay */}
      <AnimatePresence>
        {showNotes && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 z-50 h-[40%] glass-premium border-t border-cyan-500/40 p-12 overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto">
              <h3 className="font-orbitron font-bold text-xs text-cyan-400 mb-6 tracking-widest underline decoration-cyan-500/40 underline-offset-8">SPEAKER_NOTES // {slide.id}</h3>
              <p className="text-2xl text-white/80 font-light leading-relaxed lowercase">
                {slide.notes || "The future is local. Reclaim your digital sovereignty today. Your machine, your mind, your rules."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation */}
      <div className="p-12 flex justify-between items-center relative z-20">
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={`h-1.5 transition-all duration-700 rounded-full ${i === currentSlide ? "w-20 bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)]" : "w-6 bg-white/10 hover:bg-white/30"}`} 
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all font-orbitron font-bold text-[10px] tracking-widest disabled:opacity-20"
          >
            PREV_SEGMENT
          </button>
          <button 
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="px-10 py-4 rounded-xl bg-white text-black hover:bg-cyan-400 transition-all font-orbitron font-black text-[10px] tracking-widest disabled:opacity-20 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            NEXT_COMMAND
          </button>
        </div>
      </div>
    </div>
  );
}
