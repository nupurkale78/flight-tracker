import { useState } from 'react';
import { Settings, Eye, EyeOff, RotateCcw, Pause, Play } from 'lucide-react';

interface ControlPanelProps {
  onToggleFlights: () => void;
  onToggleRotation: () => void;
  onResetCamera: () => void;
  isRotating: boolean;
  showFlights: boolean;
}

export function ControlPanel({
  onToggleFlights,
  onToggleRotation,
  onResetCamera,
  isRotating,
  showFlights
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500/80 p-2 rounded-full hover:bg-blue-600/80 transition-colors"
        >
          <Settings className="w-6 h-6 text-white" />
        </button>

        {isOpen && (
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 space-y-2 animate-fade-in">
            <button
              onClick={onToggleFlights}
              className="flex items-center gap-2 text-white/80 hover:text-white w-full p-2 rounded hover:bg-white/10"
            >
              {showFlights ? <Eye /> : <EyeOff />}
              <span>{showFlights ? 'Hide' : 'Show'} Flights</span>
            </button>

            <button
              onClick={onToggleRotation}
              className="flex items-center gap-2 text-white/80 hover:text-white w-full p-2 rounded hover:bg-white/10"
            >
              {isRotating ? <Pause /> : <Play />}
              <span>{isRotating ? 'Stop' : 'Start'} Rotation</span>
            </button>

            <button
              onClick={onResetCamera}
              className="flex items-center gap-2 text-white/80 hover:text-white w-full p-2 rounded hover:bg-white/10"
            >
              <RotateCcw />
              <span>Reset View</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 