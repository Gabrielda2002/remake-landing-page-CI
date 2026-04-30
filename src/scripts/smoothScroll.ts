export function initSmoothScroll() {
  document.querySelectorAll('.menu-link, .dropdown-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const sectionId = link.getAttribute('data-section') || href.replace('#', '');
      if (sectionId) {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}