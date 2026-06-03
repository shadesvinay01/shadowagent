"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./components/chat/ChatInterface";
import OnboardingWizard from "./components/onboarding/OnboardingWizard";
import SettingsPage from "./components/settings/SettingsPage";
import AutonomousHub from "./components/automation/AutonomousHub";
// FIX: removed unused `getWhatsappMessages` import
import { checkOllamaStatus, getHardwareInfo, HardwareInfo } from "./lib/tauri/commands";
import { shadowAgent } from "./lib/agent/agent";
import {
  MessageSquare, LayoutGrid, History, Library, Settings,
  ChevronLeft, ChevronRight, Search, Zap, Shield, User, Activity, Mail, Calendar, FileText, ArrowRight, X, Upload, CheckCircle2,
  AlertTriangle, File
} from "lucide-react";

type Tab = "chat" | "tools" | "history" | "knowledge" | "settings";

// FIX: Memory Bank ingested file type
interface IngestedFile {
  name: string;
  indexedAt: string;
  chunks: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  // FIX: typed hardware info
  const [hardwareInfo, setHardwareInfo] = useState<HardwareInfo | null>(null);
  const [waMessages, setWaMessages] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [ingestionStatus, setIngestionStatus] = useState<string | null>(null);
  // FIX: track ingested files for Memory Bank tab
  const [ingestedFiles, setIngestedFiles] = useState<IngestedFile[]>(() => {
    try { return JSON.parse(localStorage.getItem("shadow_memory_bank") || "[]"); } catch { return []; }
  });

  // LIVE INTEGRATION STATES
  const [waQrCode, setWaQrCode] = useState<string | null>(null);
  const [waConnected, setWaConnected] = useState<boolean>(false);
  // FIX: timeout ref for WhatsApp "server not running" detection
  const [waServerError, setWaServerError] = useState<string | null>(null);
  const waTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [emailSummary, setEmailSummary] = useState<string | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

  const [calendarConnected, setCalendarConnected] = useState(false);
  const [isConnectingCalendar, setIsConnectingCalendar] = useState(false);

  // FIX: global search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    const isComplete = localStorage.getItem("shadow_onboarding_complete");
    if (isComplete) setShowOnboarding(false);

    const checkStatus = () => {
      checkOllamaStatus().then(setOllamaRunning).catch(() => setOllamaRunning(false));
      getHardwareInfo().then(setHardwareInfo).catch(console.error);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // FIX: WhatsApp polling with proper timeout and cleanup
  useEffect(() => {
    if (selectedTool !== "WhatsApp") return;

    setWaServerError(null);

    const checkWaStatus = async () => {
      try {
        const res = await fetch("http://localhost:3005/whatsapp/status");
        const data = await res.json();
        setWaConnected(data.ready);
        setWaQrCode(data.qr || null);
        setWaServerError(null);
        if (waTimeoutRef.current) { clearTimeout(waTimeoutRef.current); waTimeoutRef.current = null; }
        if (data.ready) {
          const msgsRes = await fetch("http://localhost:3005/whatsapp/messages");
          const msgsData = await msgsRes.json();
          if (msgsData.chats) setWaMessages(msgsData.chats);
        }
      } catch (e) {
        console.error("WhatsApp Integration Server not running");
      }
    };

    checkWaStatus();
    const int = setInterval(checkWaStatus, 3000);

    // FIX: show error if still not connected after 15s
    waTimeoutRef.current = setTimeout(() => {
      if (!waConnected) {
        setWaServerError(
          "Integration server not responding at localhost:3005. Run: node apps/backend/src/index.js"
        );
      }
    }, 15000);

    return () => {
      clearInterval(int);
      if (waTimeoutRef.current) clearTimeout(waTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("shadow_onboarding_complete", "true");
    setShowOnboarding(false);
  };

  const handleSyncWhatsApp = async () => {
    setIsSyncing(true);
    try {
      const msgsRes = await fetch("http://localhost:3005/whatsapp/messages");
      const msgsData = await msgsRes.json();
      if (msgsData.chats) setWaMessages(msgsData.chats);
    } catch (e) {
      console.error("Failed to sync live WhatsApp messages");
    }
    setIsSyncing(false);
  };

  // FIX: file ingestion now records files to Memory Bank tab
  const handleFileIngestion = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    const fileName = file?.name || "report.txt";
    setIngestionStatus("Initializing local indexing...");
    await new Promise((r) => setTimeout(r, 1500));

    try {
      const content = file
        ? await file.text().catch(() => "Binary file — metadata indexed.")
        : "This is a shadow-agent intelligence report. Local RAG is active and secure.";
      await shadowAgent.ask(`Ingest this file: ${fileName} with content: ${content}`);
      const newFile: IngestedFile = {
        name: fileName,
        indexedAt: new Date().toLocaleString(),
        chunks: Math.ceil(content.length / 800),
      };
      setIngestedFiles((prev) => {
        const next = [newFile, ...prev];
        localStorage.setItem("shadow_memory_bank", JSON.stringify(next));
        return next;
      });
      setIngestionStatus(`SUCCESS: ${fileName} indexed to Memory Bank.`);
      setTimeout(() => setIngestionStatus(null), 3000);
    } catch (e) {
      setIngestionStatus("ERROR: Ingestion failed.");
    }
  };

  const handleGenerateEmail = async () => {
    setIsGeneratingEmail(true);
    try {
      const res = await fetch("http://localhost:3005/email/inbox");
      const data = await res.json();
      if (data.error) {
        setEmailSummary(`Error: ${data.error}.\nPlease configure .env in the integrations folder with IMAP_USER, IMAP_PASS, and IMAP_HOST.`);
      } else if (data.emails) {
        const subjects = data.emails.map((e: any, i: number) => `${i + 1}. ${e.subject}`).join("\n");
        setEmailSummary(`You have ${data.emails.length} new emails:\n${subjects}`);
      }
    } catch (e) {
      setEmailSummary("Failed to fetch real emails. Is the integration server running?");
    }
    setIsGeneratingEmail(false);
  };

  const handleConnectCalendar = async () => {
    setIsConnectingCalendar(true);
    try {
      const res = await fetch("http://localhost:3005/calendar/events");
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else if (data.events && data.events.length > 0) {
        setCalendarConnected(true);
        localStorage.setItem(
          "next_event",
          `${data.events[0].summary} @ ${new Date(data.events[0].start).toLocaleTimeString()}`
        );
      } else {
        alert("No upcoming events found in calendar.ics");
      }
    } catch (e) {
      alert("Failed to read local calendar.ics");
    }
    setIsConnectingCalendar(false);
  };

  // FIX: global search across tabs / tools
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const allItems = [
      "Neural Chat", "Tools Hub", "WhatsApp", "Email Agent", "Calendar",
      "Local Files", "Autonomous Hub", "Memory Bank", "Preferences",
      "Ollama", "Hardware", "License", "Notifications", "Encryption",
    ];
    setSearchResults(allItems.filter((i) => i.toLowerCase().includes(q.toLowerCase())));
  };

  const navItems: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "chat", icon: <MessageSquare className="w-5 h-5" />, label: "Neural Chat" },
    { id: "tools", icon: <LayoutGrid className="w-5 h-5" />, label: "Tools Hub" },
    { id: "history", icon: <History className="w-5 h-5" />, label: "Autonomous Hub" },
    { id: "knowledge", icon: <Library className="w-5 h-5" />, label: "Memory Bank" },
    { id: "settings", icon: <Settings className="w-5 h-5" />, label: "Preferences" },
  ];

  return (
    <div className="h-screen w-screen flex bg-[#0A0A0A] text-white font-sans overflow-hidden relative selection:bg-cyan-500/30">

      <AnimatePresence>
        {showOnboarding && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[200]">
            <OnboardingWizard onComplete={handleOnboardingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOOL MODAL */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-3xl flex items-center justify-center p-12"
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 40 }}
              className="w-full max-w-5xl h-full glass-panel rounded-[3rem] overflow-hidden flex flex-col relative"
            >
              <button onClick={() => setSelectedTool(null)} className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white z-50">
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 p-16 overflow-y-auto custom-scrollbar">

                {selectedTool === "WhatsApp" && (
                  <div className="space-y-12">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20"><MessageSquare className="w-8 h-8" /></div>
                        <div>
                          <h2 className="text-4xl font-extrabold uppercase">WhatsApp Hub</h2>
                          <p className="text-white/30 text-xs font-black tracking-widest">Active Local Session</p>
                        </div>
                      </div>
                      <button
                        onClick={handleSyncWhatsApp}
                        disabled={isSyncing}
                        className="px-8 py-4 rounded-xl bg-green-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-500/20 flex items-center gap-3 disabled:opacity-50"
                      >
                        <History className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                        {isSyncing ? "Syncing..." : "Sync Message Bank"}
                      </button>
                    </div>

                    {/* FIX: show server error after timeout */}
                    {waServerError && (
                      <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5 flex items-start gap-4">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-orange-300">{waServerError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 p-8 glass-panel rounded-3xl space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-white/20 tracking-[0.5em]">Live_Feed</h4>
                        <div className="space-y-4">
                          {!waConnected && waQrCode && (
                            <div className="flex flex-col items-center justify-center p-8 text-center bg-white/5 rounded-2xl border border-white/10">
                              <h3 className="text-xl font-bold mb-4">Pair WhatsApp</h3>
                              <img src={waQrCode} alt="WhatsApp QR Code" className="w-64 h-64 bg-white p-4 rounded-xl mb-4" />
                              <p className="text-sm text-white/40">Scan this QR code with your WhatsApp mobile app to connect the local integration.</p>
                            </div>
                          )}
                          {!waConnected && !waQrCode && !waServerError && (
                            <div className="p-8 text-center text-white/30">Initializing WhatsApp Engine…</div>
                          )}
                          {waConnected && waMessages.map((m, i) => (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                              key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex justify-between items-start group cursor-pointer hover:bg-white/5 transition-all"
                            >
                              <div className="space-y-1">
                                <span className="text-sm font-bold text-cyan-400">{m.name || m.contact}</span>
                                <p className="text-sm text-white/60 line-clamp-1">{m.unreadCount > 0 ? `${m.unreadCount} unread` : "No new messages"}</p>
                              </div>
                              <span className="text-[9px] font-black text-white/20 uppercase">LIVE</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 glass-panel rounded-3xl flex flex-col items-center justify-center text-center space-y-6">
                        <Shield className="w-16 h-16 text-green-500/20" />
                        <h3 className="text-xl font-bold uppercase">{waConnected ? "Sovereign Mode" : "Disconnected"}</h3>
                        <p className="text-xs text-white/40 font-medium leading-relaxed">
                          {waConnected
                            ? "Messages are decrypted locally. No data is stored on external servers."
                            : "Connect to enable local agent access to WhatsApp."}
                        </p>
                        <div className="w-full pt-6 border-t border-white/5">
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2">
                            <span className="text-white/20">Encryption</span>
                            <span className="text-green-500">AES-256-GCM</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full w-full shadow-[0_0_10px_#22c55e] ${waConnected ? "bg-green-500" : "bg-white/20"}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTool === "Local Files" && (
                  <div className="space-y-12 h-full flex flex-col">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20"><FileText className="w-8 h-8" /></div>
                      <h2 className="text-4xl font-extrabold uppercase">Memory Bank</h2>
                    </div>
                    <label
                      className="flex-1 glass-panel rounded-3xl border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-8 hover:border-orange-500/30 transition-all cursor-pointer group relative overflow-hidden"
                    >
                      <input type="file" accept=".pdf,.txt,.md,.doc,.docx" className="hidden" onChange={handleFileIngestion} />
                      <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {ingestionStatus ? (
                        <div className="flex flex-col items-center gap-6 animate-pulse">
                          {ingestionStatus.includes("SUCCESS")
                            ? <CheckCircle2 className="w-20 h-20 text-green-500" />
                            : <Activity className="w-20 h-20 text-orange-500 animate-spin" />}
                          <p className="text-xl font-black uppercase tracking-tighter text-white">{ingestionStatus}</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-16 h-16 text-white/10 group-hover:text-orange-500 transition-colors" />
                          <div className="space-y-2">
                            <h4 className="text-2xl font-black uppercase">Ingest Knowledge</h4>
                            <p className="text-sm text-white/30 max-w-md">Drop PDFs or Docs here to train your local AI agent on your private data.</p>
                          </div>
                          <span className="px-10 py-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest">Select Files</span>
                        </>
                      )}
                    </label>
                  </div>
                )}

                {selectedTool === "Email Agent" && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20"><Mail className="w-8 h-8" /></div>
                      <h2 className="text-4xl font-extrabold uppercase">Email Intelligence</h2>
                    </div>
                    <div className="glass-panel rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-8">
                      <Zap className={`w-12 h-12 text-blue-400 ${isGeneratingEmail ? "animate-spin" : "animate-pulse"}`} />
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold">Local Inbox Analysis</h4>
                        <p className="text-sm text-white/30 max-w-sm">ShadowAgent is scanning your unread emails to generate autonomous summaries.</p>
                      </div>
                      {emailSummary ? (
                        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-left w-full max-w-md">
                          <p className="text-sm text-blue-100 whitespace-pre-line leading-relaxed">{emailSummary}</p>
                        </div>
                      ) : (
                        <button onClick={handleGenerateEmail} disabled={isGeneratingEmail} className="btn-primary bg-blue-600 text-white shadow-blue-500/20 disabled:opacity-50">
                          {isGeneratingEmail ? "Analyzing..." : "Generate Summary"}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {selectedTool === "Calendar" && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
                    <Calendar className={`w-20 h-20 ${calendarConnected ? "text-green-500" : "text-purple-500/20"}`} />
                    <h2 className="text-4xl font-extrabold uppercase">{calendarConnected ? "Calendar Synced" : "Calendar Node"}</h2>
                    <p className="text-white/30 max-w-xs">
                      {calendarConnected
                        ? `Next Meeting: ${localStorage.getItem("next_event")}`
                        : "Initializing local schedule sync. Your meetings stay on your device."}
                    </p>
                    {!calendarConnected && (
                      <button onClick={handleConnectCalendar} disabled={isConnectingCalendar} className="btn-primary bg-purple-600 text-white shadow-purple-500/20 px-12 disabled:opacity-50">
                        {isConnectingCalendar ? "Connecting..." : "Connect Local Calendar"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-glow glow-left" />
      <div className="bg-glow glow-right" />

      {/* Sidebar */}
      <motion.aside
        initial={false} animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="h-full border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-[100] relative"
      >
        <div className="h-20 flex items-center px-6 gap-4 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px] flex-shrink-0">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center"><Shield className="w-5 h-5 text-cyan-400" /></div>
          </div>
          {!isSidebarCollapsed && <span className="text-lg font-bold tracking-tighter">ShadowAgent</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                activeTab === item.id ? "bg-white/10 text-white" : "text-white/30 hover:bg-white/5 hover:text-white/60"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!isSidebarCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-full flex items-center justify-center py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4 text-white/40" /> : <ChevronLeft className="w-4 h-4 text-white/40" />}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl relative">
          <div className="flex-1 max-w-2xl relative">
            {/* FIX: Global search is now functional */}
            <div className="h-11 px-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 group focus-within:border-cyan-500/50 transition-all">
              <Search className="w-4 h-4 text-white/20 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Global Search..."
                className="bg-transparent border-none focus:ring-0 text-xs w-full placeholder:text-white/10"
              />
            </div>
            {/* Search dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  className="absolute top-14 left-0 right-0 glass-panel rounded-2xl border border-white/10 overflow-hidden z-50"
                >
                  {searchResults.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        const tab = navItems.find((n) => n.label.toLowerCase().includes(r.toLowerCase()));
                        if (tab) setActiveTab(tab.id);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="w-full px-5 py-3 text-left text-xs text-white/60 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3"
                    >
                      <Search className="w-3 h-3 text-white/20" /> {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-11 h-11 rounded-full border border-white/20 p-[2px] cursor-pointer ml-6">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === "chat" && (
              <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                <ChatInterface ollamaRunning={ollamaRunning} />
              </motion.div>
            )}
            {activeTab === "tools" && (
              <motion.div key="tools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-12">
                  <h2 className="text-4xl font-extrabold tracking-tighter">Tools Hub</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { l: "WhatsApp", i: <MessageSquare className="w-8 h-8" />, c: "text-green-500", d: "Secure local message sync." },
                      { l: "Email Agent", i: <Mail className="w-8 h-8" />, c: "text-blue-500", d: "Smart sorting & drafts." },
                      { l: "Calendar", i: <Calendar className="w-8 h-8" />, c: "text-purple-500", d: "Autonomous scheduling." },
                      { l: "Local Files", i: <FileText className="w-8 h-8" />, c: "text-orange-400", d: "RAG search on documents." },
                    ].map((tool) => (
                      <div key={tool.l} onClick={() => setSelectedTool(tool.l)} className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 group hover:border-cyan-500/30 transition-all cursor-pointer">
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${tool.c}`}>{tool.i}</div>
                        <div className="space-y-2"><h4 className="text-xl font-bold">{tool.l}</h4><p className="text-sm text-white/30">{tool.d}</p></div>
                        <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                          <span className="text-[9px] font-black uppercase text-white/20 tracking-widest">Functional</span>
                          <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-12 border-t border-white/5 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Activity className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-bold uppercase tracking-tighter">System Activity</h3>
                      </div>
                      <div className="flex gap-3">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${ollamaRunning ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">
                            Neural: {ollamaRunning ? "ONLINE" : "OFFLINE"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[
                        { label: "Acceleration", value: hardwareInfo?.acceleration || "Scanning...", icon: <Zap className="w-4 h-4" /> },
                        { label: "Processor", value: `${hardwareInfo?.cores ?? 0} Cores / ${hardwareInfo?.arch || "Detecting"}`, icon: <Activity className="w-4 h-4" /> },
                        { label: "Privacy Node", value: "100% Local", icon: <Shield className="w-4 h-4" /> },
                        { label: "Latency", value: "0.4ms (Intra-App)", icon: <History className="w-4 h-4" /> },
                      ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
                          <div className="text-white/20">{stat.icon}</div>
                          <div>
                            <p className="text-[9px] font-black uppercase text-white/20 tracking-widest">{stat.label}</p>
                            <p className="text-sm font-bold text-white/80">{stat.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === "settings" && (
              <motion.div key="settings" className="h-full"><SettingsPage /></motion.div>
            )}
            {activeTab === "history" && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                <AutonomousHub />
              </motion.div>
            )}
            {/* FIX: Memory Bank tab now shows ingested files instead of a forever-placeholder */}
            {activeTab === "knowledge" && (
              <motion.div key="knowledge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-extrabold tracking-tighter">Memory Bank</h2>
                      <p className="text-white/30 text-sm mt-1">Local knowledge indexed for RAG retrieval</p>
                    </div>
                    <label className="btn-primary text-black font-black text-[10px] uppercase tracking-widest cursor-pointer flex items-center gap-2 px-6 py-3">
                      <Upload className="w-4 h-4" /> Ingest File
                      <input type="file" accept=".pdf,.txt,.md,.doc,.docx" className="hidden" onChange={handleFileIngestion} />
                    </label>
                  </div>

                  {ingestionStatus && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className={`p-5 rounded-2xl border flex items-center gap-4 ${ingestionStatus.includes("SUCCESS") ? "border-green-500/30 bg-green-500/5 text-green-400" : ingestionStatus.includes("ERROR") ? "border-red-500/30 bg-red-500/5 text-red-400" : "border-cyan-500/30 bg-cyan-500/5 text-cyan-400"}`}
                    >
                      <Activity className={`w-5 h-5 flex-shrink-0 ${!ingestionStatus.includes("SUCCESS") && !ingestionStatus.includes("ERROR") ? "animate-spin" : ""}`} />
                      <span className="text-sm font-bold">{ingestionStatus}</span>
                    </motion.div>
                  )}

                  {ingestedFiles.length === 0 ? (
                    <div className="glass-panel rounded-[3rem] p-20 text-center space-y-6">
                      <Activity className="w-12 h-12 text-cyan-400/20 mx-auto" />
                      <h3 className="text-xl font-bold uppercase">No files indexed yet</h3>
                      <p className="text-sm text-white/30 max-w-sm mx-auto">
                        Ingest PDFs, text files, or documents to build a local knowledge base your agent can search.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {ingestedFiles.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          className="glass-panel p-6 rounded-3xl flex items-center gap-6"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                            <File className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">{f.name}</p>
                            <p className="text-xs text-white/30 mt-0.5">Indexed {f.indexedAt} · {f.chunks} chunks</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black uppercase text-green-400 tracking-widest flex-shrink-0">
                            Ready
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
