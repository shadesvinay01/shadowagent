"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function NeuralGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Create a highly detailed plane
  const geometry = useMemo(() => new THREE.PlaneGeometry(viewport.width * 2, viewport.height * 2, 100, 100), [viewport]);

  // Initial vertex positions for restoring state
  const initialPositions = useMemo(() => {
    const pos = geometry.attributes.position.array as Float32Array;
    return new Float32Array(pos);
  }, [geometry]);

  // Use raw uniform injection for a cool grid material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    // Get mouse position in world space
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    for (let i = 0; i < positions.length; i += 3) {
      const x = initialPositions[i];
      const y = initialPositions[i + 1];
      
      // Base slow noise movement
      let z = Math.sin(x * 0.5 + time * 0.5) * Math.cos(y * 0.5 + time * 0.3) * 0.5;
      
      // Mouse reaction displacement
      const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
      const influence = Math.max(0, 3 - dist); // 3 units radius of influence
      
      if (influence > 0) {
        // Create a wave ripple around the mouse
        z += Math.sin(dist * 5 - time * 10) * influence * 0.5;
      }
      
      positions[i + 2] = z;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation to give a 3D perspective
    meshRef.current.rotation.x = -Math.PI / 3 + Math.sin(time * 0.1) * 0.1;
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <group position={[0, -2, -5]}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#ffffff" distance={10} />
    </group>
  );
}
