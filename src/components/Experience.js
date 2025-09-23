import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const Experience = () => {
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const experiences = [
    {
      title: "Software Development Engineer 1",
      company: "Reliance Jio",
      location: "Navi Mumbai, India",
      period: "Sept 2022 – Present",
      type: "Full-time",
      achievements: [
        "Scaled backend services for 500M+ users, optimizing API response times to <100ms at 1000+ QPS, improving engagement by 40%.",
        "Led cloud migration (Azure → GCP), achieving 30% faster performance and 20% cost savings.",
        "Integrated 3rd-party APIs (Saavn, JioTV, Justdial, JioMart) into MyJio app, enhancing offerings and improving retention.",
        "Built interactive modules (Live TV, My City) for Jio News using reactive programming; boosted content consumption by 25%.",
        "Automated config management with Kubernetes ConfigMaps, cutting manual deployment by 40%."
      ],
      technologies: [
        "Java", "Spring Boot", "Microservices", "Docker", "Kubernetes",
        "ELK Stack", "GCP", "Azure", "Prometheus", "Grafana",
        "WebClient", "Elasticsearch"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 section-padding" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
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
              Work <span className="text-gradient">Experience</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
              My professional journey in software development, showcasing growth and key achievements
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg,var(--accent), #7c3aed)' }}></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 z-10" style={{ background: 'var(--accent)', borderColor: 'var(--bg)' }}></div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'var(--surface)', padding: 20, borderRadius: 12 }}>
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FiBriefcase style={{ color: 'var(--accent)' }} />
                          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>
                            {exp.type}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                          {exp.title}
                        </h3>
                        
                        <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                          {exp.company}
                        </h4>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2" style={{ color: 'var(--muted)' }}>
                          <div className="flex items-center gap-1">
                            <FiCalendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h5 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                          Key Achievements:
                        </h5>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2" style={{ color: 'var(--muted)' }}>
                              <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent)' }}></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                          Technologies Used:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 rounded-full text-sm font-medium"
                              style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--muted)' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
