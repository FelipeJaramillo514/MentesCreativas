import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * TecnologiaView - Sección de Tecnología y Pensamiento Lógico
 * Incluye: Constructor de bloques 3D y simulador de robot programable
 */

// Tipos de bloques disponibles
const blockTypes = [
  { id: "grass", name: "Césped", color: "#10B981" },
  { id: "stone", name: "Piedra", color: "#6B7280" },
  { id: "wood", name: "Madera", color: "#92400E" },
  { id: "sand", name: "Arena", color: "#FCD34D" },
];

// Componente de bloque individual
function Block({ position, color, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Box
      ref={meshRef}
      args={[1, 1, 1]}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial 
        color={color}
        emissive={hovered ? "#ffffff" : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </Box>
  );
}

// Robot programable
function Robot({ position, rotation, isMoving }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && isMoving) {
      groupRef.current.position.y += Math.sin(Date.now() * 0.01) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Cuerpo del robot */}
      <Box args={[0.8, 1, 0.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.3} />
      </Box>
      
      {/* Cabeza */}
      <Box args={[0.6, 0.5, 0.6]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#60A5FA" />
      </Box>
      
      {/* Ojos */}
      <Box args={[0.15, 0.15, 0.1]} position={[-0.15, 1.3, 0.31]}>
        <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={1} />
      </Box>
      <Box args={[0.15, 0.15, 0.1]} position={[0.15, 1.3, 0.31]}>
        <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={1} />
      </Box>
      
      {/* Brazos */}
      <Box args={[0.2, 0.8, 0.2]} position={[-0.5, 0.5, 0]}>
        <meshStandardMaterial color="#2563EB" />
      </Box>
      <Box args={[0.2, 0.8, 0.2]} position={[0.5, 0.5, 0]}>
        <meshStandardMaterial color="#2563EB" />
      </Box>
    </group>
  );
}

// Escena de construcción
function ConstructionScene({ blocks, onBlockClick, selectedBlock, mode }: any) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.3} />

      {/* Suelo */}
      <mesh 
        position={[0, -0.5, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          if (mode === "build" && selectedBlock) {
            e.stopPropagation();
            const x = Math.floor(e.point.x);
            const z = Math.floor(e.point.z);
            onBlockClick([x, 0, z]);
          }
        }}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#A7F3D0" />
      </mesh>

      {/* Grid de ayuda */}
      <gridHelper args={[20, 20, "#10B981", "#6EE7B7"]} position={[0, -0.49, 0]} />

      {/* Bloques colocados */}
      {blocks.map((block: any, index: number) => (
        <Block
          key={index}
          position={block.position}
          color={block.color}
          onClick={() => mode === "delete" && blocks.splice(index, 1)}
        />
      ))}

      <OrbitControls 
        maxPolarAngle={Math.PI / 2.2}
        minDistance={5}
        maxDistance={25}
      />
    </>
  );
}

// Escena del robot
function RobotScene({ robotPosition, robotRotation, isMoving }: any) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#DBEAFE" />
      </mesh>
      
      <gridHelper args={[15, 15, "#3B82F6", "#93C5FD"]} position={[0, -0.49, 0]} />
      
      <Robot 
        position={robotPosition}
        rotation={robotRotation}
        isMoving={isMoving}
      />
      
      <OrbitControls />
    </>
  );
}

export default function TecnologiaView() {
  const [activeTab, setActiveTab] = useState<"blocks" | "robot">("blocks");
  
  // Estado para constructor de bloques
  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedBlockType, setSelectedBlockType] = useState(blockTypes[0]);
  const [buildMode, setBuildMode] = useState<"build" | "delete">("build");
  
  // Estado para robot
  const [robotPosition, setRobotPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [robotRotation, setRobotRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [program, setProgram] = useState<string[]>([]);

  // Funciones para bloques
  const handleBlockPlace = (position: [number, number, number]) => {
    const newBlock = {
      position: [position[0], position[1] + blocks.filter(b => 
        b.position[0] === position[0] && b.position[2] === position[2]
      ).length, position[2]],
      color: selectedBlockType.color,
    };
    setBlocks([...blocks, newBlock]);
  };

  // Funciones para robot
  const executeCommand = (command: string) => {
    setIsMoving(true);
    setProgram([...program, command]);
    
    setTimeout(() => {
      switch (command) {
        case "forward":
          setRobotPosition(prev => [
            prev[0] + Math.sin(robotRotation),
            prev[1],
            prev[2] + Math.cos(robotRotation)
          ]);
          break;
        case "backward":
          setRobotPosition(prev => [
            prev[0] - Math.sin(robotRotation),
            prev[1],
            prev[2] - Math.cos(robotRotation)
          ]);
          break;
        case "left":
          setRobotRotation(prev => prev + Math.PI / 2);
          break;
        case "right":
          setRobotRotation(prev => prev - Math.PI / 2);
          break;
      }
      setIsMoving(false);
    }, 500);
  };

  const resetRobot = () => {
    setRobotPosition([0, 0, 0]);
    setRobotRotation(0);
    setProgram([]);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-50 to-pink-100 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 p-6"
      >
        <h1 className="text-4xl font-bold text-purple-900 mb-2">
          🤖 Tecnología y Pensamiento Lógico
        </h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveTab("blocks")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "blocks"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-purple-600 hover:bg-purple-100"
            }`}
          >
            🧱 Constructor de Bloques
          </button>
          <button
            onClick={() => setActiveTab("robot")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "robot"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-purple-600 hover:bg-purple-100"
            }`}
          >
            🤖 Programar Robot
          </button>
        </div>
      </motion.div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [8, 8, 8], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        {activeTab === "blocks" ? (
          <ConstructionScene
            blocks={blocks}
            onBlockClick={handleBlockPlace}
            selectedBlock={selectedBlockType}
            mode={buildMode}
          />
        ) : (
          <RobotScene
            robotPosition={robotPosition}
            robotRotation={robotRotation}
            isMoving={isMoving}
          />
        )}
      </Canvas>

      {/* Panel de controles */}
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-32 left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm z-20"
      >
        {activeTab === "blocks" ? (
          <>
            <h3 className="text-2xl font-bold mb-4 text-purple-900">Herramientas</h3>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Modo:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setBuildMode("build")}
                  className={`flex-1 py-2 rounded-lg font-bold ${
                    buildMode === "build"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  🏗️ Construir
                </button>
                <button
                  onClick={() => setBuildMode("delete")}
                  className={`flex-1 py-2 rounded-lg font-bold ${
                    buildMode === "delete"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  🗑️ Borrar
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Tipo de bloque:</p>
              <div className="grid grid-cols-2 gap-2">
                {blockTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedBlockType(type)}
                    className={`p-3 rounded-lg font-bold border-2 ${
                      selectedBlockType.id === type.id
                        ? "border-purple-600 scale-105"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: type.color, color: "white" }}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setBlocks([])}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition"
            >
              🗑️ Limpiar Todo
            </button>

            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-900">
                📦 Bloques colocados: <strong>{blocks.length}</strong>
              </p>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4 text-purple-900">Controles del Robot</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div></div>
              <button
                onClick={() => executeCommand("forward")}
                disabled={isMoving}
                className="bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50 text-2xl"
              >
                ⬆️
              </button>
              <div></div>
              
              <button
                onClick={() => executeCommand("left")}
                disabled={isMoving}
                className="bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50 text-2xl"
              >
                ⬅️
              </button>
              <button
                onClick={() => executeCommand("backward")}
                disabled={isMoving}
                className="bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50 text-2xl"
              >
                ⬇️
              </button>
              <button
                onClick={() => executeCommand("right")}
                disabled={isMoving}
                className="bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50 text-2xl"
              >
                ➡️
              </button>
            </div>

            <button
              onClick={resetRobot}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition mb-4"
            >
              🔄 Reiniciar Robot
            </button>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-bold text-blue-900 mb-2">Programa ejecutado:</p>
              <div className="text-xs text-blue-700 max-h-24 overflow-y-auto">
                {program.length > 0 ? (
                  program.map((cmd, i) => (
                    <div key={i}>
                      {i + 1}. {cmd === "forward" ? "⬆️ Adelante" :
                         cmd === "backward" ? "⬇️ Atrás" :
                         cmd === "left" ? "⬅️ Izquierda" : "➡️ Derecha"}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Sin comandos...</p>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
