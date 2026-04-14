if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

// Mobile menu
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

// Initialize GSAP Plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Initialize Lenis for smooth scrolling
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
}

// Reveal animations for FAQ cards
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.utils.toArray('.byb-card').forEach((card) => {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      }
    });
  });

  // Hero reveal
  gsap.from('.byb-hero-copy', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    delay: 0.2
  });

  gsap.from('.byb-hero-media', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    delay: 0.4
  });
}
