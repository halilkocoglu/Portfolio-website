import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Copy } from 'lucide-react';
import { toast } from './ui/use-toast';

const Contact = ({ language }) => {
  

  const translations = {
    en: {
      title: "Get in Touch", 
      subtitle: "Web Design & Software Solutions in Aydın & Nazilli",
      contactInfo: [
        {
          icon: Mail,
          label: "Email",
          value: "halilkocoglu98@gmail.com",
          copyable: true
        },
        {
          icon: Phone,
          label: "Phone",
          value: "+90 533 947 52 17",
          copyable: true
        },
        {
          icon: MapPin,
          label: "Location",
          value: "Nazilli / Aydın, Turkey",
          copyable: false
        }
      ]
    },
    tr: {
      title: "İletişime Geçin",
      subtitle: "Nazilli ve Aydın Bölgesinde Web Tasarım & Yazılım Çözümleri",
      contactInfo: [
        {
          icon: Mail,
          label: "E-posta",
          value: "halilkocoglu98@gmail.com",
          copyable: true
        },
        {
          icon: Phone,
          label: "Telefon",
          value: "+90 533 947 52 17",
          copyable: true
        },
        {
          icon: MapPin,
          label: "Konum",
          value: "Nazilli / Aydın, Türkiye",
          copyable: false
        }
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
    <section id="contact" className="py-10 md:py-20 md:px-4">
      <div className="container mx-auto px-1 md:px-auto">
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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 w-full" // w-full ile genişliği sabitledik
          >
            <div className="space-y-4 md:space-y-6">
              {t.contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleCopy(info.value, info.copyable)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  // overflow-hidden ve w-full eklendi
                  className={`flex items-center gap-5 px-2 py-5 rounded-2xl border transition-all duration-300 shadow-xl ${
                  info.copyable 
                    ? 'bg-slate-900/40 border-white/5 hover:border-purple-500/50 cursor-pointer group' 
                    : 'bg-slate-950/20 border-white/5 cursor-default'
                }`}
                >
                  {/* İkon Kutusu: Boyutu mobilde biraz küçülttük */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>

                  {/* Metin Alanı: min-w-0 ve flex-1 taşmayı önler */}
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-400 text-xs md:text-sm">{info.label}</p>
                    <p className="text-white font-semibold text-sm md:text-base break-words md:break-normal leading-tight">
                      {info.value}
                    </p>
                  </div>
                  {info.copyable && (
                    <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Copy size={18} className="text-purple-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Görsel Alanı: Mobilde daha makul bir yükseklik (h-48) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10"
          >
            <img 
              alt="Contact us illustration" 
              className="w-full h-full object-cover" 
              src="/contact.webp" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;