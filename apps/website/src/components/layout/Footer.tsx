"use client";

import LogoMark from "@/components/ui/LogoMark";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 section-panel">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark size={34} className="group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-xl font-syne font-bold tracking-tight">SHADOWAGENT</span>
          </Link>
          <p className="text-white/40 text-sm font-manrope max-w-xs leading-relaxed">
            The only AI agent that values your privacy as much as you do. 100% local. 100% yours.
          </p>
          <a 
            href="mailto:hello@theshadowagent.com" 
            className="text-xs font-mono text-cyan-400/80 hover:text-cyan-400 hover:underline transition-all mt-2 block"
          >
            hello@theshadowagent.com
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 md:gap-20">
          <div>
            <h5 className="text-white font-syne font-bold mb-4 text-sm tracking-wide uppercase">Product</h5>
            <ul className="text-white/40 text-sm font-manrope space-y-3">
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/docs#security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-syne font-bold mb-4 text-sm tracking-wide uppercase">Company</h5>
            <ul className="text-white/40 text-sm font-manrope space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/docs#licensing" className="hover:text-white transition-colors">License</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-manrope uppercase tracking-widest">
        <p>© 2026 ShadowAgent. All rights reserved locally.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
