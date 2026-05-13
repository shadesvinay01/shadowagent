"use client";

import { useState, useEffect } from "react";
import { 
  Shield, Key, Cpu, Zap, LogOut, 
  CreditCard, Bell, Lock, Globe
} from "lucide-react";
import { checkOllamaStatus, getHardwareInfo } from "../../lib/tauri/commands";

export default function SettingsPage() {
  const [ollamaReady, setOllamaReady] = useState(false);
  const [hardware, setHardware] = useState<any>(null);
  const [licenseKey, setLicenseKey] = useState("");

  useEffect(() => {
    checkOllamaStatus().then(setOllamaReady).catch(() => setOllamaReady(false));
    getHardwareInfo().then(setHardware).catch(() => setHardware(null));
    
    const key = localStorage.getItem("shadow_license_token");
    if (key) setLicenseKey(key.substring(0, 12) + "...");
  }, []);

  return (
    <div className="h-full p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        
        {/* Header */}
        <div className="space-y-2">
           <h2 className="text-4xl font-extrabold tracking-tighter">System Preferences</h2>
           <p className="text-white/40 font-medium">Manage your local node and sovereign activation.</p>
        </div>

        {/* 1. License Card */}
        <div className="p-10 rounded-[3rem] glass-panel bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-40 h-40" />
           </div>
           
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Key className="w-6 h-6 text-black" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold tracking-tight">Sovereign Activation</h3>
                    <p className="text-xs text-white/40 font-black uppercase tracking-widest">Active License Pool</p>
                 </div>
              </div>

              <div className="flex items-end justify-between">
                 <div className="space-y-2">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Token ID</p>
                    <p className="text-xl font-mono font-bold tracking-widest text-cyan-400">{licenseKey || "UNAUTHORIZED"}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Renewal Date</p>
                    <p className="text-sm font-bold text-white">May 12, 2027</p>
                 </div>
              </div>

              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                 <CreditCard className="w-4 h-4" /> Manage Subscription
              </button>
           </div>
        </div>

        {/* 2. Neural Hardware */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 rounded-[2.5rem] glass-panel space-y-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Engine_Status</h4>
                 <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${ollamaReady ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {ollamaReady ? 'Stable' : 'Offline'}
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                       <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                       <p className="text-sm font-bold">Ollama Local Instance</p>
                       <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">v0.1.48 // 127.0.0.1:11434</p>
                    </div>
                 </div>
                 <button onClick={() => checkOllamaStatus().then(setOllamaReady)} className="w-full py-4 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Re-Verify Link
                 </button>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] glass-panel space-y-6">
              <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Hardware_Acceleration</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                       <Cpu className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                       <p className="text-sm font-bold">{hardware?.acceleration || "Detecting..."}</p>
                       <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{hardware?.cores || 0} Unified Cores // {hardware?.arch || "N/A"}</p>
                    </div>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[45%] shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                 </div>
              </div>
           </div>
        </div>

        {/* 3. General Settings */}
        <div className="space-y-4">
           <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">System_Controls</h4>
           <div className="space-y-2">
              {[
                { l: 'Notification Bridge', d: 'Enable local OS push notifications.', i: <Bell className="w-5 h-5" />, s: true },
                { l: 'Zero-Knowledge Sync', d: 'Securely sync metadata across local nodes.', i: <Globe className="w-5 h-5" />, s: false },
                { l: 'Advanced Encryption', d: 'Force AES-256 for all local database storage.', i: <Lock className="w-5 h-5" />, s: true }
              ].map(opt => (
                <div key={opt.l} className="p-6 rounded-2xl glass-panel flex items-center justify-between group">
                   <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 transition-colors">
                         {opt.i}
                      </div>
                      <div>
                         <p className="text-sm font-bold tracking-tight">{opt.l}</p>
                         <p className="text-xs text-white/20 font-medium">{opt.d}</p>
                      </div>
                   </div>
                   <div className={`w-12 h-6 rounded-full relative p-1 transition-all ${opt.s ? 'bg-cyan-500' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white shadow-lg transition-all ${opt.s ? 'translate-x-6' : 'translate-x-0'}`} />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Logout */}
        <div className="pt-10 border-t border-white/5">
           <button className="flex items-center gap-4 text-red-500/60 hover:text-red-500 transition-all text-xs font-black uppercase tracking-widest">
              <LogOut className="w-5 h-5" /> De-activate Node License
           </button>
        </div>

      </div>
    </div>
  );
}
