import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      // open external link (resume)
      window.open(href, '_blank', 'noopener,noreferrer');
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
        background: isScrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(6px)' : 'none',
        boxShadow: isScrolled ? '0 8px 30px rgba(2,6,23,0.08)' : 'none',
        color: 'var(--text)'
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
            <div style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>
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
                  color: item.external ? 'var(--accent)' : 'var(--text)'
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
              style={{ padding: 8, borderRadius: 8, background: 'var(--surface)', color: 'var(--muted)' }}
            >
              <FiLinkedin />
            </a>

            <a
              href="mailto:maheshwarawale12@gmail.com"
              aria-label="Email"
              style={{ padding: 8, borderRadius: 8, background: 'var(--surface)', color: 'var(--muted)' }}
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
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="mailto:maheshwarawale12@gmail.com"
              aria-label="Email"
              style={{ padding: 8, borderRadius: 8, background: 'var(--surface)', color: 'var(--muted)' }}
            >
              <FiMail />
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md"
              aria-label="Toggle dark mode"
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="p-2 rounded-md"
              aria-label="Toggle menu"
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}
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
                style={{ background: 'transparent', color: item.external ? 'var(--accent)' : 'var(--text)' }}
                aria-label={item.name}
              >
                {item.name}
              </motion.button>
            ))}

            <div className="flex items-center gap-3 px-4 pt-2">
              <a
                href="/Maheshwar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md"
                aria-label="Download resume"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <FiDownload />
                Resume
              </a>

              <a
                href="https://linkedin.com/in/maheshwar-a-02b6b6163"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md"
                aria-label="LinkedIn"
                style={{ background: 'var(--surface)', color: 'var(--muted)' }}
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
