import { useEffect, useRef, useState } from 'react';
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

const iconColors = [
  'bg-violet-100 text-violet-700 border-violet-200/60',
  'bg-pink-100 text-pink-700 border-pink-200/60',
  'bg-sky-100 text-sky-700 border-sky-200/60',
  'bg-emerald-100 text-emerald-700 border-emerald-200/60',
  'bg-amber-100 text-amber-700 border-amber-200/60',
];

const tagColors = [
  'bg-violet-50 text-violet-700 border-violet-200/50',
  'bg-pink-50 text-pink-700 border-pink-200/50',
  'bg-sky-50 text-sky-700 border-sky-200/50',
  'bg-emerald-50 text-emerald-700 border-emerald-200/50',
  'bg-amber-50 text-amber-700 border-amber-200/50',
];

const CategoryCard = ({ category, index }) => {
  const [ref, inView] = useInView();
  const color = iconColors[index % iconColors.length];
  const tagColor = tagColors[index % tagColors.length];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/60 shadow-sm transition-all duration-600 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:shadow-lg hover:border-violet-200 hover:-translate-y-1 group`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${color} group-hover:scale-110 transition-transform duration-300`}>
          <category.icon className="w-5 h-5" />
        </div>
        <h3 className="text-slate-900 font-bold text-base">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${tagColor} hover:-translate-y-0.5 transition-transform duration-200 cursor-default`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = ({ language }) => {
  const [headerRef, headerInView] = useInView();

  const translations = {
    en: {
      title: "Technical Expertise",
      subtitle: "Full-Stack Development & Modern Web Technologies",
      categories: [
        { icon: Code,     title: "Frontend Development",   skills: ["React", "TailwindCSS", "JavaScript", "TypeScript", "Bootstrap", "HTML5", "CSS3", "Redux", "Vite", "Three.js", "Material-UI", "Chart.js", "Performance Optimization", "SEO"] },
        { icon: Server,   title: "Backend & API",          skills: ["Node.js", "Express", "Java", "Spring Boot", "REST APIs", "WebSocket", "JWT", "Scalability", "Security"] },
        { icon: Tool,     title: "Cloud & DevOps",         skills: ["Git", "Docker", "CI/CD", "Linux", "Nginx", "Cloud Deployment", "Hosting Services"] },
        { icon: Database, title: "Database",               skills: ["MongoDB", "PostgreSQL", "MySQL", "Database Design", "Query Optimization"] },
        { icon: Layout,   title: "Design",                 skills: ["UI/UX", "Figma", "Adobe XD", "Responsive Design", "Accessibility"] }
      ]
    },
    tr: {
      title: "Teknik Yetkinlikler",
      subtitle: "Full-Stack Geliştirme ve Modern Web Teknolojileri",
      categories: [
        { icon: Code,     title: "Frontend Geliştirme",    skills: ["React", "TailwindCSS", "JavaScript", "TypeScript", "Bootstrap", "HTML5", "CSS3", "Redux", "Vite", "Three.js", "Material-UI", "Chart.js", "Performans Optimizasyonu", "SEO"] },
        { icon: Server,   title: "Backend & API Mimarisi", skills: ["Node.js", "Express", "Java", "Spring Boot", "REST APIs", "WebSocket", "JWT", "Ölçeklenebilirlik", "Güvenlik"] },
        { icon: Tool,     title: "DevOps & Bulut",         skills: ["Git", "Docker", "CI/CD", "Linux", "Nginx", "Bulut Yayılım", "Hosting Servisleri"] },
        { icon: Database, title: "Veritabanı",             skills: ["MongoDB", "PostgreSQL", "MySQL", "Veritabanı Tasarımı", "Sorgu Optimizasyonu"] },
        { icon: Layout,   title: "Tasarım",                skills: ["UI/UX", "Figma", "Adobe XD", "Responsive Tasarım", "Erişilebilirlik"] }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="skills" className="py-20 md:py-28 px-1 sm:px-4 overflow-hidden">
      <div className="container p-5 mx-auto max-w-7xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {t.categories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
