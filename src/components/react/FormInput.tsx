import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { validateOnlyLetters, validateOnlyNumbers } from '@/utils/formValidations';

interface FormInputProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  id: string;
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  required?: boolean;
  pattern?: string;
  onlyLetters?: boolean;
  onlyNumbers?: boolean;
  variant?: 'default' | 'custom';
}

const FormInput = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  onlyLetters,
  onlyNumbers,
  variant = 'default',
  className = '',
  type = 'text',
  required,
  pattern,
  ...props
}: FormInputProps<T>) => {
  const getVariantStyles = (hasError: boolean): string => {
    if (hasError) return 'border-red-500';

    const base = 'border-[rgb(168,182,201)] focus:border-[rgb(0,179,160)]';
    return variant === 'custom' ? `${base} w-full col-span-2` : base;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value;

          if (onlyLetters) {
            value = validateOnlyLetters(value);
          } else if (onlyNumbers) {
            value = validateOnlyNumbers(value);
          }

          field.onChange(value);
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
              name={field.name}
              value={field.value ?? ''}
              onChange={handleChange}
              onBlur={field.onBlur}
              pattern={pattern}
              className={`
                w-full border p-2 rounded focus:outline-none
                ${getVariantStyles(!!fieldState.error)}
                ${className}
              `}
              {...props}
            />

            {fieldState.error && (
              <span className="text-red-500 text-sm mt-1 font-medium">{fieldState.error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormInput;
