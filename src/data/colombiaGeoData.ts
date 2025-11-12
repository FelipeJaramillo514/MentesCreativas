/**
 * Datos geográficos simplificados de Colombia
 * Coordenadas reales de los límites de cada departamento
 * Formato: [longitud, latitud] normalizado para Three.js
 */

export interface DepartmentGeoData {
  id: number;
  nombre: string;
  capital: string;
  población: string;
  area: string;
  region: string;
  color: string;
  dato: string;
  // Coordenadas simplificadas del polígono del departamento (lon, lat)
  coordinates: number[][];
  // Centro geográfico aproximado
  center: [number, number];
}

// Función para normalizar coordenadas de Colombia al espacio 3D
// Colombia: aproximadamente -79° a -66° longitud, -4° a 13° latitud
export const normalizeCoordinates = (lon: number, lat: number): [number, number] => {
  const lonMin = -79;
  const lonMax = -66;
  const latMin = -4.5;
  const latMax = 13;
  
  // Normalizar a rango aproximado [-6, 6] para X y [-4, 4] para Z
  const x = ((lon - lonMin) / (lonMax - lonMin)) * 12 - 6;
  const z = -((lat - latMin) / (latMax - latMin)) * 8 + 4;
  
  return [x, z];
};

export const departamentosGeo: DepartmentGeoData[] = [
  // REGIÓN CARIBE
  {
    id: 1,
    nombre: "La Guajira",
    capital: "Riohacha",
    población: "957.797",
    area: "20.848 km²",
    region: "Caribe",
    color: "#FF6B6B",
    dato: "Territorio del pueblo Wayúu, la comunidad indígena más grande de Colombia",
    center: [-72.5, 11.5],
    coordinates: [
      [-71.1, 12.5], [-71.3, 12.3], [-71.9, 11.8], [-72.5, 11.5],
      [-73.0, 11.2], [-73.3, 10.8], [-73.0, 10.4], [-72.5, 10.6],
      [-72.0, 11.0], [-71.5, 11.5], [-71.1, 12.0], [-71.1, 12.5]
    ]
  },
  {
    id: 2,
    nombre: "Cesar",
    capital: "Valledupar",
    población: "1.295.387",
    area: "22.905 km²",
    region: "Caribe",
    color: "#FF8E53",
    dato: "Cuna del vallenato, patrimonio inmaterial de la humanidad",
    center: [-73.5, 9.5],
    coordinates: [
      [-72.5, 10.6], [-73.0, 10.4], [-73.5, 10.0], [-73.8, 9.5],
      [-73.9, 9.0], [-73.5, 8.5], [-73.0, 8.8], [-72.8, 9.3],
      [-72.5, 9.8], [-72.5, 10.6]
    ]
  },
  {
    id: 3,
    nombre: "Magdalena",
    capital: "Santa Marta",
    población: "1.410.968",
    area: "23.188 km²",
    region: "Caribe",
    color: "#FFA07A",
    dato: "Posee la Sierra Nevada, la montaña costera más alta del mundo",
    center: [-74.2, 10.3],
    coordinates: [
      [-73.7, 11.2], [-74.2, 11.0], [-74.7, 10.7], [-74.9, 10.3],
      [-74.8, 9.8], [-74.5, 9.5], [-74.0, 9.3], [-73.5, 9.5],
      [-73.5, 10.0], [-73.7, 10.5], [-73.7, 11.2]
    ]
  },
  {
    id: 4,
    nombre: "Atlántico",
    capital: "Barranquilla",
    población: "2.721.398",
    area: "3.388 km²",
    region: "Caribe",
    color: "#FFB347",
    dato: "Puerta de Oro de Colombia, importante puerto caribeño",
    center: [-74.8, 10.8],
    coordinates: [
      [-74.7, 11.1], [-75.0, 11.0], [-75.2, 10.8], [-75.1, 10.5],
      [-74.8, 10.4], [-74.7, 10.6], [-74.7, 11.1]
    ]
  },
  {
    id: 5,
    nombre: "Bolívar",
    capital: "Cartagena",
    población: "2.229.054",
    area: "25.978 km²",
    region: "Caribe",
    color: "#FFCC33",
    dato: "Ciudad amurallada, Patrimonio de la Humanidad UNESCO",
    center: [-74.8, 8.5],
    coordinates: [
      [-74.0, 10.5], [-74.5, 10.3], [-75.2, 10.0], [-75.5, 9.5],
      [-75.3, 8.5], [-74.8, 7.5], [-74.3, 7.8], [-74.0, 8.5],
      [-73.8, 9.5], [-74.0, 10.5]
    ]
  },
  {
    id: 6,
    nombre: "Sucre",
    capital: "Sincelejo",
    población: "904.863",
    area: "10.917 km²",
    region: "Caribe",
    color: "#FFD700",
    dato: "Tierra de las sabanas y del porro, ritmo tradicional",
    center: [-75.0, 9.0],
    coordinates: [
      [-74.8, 9.8], [-75.2, 9.5], [-75.5, 9.2], [-75.5, 8.7],
      [-75.2, 8.5], [-74.8, 8.3], [-74.5, 8.5], [-74.5, 9.2],
      [-74.8, 9.8]
    ]
  },
  {
    id: 7,
    nombre: "Córdoba",
    capital: "Montería",
    población: "1.828.947",
    area: "25.020 km²",
    region: "Caribe",
    color: "#FFE066",
    dato: "Gran productor ganadero y agrícola de Colombia",
    center: [-75.8, 8.5],
    coordinates: [
      [-75.2, 9.5], [-75.8, 9.3], [-76.3, 9.0], [-76.5, 8.5],
      [-76.3, 8.0], [-75.8, 7.8], [-75.3, 8.0], [-75.0, 8.5],
      [-75.2, 9.5]
    ]
  },

  // REGIÓN ANDINA
  {
    id: 8,
    nombre: "Antioquia",
    capital: "Medellín",
    población: "6.677.930",
    area: "63.612 km²",
    region: "Andina",
    color: "#4ECDC4",
    dato: "Departamento más poblado después de Bogotá, cuna de la cultura paisa",
    center: [-75.5, 7.0],
    coordinates: [
      [-75.0, 8.5], [-75.5, 8.8], [-76.3, 8.5], [-76.8, 8.0],
      [-77.0, 7.2], [-76.5, 6.5], [-76.0, 6.0], [-75.2, 5.8],
      [-74.8, 6.2], [-74.5, 7.0], [-74.8, 7.8], [-75.0, 8.5]
    ]
  },
  {
    id: 9,
    nombre: "Santander",
    capital: "Bucaramanga",
    población: "2.184.837",
    area: "30.537 km²",
    region: "Andina",
    color: "#45B7D1",
    dato: "Tierra de aventura, famoso por el Cañón del Chicamocha",
    center: [-73.0, 7.0],
    coordinates: [
      [-72.5, 8.0], [-73.0, 8.3], [-73.5, 8.0], [-73.8, 7.5],
      [-73.9, 7.0], [-73.8, 6.5], [-73.3, 6.2], [-72.8, 6.0],
      [-72.4, 6.3], [-72.3, 6.8], [-72.5, 7.5], [-72.5, 8.0]
    ]
  },
  {
    id: 10,
    nombre: "Norte de Santander",
    capital: "Cúcuta",
    población: "1.508.268",
    area: "21.658 km²",
    region: "Andina",
    color: "#5DADE2",
    dato: "Frontera con Venezuela, ciudad de la Batalla de Cúcuta",
    center: [-72.8, 8.0],
    coordinates: [
      [-72.0, 8.8], [-72.5, 9.0], [-73.0, 8.8], [-73.2, 8.3],
      [-73.0, 7.8], [-72.5, 7.5], [-72.1, 7.8], [-72.0, 8.3],
      [-72.0, 8.8]
    ]
  },
  {
    id: 11,
    nombre: "Boyacá",
    capital: "Tunja",
    población: "1.242.954",
    area: "23.189 km²",
    region: "Andina",
    color: "#3498DB",
    dato: "Cuna de la independencia, Batalla del Puente de Boyacá",
    center: [-73.0, 5.5],
    coordinates: [
      [-72.3, 6.8], [-72.8, 7.0], [-73.5, 6.8], [-73.8, 6.3],
      [-74.0, 5.5], [-73.8, 4.8], [-73.3, 4.5], [-72.8, 4.8],
      [-72.4, 5.3], [-72.3, 6.0], [-72.3, 6.8]
    ]
  },
  {
    id: 12,
    nombre: "Cundinamarca",
    capital: "Bogotá",
    población: "3.242.537",
    area: "24.210 km²",
    region: "Andina",
    color: "#2E86DE",
    dato: "Rodea a Bogotá D.C., diversidad de climas y paisajes",
    center: [-74.3, 5.0],
    coordinates: [
      [-73.3, 5.5], [-73.8, 5.8], [-74.5, 5.5], [-74.8, 5.0],
      [-74.9, 4.3], [-74.5, 3.8], [-73.8, 3.9], [-73.3, 4.3],
      [-73.2, 5.0], [-73.3, 5.5]
    ]
  },
  {
    id: 13,
    nombre: "Bogotá D.C.",
    capital: "Bogotá",
    población: "8.380.801",
    area: "1.587 km²",
    region: "Andina",
    color: "#1E3A8A",
    dato: "Capital de Colombia, centro político y económico del país",
    center: [-74.08, 4.65],
    coordinates: [
      [-74.0, 4.8], [-74.2, 4.7], [-74.2, 4.5], [-74.0, 4.5],
      [-73.9, 4.6], [-74.0, 4.8]
    ]
  },
  {
    id: 14,
    nombre: "Caldas",
    capital: "Manizales",
    población: "1.018.453",
    area: "7.888 km²",
    region: "Andina",
    color: "#6C5CE7",
    dato: "Parte del Eje Cafetero, Paisaje Cultural Cafetero UNESCO",
    center: [-75.4, 5.3],
    coordinates: [
      [-75.0, 5.7], [-75.5, 5.8], [-75.8, 5.5], [-75.8, 5.0],
      [-75.5, 4.8], [-75.2, 4.9], [-75.0, 5.3], [-75.0, 5.7]
    ]
  },
  {
    id: 15,
    nombre: "Risaralda",
    capital: "Pereira",
    población: "1.007.525",
    area: "4.140 km²",
    region: "Andina",
    color: "#A29BFE",
    dato: "Ciudad de las puertas abiertas, centro del Eje Cafetero",
    center: [-75.7, 4.9],
    coordinates: [
      [-75.5, 5.3], [-75.8, 5.2], [-76.0, 4.9], [-76.0, 4.6],
      [-75.7, 4.5], [-75.5, 4.7], [-75.5, 5.3]
    ]
  },
  {
    id: 16,
    nombre: "Quindío",
    capital: "Armenia",
    población: "565.310",
    area: "1.845 km²",
    region: "Andina",
    color: "#B8B5FF",
    dato: "Corazón del Eje Cafetero, Valle de Cocora con palmas de cera",
    center: [-75.7, 4.5],
    coordinates: [
      [-75.5, 4.7], [-75.8, 4.6], [-75.9, 4.4], [-75.8, 4.2],
      [-75.6, 4.2], [-75.5, 4.4], [-75.5, 4.7]
    ]
  },
  {
    id: 17,
    nombre: "Tolima",
    capital: "Ibagué",
    población: "1.425.609",
    area: "23.562 km²",
    region: "Andina",
    color: "#8B7EC8",
    dato: "Capital musical de Colombia, Nevado del Tolima",
    center: [-75.2, 4.0],
    coordinates: [
      [-74.5, 5.0], [-75.2, 5.3], [-75.8, 5.0], [-76.0, 4.5],
      [-75.8, 3.5], [-75.3, 3.0], [-74.8, 3.2], [-74.5, 3.8],
      [-74.5, 5.0]
    ]
  },
  {
    id: 18,
    nombre: "Huila",
    capital: "Neiva",
    población: "1.009.548",
    area: "19.890 km²",
    region: "Andina",
    color: "#9B8FBF",
    dato: "Parque Arqueológico de San Agustín, Patrimonio UNESCO",
    center: [-75.8, 2.5],
    coordinates: [
      [-74.8, 3.5], [-75.5, 3.5], [-76.0, 3.0], [-76.0, 2.0],
      [-75.5, 1.5], [-75.0, 1.7], [-74.7, 2.3], [-74.8, 3.5]
    ]
  },

  // REGIÓN PACÍFICA
  {
    id: 19,
    nombre: "Chocó",
    capital: "Quibdó",
    población: "534.826",
    area: "46.530 km²",
    region: "Pacífica",
    color: "#00D2D3",
    dato: "Una de las regiones con mayor biodiversidad del planeta",
    center: [-76.8, 5.5],
    coordinates: [
      [-76.3, 8.5], [-76.8, 8.2], [-77.3, 7.8], [-77.7, 7.0],
      [-77.8, 6.0], [-77.5, 5.0], [-77.0, 4.5], [-76.5, 5.0],
      [-76.3, 6.0], [-76.3, 7.0], [-76.3, 8.5]
    ]
  },
  {
    id: 20,
    nombre: "Valle del Cauca",
    capital: "Cali",
    población: "4.660.386",
    area: "22.140 km²",
    region: "Pacífica",
    color: "#11B5A5",
    dato: "Capital de la salsa, ciudad más poblada del suroccidente",
    center: [-76.5, 3.8],
    coordinates: [
      [-75.8, 5.0], [-76.5, 5.2], [-77.0, 4.8], [-77.3, 4.0],
      [-77.0, 3.2], [-76.3, 3.0], [-75.8, 3.5], [-75.8, 5.0]
    ]
  },
  {
    id: 21,
    nombre: "Cauca",
    capital: "Popayán",
    población: "1.464.488",
    area: "29.308 km²",
    region: "Pacífica",
    color: "#0FB396",
    dato: "Ciudad Blanca, famosa por su Semana Santa colonial",
    center: [-76.8, 2.5],
    coordinates: [
      [-75.8, 3.5], [-76.5, 3.5], [-77.0, 3.0], [-77.5, 2.5],
      [-77.3, 1.5], [-76.5, 1.3], [-75.8, 1.8], [-75.5, 2.5],
      [-75.8, 3.5]
    ]
  },
  {
    id: 22,
    nombre: "Nariño",
    capital: "Pasto",
    población: "1.335.521",
    area: "33.268 km²",
    region: "Pacífica",
    color: "#0AA080",
    dato: "Carnaval de Negros y Blancos, Patrimonio Cultural Inmaterial",
    center: [-77.3, 1.2],
    coordinates: [
      [-76.5, 2.0], [-77.3, 2.2], [-78.0, 1.8], [-78.5, 1.2],
      [-78.3, 0.5], [-77.8, 0.8], [-77.0, 0.6], [-76.5, 1.0],
      [-76.5, 2.0]
    ]
  },

  // REGIÓN ORINOQUÍA
  {
    id: 23,
    nombre: "Arauca",
    capital: "Arauca",
    población: "263.507",
    area: "23.818 km²",
    region: "Orinoquía",
    color: "#FEC868",
    dato: "Frontera con Venezuela, llanuras y cultura llanera",
    center: [-71.0, 7.0],
    coordinates: [
      [-70.2, 7.5], [-71.0, 7.8], [-71.8, 7.5], [-72.0, 7.0],
      [-71.8, 6.5], [-71.0, 6.2], [-70.5, 6.5], [-70.2, 7.0],
      [-70.2, 7.5]
    ]
  },
  {
    id: 24,
    nombre: "Casanare",
    capital: "Yopal",
    población: "423.302",
    area: "44.640 km²",
    region: "Orinoquía",
    color: "#FDB750",
    dato: "Tierra de llaneros, importante producción petrolera",
    center: [-71.5, 5.5],
    coordinates: [
      [-70.5, 6.5], [-71.5, 6.8], [-72.3, 6.5], [-72.8, 6.0],
      [-72.8, 5.0], [-72.3, 4.5], [-71.5, 4.3], [-70.8, 4.8],
      [-70.5, 5.5], [-70.5, 6.5]
    ]
  },
  {
    id: 25,
    nombre: "Vichada",
    capital: "Puerto Carreño",
    población: "107.808",
    area: "100.242 km²",
    region: "Orinoquía",
    color: "#FDA638",
    dato: "Departamento más oriental, frontera con Venezuela",
    center: [-69.5, 4.5],
    coordinates: [
      [-68.0, 6.0], [-69.5, 6.2], [-70.8, 5.8], [-71.0, 4.8],
      [-70.5, 3.5], [-69.5, 3.0], [-68.5, 3.5], [-68.0, 4.5],
      [-68.0, 6.0]
    ]
  },
  {
    id: 26,
    nombre: "Meta",
    capital: "Villavicencio",
    población: "1.059.972",
    area: "85.635 km²",
    region: "Orinoquía",
    color: "#FC9520",
    dato: "Puerta del Llano, importante centro agropecuario",
    center: [-73.0, 3.5],
    coordinates: [
      [-72.3, 4.8], [-73.3, 5.0], [-74.0, 4.5], [-74.3, 3.5],
      [-73.8, 2.5], [-73.0, 2.0], [-71.8, 2.3], [-71.5, 3.0],
      [-71.8, 4.0], [-72.3, 4.8]
    ]
  },

  // REGIÓN AMAZONÍA
  {
    id: 27,
    nombre: "Guainía",
    capital: "Inírida",
    población: "48.114",
    area: "72.238 km²",
    region: "Amazonía",
    color: "#26DE81",
    dato: "Estrella Fluvial del Inírida, formaciones rocosas milenarias",
    center: [-68.5, 2.5],
    coordinates: [
      [-67.0, 4.0], [-68.5, 4.2], [-69.5, 3.5], [-69.8, 2.5],
      [-69.5, 1.5], [-68.5, 1.0], [-67.5, 1.5], [-67.0, 2.5],
      [-67.0, 4.0]
    ]
  },
  {
    id: 28,
    nombre: "Guaviare",
    capital: "San José del Guaviare",
    población: "111.060",
    area: "53.460 km²",
    region: "Amazonía",
    color: "#20BF6B",
    dato: "Puerta de entrada al Amazonas, arte rupestre milenario",
    center: [-72.5, 1.8],
    coordinates: [
      [-71.5, 3.0], [-72.5, 3.2], [-73.5, 2.8], [-73.8, 2.0],
      [-73.5, 1.0], [-72.5, 0.8], [-71.8, 1.2], [-71.5, 2.0],
      [-71.5, 3.0]
    ]
  },
  {
    id: 29,
    nombre: "Vaupés",
    capital: "Mitú",
    población: "48.144",
    area: "54.135 km²",
    region: "Amazonía",
    color: "#2ECC71",
    dato: "Gran diversidad indígena, selva amazónica virgen",
    center: [-70.5, 0.5],
    coordinates: [
      [-69.2, 2.0], [-70.5, 2.2], [-71.5, 1.8], [-71.8, 1.0],
      [-71.5, -0.3], [-70.5, -0.8], [-69.5, -0.5], [-69.2, 0.5],
      [-69.2, 2.0]
    ]
  },
  {
    id: 30,
    nombre: "Caquetá",
    capital: "Florencia",
    población: "410.521",
    area: "88.965 km²",
    region: "Amazonía",
    color: "#27AE60",
    dato: "Transición entre Andes y Amazonía, gran biodiversidad",
    center: [-74.5, 0.8],
    coordinates: [
      [-73.5, 2.5], [-74.8, 2.8], [-75.8, 2.3], [-76.0, 1.5],
      [-75.5, 0.5], [-74.8, -0.3], [-73.8, -0.5], [-73.0, 0.0],
      [-73.0, 1.5], [-73.5, 2.5]
    ]
  },
  {
    id: 31,
    nombre: "Putumayo",
    capital: "Mocoa",
    población: "359.875",
    area: "24.885 km²",
    region: "Amazonía",
    color: "#229954",
    dato: "Frontera con Ecuador, rica en petróleo y biodiversidad",
    center: [-76.3, 0.5],
    coordinates: [
      [-75.5, 1.5], [-76.5, 1.8], [-77.3, 1.3], [-77.8, 0.5],
      [-77.5, -0.3], [-76.8, -0.8], [-76.0, -0.5], [-75.5, 0.3],
      [-75.5, 1.5]
    ]
  },
  {
    id: 32,
    nombre: "Amazonas",
    capital: "Leticia",
    población: "79.704",
    area: "109.665 km²",
    region: "Amazonía",
    color: "#1E8449",
    dato: "Departamento más austral, triple frontera (Brasil, Perú, Colombia)",
    center: [-70.5, -2.5],
    coordinates: [
      [-69.0, 0.0], [-70.5, 0.3], [-72.0, 0.0], [-73.0, -1.0],
      [-72.5, -2.5], [-71.5, -3.5], [-70.0, -4.0], [-68.5, -3.5],
      [-68.0, -2.0], [-68.5, -0.5], [-69.0, 0.0]
    ]
  }
];

// Colores por región (mantenidos del original)
export const regionColors = {
  "Caribe": "#FFB84D",
  "Andina": "#4A90E2",
  "Pacífica": "#00D2D3",
  "Orinoquía": "#FDB750",
  "Amazonía": "#26DE81",
};
