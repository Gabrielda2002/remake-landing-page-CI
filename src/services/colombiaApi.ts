import type { Department , Municipality } from '../types/Location';

const BASE_URL = 'https://api-colombia.com/api/v1';

//Consume una Api para optner los departamentos
export async function getDepartments(): Promise<Department[]> {
  const response = await fetch(`${BASE_URL}/Department`);
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}

//consume api para municpios
export async function getMunicipality(departmentId: number): Promise<Municipality[]> {
  const response = await fetch(`${BASE_URL}/Department/${departmentId}/Cities`);
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}
