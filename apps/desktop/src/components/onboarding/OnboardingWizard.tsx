"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Zap, MessageSquare, Mail, 
  Key, Check, ArrowRight, Download, 
  Smartphone, Globe, Lock, Activity
} from "lucide-react";

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
  const [license, setLicense] = useState("");

  const next = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center p-10 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="bg-glow glow-left opacity-30" />
      <div className="bg-glow glow-right opacity-30" />

      {/* Progress Hub */}
      <div className="w-full max-w-4xl mb-20">
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
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center text-center space-y-12"
            >
               {/* Step Icon */}
               <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 relative z-10 glow-ring">
                     {steps[currentStep-1].icon}
                  </div>
               </div>

               {/* Step Text */}
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
                       <Activity className="w-10 h-10 text-cyan-400 mx-auto" />
                       <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Searching for local engine...</p>
                       <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                          Download Ollama.exe
                       </button>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="p-8 rounded-[2.5rem] glass-panel space-y-8">
                       <div className="w-48 h-48 bg-white p-4 rounded-3xl mx-auto shadow-2xl">
                          <div className="w-full h-full bg-black/5 rounded-2xl flex items-center justify-center">
                             <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SHADOW_AGENT')] bg-cover opacity-80" />
                          </div>
                       </div>
                       <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Scan with WhatsApp Settings</p>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-6">
                       <input 
                          type="text" 
                          value={license}
                          onChange={(e) => setLicense(e.target.value)}
                          placeholder="SHADOW-XXXX-XXXX"
                          className="w-full bg-white/[0.03] border-2 border-white/10 rounded-2xl px-8 py-5 text-xl font-bold tracking-widest text-center focus:border-cyan-500/40 focus:outline-none transition-all placeholder:text-white/5 uppercase"
                       />
                       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Investor Access Key Required</p>
                    </div>
                  )}
               </div>

               {/* Navigation Actions */}
               <div className="flex items-center gap-6">
                  {currentStep > 1 && (
                    <button 
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-10 py-5 rounded-2xl border border-white/5 text-white/30 font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
                    >
                       Previous
                    </button>
                  )}
                  <button 
                    onClick={next}
                    className="btn-primary flex items-center gap-4 px-12 py-5 text-lg"
                  >
                     {currentStep === 5 ? "Initialize Core" : "Continue"}
                     <ArrowRight className="w-6 h-6" />
                  </button>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Sidebar Footer Details */}
      <footer className="w-full max-w-4xl py-10 flex justify-between items-center border-t border-white/5 opacity-20">
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
