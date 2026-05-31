"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, Calendar, FolderOpen, Zap, Cpu, Download, Play, Shield, Lock, WifiOff, Terminal, ArrowRight, Activity, Server, Database } from "lucide-react";

export default function CinematicHero() {
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [sysLog, setSysLog] = useState<string>("SYSTEM_IDLE: Awaiting local execution context...");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse coordinates for interactive background spotlight glow
  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };
    
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseenter", () => setIsHoveringHero(true));
      hero.addEventListener("mouseleave", () => setIsHoveringHero(false));
    }
    return () => {
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mounted]);

  // Cycle high-fidelity system logs in the footer of the neural visualization
  useEffect(() => {
    if (!mounted) return;
    const logs = [
      "SECURE_LINK: Local node handshakes complete.",
      "NEURAL_EXEC: Optimizing local model weights...",
      "DATA_PIPELINE: Committing 128-bit file index.",
      "SMTP_SHADOW: Reading inbox, extracting actionable items...",
      "INTEGRATION_SYNC: WhatsApp secure websocket connected.",
      "SYSTEM_OPTIMAL: 100% offline security verified.",
      "SHADOW_CORE: Neural inference latency: 12ms."
    ];
    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setSysLog(randomLog);
    }, 4500);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return <div className="h-screen w-full bg-[#03040B]" />;

  // Interactive Background Starfield Particles
  const backgroundDust = [
    { id: 1, size: 2, x: "10%", y: "15%", duration: 9, delay: 0 },
    { id: 2, size: 3, x: "85%", y: "20%", duration: 13, delay: 1.2 },
    { id: 3, size: 1.5, x: "42%", y: "85%", duration: 8, delay: 0.5 },
    { id: 4, size: 2, x: "70%", y: "75%", duration: 10, delay: 2.1 },
    { id: 5, size: 4, x: "25%", y: "65%", duration: 15, delay: 0.2 },
    { id: 6, size: 2.5, x: "90%", y: "55%", duration: 12, delay: 1.7 },
    { id: 7, size: 1.5, x: "15%", y: "45%", duration: 7, delay: 3.2 },
    { id: 8, size: 3, x: "60%", y: "12%", duration: 14, delay: 0.8 },
    { id: 9, size: 2, x: "50%", y: "40%", duration: 11, delay: 2.5 },
    { id: 10, size: 3.5, x: "78%", y: "30%", duration: 16, delay: 1.4 },
    { id: 11, size: 2, x: "30%", y: "22%", duration: 9.5, delay: 0.3 },
    { id: 12, size: 1.5, x: "68%", y: "48%", duration: 8.2, delay: 2.8 }
  ];

  // Theme accents for each node
  const nodes = {
    whatsapp: {
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.35)",
      pathGrad: "url(#grad-whatsapp)",
    },
    email: {
      color: "#f43f5e",
      glowColor: "rgba(244, 63, 94, 0.35)",
      pathGrad: "url(#grad-email)",
    },
    calendar: {
      color: "#3b82f6",
      glowColor: "rgba(59, 130, 246, 0.35)",
      pathGrad: "url(#grad-calendar)",
    },
    files: {
      color: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.35)",
      pathGrad: "url(#grad-files)",
    },
    workflows: {
      color: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.35)",
      pathGrad: "url(#grad-workflows)",
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen w-full bg-[#030409] overflow-hidden flex flex-col justify-center pt-24 pb-16"
    >
      
      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-40" />

      {/* Atmospheric Spatial Ambient Lights */}
      <div className="absolute top-[20%] right-[10%] w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-indigo-600/8 via-purple-600/4 to-cyan-500/8 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[8%] left-[5%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-indigo-500/5 to-transparent blur-[110px] pointer-events-none" />

      {/* Interactive Cursor Spotlight (Breathtaking Mouse Interaction) */}
      {isHoveringHero && (
        <motion.div
          className="absolute z-0 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-indigo-500/4 via-purple-500/2 to-cyan-500/4 blur-[100px] pointer-events-none"
          animate={{
            x: mousePos.x - 225,
            y: mousePos.y - 225,
          }}
          transition={{ type: "spring", damping: 35, stiffness: 70, mass: 0.7 }}
        />
      )}

      {/* Animated Floating Cyber Dust Particles */}
      {backgroundDust.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-indigo-400/20 rounded-full pointer-events-none z-10"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          animate={{
            y: [-18, 18, -18],
            x: [-12, 12, -12],
            opacity: [0.12, 0.45, 0.12],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Typography, Actions & Live LLM Monitor (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8 lg:pr-6 z-30">
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-syne font-extrabold leading-[1.08] tracking-tight text-white"
            >
              Your Private <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Autonomous</span><br />
              AI Agent.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-base xs:text-lg text-white/50 font-manrope max-w-lg leading-relaxed"
            >
              Shadow Agent runs locally on your machine to automate emails, chats, files, and workflows — with privacy-first execution and autonomous intelligence.
            </motion.p>

            {/* Micro Live LLM State Widget (Impressive Creativity & Productivity Detail) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-full sm:max-w-md bg-slate-950/45 border border-white/[0.05] rounded-2xl p-4.5 backdrop-blur-xl flex flex-col gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-indigo-500/20 transition-colors"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-2.5">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px] font-syne font-bold text-white/80 uppercase tracking-wider">Local Engine Status</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-emerald-400">ONLINE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 text-[10px] font-mono text-white/50">
                <div className="flex flex-col gap-1">
                  <span className="text-white/30 uppercase text-[8px] tracking-wider">AI Inference Model</span>
                  <span className="text-white/80 font-semibold truncate flex items-center gap-1">
                    <Database className="w-3 h-3 text-cyan-400 shrink-0" /> Llama-3-Groq-8B
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/30 uppercase text-[8px] tracking-wider">Inference Speed</span>
                  <span className="text-white/80 font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3 text-purple-400 shrink-0" /> 74 tokens/sec
                  </span>
                </div>
              </div>

              <div className="w-full bg-white/[0.04] h-[3px] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  animate={{ width: ["30%", "85%", "60%", "92%", "30%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 0.55 }}
              className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-3 text-xs md:text-sm text-white/60 font-manrope font-semibold border-t border-white/[0.05] w-full"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" /> 
                <Lock className="w-4 h-4 text-purple-400/80" /> 100% Local Execution
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> 
                <Shield className="w-4 h-4 text-cyan-400/80" /> Privacy First
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
                <WifiOff className="w-4 h-4 text-blue-400/80" /> Offline Capable
              </span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Quantum Neural Link Engine (7 cols) */}
          {/* FIXED min-h and added overflow-hidden for bulletproof mobile container safety */}
          <div className="lg:col-span-7 relative z-20 w-full flex items-center justify-center min-h-[420px] xs:min-h-[480px] sm:min-h-[550px] lg:min-h-[620px] overflow-hidden">
            
            {/* The coordinated aspect-ratio container */}
            {/* FIXED: scale-[0.62] xs:scale-[0.74] sm:scale-[0.88] lg:scale-100 scales the entire neural link assembly smoothly for small screens, keeping coordinates and visuals 100% balanced and completely within the viewport! */}
            <div className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center scale-[0.62] xs:scale-[0.74] sm:scale-[0.88] lg:scale-100 origin-center my-[-90px] xs:my-[-50px] sm:my-[-20px] lg:my-0 transition-transform duration-500">
              
              {/* Dynamic Volumetric Background Nebula centered on core */}
              <div 
                className="absolute w-64 h-64 rounded-full filter blur-[80px] pointer-events-none transition-all duration-700" 
                style={{
                  background: hoveredNode ? nodes[hoveredNode as keyof typeof nodes].glowColor : "rgba(79, 70, 229, 0.15)",
                  transform: "scale(1.3)"
                }}
              />
              
              {/* SVG PATHS & ORBITALS - Rendered on a strict 600x600 coordinate grid */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600" fill="none">
                <defs>
                  {/* Neon Glowing Filters */}
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient paths linking nodes to the central core */}
                  <linearGradient id="grad-whatsapp" x1="100" y1="160" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  
                  <linearGradient id="grad-email" x1="500" y1="160" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>

                  <linearGradient id="grad-calendar" x1="100" y1="440" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>

                  <linearGradient id="grad-files" x1="500" y1="440" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>

                  <linearGradient id="grad-workflows" x1="300" y1="510" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>

                {/* --- CONCENTRIC BACKGROUND ORBITAL CIRCLES ("Behind Link Circles") --- */}
                {/* 1. Outer Orbit */}
                <motion.g 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "300px 300px" }}
                >
                  <circle cx="300" cy="300" r="260" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" strokeDasharray="15 35 5 15" />
                  {/* Glowing Orbiting Satellite Particle */}
                  <circle cx="300" cy="40" r="2.5" fill="#a855f7" filter="url(#neon-glow)" />
                </motion.g>

                {/* 2. Middle Outer Orbit */}
                <motion.g 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "300px 300px" }}
                >
                  <circle cx="300" cy="300" r="200" stroke="rgba(34, 211, 238, 0.06)" strokeWidth="1" strokeDasharray="4 12" />
                  <circle cx="100" cy="300" r="2" fill="#22d3ee" />
                  <circle cx="500" cy="300" r="2" fill="#22d3ee" />
                </motion.g>

                {/* 3. Middle Inner Orbit */}
                <motion.g 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "300px 300px" }}
                >
                  <circle cx="300" cy="300" r="145" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" strokeDasharray="20 40 10 30" />
                  <circle cx="300" cy="155" r="3" fill="#818cf8" filter="url(#neon-glow)" />
                </motion.g>

                {/* 4. Inner Orbit */}
                <motion.g 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "300px 300px" }}
                >
                  <circle cx="300" cy="300" r="95" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.75" strokeDasharray="2 6" />
                </motion.g>


                {/* --- NEURAL LINK PATHWAYS (CONNECTING NODES TO THE CORE) --- */}
                
                {/* 1. WhatsApp Pathway (Top Left) */}
                <g>
                  {/* Underlay glow path */}
                  <path 
                    d="M 100 160 C 200 160, 220 300, 300 300" 
                    stroke="#10b981" 
                    strokeWidth={hoveredNode === "whatsapp" ? 6 : 3} 
                    strokeOpacity={hoveredNode === "whatsapp" ? 0.25 : 0.04} 
                    fill="none" 
                    className="transition-all duration-300"
                    filter="url(#neon-glow)"
                  />
                  {/* Main path */}
                  <path 
                    d="M 100 160 C 200 160, 220 300, 300 300" 
                    stroke="url(#grad-whatsapp)" 
                    strokeWidth="1.5" 
                    strokeOpacity={hoveredNode === "whatsapp" ? 0.9 : 0.25} 
                    fill="none" 
                    className="transition-all duration-300"
                  />
                  {/* Flowing Data Stream */}
                  <motion.path 
                    d="M 100 160 C 200 160, 220 300, 300 300" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeDasharray="6 60"
                    fill="none"
                    animate={{ strokeDashoffset: [330, 0] }}
                    transition={{ 
                      duration: hoveredNode === "whatsapp" ? 1.2 : 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </g>

                {/* 2. Email Pathway (Top Right) */}
                <g>
                  {/* Underlay glow path */}
                  <path 
                    d="M 500 160 C 400 160, 380 300, 300 300" 
                    stroke="#f43f5e" 
                    strokeWidth={hoveredNode === "email" ? 6 : 3} 
                    strokeOpacity={hoveredNode === "email" ? 0.25 : 0.04} 
                    fill="none" 
                    className="transition-all duration-300"
                    filter="url(#neon-glow)"
                  />
                  {/* Main path */}
                  <path 
                    d="M 500 160 C 400 160, 380 300, 300 300" 
                    stroke="url(#grad-email)" 
                    strokeWidth="1.5" 
                    strokeOpacity={hoveredNode === "email" ? 0.9 : 0.25} 
                    fill="none" 
                    className="transition-all duration-300"
                  />
                  {/* Flowing Data Stream */}
                  <motion.path 
                    d="M 500 160 C 400 160, 380 300, 300 300" 
                    stroke="#f43f5e" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeDasharray="6 60"
                    fill="none"
                    animate={{ strokeDashoffset: [330, 0] }}
                    transition={{ 
                      duration: hoveredNode === "email" ? 1.2 : 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </g>

                {/* 3. Calendar Pathway (Bottom Left) */}
                <g>
                  {/* Underlay glow path */}
                  <path 
                    d="M 100 440 C 200 440, 220 300, 300 300" 
                    stroke="#3b82f6" 
                    strokeWidth={hoveredNode === "calendar" ? 6 : 3} 
                    strokeOpacity={hoveredNode === "calendar" ? 0.25 : 0.04} 
                    fill="none" 
                    className="transition-all duration-300"
                    filter="url(#neon-glow)"
                  />
                  {/* Main path */}
                  <path 
                    d="M 100 440 C 200 440, 220 300, 300 300" 
                    stroke="url(#grad-calendar)" 
                    strokeWidth="1.5" 
                    strokeOpacity={hoveredNode === "calendar" ? 0.9 : 0.25} 
                    fill="none" 
                    className="transition-all duration-300"
                  />
                  {/* Flowing Data Stream */}
                  <motion.path 
                    d="M 100 440 C 200 440, 220 300, 300 300" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeDasharray="6 60"
                    fill="none"
                    animate={{ strokeDashoffset: [330, 0] }}
                    transition={{ 
                      duration: hoveredNode === "calendar" ? 1.2 : 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </g>

                {/* 4. Local Files Pathway (Bottom Right) */}
                <g>
                  {/* Underlay glow path */}
                  <path 
                    d="M 500 440 C 400 440, 380 300, 300 300" 
                    stroke="#f59e0b" 
                    strokeWidth={hoveredNode === "files" ? 6 : 3} 
                    strokeOpacity={hoveredNode === "files" ? 0.25 : 0.04} 
                    fill="none" 
                    className="transition-all duration-300"
                    filter="url(#neon-glow)"
                  />
                  {/* Main path */}
                  <path 
                    d="M 500 440 C 400 440, 380 300, 300 300" 
                    stroke="url(#grad-files)" 
                    strokeWidth="1.5" 
                    strokeOpacity={hoveredNode === "files" ? 0.9 : 0.25} 
                    fill="none" 
                    className="transition-all duration-300"
                  />
                  {/* Flowing Data Stream */}
                  <motion.path 
                    d="M 500 440 C 400 440, 380 300, 300 300" 
                    stroke="#f59e0b" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeDasharray="6 60"
                    fill="none"
                    animate={{ strokeDashoffset: [330, 0] }}
                    transition={{ 
                      duration: hoveredNode === "files" ? 1.2 : 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </g>

                {/* 5. Workflows Pathway (Autonomous Exec - Bottom Center) */}
                {/* CONNECTS PERFECTLY TO WORKFLOWS NODE AT (300, 510) */}
                <g>
                  {/* Underlay glow path */}
                  <path 
                    d="M 300 510 L 300 300" 
                    stroke="#a855f7" 
                    strokeWidth={hoveredNode === "workflows" ? 6 : 3} 
                    strokeOpacity={hoveredNode === "workflows" ? 0.25 : 0.04} 
                    fill="none" 
                    className="transition-all duration-300"
                    filter="url(#neon-glow)"
                  />
                  {/* Main path */}
                  <path 
                    d="M 300 510 L 300 300" 
                    stroke="url(#grad-workflows)" 
                    strokeWidth="1.5" 
                    strokeOpacity={hoveredNode === "workflows" ? 0.9 : 0.25} 
                    fill="none" 
                    className="transition-all duration-300"
                  />
                  {/* Flowing Data Stream */}
                  <motion.path 
                    d="M 300 510 L 300 300" 
                    stroke="#a855f7" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeDasharray="6 45"
                    fill="none"
                    animate={{ strokeDashoffset: [210, 0] }}
                    transition={{ 
                      duration: hoveredNode === "workflows" ? 0.8 : 2.2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </g>
              </svg>


              {/* --- CENTRAL QUANTUM CORE ENGINE --- */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center select-none">
                
                {/* 1. Outer Tech-Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-cyan-500/20 pointer-events-none"
                />

                {/* 2. Counter-Rotating Inner Tech-Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[156px] h-[156px] rounded-full border border-dotted border-indigo-400/30 pointer-events-none"
                />

                {/* 3. Deep Core Glow Ring */}
                <motion.div 
                  animate={{
                    scale: hoveredNode ? [1, 1.12, 1] : [1, 1.05, 1],
                    opacity: hoveredNode ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[130px] h-[130px] rounded-full filter blur-[15px] pointer-events-none"
                  style={{
                    background: hoveredNode ? nodes[hoveredNode as keyof typeof nodes].glowColor : "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)"
                  }}
                />

                {/* 4. Glassmorphic Squircle core chamber */}
                <motion.div 
                  className="relative w-36 h-36 rounded-[30%] bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),0_0_60px_rgba(99,102,241,0.25)] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                  animate={{
                    borderColor: hoveredNode ? [nodes[hoveredNode as keyof typeof nodes].color, "rgba(255,255,255,0.15)"] : ["rgba(255,255,255,0.1)", "rgba(99,102,241,0.3)", "rgba(255,255,255,0.1)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Sweep Laser Scanning Line */}
                  <motion.div 
                    animate={{ y: ["-120%", "220%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 blur-[0.5px]"
                  />

                  {/* Glass chamber backdrop highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                  {/* Dynamic central logo icon */}
                  <div className="relative z-10 mb-2">
                    {/* Isometric Cube (High-Tech Shadow Agent Logo representation) */}
                    <svg className="w-12 h-12 text-indigo-400 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-500" 
                         style={{ 
                           color: hoveredNode ? nodes[hoveredNode as keyof typeof nodes].color : "#818cf8",
                           filter: hoveredNode ? `drop-shadow(0 0 12px ${nodes[hoveredNode as keyof typeof nodes].color})` : "drop-shadow(0 0 8px rgba(99,102,241,0.6))"
                         }}
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 7v10" />
                      <path d="M12 12v10" />
                      <path d="M22 7v10" />
                      <circle cx="12" cy="12" r="1.2" fill="#22d3ee" />
                      <circle cx="7" cy="9.5" r="0.8" fill="#818cf8" />
                      <circle cx="17" cy="9.5" r="0.8" fill="#818cf8" />
                    </svg>
                  </div>

                  {/* Core branding and small stats */}
                  <h2 className="relative z-10 text-[10px] font-syne font-bold text-white tracking-[0.25em] text-center uppercase">
                    Shadow Core
                  </h2>
                  <span className="relative z-10 text-[7px] font-mono text-cyan-400/80 tracking-[0.2em] uppercase mt-1">
                    {hoveredNode ? `${hoveredNode.toUpperCase()}_SYNC` : "ACTIVE_V1.0"}
                  </span>
                </motion.div>
              </div>


              {/* --- STUNNING GLASSMORPHIC FLOATING NODES --- */}
              {/* Placed at EXACT matching coordinates on the 600x600 grid */}
              {/* FIXED: Uses adaptive responsive widths, fonts, and paddings so it always looks perfectly balanced and fits 100% with zero cutoff on mobile viewports! */}

              {/* 1. WHATSAPP NODE (Top Left) - Center: (100, 160) -> style: left: 16.6%, top: 26.6% */}
              <NodeCard 
                icon={<MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400" />} 
                title="WhatsApp Link" 
                sub="Automated Chat Replying" 
                accentColor="#10b981"
                activeGlow="rgba(16, 185, 129, 0.15)"
                positionStyle={{ left: "16.6%", top: "26.6%" }}
                isHovered={hoveredNode === "whatsapp"}
                onHoverStart={() => setHoveredNode("whatsapp")}
                onHoverEnd={() => setHoveredNode(null)}
                delay={0.15}
                miniVisual={
                  <div className="flex items-end gap-[2px] h-3.5 w-10 opacity-70 shrink-0">
                    <motion.div animate={{ height: [6, 14, 4, 6] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} className="w-1 bg-emerald-400 rounded-sm" />
                    <motion.div animate={{ height: [12, 4, 14, 8] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="w-1 bg-emerald-400 rounded-sm" />
                    <motion.div animate={{ height: [4, 12, 6, 14] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-1 bg-emerald-400 rounded-sm" />
                    <motion.div animate={{ height: [8, 6, 10, 4] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="w-1 bg-emerald-400 rounded-sm" />
                  </div>
                }
              />

              {/* 2. EMAIL NODE (Top Right) - Center: (500, 160) -> style: left: 83.3%, top: 26.6% */}
              <NodeCard 
                icon={<Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-rose-400" />} 
                title="Email Automator" 
                sub="Secure Smart Inbox" 
                accentColor="#f43f5e"
                activeGlow="rgba(244, 63, 94, 0.15)"
                positionStyle={{ left: "83.3%", top: "26.6%" }}
                isHovered={hoveredNode === "email"}
                onHoverStart={() => setHoveredNode("email")}
                onHoverEnd={() => setHoveredNode(null)}
                delay={0.25}
                miniVisual={
                  <div className="relative w-10 h-5 flex items-center justify-center shrink-0">
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[8.5px] font-mono font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20"
                    >
                      SYNCED
                    </motion.div>
                  </div>
                }
              />

              {/* 3. CALENDAR NODE (Bottom Left) - Center: (100, 440) -> style: left: 16.6%, top: 73.3% */}
              <NodeCard 
                icon={<Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-400" />} 
                title="Calendar Sync" 
                sub="Smart Schedule Lock" 
                accentColor="#3b82f6"
                activeGlow="rgba(59, 130, 246, 0.15)"
                positionStyle={{ left: "16.6%", top: "73.3%" }}
                isHovered={hoveredNode === "calendar"}
                onHoverStart={() => setHoveredNode("calendar")}
                onHoverEnd={() => setHoveredNode(null)}
                delay={0.35}
                miniVisual={
                  <div className="flex items-center gap-[4px] opacity-80 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-blue-400/80 animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 relative" />
                    <span className="text-[9px] font-mono text-blue-300 font-bold">14:00</span>
                  </div>
                }
              />

              {/* 4. LOCAL FILES NODE (Bottom Right) - Center: (500, 440) -> style: left: 83.3%, top: 73.3% */}
              <NodeCard 
                icon={<FolderOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />} 
                title="Local Directories" 
                sub="Vector Semantic Search" 
                accentColor="#f59e0b"
                activeGlow="rgba(245, 158, 11, 0.15)"
                positionStyle={{ left: "83.3%", top: "73.3%" }}
                isHovered={hoveredNode === "files"}
                onHoverStart={() => setHoveredNode("files")}
                onHoverEnd={() => setHoveredNode(null)}
                delay={0.45}
                miniVisual={
                  <div className="w-9 h-1.5 bg-white/10 rounded-full overflow-hidden shrink-0">
                    <motion.div 
                      animate={{ width: ["10%", "95%", "35%", "80%", "10%"] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                }
              />

              {/* 5. WORKFLOWS NODE (Autonomous Exec - Bottom Center) */}
              {/* PLACED AT (300, 510) EXACTLY -> style: left: 50%, top: 85% */}
              <NodeCard 
                icon={<Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-400 animate-pulse" />} 
                title="Workflows Agent" 
                sub="Autonomous Local Exec" 
                accentColor="#a855f7"
                activeGlow="rgba(168, 85, 247, 0.15)"
                positionStyle={{ left: "50%", top: "85%" }}
                isHovered={hoveredNode === "workflows"}
                onHoverStart={() => setHoveredNode("workflows")}
                onHoverEnd={() => setHoveredNode(null)}
                delay={0.55}
                miniVisual={
                  <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[7.5px] font-mono text-purple-300 font-bold uppercase tracking-wider">READY</span>
                  </div>
                }
              />

            </div>

            {/* Micro Cyber Log Feed at the bottom right */}
            <div className="absolute bottom-[-10px] right-4 lg:right-0 bg-slate-950/60 border border-white/[0.05] rounded-xl px-4 py-2 backdrop-blur-xl flex items-center gap-3.5 max-w-[320px] select-none font-mono text-[9px] text-white/50 shadow-2xl">
              <Terminal className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
              <div className="overflow-hidden whitespace-nowrap text-ellipsis tracking-wide">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={sysLog}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {sysLog}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

interface NodeCardProps {
  icon: React.ReactNode;
  title: string;
  sub: string;
  accentColor: string;
  activeGlow: string;
  positionStyle: React.CSSProperties;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  delay: number;
  miniVisual?: React.ReactNode;
}

function NodeCard({ 
  icon, 
  title, 
  sub, 
  accentColor, 
  activeGlow,
  positionStyle, 
  isHovered, 
  onHoverStart, 
  onHoverEnd,
  delay,
  miniVisual 
}: NodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        ...positionStyle,
        position: "absolute",
        transform: "translate(-50%, -50%)"
      }}
      className="z-30 select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <motion.div
        animate={{ 
          y: isHovered ? -2 : [-2.5, 2.5, -2.5],
          scale: isHovered ? 1.04 : 1,
          borderColor: isHovered ? accentColor : "rgba(255,255,255,0.06)",
          boxShadow: isHovered 
            ? `0 16px 40px rgba(0,0,0,0.55), 0 0 25px ${activeGlow}, inset 0 1px 1px rgba(255,255,255,0.15)`
            : "0 10px 30px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.03)"
        }}
        transition={{ 
          y: isHovered ? { duration: 0.25 } : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay * 1.5 },
          scale: { duration: 0.3, ease: "easeOut" },
          borderColor: { duration: 0.3 },
          boxShadow: { duration: 0.3 }
        }}
        className="flex items-center gap-2 sm:gap-3.5 p-2 sm:p-3 pr-3 sm:pr-4.5 bg-[#060810]/85 border rounded-xl backdrop-blur-xl transition-all duration-300 cursor-pointer group w-[150px] xs:w-[170px] sm:w-[210px] md:w-[230px] lg:w-[250px]"
      >
        {/* Animated glowing backplate */}
        <div 
          className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-20 blur-[3px] transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accentColor}, transparent)` }}
        />

        {/* Icon Frame */}
        <div className="p-1.5 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04] group-hover:scale-108 transition-all duration-300 shrink-0 shadow-inner flex items-center justify-center">
          {icon}
        </div>

        {/* Info Area (Responsive typography that dynamically scales and auto-wraps so text is fully complete and balanced on mobile webs!) */}
        <div className="flex flex-col min-w-0 grow justify-center pr-0.5">
          <span className="text-[10px] xs:text-[10.5px] sm:text-[11.5px] md:text-[12px] font-syne font-bold text-white/95 tracking-wide leading-tight break-words">{title}</span>
          <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] md:text-[9.5px] font-manrope text-white/40 leading-snug mt-0.5 tracking-normal break-words">{sub}</span>
        </div>

        {/* Live Visual Action Block - hidden on mobile viewports under 640px to dedicate 100% of horizontal space to readable text, showing on sm+ screens */}
        {miniVisual && (
          <div className="hidden sm:flex shrink-0 items-center justify-end pl-0.5">
            {miniVisual}
          </div>
        )}

        {/* Outer pulsing status indicator */}
        <div className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: accentColor }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
