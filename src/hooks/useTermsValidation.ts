import { useState } from 'react';
import type { FormikProps } from 'formik';

export const useTermsValidation = (formik: FormikProps<any>) => {
  const [accepted, setAccepted] = useState(false);

  const onAcceptedChange = (val: boolean) => {
    setAccepted(val);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    formik.handleSubmit(e as any);
  };

  const termsProps = {
    checked: accepted,
    onChange: onAcceptedChange,
  };

  return { termsProps, accepted, handleSubmit };
};
