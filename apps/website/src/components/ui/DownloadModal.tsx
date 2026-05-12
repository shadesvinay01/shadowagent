"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Apple, Monitor, Terminal, FileArchive } from "lucide-react";

const platforms = [
  { name: "Windows (Standard)", icon: <Monitor className="w-7 h-7" />, version: "10 / 11", size: "21 MB", ext: ".exe", url: "/shadowagent.exe" },
  { name: "Windows (Zip)", icon: <FileArchive className="w-7 h-7" />, version: "Secure Archive", size: "18 MB", ext: ".zip", url: "/shadowagent.zip" },
  { name: "macOS", icon: <Apple className="w-7 h-7" />, version: "M1 / M2 / Intel", size: "98 MB", ext: ".dmg", url: "/shadowagent.zip" },
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
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-lg rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
          style={{ background: "rgb(8,8,16)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-10 py-8 border-b border-white/8" style={{ background: "rgb(10,10,20)" }}>
            <div>
              <h3 className="font-syne font-bold text-white text-2xl tracking-tight">Shadow Hub</h3>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">v1.0.4 // Production Vault</p>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl border border-white/8 text-white/40 hover:text-white transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-4">
            {platforms.map((p, i) => (
              <button
                key={i}
                onClick={() => handleDownload(p.url)}
                className="w-full flex items-center justify-between px-6 py-5 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all group text-left"
              >
                <div className="flex items-center gap-6">
                  <div className="text-white/20 group-hover:text-cyan-400 transition-colors">{p.icon}</div>
                  <div>
                    <p className="font-syne font-bold text-white text-lg tracking-tight">{p.name}</p>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">{p.version} · {p.size}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                   <Download className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="px-10 pb-10 text-center text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">
             End-to-End Encrypted Distribution
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
