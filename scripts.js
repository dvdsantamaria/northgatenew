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
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;

    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.on('scroll', ScrollTrigger.update);

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      gsap.ticker.lagSmoothing(0);
    }

    const splitTextToScrub = (el) => {
      const text = el.innerText;
      el.innerHTML = text
        .split(' ')
        .map((word) => `<span class="scrub-word inline-block">${word}&nbsp;</span>`)
        .join('');
    };

    const initAnimations = () => {

      gsap.to('.hero-title-l, .hero-title-r', { y: 0, duration: 1.4, ease: 'power3.out', stagger: 0.1 });

      gsap.to('.hero-title-l', { x: '-15%', ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-title-r', { x: '15%', ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-img', { scale: 1.2, y: '20%', ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

      const introText = document.querySelector('.intro-scrub-text');
      if (introText) {
        splitTextToScrub(introText);
        gsap.to('.scrub-word', {
          opacity: 1,
          color: '#000000',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: introText,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true
          }
        });
      }

      const cards = gsap.utils.toArray('.card-item');
      cards.forEach((card, i) => {
        const inner = card.querySelector('.card-inner');
        const rot = (i % 2 === 0 ? 3 : -3) + (Math.random() * 2 - 1);
        if (i < cards.length - 1) {
          gsap.to(inner, {
            scale: 0.9, rotation: rot, y: -30, filter: 'blur(5px)', opacity: 0.6, ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
              invalidateOnRefresh: true
            }
          });
        }
      });

      const horizSection = document.querySelector('#horiz-scroll');
      if (horizSection) {
        const horizWrap = horizSection.querySelector('.horiz-wrap');
        const getScrollDistance = () => Math.max(0, horizWrap.scrollWidth - window.innerWidth);
        gsap.to(horizWrap, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: horizSection,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      const parallaxGrid = document.querySelector('#parallax-grid');
      if (parallaxGrid) {
        const cols = parallaxGrid.querySelectorAll('.parallax-col');
        cols.forEach((col, i) => {
          const speed = (i + 1) * 30;
          gsap.to(col, {
            y: -speed * 2,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxGrid,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }

      const darkSection = document.querySelector('#inverted-section');
      if (darkSection) {
        gsap.from(darkSection.querySelectorAll('.reveal-item'), {
          y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: darkSection, start: 'top 70%' }
        });
      }

      gsap.from('.wrapper > section:last-of-type h2', {
        scale: 0.9, opacity: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.wrapper > section:last-of-type', start: 'top 75%' }
      });
    };

    const initNavBackground = () => {
      const nav = document.querySelector('.site-nav');
      const introSection = document.querySelector('#intro');
      if (!nav || !introSection) return;

      const updateNav = () => {
        const navHeight = nav.getBoundingClientRect().height;
        const introTop = introSection.getBoundingClientRect().top;
        nav.classList.toggle('nav-solid', introTop <= navHeight);
      };

      updateNav();

      if (lenis) {
        lenis.on('scroll', updateNav);
      } else {
        window.addEventListener('scroll', updateNav, { passive: true });
      }

      window.addEventListener('resize', updateNav);
    };

    const initProcessAccordion = () => {
      const toggles = document.querySelectorAll('.process-toggle');
      if (!toggles.length) return;

      toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const targetId = toggle.getAttribute('data-target');
          toggles.forEach((btn) => {
            const panelId = btn.getAttribute('data-target');
            const panel = document.getElementById(panelId);
            if (!panel) return;
            const isActive = btn === toggle;
            btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            panel.hidden = !isActive;
          });
        });
      });
    };

    window.lenis = lenis;
    initNavBackground();
    initProcessAccordion();
    initAnimations();
    if (lenis) lenis.start();
    ScrollTrigger.refresh();
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      if (lenis) {
        lenis.start();
        lenis.scrollTo(0);
      }
    });
    window.addEventListener('resize', () => ScrollTrigger.refresh());
