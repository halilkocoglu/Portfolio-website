import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const About = ({ language }) => {
  const translations = {
    en: {
      title: "About Me",
      subtitle: "Passionate about creating digital experiences",
      description: "I'm a dedicated full-stack web developer with a passion for creating elegant solutions to complex problems. With years of experience in modern web technologies, I specialize in building responsive, user-friendly applications that make a difference.",
      highlights: [
        {
          icon: Code2,
          title: "Clean Code",
          description: "Writing maintainable and scalable code"
        },
        {
          icon: Palette,
          title: "Creative Design",
          description: "Crafting beautiful user interfaces"
        },
        {
          icon: Rocket,
          title: "Performance",
          description: "Optimizing for speed and efficiency"
        },
        {
          icon: Users,
          title: "Collaboration",
          description: "Working effectively in teams"
        }
      ]
    },
    tr: {
      title: "Hakkımda",
      subtitle: "Dijital deneyimler yaratma tutkusu",
      description: "Karmaşık problemlere zarif çözümler üretme tutkusuyla çalışan full stack web geliştiricisiyim. Modern web teknolojilerinde yıllarca deneyimle, fark yaratan duyarlı ve kullanıcı dostu uygulamalar geliştirme konusunda uzmanım.",
      highlights: [
        {
          icon: Code2,
          title: "Temiz Kod",
          description: "Sürdürülebilir ve ölçeklenebilir kod yazımı"
        },
        {
          icon: Palette,
          title: "Yaratıcı Tasarım",
          description: "Güzel kullanıcı arayüzleri tasarlama"
        },
        {
          icon: Rocket,
          title: "Performans",
          description: "Hız ve verimlilik optimizasyonu"
        },
        {
          icon: Users,
          title: "İşbirliği",
          description: "Takımlarda etkili çalışma"
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
              <img alt="Developer workspace with multiple monitors" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1484093609847-d2cc4eaea2cc" />
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