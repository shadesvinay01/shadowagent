"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Bot, Sparkles, Paperclip, Mic
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
  const [activeTool, setActiveTool] = useState<string | null>(null);
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
    setActiveTool(null);

    try {
      // In a real scenario, we would stream this and update activeTool
      // For now, we simulate the tool detection
      if (userMsg.toLowerCase().includes("whatsapp")) setActiveTool("WhatsApp Agent");
      if (userMsg.toLowerCase().includes("email")) setActiveTool("Email Intelligence");
      
      const response = await shadowAgent.ask(userMsg);
      setMessages(prev => [...prev, { role: "bot", content: response.content, timestamp: time }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", content: "FATAL_ERROR: Neural engine link lost. Please verify local connectivity.", timestamp: time }]);
    } finally {
      setIsThinking(false);
      setActiveTool(null);
    }
  };

  const suggestions = [
    "Summarize my unread emails",
    "Check WhatsApp for new messages",
    "Schedule a meeting for tomorrow at 10 AM"
  ];

  return (
    <div className="flex-1 flex flex-col h-full w-full relative">
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
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all ${
                msg.role === "user" 
                ? "bg-white/5 border-white/10" 
                : "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
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
                {activeTool && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                     <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest">Accessing: {activeTool}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-12 py-4 flex gap-4 overflow-x-auto no-scrollbar relative z-20">
         {suggestions.map((s, i) => (
           <button 
             key={i}
             onClick={() => setInput(s)}
             className="px-6 py-2.5 rounded-full glass-card whitespace-nowrap text-[10px] font-bold uppercase tracking-widest hover:text-cyan-400 transition-all"
           >
              {s}
           </button>
         ))}
      </div>

      <footer className="p-10 relative z-30">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative glass-panel rounded-[2.2rem] p-3 flex items-center gap-2">
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/20 hover:text-white/60 transition-all">
               <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={ollamaRunning ? "Ask ShadowAgent to automate something..." : "Neural Engine Offline..."}
              disabled={!ollamaRunning || isThinking}
              className="flex-1 bg-transparent px-4 py-5 text-lg font-medium focus:outline-none placeholder:text-white/10"
            />
            <div className="flex items-center gap-3 px-3">
               <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/20 hover:text-cyan-400 transition-all">
                  <Mic className="w-5 h-5" />
               </button>
               <button
                  onClick={handleSend}
                  disabled={!ollamaRunning || isThinking || !input.trim()}
                  className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <Send className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
