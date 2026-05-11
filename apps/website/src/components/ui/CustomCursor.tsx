"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices for performance
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    const onClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transition: "width 0.2s, height 0.2s" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-white/50 pointer-events-none z-[9998] transition-all duration-150 ${
          clicked ? "scale-150 opacity-0" : "scale-100 opacity-100"
        }`}
      />
    </>
  );
}
