(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    const hero = document.querySelector('.hero');

    function handleNavbarScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMobileMenu();
        });
    });

    document.addEventListener('click', e => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            toggleMobileMenu();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const offset = navbar.offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.service-card, .plan-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document
        .querySelectorAll('.service-card, .plan-card, .trainer-card, .testimonial-card')
        .forEach(el => revealObserver.observe(el));

    if (hero) {
        let ticking = false;

        window.addEventListener(
            'scroll',
            () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
                        ticking = false;
                    });
                    ticking = true;
                }
            },
            { passive: true }
        );
    }

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const goal = contactForm.querySelector('#goal').value;

            if (!name || !email || !goal) {
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const button = contactForm.querySelector('button[type="submit"]');
            const text = button.textContent;

            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                alert(`Thank you, ${name}! Your free trial request has been submitted.`);
                contactForm.reset();
                button.textContent = text;
                button.disabled = false;
            }, 1200);
        });
    }
})();
