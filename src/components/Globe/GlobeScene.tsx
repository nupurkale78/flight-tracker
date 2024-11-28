import { Suspense, useRef, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader } from 'three';
import { FlightMarkers } from './FlightMarkers';
import * as THREE from 'three';

interface GlobeSceneProps {
  showFlights?: boolean;
  autoRotate?: boolean;
  timeSpeed?: number;
  selectedFlight?: Flight | null;
}

function Earth() {
  const earthRef = useRef();
  const texture = useLoader(TextureLoader, '/2_no_clouds_4k.jpg');

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        map={texture}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
}

// Create a controls component to handle camera reset
function Controls({ autoRotate }: { autoRotate: boolean }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useImperativeHandle(controlsRef, () => ({
    reset: () => {
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
    }
  }));

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1.5}
      maxDistance={8}
      autoRotate={autoRotate}
      autoRotateSpeed={0.1}
      zoomSpeed={0.3}
      rotateSpeed={0.4}
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
}

export const GlobeScene = forwardRef<any, GlobeSceneProps>(
  ({ showFlights = true, autoRotate = true, timeSpeed = 1, selectedFlight = null }, ref) => {
    const controlsRef = useRef();

    useImperativeHandle(ref, () => ({
      resetCamera: () => {
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
      }
    }));

    return (
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#0A1128']} />
          <fogExp2 attach="fog" args={['#0A1128', 0.15]} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Stars 
            radius={300} 
            depth={60} 
            count={1000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />
          <Earth />
          {showFlights && <FlightMarkers timeSpeed={timeSpeed} selectedFlight={selectedFlight} />}
          <Controls ref={controlsRef} autoRotate={autoRotate} />
        </Suspense>
      </Canvas>
    );
  }
);

GlobeScene.displayName = 'GlobeScene';