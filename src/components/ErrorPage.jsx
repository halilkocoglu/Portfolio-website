import React from 'react';
import { Home, ArrowLeft, Zap } from 'lucide-react';
import { Button } from './ui/button';

const Modern404 = ({ language = 'tr' }) => {
  const translations = {
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
  };

  const t = translations[language] || translations.tr;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] overflow-hidden px-6 selection:bg-purple-500/30">
      
      {/* 1. Optimize Arka Plan Işımaları: CSS Animasyonları ile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-pink-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* 2. Sabit Grid Katmanı */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <main className="relative z-10 w-full max-w-2xl text-center animate-in fade-in zoom-in duration-700">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-lg shadow-purple-500/10">
          <Zap size={12} className="fill-current animate-bounce" />
          {t.status}
        </div>

        {/* 404 Sayı Bölümü */}
        <div className="relative mb-6 select-none">
          <h1 className="text-[clamp(8rem,20vw,14rem)] font-extrabold leading-none tracking-tighter transition-all duration-700">
            {/* Gölgeli Katman */}
            <span className="bg-gradient-to-b from-white via-white to-transparent text-transparent bg-clip-text opacity-5 blur-md absolute inset-0 translate-y-3">404</span>
            {/* Ana Katman */}
            <span className="bg-gradient-to-b from-white via-purple-100 to-purple-500/40 text-transparent bg-clip-text relative inline-block animate-[wiggle_6s_ease-in-out_infinite]">404</span>
          </h1>
        </div>

        {/* Metin İçeriği */}
        <header className="space-y-4 mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-slate-200 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            {t.desc}
          </p>
        </header>

        {/* Aksiyon Butonları */}
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => (window.location.href = '/')}
            className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-white text-[#020617] hover:bg-purple-600 hover:text-white transition-all duration-300 px-8 py-7 text-base font-bold shadow-xl shadow-white/5 active:scale-95"
          >
            <Home className="h-5 w-5 mr-2 inline-block transition-transform group-hover:-translate-y-1" />
            {t.btnHome}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto rounded-xl px-8 py-7 text-base border-slate-800 bg-transparent text-slate-100 hover:bg-slate-900 hover:border-purple-500/50 transition-all active:scale-95"
          >
            <ArrowLeft className="mr-2 h-5 w-5 inline-block transition-transform group-hover:-translate-x-1" />
            {t.btnBack}
          </Button>
        </nav>
      </main>

      {/* Alt Dekoratif Eleman (Koordinatlar) */}
      <footer className="absolute bottom-10 left-10 hidden xl:block pointer-events-none opacity-30 select-none">
        <div className="flex items-center gap-4 text-slate-300 font-mono text-[10px] rotate-90 origin-left">
          <span className="tracking-[0.3em]">COORD: 37.7749 N</span>
          <div className="w-10 h-px bg-slate-800" />
          <span>ST: RED_ALERT</span>
        </div>
      </footer>
    </div>
  );
};

export default Modern404;