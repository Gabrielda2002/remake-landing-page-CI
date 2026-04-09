import { useState, useEffect } from 'react';
import { translations, defaultLang } from '@/data/translations';

type Lang = keyof typeof translations;

//Lee localStorage y decide con qué idioma empezar
export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') as Lang | null;
      return savedLang || defaultLang;
    }
    return defaultLang;
  });

  //Escucha eventos 'lang-change' para cambiar el idioma
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const lang = (e as CustomEvent<{ lang: Lang }>).detail.lang;
      setCurrentLang(lang);
    };

    window.addEventListener('lang-change', handleLangChange);

    return () => {
      window.removeEventListener('lang-change', handleLangChange);
    };
  }, []);

  //Busca y devuelve el texto traducido según el idioma actual
  const t = (key: string): string => {
    const keys = key.split('.');
    const translation = keys.reduce((obj: any, k) => {
      if (obj && typeof obj === 'object') {
        return obj[k];
      }
      return obj;
    }, translations[currentLang] ?? translations[defaultLang]);

    return translation ?? key;
  };

  return { t, currentLang };
};
