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
  function track(name, params) {
    if (typeof gtag === 'function') gtag('event', name, params);
  }

  document.querySelectorAll('.primary-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      track('nav_click', { link_label: link.textContent.trim() });
    });
  });

  document.querySelectorAll('.hero-actions a').forEach(function (link) {
    link.addEventListener('click', function () {
      track('hero_cta_click', { link_label: link.textContent.trim() });
    });
  });

  document.querySelectorAll('.contact-link').forEach(function (link) {
    link.addEventListener('click', function () {
      var label = link.querySelector('.contact-label');
      track('contact_click', { channel: label ? label.textContent.trim() : link.href });
    });
  });

  var caseGrid = document.querySelector('.case-grid');
  if (caseGrid) {
    caseGrid.addEventListener('click', function (e) {
      var card = e.target.closest('.case-card');
      if (!card) return;
      var title = card.querySelector('h3');
      track('work_card_click', {
        case_id: card.id,
        case_title: title ? title.textContent.trim() : card.id
      });
    });
  }
})();

(function () {
  var emailLink = document.getElementById('email-link');
  var toast = document.getElementById('email-toast');
  var toastText = document.getElementById('email-toast-text');
  if (!emailLink || !toast || !toastText) return;

  var hideTimer;

  emailLink.addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;
    var email = emailLink.dataset.email;
    navigator.clipboard.writeText(email).then(function () {
      toastText.textContent = 'Yoinked into your clipboard. Now write something better than "Hi, I saw your portfolio."';
      toast.classList.add('is-visible');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 4000);
    }).catch(function () {});
  });
})();

(function () {
  var STORAGE_KEY = 'cookie-consent';
  var banner = document.getElementById('cookie-banner');
  var consentActions = document.getElementById('cookie-actions-consent');
  var noticeActions = document.getElementById('cookie-actions-notice');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  var okBtn = document.getElementById('cookie-ok');

  var CONSENT_REQUIRED_REGIONS = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
    'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
    'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'
  ];

  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  function applyConsent(granted, source) {
    var state = granted ? 'granted' : 'denied';
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state
      });
      if (granted) gtag('event', 'page_view');
    }
    try {
      localStorage.setItem(STORAGE_KEY, state);
      localStorage.setItem(STORAGE_KEY + '-source', source);
    } catch (e) {}
  }

  function showConsentBanner() {
    banner.setAttribute('aria-label', 'Cookie consent');
    consentActions.hidden = false;
    noticeActions.hidden = true;
    banner.hidden = false;
  }

  function showNoticeBanner() {
    banner.setAttribute('aria-label', 'Cookie notice');
    noticeActions.hidden = false;
    consentActions.hidden = true;
    banner.hidden = false;
  }

  acceptBtn.addEventListener('click', function () {
    applyConsent(true, 'user');
    banner.hidden = true;
  });
  declineBtn.addEventListener('click', function () {
    applyConsent(false, 'user');
    banner.hidden = true;
  });
  okBtn.addEventListener('click', function () {
    banner.hidden = true;
  });

  if (stored) return;

  if (typeof fetch !== 'function') {
    showConsentBanner();
    return;
  }
  var controller = typeof AbortController === 'function' ? new AbortController() : null;
  var timeoutId = setTimeout(function () {
    if (controller) controller.abort();
    showConsentBanner();
  }, 1500);

  fetch('/cdn-cgi/trace', controller ? { signal: controller.signal } : undefined)
    .then(function (res) { return res.text(); })
    .then(function (text) {
      clearTimeout(timeoutId);
      var match = /^loc=([A-Z]{2})$/m.exec(text);
      var country = match ? match[1] : null;
      if (country && CONSENT_REQUIRED_REGIONS.indexOf(country) === -1) {
        applyConsent(true, 'geo-auto');
        showNoticeBanner();
      } else {
        showConsentBanner();
      }
    })
    .catch(function () {
      clearTimeout(timeoutId);
      showConsentBanner();
    });
})();
