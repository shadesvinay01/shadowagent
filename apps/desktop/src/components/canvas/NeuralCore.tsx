"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function LiquidMetalCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={1.5}
          roughness={0.05}
          transmission={1}
          ior={1.1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color="#ffffff"
          emissive="#000000"
        />
      </Sphere>
      
      <Sphere args={[0.9, 64, 64]}>
        <MeshDistortMaterial
          color="#1a1a1a"
          speed={2}
          distort={0.2}
          radius={1}
          metalness={1}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function NeuralCore() {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-5, 5, -5]} color="#ffffff" intensity={1} />
        <LiquidMetalCore />
      </Canvas>
    </div>
  );
}
