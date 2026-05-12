"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, Settings, AlertCircle, ShieldCheck, Terminal, Cpu, Info, CornerDownLeft, Target, Fingerprint, Paperclip, Mic } from "lucide-react";
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
    <div className="flex-1 flex flex-col h-full w-full relative bg-transparent">
      
      {/* Chat History - Clean Editorial Style */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-12 p-12 pr-16 custom-scrollbar relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-8 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Refined Avatar */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                msg.role === "user" 
                ? "bg-white/5 border border-white/10" 
                : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              }`}>
                {msg.role === "user" ? <User className="w-5 h-5 text-white/30" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Sophisticated Bubble */}
              <div className={`max-w-[70%] space-y-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`px-8 py-5 rounded-[1.8rem] text-[1.05rem] leading-relaxed shadow-xl transition-all ${
                  msg.role === "user" 
                  ? "bg-blue-600 text-white font-medium rounded-tr-none" 
                  : "bg-white/[0.03] border border-white/5 text-white/90 rounded-tl-none backdrop-blur-3xl"
                }`}>
                  <ReactMarkdown className="markdown-content prose prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-blue-400">
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <div className="flex items-center gap-4 justify-end md:justify-start text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
                   <span>{msg.role === "user" ? "You" : "Shadow Intelligence"}</span>
                   <span className="w-1 h-1 rounded-full bg-white/20" />
                   <span>{msg.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-8">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 px-8 py-4 rounded-[1.8rem] rounded-tl-none flex gap-4 items-center backdrop-blur-2xl">
                <div className="flex gap-1.5">
                   {[0,1,2].map(i => (
                     <div key={i} className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                   ))}
                </div>
                <span className="text-[10px] text-white/40 font-bold tracking-[0.3em] uppercase">Thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modern Friendly Input Console */}
      <footer className="p-10 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-blue-500/10 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-white/[0.02] border border-white/10 rounded-[1.8rem] p-2 flex items-center gap-2 backdrop-blur-3xl group-focus-within:border-white/20 group-focus-within:bg-white/[0.04] transition-all">
              
              <button className="p-3.5 rounded-xl text-white/20 hover:text-white/60 transition-colors">
                 <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={ollamaRunning ? "How can I help you locally today?" : "Backend offline..."}
                disabled={!ollamaRunning || isThinking}
                className="flex-1 bg-transparent px-2 py-4 text-[1.1rem] font-medium focus:outline-none placeholder:text-white/10"
              />
              
              <button className="p-3.5 rounded-xl text-white/20 hover:text-white/60 transition-colors">
                 <Mic className="w-5 h-5" />
              </button>

              <button
                onClick={handleSend}
                disabled={!ollamaRunning || isThinking || !input.trim()}
                className="p-4 rounded-xl bg-white text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-0 shadow-lg shadow-white/5"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center gap-10 opacity-20">
             <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sovereign Mode
             </div>
             <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] uppercase">
                <Lock className="w-3.5 h-3.5" />
                Local Privacy
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
