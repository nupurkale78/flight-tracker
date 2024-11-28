import { useEffect, useCallback } from 'react';
import { useFlightStore } from '../../store/flightStore';
import { FlightMarker } from './FlightMarker';
import { convertToCartesian } from '../../utils/coordinates';
import { generateFlights } from '../../utils/fakeFlights';

interface FlightMarkersProps {
  timeSpeed?: number;
  selectedFlight?: Flight | null;
}

export function FlightMarkers({ timeSpeed = 1, selectedFlight = null }: FlightMarkersProps) {
  const { setFlights, flights } = useFlightStore();

  const updateFlights = useCallback(() => {
    const fakeFlights = generateFlights();
    setFlights(fakeFlights);
  }, [setFlights]);

  useEffect(() => {
    updateFlights();
    const interval = setInterval(updateFlights, 60000 / timeSpeed);
    return () => clearInterval(interval);
  }, [updateFlights, timeSpeed]);

  return (
    <group>
      {flights.map((flight) => {
        const position = convertToCartesian(flight.latitude, flight.longitude, 1.01);
        return (
          <FlightMarker
            key={flight.id}
            flight={flight}
            position={position}
            timeSpeed={timeSpeed}
            isSelected={selectedFlight?.id === flight.id}
          />
        );
      })}
    </group>
  );
}