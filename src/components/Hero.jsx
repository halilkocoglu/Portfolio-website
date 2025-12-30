import React, { useEffect, useState } from 'react';
import { Mail, Download } from 'lucide-react';
import GithubIcon from '../assets/GithubIcon';
import LinkedinIcon from '../assets/LinkedinIcon';
import { Button } from './ui/button';

const Hero = ({ language }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde animasyonları başlat
    setIsLoaded(true);
  }, []);

  const translations = {
    en: {
      greeting: "Hi, I'm",
      name: "Halil İbrahim Koçoğlu",
      title: "Full Stack Web Developer & Software Solutions", 
      description: "I specialize in building high-performance web applications and custom corporate websites using modern technologies like React and Spring Boot.",
      viewProjects: "View My Projects",
      downloadCV: "Download CV"
    },
    tr: {
      greeting: "Merhaba, Ben",
      name: "Halil İbrahim Koçoğlu",
      title: "Full Stack Web Geliştirici & Yazılım Çözümleri", 
      description: "Modern teknolojilerle yüksek performanslı web uygulamaları ve ihtiyaca özel kurumsal web sitesi çözümleri sunuyorum.",
      viewProjects: "Projelerimi İnceleyin",
      downloadCV: "CV İndir"
    }
  };

  const t = translations[language];

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ortak animasyon sınıfları
  const animateIn = (delay) => `transition-all duration-1000 transform ${
    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  } ${delay}`;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Sol İçerik */}
          <div className="space-y-6 z-10">
            <p className={`text-purple-400 text-lg font-medium ${animateIn('delay-100')}`}>
              {t.greeting}
            </p>
            
            <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight ${animateIn('delay-300')}`}>
              {t.name}
            </h1>
            
            <h2 className={`text-2xl md:text-4xl font-semibold text-white ${animateIn('delay-500')}`}>
              {t.title}
            </h2>
            
            <p className={`text-white text-lg max-w-lg leading-relaxed ${animateIn('delay-700')}`}>
              {t.description}
            </p>
            
            <div className={`flex flex-wrap gap-4 pt-4 ${animateIn('delay-1000')}`}>
              <Button
                onClick={scrollToProjects}
                className="bg-gradient-to-r  from-purple-500 to-pink-600 hover:scale-105 transition-transform text-white px-8 py-8 md:py-6 text-lg rounded-xl shadow-lg shadow-purple-500/20"
              >
                {t.viewProjects}
              </Button>
              
              <a
                href={language === 'tr' ? '/Halil_Ibrahim_Kocoglu_TR.pdf' : '/Halil_Ibrahim_Kocoglu_EN.pdf'}
                download={`Halil_Ibrahim_Kocoglu_CV_${language.toUpperCase()}.pdf`}
                className="inline-block group"
              >
                <Button
                  variant="outline"
                  className="border-purple-400/50 text-white hover:bg-purple-400 hover:text-white px-8 py-8 md:py-6 text-lg rounded-xl transition-all group-hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.downloadCV}
                </Button>
              </a>
            </div>

            {/* Sosyal Medya */}
            <div className={`flex gap-4 pt-6 ${animateIn('delay-[1200ms]')}`}>
              {[
                { icon: GithubIcon, href: 'https://github.com/halilkocoglu', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/halilkocoglu/', label: 'LinkedIn' },
                { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=halilkocoglu98@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center text-white hover:bg-purple-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Sağ Görsel Alanı */}
          <div className={`relative flex justify-center items-center ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} transition-all duration-1000 delay-500`}>
            {/* Arka plan parlaması - CSS Animation ile */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
            
            <div className="relative w-full aspect-square max-w-[450px]">
              {/* Dekoratif Çerçeve */}
              <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full rotate-6 group-hover:rotate-12 transition-transform duration-1000"></div>
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                <img 
                  fetchpriority="high"
                  alt={`Halil İbrahim Koçoğlu - ${language === 'tr' ? 'Yazılım Çözümleri' : 'Full Stack Developer'}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  src="/profilepicture.webp" 
                />
              </div>

              {/* Float eden teknoloji etiketleri gibi ekstra detaylar eklenebilir */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;