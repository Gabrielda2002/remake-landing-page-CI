// src/scripts/languageSelector.ts
export function initLanguageSelector() {
  const wrapper = document.getElementById('selectedWrapper');
  const dropdown = document.getElementById('languageDropdown');
  const currentFlag = document.getElementById('currentFlag');
  
  wrapper?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('hidden');
    wrapper.classList.toggle('is-open');
  });

  document.querySelectorAll('.flag-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const flagSrc = option.getAttribute('data-flag');
      if (currentFlag && flagSrc && currentFlag instanceof HTMLImageElement) {
        currentFlag.src = flagSrc;
        const spanText = option.querySelector('span')?.textContent || '';
        currentFlag.alt = spanText;
      }
      
      dropdown?.classList.add('hidden');
      wrapper?.classList.remove('is-open'); 

    });
  });

  document.addEventListener('click', (e) => {
    if (wrapper && dropdown && 
        !wrapper.contains(e.target as Node) && 
        !dropdown.contains(e.target as Node)) {
      dropdown.classList.add('hidden');
      wrapper.classList.remove('is-open'); 
    }
  });
}