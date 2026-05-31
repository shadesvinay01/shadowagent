"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { 
  ChevronRight, ChevronLeft, Shield, Cpu, Lock, 
  Terminal, BarChart3, Rocket, AlertCircle, CheckCircle2, 
  MessageSquare, Mail, Calendar, FileText, Download, QrCode, Key, MessageCircle, TrendingUp, DollarSign, Target, Megaphone,
  User, CpuIcon, Network, Globe2, ArrowRight
} from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";
import GlassPrism from "@/components/canvas/GlassPrism";

const slides = [
  {
    id: "cover",
    title: "ShadowAgent",
    subtitle: "ShadowAgent",
    tagline: "COMPLETE PRIVACY • UNLIMITED POWER",
    description: "The Only AI Agent That Runs 100% on Your Machine.",
    icon: <LogoMark size={140} />,
    notes: "Welcome to ShadowAgent. The only 100% local AI agent."
  },
  {
    id: "problem",
    title: "The Crisis",
    subtitle: "Your Private Data is No Longer Private",
    bullets: [
      "Cloud AI tools store your WhatsApp chats, emails & files",
      "Major privacy risks and data leaks are common",
      "Companies can read, use, or sell your information",
      "Current automation tools are expensive and limited"
    ],
    icon: <AlertCircle className="w-24 h-24 text-red-500" />,
    notes: "The problem: Your data is being harvested by cloud AI."
  },
  {
    id: "solution",
    title: "The Shift",
    subtitle: "Meet ShadowAgent",
    description: "A powerful personal AI agent that lives entirely on your computer — never sends your data anywhere.",
    bullets: [
      "100% Local Execution",
      "Works offline after setup",
      "Controls WhatsApp, Email, Calendar & Files",
      "Full privacy guaranteed"
    ],
    icon: <Shield className="w-24 h-24 text-emerald-400" />,
    notes: "ShadowAgent is the local solution."
  },
  {
    id: "demo",
    title: "In Action",
    subtitle: "See ShadowAgent in Action",
    examples: [
      "“Summarize my last 50 WhatsApp messages”",
      "“Send birthday wishes to Mom”",
      "“Schedule team meeting for next Tuesday 4 PM”",
      "“Analyze all my Q1 expense reports”"
    ],
    icon: <Terminal className="w-24 h-24 text-cyan-400" />,
    notes: "Real-world automation examples."
  },
  {
    id: "how-it-works",
    title: "Setup",
    subtitle: "Simple 4-Step Setup",
    steps: [
      "1. Download & Install (One time)",
      "2. Connect your accounts (WhatsApp QR, Email)",
      "3. Activate License",
      "4. Start talking to your AI Agent"
    ],
    icon: <Download className="w-24 h-24 text-purple-400" />,
    notes: "Easy installation process."
  },
  {
    id: "features",
    title: "Capabilities",
    subtitle: "One Agent. Everything You Need.",
    features: [
      "WhatsApp Reading & Sending",
      "Email Management & Summarization",
      "Calendar Automation",
      "Local Files Analysis (PDFs)",
      "Social Media Posting",
      "Smart Scheduling",
      "Natural Language Automation"
    ],
    icon: <CpuIcon className="w-24 h-24 text-blue-400" />,
    notes: "A comprehensive local toolkit."
  },
  {
    id: "privacy",
    title: "Fortress",
    subtitle: "We Never See Your Data",
    boldStatement: "“Your chats, emails, and files never leave your device.”",
    comparison: [
      { label: "Data Location", shadow: "Your Computer", cloud: "Their Servers" },
      { label: "Privacy", shadow: "100% Private", cloud: "Compromised" },
      { label: "Offline Access", shadow: "Yes", cloud: "No" },
      { label: "Monthly Fee", shadow: "No", cloud: "Yes" }
    ],
    icon: <Lock className="w-24 h-24 text-cyan-400" />,
    notes: "Comparison with Cloud AI."
  },
  {
    id: "tech",
    title: "Technology",
    subtitle: "Built for Privacy & Performance",
    bullets: [
      "Powered by Local AI (Ollama)",
      "Advanced Tool-Calling Agent",
      "Built with Tauri 2 (Light & Secure)",
      "End-to-End Local Encryption"
    ],
    icon: <Cpu className="w-24 h-24 text-blue-400" />,
    notes: "Built with Tauri and Ollama."
  },
  {
    id: "market",
    title: "Dynamics",
    subtitle: "Huge & Growing Market",
    bullets: [
      "Personal AI Market: $50+ Billion by 2028",
      "Rising demand for privacy-focused AI",
      "Target: Professionals, Executives, Doctors"
    ],
    icon: <TrendingUp className="w-24 h-24 text-orange-400" />,
    notes: "The market is ready."
  },
  {
    id: "business",
    title: "Model",
    subtitle: "Simple & Profitable",
    bullets: [
      "Free Download + 1 Year Full Access",
      "Annual Renewal: $99 per year",
      "Low Server Cost (Only licensing)",
      "High Lifetime Value"
    ],
    icon: <DollarSign className="w-24 h-24 text-emerald-400" />,
    notes: "$99/yr license model."
  },
  {
    id: "team",
    title: "The Sovereigns",
    subtitle: "The Team",
    team: [
      { name: "Sarveshwar Mandal", role: "CEO" },
      { name: "Rohitash Goyal", role: "CTO" },
      { name: "Mohd. Hidyat", role: "CMO" }
    ],
    icon: <User className="w-24 h-24 text-cyan-400" />,
    notes: "Meet the founders."
  },
  {
    id: "ask",
    title: "The Ask",
    subtitle: "Join the Future.",
    description: "We are raising capital to build the world's most private AI agent.",
    bullets: [
      "Product Development & Polish",
      "Marketing & User Acquisition",
      "Team Expansion"
    ],
    finalLine: "Let’s build the world’s most private AI agent.",
    icon: <Rocket className="w-24 h-24 text-orange-400" />,
    notes: "Investing in privacy."
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth > 1024 && !window.matchMedia("(pointer: coarse)").matches);
    checkIsDesktop();
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection < 0 || currentSlide + newDirection >= slides.length) return;
    setDirection(newDirection);
    setCurrentSlide(prev => prev + newDirection);
  };

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-[#020204] text-white overflow-hidden flex flex-col font-manrope cursor-default selection:bg-cyan-500/30">
      
      {/* 3D Neural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {isDesktop && (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <GlassPrism />
          </Canvas>
        )}
      </div>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Top Header - Minimal */}
      <div className="p-10 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-4">
          <LogoMark size={32} />
          <span className="font-orbitron font-black text-xl tracking-tighter text-white/80">SHADOW_AGENT</span>
        </div>
        <div className="text-[10px] font-orbitron text-white/20 tracking-[0.4em]">
          {currentSlide + 1} // {slides.length}
        </div>
      </div>

      {/* Main Slide Area - No Boxes */}
      <div className="flex-1 relative flex items-center justify-center perspective-2000 px-10 md:px-24 z-30">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-7xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              
              {/* Left Column: Content (7 cols) */}
              <div className="lg:col-span-7 space-y-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="text-[10px] font-bold tracking-[0.5em] text-cyan-500 mb-6 uppercase border-l-2 border-cyan-500 pl-4">{slide.title}</p>
                  <h1 className="text-4xl md:text-6xl font-orbitron font-black leading-[1.1] tracking-tighter text-white/95 mb-10 uppercase">
                    {slide.subtitle}
                  </h1>
                  
                  {slide.description && (
                    <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-xl">
                      {slide.description}
                    </p>
                  )}

                  {slide.tagline && (
                    <p className="text-xs font-bold text-cyan-400 mt-10 tracking-[0.3em] uppercase opacity-60">
                      {slide.tagline}
                    </p>
                  )}

                  {slide.boldStatement && (
                    <p className="text-2xl font-orbitron font-bold text-white border-l-4 border-cyan-500 pl-8 my-10 leading-tight">
                      {slide.boldStatement}
                    </p>
                  )}

                  {/* Bullet List - Clean, no box */}
                  {(slide.bullets || slide.steps) && (
                    <div className="grid grid-cols-1 gap-4 mt-12">
                      {(slide.bullets || slide.steps).map((b: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-500 transition-colors" />
                          <span className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparison Grid - Minimal lines */}
                  {slide.comparison && (
                    <div className="mt-12 space-y-4">
                       <div className="grid grid-cols-3 pb-4 border-b border-white/10">
                          <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Logic</div>
                          <div className="text-center text-[9px] font-bold text-cyan-400 uppercase tracking-widest">ShadowAgent</div>
                          <div className="text-center text-[9px] font-bold text-white/20 uppercase tracking-widest">Cloud AI</div>
                       </div>
                       {slide.comparison.map((row, i) => (
                         <div key={i} className="grid grid-cols-3 py-2 border-b border-white/5 last:border-0">
                           <div className="text-xs font-medium text-white/40">{row.label}</div>
                           <div className="text-center text-xs font-bold text-white">{row.shadow}</div>
                           <div className="text-center text-xs text-white/20 font-light">{row.cloud}</div>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Feature Grid - Small items */}
                  {slide.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-12">
                       {slide.features.map((f, i) => (
                         <div key={i} className="flex items-center gap-4">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500/40" />
                            <span className="text-sm font-bold text-white/40">{f}</span>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Examples - Code style */}
                  {slide.examples && (
                    <div className="grid grid-cols-1 gap-3 mt-10">
                       {slide.examples.map((ex, i) => (
                         <div key={i} className="text-xs font-mono text-cyan-500/60 flex items-center gap-4">
                            <span className="text-white/20">{'>'}</span> {ex}
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Team Grid */}
                  {slide.team && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                       {slide.team.map((m, i) => (
                         <div key={i} className="space-y-2">
                            <div className="w-12 h-px bg-cyan-500/40" />
                            <h4 className="font-orbitron font-bold text-sm text-white">{m.name}</h4>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">{m.role}</p>
                         </div>
                       ))}
                    </div>
                  )}

                  {slide.finalLine && (
                    <p className="text-xl font-orbitron font-bold text-cyan-400 mt-16">{slide.finalLine}</p>
                  )}
                </motion.div>
              </div>

              {/* Right Column: Visual (5 cols) */}
              <div className="lg:col-span-5 hidden lg:block">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.4 }}
                   className="relative flex justify-center items-center"
                 >
                   {/* HUD Decorative Elements */}
                   <div className="absolute -inset-10 border border-white/5 rounded-full animate-pulse-slow" />
                   <div className="absolute -inset-20 border border-white/5 rounded-full opacity-50" />
                   
                   {/* Centered Visual Icon */}
                   <div className="relative z-10 p-12 text-white filter drop-shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                      {slide.id === 'cover' ? <LogoMark size={200} /> : slide.icon}
                   </div>
                 </motion.div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer - Minimal */}
      <div className="p-12 flex justify-between items-center relative z-[100]">
        <div className="flex gap-4">
          <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="text-xs font-bold text-white/20 hover:text-white transition-all uppercase tracking-[0.2em] disabled:opacity-5">{'<'} Previous</button>
          <button onClick={() => paginate(1)} disabled={currentSlide === slides.length - 1} className="text-xs font-bold text-white/20 hover:text-white transition-all uppercase tracking-[0.2em] disabled:opacity-5">Next {'>'}</button>
        </div>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div key={i} className={`h-0.5 rounded-full transition-all duration-700 ${i === currentSlide ? "w-8 bg-cyan-500" : "w-2 bg-white/10"}`} />
          ))}
        </div>

        {currentSlide === slides.length - 1 ? (
          <a 
            href="/pricing.html" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3 rounded-full border border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-[10px] font-bold text-cyan-400 uppercase tracking-widest"
          >
            GTM Slides
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        ) : (
          <button 
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="group flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:border-white/40 transition-all text-[10px] font-bold uppercase tracking-widest"
          >
            Next Segment
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
