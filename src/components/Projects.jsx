import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const Projects = ({ language }) => {
  const translations = {
    en: {
      title: "Projects",
      subtitle: "Custom Software Solutions & Web Applications", // Daha profesyonel alt başlık
      viewLive: "Project Details",
      viewCode: "Source Code",
      projects: [
        {
          title: "ATM Wire Business Management System (CMS)",
          description: "An enterprise-level CMS and inventory management platform. Includes automated order tracking and secure customer data management built with Java and React.",
          technologies: ["React", "Java Spring Boot", "PostgreSQL", "Docker", "REST API", "Cloud"],
          image: "/ATM-logo.webp"
        },
        {
          title: "Full-Stack Car Rental Application",
          description: "A comprehensive car rental solution with integrated reservation systems, fleet tracking, and responsive user interface for seamless bookings.",
          technologies: ["React", "Spring Boot", "JPA", "PostgreSQL", "WebSocket"],
          github : "https://github.com/halilkocoglu/Full-Stack-RentACar"
        },
        {
          title: "Educational Institution & University Website",
          description: "SEO-friendly educational portal featuring student management, course catalogs, and dynamic event systems using Node.js and MongoDB.",
          technologies: ["Node.js", "Express", "MongoDB", "EJS", "HTML5/CSS3"],
          image: "/smart-edu.webp",
          github : "https://github.com/halilkocoglu/smart-edu-project"
        },
        {
          title: "Portfolio Website",
          description: "Personal single page portfolio website.",
          technologies: ["React", "Radix UI", "Framer Motion", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.webp",
          github : "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    },
    tr: {
      title: "Projeler",
      subtitle: "Özel Yazılım Çözümleri ve Web Uygulamaları",
      viewLive: "Proje Detayları",
      viewCode: "Kaynak Kodu",
      projects: [
        {
          title: "ATM Tel Örgü İş Yönetim Sistemi (CMS)",
          description: "Kurumsal düzeyde CMS ve envanter yönetim platformu. Java ve React ile geliştirilmiş, sipariş takibi ve güvenli müşteri veri yönetimi çözümü.",
          technologies: ["React", "Java Spring Boot", "PostgreSQL", "Docker", "REST API", "Bulut"],
          image: "/ATM-logo.webp"
        },
        {
          title: "Uçtan Uca Araç Kiralama Uygulaması",
          description: "Entegre rezervasyon sistemi, filo takibi ve kullanıcı dostu arayüze sahip kapsamlı bir araç kiralama web yazılımı çözümü.",
          technologies: ["React", "Spring Boot", "JPA", "PostgreSQL", "WebSocket"],
          github : "https://github.com/halilkocoglu/Full-Stack-RentACar"
        },
        {
          title: "Üniversite ve Eğitim Kurumu Web Sitesi",
          description: "Öğrenci yönetimi, kurs katalogları ve dinamik etkinlik sistemleri içeren, SEO uyumlu eğitim portalı yazılımı.",
          technologies: ["Node.js", "Express", "MongoDB", "EJS", "HTML5/CSS3"],
          image: "/smart-edu.webp",
          github : "https://github.com/halilkocoglu/smart-edu-project"
        },
        {
          title: "Portföy Web Sitesi",
          description: "Kişisel tek sayfa portföy web sitesi.",
          technologies: ["React", "Radix UI", "Framer Motion", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.webp",
          github : "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    }
  };

  const t = translations[language];


  return (
    <section id="projects" className="py-10 md:py-20 md:px-4 ">
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
                <img 
                alt={`${project.title} - ${language === 'tr' ? 'Yazılım Projesi Görseli' : 'Software Project Preview'}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                src={project.image? project.image:"/projectplaceholderimage.webp"} />
                
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