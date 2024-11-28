import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { convertToCartesian } from '../../utils/coordinates';
import * as THREE from 'three';
import { Flight } from '../../types/flight';

interface FlightPathProps {
  flight: Flight;
}

export function FlightPath({ flight }: FlightPathProps) {
  const points = useMemo(() => {
    // Extract coordinates from origin and destination
    const originMatch = flight.origin.match(/\(([^)]+)\)/);
    const destMatch = flight.destination.match(/\(([^)]+)\)/);
    
    if (!originMatch || !destMatch) return [];

    const originCode = originMatch[1];
    const destCode = destMatch[1];
    
    // Get coordinates from airports data
    const airports = {
      "DEL": { lat: 28.5562, lon: 77.1000 },
      "BOM": { lat: 19.0896, lon: 72.8656 },
      // ... add other airports
    };

    const origin = airports[originCode];
    const dest = airports[destCode];

    if (!origin || !dest) return [];

    // Create arc between points
    const points: THREE.Vector3[] = [];
    const segments = 50;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const lat = origin.lat + (dest.lat - origin.lat) * t;
      const lon = origin.lon + (dest.lon - origin.lon) * t;
      
      // Add altitude to middle of path
      const altitude = 1.02 + Math.sin(Math.PI * t) * 0.02;
      const pos = convertToCartesian(lat, lon, altitude);
      points.push(new THREE.Vector3(...pos));
    }

    return points;
  }, [flight]);

  return (
    <Line
      points={points}
      color="#4080ff"
      lineWidth={1}
      dashed={true}
      dashScale={50}
      dashSize={0.5}
      dashOffset={0}
      opacity={0.5}
      transparent
    />
  );
} 