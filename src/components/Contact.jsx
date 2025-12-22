import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from './ui/use-toast';

const Contact = ({ language }) => {
  

  const translations = {
    en: {
      title: "Contact For Web Solutions", 
      subtitle: "Professional Web Design & Software Development Services",
      contactInfo: [
        {
          icon: Mail,
          label: "Email",
          value: "halilkocoglu98@gmail.com"
        },
        {
          icon: Phone,
          label: "Direct Phone",
          value: "+90 533 947 52 17"
        },
        {
          icon: MapPin,
          label: "Service Area",
          value: "Aydın, Turkey (Remote & On-site)"
        }
      ]
    },
    tr: {
      title: "Yazılım Çözümleri İçin İletişim",
      subtitle: "Profesyonel Web Tasarım ve Yazılım Geliştirme Hizmetleri",
      contactInfo: [
        {
          icon: Mail,
          label: "E-posta",
          value: "halilkocoglu98@gmail.com"
        },
        {
          icon: Phone,
          label: "Telefon",
          value: "+90 533 947 52 17"
        },
        {
          icon: MapPin,
          label: "Hizmet Bölgesi",
          value: "Aydın, Türkiye (Uzaktan & Yerinde)"
        }
      ]
    }
  };

  const t = translations[language];


  const handleCopy = (value, label) => {
    if(label !== "Service Area" && label !== "Hizmet Bölgesi") {
      navigator.clipboard.writeText(value);
      toast({
        title: language === 'tr' ? "🚧 Kopyalandı! 🚧" : "🚧 Copied! 🚧",
        description: language === 'tr' ? `🚀 "${value}" panoya kopyalandı. 🚀` : `🚀 "${value}" copied to clipboard.🚀`
      });
    }
};

  return (
    <section id="contact" className="py-20 px-4">
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

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-6 ">
              {t.contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleCopy(info.value,info.label)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{scale: 0.98 }}
                  className="flex items-center gap-4 bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-0 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{info.label}</p>
                    <p className="text-white font-semibold">{info.value}</p>
                    {(info.label !== "Service Area" && info.label !== "Hizmet Bölgesi") && <p className="text-white text-muted text-xs">{language === 'tr' ? 'Kopyalamak için tıklayın' : 'Click to copy'}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            
          </motion.div>
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative h-64 rounded-2xl overflow-hidden"
            >
              <img alt="Contact us illustration" className="w-full h-full object-cover" src="/contact.webp" />
            </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;