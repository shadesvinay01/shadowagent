"use client";

import { useState, useEffect } from "react";
import PitchDeck from "@/components/sections/PitchDeck";
import { Lock, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Note: In a real production app, use process.env.PITCH_DECK_PASSWORD
const SECRET_KEY = "SHADOW_INVESTOR_2026";

export default function PitchPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const authorized = sessionStorage.getItem("shadow_pitch_auth") === "true";
    if (authorized) setIsAuthorized(true);
  }, []);

  const handleVerify = () => {
    if (passcode.toUpperCase() === SECRET_KEY) {
      setIsAuthorized(true);
      sessionStorage.setItem("shadow_pitch_auth", "true");
      setError(false);
    } else {
      setError(true);
      setPasscode("");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 bg-[#050508] flex items-center justify-center p-6 font-manrope">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-10 rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl text-center shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-syne font-bold mb-3 tracking-tight">Private Access</h1>
          <p className="text-white/40 text-sm mb-10 tracking-widest uppercase">Investor Portal // ShadowAgent</p>
          
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="password"
                placeholder="Enter Shadow Access Key"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-center text-sm font-mono tracking-[0.3em] uppercase focus:outline-none focus:border-cyan-500/50 transition-all`}
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-[10px] mt-2 font-bold tracking-widest uppercase"
                >
                  Invalid Access Key
                </motion.p>
              )}
            </div>
            
            <button 
              onClick={handleVerify}
              className="w-full py-4 bg-white text-black font-syne font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Verify Identity <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-3 text-[9px] text-white/20 font-bold tracking-[0.2em] uppercase">
            <ShieldCheck className="w-3 h-3" />
            End-to-End Encrypted Portal
          </div>
        </motion.div>
      </div>
    );
  }

  return <PitchDeck />;
}
