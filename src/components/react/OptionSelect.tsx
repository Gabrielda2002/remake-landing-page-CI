import React, { useState } from 'react';
import { useFormik } from 'formik';
import { SelectArrow } from '../ui/SelectArrow';
import { SelectDropdown } from '../ui/SelectDropdown';
import type { OptionData } from '@/types/OptionData'; 

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  data: OptionData[];
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
  const [isOpen, setIsOpen] = useState(false);
  
  const error = formik.touched[name] && formik.errors[name]
    ? String(formik.errors[name])
    : undefined;

  const selectedOption = data.find(item => item.id === formik.values[name]);

  const options = data.map(item => ({
    value: item.id,
    label: item.name
  }));

  return (
    <div className="flex flex-col w-full font-['Bai_Jamjuree',sans-serif]">
      <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => formik.setFieldTouched(name, true)}
          className={`
            w-full border p-2 rounded h-10.5 cursor-pointer flex items-center justify-between
            ${error ? 'border-red-500' : 'border-[rgb(168,182,201)]'}
            text-[rgb(86,86,88)]
            hover:border-[rgb(0,179,160)] focus:border-[rgb(0,179,160)] outline-none
          `}
          tabIndex={0}
        >
          <span>{selectedOption ? selectedOption.name : placeholder}</span>
          <SelectArrow isOpen={isOpen} />
        </div>

        <SelectDropdown
          isOpen={isOpen}
          options={options}
          filteredOptions={options}
          value={formik.values[name]}
          onSelectOption={(value) => {
            formik.setFieldValue(name, value);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
          id={id}
        />
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1 font-medium">{error}</span>
      )}
    </div>
  );
};