"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Apple, Monitor, Terminal } from "lucide-react";

const platforms = [
  { name: "Windows", icon: <Monitor className="w-7 h-7" />, version: "10 / 11", size: "124 MB", ext: ".exe", url: "/shadowagent.exe" },
  { name: "macOS", icon: <Apple className="w-7 h-7" />, version: "12+ (Intel & M-series)", size: "98 MB", ext: ".dmg", url: "/shadowagent.exe" },
  { name: "Linux", icon: <Terminal className="w-7 h-7" />, version: "Ubuntu 20+ / Arch", size: "102 MB", ext: ".AppImage", url: "/shadowagent.exe" },
];

export default function DownloadModal({ onClose }: { onClose: () => void }) {
  
  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'shadowagent';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[500] flex items-center justify-center p-6"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-lg rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
          style={{ background: "rgb(8,8,16)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-10 py-8 border-b border-white/8" style={{ background: "rgb(10,10,20)" }}>
            <div>
              <h3 className="font-syne font-bold text-white text-2xl tracking-tight">Download ShadowAgent</h3>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">v1.0.4-stable // Production Build</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl border border-white/8 text-white/40 hover:text-white hover:border-white/20 transition-all"
              style={{ background: "rgb(14,14,24)" }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Platform cards */}
          <div className="p-8 space-y-4">
            {platforms.map((p, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleDownload(p.url)}
                className="w-full flex items-center justify-between px-6 py-5 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all duration-300 group text-left relative overflow-hidden"
              >
                <div className="flex items-center gap-6">
                  <div className="text-white/20 group-hover:text-cyan-400 transition-colors">{p.icon}</div>
                  <div>
                    <p className="font-syne font-bold text-white text-lg tracking-tight">{p.name}</p>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">{p.version} · {p.size} · {p.ext}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                   <Download className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-10 pb-10 text-center text-[9px] text-white/20 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
             Zero-Knowledge Distribution Protocol Active
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
