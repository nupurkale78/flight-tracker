import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Earth } from './Earth';
import { FlightMarkers } from './FlightMarkers';

export function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
      <Suspense fallback={null}>
        <color attach="background" args={['#000814']} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
        <Earth />
        <FlightMarkers />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
}