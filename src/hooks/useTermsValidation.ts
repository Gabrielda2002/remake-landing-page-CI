import { useState } from 'react';
import type { UseFormHandleSubmit, FieldValues } from 'react-hook-form';

interface UseTermsValidationReturn {
  termsProps: {
    checked: boolean;
    onChange: (val: boolean) => void;
  };
  accepted: boolean;
}

export const useTermsValidation = <T extends FieldValues>(
  handleSubmit: UseFormHandleSubmit<T>,
  onSubmit: (data: T) => void,
): UseTermsValidationReturn & { handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> } => {
  const [accepted, setAccepted] = useState(false);

  const termsProps = {
    checked: accepted,
    onChange: (val: boolean) => setAccepted(val),
  };

  return {
    termsProps,
    accepted,
    handleSubmit: handleSubmit(onSubmit),
  };
};
