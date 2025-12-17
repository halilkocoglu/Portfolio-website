import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  // Resimdeki görünüme uyacak şekilde stil güncellemeleri yapıldı
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent' 
      }`}
    >
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          
          {/* Logo/Başlık */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent cursor-pointer tracking-wider"
            onClick={() => scrollToSection('hero')}
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation (Değişmedi) */}
          <div className="hidden md:flex items-center gap-8">
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-300 text-base font-medium hover:text-white transition-colors duration-300 relative group"
              >
                {t[section]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            
            <div
              onClick={toggleLanguage}
              className="flex items-center p-1.5 cursor-pointer 
                         border border-solid border-purple-600 
                         rounded-md text-purple-400 text-sm font-semibold
                         hover:bg-purple-900/30 transition-all duration-200"
            >
              <Globe className="w-4 h-4 mr-1.5" /> 
              {language === 'en' ? 'TR' : 'EN'}
            </div>
          </div>

          {/* ****************************************************** */}
          {/* Mobil Menü Butonu BLOĞU (Düzeltilen Kısım) */}
          {/* ****************************************************** */}
          <div className="md:hidden flex items-center gap-4">
            
            {/* Dil Değiştirme Düğmesi Stili - Görseldeki gibi sade ve çerçeveli olmalı */}
            {/* Beyaz ikon ve TR metni için text-white kullandık. */}
            <div
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 cursor-pointer 
                         border border-solid border-white/80 rounded 
                         text-white text-base font-semibold transition-all duration-200
                         h-9" // Yüksekliği sabit tutarak hizalama sorununu çözdük
            >
              <Globe className="w-5 h-5" /> 
              <span className="ml-1.5">{language === 'en' ? 'TR' : 'EN'}</span>
            </div>
            
            {/* Mobil Menü Açma/Kapama - Görseldeki gibi sade, arka planı gri/beyaz */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 bg-white p-2 rounded 
                         flex items-center justify-center 
                         h-9 w-9" // Dil düğmesiyle aynı yüksekliği verdik
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* ****************************************************** */}

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 bg-slate-800/95 backdrop-blur-md rounded-lg p-4 space-y-4"
          >
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 py-2"
              >
                {t[section]}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;