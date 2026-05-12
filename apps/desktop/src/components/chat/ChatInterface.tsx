"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, ShieldCheck, Terminal, Paperclip, Mic } from "lucide-react";
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
      content: "Sovereign Link Established. Neural engine standing by.",
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
      setMessages(prev => [...prev, { role: "bot", content: "ERROR: LINK_TIMEOUT", timestamp: time }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full relative">
      
      {/* Chat History - High Performance */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-10 p-10 pr-12 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-6 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                msg.role === "user" ? "bg-white/5 border-white/10" : "bg-blue-600 border-blue-400"
              }`}>
                {msg.role === "user" ? <User className="w-5 h-5 text-white/40" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              <div className={`max-w-[75%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-7 py-4 rounded-[1.5rem] text-[1.05rem] leading-relaxed transition-all ${
                  msg.role === "user" 
                  ? "bg-white text-black font-bold rounded-tr-none" 
                  : "bg-[#1A1A1A] border border-white/5 text-white/90 rounded-tl-none"
                }`}>
                  <ReactMarkdown className="prose prose-invert max-w-none prose-p:leading-relaxed">
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">
                   {msg.role === "user" ? "USER" : "SHADOW"} // {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="bg-[#1A1A1A] border border-white/5 px-7 py-4 rounded-[1.5rem] rounded-tl-none flex gap-4 items-center">
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sovereign Input Console */}
      <footer className="p-10 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-white/5 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative bg-[#111111] border border-white/10 rounded-[1.8rem] p-2 flex items-center gap-2 group-focus-within:border-white/20 transition-all">
              
              <button className="p-3.5 rounded-xl text-white/10 hover:text-white/40 transition-colors">
                 <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={ollamaRunning ? "Communicate with Sovereign Node..." : "Waiting for Neural Engine..."}
                disabled={!ollamaRunning || isThinking}
                className="flex-1 bg-transparent px-3 py-4 text-[1.1rem] font-medium focus:outline-none placeholder:text-white/10"
              />
              
              <button
                onClick={handleSend}
                disabled={!ollamaRunning || isThinking || !input.trim()}
                className="p-4 rounded-xl bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center gap-10 opacity-20">
             <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.4em] uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Safe_Mode
             </div>
             <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.4em] uppercase">
                <Terminal className="w-3.5 h-3.5" />
                No_Link_Breaks
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
