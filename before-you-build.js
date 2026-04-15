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

// Universal masonry layout: consecutive order + balanced columns at all breakpoints
(function() {
  const grid = document.querySelector('.byb-grid');
  if (!grid) return;

  const allCards = Array.from(grid.querySelectorAll('.byb-card')).map(card => ({
    element: card,
    order: parseFloat(card.dataset.order || '999')
  })).sort((a, b) => a.order - b.order).map(item => item.element);

  let currentCols = 0;

  function layout(force) {
    let cols = 3;
    if (window.matchMedia('(max-width: 640px)').matches) cols = 1;
    else if (window.matchMedia('(max-width: 1024px)').matches) cols = 2;

    if (!force && cols === currentCols && grid.children.length > 0) return;
    currentCols = cols;

    grid.innerHTML = '';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gap = '1.5rem';
    grid.style.alignItems = 'start';

    const columns = [];
    const heights = new Array(cols).fill(0);

    for (let i = 0; i < cols; i++) {
      const col = document.createElement('div');
      col.className = 'byb-col';
      col.style.display = 'flex';
      col.style.flexDirection = 'column';
      col.style.gap = '1.5rem';
      grid.appendChild(col);
      columns.push(col);
    }

    allCards.forEach(card => {
      const isImage = card.classList.contains('byb-card-media');
      const best = heights.map((h, i) => {
        const col = columns[i];
        const lastIsImage = col.lastElementChild?.classList.contains('byb-card-media');
        let penalty = 0;
        if (isImage) {
          const imageCount = col.querySelectorAll('.byb-card-media').length;
          penalty += imageCount * 800;
          if (lastIsImage) penalty += 400;
        }
        return { h: h + penalty, i };
      }).sort((a, b) => a.h - b.h)[0].i;

      columns[best].appendChild(card);
      heights[best] = columns[best].scrollHeight;
    });

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  layout(true);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => layout(true), 150);
  });

  window.addEventListener('load', () => {
    setTimeout(() => layout(true), 100);
  });

  grid.querySelectorAll('img').forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', () => {
      setTimeout(() => layout(true), 50);
    });
  });
})();

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
