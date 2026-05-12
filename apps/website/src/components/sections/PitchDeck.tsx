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
    subtitle: "The 3D Neural OS.",
    description: "Your digital sovereignty, re-imagined in three dimensions. Fully local. Fully yours.",
    icon: <LogoMark size={160} />,
    color: "#00F0FF"
  },
  {
    id: "problem",
    title: "The Crisis",
    subtitle: "Cloud Surveillance.",
    description: "Traditional AI is a flat, two-dimensional trap. Your data is being harvested in the shadows.",
    icon: <ShieldAlert className="w-32 h-32 text-red-500" />,
    color: "#FF0000"
  },
  {
    id: "solution",
    title: "The Shift",
    subtitle: "Sovereign Intelligence.",
    description: "100% Local. 0% Tracking. The first AI agent that actually lives with you.",
    icon: <Shield className="w-32 h-32 text-emerald-400" />,
    color: "#10B981"
  },
  {
    id: "features",
    title: "The Grid",
    subtitle: "Neural Orchestration.",
    description: "Automate WhatsApp, Email, and Files with local-only intelligence.",
    icon: <CpuIcon className="w-32 h-32 text-purple-400" />,
    color: "#A855F7"
  },
  {
    id: "the-ask",
    title: "The Mission",
    subtitle: "Join the Shadow.",
    description: "We are raising $500k to build the future of private neural computing.",
    icon: <Rocket className="w-32 h-32 text-orange-400" />,
    color: "#F97316"
  }
];

function ShieldAlert(props: any) {
  return <AlertCircle {...props} />;
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

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
          <span className="font-syne font-black text-2xl tracking-tighter text-white/90">SHADOW_AGENT</span>
        </div>
        <div className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">
          Slide {currentSlide + 1} // {slides.length}
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
                  Next Segment
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
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000 scale-150" />
                  
                  {/* 3D Floating Frame */}
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

      {/* Navigation Footer */}
      <div className="p-12 flex justify-between items-center relative z-50">
        <div className="flex gap-4">
          <button 
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-1000 ${i === currentSlide ? "w-16 bg-white" : "w-4 bg-white/10"}`} 
            />
          ))}
        </div>

        <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase">
          Confidential // Internal Use Only
        </div>
      </div>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .translate-z-100 {
          transform: translateZ(100px);
        }
        .translate-z-200 {
          transform: translateZ(200px);
        }
      `}</style>
    </div>
  );
}
