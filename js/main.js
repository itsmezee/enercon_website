// Main JavaScript for Enercon Solutions Website - Mobile Optimized

document.addEventListener('DOMContentLoaded', function() {
    // ====== MOBILE MENU FUNCTIONALITY ======
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Toggle body scroll
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        function closeMobileMenu() {
            mainNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    }
    
    // Mobile dropdown functionality
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        otherDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle chevron icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                }
            }
        });
    });
    
    // Close dropdowns when clicking a link
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const dropdown = this.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) {
                        toggle.setAttribute('aria-expanded', 'false');
                        const icon = toggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    }
                }
                
                // Close mobile menu
                if (mainNav && mobileMenuBtn) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ====== SET CURRENT YEAR IN FOOTER ======
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // ====== FORM VALIDATION ======
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage = 'Please enter your full name';
            } else if (!email) {
                isValid = false;
                errorMessage = 'Please enter your email address';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else if (!phone) {
                isValid = false;
                errorMessage = 'Please enter your phone number';
            } else if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit phone number';
            } else if (!service) {
                isValid = false;
                errorMessage = 'Please select a service';
            } else if (!message) {
                isValid = false;
                errorMessage = 'Please enter your project details';
            }
            
            if (!isValid) {
                alert('Error: ' + errorMessage);
                return;
            }
            
            // Show success message
            alert('Thank you for your enquiry! We will contact you within 24 hours.');
            
            // Reset form
            enquiryForm.reset();
            
            // Track form submission
            trackEvent('form_submission', 'contact', 'enquiry_form');
        });
    }
    
    // ====== SET ACTIVE NAV LINK ======
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage.includes('electrical') && linkPage === 'electrical.html') ||
                (currentPage.includes('civil') && linkPage === 'civil.html') ||
                (currentPage.includes('about') && linkPage === 'about.html') ||
                (currentPage.includes('contact') && linkPage === 'contact.html') ||
                (currentPage.includes('privacy') && linkPage === 'privacy.html') ||
                (currentPage.includes('terms') && linkPage === 'terms.html')) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ====== SMOOTH SCROLLING ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ====== TRACKING EVENTS ======
    // WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('.whatsapp-float, a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('whatsapp_click', 'engagement', 'whatsapp_contact');
        });
    });
    
    // Phone call clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_call', 'engagement', 'phone_contact');
        });
    });
    
    // Service card clicks for mobile
    if (window.innerWidth <= 768) {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('a') && !e.target.closest('button')) {
                    const link = this.querySelector('a');
                    if (link) {
                        window.location.href = link.href;
                    }
                }
            });
        });
    }
    
    // ====== NEWSLETTER FORM ======
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for subscribing! You will receive updates from Enercon Solutions.');
            emailInput.value = '';
            
            trackEvent('newsletter_subscription', 'engagement', 'newsletter_signup');
        });
    }
    
    // ====== LAZY LOAD IMAGES ======
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ====== ADD LOADING ANIMATION ======
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add fade-in animation to elements
        const animateElements = document.querySelectorAll('.service-card, .feature, .industry-item, .about-feature, .service-item, .contact-card');
        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    });
    
    // ====== SERVICE CARD HOVER EFFECTS (Desktop only) ======
    if (window.innerWidth > 768) {
        const electricalCard = document.getElementById('electrical-service');
        const civilCard = document.getElementById('civil-service');
        
        if (electricalCard) {
            electricalCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            electricalCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-15px)';
            });
        }
        
        if (civilCard) {
            civilCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            civilCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-15px)';
            });
        }
    }
    
    // ====== HERO EMOJI ANIMATIONS ======
    function initHeroEmojis() {
        const electricalEmoji = document.querySelector('.electrical-emoji');
        const civilEmoji = document.querySelector('.civil-emoji');
        
        if (electricalEmoji) {
            electricalEmoji.innerHTML = '👨‍🔧';
            electricalEmoji.title = 'Electrical Engineer';
        }
        
        if (civilEmoji) {
            civilEmoji.innerHTML = '👷‍♂️';
            civilEmoji.title = 'Civil Engineer';
        }
    }
    
    initHeroEmojis();
    
    // ====== ANALYTICS TRACKING HELPER ======
    function trackEvent(action, category, label) {
        console.log('Event tracked:', action, category, label);
        
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }
    
    // Track page view
    trackEvent('page_view', 'navigation', window.location.pathname);
    
    // ====== RESPONSIVE IMAGE HANDLING ======
    function handleResponsiveImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    handleResponsiveImages();
    
    // ====== TOUCH DEVICE DETECTION ======
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    // Add touch device class for CSS adjustments
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // ====== FIX FOR IOS VIEWPORT HEIGHT ======
    function fixViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    fixViewportHeight();
    window.addEventListener('resize', fixViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(fixViewportHeight, 500);
    });
    
    // ====== PREVENT FORM ZOOM ON IOS ======
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                document.body.style.zoom = "100%";
            }
        });
    });
    
    // ====== ENHANCED FORM INTERACTIONS ======
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // ====== HANDLE RESIZE EVENTS ======
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-initialize mobile menu if needed
            if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // ====== FIX FOR ANDROID CHROME ADDRESS BAR ======
    if (/Android/.test(navigator.userAgent)) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);
        });
    }
    
    // ====== IMPROVE TOUCH SCROLLING ======
    if (isTouchDevice()) {
        document.body.style.overflow = 'auto';
        document.body.style.webkitOverflowScrolling = 'touch';
    }
});

// ====== DEBOUNCE FUNCTION FOR PERFORMANCE ======
function debounce(func, wait = 10) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// ====== THROTTLE FUNCTION FOR PERFORMANCE ======
function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
        const context = this, args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====== IOS SPECIFIC FIXES ======
(function() {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Fix for iOS viewport height
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
        
        // Prevent double tap zoom
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
})();
