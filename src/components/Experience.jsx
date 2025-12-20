import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = ({ language }) => {
  const translations = {
    en: {
      title: "Experience",
      subtitle: "My professional journey",
      experiences: [
        {
          company: "Genç Data Bilişim-Computer,Security and Software Solutions",
          position: "Full Stack Developer",
          period: "01/2025 - Present",
          description: "Leading development of enterprise web applications using React, Java, and cloud technologies. Establishing best practices.In addition to software excellence, overseeing technical infrastructure, including computer and printer maintenance and the end-to-end installation of security camera systems.",
          technologies: ["React", "Java", "Bootstrap", "PostgreSQL", "Hosting","Github Actions","Docker", "JWT","WebSocket","REST API","CI/CD","Cloud Deployment","Performance Optimization","Security Best Practices"]
        },
        {
          company: "İstanbul Kodluyor-Tobeto (Remote)",
          position: "Full Stack Developer",
          period: "09/2023 - 04/2024",
          description: "Developed responsive websites and web applications for İstanbul Kodluyor projects. Collaborated with design teams to create engaging user experiences.",
          technologies: ["React", "Java", "PostgreSQL", "Bootstrap"]
        },
      ]
    },
    tr: {
      title: "Deneyim",
      subtitle: "Profesyonel yolculuğum",
      experiences: [
        {
          company: "Genç Data Bilişim-Bilgisayar, Güvenlik ve Yazılım Çözümleri",
          position: "Full Stack Geliştirici",
          period: "01/2025 - Şu an",
          description: "React, Java ve bulut teknolojilerini kullanarak kurumsal web uygulamalarının geliştirilmesine liderlik ediyor ve en iyi uygulama (best practices) standartlarını oluşturuyorum. Yazılımdaki uzmanlığımın yanı sıra; bilgisayar ve yazıcı bakımı ile güvenlik kamerası sistemlerinin uçtan uca kurulumunu da kapsayan teknik altyapı süreçlerini yönetiyorum.",
          technologies: ["React", "Java", "Bootstrap", "PostgreSQL", "Hosting", "Github Actions","Docker", "JWT","WebSocket","REST API","CI/CD","Cloud Deployment","Performans Optimizasyonu"]
        },
        {
          company: "İstanbul Kodluyor-Tobeto (Uzaktan)",
          position: "Full Stack Geliştirici",
          period: "09/2023 - 04/2024",
          description: "İstanbul Kodluyor projesi için duyarlı web siteleri ve web uygulamaları geliştirdim. Tasarım ekipleriyle işbirliği yaparak ilgi çekici kullanıcı deneyimleri oluşturdum.",
          technologies: ["React", "Java", "Bootstrap", "PostgreSQL"]
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="experience" className="py-20 px-4 bg-slate-900/50">
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

        <div className="max-w-4xl mx-auto space-y-8">
          {t.experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                      <p className="text-purple-400 font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;