import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LocationSelectors } from './LocationSelectors';
import FormInput from './FormInput';
import { EpsSelect } from './EpsSelect';
import { DOCUMENT_LIST } from '@/constants/identificationType';
import { NATIONALITY } from '@/constants/nationality';
import { SelectField } from './OptionSelect';
import { FormDateInput } from './FormDateInput';
import { useTranslation } from '@/hooks/useTranslation';
import { SubmitButton } from '../ui/Submitbutton';
import { useTermsValidation } from '@/hooks/useTermsValidation';
import { TermsCheckbox } from '../ui/TermsCheckbox';
import { useStudyStore } from '@/stores/useStudyStore';
import { getStudySchema } from '@/schemas/formStudySchema';
import type { FormValuesStudy } from '@/schemas/formStudySchema';

export const FormStudy: React.FC = () => {
  const { t, currentLang } = useTranslation();
  const { submitStudy, loading } = useStudyStore();

  const schema = useMemo(() => getStudySchema(t), [currentLang]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset
  } = useForm<FormValuesStudy>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      lastname: '',
      identificationType: '',
      identificationNumber: '',
      department: '',
      municipality: '',
      phone: '',
      email: '',
      eps: '',
      age: '',
      nationality: '',
      date: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    },
  });

  const onSubmit = async (data: FormValuesStudy) => {
    await submitStudy(data, () => {
      toast.success(t('formStudy.success'));
      reset();
    });
  };

  const { termsProps, accepted, handleSubmit: handleSubmitWithTerms } = useTermsValidation(
    handleSubmit,
    onSubmit,
  );

  return (
    <div>
      <p className="text-[rgb(86,86,88)] text[18px] text-left mx-4">{t('formStudy.subtitle')}</p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg rounded-lg p-4 md:p-6 bg-white text-[rgb(86,86,88)]"
        onSubmit={handleSubmitWithTerms}
      >
        {/* Nombres */}
        <FormInput<FormValuesStudy>
          type="text"
          id="names"
          name="name"
          label={t('formStudy.fields.name')}
          required
          pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          control={control}
          onlyLetters
        />

        {/* Apellidos */}
        <FormInput<FormValuesStudy>
          type="text"
          id="lastNames"
          name="lastname"
          label={t('formStudy.fields.lastname')}
          required
          pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          control={control}
          onlyLetters
        />

        {/* Tipo de documento */}
        <SelectField<FormValuesStudy>
          id="identificationType"
          name="identificationType"
          label={t('formStudy.fields.identificationType')}
          placeholder={t('formStudy.placeholders.identificationType')}
          data={DOCUMENT_LIST}
          control={control}
          required
        />

        {/* Número de documento */}
        <FormInput<FormValuesStudy>
          type="text"
          id="identificationNumber"
          name="identificationNumber"
          label={t('formStudy.fields.identificationNumber')}
          required
          pattern="[0-9]*"
          control={control}
          onlyNumbers
        />

        {/* Departamento - Municipio */}
        <LocationSelectors<FormValuesStudy> control={control} setValue={setValue} />

        {/* Teléfono */}
        <FormInput<FormValuesStudy>
          type="tel"
          id="phone"
          name="phone"
          label={t('formStudy.fields.phone')}
          required
          pattern="[0-9]*"
          control={control}
          onlyNumbers
        />

        {/* Email */}
        <FormInput<FormValuesStudy>
          type="email"
          id="email"
          name="email"
          label={t('formStudy.fields.email')}
          required
          control={control}
        />

        {/* EPS */}
        <EpsSelect<FormValuesStudy> name="eps" control={control} />

        {/* Edad */}
        <FormInput<FormValuesStudy>
          type="text"
          id="age"
          name="age"
          label={t('formStudy.fields.age')}
          required
          pattern="[0-9]*"
          control={control}
          onlyNumbers
        />

        {/* Nacionalidad */}
        <SelectField<FormValuesStudy>
          id="nationality"
          name="nationality"
          label={t('formStudy.fields.nationality')}
          placeholder={t('formStudy.placeholders.nationality')}
          data={NATIONALITY}
          control={control}
          required
        />

        {/* Fecha de nacimiento */}
        <FormDateInput<FormValuesStudy>
          id="date"
          name="date"
          label={t('formStudy.fields.date')}
          required
          control={control}
        />

        {/* Términos y condiciones */}
        <TermsCheckbox {...termsProps} />

        {/* Botón */}
        <div className="w-full flex justify-center mt-4 md:col-span-2">
          <SubmitButton isSubmitting={isSubmitting || loading} extraDisabled={!accepted} />
        </div>
      </form>
    </div>
  );
};
