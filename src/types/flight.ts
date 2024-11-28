export interface Flight {
  id: string;
  callsign: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  origin: string;
  destination: string;
  direction: number;
}

export interface OpenSkyResponse {
  time: number;
  states: (number | string | null)[][];
}