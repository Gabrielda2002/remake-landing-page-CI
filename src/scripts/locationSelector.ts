
import { getDepartments, getMunicipality } from '../services/colombiaApi';
import type { Department , Municipality  } from "../types/Location";
  
function loadDepartmentsIntoSelect(departments: Array<Department >) {
  const select = document.querySelector('#department') as HTMLSelectElement;

select.innerHTML = '<option value="" hidden style="color: rgb(0,179,160);">Seleccione un departamento</option>';

  departments.forEach(depto => {
    const option = document.createElement('option');
    option.value = depto.id.toString();
    option.textContent = depto.name;
    select.appendChild(option);
  });
}

function loadMunicipalitiesIntoSelect(Municipalities: Array<Municipality>) {
  const select = document.querySelector('#municipality') as HTMLSelectElement;
  
select.innerHTML = '<option value="" hidden style="color: rgb(0,179,160);">Seleccione un departamento</option>';

  Municipalities.forEach(muni => {
    const option = document.createElement('option');
    option.textContent = muni.name;
    select.appendChild(option);
  });
  select.disabled = false;
}

function limpiarMunicipios() {
  const select = document.querySelector('#municipality') as HTMLSelectElement;
  select.innerHTML = '<option value="">Seleccione un municipio</option>';
  select.disabled = true;
}

export function initLocationSelector() {

document.addEventListener('DOMContentLoaded', async () => {
  // Cargar departamentos
  const departamentos = await getDepartments();
  loadDepartmentsIntoSelect(departamentos);
  
  // Limpiar municipios al inicio
  limpiarMunicipios();

  // Evento cuando cambia el departamento
  const selectDepartamento = document.querySelector('#department') as HTMLSelectElement;
  
  selectDepartamento.addEventListener('change', async (e) => {
    const target = e.target as HTMLSelectElement;
    const departamentoId = target.value;
    
    // Limpiar municipios mientras se cargan los nuevos
    limpiarMunicipios();
    
    if (departamentoId) {
      // Cargar municipios del departamento seleccionado
      const municipios = await getMunicipality(parseInt(departamentoId));
      loadMunicipalitiesIntoSelect(municipios);
    }
    });
  });
}