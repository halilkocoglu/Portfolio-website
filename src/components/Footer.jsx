import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { toast } from './ui/use-toast';
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
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-purple-500/20 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400">
              © {currentYear} Portfolio. {t.rights}
            </p>
            {language === "en" ?
            <p className="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
              {t.madeWith} <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> {t.by}
            </p>
            :
            <p className="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
              {t.by} <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> {t.madeWith}
            </p>
            }
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {[
              { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/halilkocoglu' },
              { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/halilkocoglu/' },
              { icon: Mail, label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=halilkocoglu98@gmail.com' }
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;