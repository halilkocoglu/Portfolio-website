import React from 'react';
import { Mail, Heart } from 'lucide-react';
import GithubIcon from '../assets/GithubIcon';
import LinkedinIcon from '../assets/LinkedinIcon';

const Footer = ({ language }) => {
  const translations = {
    en: {
      rights: "All rights reserved. | Professional Web Design & Software Solutions",
      madeWith: "Crafted with",
      by: "Halil İbrahim Koçoğlu"
    },
    tr: {
      rights: "Tüm hakları saklıdır. | Profesyonel Web Tasarım ve Yazılım Çözümleri",
      madeWith: "ile geliştirildi",
      by: "Halil İbrahim Koçoğlu"
    }
  };

  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[100] w-full bg-footer border-t border-purple-500/20 py-10 px-4 mt-auto">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Sol Kısım: Telif Hakları */}
          <div className="text-center md:text-left">
            <p className="text-gray-200 text-sm md:text-base">
              © {currentYear} <span className="text-purple-400 font-semibold">Portfolio</span>. {t.rights}
            </p>
            <div className="text-gray-300 text-sm mt-2 flex items-center justify-center md:justify-start gap-1">
              {language === "en" ? (
                <p>{t.madeWith} <Heart className="inline w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> {t.by}</p>
              ) : (
                <p>{t.by} <Heart className="inline w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> {t.madeWith}</p>
              )}
            </div>
          </div>

          {/* Sağ Kısım: Sosyal Medya */}
          <div className="flex items-center gap-5">
            {[
              { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/halilkocoglu' },
              { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/halilkocoglu/' },
              { icon: Mail, label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=halilkocoglu98@gmail.com' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-white transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:-translate-y-1 shadow-lg"
                aria-label={social.label}
              >
                <social.icon size={20} className="transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;