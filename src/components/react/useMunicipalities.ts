import { useState, useEffect } from 'react';
import { getMunicipality } from '@/services/colombiaApi';
import type { Municipality } from '@/types/Location';
import { sortByName } from '@/utils/sorter';

interface UseMunicipalitiesResult {
  municipalities: Municipality[];
  loading: boolean;
  error: string | null;
}

export const useMunicipalities = (departmentId: string | number): UseMunicipalitiesResult => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset si no hay departamento seleccionado
    if (!departmentId) {
      setMunicipalities([]);
      setError(null);
      return;
    }

    const fetchMunicipalities = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMunicipality(Number(departmentId));
        const sortedMunicipalities = sortByName(data);
        setMunicipalities(sortedMunicipalities);
      } catch (err) {
        setError('Error al cargar los municipios');
        setMunicipalities([]);
        console.error('Error fetching municipalities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipalities();
  }, [departmentId]);

  return { municipalities, loading, error };
};
