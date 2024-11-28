import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface FlightTrailProps {
  positions: number[];
}

export function FlightTrail({ positions }: FlightTrailProps) {
  // Convert flat array to Vector3 array
  const points = [];
  for (let i = 0; i < positions.length; i += 3) {
    points.push(new Vector3(
      positions[i],
      positions[i + 1],
      positions[i + 2]
    ));
  }

  return (
    <Line
      points={points}
      color="#88ccff"
      lineWidth={1}
      transparent
      opacity={0.6}
    />
  );
} 