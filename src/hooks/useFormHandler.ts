import { useEffect, useMemo } from "react"
import { useTranslation } from "./useTranslation";
import { getValidationSchema } from "@/schemas/formSchema";
import { useFormik } from "formik";

export const useFormHandler = <T extends object>(initialValues: T) => {
  const { t, currentLang } = useTranslation();
  const validationSchema = useMemo(() => getValidationSchema(t), [currentLang]);

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        return;
      }
    });
    
    // Re-validar cuando cambia el idioma para actualizar los mensajes de error visibles
    useEffect(() => {
      if (Object.keys(formik.touched).length > 0) {
        formik.validateForm();
      }
    }, [currentLang]);
  
  return formik;
}