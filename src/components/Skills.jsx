import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Layout, Server, Wrench as Tool } from 'lucide-react';

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

const Skills = ({ language }) => {
  const [headerRef, headerInView] = useInView();

  const translations = {
    en: {
      title: "Technical Expertise",
      subtitle: "Full-Stack Development & Modern Web Technologies",
      categories: [
        {
          icon: Code,
          title: "Frontend Development",
          skills: ["React", "TailwindCSS", "JavaScript", "TypeScript", "Bootstrap", "HTML5", "CSS3", "Redux", "Vite", "ESLint", "Three.js", "Chakra UI", "Material-UI", "Chart.js", "Performance Optimization", "SEO Best Practices"]
        },
        {
          icon: Server,
          title: "Backend & API Architecture",
          skills: ["Node.js", "Express", "Java", "Spring Boot", "REST APIs", "WebSocket", "JWT", "Scalability", "Security Best Practices"]
        },
        {
          icon: Tool,
          title: "Cloud & DevOps Solutions",
          skills: ["Git", "Docker", "CI/CD", "Linux", "Nginx", "Cloud Deployment", "Hosting Services", "DevOps Practices"]
        },
        {
          icon: Database,
          title: "Database",
          skills: ["MongoDB", "PostgreSQL", "MySQL", "Database Design", "Database Optimization"]
        },
        {
          icon: Layout,
          title: "Design",
          skills: ["UI/UX", "Figma", "Adobe XD"]
        }
      ]
    },
    tr: {
      title: "Teknik Yetkinlikler",
      subtitle: "Full-Stack Geliştirme ve Modern Web Teknolojileri",
      categories: [
        {
          icon: Code,
          title: "Frontend Geliştirme",
          skills: ["React", "TailwindCSS", "JavaScript", "TypeScript", "Bootstrap", "HTML5", "CSS3", "Redux", "Vite", "ESLint", "Three.js", "Chakra UI", "Material-UI", "Chart.js", "Performans Optimizasyonu", "SEO En İyi Uygulamaları"]
        },
        {
          icon: Server,
          title: "Backend & API Mimarisi",
          skills: ["Node.js", "Express", "Java", "Spring Boot", "REST APIs", "WebSocket", "JWT", "Ölçeklenebilirlik", "Güvenlik En İyi Uygulamaları"]
        },
        {
          icon: Tool,
          title: "DevOps & Bulut Çözümleri",
          skills: ["Git", "Docker", "CI/CD", "Linux", "Nginx", "Bulut Yayılım", "Hosting Servisleri", "DevOps Uygulamaları"]
        },
        {
          icon: Database,
          title: "Veritabanı",
          skills: ["MongoDB", "PostgreSQL", "MySQL", "Veritabanı Tasarımı", "Veritabanı Optimizasyonu"]
        },
        {
          icon: Layout,
          title: "Tasarım",
          skills: ["UI/UX", "Figma", "Adobe XD"]
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="skills" className="py-16 md:py-24 px-4 bg-slate-900/50 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Başlık */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-200 text-lg">{t.subtitle}</p>
        </div>

        {/* Kategoriler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.categories.map((category, index) => {
            const [catRef, catInView] = useInView();
            return (
              <div
                key={index}
                ref={catRef}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`bg-slate-800/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 transition-all duration-700 transform ${
                  catInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                } hover:border-purple-500/30 group`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <category.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="px-3 py-1.5 bg-slate-900/50 text-gray-100 rounded-xl text-xs md:text-sm border border-white/5 hover:border-purple-500/50 hover:text-purple-300 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arka Plan Dekorasyonu - Performans için statik */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Skills;