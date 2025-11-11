import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * GeografiaView - Sección de Ciencias Sociales / Geografía
 * Mapa 3D interactivo de Colombia con información de departamentos
 */

// Datos completos de los 32 departamentos de Colombia + Bogotá D.C.
const departamentos = [
  // REGIÓN CARIBE
  { id: 1, nombre: "La Guajira", capital: "Riohacha", población: "957.797", area: "20.848 km²", region: "Caribe", color: "#FF6B6B", position: [3, 4.5, 0], size: [1.2, 0.3, 1.5], dato: "Territorio del pueblo Wayúu, la comunidad indígena más grande de Colombia" },
  { id: 2, nombre: "Cesar", capital: "Valledupar", población: "1.295.387", area: "22.905 km²", region: "Caribe", color: "#FF8E53", position: [2, 3.5, 0], size: [1.1, 0.3, 1.3], dato: "Cuna del vallenato, patrimonio inmaterial de la humanidad" },
  { id: 3, nombre: "Magdalena", capital: "Santa Marta", población: "1.410.968", area: "23.188 km²", region: "Caribe", color: "#FFA07A", position: [1.5, 4, 0], size: [1.2, 0.3, 1.4], dato: "Posee la Sierra Nevada, la montaña costera más alta del mundo" },
  { id: 4, nombre: "Atlántico", capital: "Barranquilla", población: "2.721.398", area: "3.388 km²", region: "Caribe", color: "#FFB347", position: [0.5, 4.2, 0], size: [0.7, 0.4, 0.8], dato: "Puerta de Oro de Colombia, importante puerto caribeño" },
  { id: 5, nombre: "Bolívar", capital: "Cartagena", población: "2.229.054", area: "25.978 km²", region: "Caribe", color: "#FFCC33", position: [0, 3, 0], size: [1.5, 0.3, 1.6], dato: "Ciudad amurallada, Patrimonio de la Humanidad UNESCO" },
  { id: 6, nombre: "Sucre", capital: "Sincelejo", población: "904.863", area: "10.917 km²", region: "Caribe", color: "#FFD700", position: [-0.5, 2.5, 0], size: [1, 0.3, 1], dato: "Tierra de las sabanas y del porro, ritmo tradicional" },
  { id: 7, nombre: "Córdoba", capital: "Montería", población: "1.828.947", area: "25.020 km²", region: "Caribe", color: "#FFE066", position: [-1.5, 3, 0], size: [1.3, 0.3, 1.4], dato: "Gran productor ganadero y agrícola de Colombia" },
  
  // REGIÓN ANDINA
  { id: 8, nombre: "Antioquia", capital: "Medellín", población: "6.677.930", area: "63.612 km²", region: "Andina", color: "#4ECDC4", position: [-2.5, 1.5, 0], size: [2, 0.5, 2], dato: "Departamento más poblado después de Bogotá, cuna de la cultura paisa" },
  { id: 9, nombre: "Santander", capital: "Bucaramanga", población: "2.184.837", area: "30.537 km²", region: "Andina", color: "#45B7D1", position: [1, 2, 0], size: [1.5, 0.4, 1.5], dato: "Tierra de aventura, famoso por el Cañón del Chicamocha" },
  { id: 10, nombre: "Norte de Santander", capital: "Cúcuta", población: "1.508.268", area: "21.658 km²", region: "Andina", color: "#5DADE2", position: [2, 2.5, 0], size: [1.2, 0.3, 1.3], dato: "Frontera con Venezuela, ciudad de la Batalla de Cúcuta" },
  { id: 11, nombre: "Boyacá", capital: "Tunja", población: "1.242.954", area: "23.189 km²", region: "Andina", color: "#3498DB", position: [0.5, 1.5, 0], size: [1.4, 0.3, 1.4], dato: "Cuna de la independencia, Batalla del Puente de Boyacá" },
  { id: 12, nombre: "Cundinamarca", capital: "Bogotá", población: "3.242.537", area: "24.210 km²", region: "Andina", color: "#2E86DE", position: [0, 0.5, 0], size: [1.5, 0.4, 1.5], dato: "Rodea a Bogotá D.C., diversidad de climas y paisajes" },
  { id: 13, nombre: "Bogotá D.C.", capital: "Bogotá", población: "8.380.801", area: "1.587 km²", region: "Andina", color: "#1E3A8A", position: [0, 0, 0], size: [0.6, 0.6, 0.6], dato: "Capital de Colombia, centro político y económico del país" },
  { id: 14, nombre: "Caldas", capital: "Manizales", población: "1.018.453", area: "7.888 km²", region: "Andina", color: "#6C5CE7", position: [-1.5, 0, 0], size: [0.9, 0.3, 1], dato: "Parte del Eje Cafetero, Paisaje Cultural Cafetero UNESCO" },
  { id: 15, nombre: "Risaralda", capital: "Pereira", población: "1.007.525", area: "4.140 km²", region: "Andina", color: "#A29BFE", position: [-2, -0.5, 0], size: [0.8, 0.3, 0.9], dato: "Ciudad de las puertas abiertas, centro del Eje Cafetero" },
  { id: 16, nombre: "Quindío", capital: "Armenia", población: "565.310", area: "1.845 km²", region: "Andina", color: "#B8B5FF", position: [-2.5, -1, 0], size: [0.6, 0.3, 0.7], dato: "Corazón del Eje Cafetero, Valle de Cocora con palmas de cera" },
  { id: 17, nombre: "Tolima", capital: "Ibagué", población: "1.425.609", area: "23.562 km²", region: "Andina", color: "#8B7EC8", position: [-0.5, -0.5, 0], size: [1.4, 0.3, 1.5], dato: "Capital musical de Colombia, Nevado del Tolima" },
  { id: 18, nombre: "Huila", capital: "Neiva", población: "1.009.548", area: "19.890 km²", region: "Andina", color: "#9B8FBF", position: [0.5, -1, 0], size: [1.3, 0.3, 1.3], dato: "Parque Arqueológico de San Agustín, Patrimonio UNESCO" },
  
  // REGIÓN PACÍFICA
  { id: 19, nombre: "Chocó", capital: "Quibdó", población: "534.826", area: "46.530 km²", region: "Pacífica", color: "#00D2D3", position: [-3.5, 2, 0], size: [1.6, 0.3, 1.8], dato: "Una de las regiones con mayor biodiversidad del planeta" },
  { id: 20, nombre: "Valle del Cauca", capital: "Cali", población: "4.660.386", area: "22.140 km²", region: "Pacífica", color: "#11B5A5", position: [-3, -1.5, 0], size: [1.4, 0.4, 1.5], dato: "Capital de la salsa, ciudad más poblada del suroccidente" },
  { id: 21, nombre: "Cauca", capital: "Popayán", población: "1.464.488", area: "29.308 km²", region: "Pacífica", color: "#0FB396", position: [-2, -2.5, 0], size: [1.5, 0.3, 1.6], dato: "Ciudad Blanca, famosa por su Semana Santa colonial" },
  { id: 22, nombre: "Nariño", capital: "Pasto", población: "1.335.521", area: "33.268 km²", region: "Pacífica", color: "#0AA080", position: [-1, -3.5, 0], size: [1.6, 0.3, 1.5], dato: "Carnaval de Negros y Blancos, Patrimonio Cultural Inmaterial" },
  
  // REGIÓN ORINOQUÍA
  { id: 23, nombre: "Arauca", capital: "Arauca", población: "263.507", area: "23.818 km²", region: "Orinoquía", color: "#FEC868", position: [3, 1, 0], size: [1.3, 0.2, 1.2], dato: "Frontera con Venezuela, llanuras y cultura llanera" },
  { id: 24, nombre: "Casanare", capital: "Yopal", población: "423.302", area: "44.640 km²", region: "Orinoquía", color: "#FDB750", position: [2, 0, 0], size: [1.6, 0.2, 1.5], dato: "Tierra de llaneros, importante producción petrolera" },
  { id: 25, nombre: "Vichada", capital: "Puerto Carreño", población: "107.808", area: "100.242 km²", region: "Orinoquía", color: "#FDA638", position: [3.5, -0.5, 0], size: [2, 0.2, 1.8], dato: "Departamento más oriental, frontera con Venezuela" },
  { id: 26, nombre: "Meta", capital: "Villavicencio", población: "1.059.972", area: "85.635 km²", region: "Orinoquía", color: "#FC9520", position: [1.5, -0.5, 0], size: [2, 0.3, 1.8], dato: "Puerta del Llano, importante centro agropecuario" },
  
  // REGIÓN AMAZONÍA
  { id: 27, nombre: "Guainía", capital: "Inírida", población: "48.114", area: "72.238 km²", region: "Amazonía", color: "#26DE81", position: [3, -2, 0], size: [1.8, 0.2, 1.6], dato: "Estrella Fluvial del Inírida, formaciones rocosas milenarias" },
  { id: 28, nombre: "Guaviare", capital: "San José del Guaviare", población: "111.060", area: "53.460 km²", region: "Amazonía", color: "#20BF6B", position: [2, -2, 0], size: [1.6, 0.2, 1.5], dato: "Puerta de entrada al Amazonas, arte rupestre milenario" },
  { id: 29, nombre: "Vaupés", capital: "Mitú", población: "48.144", area: "54.135 km²", region: "Amazonía", color: "#2ECC71", position: [2.5, -3, 0], size: [1.5, 0.2, 1.5], dato: "Gran diversidad indígena, selva amazónica virgen" },
  { id: 30, nombre: "Caquetá", capital: "Florencia", población: "410.521", area: "88.965 km²", region: "Amazonía", color: "#27AE60", position: [0.5, -2.5, 0], size: [2, 0.2, 1.8], dato: "Transición entre Andes y Amazonía, gran biodiversidad" },
  { id: 31, nombre: "Putumayo", capital: "Mocoa", población: "359.875", area: "24.885 km²", region: "Amazonía", color: "#229954", position: [-0.5, -3, 0], size: [1.4, 0.2, 1.4], dato: "Frontera con Ecuador, rica en petróleo y biodiversidad" },
  { id: 32, nombre: "Amazonas", capital: "Leticia", población: "79.704", area: "109.665 km²", region: "Amazonía", color: "#1E8449", position: [1, -4, 0], size: [2.2, 0.2, 1.8], dato: "Departamento más austral, triple frontera (Brasil, Perú, Colombia)" },
];

// Colores por región
const regionColors = {
  "Caribe": "#FFB84D",
  "Andina": "#4A90E2",
  "Pacífica": "#00D2D3",
  "Orinoquía": "#FDB750",
  "Amazonía": "#26DE81",
};

// Componente de región 3D interactiva con diseño profesional
function Region3D({ region, onClick, isSelected, isHoveredRegion }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outlineRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Animación sutil de flotación
      const baseY = region.position[1];
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.8 + region.id * 0.5) * 0.05;
      meshRef.current.position.y = baseY + floatOffset;
      
      // Efecto hover y selección con animación suave
      const targetScaleXZ = (hovered || isSelected) ? 1.15 : (isHoveredRegion ? 1.08 : 1);
      const targetScaleY = (hovered || isSelected) ? 1.4 : (isHoveredRegion ? 1.2 : 1);
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScaleXZ, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScaleXZ, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScaleY, 0.1);

      // Rotación sutil cuando está seleccionado
      if (isSelected) {
        meshRef.current.rotation.y += 0.01;
      }
    }

    // Animación del contorno
    if (outlineRef.current && (hovered || isSelected)) {
      outlineRef.current.rotation.y += 0.02;
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      outlineRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Contorno brillante al hacer hover o seleccionar */}
      {(hovered || isSelected) && (
        <mesh
          ref={outlineRef}
          position={[region.position[0], region.position[1] - 0.1, region.position[2]]}
        >
          <cylinderGeometry args={[region.size[0] * 0.6, region.size[2] * 0.6, 0.05, 32]} />
          <meshBasicMaterial color={isSelected ? "#FFD700" : "#FFFFFF"} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Departamento 3D */}
      <mesh
        ref={meshRef}
        position={region.position}
        onClick={() => onClick(region)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={region.size} />
        <meshStandardMaterial 
          color={isSelected ? "#FFD700" : region.color} 
          emissive={isSelected ? "#FFA500" : (hovered ? "#FFFFFF" : "#000000")}
          emissiveIntensity={isSelected ? 0.5 : (hovered ? 0.3 : 0)}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Etiqueta del departamento */}
      {(hovered || isSelected) && (
        <Html position={[region.position[0], region.position[1] + region.size[1] + 0.5, region.position[2]]} center>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg shadow-xl font-bold text-sm whitespace-nowrap animate-pulse">
            {region.nombre}
          </div>
        </Html>
      )}
    </group>
  );
}

// Escena 3D del mapa profesional
function MapaScene({ onRegionClick, selectedRegion, hoveredRegion }: any) {
  return (
    <>
      {/* Iluminación profesional */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.6} />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />
      <spotLight position={[0, 20, 0]} angle={0.5} penumbra={0.5} intensity={0.5} castShadow />

      {/* Base del mapa con degradado */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#0F172A" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Grid de referencia */}
      <gridHelper args={[25, 25, "#1E293B", "#1E293B"]} position={[0, -0.99, 0]} />

      {/* Título 3D principal */}
      <Text
        position={[0, 6, 0]}
        fontSize={1.2}
        color="#FBBF24"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        REPÚBLICA DE COLOMBIA
      </Text>

      {/* Subtítulo */}
      <Text
        position={[0, 5.2, 0]}
        fontSize={0.4}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        32 Departamentos + Distrito Capital
      </Text>

      {/* Leyenda de regiones */}
      {Object.entries(regionColors).map(([region, color], index) => (
        <group key={region} position={[-8, 4.5 - index * 0.7, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <Text
            position={[0.8, 0, 0]}
            fontSize={0.3}
            color="#FFFFFF"
            anchorX="left"
            anchorY="middle"
          >
            {region}
          </Text>
        </group>
      ))}

      {/* Regiones interactivas */}
      {departamentos.map((dept) => (
        <Region3D
          key={dept.id}
          region={dept}
          onClick={onRegionClick}
          isSelected={selectedRegion?.id === dept.id}
          isHoveredRegion={hoveredRegion === dept.region}
        />
      ))}

      {/* Controles de órbita mejorados */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={30}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export default function GeografiaView() {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [filterRegion, setFilterRegion] = useState<string | null>(null);

  const filteredDepartamentos = filterRegion 
    ? departamentos.filter(dept => dept.region === filterRegion)
    : departamentos;

  // Estadísticas por región
  const regionStats = Object.keys(regionColors).map(region => ({
    nombre: region,
    color: regionColors[region as keyof typeof regionColors],
    total: departamentos.filter(d => d.region === region).length,
  }));

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header profesional */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-2">
            🗺️ Mapa Interactivo de Colombia
          </h1>
          <p className="text-lg text-blue-200">
            Explora los 32 departamentos y el Distrito Capital • Información completa y actualizada
          </p>
        </div>
      </motion.div>

      {/* Filtros por región */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-32 left-6 z-20 space-y-2"
      >
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/10">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span> Filtrar por Región
          </h3>
          <button
            onClick={() => { setFilterRegion(null); setHoveredRegion(null); }}
            className={`w-full mb-2 px-4 py-2 rounded-lg font-semibold transition ${
              !filterRegion 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Todas las regiones
          </button>
          {regionStats.map((region) => (
            <button
              key={region.nombre}
              onClick={() => setFilterRegion(region.nombre)}
              onMouseEnter={() => setHoveredRegion(region.nombre)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`w-full mb-2 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                filterRegion === region.nombre 
                  ? 'shadow-lg transform scale-105' 
                  : 'hover:transform hover:scale-105'
              }`}
              style={{ 
                backgroundColor: filterRegion === region.nombre ? region.color : '#374151',
                color: filterRegion === region.nombre ? '#000' : '#fff',
              }}
            >
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: region.color }}></span>
              {region.nombre} ({region.total})
            </button>
          ))}
        </div>

        {/* Estadísticas generales */}
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/10">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span className="text-xl">📊</span> Estadísticas
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Total:</span> 33 divisiones
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Regiones:</span> 5 naturales
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Mostrando:</span> {filteredDepartamentos.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 8, 18], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        shadows
      >
        <MapaScene 
          onRegionClick={setSelectedRegion}
          selectedRegion={selectedRegion}
          hoveredRegion={hoveredRegion}
        />
      </Canvas>

      {/* Panel de información detallada */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 300 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 300 }}
          className="absolute top-24 right-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6 max-w-md z-20 border-2 border-yellow-500/50"
        >
          <button
            onClick={() => setSelectedRegion(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold transition"
          >
            ×
          </button>
          
          <div className="mb-4 pb-4 border-b border-gray-700">
            <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {selectedRegion.nombre}
            </h2>
            <div className="flex items-center gap-2">
              <span 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: selectedRegion.color }}
              ></span>
              <span className="text-gray-300 font-semibold">Región {selectedRegion.region}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🏛️</span>
                <div>
                  <p className="text-sm text-gray-400">Capital</p>
                  <p className="text-xl font-bold text-white">{selectedRegion.capital}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-xs text-gray-400">Población</p>
                    <p className="text-sm font-bold text-white">{selectedRegion.población}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">📏</span>
                  <div>
                    <p className="text-xs text-gray-400">Área</p>
                    <p className="text-sm font-bold text-white">{selectedRegion.area}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-500/30">
              <p className="text-sm text-blue-100 leading-relaxed">
                <span className="text-xl mr-2">💡</span>
                <strong className="text-yellow-400">Dato interesante:</strong>
                <br />
                {selectedRegion.dato}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instrucciones mejoradas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md rounded-xl p-4 max-w-xs z-10 border border-white/10"
      >
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-xl">🎮</span> Controles Interactivos
        </h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs">🖱️</span>
            <span><strong>Arrastrar:</strong> Rotar vista del mapa</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-xs">🔍</span>
            <span><strong>Scroll:</strong> Acercar o alejar</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-xs">👆</span>
            <span><strong>Click:</strong> Ver información detallada</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center text-xs">🎯</span>
            <span><strong>Filtros:</strong> Explorar por región</span>
          </li>
        </ul>
      </motion.div>

      {/* Indicador de departamentos visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 z-10 border border-white/10"
      >
        <p className="text-white text-sm font-semibold">
          <span className="text-yellow-400">{filteredDepartamentos.length}</span> / 33 departamentos visibles
        </p>
      </motion.div>
    </div>
  );
}
