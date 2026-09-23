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
  '.highlight-grid, .about-grid, .timeline-row, .case, .patent-callout, .stack-row, .contact-grid'
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

// Scroll progress frame: traces clockwise around the whole
// viewport edge as the reader scrolls down the page
(function () {
  var svg = document.getElementById('scroll-progress');
  var rect = document.getElementById('scroll-progress-rect');
  if (!svg || !rect) return;

  var STROKE_WIDTH = 7;
  var inset = STROKE_WIDTH / 2;
  var perimeter = 0;
  var ticking = false;

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = scrollable > 0 ? scrollTop / scrollable : 0;
    progress = Math.min(1, Math.max(0, progress));
    rect.style.strokeDashoffset = String(perimeter * (1 - progress));
  }

  // Recomputes width/height from scratch every time, not just on
  // resize: mobile browsers grow/shrink the visible viewport as
  // their address bar collapses while scrolling, often without
  // firing a resize event, so a stale height would otherwise leave
  // a gap between the frame and the true edge of the screen.
  function layout() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var rw = w - STROKE_WIDTH;
    var rh = h - STROKE_WIDTH;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    rect.setAttribute('x', inset);
    rect.setAttribute('y', inset);
    rect.setAttribute('width', rw);
    rect.setAttribute('height', rh);
    perimeter = 2 * (rw + rh);
    rect.style.strokeDasharray = String(perimeter);
    updateProgress();
  }

  function requestLayout() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(function () {
        layout();
        ticking = false;
      });
    }
  }

  window.addEventListener('scroll', requestLayout, { passive: true });
  window.addEventListener('resize', requestLayout);

  layout();
})();

// Active-section nav highlight, mirrors scroll position to the nav
(function () {
  var navLinks = Array.prototype.slice.call(primaryNav.querySelectorAll('a'));
  var tracked = navLinks
    .map(function (link) {
      var section = document.getElementById(link.getAttribute('href').slice(1));
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  if (!tracked.length || typeof IntersectionObserver === 'undefined') return;

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var match = tracked.filter(function (t) {
          return t.section === entry.target;
        })[0];
        if (!match) return;
        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
        });
        match.link.classList.add('is-active');
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  tracked.forEach(function (t) {
    sectionObserver.observe(t.section);
  });
})();

// Cookie consent banner (Google Consent Mode v2)
(function () {
  var STORAGE_KEY = 'cookie-consent';
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  function setConsent(granted) {
    var state = granted ? 'granted' : 'denied';
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state
      });
    }
    try {
      localStorage.setItem(STORAGE_KEY, state);
    } catch (e) {}
    banner.hidden = true;
  }

  if (!stored) {
    banner.hidden = false;
  }

  acceptBtn.addEventListener('click', function () {
    setConsent(true);
  });
  declineBtn.addEventListener('click', function () {
    setConsent(false);
  });
})();
