/* main.js - Interactive Scripts for Web Portfolio */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Navigation Header Scroll Effect
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 2. Mobile Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between 'menu' and 'x' (Lucide icons)
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // Re-render icon
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons(); // Re-render icon
            });
        });
    }

    // ==========================================================================
    // 3. Project Filter Logic
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Animation effect
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================================================
    // 4. Active Navigation Link on Scroll (Intersection Observer)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // trigger when section is in middle of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ==========================================================================
    // 5. Contact Form Submission Handling
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page reload

            // Get form values (can be sent to backend APIs)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Log values for verification
            console.log('Sending message:', { name, email, message });

            // Show loading state on submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '전송 중... <i data-lucide="loader" class="animate-spin"></i>';
            lucide.createIcons();

            // Simulate API request delay (1.5 seconds)
            setTimeout(() => {
                // Hide Form and Show Success Message
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                lucide.createIcons();
            }, 1500);
        });
    }

    // ==========================================================================
    // 6. Scroll To Top Button Logic
    // ==========================================================================
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            // Show button after scrolling down 500px
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
