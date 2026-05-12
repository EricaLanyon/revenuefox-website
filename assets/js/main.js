/**
 * Revenue Fox & Co. — Main JavaScript
 *
 * Handles:
 *   1. Mobile navigation toggle
 *   2. Active nav link highlighting
 *   3. Contact form validation
 *
 * No external dependencies.
 */

'use strict';

/* ============================================================
   1. MOBILE NAVIGATION
   ============================================================ */
(function initMobileNav() {
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;

  function openNav() {
    toggle.classList.add('is-open');
    mobileNav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    if (toggle.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close when any nav link is clicked
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });

  // Close if viewport widens past mobile breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && mobileNav.classList.contains('is-open')) {
      closeNav();
    }
  });
}());


/* ============================================================
   2. ACTIVE NAV LINK
   ============================================================ */
(function initActiveNav() {
  var path = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('/').pop() || 'index.html';
    // Treat bare domain root same as index.html
    if (path === '' || path === '/') path = 'index.html';
    if (href === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}());


/* ============================================================
   3. PROOF NUMBER COUNTER ANIMATION
   ============================================================ */
(function initProofCounter() {
  var stats = document.querySelectorAll('.proof-stat-value');
  if (!stats.length || !window.IntersectionObserver) return;

  function parseValue(text) {
    var clean = text.trim();
    var match = clean.match(/^([^0-9]*)([0-9]+)(.*)$/);
    if (!match) return null;
    return { prefix: match[1], end: parseInt(match[2], 10), suffix: match[3] };
  }

  function animateCounter(el, parsed, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(parsed.end * eased);
      el.textContent = parsed.prefix + current + parsed.suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var parsed = parseValue(el.dataset.original);
      if (parsed) animateCounter(el, parsed, 1400);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  stats.forEach(function (stat) {
    stat.dataset.original = stat.textContent.trim();
    observer.observe(stat);
  });
}());


/* ============================================================
   4. CONTACT FORM VALIDATION
   ============================================================

   TODO — Connect form to a backend before going live.

   OPTION A — Formspree (simplest, works on Vercel):
     1. Create a free account at https://formspree.io
     2. Create a new form and copy the endpoint URL (e.g. https://formspree.io/f/xpzgabcd)
     3. Set the <form> action attribute to that URL
     4. Set method="POST" on the form
     5. Remove the e.preventDefault() call from the submit handler below (or keep
        it and use fetch() to post the data, then show the success message manually)

   OPTION B — Vercel Serverless Function:
     1. Create /api/contact.js in the project root
     2. Use a mail service like Resend (resend.com) or SendGrid
     3. Set the form action to /api/contact and method="POST"

   OPTION C — Netlify Forms (only if deployed to Netlify instead of Vercel):
     1. Add data-netlify="true" to the <form> element
     2. Add <input type="hidden" name="form-name" value="contact"> inside the form
     3. Netlify handles the rest automatically
   ============================================================ */
(function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var successMsg = document.getElementById('form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Remove this line once a real backend is connected

    var isValid = validateForm(form);

    if (isValid) {
      // TODO: Replace this block with a real form submission (fetch/POST) once
      // a backend is connected. See options in the comment block above.
      if (successMsg) {
        form.style.display = 'none';
        successMsg.classList.add('visible');
        successMsg.focus();
      }
    }
  });

  // Clear field errors on input
  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      clearFieldError(field);
    });
    field.addEventListener('change', function () {
      clearFieldError(field);
    });
  });

  function validateForm(form) {
    var isValid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    if (!isValid) {
      // Focus first invalid field for accessibility
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
    }
    return isValid;
  }

  function validateField(field) {
    var value = field.value.trim();
    var errorEl = getErrorEl(field);

    if (!value) {
      setFieldError(field, errorEl, 'This field is required.');
      return false;
    }

    if (field.type === 'email' && !isValidEmail(value)) {
      setFieldError(field, errorEl, 'Please enter a valid email address.');
      return false;
    }

    clearFieldError(field);
    return true;
  }

  function setFieldError(field, errorEl, message) {
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearFieldError(field) {
    field.setAttribute('aria-invalid', 'false');
    var errorEl = getErrorEl(field);
    if (errorEl) errorEl.classList.remove('visible');
  }

  function getErrorEl(field) {
    return field.parentElement
      ? field.parentElement.querySelector('.field-error')
      : null;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}());
