/**
 * Tests para GeografiaView.tsx
 * Verifica la funcionalidad de la sección de geografía
 */

import { render, screen } from "@testing-library/react";
import GeografiaView from "./GeografiaView";

// Mock de Canvas de React Three Fiber
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas-mock">{children}</div>,
  useFrame: jest.fn(),
  useThree: jest.fn(() => ({ camera: {} })),
}));

// Mock de drei
jest.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Text: () => null,
  Html: ({ children }: any) => <div>{children}</div>,
}));

describe("GeografiaView Component", () => {
  test("renders the main title", () => {
    render(<GeografiaView />);
    const titleElement = screen.getByText(/Mapa Interactivo de Colombia/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders instructions for users", () => {
    render(<GeografiaView />);
    const instructions = screen.getByText(/Explora los 32 departamentos y el Distrito Capital/i);
    expect(instructions).toBeInTheDocument();
  });

  test("renders controls section", () => {
    render(<GeografiaView />);
    expect(screen.getByText(/Controles Interactivos/i)).toBeInTheDocument();
  });

  test("renders 3D canvas", () => {
    render(<GeografiaView />);
    const canvas = screen.getByTestId("canvas-mock");
    expect(canvas).toBeInTheDocument();
  });

  test("renders mouse control instructions", () => {
    render(<GeografiaView />);
    expect(screen.getByText(/Arrastrar/i)).toBeInTheDocument();
    expect(screen.getByText(/Scroll/i)).toBeInTheDocument();
    expect(screen.getByText(/Click/i)).toBeInTheDocument();
  });
});
