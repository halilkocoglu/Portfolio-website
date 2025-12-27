import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Zap } from 'lucide-react';
import { Button } from './ui/button'; // Path'i projenize göre güncelleyin

// Animasyon varyantlarını bileşen dışına taşıyarak her render'da yeniden hesaplanmasını engelliyoruz
const glowVariants = {
  animate: (i) => ({
    scale: i === 0 ? [1, 1.2, 1] : [1.2, 1, 1.2],
    opacity: i === 0 ? [0.15, 0.25, 0.15] : [0.1, 0.2, 0.1],
    transition: {
      duration: i === 0 ? 8 : 10,
      repeat: Infinity,
      ease: "easeInOut",
    }
  })
};

const Modern404 = ({ language = 'tr' }) => {
  // Dil içeriklerini useMemo ile sarmalayarak gereksiz hesaplamadan kaçınıyoruz
  const content = useMemo(() => ({
    tr: {
      title: "Yörüngeden Çıktık.",
      desc: "Aradığınız sayfa kara delik tarafından yutulmuş olabilir.",
      btnHome: "Üsse Dön",
      btnBack: "Geri Git",
      status: "SİSTEM HATASI"
    },
    en: {
      title: "Off the Orbit.",
      desc: "The page you seek has been swallowed by a black hole.",
      btnHome: "Back to Base",
      btnBack: "Go Back",
      status: "SYSTEM ERROR"
    }
  }), []);

  const t = content[language] || content.tr;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] overflow-hidden px-6 selection:bg-purple-500/30">
      
      {/* 1. Optimize Arka Plan Işımaları: will-change-transform eklenerek GPU kullanımı teşvik edilir */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          custom={0}
          variants={glowVariants}
          animate="animate"
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-600 blur-[150px] rounded-full will-change-transform" 
        />
        <motion.div 
          custom={1}
          variants={glowVariants}
          animate="animate"
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-pink-600 blur-[150px] rounded-full will-change-transform" 
        />
      </div>

      {/* 2. Sabit Grid Katmanı: CSS ile maskeleme performansı */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Zap size={12} className="fill-current" />
          {t.status}
        </div>

        {/* 404 Hero Bölümü */}
        <div className="relative mb-6 select-none">
          <motion.h1 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[clamp(8rem,20vw,14rem)] font-bold leading-none tracking-tighter"
          >
            <span className="bg-gradient-to-b from-white via-white to-transparent text-transparent bg-clip-text opacity-5 blur-md absolute inset-0 translate-y-2">404</span>
            <span className="bg-gradient-to-b from-white via-purple-100 to-purple-500/40 text-transparent bg-clip-text relative">404</span>
          </motion.h1>
        </div>

        {/* Metin İçeriği */}
        <header className="space-y-4 mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            {t.desc}
          </p>
        </header>

        {/* Aksiyon Butonları */}
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => (window.location.href = '/')}
            className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-slate-50 text-[#020617] hover:text-white transition-colors px-8 py-6 text-base font-bold"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="h-5 w-5" />
              {t.btnHome}
            </span>
            <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto rounded-xl px-8 py-6 text-base border-slate-800 bg-transparent text-slate-300 hover:bg-slate-900 hover:border-purple-500/50 transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            {t.btnBack}
          </Button>
        </nav>
      </motion.main>

      {/* Alt Dekoratif Elemanlar */}
      <footer className="absolute bottom-10 left-10 hidden xl:block pointer-events-none opacity-30 select-none">
        <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] rotate-90 origin-left">
          <span className="tracking-[0.3em]">COORD: 37.7749 N</span>
          <div className="w-10 h-px bg-slate-800" />
          <span>ST: RED_ALERT</span>
        </div>
      </footer>
    </div>
  );
};

export default Modern404;