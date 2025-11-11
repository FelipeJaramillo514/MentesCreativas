import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * ArteView - Sección de Arte y Creatividad
 * Incluye: Pintura 3D en el aire y escultura digital moldeable
 * Versión mejorada con más controles y funcionalidades
 */

// Componente de trazo 3D para pintura con grosor real usando TubeGeometry
function PaintStroke({ points, color, thickness }: any) {
  if (points.length < 2) return null;

  // Crear curva a partir de los puntos
  const curve = new THREE.CatmullRomCurve3(
    points.map((p: number[]) => new THREE.Vector3(p[0], p[1], p[2]))
  );

  // Crear geometría de tubo con grosor real
  const tubeGeometry = new THREE.TubeGeometry(
    curve,
    points.length * 2, // Segmentos
    thickness * 0.02,  // Radio del tubo (multiplicador para hacer más visible)
    8,                  // Segmentos radiales
    false               // Cerrado
  );

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial 
        color={color} 
        roughness={0.4}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Componente de esfera moldeable para escultura
function SculptSphere({ position, scale, color, onDrag, onScaleChange, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useFrame(() => {
    if (meshRef.current && hovered && !isDragging) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerMove={(e) => {
        if (isDragging) {
          onDrag(index, e.point);
        }
      }}
      onWheel={(e) => {
        e.stopPropagation();
        const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
        if (newScale > 0.3 && newScale < 3) {
          onScaleChange(index, newScale);
        }
      }}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.7}
        emissive={hovered ? "#ffffff" : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
      {hovered && (
        <lineSegments>
          <edgesGeometry args={[new THREE.SphereGeometry(0.5, 32, 32)]} />
          <lineBasicMaterial color="#ffffff" />
        </lineSegments>
      )}
    </mesh>
  );
}

// Escena de pintura 3D mejorada con controles separados
function PaintScene({ strokes, isDrawing, currentStroke, brushColor, brushSize, onPointerMove }: any) {
  const controlsRef = useRef<any>(null);
  const { camera, gl } = useThree();
  const [cursorPosition, setCursorPosition] = useState<THREE.Vector3>(new THREE.Vector3());

  // Actualizar posición del cursor 3D
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const direction = raycaster.ray.direction;
      const distance = 8;
      const position = camera.position.clone().add(direction.multiplyScalar(distance));
      setCursorPosition(position);

      // Si está dibujando, agregar punto
      if (isDrawing) {
        onPointerMove(position);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [isDrawing, camera, gl.domElement, onPointerMove]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />

      {/* Grid de referencia */}
      <gridHelper args={[20, 20, "#A78BFA", "#E9D5FF"]} position={[0, -3, 0]} />

      {/* Trazos guardados */}
      {strokes.map((stroke: any, index: number) => (
        <PaintStroke
          key={index}
          points={stroke.points}
          color={stroke.color}
          thickness={stroke.thickness}
        />
      ))}

      {/* Trazo actual */}
      {isDrawing && currentStroke.length > 0 && (
        <PaintStroke
          points={currentStroke}
          color={brushColor}
          thickness={brushSize}
        />
      )}

      {/* Cursor de pincel visible */}
      <mesh position={cursorPosition}>
        <sphereGeometry args={[brushSize * 0.02, 16, 16]} />
        <meshStandardMaterial color={brushColor} transparent opacity={0.8} emissive={brushColor} emissiveIntensity={0.5} />
      </mesh>
      {/* Aro exterior del cursor */}
      <mesh position={cursorPosition} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[brushSize * 0.022, brushSize * 0.026, 32]} />
        <meshBasicMaterial color={brushColor} side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* OrbitControls solo con botón derecho */}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true} 
        enableZoom={true}
        mouseButtons={{
          LEFT: undefined, // Desactivar click izquierdo para OrbitControls
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE // Solo botón derecho para rotar
        }}
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_ROTATE
        }}
      />
    </>
  );
}

// Escena de escultura mejorada
function SculptScene({ spheres, onSphereDrag, onSphereScale }: any) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6ec7" />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

      {/* Pedestal mejorado */}
      <mesh position={[0, -2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3, 3.5, 0.5, 32]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#0f3460"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Anillo decorativo */}
      <mesh position={[0, -1.7, 0]}>
        <torusGeometry args={[3.2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#16213e" metalness={1} roughness={0} />
      </mesh>

      {/* Esferas de la escultura */}
      {spheres.map((sphere: any, index: number) => (
        <SculptSphere
          key={index}
          position={sphere.position}
          scale={sphere.scale}
          color={sphere.color}
          index={index}
          onDrag={onSphereDrag}
          onScaleChange={onSphereScale}
        />
      ))}

      {/* Plano de sombras */}
      <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      <OrbitControls 
        enableDamping
        dampingFactor={0.05}
        maxDistance={15}
        minDistance={3}
      />
    </>
  );
}

export default function ArteView() {
  const [activeTab, setActiveTab] = useState<"paint" | "sculpt">("paint");

  // Estado para pintura 3D
  const [strokes, setStrokes] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);
  const [brushColor, setBrushColor] = useState("#EF4444");
  const [brushSize, setBrushSize] = useState(3);

  // Estado para escultura
  const [spheres, setSpheres] = useState<any[]>([
    { position: [0, 0, 0], scale: 1, color: "#8B5CF6" },
  ]);
  const [sculptColor, setSculptColor] = useState("#8B5CF6");
  const [selectedSphere, setSelectedSphere] = useState<number | null>(null);

  // Funciones de pintura mejoradas
  const startDrawing = (e: React.MouseEvent) => {
    // Solo iniciar dibujo con click izquierdo
    if (e.button === 0) {
      setIsDrawing(true);
      setCurrentStroke([]);
    }
  };

  const stopDrawing = () => {
    if (currentStroke.length > 1) {
      setStrokes([...strokes, { points: currentStroke, color: brushColor, thickness: brushSize }]);
    }
    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const handlePointerMove = (position: THREE.Vector3) => {
    if (isDrawing) {
      setCurrentStroke([...currentStroke, [position.x, position.y, position.z]]);
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
  };

  const undoLastStroke = () => {
    if (strokes.length > 0) {
      setStrokes(strokes.slice(0, -1));
    }
  };

  // Funciones de escultura mejoradas
  const addSphere = () => {
    const randomPos: [number, number, number] = [
      (Math.random() - 0.5) * 3,
      Math.random() * 2,
      (Math.random() - 0.5) * 3,
    ];
    setSpheres([...spheres, { position: randomPos, scale: 1, color: sculptColor }]);
  };

  const handleSphereDrag = (index: number, newPosition: THREE.Vector3) => {
    const updatedSpheres = [...spheres];
    updatedSpheres[index].position = [newPosition.x, newPosition.y, newPosition.z];
    setSpheres(updatedSpheres);
  };

  const handleSphereScale = (index: number, newScale: number) => {
    const updatedSpheres = [...spheres];
    updatedSpheres[index].scale = newScale;
    setSpheres(updatedSpheres);
  };

  const removeSphere = (index: number) => {
    if (spheres.length > 1) {
      setSpheres(spheres.filter((_, i) => i !== index));
    }
  };

  const duplicateSphere = (index: number) => {
    const sphere = spheres[index];
    const newSphere = {
      ...sphere,
      position: [
        sphere.position[0] + 0.5,
        sphere.position[1],
        sphere.position[2] + 0.5
      ]
    };
    setSpheres([...spheres, newSphere]);
  };

  const changeSphereColor = (index: number, color: string) => {
    const updatedSpheres = [...spheres];
    updatedSpheres[index].color = color;
    setSpheres(updatedSpheres);
  };

  const clearSculpture = () => {
    setSpheres([{ position: [0, 0, 0], scale: 1, color: "#8B5CF6" }]);
  };

  const colors = [
    { name: "Rojo", value: "#EF4444" },
    { name: "Azul", value: "#3B82F6" },
    { name: "Verde", value: "#10B981" },
    { name: "Amarillo", value: "#F59E0B" },
    { name: "Morado", value: "#8B5CF6" },
    { name: "Rosa", value: "#EC4899" },
    { name: "Naranja", value: "#F97316" },
    { name: "Cyan", value: "#06B6D4" },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-50 to-red-100 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 p-6"
      >
        <h1 className="text-4xl font-bold text-orange-900 mb-2">
          🎨 Arte y Creatividad
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveTab("paint")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "paint"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-white text-orange-600 hover:bg-orange-100"
            }`}
          >
            🖌️ Pintura 3D
          </button>
          <button
            onClick={() => setActiveTab("sculpt")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "sculpt"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-white text-orange-600 hover:bg-orange-100"
            }`}
          >
            🗿 Escultura Digital
          </button>
        </div>
      </motion.div>

      {/* Canvas 3D */}
      <div
        onMouseDown={activeTab === "paint" ? startDrawing : undefined}
        onMouseUp={activeTab === "paint" ? stopDrawing : undefined}
        onMouseLeave={activeTab === "paint" ? stopDrawing : undefined}
        onContextMenu={(e) => e.preventDefault()}
        style={{ 
          width: "100%", 
          height: "100%", 
          cursor: activeTab === "paint" ? (isDrawing ? "crosshair" : "default") : "grab"
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 60 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          {activeTab === "paint" ? (
            <PaintScene
              strokes={strokes}
              isDrawing={isDrawing}
              currentStroke={currentStroke}
              brushColor={brushColor}
              brushSize={brushSize}
              onPointerMove={handlePointerMove}
            />
          ) : (
            <SculptScene 
              spheres={spheres} 
              onSphereDrag={handleSphereDrag}
              onSphereScale={handleSphereScale}
            />
          )}
        </Canvas>
      </div>

      {/* Panel de herramientas */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-32 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm z-20"
      >
        {activeTab === "paint" ? (
          <>
            <h3 className="text-2xl font-bold mb-4 text-orange-900">Herramientas de Pintura</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Color del pincel:</p>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setBrushColor(color.value)}
                    className={`w-12 h-12 rounded-lg border-4 transition-all ${
                      brushColor === color.value
                        ? "border-gray-800 scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Tamaño del pincel: {brushSize}px
              </p>
              <input
                type="range"
                min="1"
                max="10"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={clearCanvas}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition mb-2"
            >
              🗑️ Limpiar lienzo
            </button>

            <button
              onClick={undoLastStroke}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition mb-2"
            >
              ↩️ Deshacer último trazo
            </button>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-900">
                🎨 <strong>Instrucciones:</strong>
                <br />
                • <strong>Click izquierdo + arrastrar:</strong> Dibujar en el aire
                <br />
                • <strong>Click derecho + arrastrar:</strong> Rotar vista
                <br />
                • <strong>Rueda del mouse:</strong> Acercar/alejar
                <br />
                • <strong>Trazos creados:</strong> {strokes.length}
              </p>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4 text-orange-900">Herramientas de Escultura</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Color de esfera:</p>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSculptColor(color.value)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      sculptColor === color.value
                        ? "border-gray-800 scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={addSphere}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition mb-2"
            >
              ➕ Agregar esfera
            </button>

            <button
              onClick={clearSculpture}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition mb-4"
            >
              🗑️ Reiniciar escultura
            </button>

            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-semibold text-purple-900 mb-2">
                🎯 Esfera seleccionada
              </p>
              {spheres.map((sphere, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setSelectedSphere(index)}
                    className={`flex-1 py-2 px-3 rounded-lg font-bold transition ${
                      selectedSphere === index 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
                    }`}
                    style={{ borderLeft: `4px solid ${sphere.color}` }}
                  >
                    Esfera {index + 1}
                  </button>
                  <button
                    onClick={() => duplicateSphere(index)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    title="Duplicar"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => removeSphere(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    disabled={spheres.length === 1}
                    title="Eliminar"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            {selectedSphere !== null && (
              <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm font-semibold text-indigo-900 mb-2">
                  🎨 Cambiar color de esfera {selectedSphere + 1}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => changeSphereColor(selectedSphere, color.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-gray-600 transition"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-900">
                🗿 <strong>Instrucciones:</strong>
                <br />
                • Arrastra las esferas para moverlas
                <br />
                • Usa la rueda del mouse sobre una esfera para cambiar su tamaño
                <br />
                • Selecciona una esfera para cambiar su color
                <br />• Esferas actuales: <strong>{spheres.length}</strong>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
