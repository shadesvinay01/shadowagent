"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, User, Bot, Sparkles, Paperclip, Mic, MicOff, X, AlertTriangle
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
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  // FIX: recording state for mic button
  const [isRecording, setIsRecording] = useState(false);
  // FIX: track attached file name
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || !ollamaRunning || isThinking) return;
    const userMsg = attachedFile ? `[File: ${attachedFile}]\n${input}` : input;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", content: userMsg, timestamp: time }]);
    setInput("");
    setAttachedFile(null);
    setIsThinking(true);
    setActiveTool(null);

    try {
      if (userMsg.toLowerCase().includes("whatsapp")) setActiveTool("WhatsApp Agent");
      if (userMsg.toLowerCase().includes("email")) setActiveTool("Email Intelligence");

      const response = await shadowAgent.ask(userMsg);
      setMessages((prev) => [...prev, { role: "bot", content: response.content, timestamp: time }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "FATAL_ERROR: Neural engine link lost. Please verify Ollama is running (`ollama serve`).",
          timestamp: time,
        },
      ]);
    } finally {
      setIsThinking(false);
      setActiveTool(null);
    }
  };

  // FIX: Paperclip — open a real file picker
  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file.name);
    e.target.value = "";
  };

  // FIX: Mic — toggle recording state (hooks into Web Speech API when available)
  const handleMic = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev ? `${prev} ${transcript}` : transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    setIsRecording(true);
  };

  const suggestions = [
    "Summarize my unread emails",
    "Check WhatsApp for new messages",
    "Schedule a meeting for tomorrow at 10 AM",
  ];

  return (
    <div className="flex-1 flex flex-col h-full w-full relative">
      {/* Hidden file input for attachment */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.md,.doc,.docx"
        className="hidden"
        onChange={handleFileSelected}
      />

      {/* FIX: Helpful offline banner instead of a silent disabled state */}
      <AnimatePresence>
        {!ollamaRunning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-10 mt-6 p-5 rounded-2xl border border-orange-500/30 bg-orange-500/5 flex items-start gap-4"
          >
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-orange-400">Neural engine offline</p>
              <p className="text-xs text-white/40 mt-1 leading-relaxed">
                Ollama is not running. Open a terminal and run{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/70">ollama serve</code>.
                {" "}Don't have Ollama?{" "}
                <a
                  href="https://ollama.com/download"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-400 underline"
                >
                  Download it free →
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all ${
                  msg.role === "user"
                    ? "bg-white/5 border-white/10"
                    : "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-6 h-6 text-white/30" />
                ) : (
                  <Bot className="w-6 h-6 text-cyan-400" />
                )}
              </div>

              <div
                className={`max-w-[70%] space-y-3 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-8 py-5 rounded-[2rem] text-[1.1rem] leading-relaxed shadow-2xl transition-all whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-white text-black font-extrabold rounded-tr-none"
                      : "glass-panel text-white/90 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
                <div
                  className={`flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] ${
                    msg.role === "user"
                      ? "justify-end text-white/10"
                      : "justify-start text-white/20"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-8"
            >
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
                    <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest">
                      Accessing: {activeTool}
                    </span>
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
        {/* FIX: Show attached file badge */}
        <AnimatePresence>
          {attachedFile && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="max-w-4xl mx-auto mb-3 flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 w-fit"
            >
              <span className="text-xs text-white/60 font-bold">{attachedFile}</span>
              <button onClick={() => setAttachedFile(null)} className="text-white/20 hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative glass-panel rounded-[2.2rem] p-3 flex items-center gap-2">
            {/* FIX: Paperclip opens file picker */}
            <button
              onClick={handleAttach}
              title="Attach a file"
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/20 hover:text-cyan-400 transition-all"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                ollamaRunning
                  ? "Ask ShadowAgent to automate something..."
                  : "Start Ollama first to enable chat..."
              }
              disabled={isThinking}
              className="flex-1 bg-transparent px-4 py-5 text-lg font-medium focus:outline-none placeholder:text-white/10"
            />

            <div className="flex items-center gap-3 px-3">
              {/* FIX: Mic toggles voice input */}
              <button
                onClick={handleMic}
                title={isRecording ? "Stop recording" : "Voice input"}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                    : "text-white/20 hover:text-cyan-400"
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleSend}
                disabled={!ollamaRunning || isThinking || !input.trim()}
                className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
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
