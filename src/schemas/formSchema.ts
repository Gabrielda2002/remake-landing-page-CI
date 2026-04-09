// schemas/formSchema.ts
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import type { FormValues } from '@/types/FormValues';

// Mensajes centralizados
const messages = {
  required: (field: string) => `${field} requerido`,
  onlyLetters: 'Solo se permiten letras',
  onlyNumbers: 'Solo se permiten números',
  minChars: (min: number) => `Mínimo ${min} caracteres`,
  maxChars: (max: number) => `Máximo ${max} caracteres`,
 
  phoneLength: (count: number) => 
    `El teléfono debe tener exactamente ${count} dígitos`,
  validEmail: 'Debe ser un correo electrónico válido',

  validAge: (min: number, max: number) => 
    `La edad debe ser entre ${min} y ${max} años`,
};

// Función para obtener el nombre del campo traducido
const fieldName = (t: ((key: string) => string) | undefined, key: string, fallback: string) =>
  t ? t(key) : fallback;

// Schema único, multilenguaje y simple
export const getValidationSchema = (t?: (key: string) => string) =>
  Yup.object<FormValues>({
    names: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.names', 'Nombre')))
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/, messages.onlyLetters)
      .min(2, messages.minChars(2))
      .max(40, messages.maxChars(40))
      .transform(value => value?.toUpperCase()),

    lastNames: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.lastNames', 'Apellido')))
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/, messages.onlyLetters)
      .min(2, messages.minChars(2))
      .max(40, messages.maxChars(40))
      .transform(value => value?.toUpperCase()),

    identificationType: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.identificationType', 'Tipo de identificación'))),

    identificationNumber: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.identificationNumber', 'Número de identificación')))
      .matches(/^[0-9]+$/, messages.onlyNumbers)
      .min(6, messages.minChars(6))
      .max(20, messages.maxChars(20)),

    department: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.department', 'Departamento'))),

    municipality: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.municipality', 'Municipio'))),

    phone: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.phone', 'Teléfono')))
      .matches(/^[0-9]+$/, messages.onlyNumbers)
      .length(10, messages.phoneLength(10)),

    email: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.email', 'Correo')))
      .email(messages.validEmail),

    eps: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.eps', 'EPS'))),

    age: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.age', 'Edad')))
      .matches(/^[0-9]+$/, messages.onlyNumbers)
      .test('edad-valida', messages.validAge(18, 125), value => {
        if (!value) return false;
        const age = parseInt(value, 10);
        return age >= 18 && age <= 125;
      }),

    nationality: Yup.string()
      .required(messages.required(fieldName(t, 'form.fields.nationality', 'Nacionalidad'))),

    date: Yup.date()
      .required(messages.required(fieldName(t, 'form.fields.date', 'Fecha')))
      .test('edad-valida', messages.validAge(18, 125), function(value) {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = differenceInYears(today, birthDate);
        return age >= 18 && age <= 125;
      }),
  });

// Para retrocompatibilidad, exporta el schema por defecto en español
export const validationSchema = getValidationSchema();