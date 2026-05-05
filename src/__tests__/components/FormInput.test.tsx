import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/react/FormInput';

interface TestFormValues {
  testField: string;
  email: string;
}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { control } = useForm<TestFormValues>({
    defaultValues: {
      testField: '',
      email: '',
    },
  });
  return <form>{children}</form>;
};

describe('FormInput Component', () => {
  it('should render label correctly', () => {
    render(
      <TestWrapper>
        <FormInput
          id="test-input"
          name="testField"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should show required asterisk when required prop is true', () => {
    render(
      <TestWrapper>
        <FormInput
          id="test-input"
          name="testField"
          label="Test Label"
          control={{} as any}
          required
        />
      </TestWrapper>
    );

    const label = screen.getByText('Test Label');
    expect(label).toHaveTextContent('*');
  });

  it('should render input with correct type', () => {
    render(
      <TestWrapper>
        <FormInput
          id="test-email"
          name="email"
          label="Email"
          control={{} as any}
          type="email"
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('should render input with correct id', () => {
    render(
      <TestWrapper>
        <FormInput
          id="custom-id"
          name="testField"
          label="Test Label"
          control={{} as any}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toHaveAttribute('id', 'custom-id');
  });
});