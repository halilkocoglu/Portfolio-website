import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const About = ({ language }) => {
  const translations = {
    en: {
      title: "About Me",
      subtitle: "Professional Software Solutions & Web Design", 
      description: "I'm a dedicated Full-Stack Web Developer specialized in Java Spring Boot and React. Beyond writing code, I provide end-to-end digital solutions, from custom corporate website development to scalable backend systems. My goal is to transform complex business requirements into high-performance, SEO-friendly digital experiences.",
      highlights: [
        {
          icon: Code2,
          title: "Custom Development", 
          description: "Tailor-made software for your business needs"
        },
        {
          icon: Palette,
          title: "Modern UI/UX",
          description: "Responsive and conversion-oriented designs"
        },
        {
          icon: Rocket,
          title: "SEO Optimized", 
          description: "Ensuring high visibility on search engines"
        },
        {
          icon: Users,
          title: "Client-Focused", 
          description: "Dedicated support and effective communication"
        }
      ]
    },
    tr: {
      title: "Hakkımda",
      subtitle: "Profesyonel Yazılım Çözümleri ve Web Tasarım",
      description: "Java Spring Boot ve React teknolojilerinde uzmanlaşmış bir Full-Stack Web Geliştiricisiyim. Sadece kod yazmakla kalmıyor, kurumsal web sitesi yapımından ölçeklenebilir backend sistemlerine kadar uçtan uca dijital çözümler sunuyorum. Amacım, karmaşık iş gereksinimlerinizi yüksek performanslı ve SEO uyumlu dijital deneyimlere dönüştürmektir.",
      highlights: [
        {
          icon: Code2,
          title: "Özel Yazılım",
          description: "İş ihtiyaçlarınıza yönelik butik çözümler"
        },
        {
          icon: Palette,
          title: "Modern Tasarım",
          description: "Duyarlı ve kullanıcı odaklı arayüzler"
        },
        {
          icon: Rocket,
          title: "SEO Uyumluluk",
          description: "Arama motorlarında görünürlük artışı"
        },
        {
          icon: Users,
          title: "Müşteri Odaklı",
          description: "Kesintisiz destek ve şeffaf iletişim"
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-20"></div>
              <img alt={language === 'tr' ? "Modern web yazılım geliştirme ortamı" : "Modern software development workspace"} className="w-full h-full object-cover" src="/codingmonitors.jpeg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {t.highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;