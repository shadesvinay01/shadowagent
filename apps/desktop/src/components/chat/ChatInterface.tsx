"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Bot, Sparkles, Paperclip, Mic, 
  RotateCcw, Copy, Check, Bookmark, Zap, 
  Command, Terminal, ShieldCheck
} from "lucide-react";
import { shadowAgent } from "../../lib/agent/agent";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function ChatInterface({ ollamaRunning }: { ollamaRunning: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      content: "Neural link established. I am ready to automate your workflow in Sovereign Mode. How can I assist your operations today?",
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
      setMessages(prev => [...prev, { role: "bot", content: "FATAL_ERROR: Neural engine link lost. Please verify local connectivity.", timestamp: time }]);
    } finally {
      setIsThinking(false);
    }
  };

  const suggestions = [
    "Summarize my unread emails",
    "Check WhatsApp for new messages",
    "Schedule a meeting for tomorrow at 10 AM"
  ];

  return (
    <div className="flex-1 flex flex-col h-full w-full relative">
      
      {/* 1. Chat History Area */}
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
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                msg.role === "user" ? "bg-white/5 border-white/10" : "bg-cyan-500/10 border-cyan-500/30"
              }`}>
                {msg.role === "user" ? <User className="w-6 h-6 text-white/30" /> : <Bot className="w-6 h-6 text-cyan-400" />}
              </div>

              <div className={`max-w-[70%] space-y-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-8 py-5 rounded-[2rem] text-[1.1rem] leading-relaxed shadow-2xl transition-all whitespace-pre-wrap ${
                  msg.role === "user" 
                  ? "bg-white text-black font-extrabold rounded-tr-none" 
                  : "glass-panel text-white/90 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
                
                <div className={`flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] ${msg.role === "user" ? "justify-end text-white/10" : "justify-start text-white/20"}`}>
                   <span>{msg.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="glass-panel px-8 py-5 rounded-[2rem] rounded-tl-none flex gap-5 items-center">
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Command Input */}
      <footer className="p-10 relative z-30">
        <div className="max-w-4xl mx-auto relative group">
          <div className="relative glass-panel rounded-[2.2rem] p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask ShadowAgent..."
              disabled={!ollamaRunning || isThinking}
              className="flex-1 bg-transparent px-4 py-5 text-lg font-medium focus:outline-none placeholder:text-white/10"
            />
            <button
              onClick={handleSend}
              disabled={!ollamaRunning || isThinking || !input.trim()}
              className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
