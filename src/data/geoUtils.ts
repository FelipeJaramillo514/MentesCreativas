/**
 * Utilidades para convertir coordenadas geográficas a geometrías 3D de Three.js
 */

import * as THREE from 'three';
import { normalizeCoordinates, DepartmentGeoData } from './colombiaGeoData';

/**
 * Crea una geometría Shape de Three.js a partir de coordenadas geográficas
 * @param coordinates Array de coordenadas [longitud, latitud]
 * @returns THREE.Shape lista para extrusión
 */
export const createShapeFromCoordinates = (coordinates: number[][]): THREE.Shape => {
  const shape = new THREE.Shape();
  
  coordinates.forEach((coord, index) => {
    const [x, z] = normalizeCoordinates(coord[0], coord[1]);
    
    if (index === 0) {
      shape.moveTo(x, -z); // Invertir Z para orientación correcta
    } else {
      shape.lineTo(x, -z); // Invertir Z para orientación correcta
    }
  });
  
  shape.closePath();
  return shape;
};

/**
 * Crea una geometría ExtrudeGeometry para un departamento
 * @param department Datos del departamento con coordenadas
 * @param height Altura de la extrusión (profundidad 3D)
 * @returns THREE.ExtrudeGeometry
 */
export const createDepartmentGeometry = (
  department: DepartmentGeoData,
  height: number = 0.3
): THREE.ExtrudeGeometry => {
  const shape = createShapeFromCoordinates(department.coordinates);
  
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: height,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

/**
 * Calcula el centro geométrico de un departamento en coordenadas 3D
 * @param department Datos del departamento
 * @returns [x, y, z] posición del centro
 */
export const getDepartmentCenter = (department: DepartmentGeoData): [number, number, number] => {
  const [x, z] = normalizeCoordinates(department.center[0], department.center[1]);
  return [x, 0, -z]; // Invertir Z para orientación correcta
};

/**
 * Calcula el área aproximada en unidades 3D (para escalar labels y efectos)
 * @param coordinates Array de coordenadas del polígono
 * @returns Área aproximada
 */
export const calculatePolygonArea = (coordinates: number[][]): number => {
  let area = 0;
  const normalizedCoords = coordinates.map(coord => normalizeCoordinates(coord[0], coord[1]));
  
  for (let i = 0; i < normalizedCoords.length - 1; i++) {
    const [x1, z1] = normalizedCoords[i];
    const [x2, z2] = normalizedCoords[i + 1];
    area += x1 * z2 - x2 * z1;
  }
  
  return Math.abs(area / 2);
};

/**
 * Obtiene el factor de escala relativo basado en el área real del departamento
 * Útil para ajustar visualizaciones proporcionales
 */
export const getDepartmentScaleFactor = (department: DepartmentGeoData): number => {
  // Extraer el área numérica del string (ej: "20.848 km²" -> 20848)
  const areaValue = parseFloat(department.area.replace(/[^0-9.]/g, ''));
  
  // Normalizar respecto al departamento más grande (Amazonas ~109.665 km²)
  const maxArea = 110000;
  return Math.sqrt(areaValue / maxArea); // Usar raíz cuadrada para evitar diferencias extremas
};
