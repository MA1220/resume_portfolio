import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// SSR guard
const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

// Minimal theme configs for CSS custom properties used across the app
const THEME_CONFIGS = {
  'Default': { '--bg': '#0b1220', '--text': '#e6e6e6', '--surface': 'rgba(255,255,255,0.06)', '--muted': '#b3b3b3', '--accent': '#10b981' },
  'ChatGPT': { '--bg': '#343541', '--text': '#f7f7f8', '--surface': '#444654', '--muted': '#bdbec2', '--accent': '#10a37f' },
  'Netflix': { '--bg': '#141414', '--text': '#e5e5e5', '--surface': '#1f1f1f', '--muted': '#9c9c9c', '--accent': '#e50914' },
  'Google Drive': { '--bg': '#ffffff', '--text': '#1f1f1f', '--surface': '#f5f5f5', '--muted': '#5f6368', '--accent': '#1a73e8' },
  'Apple': { '--bg': '#fbfbfd', '--text': '#1d1d1f', '--surface': '#ffffff', '--muted': '#6e6e73', '--accent': '#0071e3' },
  'ICICI Bank': { '--bg': '#ffffff', '--text': '#333333', '--surface': '#f7f7f7', '--muted': '#6b7280', '--accent': '#e65100' },
  'Gemini AI': { '--bg': '#0b1020', '--text': '#f0f3ff', '--surface': '#121a33', '--muted': '#a5b4fc', '--accent': '#6366f1' }
};

function applyThemeByName(name) {
  if (!isBrowser()) return false;
  const cfg = THEME_CONFIGS[name];
  if (!cfg) return false;
  const root = document.documentElement;
  Object.entries(cfg).forEach(([k, v]) => root.style.setProperty(k, v));
  try { localStorage.setItem('themeName', name); } catch {}
  return true;
}

function collectPortfolioDataFromDOM() {
  if (!isBrowser()) return { skills: [], contact: {} };
  const skills = [];
  document.querySelectorAll('#skills h4').forEach(h4 => {
    const t = (h4.textContent || '').trim();
    if (t) skills.push(t);
  });
  const mailLink = document.querySelector('a[href^="mailto:"]');
  const telLink = document.querySelector('a[href^="tel:"]');
  const contact = {
    email: mailLink ? (mailLink.getAttribute('href') || '').replace('mailto:', '').trim() : undefined,
    phone: telLink ? (telLink.getAttribute('href') || '').replace('tel:', '').trim() : undefined,
  };
  return { skills, contact };
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const isChatRoute = useMemo(() => {
    if (!isBrowser()) return false;
    return window.location && window.location.pathname === '/chat';
  }, []);

  // Initial theme and dark mode sync
  useEffect(() => {
    if (!isBrowser()) return;
    try {
      const savedTheme = localStorage.getItem('theme');
      const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(savedTheme ? savedTheme === 'dark' : preferredDark);

      const savedThemeName = localStorage.getItem('themeName');
      if (savedThemeName) applyThemeByName(savedThemeName);
      else applyThemeByName('Default');
    } catch {}
  }, []);

  useEffect(() => {
    if (!isBrowser()) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
  }, [darkMode]);

  // Expose window APIs and live portfolio data
  useEffect(() => {
    if (!isBrowser()) return;
    window.applyTheme = (name) => applyThemeByName(name);

    // Populate window.PORTFOLIO_DATA from DOM after first paint
    const populate = () => {
      const data = collectPortfolioDataFromDOM();
      window.PORTFOLIO_DATA = data;
    };
    // Run now and after a tick to ensure content is rendered
    populate();
    const t = setTimeout(populate, 300);
    return () => clearTimeout(t);
  }, []);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        {isChatRoute ? (
          <section className="section-padding container-max" style={{ paddingTop: 24, paddingBottom: 24 }}>
            <ChatBot defaultOpen={true} />
          </section>
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Resume />
            <Contact />
          </>
        )}
      </main>
      <Footer />

      {/* Floating chat toggle */}
      {!isChatRoute && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50 }}>
          {showChat ? (
            <div style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
              <ChatBot onClose={() => setShowChat(false)} />
            </div>
          ) : (
            <button
              onClick={() => setShowChat(true)}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--accent)',
                color: '#fff',
                boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
              }}
              aria-label="Open chat"
              title="Chat"
            >
              💬
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
