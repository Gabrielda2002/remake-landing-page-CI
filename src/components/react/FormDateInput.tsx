import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { addLocale, locale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
});

locale('es');

interface FormDateInputProps<T extends FieldValues> {
  id: string;
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  required?: boolean;
  minAge?: number;
}

export const FormDateInput = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  required,
  minAge = 18,
}: FormDateInputProps<T>) => {
  const [maxDate] = useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={maxDate as Parameters<typeof control.register>[1] extends infer O ? O : never}
      render={({ field, fieldState }) => (
        <div className="flex flex-col w-full">
          <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <Calendar
            id={id}
            name={field.name}
            value={field.value as Date | null}
            onChange={(e) => field.onChange(e.value)}
            onBlur={field.onBlur}
            dateFormat="dd/mm/yy"
            className="w-full [&_.p-inputtext]:px-2 [&_.p-inputtext]:py-1 [&_.p-inputtext]:text-sm [&_.p-inputtext]:h-10.75 [&_.p-inputtext:read-only]:cursor-pointer [&_.p-inputtext:read-only]:bg-white"
            inputClassName="w-full border border-[rgb(168,182,201)] rounded focus:outline-none focus:border-[rgb(0,179,160)]"
            panelClassName="w-full [&_.p-datepicker]:w-full"
            locale="es"
            readOnlyInput
            maxDate={maxDate}
          />

          {fieldState.error && (
            <span className="text-red-500 text-sm mt-1 font-medium">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
};
