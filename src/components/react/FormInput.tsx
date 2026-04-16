// components/FormInput.tsx
import React from 'react';
import { useFormik } from 'formik';
import { validateOnlyLetters, validateOnlyNumbers } from '@/utils/formValidations';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  pattern?: string;
  formik: ReturnType<typeof useFormik<any>>;
  onlyLetters?: boolean;
  onlyNumbers?: boolean;
  variant?: 'default' | 'custom';
}

const FormInput: React.FC<InputProps> = ({
  id,
  name,
  label,
  formik,
  onlyLetters,
  onlyNumbers,
  variant = 'default',
  className = '',
  type = 'text',
  required,
  pattern,
  ...props
}) => {
  const error = formik.touched[name] && formik.errors[name]
    ? String(formik.errors[name])
    : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (onlyLetters) {
      value = validateOnlyLetters(value);
    } else if (onlyNumbers) {
      value = validateOnlyNumbers(value);
    }
    formik.setFieldValue(name, value);
  }

  const getVariantStyles = () => {
    if (error) return 'border-red-500';
    
    let base = 'border-[rgb(168,182,201)] focus:border-[rgb(0,179,160)]';

    switch(variant) {
      case 'custom':
        return `${base} w-full col-span-2`;
      case 'default':
      default:
        return base;
    }
  };

  return (
    <div className={`flex flex-col ${variant === 'custom' ? 'md:col-span-2' : ''}`}>
      <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        value={formik.values[name] || ''}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        pattern={pattern}
        className={`
          w-full border p-2 rounded focus:outline-none
          ${getVariantStyles()}
          ${className}
        `}
        {...props}
      />

      {error && (
        <span className="text-red-500 text-sm mt-1 font-medium">{error}</span>
      )}
    </div>
  );
};

export default FormInput;