"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, Settings, AlertCircle, ShieldCheck, Terminal, Cpu, Info, CornerDownLeft, Target } from "lucide-react";
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
      
      {/* Console Overlay Brackets */}
      <div className="absolute top-6 left-6 w-32 h-1 border-t border-cyan-500/20" />
      <div className="absolute top-6 left-6 w-1 h-32 border-l border-cyan-500/20" />

      {/* Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-12 p-12 pr-16 custom-scrollbar relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-8 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all ${
                msg.role === "user" 
                ? "bg-white/5 border-white/20" 
                : "bg-cyan-500/10 border-cyan-500/40 neon-border-cyan"
              }`}>
                {msg.role === "user" ? <User className="w-7 h-7 text-white/50" /> : <Bot className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" />}
              </div>

              <div className={`max-w-[75%] space-y-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-10 py-6 rounded-[2.5rem] text-[1.1rem] leading-relaxed shadow-2xl transition-all border ${
                  msg.role === "user" 
                  ? "bg-white text-black font-black rounded-tr-none" 
                  : "bg-black/60 backdrop-blur-2xl border-white/10 text-white/90 rounded-tl-none"
                }`}>
                  <ReactMarkdown className="markdown-content prose prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-cyan-400">
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <div className="flex items-center gap-4 justify-end md:justify-start text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
                   <span>{msg.role === "user" ? "AUTHORIZED_USER" : "SHADOW_CORE_v2"}</span>
                   <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
                   <span>{msg.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-8">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center neon-border-cyan">
                <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>
              <div className="bg-black/40 backdrop-blur-3xl border border-cyan-500/20 px-10 py-6 rounded-[2.5rem] rounded-tl-none flex gap-6 items-center">
                <div className="flex gap-3">
                   <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <span className="text-xs text-cyan-400 font-bold tracking-[0.5em] uppercase">Processing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* High-End Command Console */}
      <footer className="p-10 bg-black/60 border-t border-white/10 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-cyan-500/20 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={ollamaRunning ? "ENTER_COMMAND >" : "BACKEND_DISCONNECTED_RETRYING..."}
              disabled={!ollamaRunning || isThinking}
              className="w-full bg-black/80 border-2 border-white/10 rounded-[2.2rem] px-12 py-8 text-xl font-bold tracking-tight focus:outline-none focus:border-cyan-500/40 transition-all placeholder:text-white/10 uppercase"
            />
            
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-6">
               <div className="hidden md:flex items-center gap-2 text-cyan-500/40 text-[10px] font-bold tracking-widest uppercase bg-cyan-500/5 px-4 py-2 rounded-xl border border-cyan-500/10">
                  <Target className="w-3.5 h-3.5" />
                  EXE_WAITING
               </div>
               <button
                  onClick={handleSend}
                  disabled={!ollamaRunning || isThinking || !input.trim()}
                  className="p-5 rounded-2xl bg-cyan-500 text-black hover:scale-110 active:scale-95 transition-all disabled:opacity-0 shadow-[0_0_40px_rgba(0,240,255,0.6)]"
                >
                  <Send className="w-6 h-6" />
                </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-12 opacity-30">
           <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400">
              <Terminal className="w-4 h-4" />
              SYSTEM_SECURE
           </div>
           <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase">
              <ShieldCheck className="w-4 h-4" />
              PRIVATE_VAULT
           </div>
        </div>
      </footer>
    </div>
  );
}
