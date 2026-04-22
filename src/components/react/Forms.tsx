import { useTranslation } from "@/hooks/useTranslation"
import { FormContact } from "./FormContact";
import { FormStudy } from "./FormStudy";
import { useState } from "react";

interface FormsItems {
  key: string;
  label: string;
}

export const Form: React.FC = () => {
  const [activeForm, setActiveForm] = useState('contact');
  const { t } = useTranslation();

  const formButtons: Array<FormsItems> = [
    { key: 'contact', label: t('form.buttons.contact') },
    { key: 'study',   label: t('form.buttons.study') },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-['Bai_Jamjuree',sans-serif]">
      <h4 className="text-[rgb(0,121,196)] text-3xl text-center p-0">
        {t('form.title')}
      </h4>

      <div className="flex justify-start gap-4 p-4">
        {formButtons.map(({ key, label }) => {
          const isActive = activeForm === key;
          return (
            <button
              key={key}
              onClick={() => setActiveForm(key)}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                isActive
                  ? 'bg-[rgb(0,179,160)] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-[rgb(0,179,160)] hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {activeForm === 'contact' ? <FormContact /> : <FormStudy />}
    </div>
  );
};