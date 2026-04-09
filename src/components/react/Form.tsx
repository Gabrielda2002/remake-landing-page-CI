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

export const Form: React.FC = () => {
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-['Bai_Jamjuree',sans-serif]">
      <h4 className="text-[rgb(0,121,196)] text-3xl text-left mb-3">{t('form.title')}</h4>
      <p className="text-[rgb(86,86,88)] text[18px] text-left mb-10">{t('form.subtitle')}</p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg rounded-lg p-4 md:p-6 bg-white text-[rgb(86,86,88)]" onSubmit={formik.handleSubmit}>
        {/*Nombres  */}
        <FormInput
          type="text"
          id = "names"
          name= "names"
          label = {t('form.fields.names')}
          required
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          formik={formik}
          onlyLetters
        />

  	    {/*Apellidos*/}
        <FormInput
          type="text"
          id = "lastNames"
          name= "lastNames"
          label = {t('form.fields.lastNames')}
          required = {true}
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          formik = {formik}
          onlyLetters
        />        
      
        {/* Tipo de documento */}
        <SelectField
          id='identificationType'
          name="identificationType"
          label={t('form.fields.identificationType')}
          placeholder={t('form.placeholders.identificationType')}
          data={DOCUMENT_LIST}
          formik={formik}
          required
        />

        {/* Numero ID */}
        <FormInput
          type="text"
          id = "identificationNumber"
          name= "identificationNumber"
          label = {t('form.fields.identificationNumber')}
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
          label = {t('form.fields.phone')}
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
          label = {t('form.fields.email')}
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
          label = {t('form.fields.age')}
          required = {true}
          pattern =  "[0-9]*"
          formik = {formik}
          onlyNumbers
        />

        {/*Nacionalidad*/}
        <SelectField
          id="nationality"
          name="nationality"
          label={t('form.fields.nationality')}
          placeholder={t('form.placeholders.nationality')}
          data={NATIONALITY}
          formik={formik}
          required={true}
        />
              
        {/*Fecha*/}
        <FormDateInput
          id="date"
          name="date"
          label={t('form.fields.date')}
          required
          formik={formik}
        />
        
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