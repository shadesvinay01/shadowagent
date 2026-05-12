"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import Connections from "./components/settings/Connections";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { 
  Bot, Settings, ShieldCheck, LogOut, Mic, Grid2X2, 
  Activity, Zap, Terminal, Lock, Cpu, Command 
} from "lucide-react";

type Tab = "chat" | "settings" | "voice" | "plugins";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [systemLoad, setSystemLoad] = useState(12);

  useEffect(() => {
    // Force setup complete for this demo session to ensure immediate access
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
    <div className="h-screen bg-[#020203] text-white selection:bg-cyan-500/30 font-space overflow-hidden flex relative border border-white/5 m-2 rounded-2xl">
      
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[size:30px_30px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />

      {/* Modern Sidebar - Floating Design */}
      <aside className="w-20 border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-black/40 backdrop-blur-3xl z-50">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
           <ShieldCheck className="w-6 h-6 text-black" />
        </div>
        
        <nav className="flex flex-col gap-6 flex-1">
          {[
            { id: 'chat', icon: <Bot className="w-5 h-5" />, color: 'text-white' },
            { id: 'voice', icon: <Mic className="w-5 h-5" />, color: 'text-cyan-400' },
            { id: 'plugins', icon: <Grid2X2 className="w-5 h-5" />, color: 'text-purple-400' },
            { id: 'settings', icon: <Settings className="w-5 h-5" />, color: 'text-white/60' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`p-4 rounded-xl transition-all duration-300 relative group ${
                activeTab === tab.id 
                ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                : 'text-white/20 hover:text-white/60'
              }`}
            >
              {tab.icon}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <button className="p-4 rounded-xl text-white/10 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-transparent via-transparent to-white/[0.01]">
        
        {/* Top Minimal Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-black/20 backdrop-blur-md z-40">
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">System Status</span>
              <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${ollamaRunning ? 'bg-cyan-500' : 'bg-red-500'}`} />
                 <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{ollamaRunning ? 'Engine_Ready' : 'Engine_Offline'}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                 <Zap className="w-3 h-3 text-yellow-500/50" />
                 <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Load: {systemLoad}%</span>
              </div>
              <div className="flex items-center gap-2">
                 <Lock className="w-3 h-3 text-cyan-500/50" />
                 <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Local_Sovereignty: 100%</span>
              </div>
           </div>
        </header>

        {/* Content Area - Optimized for Speed */}
        <div className="flex-1 relative">
           <AnimatePresence mode="wait">
             {activeTab === "chat" && (
               <motion.div 
                 key="chat" 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.2 }}
                 className="h-full"
               >
                 <ChatInterface ollamaRunning={ollamaRunning} />
               </motion.div>
             )}

             {activeTab === "voice" && (
               <motion.div 
                 key="voice"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="h-full flex flex-col items-center justify-center"
               >
                  <div className="w-64 h-64 relative flex items-center justify-center">
                     <div className="absolute inset-0 border border-white/5 rounded-full animate-ping opacity-20" />
                     <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center bg-white/[0.02]">
                        <Mic className="w-12 h-12 text-white" />
                     </div>
                  </div>
                  <h2 className="text-xl font-bold mt-10 tracking-tight">Voice Protocol</h2>
                  <p className="text-white/20 text-[10px] mt-4 uppercase tracking-[0.4em]">Initializing Local Whisper Engine...</p>
               </motion.div>
             )}

             {activeTab === "plugins" && (
               <motion.div 
                 key="plugins"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="h-full p-20 overflow-y-auto"
               >
                  <div className="max-w-4xl space-y-12">
                     <div className="space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight">Shadow Nodes</h2>
                        <p className="text-white/40 text-sm max-w-xl leading-relaxed">Expand your local agent's reach with encrypted tool-calling bridges. No cloud, just connection.</p>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-6">
                        {['WhatsApp', 'Email', 'Files', 'Terminal'].map(node => (
                          <div key={node} className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl hover:border-white/20 transition-all cursor-pointer group">
                             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                                <Cpu className="w-5 h-5" />
                             </div>
                             <h4 className="font-bold text-lg">{node} Orchestrator</h4>
                             <p className="text-[11px] text-white/30 mt-2 uppercase tracking-widest leading-loose">Deployment Ready // v.2.0.4</p>
                          </div>
                        ))}
                     </div>
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

        {/* Global Floating HUD Elements */}
        <div className="absolute bottom-6 left-6 text-[8px] font-mono text-white/10 uppercase tracking-[0.6em] z-50">
           ShadowAgent_Core_v2.1.0_LTS
        </div>
        
        <div className="absolute bottom-6 right-6 flex items-center gap-4 z-50">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-md">
              <Command className="w-2.5 h-2.5 text-white/30" />
              <span className="text-[9px] font-bold text-white/40">CMD + K</span>
           </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-syne: 'Syne', sans-serif;
          --font-space: 'Space Grotesk', sans-serif;
        }

        .font-syne { font-family: var(--font-syne); }
        .font-space { font-family: var(--font-space); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
