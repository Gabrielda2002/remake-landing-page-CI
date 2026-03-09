// components/FormInput.tsx
import React from 'react';
import { useFormik } from 'formik';
import { validateOnlyLetters, validateOnlyNumbers } from '@/utils/formValidations';

interface InputProps {
  type: string;
  id: string;
  name: string;
  label: string;
  required?: boolean;
  pattern?: string;
  formik: ReturnType<typeof useFormik<any>>;
  onlyLetters?: boolean;
  onlyNumbers?:boolean;
}

const FormInput: React.FC<InputProps> = ({
  type,
  id,
  name,
  label,
  required = false,
  pattern,
  formik,
  onlyLetters,
  onlyNumbers
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

  return (
    <div className="flex flex-col">
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
          ${error 
            ? 'border-red-500' 
            : 'border-[rgb(168,182,201)] focus:border-[rgb(0,179,160)]'
          }
        `}
      />

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default FormInput; 