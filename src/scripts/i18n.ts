import { translations, defaultLang } from "@/data/translationsNabvar";

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

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = (localStorage.getItem('lang') ?? defaultLang) as Lang;
    applyLang(savedLang);
  });
}