// Airport data from ourairports.com dataset
// This is a curated list of major international airports
// Full dataset: https://github.com/datasets/airport-codes

export interface Airport {
  iata_code: string;
  name: string;
  municipality: string;
  country: string;
  continent: string;
}

export const airports: Airport[] = [
  // Africa
  { iata_code: "ADD", name: "Addis Ababa Bole International Airport", municipality: "Addis Ababa", country: "Ethiopia", continent: "AF" },
  { iata_code: "MGQ", name: "Aden Adde International Airport", municipality: "Mogadishu", country: "Somalia", continent: "AF" },
  { iata_code: "HGA", name: "Hargeisa Airport", municipality: "Hargeisa", country: "Somalia", continent: "AF" },
  { iata_code: "GGR", name: "Garowe Airport", municipality: "Garowe", country: "Somalia", continent: "AF" },
  { iata_code: "CAI", name: "Cairo International Airport", municipality: "Cairo", country: "Egypt", continent: "AF" },
  { iata_code: "LOS", name: "Murtala Muhammed International Airport", municipality: "Lagos", country: "Nigeria", continent: "AF" },
  { iata_code: "JNB", name: "O.R. Tambo International Airport", municipality: "Johannesburg", country: "South Africa", continent: "AF" },
  { iata_code: "CPT", name: "Cape Town International Airport", municipality: "Cape Town", country: "South Africa", continent: "AF" },
  { iata_code: "CMN", name: "Mohammed V International Airport", municipality: "Casablanca", country: "Morocco", continent: "AF" },
  { iata_code: "TUN", name: "Tunis Carthage International Airport", municipality: "Tunis", country: "Tunisia", continent: "AF" },
  { iata_code: "ALG", name: "Houari Boumediene Airport", municipality: "Algiers", country: "Algeria", continent: "AF" },
  { iata_code: "ACC", name: "Kotoka International Airport", municipality: "Accra", country: "Ghana", continent: "AF" },
  { iata_code: "DAR", name: "Julius Nyerere International Airport", municipality: "Dar es Salaam", country: "Tanzania", continent: "AF" },
  { iata_code: "NBO", name: "Jomo Kenyatta International Airport", municipality: "Nairobi", country: "Kenya", continent: "AF" },
  { iata_code: "EBB", name: "Entebbe International Airport", municipality: "Entebbe", country: "Uganda", continent: "AF" },
  { iata_code: "KGL", name: "Kigali International Airport", municipality: "Kigali", country: "Rwanda", continent: "AF" },
  
  // Middle East
  { iata_code: "DXB", name: "Dubai International Airport", municipality: "Dubai", country: "United Arab Emirates", continent: "AS" },
  { iata_code: "AUH", name: "Abu Dhabi International Airport", municipality: "Abu Dhabi", country: "United Arab Emirates", continent: "AS" },
  { iata_code: "DOH", name: "Hamad International Airport", municipality: "Doha", country: "Qatar", continent: "AS" },
  { iata_code: "KWI", name: "Kuwait International Airport", municipality: "Kuwait City", country: "Kuwait", continent: "AS" },
  { iata_code: "RUH", name: "King Khalid International Airport", municipality: "Riyadh", country: "Saudi Arabia", continent: "AS" },
  { iata_code: "JED", name: "King Abdulaziz International Airport", municipality: "Jeddah", country: "Saudi Arabia", continent: "AS" },
  { iata_code: "BAH", name: "Bahrain International Airport", municipality: "Manama", country: "Bahrain", continent: "AS" },
  { iata_code: "MCT", name: "Muscat International Airport", municipality: "Muscat", country: "Oman", continent: "AS" },
  
  // Europe
  { iata_code: "IST", name: "Istanbul Airport", municipality: "Istanbul", country: "Turkey", continent: "EU" },
  { iata_code: "SAW", name: "Sabiha Gökçen International Airport", municipality: "Istanbul", country: "Turkey", continent: "EU" },
  { iata_code: "LHR", name: "Heathrow Airport", municipality: "London", country: "United Kingdom", continent: "EU" },
  { iata_code: "CDG", name: "Charles de Gaulle Airport", municipality: "Paris", country: "France", continent: "EU" },
  { iata_code: "FRA", name: "Frankfurt Airport", municipality: "Frankfurt", country: "Germany", continent: "EU" },
  { iata_code: "AMS", name: "Amsterdam Airport Schiphol", municipality: "Amsterdam", country: "Netherlands", continent: "EU" },
  { iata_code: "FCO", name: "Leonardo da Vinci International Airport", municipality: "Rome", country: "Italy", continent: "EU" },
  { iata_code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", municipality: "Madrid", country: "Spain", continent: "EU" },
  { iata_code: "ZUR", name: "Zurich Airport", municipality: "Zurich", country: "Switzerland", continent: "EU" },
  { iata_code: "VIE", name: "Vienna International Airport", municipality: "Vienna", country: "Austria", continent: "EU" },
  
  // Asia
  { iata_code: "BKK", name: "Suvarnabhumi Airport", municipality: "Bangkok", country: "Thailand", continent: "AS" },
  { iata_code: "SIN", name: "Singapore Changi Airport", municipality: "Singapore", country: "Singapore", continent: "AS" },
  { iata_code: "KUL", name: "Kuala Lumpur International Airport", municipality: "Kuala Lumpur", country: "Malaysia", continent: "AS" },
  { iata_code: "CGK", name: "Soekarno-Hatta International Airport", municipality: "Jakarta", country: "Indonesia", continent: "AS" },
  { iata_code: "MNL", name: "Ninoy Aquino International Airport", municipality: "Manila", country: "Philippines", continent: "AS" },
  { iata_code: "HKG", name: "Hong Kong International Airport", municipality: "Hong Kong", country: "Hong Kong", continent: "AS" },
  { iata_code: "ICN", name: "Incheon International Airport", municipality: "Seoul", country: "South Korea", continent: "AS" },
  { iata_code: "NRT", name: "Narita International Airport", municipality: "Tokyo", country: "Japan", continent: "AS" },
  { iata_code: "PVG", name: "Shanghai Pudong International Airport", municipality: "Shanghai", country: "China", continent: "AS" },
  { iata_code: "PEK", name: "Beijing Capital International Airport", municipality: "Beijing", country: "China", continent: "AS" },
  { iata_code: "DEL", name: "Indira Gandhi International Airport", municipality: "New Delhi", country: "India", continent: "AS" },
  { iata_code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", municipality: "Mumbai", country: "India", continent: "AS" },
  
  // North America
  { iata_code: "JFK", name: "John F. Kennedy International Airport", municipality: "New York", country: "United States", continent: "NA" },
  { iata_code: "LAX", name: "Los Angeles International Airport", municipality: "Los Angeles", country: "United States", continent: "NA" },
  { iata_code: "ORD", name: "O'Hare International Airport", municipality: "Chicago", country: "United States", continent: "NA" },
  { iata_code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", municipality: "Atlanta", country: "United States", continent: "NA" },
  { iata_code: "DFW", name: "Dallas/Fort Worth International Airport", municipality: "Dallas", country: "United States", continent: "NA" },
  { iata_code: "YYZ", name: "Toronto Pearson International Airport", municipality: "Toronto", country: "Canada", continent: "NA" },
  { iata_code: "YVR", name: "Vancouver International Airport", municipality: "Vancouver", country: "Canada", continent: "NA" },
  
  // South America
  { iata_code: "GRU", name: "São Paulo/Guarulhos International Airport", municipality: "São Paulo", country: "Brazil", continent: "SA" },
  { iata_code: "EZE", name: "Ezeiza International Airport", municipality: "Buenos Aires", country: "Argentina", continent: "SA" },
  { iata_code: "BOG", name: "El Dorado International Airport", municipality: "Bogotá", country: "Colombia", continent: "SA" },
  { iata_code: "LIM", name: "Jorge Chávez International Airport", municipality: "Lima", country: "Peru", continent: "SA" },
  { iata_code: "SCL", name: "Arturo Merino Benítez International Airport", municipality: "Santiago", country: "Chile", continent: "SA" },
  
  // Oceania
  { iata_code: "SYD", name: "Kingsford Smith Airport", municipality: "Sydney", country: "Australia", continent: "OC" },
  { iata_code: "MEL", name: "Melbourne Airport", municipality: "Melbourne", country: "Australia", continent: "OC" },
  { iata_code: "AKL", name: "Auckland Airport", municipality: "Auckland", country: "New Zealand", continent: "OC" }
];

// Helper function to get airports by continent
export const getAirportsByContinent = (continent: string): Airport[] => {
  return airports.filter(airport => airport.continent === continent);
};

// Helper function to search airports
export const searchAirports = (query: string): Airport[] => {
  const searchTerm = query.toLowerCase();
  return airports.filter(airport => 
    airport.name.toLowerCase().includes(searchTerm) ||
    airport.municipality.toLowerCase().includes(searchTerm) ||
    airport.country.toLowerCase().includes(searchTerm) ||
    airport.iata_code.toLowerCase().includes(searchTerm)
  );
};