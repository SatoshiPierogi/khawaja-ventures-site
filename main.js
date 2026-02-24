/* Khawaja Ventures — main.js
   IntersectionObserver animations, nav scroll, mobile toggle */

(function () {
  'use strict';

  // ---- Scroll-triggered fade-in ----
  const animated = document.querySelectorAll('[data-animate]');
  if (animated.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    animated.forEach((el) => io.observe(el));
  } else {
    // Fallback: show everything immediately
    animated.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Nav background on scroll ----
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close menu when a link is tapped
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
