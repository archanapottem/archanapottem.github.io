// ============================================================
// Portfolio interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Active nav link highlight on scroll ----
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ---- Header hide on scroll down / show on scroll up ----
  const header = document.getElementById('site-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ---- Workshop list expand/collapse ----
  const toggleBtn = document.getElementById('toggle-workshops');
  const hiddenItems = document.querySelectorAll('.hidden-item');
  const workshopCount = document.getElementById('workshop-count');

  if (workshopCount) {
    const total = document.querySelectorAll('#workshop-list li').length;
    workshopCount.textContent = `(${total})`;
  }

  if (toggleBtn) {
    let expanded = false;
    toggleBtn.addEventListener('click', () => {
      expanded = !expanded;
      hiddenItems.forEach(item => item.classList.toggle('show', expanded));
      toggleBtn.textContent = expanded ? 'Show fewer workshops' : 'Show all workshops';
    });
  }

  // ---- Scroll-to-top button with progress ring ----
  const scrollBtn = document.getElementById('scroll-top');
  const progressRing = document.getElementById('progress-ring-fg');
  const CIRCUMFERENCE = 119.4;

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrollBtn) scrollBtn.classList.toggle('visible', scrollTop > 480);
    if (progressRing) {
      const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
      progressRing.style.strokeDashoffset = offset;
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Reveal-on-scroll for sections ----
  const revealTargets = document.querySelectorAll(
    '.timeline-item, .research-card, .pub-list li, .recog-card, .fact'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});
