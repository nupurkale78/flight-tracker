import { useState } from 'react';
import { Html } from '@react-three/drei';
import { Flight } from '../../types/flight';
import { Plane } from 'lucide-react';

interface FlightMarkerProps {
  flight: Flight;
  position: [number, number, number];
}

export function FlightMarker({ flight, position }: FlightMarkerProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.005, 16, 16]} />
        <meshBasicMaterial color="#4ADE80" />
      </mesh>
      {hovered && (
        <Html>
          <div className="bg-black/80 text-white p-3 rounded-lg text-sm min-w-[240px] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 border-b border-white/20 pb-2">
              <Plane className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-400">{flight.callsign}</span>
            </div>
            <div className="space-y-1">
              {flight.origin && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">From:</span>
                  <span>{flight.origin}</span>
                </p>
              )}
              {flight.destination && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">To:</span>
                  <span>{flight.destination}</span>
                </p>
              )}
              <p className="flex items-center gap-2">
                <span className="text-gray-400">Altitude:</span>
                <span>{Math.round(flight.altitude).toLocaleString()} ft</span>
              </p>
              {flight.velocity && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">Speed:</span>
                  <span>{Math.round(flight.velocity * 2.237).toLocaleString()} mph</span>
                </p>
              )}
              <div className="text-xs text-gray-400 mt-2">
                <p>Lat: {flight.latitude.toFixed(4)}°</p>
                <p>Lon: {flight.longitude.toFixed(4)}°</p>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}