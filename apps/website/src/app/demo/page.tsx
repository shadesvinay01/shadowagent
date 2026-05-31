"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Shield, Zap, MessageSquare, Mail, Calendar, FileText, 
  Terminal, Bot, User, Check, X, Sparkles, Send, Activity, Lock, Cpu, Key
} from "lucide-react";
import Link from "next/link";

interface SimulationStep {
  id: number;
  title: string;
  caption: string;
}

const STEPS: SimulationStep[] = [
  { id: 1, title: "Sovereign Activation", caption: "Welcome to Shadow. The app launches offline and validates the sovereign license key locally, verifying the secure node connection." },
  { id: 2, title: "Memory Bank (Local RAG)", caption: "Private data is ingested entirely offline. The documents are split, embedded via Ollama, and saved directly to the local HNSW vector store." },
  { id: 3, title: "Local Neural Chat", caption: "The user asks the agent to consolidate updates. The agent triggers local tools, mirroring WhatsApp messages and reading secure IMAP e-mail packets." },
  { id: 4, title: "Autonomous Hub Suggestion", caption: "Shadow's polling engine flags scheduling requests from e-mails. It drafts calendar slots, waiting for a secure one-click user approval." },
  { id: 5, title: "Zero-Server Policy", caption: "Execution complete. The meeting is written to calendar.ics and synced across local nodes. 100% offline, 100% yours." }
];

export default function DemoSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [captionText, setCaptionText] = useState("");
  
  // Animation states for simulation stages
  const [emailInput, setEmailInput] = useState("");
  const [licenseInput, setLicenseInput] = useState("");
  const [activationState, setActivationState] = useState<"typing" | "verifying" | "activated">("typing");
  
  const [ragProgress, setRagProgress] = useState(0);
  const [ragLogs, setRagLogs] = useState<string[]>([]);
  const [ragSuccess, setRagSuccess] = useState(false);
  
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatTyping, setChatTyping] = useState(false);
  const [chatToolActive, setChatToolActive] = useState<string | null>(null);
  
  const [hubActionStatus, setHubActionStatus] = useState<"pending" | "approving" | "approved">("pending");
  const [hubDismissStatus, setHubDismissStatus] = useState<"pending" | "dismissed">("pending");
  
  // Auto progress timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentStep < STEPS.length) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 10000); // Progress every 10 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  // Handle stage transition effects
  useEffect(() => {
    // Reset/Trigger stage-specific animations
    const step = currentStep;
    
    // Caption writing effect
    let charIndex = 0;
    const fullCaption = STEPS[step - 1].caption;
    setCaptionText("");
    const textTimer = setInterval(() => {
      if (charIndex < fullCaption.length) {
        setCaptionText(prev => prev + fullCaption.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(textTimer);
      }
    }, 15);
    
    if (step === 1) {
      // Step 1 reset
      setEmailInput("");
      setLicenseInput("");
      setActivationState("typing");
      
      // Auto write email & license
      setTimeout(() => {
        let emailText = "ceo@sovereign.ai";
        let emailTyped = "";
        let i = 0;
        const eTimer = setInterval(() => {
          if (i < emailText.length) {
            emailTyped += emailText[i];
            setEmailInput(emailTyped);
            i++;
          } else {
            clearInterval(eTimer);
            // Now type license
            setTimeout(() => {
              let licText = "SHADOW-PRO-99F2-4821";
              let licTyped = "";
              let j = 0;
              const lTimer = setInterval(() => {
                if (j < licText.length) {
                  licTyped += licText[j];
                  setLicenseInput(licTyped);
                  j++;
                } else {
                  clearInterval(lTimer);
                  setActivationState("verifying");
                  setTimeout(() => {
                    setActivationState("activated");
                  }, 1500);
                }
              }, 50);
            }, 500);
          }
        }, 40);
      }, 1000);
    } else if (step === 2) {
      // Step 2 Reset
      setRagProgress(0);
      setRagLogs([]);
      setRagSuccess(false);
      
      // Document upload and logs
      setTimeout(() => {
        setRagLogs(["[system] Selected: Q3_Financial_Projections.pdf", "[system] Size: 1.2 MB"]);
        setTimeout(() => {
          setRagLogs(prev => [...prev, "[system] Parsing document tokens...", "[system] Splitting into 1000-character blocks..."]);
          let progress = 0;
          const progressTimer = setInterval(() => {
            progress += 10;
            setRagProgress(progress);
            if (progress === 30) {
              setRagLogs(prev => [...prev, "[neural] Initializing Ollama local vector embeddings...", "[neural] Model: nomic-embed-text loaded."]);
            }
            if (progress === 60) {
              setRagLogs(prev => [...prev, "[neural] Encoding blocks 1 to 24...", "[neural] Encoding blocks 25 to 48..."]);
            }
            if (progress === 90) {
              setRagLogs(prev => [...prev, "[database] Storing vector points in HNSW indices...", "[database] Writing local database nodes..."]);
            }
            if (progress >= 100) {
              clearInterval(progressTimer);
              setRagSuccess(true);
              setRagLogs(prev => [...prev, "✓ SUCCESS: Ingestion complete. Index refreshed."]);
            }
          }, 300);
        }, 1000);
      }, 500);
    } else if (step === 3) {
      // Step 3 Reset
      setChatMessages([
        { role: "bot", content: "Neural core online. Custom tools linked. How can I assist you?" }
      ]);
      setChatInput("");
      setChatTyping(false);
      setChatToolActive(null);
      
      // Auto type message
      setTimeout(() => {
        let msg = "Check email and WhatsApp for new updates, and consolidate tasks.";
        let typed = "";
        let i = 0;
        const msgTimer = setInterval(() => {
          if (i < msg.length) {
            typed += msg[i];
            setChatInput(typed);
            i++;
          } else {
            clearInterval(msgTimer);
            // Send
            setTimeout(() => {
              setChatMessages(prev => [...prev, { role: "user", content: msg }]);
              setChatInput("");
              setChatTyping(true);
              
              // Run WhatsApp Tool
              setTimeout(() => {
                setChatToolActive("WhatsApp Node");
                // Run Email Tool
                setTimeout(() => {
                  setChatToolActive("Email Intelligence");
                  // Final reply
                  setTimeout(() => {
                    setChatTyping(false);
                    setChatToolActive(null);
                    setChatMessages(prev => [...prev, { 
                      role: "bot", 
                      content: "Local sync complete. Found details:\n\n1. Email from Sarah (Sarah Ops): Suggested a Q3 Project review meeting.\n2. WhatsApp (Investor Update): Unread messages asking for a live demo.\n\nI have created suggested actions in your Autonomous Hub." 
                    }]);
                  }, 2000);
                }, 1500);
              }, 1000);
            }, 500);
          }
        }, 40);
      }, 1000);
    } else if (step === 4) {
      // Step 4 Reset
      setHubActionStatus("pending");
      setHubDismissStatus("pending");
      
      // Auto-click suggestion
      setTimeout(() => {
        setHubActionStatus("approving");
        setTimeout(() => {
          setHubActionStatus("approved");
        }, 2000);
      }, 3500);
    }
    
    return () => clearInterval(textTimer);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans overflow-x-hidden relative selection:bg-cyan-500/20">
      {/* Visual background lights */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="bg-glow glow-left opacity-20" />
      <div className="bg-glow glow-right opacity-20" />

      {/* Top Navbar */}
      <header className="px-10 h-20 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between relative z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px]">
            <div className="w-full h-full rounded-lg bg-black flex items-center justify-center">
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-syne font-bold text-lg tracking-tight">ShadowAgent</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">DEMO SIMULATOR MODE</span>
          <Link href="/" className="px-5 py-2 border border-white/10 hover:bg-white/5 rounded-full text-xs font-bold transition-all">
            Exit Demo
          </Link>
        </div>
      </header>

      {/* Simulator Core Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-6xl w-full mx-auto relative z-10">
        
        {/* Stages Timeline HUD */}
        <div className="w-full flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <div className="flex gap-4">
            {STEPS.map((s) => (
              <button 
                key={s.id}
                onClick={() => {
                  setCurrentStep(s.id);
                  setIsPlaying(false);
                }}
                className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-2.5 ${
                  currentStep === s.id 
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
                    : currentStep > s.id 
                      ? "border-green-500/20 text-green-400 bg-green-500/5"
                      : "border-white/5 text-white/40 hover:bg-white/5"
                }`}
              >
                {currentStep > s.id ? <Check className="w-3.5 h-3.5" /> : <span className="font-mono text-[10px]">0{s.id}</span>}
                {s.title}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="p-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Pause Timeline" : "Auto Play"}
            </button>
            <button 
              onClick={() => {
                setCurrentStep(1);
                setIsPlaying(true);
              }}
              className="p-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentStep(prev => Math.min(STEPS.length, prev + 1))}
              className="p-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Container (Tauri UI Simulation) */}
        <div className="w-full h-[620px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase ml-2">ShadowAgent_Client_Shell.app</span>
            </div>
            <div className="flex gap-6 items-center text-[10px] font-mono text-white/20">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan-400" /> LOCAL: AIR_GAPPED</span>
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /> OLLAMA: ACTIVE</span>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Mock */}
            <div className="w-[200px] border-r border-white/5 bg-black/20 p-4 space-y-2">
              <div className="h-10 flex items-center px-4 mb-4"><Shield className="w-5 h-5 text-cyan-400 mr-2" /><span className="font-bold text-sm">Shadow</span></div>
              {[
                { label: "Neural Chat", active: currentStep === 3 },
                { label: "Tools Hub", active: false },
                { label: "Autonomous Hub", active: currentStep === 4 },
                { label: "Memory Bank", active: currentStep === 2 },
                { label: "Preferences", active: currentStep === 1 || currentStep === 5 }
              ].map((tab, i) => (
                <div 
                  key={i} 
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    tab.active ? "bg-white/10 text-white border-l-2 border-cyan-400" : "text-white/25"
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Central Stage Screens */}
            <div className="flex-1 bg-black/10 relative overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                
                {/* STAGE 1 SCREEN: ONBOARDING WIZARD */}
                {currentStep === 1 && (
                  <motion.div 
                    key="step-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center p-10 relative"
                  >
                    <div className="w-full max-w-md p-8 glass-panel border-white/10 rounded-3xl space-y-6 text-center">
                      <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Key className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Activate Sovereign Core</h3>
                        <p className="text-xs text-white/30 font-medium">Verify your offline authorization key.</p>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            readOnly value={emailInput}
                            placeholder="USER@SOVEREIGN.AI"
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-xs font-mono text-center text-white placeholder-white/5 focus:outline-none uppercase"
                          />
                        </div>
                        <div className="relative">
                          <input 
                            readOnly value={licenseInput}
                            placeholder="SHADOW-XXXX-XXXX"
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-xs font-mono text-center text-white placeholder-white/5 focus:outline-none uppercase"
                          />
                        </div>
                      </div>

                      {activationState === "verifying" && (
                        <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-mono animate-pulse">
                          <Activity className="w-4 h-4 animate-spin" /> VERIFYING LOCAL SHA-256 SIGNATURE...
                        </div>
                      )}

                      {activationState === "activated" && (
                        <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest bg-green-500/10 border border-green-500/20 py-2 rounded-xl">
                          <Check className="w-4 h-4" /> Activated // Node Sync Stable
                        </div>
                      )}

                      <button disabled className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all ${
                        activationState === "activated" ? "bg-green-600 text-white" : "bg-white text-black"
                      }`}>
                        {activationState === "activated" ? "Finalized" : "Finalize Core"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 2 SCREEN: MEMORY BANK */}
                {currentStep === 2 && (
                  <motion.div 
                    key="step-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full p-8 flex flex-col space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight">Memory Bank</h3>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">RAG Ingestion Database</p>
                      </div>
                      <div className="px-3 py-1 rounded-full border border-orange-500/20 text-[9px] font-bold text-orange-400 bg-orange-500/5 uppercase">
                        HNSW Indexer
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-6 flex-1 min-h-0">
                      {/* Document List */}
                      <div className="col-span-2 border border-white/5 rounded-2xl bg-black/10 p-5 flex flex-col space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Indexed Content</h4>
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                          <div className="p-3 border border-white/5 bg-white/[0.02] rounded-xl flex items-center justify-between text-xs">
                            <span className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-orange-400" /> company_policy.pdf</span>
                            <span className="text-[9px] font-mono text-green-400">READY</span>
                          </div>
                          {ragLogs.length > 0 && (
                            <motion.div 
                              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              className="p-3 border border-orange-500/20 bg-orange-500/[0.02] rounded-xl flex items-center justify-between text-xs"
                            >
                              <span className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-orange-400 animate-bounce" /> projections.pdf</span>
                              <span className="text-[9px] font-mono text-orange-400 animate-pulse">{ragSuccess ? "READY" : "PARSING"}</span>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Diagnostic Logs & Upload Visual */}
                      <div className="col-span-3 border border-white/5 rounded-2xl bg-black/20 p-5 flex flex-col justify-between">
                        <div className="space-y-4 flex-1 flex flex-col">
                          <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Console Operations</h4>
                          
                          {/* Mock Ingestion Area */}
                          {ragProgress === 0 ? (
                            <div className="border border-dashed border-white/10 hover:border-orange-500/20 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group flex-1">
                              <FileText className="w-8 h-8 text-white/25 group-hover:text-orange-400 transition-colors animate-pulse" />
                              <span className="text-xs font-bold">Uploading Q3_Financial_Projections.pdf...</span>
                              <span className="text-[9px] text-white/20">Awaiting local character block split.</span>
                            </div>
                          ) : (
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[9px] text-white/40 space-y-1.5 overflow-y-auto max-h-[220px]">
                                {ragLogs.map((log, index) => (
                                  <div key={index} className={log.includes("SUCCESS") ? "text-green-400" : ""}>{log}</div>
                                ))}
                              </div>
                              <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase">
                                  <span>Embedding Matrix Generation</span>
                                  <span>{ragProgress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-300" style={{ width: `${ragProgress}%` }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 3 SCREEN: NEURAL CHAT */}
                {currentStep === 3 && (
                  <motion.div 
                    key="step-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-between p-6"
                  >
                    {/* Chat Feed */}
                    <div className="flex-1 overflow-y-auto space-y-4 p-4 min-h-0">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.role === "bot" && (
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4.5 h-4.5" />
                            </div>
                          )}
                          <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed ${
                            msg.role === "user" 
                              ? "bg-white text-black font-semibold rounded-tr-none shadow-md" 
                              : "border border-white/5 bg-white/[0.02] text-white/80 rounded-tl-none"
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}

                      {chatTyping && (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                            <Sparkles className="w-4.5 h-4.5" />
                          </div>
                          <div className="border border-white/5 bg-white/[0.02] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-4">
                            <div className="flex gap-1.5">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                            </div>
                            {chatToolActive && (
                              <div className="px-2.5 py-0.5 border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[8px] font-black uppercase tracking-widest rounded-full">
                                Accessing: {chatToolActive}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-2 border-t border-white/5">
                      <div className="relative">
                        <input 
                          readOnly value={chatInput}
                          placeholder="Ask ShadowAgent to automate something..."
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-xs text-white placeholder-white/10 focus:outline-none"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white text-black">
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 4 SCREEN: AUTONOMOUS SUGGESTIONS HUB */}
                {currentStep === 4 && (
                  <motion.div 
                    key="step-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full p-8 flex flex-col space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight">Autonomous Hub</h3>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Active Action Recommendations</p>
                      </div>
                      <div className="px-3 py-1 rounded-full border border-cyan-500/20 text-[9px] font-bold text-cyan-400 bg-cyan-500/5 uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                        <Zap className="w-3 h-3" /> Monitoring Inbox
                      </div>
                    </div>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 min-h-0">
                      {/* Suggestion Card 1 */}
                      <div className={`p-6 border rounded-2xl flex items-center justify-between gap-6 transition-all duration-500 ${
                        hubActionStatus === "approved" 
                          ? "border-green-500/20 bg-green-500/[0.01]" 
                          : "border-white/5 bg-white/[0.01] hover:border-cyan-500/20"
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              <h4 className="text-sm font-bold">Schedule Proposed Review Meeting</h4>
                              <span className="text-[8px] font-mono tracking-widest text-white/30 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase">Email Sync</span>
                            </div>
                            <p className="text-[11px] text-white/50">Sarah Ops requested a slot for Q3 Project Review. Suggesting calendar sync booking.</p>
                            <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-white/30">
                              Proposed: Tomorrow, 2:00 PM - 3:00 PM @ Calendar.ics
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {hubActionStatus === "pending" && (
                            <button className="px-5 py-2.5 bg-cyan-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-cyan-500/5">
                              Approve & Run
                            </button>
                          )}
                          {hubActionStatus === "approving" && (
                            <button className="px-5 py-2.5 bg-cyan-600/40 text-cyan-200 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                              <Activity className="w-3.5 h-3.5 animate-spin" /> Executing
                            </button>
                          )}
                          {hubActionStatus === "approved" && (
                            <span className="text-green-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl">
                              <Check className="w-4 h-4" /> Executed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Suggestion Card 2 */}
                      <div className="p-6 border border-white/5 bg-white/[0.01] hover:border-cyan-500/20 rounded-2xl flex items-center justify-between gap-6 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              <h4 className="text-sm font-bold">Draft WhatsApp Reply</h4>
                              <span className="text-[8px] font-mono tracking-widest text-white/30 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase">WhatsApp Sync</span>
                            </div>
                            <p className="text-[11px] text-white/50">Send automated response to Investor Update inquiry regarding the live demo.</p>
                            <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-white/30">
                              Draft: "Hi, the live demo is ready for review."
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <button className="px-5 py-2.5 bg-white/5 border border-white/15 text-white/60 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 5 SCREEN: SECURE GENERAL PREFERENCES */}
                {currentStep === 5 && (
                  <motion.div 
                    key="step-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full p-8 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold tracking-tight">Sovereign Credentials</h3>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Local System Settings</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 my-4">
                      <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold">Operating System Encryption</h4>
                          <p className="text-[9px] text-white/30 uppercase font-mono mt-0.5">AES-256 Enabled</p>
                        </div>
                      </div>
                      <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold">Zero-Cloud Sync Policy</h4>
                          <p className="text-[9px] text-white/30 uppercase font-mono mt-0.5">Air-Gapped Status</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-green-500/20 bg-green-500/[0.02] p-6 rounded-2xl text-center space-y-3">
                      <Check className="w-10 h-10 text-green-500 mx-auto" />
                      <h4 className="text-sm font-bold uppercase tracking-wide">Secure local system active</h4>
                      <p className="text-xs text-white/40 max-w-sm mx-auto">All inputs, key files, and communication nodes remain stored strictly in OS-Native Credential parameters.</p>
                    </div>

                    <button disabled className="w-full py-4 bg-green-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-green-500/10">
                      Restart Presentation
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Lower Voiceover Caption Track overlay */}
        <div className="w-full mt-10 p-6 rounded-2xl border border-purple-500/20 bg-black/60 backdrop-blur-2xl flex items-start gap-4 shadow-xl">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-[0.2em]">Voiceover Track // Captions</span>
              <span className="text-[9px] font-mono text-white/20">PROGRESS: STEP {currentStep} OF 5</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed font-manrope font-semibold">
              {captionText || "Initializing caption feed..."}
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="h-16 px-10 border-t border-white/5 bg-black/40 flex items-center justify-between text-xs text-white/30 relative z-50">
        <span>© 2026 ShadowAgent Collective. All rights reserved locally.</span>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-white transition-colors">Website</Link>
          <span>·</span>
          <a href="https://ollama.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Ollama</a>
        </div>
      </footer>
    </div>
  );
}
