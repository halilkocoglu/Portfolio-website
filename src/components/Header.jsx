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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 transform ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-md shadow-xl py-3' 
          : 'bg-transparent py-5' 
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div
            className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent cursor-pointer tracking-wider hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection('hero')}
          >
            Portfolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-100 text-sm lg:text-base font-medium hover:text-white transition-colors duration-300 relative group"
              >
                {t[section]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            
            {/* Dil Seçici */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1.5 border border-purple-600/50 rounded-lg text-purple-400 text-sm font-semibold hover:bg-purple-900/20 transition-all duration-300 active:scale-95"
            >
              <Globe className="w-4 h-4 mr-2" /> 
              {language === 'en' ? 'TR' : 'EN'}
            </button>
          </div>

          {/* Mobil Menü Kontrolleri */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center h-10 px-3 border border-white/20 rounded-lg text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Globe className="w-4 h-4 mr-1.5" /> 
              {language === 'en' ? 'TR' : 'EN'}
            </button>
            
            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center h-10 w-10 bg-white text-slate-900 rounded-lg shadow-lg active:scale-90 transition-transform"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobil Menü Paneli */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-4 border border-white/5 shadow-2xl space-y-2">
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left text-gray-100 hover:text-white hover:bg-white/5 transition-all duration-300 py-3 px-4 rounded-xl font-medium"
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