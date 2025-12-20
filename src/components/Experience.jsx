import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = ({ language }) => {
  const translations = {
    en: {
      title: "Experience",
      subtitle: "Professional Software Engineering & Technical Solutions", 
      experiences: [
        {
          company: "Genç Data Bilişim - Software & Security Solutions",
          position: "Full Stack Software Developer",
          period: "01/2025 - Present",
          description: "Providing end-to-end digital solutions including custom corporate web applications using Java Spring Boot and React. Beyond software, I manage technical infrastructure projects, including server maintenance and professional security camera system installations for businesses.",
          technologies: ["React", "Java", "Spring Boot", "Docker", "CI/CD", "Security Systems", "Network Infrastructure"]
        },
        {
          company: "İstanbul Kodluyor - Tobeto (Remote)",
          position: "Full Stack Web Developer",
          period: "09/2023 - 04/2024",
          description: "Developed high-performance, responsive web applications and SEO-friendly interfaces. Participated in the complete software development lifecycle (SDLC) from database design to frontend deployment.",
          technologies: ["React", "Java", "Spring Boot", "PostgreSQL", "JPA", "Responsive Design"]
        },
      ]
    },
    tr: {
      title: "Deneyim",
      subtitle: "Profesyonel Yazılım Mühendisliği ve Teknik Çözümler",
      experiences: [
        {
          company: "Genç Data Bilişim - Yazılım ve Güvenlik Çözümleri",
          position: "Full Stack Geliştirici",
          period: "01/2025 - Şu an",
          description: "Java Spring Boot ve React kullanarak kurumsal web uygulamaları ve özel yazılım çözümleri geliştiriyorum. Yazılım süreçlerinin yanı sıra, işletmeler için kritik teknik altyapı yönetimi ve profesyonel güvenlik kamerası sistemleri kurulumu hizmetlerini koordine ediyorum.",
          technologies: ["React", "Java", "Spring Boot", "Docker", "CI/CD", "Güvenlik Sistemleri", "Ağ Altyapısı", "PostgreSQL"]
        },
        {
          company: "İstanbul Kodluyor - Tobeto (Uzaktan)",
          position: "Full Stack Geliştirici",
          period: "09/2023 - 04/2024",
          description: "Yüksek performanslı, duyarlı ve SEO uyumlu web arayüzleri geliştirdim. Veritabanı tasarımından canlıya alım süreçlerine kadar tam kapsamlı yazılım geliştirme projelerinde yer aldım.",
          technologies: ["React", "Java", "Spring Boot", "PostgreSQL", "Responsive Tasarım"]
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
                    <time className="text-sm">{exp.period}</time>
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