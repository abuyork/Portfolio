import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/common/CustomCursor';
import { ChevronsUp } from 'lucide-react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [, setLastScrollY] = useState(0);

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

    // Modified scroll handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, currentScrollY / windowHeight);
      setScrollProgress(progress);

      // Show navbar only when at the very top
      setShowNavbar(currentScrollY < 50);
      setLastScrollY(currentScrollY);
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
          {/* Conditionally render Navbar */}
          {showNavbar && <Navbar />}
          
          {/* Updated scroll-to-top button with premium icon */}
          {!showNavbar && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`fixed bottom-4 right-4 z-50 p-2 rounded-full transition-all duration-300 border-4 border-purple-800 ${
                scrollProgress > 0.5 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <ChevronsUp className="w-4 h-4" />
            </button>
          )}

          <main className="overflow-hidden">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;