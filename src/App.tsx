import React from 'react';
import { GlobeScene } from './components/Globe/GlobeScene';
import { Plane } from 'lucide-react';
import { useFlightStore } from './store/flightStore';

function App() {
  const { loading, error, flights } = useFlightStore();

  return (
    <div className="w-full h-screen bg-black relative">
      <div className="absolute top-4 left-4 z-10 bg-black/50 p-4 rounded-lg text-white">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6" />
          <h1 className="text-xl font-bold">Global Flight Tracker</h1>
        </div>
        <p className="mt-2">
          {loading ? 'Loading flights...' : `Tracking ${flights.length} flights`}
        </p>
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </div>
      <GlobeScene />
    </div>
  );
}

export default App;