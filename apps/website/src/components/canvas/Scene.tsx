"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Float, PerspectiveCamera, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 -z-10 bg-[#05050A]">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A020F0" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {children}

          <Environment preset="city" />
          
          <EffectComposer>
            <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
