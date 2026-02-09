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
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
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

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
  const carouselInner = carouselTrack.querySelector('.carousel-inner');
  const slides = carouselInner ? Array.from(carouselInner.children) : [];

  if (carouselInner && slides.length) {
    Array.from(carouselInner.children).forEach((slide) => {
      slide.draggable = false;
      const img = slide.querySelector('img');
      if (img) img.draggable = false;
    });

    let index = 0;
    let timer = null;
    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    let hasSwiped = false;
    let step = 0;

    const measureStep = () => {
      const firstSlide = slides[0];
      if (!firstSlide) return;
      const style = getComputedStyle(carouselInner);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      step = firstSlide.getBoundingClientRect().width + gap;
    };

    const update = () => {
      if (!step) return;
      carouselInner.style.transform = `translateX(-${index * step}px)`;
    };

    const goTo = (dir) => {
      index = (index + dir + slides.length) % slides.length;
      update();
    };

    const start = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => goTo(1), 2000);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isPointerDown = true;
      hasSwiped = false;
      startX = event.clientX;
      startY = event.clientY;
      carouselTrack.classList.add('is-dragging');
      if (carouselTrack.setPointerCapture) {
        carouselTrack.setPointerCapture(event.pointerId);
      }
      stop();
    };

    const onPointerMove = (event) => {
      if (!isPointerDown || hasSwiped) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        goTo(deltaX < 0 ? 1 : -1);
        hasSwiped = true;
      }
    };

    const endDrag = (event) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      carouselTrack.classList.remove('is-dragging');
      if (event && event.pointerId && carouselTrack.releasePointerCapture) {
        carouselTrack.releasePointerCapture(event.pointerId);
      }
      start();
    };

    carouselTrack.addEventListener('pointerdown', onPointerDown);
    carouselTrack.addEventListener('pointermove', onPointerMove);
    carouselTrack.addEventListener('pointerup', endDrag);
    carouselTrack.addEventListener('pointercancel', endDrag);
    carouselTrack.addEventListener('pointerleave', endDrag);
    carouselTrack.addEventListener('dragstart', (event) => event.preventDefault());

    measureStep();
    update();
    window.addEventListener('load', () => {
      measureStep();
      update();
    });
    window.addEventListener('resize', () => {
      measureStep();
      update();
    });
    start();
  }
}
