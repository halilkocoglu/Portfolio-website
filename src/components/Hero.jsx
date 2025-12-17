import React from 'react';
import { motion } from 'framer-motion';
import {   Mail, Download } from 'lucide-react';
import  GithubIcon  from '../assets/GithubIcon';
import  LinkedinIcon  from '../assets/LinkedinIcon';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const Hero = ({ language }) => {
  const translations = {
    en: {
      greeting: "Hi, I'm",
      name: "Halil İbrahim Koçoğlu",
      title: "Full Stack Web Developer",
      description: "I create beautiful and functional web experiences with modern technologies.",
      viewProjects: "View My Work",
      downloadCV: "Download CV"
    },
    tr: {
      greeting: "Merhaba, Ben",
      name: "Halil İbrahim Koçoğlu",
      title: "Full Stack Web Geliştirici",
      description: "Modern teknolojilerle güzel ve işlevsel web deneyimleri oluşturuyorum.",
      viewProjects: "Çalışmalarımı Görüntüle",
      downloadCV: "CV İndir"
    }
  };

  const t = translations[language];

  const handleDownloadCV = () => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-purple-400 text-lg"
            >
              {t.greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
            >
              {t.name}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-semibold text-gray-300"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg max-w-lg"
            >
              {t.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={scrollToProjects}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-6 text-lg"
              >
                {t.viewProjects}
              </Button>
              <Button
                onClick={handleDownloadCV}
                variant="custom-bg"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                {t.downloadCV}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              {[
                { icon: GithubIcon, href: 'https://github.com/halilkocoglu' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/halilkocoglu/' },
                { icon: Mail, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-400/30">
                <img alt="Professional web developer portrait" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1603969409447-ba86143a03f6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;