import { useTranslation } from '@/hooks/useTranslation';
import { useFloatingModal } from '@/hooks/useFloatingModal'; 
import { termsContent } from '@/constants/termsContent';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange, error }) => {

  const { t } = useTranslation();
  const { open, modal } = useFloatingModal();

const handleOpenTerms = (e: React.MouseEvent) => {
  e.preventDefault();
  open(termsContent);
};

  return (
  <>
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
            checked
              ? 'bg-[rgb(0,179,160)] border-[rgb(0,179,160)]'
              : 'bg-white border-gray-300'
          }`}
        >
          {checked && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span className="text-sm text-gray-500 leading-relaxed">
          {t('checkbox.accept')} 
          {" "}

          <button onClick={handleOpenTerms} className="text-[rgb(0,121,196)] hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"> {t('checkbox.messague')}</button>
        </span>
      </label>
    {error && (
      <p className="text-red-500 text-xs ml-7">{error}</p>
    )}
    </div>
    {modal} 
  </>
  )
};