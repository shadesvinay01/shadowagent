"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, Settings, AlertCircle, ShieldCheck, Terminal, Cpu, Info, CornerDownLeft, Target, Fingerprint } from "lucide-react";
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
      content: "Neural link established. Encryption active. Standing by for local instructions in Sovereign Mode.",
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
      setMessages(prev => [...prev, { role: "bot", content: "FATAL_ERROR: Neural engine connection timeout.", timestamp: time }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full relative">
      
      {/* Console Overlay Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
         <div className="flex items-center gap-4">
            <Fingerprint className="w-5 h-5 text-cyan-500/50" />
            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Encrypted_Session</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[8px] font-mono text-cyan-500/60 uppercase tracking-widest">Live_Neural_Data</span>
         </div>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-14 p-10 pr-12 custom-scrollbar relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-8 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Minimal Avatar */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all ${
                msg.role === "user" 
                ? "bg-white/5 border-white/10" 
                : "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
              }`}>
                {msg.role === "user" ? <User className="w-6 h-6 text-white/30" /> : <Bot className="w-6 h-6 text-cyan-400" />}
              </div>

              {/* Minimal Content */}
              <div className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-8 py-5 rounded-[2rem] text-[1.1rem] leading-relaxed shadow-2xl transition-all ${
                  msg.role === "user" 
                  ? "bg-white text-black font-black rounded-tr-none" 
                  : "bg-black/40 border border-white/10 text-white/90 rounded-tl-none"
                }`}>
                  <ReactMarkdown className="markdown-content prose prose-invert max-w-none">
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <div className="text-[8px] font-bold text-white/10 uppercase tracking-[0.4em]">
                   {msg.role === "user" ? "SOVEREIGN_ID" : "SHADOW_CORE"} // {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="bg-black/40 border border-cyan-500/10 px-8 py-5 rounded-[2rem] rounded-tl-none flex gap-4 items-center">
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <span className="text-[10px] text-cyan-400/80 font-bold tracking-[0.4em] uppercase">Processing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* High-End Command Input */}
      <footer className="p-10 bg-black/60 border-t border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-cyan-500/10 rounded-[2.2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={ollamaRunning ? "ENTER_COMMAND >" : "SYSTEM_OFFLINE"}
              disabled={!ollamaRunning || isThinking}
              className="w-full bg-black/80 border border-white/10 rounded-[1.8rem] px-10 py-6 text-lg font-bold tracking-tight focus:outline-none focus:border-cyan-500/30 transition-all placeholder:text-white/10 uppercase"
            />
            
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-6">
               <button
                  onClick={handleSend}
                  disabled={!ollamaRunning || isThinking || !input.trim()}
                  className="p-4 rounded-2xl bg-cyan-500 text-black hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  <Send className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-12 opacity-30">
           <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.4em] uppercase">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              Sovereign_Active
           </div>
           <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.4em] uppercase">
              <Terminal className="w-4 h-4" />
              Zero_Leak_Protocol
           </div>
        </div>
      </footer>
    </div>
  );
}
