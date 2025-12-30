import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Copy } from 'lucide-react';
import { toast } from './ui/use-toast';

const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const Contact = ({ language }) => {
  const [headerRef, headerInView] = useInView();
  const [contentRef, contentInView] = useInView();

  const translations = {
    en: {
      title: "Get in Touch", 
      subtitle: "Web Design & Software Solutions in Aydın & Nazilli",
      contactInfo: [
        { icon: Mail, label: "Email", value: "halilkocoglu98@gmail.com", copyable: true },
        { icon: Phone, label: "Phone", value: "+90 533 947 52 17", copyable: true },
        { icon: MapPin, label: "Location", value: "Nazilli / Aydın, Turkey", copyable: false }
      ]
    },
    tr: {
      title: "İletişime Geçin",
      subtitle: "Nazilli ve Aydın Bölgesinde Web Tasarım & Yazılım Çözümleri",
      contactInfo: [
        { icon: Mail, label: "E-posta", value: "halilkocoglu98@gmail.com", copyable: true },
        { icon: Phone, label: "Telefon", value: "+90 533 947 52 17", copyable: true },
        { icon: MapPin, label: "Konum", value: "Nazilli / Aydın, Türkiye", copyable: false }
      ]
    }
  };

  const t = translations[language];

  const handleCopy = (value, isCopyable) => {
    if (isCopyable) {
      navigator.clipboard.writeText(value);
      toast({
        title: language === 'tr' ? "Başarıyla Kopyalandı" : "Copied Successfully",
        description: value,
      });
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 px-2 md:px-4 relative min-h-[600px] w-full bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Başlık Alanı */}
        <div
          ref={headerRef}
          className={`text-center mb-10 md:mb-16 transition-all duration-1000 transform ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* İçerik Grid */}
        <div 
          ref={contentRef} 
          className={`grid md:grid-cols-2 gap-6 lg:gap-12 items-start transition-all duration-1000 delay-200 transform ${
            contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Sol: Kartlar */}
          <div className="space-y-4 w-full max-w-full overflow-hidden">
            {t.contactInfo.map((info, index) => (
              <div
                key={index}
                onClick={() => handleCopy(info.value, info.copyable)}
                className={`flex items-center gap-3 md:gap-5 p-4 md:p-5 rounded-2xl border transition-all duration-300 shadow-xl active:scale-95 w-full ${
                  info.copyable 
                    ? 'bg-slate-900/60 border-white/5 hover:border-purple-500/50 cursor-pointer group hover:scale-[1.01]' 
                    : 'bg-slate-950/40 border-white/5 cursor-default'
                }`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-gray-200 text-[10px] md:text-sm uppercase tracking-wider">{info.label}</p>
                  <p className="text-white font-semibold text-sm md:text-base truncate md:whitespace-normal break-all md:break-words leading-tight">
                    {info.value}
                  </p>
                </div>
                
                {info.copyable && (
                  <div className="flex-shrink-0">
                    <Copy size={16} className="text-purple-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sağ: Görsel */}
          <div className="relative h-56 md:h-80 lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              loading="lazy"
              alt={language === 'tr' ? "Halil İbrahim Koçoğlu İletişim" : "Contact Halil İbrahim Koçoğlu"} 
              className="w-full h-full object-cover object-center" 
              src="/contact.webp" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:via-slate-950/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;