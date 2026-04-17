import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';

type TFn = (key: string) => string;

const LETTERS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const NUMBERS_REGEX = /^[0-9]+$/;
const AGE = { min: 18, max: 125 };

const interpolate = (text: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((str, [k, v]) => str.replace(`{{${k}}}`, String(v)), text);

const msg = (t: TFn, key: string, vars?: Record<string, string | number>) => {
  const text = t(key);
  return vars ? interpolate(text, vars) : text;
};

export const getValidationSchema = (t: TFn) => {
  const required = (key: string) => msg(t, 'formStudy.validations.required', { field: t(key) });
  const onlyLetters = msg(t, 'formStudy.validations.onlyLetters');
  const onlyNumbers = msg(t, 'formStudy.validations.onlyNumbers');
  const validEmail = msg(t, 'formStudy.validations.validEmail');
  const minChars = (min: number) => msg(t, 'formStudy.validations.minChars', { min });
  const maxChars = (max: number) => msg(t, 'formStudy.validations.maxChars', { max });
  const phoneLength = (count: number) => msg(t, 'formStudy.validations.phoneLength', { count });
  const validAge= msg(t, 'formStudy.validations.validAge', { min: AGE.min, max: AGE.max });

  return Yup.object({
    names: Yup.string()
      .required(required('formStudy.fields.names'))
      .matches(LETTERS_REGEX, onlyLetters)
      .min(2, minChars(2))
      .max(40, maxChars(40)),

    lastNames: Yup.string()
      .required(required('formStudy.fields.lastNames'))
      .matches(LETTERS_REGEX, onlyLetters)
      .min(2, minChars(2))
      .max(40, maxChars(40)),

    identificationType: Yup.string()
      .required(required('formStudy.fields.identificationType')),

    identificationNumber: Yup.string()
      .required(required('formStudy.fields.identificationNumber'))
      .matches(NUMBERS_REGEX, onlyNumbers)
      .min(6, minChars(6))
      .max(20, maxChars(20)),

    department: Yup.string()
      .required(required('formStudy.fields.department')),

    municipality: Yup.string()
      .required(required('formStudy.fields.municipality')),

    phone: Yup.string()
      .required(required('formStudy.fields.phone'))
      .matches(NUMBERS_REGEX, onlyNumbers)
      .length(10, phoneLength(10)),

    email: Yup.string()
      .required(required('formStudy.fields.email'))
      .email(validEmail),

    eps: Yup.string()
      .required(required('formStudy.fields.eps')),

    age: Yup.string()
      .required(required('formStudy.fields.age'))
      .matches(NUMBERS_REGEX, onlyNumbers)
      .test('valid-age-range', validAge, value => {
        if (!value) return false;
        const age = parseInt(value, 10);
        return age >= AGE.min && age <= AGE.max;
      }),

    nationality: Yup.string()
      .required(required('formStudy.fields.nationality')),

    date: Yup.date()
      .required(required('formStudy.fields.date'))
      .test('valid-birthdate', validAge, value => {
        if (!value) return false;
        return differenceInYears(new Date(), new Date(value)) >= AGE.min;
      }),

    subject: Yup.string()
      .required(required('formContact.fields.subject')),
  });
};