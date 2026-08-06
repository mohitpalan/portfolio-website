// Mobile nav toggle
var menuButton = document.getElementById('menu-toggle');
var primaryNav = document.getElementById('primary-nav');

menuButton.addEventListener('click', function () {
  var isOpen = primaryNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

primaryNav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    primaryNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal for sections, skipped entirely for reduced-motion users
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealTargets = document.querySelectorAll(
  '.highlight-grid, .about-grid, .timeline-row, .case, .patent-card, .skill-group, .contact-grid'
);

if (prefersReducedMotion) {
  revealTargets.forEach(function (el) {
    el.classList.add('is-visible');
  });
} else {
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
}
