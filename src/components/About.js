import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiTrendingUp } from 'react-icons/fi';

const About = () => {
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

  const strengths = [
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Strong analytical skills with a systematic approach to breaking down complex problems into manageable solutions."
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "Clean Code",
      description: "Passionate about writing maintainable, well-documented code that follows best practices and industry standards."
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Continuous Learning",
      description: "Always eager to learn new technologies and improve existing skills to stay current with industry trends."
    }
  ];

  return (
    <section id="about" className="py-20 section-padding" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
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
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>
                  Hello! I'm Maheshwar Awale
                </h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  Software Development Engineer 1 with experience scaling backend services for 500M+ users, 
                  optimizing APIs, and leading cloud migrations. Skilled in Java, Spring Boot, microservices, 
                  and cloud technologies (GCP, Azure).
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  Passionate about building scalable, high-performance systems that can handle massive user loads 
                  while maintaining optimal performance. I thrive in collaborative environments and enjoy solving 
                  complex distributed systems challenges.
                </p>
              </div>

              {/* Career Goals */}
              <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 12 }}>
                <h4 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Career Goals
                </h4>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  To advance as a Software Engineer specializing in distributed systems and cloud architecture, 
                  contributing to large-scale platforms that serve millions of users while continuously expanding 
                  expertise in system design and performance optimization.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Key Strengths */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold mb-8" style={{ color: 'var(--text)' }}>
                Key Strengths
              </h3>
              
              <div className="space-y-6">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="card"
                    style={{ background: 'var(--surface)', padding: 16, borderRadius: 12 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 rounded-lg" style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--accent)' }}>
                        {strength.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                          {strength.title}
                        </h4>
                        <p style={{ color: 'var(--muted)' }}>
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "3+", label: "Years Experience" },
              { number: "500M+", label: "Users Served" },
              { number: "1000+", label: "QPS Handled" },
              { number: "40%", label: "Performance Boost" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--muted)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
