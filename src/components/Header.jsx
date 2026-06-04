import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Header = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const translations = {
    en: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    tr: {
      about: 'Hakkımda',
      experience: 'Deneyim',
      projects: 'Projeler',
      skills: 'Yetenekler',
      contact: 'İletişim'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'tr' : 'en');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/60 border-b border-slate-200/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-1 sm:px-4">
        <div className="flex items-center justify-between">

          <div
            className="text-xl font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent cursor-pointer tracking-tight hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('hero')}
          >
            Halil.dev
          </div>

          <div className="hidden md:flex items-center gap-7">
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-slate-600 text-sm font-medium hover:text-violet-700 transition-colors duration-200 relative group"
              >
                {t[section]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}

            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1.5 border border-violet-300/70 rounded-lg text-violet-700 text-sm font-semibold hover:bg-violet-50 transition-all duration-200 active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 mr-1.5" />
              {language === 'en' ? 'TR' : 'EN'}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center h-9 px-3 border border-violet-300/60 rounded-lg text-violet-700 text-sm font-semibold hover:bg-violet-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 mr-1" />
              {language === 'en' ? 'TR' : 'EN'}
            </button>

            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center h-9 w-9 bg-violet-700 text-white rounded-lg shadow-md shadow-violet-500/30 active:scale-90 transition-transform"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/60 shadow-xl shadow-slate-200/40 space-y-1">
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left text-slate-700 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200 py-3 px-4 rounded-xl font-medium text-sm"
              >
                {t[section]}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
