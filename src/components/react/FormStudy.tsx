import React, { useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { LocationSelectors } from './LocationSelectors';
import FormInput from './FormInput';
import { EpsSelect } from './EpsSelect';
import { getValidationSchema } from '@/schemas/formSchema';
import { initialValues } from '@/constants/initialValues';
import { DOCUMENT_LIST } from '@/constants/identificationType';
import { NATIONALITY } from '@/constants/nationality';
import { SelectField } from './OptionSelect';
import { FormDateInput } from './FormDateInput';
import { useTranslation } from '@/hooks/useTranslation';

export const FormStudy: React.FC = () => {
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
      <p className="text-[rgb(86,86,88)] text[18px] text-left mx-4">{t('formStudy.subtitle')}</p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg rounded-lg p-4 md:p-6 bg-white text-[rgb(86,86,88)]" onSubmit={formik.handleSubmit}>
        {/*Nombres  */}
        <FormInput
          type="text"
          id = "names"
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
          id = "lastNames"
          name= "lastNames"
          label = {t('formStudy.fields.lastNames')}
          required = {true}
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          formik = {formik}
          onlyLetters
        />        
      
        {/* Tipo de documento */}
        <SelectField
          id='identificationType'
          name="identificationType"
          label={t('formStudy.fields.identificationType')}
          placeholder={t('formStudy.placeholders.identificationType')}
          data={DOCUMENT_LIST}
          formik={formik}
          required
        />

        {/* Numero ID */}
        <FormInput
          type="text"
          id = "identificationNumber"
          name= "identificationNumber"
          label = {t('formStudy.fields.identificationNumber')}
          required
          pattern = "[0-9]*"
          formik={formik}
          onlyNumbers
        />

        {/* Departamento - Municipio */}
        <LocationSelectors formik={formik} />
        
        {/*Telefono*/}
        <FormInput
          type="tel"
          id = "phone"
          name= "phone"
          label = {t('formStudy.fields.phone')}
          required = {true}
          pattern =  "[0-9]*"
          formik = {formik}
          onlyNumbers
        />

        {/*Email*/}
        <FormInput
          type="email"
          id = "email"
          name= "email"
          label = {t('formStudy.fields.email')}
          required = {true}
          formik={formik}
        />

        {/*Eps*/}
        <EpsSelect formik={formik}/>

        {/* Edad */}
        <FormInput
          type="text"
          id = "age"
          name= "age"
          label = {t('formStudy.fields.age')}
          required = {true}
          pattern =  "[0-9]*"
          formik = {formik}
          onlyNumbers
        />

        {/*Nacionalidad*/}
        <SelectField
          id="nationality"
          name="nationality"
          label={t('formStudy.fields.nationality')}
          placeholder={t('formStudy.placeholders.nationality')}
          data={NATIONALITY}
          formik={formik}
          required={true}
        />
              
        {/*Fecha*/}
        <FormDateInput
          id="date"
          name="date"
          label={t('formStudy.fields.date')}
          required
          formik={formik}
        />
        
        <div className="w-full flex justify-center mt-4 md:col-span-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="text-[16px] px-6 py-2 bg-[rgb(0,179,160)] rounded-lg border text-white w-auto hover:bg-[rgb(0,160,143)] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {formik.isSubmitting ? t('formStudy.button.submitting') : t('formStudy.button.submit')}
          </button>
        </div>

      </form>
    </div>
  );
};