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

// This will be populated by parsing the CSV file
let airportsDatabase: FullAirport[] = [];

// Parse CSV data function
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

// Load airports data
export const loadAirportsData = async (): Promise<FullAirport[]> => {
  if (airportsDatabase.length > 0) {
    return airportsDatabase;
  }
  
  try {
    const response = await fetch('/src/data/airport-codes.csv');
    const csvText = await response.text();
    airportsDatabase = parseAirportsCSV(csvText);
    return airportsDatabase;
  } catch (error) {
    console.error('Failed to load airports data:', error);
    return [];
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