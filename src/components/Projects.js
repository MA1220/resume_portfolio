import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiStar } from 'react-icons/fi';

const Projects = () => {
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
      image: "/myjioApp.webp", // replace with a real image in /public/images if you have one
      technologies: ["Java", "Spring Boot", "Elasticsearch", "ELK Stack", "Docker", "Microservices"],
      githubUrl: null,
      liveUrl: null,
      featured: true
    },
    {
      title: "Search API for Jio Financial App",
      description:
        "Developed scalable Elasticsearch-based search APIs with Spring WebClient, secure authentication, and resilient infrastructure. Optimized endpoints to support 1000+ QPS ensuring smooth UX and reliability under load.",
      image: "/jfs.webp", // optional placeholder image path
      technologies: ["Spring WebClient", "Elasticsearch", "GCP", "Java", "Spring Security", "Docker"],
      githubUrl: null,
      liveUrl: null,
      featured: true
    }
    // {
    //   title: "Config Automation with Kubernetes ConfigMaps",
    //   description:
    //     "Automated configuration management for services using Kubernetes ConfigMaps which reduced manual deployment steps and improved deployment reliability across environments.",
    //   image: "/images/config-automation.jpg",
    //   technologies: ["Kubernetes", "ConfigMaps", "CI/CD", "Helm", "GitOps"],
    //   githubUrl: null,
    //   liveUrl: null,
    //   featured: false
    // },
    // {
    //   title: "Interactive My City / Live TV Modules",
    //   description:
    //     "Built interactive modules for Jio News using reactive programming to boost content consumption and engagement. Focused on performant streaming and lazy-loading content strategies.",
    //   image: "/images/mycity-live-tv.jpg",
    //   technologies: ["Reactive Programming", "Java", "Spring Boot", "WebFlux"],
    //   githubUrl: null,
    //   liveUrl: null,
    //   featured: false
    // }
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

                  {/* Use a fallback gradient if image path is missing */}
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                      {project.title}
                    </div>
                  )}

                  {/* Overlay Links only shown when URLs provided */}
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

                  {/* Project Links (conditionally rendered) */}
                  <div className="flex gap-4 pt-4">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                      >
                        <FiGithub size={18} />
                        Code
                      </motion.a>
                    )}

                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        <FiExternalLink size={18} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Projects */}
          {/* <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/maheshwar-a-02b6b6163"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-secondary"
            >
              <FiGithub />
              View More (LinkedIn)
            </motion.a>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
