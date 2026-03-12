import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import { addLocale, locale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
});

locale('es');

interface DateInputProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  minAge?: number;
  maxAge?:number
  formik: ReturnType<typeof useFormik<any>>;
}

export const FormDateInput: React.FC<DateInputProps> = ({
  id,
  name,
  label,
  required,
  minAge = 18,
  formik
}) => {
  const [initialDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - minAge)));
  const error = formik.touched[name] && formik.errors[name]
    ? String(formik.errors[name])
    : undefined;

  useEffect(() => {
    if (!formik.values[name]) {
      formik.setFieldValue(name, initialDate);
    }
  }, []);
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Calendar
        id={id}
        name={name}
        value={formik.values[name]}
        onChange={(e) => formik.setFieldValue(name, e.value)}
        onBlur={() => formik.setFieldTouched(name, true)}
        dateFormat="dd/mm/yy"
        className="w-full [&_.p-inputtext]:px-2 [&_.p-inputtext]:py-1 [&_.p-inputtext]:text-sm [&_.p-inputtext]:h-10.75 [&_.p-inputtext:read-only]:cursor-pointer [&_.p-inputtext:read-only]:bg-white"
        inputClassName="w-full border border-[rgb(168,182,201)] rounded focus:outline-none focus:border-[rgb(0,179,160)]"
        panelClassName="w-full [&_.p-datepicker]:w-full"
        locale="es"
        readOnlyInput
        maxDate={initialDate}
        
      />

      {error && (
        <span className="text-red-500 text-sm mt-1 font-medium">{error}</span>
      )}
    </div>
  );
};