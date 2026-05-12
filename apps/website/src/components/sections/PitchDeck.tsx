"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { 
  ChevronRight, ChevronLeft, Shield, Cpu, Lock, 
  Terminal, BarChart3, Rocket, AlertCircle, CheckCircle2, 
  MessageSquare, Mail, Calendar, FileText, Download, QrCode, Key, MessageCircle, TrendingUp, DollarSign, Target, Megaphone,
  User, CpuIcon, Network, Globe2
} from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";
import GlassPrism from "@/components/canvas/GlassPrism";

const slides = [
  {
    id: "cover",
    title: "ShadowAgent",
    subtitle: "The Ghost in the Machine.",
    description: "Your digital sovereignty, re-imagined in three dimensions. Fully local. Fully yours.",
    icon: <LogoMark size={160} />,
    notes: "Welcome to the future of personal computing. This is ShadowAgent."
  },
  {
    id: "problem",
    title: "The Crisis",
    subtitle: "Cloud Surveillance.",
    description: "Traditional AI is a flat, two-dimensional trap. Your data is being harvested in the shadows.",
    icon: <AlertCircle className="w-32 h-32 text-red-500" />,
    notes: "The problem is simple: Your data is being stolen to train models."
  },
  {
    id: "solution",
    title: "The Shift",
    subtitle: "Sovereign Intelligence.",
    description: "100% Local. 0% Tracking. The first AI agent that actually lives with you.",
    icon: <Shield className="w-32 h-32 text-emerald-400" />,
    notes: "Our solution is a local-only neural orchestrator."
  },
  {
    id: "action",
    title: "In Action",
    subtitle: "Real-Time Logic.",
    description: "Interacting with your OS at machine speed, without the surveillance.",
    icon: <Terminal className="w-32 h-32 text-cyan-400" />,
    notes: "Speed and privacy, combined."
  },
  {
    id: "how-it-works",
    title: "The Engine",
    subtitle: "4-Step Setup.",
    description: "Install, Link, Activate, and Automate. No complex setup required.",
    icon: <Download className="w-32 h-32 text-purple-400" />,
    notes: "Simple deployment for the average user."
  },
  {
    id: "features",
    title: "The Grid",
    subtitle: "Neural Orchestration.",
    description: "Automate WhatsApp, Email, and Files with local-only intelligence.",
    icon: <CpuIcon className="w-32 h-32 text-purple-400" />,
    notes: "WhatsApp, Email, Files, and more."
  },
  {
    id: "privacy",
    title: "The Wall",
    subtitle: "Fortress Design.",
    description: "Comparing Shadow to the legacy cloud panopticon.",
    icon: <Lock className="w-32 h-32 text-cyan-400" />,
    notes: "Shadow vs The Cloud."
  },
  {
    id: "link",
    title: "Shadow Link",
    subtitle: "Unified Control.",
    description: "Seamlessly bridging your local apps with your local agent.",
    icon: <Network className="w-32 h-32 text-emerald-400" />,
    notes: "Native app interaction."
  },
  {
    id: "tech",
    title: "The Core",
    subtitle: "Tauri + Rust.",
    description: "Performance and security built into the very foundation.",
    icon: <Cpu className="w-32 h-32 text-blue-400" />,
    notes: "Built with Rust and Tauri 2."
  },
  {
    id: "market",
    title: "Dynamics",
    subtitle: "The $50B Wave.",
    description: "Privacy is no longer a niche—it's the massive market requirement.",
    icon: <BarChart3 className="w-32 h-32 text-orange-400" />,
    notes: "The market is shifting to the edge."
  },
  {
    id: "business",
    title: "Architecture",
    subtitle: "Scalable Profit.",
    description: "Zero cloud GPU costs means massive margins and sustainable growth.",
    icon: <DollarSign className="w-32 h-32 text-green-400" />,
    notes: "$99/yr renewal model."
  },
  {
    id: "roadmap",
    title: "The Horizon",
    subtitle: "The Roadmap.",
    description: "Mobile sovereignty and P2P neural networks are next.",
    icon: <Globe2 className="w-32 h-32 text-yellow-400" />,
    notes: "Mobile is Q3 2026."
  },
  {
    id: "team",
    title: "The Minds",
    subtitle: "Founders.",
    description: "Expertise in Rust, Local LLMs, and high-end Product Design.",
    icon: <User className="w-32 h-32 text-cyan-400" />,
    notes: "The team behind the sovereignty."
  },
  {
    id: "ask",
    title: "The Mission",
    subtitle: "Join the Shadow.",
    description: "We are raising $500k to build the future of private neural computing.",
    icon: <Rocket className="w-32 h-32 text-orange-400" />,
    notes: "Investing in privacy."
  },
  {
    id: "closing",
    title: "Initialize",
    subtitle: "Reclaim Yourself.",
    description: "The vision is local. The future is private. Join the Shadow today.",
    icon: <LogoMark size={160} />,
    notes: "Thank you for joining us."
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth > 1024 && !window.matchMedia("(pointer: coarse)").matches);
    checkIsDesktop();
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); paginate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); paginate(-1); }
      if (e.key === "n") setShowNotes(prev => !prev);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection < 0 || currentSlide + newDirection >= slides.length) return;
    setDirection(newDirection);
    setCurrentSlide(prev => prev + newDirection);
  };

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden flex flex-col font-manrope">
      
      {/* 3D Neural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {isDesktop && (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <GlassPrism />
          </Canvas>
        )}
      </div>

      {/* Floating HUD Brackets */}
      <div className="absolute inset-20 border border-white/5 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
      </div>

      {/* Top Header */}
      <div className="p-10 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-4">
          <LogoMark size={40} />
          <div className="flex flex-col">
            <span className="font-syne font-black text-2xl tracking-tighter text-white/90">SHADOW_AGENT</span>
            <span className="text-[8px] font-mono tracking-[0.4em] text-white/30 uppercase">Neural Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => setShowNotes(!showNotes)} className="text-[10px] font-bold tracking-widest text-white/30 hover:text-white transition-colors uppercase border-b border-white/10 pb-1">
             Speaker_Notes [N]
           </button>
           <div className="font-syne font-black text-xs bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-white/40">
             {currentSlide + 1} / {slides.length}
           </div>
        </div>
      </div>

      {/* 3D Slide Container */}
      <div className="flex-1 relative flex items-center justify-center perspective-2000 px-10 md:px-24">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateY: direction > 0 ? 90 : -90, z: -500 }}
            animate={{ opacity: 1, rotateY: 0, z: 0 }}
            exit={{ opacity: 0, rotateY: direction > 0 ? -90 : 90, z: -500 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              {/* Content Card */}
              <div className="space-y-8 translate-z-100">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs font-bold tracking-[0.8em] text-white/30 uppercase mb-6">{slide.title}</p>
                  <h1 className="text-7xl md:text-9xl font-syne font-black leading-none tracking-tightest text-white mb-8">
                    {slide.subtitle}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-xl">
                    {slide.description}
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(1)}
                  className="group flex items-center gap-6 px-10 py-5 bg-white text-black rounded-full font-syne font-black uppercase text-sm tracking-tighter"
                >
                  {currentSlide === slides.length - 1 ? "End Mission" : "Next Segment"}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>

              {/* 3D Icon Presentation */}
              <div className="flex justify-center items-center translate-z-200">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000 scale-150" />
                  <div className="relative z-10 w-[400px] h-[400px] rounded-[4rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
                    <div className="relative z-20 group-hover:scale-110 transition-transform duration-1000">
                      {slide.icon}
                    </div>
                  </div>
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
            className="fixed bottom-0 left-0 right-0 z-[100] h-[30%] bg-black/90 backdrop-blur-3xl border-t border-white/10 p-12 overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto">
              <h3 className="font-syne font-bold text-xs text-white/30 mb-6 tracking-widest uppercase underline decoration-white/10 underline-offset-8">SPEAKER_NOTES // {slide.id}</h3>
              <p className="text-2xl text-white/80 font-light leading-relaxed">
                {slide.notes}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="p-12 flex justify-between items-center relative z-50">
        <div className="flex gap-4">
          <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={() => paginate(1)} disabled={currentSlide === slides.length - 1} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"><ChevronRight className="w-6 h-6" /></button>
        </div>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-1000 ${i === currentSlide ? "w-16 bg-white" : "w-4 bg-white/10"}`} />
          ))}
        </div>

        <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase">
          Confidential // Neural OS v.1.0
        </div>
      </div>

      <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .translate-z-100 { transform: translateZ(100px); }
        .translate-z-200 { transform: translateZ(200px); }
      `}</style>
    </div>
  );
}
