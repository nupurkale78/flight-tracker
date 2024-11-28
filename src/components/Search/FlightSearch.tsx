import { useState } from 'react';
import { Search } from 'lucide-react';
import { useFlightStore } from '../../store/flightStore';

export function FlightSearch() {
  const [search, setSearch] = useState('');
  const flights = useFlightStore((state) => state.flights);

  const filteredFlights = flights.filter(flight => 
    flight.callsign.toLowerCase().includes(search.toLowerCase()) ||
    flight.origin.toLowerCase().includes(search.toLowerCase()) ||
    flight.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-2">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search flights, airports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-64"
          />
        </div>
        
        {search && filteredFlights.length > 0 && (
          <div className="absolute mt-2 w-full bg-black/90 backdrop-blur-md rounded-lg max-h-60 overflow-y-auto">
            {filteredFlights.map(flight => (
              <div 
                key={flight.id}
                className="p-2 hover:bg-white/10 cursor-pointer text-white"
                onClick={() => {
                  // TODO: Implement flight focus
                }}
              >
                <div className="font-bold text-blue-400">{flight.callsign}</div>
                <div className="text-sm text-gray-400">
                  {flight.origin} → {flight.destination}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 