export function initLanguageSelector() {
  const wrapper = document.getElementById('selectedWrapper');
  const dropdown = document.getElementById('languageDropdown');
  const currentFlag = document.getElementById('currentFlag') as HTMLImageElement;
  const selector = document.getElementById('languageSelector');

  // Abrir/cerrar dropdown
  wrapper?.addEventListener('click', () => {
    dropdown?.classList.toggle('hidden');
    selector?.classList.toggle('is-open');
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!selector?.contains(e.target as Node)) {
      dropdown?.classList.add('hidden');
      selector?.classList.remove('is-open');
    }
  });

  // Al seleccionar un idioma
  document.querySelectorAll<HTMLElement>('.flag-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();

      const lang = option.dataset.lang!;
      const flag = option.dataset.flag!;

      // 1. Actualizar la bandera visible
      currentFlag.src = flag;

      // 2. Guardar en localStorage
      localStorage.setItem('lang', lang);

      // 3. Disparar el evento global
      window.dispatchEvent(new CustomEvent('lang-change', { detail: { lang } }));

      // 4. Cerrar el dropdown
      dropdown?.classList.add('hidden');
      selector?.classList.remove('is-open');
    });
  });

  // Inicializar bandera según idioma guardado
  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    const savedOption = document.querySelector<HTMLElement>(
      `.flag-option[data-lang="${savedLang}"]`
    );
    if (savedOption && currentFlag) {
      currentFlag.src = savedOption.dataset.flag!;
    }
  }
}

