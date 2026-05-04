import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { EPS_LIST } from '@/constants/epsList';
import { SelectSearch } from '../ui/SelectSearch';
import type { SelectOption } from '@/types/SelectOption';
import { useTranslation } from '@/hooks/useTranslation';

interface EpsSelectProps<T extends FieldValues> {
  id?: string;
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  control: Control<T>;
}

export const EpsSelect = <T extends FieldValues>({
  id = 'eps',
  name,
  label,
  required = true,
  control,
}: EpsSelectProps<T>) => {
  const { t } = useTranslation();
  const finalLabel = label ?? t('formStudy.fields.eps');

  const options: SelectOption[] = EPS_LIST.map((eps) => ({
    value: eps.name,
    label: eps.name,
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col">
          <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
            {finalLabel}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <SelectSearch
            id={id}
            name={field.name}
            value={field.value as string}
            options={options}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            placeholder={t('formStudy.placeholders.eps')}
            required={required}
            error={fieldState.error?.message}
          />
        </div>
      )}
    />
  );
};
