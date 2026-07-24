document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Theme Toggle Logic
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Toggle icon
        const icon = themeToggleBtn.querySelector('i');
        icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // ==========================================================================
    // 2. Navigation Header Scroll Effect
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
    // 3. Mobile Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // ==========================================================================
    // 4. Click to Enlarge Diagram Modal
    // ==========================================================================
    const diagrams = document.querySelectorAll('.project-deep-diagram-container');
    const modal = document.getElementById('diagram-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    if (diagrams && modal && modalContent) {
        diagrams.forEach(diagram => {
            diagram.addEventListener('click', () => {
                const originalSvg = diagram.querySelector('svg');
                if (originalSvg) {
                    const clonedSvg = originalSvg.cloneNode(true);
                    clonedSvg.removeAttribute('viewBox');
                    clonedSvg.setAttribute('width', '100%');
                    clonedSvg.setAttribute('height', 'auto');
                    
                    modalContent.innerHTML = '';
                    modalContent.appendChild(clonedSvg);
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                modalContent.innerHTML = '';
            }, 300);
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-caption')) {
                closeModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ==========================================================================
    // 5. Active Navigation Link on Scroll
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
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
    // 6. Contact Form Submission
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin"></i>';
            lucide.createIcons();

            setTimeout(() => {
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
                lucide.createIcons();
            }, 1500);
        });
    }

    // ==========================================================================
    // 7. Scroll To Top Button
    // ==========================================================================
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
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