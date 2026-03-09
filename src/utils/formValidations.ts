export const validateOnlyLetters = (value: string): string => {
  return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    .toUpperCase()
};

export const validateOnlyNumbers = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};