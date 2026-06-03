"use client";

import { useState, useEffect } from "react";
import {
  Shield, Key, Cpu, Zap, LogOut,
  CreditCard, Bell, Lock, Globe
} from "lucide-react";
import { checkOllamaStatus, getHardwareInfo } from "../../lib/tauri/commands";

// FIX: typed hardware info
interface HardwareInfo {
  acceleration: string;
  cores: number;
  arch: string;
}

// FIX: typed toggle settings persisted to localStorage
interface SystemSettings {
  notifications: boolean;
  zksync: boolean;
  encryption: boolean;
}

function loadSettings(): SystemSettings {
  try {
    const stored = localStorage.getItem("shadow_system_settings");
    if (stored) return JSON.parse(stored);
  } catch {}
  return { notifications: true, zksync: false, encryption: true };
}

export default function SettingsPage() {
  const [ollamaReady, setOllamaReady] = useState(false);
  const [hardware, setHardware] = useState<HardwareInfo | null>(null);
  const [licenseKey, setLicenseKey] = useState("");
  // FIX: real toggle state loaded from localStorage
  const [settings, setSettings] = useState<SystemSettings>(loadSettings);

  useEffect(() => {
    checkOllamaStatus().then(setOllamaReady).catch(() => setOllamaReady(false));
    getHardwareInfo().then(setHardware).catch(() => setHardware(null));

    const key = localStorage.getItem("shadow_license_token");
    if (key) setLicenseKey(key.substring(0, 12) + "...");
  }, []);

  // FIX: toggle handler that saves to localStorage
  const handleToggle = (key: keyof SystemSettings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("shadow_system_settings", JSON.stringify(next));
      return next;
    });
  };

  const toggleOptions: { key: keyof SystemSettings; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: "notifications",
      label: "Notification Bridge",
      desc: "Enable local OS push notifications.",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      key: "zksync",
      label: "Zero-Knowledge Sync",
      desc: "Securely sync metadata across local nodes.",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      key: "encryption",
      label: "Advanced Encryption",
      desc: "Force AES-256 for all local database storage.",
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  const handleDeactivate = () => {
    if (confirm("Are you sure you want to deactivate your node license? You will need to re-enter your key.")) {
      localStorage.removeItem("shadow_license_token");
      setLicenseKey("");
    }
  };

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
                <p className={`text-xl font-mono font-bold tracking-widest ${licenseKey ? "text-cyan-400" : "text-red-400"}`}>
                  {licenseKey || "UNAUTHORIZED"}
                </p>
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
              <div
                className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  ollamaReady ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                }`}
              >
                {ollamaReady ? "Stable" : "Offline"}
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
              <button
                onClick={() => checkOllamaStatus().then(setOllamaReady)}
                className="w-full py-4 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
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
                  <p className="text-sm font-bold">{hardware?.acceleration ?? "Detecting..."}</p>
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    {hardware?.cores ?? 0} Unified Cores // {hardware?.arch ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[45%] shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. System Controls — FIX: toggles are now interactive and persisted */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">System_Controls</h4>
          <div className="space-y-2">
            {toggleOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleToggle(opt.key)}
                className="w-full p-6 rounded-2xl glass-panel flex items-center justify-between group text-left hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 transition-colors">
                    {opt.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">{opt.label}</p>
                    <p className="text-xs text-white/20 font-medium">{opt.desc}</p>
                  </div>
                </div>
                {/* FIX: Toggle reflects live state and is clickable */}
                <div
                  className={`w-12 h-6 rounded-full relative p-1 transition-all flex-shrink-0 ${
                    settings[opt.key] ? "bg-cyan-500" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-lg transition-all ${
                      settings[opt.key] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deactivate — FIX: actually clears the token */}
        <div className="pt-10 border-t border-white/5">
          <button
            onClick={handleDeactivate}
            className="flex items-center gap-4 text-red-500/60 hover:text-red-500 transition-all text-xs font-black uppercase tracking-widest"
          >
            <LogOut className="w-5 h-5" /> De-activate Node License
          </button>
        </div>

      </div>
    </div>
  );
}
