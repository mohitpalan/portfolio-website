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

document.getElementById('year').textContent = new Date().getFullYear();

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealTargets = document.querySelectorAll(
  '.highlight-grid, .about-copy, .timeline-row, .case-card, .patent-callout, .stack-row, .contact-grid'
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

(function () {
  var STORAGE_KEY = 'cookie-consent';
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  var CONSENT_REQUIRED_REGIONS = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
    'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
    'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'
  ];

  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  function setConsent(granted, source) {
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
      localStorage.setItem(STORAGE_KEY + '-source', source);
    } catch (e) {}
    banner.hidden = true;
  }

  acceptBtn.addEventListener('click', function () {
    setConsent(true, 'user');
  });
  declineBtn.addEventListener('click', function () {
    setConsent(false, 'user');
  });

  if (stored) return;

  if (typeof fetch !== 'function') {
    banner.hidden = false;
    return;
  }
  var controller = typeof AbortController === 'function' ? new AbortController() : null;
  var timeoutId = setTimeout(function () {
    if (controller) controller.abort();
    banner.hidden = false;
  }, 1500);

  fetch('/cdn-cgi/trace', controller ? { signal: controller.signal } : undefined)
    .then(function (res) { return res.text(); })
    .then(function (text) {
      clearTimeout(timeoutId);
      var match = /^loc=([A-Z]{2})$/m.exec(text);
      var country = match ? match[1] : null;
      if (country && CONSENT_REQUIRED_REGIONS.indexOf(country) === -1) {
        setConsent(true, 'geo-auto');
      } else {
        banner.hidden = false;
      }
    })
    .catch(function () {
      clearTimeout(timeoutId);
      banner.hidden = false;
    });
})();
