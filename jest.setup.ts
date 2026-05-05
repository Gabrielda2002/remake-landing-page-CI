import '@testing-library/jest-dom';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render }: any) => render({
    field: {
      name: 'test',
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: { current: null },
    },
    fieldState: {
      error: null,
      isTouched: false,
      isDirty: false,
    },
    formState: {
      errors: {},
      isSubmitted: false,
    },
  }),
  useForm: () => ({
    control: {
      register: jest.fn(),
      unregister: jest.fn(),
      setError: jest.fn(),
      clearErrors: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
      watch: jest.fn(),
      trigger: jest.fn(),
    },
    handleSubmit: jest.fn((fn: any) => fn),
    register: jest.fn(),
    unregister: jest.fn(),
    setError: jest.fn(),
    clearErrors: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
    trigger: jest.fn(),
    formState: {
      errors: {},
      isSubmitted: false,
      isSubmitting: false,
      isValid: true,
    },
    reset: jest.fn(),
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

jest.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    currentLang: 'es',
  }),
}));

jest.mock('@/lib/api', () => ({
  api: {
    contact: jest.fn().mockResolvedValue({ status: 200 }),
    study: jest.fn().mockResolvedValue({ status: 200 }),
  },
}));

jest.mock('zustand', () => ({
  create: (fn) => {
    const store = fn();
    return jest.fn().mockImplementation(() => store);
  },
}));