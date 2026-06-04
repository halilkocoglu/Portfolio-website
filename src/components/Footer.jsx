import { Mail, Heart } from 'lucide-react';
import GithubIcon from '../assets/GithubIcon';
import LinkedinIcon from '../assets/LinkedinIcon';

const Footer = ({ language }) => {
  const translations = {
    en: {
      rights: "All rights reserved.",
      tagline: "Professional Web Design & Software Solutions",
      madeWith: "Crafted with",
      by: "Halil İbrahim Koçoğlu"
    },
    tr: {
      rights: "Tüm hakları saklıdır.",
      tagline: "Profesyonel Web Tasarım ve Yazılım Çözümleri",
      madeWith: "ile geliştirildi",
      by: "Halil İbrahim Koçoğlu"
    }
  };

  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[100] w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/60 py-10 px-1 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">
            <p className="text-slate-700 text-sm font-medium">
              © {currentYear}{' '}
              <span className="bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent font-bold">
                Halil.dev
              </span>
              {' '}— {t.rights}
            </p>
            <p className="text-slate-400 text-xs mt-1">{t.tagline}</p>
            <div className="text-slate-400 text-xs mt-2 flex items-center justify-center md:justify-start gap-1">
              {language === "en"
                ? <span>{t.madeWith} <Heart className="inline w-3 h-3 text-pink-500 fill-pink-500" /> {t.by}</span>
                : <span>{t.by} <Heart className="inline w-3 h-3 text-pink-500 fill-pink-500" /> {t.madeWith}</span>
              }
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: GithubIcon,   label: 'GitHub',   href: 'https://github.com/halilkocoglu' },
              { icon: LinkedinIcon, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/halilkocoglu/' },
              { icon: Mail,         label: 'Email',     href: 'https://mail.google.com/mail/?view=cm&fs=1&to=halilkocoglu98@gmail.com' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-violet-700 hover:text-white hover:border-violet-700 hover:-translate-y-1 transition-all duration-200 shadow-sm"
              >
                <social.icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
