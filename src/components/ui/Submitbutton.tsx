import { useTranslation } from '@/hooks/useTranslation';
import type { FormikProps } from 'formik';

interface SubmitButtonProps {
  formik: FormikProps<any>;
  extraDisabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ formik, extraDisabled }) => {
  const { t } = useTranslation();
  const isDisabled = formik.isSubmitting || !!extraDisabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="text-[16px] px-6 py-2 bg-[rgb(0,179,160)] rounded-lg border text-white w-auto hover:bg-[rgb(0,160,143)] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {formik.isSubmitting ? t('form.button.submitting') : t('formStudy.button.submit')}
    </button>
  );
};