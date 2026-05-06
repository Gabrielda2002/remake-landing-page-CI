import { z } from 'zod';
import { differenceInYears } from 'date-fns';

type TFn = (key: string) => string;

const LETTERS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const NUMBERS_REGEX = /^[0-9]+$/;
const AGE = { min: 18, max: 125 } as const;

const interpolate = (text: string, vars: Record<string, string | number>): string =>
  Object.entries(vars).reduce((str, [k, v]) => str.replace(`{{${k}}}`, String(v)), text);

const msg = (t: TFn, key: string, vars?: Record<string, string | number>): string => {
  const text = t(key);
  return vars ? interpolate(text, vars) : text;
};

export const getStudySchema = (t: TFn) => {
  const required = (key: string) => msg(t, 'formStudy.validations.required', { field: t(key) });
  const onlyLetters = msg(t, 'formStudy.validations.onlyLetters');
  const onlyNumbers = msg(t, 'formStudy.validations.onlyNumbers');
  const validEmail = msg(t, 'formStudy.validations.validEmail');
  const minChars = (min: number) => msg(t, 'formStudy.validations.minChars', { min });
  const maxChars = (max: number) => msg(t, 'formStudy.validations.maxChars', { max });
  const phoneLength = (count: number) => msg(t, 'formStudy.validations.phoneLength', { count });
  const validAge = msg(t, 'formStudy.validations.validAge', { min: AGE.min, max: AGE.max });
  const termsRequired = msg(t, 'formStudy.validations.termsRequired');

  return z.object({
    name: z
      .string({ message: required('formStudy.fields.name') })
      .min(2, minChars(2))
      .max(40, maxChars(40))
      .regex(LETTERS_REGEX, onlyLetters),

    lastname: z
      .string({ message: required('formStudy.fields.lastname') })
      .min(2, minChars(2))
      .max(40, maxChars(40))
      .regex(LETTERS_REGEX, onlyLetters),

    identificationType: z
      .string({ message: required('formStudy.fields.identificationType') })
      .min(1, required('formStudy.fields.identificationType')),

    identificationNumber: z
      .string({ message: required('formStudy.fields.identificationNumber') })
      .min(6, minChars(6))
      .max(20, maxChars(20))
      .regex(NUMBERS_REGEX, onlyNumbers),

    department: z
      .string({ message: required('formStudy.fields.department') })
      .min(1, required('formStudy.fields.department')),

    municipality: z
      .string({ message: required('formStudy.fields.municipality') })
      .min(1, required('formStudy.fields.municipality')),

    phone: z
      .string({ message: required('formStudy.fields.phone') })
      .regex(NUMBERS_REGEX, onlyNumbers)
      .length(10, phoneLength(10)),

    email: z
      .string({ message: required('formStudy.fields.email') })
      .email(validEmail),

    eps: z
      .string({ message: required('formStudy.fields.eps') })
      .min(1, required('formStudy.fields.eps')),

    age: z
      .string({ message: required('formStudy.fields.age') })
      .regex(NUMBERS_REGEX, onlyNumbers)
      .refine(
        (val) => {
          const n = parseInt(val, 10);
          return n >= AGE.min && n <= AGE.max;
        },
        validAge,
      ),

    nationality: z
      .string({ message: required('formStudy.fields.nationality') })
      .min(1, required('formStudy.fields.nationality')),

    date: z
      .date({ message: required('formStudy.fields.date') })
      .refine(
        (val) => differenceInYears(new Date(), val) >= AGE.min,
        validAge,
      ),

    terms: z
      .boolean()
      .refine((val) => val === true, termsRequired),
  });
};

export type StudySchema = ReturnType<typeof getStudySchema>;
export type FormValuesStudy = z.infer<StudySchema>;
