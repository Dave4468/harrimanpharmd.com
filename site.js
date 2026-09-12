if (location.pathname === '/' || location.pathname.endsWith('/index.html')) { const routes = {'#matters':'practice.html','#background':'experience.html','#contact':'contact.html'}; if (routes[location.hash]) location.replace(routes[location.hash]); }

(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  const hero = document.querySelector('.hero');
  if (toggle && hero) {
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const paused = hero.classList.toggle('motion-paused');
    toggle.textContent = paused ? 'Resume animation' : 'Pause animation';
  });
  }
  if (motion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const running = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motion.matches) continue;
      const animation = entry.target.animate([
        {opacity: .35, transform: 'translateY(14px)'},
        {opacity: 1, transform: 'translateY(0)'}
      ], {duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)'});
      running.add(animation);
      animation.onfinish = () => running.delete(animation);
    }
  }, {threshold: .12});
  document.querySelectorAll('.hero-grid, .service-list li, .principal-photo, .principal-copy, .contact-grid').forEach(el => observer.observe(el));
  motion.addEventListener('change', () => {
    if (motion.matches) { observer.disconnect(); running.forEach(animation => animation.cancel()); running.clear(); }
  });
})();
