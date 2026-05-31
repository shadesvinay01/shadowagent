"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Shield, Zap, MessageSquare, Mail, Calendar, FileText, 
  Terminal, Bot, User, Check, X, Sparkles, Send, Activity, Lock, Cpu, Key, Volume2, VolumeX, Eye, ArrowRight, Compass, RefreshCw
} from "lucide-react";
import Link from "next/link";

interface SimulationStep {
  id: number;
  title: string;
  caption: string;
  glowClass: string;
  view: "settings" | "knowledge" | "chat" | "hub" | "general";
}

const STEPS: SimulationStep[] = [
  { id: 1, title: "Sovereign Activation", caption: "Welcome to Shadow. The app launches offline and validates the sovereign license key locally, verifying the secure node connection.", glowClass: "from-cyan-500/10 via-transparent to-transparent", view: "settings" },
  { id: 2, title: "Memory Bank (Local RAG)", caption: "Private data is ingested entirely offline. The documents are split, embedded via Ollama, and saved directly to the local HNSW vector store.", glowClass: "from-orange-500/10 via-transparent to-transparent", view: "knowledge" },
  { id: 3, title: "Local Neural Chat", caption: "The user asks the agent to consolidate updates. The agent triggers local tools, mirroring WhatsApp messages and reading secure IMAP e-mail packets.", glowClass: "from-purple-500/10 via-transparent to-transparent", view: "chat" },
  { id: 4, title: "Autonomous Hub Suggestion", caption: "Shadow's polling engine flags scheduling requests from e-mails. It drafts calendar slots, waiting for a secure one-click user approval.", glowClass: "from-pink-500/10 via-transparent to-transparent", view: "hub" },
  { id: 5, title: "Zero-Server Policy", caption: "Execution complete. The meeting is written to calendar.ics and synced across local nodes. 100% offline, 100% yours.", glowClass: "from-green-500/10 via-transparent to-transparent", view: "general" }
];

const SLIDES = [
  {
    title: "The Security Leak",
    subtitle: "Enterprise Threat Vector",
    bullets: [
      "Traditional cloud AI engines leak sensitive corporate data to external servers.",
      "Over $4.2B in IP loss annually due to employee chat transcripts.",
      "Compliance policies (GDPR/HIPAA) block cloud integration for confidential fields."
    ],
    metric: "$4.2B",
    metricLabel: "Annual Cloud Data Risk"
  },
  {
    title: "100% Local RAG Bank",
    subtitle: "Air-Gapped Intelligence",
    bullets: [
      "Your documents are parsed and vectorized strictly on device hardware.",
      "Powered by Ollama (Llama-3-Groq-Tool-Use) and nomic-embed-text.",
      "HNSW vector indices match user queries locally in under 15ms."
    ],
    metric: "< 15ms",
    metricLabel: "Local Vector Query Speed"
  },
  {
    title: "Unified Integration Nodes",
    subtitle: "Secure Workspace Mirroring",
    bullets: [
      "WhatsApp sessions are mirrored on-device using local Web Session keys.",
      "IMAP/SMTP credentials stored inside native OS Windows Credential Manager.",
      "Continuous offline parsing of inbox packages with zero cloud footprint."
    ],
    metric: "0kb",
    metricLabel: "Data Leaves Client Device"
  },
  {
    title: "Autonomous Hub Engine",
    subtitle: "Self-Operating Assistance",
    bullets: [
      "Background worker analyzes inbox schedules and generates recommendation cards.",
      "Requires one-click approval before performing system edits (Calendar/SMS).",
      "Save an average of 12 hours per workspace seat every single week."
    ],
    metric: "+12h",
    metricLabel: "Weekly Time Saved Per Seat"
  },
  {
    title: "Sovereign AI Economy",
    subtitle: "Reclaiming Autonomy",
    bullets: [
      "Sovereign license handshake issues an annual offline JWT token.",
      "Enables secure offline operation without continuous API billing.",
      "Ideal for legal, financial, defense, and high-confidentiality operations."
    ],
    metric: "100%",
    metricLabel: "Offline Sovereignty"
  }
];

export default function DemoSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [captionText, setCaptionText] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeView, setActiveView] = useState<"settings" | "knowledge" | "chat" | "hub" | "tools" | "general">("settings");
  
  // Custom tools state simulation
  const [selectedSubTool, setSelectedSubTool] = useState<string | null>(null);
  const [waSessionStatus, setWaSessionStatus] = useState<"disconnected" | "pairing" | "connected">("disconnected");
  const [waQrCodeVal, setWaQrCodeVal] = useState("SHADOW-MOCK-AUTHENTICATION-QR");
  const [waInboxData, setWaInboxData] = useState<any[]>([]);
  
  // Privacy Audit Overlay state
  const [showAuditOverlay, setShowAuditOverlay] = useState(false);
  
  // Audio Synthesizer logic
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTick = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  };

  const playChirp = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const playSuccessChirp = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        
        gain.gain.setValueAtTime(0.015, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.18);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.18);
      });
    } catch (e) {}
  };

  const playToolHum = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(300, ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  };

  // Automated cursor pathing states
  const [cursorPos, setCursorPos] = useState({ x: "50%", y: "50%" });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

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

  // Sync activeView to step timeline when playing
  useEffect(() => {
    if (isPlaying) {
      const step = STEPS[currentStep - 1];
      setActiveView(step.view);
    }
  }, [currentStep, isPlaying]);

  // Handle stage transitions and simulated movements
  useEffect(() => {
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
    }, 12);
    
    if (!isPlaying) {
      clearInterval(textTimer);
      return;
    }

    // Trigger cursor glides & step content loops
    if (step === 1) {
      setEmailInput("");
      setLicenseInput("");
      setActivationState("typing");
      setShowCursor(true);
      setSelectedSubTool(null);
      
      // Path 1: Glide to email input
      setTimeout(() => {
        setCursorPos({ x: "50%", y: "45%" });
        
        // Path 2: Type email
        setTimeout(() => {
          let emailText = "ceo@sovereign.ai";
          let emailTyped = "";
          let i = 0;
          const eTimer = setInterval(() => {
            if (i < emailText.length) {
              emailTyped += emailText[i];
              setEmailInput(emailTyped);
              playTick();
              i++;
            } else {
              clearInterval(eTimer);
              
              // Path 3: Glide to license input
              setTimeout(() => {
                setCursorPos({ x: "50%", y: "55%" });
                
                // Path 4: Type license
                setTimeout(() => {
                  let licText = "SHADOW-PRO-99F2-4821";
                  let licTyped = "";
                  let j = 0;
                  const lTimer = setInterval(() => {
                    if (j < licText.length) {
                      licTyped += licText[j];
                      setLicenseInput(licTyped);
                      playTick();
                      j++;
                    } else {
                      clearInterval(lTimer);
                      
                      // Path 5: Glide to Finalize button
                      setTimeout(() => {
                        setCursorPos({ x: "56%", y: "70%" });
                        
                        // Click action
                        setTimeout(() => {
                          setCursorClicking(true);
                          playChirp();
                          setTimeout(() => {
                            setCursorClicking(false);
                            setActivationState("verifying");
                            
                            // Activation finish
                            setTimeout(() => {
                              setActivationState("activated");
                              playSuccessChirp();
                            }, 1200);
                          }, 150);
                        }, 500);
                      }, 500);
                    }
                  }, 40);
                }, 500);
              }, 500);
            }
          }, 35);
        }, 800);
      }, 500);
      
    } else if (step === 2) {
      setRagProgress(0);
      setRagLogs([]);
      setRagSuccess(false);
      setShowCursor(true);
      setSelectedSubTool(null);
      
      // Path 1: Glide to document area
      setTimeout(() => {
        setCursorPos({ x: "72%", y: "40%" });
        
        // Path 2: Trigger PDF indexing
        setTimeout(() => {
          setCursorClicking(true);
          playChirp();
          setTimeout(() => {
            setCursorClicking(false);
            setRagLogs(["[system] Selected: Q3_Financial_Projections.pdf", "[system] Size: 1.2 MB"]);
            playToolHum();
            
            setTimeout(() => {
              setRagLogs(prev => [...prev, "[system] Parsing document tokens...", "[system] Splitting into 1000-character blocks..."]);
              
              let progress = 0;
              const progressTimer = setInterval(() => {
                progress += 10;
                setRagProgress(progress);
                playTick();
                
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
                  playSuccessChirp();
                }
              }, 250);
            }, 800);
          }, 150);
        }, 800);
      }, 500);
      
    } else if (step === 3) {
      setChatMessages([
        { role: "bot", content: "Neural core online. Custom tools linked. How can I assist you?" }
      ]);
      setChatInput("");
      setChatTyping(false);
      setChatToolActive(null);
      setShowCursor(true);
      setSelectedSubTool(null);
      
      // Path 1: Glide to Chat input
      setTimeout(() => {
        setCursorPos({ x: "55%", y: "88%" });
        
        // Path 2: Auto type command
        setTimeout(() => {
          let msg = "Check email and WhatsApp for new updates, and consolidate tasks.";
          let typed = "";
          let i = 0;
          const msgTimer = setInterval(() => {
            if (i < msg.length) {
              typed += msg[i];
              setChatInput(typed);
              playTick();
              i++;
            } else {
              clearInterval(msgTimer);
              
              // Path 3: Glide to Send button
              setTimeout(() => {
                setCursorPos({ x: "85%", y: "88%" });
                
                // Click Send
                setTimeout(() => {
                  setCursorClicking(true);
                  playChirp();
                  setTimeout(() => {
                    setCursorClicking(false);
                    setChatMessages(prev => [...prev, { role: "user", content: msg }]);
                    setChatInput("");
                    setChatTyping(true);
                    
                    // Activate WhatsApp tool
                    setTimeout(() => {
                      setChatToolActive("WhatsApp Node");
                      playToolHum();
                      
                      // Activate Email tool
                      setTimeout(() => {
                        setChatToolActive("Email Intelligence");
                        playToolHum();
                        
                        // Bot Response
                        setTimeout(() => {
                          setChatTyping(false);
                          setChatToolActive(null);
                          setChatMessages(prev => [...prev, { 
                            role: "bot", 
                            content: "Local sync complete. Found details:\n\n1. Email from Sarah (Sarah Ops): Suggested a Q3 Project review meeting.\n2. WhatsApp (Investor Update): Unread messages asking for a live demo.\n\nI have created suggested actions in your Autonomous Hub." 
                          }]);
                          playSuccessChirp();
                        }, 1800);
                      }, 1200);
                    }, 800);
                  }, 150);
                }, 500);
              }, 500);
            }
          }, 30);
        }, 800);
      }, 500);
      
    } else if (step === 4) {
      setHubActionStatus("pending");
      setShowCursor(true);
      setSelectedSubTool(null);
      
      // Path 1: Glide to suggestion Approve & Run button
      setTimeout(() => {
        setCursorPos({ x: "85%", y: "30%" });
        
        // Click Approve
        setTimeout(() => {
          setCursorClicking(true);
          playChirp();
          setTimeout(() => {
            setCursorClicking(false);
            setHubActionStatus("approving");
            playToolHum();
            
            setTimeout(() => {
              setHubActionStatus("approved");
              playSuccessChirp();
            }, 1800);
          }, 150);
        }, 800);
      }, 500);
    } else if (step === 5) {
      setShowCursor(false);
      setSelectedSubTool(null);
    }
    
    return () => clearInterval(textTimer);
  }, [currentStep, isPlaying]);

  // Simulate WhatsApp Pairing Scan
  const triggerWhatsAppPairing = () => {
    if (waSessionStatus !== "disconnected") return;
    setWaSessionStatus("pairing");
    playToolHum();
    setTimeout(() => {
      setWaSessionStatus("connected");
      setWaInboxData([
        { name: "Investor Update", lastMsg: "When can we see the live demo?", unread: 2 },
        { name: "Dev Team", lastMsg: "Local RAG is 2x faster now.", unread: 0 },
        { name: "Sarah (Ops)", lastMsg: "Can you check the calendar?", unread: 1 }
      ]);
      playSuccessChirp();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans overflow-x-hidden relative selection:bg-cyan-500/20">
      
      {/* Dynamic Background Glow Layer matching active stage */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 pointer-events-none z-0 ${STEPS[currentStep - 1].glowClass}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent pointer-events-none" />

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
          
          {/* Privacy Audit Trigger */}
          <button 
            onClick={() => {
              setShowAuditOverlay(true);
              setIsPlaying(false);
            }}
            className="px-4 py-2 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full transition-all flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Privacy Audit
          </button>

          {/* Sound Toggle */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <Link href="/" className="px-5 py-2 border border-white/10 hover:bg-white/5 rounded-full text-xs font-bold transition-all">
            Exit Demo
          </Link>
        </div>
      </header>

      {/* Simulator Viewport Container - SCALED FULLSCREEN & SPLIT SCREEN */}
      <main className="flex-1 w-full max-w-[96%] mx-auto flex flex-col justify-between py-6 relative z-10 min-h-0">
        
        {/* Stages Timeline HUD */}
        <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {STEPS.map((s) => (
              <button 
                key={s.id}
                onClick={() => {
                  setCurrentStep(s.id);
                  setIsPlaying(false);
                }}
                className={`px-4 py-2 rounded-full border text-[11px] font-bold transition-all flex items-center gap-2 ${
                  currentStep === s.id 
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
                    : currentStep > s.id 
                      ? "border-green-500/20 text-green-400 bg-green-500/5"
                      : "border-white/5 text-white/40 hover:bg-white/5"
                }`}
              >
                {currentStep > s.id ? <Check className="w-3 h-3" /> : <span className="font-mono text-[9px]">0{s.id}</span>}
                {s.title}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => {
                setCurrentStep(prev => Math.max(1, prev - 1));
                setIsPlaying(false);
              }}
              className="p-2 rounded-xl border border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-500/10"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button 
              onClick={() => {
                setCurrentStep(1);
                setIsPlaying(true);
              }}
              className="p-2 rounded-xl border border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setCurrentStep(prev => Math.min(STEPS.length, prev + 1));
                setIsPlaying(false);
              }}
              className="p-2 rounded-xl border border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Master Content Split: Left Pitch Deck, Right Tauri App */}
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-8 items-stretch h-[calc(100vh-270px)] min-h-[500px]">
          
          {/* LEFT: INVESTOR PITCH DECK PANEL */}
          <div className="w-full lg:w-[350px] border border-white/5 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Shield className="w-40 h-40" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="space-y-6 relative z-10"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-cyan-400 tracking-[0.25em]">Investor Slide // 0{currentStep}</span>
                  <h2 className="text-2xl font-extrabold tracking-tight leading-tight">{SLIDES[currentStep - 1].title}</h2>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wider">{SLIDES[currentStep - 1].subtitle}</p>
                </div>
                
                <ul className="space-y-3.5">
                  {SLIDES[currentStep - 1].bullets.map((b, i) => (
                    <li key={i} className="text-xs text-white/70 leading-relaxed flex items-start gap-2.5">
                      <ArrowRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Slide Metrics Card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`metric-${currentStep}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-5 border border-cyan-500/10 bg-cyan-500/[0.02] rounded-2xl relative z-10"
              >
                <h4 className="text-[28px] font-extrabold tracking-tight text-cyan-400 leading-none">{SLIDES[currentStep - 1].metric}</h4>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">{SLIDES[currentStep - 1].metricLabel}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: DESKTOP CONTAINER (TAURI CLIENT UI) */}
          <div className="flex-1 bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-[0_0_100px_rgba(0,0,0,0.7)]">
            
            {/* Simulated Floating Cursor overlay */}
            {showCursor && (
              <motion.div 
                animate={{ x: cursorPos.x, y: cursorPos.y }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
                className="absolute pointer-events-none z-[999] -ml-2.5 -mt-2.5 select-none"
                style={{ left: 0, top: 0 }}
              >
                <div className="relative">
                  <div className={`w-5 h-5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_#22d3ee] border border-white flex items-center justify-center transition-all ${
                    cursorClicking ? "scale-75 bg-cyan-600" : ""
                  }`}>
                    <Sparkles className="w-2.5 h-2.5 text-black" />
                  </div>
                  <div className={`absolute inset-[-10px] rounded-full border border-cyan-400/30 scale-75 animate-ping duration-1000 ${
                    cursorClicking ? "border-cyan-600 scale-110" : ""
                  }`} />
                </div>
              </motion.div>
            )}

            {/* Window Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> ShadowAgent_Client_Shell.app
                </span>
              </div>
              <div className="flex gap-6 items-center text-[10px] font-mono text-white/20">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan-400" /> LOCAL: AIR_GAPPED</span>
                <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /> OLLAMA: ACTIVE</span>
              </div>
            </div>

            {/* Core Simulator Workspace */}
            <div className="flex-1 flex overflow-hidden min-h-0">
              
              {/* Sidebar Mock */}
              <div className="w-[200px] border-r border-white/5 bg-black/20 p-4 space-y-2 select-none">
                <div className="h-10 flex items-center px-4 mb-4">
                  <Shield className="w-5 h-5 text-cyan-400 mr-2" />
                  <span className="font-syne font-bold text-sm tracking-tight">Shadow</span>
                </div>
                {[
                  { id: "chat", label: "Neural Chat", icon: <MessageSquare className="w-4 h-4" /> },
                  { id: "tools", label: "Tools Hub", icon: <Compass className="w-4 h-4" /> },
                  { id: "hub", label: "Autonomous Hub", icon: <Zap className="w-4 h-4" /> },
                  { id: "knowledge", label: "Memory Bank", icon: <FileText className="w-4 h-4" /> },
                  { id: "general", label: "Preferences", icon: <Shield className="w-4 h-4" /> }
                ].map((tab) => (
                  <button 
                    key={tab.id} 
                    onClick={() => {
                      setActiveView(tab.id as any);
                      setIsPlaying(false);
                      playTick();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeView === tab.id ? "bg-white/10 text-white border-l-2 border-cyan-400" : "text-white/25 hover:bg-white/5"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Central Stage Screens */}
              <div className="flex-1 bg-black/10 relative overflow-hidden flex flex-col min-h-0">
                <AnimatePresence mode="wait">
                  
                  {/* PREFERENCES VIEW: ONBOARDING WIZARD */}
                  {activeView === "settings" && (
                    <motion.div 
                      key="step-settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full flex items-center justify-center p-10 relative overflow-y-auto"
                    >
                      <div className="w-full max-w-md p-8 glass-panel border-white/10 rounded-[2.5rem] space-y-6 text-center">
                        <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Key className="w-8 h-8 animate-pulse" />
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

                        <button disabled className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all ${
                          activationState === "activated" ? "bg-green-600 text-white" : "bg-white text-black"
                        }`}>
                          {activationState === "activated" ? "Finalized" : "Finalize Core"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* MEMORY BANK VIEW */}
                  {activeView === "knowledge" && (
                    <motion.div 
                      key="step-knowledge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col space-y-6 overflow-y-auto"
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
                        <div className="col-span-2 border border-white/5 rounded-2xl bg-black/10 p-5 flex flex-col space-y-4">
                          <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Indexed Content</h4>
                          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                            <div className="p-3 border border-white/5 bg-white/[0.02] rounded-xl flex items-center justify-between text-xs">
                              <span className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-orange-400" /> company_policy.pdf</span>
                              <span className="text-[9px] font-mono text-green-400 font-bold">READY</span>
                            </div>
                            {ragLogs.length > 0 && (
                              <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="p-3 border border-orange-500/20 bg-orange-500/[0.02] rounded-xl flex items-center justify-between text-xs"
                              >
                                <span className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-orange-400 animate-bounce" /> projections.pdf</span>
                                <span className="text-[9px] font-mono text-orange-400 animate-pulse font-bold">{ragSuccess ? "READY" : "PARSING"}</span>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <div className="col-span-3 border border-white/5 rounded-2xl bg-black/20 p-5 flex flex-col justify-between min-h-0">
                          <div className="space-y-4 flex-1 flex flex-col min-h-0">
                            <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Console Operations</h4>
                            
                            {ragProgress === 0 ? (
                              <div className="border border-dashed border-white/10 hover:border-orange-500/20 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group flex-1">
                                <FileText className="w-8 h-8 text-white/25 group-hover:text-orange-400 transition-colors animate-pulse" />
                                <span className="text-xs font-bold">Uploading Q3_Financial_Projections.pdf...</span>
                                <span className="text-[9px] text-white/20">Awaiting local character block split.</span>
                              </div>
                            ) : (
                              <div className="flex-1 flex flex-col justify-between min-h-0">
                                <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[9px] text-white/40 space-y-1.5 overflow-y-auto max-h-[120px] flex-1">
                                  {ragLogs.map((log, index) => (
                                    <div key={index} className={log.includes("SUCCESS") ? "text-green-400" : ""}>{log}</div>
                                  ))}
                                </div>

                                <div className="h-[100px] w-full border border-white/5 rounded-xl bg-black/40 overflow-hidden relative mt-4 flex items-center justify-center">
                                  <svg className="w-full h-full text-orange-400/40 relative z-10" viewBox="0 0 300 100">
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="100" y2="30" stroke="currentColor" strokeWidth="1" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} x1="100" y1="30" x2="150" y2="70" stroke="currentColor" strokeWidth="1" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} x1="150" y1="70" x2="200" y2="20" stroke="currentColor" strokeWidth="1" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }} x1="200" y1="20" x2="250" y2="50" stroke="currentColor" strokeWidth="1" />
                                    <circle cx="50" cy="50" r="4" className="fill-orange-400 animate-pulse" />
                                    <circle cx="100" cy="30" r="5" className="fill-orange-500 animate-pulse" />
                                    <circle cx="150" cy="70" r="4" className="fill-orange-400 animate-pulse" />
                                    <circle cx="200" cy="20" r="6" className="fill-orange-500 animate-pulse" />
                                    <circle cx="250" cy="50" r="4" className="fill-orange-400 animate-pulse" />
                                  </svg>
                                </div>

                                <div className="space-y-2 mt-4">
                                  <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase">
                                    <span>Embedding Matrix Generation</span>
                                    <span>{ragProgress}%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${ragProgress}%` }} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* NEURAL CHAT VIEW */}
                  {activeView === "chat" && (
                    <motion.div 
                      key="step-chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full flex flex-col justify-between p-6 min-h-0"
                    >
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

                  {/* AUTONOMOUS HUB VIEW */}
                  {activeView === "hub" && (
                    <motion.div 
                      key="step-hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col space-y-6 overflow-y-auto"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-extrabold tracking-tight">Autonomous Hub</h3>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Active Action Recommendations</p>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-pink-500/20 text-[9px] font-bold text-pink-400 bg-pink-500/5 uppercase tracking-wider animate-pulse flex items-center gap-1.5">
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

                  {/* TOOLS HUB VIEW */}
                  {activeView === "tools" && (
                    <motion.div 
                      key="step-tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col space-y-6 overflow-y-auto"
                    >
                      <h3 className="text-xl font-extrabold tracking-tight">Tools Hub</h3>
                      
                      {!selectedSubTool ? (
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { id: "whatsapp", label: "WhatsApp Node", desc: "Local session message mirroring.", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: <MessageSquare className="w-8 h-8" /> },
                            { id: "email", label: "Email Intelligence", desc: "Local IMAP reader & SMTP sender.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: <Mail className="w-8 h-8" /> },
                            { id: "calendar", label: "Local Schedule", desc: "Write directly to calendar.ics format.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", icon: <Calendar className="w-8 h-8" /> },
                            { id: "rag", label: "Memory Bank RAG", desc: "Index PDF documents locally.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: <FileText className="w-8 h-8" /> }
                          ].map(t => (
                            <div 
                              key={t.id} 
                              onClick={() => {
                                setSelectedSubTool(t.id);
                                playChirp();
                              }}
                              className="p-6 border border-white/5 bg-white/[0.01] hover:border-cyan-500/20 rounded-2xl flex items-center gap-4 cursor-pointer transition-all group"
                            >
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${t.bg} ${t.color}`}>{t.icon}</div>
                              <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{t.label}</h4>
                                <p className="text-[11px] text-white/35">{t.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col justify-between border border-white/5 rounded-2xl bg-black/20 p-6 min-h-0">
                          {/* Subtool Details */}
                          <div className="flex-1 overflow-y-auto pr-2">
                            <button 
                              onClick={() => {
                                setSelectedSubTool(null);
                                playTick();
                              }}
                              className="text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white mb-4 block"
                            >
                              ← Back to Tools
                            </button>

                            {selectedSubTool === "whatsapp" && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                  <MessageSquare className="w-6 h-6 text-green-400" />
                                  <h4 className="text-base font-bold">WhatsApp Session Status</h4>
                                </div>

                                {waSessionStatus === "disconnected" && (
                                  <div className="p-6 border border-white/5 bg-black/40 rounded-2xl text-center space-y-4">
                                    <h5 className="text-xs font-bold text-white/40 uppercase tracking-wider">Pair Local Session</h5>
                                    <div className="w-32 h-32 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center mx-auto text-[9px] font-mono text-white/20">
                                      Awaiting QR Code
                                    </div>
                                    <button 
                                      onClick={triggerWhatsAppPairing}
                                      className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-green-500/10 transition-colors"
                                    >
                                      Generate QR & Pair
                                    </button>
                                  </div>
                                )}

                                {waSessionStatus === "pairing" && (
                                  <div className="p-6 border border-white/5 bg-black/40 rounded-2xl text-center space-y-4">
                                    <RefreshCw className="w-10 h-10 text-green-400 animate-spin mx-auto" />
                                    <p className="text-xs font-mono text-green-400 animate-pulse uppercase tracking-wider">Generating Web QR Token...</p>
                                  </div>
                                )}

                                {waSessionStatus === "connected" && (
                                  <div className="space-y-4">
                                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-xs font-bold uppercase tracking-widest inline-block">
                                      ✓ Session Connected // Mirror Active
                                    </div>
                                    <div className="space-y-2">
                                      {waInboxData.map((chat, idx) => (
                                        <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center text-xs">
                                          <div>
                                            <span className="font-bold text-cyan-400">{chat.name}</span>
                                            <p className="text-[10px] text-white/40 line-clamp-1">{chat.lastMsg}</p>
                                          </div>
                                          {chat.unread > 0 && <span className="w-5 h-5 bg-green-500 text-black text-[9px] font-black rounded-full flex items-center justify-center">{chat.unread}</span>}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {selectedSubTool === "email" && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-6 h-6 text-blue-400" />
                                  <h4 className="text-base font-bold">Email Inbox Config</h4>
                                </div>
                                <div className="space-y-3 max-w-sm">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">IMAP USER</span>
                                    <input readOnly value="ceo@sovereign.ai" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/60 focus:outline-none font-mono" />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">IMAP HOST</span>
                                    <input readOnly value="imap.gmail.com" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/60 focus:outline-none font-mono" />
                                  </div>
                                </div>
                                <div className="p-4 border border-blue-500/20 bg-blue-500/[0.02] text-blue-300 text-xs rounded-xl flex items-center gap-2">
                                  <Lock className="w-4 h-4" /> Credentials encrypted via OS Keychain.
                                </div>
                              </div>
                            )}

                            {selectedSubTool === "calendar" && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                  <Calendar className="w-6 h-6 text-purple-400" />
                                  <h4 className="text-base font-bold">Calendar Synchronizer</h4>
                                </div>
                                <div className="p-4 border border-purple-500/20 bg-purple-500/[0.02] text-purple-300 text-xs rounded-xl flex items-center gap-2">
                                  <FileText className="w-4 h-4 animate-pulse" /> Active Node Path: apps/integrations/calendar.ics
                                </div>
                                <div className="border border-white/5 bg-black/40 rounded-2xl p-4 space-y-3">
                                  <h5 className="text-[9px] font-black uppercase text-white/30 tracking-widest">Upcoming Slots</h5>
                                  <div className="space-y-2">
                                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs flex justify-between">
                                      <span className="font-bold">Project Q3 Status Review</span>
                                      <span className="text-white/40">Tomorrow, 2:00 PM</span>
                                    </div>
                                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs flex justify-between">
                                      <span className="font-bold">Investor Live Pitch Demo</span>
                                      <span className="text-white/40">June 5, 10:00 AM</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {selectedSubTool === "rag" && (
                              <div className="space-y-4">
                                <p className="text-xs text-white/50">For local RAG document uploading, please visit the **Memory Bank** tab directly from the main sidebar.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* PREFERENCES VIEW: HARDWARE STATUS & DIAGNOSTICS */}
                  {activeView === "general" && (
                    <motion.div 
                      key="step-general" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col justify-between overflow-y-auto"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold tracking-tight">Sovereign Credentials</h3>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Local System Settings</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 my-4">
                        <div className="space-y-4">
                          <div className="p-4 border border-white/5 bg-white/[0.01] rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                              <Lock className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold">OS-Native Encryption</h4>
                              <p className="text-[9px] text-white/30 uppercase font-mono mt-0.5">AES-256 Enabled</p>
                            </div>
                          </div>
                          <div className="p-4 border border-white/5 bg-white/[0.01] rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                              <Shield className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold">Zero-Cloud Sync Policy</h4>
                              <p className="text-[9px] text-white/30 uppercase font-mono mt-0.5">Air-Gapped Status</p>
                            </div>
                          </div>
                        </div>

                        <div className="border border-white/5 bg-black/40 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                          <h4 className="text-[9px] font-black uppercase text-white/20 tracking-widest flex items-center justify-between">
                            <span>Live Waveforms</span>
                            <span className="text-cyan-400 animate-pulse">● System Diagnostic</span>
                          </h4>
                          
                          <div className="h-[90px] w-full flex gap-3">
                            <div className="flex-1 h-full border border-white/5 bg-black/20 rounded-xl overflow-hidden relative">
                              <svg className="w-full h-full text-green-400/80" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <path 
                                  d="M0,20 Q15,5 30,35 T60,20 T90,30 L100,20" 
                                  fill="none" stroke="currentColor" strokeWidth="1.5"
                                />
                              </svg>
                              <span className="absolute bottom-1 left-2 text-[7px] font-mono text-green-400/50">CPU LOAD: 12%</span>
                            </div>
                            <div className="flex-1 h-full border border-white/5 bg-black/20 rounded-xl overflow-hidden relative">
                              <svg className="w-full h-full text-cyan-400/80" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <path 
                                  d="M0,10 Q20,38 40,12 T80,32 L100,5" 
                                  fill="none" stroke="currentColor" strokeWidth="1.5"
                                />
                              </svg>
                              <span className="absolute bottom-1 left-2 text-[7px] font-mono text-cyan-400/50">LATENCY: 0.4ms</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-green-500/20 bg-green-500/[0.02] p-5 rounded-2xl text-center space-y-2">
                        <Check className="w-8 h-8 text-green-500 mx-auto" />
                        <h4 className="text-xs font-bold uppercase tracking-wide">Secure local system active</h4>
                        <p className="text-[11px] text-white/40 max-w-sm mx-auto leading-relaxed">All inputs, key files, and communication nodes remain stored strictly in OS-Native Credential parameters.</p>
                      </div>

                      <button 
                        onClick={() => {
                          setCurrentStep(1);
                          setIsPlaying(true);
                          playSuccessChirp();
                        }} 
                        className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-green-500/10 mt-4 transition-colors"
                      >
                        Restart Presentation
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Voiceover Caption Track overlay */}
        <div className="w-full mt-6 p-5 rounded-2xl border border-purple-500/20 bg-black/60 backdrop-blur-2xl flex items-start gap-4 shadow-xl select-none">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-[0.2em]">Voiceover Track // Captions</span>
              <span className="text-[9px] font-mono text-white/20">PROGRESS: STEP {currentStep} OF 5</span>
            </div>
            <p className="text-sm text-white/95 leading-relaxed font-manrope font-semibold">
              {captionText || "Initializing caption feed..."}
            </p>
          </div>
        </div>

      </main>

      {/* PRIVACY AUDIT DIALOG OVERLAY (Cloud Leak vs Shadow OS comparison) */}
      <AnimatePresence>
        {showAuditOverlay && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-10"
          >
            <div className="w-full max-w-5xl h-full max-h-[600px] border border-white/10 bg-black/40 rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden">
              <button 
                onClick={() => {
                  setShowAuditOverlay(false);
                  setIsPlaying(true);
                  playTick();
                }}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
                <h3 className="text-3xl font-extrabold tracking-tight">Security Audit Visualization</h3>
                <p className="text-sm text-white/45">Comparing traditional Cloud AI leakage against local Shadow OS security.</p>
              </div>

              {/* Comparison Split Panels */}
              <div className="grid grid-cols-2 gap-8 flex-1 min-h-0 items-stretch">
                {/* Cloud AI Panel */}
                <div className="border border-red-500/20 bg-red-500/[0.01] rounded-3xl p-6 flex flex-col justify-between relative">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-red-500 flex items-center gap-2 uppercase tracking-wide">
                      ❌ Cloud AI Pipeline
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">Workspace prompts, document RAG segments, and WhatsApp mirroring data are transmitted to external servers for calculations.</p>
                  </div>
                  
                  {/* Cloud Leak Animation SVG */}
                  <div className="h-[120px] w-full bg-black/30 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full text-red-500/40" viewBox="0 0 200 100">
                      <path d="M40,50 L100,50 L160,50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="animate-[dash_2s_linear_infinite]" />
                      <circle cx="40" cy="50" r="8" className="fill-black stroke-red-500 stroke-2" />
                      <rect x="36" y="47" width="8" height="6" className="fill-red-500 animate-pulse" />
                      <circle cx="160" cy="50" r="10" className="fill-black stroke-red-500 stroke-2" />
                      <span className="absolute left-6 text-[8px] font-mono">CLIENT</span>
                      <span className="absolute right-6 text-[8px] font-mono">CLOUD DB</span>
                    </svg>
                    <span className="absolute bottom-2 text-[8px] font-mono text-red-500/80 tracking-widest uppercase animate-pulse">Data Leak Risk Detected</span>
                  </div>
                </div>

                {/* Shadow OS Panel */}
                <div className="border border-green-500/20 bg-green-500/[0.01] rounded-3xl p-6 flex flex-col justify-between relative">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-green-400 flex items-center gap-2 uppercase tracking-wide">
                      🛡️ Shadow Local Core
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">All LLM inference, embedding mesh operations, and WhatsApp integration sessions are processed 100% on the client CPU/GPU.</p>
                  </div>

                  {/* Local Shield Loop Animation SVG */}
                  <div className="h-[120px] w-full bg-black/30 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full text-green-400/40" viewBox="0 0 200 100">
                      <circle cx="100" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_10s_linear_infinite]" />
                      <circle cx="100" cy="50" r="8" className="fill-black stroke-green-400 stroke-2" />
                      <span className="absolute text-[8px] font-mono">LOCAL CPU</span>
                    </svg>
                    <span className="absolute bottom-2 text-[8px] font-mono text-green-400/85 tracking-widest uppercase animate-pulse">Sovereign Boundary Intact</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowAuditOverlay(false);
                  setIsPlaying(true);
                  playSuccessChirp();
                }}
                className="w-full mt-6 py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all"
              >
                Close Audit & Resume Walkthrough
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="h-16 px-10 border-t border-white/5 bg-black/40 flex items-center justify-between text-xs text-white/30 relative z-50 select-none">
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
