// src/components/Skills.js
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaMicrosoft
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiSpring,
  SiKubernetes,
  SiNextdotjs,
  SiRedis,
  SiGooglecloud,
  SiPrometheus,
  SiGrafana,
  SiElasticsearch,
  SiNodedotjs
} from 'react-icons/si';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", icon: <FaJava />, color: "text-red-600" },
        { name: "SQL", icon: <SiPostgresql />, color: "text-blue-600" },
        { name: "NoSQL (MongoDB)", icon: <SiMongodb />, color: "text-green-500" },
        { name: "HTML", icon: <FaHtml5 />, color: "text-orange-500" },
        { name: "CSS", icon: <FaCss3Alt />, color: "text-blue-500" },
      ]
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { name: "Spring Boot / Spring", icon: <SiSpring />, color: "text-green-600" },
        // kept a generic icon for networking / WebClient / WebFlux
        { name: "Spring WebClient / WebFlux", icon: <SiNodedotjs />, color: "text-teal-500" },
        { name: "Microservices", icon: <FaDocker />, color: "text-sky-600" },
        { name: "Docker", icon: <FaDocker />, color: "text-blue-500" },
        { name: "Kubernetes", icon: <SiKubernetes />, color: "text-blue-600" },
        { name: "Elasticsearch / ELK", icon: <SiElasticsearch />, color: "text-indigo-600" },
        { name: "Git", icon: <FaGitAlt />, color: "text-orange-500" }
      ]
    },
    {
      title: "Cloud & Monitoring",
      skills: [
        { name: "GCP", icon: <SiGooglecloud />, color: "text-blue-500" },
        // replaced non-existent SiMicrosoftazure with FaMicrosoft
        { name: "Azure", icon: <FaMicrosoft />, color: "text-blue-700" },
        { name: "Prometheus", icon: <SiPrometheus />, color: "text-amber-600" },
        { name: "Grafana", icon: <SiGrafana />, color: "text-orange-600" },
        { name: "Redis", icon: <SiRedis />, color: "text-red-500" }
      ]
    },
    {
      title: "Frontend (Basic)",
      skills: [
        { name: "React", icon: <FaReact />, color: "text-sky-500" },
        { name: "Next.js ", icon: <SiNextdotjs />, color: "text-gray-800" },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-sky-600" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-teal-500" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 section-padding bg-gray-50 dark:bg-gray-900">
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
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks I use to build robust applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="card text-center group cursor-pointer"
                      title={skill.name}
                    >
                      <div className={`text-4xl mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-200`}>
                        {skill.icon}
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Additional Competencies
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "System Design", "Distributed Systems", "Scalability", "DSA",
                  "Performance Optimization", "Security", "REST APIs", "ELK Stack",
                  "Agile/Scrum", "Code Review"
                ].map((skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
