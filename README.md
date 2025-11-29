# Personal Portfolio Website - Assignment 3

A modern, responsive personal portfolio website showcasing projects, skills, and experience. Built with HTML5, CSS3, and JavaScript ES6+ with advanced features including API integrations, complex logic, state management, and performance optimizations.

## 🚀 Project Description

This portfolio website demonstrates advanced web development practices and features:

- **API Integrations**: GitHub repositories, weather data, inspirational quotes, and fun facts
- **Complex Logic**: Project filtering, sorting, search functionality, and enhanced form validation
- **State Management**: Theme persistence, visitor preferences, section visibility, and visitor name storage
- **Performance Optimizations**: Throttled scroll events, debounced search, efficient CSS/JS
- **User Experience**: Visitor timer, personalized greetings, show/hide sections

## 📁 Project Structure

```
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## 🛠️ Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/assignment-3.git
   cd assignment-3
   ```

2. **Open the website**
   - **Option 1**: Simply open `index.html` in your web browser
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
     Then navigate to `http://localhost:8000` in your browser

3. **View the website**
   - Open your browser and navigate to the local server URL or open `index.html` directly

## ✨ Features

### 1. API Integration
- **GitHub API**: Fetches and displays latest repositories
- **Weather API**: Shows current weather for Khobar, Saudi Arabia
- **Quotes API**: Displays daily inspirational quotes
- **Fun Facts API**: Shows interesting facts with refresh capability

### 2. Complex Logic
- **Project Filtering**: Filter projects by category (All, Web, AI)
- **Project Sorting**: Sort projects by name (A-Z, Z-A) or category
- **Project Search**: Real-time search across project titles, descriptions, and tech tags
- **Enhanced Form Validation**: Multi-step validation with minimum length requirements

### 3. State Management
- **Theme Toggle**: Dark/light mode with localStorage persistence
- **Visitor Name**: Store and display visitor's name across sessions
- **Section Visibility**: Show/hide projects section with state persistence
- **Filter/Sort Preferences**: Remember user's filter and sort choices

### 4. Performance Features
- **Visitor Timer**: Tracks time spent on the website
- **Throttled Scroll Events**: Optimized scroll handling for better performance
- **Debounced Search**: Efficient search input handling
- **Optimized CSS**: Efficient selectors and minimal specificity

### 5. User Experience
- **Personalized Greetings**: Time-based greetings with visitor name
- **Smooth Animations**: CSS transitions and animations
- **Responsive Design**: Mobile-first approach with breakpoints
- **Toast Notifications**: User-friendly feedback messages

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with Grid, Flexbox, Custom Properties, Animations
- **JavaScript ES6+**: Async/await, Arrow functions, Template literals
- **Font Awesome 6.4.0**: Icons
- **Google Fonts**: Inter font family

## 📡 API Endpoints Used

1. **GitHub API**
   - Endpoint: `https://api.github.com/users/saeedalhabib/repos`
   - Purpose: Fetch latest repositories

2. **Weather API (wttr.in)**
   - Endpoint: `https://wttr.in/Khobar?format=j1`
   - Purpose: Get current weather information

3. **ZenQuotes API**
   - Endpoint: `https://zenquotes.io/api/random`
   - Purpose: Fetch inspirational quotes

4. **Useless Facts API**
   - Endpoint: `https://uselessfacts.jsph.pl/random.json?language=en`
   - Purpose: Get random fun facts

## 🤖 AI Tools Used

This project utilized AI assistance for development. See `docs/ai-usage-report.md` for detailed documentation.

**Summary of AI Usage:**
- **Cursor**: Code generation, debugging, and refactoring
- **ChatGPT**: Concept explanations and code suggestions
- **AI-assisted features**: API integration patterns, error handling, performance optimizations

## 📝 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Performance

The website is optimized for:
- Fast initial load time
- Smooth scrolling and animations
- Efficient API calls with error handling
- Responsive design across all devices

## 📄 License

This project is created for educational purposes as part of Assignment 3.

## 👤 Author

**Saeed Alhabib**
- CS Student at KFUPM
- Email: alhabibsaeed55@gmail.com
- GitHub: [saeedalhabib](https://github.com/saeedalhabib)
- LinkedIn: [saeedalhabib](https://linkedin.com/in/saeedalhabib)

## 🔗 Live Demo

[Add your deployment link here if available]
- GitHub Pages: [Your GitHub Pages URL]
- Netlify: [Your Netlify URL]
- Vercel: [Your Vercel URL]

## 📚 Documentation

- **Technical Documentation**: See `docs/technical-documentation.md`
- **AI Usage Report**: See `docs/ai-usage-report.md`

## 🎯 Future Enhancements

- Backend integration for form submissions
- Blog section
- Project detail pages
- Image optimization
- PWA capabilities

---

**Note**: This is Assignment 3 submission demonstrating advanced web development skills including API integration, complex logic, state management, and performance optimization.

