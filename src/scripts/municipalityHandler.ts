// scripts/municipalityHandler.ts
import { getMunicipality } from '@/services/colombiaApi';
import { sortByName } from '@/utils/sorter';

export function initMunicipalityHandler() {
  const dept = document.getElementById('department') as HTMLSelectElement;
  const muni = document.getElementById('municipality') as HTMLSelectElement;

  if (!dept || !muni) return;

  async function loadCities(deptId: string) {
    if (!deptId) {
      muni.innerHTML = '<option value="" hidden>Seleccione un municipio</option>';
      muni.disabled = true;
      return;
    }

    try {
      const cities = sortByName(await getMunicipality(parseInt(deptId)));
      muni.innerHTML = 
        '<option value="" hidden>Seleccione un municipio</option>' +
        cities.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      muni.disabled = false;
    } catch {
      muni.innerHTML = '<option value="" hidden>Error al cargar</option>';
    }
  }

  dept.addEventListener('change', (e) => loadCities((e.target as HTMLSelectElement).value));
  if (dept.value) loadCities(dept.value);
}