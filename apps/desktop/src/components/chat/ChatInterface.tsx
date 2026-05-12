"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Bot, Sparkles, Paperclip, Mic, 
  RotateCcw, Copy, Check, Bookmark, Zap, 
  Command, Target, Terminal, Fingerprint
} from "lucide-react";
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
    "Schedule a meeting for tomorrow at 10 AM",
    "Analyze the latest PDF in my Documents"
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
              {/* Avatar Hub */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all border ${
                msg.role === "user" 
                ? "bg-white/5 border-white/10" 
                : "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              }`}>
                {msg.role === "user" ? <User className="w-6 h-6 text-white/30" /> : <Bot className="w-6 h-6 text-cyan-400" />}
              </div>

              {/* Message Container */}
              <div className={`max-w-[70%] space-y-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-8 py-5 rounded-[2rem] text-[1.1rem] leading-relaxed shadow-2xl transition-all ${
                  msg.role === "user" 
                  ? "bg-white text-black font-extrabold rounded-tr-none" 
                  : "glass-panel text-white/90 rounded-tl-none"
                }`}>
                  <ReactMarkdown className="markdown-content prose prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-cyan-400">
                    {msg.content}
                  </ReactMarkdown>
                </div>
                
                {/* Message Actions */}
                <div className={`flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] ${msg.role === "user" ? "justify-end text-white/10" : "justify-start text-white/20"}`}>
                   <span>{msg.timestamp}</span>
                   {msg.role === "bot" && (
                     <div className="flex items-center gap-3 ml-2 border-l border-white/5 pl-4">
                        <button className="hover:text-cyan-400 transition-colors"><RotateCcw className="w-3 h-3" /></button>
                        <button className="hover:text-cyan-400 transition-colors"><Copy className="w-3 h-3" /></button>
                        <button className="hover:text-cyan-400 transition-colors"><Bookmark className="w-3 h-3" /></button>
                     </div>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="glass-panel px-8 py-5 rounded-[2rem] rounded-tl-none flex gap-5 items-center">
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <span className="text-[10px] text-cyan-400/60 font-black tracking-[0.4em] uppercase">Synthesizing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Floating Command Suggestion Chips */}
      <div className="px-12 py-4 flex gap-4 overflow-x-auto custom-scrollbar no-scrollbar relative z-20">
         {suggestions.map((s, i) => (
           <button 
             key={i}
             onClick={() => setInput(s)}
             className="px-6 py-2.5 rounded-full glass-card whitespace-nowrap text-[10px] font-bold uppercase tracking-widest hover:border-cyan-500/40 hover:text-cyan-400 transition-all active:scale-95"
           >
              {s}
           </button>
         ))}
      </div>

      {/* 3. The Billion-Dollar Command Input */}
      <footer className="p-10 relative z-30">
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Glowing Focus Ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative glass-panel rounded-[2.2rem] p-3 flex items-center gap-2 group-focus-within:border-cyan-500/30 transition-all">
            
            {/* Attachment Button */}
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/20 hover:text-white/60 hover:bg-white/5 transition-all">
               <Paperclip className="w-5 h-5" />
            </button>

            {/* Main Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={ollamaRunning ? "Ask ShadowAgent to automate something..." : "Neural Engine Offline..."}
              disabled={!ollamaRunning || isThinking}
              className="flex-1 bg-transparent px-4 py-5 text-lg font-medium focus:outline-none placeholder:text-white/10"
            />
            
            {/* Action Bar */}
            <div className="flex items-center gap-3 px-3">
               <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/20 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">
                  <Mic className="w-5 h-5" />
               </button>
               
               <button
                  onClick={handleSend}
                  disabled={!ollamaRunning || isThinking || !input.trim()}
                  className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-0 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <Send className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="mt-6 flex justify-center gap-12 opacity-20">
             <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em]">
                <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
                Sovereign Mode Active
             </div>
             <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em]">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Zero-Leak Privacy
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
