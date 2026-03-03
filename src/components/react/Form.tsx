import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, type FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { SelectSearch, type SelectOption } from '@/components/ui/SelectSearch';
import { getDepartments } from '@/services/colombiaApi';
import { useMunicipalities } from './useMunicipalities';
import { sortByName } from '@/utils/sorter';
import type { Department } from '@/types/Location';

// Interfaz para los valores del formulario
interface FormValues {
    department: string;
    municipality: string;
}

// Schema de validación con Yup
const validationSchema = Yup.object({
    department: Yup.string().required('El departamento es requerido'),
    municipality: Yup.string().required('El municipio es requerido'),
});

// Valores iniciales
const initialValues: FormValues = {
    department: '',
    municipality: '',
};

export const LocationForm: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loadingDepartments, setLoadingDepartments] = useState(true);
    const [departmentsError, setDepartmentsError] = useState<string | null>(null);

    // Cargar departamentos al montar el componente
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

    const formik = useFormik({
        initialValues: {
            department: '',
            municipality: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // squi es donde se manejaría el envío del formulario, por ejemplo, enviando los datos a una API o mostrando un mensaje de éxito 
            console.log(values)
            return;
        }
    })


    const { municipalities, loading: loadingMunicipalities, error: municipalitiesError } =
        useMunicipalities(formik.values.department);

    // Convertir municipios a opciones para el select
    const municipalityOptions: SelectOption[] = municipalities.map((mun) => ({
        value: mun.id,
        label: mun.name,
    }));
    // Resetear municipio cuando cambia el departamento
    React.useEffect(() => {
        if (formik.values.department && formik.values.municipality) {
            formik.setFieldValue('municipality', '');
        }
    }, [formik.values.department]);

    // Convertir departamentos a opciones para el select
    const departmentOptions: SelectOption[] = departments.map((dept) => ({
        value: dept.id,
        label: dept.name,
    }));

    if (loadingDepartments) {
        return (
            <div className="flex justify-center items-center p-6">
                <div className="text-[rgb(0,179,160)] text-lg">Cargando formulario...</div>
            </div>
        );
    }

    if (departmentsError) {
        return (
            <div className="p-6">
                <div className="text-red-500 text-center">{departmentsError}</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <h4 className="text-[rgb(0,121,196)] text-[36px] text-left mb-3">
                Formulario de Ubicación
            </h4>
            <p className="text-[rgb(86,86,88)] text-[18px] text-left mb-10">
                Seleccione su departamento y municipio
            </p>

            <form className="grid grid-cols-2 gap-4 shadow-lg rounded-lg p-6 bg-white" onSubmit={formik.handleSubmit}>
                {/* Campo Departamento */}
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
                        error={formik.touched.department && formik.errors.department ? formik.errors.department : undefined}
                    />
                </div>

                {/* Campo Municipio */}
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
                                    ? formik.errors.municipality
                                    : undefined
                        }
                    />
                </div>

                {/* Botón Submit */}
                <div className="col-span-2 flex justify-center mt-4">
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="text-[16px] px-6 py-2 bg-[rgb(0,179,160)] rounded-lg border text-white w-auto hover:bg-[rgb(0,160,143)] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    );
};
