/* ============================================
   PYTHON DEVELOPER PORTFOLIO - JAVASCRIPT
   Smooth Scrolling, Animations & Interactions
   ============================================ */

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initSkillBars();
    initMobileMenu();
    initContactForm();
    initCurrentYear();
    initNavbarScroll();
    initAnimatedRoles();
    initParallaxEffects();
    initCursorEffects();
    initStaggerAnimations();
    initIntersectionObserver();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('navMenu');
            const toggle = document.getElementById('mobileMenuToggle');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty or just # links
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = `${level}%`;
                }, 200);
                
                // Stop observing once animated
                skillObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(15, 15, 26, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 217, 255, 0.3);
        color: #00D9FF;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== CURRENT YEAR =====
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== ANIMATED ROLES TEXT =====
function initAnimatedRoles() {
    const roleTextElement = document.getElementById('roleText');
    if (!roleTextElement) return;
    
    const roles = [
        'Senior Python Developer',
        'Web Scraping Expert',
        'Web Application Development (Python)',
        'API Development & Integration',
        'Product Development',
        'Automation',
        'AWS',
        'ETL',
        'Data Pipeline',
        'Data Monitoring'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            // Delete characters
            roleTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Type characters
            roleTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            // Finished typing, wait then start deleting
            typingSpeed = 2000; // Wait 2 seconds before deleting
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            // Finished deleting, move to next role
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typingSpeed = 500; // Wait before typing next role
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    // Start typing animation
    typeRole();
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const parallax = scrolled * 0.5;
        const orbs = hero.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translateY(${parallax * speed}px)`;
        });
    }
});

// ===== TYPING EFFECT (Optional - can be added to hero title) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== CARD HOVER EFFECTS =====
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== SOCIAL LINKS HOVER EFFECT =====
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0) scale(1)';
    });
});

// ===== PROJECT CARD INTERACTIONS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const title = this.querySelector('.project-title');
        if (title) {
            title.style.color = '#B026FF';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const title = this.querySelector('.project-title');
        if (title) {
            title.style.color = '#00D9FF';
        }
    });
});

// ===== FORM INPUT FOCUS EFFECTS =====
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===== SCROLL TO TOP BUTTON (Optional) =====
function createScrollToTop() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00D9FF, #B026FF);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.8)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// ===== ADD CSS ANIMATIONS FOR NOTIFICATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE: THROTTLE SCROLL EVENTS =====
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const handleScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', handleScroll);

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background .gradient-orb');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px) translateX(${Math.sin(scrolled * 0.001) * 20}px)`;
        });
    }, 10));
}

// ===== CURSOR EFFECTS =====
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #00D9FF;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, opacity 0.3s ease;
        opacity: 0;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        width: 4px;
        height: 4px;
        background: #00D9FF;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.05s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        cursorDot.style.left = mouseX - 2 + 'px';
        cursorDot.style.top = mouseY - 2 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .glass-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#B026FF';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00D9FF';
        });
    });
}

// ===== STAGGER ANIMATIONS =====
function initStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.project-card, .skill-card, .timeline-item, .highlight-card');
    
    staggerElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== ADVANCED INTERSECTION OBSERVER =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add glow effect on scroll into view
                if (entry.target.classList.contains('glass-card')) {
                    entry.target.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.3)';
                    setTimeout(() => {
                        entry.target.style.boxShadow = '';
                    }, 1000);
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .fade-in-delay-5');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c👨‍💻 Python Developer Portfolio', 'color: #00D9FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #B026FF; font-size: 12px;');

