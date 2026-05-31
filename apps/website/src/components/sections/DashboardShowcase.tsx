"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  MessageSquare,
  Mail,
  FileText,
  Mic,
  Play,
  Pause,
  Shield,
  HardDrive,
  Lock,
  Send,
  Terminal,
  Activity,
  FileUp,
  Search,
  CheckCircle,
  Database,
  ArrowRight,
  ChevronRight,
  Layers,
  RefreshCw
} from "lucide-react";

// Tab types
type TabId = "core" | "whatsapp" | "email" | "rag" | "voice";

interface TabConfig {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("core");
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [systemTime, setSystemTime] = useState<string>("10:42 AM");
  
  // Tab configuration
  const tabs: TabConfig[] = [
    {
      id: "core",
      label: "Neural Core",
      shortLabel: "Core",
      icon: <Cpu className="w-4 h-4" />,
      color: "text-cyan-400",
      glowColor: "rgba(0, 240, 255, 0.4)"
    },
    {
      id: "whatsapp",
      label: "WhatsApp Node",
      shortLabel: "WhatsApp",
      icon: <MessageSquare className="w-4 h-4" />,
      color: "text-green-400",
      glowColor: "rgba(34, 197, 94, 0.4)"
    },
    {
      id: "email",
      label: "Neural Inbox",
      shortLabel: "Email",
      icon: <Mail className="w-4 h-4" />,
      color: "text-purple-400",
      glowColor: "rgba(160, 32, 240, 0.4)"
    },
    {
      id: "rag",
      label: "Sovereign RAG",
      shortLabel: "RAG",
      icon: <FileText className="w-4 h-4" />,
      color: "text-amber-400",
      glowColor: "rgba(245, 158, 11, 0.4)"
    },
    {
      id: "voice",
      label: "Voice Protocol",
      shortLabel: "Voice",
      icon: <Mic className="w-4 h-4" />,
      color: "text-cyan-400",
      glowColor: "rgba(0, 240, 255, 0.4)"
    }
  ];

  // Auto-play cycling effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((t) => t.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 7000); // cycle every 7 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // 12 instead of 0
      setSystemTime(`${hours}:${minutes} ${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="relative py-28 px-6 bg-[#05050a] border-t border-white/5 overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-manrope font-bold tracking-[0.4em] uppercase text-cyan-400 mb-4"
          >
            System Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-syne font-bold mb-6 tracking-tight"
          >
            The Local <span className="text-white/30">Dashboard.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/50 font-manrope max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Explore how ShadowAgent orchestrates neural networks, voice feeds, WhatsApp API logs, and vectors directly on your device.
          </motion.p>
        </div>

        {/* Dashboard Controls (Auto-Play Toggle & Tabs) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-zinc-950/80 border border-white/5 p-3 rounded-2xl max-w-4xl mx-auto backdrop-blur-md">
          {/* Autoplay toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono border border-white/10 hover:border-white/20 transition-all bg-white/[0.02] text-white/70"
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>PAUSE TOUR</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-green-400" />
                <span>AUTO-PLAY TOUR</span>
              </>
            )}
          </button>

          {/* Navigation Buttons for Large Screens */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsAutoPlay(false); // Stop autoplay when manually selected
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-syne transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white font-bold border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "text-white/40 hover:text-white/70 border border-transparent"
                  }`}
                >
                  <span className={isActive ? tab.color : "text-white/40"}>
                    {tab.icon}
                  </span>
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LAPTOP FRAME MOCK */}
        <div className="relative mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4 shadow-[0_0_80px_rgba(0,240,255,0.03)]">
          
          {/* The Screen (Lid) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-[6px] md:border-[10px] border-zinc-800 bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Screen Bezel Details */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-black border border-white/5" /> {/* Camera */}
              <div className="w-1 h-1 rounded-full bg-green-500/80 animate-pulse" /> {/* Green camera light */}
            </div>
            
            {/* Screen Content Wrapper */}
            <div className="w-full h-full flex flex-col relative select-none">
              
              {/* Top OS Bar */}
              <div className="h-7 md:h-8 border-b border-white/5 bg-zinc-900/60 px-4 flex items-center justify-between text-[9px] md:text-[11px] font-mono text-white/40">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 border border-green-500/10" />
                  </div>
                  <div className="h-3 w-[1px] bg-white/10 mx-1" />
                  <span className="flex items-center gap-1.5 text-white/35">
                    <Lock className="w-2.5 h-2.5 text-cyan-500" />
                    <span>SHADOW_OS v1.0.4</span>
                  </span>
                </div>
                
                <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[8px] md:text-[9px] text-cyan-400 font-bold tracking-wider">
                  LOCAL ENGINE ONLY // AIR-GAPPED
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-white/20">PORT_8080 // INBOUND</span>
                  <span className="text-white/60 font-semibold">{systemTime}</span>
                </div>
              </div>
              
              {/* Inner App Area */}
              <div className="flex-1 flex overflow-hidden bg-[#06060c]">
                
                {/* Left Mini Sidebar */}
                <div className="w-14 md:w-44 border-r border-white/5 bg-[#080812]/90 flex flex-col justify-between py-4">
                  <div className="space-y-1 px-2">
                    <div className="hidden md:block px-3 mb-4 text-[9px] font-mono tracking-widest text-white/30 uppercase">
                      SYSTEM NODES
                    </div>
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsAutoPlay(false);
                          }}
                          className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-xs font-manrope transition-all duration-300 ${
                            isActive
                              ? "bg-white/5 text-white font-medium border border-white/5"
                              : "text-white/30 hover:bg-white/[0.02] hover:text-white/60"
                          }`}
                        >
                          <span className={isActive ? tab.color : "text-white/30"}>
                            {tab.icon}
                          </span>
                          <span className="hidden md:inline text-left">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Bottom Sidebar metrics */}
                  <div className="px-4 hidden md:block space-y-2 border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between text-[9px] font-mono text-white/20">
                      <span>CORE TEMP</span>
                      <span className="text-orange-400">42°C</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-2/5 h-full bg-orange-400 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-green-400/60 mt-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                      <span>NO LEAKS</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Dashboard View */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#040408]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between"
                    >
                      {activeTab === "core" && <CoreView />}
                      {activeTab === "whatsapp" && <WhatsAppView />}
                      {activeTab === "email" && <EmailView />}
                      {activeTab === "rag" && <RAGView />}
                      {activeTab === "voice" && <VoiceView />}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
              </div>
            </div>

            {/* Screen Reflection Glare */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] mix-blend-overlay" />
            
            {/* CRT scanline effect */}
            <div className="scanline-overlay" />
          </div>
          
          {/* Laptop Hinge */}
          <div className="relative mx-auto h-2 md:h-3 w-[92%] bg-zinc-800 rounded-b-md shadow-lg flex items-center justify-center">
            <div className="absolute top-0 w-24 md:w-36 h-[2px] bg-zinc-700 rounded-full" />
          </div>
          
          {/* Laptop Base (Keyboard) */}
          <div className="relative mx-auto h-3 md:h-4 w-[104%] -left-[2%] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-b-xl shadow-2xl flex items-center justify-center">
            {/* Trackpad notch */}
            <div className="absolute top-0 w-28 md:w-36 h-2 bg-black/50 rounded-b-md border-t border-zinc-900" />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ============================================================================
   TAB 1: CORE VIEW (Neural Core Performance)
   ============================================================================ */
function CoreView() {
  const [pulse, setPulse] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col justify-between h-full">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">MODULE_01 // CPU_ACCELERATION</span>
          <h3 className="text-lg md:text-xl font-syne font-bold text-white mt-1">Local Neural Engine</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-[9px] font-mono text-green-400">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          ACTIVE
        </div>
      </div>

      {/* Main Stats Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-left">
          <div className="text-[10px] text-white/30">MODEL WEIGHTS</div>
          <div className="text-xs md:text-sm font-semibold text-white mt-1 truncate">Llama-3.1-8B-Q4</div>
          <div className="text-[9px] text-cyan-400 mt-1">100% VRAM Loaded</div>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-left">
          <div className="text-[10px] text-white/30">FIRST TOKEN</div>
          <div className="text-sm md:text-base font-semibold text-white mt-1">12 ms</div>
          <div className="text-[9px] text-cyan-400 mt-1">Zero Cloud Latency</div>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-left">
          <div className="text-[10px] text-white/30">GENERATION SPEED</div>
          <div className="text-sm md:text-base font-semibold text-white mt-1">58.2 t/s</div>
          <div className="text-[9px] text-green-400 mt-1">Metal/CUDA Accelerated</div>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-left">
          <div className="text-[10px] text-white/30">ENCRYPTION KEY</div>
          <div className="text-sm md:text-base font-semibold text-white mt-1">AES-256</div>
          <div className="text-[9px] text-green-400 mt-1">Stored Native Vault</div>
        </div>
      </div>

      {/* Visual Neural Engine Pulse */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 py-2">
        {/* Core Animation */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
          {/* Pulsing Outer Ring */}
          <motion.div 
            animate={{ scale: pulse ? 1.08 : 0.96, opacity: pulse ? 0.3 : 0.15 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-cyan-400/40 blur-[4px]"
          />
          {/* Inner Glow */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/10 blur-xl animate-pulse" />
          {/* Rotating Synapse Dots */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border border-dashed border-white/10 rounded-full"
          />
          
          {/* Neural Center */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-zinc-950 border border-white/10 flex flex-col items-center justify-center">
            <Cpu className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-[7px] font-mono text-cyan-400 mt-1">ACCEL</span>
          </div>
        </div>

        {/* System Logs */}
        <div className="flex-1 w-full p-3 rounded-xl border border-white/5 bg-black/60 font-mono text-[9px] md:text-[10px] space-y-1.5 text-left h-28 overflow-y-auto">
          <p className="text-white/30 font-semibold uppercase tracking-wider mb-1">SYSTEM_CORE_LOGS:</p>
          <p className="text-white/40"><span className="text-cyan-400">{">"}</span> Checking local GPU accelerator: NVIDIA CUDA detected</p>
          <p className="text-white/40"><span className="text-cyan-400">{">"}</span> Initializing model weights into VRAM...</p>
          <p className="text-green-400"><span className="text-white/20">{">"}</span> System integrity verified. Memory leak scan: 0 errors</p>
          <p className="text-cyan-400 animate-pulse"><span className="text-white/20">{">"}</span> Waiting for local socket connection...</p>
        </div>
      </div>

      {/* GPU and Memory meters */}
      <div className="space-y-2 border-t border-white/5 pt-3">
        <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>VRAM ALLOCATION</span>
          </div>
          <span>5.8 GB / 8.0 GB (72%)</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="w-[72%] h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 2: WHATSAPP VIEW (Encrypted Chat Automation)
   ============================================================================ */
function WhatsAppView() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Product Lead", text: "Hey team, did we review the new legal indemnity document?", time: "10:41 AM" },
    { id: 2, sender: "You", text: "Working on it now. Fetching from desktop via RAG.", time: "10:41 AM" }
  ]);
  const [showReply, setShowReply] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setTyping(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        { id: 3, sender: "Product Lead", text: "Cool, please summarize the main issues so we can sign it by 3 PM.", time: "10:42 AM" }
      ]);
    }, 3500);

    const timer3 = setTimeout(() => {
      setShowReply(true);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col justify-between h-full">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-green-400 tracking-wider">MODULE_02 // LOCAL_SESSION_MIRROR</span>
          <h3 className="text-lg md:text-xl font-syne font-bold text-white mt-1">WhatsApp Node</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-[9px] font-mono text-green-400">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          CONNECTED
        </div>
      </div>

      {/* WhatsApp Double Panel Mockup */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 my-2 overflow-hidden">
        {/* Panel 1: Chat Stream */}
        <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between h-48 md:h-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-[10px] font-mono text-white/30">
            <span>THREAD: PROD-DEVS</span>
            <span>3 MEMBER SESSION</span>
          </div>
          
          {/* Scrollable chat body */}
          <div className="flex-1 overflow-y-auto space-y-2 text-left pr-1 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className="text-[11px] font-manrope">
                <span className={`font-bold ${msg.sender === "You" ? "text-cyan-400" : "text-green-400"}`}>
                  {msg.sender}:{" "}
                </span>
                <span className="text-white/80">{msg.text}</span>
                <span className="text-[9px] text-white/20 ml-2">{msg.time}</span>
              </div>
            ))}
            
            {typing && (
              <div className="text-[11px] font-mono text-white/30 animate-pulse">
                Product Lead is typing...
              </div>
            )}
          </div>
        </div>

        {/* Panel 2: Agent Autopilot Execution */}
        <div className="rounded-xl border border-green-500/10 bg-green-500/[0.01] p-3 flex flex-col justify-between text-left h-48 md:h-auto">
          <div className="flex justify-between items-center text-[10px] font-mono text-green-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              NEURAL AGENT SCAN
            </span>
            <span>SECURE PROXY</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-2 my-2">
            <div className="text-[10px] font-mono text-white/40">AUTOMATION DRAFT GENERATED:</div>
            
            <AnimatePresence>
              {showReply ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-2.5 rounded-lg border border-white/5 bg-black/60 font-mono text-[10px] text-white/80 leading-relaxed"
                >
                  <span className="text-cyan-400">Draft response:</span> "Hey! I ran a local check on legal_indemnity_final.pdf. Found 2 issues in Clause 4.2: 1) Indemnity cap is uncapped. 2) Governing law is set to NY state (should be Delaware). Draft request to revise is ready."
                </motion.div>
              ) : (
                <div className="h-16 flex items-center justify-center font-mono text-[10px] text-white/20 italic">
                  Waiting for trigger...
                </div>
              )}
            </AnimatePresence>
          </div>

          <button className={`w-full py-2 rounded-lg font-mono text-[10px] font-bold transition-all flex items-center justify-center gap-2 ${
            showReply 
              ? "bg-green-500 hover:bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.2)]" 
              : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
          }`}>
            <span>DISPATCH TO WHATSAPP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info strip */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
        <Shield className="w-3.5 h-3.5 text-green-400" />
        <span>WhatsApp authentication mirror runs locally. Credentials are zero-knowledge encrypted.</span>
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 3: EMAIL VIEW (Neural Inbox & Calendar resolution)
   ============================================================================ */
function EmailView() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 5500)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col justify-between h-full">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-purple-400 tracking-wider">MODULE_03 // IMAP_SMTP_AGENT</span>
          <h3 className="text-lg md:text-xl font-syne font-bold text-white mt-1">Neural Inbox & Scheduler</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-purple-500/20 bg-purple-500/5 text-[9px] font-mono text-purple-400">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          STANDBY
        </div>
      </div>

      {/* Inbox interface mockup */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 my-1 overflow-hidden">
        {/* Left Side: Email header list */}
        <div className="md:col-span-5 rounded-xl border border-white/5 bg-zinc-950/60 p-3 space-y-2 text-left h-24 md:h-auto overflow-y-auto">
          <div className="text-[9px] font-mono text-white/20 tracking-wider uppercase mb-1">LOCAL_IMAP_QUEUE:</div>
          <div className="p-2 rounded bg-white/5 border border-white/10 font-manrope">
            <div className="flex justify-between text-[9px] font-bold text-white">
              <span>John Doe</span>
              <span className="text-purple-400 font-mono">NEW</span>
            </div>
            <div className="text-[10px] text-white/80 font-bold truncate mt-0.5">Quick sync today at 2 PM?</div>
            <div className="text-[9px] text-white/40 truncate mt-0.5">Hey, let's catch up and finalize details...</div>
          </div>
          <div className="p-2 rounded bg-black/40 opacity-40 font-manrope">
            <div className="flex justify-between text-[9px] text-white/80">
              <span>Shopify Billing</span>
              <span>YESTERDAY</span>
            </div>
            <div className="text-[10px] text-white/60 truncate mt-0.5">Invoice #8827 paid</div>
          </div>
        </div>

        {/* Right Side: Agent processing steps */}
        <div className="md:col-span-7 rounded-xl border border-white/5 bg-black/60 p-3 flex flex-col justify-between text-left h-44 md:h-auto">
          <div className="text-[10px] font-mono text-white/30 flex justify-between">
            <span>RESOLVER_BOT // SECURE</span>
            <span className="text-purple-400 font-bold">100% PRIVATE</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-2 my-2 font-mono text-[10px] md:text-[11px]">
            {step >= 0 && (
              <p className="text-white/60">
                <span className="text-purple-400">►</span> Scanning email payload: <span className="text-cyan-400">Sync request at 2:00 PM</span>
              </p>
            )}
            {step >= 1 && (
              <p className="text-white/60">
                <span className="text-purple-400">►</span> Querying database... Calendar conflict: <span className="text-red-400">Team Standup (2:00 PM - 2:30 PM)</span>
              </p>
            )}
            {step >= 2 && (
              <div className="p-2 rounded border border-white/5 bg-zinc-950 text-[9px] leading-relaxed text-white/80">
                <span className="text-purple-400 font-bold">Draft SMTP reply:</span><br/>
                "Hi John, I have a conflict at 2 PM (Team Standup). Can we push the sync to 3 PM? Let me know if that works."
              </div>
            )}
          </div>

          <button className={`w-full py-2 rounded-lg font-mono text-[10px] font-bold transition-all flex items-center justify-center gap-2 ${
            step >= 2 
              ? "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(160,32,240,0.2)]" 
              : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
          }`}>
            <span>EXECUTE SECURE REPLY</span>
            <CheckCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Encryption strip */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
        <Lock className="w-3.5 h-3.5 text-purple-400" />
        <span>Local SMTP pipeline queue. Sent messages are signed locally using your PGP key.</span>
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 4: RAG VIEW (Sovereign RAG PDF Indexing)
   ============================================================================ */
function RAGView() {
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [answer, setAnswer] = useState("");

  const triggerUpload = () => {
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    setAnswer("");
    
    // Simulate parsing progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Simulated search answer
            setAnswer("Local Query Answer: For Q2 2026, the company's EBITDA margins expanded to 34.2%, matching projection rates.");
            setUploading(false);
          }, 800);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col justify-between h-full">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-amber-400 tracking-wider">MODULE_04 // HNSW_VECTOR_DATABASE</span>
          <h3 className="text-lg md:text-xl font-syne font-bold text-white mt-1">Sovereign RAG Database</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/5 text-[9px] font-mono text-amber-400">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          HNSWLIB_READY
        </div>
      </div>

      {/* RAG content window */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 my-2 overflow-hidden">
        {/* Left Side: Upload zone */}
        <div className="md:col-span-5 rounded-xl border border-dashed border-white/10 hover:border-amber-400/40 bg-zinc-950/60 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 h-32 md:h-auto"
          onClick={triggerUpload}
        >
          {uploading ? (
            <div className="space-y-3 w-full font-mono text-[10px]">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-white/60">Vectorizing: Q2_Financials.pdf</p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <FileUp className="w-8 h-8 text-white/30 mx-auto" />
              <div className="text-[11px] font-syne font-bold text-white">Click to drop private documents</div>
              <div className="text-[9px] font-mono text-white/30 uppercase">PDF, TXT, DOCX, CSV</div>
            </div>
          )}
        </div>

        {/* Right Side: Similarity Vector Results */}
        <div className="md:col-span-7 rounded-xl border border-white/5 bg-black/60 p-3 flex flex-col justify-between text-left h-44 md:h-auto">
          <div className="flex justify-between items-center text-[10px] font-mono text-amber-400">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              VECTOR RETRIEVAL VIEW
            </span>
            <span>3 CHUNKS GENERATED</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-2 my-2 font-mono text-[9px] md:text-[10px]">
            {uploading && (
              <p className="text-white/30 italic">Tokenizing text nodes into 768-dim embeddings...</p>
            )}
            
            {!uploading && !answer && (
              <p className="text-white/20 italic">No query executed. Click document box on the left to simulate a document ingestion and semantic query.</p>
            )}

            {answer && (
              <>
                <div className="flex items-center gap-2 border-b border-white/5 pb-1 text-white/30">
                  <Search className="w-3 h-3 text-amber-400" />
                  <span>Query: "What is our Q2 margin projection?"</span>
                </div>
                <div className="space-y-1.5 text-white/60">
                  <p className="text-[9px] text-green-400/80"><span className="text-white/30 font-bold">Node 1 (Score: 0.94):</span> "...Q2 EBITDA margin projected to hit 34.2%..."</p>
                  <p className="p-2 rounded bg-zinc-950 text-white/80 border border-amber-500/20 text-[10px] leading-relaxed">
                    {answer}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-white/20 border-t border-white/5 pt-2">
            <span>INDEX SIZE: 124 VECTORS</span>
            <span>RETRIEVAL SPEED: 11ms</span>
          </div>
        </div>
      </div>

      {/* Safety message */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
        <Lock className="w-3.5 h-3.5 text-amber-400" />
        <span>RAG embeddings are calculated completely offline using native CPU SIMD instructions.</span>
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 5: VOICE VIEW (Whisper STT / Piper TTS Waveform)
   ============================================================================ */
function VoiceView() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    setRecording(true);
    const timer1 = setTimeout(() => {
      setRecording(false);
      setTranscript("User: Read the unread WhatsApp messages.");
    }, 2500);

    const timer2 = setTimeout(() => {
      setReply("Agent: You have one new message from Product Lead: 'Finalize the review by 3 PM'.");
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col justify-between h-full">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">MODULE_05 // WHISPER_PIPER_VOICE_LAYER</span>
          <h3 className="text-lg md:text-xl font-syne font-bold text-white mt-1">Shadow Voice Protocol</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/5 text-[9px] font-mono text-cyan-400">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          LISTENING_PORT
        </div>
      </div>

      {/* Audio Waveforms and speech feedback */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 items-center justify-center my-2">
        {/* Waveform graphic */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-zinc-950/60 h-28 md:h-36">
          <div className="flex items-center gap-1 h-10">
            {/* Animated bouncing bars represent waveform */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => {
              const animDur = 0.5 + Math.random() * 0.8;
              const heightMultiplier = Math.random() * 1.5;
              return (
                <div
                  key={bar}
                  className="w-1 rounded-full bg-cyan-400"
                  style={{
                    height: recording ? "32px" : "4px",
                    animation: recording ? `bounceVoice ${animDur}s ease-in-out infinite alternate` : "none",
                    opacity: recording ? 0.8 : 0.3
                  }}
                />
              );
            })}
          </div>
          <span className="text-[9px] font-mono text-white/30 uppercase mt-4">
            {recording ? "WHISPER_STT_ACTIVE" : "STANDBY"}
          </span>
        </div>

        {/* Real-time transcript bubbles */}
        <div className="flex-1 w-full p-4 rounded-xl border border-white/5 bg-black/60 font-mono text-[10px] md:text-[11px] text-left flex flex-col justify-center gap-3 h-28 md:h-36 overflow-y-auto">
          {transcript ? (
            <div className="space-y-2">
              <p className="text-white/60">
                <span className="text-cyan-400 font-bold">STT:</span> "{transcript}"
              </p>
              
              {reply ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400"
                >
                  <span className="text-white/40 font-bold">TTS:</span> "{reply}"
                </motion.p>
              ) : (
                <span className="text-white/20 italic animate-pulse">Synthesizing audio response locally...</span>
              )}
            </div>
          ) : (
            <div className="text-center text-white/20 italic">
              Speak to start recording...
            </div>
          )}
        </div>
      </div>

      {/* Waveform Keyframe styles injection for local scope usage */}
      <style jsx global>{`
        @keyframes bounceVoice {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.3); }
        }
      `}</style>

      {/* Latency statistics */}
      <div className="flex items-center justify-between text-[10px] font-mono text-white/20 border-t border-white/5 pt-3">
        <span className="flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          STT LATENCY: 85ms
        </span>
        <span>TTS SPEED: 1.2x (REAL-TIME)</span>
      </div>
    </div>
  );
}
