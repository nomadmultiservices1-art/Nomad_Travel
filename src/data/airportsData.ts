// Full airport dataset processor from ourairports.com
// Dataset: https://github.com/datasets/airport-codes

export interface FullAirport {
  ident: string;
  type: string;
  name: string;
  elevation_ft: string;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: string;
  gps_code: string;
  iata_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
}

// Cache for airports data with expiration
interface AirportsCache {
  data: FullAirport[];
  timestamp: number;
  version: string;
}

const CACHE_KEY = 'nomad_airports_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_VERSION = '1.0';

// This will be populated by parsing the CSV file
let airportsDatabase: FullAirport[] = [];
let isLoading = false;
let loadingPromise: Promise<FullAirport[]> | null = null;

// Essential airports for immediate availability (major international hubs)
const essentialAirports: FullAirport[] = [
  { ident: 'KJFK', type: 'large_airport', name: 'John F Kennedy International Airport', elevation_ft: '13', continent: 'NA', iso_country: 'US', iso_region: 'US-NY', municipality: 'New York', scheduled_service: 'yes', gps_code: 'KJFK', iata_code: 'JFK', local_code: 'JFK', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'KLAX', type: 'large_airport', name: 'Los Angeles International Airport', elevation_ft: '125', continent: 'NA', iso_country: 'US', iso_region: 'US-CA', municipality: 'Los Angeles', scheduled_service: 'yes', gps_code: 'KLAX', iata_code: 'LAX', local_code: 'LAX', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'EGLL', type: 'large_airport', name: 'London Heathrow Airport', elevation_ft: '83', continent: 'EU', iso_country: 'GB', iso_region: 'GB-ENG', municipality: 'London', scheduled_service: 'yes', gps_code: 'EGLL', iata_code: 'LHR', local_code: '', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'LFPG', type: 'large_airport', name: 'Charles de Gaulle International Airport', elevation_ft: '392', continent: 'EU', iso_country: 'FR', iso_region: 'FR-IDF', municipality: 'Paris', scheduled_service: 'yes', gps_code: 'LFPG', iata_code: 'CDG', local_code: '', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'EDDF', type: 'large_airport', name: 'Frankfurt am Main Airport', elevation_ft: '364', continent: 'EU', iso_country: 'DE', iso_region: 'DE-HE', municipality: 'Frankfurt am Main', scheduled_service: 'yes', gps_code: 'EDDF', iata_code: 'FRA', local_code: '', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'RJTT', type: 'large_airport', name: 'Tokyo Haneda International Airport', elevation_ft: '35', continent: 'AS', iso_country: 'JP', iso_region: 'JP-13', municipality: 'Tokyo', scheduled_service: 'yes', gps_code: 'RJTT', iata_code: 'HND', local_code: '', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'VHHH', type: 'large_airport', name: 'Hong Kong International Airport', elevation_ft: '28', continent: 'AS', iso_country: 'HK', iso_region: 'HK-HCW', municipality: 'Hong Kong', scheduled_service: 'yes', gps_code: 'VHHH', iata_code: 'HKG', local_code: '', home_link: '', wikipedia_link: '', keywords: '' },
  { ident: 'OMDB', type: 'large_airport', name: 'Dubai International Airport', elevation_ft: '62', continent: 'AS', iso_country: 'AE', iso_region: 'AE-DU', municipality: 'Dubai', scheduled_service: 'yes', gps_code: 'OMDB', iata_code: 'DXB', local_code: '', home_link: '', wikipedia_link: '', keywords: '' }
];

// Load from cache
const loadFromCache = (): FullAirport[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: AirportsCache = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is valid
    if (parsedCache.version === CACHE_VERSION && 
        (now - parsedCache.timestamp) < CACHE_DURATION &&
        parsedCache.data && parsedCache.data.length > 0) {
      return parsedCache.data;
    }
  } catch (error) {
    console.warn('Failed to load airports from cache:', error);
  }
  return null;
};

// Save to cache
const saveToCache = (data: FullAirport[]): void => {
  try {
    const cacheData: AirportsCache = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to save airports to cache:', error);
  }
};

// Parse CSV data function with chunked processing
export const parseAirportsCSV = (csvText: string): FullAirport[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  
  const airports: FullAirport[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV line with proper quote handling
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Add the last value
    
    if (values.length >= headers.length) {
      const airport: any = {};
      headers.forEach((header, index) => {
        airport[header] = values[index] || '';
      });
      
      // Only include airports with IATA codes or major airports
      if (airport.iata_code || airport.type === 'large_airport' || airport.type === 'medium_airport') {
        airports.push(airport as FullAirport);
      }
    }
  }
  
  return airports;
};

// Load airports data with progressive loading and caching
export const loadAirportsData = async (): Promise<FullAirport[]> => {
  // Return cached data if available
  if (airportsDatabase.length > 0) {
    return airportsDatabase;
  }
  
  // If already loading, return the existing promise
  if (isLoading && loadingPromise) {
    return loadingPromise;
  }
  
  // Try to load from cache first
  const cachedData = loadFromCache();
  if (cachedData && cachedData.length > 0) {
    airportsDatabase = cachedData;
    return airportsDatabase;
  }
  
  // Start loading process
  isLoading = true;
  loadingPromise = loadAirportsWithFallback();
  
  try {
    const result = await loadingPromise;
    return result;
  } finally {
    isLoading = false;
    loadingPromise = null;
  }
};

// Load airports with fallback strategies
const loadAirportsWithFallback = async (): Promise<FullAirport[]> => {
  try {
    // Try to load with timeout for slow connections
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch('/airport-codes.csv', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    airportsDatabase = parseAirportsCSV(csvText);
    
    // Save to cache for future use
    saveToCache(airportsDatabase);
    
    return airportsDatabase;
  } catch (error) {
    console.warn('Failed to load full airports data, using essential airports:', error);
    
    // Fallback to essential airports for immediate functionality
    airportsDatabase = [...essentialAirports];
    
    // Try to load full data in background (fire and forget)
    loadFullDataInBackground();
    
    return airportsDatabase;
  }
};

// Load full data in background without blocking UI
const loadFullDataInBackground = async (): Promise<void> => {
  try {
    // Wait a bit before trying again
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = await fetch('/airport-codes.csv');
    if (response.ok) {
      const csvText = await response.text();
      const fullData = parseAirportsCSV(csvText);
      
      // Update the database and cache
      airportsDatabase = fullData;
      saveToCache(fullData);
      
      console.log('Full airports database loaded in background');
    }
  } catch (error) {
    console.warn('Background loading of airports data failed:', error);
  }
};

// Get immediate airports (essential + any cached)
export const getImmediateAirports = (): FullAirport[] => {
  const cached = loadFromCache();
  if (cached && cached.length > 0) {
    return cached;
  }
  return essentialAirports;
};

// Search airports function
export const searchAirports = (query: string, airports: FullAirport[]): FullAirport[] => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  
  return airports
    .filter(airport => {
      const name = airport.name?.toLowerCase() || '';
      const municipality = airport.municipality?.toLowerCase() || '';
      const country = airport.iso_country?.toLowerCase() || '';
      const iata = airport.iata_code?.toLowerCase() || '';
      const ident = airport.ident?.toLowerCase() || '';
      
      return (
        name.includes(searchTerm) ||
        municipality.includes(searchTerm) ||
        country.includes(searchTerm) ||
        iata.includes(searchTerm) ||
        ident.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      // Prioritize exact IATA code matches
      if (a.iata_code?.toLowerCase() === searchTerm) return -1;
      if (b.iata_code?.toLowerCase() === searchTerm) return 1;
      
      // Then prioritize airports with IATA codes
      if (a.iata_code && !b.iata_code) return -1;
      if (!a.iata_code && b.iata_code) return 1;
      
      // Then by airport type (large > medium > small)
      const typeOrder = { 'large_airport': 0, 'medium_airport': 1, 'small_airport': 2 };
      const aOrder = typeOrder[a.type as keyof typeof typeOrder] ?? 3;
      const bOrder = typeOrder[b.type as keyof typeof typeOrder] ?? 3;
      
      if (aOrder !== bOrder) return aOrder - bOrder;
      
      // Finally by name
      return (a.name || '').localeCompare(b.name || '');
    })
    .slice(0, 50); // Limit results for performance
};

// Format airport display name
export const formatAirportDisplay = (airport: FullAirport): string => {
  const iata = airport.iata_code ? `${airport.iata_code} - ` : '';
  const name = airport.name || 'Unknown Airport';
  const location = airport.municipality ? `, ${airport.municipality}` : '';
  const country = airport.iso_country ? `, ${airport.iso_country}` : '';
  
  return `${iata}${name}${location}${country}`;
};

// Get airport value for form
export const getAirportValue = (airport: FullAirport): string => {
  return airport.iata_code || airport.ident || airport.name || '';
};