"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Terminal, User, Bot, Sparkles } from "lucide-react";

const INITIAL_MESSAGES = [
  { role: "bot", content: "System initialized. I am your ShadowAgent. How can I help you locally today?" }
];

const SAMPLE_COMMANDS = [
  "Summarize my last 5 WhatsApp messages",
  "Check my calendar for conflicts tomorrow",
  "Analyze the PDF on my desktop",
  "Draft a reply to the email from John"
];

export default function LiveDemo() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;
    setMessages(prev => [...prev, { role: "user", content }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      let response = "I've processed your request locally. ";
      if (content.toLowerCase().includes("whatsapp")) {
        response += "Found 5 messages from 'Development Team'. Summary: Project deadline moved to Friday. Would you like me to draft a reply?";
      } else if (content.toLowerCase().includes("calendar")) {
        response += "You have a conflict at 2 PM between 'Client Sync' and 'Internal Review'. I recommend rescheduling the review.";
      } else {
        response += "Command executed successfully within your local environment. No data was transmitted.";
      }
      setMessages(prev => [...prev, { role: "bot", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="demo" className="relative py-32 px-6 section-panel">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-manrope font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4">Live Demo</p>
          <h2 className="text-4xl md:text-6xl font-syne font-bold mb-4 tracking-tight">
            Experience the <span className="text-white/40">ShadowAgent</span>
          </h2>
          <p className="text-white/50 font-manrope">Interact with the simulated local agent interface below.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[600px]"
            style={{ background: 'rgb(7,7,14)' }}
          >
            {/* Window Header */}
            <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between"
              style={{ background: 'rgb(10,10,20)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-2" />
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <Terminal className="w-3 h-3" />
                  <span>LOCAL_NODE_01 // ACTIVE</span>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full border border-green-500/20 text-[10px] text-green-400 font-syne font-bold uppercase tracking-wider"
                style={{ background: 'rgba(34,197,94,0.06)' }}>
                Secure Channel
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
                  >
                    {msg.role === "bot" && (
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/8"
                        style={{ background: 'rgb(15,15,28)' }}>
                        <Bot className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm font-manrope ${
                      msg.role === "user"
                        ? "bg-white text-black font-medium rounded-tr-none"
                        : "border border-white/8 text-white/80 rounded-tl-none"
                    }`} style={msg.role !== "user" ? { background: 'rgb(14,14,26)' } : {}}>
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgb(15,15,28)' }}>
                        <User className="w-4 h-4 text-white/70" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgb(15,15,28)' }}>
                      <Bot className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="border border-white/8 px-4 py-3 rounded-xl rounded-tl-none"
                      style={{ background: 'rgb(14,14,26)' }}>
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/8" style={{ background: 'rgb(10,10,20)' }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {SAMPLE_COMMANDS.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(cmd)}
                    className="text-[10px] px-3 py-1.5 rounded-lg border border-white/8 hover:border-cyan-500/40 hover:text-cyan-400 transition-all text-white/40 font-manrope"
                    style={{ background: 'rgb(14,14,26)' }}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask your local agent anything..."
                  className="w-full border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-sm font-manrope text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/40 transition-all"
                  style={{ background: 'rgb(12,12,22)' }}
                />
                <button
                  onClick={() => handleSend(input)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-6 text-[10px] text-white/25 font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  LATENCY: 12ms (LOCAL)
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  MODEL: SHADOW-LITE-V1
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
