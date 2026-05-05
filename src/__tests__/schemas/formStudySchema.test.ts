import { getStudySchema } from '@/schemas/formStudySchema';

const t = (key: string): string => key;

describe('FormStudy Schema', () => {
  describe('Age Validation', () => {
    it('should accept age between 18 and 125', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(true);
    });

    it('should reject age under 18', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '17',
        nationality: 'Colombiana',
        date: new Date('2010-01-01'),
      });
      expect(result.success).toBe(false);
    });

    it('should reject age over 125', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '130',
        nationality: 'Colombiana',
        date: new Date('1890-01-01'),
      });
      expect(result.success).toBe(false);
    });

    it('should reject age with letters', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: 'veinte',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Birth Date Validation', () => {
    it('should accept date of birth 18 years or older', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(true);
    });

    it('should reject date of birth less than 18 years', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '17',
        nationality: 'Colombiana',
        date: new Date('2020-01-01'),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Identification Validation', () => {
    it('should reject document number less than 6 characters', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });

    it('should reject document number with letters', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345abc',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid document number', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Location Validation', () => {
    it('should reject empty department', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: '',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty municipality', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: '',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Phone Validation', () => {
    it('should reject phone with less than 10 digits', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '123456',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });

    it('should reject phone with more than 10 digits', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '12345678901',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '25',
        nationality: 'Colombiana',
        date: new Date('2000-01-01'),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Valid Complete Form', () => {
    it('should accept valid complete form', () => {
      const schema = getStudySchema(t);
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Pérez',
        identificationType: 'CC',
        identificationNumber: '12345678',
        department: 'Antioquia',
        municipality: 'Medellín',
        phone: '1234567890',
        email: 'juan@example.com',
        eps: 'Sura',
        age: '30',
        nationality: 'Colombiana',
        date: new Date('1995-06-15'),
      });
      expect(result.success).toBe(true);
    });
  });
});