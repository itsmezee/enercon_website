// Optimized Animations for Enercon Solutions Website - Mobile Friendly

document.addEventListener('DOMContentLoaded', function() {
    // ====== MOBILE DETECTION & PERFORMANCE SETTINGS ======
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = !isMobile && !prefersReducedMotion;
    
    // ====== PERFORMANCE OPTIMIZED ANIMATION FUNCTIONS ======
    function debounce(func, wait = 10) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // ====== ELECTRICAL SERVICE ANIMATIONS (Desktop only) ======
    function initElectricalAnimations() {
        const electricalCard = document.getElementById('electrical-service');
        const electricalIcon = document.querySelector('.electrical-card .service-icon');
        
        if (!electricalCard || !electricalIcon || !shouldAnimate) return;
        
        // Create bolt elements for desktop only
        for (let i = 0; i < 3; i++) {
            const bolt = document.createElement('div');
            bolt.className = 'lightning-bolt';
            bolt.setAttribute('aria-hidden', 'true');
            bolt.style.cssText = `
                position: absolute;
                width: 3px;
                height: ${15 + i * 5}px;
                background: linear-gradient(to bottom, #FFD700, #FFA500);
                opacity: 0;
                z-index: 10;
                pointer-events: none;
                border-radius: 2px;
            `;
            electricalIcon.appendChild(bolt);
        }
        
        // Hover animation for desktop only
        electricalCard.addEventListener('mouseenter', function() {
            const bolts = this.querySelectorAll('.lightning-bolt');
            
            // Animate each bolt
            bolts.forEach((bolt, index) => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 40 + Math.random() * 20;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                bolt.style.left = `calc(50% + ${x}px)`;
                bolt.style.top = `calc(50% + ${y}px)`;
                bolt.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                setTimeout(() => {
                    bolt.style.opacity = '1';
                    bolt.style.boxShadow = '0 0 10px #FFD700';
                    
                    setTimeout(() => {
                        bolt.style.opacity = '0';
                        bolt.style.boxShadow = 'none';
                    }, 200);
                }, index * 100);
            });
        });
    }
    
    // ====== CIVIL SERVICE ANIMATIONS (Desktop only) ======
    function initCivilAnimations() {
        const civilCard = document.getElementById('civil-service');
        
        if (!civilCard || !shouldAnimate) return;
        
        // Hover animation for desktop only
        civilCard.addEventListener('mouseenter', function() {
            // Brick pattern animation
            const brickContainer = this.querySelector('.animation-brick');
            if (brickContainer) {
                brickContainer.style.animation = 'none';
                void brickContainer.offsetWidth;
                brickContainer.style.animation = 'brickFall 1.5s ease-out';
            }
        });
    }
    
    // ====== PAGE LOAD ANIMATIONS ======
    function initPageLoadAnimations() {
        // Add loading animation to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            if (prefersReducedMotion) {
                card.style.opacity = '1';
                card.style.transform = 'none';
                return;
            }
            
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + index * 200);
        });
        
        // Add loading animation to features
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            if (prefersReducedMotion) {
                feature.style.opacity = '1';
                feature.style.transform = 'none';
                return;
            }
            
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }, 600 + index * 100);
        });
        
        // Add emoji animations (simplified for mobile)
        const emojis = document.querySelectorAll('.emoji-character');
        emojis.forEach((emoji, index) => {
            if (prefersReducedMotion || isMobile) {
                emoji.style.opacity = '1';
                return;
            }
            
            emoji.style.opacity = '0';
            setTimeout(() => {
                emoji.style.opacity = '1';
                emoji.style.transition = 'opacity 0.8s ease';
            }, 800 + index * 200);
        });
    }
    
    // ====== SCROLL ANIMATIONS (Optimized for mobile) ======
    function initScrollAnimations() {
        if (prefersReducedMotion || isMobile) return;
        
        const handleScroll = debounce(() => {
            // Animate elements on scroll
            const animatedElements = document.querySelectorAll('.service-card, .feature, .industry-item, .about-feature, .service-item, .contact-card');
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        }, 50);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
    }
    
    // ====== CTA SECTION ANIMATIONS (Desktop only) ======
    function initCTASection() {
        const ctaSection = document.querySelector('.cta-section');
        if (!ctaSection || !shouldAnimate) return;
        
        // Add floating particles to CTA section (desktop only)
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'cta-particle';
            particle.setAttribute('aria-hidden', 'true');
            
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                left: ${x}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.4 + 0.1};
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
                z-index: 1;
            `;
            
            ctaSection.appendChild(particle);
        }
    }
    
    // ====== INITIALIZE ALL ANIMATIONS ======
    function initAnimations() {
        // Add mobile-specific CSS
        if (isMobile || prefersReducedMotion) {
            const mobileStyles = `
                @media (max-width: 768px), (prefers-reduced-motion: reduce) {
                    .lightning-bolt,
                    .brick-particle,
                    .cta-particle {
                        display: none !important;
                    }
                    
                    .service-card:hover,
                    .feature:hover,
                    .industry-item:hover,
                    .contact-card:hover {
                        transform: translateY(-5px) !important;
                    }
                    
                    .emoji-character {
                        animation: none !important;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = mobileStyles;
            document.head.appendChild(style);
        }
        
        // Initialize animations based on device capabilities
        if (shouldAnimate) {
            initElectricalAnimations();
            initCivilAnimations();
            initCTASection();
        }
        
        // Always initialize these (mobile-friendly)
        initPageLoadAnimations();
        initScrollAnimations();
    }
    
    // ====== LAZY LOAD ANIMATIONS ======
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                initAnimations();
            }, { timeout: 2000 });
        } else {
            // Fallback for older browsers
            setTimeout(initAnimations, 500);
        }
    }
    
    // ====== WINDOW RESIZE HANDLER ======
    let resizeTimeout;
    window.addEventListener('resize', debounce(() => {
        // Clear any existing animations on resize
        if (resizeTimeout) clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            // Clean up old particles if needed
            document.querySelectorAll('.lightning-bolt, .brick-particle, .cta-particle').forEach(el => {
                if (el.parentNode) el.parentNode.removeChild(el);
            });
        }, 250);
    }, 100));
});
