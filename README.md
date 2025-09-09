# Resume Portfolio - Software Development Engineer

A modern, responsive portfolio website built with React.js, Tailwind CSS, and Framer Motion. This single-page application showcases the skills, experience, and projects of a Software Development Engineer 1.

## 🚀 Features

- **Modern Design**: Clean, professional, and minimalist design
- **Responsive**: Fully responsive design that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Interactive Sections**: 
  - Hero section with professional introduction
  - About me with career goals and key strengths
  - Skills showcase with technology icons
  - Experience timeline with achievements
  - Project portfolio with live demos
  - Downloadable resume
  - Contact form with social links
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Fonts**: Google Fonts (Inter)
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized for best performance.

### `npm test`
Launches the test runner in interactive watch mode.

## 🎨 Customization

### Personal Information
Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.js`):
   - Name and title
   - Professional tagline
   - Social media links

2. **About Section** (`src/components/About.js`):
   - Personal introduction
   - Career goals
   - Key strengths

3. **Skills Section** (`src/components/Skills.js`):
   - Add/remove technologies
   - Update skill categories

4. **Experience Section** (`src/components/Experience.js`):
   - Work experience details
   - Achievements and responsibilities

5. **Projects Section** (`src/components/Projects.js`):
   - Project details and descriptions
   - GitHub and live demo links
   - Project images

6. **Contact Section** (`src/components/Contact.js`):
   - Contact information
   - Social media links

### Resume PDF
Replace `public/resume.pdf` with your actual resume file.

### Styling
- Colors can be customized in `tailwind.config.js`
- Additional styles can be added in `src/index.css`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init`
3. Build the project: `npm run build`
4. Deploy: `firebase deploy`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ⚡ Performance

- Optimized images and assets
- Lazy loading for better performance
- Minimal bundle size
- Fast loading animations

## 🎭 Animations

Smooth animations are implemented using Framer Motion:
- Page load animations
- Scroll-triggered animations
- Hover effects
- Smooth transitions

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact: john.developer@email.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React.js and Tailwind CSS**
