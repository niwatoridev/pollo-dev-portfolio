# Portfolio - Web Developer & Esports Producer

A modern, interactive portfolio website built with LitElement showcasing web development and esports production work.

## 🎯 About This Project

This portfolio features a unique 3D revolving carousel interface that allows visitors to navigate through different sections of professional experience, portfolio work, and contact information. Built with vanilla JavaScript and LitElement, it demonstrates advanced web animations and state management.

## ✨ Key Features

### Interactive Revolver Navigation
- **3D Carousel Interface**: Innovative revolving panel system that rotates through different sections
- **Smooth Transitions**: Fluid animations between the revolver view and detail pages
- **Smart Panel Tracking**: Remembers your position - when you navigate back to the revolver, it shows the panel corresponding to the page you just left

### Multi-language Support
- **ES-MX & EN-US**: Full bilingual support with smooth language transitions
- **Persistent Preferences**: Language choice is maintained across navigation
- **Fade Transitions**: Elegant text fade effects during language changes

### Advanced Animation System
- **Page Transitions**: Slide-in/slide-out animations between detail pages
- **Global Overlay**: Subtle background overlay that appears when viewing detail pages and stays persistent during navigation
- **Navbar Integration**: Seamless navigation between sections with synchronized animations
- **Revolver Spin**: Dynamic spinning animation when returning to the main carousel

### Sections
- **Professional Experience**: Detailed work history and expertise
- **Portfolio**: Showcase of projects and achievements
- **Contact**: Interactive contact information with social media links and personal info card

## 🛠️ Tech Stack

- **LitElement 3.0**: Modern web components framework
- **Typed.js**: Typewriter effect animations
- **CSS3 Animations**: Advanced animations and transitions
- **JavaScript ES6+**: Modern JavaScript features
- **Web Components**: Reusable, encapsulated components

## 📦 Setup

Install dependencies:

```bash
npm i
```

## 🚀 Development

Run the dev server:

```bash
npm run serve
```

The site will be available at http://localhost:8000

For production mode:

```bash
npm run serve:prod
```

## 🧪 Testing

Run tests:

```bash
npm test
```

Watch mode for development:

```bash
npm test:watch
```

## 📝 Project Structure

```
src/
├── components/
│   ├── language/
│   │   ├── languageSwitchButton.js    # Language toggle component
│   │   └── translatorClass.js         # Translation base class
│   ├── navigation/
│   │   ├── navigationBar.js           # Top navigation bar
│   │   └── revolver.js                # 3D carousel component
│   ├── pages/
│   │   ├── basePage.js                # Base page template
│   │   ├── experienciaProfesional.js  # Experience page
│   │   ├── portfolio.js               # Portfolio page
│   │   └── contacto.js                # Contact page
│   └── mainApp.js                     # Main application orchestrator
└── translations/
    └── translations.json              # Translation strings
```

## 🎨 Features Breakdown

### State Management
- Centralized state handling in `mainApp.js`
- View transitions with direction tracking (forward/back)
- Panel index memory for seamless navigation flow

### Component Architecture
- **BasePage**: Shared functionality for all detail pages
- **TranslatorClass**: Inherited translation capabilities
- **Modular Design**: Each component is self-contained and reusable

### Animation Layers
1. **Carousel Rotation**: Panel positioning and visibility
2. **View Transitions**: Slide animations between sections
3. **Overlay System**: Global background dimming for detail pages
4. **Element Fades**: Individual component fade in/out effects

## 🤖 Development Process

This project was developed with assistance from Claude (Anthropic's AI assistant) throughout the implementation process. Claude helped with:
- Architecture decisions and code structure
- Animation and transition implementation
- State management and navigation logic
- Bug fixing and optimization

## 📄 License & Usage

Feel free to use this code for your own projects! You are free to:
- ✅ Use the code structure and architecture
- ✅ Adapt the animations and transitions
- ✅ Modify the design and layout
- ✅ Learn from the implementation

**Please note:**
- ❌ Do not use the personal information displayed in the contact section
- ❌ Do not use personal images or media assets
- 🙏 Attribution is appreciated but not required

## 🔧 Customization

To customize this portfolio for your own use:

1. **Update Personal Info**: Edit the contact information in `contacto.js`
2. **Add Your Content**: Modify the content in each page component
3. **Update Translations**: Edit `translations.json` for your text
4. **Adjust Styling**: Modify CSS in component styles
5. **Change Colors**: Update the color scheme (currently using `#0acbd5` as primary)

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2021+ features required
- Web Components v1 support needed

## 📚 Resources

- [Lit Documentation](https://lit.dev)
- [Web Components](https://www.webcomponents.org/)
- [Modern Web Dev](https://modern-web.dev/)

---

Built with ❤️ using LitElement and modern web technologies.
