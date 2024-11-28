import React, { useState, useRef } from 'react';
import { GlobeScene } from './components/Globe/GlobeScene';
import { ControlPanel } from './components/Controls/ControlPanel';
import { FlightSearch } from './components/Search/FlightSearch';
import { FlightStats } from './components/Stats/FlightStats';
import { Plane } from 'lucide-react';
import { useFlightStore } from './store/flightStore';
import { TimeControl } from './components/Controls/TimeControl';

function App() {
  const { loading, error, flights } = useFlightStore();
  const [showFlights, setShowFlights] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const globeRef = useRef();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [timeSpeed, setTimeSpeed] = useState(1);

  const handleResetCamera = () => {
    if (globeRef.current) {
      globeRef.current.resetCamera();
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
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

      <FlightSearch />
      
      <ControlPanel
        onToggleFlights={() => setShowFlights(!showFlights)}
        onToggleRotation={() => setIsRotating(!isRotating)}
        onResetCamera={handleResetCamera}
        isRotating={isRotating}
        showFlights={showFlights}
      />

      <FlightStats />

      <TimeControl onSpeedChange={setTimeSpeed} />

      <GlobeScene 
        ref={globeRef}
        showFlights={showFlights} 
        autoRotate={isRotating}
        selectedFlight={selectedFlight}
        timeSpeed={timeSpeed}
      />
    </div>
  );
}

export default App;