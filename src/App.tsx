import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/common/CustomCursor';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animate-slide-up class
    document.querySelectorAll('.animate-slide-up').forEach((element) => {
      observer.observe(element);
    });

    // Add scroll progress handler
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, scrollPosition / windowHeight);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="relative min-h-screen bg-gray-300">
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #111827, #ffffff)',
          }}
        />

        <div 
          className="fixed inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(17, 24, 39, ${Math.min(1, scrollProgress * 1.5)}) 0%,
                rgba(17, 24, 39, ${Math.min(0.8, scrollProgress)}) 50%,
                rgba(0, 0, 0, ${Math.min(0.5, scrollProgress * 0.5)}) 100%
              )
            `,
            opacity: scrollProgress,
          }}
        />

        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at center,
              transparent ${70 - scrollProgress * 20}%,
              rgba(0, 0, 0, ${0.3 + scrollProgress * 0.4}) 100%
            )`,
          }}
        />

        <div className="relative z-10">
          <Navbar />
          <main className="overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}

export default App;