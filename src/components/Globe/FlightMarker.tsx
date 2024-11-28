import { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Billboard, Html } from '@react-three/drei';
import { Flight } from '../../types/flight';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlightMarkerProps {
  flight: Flight;
  position: [number, number, number];
  timeSpeed?: number;
  isSelected?: boolean;
}

export function FlightMarker({ flight, position, timeSpeed = 1, isSelected = false }: FlightMarkerProps) {
  const texture = useLoader(TextureLoader, '/icons8-airplane-30.png');
  const markerRef = useRef<THREE.Group>(null);
  const speed = useRef(0.005 + Math.random() * 0.005);
  const radius = 1.01;
  const initialTime = useRef(Math.random() * 1000);
  const [showDetails, setShowDetails] = useState(false);

  useFrame((state) => {
    if (markerRef.current) {
      const direction = flight.direction || 1;
      const time = state.clock.elapsedTime * timeSpeed + initialTime.current;
      const startLon = flight.longitude;
      const lonOffset = speed.current * time * direction * 50;
      const currentLon = startLon + lonOffset;

      const lat = flight.latitude * (Math.PI / 180);
      const lon = (currentLon * (Math.PI / 180)) % (2 * Math.PI);

      const x = radius * Math.cos(lat) * Math.cos(lon);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lon);

      markerRef.current.position.set(x, y, z);
      markerRef.current.lookAt(0, 0, 0);
      markerRef.current.rotateY(Math.PI);
    }
  });

  return (
    <group 
      ref={markerRef} 
      position={position}
      onClick={() => setShowDetails(!showDetails)}
    >
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh>
          <planeGeometry args={[0.04, 0.04]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.9}
            depthWrite={false}
            color="#FFD700"
          />
        </mesh>
      </Billboard>

      {showDetails && (
        <Html position={[0, 0.1, 0]} center>
          <div className="bg-black/90 backdrop-blur-md rounded-lg border border-white/20 shadow-xl p-3 w-48">
            <div className="flex justify-between items-start mb-2">
              <span className="text-blue-400 font-bold text-sm">
                {flight.callsign}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(false);
                }}
                className="text-white/60 hover:text-white text-sm"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">From:</span>
                <span className="text-white">{flight.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To:</span>
                <span className="text-white">{flight.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Alt:</span>
                <span className="text-white">
                  {Math.round(flight.altitude / 1000)}k ft
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Speed:</span>
                <span className="text-white">
                  {Math.round(flight.velocity)} kts
                </span>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}