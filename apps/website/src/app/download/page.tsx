"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Download, ArrowLeft, Terminal, Copy, Check, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const platforms = [
  {
    name: "Windows Core",
    filename: "shadowagent_v1.0.0_x64.msi",
    size: "42.8 MB",
    checksum: "d84e91bc7190d64d5c95fae2f476a8d67c2691fa0be9debf6a96e57f00aa2ef6",
    command: "certutil -hashfile shadowagent_v1.0.0_x64.msi SHA256",
    os: "Windows 10 / 11 (64-bit)",
    tag: "Tauri Enclave Build"
  },
  {
    name: "macOS Silicon / Intel",
    filename: "shadowagent_v1.0.0_universal.dmg",
    size: "46.2 MB",
    checksum: "8a94628f249c185bc0195e54d89617fa0be9debf6a96e57f00aa2ef6c41b8a91",
    command: "shasum -a 256 shadowagent_v1.0.0_universal.dmg",
    os: "macOS 12+ (Universal Binary)",
    tag: "Gatekeeper Signed"
  },
  {
    name: "Linux Debian",
    filename: "shadowagent_v1.0.0_amd64.deb",
    size: "38.5 MB",
    checksum: "f9ae89c8a24c5689ef239fae2f476a8d67c2691fa0be9debf6a96e57f00aa2ef6",
    command: "sha256sum shadowagent_v1.0.0_amd64.deb",
    os: "Ubuntu / Debian / Mint",
    tag: "Air-Gapped AppImage"
  }
];

export default function DownloadPage() {
  const [copiedSum, setCopiedSum] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSum(id);
    setTimeout(() => setCopiedSum(null), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-cyan-500/20 cursor-none overflow-x-hidden flex flex-col justify-between">
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Sticky Navbar */}
      <Navbar onDownload={() => {}} />

      {/* Main content */}
      <section className="relative pt-36 pb-20 px-6 flex-1 flex flex-col justify-center items-center">
        {/* Background glow overlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none z-0" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-full text-[10px] font-mono text-white/50 hover:text-white uppercase tracking-widest no-underline transition-all mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-syne font-bold tracking-tight">
              Sovereign <span className="text-white/40">Installation</span>
            </h1>
            <p className="text-sm font-manrope text-white/50 max-w-md mx-auto leading-relaxed">
              Verify local binary integrity. Our Tauri client enclaves compile natively for total air-gapped protection.
            </p>
          </div>

          {/* Grid platform installers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {platforms.map((plat, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedPlatform(idx)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between h-[240px] ${
                  selectedPlatform === idx
                    ? "border-cyan-500 bg-cyan-500/[0.02] shadow-[0_0_40px_rgba(0,240,255,0.08)]"
                    : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded text-[8px] font-mono uppercase tracking-widest text-white/40">
                      {plat.tag}
                    </span>
                    <Download className={`w-5 h-5 ${selectedPlatform === idx ? "text-cyan-400 animate-pulse" : "text-white/20"}`} />
                  </div>
                  <h3 className="text-lg font-syne font-bold mb-1 text-white">{plat.name}</h3>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{plat.os}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-white/20 uppercase text-[9px]">File Size</span>
                    <span className="text-white/60 font-bold">{plat.size}</span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Mocking secure download trigger for: ${plat.filename}`);
                    }}
                    className={`w-full py-2.5 rounded-xl font-syne font-bold text-xs uppercase tracking-widest transition-all ${
                      selectedPlatform === idx
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                        : "border border-white/10 hover:border-white/20 text-white/60 hover:text-white"
                    }`}
                  >
                    Download Setup
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Verification Enclave Terminal console */}
          <div className="border border-white/5 bg-black/40 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight">Binary Hash Integrity Check</h4>
                  <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">SHA-256 Verification Protocol</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[8px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded uppercase">
                <Shield className="w-3 h-3" /> GPG Checked
              </div>
            </div>

            {/* Checksum display */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                <span>SHA-256 Checksum Signature</span>
                <span className="text-cyan-400">{platforms[selectedPlatform].filename}</span>
              </div>
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-xs text-white/80 break-all flex justify-between items-center gap-4 relative group">
                <span>{platforms[selectedPlatform].checksum}</span>
                <button
                  onClick={() => copyToClipboard(platforms[selectedPlatform].checksum, "hash")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex-shrink-0"
                >
                  {copiedSum === "hash" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Instruction Command display */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                <span>Run Validation Command in OS Terminal</span>
                <span className="text-pink-400">Air-Gapped Check</span>
              </div>
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-xs text-cyan-300 break-all flex justify-between items-center gap-4">
                <span>{platforms[selectedPlatform].command}</span>
                <button
                  onClick={() => copyToClipboard(platforms[selectedPlatform].command, "cmd")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex-shrink-0"
                >
                  {copiedSum === "cmd" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Notice banner */}
            <div className="p-4 border border-blue-500/10 bg-blue-500/[0.01] rounded-2xl flex gap-3 text-left">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-white/50 leading-relaxed font-manrope">
                Why check the hash? Because ShadowAgent is built for extreme privacy, we encourage every operator to check that the downloaded package hash matches our GPG ledger perfectly to confirm zero external tampering prior to installation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
