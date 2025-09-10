import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiEye } from 'react-icons/fi';

const Resume = () => {
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
    // put Maheshwar_Awale_Resume.pdf in your public/ folder
    link.href = `${process.env.PUBLIC_URL}/Maheshwar_Resume.pdf`;
    link.download = 'Maheshwar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewResume = () => {
    window.open(`${process.env.PUBLIC_URL}/Maheshwar_Resume.pdf`, '_blank');
  };

  const resumeHighlights = [
    {
      category: "Education",
      details: "B.E. in Information Technology — SKNCOE, Pune University (2018 – 2022)"
    },
    {
      category: "Experience",
      details: "Software Development Engineer 1 — Reliance Jio (Sept 2022 – Present)"
    },
    {
      category: "Projects",
      details: "Enhanced MyJio Search, Search API for Jio Financial App, Config automation with Kubernetes"
    },
    {
      category: "Skills",
      details: "Java, Spring Boot, Elasticsearch, GCP, Microservices, Docker, Kubernetes"
    }
  ];

  return (
    <section id="resume" className="py-20 section-padding bg-white dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-gradient">Resume</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Download my complete resume to learn more about my background, skills, and experience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Resume Preview Card */}
            <motion.div
              variants={itemVariants}
              className="card text-center mb-12"
            >
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FiFileText className="text-white text-4xl" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Maheshwar Awale — Software Development Engineer 1
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Backend engineer focused on scaling services for hundreds of millions of users, building resilient search systems, and leading cloud migrations (Azure → GCP).
                </p>

                {/* Resume Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {resumeHighlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-sm font-semibold text-gradient mb-2">
                        {highlight.category}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        {highlight.details}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadResume}
                    className="btn-primary flex items-center gap-2"
                    aria-label="Download resume"
                  >
                    <FiDownload />
                    Download Resume
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewResume}
                    className="btn-secondary flex items-center gap-2"
                    aria-label="View resume online"
                  >
                    <FiEye />
                    View Online
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="card">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  What's Included
                </h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Professional summary and objectives
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Detailed work experience and achievements (Reliance Jio — SDE1)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Technical skills and proficiencies (Java, Spring Boot, ELK, GCP)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Education and certifications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Notable projects and contributions
                  </li>
                </ul>
              </div>

              <div className="card">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h4>
                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Email:</span>{' '}
                    <a href="mailto:maheshwarawale12@gmail.com" className="hover:underline">maheshwarawale12@gmail.com</a>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{' '}
                    <a href="tel:+919321825853" className="hover:underline">+91-9321825853</a>
                  </div>
                  <div>
                    <span className="font-medium">LinkedIn:</span>{' '}
                    <a href="https://linkedin.com/in/maheshwar-a-02b6b6163" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/maheshwar-a-02b6b6163</a>
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{' '}
                    Navi Mumbai, India
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
