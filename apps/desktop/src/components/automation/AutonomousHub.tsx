import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, MessageSquare, Check, X, Zap, Activity } from "lucide-react";

interface Suggestion {
  id: string;
  type: 'email' | 'calendar' | 'whatsapp' | 'cross-tool';
  title: string;
  description: string;
  rawContext: string;
  suggestedAction: {
    tool: 'email' | 'calendar' | 'whatsapp';
    params: any;
  };
  status: 'pending' | 'approved' | 'dismissed';
  createdAt: string;
}

export default function AutonomousHub() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("http://localhost:3005/automation/suggestions");
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.suggestions);
      }
    } catch (e) {
      console.error("Failed to fetch autonomous suggestions", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
    const interval = setInterval(fetchSuggestions, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:3005/automation/suggestions/${id}/approve`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        fetchSuggestions();
      } else {
        alert(data.error || "Execution failed");
      }
    } catch (e) {
      alert("Failed to contact integrations server");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDismiss = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:3005/automation/suggestions/${id}/dismiss`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        fetchSuggestions();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">Autonomous Hub</h2>
            <p className="text-white/30 text-xs font-black tracking-widest uppercase mt-1">Autonomous Agent Actions & Recommendations</p>
          </div>
          <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-400">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Active Monitoring</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-white/30 font-black tracking-widest uppercase">Scanning streams...</div>
        ) : suggestions.length === 0 ? (
          <div className="glass-panel p-20 rounded-[3rem] text-center space-y-6">
            <Activity className="w-16 h-16 text-cyan-400/20 mx-auto animate-pulse" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold uppercase">No Actions Pending</h3>
              <p className="text-sm text-white/30 max-w-sm mx-auto">The Shadow Agent is monitoring your inbox, calendar, and chat channels. When actionable events are detected, they will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {suggestions.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`glass-panel p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border ${
                    item.status === 'approved' ? 'border-green-500/20 bg-green-500/[0.01]' :
                    item.status === 'dismissed' ? 'border-white/5 opacity-50' : 'border-white/5 hover:border-cyan-500/30'
                  } transition-all`}
                >
                  <div className="flex items-start gap-6 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      item.type === 'email' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      item.type === 'calendar' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-green-500/10 text-green-400 border border-green-500/20'
                    }`}>
                      {item.type === 'email' && <Mail className="w-6 h-6" />}
                      {item.type === 'calendar' && <Calendar className="w-6 h-6" />}
                      {item.type === 'whatsapp' && <MessageSquare className="w-6 h-6" />}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="text-lg font-bold">{item.title}</h4>
                        <span className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-wider ${
                          item.status === 'pending' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          item.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          'bg-white/5 text-white/30 border border-white/5'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">{item.description}</p>
                      
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] font-mono text-white/40 max-w-2xl whitespace-pre-wrap">
                        {item.rawContext}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0 w-full md:w-auto justify-end">
                    {item.status === 'pending' ? (
                      <>
                        <button
                          disabled={processingId !== null}
                          onClick={() => handleDismiss(item.id)}
                          className="px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Dismiss
                        </button>
                        <button
                          disabled={processingId !== null}
                          onClick={() => handleApprove(item.id)}
                          className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/10 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          {processingId === item.id ? 'Executing...' : 'Approve & Run'}
                        </button>
                      </>
                    ) : item.status === 'approved' ? (
                      <span className="text-xs font-black uppercase text-green-500 tracking-widest flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Executed
                      </span>
                    ) : (
                      <span className="text-xs font-black uppercase text-white/20 tracking-widest flex items-center gap-2">
                        Dismissed
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
