"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function PulsingOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.x = time * 0.2;
      orbRef.current.rotation.y = time * 0.3;
      orbRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={orbRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f0ff"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Outer Shell */}
      <Sphere args={[1.2, 32, 32]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          roughness={0.1}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.1}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color="#a855f7"
        />
      </Sphere>
    </Float>
  );
}

export default function NeuralCore() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" />
        <PulsingOrb />
      </Canvas>
    </div>
  );
}
