import type { Department , Municipality } from '../types/Location';

const BASE_URL = 'https://api-colombia.com/api/v1';

//Consume una Api para optner los departamentos
export async function getDepartments(): Promise<Array<Department >> {
  try {
    const response = await fetch(`${BASE_URL}/Department`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const departments: Array<Department> = await response.json();
    
    return departments
      .map(depto => ({
        id: depto.id,
        name: depto.name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error('Error obteniendo departamentos:', error);
    return [];
  }
}

//Consume la Api para optener Municipios
export async function getMunicipality(departmentId: number):Promise<Array<Municipality>>{
  try {
    const response = await fetch(`${BASE_URL}/Department/${departmentId}/Cities`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const municipios: Array<Municipality> = await response.json();
  
    return municipios
      .map(muni => ({
        id: muni.id,
        name: muni.name,
        departmentId: muni.departmentId
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error obteniendo municipios:', error);
    return [];
  }
}
