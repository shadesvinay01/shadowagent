"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Apple, Monitor, Terminal } from "lucide-react";

const platforms = [
  { name: "Windows", icon: <Monitor className="w-7 h-7" />, version: "10 / 11", size: "124 MB", ext: ".exe" },
  { name: "macOS", icon: <Apple className="w-7 h-7" />, version: "12+ (Intel & M-series)", size: "98 MB", ext: ".dmg" },
  { name: "Linux", icon: <Terminal className="w-7 h-7" />, version: "Ubuntu 20+ / Arch", size: "102 MB", ext: ".AppImage" },
];

export default function DownloadModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden"
          style={{ background: "rgb(8,8,16)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/8" style={{ background: "rgb(10,10,20)" }}>
            <div>
              <h3 className="font-syne font-bold text-white text-lg">Download ShadowAgent</h3>
              <p className="text-white/40 text-xs font-manrope mt-0.5">v1.0.4-stable — Choose your platform</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-white/8 text-white/40 hover:text-white hover:border-white/20 transition-all"
              style={{ background: "rgb(14,14,24)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Platform cards */}
          <div className="p-6 space-y-3">
            {platforms.map((p, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-white/8 hover:border-white/20 transition-all duration-200 group text-left"
                style={{ background: "rgb(12,12,22)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-white/60 group-hover:text-white transition-colors">{p.icon}</div>
                  <div>
                    <p className="font-syne font-bold text-white text-sm">{p.name}</p>
                    <p className="text-white/35 text-xs font-manrope">{p.version} · {p.size} · {p.ext}</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
              </motion.button>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-7 pb-6 text-center text-xs text-white/25 font-manrope">
            Free to try for 14 days — no credit card required.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
