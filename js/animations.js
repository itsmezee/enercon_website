// Optimized Animations for Enercon Solutions Website
// Mobile-friendly with performance optimizations

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
    
    // ====== ELECTRICAL SERVICE ANIMATIONS ======
    function initElectricalAnimations() {
        const electricalCard = document.getElementById('electrical-service');
        const electricalIcon = document.querySelector('.electrical-card .service-icon');
        
        if (!electricalCard || !electricalIcon) return;
        
        // Only create bolt elements on desktop with animation enabled
        if (shouldAnimate) {
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
        }
        
        // Hover animation for desktop only
        if (!isMobile) {
            electricalCard.addEventListener('mouseenter', throttle(function() {
                if (!shouldAnimate) return;
                
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
                
                // Sparkle effect
                const sparkContainer = this.querySelector('.animation-spark');
                if (sparkContainer) {
                    sparkContainer.style.animation = 'none';
                    void sparkContainer.offsetWidth; // Trigger reflow
                    sparkContainer.style.animation = 'thunderStrike 1s ease-out';
                }
                
            }, 300)); // Throttle to 300ms
            
            // Continuous subtle glow effect (desktop only)
            if (shouldAnimate) {
                setInterval(() => {
                    if (electricalCard.matches(':hover')) {
                        const icon = electricalCard.querySelector('.service-icon');
                        if (icon) {
                            icon.style.boxShadow = `
                                0 0 20px rgba(30, 144, 255, 0.5),
                                0 0 40px rgba(30, 144, 255, 0.3),
                                0 0 60px rgba(30, 144, 255, 0.1)
                            `;
                            
                            setTimeout(() => {
                                icon.style.boxShadow = '';
                            }, 500);
                        }
                    }
                }, 3000);
            }
        }
        
        // Touch animation for mobile (simplified)
        if (isMobile) {
            electricalCard.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) { // Single touch
                    this.style.transform = 'scale(0.98)';
                    const icon = this.querySelector('.service-icon');
                    if (icon) {
                        icon.style.boxShadow = '0 0 15px rgba(30, 144, 255, 0.4)';
                        setTimeout(() => {
                            icon.style.boxShadow = '';
                        }, 300);
                    }
                }
            });
            
            electricalCard.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        }
    }
    
    // ====== CIVIL SERVICE ANIMATIONS ======
    function initCivilAnimations() {
        const civilCard = document.getElementById('civil-service');
        const civilIcon = document.querySelector('.civil-card .service-icon');
        
        if (!civilCard || !civilIcon) return;
        
        // Hover animation for desktop only
        if (!isMobile && shouldAnimate) {
            civilCard.addEventListener('mouseenter', throttle(function() {
                // Brick pattern animation
                const brickContainer = this.querySelector('.animation-brick');
                if (brickContainer) {
                    brickContainer.style.animation = 'none';
                    void brickContainer.offsetWidth;
                    brickContainer.style.animation = 'brickFall 1.5s ease-out';
                }
                
            }, 300)); // Throttle to 300ms
        }
        
        // Touch animation for mobile (simplified)
        if (isMobile) {
            civilCard.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) {
                    this.style.transform = 'scale(0.98)';
                    const icon = this.querySelector('.service-icon');
                    if (icon) {
                        icon.style.boxShadow = '0 0 15px rgba(107, 142, 35, 0.4)';
                        setTimeout(() => {
                            icon.style.boxShadow = '';
                        }, 300);
                    }
                }
            });
            
            civilCard.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        }
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
        
        // Add emoji animations
        const emojis = document.querySelectorAll('.emoji-character');
        emojis.forEach((emoji, index) => {
            if (prefersReducedMotion) {
                emoji.style.animation = 'none';
                return;
            }
            
            emoji.style.opacity = '0';
            setTimeout(() => {
                emoji.style.opacity = '1';
                emoji.style.transition = 'opacity 0.8s ease';
            }, 800 + index * 200);
        });
    }
    
    // ====== SCROLL ANIMATIONS ======
    function initScrollAnimations() {
        if (prefersReducedMotion) return;
        
        const handleScroll = throttle(() => {
            // Animate elements on scroll
            const animatedElements = document.querySelectorAll('.service-card, .feature, .industry-item, .about-feature, .service-item, .contact-card');
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        }, 50); // Throttle scroll events to 50ms
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
    }
    
    // ====== CTA SECTION ANIMATIONS ======
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
                    
                    .service-card:hover {
                        transform: translateY(-5px) !important;
                    }
                    
                    .emoji-character {
                        animation: none !important;
                    }
                    
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
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
        
        // Add performance monitoring
        if ('performance' in window) {
            const perfMark = `animations_loaded_${Date.now()}`;
            performance.mark(perfMark);
        }
    }
    
    // ====== LAZY LOAD ANIMATIONS ======
    // Wait for critical content to load first
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
            
            // Re-initialize animations if needed
            if (window.innerWidth > 768 && !isMobile) {
                const perfMark = `resize_reinit_${Date.now()}`;
                performance.mark(perfMark);
            }
        }, 250);
    }, 100));
    
    // ====== ERROR HANDLING ======
    window.addEventListener('error', function(e) {
        console.warn('Animation error:', e.message);
        // Disable animations on error
        document.querySelectorAll('.lightning-bolt, .brick-particle, .cta-particle').forEach(el => {
            el.style.display = 'none';
        });
    }, true);
});