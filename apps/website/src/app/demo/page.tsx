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
  view: "settings" | "knowledge" | "chat" | "hub" | "general" | "tools";
}

const STEPS: SimulationStep[] = [
  { id: 1, title: "Sovereign Activation", caption: "Welcome to Shadow. The app launches offline and validates the sovereign license key locally, verifying the secure node connection.", glowClass: "from-cyan-500/10 via-transparent to-transparent", view: "settings" },
  { id: 2, title: "Memory Bank (Local RAG)", caption: "Private data is ingested entirely offline. The documents are split, embedded via Ollama, and saved directly to the local HNSW vector store.", glowClass: "from-orange-500/10 via-transparent to-transparent", view: "knowledge" },
  { id: 3, title: "Workspace Node Sync", caption: "Link local communications securely. Scan the mirrored WhatsApp session token and configure encrypted SMTP/IMAP protocol keys on your hard drive.", glowClass: "from-blue-500/10 via-transparent to-transparent", view: "tools" },
  { id: 4, title: "Neural Hub Automation", caption: "Interact with the neural agent. Shadow parses unread mail logs, identifies scheduling conflicts, and queues confirmation cards in the Neural Hub.", glowClass: "from-purple-500/10 via-transparent to-transparent", view: "chat" },
  { id: 5, title: "Sovereign Sync Success", caption: "Approval complete. The agent appends the meeting directly to calendar.ics, showing the live updated schedule. 100% local, 100% offline.", glowClass: "from-green-500/10 via-transparent to-transparent", view: "tools" }
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
    title: "Workspace Node Syncing",
    subtitle: "Mirroring WhatsApp & Mail",
    bullets: [
      "WhatsApp sessions are mirrored on-device using local Web Session keys.",
      "SMTP/IMAP server keys are encrypted natively inside Windows Credential Manager.",
      "Local background workers sync inbox updates with a zero cloud footprint."
    ],
    metric: "100% Local",
    metricLabel: "Communication Node Pairing"
  },
  {
    title: "Neural Hub Automation",
    subtitle: "Self-Operating Assistance",
    bullets: [
      "Local agent parses workspace logs to identify scheduling conflicts.",
      "Renders confirmation cards in the Neural Hub waiting for your secure approval.",
      "Save an average of 12 hours per workspace seat every single week."
    ],
    metric: "+12h",
    metricLabel: "Weekly Time Saved Per Seat"
  },
  {
    title: "Calendar Sync Success",
    subtitle: "Reclaiming Autonomy",
    bullets: [
      "Approved actions write directly to the local calendar.ics file structure.",
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
  const [waReplySent, setWaReplySent] = useState(false);
  const [waReplyStatus, setWaReplyStatus] = useState<"pending" | "approving" | "approved">("pending");
  const [activeWaContact, setActiveWaContact] = useState("Investor Update");
  const [waTypedInput, setWaTypedInput] = useState("");
  const [waMessages, setWaMessages] = useState<{ [key: string]: { role: "incoming" | "outgoing", content: string, time: string }[] }>({
    "Investor Update": [
      { role: "incoming", content: "When can we see the live demo?", time: "10:14 AM" }
    ],
    "Dev Team": [
      { role: "incoming", content: "Local RAG is 2x faster now.", time: "09:43 AM" },
      { role: "outgoing", content: "Awesome work! Let's bundle it in the main Tauri executable.", time: "09:45 AM" }
    ],
    "Sarah (Ops)": [
      { role: "incoming", content: "Hi, can you check the calendar for tomorrow? Need to review Q3 numbers.", time: "09:15 AM" },
      { role: "outgoing", content: "Sure, checking sync logs now. I'll get back to you with a slot.", time: "09:17 AM" }
    ]
  });

  // Sync WhatsApp reply automation states
  useEffect(() => {
    if (waReplySent) {
      setWaMessages(prev => {
        const thread = prev["Investor Update"] || [];
        if (thread.some(m => m.content.includes("ready for review"))) return prev;
        return {
          ...prev,
          "Investor Update": [
            ...thread,
            { role: "outgoing", content: "Hi, the live demo is ready for review.", time: "10:16 AM" }
          ]
        };
      });
      setWaInboxData(prev => prev.map(chat => 
        chat.name === "Investor Update" 
          ? { ...chat, lastMsg: "Hi, the live demo is ready for review.", unread: 0 }
          : chat
      ));
    }
  }, [waReplySent]);
  
  // Custom Calendar state simulation
  const [showNewCalendarEvent, setShowNewCalendarEvent] = useState(false);
  
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

  // Automated cursor pathing states - BRIGHTER & LARGER VISIBILITY
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

    // TRIGGER STAGED ANIMATIONS IN TIMELINE (10s PER STEP)
    if (step === 1) {
      setEmailInput("");
      setLicenseInput("");
      setActivationState("typing");
      setShowCursor(true);
      setSelectedSubTool(null);
      setWaReplySent(false);
      setWaReplyStatus("pending");
      setActiveWaContact("Investor Update");
      setWaTypedInput("");
      setWaMessages({
        "Investor Update": [
          { role: "incoming", content: "When can we see the live demo?", time: "10:14 AM" }
        ],
        "Dev Team": [
          { role: "incoming", content: "Local RAG is 2x faster now.", time: "09:43 AM" },
          { role: "outgoing", content: "Awesome work! Let's bundle it in the main Tauri executable.", time: "09:45 AM" }
        ],
        "Sarah (Ops)": [
          { role: "incoming", content: "Hi, can you check the calendar for tomorrow? Need to review Q3 numbers.", time: "09:15 AM" },
          { role: "outgoing", content: "Sure, checking sync logs now. I'll get back to you with a slot.", time: "09:17 AM" }
        ]
      });
      
      // Start cursor at center
      setCursorPos({ x: "50%", y: "50%" });
      
      // Path 1: Glide to email input
      setTimeout(() => {
        setCursorPos({ x: "60%", y: "42%" });
        
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
                setCursorPos({ x: "60%", y: "52%" });
                
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
                        setCursorPos({ x: "60%", y: "66%" });
                        
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
      
      // Move to Memory Bank tab on sidebar
      setCursorPos({ x: "50%", y: "50%" });
      setTimeout(() => {
        setCursorPos({ x: "10%", y: "44%" });
        
        setTimeout(() => {
          setCursorClicking(true);
          playChirp();
          setTimeout(() => {
            setCursorClicking(false);
            setActiveView("knowledge");
            
            // Glide to dropzone area
            setTimeout(() => {
              setCursorPos({ x: "72%", y: "38%" });
              
              // Trigger PDF indexing
              setTimeout(() => {
                setCursorClicking(true);
                playChirp();
                setTimeout(() => {
                  setCursorClicking(false);
                  setRagLogs(["[system] Selected: Q3_Financial_Projections.pdf", "[system] Size: 1.2 MB", "[system] Parsing local document tokens..."]);
                  playToolHum();
                  
                  setTimeout(() => {
                    setRagLogs(prev => [...prev, "[system] File read success: 14,204 chars found", "[system] Splitting into 1000-character blocks (500 tokens)..."]);
                    
                    let progress = 0;
                    const progressTimer = setInterval(() => {
                      progress += 10;
                      setRagProgress(progress);
                      playTick();
                      
                      if (progress === 20) {
                        setRagLogs(prev => [...prev, "[neural] Initializing Ollama local LLM instance...", "[neural] Model config: nomic-embed-text (384 dimensions)"]);
                      }
                      if (progress === 50) {
                        setRagLogs(prev => [...prev, "[neural] Generating vector embeddings offline...", "[neural] Mapped chunks 1 to 6/12..."]);
                      }
                      if (progress === 80) {
                        setRagLogs(prev => [...prev, "[neural] Chunks 7 to 12/12 mapped successfully.", "[database] Storing points in HNSW index map..."]);
                      }
                      if (progress >= 100) {
                        clearInterval(progressTimer);
                        setRagSuccess(true);
                        setRagLogs(prev => [...prev, "✓ SUCCESS: Ingestion complete. Index refreshed locally."]);
                        playSuccessChirp();
                      }
                    }, 250);
                  }, 800);
                }, 150);
              }, 800);
            }, 800);
          }, 150);
        }, 800);
      }, 500);
      
    } else if (step === 3) {
      // WALKTHROUGH STAGE 3: TOOLS HUB (WHATSAPP QR PAIRING & EMAIL CONFIG)
      setSelectedSubTool(null);
      setWaSessionStatus("disconnected");
      setShowCursor(true);
      
      // Move to Tools Hub tab in sidebar
      setTimeout(() => {
        setCursorPos({ x: "10%", y: "28%" });
        
        setTimeout(() => {
          setCursorClicking(true);
          playChirp();
          setTimeout(() => {
            setCursorClicking(false);
            setActiveView("tools");
            
            // Glide to WhatsApp Card
            setTimeout(() => {
              setCursorPos({ x: "40%", y: "32%" });
              
              // Click WhatsApp Card
              setTimeout(() => {
                setCursorClicking(true);
                playChirp();
                setTimeout(() => {
                  setCursorClicking(false);
                  setSelectedSubTool("whatsapp");
                  
                  // Glide to "Generate QR & Pair" button
                  setTimeout(() => {
                    setCursorPos({ x: "60%", y: "65%" });
                    
                    // Click Pair
                    setTimeout(() => {
                      setCursorClicking(true);
                      playChirp();
                      setTimeout(() => {
                        setCursorClicking(false);
                        setWaSessionStatus("pairing");
                        playToolHum();
                        
                        // Scanning finished
                        setTimeout(() => {
                          setWaSessionStatus("connected");
                          setWaInboxData([
                            { name: "Investor Update", lastMsg: "When can we see the live demo?", unread: 2, initials: "IU", time: "10:14 AM" },
                            { name: "Dev Team", lastMsg: "Local RAG is 2x faster now.", unread: 0, initials: "DT", time: "09:45 AM" },
                            { name: "Sarah (Ops)", lastMsg: "Can you check the calendar?", unread: 1, initials: "SO", time: "09:15 AM" }
                          ]);
                          playSuccessChirp();
                          
                          // Glide to "Back to Tools" button
                          setTimeout(() => {
                            setCursorPos({ x: "28%", y: "15%" });
                            
                            // Click Back
                            setTimeout(() => {
                              setCursorClicking(true);
                              playChirp();
                              setTimeout(() => {
                                setCursorClicking(false);
                                setSelectedSubTool(null);
                                
                                // Glide to Email Card
                                setTimeout(() => {
                                  setCursorPos({ x: "75%", y: "32%" });
                                  
                                  // Click Email
                                  setTimeout(() => {
                                    setCursorClicking(true);
                                    playChirp();
                                    setTimeout(() => {
                                      setCursorClicking(false);
                                      setSelectedSubTool("email");
                                    }, 150);
                                  }, 500);
                                }, 500);
                              }, 150);
                            }, 500);
                          }, 1500);
                        }, 2200); // 2.2s pairing scan
                      }, 150);
                    }, 800);
                  }, 600);
                }, 150);
              }, 800);
            }, 800);
          }, 150);
        }, 800);
      }, 500);
      
    } else if (step === 4) {
      setChatMessages([
        { role: "bot", content: "Neural core online. Local tool nodes connected. How can I assist you today?" }
      ]);
      setChatInput("");
      setChatTyping(false);
      setChatToolActive(null);
      setHubActionStatus("pending");
      setShowCursor(true);
      setSelectedSubTool(null);
      
      // Move to Neural Chat tab in sidebar
      setTimeout(() => {
        setCursorPos({ x: "10%", y: "20%" });
        
        setTimeout(() => {
          setCursorClicking(true);
          playChirp();
          setTimeout(() => {
            setCursorClicking(false);
            setActiveView("chat");
            
            // Auto type chat command
            setTimeout(() => {
              setCursorPos({ x: "60%", y: "90%" });
              
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
                    
                    // Glide to Send button
                    setTimeout(() => {
                      setCursorPos({ x: "93%", y: "90%" });
                      
                      // Click Send
                      setTimeout(() => {
                        setCursorClicking(true);
                        playChirp();
                        setTimeout(() => {
                          setCursorClicking(false);
                          setChatMessages(prev => [...prev, { role: "user", content: msg }]);
                          setChatInput("");
                          setChatTyping(true);
                          
                          // Activate tools simulation
                          setTimeout(() => {
                            setChatToolActive("WhatsApp Node");
                            playToolHum();
                            
                            setTimeout(() => {
                              setChatToolActive("Email Intelligence");
                              playToolHum();
                              
                              setTimeout(() => {
                                setChatTyping(false);
                                setChatToolActive(null);
                                setChatMessages(prev => [...prev, { 
                                  role: "bot", 
                                  content: "Local sync complete. Identified new scheduling suggestions:\n\n1. Email from Sarah (Sarah Ops): Suggested a Q3 Project Review Meeting tomorrow.\n2. WhatsApp (Investor Update): Unread messages asking for a live demo.\n\nI have generated task recommendations inside your Neural Hub.",
                                  showLogs: true
                                }]);
                                playSuccessChirp();
                                
                                // SWITCH VIEW TO NEURAL HUB
                                setTimeout(() => {
                                  // Glide to Neural Hub tab
                                  setCursorPos({ x: "10%", y: "36%" });
                                  
                                  setTimeout(() => {
                                    setCursorClicking(true);
                                    playChirp();
                                    setTimeout(() => {
                                      setCursorClicking(false);
                                      setActiveView("hub");
                                      
                                      // Glide to "Approve & Run" on hub card (Suggestion Card 1)
                                      setTimeout(() => {
                                        setCursorPos({ x: "82%", y: "32%" });
                                        
                                        // Click Approve Card 1
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
                                              
                                              // Glide down to Suggestion Card 2 "Approve" (WhatsApp Reply)
                                              setTimeout(() => {
                                                setCursorPos({ x: "82%", y: "65%" });
                                                
                                                // Click Approve Card 2
                                                setTimeout(() => {
                                                  setCursorClicking(true);
                                                  playChirp();
                                                  setTimeout(() => {
                                                    setCursorClicking(false);
                                                    setWaReplyStatus("approving");
                                                    playToolHum();
                                                    
                                                    setTimeout(() => {
                                                      setWaReplyStatus("approved");
                                                      setWaReplySent(true);
                                                      playSuccessChirp();
                                                    }, 1200);
                                                  }, 150);
                                                }, 600);
                                              }, 1000);
                                            }, 1200);
                                          }, 150);
                                        }, 600);
                                      }, 800);
                                    }, 150);
                                  }, 800);
                                }, 2200);
                              }, 1200);
                            }, 800);
                          }, 600);
                        }, 150);
                      }, 500);
                    }, 500);
                  }
                }, 20);
              }, 500);
            }, 800);
          }, 150);
        }, 800);
      }, 500);
      
    } else if (step === 5) {
      setSelectedSubTool(null);
      setShowNewCalendarEvent(false);
      setShowCursor(true);
      
      // Move to Tools Hub tab in sidebar
      setTimeout(() => {
        setCursorPos({ x: "10%", y: "28%" });
        
        setTimeout(() => {
          setCursorClicking(true);
          playChirp();
          setTimeout(() => {
            setCursorClicking(false);
            setActiveView("tools");
            
            // Glide to Calendar Card
            setTimeout(() => {
              setCursorPos({ x: "40%", y: "62%" });
              
              // Click Calendar Card
              setTimeout(() => {
                setCursorClicking(true);
                playChirp();
                setTimeout(() => {
                  setCursorClicking(false);
                  setSelectedSubTool("calendar");
                  
                  // Highlight calendar schedule fading in
                  setTimeout(() => {
                    setShowNewCalendarEvent(true);
                    playSuccessChirp();
                    
                    // Glide to System Preferences tab
                    setTimeout(() => {
                      setCursorPos({ x: "10%", y: "52%" });
                      
                      // Click preferences tab
                      setTimeout(() => {
                        setCursorClicking(true);
                        playChirp();
                        setTimeout(() => {
                          setCursorClicking(false);
                          setActiveView("general");
                          setShowCursor(false);
                        }, 150);
                      }, 500);
                    }, 2500);
                  }, 1200);
                }, 150);
              }, 800);
            }, 800);
          }, 150);
        }, 800);
      }, 500);
    }
    
    return () => clearInterval(textTimer);
  }, [currentStep, isPlaying]);

  // Handle WhatsApp scan trigger manually
  const triggerWhatsAppPairingManual = () => {
    if (waSessionStatus !== "disconnected") return;
    setWaSessionStatus("pairing");
    playToolHum();
    setTimeout(() => {
      setWaSessionStatus("connected");
      setWaInboxData([
        { name: "Investor Update", lastMsg: "When can we see the live demo?", unread: 2, initials: "IU", time: "10:14 AM" },
        { name: "Dev Team", lastMsg: "Local RAG is 2x faster now.", unread: 0, initials: "DT", time: "09:45 AM" },
        { name: "Sarah (Ops)", lastMsg: "Can you check the calendar?", unread: 1, initials: "SO", time: "09:15 AM" }
      ]);
      playSuccessChirp();
    }, 1800);
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
                  playTick();
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
            
            {/* Simulated Floating Cursor overlay - ENHANCED VISIBILITY */}
            {showCursor && (
              <>
                {/* Secondary trail dot */}
                <motion.div 
                  animate={{ left: cursorPos.x, top: cursorPos.y }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.95 }}
                  className="absolute pointer-events-none z-[9998] -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-cyan-400/40 blur-[2px]"
                />
                
                {/* Main glowing cursor */}
                <motion.div 
                  animate={{ left: cursorPos.x, top: cursorPos.y }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
                  className="absolute pointer-events-none z-[9999] -ml-3.5 -mt-3.5 select-none"
                >
                  <div className="relative">
                    <div className={`absolute inset-[-8px] rounded-full bg-cyan-400/10 blur-[4px] transition-all duration-300 ${
                      cursorClicking ? "scale-150 bg-cyan-400/30" : ""
                    }`} />
                    <div className={`w-7 h-7 rounded-full bg-cyan-400/90 shadow-[0_0_20px_#06b6d4] border-2 border-white flex items-center justify-center transition-all duration-150 ${
                      cursorClicking ? "scale-75 bg-cyan-600 shadow-[0_0_30px_#0891b2]" : ""
                    }`}>
                      <Sparkles className="w-3 h-3 text-black" />
                    </div>
                    <div className={`absolute inset-[-12px] rounded-full border-2 border-cyan-400/30 scale-75 animate-ping duration-1000 ${
                      cursorClicking ? "border-cyan-600 scale-125" : ""
                    }`} />
                  </div>
                </motion.div>
              </>
            )}

            {/* Window Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase ml-2 flex items-center gap-1.5 font-bold">
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
                  <Shield className="w-5 h-5 text-cyan-400 mr-2 animate-pulse" />
                  <span className="font-syne font-bold text-sm tracking-tight">Shadow</span>
                </div>
                {[
                  { id: "chat", label: "Neural Chat", icon: <MessageSquare className="w-4 h-4" /> },
                  { id: "tools", label: "Tools Hub", icon: <Compass className="w-4 h-4" /> },
                  { id: "hub", label: "Neural Hub", icon: <Zap className="w-4 h-4" /> },
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
                  
                  {/* ONBOARDING WIZARD VIEW */}
                  {activeView === "settings" && (
                    <motion.div 
                      key="step-settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full flex items-stretch p-8 gap-6 min-h-0 overflow-y-auto"
                    >
                      {/* Left Pane: Diagnostic Info */}
                      <div className="flex-1 border border-white/5 bg-black/30 rounded-3xl p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Device Node Diagnostics</h4>
                          <div className="space-y-2.5 font-mono text-[10px] text-white/60">
                            <div className="flex justify-between border-b border-white/5 pb-1.5">
                              <span>🖥️ CPU HARDWARE</span>
                              <span className="text-cyan-400 font-bold">24-Core Local Node</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1.5">
                              <span>📟 GPU CORE ACCEL</span>
                              <span className="text-cyan-400 font-bold">NVIDIA CUDA Enabled</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1.5">
                              <span>🧠 LOCAL LLM ENGINE</span>
                              <span className="text-cyan-400 font-bold">Ollama (v0.1.48)</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1.5">
                              <span>📂 DATABASE INDEX</span>
                              <span className="text-cyan-400 font-bold">HNSW Vector SQLite</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1.5">
                              <span>🔒 SECURITY STATE</span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                100% Air-Gapped
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-white/5 bg-black/40 rounded-2xl p-4 font-mono text-[9px] text-white/35 space-y-1 max-h-[140px] overflow-y-auto">
                          <div>[system] Listening on port 11434...</div>
                          <div>[system] Handshake token generated...</div>
                          {activationState !== "typing" && (
                            <>
                              <div>[system] SHA-256 validation initiated...</div>
                              <div>[system] key matched: ce57f00...</div>
                              <div>[system] sovereign handshake established.</div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Pane: Key Validation */}
                      <div className="w-[360px] border border-white/10 bg-white/[0.01] rounded-3xl p-6 flex flex-col justify-between">
                        <div className="space-y-5 text-center">
                          <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto">
                            <Key className="w-6 h-6 animate-pulse" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-extrabold uppercase tracking-tight">Activate Sovereign Core</h3>
                            <p className="text-[10px] text-white/30 font-medium">Verify your offline authorization key.</p>
                          </div>
                          <div className="space-y-3 text-left">
                            <div className="space-y-1">
                              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">OWNER EMAIL</span>
                              <input 
                                readOnly value={emailInput}
                                placeholder="USER@SOVEREIGN.AI"
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/5 focus:outline-none uppercase"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">LICENSE KEY</span>
                              <input 
                                readOnly value={licenseInput}
                                placeholder="SHADOW-XXXX-XXXX"
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/5 focus:outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {activationState === "verifying" && (
                            <div className="flex items-center justify-center gap-2 text-cyan-400 text-[10px] font-mono animate-pulse">
                              <Activity className="w-3.5 h-3.5 animate-spin" /> RUNNING SECURE SHA-256 SIGNATURE CHECK...
                            </div>
                          )}

                          {activationState === "activated" && (
                            <div className="flex items-center justify-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-widest bg-green-500/10 border border-green-500/20 py-2 rounded-xl">
                              <Check className="w-3.5 h-3.5" /> Node Handshake Successful
                            </div>
                          )}

                          <button disabled className={`w-full py-3.5 rounded-xl font-extrabold text-[10px] uppercase tracking-widest transition-all ${
                            activationState === "activated" ? "bg-green-600 text-white" : "bg-white text-black"
                          }`}>
                            {activationState === "activated" ? "Finalized" : "Finalize Core"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* MEMORY BANK VIEW */}
                  {activeView === "knowledge" && (
                    <motion.div 
                      key="step-knowledge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col space-y-6 overflow-y-auto min-h-0"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-extrabold tracking-tight">Memory Bank</h3>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">RAG Ingestion Database</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-white/30">
                          <span>Metric: <strong className="text-orange-400">Cosine Similarity</strong></span>
                          <span>Dimensions: <strong className="text-cyan-400">384</strong></span>
                          <span className="px-3 py-1 rounded-full border border-orange-500/20 text-[9px] font-bold text-orange-400 bg-orange-500/5 uppercase">
                            HNSW INDEXED
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-6 flex-1 min-h-0">
                        {/* Source corpus list */}
                        <div className="col-span-2 border border-white/5 rounded-3xl bg-black/10 p-5 flex flex-col space-y-4">
                          <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Source Knowledge Corpus</h4>
                          <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
                            <div className="p-3.5 border border-white/5 bg-white/[0.02] rounded-2xl flex items-center justify-between text-xs">
                              <div className="space-y-1">
                                <span className="font-bold flex items-center gap-2 text-white/80">
                                  <FileText className="w-4 h-4 text-orange-400" /> company_policy.pdf
                                </span>
                                <p className="text-[9px] text-white/30">1.4 MB · 820 chunks indexed</p>
                              </div>
                              <span className="text-[9px] font-mono text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full uppercase">INDEXED</span>
                            </div>
                            {ragLogs.length > 0 && (
                              <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="p-3.5 border border-orange-500/20 bg-orange-500/[0.02] rounded-2xl flex items-center justify-between text-xs"
                              >
                                <div className="space-y-1">
                                  <span className="font-bold flex items-center gap-2 text-orange-300">
                                    <FileText className="w-4 h-4 text-orange-400 animate-bounce" /> projections.pdf
                                  </span>
                                  <p className="text-[9px] text-orange-400/50">1.2 MB · 640 chunks</p>
                                </div>
                                <span className="text-[9px] font-mono text-orange-400 animate-pulse font-bold bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full uppercase">
                                  {ragSuccess ? "READY" : "VECTORIZING"}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Operations console and vector map */}
                        <div className="col-span-3 border border-white/5 rounded-3xl bg-black/20 p-5 flex flex-col justify-between min-h-0">
                          <div className="space-y-4 flex-1 flex flex-col min-h-0">
                            <h4 className="text-[10px] font-black uppercase text-white/20 tracking-wider">Console & Embedding Space Mapping</h4>
                            
                            {ragProgress === 0 ? (
                              <div className="border border-dashed border-white/10 hover:border-orange-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group flex-1">
                                <FileText className="w-8 h-8 text-white/25 group-hover:text-orange-400 transition-colors animate-pulse" />
                                <span className="text-xs font-bold">Ingest Q3_Financial_Projections.pdf</span>
                                <span className="text-[9px] text-white/20">Drop file to split and generate locally.</span>
                              </div>
                            ) : (
                              <div className="flex-1 flex flex-col justify-between min-h-0 gap-4">
                                <div className="h-40 w-full border border-orange-500/10 rounded-2xl bg-black/40 overflow-hidden relative flex items-center justify-center">
                                  <svg className="w-full h-full text-orange-400/20" viewBox="0 0 300 120">
                                    <g stroke="currentColor" strokeWidth="0.5">
                                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="60" x2="100" y2="40" />
                                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} x1="100" y1="40" x2="150" y2="80" />
                                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} x1="150" y1="80" x2="200" y2="30" />
                                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }} x1="200" y1="30" x2="250" y2="60" />
                                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8 }} x1="100" y1="40" x2="200" y2="30" strokeDasharray="2 2" className="text-cyan-400/35" />
                                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2 }} x1="50" y1="60" x2="150" y2="80" strokeDasharray="2 2" className="text-cyan-400/35" />
                                    </g>
                                    <circle cx="50" cy="60" r="4" className="fill-orange-400 animate-pulse" />
                                    <circle cx="100" cy="40" r="5" className="fill-orange-500 animate-pulse" />
                                    <circle cx="150" cy="80" r="4" className="fill-orange-400" />
                                    <circle cx="200" cy="30" r="6" className="fill-cyan-400 animate-pulse" />
                                    <circle cx="250" cy="60" r="4" className="fill-orange-400" />
                                    
                                    <text x="50" y="50" fill="currentColor" fontSize="6" className="font-mono text-white/40">Chunk_01</text>
                                    <text x="100" y="30" fill="currentColor" fontSize="6" className="font-mono text-white/40">Chunk_06</text>
                                    <text x="200" y="20" fill="currentColor" fontSize="6" className="font-mono text-cyan-400">Active_Query</text>
                                  </svg>
                                  <div className="absolute top-2 right-2 px-2 py-0.5 border border-cyan-500/20 bg-cyan-500/5 text-[7px] font-mono text-cyan-400 uppercase rounded">Similarity Mesh View</div>
                                </div>

                                <div className="bg-black/60 border border-white/5 rounded-xl p-3.5 font-mono text-[9px] text-white/50 space-y-1 overflow-y-auto max-h-[110px] flex-1">
                                  {ragLogs.map((log, index) => (
                                    <div key={index} className={log.includes("SUCCESS") || log.includes("✓") ? "text-green-400 font-bold" : log.includes("[neural]") ? "text-cyan-400" : ""}>{log}</div>
                                  ))}
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase">
                                    <span>OFFLINE VECTOR GENERATION</span>
                                    <span>{ragProgress}%</span>
                                  </div>
                                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
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
                            <div className="flex flex-col gap-2 max-w-[80%]">
                              <div className={`px-4 py-3 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed ${
                                msg.role === "user" 
                                  ? "bg-white text-black font-semibold rounded-tr-none shadow-md" 
                                  : "border border-white/5 bg-white/[0.02] text-white/80 rounded-tl-none"
                              }`}>
                                {msg.content}
                              </div>
                              
                              {/* RAG Agent Tool Log Trace */}
                              {msg.showLogs && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                  className="border border-white/10 bg-black/60 rounded-xl overflow-hidden font-mono text-[9px] w-full text-left self-start"
                                >
                                  <div className="px-3 py-1.5 bg-white/5 border-b border-white/5 text-white/30 flex justify-between uppercase tracking-wider font-bold">
                                    <span>🤖 LOCAL AGENT EXECUTION TRACE</span>
                                    <span className="text-cyan-400">Offline Secure Enclave</span>
                                  </div>
                                  <div className="p-3 space-y-1.5 text-white/60">
                                    <div>[10:14:02] <span className="text-purple-400 font-bold">INFO</span> Intent classification: Consolidated Task Retrieval</div>
                                    <div>[10:14:02] <span className="text-cyan-400 font-bold">TOOL</span> CALL: <span className="text-yellow-400 font-bold">email.list_inbox(unread=true)</span></div>
                                    <div>[10:14:03] <span className="text-green-400 font-bold">RET</span> Result: 1 unread email from <span className="text-cyan-300 font-bold">Sarah (Ops)</span> (ID: eml_892)</div>
                                    <div>[10:14:03] <span className="text-cyan-400 font-bold">TOOL</span> CALL: <span className="text-yellow-400 font-bold">whatsapp.get_chats(unread=true)</span></div>
                                    <div>[10:14:04] <span className="text-green-400 font-bold">RET</span> Result: 1 unread message from <span className="text-cyan-300 font-bold">Investor Update</span> (ID: wa_401)</div>
                                    <div>[10:14:04] <span className="text-purple-400 font-bold">ANALYZER</span> Reading email contents... Request for "Review meeting tomorrow at 2:00 PM"</div>
                                    <div>[10:14:05] <span className="text-cyan-400 font-bold">TOOL</span> CALL: <span className="text-yellow-400 font-bold">calendar.check_conflicts(start="2026-06-01T14:00", end="2026-06-01T15:00")</span></div>
                                    <div>[10:14:05] <span className="text-green-400 font-bold">RET</span> Result: 0 conflicts found in calendar.ics</div>
                                    <div>[10:14:06] <span className="text-purple-400 font-bold">PLANNER</span> Recommendations generated. Queuing Action Cards inside Autonomous Hub.</div>
                                    <div>[10:14:06] <span className="text-green-400 font-bold">STATUS</span> Completed locally in 4.12s. Zero data transmitted to cloud.</div>
                                  </div>
                                </motion.div>
                              )}
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
                                <div className="px-2.5 py-0.5 border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">
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

                  {/* NEURAL HUB VIEW */}
                  {activeView === "hub" && (
                    <motion.div 
                      key="step-hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col space-y-6 overflow-y-auto min-h-0"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-extrabold tracking-tight">Neural Hub</h3>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Central Neural Command & Automation Hub</p>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-pink-500/20 text-[9px] font-bold text-pink-400 bg-pink-500/5 uppercase tracking-wider animate-pulse flex items-center gap-1.5 font-mono">
                          <Zap className="w-3 h-3 text-pink-400" /> Monitoring Local Workspace Nodes
                        </div>
                      </div>

                      {/* Active Automation Graph Pipeline */}
                      <div className="p-4.5 border border-white/5 bg-black/40 rounded-2xl flex items-center justify-between text-[8px] font-mono text-white/30 uppercase tracking-wider">
                        <div className="flex items-center gap-2 text-cyan-400 font-extrabold bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-lg">
                          <Mail className="w-3.5 h-3.5" />
                          <span>Source: Sarah's Email</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-white/20" />
                        <div className="flex items-center gap-2 text-purple-400 font-extrabold bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-lg animate-pulse">
                          <Bot className="w-3.5 h-3.5 text-purple-400" />
                          <span>Ollama NLP Parser</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-white/20" />
                        <div className="flex items-center gap-2 text-yellow-400 font-extrabold bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-lg">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>conflict_scanner</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-white/20" />
                        <div className={`flex items-center gap-2 font-extrabold px-2 py-1 rounded-lg border ${
                          hubActionStatus === "approved" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-pink-500/10 border-pink-500/20 text-pink-400"
                        }`}>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Task: Sync calendar.ics</span>
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
                              <Calendar className="w-5 h-5 animate-pulse" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2.5">
                                <h4 className="text-sm font-bold">Schedule Proposed Review Meeting</h4>
                                <span className="text-[8px] font-mono tracking-widest text-white/30 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase">Email Sync</span>
                              </div>
                              <p className="text-[11px] text-white/50">Sarah Ops requested a slot for Q3 Project Review. Suggesting calendar sync booking.</p>
                              <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-white/35 space-y-0.5">
                                <div>Event Target: Tomorrow, 2:00 PM - 3:00 PM</div>
                                <div>Destination: apps/integrations/calendar.ics</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {hubActionStatus === "pending" && (
                              <button 
                                onClick={() => {
                                  setHubActionStatus("approving");
                                  playToolHum();
                                  setTimeout(() => {
                                    setHubActionStatus("approved");
                                    setShowNewCalendarEvent(true);
                                    playSuccessChirp();
                                  }, 1200);
                                }}
                                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-cyan-500/5"
                              >
                                Approve & Run
                              </button>
                            )}
                            {hubActionStatus === "approving" && (
                              <button className="px-5 py-2.5 bg-cyan-600/40 text-cyan-200 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                                <Activity className="w-3.5 h-3.5 animate-spin" /> ICS Syncing...
                              </button>
                            )}
                            {hubActionStatus === "approved" && (
                              <span className="text-green-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl">
                                <Check className="w-4 h-4" /> Sync Complete
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Suggestion Card 2 */}
                        <div className={`p-6 border rounded-2xl flex items-center justify-between gap-6 transition-all duration-500 ${
                          waReplyStatus === "approved" 
                            ? "border-green-500/20 bg-green-500/[0.01]" 
                            : "border-white/5 bg-white/[0.01] hover:border-cyan-500/20"
                        }`}>
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
                              <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-white/35">
                                Draft: "Hi, the live demo is ready for review."
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {waReplyStatus === "pending" && (
                              <button 
                                onClick={() => {
                                  setWaReplyStatus("approving");
                                  playToolHum();
                                  setTimeout(() => {
                                    setWaReplyStatus("approved");
                                    setWaReplySent(true);
                                    playSuccessChirp();
                                  }, 1200);
                                }}
                                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-cyan-500/5"
                              >
                                Approve
                              </button>
                            )}
                            {waReplyStatus === "approving" && (
                              <button className="px-5 py-2.5 bg-cyan-600/40 text-cyan-200 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                                <Activity className="w-3.5 h-3.5 animate-spin" /> Replying...
                              </button>
                            )}
                            {waReplyStatus === "approved" && (
                              <span className="text-green-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl">
                                <Check className="w-4 h-4" /> Message Sent
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TOOLS HUB VIEW */}
                  {activeView === "tools" && (
                    <motion.div 
                      key="step-tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full p-8 flex flex-col space-y-6 overflow-y-auto min-h-0"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-extrabold tracking-tight">Tools Hub</h3>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Sovereign Integration Manager</p>
                        </div>
                        <span className="px-3 py-1 rounded-full border border-white/10 text-[9px] font-mono text-white/40 uppercase bg-white/5">
                          Offline Handshakes: 3 Active
                        </span>
                      </div>
                      
                      {!selectedSubTool ? (
                        <div className="grid grid-cols-2 gap-5">
                          {[
                            { id: "whatsapp", label: "WhatsApp Node", desc: "Local session message mirroring. Status: pairing ready.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: <MessageSquare className="w-8 h-8" />, status: waSessionStatus === "connected" ? "✓ Sync Active" : "● Offline" },
                            { id: "email", label: "Email Intelligence", desc: "Local IMAP reader & SMTP sender logs.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: <Mail className="w-8 h-8" />, status: "✓ Connected" },
                            { id: "calendar", label: "Local Schedule", desc: "Sync direct schedule write to calendar.ics.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", icon: <Calendar className="w-8 h-8" />, status: "✓ Linked" },
                            { id: "rag", label: "Memory Bank RAG", desc: "Index documents and database points.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: <FileText className="w-8 h-8" />, status: "✓ Active" }
                          ].map(t => (
                            <div 
                              key={t.id} 
                              onClick={() => {
                                setSelectedSubTool(t.id);
                                playChirp();
                              }}
                              className="p-5.5 border border-white/5 bg-white/[0.01] hover:border-cyan-500/20 rounded-2xl flex items-center justify-between cursor-pointer transition-all group hover:bg-white/[0.02]"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${t.bg} ${t.color}`}>{t.icon}</div>
                                <div className="space-y-0.5">
                                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{t.label}</h4>
                                  <p className="text-[10px] text-white/35 max-w-[220px]">{t.desc}</p>
                                </div>
                              </div>
                              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded ${
                                t.status.includes("✓") ? "bg-green-500/10 text-green-400 border border-green-500/25" : "bg-white/5 text-white/30"
                              }`}>{t.status}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col border border-white/5 rounded-3xl bg-black/20 overflow-hidden min-h-0">
                          {/* Header of Detail Sub-View */}
                          <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <button 
                              onClick={() => {
                                setSelectedSubTool(null);
                                playTick();
                              }}
                              className="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-white flex items-center gap-1"
                            >
                              ← Back to Integrations
                            </button>
                            <span className="text-[8px] font-mono text-white/30 uppercase tracking-wider">Sub-Node Console</span>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-6 min-h-0">
                            {/* WhatsApp Sub-View Detail */}
                            {selectedSubTool === "whatsapp" && (
                              <div className="h-full flex flex-col justify-between min-h-0">
                                {waSessionStatus !== "connected" ? (
                                  <div className="max-w-md mx-auto w-full p-6 border border-white/5 bg-black/40 rounded-2xl text-center space-y-5">
                                    <div className="space-y-1">
                                      <h5 className="text-xs font-bold text-white/80 uppercase tracking-wider">Pair WhatsApp Node Session</h5>
                                      <p className="text-[10px] text-white/40">Secure local session token pairing. Data remains entirely on-device.</p>
                                    </div>
                                    
                                    {waSessionStatus === "disconnected" ? (
                                      <div className="w-36 h-36 bg-white p-2.5 rounded-xl mx-auto relative overflow-hidden flex items-center justify-center shadow-lg">
                                        {/* Mock QR details using Grid */}
                                        <div className="grid grid-cols-6 grid-rows-6 gap-1 w-full h-full text-black">
                                          <div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" />
                                          <div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" />
                                          <div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" />
                                          <div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-white" />
                                          <div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" />
                                          <div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-white" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" />
                                        </div>
                                        <motion.div 
                                          animate={{ top: ["0%", "100%", "0%"] }}
                                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                          className="absolute left-0 w-full h-[3px] bg-emerald-400 shadow-[0_0_12px_#34d399]"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-36 h-36 bg-black/20 border border-white/5 rounded-xl flex flex-col items-center justify-center mx-auto text-green-400">
                                        <RefreshCw className="w-8 h-8 animate-spin" />
                                        <span className="text-[8px] font-mono mt-3 uppercase tracking-wider animate-pulse text-green-400">Pairing Handshake...</span>
                                      </div>
                                    )}

                                    <button 
                                      onClick={triggerWhatsAppPairingManual}
                                      className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-green-500/10 transition-all hover:scale-[1.02]"
                                    >
                                      Generate QR & Pair
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex-1 flex gap-5 min-h-0 h-full border border-white/5 bg-black/40 rounded-2xl overflow-hidden">
                                    {/* Sidebar Inbox List */}
                                    <div className="w-[180px] border-r border-white/5 flex flex-col bg-black/20">
                                      <div className="px-3.5 py-3 border-b border-white/5 font-bold text-[9px] tracking-wider text-white/30 uppercase">Conversations</div>
                                      <div className="flex-1 overflow-y-auto">
                                        {waInboxData.map((chat, idx) => (
                                          <div 
                                            key={idx} 
                                            onClick={() => {
                                              setActiveWaContact(chat.name);
                                              playTick();
                                              // Clear unread indicator
                                              setWaInboxData(prev => prev.map(c => 
                                                c.name === chat.name ? { ...c, unread: 0 } : c
                                              ));
                                            }}
                                            className={`p-3 border-b border-white/[0.02] flex items-center justify-between cursor-pointer transition-colors ${
                                              activeWaContact === chat.name ? "bg-white/10 border-l-2 border-green-500" : "hover:bg-white/[0.02]"
                                            }`}
                                          >
                                            <div className="flex items-center gap-2 min-w-0">
                                              <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">{chat.initials}</div>
                                              <div className="min-w-0">
                                                <h5 className="font-bold text-[10px] text-white/80 line-clamp-1">{chat.name}</h5>
                                                <p className="text-[8px] text-white/30 line-clamp-1">{chat.lastMsg}</p>
                                              </div>
                                            </div>
                                            {chat.unread > 0 && <span className="w-4 h-4 bg-green-500 text-black text-[8px] font-black rounded-full flex items-center justify-center flex-shrink-0">{chat.unread}</span>}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    {/* Conversation Window */}
                                    <div className="flex-1 flex flex-col justify-between bg-black/10">
                                      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 bg-black/20">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[9px]">
                                          {activeWaContact === "Investor Update" ? "IU" : activeWaContact === "Dev Team" ? "DT" : "SO"}
                                        </div>
                                        <div>
                                          <h5 className="font-bold text-[10px] text-white/80">{activeWaContact}</h5>
                                          <p className="text-[7px] font-mono text-green-400">● SECURE SYNC ACTIVE</p>
                                        </div>
                                      </div>
                                      <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                        {(waMessages[activeWaContact] || []).map((msg, mIdx) => (
                                          <div key={mIdx} className={`flex ${msg.role === "incoming" ? "justify-start" : "justify-end"}`}>
                                            <div className={`p-3 max-w-[80%] text-[10px] space-y-1 rounded-2xl ${
                                              msg.role === "incoming"
                                                ? "bg-white/5 border border-white/5 text-white/80 rounded-tl-none"
                                                : "bg-green-600 text-white rounded-tr-none font-semibold"
                                            }`}>
                                              <p>{msg.content}</p>
                                              <span className={`text-[7px] block text-right font-mono ${
                                                msg.role === "incoming" ? "text-white/20" : "text-white/50"
                                              }`}>{msg.time}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="p-2.5 border-t border-white/5 bg-black/20 flex gap-2">
                                        <input 
                                          value={waTypedInput}
                                          onChange={(e) => setWaTypedInput(e.target.value)}
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter" && waTypedInput.trim()) {
                                              const newMsg = waTypedInput;
                                              setWaMessages(prev => ({
                                                ...prev,
                                                [activeWaContact]: [
                                                  ...(prev[activeWaContact] || []),
                                                  { role: "outgoing", content: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                                                ]
                                              }));
                                              setWaInboxData(prev => prev.map(chat => 
                                                chat.name === activeWaContact 
                                                  ? { ...chat, lastMsg: newMsg }
                                                  : chat
                                              ));
                                              setWaTypedInput("");
                                              playChirp();
                                            }
                                          }}
                                          placeholder={`Reply to ${activeWaContact} securely...`} 
                                          className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none" 
                                        />
                                        <button 
                                          onClick={() => {
                                            if (!waTypedInput.trim()) return;
                                            const newMsg = waTypedInput;
                                            setWaMessages(prev => ({
                                              ...prev,
                                              [activeWaContact]: [
                                                ...(prev[activeWaContact] || []),
                                                { role: "outgoing", content: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                                              ]
                                            }));
                                            setWaInboxData(prev => prev.map(chat => 
                                              chat.name === activeWaContact 
                                                ? { ...chat, lastMsg: newMsg }
                                                : chat
                                            ));
                                            setWaTypedInput("");
                                            playChirp();
                                          }}
                                          className="px-3 bg-white text-black rounded-xl text-[9px] font-bold"
                                        >
                                          Send
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Email Sub-View Detail */}
                            {selectedSubTool === "email" && (
                              <div className="h-full flex gap-5 min-h-0 h-full border border-white/5 bg-black/40 rounded-2xl overflow-hidden">
                                {/* Email List Pane */}
                                <div className="w-[200px] border-r border-white/5 flex flex-col bg-black/20">
                                  <div className="px-3.5 py-3 border-b border-white/5 font-bold text-[9px] tracking-wider text-white/30 uppercase">Inbox</div>
                                  <div className="flex-1 overflow-y-auto">
                                    <div className="p-3 border-b border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04]">
                                      <div className="flex justify-between items-center">
                                        <span className="font-extrabold text-[10px] text-cyan-300">Sarah (Ops)</span>
                                        <span className="text-[7px] text-white/30">09:15 AM</span>
                                      </div>
                                      <h6 className="font-bold text-[9px] text-white/80 mt-1 line-clamp-1">Q3 Project Review Meeting</h6>
                                      <p className="text-[8px] text-white/30 mt-0.5 line-clamp-1">Hi, I looked over the latest Q3 projections...</p>
                                    </div>
                                    <div className="p-3 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] opacity-50">
                                      <div className="flex justify-between items-center">
                                        <span className="font-bold text-[10px]">Vercel Team</span>
                                        <span className="text-[7px] text-white/30">Yesterday</span>
                                      </div>
                                      <h6 className="font-bold text-[9px] text-white/80 mt-1 line-clamp-1">Deploy Successful</h6>
                                      <p className="text-[8px] text-white/30 mt-0.5 line-clamp-1">Your website demo is now online...</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Reading Pane */}
                                <div className="flex-1 flex flex-col justify-between bg-black/10 p-5">
                                  <div className="space-y-4 flex-1">
                                    <div className="border-b border-white/5 pb-4 space-y-2.5">
                                      <div className="flex justify-between">
                                        <div>
                                          <h4 className="font-extrabold text-sm text-white/90">Q3 Project Review Meeting</h4>
                                          <p className="text-[9px] text-white/40 mt-1 font-mono">From: Sarah Ops &lt;sarah@sovereign.ai&gt;</p>
                                        </div>
                                        <span className="text-[8px] font-mono text-white/30">TODAY, 9:15 AM</span>
                                      </div>
                                      <div className="flex gap-2">
                                        <span className="text-[8px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">IMAP ROUTE</span>
                                        <span className="text-[8px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-mono">ENCRYPTED</span>
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-white/70 leading-relaxed space-y-3 font-medium">
                                      <p>Hi,</p>
                                      <p>I looked over the latest Q3 projections and need to align on the final figures.</p>
                                      <p>Can we schedule a 1-hour review meeting tomorrow at 2:00 PM?</p>
                                      <p>Let me know if this works. I can send a calendar block if you are free.</p>
                                      <p>Best,<br />Sarah</p>
                                    </div>
                                  </div>
                                  <div className="p-3 border border-blue-500/10 bg-blue-500/[0.02] text-blue-300 text-[9px] rounded-xl flex items-center gap-2 font-mono">
                                    <Lock className="w-3.5 h-3.5" /> Credentials and tokens securely encrypted via local OS parameters.
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Calendar Sub-View Detail */}
                            {selectedSubTool === "calendar" && (
                              <div className="h-full flex gap-5 min-h-0 h-full border border-white/5 bg-black/40 rounded-2xl overflow-hidden">
                                <div className="w-[180px] border-r border-white/5 bg-black/20 p-4 space-y-4">
                                  <div className="space-y-1">
                                    <h5 className="font-bold text-[10px] text-white/80 uppercase tracking-wide">Calendar Sync</h5>
                                    <p className="text-[8px] text-white/40">File system direct access mode.</p>
                                  </div>
                                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 text-[9px] flex items-center gap-2 font-mono">
                                    <FileText className="w-3.5 h-3.5 text-purple-400" /> integrations/calendar.ics
                                  </div>
                                  <div className="space-y-1 text-[8px] font-mono text-white/30">
                                    <div>LAST SYNC: Just Now</div>
                                    <div>SYNC POLICY: 100% Offline</div>
                                  </div>
                                </div>
                                
                                {/* Calendar Weekly Grid */}
                                <div className="flex-1 bg-black/10 p-4 flex flex-col min-h-0">
                                  <div className="grid grid-cols-6 border-b border-white/10 pb-2 text-[9px] font-mono text-white/40 text-center uppercase tracking-widest font-black">
                                    <span>Time</span>
                                    <span>Mon</span>
                                    <span>Tue</span>
                                    <span>Wed</span>
                                    <span>Thu</span>
                                    <span>Fri</span>
                                  </div>
                                  <div className="flex-1 overflow-y-auto pr-1 mt-2 relative min-h-[160px] text-[8px] font-mono text-white/30">
                                    <div className="grid grid-cols-6 h-full min-h-[220px] relative border-l border-white/5">
                                      {/* Hourly dividers */}
                                      <div className="col-span-1 border-r border-white/5 flex flex-col justify-between py-1.5 pr-2 text-right">
                                        <span>09:00 AM</span>
                                        <span>10:00 AM</span>
                                        <span>11:00 AM</span>
                                        <span>12:00 PM</span>
                                        <span>01:00 PM</span>
                                        <span>02:00 PM</span>
                                        <span>03:00 PM</span>
                                        <span>04:00 PM</span>
                                      </div>
                                      
                                      {/* Monday Grid */}
                                      <div className="col-span-1 border-r border-white/5 relative">
                                        <div className="absolute top-[8%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Daily Sync</div>
                                      </div>
                                      
                                      {/* Tuesday Grid */}
                                      <div className="col-span-1 border-r border-white/5 relative">
                                        <div className="absolute top-[8%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Daily Sync</div>
                                        
                                        {/* Sarah Ops review Meeting - FADES/PULSES IN */}
                                        {showNewCalendarEvent && (
                                          <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute top-[65%] bottom-[10%] left-1 right-1 p-2.5 bg-purple-600/35 border border-purple-400 rounded-xl flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.55)] cursor-pointer text-left animate-pulse"
                                          >
                                            <span className="font-extrabold text-[8px] text-cyan-300 line-clamp-2">Q3 Project Review</span>
                                            <span className="text-[7px] text-purple-300 font-bold">Sarah Ops</span>
                                            <span className="text-[6px] text-white/40 block mt-0.5">2:00 PM - 3:00 PM</span>
                                          </motion.div>
                                        )}
                                      </div>

                                      {/* Wednesday Grid */}
                                      <div className="col-span-1 border-r border-white/5 relative">
                                        <div className="absolute top-[8%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Daily Sync</div>
                                        <div className="absolute top-[25%] bottom-[50%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Weekly Sync</div>
                                      </div>

                                      {/* Thursday Grid */}
                                      <div className="col-span-1 border-r border-white/5 relative">
                                        <div className="absolute top-[8%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Daily Sync</div>
                                        <div className="absolute top-[75%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Review Demo</div>
                                      </div>

                                      {/* Friday Grid */}
                                      <div className="col-span-1 relative">
                                        <div className="absolute top-[8%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Daily Sync</div>
                                        <div className="absolute top-[85%] left-1 right-1 p-1 bg-white/5 border border-white/10 rounded-lg text-[7px] text-white/50">Retro Sync</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Memory RAG subtool detail placeholder redirect */}
                            {selectedSubTool === "rag" && (
                              <div className="p-6 text-center space-y-4">
                                <p className="text-xs text-white/50">For direct document index corpus and similarity map options, please navigate to the **Memory Bank** sidebar page.</p>
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
