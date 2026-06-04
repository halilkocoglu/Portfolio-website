import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import { toast } from './ui/use-toast';

const useInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const iconStyle = {
  Mail: 'bg-violet-100 text-violet-700 border-violet-200/60',
  Phone: 'bg-pink-100 text-pink-700 border-pink-200/60',
  MapPin: 'bg-emerald-100 text-emerald-700 border-emerald-200/60',
};

const Contact = ({ language }) => {
  const [headerRef, headerInView] = useInView();
  const [contentRef, contentInView] = useInView();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const translations = {
    en: {
      title: "Get in Touch",
      subtitle: "Web Design & Software Solutions in Aydın & Nazilli",
      contactInfo: [
        { icon: Mail,   label: "Email",    value: "halilkocoglu98@gmail.com", copyable: true  },
        { icon: Phone,  label: "Phone",    value: "+90 533 947 52 17",        copyable: true  },
        { icon: MapPin, label: "Location", value: "Nazilli / Aydın, Turkey",  copyable: false }
      ]
    },
    tr: {
      title: "İletişime Geçin",
      subtitle: "Nazilli ve Aydın Bölgesinde Web Tasarım & Yazılım Çözümleri",
      contactInfo: [
        { icon: Mail,   label: "E-posta",  value: "halilkocoglu98@gmail.com", copyable: true  },
        { icon: Phone,  label: "Telefon",  value: "+90 533 947 52 17",        copyable: true  },
        { icon: MapPin, label: "Konum",    value: "Nazilli / Aydın, Türkiye", copyable: false }
      ]
    }
  };

  const t = translations[language];

  const handleCopy = (value, isCopyable, index) => {
    if (!isCopyable) return;
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({
      title: language === 'tr' ? "Kopyalandı" : "Copied",
      description: value,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-0  md:px-4 overflow-hidden bg-white/30">
      <div className="container p-5 mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 transform ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block px-1 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
            {t.subtitle}
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        <div
          ref={contentRef}
          className={`grid md:grid-cols-2 gap-8 lg:gap-14 items-start transition-all duration-700 delay-100 transform ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Contact cards */}
          <div className="space-y-4 ">
            {t.contactInfo.map((info, index) => {
              const colorClass = iconStyle[info.icon.displayName || info.icon.name] || iconStyle.Mail;
              return (
                <div
                  key={index}
                  onClick={() => handleCopy(info.value, info.copyable, index)}
                  className={`flex items-center gap-4 p-2 md:p-5 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 ${
                    info.copyable
                      ? 'border-slate-200/60 hover:border-violet-300 hover:shadow-md cursor-pointer group hover:-translate-y-0.5'
                      : 'border-slate-200/40 cursor-default'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                    <info.icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="text-slate-900 font-semibold text-sm md:text-base truncate">{info.value}</p>
                  </div>

                  {info.copyable && (
                    <div className="flex-shrink-0 text-slate-400 group-hover:text-violet-600 transition-colors">
                      {copiedIndex === index
                        ? <Check size={16} className="text-emerald-500" />
                        : <Copy size={16} />
                      }
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className="relative h-50 md:h-80 lg:h-[380px] rounded-3xl overflow-hidden shadow-xl shadow-slate-300/30 border border-white">
            <img
              loading="lazy"
              alt={language === 'tr' ? "Halil İbrahim Koçoğlu İletişim" : "Contact Halil İbrahim Koçoğlu"}
              className="w-full h-full object-cover"
              src="/contact.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
