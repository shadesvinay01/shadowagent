"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import OnboardingWizard from "./components/onboarding/OnboardingWizard";
import Connections from "./components/settings/Connections";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { Bot, Settings, ShieldCheck, LogOut, Mic, Grid2X2, Activity } from "lucide-react";

type Tab = "chat" | "settings" | "voice" | "plugins";

export default function App() {
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [ollamaRunning, setOllamaRunning] = useState(false);

  useEffect(() => {
    const isSetup = localStorage.getItem("shadow_setup_complete") === "true";
    setSetupComplete(isSetup);

    checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
    const interval = setInterval(() => {
      checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (setupComplete === null) return null;

  return (
    <div className="h-screen bg-[#020204] text-white selection:bg-cyan-500/20 font-space overflow-hidden flex relative">
      
      {/* Cinematic Overlays */}
      <div className="scanline-overlay" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!setupComplete ? (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full relative z-10">
            <OnboardingWizard onComplete={() => setSetupComplete(true)} />
          </motion.div>
        ) : (
          <div className="flex w-full h-full relative z-10">
            
            {/* HUD Navigation */}
            <aside className="w-24 border-r border-white/10 flex flex-col items-center py-10 gap-12 bg-black/40 backdrop-blur-3xl relative">
              <div className="hud-tl" />
              <div className="hud-bl" />
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.1)] cursor-pointer"
              >
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
              </motion.div>
              
              <nav className="flex flex-col gap-8 flex-1">
                {[
                  { id: 'chat', icon: <Bot className="w-6 h-6" />, label: 'Neural Chat' },
                  { id: 'voice', icon: <Mic className="w-6 h-6" />, label: 'Voice Protocol' },
                  { id: 'plugins', icon: <Grid2X2 className="w-6 h-6" />, label: 'Neural Nodes' },
                  { id: 'settings', icon: <Settings className="w-6 h-6" />, label: 'Core Config' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`group relative p-4 rounded-2xl transition-all ${
                      activeTab === tab.id 
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.1)] border border-cyan-500/30' 
                      : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    {tab.icon}
                    <span className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </nav>

              <button className="p-4 rounded-2xl text-red-500/40 hover:text-red-500 transition-all hover:bg-red-500/10">
                <LogOut className="w-6 h-6" />
              </button>
            </aside>

            {/* Main Viewport */}
            <main className="flex-1 overflow-hidden relative flex flex-col bg-gradient-to-br from-transparent to-cyan-500/5">
              <div className="hud-tr" />
              <div className="hud-br" />

              <AnimatePresence mode="wait">
                {activeTab === "chat" && (
                  <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                    <ChatInterface ollamaRunning={ollamaRunning} />
                  </motion.div>
                )}
                {activeTab === "voice" && (
                  <motion.div key="voice" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="h-full flex flex-col items-center justify-center space-y-12">
                    <div className="relative group">
                       <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
                       <div className="w-40 h-40 rounded-full bg-black/60 border border-cyan-500/30 flex items-center justify-center relative z-10">
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-24 h-24 rounded-full border border-cyan-500/20 flex items-center justify-center"
                          >
                             <Mic className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                          </motion.div>
                       </div>
                    </div>
                    <div className="text-center space-y-3">
                       <h3 className="text-3xl font-syne font-bold tracking-tight">Shadow Voice Protocol</h3>
                       <p className="text-cyan-400/60 font-mono text-[10px] uppercase tracking-[0.4em]">Listening for encrypted whisper input...</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === "plugins" && (
                  <motion.div key="plugins" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full p-16 overflow-y-auto">
                    <div className="flex items-center gap-4 mb-12">
                       <Grid2X2 className="w-8 h-8 text-purple-400" />
                       <h3 className="text-4xl font-syne font-bold tracking-tight">Neural Node Marketplace</h3>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                       {[
                         { name: 'WhatsApp Orchestrator', desc: 'Full local automation for messaging flows.', tags: ['MESSAGING', 'LOCAL'] },
                         { name: 'Email Shadow', desc: 'Secure local drafting and summarization engine.', tags: ['PRODUCTIVITY', 'ENCRYPTED'] },
                         { name: 'Discord Intelligence', desc: 'Analyze server context without cloud leak.', tags: ['COMMUNITY', 'AI'] },
                         { name: 'System RAG Node', desc: 'Vector search across all local documents.', tags: ['FILES', 'CORE'] }
                       ].map((plugin) => (
                         <div key={plugin.name} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 hover:bg-white/[0.04] hover:border-purple-500/40 transition-all cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                               <ArrowUpRight className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="space-y-2">
                               <h4 className="text-xl font-bold">{plugin.name}</h4>
                               <p className="text-sm text-white/50 leading-relaxed">{plugin.desc}</p>
                            </div>
                            <div className="flex gap-3">
                               {plugin.tags.map(tag => (
                                 <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold tracking-widest text-white/30 uppercase">
                                   {tag}
                                 </span>
                               ))}
                            </div>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
                {activeTab === "settings" && (
                  <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
                    <Connections />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Status Hub */}
              <div className="absolute top-10 right-10 flex items-center gap-6 relative z-50">
                <div className="px-5 py-2.5 rounded-2xl glass-panel border-white/10 flex items-center gap-4 group cursor-help">
                  <div className="relative">
                    <div className={`w-2.5 h-2.5 rounded-full ${ollamaRunning ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'}`} />
                    {ollamaRunning && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-white/80">
                      {ollamaRunning ? "OLLAMA_CORE: ACTIVE" : "OLLAMA_CORE: OFFLINE"}
                    </span>
                    <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em]">0ms Latency // 127.0.0.1</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hud-tl { position: absolute; top: 1rem; left: 1rem; width: 15px; height: 15px; border-top: 1px solid rgba(0, 240, 255, 0.3); border-left: 1px solid rgba(0, 240, 255, 0.3); }
        .hud-tr { position: absolute; top: 1rem; right: 1rem; width: 15px; height: 15px; border-top: 1px solid rgba(0, 240, 255, 0.3); border-right: 1px solid rgba(0, 240, 255, 0.3); }
        .hud-bl { position: absolute; bottom: 1rem; left: 1rem; width: 15px; height: 15px; border-bottom: 1px solid rgba(0, 240, 255, 0.3); border-left: 1px solid rgba(0, 240, 255, 0.3); }
        .hud-br { position: absolute; bottom: 1rem; right: 1rem; width: 15px; height: 15px; border-bottom: 1px solid rgba(0, 240, 255, 0.3); border-right: 1px solid rgba(0, 240, 255, 0.3); }
      `}</style>
    </div>
  );
}

function ArrowUpRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}
