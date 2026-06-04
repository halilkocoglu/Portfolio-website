import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Demos = lazy(() => import('./components/Demos'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));

function App() {
  const [language, setLanguage] = useState('tr');
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const validPaths = ['/', '/index.html'];
    if (!validPaths.includes(path)) {
      setIs404(true);
    }
  }, []);

  const LoadingFallback = () => (
    <div className="min-h-[200px] w-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (is404) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ErrorPage language={language} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 selection:bg-violet-500/20">
      <Header language={language} setLanguage={setLanguage} />

      <main id="main-section" className="flex flex-col min-h-screen">
        <Hero language={language} />
        <About language={language} />
        <Experience language={language} />
        <Suspense fallback={<LoadingFallback />}>
          <Projects language={language} />
          <Demos language={language} />
          <Skills language={language} />
          <Contact language={language} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer language={language} />
      </Suspense>

      <Toaster />
    </div>
  );
}

export default App;
