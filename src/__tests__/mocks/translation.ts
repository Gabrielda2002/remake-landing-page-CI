export const mockUseTranslation = () => ({
  t: jest.fn((key: string) => key),
  currentLang: 'es',
  changeLanguage: jest.fn(),
});