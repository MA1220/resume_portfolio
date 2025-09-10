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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
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
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
              MA
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  item.external
                    ? 'text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
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
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiLinkedin />
            </a>

            <a
              href="mailto:maheshwarawale12@gmail.com"
              aria-label="Email"
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiMail />
            </a>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="mailto:maheshwarawale12@gmail.com"
              aria-label="Email"
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <FiMail />
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
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
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  item.external
                    ? 'text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
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
                className="inline-flex items-center gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium"
                aria-label="Download resume"
              >
                <FiDownload />
                Resume
              </a>

              <a
                href="https://linkedin.com/in/maheshwar-a-02b6b6163"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                aria-label="LinkedIn"
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
