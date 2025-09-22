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
  // === Core Defaults ===
  'Default': { '--bg': '#0b1220', '--text': '#e6e6e6', '--surface': 'rgba(255,255,255,0.06)', '--muted': '#b3b3b3', '--accent': '#10b981' },

  // === Jio Ecosystem ===
  'Jio': { '--bg': '#f8fafc', '--text': '#0f172a', '--surface': '#ffffff', '--muted': '#475569', '--accent': '#0066ff' },
  'JioHotstar': { '--bg': '#0b0c2a', '--text': '#e4e6ef', '--surface': '#15173d', '--muted': '#9ca3af', '--accent': '#f7b500' },
'JioFinance': {
    '--bg': '#fdfcf7',         // light neutral background
    '--text': '#1a1a1a',       // dark text for readability
    '--surface': '#ffffff',    // white surface cards
    '--muted': '#6b7280',      // muted grey
    '--accent': '#d4af37'      // golden accent (classic gold hex)
  },  'JioSaavn': { '--bg': '#101010', '--text': '#f0f0f0', '--surface': '#181818', '--muted': '#888888', '--accent': '#00ff9c' },

  // === Meta (Facebook, Instagram, WhatsApp, Messenger) ===
  'Facebook': { '--bg': '#ffffff', '--text': '#1c1e21', '--surface': '#f0f2f5', '--muted': '#65676b', '--accent': '#1877f2' },
  'Instagram': { '--bg': '#fff7fb', '--text': '#111827', '--surface': '#ffffff', '--muted': '#6b7280', '--accent': '#f56040' },
  'WhatsApp': { '--bg': '#ece5dd', '--text': '#111b21', '--surface': '#ffffff', '--muted': '#667781', '--accent': '#25d366' },
  'Messenger': { '--bg': '#ffffff', '--text': '#050505', '--surface': '#f0f2f5', '--muted': '#65676b', '--accent': '#006AFF' },

  // === Google Suite ===
  'Google': { '--bg': '#ffffff', '--text': '#202124', '--surface': '#f8f9fa', '--muted': '#5f6368', '--accent': '#4285f4' },
  'Gmail': { '--bg': '#ffffff', '--text': '#202124', '--surface': '#f1f3f4', '--muted': '#5f6368', '--accent': '#d93025' },
  'GoogleDrive': { '--bg': '#ffffff', '--text': '#1f1f1f', '--surface': '#f5f5f5', '--muted': '#5f6368', '--accent': '#1a73e8' },
  'GoogleDocs': { '--bg': '#ffffff', '--text': '#202124', '--surface': '#f1f3f4', '--muted': '#5f6368', '--accent': '#1967d2' },
  'GoogleSheets': { '--bg': '#ffffff', '--text': '#202124', '--surface': '#f1f3f4', '--muted': '#5f6368', '--accent': '#188038' },
  'GoogleSlides': { '--bg': '#ffffff', '--text': '#202124', '--surface': '#f1f3f4', '--muted': '#5f6368', '--accent': '#f9ab00' },
  'YouTube': { '--bg': '#0f0f0f', '--text': '#f9f9f9', '--surface': '#181818', '--muted': '#aaaaaa', '--accent': '#ff0000' },

  // === Amazon ===
  'Amazon': { '--bg': '#ffffff', '--text': '#111111', '--surface': '#f5f5f5', '--muted': '#555555', '--accent': '#ff9900' },
  'PrimeVideo': { '--bg': '#0f171e', '--text': '#ffffff', '--surface': '#1a242f', '--muted': '#999999', '--accent': '#00a8e1' },
  'AWS': { '--bg': '#232f3e', '--text': '#f3f4f6', '--surface': '#374151', '--muted': '#9ca3af', '--accent': '#ff9900' },

  // === Banks ===
  'ICICIBank': { '--bg': '#ffffff', '--text': '#333333', '--surface': '#f7f7f7', '--muted': '#6b7280', '--accent': '#e65100' },
  'HDFCBank': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f1f5f9', '--muted': '#4b5563', '--accent': '#004c8f' },
  'CitiBank': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f1f5f9', '--muted': '#4b5563', '--accent': '#003b70' },
  'SBI': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f5f5f5', '--muted': '#555555', '--accent': '#1b74ba' },
  'AxisBank': { '--bg': '#ffffff', '--text': '#111111', '--surface': '#f7f7f7', '--muted': '#666666', '--accent': '#9b2242' },
  'HSBCBank': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f9f9f9', '--muted': '#555555', '--accent': '#db0011' }, // HSBC red

  // === Trading / Finance apps ===
  'Groww': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f5f5f5', '--muted': '#666666', '--accent': '#00d09c' },
  'ZerodhaKit': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f8f9fa', '--muted': '#6b7280', '--accent': '#387ed1' },
  'Upstox': { '--bg': '#ffffff', '--text': '#1a1a1a', '--surface': '#f7f7f7', '--muted': '#666666', '--accent': '#5a2fdf' },

  // === AI Inspired Themes ===
  'GeminiAI': { '--bg': '#0b1020', '--text': '#f0f3ff', '--surface': '#121a33', '--muted': '#a5b4fc', '--accent': '#6366f1' },
  'OpenAI': { '--bg': '#202123', '--text': '#ececf1', '--surface': '#2b2c2f', '--muted': '#9ca3af', '--accent': '#10a37f' },
  'Anthropic': { '--bg': '#1c1c1e', '--text': '#f5f5f7', '--surface': '#2c2c2e', '--muted': '#8e8e93', '--accent': '#ff6b6b' },
  'DeepMind': { '--bg': '#0f172a', '--text': '#e2e8f0', '--surface': '#1e293b', '--muted': '#94a3b8', '--accent': '#3b82f6' },
  'CohereAI': { '--bg': '#1a1a1a', '--text': '#f5f5f5', '--surface': '#2a2a2a', '--muted': '#999999', '--accent': '#ff9900' },
  'Perplexity': { '--bg': '#000000', '--text': '#f5f5f5', '--surface': '#1c1c1c', '--muted': '#9ca3af', '--accent': '#00e0ff' },

  // === Product-based & Service-based ===
  'ProductCompany': { '--bg': '#fafafa', '--text': '#111111', '--surface': '#ffffff', '--muted': '#666666', '--accent': '#007bff' },
  'ServiceCompany': { '--bg': '#f9fafb', '--text': '#1a1a1a', '--surface': '#ffffff', '--muted': '#6b7280', '--accent': '#16a34a' },

  // === Fun / My Favorites ===
  'SolarizedDark': { '--bg': '#002b36', '--text': '#93a1a1', '--surface': '#073642', '--muted': '#586e75', '--accent': '#b58900' },
  'Nord': { '--bg': '#2e3440', '--text': '#eceff4', '--surface': '#3b4252', '--muted': '#81a1c1', '--accent': '#88c0d0' },
  'Dracula': { '--bg': '#282a36', '--text': '#f8f8f2', '--surface': '#44475a', '--muted': '#6272a4', '--accent': '#bd93f9' },
  'PastelDream': { '--bg': '#fdf6f9', '--text': '#333333', '--surface': '#ffffff', '--muted': '#a1a1aa', '--accent': '#ff6b81' },

  // === AI Inspired (Unique Concepts) ===
  'NeonAI': {
    '--bg': '#0a0f1e',
    '--text': '#e0f2fe',
    '--surface': '#111827',
    '--muted': '#7dd3fc',
    '--accent': '#22d3ee' // electric cyan
  },
  'QuantumMind': {
    '--bg': '#050014',
    '--text': '#e9d5ff',
    '--surface': '#1e1b4b',
    '--muted': '#c084fc',
    '--accent': '#7c3aed' // purple quantum
  },
  'AuroraAI': {
    '--bg': '#0b1120',
    '--text': '#f0fdf4',
    '--surface': '#1e293b',
    '--muted': '#6ee7b7',
    '--accent': '#34d399' // aurora green
  },
  'CyberPulse': {
    '--bg': '#0d0d0d',
    '--text': '#fef3c7',
    '--surface': '#1a1a1a',
    '--muted': '#fbbf24',
    '--accent': '#f59e0b' // glowing amber
  },
  'HologramAI': {
    '--bg': '#0f172a',
    '--text': '#f5f3ff',
    '--surface': '#1e293b',
    '--muted': '#c7d2fe',
    '--accent': '#60a5fa' // holographic blue
  },
  'SynthWaveAI': {
    '--bg': '#1a0b2e',
    '--text': '#fdf2f8',
    '--surface': '#2a0f47',
    '--muted': '#f472b6',
    '--accent': '#ec4899' // pink neon
  },
  'NeuralInk': {
    '--bg': '#101010',
    '--text': '#fafafa',
    '--surface': '#1c1c1c',
    '--muted': '#9ca3af',
    '--accent': '#10b981' // calm neural green
  },
  'FutureGrid': {
    '--bg': '#000000',
    '--text': '#e5e7eb',
    '--surface': '#111111',
    '--muted': '#6b7280',
    '--accent': '#00ff95' // glowing matrix green
  }
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
