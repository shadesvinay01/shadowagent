"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot, Sparkles, Settings, AlertCircle, ShieldCheck, Terminal, Cpu, Info, CornerDownLeft } from "lucide-react";
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
      content: "System initialized. Local neural link active. Standing by for instructions.",
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
      setMessages(prev => [...prev, { role: "bot", content: "ERROR: Local engine connection failed.", timestamp: time }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-transparent">
      
      {/* Editorial Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-16 p-12 pr-16 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-10 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Minimal Icon */}
            <div className={`mt-1 flex-shrink-0 ${msg.role === "user" ? "text-white/20" : "text-white"}`}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Editorial Content */}
            <div className={`max-w-[70%] space-y-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div className={`text-[1.05rem] leading-relaxed font-space ${
                msg.role === "user" ? "text-white font-medium" : "text-white/80"
              }`}>
                <ReactMarkdown className="markdown-content prose prose-invert prose-sm max-w-none">
                  {msg.content}
                </ReactMarkdown>
              </div>
              <div className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
                 {msg.role === "user" ? "Sovereign_User" : "Shadow_Agent"} // {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="flex gap-10 items-center">
            <div className="text-white animate-pulse">
               <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-[10px] text-white/20 font-mono tracking-[0.4em] uppercase animate-pulse">
               Processing_Neural_Weights...
            </div>
          </div>
        )}
      </div>

      {/* Modern High-Contrast Input */}
      <footer className="p-10 bg-black/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={ollamaRunning ? "Type a command..." : "System restricted: Reconnect local engine"}
            disabled={!ollamaRunning || isThinking}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-8 py-5 text-lg font-space focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all disabled:opacity-20"
          />
          
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
             <div className="flex items-center gap-2 text-white/10 text-[9px] font-mono mr-2">
                <CornerDownLeft className="w-3 h-3" />
                ENTER
             </div>
             <button
                onClick={handleSend}
                disabled={!ollamaRunning || isThinking || !input.trim()}
                className="p-3 rounded-lg bg-white text-black hover:bg-white/90 active:scale-95 transition-all disabled:opacity-0"
              >
                <Send className="w-4 h-4" />
              </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-10 opacity-10">
           <div className="flex items-center gap-2 text-[8px] font-mono tracking-widest uppercase">
              <ShieldCheck className="w-3 h-3" />
              Sovereignty_Active
           </div>
           <div className="flex items-center gap-2 text-[8px] font-mono tracking-widest uppercase">
              <Terminal className="w-3 h-3" />
              Dev_Console: Closed
           </div>
        </div>
      </footer>

      <style jsx global>{`
        .prose { --tw-prose-body: rgba(255,255,255,0.7); }
        .prose strong { color: white; }
        .prose code { color: #00f0ff; background: rgba(255,255,255,0.05); padding: 2px 4px; border-radius: 4px; }
      `}</style>
    </div>
  );
}
