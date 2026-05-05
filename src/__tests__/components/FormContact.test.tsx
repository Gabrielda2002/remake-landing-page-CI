import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormContact } from '@/components/react/FormContact';

jest.mock('@/stores/useContactStore', () => ({
  useContactStore: jest.fn(() => ({
    submitContact: jest.fn(),
    loading: false,
    data: null,
  })),
}));

describe('FormContact Component', () => {
  it('should render form subtitle', () => {
    render(<FormContact />);
    expect(screen.getByText('formContact.subtitle')).toBeInTheDocument();
  });

  it('should render name field label', () => {
    render(<FormContact />);
    expect(screen.getByText('formStudy.fields.name')).toBeInTheDocument();
  });

  it('should render lastname field label', () => {
    render(<FormContact />);
    expect(screen.getByText('formStudy.fields.lastname')).toBeInTheDocument();
  });

  it('should render email field label', () => {
    render(<FormContact />);
    expect(screen.getByText('formStudy.fields.email')).toBeInTheDocument();
  });

  it('should render phone field label', () => {
    render(<FormContact />);
    expect(screen.getByText('formStudy.fields.phone')).toBeInTheDocument();
  });

  it('should render subject field label', () => {
    render(<FormContact />);
    expect(screen.getByText('formContact.fields.subject')).toBeInTheDocument();
  });

  it('should render description field label', () => {
    render(<FormContact />);
    expect(screen.getByText('formContact.fields.description')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<FormContact />);
    expect(screen.getByRole('button', { name: 'formStudy.button.submit' })).toBeInTheDocument();
  });
});