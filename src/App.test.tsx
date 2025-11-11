import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título principal del colegio", () => {
  render(<App />);
  const titles = screen.getAllByText(/Colegio Mentes Creativas/i);
  expect(titles.length).toBeGreaterThan(0);
  expect(titles[0]).toBeInTheDocument();
});