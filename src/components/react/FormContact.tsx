import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';
import { useTranslation } from '@/hooks/useTranslation';
import { SubmitButton } from '../ui/Submitbutton';
import { getContactSchema } from '@/schemas/formContactSchema';
import type { FormValuesContact } from '@/schemas/formContactSchema';
import { useContactStore } from '@/stores/useContactStore';
import { toast } from 'sonner';
import emailJs from '@emailjs/browser';

export const FormContact: React.FC = () => {
  const { t, currentLang } = useTranslation();
  const { submitContact, loading, data } = useContactStore();

  const schema = useMemo(() => getContactSchema(t), [currentLang]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<FormValuesContact>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      subject: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormValuesContact) => {
    await submitContact(data, () => {
      toast.success(t('formContact.success'));
      reset();
    });
  };

  return (
    <div>
      <p className="text-[rgb(86,86,88)] text[18px] text-left mx-4">{t('formContact.subtitle')}</p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg rounded-lg p-4 md:p-6 bg-white text-[rgb(86,86,88)]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Nombres */}
        <FormInput<FormValuesContact>
          type="text"
          id="contact-name"
          name="name"
          label={t('formStudy.fields.name')}
          required
          pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          control={control}
          onlyLetters
        />

        {/* Apellidos */}
        <FormInput<FormValuesContact>
          type="text"
          id="contact-lastname"
          name="lastname"
          label={t('formStudy.fields.lastname')}
          required
          pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ ]+"
          control={control}
          onlyLetters
        />

        {/* Email */}
        <FormInput<FormValuesContact>
          type="email"
          id="contact-email"
          name="email"
          label={t('formStudy.fields.email')}
          required
          control={control}
        />

        {/* Teléfono */}
        <FormInput<FormValuesContact>
          type="tel"
          id="contact-phone"
          name="phone"
          label={t('formStudy.fields.phone')}
          required
          control={control}
          onlyNumbers
        />

        {/* Asunto */}
        <FormInput<FormValuesContact>
          type="text"
          id="contact-subject"
          name="subject"
          label={t('formContact.fields.subject')}
          required
          control={control}
          variant="custom"
        />

        {/* Descripción */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="contact-description" className="text-[rgb(0,179,160)] mb-2">
                {t('formContact.fields.description')}
              </label>
              <textarea
                id="contact-description"
                {...field}
                value={field.value ?? ''}
                rows={4}
                className="w-full border p-2 rounded focus:outline-none border-[rgb(168,182,201)] focus:border-[rgb(0,179,160)]"
              />
            </div>
          )}
        />

        <div className="w-full flex justify-center mt-4 md:col-span-2">
          <SubmitButton isSubmitting={isSubmitting || loading} />
        </div>
      </form>
    </div>
  );
};
