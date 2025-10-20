// Adds Javascript functionality after HTML file has loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeDynamicContent();
    initializeThemeToggle();
    initializeProjectFeatures();
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
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Clear all field messages
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const fieldMessage = group.querySelector('.field-message');
            if (fieldMessage) fieldMessage.remove();
        });
        
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
    
    // Remove previous errors and messages
    field.classList.remove('error', 'success');
    removeFieldMessage(field);
    
    // Validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        showFieldMessage(field, 'This field is required', 'error');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        field.classList.add('error');
        showFieldMessage(field, 'Please enter a valid email address', 'error');
        return false;
    }
    
    if (value) {
        field.classList.add('success');
        showFieldMessage(field, 'Looks good!', 'success');
    }
    
    return true;
}

// Clear field error state on input
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error', 'success');
    removeFieldMessage(field);
}

// Show inline field message
function showFieldMessage(field, message, type) {
    removeFieldMessage(field);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `field-message ${type}`;
    messageDiv.textContent = message;
    
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.appendChild(messageDiv);
    }
}

// Remove inline field message
function removeFieldMessage(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        const existingMessage = formGroup.querySelector('.field-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
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

// Dynamic Content Features
function initializeDynamicContent() {
    updatePersonalizedGreeting();
    fetchGitHubRepos();
    fetchFunFact();
    fetchDailyQuote();
}

// Personalized greeting based on time of day
function updatePersonalizedGreeting() {
    const greetingElement = document.getElementById('personalized-greeting');
    if (!greetingElement) return;
    
    const currentHour = new Date().getHours();
    let greeting;
    
    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    // Add smooth transition effect
    greetingElement.style.opacity = '0';
    setTimeout(() => {
        greetingElement.textContent = greeting;
        greetingElement.style.opacity = '1';
    }, 200);
}

// Theme Toggle with Local Storage
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-theme', savedTheme === 'dark');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon(savedTheme);
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    body.classList.toggle('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add smooth transition
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Project Features (Filtering, Sorting, Search)
function initializeProjectFeatures() {
    initializeProjectFiltering();
    initializeProjectSearch();
}

function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initializeProjectSearch() {
    const searchInput = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          techTags.some(tag => tag.includes(searchTerm));
            
            if (matches) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.3s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// GitHub API Integration
async function fetchGitHubRepos() {
    const githubSection = document.getElementById('github-repos');
    if (!githubSection) return;
    
    const reposList = githubSection.querySelector('.repos-list');
    if (!reposList) return;
    
    try {
        // Fetch latest repositories from GitHub API
        const response = await fetch('https://api.github.com/users/saeedalhabib/repos?sort=updated&per_page=3');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        
        if (repos.length > 0) {
            updateGitHubSection(repos);
        } else {
            showEmptyState(reposList, 'No repositories found', 'No public repositories available at the moment.');
        }
    } catch (error) {
        console.log('GitHub API error:', error);
        showErrorState(reposList, 'Failed to load repositories', 'Unable to fetch GitHub repositories. Please check your connection and try again.', () => fetchGitHubRepos());
    }
}

function updateGitHubSection(repos) {
    const reposList = document.querySelector('.repos-list');
    if (!reposList) return;
    
    reposList.innerHTML = repos.map(repo => `
        <div class="repo-item">
            <h4><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h4>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-stats">
                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                <span class="language">${repo.language || 'Unknown'}</span>
            </div>
        </div>
    `).join('');
}

// Fun Fact API Integration
async function fetchFunFact() {
    const factSection = document.getElementById('fun-fact');
    if (!factSection) return;
    
    const factContent = factSection.querySelector('.fact-content');
    if (!factContent) return;
    
    try {
        // Fetch random fun fact from API
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.text) {
            updateFunFactSection(data.text);
        } else {
            const fallbackFacts = [
                "The human brain contains approximately 86 billion neurons."
            ];
            const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
            updateFunFactSection(randomFact);
        }
    } catch (error) {
        console.log('Fun Fact API error:', error);
        // Use fallback facts instead of showing error
        const fallbackFacts = [
            "The human brain contains approximately 86 billion neurons."
        ];
        const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        updateFunFactSection(randomFact);
    }
}

function updateFunFactSection(fact) {
    const factContent = document.querySelector('.fact-content');
    if (!factContent) return;
    
    factContent.innerHTML = `
        <div class="fact-item">
            <div class="fact-icon">
                <i class="fas fa-lightbulb"></i>
            </div>
            <p class="fact-text">${fact}</p>
            <button class="refresh-fact-btn" onclick="fetchFunFact()">
                <i class="fas fa-refresh"></i> New Fact
            </button>
        </div>
    `;
}

// Daily Quote API Integration
async function fetchDailyQuote() {
    const quoteSection = document.getElementById('daily-quote');
    if (!quoteSection) return;
    
    const quoteContent = quoteSection.querySelector('.quote-content');
    if (!quoteContent) return;
    
    try {
        // Fetch inspirational quote from a more reliable API
        const response = await fetch('https://zenquotes.io/api/random');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0 && data[0].q && data[0].a) {
            updateQuoteSection(data[0].q, data[0].a);
        } else {
            // Fallback to a local quote if API fails
            const fallbackQuotes = [
                { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" }
            ];
            const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            updateQuoteSection(randomQuote.quote, randomQuote.author);
        }
    } catch (error) {
        console.log('Quote API error:', error);
        // Use fallback quotes instead of showing error
        const fallbackQuotes = [
            { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
            { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
            { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
            { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" }
        ];
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        updateQuoteSection(randomQuote.quote, randomQuote.author);
    }
}

function updateQuoteSection(quote, author) {
    const quoteContent = document.querySelector('.quote-content');
    if (!quoteContent) return;
    
    quoteContent.innerHTML = `
        <div class="quote-item">
            <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
            </div>
            <blockquote class="quote-text">"${quote}"</blockquote>
            <cite class="quote-author">— ${author}</cite>
            <button class="refresh-quote-btn" onclick="fetchDailyQuote()">
                <i class="fas fa-refresh"></i> New Quote
            </button>
        </div>
    `;
}

// State Management Functions
function showLoadingState(container, message = 'Loading...') {
    container.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

function showErrorState(container, title, message, retryCallback = null) {
    container.innerHTML = `
        <div class="error-state">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h4>${title}</h4>
            <p>${message}</p>
            ${retryCallback ? '<button class="retry-btn" onclick="this.closest(\'.error-state\').retryCallback()">Try Again</button>' : ''}
        </div>
    `;
    
    if (retryCallback) {
        const errorState = container.querySelector('.error-state');
        errorState.retryCallback = retryCallback;
    }
}

function showEmptyState(container, title, message) {
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-inbox"></i>
            </div>
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
}