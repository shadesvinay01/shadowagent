import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Calendar, Hash, Shield, CheckCircle2, Circle } from "lucide-react";

const tools = [
  { id: "whatsapp", name: "WhatsApp", icon: MessageSquare, description: "Send & receive messages locally", connected: true },
  { id: "email", name: "Email (IMAP/SMTP)", icon: Mail, description: "Automate your inbox", connected: false },
  { id: "calendar", name: "Google/Outlook Calendar", icon: Calendar, description: "Manage your schedule", connected: false },
  { id: "x", name: "X / Twitter", icon: Hash, description: "Automate social posts", connected: false },
];

export default function Connections() {
  const [connections, setConnections] = useState(tools);

  const toggleConnection = (id: string) => {
    setConnections(prev => prev.map(t => t.id === id ? { ...t, connected: !t.connected } : t));
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-syne font-bold tracking-tight">System Nodes</h2>
        <p className="text-white/40 font-manrope">Connect local services to expand ShadowAgent's capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connections.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-3xl border transition-all cursor-pointer ${
              tool.connected 
              ? "bg-primary/5 border-primary/20" 
              : "bg-white/5 border-white/10 opacity-60 grayscale"
            }`}
            onClick={() => toggleConnection(tool.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${tool.connected ? "bg-primary/10" : "bg-white/5"}`}>
                <tool.icon className={`w-6 h-6 ${tool.connected ? "text-primary" : "text-white/40"}`} />
              </div>
              {tool.connected ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <Circle className="w-5 h-5 text-white/20" />
              )}
            </div>
            <h3 className="text-lg font-syne font-bold mb-1">{tool.name}</h3>
            <p className="text-xs text-white/40 font-manrope leading-relaxed">{tool.description}</p>
            
            {tool.connected && (
              <div className="mt-4 pt-4 border-t border-primary/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Local Session Active</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-syne font-bold flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            End-to-End Privacy
          </h4>
          <p className="text-xs text-white/40 max-w-sm">
            All connection tokens and session data are stored in your OS Keychain. ShadowAgent never transmits these to any server.
          </p>
        </div>
        <button className="px-6 py-3 bg-white text-black rounded-xl font-syne font-bold text-sm hover:brightness-110 transition-all">
          Manage Keychain
        </button>
      </div>
    </div>
  );
}
