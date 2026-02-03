import { useState } from 'react';
import { LOCATIONS_MOCK, MapLocation } from '../data/mocks/mapaData';

export function useMapExplore() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [searchText, setSearchText] = useState('');

  const handleSelectLocationId = (id: string) => {
    const found = LOCATIONS_MOCK.find(loc => loc.id === id);
    if (found) {
        setSelectedLocation(found);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 2) {
        const found = LOCATIONS_MOCK.find(loc => 
            loc.name.toLowerCase().includes(text.toLowerCase())
        );
        if (found) {
            setSelectedLocation(found);
        }
    }
  };

  const handleClearSelection = () => {
    setSelectedLocation(null);
    setSearchText('');
  };

  return {
    selectedLocation,
    searchText,
    locations: LOCATIONS_MOCK,
    handleSelectLocationId, // ficar claro que recebe ID
    handleSearch,
    handleClearSelection
  };
}