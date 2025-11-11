// src/components/Navbar.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaGlobeAmericas, FaRobot, FaPaintBrush } from "react-icons/fa";

const Navbar: React.FC = () => {
  // Inicializa el tema al cargar
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved) {
      root.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    // Notifica a la app para que vistas activas reaccionen en vivo
    document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
  };

  return (
    <header className="h-16 sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Lado izquierdo: logo + marca */}
        <Link to="/" className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-100 hover:opacity-80 transition">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg shadow-lg">
            🎓
          </div>
          <span className="text-lg">Colegio Mentes Creativas</span>
        </Link>

        {/* Centro: navegación principal */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium"
          >
            <FaHome />
            <span>Inicio</span>
          </Link>
          <Link
            to="/geografia"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition font-medium"
          >
            <FaGlobeAmericas className="text-blue-600 dark:text-blue-400" />
            <span>Geografía</span>
          </Link>
          <Link
            to="/tecnologia"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition font-medium"
          >
            <FaRobot className="text-purple-600 dark:text-purple-400" />
            <span>Tecnología</span>
          </Link>
          <Link
            to="/arte"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-orange-100 dark:hover:bg-orange-900 transition font-medium"
          >
            <FaPaintBrush className="text-orange-600 dark:text-orange-400" />
            <span>Arte</span>
          </Link>
        </nav>

        {/* Lado derecho: botón de tema */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition font-medium shadow-md"
          >
            🌓 Tema
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
