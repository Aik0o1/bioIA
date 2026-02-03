export interface ConservationUnit {
  id: string;
  name: string;
  location: string; // Ex: "Itaituba - AM"
  latitude: number;
  longitude: number;
  type: 'Parque Nacional' | 'Reserva' | 'APA';
}

export interface MapLocation {
  id: string;
  name: string; // "Amazonas"
  tags: { label: string; icon: string }[]; // ["Amazônia", "Tropical"]
  description: string;
  latitude: number;
  longitude: number;
  species: { id: string; name: string; image: string }[];
  conservationUnits: ConservationUnit[];
}

export const LOCATIONS_MOCK: MapLocation[] = [
  {
    id: '1',
    name: 'Amazonas',
    latitude: -3.4168,
    longitude: -65.8561,
    tags: [
      { label: 'Amazônia', icon: 'forest' },
      { label: 'Tropical', icon: 'thermometer' }
    ],
    description: 'O maior estado do Brasil, coberto quase totalmente pela Floresta Amazônica. Lar de uma biodiversidade incomparável e sistemas fluviais gigantescos.',
    species: [
      { id: '1', name: 'Onça-Pintada', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg' },
      { id: '2', name: 'Arara-Canindé', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Arara_caninde_1.jpg' },
      { id: '3', name: 'Vitória-Régia', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Vitoria_regia_no_Amazonas.jpg' }
    ],
    conservationUnits: [
      {
        id: 'u1',
        name: 'P.N. da Amazônia',
        location: 'Itaituba - AM',
        type: 'Parque Nacional',
        latitude: -4.4833,
        longitude: -56.8333
      }
    ]
  },
];