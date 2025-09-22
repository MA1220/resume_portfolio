import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    // Make sure you place the file at public/Maheshwar_Resume.pdf in your app
    link.href = `${process.env.PUBLIC_URL}/Maheshwar_Resume.pdf`;
    link.download = 'Maheshwar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding pt-20 relative"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="mb-8">
            <div
              className="w-36 h-36 mx-auto mb-6 rounded-full p-1"
              style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: 'var(--surface)' }}
              >
                <span style={{ color: 'var(--muted)', fontSize: 28, fontWeight: 700 }}>
                  MA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-2"
            style={{ color: 'var(--text)' }}
          >
            Maheshwar <span className="text-gradient">Awale</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ color: 'var(--muted)' }}
          >
            Software Development Engineer 1
          </motion.h2>

          {/* Quick Info (location + phone) */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 text-sm mb-6"
            style={{ color: 'var(--muted)' }}
          >
            <div className="flex items-center gap-2">
              <FiMapPin />
              <span>Navi Mumbai, India</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone />
              <a href="tel:+919321825853" className="hover:underline" style={{ color: 'var(--muted)' }}>
                +91-9321825853
              </a>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            Scaling backend services for 500M+ users with sub-100ms APIs and 1000+ QPS.
            Led cloud migrations (Azure → GCP) and built search & Elasticsearch-based APIs — focused on reliability, performance, and cost-efficiency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="flex items-center gap-2"
              style={{ background: 'var(--accent)', color: '#fff', padding: '0.6rem 1rem', borderRadius: 8 }}
            >
              <FiDownload />
              Download Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
              style={{ background: 'transparent', color: 'var(--text)', padding: '0.6rem 1rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <FiMail />
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-8">
            <motion.a
              whileHover={{ scale: 1.15, y: -4 }}
              href="https://linkedin.com/in/maheshwar-a-02b6b6163"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full transition-colors duration-200"
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}
            >
              <FiLinkedin size={22} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15, y: -4 }}
              href="mailto:maheshwarawale12@gmail.com"
              className="p-3 rounded-full transition-colors duration-200"
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}
            >
              <FiMail size={22} />
            </motion.a>
          </motion.div>

          {/* Small skill chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {["Java", "Spring Boot", "Elasticsearch", "GCP", "Microservices"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ background: 'var(--surface)', color: 'var(--muted)' }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
