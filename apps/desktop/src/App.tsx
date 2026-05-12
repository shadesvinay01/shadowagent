"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import OnboardingWizard from "./components/onboarding/OnboardingWizard";
import SettingsPage from "./components/settings/SettingsPage";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { 
  MessageSquare, LayoutGrid, History, Library, Settings, 
  ChevronLeft, ChevronRight, Search, Bell, Plus, 
  Zap, Shield, User, Activity, Mail, Calendar, FileText, Share2, ArrowRight
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

      <div className="bg-glow glow-left" />
      <div className="bg-glow glow-right" />

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
          {!isSidebarCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold tracking-tighter">ShadowAgent</motion.span>}
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
                activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!isSidebarCollapsed && <span className="text-[10px] font-black tracking-[0.2em] uppercase">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-full flex items-center justify-center py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4 text-white/40" /> : <ChevronLeft className="w-4 h-4 text-white/40" />}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl">
           <div className="flex items-center gap-8 flex-1 max-w-2xl">
              <div className="h-11 flex-1 px-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 group focus-within:border-cyan-500/50 transition-all">
                 <Search className="w-4 h-4 text-white/20 group-focus-within:text-cyan-400" />
                 <input type="text" placeholder="Global Search Node (Cmd + K)" className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-white/10 text-[10px] font-bold uppercase tracking-widest" />
              </div>
           </div>
           <div className="flex items-center gap-4 pl-10">
              <button className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white text-black font-black text-[10px] hover:bg-white/90 transition-all uppercase tracking-[0.2em] shadow-xl shadow-white/5">
                 <Plus className="w-4 h-4" /> Initialize Task
              </button>
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
           <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                 {activeTab === "chat" && (
                   <motion.div key="chat" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-full"><ChatInterface ollamaRunning={ollamaRunning} /></motion.div>
                 )}
                 {activeTab === "tools" && (
                   <motion.div key="tools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full p-12 overflow-y-auto custom-scrollbar">
                      <div className="max-w-6xl mx-auto space-y-12">
                         <h2 className="text-4xl font-extrabold tracking-tighter">Tools Hub</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                              { l: 'WhatsApp', i: <MessageSquare className="w-8 h-8" />, c: 'text-green-500', d: 'Secure local message sync & automation.' },
                              { l: 'Email Agent', i: <Mail className="w-8 h-8" />, c: 'text-blue-500', d: 'Smart sorting and draft generation.' },
                              { l: 'Calendar', i: <Calendar className="w-8 h-8" />, c: 'text-purple-500', d: 'Autonomous scheduling & meeting prep.' },
                              { l: 'Local Files', i: <FileText className="w-8 h-8" />, d: 'Instant search & RAG on your documents.' }
                            ].map(tool => (
                              <div key={tool.l} className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 group hover:border-cyan-500/30 transition-all cursor-pointer">
                                 <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${tool.c || 'text-cyan-400'}`}>{tool.i}</div>
                                 <div className="space-y-2"><h4 className="text-xl font-bold tracking-tight">{tool.l}</h4><p className="text-sm text-white/30 leading-relaxed">{tool.d}</p></div>
                                 <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5"><span className="text-[9px] font-black uppercase tracking-widest text-white/20">Operational</span><ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" /></div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                 )}
                 {activeTab === "settings" && (
                   <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full"><SettingsPage /></motion.div>
                 )}
                 {["history", "knowledge"].includes(activeTab) && (
                   <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center">
                      <div className="max-w-xl w-full p-20 glass-panel rounded-[4rem] text-center space-y-12">
                         <Activity className="w-12 h-12 text-cyan-400 mx-auto" />
                         <h2 className="text-3xl font-extrabold tracking-tighter uppercase">{activeTab} Interface</h2>
                         <p className="text-sm text-white/30 font-medium">Initialising neural matrix for local execution...</p>
                      </div>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </main>
    </div>
  );
}
