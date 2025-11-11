/**
 * Tests para TecnologiaView.tsx
 * Verifica la funcionalidad de la sección de tecnología
 */

import { render, screen, fireEvent } from "@testing-library/react";
import TecnologiaView from "./TecnologiaView";

// Mock de Canvas de React Three Fiber
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas-mock">{children}</div>,
  useFrame: jest.fn(),
}));

// Mock de drei
jest.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Box: () => null,
}));

describe("TecnologiaView Component", () => {
  test("renders the main title", () => {
    render(<TecnologiaView />);
    const titleElement = screen.getByText(/Tecnología y Pensamiento Lógico/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders both tabs - blocks and robot", () => {
    render(<TecnologiaView />);
    expect(screen.getByText(/Constructor de Bloques/i)).toBeInTheDocument();
    expect(screen.getByText(/Programar Robot/i)).toBeInTheDocument();
  });

  test("renders block construction tools by default", () => {
    render(<TecnologiaView />);
    expect(screen.getByText(/Herramientas/i)).toBeInTheDocument();
    expect(screen.getByText(/Modo:/i)).toBeInTheDocument();
  });

  test("switches to robot tab when clicked", () => {
    render(<TecnologiaView />);
    const robotTab = screen.getByText(/Programar Robot/i);
    fireEvent.click(robotTab);
    
    expect(screen.getByText(/Controles del Robot/i)).toBeInTheDocument();
  });

  test("renders block types in construction mode", () => {
    render(<TecnologiaView />);
    expect(screen.getByText(/Césped/i)).toBeInTheDocument();
    expect(screen.getByText(/Piedra/i)).toBeInTheDocument();
    expect(screen.getByText(/Madera/i)).toBeInTheDocument();
    expect(screen.getByText(/Arena/i)).toBeInTheDocument();
  });

  test("renders build and delete mode buttons", () => {
    render(<TecnologiaView />);
    expect(screen.getByText(/Construir/i)).toBeInTheDocument();
    expect(screen.getByText(/Borrar/i)).toBeInTheDocument();
  });

  test("renders robot control arrows in robot tab", () => {
    render(<TecnologiaView />);
    const robotTab = screen.getByText(/Programar Robot/i);
    fireEvent.click(robotTab);
    
    const arrows = screen.getAllByRole("button");
    const arrowButtons = arrows.filter(btn => 
      btn.textContent?.includes("⬆️") || 
      btn.textContent?.includes("⬇️") ||
      btn.textContent?.includes("⬅️") || 
      btn.textContent?.includes("➡️")
    );
    expect(arrowButtons.length).toBeGreaterThan(0);
  });

  test("renders 3D canvas", () => {
    render(<TecnologiaView />);
    const canvas = screen.getByTestId("canvas-mock");
    expect(canvas).toBeInTheDocument();
  });
});
