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
    <section id="resume" className="py-20 section-padding" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              My <span className="text-gradient">Resume</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
              Download my complete resume to learn more about my background, skills, and experience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Resume Preview Card */}
            <motion.div variants={itemVariants} style={{ background: 'var(--surface)', padding: 20, borderRadius: 12, textAlign: 'center', marginBottom: 24 }}>
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}>
                  <FiFileText style={{ color: '#fff', fontSize: 28 }} />
                </div>

                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  Maheshwar Awale — Software Development Engineer 1
                </h3>

                <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                  Backend engineer focused on scaling services for hundreds of millions of users, building resilient search systems, and leading cloud migrations (Azure → GCP).
                </p>

                {/* Resume Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {resumeHighlights.map((highlight, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }}>
                      <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                        {highlight.category}
                      </div>
                      <div style={{ color: 'var(--muted)', fontSize: 14 }}>
                        {highlight.details}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadResume} style={{ background: 'var(--accent)', color: '#fff', padding: '0.6rem 1rem', borderRadius: 8 }}>
                    <FiDownload /> Download Resume
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleViewResume} style={{ background: 'transparent', color: 'var(--text)', padding: '0.6rem 1rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
                    <FiEye /> View Online
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
              <div style={{ background: 'var(--surface)', padding: 20, borderRadius: 12 }}>
                <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  What's Included
                </h4>
                <ul style={{ color: 'var(--muted)' }}>
                  <li style={{ marginBottom: 8 }}>Professional summary and objectives</li>
                  <li style={{ marginBottom: 8 }}>Detailed work experience and achievements (Reliance Jio — SDE1)</li>
                  <li style={{ marginBottom: 8 }}>Technical skills and proficiencies (Java, Spring Boot, ELK, GCP)</li>
                  <li style={{ marginBottom: 8 }}>Education and certifications</li>
                  <li style={{ marginBottom: 8 }}>Notable projects and contributions</li>
                </ul>
              </div>

              <div style={{ background: 'var(--surface)', padding: 20, borderRadius: 12 }}>
                <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  Contact Information
                </h4>
                <div style={{ color: 'var(--muted)' }}>
                  <div><span style={{ fontWeight: 600 }}>Email:</span> <a href="mailto:maheshwarawale12@gmail.com" style={{ color: 'var(--muted)' }}>maheshwarawale12@gmail.com</a></div>
                  <div><span style={{ fontWeight: 600 }}>Phone:</span> <a href="tel:+919321825853" style={{ color: 'var(--muted)' }}>+91-9321825853</a></div>
                  <div><span style={{ fontWeight: 600 }}>LinkedIn:</span> <a href="https://linkedin.com/in/maheshwar-a-02b6b6163" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>linkedin.com/in/maheshwar-a-02b6b6163</a></div>
                  <div><span style={{ fontWeight: 600 }}>Location:</span> Navi Mumbai, India</div>
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
