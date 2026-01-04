(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');

   function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });

    document.querySelectorAll(".plan-card").forEach(card => {
                card.addEventListener("mousemove", e => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
                    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
                });
    });

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); 

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                goal: document.getElementById('goal').value
            };

            if (!formData.name || !formData.email || !formData.goal) {
                alert('Please fill in all required fields.');
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            var submitButton = contactForm.querySelector('button[type="submit"]');
            var originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(function() {
                alert('Thank you, ' + formData.name + '! Your free trial request has been submitted. Our team will contact you within 24 hours.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .plan-card, .trainer-card, .testimonial-card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    var style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    document.querySelectorAll('.services-grid, .plans-grid, .trainers-grid, .testimonials-grid').forEach(function(grid) {
        var cards = grid.querySelectorAll('.service-card, .plan-card, .trainer-card, .testimonial-card');
        cards.forEach(function(card, index) {
            card.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    var hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            var scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
            }
        });
    }

    console.log('IRONFORGE GYM - Static Website Loaded');

})();
