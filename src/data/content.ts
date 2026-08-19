import type { Lang } from '@/i18n/translations';

export interface Bilingual {
  es: string;
  en: string;
}

export interface City {
  id: string;
  name: Bilingual;
  region: Bilingual;
  visitDate: Bilingual;
  dateShort: string;
  description: Bilingual;
  heroImage: string;
  coordinates: { x: number; y: number };
  mainVenue: Bilingual;
  color: string;
}

export interface ScheduleEvent {
  id: string;
  date: string;
  time: string;
  cityId: string;
  activity: Bilingual;
  place: Bilingual;
  status: 'upcoming' | 'ongoing' | 'finished';
}

export interface TouristPlace {
  id: string;
  cityId: string;
  name: Bilingual;
  description: Bilingual;
  image: string;
  location: Bilingual;
  category: 'cultura' | 'historia' | 'naturaleza' | 'gastronomia' | 'artesania';
}

export interface Dish {
  id: string;
  cityId: string;
  name: Bilingual;
  description: Bilingual;
  image: string;
  region: Bilingual;
}

export interface GalleryItem {
  id: string;
  cityId: string;
  type: 'photo' | 'video';
  image: string;
  caption: Bilingual;
  videoUrl?: string;
}

export interface CircuitPoint {
  id: string;
  cityId: string;
  name: Bilingual;
  description: Bilingual;
  time: string;
}

const IMG = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const cities: City[] = [
  {
    id: 'lima',
    name: { es: 'Lima', en: 'Lima' },
    region: { es: 'Costa', en: 'Coast' },
    visitDate: { es: '11 — 13 Noviembre', en: 'November 11 — 13' },
    dateShort: '2026-11-11',
    description: {
      es: 'Capital del Perú y primera parada del recorrido. Lima combina historia colonial, gastronomía de nivel mundial y una vibrante vida urbana junto al océano Pacífico.',
      en: 'Capital of Peru and the first stop of the journey. Lima blends colonial history, world-class cuisine, and vibrant urban life along the Pacific Ocean.',
    },
    heroImage: IMG('13708160', 1600),
    coordinates: { x: 28, y: 53 },
    mainVenue: { es: 'Plaza Mayor de Lima', en: 'Plaza Mayor of Lima' },
    color: '#C5221F',
  },
  {
    id: 'chiclayo',
    name: { es: 'Chiclayo', en: 'Chiclayo' },
    region: { es: 'Costa norte', en: 'Northern coast' },
    visitDate: { es: '13 — 14 Noviembre', en: 'November 13 — 14' },
    dateShort: '2026-11-13',
    description: {
      es: 'Conocida como la "Ciudad de la Amistad". Chiclayo es el corazón de la región donde el Papa León XIV sirvió como misionero, convirtiendo esta visita en un regreso profundamente personal.',
      en: 'Known as the "City of Friendship." Chiclayo is the heart of the region where Pope Leo XIV served as a missionary, making this visit a deeply personal return.',
    },
    heroImage: IMG('35490408', 1600),
    coordinates: { x: 34, y: 26 },
    mainVenue: { es: 'Plaza de Armas de Chiclayo', en: 'Plaza de Armas of Chiclayo' },
    color: '#D97706',
  },
  {
    id: 'cusco',
    name: { es: 'Cusco', en: 'Cusco' },
    region: { es: 'Sierra sur', en: 'Southern highlands' },
    visitDate: { es: '15 — 16 Noviembre', en: 'November 15 — 16' },
    dateShort: '2026-11-15',
    description: {
      es: 'Antigua capital del Imperio Inca y Patrimonio Cultural de la Humanidad. Cusco es el destino turístico más emblemático del Perú, puerta de entrada al Valle Sagrado y Machu Picchu.',
      en: 'Ancient capital of the Inca Empire and a UNESCO World Heritage Site. Cusco is Peru\'s most iconic tourist destination, gateway to the Sacred Valley and Machu Picchu.',
    },
    heroImage: IMG('27439166', 1600),
    coordinates: { x: 40, y: 61 },
    mainVenue: { es: 'Plaza de Armas del Cusco', en: 'Plaza de Armas of Cusco' },
    color: '#C5221F',
  },
  {
    id: 'pucallpa',
    name: { es: 'Pucallpa', en: 'Pucallpa' },
    region: { es: 'Selva amazónica', en: 'Amazon rainforest' },
    visitDate: { es: '16 — 17 Noviembre', en: 'November 16 — 17' },
    dateShort: '2026-11-16',
    description: {
      es: 'Puerta de entrada a la Amazonía peruana. Pucallpa representa la vitalidad de la selva, sus pueblos originarios y la riqueza natural del oriente peruano, completando un recorrido por las tres regioniones del Perú.',
      en: 'Gateway to the Peruvian Amazon. Pucallpa represents the vitality of the rainforest, its indigenous peoples, and the natural wealth of the Peruvian east, completing a journey through all three regions of Peru.',
    },
    heroImage: IMG('30205697', 1600),
    coordinates: { x: 64, y: 47 },
    mainVenue: { es: 'Plaza de Armas de Pucallpa', en: 'Plaza de Armas of Pucallpa' },
    color: '#D97706',
  },
];

export const scheduleEvents: ScheduleEvent[] = [
  { id: 'e1', date: '2026-11-11', time: '14:00', cityId: 'lima', activity: { es: 'Llegada al Aeropuerto Internacional Jorge Chávez', en: 'Arrival at Jorge Chávez International Airport' }, place: { es: 'Aeropuerto Jorge Chávez, Lima', en: 'Jorge Chávez Airport, Lima' }, status: 'upcoming' },
  { id: 'e2', date: '2026-11-11', time: '17:00', cityId: 'lima', activity: { es: 'Ceremonia de bienvenida oficial', en: 'Official welcome ceremony' }, place: { es: 'Palacio de Gobierno, Lima', en: 'Government Palace, Lima' }, status: 'upcoming' },
  { id: 'e3', date: '2026-11-12', time: '10:00', cityId: 'lima', activity: { es: 'Santa Misa en la Costa Verde', en: 'Holy Mass at Costa Verde' }, place: { es: 'Costa Verde, Lima', en: 'Costa Verde, Lima' }, status: 'upcoming' },
  { id: 'e4', date: '2026-11-12', time: '16:00', cityId: 'lima', activity: { es: 'Encuentro con el mundo educativo', en: 'Meeting with the educational community' }, place: { es: 'Universidad Nacional Mayor de San Marcos', en: 'National University of San Marcos' }, status: 'upcoming' },
  { id: 'e5', date: '2026-11-13', time: '09:00', cityId: 'chiclayo', activity: { es: 'Llegada a Chiclayo y bienvenida popular', en: 'Arrival in Chiclayo and popular welcome' }, place: { es: 'Aeropuerto Capitán FAP José A. Quiñones', en: 'Capitán FAP José A. Quiñones Airport' }, status: 'upcoming' },
  { id: 'e6', date: '2026-11-13', time: '15:00', cityId: 'chiclayo', activity: { es: 'Santa Misa en el Parque Principal', en: 'Holy Mass at the Main Park' }, place: { es: 'Plaza de Armas, Chiclayo', en: 'Plaza de Armas, Chiclayo' }, status: 'upcoming' },
  { id: 'e7', date: '2026-11-13', time: '18:00', cityId: 'chiclayo', activity: { es: 'Encuentro con la comunidad agustina', en: 'Meeting with the Augustinian community' }, place: { es: 'Parroquia San José, Chiclayo', en: 'San José Parish, Chiclayo' }, status: 'upcoming' },
  { id: 'e8', date: '2026-11-15', time: '10:00', cityId: 'cusco', activity: { es: 'Santa Misa en la Plaza de Armas', en: 'Holy Mass at the Plaza de Armas' }, place: { es: 'Plaza de Armas, Cusco', en: 'Plaza de Armas, Cusco' }, status: 'upcoming' },
  { id: 'e9', date: '2026-11-15', time: '14:30', cityId: 'cusco', activity: { es: 'Encuentro con pueblos originarios de los Andes', en: 'Meeting with indigenous peoples of the Andes' }, place: { es: 'Sacsayhuamán, Cusco', en: 'Sacsayhuamán, Cusco' }, status: 'upcoming' },
  { id: 'e10', date: '2026-11-16', time: '09:00', cityId: 'pucallpa', activity: { es: 'Llegada a Pucallpa y encuentro amazónico', en: 'Arrival in Pucallpa and Amazonian gathering' }, place: { es: 'Aeropuerto FAP Captain David Abensur', en: 'FAP Captain David Abensur Airport' }, status: 'upcoming' },
  { id: 'e11', date: '2026-11-16', time: '14:00', cityId: 'pucallpa', activity: { es: 'Encuentro con comunidades de la Amazonía', en: 'Meeting with Amazonian communities' }, place: { es: 'Plaza de Armas, Pucallpa', en: 'Plaza de Armas, Pucallpa' }, status: 'upcoming' },
  { id: 'e12', date: '2026-11-17', time: '11:00', cityId: 'lima', activity: { es: 'Ceremonia de despedida y regreso a Roma', en: 'Farewell ceremony and return to Rome' }, place: { es: 'Aeropuerto Jorge Chávez, Lima', en: 'Jorge Chávez Airport, Lima' }, status: 'upcoming' },
];

export const circuitPoints: CircuitPoint[] = [
  { id: 'c1', cityId: 'lima', time: '14:00', name: { es: 'Aeropuerto Jorge Chávez', en: 'Jorge Chávez Airport' }, description: { es: 'Llegada y recepción oficial', en: 'Arrival and official reception' } },
  { id: 'c2', cityId: 'lima', time: '17:00', name: { es: 'Palacio de Gobierno', en: 'Government Palace' }, description: { es: 'Ceremonia de bienvenida', en: 'Welcome ceremony' } },
  { id: 'c3', cityId: 'lima', time: '10:00', name: { es: 'Costa Verde', en: 'Costa Verde' }, description: { es: 'Santa Misa frente al mar', en: 'Holy Mass by the sea' } },
  { id: 'c4', cityId: 'lima', time: '16:00', name: { es: 'Universidad San Marcos', en: 'San Marcos University' }, description: { es: 'Encuentro educativo', en: 'Educational gathering' } },
  { id: 'c5', cityId: 'chiclayo', time: '09:00', name: { es: 'Aeropuerto Quiñones', en: 'Quiñones Airport' }, description: { es: 'Llegada y bienvenida popular', en: 'Arrival and popular welcome' } },
  { id: 'c6', cityId: 'chiclayo', time: '15:00', name: { es: 'Plaza de Armas', en: 'Plaza de Armas' }, description: { es: 'Santa Misa multitudinaria', en: 'Massive Holy Mass' } },
  { id: 'c7', cityId: 'chiclayo', time: '18:00', name: { es: 'Parroquia San José', en: 'San José Parish' }, description: { es: 'Encuentro con la comunidad agustina', en: 'Meeting with Augustinian community' } },
  { id: 'c8', cityId: 'cusco', time: '10:00', name: { es: 'Plaza de Armas', en: 'Plaza de Armas' }, description: { es: 'Santa Misa en el corazón del imperio inca', en: 'Holy Mass in the heart of the Inca Empire' } },
  { id: 'c9', cityId: 'cusco', time: '14:30', name: { es: 'Sacsayhuamán', en: 'Sacsayhuamán' }, description: { es: 'Encuentro con pueblos andinos', en: 'Meeting with Andean peoples' } },
  { id: 'c10', cityId: 'pucallpa', time: '09:00', name: { es: 'Aeropuerto Abensur', en: 'Abensur Airport' }, description: { es: 'Llegada a la Amazonía', en: 'Arrival in the Amazon' } },
  { id: 'c11', cityId: 'pucallpa', time: '14:00', name: { es: 'Plaza de Armas', en: 'Plaza de Armas' }, description: { es: 'Encuentro amazónico', en: 'Amazonian gathering' } },
];

export const touristPlaces: TouristPlace[] = [
  { id: 't1', cityId: 'lima', category: 'historia', name: { es: 'Centro Histórico de Lima', en: 'Historic Center of Lima' }, description: { es: 'Patrimonio UNESCO con catedrales, plazas y balcones coloniales.', en: 'UNESCO heritage with cathedrals, plazas, and colonial balconies.' }, image: IMG('16198544'), location: { es: 'Centro de Lima', en: 'Downtown Lima' } },
  { id: 't2', cityId: 'lima', category: 'cultura', name: { es: 'Museo Larco', en: 'Larco Museum' }, description: { es: 'Colección de arte precolombino con miles de piezas cerámicas.', en: 'Pre-Columbian art collection with thousands of ceramic pieces.' }, image: IMG('20853388'), location: { es: 'Pueblo Libre', en: 'Pueblo Libre' } },
  { id: 't3', cityId: 'lima', category: 'naturaleza', name: { es: 'Malecón de Miraflores', en: 'Miraflores Boardwalk' }, description: { es: 'Seis kilómetros de paseo con vistas al océano Pacífico.', en: 'Six kilometers of boardwalk with Pacific Ocean views.' }, image: IMG('35587005'), location: { es: 'Miraflores', en: 'Miraflores' } },
  { id: 't4', cityId: 'lima', category: 'gastronomia', name: { es: 'Circuito Gastronómico de Barranco', en: 'Barranco Food Circuit' }, description: { es: 'El barrio bohemio con los mejores restaurantes y bares del Perú.', en: 'The bohemian district with Peru\'s best restaurants and bars.' }, image: IMG('35490408'), location: { es: 'Barranco', en: 'Barranco' } },
  { id: 't5', cityId: 'chiclayo', category: 'historia', name: { es: 'Tumba del Señor de Sipán', en: 'Tomb of the Lord of Sipán' }, description: { es: 'El hallazgo arqueológico más importante del Perú moderno.', en: 'The most important archaeological discovery in modern Peru.' }, image: IMG('12811774'), location: { es: 'Lambayeque', en: 'Lambayeque' } },
  { id: 't6', cityId: 'chiclayo', category: 'naturaleza', name: { es: 'Reserva Ecológica Chaparrí', en: 'Chaparrí Ecological Reserve' }, description: { es: 'Santuario natural para osos de anteojos y biodiversidad única.', en: 'Natural sanctuary for spectacled bears and unique biodiversity.' }, image: IMG('30205697'), location: { es: 'Chongoyape', en: 'Chongoyape' } },
  { id: 't7', cityId: 'chiclayo', category: 'cultura', name: { es: 'Museo Tumbas Reales de Sipán', en: 'Royal Tombs of Sipán Museum' }, description: { es: 'Museo moderno que resguarda el ajuar funerario mochica.', en: 'Modern museum safeguarding Moche funeral treasures.' }, image: IMG('12927554'), location: { es: 'Lambayeque', en: 'Lambayeque' } },
  { id: 't8', cityId: 'chiclayo', category: 'artesania', name: { es: 'Mercado Artesanal de Monsefú', en: 'Monsefú Craft Market' }, description: { es: 'Tejidos, paja tejida y artesanía tradicional lambayecana.', en: 'Weavings, straw crafts, and traditional Lambayeque artisanry.' }, image: IMG('13340877'), location: { es: 'Monsefú', en: 'Monsefú' } },
  { id: 't9', cityId: 'cusco', category: 'historia', name: { es: 'Machu Picchu', en: 'Machu Picchu' }, description: { es: 'La maravilla del mundo inca, rodeada de montañas sagradas.', en: 'The wonder of the Inca world, surrounded by sacred mountains.' }, image: IMG('16973651'), location: { es: 'Cusco — Urubamba', en: 'Cusco — Urubamba' } },
  { id: 't10', cityId: 'cusco', category: 'historia', name: { es: 'Sacsayhuamán', en: 'Sacsayhuamán' }, description: { es: 'Fortaleza inca con muros de piedra ciclópea sobre el Cusco.', en: 'Inca fortress with cyclopean stone walls above Cusco.' }, image: IMG('12811774'), location: { es: 'Cusco norte', en: 'Northern Cusco' } },
  { id: 't11', cityId: 'cusco', category: 'cultura', name: { es: 'Valle Sagrado de los Incas', en: 'Sacred Valley of the Incas' }, description: { es: 'Valle fértil con pueblos, mercados y ruinas incas.', en: 'Fertile valley with villages, markets, and Inca ruins.' }, image: IMG('17848290'), location: { es: 'Pisac — Ollantaytambo', en: 'Pisac — Ollantaytambo' } },
  { id: 't12', cityId: 'cusco', category: 'artesania', name: { es: 'Mercado de San Blas', en: 'San Blas Market' }, description: { es: 'Barrio de artesanos con talleres de imaginería y textilería.', en: 'Artisan quarter with imaging and textile workshops.' }, image: IMG('37966508'), location: { es: 'San Blas, Cusco', en: 'San Blas, Cusco' } },
  { id: 't13', cityId: 'pucallpa', category: 'naturaleza', name: { es: 'Lago Yarinacocha', en: 'Lake Yarinacocha' }, description: { es: 'Lago en herradura con delfines rosados y comunidades shipibas.', en: 'Oxbow lake with pink dolphins and Shipibo communities.' }, image: IMG('37812265'), location: { es: 'Pucallpa', en: 'Pucallpa' } },
  { id: 't14', cityId: 'pucallpa', category: 'cultura', name: { es: 'Comunidad Shipibo de San Francisco', en: 'Shipibo Community of San Francisco' }, description: { es: 'Pueblo originario con arte, medicina y tradición milenaria.', en: 'Indigenous people with art, medicine, and millenary tradition.' }, image: IMG('37966520'), location: { es: 'Yarinacocha', en: 'Yarinacocha' } },
  { id: 't15', cityId: 'pucallpa', category: 'naturaleza', name: { es: 'Parque Natural de Pucallpa', en: 'Pucallpa Natural Park' }, description: { es: 'Reserva con flora amazónica, paseos en lancha y avistamiento de aves.', en: 'Reserve with Amazonian flora, boat rides, and bird watching.' }, image: IMG('17025853'), location: { es: 'Pucallpa centro', en: 'Central Pucallpa' } },
];

export const dishes: Dish[] = [
  { id: 'd1', cityId: 'lima', name: { es: 'Ceviche', en: 'Ceviche' }, description: { es: 'Pescado fresco marinado en limón, cebolla y ají. Símbolo gastronómico del Perú.', en: 'Fresh fish marinated in lime, onion, and chili. Peru\'s gastronomic symbol.' }, image: IMG('28490813'), region: { es: 'Lima / Costa', en: 'Lima / Coast' } },
  { id: 'd2', cityId: 'lima', name: { es: 'Lomo Saltado', en: 'Lomo Saltado' }, description: { es: 'Salteado de carne con cebolla, tomate y papas fritas sobre arroz.', en: 'Stir-fried beef with onion, tomato, and fries over rice.' }, image: IMG('28503593'), region: { es: 'Lima', en: 'Lima' } },
  { id: 'd3', cityId: 'lima', name: { es: 'Causa Limeña', en: 'Causa Limeña' }, description: { es: 'Capas de papa amarilla con palta, pollo y mayonesa.', en: 'Layers of yellow potato with avocado, chicken, and mayo.' }, image: IMG('28490844'), region: { es: 'Lima', en: 'Lima' } },
  { id: 'd4', cityId: 'chiclayo', name: { es: 'Arroz con Pato', en: 'Duck Rice' }, description: { es: 'Pato cocinado con arroz, cilantro y chicha de jora. Plato bandera de Chiclayo.', en: 'Duck cooked with rice, cilantro, and chicha de jora. Chiclayo\'s signature dish.' }, image: IMG('30766457'), region: { es: 'Chiclayo', en: 'Chiclayo' } },
  { id: 'd5', cityId: 'chiclayo', name: { es: 'Chirimpico', en: 'Chirimpico' }, description: { es: 'Caldo de cabrito con menudencias, especias y yuca.', en: 'Goat broth with offal, spices, and yuca.' }, image: IMG('31495670'), region: { es: 'Chiclayo', en: 'Chiclayo' } },
  { id: 'd6', cityId: 'chiclayo', name: { es: 'Tortillas de Maíz', en: 'Corn Tortillas' }, description: { es: 'Tortillas tradicionales de maíz tierno con queso fresco.', en: 'Traditional tortillas of tender corn with fresh cheese.' }, image: IMG('37315491'), region: { es: 'Lambayeque', en: 'Lambayeque' } },
  { id: 'd7', cityId: 'cusco', name: { es: 'Chiri Uchu', en: 'Chiri Uchu' }, description: { es: 'Plato tradicional cusqueño: gallina, cecina, chorizo, rocoto, queso y cebolla.', en: 'Traditional Cusco dish: chicken, jerky, sausage, chili, cheese, and onion.' }, image: IMG('3975044'), region: { es: 'Cusco', en: 'Cusco' } },
  { id: 'd8', cityId: 'cusco', name: { es: 'Rocoto Relleno', en: 'Stuffed Rocoto' }, description: { es: 'Rocoto relleno de carne picada, queso y especias al horno.', en: 'Rocoto pepper stuffed with minced meat, cheese, and spices, baked.' }, image: IMG('28503582'), region: { es: 'Cusco / Arequipa', en: 'Cusco / Arequipa' } },
  { id: 'd9', cityId: 'cusco', name: { es: 'Adobo Cusqueño', en: 'Cusco Adobo' }, description: { es: 'Cerdo marinado en chicha de jora y especias, cocinado al horno.', en: 'Pork marinated in chicha de jora and spices, baked.' }, image: IMG('28490813'), region: { es: 'Cusco', en: 'Cusco' } },
  { id: 'd10', cityId: 'pucallpa', name: { es: 'Patarashca', en: 'Patarashca' }, description: { es: 'Pescado envuelto en hojas de bijao con cebolla, tomate y cilantro.', en: 'Fish wrapped in bijao leaves with onion, tomato, and cilantro.' }, image: IMG('3975044'), region: { es: 'Amazonía', en: 'Amazon' } },
  { id: 'd11', cityId: 'pucallpa', name: { es: 'Juane', en: 'Juane' }, description: { es: 'Arroz con gallina envuelto en hojas de bijao, cocido al vapor.', en: 'Chicken rice wrapped in bijao leaves, steamed.' }, image: IMG('28490844'), region: { es: 'Selva peruana', en: 'Peruvian jungle' } },
  { id: 'd12', cityId: 'pucallpa', name: { es: 'Tacacho con Cecina', en: 'Tacacho with Cecina' }, description: { es: 'Plátano asado y machacado con cecina de cerdo y chicharrones.', en: 'Roasted and mashed plantain with pork jerky and cracklings.' }, image: IMG('30766457'), region: { es: 'Amazonía', en: 'Amazon' } },
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', cityId: 'lima', type: 'photo', image: IMG('16198544', 1200), caption: { es: 'Centro Histórico de Lima', en: 'Historic Center of Lima' } },
  { id: 'g2', cityId: 'cusco', type: 'photo', image: IMG('16973651', 1200), caption: { es: 'Machu Picchu', en: 'Machu Picchu' } },
  { id: 'g3', cityId: 'chiclayo', type: 'photo', image: IMG('12927554', 1200), caption: { es: 'Sacsayhuamán', en: 'Sacsayhuamán' } },
  { id: 'g4', cityId: 'pucallpa', type: 'photo', image: IMG('30205697', 1200), caption: { es: 'Río Amazonas', en: 'Amazon River' } },
  { id: 'g5', cityId: 'cusco', type: 'photo', image: IMG('12811774', 1200), caption: { es: 'Muros de Sacsayhuamán', en: 'Sacsayhuamán Walls' } },
  { id: 'g6', cityId: 'lima', type: 'photo', image: IMG('35587005', 1200), caption: { es: 'Lima al atardecer', en: 'Lima at sunset' } },
  { id: 'g7', cityId: 'cusco', type: 'photo', image: IMG('17848290', 1200), caption: { es: 'Valle Sagrado', en: 'Sacred Valley' } },
  { id: 'g8', cityId: 'pucallpa', type: 'photo', image: IMG('17025853', 1200), caption: { es: 'Río Ucayali', en: 'Ucayali River' } },
  { id: 'g9', cityId: 'chiclayo', type: 'photo', image: IMG('13340877', 1200), caption: { es: 'Mercado artesanal', en: 'Artisan market' } },
  { id: 'g10', cityId: 'cusco', type: 'photo', image: IMG('37885473', 1200), caption: { es: 'Machu Picchu aéreo', en: 'Aerial Machu Picchu' } },
  { id: 'g11', cityId: 'lima', type: 'photo', image: IMG('35490408', 1200), caption: { es: 'Arquitectura colonial', en: 'Colonial architecture' } },
  { id: 'g12', cityId: 'pucallpa', type: 'photo', image: IMG('37812265', 1200), caption: { es: 'Atardecer amazónico', en: 'Amazon sunset' } },
];

export const historyContent = {
  es: [
    { year: '1975', title: 'Llegada al Perú', text: 'Robert Francis Prevost llega al Perú como misionero agustino. Su vocación de servicio lo lleva a recorrer comunidades de la costa norte y la sierra, estableciendo vínculos profundos con el pueblo peruano.' },
    { year: '1985—1998', title: 'Servicio en Chiclayo', text: 'Durante más de una década, sirve como párroco y formador en la diócesis de Chiclayo. Su trabajo pastoral abarca desde la formación de seminaristas hasta proyectos sociales con comunidades rurales de Lambayeque.' },
    { year: '2014—2023', title: 'Servicio global', text: 'Es nombrado Obispo de Chiclayo y posteriormente Prefecto del Dicasterio para los Obispos en Roma. Su experiencia peruana guía su visión sobre la Iglesia en América Latina.' },
    { year: '2025', title: 'Elección papal', text: 'El 8 de mayo de 2025, el cardenal Prevost es electo Papa, adoptando el nombre de León XIV. Se convierte en el primer Papa con profundos lazos con el Perú, marcando un capítulo sin precedentes.' },
    { year: '2026', title: 'Regreso al Perú', text: 'La visita apostólica de noviembre 2026 representa un retorno a la tierra que formó su vocación. Chiclayo, Lima, Cusco y Pucallpa simbolizan las tres regiones del Perú: costa, sierra y selva.' },
  ],
  en: [
    { year: '1975', title: 'Arrival in Peru', text: 'Robert Francis Prevost arrives in Peru as an Augustinian missionary. His calling to serve leads him through communities of the northern coast and highlands, forging deep bonds with the Peruvian people.' },
    { year: '1985—1998', title: 'Service in Chiclayo', text: 'For over a decade, he serves as pastor and formator in the diocese of Chiclayo. His pastoral work ranges from training seminarians to social projects with rural communities in Lambayeque.' },
    { year: '2014—2023', title: 'Global service', text: 'He is appointed Bishop of Chiclayo and later Prefect of the Dicastery for Bishops in Rome. His Peruvian experience shapes his vision of the Church in Latin America.' },
    { year: '2025', title: 'Papal election', text: 'On May 8, 2025, Cardinal Prevost is elected Pope, taking the name Leo XIV. He becomes the first Pope with deep ties to Peru, marking an unprecedented chapter.' },
    { year: '2026', title: 'Return to Peru', text: 'The November 2026 apostolic visit represents a return to the land that shaped his vocation. Chiclayo, Lima, Cusco, and Pucallpa symbolize the three regions of Peru: coast, highlands, and jungle.' },
  ],
};

export function getCityById(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}
export function getEventsByCity(cityId: string): ScheduleEvent[] {
  return scheduleEvents.filter((e) => e.cityId === cityId);
}
export function getTourismByCity(cityId: string): TouristPlace[] {
  return touristPlaces.filter((t) => t.cityId === cityId);
}
export function getDishesByCity(cityId: string): Dish[] {
  return dishes.filter((d) => d.cityId === cityId);
}
export function getCircuitByCity(cityId: string): CircuitPoint[] {
  return circuitPoints.filter((c) => c.cityId === cityId);
}
export function getGalleryByCity(cityId: string): GalleryItem[] {
  return galleryItems.filter((g) => g.cityId === cityId);
}
export function t(lang: Lang, content: Bilingual): string {
  return content[lang];
}
