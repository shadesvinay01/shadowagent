"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Apple, Terminal, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          ShadowAgent v1.0 is now available
          <ArrowRight className="w-3 h-3 ml-1" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter leading-[1.1] max-w-5xl"
        >
          The AI that never leaves <br className="hidden md:block" />
          <span className="text-gray-500">your device.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Control WhatsApp, Email, Calendar, and Files completely locally. 
          Zero cloud proxies. Zero data collection. Maximum privacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto"
        >
          <button className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3">
            <Download className="w-5 h-5" />
            <span className="font-semibold tracking-wide">Download for Windows</span>
          </button>
          
          <button className="px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-[0.98] border border-white/10 text-gray-300 hover:text-white bg-white/5 backdrop-blur-md">
            <Apple className="w-5 h-5" />
            <span className="font-medium">macOS</span>
          </button>

          <button className="px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-[0.98] border border-white/10 text-gray-300 hover:text-white bg-white/5 backdrop-blur-md">
            <Terminal className="w-5 h-5" />
            <span className="font-medium">Linux</span>
          </button>
        </motion.div>
      </div>
      
      {/* Subtle bottom gradient for blending */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent z-10" />
    </section>
  );
}
