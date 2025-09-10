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
    <section id="projects" className="py-20 section-padding bg-gray-50 dark:bg-gray-900">
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
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
                className={`card overflow-hidden ${project.featured ? 'lg:col-span-2' : ''}`}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                    <div className="w-full h-48 md:h-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                      {project.title}
                    </div>
                  )}

                  {/* Overlay Links */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            aria-label={`${project.title} GitHub`}
                          >
                            <FiGithub size={20} />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            aria-label={`${project.title} Live demo`}
                          >
                            <FiExternalLink size={20} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <FiCode className="text-primary-500 text-xl" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
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
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full p-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
                  >
                    <FiX />
                  </button>

                  {/* Project Image */}
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="rounded-xl mb-6 w-full"
                  />

                  {/* Transparent Overlay Info */}
                  <div className="absolute bottom-10 left-10 right-10 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                    <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                    <p className="text-sm mt-2">{selectedProject.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-white bg-opacity-20 rounded-lg border border-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub / Live Links */}
                    <div className="flex gap-4 mt-4">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                        >
                          <FiGithub /> Code
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
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
