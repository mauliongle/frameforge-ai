/* ============================================
   FrameForge AI — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Navbar Scroll Effect ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const startTime = performance.now();
                
                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;
                    
                    if (isDecimal) {
                        el.textContent = current.toFixed(1);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- CTA Form Interaction ---
    const ctaButton = document.getElementById('ctaButton');
    const ctaEmail = document.getElementById('ctaEmail');

    if (ctaButton && ctaEmail) {
        ctaButton.addEventListener('click', () => {
            const email = ctaEmail.value.trim();
            
            if (!email || !email.includes('@')) {
                ctaEmail.style.borderColor = '#ef4444';
                ctaEmail.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
                ctaEmail.setAttribute('placeholder', 'Please enter a valid email');
                
                setTimeout(() => {
                    ctaEmail.style.borderColor = '';
                    ctaEmail.style.boxShadow = '';
                    ctaEmail.setAttribute('placeholder', 'Enter your email address');
                }, 2000);
                return;
            }
            
            // Success animation
            ctaButton.textContent = '✓ You\'re In!';
            ctaButton.style.background = 'linear-gradient(135deg, #34d399, #059669)';
            ctaEmail.value = '';
            ctaEmail.setAttribute('placeholder', 'Thank you! Check your inbox.');
            
            setTimeout(() => {
                ctaButton.textContent = 'Get Early Access';
                ctaButton.style.background = '';
                ctaEmail.setAttribute('placeholder', 'Enter your email address');
            }, 3000);
        });

        ctaEmail.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                ctaButton.click();
            }
        });
    }

    // --- Parallax Effect on Hero Image ---
    const heroWrapper = document.querySelector('.hero__image-wrapper');
    
    if (heroWrapper && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.15;
            heroWrapper.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav__link[href="#${id}"]`);
            
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = 'var(--accent-purple)';
                } else {
                    link.style.color = '';
                }
            }
        });
    }, { passive: true });

    // --- Magnetic Hover Effect on Buttons ---
    document.querySelectorAll('.btn--primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // --- Tilt Effect on Feature Cards ---
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
