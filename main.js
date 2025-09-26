// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Performance optimization - use requestAnimationFrame for smoother animations
    let scrollY = window.scrollY;
    let ticking = false;
    
    function onScroll() {
        scrollY = window.scrollY;
        requestTick();
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }
    
    function update() {
        // Header scroll effect
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Page loader animation
    const loader = document.querySelector('.loader');
    const loaderTimeline = gsap.timeline();
    
    loaderTimeline
        .to('.loader h1', {
            opacity: 0,
            y: -50,
            duration: 0.5
        })
        .to(loader, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.out'
        });
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    // Show cursor when mouse enters the window
    window.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            opacity: 1,
            duration: 0.3
        });
    });
    
    // Hide cursor when mouse leaves the window
    window.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
    });
    
    // Make cursor larger when hovering over links and buttons
    const hoverElements = document.querySelectorAll('a, button, .btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'var(--secondary-color)',
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'var(--primary-color)',
                duration: 0.3
            });
        });
    });
    
    // Profile photo animations
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        // Initial animation for profile photo
        gsap.from('.profile-border', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
                trigger: '.profile-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.profile-photo', {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.profile-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Header reference
    const header = document.querySelector('header');
    
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Hero section animations
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    
    heroTimeline
        .from('.title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.description', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.cta-buttons', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.shape', {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.3)'
        }, '-=0.8');
    
    // Animate the shape continuously
    gsap.to('.shape', {
        borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
    
    // Section headers animation with ScrollTrigger
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // About section animations
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Projects animation with interactive elements
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        // Initial animation
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
        
        // Add hover animations
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Animate project image
            const projectImage = card.querySelector('.project-image');
            gsap.to(projectImage, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Animate project title
            const projectTitle = card.querySelector('h3');
            gsap.to(projectTitle, {
                color: 'var(--primary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: 'var(--shadow)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Reset project image
            const projectImage = card.querySelector('.project-image');
            gsap.to(projectImage, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Reset project title
            const projectTitle = card.querySelector('h3');
            gsap.to(projectTitle, {
                color: 'var(--text-tertiary)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Add click animation for project links
        const projectLinks = card.querySelectorAll('.project-links a');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Create a ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                link.appendChild(ripple);
                
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                
                // Remove ripple after animation completes
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });
    
    // Skills animation
    gsap.utils.toArray('.skills-category').forEach((category, index) => {
        // Animate category title
        gsap.from(category.querySelector('h3'), {
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Animate skill items
        gsap.utils.toArray(category.querySelectorAll('.skill-item')).forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: 0.2 + (i * 0.1),
                ease: 'power3.out'
            });
        });
    });
    
    // Animate progress bars
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            width: `${percent}%`,
            duration: 1.5,
            ease: 'power3.out'
        });
    });
    
    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Form input animations
    gsap.utils.toArray('.form-group').forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: 0.2 + (index * 0.1),
            ease: 'power3.out'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted with values:', formValues);
            
            // Reset form
            contactForm.reset();
            
            // Show success message (you could create a better UI for this)
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    
    // Parallax effect for hero section
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });
    
    gsap.to('.shape', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        ease: 'none'
    });
    
    // Reveal animation for sections
    const revealSections = gsap.utils.toArray('section');
    
    revealSections.forEach((section, i) => {
        if (i > 0) { // Skip the hero section
            ScrollTrigger.create({
                trigger: section,
                start: 'top 80%',
                onEnter: () => animateSection(section),
                onEnterBack: () => animateSection(section),
                once: false
            });
        }
    });
    
    function animateSection(section) {
        // Add a class to mark the section as active/visible
        section.classList.add('active');
    }
});