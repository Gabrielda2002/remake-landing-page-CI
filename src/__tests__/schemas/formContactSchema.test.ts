import { getContactSchema } from '@/schemas/formContactSchema';

const t = (key: string): string => key;

describe('FormContact Schema', () => {
  const schema = getContactSchema(t);

  describe('Email Validation', () => {
    it('should accept valid email', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'correo-invalido',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should reject email without @', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juanexample.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Phone Validation', () => {
    it('should accept valid 10-digit phone', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(true);
    });

    it('should reject phone with less than 10 digits', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '123',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should reject phone with more than 10 digits', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '12345678901',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should reject phone with letters', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '123abc7890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Name Validation', () => {
    it('should reject name with numbers', () => {
      const result = schema.safeParse({
        name: 'Juan123',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should accept name with spaces and accented characters', () => {
      const result = schema.safeParse({
        name: 'María José',
        lastname: 'García López',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('should reject empty name', () => {
      const result = schema.safeParse({
        name: '',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty lastname', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: '',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty subject', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: '',
        description: 'Test',
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional description', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Perez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: '',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Valid Complete Form', () => {
    it('should accept valid complete form', () => {
      const result = schema.safeParse({
        name: 'Juan',
        lastname: 'Pérez',
        phone: '1234567890',
        email: 'juan@example.com',
        subject: 'Consulta',
        description: 'Tengo una pregunta sobre los servicios',
      });
      expect(result.success).toBe(true);
    });
  });
});