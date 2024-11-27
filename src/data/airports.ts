// Top 100 busiest airports worldwide
export const airports = {
  "KJFK": { name: "John F. Kennedy International", city: "New York", country: "USA", lat: 40.6413, lon: -73.7781 },
  "EGLL": { name: "London Heathrow", city: "London", country: "UK", lat: 51.4700, lon: -0.4543 },
  "ZBAA": { name: "Beijing Capital International", city: "Beijing", country: "China", lat: 40.0799, lon: 116.6031 },
  "VABB": { name: "Chhatrapati Shivaji International", city: "Mumbai", country: "India", lat: 19.0896, lon: 72.8656 },
  "VIDP": { name: "Indira Gandhi International", city: "Delhi", country: "India", lat: 28.5562, lon: 77.1000 },
  // Add more airports as needed
} as const;

export function findNearestAirport(lat: number, lon: number) {
  let nearest = null;
  let minDistance = Infinity;

  for (const [code, airport] of Object.entries(airports)) {
    const distance = getDistance(lat, lon, airport.lat, airport.lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = { code, ...airport };
    }
  }

  return minDistance < 300 ? nearest : null; // Only return if within 300km
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number) {
  return deg * (Math.PI / 180);
}