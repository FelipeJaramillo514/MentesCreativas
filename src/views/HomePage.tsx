import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGlobeAmericas, FaRobot, FaPaintBrush } from "react-icons/fa";

/**
 * HomePage - Página principal de la aplicación educativa
 * Diseño moderno e interactivo para estudiantes de 4° y 5° grado
 */
export default function HomePage() {
  const navigate = useNavigate();

  // Configuración de las secciones educativas
  const sections = [
    {
      id: "geografia",
      title: "Ciencias Sociales",
      subtitle: "Explora el mundo en 3D",
      description: "Descubre Colombia y el mundo con mapas interactivos. Aprende sobre regiones, capitales y geografía.",
      icon: FaGlobeAmericas,
      color: "from-blue-500 to-cyan-500",
      route: "/geografia",
    },
    {
      id: "tecnologia",
      title: "Tecnología y Lógica",
      subtitle: "Construye y programa",
      description: "Crea estructuras con bloques 3D y programa robots. Desarrolla tu pensamiento lógico.",
      icon: FaRobot,
      color: "from-purple-500 to-pink-500",
      route: "/tecnologia",
    },
    {
      id: "arte",
      title: "Arte y Creatividad",
      subtitle: "Pinta y esculpe en 3D",
      description: "Dibuja en el espacio y moldea figuras digitales. Libera tu creatividad sin límites.",
      icon: FaPaintBrush,
      color: "from-orange-500 to-red-500",
      route: "/arte",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16 pb-8 px-6"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Colegio Mentes Creativas
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-700 mb-4 font-medium"
        >
          ✨ Aprende, Crea y Explora de manera interactiva ✨
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Tu aventura educativa comienza aquí. Selecciona una sección y descubre el conocimiento de forma divertida.
        </motion.p>
      </motion.div>

      {/* Cards Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="cursor-pointer"
              onClick={() => navigate(section.route)}
            >
              <div className={`bg-gradient-to-br ${section.color} rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full flex flex-col`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6 flex items-center justify-center">
                  <section.icon className="text-7xl text-white drop-shadow-lg" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">
                  {section.title}
                </h2>
                
                <p className="text-xl text-white/90 font-semibold mb-4">
                  {section.subtitle}
                </p>
                
                <p className="text-white/80 text-base mb-6 flex-grow">
                  {section.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  ¡Explorar ahora! →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center pb-12 px-6"
      >
        <p className="text-gray-600 text-sm">
          Desarrollado con 💜 para estudiantes de 4° y 5° grado
        </p>
      </motion.div>
    </div>
  );
}
