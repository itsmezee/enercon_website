// Main JavaScript for Enercon Solutions Website

document.addEventListener('DOMContentLoaded', function() {
    // ====== MOBILE MENU TOGGLE ======
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Dropdown toggle for mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.main-nav a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
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
                
                // Also activate parent dropdown for service pages
                if (linkPage.includes('electrical.html') || linkPage.includes('civil.html')) {
                    const dropdownToggle = document.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
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
    
    // Service card clicks
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
    
    // ====== SERVICE CARD HOVER EFFECTS ======
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
    
    // ====== HERO EMOJI ANIMATIONS ======
    function initHeroEmojis() {
        const electricalEmoji = document.querySelector('.electrical-emoji');
        const civilEmoji = document.querySelector('.civil-emoji');
        
        if (electricalEmoji) {
            // Add electrical emoji
            electricalEmoji.innerHTML = '👨‍🔧';
            electricalEmoji.title = 'Electrical Engineer';
        }
        
        if (civilEmoji) {
            // Add civil emoji
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
        
        // Custom analytics
        const analyticsData = {
            event: action,
            category: category,
            label: label,
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // You can send this data to your server here
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(analyticsData)
        // });
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
    
    // ====== FIX FOOTER POSITION ON MOBILE ======
    function fixFooterPosition() {
        if (window.innerHeight > document.body.offsetHeight) {
            const footer = document.querySelector('.main-footer');
            if (footer) {
                footer.style.position = 'fixed';
                footer.style.bottom = '0';
                footer.style.width = '100%';
            }
        } else {
            const footer = document.querySelector('.main-footer');
            if (footer) {
                footer.style.position = 'relative';
                footer.style.bottom = 'auto';
            }
        }
    }
    
    // Initial check
    fixFooterPosition();
    
    // Check on resize
    window.addEventListener('resize', fixFooterPosition);
    
    // ====== ENHANCED FORM INTERACTIONS ======
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
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
    
    // ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});