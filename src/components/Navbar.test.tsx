// src/components/Navbar.test.tsx
import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Helper para renderizar con Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'Colegio Mentes Creativas'", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Colegio Mentes Creativas/i)).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Tema'", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });
});

