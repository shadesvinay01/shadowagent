"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Zap, Lock } from "lucide-react";

const logs = [
  { type: "system", text: "Initializing ShadowAgent Kernel v1.0.4..." },
  { type: "success", text: "Local Model: Llama-3-Groq-Tool-Use loaded (Quantized 4-bit)" },
  { type: "system", text: "Establishing Neural Link to Local Nodes..." },
  { type: "info", text: "WhatsApp: Active Session Found (Encrypted)" },
  { type: "info", text: "Email: IMAP Connection Secured (SSL)" },
  { type: "agent", text: "Thinking: Summarize unread messages from 'Team'..." },
  { type: "action", text: "Tool Call: [read_whatsapp_chats] - Status: Success" },
  { type: "agent", text: "Found 4 unread messages. Priority: High." },
  { type: "success", text: "Summary generated locally in 142ms." },
  { type: "system", text: "Waiting for user command..." },
];

export default function AgentTerminal() {
  const [visibleLogs, setVisibleLogs] = useState<typeof logs>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < logs.length) {
      const timeout = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, logs[index]]);
        setIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setVisibleLogs([]);
        setIndex(0);
      }, 5000);
      return () => clearTimeout(reset);
    }
  }, [index]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase ml-2 flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            ShadowAgent_Local_Kernel.sh
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[9px] font-mono text-cyan-400">ENCRYPTED</span>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-8 h-[400px] font-mono text-sm overflow-y-auto scrollbar-hide space-y-2">
        <AnimatePresence>
          {visibleLogs.map((log, i) => (
            <motion.div
              key={`${log.text}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-white/20 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className={`
                ${log.type === 'system' ? 'text-white/40' : ''}
                ${log.type === 'success' ? 'text-green-400' : ''}
                ${log.type === 'info' ? 'text-cyan-400' : ''}
                ${log.type === 'agent' ? 'text-purple-400' : ''}
                ${log.type === 'action' ? 'text-yellow-400' : ''}
              `}>
                <span className="mr-2 font-bold">{log.type === 'agent' ? '●' : '>'}</span>
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-white/40 ml-1 translate-y-1"
        />
      </div>

      {/* Footer Stats */}
      <div className="px-8 py-4 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] text-white/20 tracking-tighter uppercase font-mono">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> CPU: 12%</span>
          <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> PRIVACY: 100%</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/50">
          <Shield className="w-3 h-3" /> AIR_GAPPED_MODE_ACTIVE
        </div>
      </div>
    </div>
  );
}
