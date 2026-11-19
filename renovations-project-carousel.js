(() => {
  const root = document.querySelector('.project-carousel');
  if (!root) return;
  const track = root.querySelector('.project-carousel__track');
  const cards = [...track.children];
  const dots = [...root.querySelectorAll('[data-project-dot]')];
  const controls = root.querySelector('.project-carousel__controls');
  const staticWhenAllVisible = root.hasAttribute('data-static-when-all-visible');
  let current = 0;
  const count = () => innerWidth <= 600 ? 1 : innerWidth <= 1000 ? 2 : 3;
  function render(announce = false) {
    const visibleCount = count();
    if (staticWhenAllVisible && cards.length <= visibleCount) current = 0;
    cards.forEach((_, offset) => {
      const card = cards[(current + offset) % cards.length];
      card.hidden = offset >= visibleCount;
      track.append(card);
    });
    if (controls && staticWhenAllVisible) controls.hidden = cards.length <= visibleCount;
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    if (announce) root.querySelector('.carousel-status').textContent = `Project ${current + 1} of ${cards.length}: ${cards[current].querySelector('h3').textContent}`;
  }
  function move(delta) { current = (current + delta + cards.length) % cards.length; render(true); }
  root.querySelector('[data-project-prev]').addEventListener('click', () => move(-1));
  root.querySelector('[data-project-next]').addEventListener('click', () => move(1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => { current = i; render(true); }));
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  let startX = null;
  track.addEventListener('touchstart', event => { startX = event.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', event => {
    if (startX !== null) {
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
    }
    startX = null;
  }, {passive:true});
  window.addEventListener('resize', () => render());
  render();
})();
