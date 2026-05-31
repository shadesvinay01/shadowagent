"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Zap, Database, X, Minus, Square } from "lucide-react";

interface CommandResponse {
  cmd: string;
  output: React.ReactNode;
}

const BOOT_SEQUENCE = [
  "Initializing Kernel...",
  "Loading Secure Enclave...",
  "Bypassing Cloud Telemetry...",
  "Mounting Local Vector DB...",
  "Loading LLM Quantized Weights...",
  "Establishing Offline Protocol...",
  "SYSTEM ONLINE. Welcome to ShadowAgent OS."
];

export default function OSTerminal() {
  const [history, setHistory] = useState<CommandResponse[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setBootLog(prev => [...prev, BOOT_SEQUENCE[i]]);
      i++;
      if (i === BOOT_SEQUENCE.length) {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 1000);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, bootLog]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: React.ReactNode = <span className="text-red-400">Command not recognized. Type &apos;help&apos; for available commands.</span>;

    if (cmd === "help") {
      output = (
        <div className="flex flex-col gap-1 text-gray-300">
          <span>Available Commands:</span>
          <span className="text-white"><span className="text-cyan-400">features</span> - List system capabilities</span>
          <span className="text-white"><span className="text-cyan-400">security</span> - View privacy protocols</span>
          <span className="text-white"><span className="text-cyan-400">install</span>  - Initialize local deployment</span>
          <span className="text-white"><span className="text-cyan-400">clear</span>    - Clear terminal buffer</span>
        </div>
      );
    } else if (cmd === "features") {
      output = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-3"><Zap className="w-4 h-4 text-white"/> Local LLM Execution</div>
          <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-3"><Database className="w-4 h-4 text-white"/> Private RAG Engine</div>
          <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-3"><Shield className="w-4 h-4 text-white"/> Air-Gapped Comm Protocol</div>
        </div>
      );
    } else if (cmd === "security") {
      output = <span className="text-white font-mono tracking-widest uppercase text-xs border border-white/20 p-2 inline-block">100% OFF-GRID. ZERO TELEMETRY. LOCAL KEYS ONLY.</span>;
    } else if (cmd === "install") {
      output = <span className="text-cyan-400 animate-pulse">Initializing installer daemon... Please download the desktop client below.</span>;
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput("");
  };

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[70vh] glass-dark rounded-xl border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden backdrop-blur-2xl"
    >
      {/* Title Bar */}
      <div className="h-12 bg-black/40 border-b border-white/10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center group"><X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black"/></div>
          <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center group"><Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black"/></div>
          <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center group"><Square className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black"/></div>
        </div>
        <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
          <Terminal className="w-3 h-3" /> root@shadowagent-os:~
        </div>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {isBooting ? (
            <div className="space-y-1">
              {bootLog.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${i === BOOT_SEQUENCE.length - 1 ? "text-white font-bold mt-4" : "text-gray-500"}`}
                >
                  {log}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-gray-400">
                ShadowAgent OS v1.0.4<br/>
                Type <span className="text-white">&apos;help&apos;</span> to view available commands.
              </div>
              
              {history.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-white">root@local:~#</span> {item.cmd}
                  </div>
                  <div className="pl-2 border-l border-white/10 py-1">
                    {item.output}
                  </div>
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex items-center gap-2 text-white">
                <span>root@local:~#</span>
                <input 
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none text-white caret-white"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
