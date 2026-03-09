// components/LocationSelectors.tsx
import React, { useState, useEffect } from 'react';
import { SelectSearch, type SelectOption } from '@/components/ui/SelectSearch';
import { getDepartments } from '@/services/colombiaApi';
import { useMunicipalities } from './useMunicipalities';
import { sortByName } from '@/utils/sorter';
import type { Department } from '@/types/Location';
import { useFormik } from 'formik';

interface LocationSelectorsProps<T extends { department: string; municipality: string }> {
  formik: ReturnType<typeof useFormik<T>>;
}

export const LocationSelectors = <T extends { department: string; municipality: string }>({
  formik
}: LocationSelectorsProps<T>) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departmentsError, setDepartmentsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        const sortedDepartments = sortByName(data);
        setDepartments(sortedDepartments);
        setDepartmentsError(null);
      } catch (error) {
        setDepartmentsError('Error al cargar los departamentos');
        console.error('Error fetching departments:', error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  const { municipalities, loading: loadingMunicipalities, error: municipalitiesError } =
    useMunicipalities(formik.values.department);

  const municipalityOptions: SelectOption[] = municipalities.map((mun) => ({
    value: mun.id,
    label: mun.name,
  }));

  React.useEffect(() => {
    if (formik.values.department && formik.values.municipality) {
      formik.setFieldValue('municipality', '');
    }
  }, [formik.values.department]);

  const departmentOptions: SelectOption[] = departments.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }));

  if (loadingDepartments) {
    return (
      <div className="flex justify-center items-center p-6 col-span-2">
        <div className="text-[rgb(0,179,160)] text-lg">Cargando formulario...</div>
      </div>
    );
  }

  if (departmentsError) {
    return (
      <div className="p-6 col-span-2">
        <div className="text-red-500 text-center">{departmentsError}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <SelectSearch
          id="department"
          name="department"
          label="Seleccione un departamento"
          value={formik.values.department}
          options={departmentOptions}
          onChange={(value) => formik.setFieldValue('department', value)}
          onBlur={() => formik.setFieldTouched('department', true)}
          placeholder="Busque un departamento"
          required
          error={formik.touched.department && formik.errors.department ? String(formik.errors.department) : undefined}
        />
      </div>

      <div className="flex flex-col">
        <SelectSearch
          id="municipality"
          name="municipality"
          label="Seleccione un municipio"
          value={formik.values.municipality}
          options={municipalityOptions}
          onChange={(value) => formik.setFieldValue('municipality', value)}
          onBlur={() => formik.setFieldTouched('municipality', true)}
          placeholder={
            loadingMunicipalities
              ? 'Cargando municipios...'
              : !formik.values.department
                ? 'Primero seleccione un departamento'
                : 'Busque un municipio'
          }
          disabled={!formik.values.department || loadingMunicipalities}
          required
          error={
            municipalitiesError
              ? municipalitiesError
              : formik.touched.municipality && formik.errors.municipality
                ? String(formik.errors.municipality)
                : undefined
          }
        />
      </div>
    </>
  );
};