import React from 'react';
import { useFormik } from 'formik';

interface SelectOption {
  id: string | number;
  name: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  data: SelectOption[];
  required?: boolean;
  formik: ReturnType<typeof useFormik<any>>;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  data,
  required = true,
  formik
}) => {
  const error = formik.touched[name] && formik.errors[name]
    ? String(formik.errors[name])
    : undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-[rgb(0,179,160)] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={id}
          name={name}
          value={formik.values[name] || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`
            w-full border p-2 rounded h-10.5 focus:outline-none appearance-none pr-10
            ${!formik.values[name] ? 'text-gray-400' : 'text-black'}
            ${error 
              ? 'border-red-500' 
              : 'border-[rgb(168,182,201)] focus:border-[rgb(0,179,160)]'
            }
          `}
        >
          <option value="" hidden disabled className="text-gray-400">
            {placeholder}
          </option>
          {data.map((item) => (
            <option  
              key={item.id} 
              value={item.id}
              className="p-2 text-black"
            >
              {item.name}
            </option>
          ))}
        </select>
        
        {/* Flecha personalizada */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};