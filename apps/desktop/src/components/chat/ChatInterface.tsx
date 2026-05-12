"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, Settings, AlertCircle, ShieldCheck, Terminal, Cpu, Info } from "lucide-react";
import { shadowAgent } from "../../lib/agent/agent";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function ChatInterface({ ollamaRunning }: { ollamaRunning: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      content: "ShadowAgent active. Neural link established. How can I assist your local operations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || !ollamaRunning || isThinking) return;

    const userMsg = input;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: "user", content: userMsg, timestamp: time }]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await shadowAgent.ask(userMsg);
      setMessages(prev => [...prev, { role: "bot", content: response.content, timestamp: time }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", content: "CRITICAL ERROR: Failed to process request locally. Verify Ollama status.", timestamp: time }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full max-w-5xl mx-auto p-10 gap-10 relative">
      
      {/* HUD Header */}
      <header className="flex items-center justify-between pb-8 border-b border-white/10 relative z-20">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative w-14 h-14 rounded-2xl bg-black/80 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-syne font-black tracking-tighter text-white/90">SHADOW_CHAT</h1>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-2 text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.3em]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sovereignty Mode: Active
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex px-5 py-2 rounded-xl bg-white/5 border border-white/10 items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">AES_256_ENCRYPTED</span>
          </div>
          <button className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/30 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Viewport */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-12 pr-6 custom-scrollbar relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className={`flex gap-8 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all ${
                msg.role === "user" 
                ? "bg-white/10 border-white/20" 
                : "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              }`}>
                {msg.role === "user" ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-cyan-400" />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] space-y-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-8 py-5 rounded-[2rem] text-[1.05rem] leading-relaxed shadow-2xl transition-all ${
                  msg.role === "user" 
                  ? "bg-white text-black font-bold rounded-tr-none hover:scale-[1.01]" 
                  : "bg-white/[0.03] backdrop-blur-3xl border border-white/10 text-white/90 rounded-tl-none hover:bg-white/[0.05]"
                }`}>
                  <ReactMarkdown className="markdown-content prose prose-invert max-w-none">
                    {msg.content}
                  </ReactMarkdown>
                </div>
                
                <div className="flex items-center gap-4 justify-end md:justify-start opacity-30 text-[9px] font-mono tracking-widest uppercase">
                   <span>{msg.role === "user" ? "Authorized_ID: 0x1" : "ShadowCore_v2.0"}</span>
                   <span className="w-1 h-1 rounded-full bg-white/50" />
                   <span>{msg.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 px-8 py-6 rounded-[2rem] rounded-tl-none flex gap-4 items-center">
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <span className="ml-2 text-xs text-cyan-400/80 font-mono tracking-[0.3em] uppercase">Neural Processing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Console */}
      <footer className="relative pb-10 z-20">
        <div className="max-w-4xl mx-auto w-full relative">
          <AnimatePresence>
            {!ollamaRunning && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute -top-16 left-0 right-0 flex items-center justify-center gap-4 text-red-400 text-[10px] font-mono tracking-[0.4em] bg-red-500/10 border border-red-500/30 py-3 rounded-2xl backdrop-blur-xl"
              >
                <AlertCircle className="w-4 h-4" />
                SYSTEM_CRITICAL: OLLAMA_BACKEND_OFFLINE
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.2rem] overflow-hidden transition-all group-focus-within:border-cyan-500/40 group-focus-within:bg-black/80">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={ollamaRunning ? "Issue a local command..." : "Waiting for local connection..."}
                disabled={!ollamaRunning || isThinking}
                className="w-full bg-transparent px-10 py-7 pr-24 text-lg font-space focus:outline-none placeholder:text-white/20 disabled:opacity-30"
              />
              
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                 <button
                    onClick={handleSend}
                    disabled={!ollamaRunning || isThinking || !input.trim()}
                    className="p-4 rounded-2xl bg-cyan-500 text-black hover:scale-110 active:scale-95 transition-all disabled:opacity-0 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                  >
                    <Send className="w-5 h-5" />
                  </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-10 opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.4em]">
              <Terminal className="w-3.5 h-3.5" />
              LOGS: ACTIVE
            </div>
            <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.4em]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sovereign_Link: v2.0
            </div>
            <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.4em]">
              <Info className="w-3.5 h-3.5" />
              Privacy: Guaranteed
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
