// script.js
document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. MOBILE NAVIGATION TOGGLE (if you add a hamburger menu later)
  // ============================================
  // For future enhancement: if you add a hamburger menu in the sidebar
  // for mobile view, you can uncomment this section.
  
  // const hamburger = document.getElementById('hamburger');
  // const navMenu = document.getElementById('navMenu');
  // if (hamburger) {
  //   hamburger.addEventListener('click', () => {
  //     navMenu.classList.toggle('active');
  //   });
  // }

  // ============================================
  // 2. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  // Enables smooth scrolling when clicking on any anchor link
  // that starts with "#" (e.g., #about, #experience)
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without causing a jump (optional)
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // ============================================
  // 3. CONTACT FORM HANDLING
  // ============================================
  // Handles form submission with validation and feedback
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = this.querySelector('input[type="text"]');
      const emailInput = this.querySelector('input[type="email"]');
      const messageInput = this.querySelector('textarea');
      
      // Simple validation
      let isValid = true;
      let errorMessage = '';
      
      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your name.\n';
        nameInput.style.borderColor = '#e74c3c';
      } else {
        nameInput.style.borderColor = '#e2e8f0';
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
        emailInput.style.borderColor = '#e74c3c';
      } else {
        emailInput.style.borderColor = '#e2e8f0';
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your message.\n';
        messageInput.style.borderColor = '#e74c3c';
      } else {
        messageInput.style.borderColor = '#e2e8f0';
      }
      
      if (!isValid) {
        alert('⚠️ Please fix the following:\n\n' + errorMessage);
        return;
      }
      
      // If valid, show success message
      const submitBtn = this.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate sending (replace with actual AJAX/fetch if needed)
      setTimeout(() => {
        // Success feedback
        alert('✅ Thank you, ' + nameInput.value.trim() + '! Your message has been sent successfully. I will get back to you soon.');
        
        // Reset form
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset all borders
        [nameInput, emailInput, messageInput].forEach(field => {
          field.style.borderColor = '#e2e8f0';
        });
      }, 1500);
    });
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ============================================
  // 4. DYNAMIC YEAR IN FOOTER
  // ============================================
  // Automatically updates the copyright year
  
  const footer = document.querySelector('footer p');
  if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace(/\d{4}/, currentYear);
  }

  // ============================================
  // 5. SCROLL ANIMATION FOR SECTIONS (optional)
  // ============================================
  // Adds a subtle fade-in effect when sections come into view
  
  const sections = document.querySelectorAll('.section');
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Set initial state and observe each section
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(section);
  });

  // ============================================
  // 6. SIDEBAR NAVIGATION HIGHLIGHTING (optional)
  // ============================================
  // Highlights the current section in the sidebar if you add nav links
  
  // If you add navigation links in the sidebar, uncomment this:
  /*
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  
  function highlightNav() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
  
  window.addEventListener('scroll', highlightNav);
  */

  // ============================================
  // 7. DOWNLOAD CV BUTTON TRACKING (optional)
  // ============================================
  // Tracks when someone clicks the download CV button
  
  const downloadBtn = document.querySelector('.btn-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      // You can add analytics tracking here
      console.log('CV download button clicked');
      
      // If you want to track with Google Analytics, you could add:
      // gtag('event', 'download_cv', { 'event_category': 'engagement' });
      
      // If you want to confirm before download:
      // if (!confirm('Download CV?')) {
      //   e.preventDefault();
      // }
    });
  }

  // ============================================
  // 8. SOCIAL LINKS TRACKING (optional)
  // ============================================
  // Tracks clicks on social media links
  
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const platform = this.getAttribute('aria-label') || this.href;
      console.log(`Social link clicked: ${platform}`);
      // You can add analytics tracking here
      // gtag('event', 'social_click', { 'event_category': 'engagement', 'event_label': platform });
    });
  });

  // ============================================
  // 9. KEYBOARD ACCESSIBILITY FOR CARDS
  // ============================================
  // Makes research cards keyboard-focusable and clickable
  
  const cards = document.querySelectorAll('.research-card');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // ============================================
  // 10. CONSOLE WELCOME MESSAGE
  // ============================================
  // Adds a friendly message in the browser console
  
  console.log('%c Pottem Archana Portfolio ', 'background: #1e293b; color: #ffffff; font-size: 16px; padding: 10px; border-radius: 4px;');
  console.log('%c Thank you for visiting! Feel free to explore my work. ', 'color: #475569; font-size: 12px;');
  console.log('%c 📧 archanaterlapu@gmail.com ', 'color: #2563eb; font-size: 12px;');

});
