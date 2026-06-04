import React, { useEffect, useState } from 'react';
import { Mail, Download, ArrowRight } from 'lucide-react';
import GithubIcon from '../assets/GithubIcon';
import LinkedinIcon from '../assets/LinkedinIcon';
import { Button } from './ui/button';

const Hero = ({ language }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const translations = {
    en: {
      greeting: "Hi, I'm",
      name: "Halil İbrahim\nKoçoğlu",
      badge: "Full Stack Developer",
      description: "I build high-performance web applications and custom corporate websites using modern technologies like React and Spring Boot.",
      viewProjects: "View Projects",
      downloadCV: "Download CV",
      stat1: "3+", stat1Label: "Years Exp.",
      stat2: "10+", stat2Label: "Projects",
      stat3: "100%", stat3Label: "Satisfaction",
    },
    tr: {
      greeting: "Merhaba, Ben",
      name: "Halil İbrahim\nKoçoğlu",
      badge: "Full Stack Geliştirici",
      description: "Modern teknolojilerle yüksek performanslı web uygulamaları ve ihtiyaca özel kurumsal web sitesi çözümleri sunuyorum.",
      viewProjects: "Projeleri İncele",
      downloadCV: "CV İndir",
      stat1: "3+", stat1Label: "Yıl Deneyim",
      stat2: "10+", stat2Label: "Proje",
      stat3: "100%", stat3Label: "Memnuniyet",
    }
  };

  const t = translations[language];

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = (delay = '') =>
    `transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${delay}`;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-1 sm:px-4 pt-20 overflow-hidden relative"
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-400/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-400/12 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div className="space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200/60 ${fadeUp('delay-75')}`}>
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></span>
              <span className="text-violet-700 text-sm font-semibold">{t.badge}</span>
            </div>

            <div className={fadeUp('delay-150')}>
              <p className="text-slate-500 text-base font-medium mb-1">{t.greeting}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                {t.name.split('\n').map((line, i) => (
                  <span key={i} className={`block ${i === 0 ? 'text-slate-900' : 'bg-gradient-to-r from-violet-700 via-purple-600 to-pink-600 bg-clip-text text-transparent'}`}>
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <p className={`text-slate-600 text-md md:text-lg leading-relaxed max-w-md ${fadeUp('delay-300')}`}>
              {t.description}
            </p>

            <div className={`flex flex-wrap gap-3 pt-2 ${fadeUp('delay-500')}`}>
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03] transition-all duration-300 active:scale-95"
              >
                {t.viewProjects}
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={language === 'tr' ? '/Halil_Ibrahim_Kocoglu_TR.pdf' : '/Halil_Ibrahim_Kocoglu_EN.pdf'}
                download={`Halil_Ibrahim_Kocoglu_CV_${language.toUpperCase()}.pdf`}
              >
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-violet-300/60 text-violet-700 font-semibold hover:bg-violet-50 hover:border-violet-400 hover:scale-[1.03] transition-all duration-300 active:scale-95 bg-white/60 backdrop-blur-sm">
                  <Download className="w-4 h-4" />
                  {t.downloadCV}
                </button>
              </a>
            </div>

            {/* Social links */}
            <div className={`flex gap-3 pt-2 ${fadeUp('delay-700')}`}>
              {[
                { icon: GithubIcon, href: 'https://github.com/halilkocoglu', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/halilkocoglu/', label: 'LinkedIn' },
                { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=halilkocoglu98@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/70 border border-slate-200/60 flex items-center justify-center text-slate-600 shadow-sm hover:bg-violet-700 hover:text-white hover:border-violet-700 hover:shadow-violet-500/25 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Photo + stats */}
          <div className={`relative flex flex-col items-center gap-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Photo */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-400/30 to-pink-400/20 rounded-full blur-xl"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-violet-300/30 animate-float">
                <img
                  fetchpriority="high"
                  alt={`Halil İbrahim Koçoğlu - ${language === 'tr' ? 'Full Stack Geliştirici' : 'Full Stack Developer'}`}
                  className="w-full h-full object-cover"
                  src="/profilepicture.webp"
                />
              </div>

              {/* Stats cards */}
              <div className="absolute -bottom-0 -left-0 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl font-extrabold text-violet-700">{t.stat1}</p>
                <p className="text-xs text-slate-500 font-medium">{t.stat1Label}</p>
              </div>
              <div className="absolute -top-0 -right-0 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl font-extrabold text-pink-600">{t.stat2}</p>
                <p className="text-xs text-slate-500 font-medium">{t.stat2Label}</p>
              </div>
            </div>

            {/* Bottom stat */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-2xl px-6 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">{t.stat3}</p>
                <p className="text-slate-500 text-xs">{t.stat3Label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
