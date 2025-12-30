import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

// Performans dostu Intersection Observer Hook'u
const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const Experience = ({ language }) => {
  const [titleRef, titleInView] = useInView();
  
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
    <section id="experience" className="py-16 md:py-24 px-4 bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto">
        {/* Başlık Bölümü */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-200 text-lg">{t.subtitle}</p>
        </div>

        {/* Deneyim Listesi */}
        <div className="max-w-4xl mx-auto space-y-10">
          {t.experiences.map((exp, index) => {
            // Her kart için ayrı bir observer kullanıyoruz
            const [itemRef, itemInView] = useInView();

            return (
              <div
                key={index}
                ref={itemRef}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 rounded-2xl border border-purple-500/20 transition-all duration-700 transform ${
                  itemInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                } hover:border-purple-500/50 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/10`}
              >
                {/* Arka Plan Efekti (GPU Hızlandırmalı) */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{exp.position}</h3>
                        <p className="text-purple-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200 bg-slate-800/50 px-3 py-1.5 rounded-lg self-start md:self-auto">
                      <Calendar className="w-4 h-4 text-pink-500" />
                      <time className="text-sm font-medium tracking-wide">{exp.period}</time>
                    </div>
                  </div>

                  <p className="text-gray-100 mb-6 leading-relaxed text-base md:text-lg">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-slate-800 text-purple-300 rounded-lg text-xs md:text-sm border border-white/5 group-hover:border-purple-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;