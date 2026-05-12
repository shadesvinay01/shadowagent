"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const text = "The AI that never leaves your device. Control everything locally. Zero cloud proxies.";

export default function CinematicReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".word");

    // Detect mobile to disable heavy scroll animations
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simple fade-in for mobile without pinning
        gsap.from(words, {
          opacity: 0.1,
          y: 20,
          stagger: 0.05,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      // Words start invisible and fade in one by one based on scroll
      tl.fromTo(
        words,
        { opacity: 0.1, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full section-panel flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div ref={textRef} className="flex flex-wrap justify-center text-center gap-x-4 gap-y-2">
          {text.split(" ").map((word, index) => (
            <span 
              key={index} 
              className="word text-4xl md:text-6xl lg:text-7xl font-syne font-bold tracking-tight text-white"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      
      {/* Subtle spotlight effect using radial gradient (faster than blur) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }}
      />
    </section>
  );
}
