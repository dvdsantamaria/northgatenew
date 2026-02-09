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

// Initialize GSAP Plugins
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

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

  lenis.on('scroll', ScrollTrigger.update);
}

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form || form.dataset.enhanced === 'true') return;

  form.dataset.enhanced = 'true';

  const FORMSPARK_URL = 'https://submit-form.com/qT0c60B3x';
  const redirectInput = form.querySelector('input[name="_redirect"]');
  if (redirectInput) redirectInput.remove();

  const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
  let toastTimeoutId;

  const ensureToast = () => {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.setAttribute('aria-atomic', 'true');
      document.body.appendChild(toast);
    }
    return toast;
  };

  const showToast = (message, { variant = 'success', timeoutMs = 4200 } = {}) => {
    const toast = ensureToast();
    if (toastTimeoutId) window.clearTimeout(toastTimeoutId);
    toast.classList.remove('show');
    toast.innerHTML = `<div class="card${variant === 'error' ? ' error' : ''}"></div>`;
    const card = toast.querySelector('.card');
    if (card) card.textContent = message;
    requestAnimationFrame(() => toast.classList.add('show'));
    toastTimeoutId = window.setTimeout(() => toast.classList.remove('show'), timeoutMs);
  };

  const showSuccessToast = (message) => showToast(message, { variant: 'success' });
  const showErrorToast = (message) => showToast(message, { variant: 'error', timeoutMs: 5200 });

  form.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const gotcha = form.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value.trim() !== '') return;

      if (submitButton) submitButton.disabled = true;

      try {
        const formData = new FormData(form);
        const params = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
          if (typeof value === 'string') {
            params.append(key, value);
          } else {
            params.append(key, value && value.name ? value.name : String(value));
          }
        }

        const response = await fetch(FORMSPARK_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: params.toString(),
        });

        if (response.ok) {
          form.reset();
          showSuccessToast('Thank you for your message. We’ll respond within 24 hours.');
        } else {
          let message = 'Something went wrong. Please try again.';
          try {
            const data = await response.json();
            if (data && data.message) message = data.message;
          } catch (error) {
          }
          showErrorToast(message);
        }
      } catch (error) {
        showErrorToast('Network error. Please try again.');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    },
    { capture: true }
  );
});
