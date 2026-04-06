import { translations, defaultLang } from "@/data/translations";

type Lang = keyof typeof translations;

export function applyLang(lang: Lang) {
  const t = translations[lang] ?? translations[defaultLang];
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const keys = el.dataset.i18n!.split('.');
    const text = keys.reduce((obj: any, key) => obj?.[key], t);
    if (text) el.textContent = text;
  });
}

export function initI18n() {
  window.addEventListener('lang-change', (e: Event) => {
    applyLang((e as CustomEvent<{ lang: Lang }>).detail.lang);
  });

  const savedLang = localStorage.getItem('lang') as Lang | null;

  if (savedLang && savedLang !== defaultLang) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyLang(savedLang));
    } else {
      applyLang(savedLang);
    }
  }
}