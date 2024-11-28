import { useFlightStore } from '../../store/flightStore';

export function FlightStats() {
  const flights = useFlightStore((state) => state.flights);

  const stats = {
    total: flights.length,
    byAirline: flights.reduce((acc, flight) => {
      const airline = flight.callsign.slice(0, 2);
      acc[airline] = (acc[airline] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    averageAltitude: Math.round(
      flights.reduce((sum, flight) => sum + flight.altitude, 0) / flights.length
    ),
  };

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-2">Flight Statistics</h3>
        <div className="space-y-2 text-sm">
          <div>Total Flights: {stats.total}</div>
          <div>Average Altitude: {Math.round(stats.averageAltitude / 1000)}k ft</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats.byAirline).map(([airline, count]) => (
              <div key={airline} className="flex justify-between">
                <span className="text-gray-400">{airline}:</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 