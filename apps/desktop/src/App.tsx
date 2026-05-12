"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Activity, MessageSquare, Terminal } from "lucide-react";

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("DEBUG: APP_MOUNTED");
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-black h-screen w-screen" />;

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-20 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.05)_0%,transparent_70%)]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full" />

      {/* Main Debug Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/[0.02] backdrop-blur-[100px] border border-white/5 rounded-[4rem] p-20 text-center space-y-12 relative z-10 shadow-2xl"
      >
         <div className="relative inline-block">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse rounded-full" />
            <div className="w-32 h-32 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 relative z-10">
               <Shield className="w-16 h-16" />
            </div>
         </div>

         <div className="space-y-6">
            <h1 className="text-6xl font-black tracking-tighter uppercase">Shadow_Online</h1>
            <p className="text-xl text-white/30 font-medium uppercase tracking-[0.2em]">Sovereign AI Node Initialized</p>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
               <Zap className="w-6 h-6 text-cyan-400" />
               <div className="text-left">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Engine</p>
                  <p className="text-sm font-bold text-cyan-400">Stable</p>
               </div>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
               <Activity className="w-6 h-6 text-purple-400" />
               <div className="text-left">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Render</p>
                  <p className="text-sm font-bold text-purple-400">Hardware</p>
               </div>
            </div>
         </div>

         <button 
           onClick={() => window.location.reload()}
           className="px-12 py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
         >
            Force Refresh Node
         </button>
      </motion.div>

      {/* Security Footer */}
      <footer className="absolute bottom-10 flex gap-12 opacity-20">
         <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.5em]">
            <Terminal className="w-4 h-4" /> System_OK
         </div>
         <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.5em]">
            <MessageSquare className="w-4 h-4" /> Comm_Linked
         </div>
      </footer>

    </div>
  );
}
