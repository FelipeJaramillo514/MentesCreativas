/**
 * Tests para HomePage.tsx
 * Verifica que la página principal se renderice correctamente
 */

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Wrapper con Router para componentes que usan navegación
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("HomePage Component", () => {
  test("renders the main title", () => {
    renderWithRouter(<HomePage />);
    const titleElement = screen.getByText(/Colegio Mentes Creativas/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders motivational message", () => {
    renderWithRouter(<HomePage />);
    const message = screen.getByText(/Aprende, Crea y Explora de manera interactiva/i);
    expect(message).toBeInTheDocument();
  });

  test("renders all three educational section cards", () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText(/Ciencias Sociales/i)).toBeInTheDocument();
    expect(screen.getByText(/Tecnología y Lógica/i)).toBeInTheDocument();
    expect(screen.getByText(/Arte y Creatividad/i)).toBeInTheDocument();
  });

  test("renders explore buttons for each section", () => {
    renderWithRouter(<HomePage />);
    
    const exploreButtons = screen.getAllByText(/¡Explorar ahora!/i);
    expect(exploreButtons).toHaveLength(3);
  });

  test("renders section descriptions", () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText(/Descubre Colombia y el mundo con mapas interactivos/i)).toBeInTheDocument();
    expect(screen.getByText(/Crea estructuras con bloques 3D y programa robots/i)).toBeInTheDocument();
    expect(screen.getByText(/Dibuja en el espacio y moldea figuras digitales/i)).toBeInTheDocument();
  });

  test("renders footer message", () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText(/Desarrollado con 💜 para estudiantes de 4° y 5° grado/i)).toBeInTheDocument();
  });
});
