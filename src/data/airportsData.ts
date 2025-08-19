// Full airport dataset processor from ourairports.com
// Dataset: https://github.com/datasets/airport-codes
// Now fetching from Supabase Storage

import JSZip from 'jszip';

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

// Load complete airports data with caching
export const loadAirportsData = async (): Promise<FullAirport[]> => {
  // Return cached data if available and not loading
  if (!isLoading && airportsDatabase.length > 0) {
    return airportsDatabase;
  }

  // If already loading, wait for the existing promise
  if (isLoading && loadingPromise) {
    return loadingPromise;
  }

  // Start loading
  isLoading = true;
  loadingPromise = loadCompleteAirportsData();

  try {
    const airports = await loadingPromise;
    return airports;
  } finally {
    isLoading = false;
    loadingPromise = null;
  }
};

// Supabase Storage URL for the zip file
const SUPABASE_ZIP_URL = 'https://suumltnbcytuleobutca.supabase.co/storage/v1/object/public/Elements/airport-codes.zip';

// Load complete airports data from Supabase zip file
const loadCompleteAirportsData = async (): Promise<FullAirport[]> => {
  try {
    // Try to load from cache first
    const cachedData = loadFromCache();
    if (cachedData && cachedData.length > 0) {
      airportsDatabase = cachedData;
      return airportsDatabase;
    }

    // Fetch the zip file from Supabase
    const response = await fetch(SUPABASE_ZIP_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch airport data: ${response.status}`);
    }

    // Get the zip file as array buffer
    const zipBuffer = await response.arrayBuffer();
    
    // Extract the zip file
    const zip = new JSZip();
    const zipContents = await zip.loadAsync(zipBuffer);
    
    // Find the CSV file in the zip (assuming it's named airport-codes.csv)
    const csvFile = zipContents.file('airport-codes.csv');
    if (!csvFile) {
      throw new Error('CSV file not found in zip archive');
    }
    
    // Get the CSV content as text
    const csvText = await csvFile.async('text');
    
    // Parse the CSV
    const airports = parseAirportsCSV(csvText);
    
    airportsDatabase = airports;
    saveToCache(airports);
    return airports;
  } catch (error) {
    console.error('Failed to load airport data from Supabase:', error);
    throw error; // Re-throw to handle in calling code
  }
};

// Load full data in background without blocking UI
const loadFullDataInBackground = async (): Promise<void> => {
  try {
    // Wait a bit before trying again
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = await fetch(SUPABASE_ZIP_URL);
    if (response.ok) {
      const zipBuffer = await response.arrayBuffer();
      const zip = new JSZip();
      const zipContents = await zip.loadAsync(zipBuffer);
      const csvFile = zipContents.file('airport-codes.csv');
      
      if (csvFile) {
        const csvText = await csvFile.async('text');
        const fullData = parseAirportsCSV(csvText);
        
        // Update the database and cache
        airportsDatabase = fullData;
        saveToCache(fullData);
        
        console.log('Full airports database loaded in background from Supabase');
      }
    }
  } catch (error) {
    console.warn('Background loading of airports data from Supabase failed:', error);
  }
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