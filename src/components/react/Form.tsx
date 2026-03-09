import React from 'react';
import { useFormik } from 'formik';
import { LocationSelectors } from './LocationSelectors';
import FormInput from './FormInput';
import { EpsSelect } from './EpsSelect';
import { validationSchema } from '@/schemas/formSchema';
import { initialValues } from '@/constants/initialValues';
import { DOCUMENT_LIST } from '@/constants/identificationType';
import { NATIONALITY } from '@/constants/nationality';
import { SelectField } from './OptionSelect';

export const Form: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      return;
    }
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <form className="grid grid-cols-2 gap-4 shadow-lg rounded-lg p-6 bg-white" onSubmit={formik.handleSubmit}>

        {/*Nombres  */}
        <FormInput
          type="text"
          id = "names"
          name= "names"
          label = "Nombres"
          required = {true}
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          formik={formik}
          onlyLetters
        />

  	    {/*Apellidos*/}
        <FormInput
          type="text"
          id = "lastNames"
          name= "lastNames"
          label = "Apellidos"
          required = {true}
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          formik = {formik}
          onlyLetters
        />        
      
        {/* Tipo de documento */}
        <SelectField
          id='identificationType'
          name="identificationType"
          label="Tipo de identificación"
          placeholder="Tipo de identificación"
          data={DOCUMENT_LIST}
          formik={formik}
          required={true}
        />

        {/* Numero ID */}
        <FormInput
          type="text"
          id = "identificationNumber"
          name= "identificationNumber"
          label = "Número de identificación"
          required = {true}
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
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
          label = "Número de teléfono"
          required = {true}
          pattern =  "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          formik = {formik}
          onlyNumbers
        />

        {/*Email*/}
        <FormInput
          type="email"
          id = "email"
          name= "email"
          label = "Correo electrónico"
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
          label = "Edad"
          required = {true}
          formik = {formik}
          onlyNumbers
        />

        {/*Nacionalidad*/}
        <SelectField
          id="nationality"
          name="nationality"
          label="Nacionalidad"
          placeholder="Nacionalidad"
          data={NATIONALITY}
          formik={formik}
          required={true}
        />
              
        {/*Fecha*/}
        <FormInput
          type="date"
          id = "date"
          name= "date"
          label = "Fecha de nacimiento"
          required = {true}
          formik={formik}
          />

        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="text-[16px] px-6 py-2 bg-[rgb(0,179,160)] rounded-lg border text-white w-auto hover:bg-[rgb(0,160,143)] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

      </form>
    </div>
  );
};