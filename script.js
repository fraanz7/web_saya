// Enhanced script for portfolio website
document.addEventListener('DOMContentLoaded', function() {
    
    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.backgroundColor = 'var(--primary-color)';
                navMenu.style.padding = '1rem';
                navMenu.style.borderTop = '1px solid var(--border-color)';
                navMenu.style.gap = '1rem';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Add CSS for active navigation link
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-menu a.active {
            color: var(--accent-color) !important;
        }
        .nav-menu a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeStyle);
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || 'User';
            
            // Show success message
            showNotification(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 10000;
            font-family: var(--font-sans);
            font-size: 0.875rem;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;
        
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        
        document.head.appendChild(animationStyle);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
            animationStyle.remove();
        }, 3000);
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card, .certificate-card').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
    
    // Add animation styles
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .skill-card:nth-child(1) { transition-delay: 0.1s; }
        .skill-card:nth-child(2) { transition-delay: 0.2s; }
        .skill-card:nth-child(3) { transition-delay: 0.3s; }
        .skill-card:nth-child(4) { transition-delay: 0.4s; }
        .skill-card:nth-child(5) { transition-delay: 0.5s; }
        .skill-card:nth-child(6) { transition-delay: 0.6s; }
        .project-card { transition-delay: calc(var(--i, 0) * 0.2s); }
    `;
    document.head.appendChild(fadeStyle);
    
    // Set index for staggered project animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    
    // Email copy functionality
    const emailElement = document.querySelector('a[href^="mailto:"]');
    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email copied to clipboard!');
            });
        });
    }
    
    // Hero scroll button functionality
    const scrollButton = document.querySelector('.hero-scroll');
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Certificate Modal Functions
function viewCertificate(certId) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImage');
    
    // Map certificate IDs to image paths
    const certificateMap = {
        'cert1': 'images/certificates/data-engineering.jpg',
        'cert2': 'images/certificates/python-advanced.jpg',
        'cert3': 'images/certificates/sql-mastery.jpg',
        'cert4': 'images/certificates/airflow-etl.jpg'
    };
    
    modalImg.src = certificateMap[certId] || 'images/certificates/default.jpg';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function downloadCertificate() {
    const modalImg = document.getElementById('modalCertificateImage');
    const link = document.createElement('a');
    link.href = modalImg.src;
    link.download = 'certificate_' + Date.now() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download notification
    showNotification('Certificate download started!');
}

function shareCertificate() {
    if (navigator.share) {
        navigator.share({
            title: 'My Professional Certificate',
            text: 'Check out this certificate I earned!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers without Web Share API
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!');
        });
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeCertificateModal();
            }
        });
    }
    
    // Add animation to certificate cards
    const certCards = document.querySelectorAll('.certificate-card');
    certCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    });

    // Add this CSS animation via JavaScript
    const certAnimationStyle = document.createElement('style');
    certAnimationStyle.textContent = `
        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(certAnimationStyle);
});