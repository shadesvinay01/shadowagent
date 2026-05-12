"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Zap, MessageSquare, Mail, 
  Key, ArrowRight, Smartphone, Globe, Lock, Activity, 
  RefreshCcw, AlertCircle, CheckCircle2
} from "lucide-react";
import { validateLicense, checkOllamaStatus, startWhatsappSession } from "../../lib/tauri/commands";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 1, title: "Welcome to Shadow", description: "Your sovereign local AI operating system.", icon: <Shield className="w-12 h-12" /> },
  { id: 2, title: "Neural Engine", description: "Initialize Ollama for 100% private processing.", icon: <Zap className="w-12 h-12" /> },
  { id: 3, title: "WhatsApp Sync", description: "Establish a secure link to your messages.", icon: <MessageSquare className="w-12 h-12" /> },
  { id: 4, title: "Cloud Bridge", description: "Securely connect your professional accounts.", icon: <Mail className="w-12 h-12" /> },
  { id: 5, title: "Final Activation", description: "Enter your Sovereign access key.", icon: <Key className="w-12 h-12" /> }
];

export default function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [licenseKey, setLicenseKey] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ollamaReady, setOllamaReady] = useState(false);
  const [waSessionPath, setWaSessionPath] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Auto-check Ollama when arriving at step 2
  useEffect(() => {
    if (currentStep === 2) {
      checkOllamaStatus().then(setOllamaReady).catch(() => setOllamaReady(false));
    }
  }, [currentStep]);

  const handleNext = async () => {
    setError(null);
    setIsProcessing(true);

    try {
      if (currentStep === 2) {
        const ready = await checkOllamaStatus();
        if (!ready) throw new Error("Ollama is not running. Please start Ollama.exe");
        setOllamaReady(true);
      }

      if (currentStep === 3) {
        const path = await startWhatsappSession();
        setWaSessionPath(path);
      }

      if (currentStep === 5) {
        if (!email || !licenseKey) throw new Error("Email and License Key are required.");
        const res = await validateLicense(email, licenseKey);
        if (!res.success) throw new Error(res.error || "License validation failed.");
        localStorage.setItem("shadow_license_token", res.token || "");
        onComplete();
        return;
      }

      setCurrentStep(currentStep + 1);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center p-10 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="bg-glow glow-left opacity-30" />
      <div className="bg-glow glow-right opacity-30" />

      {/* Progress Hub */}
      <div className="w-full max-w-4xl mb-20 relative z-10">
         <div className="flex justify-between items-center px-4 mb-4">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Shadow_Onboarding // Step 0{currentStep}</span>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em]">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
         </div>
         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               animate={{ width: `${(currentStep / steps.length) * 100}%` }}
               className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            />
         </div>
      </div>

      {/* Cinematic Content */}
      <div className="flex-1 w-full max-w-5xl flex items-center justify-center relative">
         <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="w-full flex flex-col items-center text-center space-y-12"
            >
               <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 relative z-10">
                     {steps[currentStep-1].icon}
                  </div>
               </div>

               <div className="space-y-6 max-w-2xl">
                  <h1 className="text-6xl font-extrabold tracking-tighter text-white leading-tight">
                     {steps[currentStep-1].title}
                  </h1>
                  <p className="text-xl text-white/40 font-medium leading-relaxed">
                     {steps[currentStep-1].description}
                  </p>
               </div>

               {/* Step Specific Content */}
               <div className="w-full max-w-md">
                  {currentStep === 2 && (
                    <div className="p-8 rounded-[2.5rem] glass-panel border-cyan-500/20 space-y-6">
                       <Activity className={`w-10 h-10 mx-auto ${ollamaReady ? 'text-green-500' : 'text-cyan-400 animate-spin'}`} />
                       <p className="text-sm font-bold uppercase tracking-widest">
                          {ollamaReady ? 'Ollama Engine Connected' : 'Scanning for Local Engine...'}
                       </p>
                       {!ollamaReady && (
                         <button className="w-full py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-xl shadow-white/5">
                            Install Ollama.exe
                         </button>
                       )}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="p-8 rounded-[2.5rem] glass-panel flex flex-col items-center gap-6">
                       <div className="w-48 h-48 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group overflow-hidden">
                          {waSessionPath ? (
                            <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
                          ) : (
                            <Smartphone className="w-20 h-20 text-white/10 group-hover:text-cyan-400 transition-colors" />
                          )}
                       </div>
                       <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                          {waSessionPath ? 'Session Initialized locally' : 'Establish Local Session Link'}
                       </p>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-6">
                       <div className="space-y-3">
                          <input 
                             type="email" 
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             placeholder="USER@SOVEREIGN.AI"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-lg font-bold tracking-widest text-center text-white focus:border-cyan-500/40 focus:outline-none transition-all placeholder:text-white/5 uppercase"
                          />
                          <input 
                             type="text" 
                             value={licenseKey}
                             onChange={(e) => setLicenseKey(e.target.value)}
                             placeholder="SHADOW-XXXX-XXXX"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-xl font-bold tracking-widest text-center text-white focus:border-cyan-500/40 focus:outline-none transition-all placeholder:text-white/5 uppercase"
                          />
                       </div>
                       <div className="flex items-center justify-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
                          <Lock className="w-3.5 h-3.5" /> RSA-4096 Encrypted Verification
                       </div>
                    </div>
                  )}

                  {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center gap-3 text-red-500 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                       <AlertCircle className="w-5 h-5" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
                    </motion.div>
                  )}
               </div>

               <div className="flex items-center gap-6">
                  {currentStep > 1 && (
                    <button 
                      disabled={isProcessing}
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-10 py-5 rounded-2xl border border-white/5 text-white/30 font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                    >
                       Previous
                    </button>
                  )}
                  <button 
                    disabled={isProcessing}
                    onClick={handleNext}
                    className="btn-primary flex items-center gap-4 px-12 py-5 text-lg disabled:opacity-50"
                  >
                     {isProcessing ? <RefreshCcw className="w-6 h-6 animate-spin" /> : (
                       <>
                         {currentStep === 5 ? "Finalize Core" : "Continue"}
                         <ArrowRight className="w-6 h-6" />
                       </>
                     )}
                  </button>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      <footer className="w-full max-w-4xl py-10 flex justify-between items-center border-t border-white/5 opacity-20 relative z-10">
         <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em]">
            <Lock className="w-4 h-4" /> Secure Zero-Knowledge Setup
         </div>
         <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em]">
            <Globe className="w-4 h-4" /> 100% Local Execution
         </div>
      </footer>
    </div>
  );
}
