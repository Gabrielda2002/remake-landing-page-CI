import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { SelectArrow } from '../ui/SelectArrow';
import { SelectDropdown } from '../ui/SelectDropdown';
import type { OptionData } from '@/types/OptionData';

interface SelectFieldProps<T extends FieldValues> {
  id: string;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  data: OptionData[];
  required?: boolean;
  control: Control<T>;
}

export const SelectField = <T extends FieldValues>({
  id,
  name,
  label,
  placeholder,
  data,
  required = true,
  control,
}: SelectFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = data.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = data.find((item) => item.id === field.value);

        return (
          <div className="flex flex-col w-full font-['Bai_Jamjuree',sans-serif]">
            <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                onBlur={field.onBlur}
                className={`
                  w-full border p-2 rounded h-10.5 cursor-pointer flex items-center justify-between
                  ${fieldState.error ? 'border-red-500' : 'border-[rgb(168,182,201)]'}
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
                filteredOptions={options}
                value={field.value as string}
                highlightedIndex={highlightedIndex}
                onHighlightChange={setHighlightedIndex}
                onSelectOption={(value) => {
                  field.onChange(value);
                  setIsOpen(false);
                }}
                onClose={() => setIsOpen(false)}
                id={id}
                dropdownRef={dropdownRef}
              />
            </div>

            {fieldState.error && (
              <span className="text-red-500 text-sm mt-1 font-medium">{fieldState.error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};
