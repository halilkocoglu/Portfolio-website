import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import GithubIcon from '../assets/GithubIcon';

const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

/* ── Browser + Phone mockup for website projects ── */
const DeviceMockup = ({ image, mobileImage, url, title }) => (
  <div className="relative p-4 pb-2 bg-gradient-to-br from-slate-50 to-violet-50/40 border-b border-slate-200/50">
    {/* Desktop browser frame — full width */}
    <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/80 bg-white">
      <div className="bg-slate-100 px-3 py-2 flex items-center gap-2 border-b border-slate-200/60">
        <div className="flex gap-1 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
        </div>
        <div className="flex-1 bg-white rounded-md px-2 py-0.5 text-[9px] text-slate-400 truncate border border-slate-200/70 mr-16">
          {url ? url.replace(/^https?:\/\//, '') : title}
        </div>
      </div>
      <div className="h-36 overflow-hidden">
        <img
          loading="lazy"
          decoding="async"
          src={image || '/projectplaceholderimage.webp'}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>

    {/* Mobile phone frame — absolute, overlapping bottom-right corner */}
    <div
      className="absolute right-5 bottom-0 translate-y-[40%] z-10 rounded-[20px] overflow-hidden border-[3px] border-slate-300 shadow-xl bg-white"
      style={{ width: '72px', height: '130px' }}
    >
      {/* Notch */}
      <div className="h-[18px] bg-slate-200 flex items-center justify-center">
        <div className="w-7 h-1.5 bg-slate-400 rounded-full"></div>
      </div>
      {/* Screen */}
      <div className="overflow-hidden bg-white" style={{ height: '96px' }}>
        <img
          loading="lazy"
          decoding="async"
          src={mobileImage || image || '/projectplaceholderimage.webp'}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>
      {/* Home bar */}
      <div className="h-4 bg-slate-200 flex items-center justify-center">
        <div className="w-6 h-1 bg-slate-400 rounded-full"></div>
      </div>
    </div>
  </div>
);

/* ── Regular image card for non-website projects ── */
const ImagePreview = ({ image, title }) => (
  <div className="relative h-44 overflow-hidden bg-slate-100">
    <img
      loading="lazy"
      decoding="async"
      src={image || '/projectplaceholderimage.webp'}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
  </div>
);

const ProjectCard = ({ project, index, viewLive, viewSite }) => {
  const [ref, inView] = useInView();
  const isWebsite = Boolean(project.url || project.mobileImage);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
      className={`bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-600 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } group hover:shadow-xl hover:shadow-violet-200/40 hover:-translate-y-2 hover:border-violet-200`}
    >
      {isWebsite
        ? <DeviceMockup image={project.image} mobileImage={project.mobileImage} url={project.url} title={project.title} />
        : <ImagePreview image={project.image} title={project.title} />
      }

      <div className={`p-6 flex flex-col ${isWebsite ? 'pt-12' : ''}`}>
        {isWebsite && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-0.5 mb-3 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Live
          </span>
        )}

        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-violet-50 text-violet-700 rounded-lg text-[10px] font-semibold border border-violet-200/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2.5">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-700 to-pink-600 text-white text-sm font-semibold shadow-md shadow-violet-500/20 hover:shadow-violet-500/35 hover:brightness-105 transition-all active:scale-95">
                <ExternalLink className="w-3.5 h-3.5" />
                {viewSite}
              </button>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={project.url ? '' : 'flex-1'}
            >
              <button className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-semibold hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-all active:scale-95 ${project.url ? '' : 'w-full'}`}>
                <GithubIcon size={15} />
                {project.url ? 'GitHub' : viewLive}
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ language }) => {
  const [headerRef, headerInView] = useInView();

  const translations = {
    en: {
      title: "Projects",
      subtitle: "Custom Software Solutions & Web Applications",
      viewLive: "Project Details",
      viewSite: "Visit Site",
      projects: [
        
        {
          title: "Alka Yapı — Construction & Decoration Website",
          description: "Corporate website for a Nazilli-based construction, interior design and renovation company. Features project portfolio, service pages and consultation request flow.",
          technologies: ["React", "Tailwind CSS", "Vite", "SEO Optimization", "Responsive Design"],
          image: "/alka_yapi.jpeg",
          mobileImage: "/alka_yapi_mobile.jpeg",
          url: "https://www.alkayapiinsaat.com/"
        },
        {
          title: "Nazilli Korkmaz Optik — Product & Blog Website",
          description: "Promotional website for a local optical company featuring product showcase, informational blog posts, and local SEO optimization.",
          technologies: ["React", "Tailwind CSS", "Vite", "Blog", "SEO Optimization"],
          image: "/korkmaz_optik.jpeg",
          mobileImage: "/korkmaz_optik_mobile.jpeg",
          url: "https://nazillikorkmazoptik.com.tr/"
        },
        {
          title: "Ardel Group — Transportation, Tours & Construction",
          description: "Corporate website for Ardel Group, a multi-sector company operating in personnel transportation, tour travel, construction and interior decoration. Features service pages, fleet showcase and contact flow.",
          technologies: ["React", "Tailwind CSS", "Vite", "SEO Optimization", "Responsive Design"],
          image: "/ardel_group.jpeg",
          mobileImage: "/ardel_group_mobile.jpeg",
          url: "https://ardelgroup.com.tr/"
        },
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
          github: "https://github.com/halilkocoglu/Full-Stack-RentACar"
        },
        {
          title: "Educational Institution & University Website",
          description: "SEO-friendly educational portal featuring student management, course catalogs, and dynamic event systems using Node.js and MongoDB.",
          technologies: ["Node.js", "Express", "MongoDB", "EJS", "HTML5/CSS3"],
          image: "/smart-edu.webp",
          github: "https://github.com/halilkocoglu/smart-edu-project"
        },
        {
          title: "Portfolio Website",
          description: "Personal single page portfolio website built with modern tech stack.",
          technologies: ["React", "Radix UI", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.webp",
          github: "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    },
    tr: {
      title: "Projeler",
      subtitle: "Özel Yazılım Çözümleri ve Web Uygulamaları",
      viewLive: "Proje Detayları",
      viewSite: "Siteyi Ziyaret Et",
      projects: [
        
        {
          title: "Alka Yapı — İnşaat & Dekorasyon Web Sitesi",
          description: "Nazilli merkezli inşaat, iç mimari ve dekorasyon firması için kurumsal web sitesi. Proje portföyü, hizmet sayfaları ve ücretsiz keşif talep akışı içerir.",
          technologies: ["React", "Tailwind CSS", "Vite", "SEO Optimizasyonu", "Responsive Tasarım"],
          image: "/alka_yapi.jpeg",
          mobileImage: "/alka_yapi_mobile.jpeg",
          url: "https://www.alkayapiinsaat.com/"
        },
        {
          title: "Nazilli Korkmaz Optik — Ürün & Blog Web Sitesi",
          description: "Yerel optik firması için ürün tanıtımı ve bilgilendirme blog yazılarını bir arada sunan, yerel SEO odaklı tanıtım web sitesi.",
          technologies: ["React", "Tailwind CSS", "Vite", "Blog", "SEO Optimizasyonu"],
          image: "/korkmaz_optik.jpeg",
          mobileImage: "/korkmaz_optik_mobile.jpeg",
          url: "https://nazillikorkmazoptik.com.tr/"
        },
        {
          title: "Ardel Group — Taşımacılık, Tur & İnşaat Web Sitesi",
          description: "Personel taşımacılığı, tur gezileri, inşaat ve dekorasyon alanlarında faaliyet gösteren çok sektörlü Ardel Group için kurumsal web sitesi. Hizmet sayfaları, araç filosu ve iletişim akışı içerir.",
          technologies: ["React", "Tailwind CSS", "Vite", "SEO Optimizasyonu", "Responsive Tasarım"],
          image: "/ardel_group.jpeg",
          mobileImage: "/ardel_group_mobile.jpeg",
          url: "https://ardelgroup.com.tr/"
        },
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
          github: "https://github.com/halilkocoglu/Full-Stack-RentACar"
        },
        {
          title: "Üniversite ve Eğitim Kurumu Web Sitesi",
          description: "Öğrenci yönetimi, kurs katalogları ve dinamik etkinlik sistemleri içeren, SEO uyumlu eğitim portalı yazılımı.",
          technologies: ["Node.js", "Express", "MongoDB", "EJS", "HTML5/CSS3"],
          image: "/smart-edu.webp",
          github: "https://github.com/halilkocoglu/smart-edu-project"
        },
        {
          title: "Portföy Web Sitesi",
          description: "Modern teknolojilerle geliştirilmiş kişisel tek sayfa portföy web sitesi.",
          technologies: ["React", "Radix UI", "Lucide React", "Tailwind CSS", "Netlify"],
          image: "/portfolio.webp",
          github: "https://github.com/halilkocoglu/Portfolio-website"
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="projects" className="py-20 md:py-28 px-1 sm:px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 transform ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
            {t.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {t.projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              viewLive={t.viewLive}
              viewSite={t.viewSite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
