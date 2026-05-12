"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import NeuralCore from "./components/canvas/NeuralCore";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { 
  Bot, Settings, ShieldCheck, LogOut, Mic, Grid2X2, 
  Activity, Zap, Terminal, Lock, Cpu, Command, Shield, 
  ChevronRight, Brain, Globe, Binary
} from "lucide-react";

type Tab = "chat" | "settings" | "voice" | "plugins";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [ollamaRunning, setOllamaRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("shadow_setup_complete", "true");
    const interval = setInterval(() => {
      checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-black text-white font-orbitron overflow-hidden flex relative selection:bg-cyan-500/30">
      
      {/* Ultra Cinematic Background Layers */}
      <NeuralCore />
      <div className="cinematic-vignette" />
      <div className="grain-overlay" />
      <div className="scanline-move" />
      <div className="bg-text top-[-2rem] left-[-2rem]">SHADOW</div>
      <div className="bg-text bottom-[-2rem] right-[-2rem] opacity-[0.01]">CORE_v2</div>

      {/* Floating Orbital Navigation */}
      <nav className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-[100]">
        {[
          { id: 'chat', icon: <Bot className="w-6 h-6" />, label: 'NEURAL_LINK' },
          { id: 'voice', icon: <Mic className="w-6 h-6" />, label: 'AUDIO_CORE' },
          { id: 'plugins', icon: <Binary className="w-6 h-6" />, label: 'NODE_GRID' },
          { id: 'settings', icon: <Settings className="w-6 h-6" />, label: 'SYSTEM' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 border ${
              activeTab === tab.id 
              ? 'bg-cyan-500/20 border-cyan-400 glow-cyan shadow-[0_0_30px_rgba(0,240,255,0.2)]' 
              : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
            }`}
          >
            <div className="relative z-10">{tab.icon}</div>
            
            {/* Hover Label */}
            <span className="absolute left-full ml-8 px-4 py-2 rounded bg-black/80 border border-cyan-500/20 text-[8px] font-bold tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
               {tab.label}
            </span>

            {/* Active Indicator Pulse */}
            {activeTab === tab.id && (
              <div className="absolute inset-[-10px] border border-cyan-500/20 rounded-full animate-ping opacity-20" />
            )}
          </button>
        ))}
      </nav>

      {/* Main UI Layout */}
      <div className="flex-1 flex flex-col relative z-50">
        
        {/* Top Telemetry Strip */}
        <header className="h-20 px-12 flex items-center justify-between pointer-events-none">
           <div className="flex items-center gap-12">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400">STATUS_REPORT</span>
                 <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${ollamaRunning ? 'bg-cyan-500 animate-pulse' : 'bg-red-600'}`} />
                    <span className="text-[8px] font-mono text-white/30 tracking-widest">{ollamaRunning ? 'ENGINE_ONLINE' : 'CRITICAL_OFFLINE'}</span>
                 </div>
              </div>
              
              <div className="flex flex-col">
                 <span className="text-[10px] font-black tracking-[0.4em] text-white/20">SOVEREIGNTY</span>
                 <span className="text-[8px] font-mono text-white/60 tracking-widest">100% LOCAL // ENCRYPTED</span>
              </div>
           </div>

           <div className="flex items-center gap-6 pointer-events-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                 <Shield className="w-6 h-6 text-white/40" />
              </div>
              <LogoMark size={40} />
           </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 flex">
           
           {/* Left Spacing (Navigation Area) */}
           <div className="w-32" />

           {/* Main Content Area */}
           <div className="flex-1 relative flex">
              <AnimatePresence mode="wait">
                 {activeTab === "chat" && (
                   <motion.div 
                     key="chat" 
                     initial={{ opacity: 0, x: -50 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     exit={{ opacity: 0, x: 50 }}
                     className="flex-1 max-w-4xl h-[85vh] my-auto ml-10 glass-ultra rounded-[3rem] relative overflow-hidden"
                   >
                      <div className="hud-corner hud-tl" />
                      <div className="hud-corner hud-tr" />
                      <div className="hud-corner hud-bl" />
                      <div className="hud-corner hud-br" />
                      <ChatInterface ollamaRunning={ollamaRunning} />
                   </motion.div>
                 )}

                 {activeTab !== "chat" && (
                    <motion.div 
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex items-center justify-center"
                    >
                       <div className="text-center space-y-4">
                          <Brain className="w-20 h-20 text-cyan-500 mx-auto animate-pulse" />
                          <h2 className="text-3xl font-black tracking-widest text-glow-cyan uppercase">{activeTab}</h2>
                          <p className="text-[10px] text-white/20 tracking-[0.5em] uppercase">Initializing Neural Matrix...</p>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>

           {/* Right Dashboard Sidebar */}
           <div className="w-96 p-12 space-y-12 bg-gradient-to-l from-black/40 to-transparent backdrop-blur-sm border-l border-white/5">
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase underline underline-offset-8">Neural_Activity</h4>
                 <div className="space-y-4">
                    {[
                      { l: 'Mem_Load', v: '14.2 GB' },
                      { l: 'GPU_Temp', v: '42°C' },
                      { l: 'Neural_Rate', v: '48 t/s' }
                    ].map(stat => (
                      <div key={stat.l} className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="text-[9px] font-mono text-white/20 uppercase">{stat.l}</span>
                         <span className="text-[10px] font-mono text-cyan-400">{stat.v}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase underline underline-offset-8">Recent_Nodes</h4>
                 <div className="grid grid-cols-1 gap-4">
                    {['WhatsApp_Sync', 'Email_Agent', 'File_Scanner'].map(node => (
                      <div key={node} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-all cursor-pointer">
                         <span className="text-[10px] font-bold text-white/50 group-hover:text-cyan-400 transition-colors uppercase">{node}</span>
                         <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-cyan-400" />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-20">
                 <div className="p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-center space-y-4">
                    <Activity className="w-8 h-8 text-cyan-400 mx-auto" />
                    <p className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-widest leading-loose">
                       All systems operational.<br />
                       Encrypted link secure.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom OS Bar */}
        <footer className="h-12 border-t border-white/5 flex items-center px-12 justify-between pointer-events-none opacity-20">
           <div className="text-[8px] font-mono tracking-[0.5em] uppercase">SHADOW_AGENT // KERNEL_v.2.0.1</div>
           <div className="text-[8px] font-mono tracking-[0.5em] uppercase">05:42:11 UTC</div>
        </footer>
      </div>
    </div>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
      <div className="relative w-full h-full rounded-xl border border-white/20 flex items-center justify-center bg-black">
         <div className="w-1/2 h-1/2 bg-cyan-500 rounded-sm rotate-45" />
      </div>
    </div>
  );
}
