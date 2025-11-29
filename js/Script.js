// Enhanced JavaScript for Portfolio Website - Assignment 3
// Adds JavaScript functionality after HTML file has loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeDynamicContent();
    initializeThemeToggle();
    initializeProjectFeatures();
    initializeVisitorTimer();
    initializeVisitorName();
    initializeSectionToggle();
});

// ==================== Navigation Functions ====================
function initializeNavigation() { 
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect with throttling
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = window.scrollY;
    }, 100));

    // Active link highlighting based on scroll position
    window.addEventListener('scroll', throttle(highlightActiveSection, 100));
}

// Smooth Scrolling and Section Highlighting
function initializeScrollEffects() {
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

// ==================== Contact Form Handling ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation with debouncing
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', debounce(clearFieldError, 300));
        });
    }
}

// Handle contact form submission with enhanced validation
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Enhanced validation
    if (!validateForm(form)) {
        showToast('Please fill in all fields correctly.', 'error');
        return;
    }
    
    // Additional checks
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    if (name.length < 2) {
        showToast('Name must be at least 2 characters long.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }
    
    if (message.length < 10) {
        showToast('Message must be at least 10 characters long.', 'error');
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
            const input = group.querySelector('input, textarea');
            if (input) {
                input.classList.remove('error', 'success');
            }
        });
        
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Show success message
        showToast('Thank you for your message! I will get back to you soon.', 'success');
        
        // Log form data for demonstration
        const formData = new FormData(form);
        console.log('Form submitted with data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    }, 2000);
}

// Enhanced field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove previous errors and messages
    field.classList.remove('error', 'success');
    removeFieldMessage(field);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        showFieldMessage(field, 'This field is required', 'error');
        return false;
    }
    
    // Name validation
    if (field.id === 'name' && value && value.length < 2) {
        field.classList.add('error');
        showFieldMessage(field, 'Name must be at least 2 characters', 'error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        field.classList.add('error');
        showFieldMessage(field, 'Please enter a valid email address', 'error');
        return false;
    }
    
    // Message validation
    if (field.id === 'message' && value && value.length < 10) {
        field.classList.add('error');
        showFieldMessage(field, 'Message must be at least 10 characters', 'error');
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

// Email validation with regex
function isValidEmail(email) {
    const emailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailStructure.test(email);
}

// ==================== Dynamic Content Features ====================
function initializeDynamicContent() {
    updatePersonalizedGreeting();
    fetchGitHubRepos();
    fetchFunFact();
    fetchDailyQuote();
    fetchWeather();
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
    
    // Check if visitor name is stored
    const visitorName = localStorage.getItem('visitorName');
    if (visitorName) {
        greeting += `, ${visitorName}`;
    }
    
    // Add smooth transition effect
    greetingElement.style.opacity = '0';
    setTimeout(() => {
        greetingElement.textContent = greeting;
        greetingElement.style.opacity = '1';
    }, 200);
}

// ==================== Theme Toggle with Local Storage ====================
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

// ==================== Project Features (Filtering, Sorting, Search) ====================
function initializeProjectFeatures() {
    initializeProjectFiltering();
    initializeProjectSearch();
    initializeProjectSorting();
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
            
            // Save filter preference
            localStorage.setItem('projectFilter', filter);
        });
    });
    
    // Load saved filter
    const savedFilter = localStorage.getItem('projectFilter');
    if (savedFilter) {
        const savedButton = document.querySelector(`[data-filter="${savedFilter}"]`);
        if (savedButton) savedButton.click();
    }
}

function initializeProjectSearch() {
    const searchInput = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
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
    }, 300));
}

// New: Project Sorting Functionality
function initializeProjectSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const projectsGrid = document.getElementById('projects-grid');
        const projectCards = Array.from(document.querySelectorAll('.project-card'));
        
        // Filter visible cards only
        const visibleCards = projectCards.filter(card => card.style.display !== 'none');
        
        let sortedCards;
        
        switch(sortValue) {
            case 'name-asc':
                sortedCards = visibleCards.sort((a, b) => {
                    const nameA = a.dataset.name || a.querySelector('.project-title').textContent;
                    const nameB = b.dataset.name || b.querySelector('.project-title').textContent;
                    return nameA.localeCompare(nameB);
                });
                break;
            case 'name-desc':
                sortedCards = visibleCards.sort((a, b) => {
                    const nameA = a.dataset.name || a.querySelector('.project-title').textContent;
                    const nameB = b.dataset.name || b.querySelector('.project-title').textContent;
                    return nameB.localeCompare(nameA);
                });
                break;
            case 'category':
                sortedCards = visibleCards.sort((a, b) => {
                    const catA = a.dataset.category || '';
                    const catB = b.dataset.category || '';
                    return catA.localeCompare(catB);
                });
                break;
            default:
                sortedCards = visibleCards;
        }
        
        // Re-append sorted cards
        sortedCards.forEach(card => {
            projectsGrid.appendChild(card);
        });
        
        // Save sort preference
        localStorage.setItem('projectSort', sortValue);
    });
    
    // Load saved sort preference
    const savedSort = localStorage.getItem('projectSort');
    if (savedSort && sortSelect) {
        sortSelect.value = savedSort;
        sortSelect.dispatchEvent(new Event('change'));
    }
}

// ==================== API Integration Functions ====================

// GitHub API Integration
async function fetchGitHubRepos() {
    const githubSection = document.getElementById('github-repos');
    if (!githubSection) return;
    
    const reposList = githubSection.querySelector('.repos-list');
    if (!reposList) return;
    
    try {
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

// Weather API Integration (New)
async function fetchWeather() {
    const weatherCard = document.getElementById('weather-card');
    if (!weatherCard) return;
    
    const weatherContent = weatherCard.querySelector('.weather-content');
    if (!weatherContent) return;
    
    try {
        // Using OpenWeatherMap API (free tier, no key required for basic usage)
        // Using a free alternative: wttr.in
        const response = await fetch('https://wttr.in/Khobar?format=j1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.current_condition && data.current_condition[0]) {
            const current = data.current_condition[0];
            const temp = current.temp_C;
            const desc = current.weatherDesc[0].value;
            const humidity = current.humidity;
            
            updateWeatherSection(temp, desc, humidity);
        } else {
            throw new Error('Invalid weather data');
        }
    } catch (error) {
        console.log('Weather API error:', error);
        // Fallback weather data
        updateWeatherSection(25, 'Partly Cloudy', 65);
    }
}

function updateWeatherSection(temp, description, humidity) {
    const weatherContent = document.querySelector('.weather-content');
    if (!weatherContent) return;
    
    weatherContent.innerHTML = `
        <div class="weather-card">
            <div class="weather-icon">
                <i class="fas fa-sun"></i>
            </div>
            <div class="temperature">${temp}°C</div>
            <div class="description">${description}</div>
            <div class="weather-details">
                <span><i class="fas fa-tint"></i> ${humidity}%</span>
            </div>
        </div>
    `;
}

// Fun Fact API Integration
async function fetchFunFact() {
    const factSection = document.getElementById('fun-fact');
    if (!factSection) return;
    
    const factContent = factSection.querySelector('.fact-content');
    if (!factContent) return;
    
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.text) {
            updateFunFactSection(data.text);
        } else {
            const fallbackFacts = [
                "The human brain contains approximately 86 billion neurons.",
                "A group of flamingos is called a 'flamboyance'.",
                "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old."
            ];
            const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
            updateFunFactSection(randomFact);
        }
    } catch (error) {
        console.log('Fun Fact API error:', error);
        const fallbackFacts = [
            "The human brain contains approximately 86 billion neurons.",
            "A group of flamingos is called a 'flamboyance'.",
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old."
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
        const response = await fetch('https://zenquotes.io/api/random');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0 && data[0].q && data[0].a) {
            updateQuoteSection(data[0].q, data[0].a);
        } else {
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

// ==================== State Management Functions ====================
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

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icons[type] || icons.info} toast-icon"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ==================== Visitor Timer Functionality ====================
function initializeVisitorTimer() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;
    
    // Get start time from sessionStorage or set new one
    let startTime = sessionStorage.getItem('visitStartTime');
    if (!startTime) {
        startTime = Date.now();
        sessionStorage.setItem('visitStartTime', startTime);
    } else {
        startTime = parseInt(startTime);
    }
    
    // Update timer every second
    setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// ==================== Visitor Name Storage ====================
function initializeVisitorName() {
    const saveNameBtn = document.getElementById('save-name-btn');
    const nameInput = document.getElementById('visitor-name-input');
    const greetingMessage = document.getElementById('greeting-message');
    
    // Load saved name
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
        if (nameInput) nameInput.value = savedName;
        updateGreetingMessage(savedName);
    }
    
    if (saveNameBtn && nameInput) {
        saveNameBtn.addEventListener('click', function() {
            const name = nameInput.value.trim();
            
            if (name.length < 2) {
                showToast('Please enter a name with at least 2 characters.', 'error');
                return;
            }
            
            localStorage.setItem('visitorName', name);
            updateGreetingMessage(name);
            updatePersonalizedGreeting();
            showToast(`Welcome, ${name}!`, 'success');
        });
    }
}

function updateGreetingMessage(name) {
    const greetingMessage = document.getElementById('greeting-message');
    if (!greetingMessage) return;
    
    greetingMessage.innerHTML = `
        <p class="greeting-text">Hello, <strong>${name}</strong>! Thanks for visiting.</p>
    `;
    greetingMessage.style.display = 'block';
}

// ==================== Section Toggle Functionality ====================
function initializeSectionToggle() {
    const toggleBtn = document.getElementById('toggle-projects');
    const projectsContainer = document.getElementById('projects-container');
    const toggleText = document.getElementById('toggle-text');
    
    if (!toggleBtn || !projectsContainer) return;
    
    // Load saved state
    const isVisible = localStorage.getItem('projectsVisible') !== 'false';
    if (!isVisible) {
        projectsContainer.style.display = 'none';
        if (toggleText) toggleText.textContent = 'Show Projects';
    }
    
    toggleBtn.addEventListener('click', function() {
        const isCurrentlyVisible = projectsContainer.style.display !== 'none';
        
        if (isCurrentlyVisible) {
            projectsContainer.style.display = 'none';
            if (toggleText) toggleText.textContent = 'Show Projects';
            localStorage.setItem('projectsVisible', 'false');
        } else {
            projectsContainer.style.display = 'block';
            if (toggleText) toggleText.textContent = 'Hide Projects';
            localStorage.setItem('projectsVisible', 'true');
        }
    });
}

// ==================== Performance Optimization Functions ====================

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for input events
function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
