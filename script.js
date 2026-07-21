// script.js
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. MOBILE NAVIGATION
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================================
  // 2. ACTIVE NAV LINK ON SCROLL
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // ============================================================
  // 3. NAVBAR SHADOW ON SCROLL
  // ============================================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ============================================================
  // 4. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // ============================================================
  // 5. CONTACT FORM HANDLING
  // ============================================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = this.querySelector('input[type="text"]');
      const email = this.querySelector('input[type="email"]');
      const subject = this.querySelector('input[placeholder="Subject"]');
      const message = this.querySelector('textarea');
      const submitBtn = this.querySelector('.btn-submit');

      // Reset borders
      [name, email, subject, message].forEach(field => {
        if (field) field.style.borderColor = '#e2e8f0';
      });

      let isValid = true;
      let errors = [];

      if (!name.value.trim()) {
        name.style.borderColor = '#e74c3c';
        errors.push('Please enter your name');
        isValid = false;
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        email.style.borderColor = '#e74c3c';
        errors.push('Please enter a valid email address');
        isValid = false;
      }

      if (!message.value.trim()) {
        message.style.borderColor = '#e74c3c';
        errors.push('Please enter your message');
        isValid = false;
      }

      if (!isValid) {
        alert('⚠️ Please fix the following:\n\n• ' + errors.join('\n• '));
        return;
      }

      // Show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        alert('✅ Thank you, ' + name.value.trim() + '! Your message has been sent successfully.');

        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        [name, email, subject, message].forEach(field => {
          if (field) field.style.borderColor = '#e2e8f0';
        });
      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================================================
  // 6. DYNAMIC YEAR IN FOOTER
  // ============================================================
  const footerYear = document.querySelector('.footer p');
  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, year);
  }

  // ============================================================
  // 7. SCROLL ANIMATION FOR SECTIONS
  // ============================================================
  const animateSections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  animateSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
    observer.observe(section);
  });

  // ============================================================
  // 8. CONSOLE WELCOME
  // ============================================================
  console.log('%c Pottem Archana Portfolio ', 'background: #1e293b; color: #ffffff; font-size: 16px; padding: 12px 20px; border-radius: 6px;');
  console.log('%c Assistant Professor · Researcher ', 'color: #475569; font-size: 13px;');
  console.log('%c 📧 archanaterlapu@gmail.com  |  📞 +91 9490649980', 'color: #2563eb; font-size: 13px;');

});
