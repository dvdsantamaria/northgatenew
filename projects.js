if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

const menuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle && mobileMenu) {
  const menuIcon = menuToggle.querySelector('.menu-icon');
  const closeIcon = menuToggle.querySelector('.menu-close');
  const setMenuOpen = (open) => {
    mobileMenu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('menu-open', open);
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle('hidden', open);
      closeIcon.classList.toggle('hidden', !open);
    }
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(!mobileMenu.classList.contains('is-open'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.project-carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const prev = carousel.querySelector('.carousel-arrow.prev');
  const next = carousel.querySelector('.carousel-arrow.next');
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const goTo = (dir) => {
    index = (index + dir + slides.length) % slides.length;
    update();
  };

  const start = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => goTo(1), 4000);
  };

  prev?.addEventListener('click', () => {
    goTo(-1);
    start();
  });

  next?.addEventListener('click', () => {
    goTo(1);
    start();
  });

  start();
});
