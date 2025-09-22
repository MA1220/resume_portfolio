import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navTextDark, setNavTextDark] = useState(false); // true => force dark text (black-ish)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute luminance of CSS color
  function parseColorToRGB(c) {
    if (!c) return [0, 0, 0];
    const s = c.trim();
    if (s.startsWith('#')) {
      const hex = s.slice(1);
      const full = hex.length === 3
        ? hex.split('').map(ch => ch + ch).join('')
        : hex.padEnd(6, '0');
      const num = parseInt(full.slice(0, 6), 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
    if (s.startsWith('rgb')) {
      const m = s.match(/rgba?\(([^)]+)\)/i);
      if (m) {
        const parts = m[1].split(',').map(x => parseFloat(x.trim()));
        return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
      }
    }
    return [0, 0, 0];
  }

  function isLightColor(c) {
    const [r, g, b] = parseColorToRGB(c);
    // perceived brightness
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    return brightness > 200; // threshold for very light backgrounds
  }

  const recomputeNavText = () => {
    try {
      const cs = getComputedStyle(document.documentElement);
      const bg = cs.getPropertyValue('--bg');
      setNavTextDark(isLightColor(bg));
    } catch {
      setNavTextDark(false);
    }
  };

  useEffect(() => {
    recomputeNavText();
    const onTheme = () => recomputeNavText();
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navTextColor = useMemo(() => (navTextDark ? '#111111' : 'var(--text)'), [navTextDark]);
  const navMutedColor = useMemo(() => (navTextDark ? '#1f2937' : 'var(--muted)'), [navTextDark]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: `${process.env.PUBLIC_URL}/Maheshwar_Resume.pdf`, external: true },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href, external) => {
    // close mobile menu if open
    setIsMobileMenuOpen(false);

    if (external) {
      // Resume download: log and trigger centralized download
      try { window.analytics?.recordResumeDownload?.(); } catch {}
      if (typeof window.triggerResumeDownload === 'function') {
        window.triggerResumeDownload();
      } else {
        // Fallback open
        window.open(href, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        background: isScrolled
          ? (darkMode ? 'rgba(12, 18, 32, 0.7)' : 'rgba(255, 255, 255, 0.8)')
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 8px 30px rgba(2,6,23,0.08)' : 'none',
        borderBottom: isScrolled ? (darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)') : 'none',
        color: navTextColor
      }}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('#home')}
            aria-label="Go to home"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)', color: '#fff' }}>
              MA
            </div>
            <div style={{ color: navTextColor, fontSize: 16, fontWeight: 600 }}>
              Maheshwar Awale
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href, item.external)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                style={{
                  background: 'transparent',
                  color: item.external ? 'var(--accent)' : navTextColor
                }}
                aria-label={item.name}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Quick actions */}
            <a
              href="https://linkedin.com/in/maheshwar-a-02b6b6163"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ padding: 8, borderRadius: 8, background: 'var(--surface)', color: navMutedColor }}
            >
              <FiLinkedin />
            </a>

            <a
              href="mailto:maheshwarawale12@gmail.com"
              aria-label="Email"
              style={{ padding: 8, borderRadius: 8, background: 'var(--surface)', color: navMutedColor }}
            >
              <FiMail />
            </a>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md"
              aria-label="Toggle dark mode"
              style={{ background: 'var(--surface)', color: navMutedColor }}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="mailto:maheshwarawale12@gmail.com"
              aria-label="Email"
              style={{ padding: 8, borderRadius: 8, background: 'var(--surface)', color: navMutedColor }}
            >
              <FiMail />
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md"
              aria-label="Toggle dark mode"
              style={{ background: 'var(--surface)', color: navMutedColor }}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="p-2 rounded-md"
              aria-label="Toggle menu"
              style={{ background: 'var(--surface)', color: navMutedColor }}
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-3">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ x: 8 }}
                onClick={() => scrollToSection(item.href, item.external)}
                className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                style={{ background: 'transparent', color: item.external ? 'var(--accent)' : navTextColor }}
                aria-label={item.name}
              >
                {item.name}
              </motion.button>
            ))}

            <div className="flex items-center gap-3 px-4 pt-2">
              <button
                onClick={() => { try { window.analytics?.recordResumeDownload?.(); } catch {} ; window.triggerResumeDownload?.(); }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md"
                aria-label="Download resume"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <FiDownload />
                Resume
              </button>

              <a
                href="https://linkedin.com/in/maheshwar-a-02b6b6163"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md"
                aria-label="LinkedIn"
                style={{ background: 'var(--surface)', color: navMutedColor }}
              >
                <FiLinkedin />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
