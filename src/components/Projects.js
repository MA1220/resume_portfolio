import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiStar, FiX } from 'react-icons/fi';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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

  // Projects from Maheshwar Awale's resume
  const projects = [
    {
      title: "Enhanced MyJio App Search",
      description:
        "Architected a distributed search backend for the MyJio app using Spring Boot, ELK, and Docker. Handled 1000+ QPS with sub-100ms latency and implemented a custom sorting algorithm to improve relevance and engagement.",
      image: `${process.env.PUBLIC_URL}/myjioApp.jpg`,
      technologies: ["Java", "Spring Boot", "Elasticsearch", "ELK Stack", "Docker", "Microservices"],
      githubUrl: null,
      liveUrl: null,
      featured: true
    },
    {
      title: "Search API for Jio Financial App",
      description:
        "Developed scalable Elasticsearch-based search APIs with Spring WebClient, secure authentication, and resilient infrastructure. Optimized endpoints to support 1000+ QPS ensuring smooth UX and reliability under load.",
      image: `${process.env.PUBLIC_URL}/jfs.jpg`,
      technologies: ["Spring WebClient", "Elasticsearch", "GCP", "Java", "Spring Security", "Docker"],
      githubUrl: null,
      liveUrl: null,
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-20 section-padding" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
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
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg,var(--accent), #7c3aed)' }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
              Projects from my recent work — search, scalable backend systems, and cloud migrations.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`overflow-hidden ${project.featured ? 'lg:col-span-2' : ''}`}
                style={{ background: 'var(--surface)', padding: 0, borderRadius: 12 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f59e0b', color: '#fff', padding: '6px 10px', borderRadius: 999, fontSize: 14 }}>
                        <FiStar size={14} />
                        Featured
                      </div>
                    </div>
                  )}

                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '16rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg,#e5e7eb,#d1d5db)' }}>
                      {project.title}
                    </div>
                  )}

                  {/* Overlay Links */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="absolute inset-0" style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', paddingBottom: 24 }}>
                      <div style={{ display: 'flex', gap: 12 }}>
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 999 }}>
                            <FiGithub size={20} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ padding: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 999 }}>
                            <FiExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                      {project.title}
                    </h3>
                    <FiCode style={{ color: 'var(--accent)', fontSize: 20 }} />
                  </div>

                  <p className="leading-relaxed" style={{ color: 'var(--muted)', marginTop: 10 }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
                    {project.technologies.map((tech, techIndex) => (
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
            ))}
          </div>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <motion.div
                  className="relative rounded-2xl shadow-2xl max-w-3xl w-full p-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ background: 'var(--surface)', borderRadius: 12 }}
                >
                  {/* Close Button */}
                  <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4" style={{ color: 'var(--muted)', fontSize: 22 }}>
                    <FiX />
                  </button>

                  {/* Project Image */}
                  <img src={selectedProject.image} alt={selectedProject.title} className="rounded-xl mb-6 w-full" />

                  {/* Transparent Overlay Info */}
                  <div style={{ padding: 8 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{selectedProject.title}</h2>
                    <p style={{ color: 'var(--muted)', marginTop: 8 }}>{selectedProject.description}</p>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.08)', borderRadius: 8, color: 'var(--muted)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                      {selectedProject.githubUrl && (
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: 'var(--surface)', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
                          <FiGithub /> Code
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: 'var(--accent)', color: '#fff', borderRadius: 8 }}>
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
