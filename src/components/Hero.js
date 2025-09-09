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
    // Make sure you place the file at public/Maheshwar_Awale_Resume.pdf in your app
    link.href = '/Maheshwar_Awale_Resume.pdf';
    link.download = 'Maheshwar_Awale_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding pt-20 relative">
      <div className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-600 dark:text-gray-300">
                  MA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
            Maheshwar <span className="text-gradient">Awale</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Software Development Engineer 1
          </motion.h2>

          {/* Quick Info (location + phone) */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <FiMapPin />
              <span>Navi Mumbai, India</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone />
              <a href="tel:+919321825853" className="hover:underline">+91-9321825853</a>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Scaling backend services for 500M+ users with sub-100ms APIs and 1000+ QPS.
            Led cloud migrations (Azure → GCP) and built search & Elasticsearch-based APIs — focused on reliability, performance, and cost-efficiency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="btn-primary flex items-center gap-2"
            >
              <FiDownload />
              Download Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary flex items-center gap-2"
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
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FiLinkedin size={22} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15, y: -4 }}
              href="mailto:maheshwarawale12@gmail.com"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FiMail size={22} />
            </motion.a>
          </motion.div>

          {/* Small skill chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {["Java", "Spring Boot", "Elasticsearch", "GCP", "Microservices"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
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
