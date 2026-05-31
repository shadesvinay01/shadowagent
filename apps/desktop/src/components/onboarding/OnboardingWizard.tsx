"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Zap, MessageSquare, Mail, 
  Key, ArrowRight, Activity, 
  RefreshCcw, AlertCircle, Terminal,
  CheckCircle, XCircle, Download, ExternalLink
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

type OllamaState = "checking" | "found" | "not_found";

export default function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [licenseKey, setLicenseKey] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ollamaState, setOllamaState] = useState<OllamaState>("checking");
  const [error, setError] = useState<string | null>(null);

  // Check Ollama whenever we land on step 2
  useEffect(() => {
    if (currentStep === 2) {
      setOllamaState("checking");
      checkOllamaStatus()
        .then((ready) => setOllamaState(ready ? "found" : "not_found"))
        .catch(() => setOllamaState("not_found"));
    }
  }, [currentStep]);

  const retryOllamaCheck = () => {
    setOllamaState("checking");
    checkOllamaStatus()
      .then((ready) => setOllamaState(ready ? "found" : "not_found"))
      .catch(() => setOllamaState("not_found"));
  };

  const handleNext = async () => {
    setError(null);
    setIsProcessing(true);

    try {
      if (currentStep === 3) {
        await startWhatsappSession().catch(() => {});
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
            <button 
              onClick={onComplete}
              className="text-[9px] font-black text-white/10 uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
               <Terminal className="w-3 h-3" /> Skip Setup
            </button>
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
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
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
               <div className="w-full max-w-lg">

                  {/* ── STEP 2: Ollama Check ── */}
                  {currentStep === 2 && (
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-6">

                      {/* Checking */}
                      {ollamaState === "checking" && (
                        <div className="flex flex-col items-center gap-4">
                          <Activity className="w-10 h-10 text-cyan-400 animate-spin" />
                          <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                            Scanning for Ollama...
                          </p>
                        </div>
                      )}

                      {/* Found */}
                      {ollamaState === "found" && (
                        <div className="flex flex-col items-center gap-4">
                          <CheckCircle className="w-10 h-10 text-green-400" />
                          <p className="text-sm font-bold uppercase tracking-widest text-green-400">
                            ✓ Ollama Engine Connected
                          </p>
                          <p className="text-xs text-white/30">Your AI will run 100% locally.</p>
                        </div>
                      )}

                      {/* Not Found */}
                      {ollamaState === "not_found" && (
                        <div className="flex flex-col items-center gap-5">
                          <XCircle className="w-10 h-10 text-orange-400" />
                          <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-1">
                              Ollama Not Found
                            </p>
                            <p className="text-xs text-white/30 leading-relaxed">
                              Ollama is required for local AI processing.<br/>
                              Install it first, then come back and click Retry.
                            </p>
                          </div>

                          {/* Install Ollama Button */}
                          <a
                            href="https://ollama.com/download/windows"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-orange-500/20 border border-orange-500/40 text-orange-300 rounded-2xl text-sm font-bold hover:bg-orange-500/30 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download Ollama (Free)
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          {/* Retry Button */}
                          <button
                            onClick={retryOllamaCheck}
                            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white/40 rounded-2xl text-xs font-bold hover:text-white hover:border-white/30 transition-all"
                          >
                            <RefreshCcw className="w-3 h-3" />
                            Retry Detection
                          </button>

                          {/* Skip notice */}
                          <p className="text-[10px] text-white/20 uppercase tracking-widest">
                            You can also press "Skip" at top-right and install Ollama later.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── STEP 5: License ── */}
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
                      className="px-10 py-5 rounded-2xl border border-white/5 text-white/30 font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
                    >
                       Previous
                    </button>
                  )}
                  <button 
                    disabled={isProcessing || (currentStep === 2 && ollamaState === "checking")}
                    onClick={handleNext}
                    className="btn-primary flex items-center gap-4 px-12 py-5 text-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                     {isProcessing ? <RefreshCcw className="w-6 h-6 animate-spin" /> : (
                       <>
                         {currentStep === 5 ? "Finalize Core" : currentStep === 2 && ollamaState === "not_found" ? "Skip for Now" : "Continue"}
                         <ArrowRight className="w-6 h-6" />
                       </>
                     )}
                  </button>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
