export function initSmoothScroll() {
  document.querySelectorAll('.menu-link, .dropdown-menu a[href^="#"], .dropdown-menu a[href^="/#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const linkUrl = new URL(href, location.href);
      const sectionId = link.getAttribute('data-section') || linkUrl.hash.replace('#', '');

      if (!sectionId) return;

      if (linkUrl.pathname === location.pathname) {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', `#${sectionId}`);
      }
    });
  });
}