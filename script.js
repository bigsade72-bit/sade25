/* ===================================
   EXOTICUS - Main JavaScript
   =================================== */

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation (for contact page)
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const errors = {};
        
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Please enter your name';
            isValid = false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Please enter a message (at least 10 characters)';
            isValid = false;
        }
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        
        if (!isValid) {
            // Display errors
            Object.keys(errors).forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                input.classList.add('input-error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errors[field];
                input.parentNode.appendChild(errorDiv);
            });
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = 'Thank you for your message! We\'ll get back to you soon.';
            contactForm.insertBefore(successDiv, contactForm.firstChild);
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }, 1500);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Strain Filter Functionality (for strains page)
const filterButtons = document.querySelectorAll('.filter-btn');
const strainCards = document.querySelectorAll('.strain-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter strains
            strainCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Image Gallery/Modal
const galleryImages = document.querySelectorAll('.gallery-image');

if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const modal = createModal(img.src, img.alt);
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('active'), 10);
        });
    });
}

function createModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    return modal;
}

// Initialize animations on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Age Verification (optional - uncomment if needed)
/*
function checkAgeVerification() {
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (!ageVerified) {
        showAgeGate();
    }
}

function showAgeGate() {
    const ageGate = document.createElement('div');
    ageGate.className = 'age-gate';
    ageGate.innerHTML = `
        <div class="age-gate-content">
            <h2>Age Verification Required</h2>
            <p>You must be 21 or older to enter this site.</p>
            <div class="age-gate-buttons">
                <button onclick="verifyAge(true)">I'm 21 or Older</button>
                <button onclick="verifyAge(false)">I'm Under 21</button>
            </div>
        </div>
    `;
    document.body.appendChild(ageGate);
}

function verifyAge(isOfAge) {
    if (isOfAge) {
        localStorage.setItem('ageVerified', 'true');
        document.querySelector('.age-gate').remove();
    } else {
        window.location.href = 'https://www.samhsa.gov/';
    }
}

// Check age on page load
checkAgeVerification();
*/

console.log('Exoticus website loaded successfully!');
