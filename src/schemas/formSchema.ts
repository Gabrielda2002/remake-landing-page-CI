// schemas/formSchema.ts
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import type { FormValues } from '@/types/FormValues';

export const validationSchema = Yup.object<FormValues>({
  names: Yup.string()
    .required("Nombre requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/, "Solo se permiten letras")
    .min(2, "Mínimo 2 caracteres")
    .max(40, "Debe tener como máximo 40 caracteres")
    .transform(value => value?.toUpperCase()),

  lastNames: Yup.string()
    .required("Apellido requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/, "Solo se permiten letras")
    .min(2, "Mínimo 2 caracteres")
    .max(40, "Debe tener como máximo 40 caracteres")
    .transform(value => value?.toUpperCase()),
  
  identificationType: Yup.string()
    .required('Tipo de identificación requerido'),

  identificationNumber: Yup.string()
    .required("Número de identificación requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Máximo 20 caracteres"),

  department: Yup.string()
    .required('Departamento requerido'),

  municipality: Yup.string()
    .required('Municipio es requerido'),

  phone: Yup.string()
    .required('Teléfono requerido')
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .length(10, "El teléfono debe tener exactamente 10 dígitos"),

  email: Yup.string()
    .required('Correo requerido')
    .email('Debe ser un correo electrónico válido'),

  eps: Yup.string()
    .required('EPS es requerida'),

  age: Yup.string()
    .required('Edad requerida')
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .test('edad-valida', 'La edad debe ser entre 18 y 125 años', 
      value => {
        if (!value) return false;
        const age = parseInt(value, 10);
        return age >= 18 && age <= 125;
      }),

  nationality: Yup.string()
      .required('Nacionalidad requerida'),

  date: Yup.date()
    .required('Fecha requerida')
    .test('edad-valida', 'La edad debe ser entre 18 y 125 años', function(value) {
      if (!value) return false;
      
      const today = new Date();
      const birthDate = new Date(value);
      const age = differenceInYears(today, birthDate);
      
      return age >= 18 && age <= 125;
    }),
});