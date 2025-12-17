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
          company: "Tech Solutions Inc.",
          position: "Senior Full Stack Developer",
          period: "2021 - Present",
          description: "Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and establishing best practices.",
          technologies: ["React", "Node.js", "AWS", "PostgreSQL"]
        },
        {
          company: "Digital Agency Pro",
          position: "Full Stack Developer",
          period: "2019 - 2021",
          description: "Developed responsive websites and web applications for various clients. Collaborated with design teams to create engaging user experiences.",
          technologies: ["React", "Express", "MongoDB", "TailwindCSS"]
        },
        {
          company: "StartUp Ventures",
          position: "Frontend Developer",
          period: "2017 - 2019",
          description: "Built modern single-page applications and implemented responsive designs. Worked closely with UX designers to create intuitive interfaces.",
          technologies: ["Vue.js", "JavaScript", "CSS3", "REST APIs"]
        }
      ]
    },
    tr: {
      title: "Deneyim",
      subtitle: "Profesyonel yolculuğum",
      experiences: [
        {
          company: "Tech Solutions Inc.",
          position: "Kıdemli Full Stack Geliştirici",
          period: "2021 - Şu an",
          description: "React, Node.js ve bulut teknolojileri kullanarak kurumsal web uygulamalarının geliştirilmesine liderlik ediyorum. Genç geliştiricilere mentorluk yapıyorum ve en iyi uygulamaları belirliyorum.",
          technologies: ["React", "Node.js", "AWS", "PostgreSQL"]
        },
        {
          company: "Digital Agency Pro",
          position: "Full Stack Geliştirici",
          period: "2019 - 2021",
          description: "Çeşitli müşteriler için duyarlı web siteleri ve web uygulamaları geliştirdim. Tasarım ekipleriyle işbirliği yaparak ilgi çekici kullanıcı deneyimleri oluşturdum.",
          technologies: ["React", "Express", "MongoDB", "TailwindCSS"]
        },
        {
          company: "StartUp Ventures",
          position: "Frontend Geliştirici",
          period: "2017 - 2019",
          description: "Modern tek sayfalı uygulamalar geliştirdim ve duyarlı tasarımlar uyguladım. Sezgisel arayüzler oluşturmak için UX tasarımcılarıyla yakın çalıştım.",
          technologies: ["Vue.js", "JavaScript", "CSS3", "REST APIs"]
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