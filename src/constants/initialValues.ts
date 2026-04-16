
import type { FormValuesStudy, FormValuesContact } from '@/types/FormValues';

export const initialValuesStudy: FormValuesStudy = {
  names: '',
  lastNames: '',
  identificationType: '',
  identificationNumber: '',
  department: '',
  municipality: '',
  phone: '',
  email: '',
  eps: '',
  age: '',
  nationality: '',
  date: null  
};

export const initialValuesContact: FormValuesContact = {
  names: '',
  lastNames: '',
  phone: '',
  email: '',
  subject: '',
  description: ''
};