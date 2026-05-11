import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, Settings, AlertCircle, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { shadowAgent } from "../../lib/agent/agent";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatInterface({ ollamaRunning }: { ollamaRunning: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "ShadowAgent active. Neural link established. How can I assist your local operations today?" }
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
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await shadowAgent.ask(userMsg);
      setMessages(prev => [...prev, { role: "bot", content: response.content }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", content: "CRITICAL ERROR: Failed to process request locally. Verify Ollama status." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full max-w-6xl mx-auto w-full p-8 gap-8 relative">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between pb-6 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg group-hover:blur-xl transition-all" />
            <div className="relative w-12 h-12 rounded-2xl bg-black/60 border border-primary/30 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-primary shadow-glow" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-syne font-bold tracking-tighter text-glow">SHADOWAGENT</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1.5 text-[9px] font-mono text-primary uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3" />
                Security Level: Maximum
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Node_Active</span>
          </div>
          <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/40 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-10 pr-4 custom-scrollbar relative z-10"
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-6 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                msg.role === "user" 
                ? "bg-white/10 border-white/20" 
                : "bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              }`}>
                {msg.role === "user" ? <User className="w-5 h-5 text-white/70" /> : <Bot className="w-5 h-5 text-primary" />}
              </div>
              <div className={`max-w-[75%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-7 py-4 rounded-[1.5rem] text-[0.95rem] leading-relaxed shadow-xl ${
                  msg.role === "user" 
                  ? "bg-white text-black font-semibold rounded-tr-none" 
                  : "glass-panel text-white/90 rounded-tl-none border-white/10"
                }`}>
                  <ReactMarkdown className="markdown-content">{msg.content}</ReactMarkdown>
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mt-1">
                  {msg.role === "user" ? "Authorized User" : "ShadowCore V1.4"}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <div className="glass-panel px-7 py-5 rounded-[1.5rem] rounded-tl-none flex gap-2 items-center">
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                </div>
                <span className="ml-3 text-[10px] text-primary/60 font-mono tracking-[0.2em] uppercase">Processing Query...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <footer className="relative pb-6 z-10">
        <div className="max-w-4xl mx-auto w-full relative">
          <AnimatePresence>
            {!ollamaRunning && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-14 left-0 right-0 flex items-center justify-center gap-3 text-red-400 text-xs font-mono tracking-widest bg-red-500/10 border border-red-500/20 py-2 rounded-xl backdrop-blur-md"
              >
                <AlertCircle className="w-4 h-4" />
                [SYSTEM_OFFLINE]: OLLAMA CORE NOT DETECTED
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-[2rem] blur opacity-30 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={ollamaRunning ? "Communicate with the Shadow..." : "System restricted: Reconnect Ollama"}
                disabled={!ollamaRunning || isThinking}
                className="w-full bg-black/60 border border-white/10 rounded-[1.8rem] px-8 py-5 pr-16 text-[0.95rem] font-manrope focus:outline-none focus:border-primary/40 focus:bg-black/80 transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!ollamaRunning || isThinking || !input.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all disabled:opacity-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-5 flex items-center justify-center gap-8 opacity-20">
            <div className="flex items-center gap-2 text-[8px] font-mono tracking-[0.3em]">
              <Terminal className="w-3 h-3" />
              ENCRYPTION: AES-256
            </div>
            <div className="flex items-center gap-2 text-[8px] font-mono tracking-[0.3em]">
              <ShieldCheck className="w-3 h-3" />
              DATA_VAULT: LOCAL_ONLY
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
