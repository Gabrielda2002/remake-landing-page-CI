export function initProfessionalLightbox() {
  const lightbox = document.getElementById('professional-lightbox');
  const lightboxImage = document.getElementById('professional-lightbox-image') as HTMLImageElement | null;
  const closeButton = lightbox?.querySelector('[data-lightbox-close]');
  const triggerButtons = document.querySelectorAll<HTMLElement>('[data-professional-trigger]');

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.classList.remove('overflow-hidden');
  };

  const openLightbox = (src: string, alt: string) => {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  };

  triggerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const imageSrc = button.getAttribute('data-image-src');
      const imageAlt = button.getAttribute('data-image-alt') || 'Imagen de profesional';

      if (!imageSrc) return;
      openLightbox(imageSrc, imageAlt);
    });
  });

  closeButton?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}
