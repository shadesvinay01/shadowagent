"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Shield, Zap, Globe, Cpu, Lock, 
  Terminal, BarChart3, Rocket, AlertCircle, CheckCircle2, 
  MessageSquare, Mail, Calendar, FileText, Share2, MousePointer2,
  Download, QrCode, Key, MessageCircle, TrendingUp, DollarSign, Target, Megaphone,
  User, Layers, Eye, ShieldAlert, CpuIcon, Command, Network, Globe2, Briefcase, Info
} from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";

const slides = [
  {
    id: "cover",
    title: "ShadowAgent",
    subtitle: "ShadowAgent",
    tagline: "The Ghost in the Machine.",
    description: "Your Digital Sovereignty, Reclaimed.",
    cta: "Initialize Command",
    icon: <Shield className="w-32 h-32 text-cyan-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]" />,
    gradient: "from-cyan-500/20 via-purple-500/10 to-transparent",
    notes: "Welcome everyone. Today we aren't just talking about another AI tool. We're talking about a paradigm shift in how we interact with technology. This is ShadowAgent: the first fully local AI Operating System built for the age of privacy.",
    bgType: "hologram"
  },
  {
    id: "problem",
    title: "The Crisis",
    subtitle: "The Panopticon",
    description: "Every prompt you type, every email you draft, every file you analyze is being fed into a central cloud surveillance machine.",
    bullets: [
      "Privacy is no longer the default—it's a luxury.",
      "Cloud AI tools are the ultimate data extraction engines.",
      "Data breaches are inevitable; the cloud is the single point of failure.",
      "Regulatory risks (GDPR/HIPAA) are paralyzing professional AI adoption."
    ],
    icon: <ShieldAlert className="w-24 h-24 text-red-500" />,
    gradient: "from-red-500/20 to-transparent",
    notes: "The problem is simple but terrifying. We've been told that AI requires the cloud. But the cloud is a surveillance machine. Every interaction you have with current AI tools is stored, analyzed, and potentially leaked. Professionals—lawyers, doctors, executives—cannot use these tools without violating their core duty of confidentiality.",
    bgType: "glitch"
  },
  {
    id: "solution",
    title: "The Reveal",
    subtitle: "ShadowAgent",
    description: "A 100% local neural orchestrator. Unlimited intelligence. Zero data leakage.",
    bullets: [
      "Sovereign Intelligence: Runs entirely on your hardware.",
      "Air-Gapped Privacy: No internet required for core operations.",
      "Native Orchestration: Not just a chatbot, but a system-level agent.",
      "Zero Latency: Local execution eliminates cloud wait times."
    ],
    icon: <CheckCircle2 className="w-24 h-24 text-mint-400" />,
    gradient: "from-mint-500/20 to-transparent",
    notes: "Enter ShadowAgent. We've built an AI that lives on YOUR machine. It doesn't send data to us, to OpenAI, or to anyone else. It's a powerful agent that works with your local files, your local apps, and your local life. It's intelligence without the surveillance.",
    bgType: "glow"
  },
  {
    id: "demo",
    title: "In Action",
    subtitle: "Real-Time Orchestration",
    description: "Interacting with ShadowAgent feels like talking to your computer's soul.",
    examples: [
      { cmd: "Summarize WhatsApp", result: "Found 12 unread messages from 'Product Team'. Priority: Critical." },
      { cmd: "Draft Local Reply", result: "Drafting encrypted response to 'John Doe' regarding Project Alpha." },
      { cmd: "Schedule Conflict", result: "Found 2 calendar conflicts. Rescheduling 'Sync' to 4 PM." },
      { cmd: "Analyze Q1 PDF", result: "Analysis complete. Detected 12% revenue growth in local ledger." }
    ],
    icon: <Terminal className="w-24 h-24 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-transparent",
    notes: "Look at the speed. Because it's local, there's no network lag. It can read your WhatsApp messages, check your calendar, and analyze your PDFs simultaneously. It's not a toy; it's a productivity multiplier that respects your boundaries.",
    bgType: "grid"
  },
  {
    id: "how-it-works",
    title: "The Engine",
    subtitle: "4-Step Neural Setup",
    steps: [
      { title: "Sovereign Install", desc: "Native Tauri 2 package for Windows/Mac/Linux.", icon: <Download /> },
      { title: "Account Link", desc: "Local session bridging for WhatsApp & Email.", icon: <QrCode /> },
      { title: "Neural Activation", desc: "Unlock your unique local identity key.", icon: <Key /> },
      { title: "Full Autonomy", desc: "Start orchestrating your digital world.", icon: <Rocket /> }
    ],
    icon: <Layers className="w-24 h-24 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent",
    notes: "We've made high-end local AI accessible. Install the lightweight Tauri app, link your accounts locally via QR code, activate your license, and you're off. No complex cloud configurations or API keys needed.",
    bgType: "hologram"
  },
  {
    id: "features",
    title: "Capabilities",
    subtitle: "The Grid of Power",
    features: [
      { title: "Neural WhatsApp", desc: "Automate outreach and summarization." },
      { title: "Zero-Cloud Email", desc: "Private drafting and inbox management." },
      { title: "System RAG", desc: "Instant vector search of your local docs." },
      { title: "Autonomous Calendar", desc: "The smartest scheduler on the edge." },
      { title: "Hardware Accel", desc: "Optimized for M3, CUDA, and NPU." },
      { title: "Extensible Plugins", desc: "Build custom tools for your workflow." }
    ],
    icon: <CpuIcon className="w-24 h-24 text-mint-400" />,
    gradient: "from-mint-500/20 to-transparent",
    notes: "ShadowAgent is a platform. We handle everything from messaging to local file RAG (Retrieval Augmented Generation). And because we're built with Rust and Tauri, we leverage your hardware's NPUs and GPUs for maximum performance.",
    bgType: "grid"
  },
  {
    id: "privacy-fortress",
    title: "The Wall",
    subtitle: "Shadow vs. The Cloud",
    comparison: [
      { feature: "Data Sovereignty", shadow: "100% User-Owned", cloud: "Company-Owned" },
      { feature: "Intelligence Core", shadow: "Local Llama 3", cloud: "Centralized Blackbox" },
      { feature: "Encryption", shadow: "E2E Local AES-256", cloud: "Server-side" },
      { feature: "Connectivity", shadow: "Works Offline", cloud: "Always Online Required" }
    ],
    icon: <Lock className="w-24 h-24 text-red-400" />,
    gradient: "from-red-500/20 to-transparent",
    notes: "This isn't just a comparison; it's a choice between two futures. One where you own your mind, and one where you rent it from a corporation. ShadowAgent is the fortress for your digital life.",
    bgType: "glitch"
  },
  {
    id: "live-capabilities",
    title: "Shadow Link",
    subtitle: "Unified Local Control",
    description: "Seamlessly bridge the gap between your apps and your agent.",
    capabilities: [
      { icon: <MessageSquare />, label: "WhatsApp Automation" },
      { icon: <Mail />, label: "Sovereign Email" },
      { icon: <Calendar />, label: "Smart Scheduling" },
      { icon: <FileText />, label: "Local Doc Analysis" },
      { icon: <Share2 />, label: "Social Integration" },
      { icon: <Network />, label: "Plugin Ecosystem" }
    ],
    icon: <Network className="w-24 h-24 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-transparent",
    notes: "Our 'Shadow Link' technology allows the agent to interact with your local software environment natively. It reads the screen, interacts with APIs, and manages files exactly like a human would—but at machine speed.",
    bgType: "hologram"
  },
  {
    id: "technology",
    title: "The Stack",
    subtitle: "The Neural Core",
    techItems: [
      { name: "Tauri 2", desc: "Rust-based secure desktop framework." },
      { name: "Ollama", desc: "Local LLM orchestration engine." },
      { name: "LangChain", desc: "Advanced agentic tool-calling logic." },
      { name: "HNSWlib", desc: "Blazing fast local vector database." },
      { name: "React + Vite", desc: "Ultra-responsive cinematic UI." },
      { name: "Rust", desc: "Performance and memory safety." }
    ],
    icon: <Cpu className="w-24 h-24 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent",
    notes: "We're standing on the shoulders of giants. Tauri 2 gives us the safety of Rust, while Ollama and LangChain provide the intelligence. This isn't experimental; it's production-ready tech optimized for the edge.",
    bgType: "grid"
  },
  {
    id: "market",
    title: "The Market",
    subtitle: "The $200B Edge AI Shift",
    description: "Privacy is no longer a niche—it's the massive market requirement.",
    stats: [
      { val: "$50B+", label: "Personal AI Market 2028" },
      { val: "85%", label: "Pro Users Concerned with Privacy" },
      { val: "10x", label: "Projected Local AI Growth" },
      { val: "0", label: "Cloud Data Leaks on ShadowAgent" }
    ],
    icon: <BarChart3 className="w-24 h-24 text-orange-400" />,
    gradient: "from-orange-500/20 to-transparent",
    notes: "The market is shifting. Professionals are terrified of cloud AI. The first company to offer high-end intelligence with 100% privacy wins the $50 billion Personal AI market. We are that company.",
    bgType: "glow"
  },
  {
    id: "business-model",
    title: "The Model",
    subtitle: "Clean & Profitable",
    description: "High margins, zero cloud overhead, recurring revenue.",
    model: [
      { plan: "Standard", price: "Free", desc: "Basic local agent." },
      { plan: "Professional", price: "$99/yr", desc: "Full automation + Plugins." },
      { plan: "Enterprise", price: "$499/yr", desc: "Multi-node + Custom RAG." },
      { plan: "Margins", price: "95%", desc: "No GPU/Cloud costs." }
    ],
    icon: <DollarSign className="w-24 h-24 text-green-400" />,
    gradient: "from-green-500/20 to-transparent",
    notes: "Our business model is built for profit. Because the user's hardware does the work, our cloud costs are virtually zero. This allows for massive scaling with 95%+ margins.",
    bgType: "grid"
  },
  {
    id: "roadmap",
    title: "Future",
    subtitle: "The Roadmap",
    roadmap: [
      { date: "Q3 2026", goal: "Shadow Mobile: Local AI on iOS/Android." },
      { date: "Q4 2026", goal: "P2P Neural Network: Private collaborative AI." },
      { date: "Q1 2027", goal: "Shadow OS: A standalone privacy-first OS." }
    ],
    icon: <Globe2 className="w-24 h-24 text-yellow-400" />,
    gradient: "from-yellow-500/20 to-transparent",
    notes: "Desktop is just the beginning. We're moving to mobile, and eventually, we aim to build the first standalone AI Operating System that treats privacy as a human right, not a setting.",
    bgType: "hologram"
  },
  {
    id: "team",
    title: "The Minds",
    subtitle: "Founders of Sovereignty",
    team: [
      { name: "S. Vinay", role: "CEO / Neural Architect", desc: "Expert in local LLM orchestration." },
      { name: "Shadow One", role: "CTO / Rust Specialist", desc: "Core Tauri & Security engineer." },
      { name: "V. Design", role: "Product Design", desc: "Cinematic interface & UX expert." }
    ],
    icon: <User className="w-24 h-24 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-transparent",
    notes: "Our team combines expertise in Rust, Local LLMs, and high-end Product Design. We're not just building software; we're building a movement.",
    bgType: "grid"
  },
  {
    id: "ask",
    title: "The Ask",
    subtitle: "Building the Ghost",
    description: "Join us in scaling the most private AI agent in existence.",
    askDetails: {
      amount: "$500,000",
      round: "Pre-Seed / Seed",
      usage: ["Product Polish", "Market Expansion", "Plugin R&D"]
    },
    icon: <Target className="w-24 h-24 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent",
    notes: "We're raising $500k to take ShadowAgent from a successful prototype to a global standard. This capital will fuel our mobile development and our first major marketing push into professional communities.",
    bgType: "glow"
  },
  {
    id: "closing",
    title: "Initialize",
    subtitle: "Join the Shadow.",
    description: "Take back your digital sovereignty today.",
    tagline: "The Vision is Local. The Future is Private.",
    icon: <LogoMark size={120} />,
    gradient: "from-cyan-500/30 via-purple-500/20 to-transparent",
    notes: "Thank you for your time. The future of AI isn't in the cloud. It's on your machine. It's ShadowAgent. Let's reclaim our sovereignty together.",
    bgType: "hologram"
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection < 0 || currentSlide + newDirection >= slides.length) return;
    setDirection(newDirection);
    setCurrentSlide(prev => prev + newDirection);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        paginate(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      }
      if (e.key === "n") setShowNotes(prev => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-[#050508] text-white overflow-hidden flex flex-col font-manrope selection:bg-cyan-500/30">
      
      {/* Cinematic Scanlines & Grain */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br ${slide.gradient} blur-[200px] opacity-20 rounded-full`} />
            
            {/* Contextual Background Overlays */}
            {slide.bgType === 'grid' && (
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            )}
            {slide.bgType === 'glitch' && (
              <motion.div 
                animate={{ opacity: [0.02, 0.05, 0.02], x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute inset-0 bg-red-500/5 mix-blend-color-dodge" 
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      </div>

      {/* Top Bar Navigation */}
      <div className="p-8 flex justify-between items-center relative z-[110]">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentSlide(0)}>
          <LogoMark size={40} className="group-hover:rotate-12 transition-transform duration-500" />
          <div className="flex flex-col">
            <span className="font-syne font-bold tracking-tight text-xl">SHADOWAGENT</span>
            <span className="text-[8px] font-mono tracking-[0.4em] text-white/30 uppercase">Neural Intelligence Engine</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-mono tracking-widest uppercase transition-all ${showNotes ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'text-white/30 hover:bg-white/5'}`}
          >
            <Info className="w-3 h-3" /> {showNotes ? 'Hide Notes [N]' : 'Show Notes [N]'}
          </button>
          <div className="px-6 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center px-10 md:px-24">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-[1400px] w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
              
              {/* Left Column: Visual & Data (5 cols) */}
              {!isMobile && (
                <div className="lg:col-span-5 hidden lg:block order-2 lg:order-1">
                  <div className="relative group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide.id}
                        initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 1.1, opacity: 0, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="relative z-10 aspect-square w-full rounded-[4rem] border border-white/10 bg-white/[0.01] backdrop-blur-3xl flex items-center justify-center overflow-hidden"
                      >
                        {/* Interactive Background Elements */}
                        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px]" />
                        <motion.div 
                          animate={{ 
                            background: [
                              'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.1) 0%, transparent 70%)',
                              'radial-gradient(circle at 60% 40%, rgba(160,32,240,0.1) 0%, transparent 70%)',
                              'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.1) 0%, transparent 70%)'
                            ] 
                          }}
                          transition={{ repeat: Infinity, duration: 5 }}
                          className="absolute inset-0"
                        />

                        {/* Slide-Specific Visuals */}
                        <div className="relative z-10 p-16">
                          {slide.steps ? (
                             <div className="space-y-4 w-full">
                                {slide.steps.map((s, i) => (
                                  <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                      {s.icon}
                                    </div>
                                    <span className="text-xs font-bold tracking-widest uppercase">{s.title}</span>
                                  </motion.div>
                                ))}
                             </div>
                          ) : slide.stats ? (
                             <div className="grid grid-cols-2 gap-4">
                                {slide.stats.map((s, i) => (
                                  <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] text-center">
                                    <p className="text-3xl font-syne font-bold text-white mb-1">{s.val}</p>
                                    <p className="text-[8px] text-white/30 uppercase tracking-widest">{s.label}</p>
                                  </div>
                                ))}
                             </div>
                          ) : (
                            <div className="scale-125 group-hover:scale-150 transition-transform duration-1000 ease-out">
                              {slide.icon}
                            </div>
                          )}
                        </div>
                        
                        {/* Decorative HUD Elements */}
                        <div className="absolute top-8 left-8 text-[8px] font-mono text-white/10 uppercase tracking-widest">System_Ready // Local_Core</div>
                        <div className="absolute bottom-8 right-8 text-[8px] font-mono text-white/10 uppercase tracking-widest">© 2026 ShadowAgent</div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Right Column: Copy & Presentation (7 cols) */}
              <div className="lg:col-span-7 space-y-12 order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="h-px w-12 bg-cyan-500/40" />
                    <p className="text-xs font-bold tracking-[0.6em] uppercase text-cyan-400">{slide.title}</p>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-syne font-bold leading-[0.85] tracking-tighter mb-10">
                    {slide.subtitle}
                  </h1>
                  
                  {slide.description && (
                    <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl font-light">
                      {slide.description}
                    </p>
                  )}

                  {/* Bullet Points Grid */}
                  {slide.bullets && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                      {slide.bullets.map((b, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + (i * 0.1) }}
                          className="flex gap-4"
                        >
                          <div className={`mt-1.5 w-1 h-4 rounded-full ${slide.id === 'problem' ? 'bg-red-500' : 'bg-cyan-500'}`} />
                          <p className="text-sm md:text-base text-white/50 leading-relaxed">{b}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Examples (Demo) */}
                  {slide.examples && (
                    <div className="grid grid-cols-1 gap-4 mt-12">
                      {slide.examples.map((ex, i) => (
                        <div key={i} className="group p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex items-center justify-between hover:bg-white/[0.04] transition-all">
                          <div className="space-y-1">
                            <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest">{ex.cmd}</p>
                            <p className="text-sm font-manrope text-white/80">{ex.result}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparison Table */}
                  {slide.comparison && (
                    <div className="mt-12 rounded-[2rem] border border-white/10 bg-black/40 overflow-hidden backdrop-blur-xl">
                      <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5">
                        <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Logic</div>
                        <div className="text-center text-[9px] font-bold text-cyan-400 uppercase tracking-widest">ShadowAgent</div>
                        <div className="text-center text-[9px] font-bold text-white/20 uppercase tracking-widest">The Others</div>
                      </div>
                      {slide.comparison.map((row, i) => (
                        <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.02] transition-colors">
                          <div className="text-xs font-bold text-white/60">{row.feature}</div>
                          <div className="text-center text-xs text-cyan-400 font-black">{row.shadow}</div>
                          <div className="text-center text-xs text-white/20 font-light">{row.cloud}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Roadmap / Team / Tech Grids */}
                  {(slide.techItems || slide.roadmap || slide.team || slide.features) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                      {(slide.techItems || slide.roadmap || slide.team || slide.features).map((item: any, i: number) => (
                        <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/20 transition-all group">
                          <h4 className="text-sm font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                            {item.name || item.date || item.title}
                          </h4>
                          <p className="text-[11px] text-white/30 leading-relaxed">
                            {item.desc || item.goal || item.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* The Ask UI */}
                  {slide.askDetails && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="p-10 rounded-[3rem] bg-cyan-500/10 border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.4em] mb-4">Investment Ask</p>
                          <p className="text-6xl font-syne font-bold text-white mb-2">{slide.askDetails.amount}</p>
                          <p className="text-sm text-white/40 uppercase tracking-widest">{slide.askDetails.round}</p>
                       </div>
                       <div className="space-y-4 py-4">
                          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-6 underline decoration-cyan-500/40">Use of Funds</p>
                          {slide.askDetails.usage.map((u, i) => (
                            <div key={i} className="flex items-center gap-4 text-white/60 font-syne font-bold">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                              {u}
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {slide.tagline && (
                    <p className="text-xl md:text-2xl font-syne font-bold text-cyan-400 mt-16 italic opacity-80">
                      {slide.tagline}
                    </p>
                  )}
                </motion.div>
              </div>

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
            className="fixed bottom-0 left-0 right-0 z-[150] h-[30%] bg-black/90 backdrop-blur-3xl border-t border-cyan-500/30 p-10 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Info className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-cyan-400">Speaker Notes // Slide {currentSlide + 1}</h3>
              </div>
              <p className="text-xl text-white/80 leading-relaxed font-manrope font-light">
                {slide.notes}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation */}
      <div className="p-8 md:p-12 flex justify-between items-center relative z-[110]">
        <div className="flex gap-3 items-center">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={`h-1 transition-all duration-700 rounded-full hover:bg-white/50 ${i === currentSlide ? "w-20 bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.5)]" : "w-6 bg-white/10"}`} 
            />
          ))}
        </div>
        
        <div className="flex gap-6">
          <button 
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-20 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Prev
          </button>
          <button 
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="group flex items-center gap-4 px-10 py-4 rounded-full bg-white text-black hover:bg-cyan-400 transition-all text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            {currentSlide === slides.length - 1 ? "Finish" : "Next"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
