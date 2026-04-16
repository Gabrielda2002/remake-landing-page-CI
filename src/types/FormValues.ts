export interface FormValuesStudy {
  names: string;
  lastNames: string;
  identificationType: string;
  identificationNumber: string;
  department: string;
  municipality: string;
  phone: string;
  email: string;
  eps: string;
  age: string;
  nationality: string;
  date: Date | null;
}

export interface FormValuesContact {
  names: string,
  lastNames: string,
  phone: string,
  email: string,
  subject: string,
  description: string | null
}