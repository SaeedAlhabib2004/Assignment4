
// Adds Javascript functionality after HTML file has loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
});

function initializeNavigation() { 
  //initializing HTML elements as constants
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting based on scroll position
    window.addEventListener('scroll', highlightActiveSection);
}

// Smooth Scrolling and Section Highlighting
function initializeScrollEffects() {
    // Select all elements that are class nav-link and have an href attribute that starts with #.
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 70; 
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight active navigation section based on scroll position
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Contact Form Handling
// - Form validation
// - Submission simulation
// - User feedback
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle contact form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validate all fields
    if (!validateForm(form)) {
        alert('Please fill in all fields correctly.');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    
    // Initial form submission without backend logic
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Log form data for demonstration
        const formData = new FormData(form);
        console.log('Form submitted with data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
    }, 2000);
}

// Validate form
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove previous errors
    field.classList.remove('error');
    
    // Validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email'&& !isValidEmail(value)) {
        field.classList.add('error');
        return false;
    }
    field.classList.add('success');
    return true;
}

// Clear field error state on input
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error', 'success');
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const event = { target: input };
        if (!validateField(event)) {
            isValid = false;
        }
    });
    
    return isValid;
}


// Email validation 

function isValidEmail(email) {
    const emailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailStructure.test(email);
}