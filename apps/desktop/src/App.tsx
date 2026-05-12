"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import NeuralCore from "./components/canvas/NeuralCore";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { 
  Bot, Settings, ShieldCheck, LogOut, Mic, Grid2X2, 
  Activity, Zap, Terminal, Lock, Cpu, Command, Shield, 
  ChevronRight, Brain, Globe, Binary, Search, Plus, Bell
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
    <div className="h-screen bg-[#020202] text-[#f5f5f7] font-sans overflow-hidden flex relative selection:bg-blue-500/30">
      
      {/* Sophisticated Ambient Background */}
      <NeuralCore />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

      {/* Modern Sidebar (Apple/Linear Style) */}
      <aside className="w-[280px] border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-3xl z-50">
        
        {/* Workspace Branding */}
        <div className="h-20 px-8 flex items-center gap-4">
           <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
           </div>
           <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">ShadowAgent</span>
              <span className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Sovereign Studio</span>
           </div>
        </div>

        {/* Global Search Mockup */}
        <div className="px-6 mb-8">
           <div className="h-10 px-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 group hover:bg-white/10 transition-all cursor-text">
              <Search className="w-4 h-4 text-white/20 group-hover:text-white/40" />
              <span className="text-xs text-white/20 font-medium">Search neural nodes...</span>
              <div className="ml-auto px-1.5 py-0.5 rounded border border-white/10 text-[8px] font-bold text-white/10 uppercase">⌘K</div>
           </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'chat', icon: <Bot className="w-4 h-4" />, label: 'Neural Chat' },
            { id: 'voice', icon: <Mic className="w-4 h-4" />, label: 'Voice Protocol' },
            { id: 'plugins', icon: <Binary className="w-4 h-4" />, label: 'Marketplace' },
            { id: 'settings', icon: <Settings className="w-4 h-4" />, label: 'Preferences' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                activeTab === tab.id 
                ? 'bg-white/10 text-white inner-shadow' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="text-xs font-semibold">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="activeNav" className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Quick Stats */}
        <div className="p-6 border-t border-white/5 space-y-6">
           <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                 <span>Neural Load</span>
                 <span className="text-blue-400">12%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} animate={{ width: '12%' }} className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
           </div>

           <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Core Secured</span>
           </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col relative z-20">
        
        {/* Clean Global Header */}
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md">
           <div className="flex items-center gap-6">
              <h2 className="text-lg font-bold tracking-tight text-white/90 capitalize">{activeTab.replace('_', ' ')}</h2>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                 <span className="text-[9px] font-bold text-blue-400/80 uppercase tracking-widest">Main Branch // LTS</span>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                 <Bell className="w-4 h-4 text-white/40" />
              </button>
              <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-xl bg-white text-black font-bold text-[11px] hover:bg-white/90 transition-all shadow-lg shadow-white/5">
                 <Plus className="w-4 h-4" />
                 Deploy Node
              </button>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
           <AnimatePresence mode="wait">
             {activeTab === "chat" && (
               <motion.div 
                 key="chat" 
                 initial={{ opacity: 0, y: 10 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 exit={{ opacity: 0, y: -10 }}
                 className="flex-1"
               >
                 <ChatInterface ollamaRunning={ollamaRunning} />
               </motion.div>
             )}

             {activeTab !== "chat" && (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex items-center justify-center p-20"
                >
                   <div className="max-w-md w-full glass-card p-12 text-center space-y-8 animate-float">
                      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                         <Activity className="w-10 h-10 text-white/20" />
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-2xl font-bold tracking-tight uppercase tracking-widest">{activeTab} Interface</h3>
                         <p className="text-sm text-white/30 leading-relaxed font-medium">Initialising the sovereign neural workspace. This process happens entirely on your machine.</p>
                      </div>
                      <div className="flex justify-center gap-2">
                         {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse" />)}
                      </div>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
      <div className="relative w-full h-full rounded-xl border border-white/20 flex items-center justify-center bg-black">
         <div className="w-1/2 h-1/2 bg-white rounded-sm rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
      </div>
    </div>
  );
}
