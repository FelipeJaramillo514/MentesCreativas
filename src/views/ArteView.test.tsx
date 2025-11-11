/**
 * Tests para ArteView.tsx
 * Verifica la funcionalidad de la sección de arte
 */

import { render, screen, fireEvent } from "@testing-library/react";
import ArteView from "./ArteView";

// Mock de Canvas de React Three Fiber
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas-mock">{children}</div>,
  useFrame: jest.fn(),
  useThree: jest.fn(() => ({ 
    camera: { 
      position: { 
        clone: () => ({ 
          add: jest.fn().mockReturnThis() 
        }) 
      } 
    },
    gl: {
      domElement: document.createElement('canvas')
    }
  })),
}));

// Mock de drei
jest.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
}));

describe("ArteView Component", () => {
  test("renders the main title", () => {
    render(<ArteView />);
    const titleElement = screen.getByText(/Arte y Creatividad/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders both tabs - paint and sculpt", () => {
    render(<ArteView />);
    expect(screen.getByText(/Pintura 3D/i)).toBeInTheDocument();
    expect(screen.getByText(/Escultura Digital/i)).toBeInTheDocument();
  });

  test("renders paint tools by default", () => {
    render(<ArteView />);
    expect(screen.getByText(/Herramientas de Pintura/i)).toBeInTheDocument();
    expect(screen.getByText(/Color del pincel:/i)).toBeInTheDocument();
  });

  test("switches to sculpt tab when clicked", () => {
    render(<ArteView />);
    const sculptTab = screen.getByText(/Escultura Digital/i);
    fireEvent.click(sculptTab);
    
    expect(screen.getByText(/Herramientas de Escultura/i)).toBeInTheDocument();
  });

  test("renders color palette in paint mode", () => {
    render(<ArteView />);
    const colorButtons = screen.getAllByRole("button");
    // Debe haber al menos 8 colores + 2 botones de herramientas
    expect(colorButtons.length).toBeGreaterThanOrEqual(8);
  });

  test("renders brush size slider", () => {
    render(<ArteView />);
    expect(screen.getByText(/Tamaño del pincel:/i)).toBeInTheDocument();
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  });

  test("renders clear canvas button in paint mode", () => {
    render(<ArteView />);
    expect(screen.getByText(/Limpiar lienzo/i)).toBeInTheDocument();
  });

  test("renders add sphere button in sculpt mode", () => {
    render(<ArteView />);
    const sculptTab = screen.getByText(/Escultura Digital/i);
    fireEvent.click(sculptTab);
    
    expect(screen.getByText(/Agregar esfera/i)).toBeInTheDocument();
  });

  test("renders instructions in both modes", () => {
    render(<ArteView />);
    expect(screen.getByText(/Instrucciones:/i)).toBeInTheDocument();
  });

  test("renders 3D canvas", () => {
    render(<ArteView />);
    const canvas = screen.getByTestId("canvas-mock");
    expect(canvas).toBeInTheDocument();
  });

  test("updates brush size when slider changes", () => {
    render(<ArteView />);
    const slider = screen.getByRole("slider");
    
    fireEvent.change(slider, { target: { value: "7" } });
    expect(screen.getByText(/Tamaño del pincel: 7px/i)).toBeInTheDocument();
  });
});
