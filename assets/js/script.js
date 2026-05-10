// ============================= 
// MODERN PORTFOLIO - JAVASCRIPT
// ============================= 

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTypewriter();
  initScrollAnimations();
  initFormHandling();
  initSkillBars();
  updateYear();
  initScrollIndicator();
  initSmoothScroll();
});

// ============================= 
// NAVIGATION
// ============================= 

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  // Close menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
      mobileMenuToggle?.classList.remove('active');
    });
  });
}

// ============================= 
// TYPEWRITER EFFECT
// ============================= 

function initTypewriter() {
  const roles = [
    'Senior Python Developer',
    'Full Stack Developer',
    'Web Scraping Expert',
    'API Developer',
    'AWS Cloud Specialist'
  ];

  const roleText = document.getElementById('roleText');
  if (!roleText) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const speed = 50;
  const pauseTime = 2000;

  function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    roleText.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, isDeleting ? speed * 0.5 : speed);
  }

  typeWriter();
}

// ============================= 
// SCROLL ANIMATIONS
// ============================= 

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// ============================= 
// SKILL BARS
// ============================= 

function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.setProperty('--level', level + '%');
          bar.style.animation = 'fillBar 1.5s ease-out forwards';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => skillObserver.observe(card));
}

// ============================= 
// FORM HANDLING
// ============================= 

function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const mailtoLink = `mailto:agwane16@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
    
    window.location.href = mailtoLink;

    // Reset form
    contactForm.reset();
  });
}

// ============================= 
// SCROLL INDICATOR
// ============================= 

function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollIndicator?.style.opacity = '0';
      scrollIndicator?.style.pointerEvents = 'none';
    } else {
      scrollIndicator?.style.opacity = '1';
      scrollIndicator?.style.pointerEvents = 'auto';
    }
  });
}

// ============================= 
// SMOOTH SCROLL
// ============================= 

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#' && !href.includes('.pdf') && !href.includes('mailto')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// ============================= 
// UTILITY FUNCTIONS
// ============================= 

function updateYear() {
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

// ============================= 
// PERFORMANCE OPTIMIZATIONS
// ============================= 

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.gradient-orb');

  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.1);
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
