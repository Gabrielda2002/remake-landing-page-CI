import type { Department , Municipality } from '../types/Location';

const BASE_URL = 'https://api-colombia.com/api/v1';

/**
 * Obtiene la lista de departamentos desde la API de Colombia
 * @returns Promise con el arreglo de departamentos
 * @throws Error si la petición falla
 */
export async function getDepartments(): Promise<Department[]> {
  try {
    const response = await fetch(`${BASE_URL}/Department`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener departamentos: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getDepartments:', error);
    throw error;
  }
}

/**
 * Obtiene la lista de municipios de un departamento específico
 * @param departmentId - ID del departamento
 * @returns Promise con el arreglo de municipios
 * @throws Error si la petición falla o el departmentId es inválido
 */
export async function getMunicipality(departmentId: number): Promise<Municipality[]> {
  if (!departmentId || departmentId <= 0) {
    throw new Error('ID de departamento inválido');
  }

  try {
    const response = await fetch(`${BASE_URL}/Department/${departmentId}/Cities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener municipios: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getMunicipality para departmentId ${departmentId}:`, error);
    throw error;
  }
}
