import React, { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Rocket, MapPin } from 'lucide-react';

const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const About = ({ language }) => {
  const [headerRef, headerInView] = useInView();
  const [contentRef, contentInView] = useInView();

  const translations = {
    en: {
      title: "About Me",
      subtitle: "Professional Software Solutions in Aydın & Nazilli",
      description: "I am a Full-Stack Web Developer specialized in Java Spring Boot and React, providing professional digital services in the Nazilli and Aydın regions. Beyond writing code, I deliver end-to-end solutions ranging from corporate website design to scalable backend systems. My mission is to transform the business requirements of local and global brands into high-performance, SEO-friendly digital experiences.",
      highlights: [
        { icon: Code2, title: "Custom Development", description: "Tailor-made software solutions for your business needs." },
        { icon: Palette, title: "Modern UI/UX", description: "Responsive, mobile-friendly, and conversion-oriented designs." },
        { icon: Rocket, title: "SEO & Visibility", description: "Top rankings in local searches like 'Nazilli Web Design'." },
        { icon: MapPin, title: "Regional Support", description: "On-site and remote support for businesses in Aydın." }
      ]
    },
    tr: {
      title: "Hakkımda",
      subtitle: "Nazilli ve Aydın Bölgesinde Profesyonel Yazılım Çözümleri",
      description: "Java Spring Boot ve React teknolojilerinde uzmanlaşmış, Nazilli ve Aydın çevresinde profesyonel dijital hizmetler sunan bir Full-Stack Web Geliştiricisiyim. Sadece kod yazmakla kalmıyor, kurumsal web sitesi tasarımından ölçeklenebilir backend sistemlerine kadar uçtan uca çözümler üretiyorum. Amacım, yerel işletmelerin ve küresel markaların iş gereksinimlerini yüksek performanslı ve SEO uyumlu dijital deneyimlere dönüştürmektir.",
      highlights: [
        { icon: Code2, title: "Özel Yazılım", description: "İhtiyaçlarınıza yönelik butik ve ölçeklenebilir çözümler." },
        { icon: Palette, title: "Modern Tasarım", description: "Mobil uyumlu, şık ve kullanıcı odaklı arayüzler." },
        { icon: Rocket, title: "SEO & Görünürlük", description: "Google'da üst sıralarda yer alma hedefi." },
        { icon: MapPin, title: "Yerel Destek", description: "Aydın ve Nazilli içi yüz yüze görüşme ve hızlı destek." }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="about" className="py-20 md:py-28 px-1 sm:px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 transform ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
            {t.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <div className={`relative transition-all duration-700 delay-100 transform ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white">
              <img
                alt={language === 'tr' ? "Nazilli Aydın Web Tasarım" : "Web Design Aydın Nazilli"}
                className="w-full h-full object-cover aspect-video"
                src="/codingmonitors.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent"></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-4 bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-xl rounded-2xl px-5 py-3 hidden md:block">
              <p className="text-2xl font-extrabold text-violet-700">3+</p>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                {language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}
              </p>
            </div>
          </div>

          {/* Text + cards */}
          <div className={`transition-all duration-700 delay-200 transform ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {t.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-violet-300/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3 text-violet-700 border border-violet-200/50">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-slate-900 font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-snug">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
