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

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.project-carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const prevButton = carousel.querySelector('.carousel-arrow.prev');
  const nextButton = carousel.querySelector('.carousel-arrow.next');
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;
  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  let hasSwiped = false;

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
    stop();
    if (carousel.setPointerCapture) {
      carousel.setPointerCapture(event.pointerId);
    }
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

  const onPointerUp = (event) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    if (carousel.releasePointerCapture) {
      carousel.releasePointerCapture(event.pointerId);
    }
    start();
  };

  slides.forEach((slide) => {
    slide.draggable = false;
  });

  if (slides.length < 2) {
    carousel.classList.add('is-single');
    if (prevButton) prevButton.disabled = true;
    if (nextButton) nextButton.disabled = true;
    update();
    return;
  }

  const onArrowPointerDown = (event) => {
    event.stopPropagation();
  };

  if (prevButton) {
    prevButton.addEventListener('pointerdown', onArrowPointerDown);
    prevButton.addEventListener('click', () => {
      stop();
      goTo(-1);
      start();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('pointerdown', onArrowPointerDown);
    nextButton.addEventListener('click', () => {
      stop();
      goTo(1);
      start();
    });
  }

  carousel.addEventListener('pointerdown', onPointerDown);
  carousel.addEventListener('pointermove', onPointerMove);
  carousel.addEventListener('pointerup', onPointerUp);
  carousel.addEventListener('pointerleave', onPointerUp);
  carousel.addEventListener('pointercancel', onPointerUp);
  carousel.addEventListener('dragstart', (event) => event.preventDefault());

  start();
});

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

// Parallax for project-full-image
document.querySelectorAll('.project-full-image').forEach((wrap) => {
  const img = wrap.querySelector('img');
  if (!img) return;

  gsap.fromTo(img,
    { yPercent: -80 },
    {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    }
  );
});

// Refresh ScrollTrigger on window events
window.addEventListener('load', () => ScrollTrigger.refresh());
window.addEventListener('resize', () => ScrollTrigger.refresh());
