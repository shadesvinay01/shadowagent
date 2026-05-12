"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !bgRef.current) return;

    // Detect mobile to disable heavy scroll animations
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simplified mobile entrance animation without scroll pinning
        gsap.from(textRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out"
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Background fades and scales slightly
      tl.to(bgRef.current, {
        opacity: 0.05,
        scale: 1.05,
        ease: "none",
      }, 0);

      // Text scales massively and fades
      tl.to(textRef.current, {
        scale: 0.2,
        opacity: 0,
        y: -100,
        ease: "power2.inOut",
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Deep Atmospheric Background - Optimized for mobile */}
      <div 
        ref={bgRef}
        className={`absolute inset-0 z-0 ${
          isMobile 
            ? "bg-gradient-to-b from-[#050508] via-[#0a0a15] to-[#050508]" 
            : "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen"
        } opacity-10`}
      />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* Massive Cinematic Text */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center gap-4">
        <h1 
          className="text-[18vw] md:text-[15vw] font-syne font-extrabold tracking-tighter text-white leading-none text-center px-4"
          style={{ textShadow: "0 20px 80px rgba(0,0,0,0.8)" }}
        >
          SHADOWAGENT
        </h1>
        <p className="text-sm md:text-xl font-manrope font-light text-white/40 tracking-[0.4em] uppercase">
          The Local AI Operating System.
        </p>
      </div>
      
      {/* Scroll indicator that fades out immediately */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 animate-pulse">
        <span className="text-[10px] tracking-widest uppercase">Scroll to unlock</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
