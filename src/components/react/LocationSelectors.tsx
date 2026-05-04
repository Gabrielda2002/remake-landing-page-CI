import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, UseFormSetValue, FieldValues, Path } from 'react-hook-form';
import { SelectSearch } from '@/components/ui/SelectSearch';
import type { SelectOption } from '@/types/SelectOption';
import { getDepartments } from '@/services/colombiaApi';
import { useMunicipalities } from './useMunicipalities';
import { sortByName } from '@/utils/sorter';
import type { Department } from '@/types/Location';
import { useTranslation } from '@/hooks/useTranslation';

interface LocationSelectorsProps<T extends FieldValues & { department: string; municipality: string }> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
}

export const LocationSelectors = <T extends FieldValues & { department: string; municipality: string }>({
  control,
  setValue,
}: LocationSelectorsProps<T>) => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departmentsError, setDepartmentsError] = useState<string | null>(null);

  // Estado local solo para el fetch de municipios: guarda el id numérico del departamento.
  // El valor que se registra en RHF es el nombre del departamento (lo que se enviará al backend).
  const [departmentId, setDepartmentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(sortByName(data));
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
    useMunicipalities(departmentId ?? '');

  // Cuando cambia el departamento, resetea el municipio en RHF
  useEffect(() => {
    if (departmentId !== null) {
      setValue('municipality' as Path<T>, '' as Parameters<UseFormSetValue<T>>[1], { shouldValidate: false });
    }
  }, [departmentId, setValue]);

  // Mapa de nombre → id para sincronizar el estado local del fetch sin exponer el id en RHF
  const departmentIdByName = new Map<string, number>(
    departments.map((dept) => [dept.name, dept.id]),
  );

  const departmentOptions: SelectOption[] = departments.map((dept) => ({
    value: dept.name,
    label: dept.name,
  }));

  const municipalityOptions: SelectOption[] = municipalities.map((mun) => ({
    value: mun.name,
    label: mun.name,
  }));

  if (loadingDepartments) {
    return (
      <div className="flex justify-center items-center p-6 col-span-2">
        <div className="text-[rgb(0,179,160)] text-lg">{t('formStudy.loading.form')}</div>
      </div>
    );
  }

  if (departmentsError) {
    return (
      <div className="p-6 col-span-2">
        <div className="text-red-500 text-center">{t('formStudy.messages.departmentsError')}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <Controller
          name={'department' as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <SelectSearch
              id="department"
              name="department"
              label={t('formStudy.fields.department')}
              value={field.value as string}
              options={departmentOptions}
              onChange={(name) => {
                field.onChange(name);
                // Sincroniza el id local para disparar el fetch de municipios
                const id = departmentIdByName.get(name as string);
                setDepartmentId(id ?? null);
              }}
              onBlur={field.onBlur}
              placeholder={t('formStudy.placeholders.department')}
              required
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <Controller
          name={'municipality' as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <SelectSearch
              id="municipality"
              name="municipality"
              label={t('formStudy.fields.municipality')}
              value={field.value as string}
              options={municipalityOptions}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              placeholder={
                loadingMunicipalities
                  ? t('formStudy.loading.municipalities')
                  : departmentId === null
                    ? t('formStudy.messages.selectDepartmentFirst')
                    : t('formStudy.placeholders.municipality')
              }
              disabled={departmentId === null || loadingMunicipalities}
              required
              error={municipalitiesError ?? fieldState.error?.message}
            />
          )}
        />
      </div>
    </>
  );
};
