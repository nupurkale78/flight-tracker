import { create } from 'zustand';
import { Flight } from '../types/flight';

interface FlightState {
  flights: Flight[];
  setFlights: (flights: Flight[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  setFlights: (flights) => set({ flights }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));