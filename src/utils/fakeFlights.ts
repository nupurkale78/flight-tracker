import { Flight } from '../types/flight';

// Define major Asian airports with realistic coordinates
const asianAirports = {
  "DEL": { name: "Delhi International", city: "Delhi", country: "India", lat: 28.5562, lon: 77.1000 },
  "BOM": { name: "Mumbai International", city: "Mumbai", country: "India", lat: 19.0896, lon: 72.8656 },
  "MAA": { name: "Chennai International", city: "Chennai", country: "India", lat: 12.9941, lon: 80.1709 },
  "CCU": { name: "Kolkata International", city: "Kolkata", country: "India", lat: 22.6520, lon: 88.4463 },
  "BLR": { name: "Bangalore International", city: "Bangalore", country: "India", lat: 13.1986, lon: 77.7066 },
  "SIN": { name: "Singapore Changi", city: "Singapore", country: "Singapore", lat: 1.3644, lon: 103.9915 },
  "BKK": { name: "Bangkok Suvarnabhumi", city: "Bangkok", country: "Thailand", lat: 13.6900, lon: 100.7501 },
  "HKG": { name: "Hong Kong International", city: "Hong Kong", country: "China", lat: 22.3080, lon: 113.9185 },
  "PEK": { name: "Beijing Capital", city: "Beijing", country: "China", lat: 40.0799, lon: 116.6031 },
  "ICN": { name: "Seoul Incheon", city: "Seoul", country: "South Korea", lat: 37.4602, lon: 126.4407 },
  "NRT": { name: "Tokyo Narita", city: "Tokyo", country: "Japan", lat: 35.7720, lon: 140.3929 },
  "DXB": { name: "Dubai International", city: "Dubai", country: "UAE", lat: 25.2532, lon: 55.3657 },
};

// Define common flight routes
const commonRoutes = [
  ["DEL", "BOM"], // Delhi-Mumbai
  ["DEL", "DXB"], // Delhi-Dubai
  ["BOM", "DXB"], // Mumbai-Dubai
  ["DEL", "SIN"], // Delhi-Singapore
  ["BOM", "SIN"], // Mumbai-Singapore
  ["BLR", "SIN"], // Bangalore-Singapore
  ["MAA", "SIN"], // Chennai-Singapore
  ["SIN", "HKG"], // Singapore-Hong Kong
  ["BKK", "HKG"], // Bangkok-Hong Kong
  ["HKG", "PEK"], // Hong Kong-Beijing
  ["PEK", "ICN"], // Beijing-Seoul
  ["ICN", "NRT"], // Seoul-Tokyo
  ["HKG", "NRT"], // Hong Kong-Tokyo
  ["SIN", "BKK"], // Singapore-Bangkok
  ["BKK", "DEL"], // Bangkok-Delhi
  ["DEL", "CCU"], ["BOM", "MAA"], ["BLR", "DEL"],
  ["MAA", "CCU"], ["BLR", "BOM"], ["CCU", "BKK"],
  ["DXB", "BKK"], ["SIN", "NRT"], ["PEK", "DXB"],
  ["ICN", "HKG"], ["NRT", "SIN"], ["BKK", "PEK"],
  ["CCU", "SIN"], ["MAA", "DXB"], ["BLR", "DXB"],
];

function generateRandomFlight(): Flight {
  // Pick a random route
  const route = commonRoutes[Math.floor(Math.random() * commonRoutes.length)];
  const origin = asianAirports[route[0]];
  const destination = asianAirports[route[1]];
  
  // Generate a position between origin and destination
  const progress = Math.random();
  const lat = origin.lat + (destination.lat - origin.lat) * progress;
  const lon = origin.lon + (destination.lon - origin.lon) * progress;

  // Calculate flight direction based on longitude difference
  const direction = destination.lon > origin.lon ? 1 : -1;

  // Generate airline code based on route
  const airlines = {
    'DEL': 'AI', // Air India
    'BOM': 'AI',
    'SIN': 'SQ', // Singapore Airlines
    'BKK': 'TG', // Thai Airways
    'HKG': 'CX', // Cathay Pacific
    'PEK': 'CA', // Air China
    'ICN': 'KE', // Korean Air
    'NRT': 'JL', // Japan Airlines
    'DXB': 'EK', // Emirates
  };

  const airline = airlines[route[0]] || 'AI';
  const flightNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return {
    id: Math.random().toString(36).substr(2, 9),
    callsign: `${airline}${flightNumber}`,
    latitude: lat,
    longitude: lon,
    altitude: 30000 + Math.random() * 10000,
    velocity: 400 + Math.random() * 100,
    origin: `${origin.city} (${route[0]})`,
    destination: `${destination.city} (${route[1]})`,
    direction: direction
  };
}

export function generateFlights(): Flight[] {
  const flights: Flight[] = [];
  // Generate exactly 100 flights
  for (let i = 0; i < 100; i++) {
    flights.push(generateRandomFlight());
  }
  return flights;
} 