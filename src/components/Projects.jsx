import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

// Performans için Intersection Observer Hook
const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const Projects = ({ language }) => {
  const [headerRef, headerInView] = useInView();

  const translations = {
    en: {
      title: "Projects",
      subtitle: "Custom Software Solutions & Web Applications",
      viewLive: "Project Details",
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
          description: "Personal single page portfolio website built with modern tech stack.",
          technologies: ["React", "Radix UI", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.webp",
          github : "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    },
    tr: {
      title: "Projeler",
      subtitle: "Özel Yazılım Çözümleri ve Web Uygulamaları",
      viewLive: "Proje Detayları",
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
          description: "Modern teknolojilerle geliştirilmiş kişisel tek sayfa portföy web sitesi.",
          technologies: ["React", "Radix UI", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.webp",
          github : "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Başlık Alanı */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Projeler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.projects.map((project, index) => {
            const [itemRef, itemInView] = useInView();
            return (
              <div
                key={index}
                ref={itemRef}
                style={{ transitionDelay: `${(index % 3) * 150}ms` }}
                className={`bg-slate-900/60 rounded-3xl overflow-hidden border border-white/5 transition-all duration-700 transform ${
                  itemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } group hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2`}
              >
                {/* Görsel Alanı */}
                <div className="relative h-52 overflow-hidden bg-slate-800">
                  <img 
                    loading="lazy"
                    decoding="async"
                    alt={`${project.title}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                    src={project.image || "/projectplaceholderimage.webp"} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                </div>

                {/* İçerik Alanı */}
                <div className="p-6 md:p-7 flex flex-col h-[calc(100%-13rem)]">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Teknolojiler */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.technologies.slice(0, 5).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 bg-slate-800/80 text-purple-300 rounded-lg text-[10px] md:text-xs font-medium border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buton */}
                  {project.github && (
                    <a
                      href={project.github}
                      target='_blank'
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 text-white rounded-xl py-5 font-semibold transition-all active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.viewLive}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;