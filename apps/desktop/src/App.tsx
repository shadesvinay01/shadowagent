"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import OnboardingWizard from "./components/onboarding/OnboardingWizard";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { 
  MessageSquare, LayoutGrid, History, Library, Settings, 
  ChevronLeft, ChevronRight, Search, Bell, Plus, 
  Zap, Globe, Shield, User, Command, Cpu, Activity,
  Briefcase, Mail, Calendar, FileText, Share2, Terminal,
  ArrowRight, ExternalLink
} from "lucide-react";

type Tab = "chat" | "tools" | "history" | "knowledge" | "settings";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const isComplete = localStorage.getItem("shadow_onboarding_complete");
    if (isComplete) setShowOnboarding(false);

    const interval = setInterval(() => {
      checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("shadow_onboarding_complete", "true");
    setShowOnboarding(false);
  };

  return (
    <div className="h-screen w-screen flex bg-[#0A0A0A] text-white font-sans overflow-hidden relative selection:bg-cyan-500/30">
      
      <AnimatePresence>
        {showOnboarding && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[200]">
             <OnboardingWizard onComplete={handleOnboardingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="bg-glow glow-left" />
      <div className="bg-glow glow-right" />

      {/* 1. Left Sidebar (Collapsible) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="h-full border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-[100] relative"
      >
        <div className="h-20 flex items-center px-6 gap-4 overflow-hidden whitespace-nowrap">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px] flex-shrink-0 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          {!isSidebarCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold tracking-tighter">
              ShadowAgent
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { id: 'chat', icon: <MessageSquare className="w-5 h-5" />, label: 'Neural Chat' },
            { id: 'tools', icon: <LayoutGrid className="w-5 h-5" />, label: 'Tools Hub' },
            { id: 'history', icon: <History className="w-5 h-5" />, label: 'Activity Log' },
            { id: 'knowledge', icon: <Library className="w-5 h-5" />, label: 'Memory Bank' },
            { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Preferences' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${
                activeTab === item.id 
                ? 'bg-white/10 text-white shadow-xl' 
                : 'text-white/30 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">{item.label}</span>
              )}
              {activeTab === item.id && (
                <motion.div layoutId="activeTab" className="absolute left-[-12px] w-1 h-6 bg-cyan-400 rounded-full glow-cyan" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4 text-white/40" /> : <ChevronLeft className="w-4 h-4 text-white/40" />}
          </button>
        </div>
      </motion.aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl">
           <div className="flex items-center gap-8 flex-1 max-w-2xl">
              <div className="h-11 flex-1 px-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 group focus-within:border-cyan-500/50 transition-all">
                 <Search className="w-4 h-4 text-white/20 group-focus-within:text-cyan-400" />
                 <input 
                    type="text" 
                    placeholder="Global Search Node (Cmd + K)" 
                    className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-white/10 uppercase tracking-widest text-[10px] font-bold"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4 pl-10">
              <button className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white text-black font-black text-[10px] hover:bg-white/90 transition-all uppercase tracking-[0.2em] shadow-xl shadow-white/5">
                 <Plus className="w-4 h-4" />
                 Initialize Task
              </button>
              <div className="w-11 h-11 rounded-full border border-white/20 p-[2px] cursor-pointer">
                 <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
           
           <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                 {activeTab === "chat" && (
                   <motion.div key="chat" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
                      <ChatInterface ollamaRunning={ollamaRunning} />
                   </motion.div>
                 )}

                 {activeTab === "tools" && (
                   <motion.div key="tools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full p-12 overflow-y-auto custom-scrollbar">
                      <div className="max-w-6xl mx-auto space-y-12">
                         <div className="space-y-2">
                            <h2 className="text-4xl font-extrabold tracking-tighter">Tools Hub</h2>
                            <p className="text-white/40 font-medium">One-click automation for your daily workflow.</p>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                              { l: 'WhatsApp', i: <MessageSquare className="w-8 h-8" />, c: 'text-green-500', d: 'Secure local message sync & automation.' },
                              { l: 'Email Agent', i: <Mail className="w-8 h-8" />, c: 'text-blue-500', d: 'Smart sorting and draft generation.' },
                              { l: 'Calendar', i: <Calendar className="w-8 h-8" />, c: 'text-purple-500', d: 'Autonomous scheduling & meeting prep.' },
                              { l: 'Local Files', i: <FileText className="w-8 h-8" />, d: 'Instant search & RAG on your documents.' },
                              { l: 'Social Forge', i: <Share2 className="w-8 h-8" />, d: 'Automated post scheduling and engagement.' },
                              { l: 'Custom Workflows', i: <Zap className="w-8 h-8" />, d: 'Build visual automation chains.' }
                            ].map(tool => (
                              <div key={tool.l} className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 group hover:border-cyan-500/30 transition-all cursor-pointer">
                                 <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${tool.c || 'text-cyan-400'}`}>
                                    {tool.i}
                                 </div>
                                 <div className="space-y-2">
                                    <h4 className="text-xl font-bold tracking-tight">{tool.l}</h4>
                                    <p className="text-sm text-white/30 leading-relaxed">{tool.d}</p>
                                 </div>
                                 <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Operational</span>
                                    <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                 )}

                 {["history", "knowledge", "settings"].includes(activeTab) && (
                   <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center">
                      <div className="max-w-xl w-full p-20 glass-panel rounded-[4rem] text-center space-y-12">
                         <div className="w-24 h-24 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto">
                            <Activity className="w-12 h-12 text-cyan-400" />
                         </div>
                         <div className="space-y-4">
                            <h2 className="text-3xl font-extrabold tracking-tighter uppercase">{activeTab} Interface</h2>
                            <p className="text-sm text-white/30 leading-relaxed font-medium">Coming soon in the next Shadow update.</p>
                         </div>
                      </div>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>

           {/* Right Context Panel */}
           <aside className="w-80 border-l border-white/5 bg-black/40 backdrop-blur-3xl hidden xl:flex flex-col p-8 space-y-10">
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Command_Status</h4>
                 <div className="space-y-3">
                    {[
                      { l: 'WhatsApp', s: 'Syncing', c: 'bg-green-500' },
                      { l: 'Gmail', s: 'Connected', c: 'bg-blue-500' },
                      { l: 'Calendar', s: 'Standby', c: 'bg-purple-500' }
                    ].map(item => (
                      <div key={item.l} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                         <span className="text-[10px] font-bold uppercase tracking-widest">{item.l}</span>
                         <div className="flex items-center gap-2">
                            <span className="text-[8px] text-white/20 font-black uppercase">{item.s}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.c} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Live_Telemetry</h4>
                 <div className="p-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-white/40">Engine Load</span>
                       <span className="text-xs font-black text-cyan-400">0.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-white/40">Memory</span>
                       <span className="text-xs font-black text-purple-400">14.2 GB</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-white/40">Encryption</span>
                       <span className="text-xs font-black text-green-400">AES-256</span>
                    </div>
                 </div>
              </div>
           </aside>
        </div>
      </main>
    </div>
  );
}
