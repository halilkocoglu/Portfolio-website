import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Users, MapPin } from 'lucide-react';

const About = ({ language }) => {
  const translations = {
    en: {
      title: "About Me",
      subtitle: "Professional Software Solutions in Aydın & Nazilli", 
      description: "I am a Full-Stack Web Developer specialized in Java Spring Boot and React, providing professional digital services in the Nazilli and Aydın regions. Beyond writing code, I deliver end-to-end solutions ranging from corporate website design to scalable backend systems. My mission is to transform the business requirements of local and global brands into high-performance, SEO-friendly digital experiences.",
      highlights: [
        {
          icon: Code2,
          title: "Custom Development", 
          description: "Tailor-made software solutions for your business needs."
        },
        {
          icon: Palette,
          title: "Modern UI/UX",
          description: "Responsive, mobile-friendly, and conversion-oriented designs."
        },
        {
          icon: Rocket,
          title: "SEO & Visibility", 
          description: "Top rankings in local searches like 'Nazilli Web Design'."
        },
        {
          icon: Users,
          title: "Regional Support", 
          description: "On-site and remote support for businesses in Aydın."
        }
      ]
    },
    tr: {
      title: "Hakkımda",
      subtitle: "Nazilli ve Aydın Bölgesinde Profesyonel Yazılım Çözümleri",
      description: "Java Spring Boot ve React teknolojilerinde uzmanlaşmış, Nazilli ve Aydın çevresinde profesyonel dijital hizmetler sunan bir Full-Stack Web Geliştiricisiyim. Sadece kod yazmakla kalmıyor, kurumsal web sitesi tasarımından ölçeklenebilir backend sistemlerine kadar uçtan uca çözümler üretiyorum. Amacım, Aydın ve Nazilli'deki yerel işletmelerin ve küresel markaların iş gereksinimlerini yüksek performanslı ve SEO uyumlu dijital deneyimlere dönüştürmektir.",
      highlights: [
        {
          icon: Code2,
          title: "Özel Yazılım",
          description: "İhtiyaçlarınıza yönelik butik ve ölçeklenebilir çözümler."
        },
        {
          icon: Palette,
          title: "Modern Tasarım",
          description: "Mobil uyumlu, şık ve kullanıcı odaklı arayüzler."
        },
        {
          icon: Rocket,
          title: "SEO & Görünürlük",
          description: "Arama motorlarında (Google) üst sıralarda yer alma garantisi."
        },
        {
          icon: MapPin, // İkonu MapPin olarak güncelledim
          title: "Yerel Destek",
          description: "Aydın ve Nazilli içi yüz yüze görüşme ve hızlı destek."
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent italic">
            {t.title}
          </h2>
          <p className="text-purple-400 font-mono text-sm md:text-lg tracking-widest uppercase">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Görsel Alanı */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                alt={language === 'tr' ? "Nazilli Aydın Web Tasarım Ofisi" : "Web Design Agency Aydın"} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                src="/codingmonitors.webp" 
              />
            </div>
            
            {/* Küçük bir yüzen bilgi kartı (Social Proof) */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-purple-500/30 p-4 rounded-xl hidden md:block z-20 backdrop-blur-xl">
              <p className="text-white font-bold text-xl leading-none">5+</p>
              <p className="text-gray-400 text-xs uppercase tracking-tighter">
                {language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}
              </p>
            </div>
          </motion.div>

          {/* Metin Alanı */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              {t.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.highlights.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-slate-900/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-purple-500/40 transition-all shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold mb-1 tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.description}</p>
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