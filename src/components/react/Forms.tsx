import { useTranslation } from "@/hooks/useTranslation"
import { FormContact } from "./FormContact";
import { FormStudy } from "./FormStudy";
import { useState } from "react";

const formButtons = [
  { key: 'contact', label: 'Contacto' },
  { key: 'study',   label: 'Estudio Clinico' },
];

export const Form: React.FC = () => {
  const [activeForm, setActiveForm] = useState('contact');
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-['Bai_Jamjuree',sans-serif]">
      <h4 className="text-[rgb(0,121,196)] text-3xl text-center p-0">
        {t('form.title')}
      </h4>

      <div className="flex justify-start gap-4 p-4">
        {formButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveForm(key)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-[rgb(0,179,160)] hover:text-white"
          >
            {label}
          </button>
        ))}
      </div>

      {activeForm === 'contact' ? <FormContact /> : <FormStudy />}
    </div>
  );
};