export interface Eps {
  id: string,
  name: string  
}

export const EPS_LIST: Eps[] = [
  { id: "1", name: "Coosalud" },
  { id: "2", name: "Nueva EPS" },
  { id: "3", name: "Mutual SER" },
  { id: "4", name: "Salud MÍA" },
  { id: "5", name: "Aliansalud" },
  { id: "6", name: "Salud Total" },
  { id: "7", name: "Sanitas" },
  { id: "8", name: "Sura" },
  { id: "9", name: "Famisanar" },
  { id: "10", name: "SOS" },
  { id: "11", name: "Comfenalco Valle" },
  { id: "12", name: "Compensar" },
  { id: "13", name: "Empresas Públicas de Medellín" },
  { id: "14", name: "Fondo de Pasivo Social de Ferrocarriles Nacionales de Colombia" },
  { id: "15", name: "Cajacopi Atlántico" },
  { id: "16", name: "Capresoca" },
  { id: "17", name: "Comfachocó" },
  { id: "18", name: "Comfaoriente" },
  { id: "19", name: "EPS Familiar de Colombia" },
  { id: "20", name: "Asmet Salud" },
  { id: "21", name: "Emssanar EPS" },
  { id: "22", name: "Capital Salud EPS-S" },
  { id: "23", name: "Savia Salud EPS" },
  { id: "24", name: "Dusakawi EPSI" },
  { id: "25", name: "Asociación Indígena del Cauca EPSI" },
  { id: "26", name: "Anas Wayuu EPSI" },
  { id: "27", name: "Mallamas EPSI" },
  { id: "28", name: "Pijaos Salud EPSI" }
].sort((a, b) => a.name.localeCompare(b.name));

