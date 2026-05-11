"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

export default function GlassPrism() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
    }
    
    // Dynamic orbiting lights to create shifting refractions
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.5) * 5;
      lightRef.current.position.y = Math.cos(t * 0.3) * 5;
      lightRef.current.position.z = Math.sin(t * 0.2) * 2 - 2;
    }
    if (lightRef2.current) {
      lightRef2.current.position.x = Math.cos(t * 0.4) * 6;
      lightRef2.current.position.y = Math.sin(t * 0.6) * 4;
      lightRef2.current.position.z = Math.cos(t * 0.3) * 3 - 2;
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
          {/* Reduced segments for extreme performance */}
          <torusKnotGeometry args={[1, 0.4, 64, 16, 2, 3]} />
          
          {/* Optimized Physical Glass Material */}
          <MeshTransmissionMaterial 
            backside={false} 
            samples={1} // Lowest possible samples
            resolution={512} // Cap resolution of the transmission map
            thickness={1}
            chromaticAberration={0.02}
            anisotropy={0}
            distortion={0}
            distortionScale={0}
            temporalDistortion={0}
            ior={1.1}
            color="#ffffff"
            attenuationDistance={1}
            attenuationColor="#ffffff"
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
      </Float>

      {/* Dynamic Refracting Lights - Reduced intensity for performance */}
      <pointLight ref={lightRef} intensity={20} color="#00F0FF" />
      <pointLight ref={lightRef2} intensity={20} color="#A020F0" />
      
      <ambientLight intensity={0.5} />
      
      {/* Optimized Environment */}
      <Environment resolution={128}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
        </group>
      </Environment>
    </>
  );
}
