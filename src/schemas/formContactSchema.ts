import { z } from 'zod';

type TFn = (key: string) => string;

const LETTERS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const NUMBERS_REGEX = /^[0-9]+$/;

const interpolate = (text: string, vars: Record<string, string | number>): string =>
  Object.entries(vars).reduce((str, [k, v]) => str.replace(`{{${k}}}`, String(v)), text);

const msg = (t: TFn, key: string, vars?: Record<string, string | number>): string => {
  const text = t(key);
  return vars ? interpolate(text, vars) : text;
};

export const getContactSchema = (t: TFn) => {
  const required = (key: string) => msg(t, 'formStudy.validations.required', { field: t(key) });
  const onlyLetters = msg(t, 'formStudy.validations.onlyLetters');
  const onlyNumbers = msg(t, 'formStudy.validations.onlyNumbers');
  const validEmail = msg(t, 'formStudy.validations.validEmail');
  const minChars = (min: number) => msg(t, 'formStudy.validations.minChars', { min });
  const maxChars = (max: number) => msg(t, 'formStudy.validations.maxChars', { max });
  const phoneLength = (count: number) => msg(t, 'formStudy.validations.phoneLength', { count });

  return z.object({
    name: z
      .string({ message: required('formStudy.fields.names') })
      .min(2, minChars(2))
      .max(40, maxChars(40))
      .regex(LETTERS_REGEX, onlyLetters),

    lastname: z
      .string({ message: required('formStudy.fields.lastNames') })
      .min(2, minChars(2))
      .max(40, maxChars(40))
      .regex(LETTERS_REGEX, onlyLetters),

    phone: z
      .string({ message: required('formStudy.fields.phone') })
      .regex(NUMBERS_REGEX, onlyNumbers)
      .length(10, phoneLength(10)),

    email: z
      .string({ message: required('formStudy.fields.email') })
      .email(validEmail),

    subject: z
      .string({ message: required('formContact.fields.subject') })
      .min(1, required('formContact.fields.subject')),

    description: z.string().optional(),
  });
};

export type ContactSchema = ReturnType<typeof getContactSchema>;
export type FormValuesContact = z.infer<ContactSchema>;
