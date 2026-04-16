  import React, { useMemo, useEffect } from 'react';
  import { useFormik } from 'formik';
  import FormInput from './FormInput';
  import { getValidationSchema } from '@/schemas/formSchema';
  import { initialValues } from '@/constants/initialValues';
  import { useTranslation } from '@/hooks/useTranslation';

  export const FormContact: React.FC = () => {
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

    return (
      <div>
        <p className="text-[rgb(86,86,88)] text[18px] text-left mx-4">{t('formContact.subtitle')}</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg rounded-lg p-4 md:p-6 bg-white text-[rgb(86,86,88)]" onSubmit={formik.handleSubmit}>
          
          {/*Nombres  */}
          <FormInput
            type="text"
            id = "contact-names"
            name= "names"
            label = {t('formStudy.fields.names')}
            required
            pattern = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
            formik={formik}
            onlyLetters
          />

          {/*Apellidos*/}
          <FormInput
            type="text"
            id = "contact-lastNames"
            name= "lastNames"
            label = {t('formStudy.fields.lastNames')}
            required = {true}
            pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
            formik = {formik}
            onlyLetters
          /> 
        
          {/*Email*/}
          <FormInput
            type="email"
            id = "contact-email"
            name= "email"
            label = {t('formStudy.fields.email')}
            required = {true}
            formik={formik}
          />

          {/*Telefono*/}
          <FormInput
            type="tel"
            id = "contact-phone"
            name= "phone"
            label = {t('formStudy.fields.phone')}
            required = {true}
            formik = {formik}
            onlyNumbers
          />

          {/*Asunto*/}
          <FormInput
            type="text"
            id = "contact-subject"
            name= "subject"
            label = {t('formContact.fields.subject')}
            required = {true}
            formik = {formik}
            variant='custom'
          />

          {/*Descripcion*/}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="contact-description" className="text-[rgb(0,179,160)] mb-2">
              {t('formContact.fields.descipcion')}
            </label>
            <textarea
              id="contact-description"
              name="description"
              onChange={formik.handleChange}
              rows={4}
              className="w-full border p-2 rounded focus:outline-none border-[rgb(168,182,201)] focus:border-[rgb(0,179,160)]"
            />
          </div>

          <div className="w-full flex justify-center mt-4 md:col-span-2">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="text-[16px] px-6 py-2 bg-[rgb(0,179,160)] rounded-lg border text-white w-auto hover:bg-[rgb(0,160,143)] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              {formik.isSubmitting ? t('form.button.submitting') : t('form.button.submit')}
            </button>
          </div>

        </form>
      </div>
    );
  };