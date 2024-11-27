import axios from 'axios';
import { Flight, OpenSkyResponse } from '../types/flight';
import { findNearestAirport } from '../data/airports';

const AVIATION_STACK_API = 'http://api.aviationstack.com/v1/flights';
const API_KEY = 'demo';
const FALLBACK_API = 'https://opensky-network.org/api/states/all';
const SKY_SCANNER_API_URL = 'https://skyscanner3.p.rapidapi.com/v1/flights';
const RAPIDAPI_KEY = '4c84b56427mshc43c4d079f84f29p1d067ejsn845e88eacb4e';

const mapAviationStackFlight = (flight: any, index: number): Flight => {
  console.log('AviationStack Flight Data:', flight);
  return {
    id: `${flight.flight.iata || ''}-${index}`,
    callsign: flight.flight.iata || flight.flight.icao || 'Unknown',
    latitude: flight.live?.latitude || 0,
    longitude: flight.live?.longitude || 0,
    altitude: flight.live?.altitude || 30000,
    velocity: flight.live?.speed_horizontal || 500,
    origin: flight.departure?.airport || 'Unknown',
    destination: flight.arrival?.airport || 'Unknown',
  };
};

const mapOpenSkyFlight = (state: (number | string | null)[], index: number): Flight => {
  console.log('OpenSky Flight State:', state);
  const latitude = state[6] as number;
  const longitude = state[5] as number;
  const nearestAirport = findNearestAirport(latitude, longitude);

  let origin = 'Unknown';
  let destination = 'Unknown';

  const heading = state[10] as number;

  if (nearestAirport) {
    const bearingToAirport = getBearing(latitude, longitude, nearestAirport.lat, nearestAirport.lon);
    const headingDiff = ((heading - bearingToAirport + 540) % 360) - 180;

    if (Math.abs(headingDiff) < 45) {
      destination = `${nearestAirport.city} (${nearestAirport.code})`;
    } else if (Math.abs(headingDiff) > 135) {
      origin = `${nearestAirport.city} (${nearestAirport.code})`;
    }
  }

  return {
    id: `${state[0] || ''}-${index}`,
    callsign: (state[1] as string || '').trim(),
    latitude,
    longitude,
    altitude: state[7] as number,
    velocity: state[9] as number || 0,
    origin,
    destination,
  };
};

function getBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

const fetchSkyScannerData = async (origin: string, destination: string, date: string): Promise<any> => {
  try {
    const response = await axios.get(SKY_SCANNER_API_URL, {
      params: {
        origin,
        destination,
        date,
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'skyscanner3.p.rapidapi.com',
      },
    });
    console.log('Sky Scanner Flight Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data from Sky Scanner:', error);
    return null;
  }
};

const fetchAviationStackData = async (): Promise<Flight[]> => {
  const response = await axios.get(AVIATION_STACK_API, {
    params: {
      access_key: API_KEY,
      limit: 100,
    },
  });
  return response.data.data.map(mapAviationStackFlight);
};

const fetchOpenSkyData = async (): Promise<Flight[]> => {
  const response = await axios.get<OpenSkyResponse>(FALLBACK_API);
  return response.data.states
    .filter((state): state is (number | string | null)[] =>
      state !== null &&
      state[5] !== null &&
      state[6] !== null &&
      state[7] !== null &&
      state[10] !== null // Heading must be available
    )
    .map(mapOpenSkyFlight);
};

export const fetchFlights = async (origin: string, destination: string, date: string): Promise<{ data: Flight[] }> => {
  try {
    // First try Sky Scanner API
    const skyScannerData = await fetchSkyScannerData(origin, destination, date);
    if (skyScannerData) {
      return { data: skyScannerData };
    }

    // Then try AviationStack API
    const aviationStackData = await fetchAviationStackData().catch(() => null);
    if (aviationStackData) {
      return { data: aviationStackData };
    }

    // Fallback to OpenSky if both previous APIs fail
    const openSkyData = await fetchOpenSkyData();
    return { data: openSkyData };
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return { data: [] };
  }
};