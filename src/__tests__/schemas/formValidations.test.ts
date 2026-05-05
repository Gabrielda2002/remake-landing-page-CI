import { validateOnlyLetters, validateOnlyNumbers } from '@/utils/formValidations';

describe('Form Validations', () => {
  describe('validateOnlyLetters', () => {
    it('should remove numbers from string', () => {
      const result = validateOnlyLetters('Juan123');
      expect(result).toBe('JUAN');
    });

    it('should remove special characters', () => {
      const result = validateOnlyLetters('Juan@#$%');
      expect(result).toBe('JUAN');
    });

    it('should keep accented characters', () => {
      const result = validateOnlyLetters('José María');
      expect(result).toBe('JOSÉ MARÍA');
    });

    it('should convert to uppercase', () => {
      const result = validateOnlyLetters('juan');
      expect(result).toBe('JUAN');
    });

    it('should handle empty string', () => {
      const result = validateOnlyLetters('');
      expect(result).toBe('');
    });

    it('should keep spaces', () => {
      const result = validateOnlyLetters('Juan Perez');
      expect(result).toBe('JUAN PEREZ');
    });
  });

  describe('validateOnlyNumbers', () => {
    it('should remove letters from string', () => {
      const result = validateOnlyNumbers('123abc456');
      expect(result).toBe('123456');
    });

    it('should remove special characters', () => {
      const result = validateOnlyNumbers('123-456-7890');
      expect(result).toBe('1234567890');
    });

    it('should remove spaces', () => {
      const result = validateOnlyNumbers('123 456 7890');
      expect(result).toBe('1234567890');
    });

    it('should handle empty string', () => {
      const result = validateOnlyNumbers('');
      expect(result).toBe('');
    });

    it('should keep only digits', () => {
      const result = validateOnlyNumbers('abc123DEF456');
      expect(result).toBe('123456');
    });

    it('should handle string with only letters', () => {
      const result = validateOnlyNumbers('abcdef');
      expect(result).toBe('');
    });
  });
});