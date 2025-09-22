import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiLinkedin, FiMail, FiArrowUp, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/maheshwar-a-02b6b6163",
      name: "LinkedIn"
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      url: "mailto:maheshwarawale12@gmail.com",
      name: "Email"
    }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ background: 'var(--surface)', color: 'var(--muted)', paddingTop: 24, paddingBottom: 24 }}>
      <div className="container-max section-padding">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('#home')} style={{ color: 'var(--text)' }}>
              Maheshwar Awale
            </motion.div>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Software Development Engineer 1 — focused on scalable backend systems, search, and cloud migrations.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {socialLinks.map((social, index) => (
                <motion.a key={index} whileHover={{ scale: 1.1, y: -2 }} href={social.url} target="_blank" rel="noopener noreferrer" style={{ padding: 8, borderRadius: 8, background: 'rgba(0,0,0,0.06)', color: 'var(--muted)' }} aria-label={social.name}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.button key={index} whileHover={{ x: 5 }} onClick={() => scrollToSection(link.href)} style={{ background: 'transparent', color: 'var(--muted)', textAlign: 'left' }}>
                  {link.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Get In Touch</h3>
            <div style={{ color: 'var(--muted)' }}>
              <a href="mailto:maheshwarawale12@gmail.com" style={{ display: 'block', marginBottom: 8, color: 'var(--muted)' }}>maheshwarawale12@gmail.com</a>
              <a href="tel:+919321825853" style={{ display: 'block', marginBottom: 8, color: 'var(--muted)' }}>+91-9321825853</a>
              <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                <FiMapPin />
                <span>Navi Mumbai, India</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection('#contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--accent)', color: '#fff', borderRadius: 8 }}>
              <FiMail />
              Send Message
            </motion.button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 16, display: 'flex', flexDirection: 'column', mdFlexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', marginBottom: 12 }}>
            <span>© {currentYear} Maheshwar Awale. Made with</span>
            <FiHeart style={{ color: '#ef4444' }} />
            <span>React & Tailwind CSS</span>
          </div>

          {/* Back to Top Button */}
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(0,0,0,0.06)', color: 'var(--muted)', borderRadius: 8 }}>
            <FiArrowUp />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
