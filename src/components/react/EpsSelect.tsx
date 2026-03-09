import { useFormik } from "formik";
import { EPS_LIST} from "@/constants/epsList";
import { SelectSearch, type SelectOption } from "../ui/SelectSearch";

interface EpsSelectProps<T extends { eps: string }> {
  id?: string;
  name?: keyof T;
  label?: string;
  required?: boolean;
  formik: ReturnType<typeof useFormik<T>>;
}

export const EpsSelect = <T extends { eps: string }>({
  id = "eps",
  name = "eps" as keyof T,
  label = "EPS",
  required = true,
  formik
}: EpsSelectProps<T>) => {
  const options: SelectOption[] = EPS_LIST.map(eps => ({
    value: eps.id,
    label: eps.name 
  }));

  const getErrorMessage = () => {
    if (!formik.touched[name] || !formik.errors[name]) return undefined;
    return typeof formik.errors[name] === 'string' 
      ? formik.errors[name] 
      : 'Error de validación';
  }; 

  return (
    <div className="flex flex-col">
      <label htmlFor={String(id)} className="text-[rgb(0,179,160)] mb-2">
        {label}
      </label>

      <SelectSearch
        id={String(id)}
        name={String(name)}
        value={formik.values[name] as string}
        options={options}
        onChange={(value) => formik.setFieldValue(String(name), value)}
        onBlur={() => formik.setFieldTouched(String(name), true)}
        placeholder="EPS"
        required={required}
        error={getErrorMessage()}
      />
   </div> 
  );
};