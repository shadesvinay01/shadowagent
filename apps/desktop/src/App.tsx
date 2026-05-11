import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import OnboardingWizard from "./components/onboarding/OnboardingWizard";
import Connections from "./components/settings/Connections";
import { checkOllamaStatus } from "./lib/tauri/commands";
import { Bot, Settings, ShieldCheck, Zap, LogOut } from "lucide-react";

export default function App() {
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "settings">("chat");
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
    <div className="min-h-screen bg-[#050508] text-white selection:bg-primary/20 premium-gradient overflow-hidden flex">
      <AnimatePresence mode="wait">
        {!setupComplete ? (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
            <OnboardingWizard onComplete={() => setSetupComplete(true)} />
          </motion.div>
        ) : (
          <div className="flex w-full h-screen">
            {/* Minimal Side Navigation */}
            <aside className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-10 bg-black/20">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              
              <nav className="flex flex-col gap-6 flex-1">
                <button 
                  onClick={() => setActiveTab("chat")}
                  className={`p-4 rounded-2xl transition-all ${activeTab === 'chat' ? 'bg-white/10 text-white shadow-glow' : 'text-white/30 hover:text-white'}`}
                >
                  <Bot className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`p-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white shadow-glow' : 'text-white/30 hover:text-white'}`}
                >
                  <Settings className="w-6 h-6" />
                </button>
              </nav>

              <button className="p-4 rounded-2xl text-red-500/50 hover:text-red-500 transition-all hover:bg-red-500/5">
                <LogOut className="w-6 h-6" />
              </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === "chat" ? (
                  <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                    <ChatInterface ollamaRunning={ollamaRunning} />
                  </motion.div>
                ) : (
                  <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full overflow-y-auto">
                    <Connections />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Badge */}
              <div className="absolute top-8 right-8 flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-white/5 text-[10px] font-mono tracking-widest text-white/30">
                <div className={`w-2 h-2 rounded-full ${ollamaRunning ? 'bg-primary shadow-[0_0_8px_rgba(0,240,255,0.5)]' : 'bg-red-500 animate-pulse'}`} />
                {ollamaRunning ? "LOCAL_ENGINE: ONLINE" : "LOCAL_ENGINE: OFFLINE"}
              </div>
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
