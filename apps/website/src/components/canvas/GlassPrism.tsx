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
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
          {/* Complex mathematically twisted Torus Knot */}
          <torusKnotGeometry args={[1, 0.4, 256, 64, 2, 3]} />
          
          {/* Advanced Physical Glass Material */}
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.1}
            temporalDistortion={0.1}
            ior={1.5}
            color="#ffffff"
            attenuationDistance={1}
            attenuationColor="#ffffff"
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </Float>

      {/* Dynamic Refracting Lights */}
      <pointLight ref={lightRef} intensity={50} color="#00F0FF" /> {/* Electric Cyan */}
      <pointLight ref={lightRef2} intensity={50} color="#A020F0" /> {/* Deep Purple */}
      
      {/* Ambient and directional fill to highlight edges */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#00FF9F" />

      {/* Environment map is critical for glass reflections */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
        </group>
      </Environment>
    </>
  );
}
