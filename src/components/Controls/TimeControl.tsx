import { useState } from 'react';
import { FastForward, Rewind } from 'lucide-react';

interface TimeControlProps {
  onSpeedChange: (speed: number) => void;
}

export function TimeControl({ onSpeedChange }: TimeControlProps) {
  const [speed, setSpeed] = useState(1);
  const speeds = [0.5, 1, 2, 5];

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-2 flex items-center gap-2">
        <Rewind className="w-4 h-4 text-gray-400" />
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className={`px-2 py-1 rounded ${
              speed === s 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {s}x
          </button>
        ))}
        <FastForward className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
} 