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
  Zap, Shield, User, Activity, Mail, Calendar, FileText, Share2, ArrowRight,
  ExternalLink, Smartphone, X
} from "lucide-react";

type Tab = "chat" | "tools" | "history" | "knowledge" | "settings";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

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

      {/* Tool Operational Modal */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-20"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
               className="w-full max-w-5xl h-full glass-panel rounded-[4rem] overflow-hidden flex flex-col relative"
             >
                <button onClick={() => setSelectedTool(null)} className="absolute top-10 right-10 p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white">
                   <X className="w-6 h-6" />
                </button>

                <div className="flex-1 p-20 flex flex-col items-center justify-center space-y-12 text-center">
                   <div className="w-32 h-32 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      {selectedTool === 'WhatsApp' && <MessageSquare className="w-16 h-16 text-green-500" />}
                      {selectedTool === 'Email Agent' && <Mail className="w-16 h-16 text-blue-500" />}
                      {selectedTool === 'Calendar' && <Calendar className="w-16 h-16 text-purple-500" />}
                   </div>
                   <div className="space-y-6">
                      <h2 className="text-6xl font-extrabold tracking-tighter uppercase">{selectedTool} Node</h2>
                      <p className="text-xl text-white/30 max-w-2xl font-medium leading-relaxed">Initializing local secure bridge for {selectedTool} automation and data analysis...</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <button className="px-8 py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest shadow-xl">Activate Bridge</button>
                      <button className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 font-black text-xs uppercase tracking-widest">Manual Setup</button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-glow glow-left" />
      <div className="bg-glow glow-right" />

      {/* Sidebar */}
      <motion.aside 
        initial={false} animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="h-full border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-[100] relative"
      >
        <div className="h-20 flex items-center px-6 gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center"><Shield className="w-5 h-5 text-cyan-400" /></div>
          </div>
          {!isSidebarCollapsed && <span className="text-lg font-bold tracking-tighter">ShadowAgent</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'chat', icon: <MessageSquare className="w-5 h-5" />, label: 'Neural Chat' },
            { id: 'tools', icon: <LayoutGrid className="w-5 h-5" />, label: 'Tools Hub' },
            { id: 'history', icon: <History className="w-5 h-5" />, label: 'Activity Log' },
            { id: 'knowledge', icon: <Library className="w-5 h-5" />, label: 'Memory Bank' },
            { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Preferences' }
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!isSidebarCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl">
           <div className="flex items-center gap-8 flex-1 max-w-2xl">
              <div className="h-11 flex-1 px-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                 <Search className="w-4 h-4 text-white/20" />
                 <input type="text" placeholder="Global Search Node..." className="bg-transparent border-none focus:ring-0 text-xs w-full placeholder:text-white/10" />
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
           <AnimatePresence mode="wait">
              {activeTab === "chat" && (
                <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                   <ChatInterface ollamaRunning={ollamaRunning} />
                </motion.div>
              )}
              {activeTab === "tools" && (
                <motion.div key="tools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full p-12 overflow-y-auto">
                   <div className="max-w-6xl mx-auto space-y-12">
                      <h2 className="text-4xl font-extrabold tracking-tighter">Tools Hub</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {[
                           { l: 'WhatsApp', i: <MessageSquare className="w-8 h-8" />, c: 'text-green-500', d: 'Secure local message sync & automation.' },
                           { l: 'Email Agent', i: <Mail className="w-8 h-8" />, c: 'text-blue-500', d: 'Smart sorting and draft generation.' },
                           { l: 'Calendar', i: <Calendar className="w-8 h-8" />, c: 'text-purple-500', d: 'Autonomous scheduling & meeting prep.' },
                           { l: 'Local Files', i: <FileText className="w-8 h-8" />, d: 'Instant search & RAG on your documents.' }
                         ].map(tool => (
                           <div key={tool.l} onClick={() => setSelectedTool(tool.l)} className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 group hover:border-cyan-500/30 transition-all cursor-pointer">
                              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${tool.c || 'text-cyan-400'}`}>{tool.i}</div>
                              <div className="space-y-2"><h4 className="text-xl font-bold">{tool.l}</h4><p className="text-sm text-white/30">{tool.d}</p></div>
                              <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                                 <span className="text-[9px] font-black uppercase text-white/20">Active</span>
                                 <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              )}
              {activeTab === "settings" && <motion.div key="settings" className="h-full"><SettingsPage /></motion.div>}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
