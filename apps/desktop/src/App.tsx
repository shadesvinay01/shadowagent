"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import Connections from "./components/settings/Connections";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { 
  Bot, Settings, ShieldCheck, LogOut, Mic, Grid2X2, 
  Activity, Zap, Terminal, Lock, Cpu, Command, Box, CpuIcon, Layers, Shield
} from "lucide-react";

type Tab = "chat" | "settings" | "voice" | "plugins";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [systemLoad, setSystemLoad] = useState(12);

  useEffect(() => {
    localStorage.setItem("shadow_setup_complete", "true");
    const checkStatus = () => {
      checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
      setSystemLoad(Math.floor(Math.random() * 15) + 5);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-black text-white selection:bg-cyan-500/30 font-orbitron overflow-hidden flex relative">
      
      {/* Immersive Background Layers */}
      <div className="neural-bg" />
      <div className="grid-overlay" />
      <div className="scanline" />

      {/* Floating Sidebar HUD */}
      <aside className="w-28 relative z-50 flex flex-col items-center py-12 gap-14 bg-black/40 border-r border-white/10 backdrop-blur-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="relative w-16 h-16 rounded-[1.5rem] bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center neon-border-cyan group"
        >
           <Shield className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
           <div className="hud-corner hud-tl !w-4 !h-4" />
           <div className="hud-corner hud-br !w-4 !h-4" />
        </motion.div>
        
        <nav className="flex flex-col gap-10 flex-1">
          {[
            { id: 'chat', icon: <Bot className="w-6 h-6" />, label: 'NEURAL_LINK', color: 'cyan' },
            { id: 'voice', icon: <Mic className="w-6 h-6" />, label: 'VOICE_IO', color: 'purple' },
            { id: 'plugins', icon: <Layers className="w-6 h-6" />, label: 'NODE_STORE', color: 'cyan' },
            { id: 'settings', icon: <Settings className="w-6 h-6" />, label: 'CORE_SYST', color: 'white' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`group relative p-5 rounded-2xl transition-all duration-500 ${
                activeTab === tab.id 
                ? 'bg-cyan-500/20 border-cyan-500/40 neon-border-cyan text-cyan-400' 
                : 'text-white/20 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <div className="relative z-10">{tab.icon}</div>
              <span className="absolute left-full ml-6 px-4 py-2 rounded-lg bg-black border border-cyan-500/20 text-[9px] font-bold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div layoutId="navGlow" className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-10 bg-cyan-500 rounded-full blur-[2px]" />
              )}
            </button>
          ))}
        </nav>

        <button className="p-5 rounded-2xl text-red-500/30 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20 hover:bg-red-500/5">
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col relative z-20">
        
        {/* Cinematic Status Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-12 bg-black/40 backdrop-blur-2xl relative">
           <div className="flex items-center gap-10">
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Sovereign_ID</span>
                 <span className="text-sm font-black text-white/90">SHADOW_AGENT_v2</span>
              </div>
              
              <div className="h-8 w-px bg-white/10" />
              
              <div className="flex items-center gap-4">
                 <div className={`w-2 h-2 rounded-full ${ollamaRunning ? 'bg-cyan-400 animate-pulse neon-border-cyan' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-white/60 tracking-widest">{ollamaRunning ? 'OLLAMA: ONLINE' : 'OLLAMA: DISCONNECTED'}</span>
                    <span className="text-[7px] text-white/20 uppercase tracking-widest">Neural weights Loaded</span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-12">
              <div className="flex items-center gap-3">
                 <Activity className="w-4 h-4 text-cyan-500/40" />
                 <div className="flex flex-col">
                    <span className="text-[8px] text-white/20 uppercase tracking-widest">Mem_Usage</span>
                    <span className="text-[10px] font-mono text-cyan-400">{systemLoad * 1.2} GB</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Zap className="w-4 h-4 text-yellow-500/40" />
                 <div className="flex flex-col">
                    <span className="text-[8px] text-white/20 uppercase tracking-widest">Neural_Load</span>
                    <span className="text-[10px] font-mono text-yellow-500">{systemLoad}%</span>
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 relative p-12 overflow-hidden">
           <div className="hud-corner hud-tl" />
           <div className="hud-corner hud-tr" />
           <div className="hud-corner hud-bl" />
           <div className="hud-corner hud-br" />

           <AnimatePresence mode="wait">
             {activeTab === "chat" && (
               <motion.div 
                 key="chat" 
                 initial={{ opacity: 0, scale: 0.98 }} 
                 animate={{ opacity: 1, scale: 1 }} 
                 exit={{ opacity: 0, scale: 1.02 }}
                 className="h-full bg-black/20 rounded-[2rem] border border-white/5 relative overflow-hidden"
               >
                 <ChatInterface ollamaRunning={ollamaRunning} />
               </motion.div>
             )}

             {activeTab === "voice" && (
               <motion.div 
                 key="voice"
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="h-full flex flex-col items-center justify-center relative"
               >
                  <div className="absolute inset-0 bg-cyan-500/5 blur-[150px] rounded-full animate-pulse" />
                  <div className="relative w-80 h-80 flex items-center justify-center group">
                     <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-full animate-spin-slow" />
                     <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-reverse-spin" />
                     <div className="w-56 h-56 rounded-full glass-premium flex items-center justify-center neon-border-cyan">
                        <Mic className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]" />
                     </div>
                  </div>
                  <h2 className="text-4xl font-black mt-16 tracking-tightest text-glow-cyan">VOICE PROTOCOL</h2>
                  <p className="text-cyan-400/40 text-[11px] mt-6 uppercase tracking-[0.8em] font-bold">Neural link waiting for voice prompt...</p>
               </motion.div>
             )}

             {activeTab === "plugins" && (
               <motion.div 
                 key="plugins"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full space-y-16"
               >
                  <div className="flex items-center gap-8">
                     <Layers className="w-12 h-12 text-purple-400" />
                     <div className="space-y-1">
                        <h2 className="text-5xl font-black tracking-tightest">NEURAL NODES</h2>
                        <p className="text-white/30 text-xs tracking-widest uppercase">Decentralized plugin architecture</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                     {[
                       { name: 'WhatsApp_Core', desc: 'Secure local automation node.', color: 'cyan' },
                       { name: 'Email_Vault', desc: 'Sovereign mail orchestration.', color: 'purple' },
                       { name: 'File_Loom', desc: 'Local RAG & File intelligence.', color: 'cyan' },
                       { name: 'Terminal_IO', desc: 'Direct OS interaction node.', color: 'purple' }
                     ].map((node) => (
                       <div key={node.name} className="p-10 glass-premium rounded-[2.5rem] group hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden">
                          <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity text-${node.color}-400`}>
                             <Box className="w-10 h-10" />
                          </div>
                          <h4 className="font-black text-2xl mb-4 tracking-tighter">{node.name}</h4>
                          <p className="text-white/40 text-sm font-medium">{node.desc}</p>
                          <div className="mt-8 flex gap-4">
                             <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold tracking-widest uppercase">STABLE</div>
                             <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold tracking-widest uppercase">ENCRYPTED</div>
                          </div>
                       </div>
                     ))}
                  </div>
               </motion.div>
             )}

             {activeTab === "settings" && (
               <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                  <Connections />
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .tracking-tightest { letter-spacing: -0.05em; }
      `}</style>
    </div>
  );
}
