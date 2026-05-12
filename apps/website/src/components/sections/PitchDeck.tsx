"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Shield, Zap, Globe, Cpu, Lock, 
  Terminal, BarChart3, Rocket, AlertCircle, CheckCircle2, 
  MessageSquare, Mail, Calendar, FileText, Share2, MousePointer2,
  Download, QrCode, Key, MessageCircle, TrendingUp, DollarSign, Target, Megaphone
} from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";

const slides = [
  {
    id: "cover",
    title: "ShadowAgent",
    subtitle: "ShadowAgent – Your Fully Local AI Agent",
    tagline: "Complete Privacy • Unlimited Power",
    content: "The Only AI Agent That Runs 100% on Your Machine",
    icon: <Shield className="w-24 h-24 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    id: "problem",
    title: "The Problem",
    subtitle: "Your Private Data is No Longer Private",
    bullets: [
      "Cloud AI tools store your WhatsApp chats, emails & files",
      "Major privacy risks and data leaks are common",
      "Companies can read, use, or sell your personal information",
      "Current automation tools are expensive and limited"
    ],
    icon: <AlertCircle className="w-20 h-20 text-red-500" />,
    gradient: "from-red-500/10 to-transparent",
  },
  {
    id: "solution",
    title: "The Solution",
    subtitle: "Meet ShadowAgent",
    content: "A powerful personal AI agent that lives entirely on your computer — never sends your data anywhere.",
    bullets: [
      "100% Local Execution",
      "Works offline after setup",
      "Controls WhatsApp, Email, Calendar & Files",
      "Full privacy guaranteed"
    ],
    icon: <CheckCircle2 className="w-20 h-20 text-green-500" />,
    gradient: "from-green-500/10 to-transparent",
  },
  {
    id: "demo",
    title: "Product Demo",
    subtitle: "See ShadowAgent in Action",
    examples: [
      "“Summarize my last 50 WhatsApp messages”",
      "“Send birthday wishes to Mom”",
      "“Schedule team meeting for next Tuesday 4 PM”",
      "“Analyze all my Q1 expense reports”"
    ],
    icon: <Terminal className="w-20 h-20 text-cyan-400" />,
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    id: "how-it-works",
    title: "How It Works",
    subtitle: "Simple 4-Step Setup",
    steps: [
      { label: "Install", icon: <Download /> },
      { label: "Connect", icon: <QrCode /> },
      { label: "License", icon: <Key /> },
      { label: "Automate", icon: <MessageCircle /> }
    ],
    icon: <Zap className="w-20 h-20 text-yellow-400" />,
    gradient: "from-yellow-500/10 to-transparent",
  },
  {
    id: "features",
    title: "Powerful Features",
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
    icon: <Cpu className="w-20 h-20 text-purple-400" />,
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    id: "privacy",
    title: "Privacy First",
    subtitle: "We Never See Your Data",
    boldStatement: "“Your chats, emails, and files never leave your device.”",
    comparison: [
      { feature: "Data Location", shadow: "Your Computer", cloud: "Their Servers" },
      { feature: "Privacy", shadow: "100% Private", cloud: "Compromised" },
      { feature: "Offline Access", shadow: "Yes", cloud: "No" },
      { feature: "Monthly Fee", shadow: "No", cloud: "Yes" }
    ],
    icon: <Lock className="w-20 h-20 text-green-400" />,
    gradient: "from-green-500/10 to-transparent",
  },
  {
    id: "technology",
    title: "Technology",
    subtitle: "Built for Privacy & Performance",
    techBullets: [
      "Powered by Local AI (Ollama)",
      "Advanced Tool-Calling Agent",
      "Built with Tauri 2 (Light & Secure)",
      "End-to-End Local Encryption",
      "Annual lightweight license only"
    ],
    icon: <Cpu className="w-20 h-20 text-cyan-400" />,
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    id: "market",
    title: "Market Opportunity",
    subtitle: "Huge & Growing Market",
    bullets: [
      "Personal AI Market: $50+ Billion by 2028",
      "Rising demand for privacy-focused AI",
      "Professionals, Executives, Lawyers, Doctors"
    ],
    icon: <TrendingUp className="w-20 h-20 text-orange-400" />,
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    id: "business-model",
    title: "Business Model",
    subtitle: "Simple & Profitable",
    bullets: [
      "Free Download + 1 Year Full Access",
      "Annual Renewal: $99 per year",
      "Extremely Low Server Cost",
      "High Lifetime Value"
    ],
    icon: <DollarSign className="w-20 h-20 text-green-500" />,
    gradient: "from-green-500/10 to-transparent",
  },
  {
    id: "go-to-market",
    title: "Go-to-Market",
    subtitle: "Launch Strategy",
    bullets: [
      "Product Hunt & Indie Hacker launch",
      "Privacy & Tech communities",
      "YouTube demos & tutorials",
      "Creator & Affiliate program"
    ],
    icon: <Megaphone className="w-20 h-20 text-purple-400" />,
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    id: "the-ask",
    title: "The Ask",
    subtitle: "Join Us in Building the Future of Private AI",
    ask: "We are raising $XXX,000 (Pre-Seed / Seed Round)",
    useOfFunds: [
      "Product Development & Polish",
      "Marketing & User Acquisition",
      "Team Expansion"
    ],
    finalLine: "Let’s build the world’s most private AI agent.",
    icon: <Rocket className="w-20 h-20 text-yellow-400" />,
    gradient: "from-yellow-500/10 to-transparent",
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection < 0 || currentSlide + newDirection >= slides.length) return;
    setDirection(newDirection);
    setCurrentSlide(prev => prev + newDirection);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-[#050508] text-white overflow-hidden flex flex-col font-manrope selection:bg-cyan-500/30">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br ${slide.gradient} blur-[160px] opacity-20 rounded-full`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Top Bar */}
      <div className="p-8 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          <LogoMark size={32} />
          <span className="font-syne font-bold tracking-tight text-xl">SHADOWAGENT</span>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">
          SLIDE {currentSlide + 1} / {slides.length} — CONFIDENTIAL
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center px-10 md:px-20">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, scale: 0.98, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: direction > 0 ? -50 : 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="max-w-7xl w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              
              {/* Left Column: Content (8 cols) */}
              <div className="lg:col-span-7 space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xs font-bold tracking-[0.5em] uppercase text-cyan-400 mb-6">{slide.title}</p>
                  <h1 className={`font-syne font-bold leading-[0.9] tracking-tighter mb-8 ${currentSlide === 0 ? 'text-7xl md:text-9xl' : 'text-5xl md:text-7xl'}`}>
                    {slide.subtitle}
                  </h1>
                  
                  {slide.content && (
                    <p className="text-2xl text-white/60 leading-relaxed max-w-2xl font-light">
                      {slide.content}
                    </p>
                  )}

                  {slide.boldStatement && (
                    <p className="text-3xl font-syne font-bold text-white leading-tight italic border-l-4 border-cyan-400 pl-8 my-10">
                      {slide.boldStatement}
                    </p>
                  )}

                  {/* Bullet Points */}
                  {slide.bullets && (
                    <ul className="space-y-4 mt-10">
                      {slide.bullets.map((b, i) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          key={i} 
                          className="flex items-start gap-4 text-xl text-white/50"
                        >
                          <div className={`mt-2 w-1.5 h-1.5 rounded-full ${slide.id === 'problem' ? 'bg-red-500' : 'bg-cyan-500'}`} />
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Bullets */}
                  {slide.techBullets && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                      {slide.techBullets.map((b, i) => (
                        <div key={i} className="px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-sm text-white/60">
                          {b}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Demo Examples */}
                  {slide.examples && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {slide.examples.map((ex, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl font-mono text-xs text-cyan-400/80 leading-relaxed italic">
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ask Details */}
                  {slide.ask && (
                    <div className="mt-10 p-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5">
                      <p className="text-3xl font-syne font-bold text-white mb-6">{slide.ask}</p>
                      <div className="flex flex-wrap gap-4">
                        {slide.useOfFunds?.map((f, i) => (
                          <span key={i} className="px-4 py-2 rounded-full border border-white/10 text-xs text-white/40 uppercase tracking-widest">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {slide.finalLine && (
                    <p className="text-2xl font-syne font-bold text-cyan-400 mt-12">{slide.finalLine}</p>
                  )}
                </motion.div>
              </div>

              {/* Right Column: Visual (5 cols) */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="relative">
                  {/* Step Flow for 'How it Works' */}
                  {slide.steps ? (
                    <div className="space-y-6">
                      {slide.steps.map((step, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          key={i} 
                          className="flex items-center gap-6 p-6 rounded-3xl border border-white/10 bg-white/5"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                            {step.icon}
                          </div>
                          <div>
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Step 0{i+1}</p>
                            <p className="text-xl font-syne font-bold">{step.label}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : slide.comparison ? (
                    /* Comparison Table for 'Privacy First' */
                    <div className="rounded-3xl border border-white/10 bg-black/60 overflow-hidden">
                      <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5">
                        <div className="text-[10px] text-white/30 uppercase tracking-widest">Feature</div>
                        <div className="text-center text-[10px] text-cyan-400 uppercase tracking-widest">ShadowAgent</div>
                        <div className="text-center text-[10px] text-white/30 uppercase tracking-widest">Cloud AI</div>
                      </div>
                      {slide.comparison.map((row, i) => (
                        <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 items-center">
                          <div className="text-sm font-bold">{row.feature}</div>
                          <div className="text-center text-sm text-cyan-400 font-bold">{row.shadow}</div>
                          <div className="text-center text-sm text-white/30">{row.cloud}</div>
                        </div>
                      ))}
                    </div>
                  ) : slide.features ? (
                     /* Feature List */
                     <div className="grid grid-cols-1 gap-4">
                        {slide.features.map((f, i) => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={i} 
                            className="p-5 rounded-2xl border border-white/5 bg-white/[0.03] flex items-center gap-4 group hover:bg-white/[0.06] transition-all"
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-white/70">{f}</span>
                          </motion.div>
                        ))}
                     </div>
                  ) : (
                    /* General Icon/Visual */
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative aspect-square w-full rounded-[4rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                      <div className="relative z-10 p-20 bg-white/5 rounded-full border border-white/10 shadow-[0_0_100px_rgba(0,240,255,0.1)]">
                        {slide.icon}
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-500/20 blur-3xl rounded-full" />
                      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tagline for cover slide */}
            {slide.tagline && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-0 right-0 text-center text-xs font-bold tracking-[1em] uppercase text-white/20"
              >
                {slide.tagline}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar Controls */}
      <div className="p-10 flex justify-between items-center relative z-20">
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full hover:bg-white/40 ${i === currentSlide ? "w-16 bg-white" : "w-6 bg-white/10"}`} 
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-20 transition-all text-sm font-bold"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous
          </button>
          <button 
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="group flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-20 transition-all text-sm font-black"
          >
            {currentSlide === slides.length - 1 ? "Finish" : "Next Segment"}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
