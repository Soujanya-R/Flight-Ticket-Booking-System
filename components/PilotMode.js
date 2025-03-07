"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import { Suspense } from "react";

export default function PilotMode() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Plane rotation={[-Math.PI / 2, 0, 0]} args={[100, 100]} />
          {/* Placeholder for the airplane model */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[1, 0.5, 2]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
