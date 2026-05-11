"use client";

import { motion } from "framer-motion";
import { Shield, Book, Lock, Zap, Cpu, MessageSquare, Mail, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const sections = [
  { id: "intro", title: "Introduction", icon: <Book className="w-4 h-4" /> },
  { id: "arch", title: "Architecture", icon: <Cpu className="w-4 h-4" /> },
  { id: "security", title: "Security Protocol", icon: <Shield className="w-4 h-4" /> },
  { id: "whatsapp", title: "WhatsApp Integration", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "email", title: "Email & Calendar", icon: <Mail className="w-4 h-4" /> },
  { id: "licensing", title: "Licensing System", icon: <Lock className="w-4 h-4" /> },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white font-manrope">
      <Navbar onDownload={() => {}} />

      <div className="container mx-auto px-6 pt-32 pb-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div className="sticky top-32">
            <h5 className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400/60 mb-6">Documentation</h5>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group"
                >
                  <span className="group-hover:text-cyan-400 transition-colors">{section.icon}</span>
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl space-y-24">
          
          {/* Intro */}
          <section id="intro" className="space-y-6">
            <h1 className="text-5xl font-syne font-bold tracking-tighter">Sovereignty Guide</h1>
            <p className="text-lg text-white/60 leading-relaxed">
              ShadowAgent is built on the philosophy of **Digital Sovereignty**. We believe that in an age of pervasive surveillance, your personal data—messages, emails, and files—should never leave your physical control.
            </p>
            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex gap-4">
              <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <p className="text-sm text-cyan-100/70 italic">
                "Privacy is not an option; it is the default state of ShadowAgent."
              </p>
            </div>
          </section>

          {/* Architecture */}
          <section id="arch" className="space-y-6">
            <h2 className="text-3xl font-syne font-bold tracking-tight flex items-center gap-3">
              <Cpu className="text-cyan-400" /> System Architecture
            </h2>
            <p className="text-white/60">
              ShadowAgent operates as a multi-layered local system designed for maximum performance and security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="font-bold text-white/90">The Core (Rust)</h4>
                <p className="text-xs text-white/40">Powered by Tauri 2.0, our Rust backend handles all system-level operations, secure storage, and process management with zero memory leakage.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="font-bold text-white/90">The Brain (Ollama)</h4>
                <p className="text-xs text-white/40">We leverage local LLM execution via Ollama. This ensures that every word analyzed by the agent stays within your CPU/GPU RAM.</p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="space-y-6">
            <h2 className="text-3xl font-syne font-bold tracking-tight flex items-center gap-3">
              <Lock className="text-cyan-400" /> Security Protocol
            </h2>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">1. OS-Native Encryption</h4>
              <p className="text-white/40 text-sm">
                ShadowAgent uses the **OS Keychain (macOS)** and **Credential Manager (Windows)** via the AES-256 encrypted `keyring` crate. We never store passwords or session tokens in plain text.
              </p>
              <h4 className="text-lg font-bold">2. Zero-Network Policy</h4>
              <p className="text-white/40 text-sm">
                Once activated, ShadowAgent is designed to operate in an **Air-Gapped** mode. The agent logic has no permission to make external HTTP requests except to the local Ollama API.
              </p>
            </div>
            <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-xs">
              <div className="flex gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
              <span className="text-cyan-400"># Audit: Verify Local Path</span><br/>
              <span className="text-white/40">$ shadowagent verify --security-audit</span><br/>
              <span className="text-green-400">[SUCCESS]</span> <span className="text-white/60">External telemetry: DISABLED</span><br/>
              <span className="text-green-400">[SUCCESS]</span> <span className="text-white/60">Local storage: ENCRYPTED (AES-256)</span>
            </div>
          </section>

          {/* WhatsApp */}
          <section id="whatsapp" className="space-y-6">
            <h2 className="text-3xl font-syne font-bold tracking-tight flex items-center gap-3">
              <MessageSquare className="text-cyan-400" /> WhatsApp Persistence
            </h2>
            <p className="text-white/60">
              Unlike other "automation" tools, we do not use the official Meta API which tracks usage metrics. We use a **Local Session Mirroring** technique.
            </p>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-1" />
                <span>**Scan Once**: Your session is stored in your local application data folder.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-1" />
                <span>**Headless Execution**: The agent interacts with a local, isolated Chromium instance.</span>
              </li>
            </ul>
          </section>

          {/* Licensing */}
          <section id="licensing" className="space-y-6">
            <h2 className="text-3xl font-syne font-bold tracking-tight flex items-center gap-3">
              <Zap className="text-cyan-400" /> Licensing System
            </h2>
            <p className="text-white/60">
              ShadowAgent uses a **Handshake Activation** model.
            </p>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 space-y-4">
              <h4 className="font-bold">Annual Tokens</h4>
              <p className="text-sm text-white/40 leading-relaxed">
                Upon purchase, our server issues a cryptographically signed **JWT (JSON Web Token)** valid for 365 days. The desktop app stores this token locally. After activation, the app **never needs to contact our servers again** until the license expires.
              </p>
            </div>
          </section>

          <footer className="pt-20 border-t border-white/5 text-center">
            <p className="text-white/20 text-xs">ShadowAgent Protocol v1.0.4 · Last Updated May 2026</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
