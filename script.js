document.addEventListener('DOMContentLoaded', () => {
    // 1. Grayscale to Color Reveal on Scroll
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('grayscale'); // Remove grayscale class to reveal color
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('grayscale'); // Ensure initial state is grayscale
        revealObserver.observe(el);
    });

    // 2. Sticky Navigation Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
            nav.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
            nav.classList.remove('py-6');
        } else {
            nav.classList.remove('nav-scrolled');
            nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
            nav.classList.add('py-6');
        }
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    // Create mobile menu container dynamically if not in HTML
    let mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'fixed inset-0 bg-paper z-40 flex flex-col items-center justify-center space-y-8 hidden transition-opacity duration-300';
        mobileMenu.innerHTML = `
            <a href="#about" class="text-xl font-serif text-ink hover:text-gold transition-colors">About</a>
            <a href="#clinic" class="text-xl font-serif text-ink hover:text-gold transition-colors">The Clinic</a>
            <a href="#academy" class="text-xl font-serif text-ink hover:text-gold transition-colors">The Academy</a>
            <a href="#events" class="text-xl font-serif text-ink hover:text-gold transition-colors">Events</a>
            <a href="#journal" class="text-xl font-serif text-ink hover:text-gold transition-colors">Journal</a>
            <button id="close-menu" class="absolute top-6 right-6 text-ink p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
        document.body.appendChild(mobileMenu);
        
        // Add close logic
        document.getElementById('close-menu').addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });

        // Add link click logic to close menu
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // 5. Fade In Up Animation for Sections
    const fadeElements = document.querySelectorAll('section > div');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.classList.add('fade-in-up');
        fadeObserver.observe(el);
    });
});
