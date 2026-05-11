import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import OnboardingWizard from "./components/onboarding/OnboardingWizard";
import { checkOllamaStatus } from "./lib/tauri/commands";

export default function App() {
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [ollamaRunning, setOllamaRunning] = useState(false);

  useEffect(() => {
    // Check if user has already activated the app
    const isSetup = localStorage.getItem("shadow_setup_complete") === "true";
    setSetupComplete(isSetup);

    // Initial Ollama check
    checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
    
    // Poll Ollama status
    const interval = setInterval(() => {
      checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (setupComplete === null) return null; // Loading state

  return (
    <div className="min-h-screen bg-background text-white selection:bg-white/10 premium-gradient overflow-hidden">
      <AnimatePresence mode="wait">
        {!setupComplete ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <OnboardingWizard onComplete={() => setSetupComplete(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-screen w-full flex flex-col"
          >
            <ChatInterface ollamaRunning={ollamaRunning} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Status Bar */}
      {setupComplete && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-white/40 z-50">
          <div className={`w-2 h-2 rounded-full ${ollamaRunning ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500 animate-pulse"}`} />
          OLLAMA: {ollamaRunning ? "CONNECTED" : "DISCONNECTED"}
        </div>
      )}
    </div>
  );
}
