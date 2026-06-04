import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
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
          company: "Genç Data Bilişim — Software & Security Solutions",
          position: "Full Stack Software Developer",
          period: "01/2025 – Present",
          description: "Providing end-to-end digital solutions including custom corporate web applications using Java Spring Boot and React. Beyond software, I manage technical infrastructure projects, including server maintenance and professional security camera system installations for businesses.",
          technologies: ["React", "Java", "Spring Boot", "Docker", "CI/CD", "Security Systems", "Network Infrastructure"]
        },
        {
          company: "İstanbul Kodluyor — Tobeto (Remote)",
          position: "Full Stack Web Developer",
          period: "09/2023 – 04/2024",
          description: "Developed high-performance, responsive web applications and SEO-friendly interfaces. Participated in the complete software development lifecycle (SDLC) from database design to frontend deployment.",
          technologies: ["React", "Java", "Spring Boot", "PostgreSQL", "JPA", "Responsive Design"]
        }
      ]
    },
    tr: {
      title: "Deneyim",
      subtitle: "Profesyonel Yazılım Mühendisliği ve Teknik Çözümler",
      experiences: [
        {
          company: "Genç Data Bilişim — Yazılım ve Güvenlik Çözümleri",
          position: "Full Stack Geliştirici",
          period: "01/2025 – Şu an",
          description: "Java Spring Boot ve React kullanarak kurumsal web uygulamaları ve özel yazılım çözümleri geliştiriyorum. Yazılım süreçlerinin yanı sıra, işletmeler için kritik teknik altyapı yönetimi ve profesyonel güvenlik kamerası sistemleri kurulumu hizmetlerini koordine ediyorum.",
          technologies: ["React", "Java", "Spring Boot", "Docker", "CI/CD", "Güvenlik Sistemleri", "Ağ Altyapısı", "PostgreSQL"]
        },
        {
          company: "İstanbul Kodluyor — Tobeto (Uzaktan)",
          position: "Full Stack Geliştirici",
          period: "09/2023 – 04/2024",
          description: "Yüksek performanslı, duyarlı ve SEO uyumlu web arayüzleri geliştirdim. Veritabanı tasarımından canlıya alım süreçlerine kadar tam kapsamlı yazılım geliştirme projelerinde yer aldım.",
          technologies: ["React", "Java", "Spring Boot", "PostgreSQL", "Responsive Tasarım"]
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="experience" className="py-20 md:py-28 px-1 sm:px-4 overflow-hidden bg-white/30">
      <div className="container p-5 mx-auto max-w-5xl">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 transform ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
            {t.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-300 via-pink-300 to-transparent hidden sm:block"></div>

          <div className="space-y-8">
            {t.experiences.map((exp, index) => {
              const [itemRef, itemInView] = useInView();
              return (
                <div
                  key={index}
                  ref={itemRef}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  className={`relative sm:pl-20 transition-all duration-700 transform ${itemInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-5 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 border-2 border-white shadow-md shadow-violet-400/30 hidden sm:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-5">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/20">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">{exp.position}</h3>
                          <p className="text-violet-600 font-medium text-sm">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg self-start text-sm">
                        <Calendar className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                        <time className="font-medium whitespace-nowrap">{exp.period}</time>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-5 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium border border-violet-200/60"
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
      </div>
    </section>
  );
};

export default Experience;
