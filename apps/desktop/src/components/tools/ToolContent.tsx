"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, Mail, Calendar, FileText, 
  Send, Search, Plus, CheckCircle2, 
  Clock, Shield, Zap, Filter, Upload, Database
} from "lucide-react";

export function WhatsAppTool() {
  const [chats] = useState([
    { name: "John Doe", msg: "Hey, did you see the report?", time: "10:30 AM" },
    { name: "Design Team", msg: "New assets are ready for review.", time: "09:45 AM" }
  ]);

  return (
    <div className="w-full h-full flex flex-col p-10 space-y-10">
       <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <MessageSquare className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold tracking-tight">WhatsApp Link</h3>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-xl border border-white/5">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Live_Session</span>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 overflow-hidden">
          <div className="col-span-1 space-y-4 overflow-y-auto custom-scrollbar pr-4">
             {chats.map(chat => (
               <div key={chat.name} className="glass-panel p-6 rounded-3xl space-y-2 cursor-pointer hover:border-green-500/30 transition-all">
                  <div className="flex justify-between items-center">
                     <p className="text-sm font-bold">{chat.name}</p>
                     <span className="text-[8px] text-white/20 font-black">{chat.time}</span>
                  </div>
                  <p className="text-xs text-white/40 line-clamp-1">{chat.msg}</p>
               </div>
             ))}
          </div>
          <div className="col-span-2 glass-panel rounded-[3rem] p-10 flex flex-col items-center justify-center space-y-8 text-center bg-green-500/[0.02]">
             <Shield className="w-16 h-16 text-green-500/20" />
             <div className="space-y-2">
                <h4 className="text-xl font-bold">Encrypted Communication Bridge</h4>
                <p className="text-sm text-white/20 max-w-sm">Your messages are decrypted locally on this machine. ShadowAgent cannot see them unless you authorize an automation.</p>
             </div>
             <button className="btn-primary bg-green-600 text-white shadow-green-500/20">Sync Latest Chats</button>
          </div>
       </div>
    </div>
  );
}

export function EmailTool() {
  return (
    <div className="w-full h-full flex flex-col p-10 space-y-10">
       <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold tracking-tight">Email Intelligence</h3>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="glass-panel rounded-[3rem] p-10 space-y-6">
             <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Auto_Summarize</h4>
             <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-3">
                     <div className="flex justify-between items-start">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                           <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] text-white/20 font-black">AI_DRAFT</span>
                     </div>
                     <p className="text-xs font-bold">Reply to: Investor Meeting Q4</p>
                     <p className="text-[10px] text-white/30 leading-relaxed">ShadowAgent has drafted a professional response based on your recent activity.</p>
                  </div>
                ))}
             </div>
          </div>
          <div className="glass-panel rounded-[3rem] p-10 flex flex-col items-center justify-center space-y-8 bg-blue-500/[0.02]">
             <Mail className="w-20 h-20 text-blue-500/20" />
             <button className="btn-primary bg-blue-600 text-white">Compose via AI</button>
          </div>
       </div>
    </div>
  );
}

export function FileTool() {
  return (
    <div className="w-full h-full flex flex-col p-10 space-y-10">
       <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <FileText className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold tracking-tight">Memory Bank (RAG)</h3>
          </div>
       </div>

       <div className="flex-1 glass-panel rounded-[3rem] border-dashed border-white/10 flex flex-col items-center justify-center p-20 space-y-10 group hover:border-orange-500/30 transition-all">
          <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center relative">
             <div className="absolute inset-0 bg-orange-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <Upload className="w-12 h-12 text-white/20 group-hover:text-orange-500 transition-colors" />
          </div>
          <div className="space-y-4 text-center">
             <h4 className="text-2xl font-black tracking-tighter uppercase">Drop Local Intelligence</h4>
             <p className="text-sm text-white/20 max-w-sm mx-auto">Upload PDFs, Docs, or Text files to create a local knowledge base. ShadowAgent will learn from them offline.</p>
          </div>
          <div className="flex gap-4">
             <button className="px-10 py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest">Select Files</button>
             <button className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Browse Library</button>
          </div>
       </div>
    </div>
  );
}
