import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import GithubIcon  from '../assets/GithubIcon';

const Projects = ({ language }) => {
  const translations = {
    en: {
      title: "Projects",
      subtitle: "Some of my recent work",
      viewLive: "View Details",
      viewCode: "View Code",
      projects: [
        {
          title: "ATM Wire Business Management System",
          description: "Comprehensive business management platform with order, inventory, and customer management features.",
          technologies: ["React", "Java", "PostgreSQL", "Hosting", "Docker", "JWT", "WebSocket", "REST API", "CI/CD", "Cloud Deployment"],
          image: "/ATM-logo.png"
        },
        {
          title: "Car Rental Web Application",
          description: "Integrated reservation, fleet tracking, and customer management system for end-to-end car rental solution.",
          technologies: ["React", "Java", "PostgreSQL", "WebSocket", "REST API", "JWT", "Spring Boot", "JPA", "Bootstrap", "i18next", "Git", "Github"],
          github : "https://github.com/halilkocoglu/Full-Stack-RentACar"
        },
        {
          title: "University Website",
          description: "Educational institution website with course listings, student and teacher profiles, and event management.",
          technologies: ["Node.js", "Mongoose", "Express", "EJS", "Bcrypt", "HTML5", "CSS3", "JavaScript", "MongoDB"],
          image: "/Smart-edu.png",
          github : "https://github.com/halilkocoglu/smart-edu-project"
        },
        {
          title: "Portfolio Website",
          description: "Personal single page portfolio website.",
          technologies: ["React", "Radix UI", "Framer Motion", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.png",
          github : "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    },
    tr: {
      title: "Projeler",
      subtitle: "Son çalışmalarımdan bazıları",
      viewLive: "Detayları Görüntüle",
      viewCode: "Kodu Görüntüle",
      projects: [
        {
          title: "ATM Tel örgü İş Yönetim Sistemi",
          description: "Sipariş, envanter ve müşteri yönetimi özelliklerine sahip kapsamlı bir iş yönetim platformu.",
          technologies: ["React", "Java", "PostgreSQL", "Hosting", "Docker", "JWT", "WebSocket", "REST API", "CI/CD", "Cloud Deployment"],
          image: "/ATM-logo.png"
        },
        {
          title: "Araç Kiralama Web Uygulaması",
          description: "Entegre rezervasyon, filo takibi ve müşteri yönetim sistemlerine sahip uçtan uca araç kiralama çözümü.",
          technologies: ["React", "Java", "PostgreSQL", "WebSocket", "REST API", "JWT", "Spring Boot", "JPA", "Bootstrap", "i18next", "Git", "Github"],
          github : "https://github.com/halilkocoglu/Full-Stack-RentACar"
        },
        {
          title: "Üniversite Web Sitesi",
          description: "Kurs listeleri, öğrenci ve öğretmen profilleri ile etkinlik yönetimine sahip eğitim kurumu web sitesi.",
          technologies: ["Node.js", "Mongoose", "Express", "EJS", "Bcrypt", "HTML5", "CSS3", "JavaScript", "MongoDB"],
          image: "/Smart-edu.png",
          github : "https://github.com/halilkocoglu/smart-edu-project"
        },
        {
          title: "Portföy Web Sitesi",
          description: "Kişisel tek sayfa portföy web sitesi.",
          technologies: ["React", "Radix UI", "Framer Motion", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.png",
          github : "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    }
  };

  const t = translations[language];

  const handleProjectClick = (type) => {
    toast({
      title: "🚧 Project Link",
      description: "🚧 This feature isn't implemented yet—but don't worry! 🚀"
    });
  };

  return (
    <section id="projects" className="py-20 px-4 ">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {t.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={project.image? project.image:"/ProjectPlaceholderImage.jpeg"} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.github && 
                  <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  href={project.github}
                  className="flex-0"
                  target='_blank'
                  rel="noopener noreferrer"
                  >
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.viewLive}
                  </Button>
                  </motion.a>}

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;