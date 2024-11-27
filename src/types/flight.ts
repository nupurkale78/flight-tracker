export interface Flight {
  id: string;
  latitude: number;
  longitude: number;
  altitude: number;
  callsign: string;
  origin?: string;
  destination?: string;
  velocity?: number;
}

export interface OpenSkyResponse {
  time: number;
  states: (number | string | null)[][];
}