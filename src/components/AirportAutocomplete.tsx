import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { FullAirport, searchAirports, formatAirportDisplay, getAirportValue } from '../data/airportsData';

interface AirportAutocompleteProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  airports: FullAirport[];
  placeholder?: string;
  required?: boolean;
}

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  airports,
  placeholder = "Search airports...",
  required = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState<FullAirport[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<FullAirport | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Update query when value changes externally
  useEffect(() => {
    if (value && airports.length > 0) {
      const airport = airports.find(a => getAirportValue(a) === value);
      if (airport) {
        setSelectedAirport(airport);
        setQuery(formatAirportDisplay(airport));
      }
    } else if (!value) {
      setQuery('');
      setSelectedAirport(null);
    }
  }, [value, airports]);
  
  // Search airports when query changes
  useEffect(() => {
    if (query.length >= 2 && airports.length > 0) {
      const results = searchAirports(query, airports);
      setFilteredAirports(results);
      setHighlightedIndex(-1);
    } else {
      setFilteredAirports([]);
    }
  }, [query, airports]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsOpen(true);
    
    // Clear selection if query doesn't match selected airport
    if (selectedAirport && !formatAirportDisplay(selectedAirport).toLowerCase().includes(newQuery.toLowerCase())) {
      setSelectedAirport(null);
      onChange('');
    }
  };
  
  // Handle airport selection
  const handleAirportSelect = (airport: FullAirport) => {
    setSelectedAirport(airport);
    setQuery(formatAirportDisplay(airport));
    setIsOpen(false);
    onChange(getAirportValue(airport));
    setHighlightedIndex(-1);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredAirports.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredAirports.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredAirports.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredAirports.length) {
          handleAirportSelect(filteredAirports[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        <MapPin className="inline h-4 w-4 mr-1" />
        {label} {required && '*'}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <ChevronDown 
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      
      {isOpen && filteredAirports.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredAirports.map((airport, index) => (
            <div
              key={`${airport.ident}-${index}`}
              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${
                index === highlightedIndex ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleAirportSelect(airport)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="font-medium text-gray-900">
                {airport.iata_code && (
                  <span className="text-blue-600 font-bold">{airport.iata_code}</span>
                )}
                {airport.iata_code && ' - '}
                {airport.name}
              </div>
              <div className="text-sm text-gray-500">
                {airport.municipality && `${airport.municipality}, `}
                {airport.iso_country}
                {airport.type && ` • ${airport.type.replace('_', ' ')}`}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.length >= 2 && filteredAirports.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-gray-500 text-center">
            No airports found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportAutocomplete;