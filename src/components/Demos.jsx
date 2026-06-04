import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

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

const BrowserMockup = ({ url, title, image }) => (
  <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/80 bg-white">
    <div className="bg-slate-100 px-3 py-2 flex items-center gap-2 border-b border-slate-200/60">
      <div className="flex gap-1 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
        <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
      </div>
      <div className="flex-1 bg-white rounded-md px-2 py-0.5 text-[9px] text-slate-400 truncate border border-slate-200/70">
        {url.replace(/^https?:\/\//, '')}
      </div>
    </div>
    <div className="h-36 overflow-hidden bg-gradient-to-br from-violet-50 to-pink-50 flex items-center justify-center">
      {image
        ? <img loading="lazy" src={image} alt={title} className="w-full h-full object-cover object-top" />
        : (
          <div className="text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
            <p className="text-slate-500 text-xs">{title}</p>
          </div>
        )
      }
    </div>
  </div>
);

const DemoCard = ({ demo, index, visitDemo }) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
      className={`bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-600 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } group hover:shadow-xl hover:shadow-violet-200/40 hover:-translate-y-2 hover:border-violet-200`}
    >
      <div className="p-4 bg-gradient-to-br from-slate-50 to-violet-50/40 border-b border-slate-200/50">
        <BrowserMockup url={demo.url} title={demo.title} image={demo.image} />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Live Demo
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
          {demo.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {demo.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {demo.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-violet-50 text-violet-700 rounded-lg text-[10px] font-semibold border border-violet-200/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <a href={demo.url} target="_blank" rel="noopener noreferrer">
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-700 to-pink-600 text-white text-sm font-semibold shadow-md shadow-violet-500/20 hover:shadow-violet-500/35 hover:brightness-105 transition-all active:scale-95">
            <ExternalLink className="w-3.5 h-3.5" />
            {visitDemo}
          </button>
        </a>
      </div>
    </div>
  );
};

const Demos = ({ language }) => {
  const [headerRef, headerInView] = useInView();

  const translations = {
    en: {
      title: 'Demos',
      subtitle: 'Live Demo Projects Hosted on Netlify',
      visitDemo: 'Visit Demo',
      demos: [
        {
          title: 'Sağlıklı Yaşam',
          description: 'A healthy living demo application showcasing modern web design and interactive UI components.',
          technologies: ['React', 'Tailwind CSS', 'Netlify'],
          url: 'https://saglikli-yasam-demo.netlify.app',
        },
        {
          title: 'Genç Data',
          description: 'Corporate demo website for Genç Data, an IT company specializing in security cameras, hardware repair, and software solutions.',
          technologies: ['React', 'Tailwind CSS', 'Netlify'],
          url: 'https://genc-data-demo.netlify.app',
        },
      ],
    },
    tr: {
      title: 'Demolar',
      subtitle: 'Netlify Üzerinde Yayınlanan Canlı Demo Projeler',
      visitDemo: 'Demoyu Ziyaret Et',
      demos: [
        {
          title: 'Sağlıklı Yaşam',
          description: 'Modern web tasarımı ve etkileşimli arayüz bileşenlerini sergileyen sağlıklı yaşam demo uygulaması.',
          technologies: ['React', 'Tailwind CSS', 'Netlify'],
          url: 'https://saglikli-yasam-demo.netlify.app',
        },
        {
          title: 'Genç Data',
          description: 'Güvenlik kamerası, bilişim tamiri ve yazılım alanlarında hizmet veren Genç Data firması için hazırlanmış kurumsal demo web sitesi.',
          technologies: ['React', 'Tailwind CSS', 'Netlify'],
          url: 'https://genc-data-demo.netlify.app',
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <section id="demos" className="py-20 md:py-28 px-1 sm:px-4 overflow-hidden bg-white/30">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {t.demos.map((demo, index) => (
            <DemoCard key={index} demo={demo} index={index} visitDemo={t.visitDemo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Demos;
