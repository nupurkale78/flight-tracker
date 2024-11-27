import { useEffect, useCallback } from 'react';
import { useFlightStore } from '../../store/flightStore';
import { fetchFlights } from '../../services/flightApi';
import { FlightMarker } from './FlightMarker';
import { convertToCartesian } from '../../utils/coordinates';

export function FlightMarkers() {
  const { flights, setFlights, setLoading, setError } = useFlightStore();

  const updateFlights = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFlights();
      if (response.data.length === 0) {
        setError('No flight data available');
      }
      setFlights(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch flights');
    } finally {
      setLoading(false);
    }
  }, [setFlights, setLoading, setError]);

  useEffect(() => {
    updateFlights();
    const interval = setInterval(updateFlights, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [updateFlights]);

  return (
    <group>
      {flights.map((flight) => {
        const position = convertToCartesian(flight.latitude, flight.longitude, 1.01);
        return (
          <FlightMarker
            key={flight.id}
            flight={flight}
            position={position}
          />
        );
      })}
    </group>
  );
}