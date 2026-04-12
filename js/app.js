/* ==============================================
   Barcelona Travel Guide 2025 - App
   ============================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initStickyNav();
    initScrollTop();
    initLazyMaps();
  });

  /* ---------- Tabs ---------- */
  function initTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');
    const bar = document.querySelector('.tab-indicator');

    function activate(id) {
      btns.forEach(b => {
        const on = b.dataset.tab === id;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on);
      });
      panels.forEach(p => {
        const on = p.id === id;
        p.classList.toggle('active', on);
        p.setAttribute('aria-hidden', !on);
      });
      moveBar(id);
      setTimeout(scanMaps, 120);
    }

    function moveBar(id) {
      const btn = document.querySelector(`.tab-btn[data-tab="${id}"]`);
      if (!btn || !bar) return;
      const bR = btn.getBoundingClientRect();
      const pR = btn.parentElement.getBoundingClientRect();
      bar.style.left = (bR.left - pR.left) + 'px';
      bar.style.width = bR.width + 'px';
    }

    btns.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));

    // keyboard arrows
    btns.forEach((b, i) => {
      b.addEventListener('keydown', e => {
        let n;
        if (e.key === 'ArrowRight') n = (i + 1) % btns.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + btns.length) % btns.length;
        else return;
        e.preventDefault();
        btns[n].focus();
        btns[n].click();
      });
    });

    // init
    activate('accommodation');
    window.addEventListener('resize', () => {
      const a = document.querySelector('.tab-btn.active');
      if (a) moveBar(a.dataset.tab);
    });
  }

  /* ---------- Sticky shadow ---------- */
  function initStickyNav() {
    const wrap = document.querySelector('.tab-nav-wrap');
    const hero = document.querySelector('.hero');
    if (!wrap || !hero) return;

    new IntersectionObserver(([e]) => {
      wrap.classList.toggle('is-scrolled', !e.isIntersecting);
    }, { threshold: 0, rootMargin: '-1px 0px 0px 0px' }).observe(hero);
  }

  /* ---------- Scroll top ---------- */
  function initScrollTop() {
    const btn = document.querySelector('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 460);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Lazy Maps ---------- */
  let observer;

  function initLazyMaps() {
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          loadMap(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { rootMargin: '250px 0px', threshold: 0 });

    scanMaps();
  }

  function scanMaps() {
    document.querySelectorAll('.card__map[data-q]:not([data-loaded])').forEach(el => {
      const panel = el.closest('.panel');
      if (!panel || panel.classList.contains('active')) observer.observe(el);
    });
  }

  function loadMap(container) {
    const q = container.dataset.q;
    if (!q) return;
    container.setAttribute('data-loaded', '1');

    const ph = container.querySelector('.card__map-ph');
    if (ph) ph.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Loading...</span>';

    const iframe = document.createElement('iframe');
    iframe.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed&hl=ko&z=15';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.title = q + ' map';

    iframe.addEventListener('load', () => { if (ph) ph.remove(); });

    const overlay = container.querySelector('.map-link');
    if (overlay) container.insertBefore(iframe, overlay);
    else container.appendChild(iframe);
  }
})();
