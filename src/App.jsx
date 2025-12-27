import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage'; // Daha önce oluşturduğumuz bileşen

function App() {
  const [language, setLanguage] = useState('tr');
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // URL'deki path'i kontrol et (Örn: / veya /index.html dışında bir şey mi?)
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      setIs404(true);
    }
  }, []);

  // Eğer sayfa bulunamadıysa sadece ErrorPage döndür
  if (is404) {
    return <ErrorPage language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header language={language} setLanguage={setLanguage} />
      <main id='main-section'>
        <Hero language={language} />
        <About language={language} />
        <Experience language={language} />
        <Projects language={language} />
        <Skills language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <Toaster />
    </div>
  );
}

export default App;