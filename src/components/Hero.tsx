import { Github, Linkedin, Mail, ChevronDown} from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { AuthAnimatedBackground } from './common/AnimatedBackground';
import DevImage from '../assets/dev-image/Alex3.jpeg';

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  // Memoized scroll handler to avoid recreating on every render
  const handleScroll = useCallback(() => {
    // Store current scroll position
    lastScrollY.current = window.scrollY;
    
    // Cancel any pending animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Schedule the animation frame
    rafRef.current = requestAnimationFrame(() => {
      const scrollPosition = lastScrollY.current;
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, scrollPosition / windowHeight);
      
      // Update all states in one batch
      setScrollProgress(progress);
      rafRef.current = null;
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cleanup any pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, handleMouseMove]);

  const containerStyle = {
    transform: `
      perspective(2000px)
      translateZ(${scrollProgress * -1000}px)
      rotateX(${scrollProgress * 20 + mousePosition.y * 5}deg)
      rotateY(${mousePosition.x * 5}deg)
      scale(${1 - scrollProgress * 0.3})
    `,
    transformOrigin: 'center center',
    transition: 'transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1)',
    borderRadius: `${scrollProgress * 100}px`,
    '--text-opacity': 1 - scrollProgress, // CSS variable for text opacity
  } as React.CSSProperties;

  const parallaxStyle = (depth: number) => ({
    transform: `
      translateX(${mousePosition.x * depth * 50}px)
      translateY(${mousePosition.y * depth * 50}px)
      translateZ(${depth * 50}px)
    `,
    transition: 'transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1)',
  });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden preserve-3d rounded-[20px] mb-16"
      style={{
        ...containerStyle,
        transformStyle: 'preserve-3d',
        boxShadow: `0 ${scrollProgress * 50}px ${scrollProgress * 100}px rgba(0,0,0,0.3)`,
        willChange: 'transform',
      }}
    >
      <AuthAnimatedBackground />
      
      {/* Enhanced floating orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden preserve-3d">
        <div 
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={parallaxStyle(0.5)}
        />
        <div 
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"
          style={parallaxStyle(0.3)}
        />
        {/* Additional floating elements */}
        <div 
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-float"
          style={parallaxStyle(0.8)}
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-float delay-500"
          style={parallaxStyle(0.6)}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center preserve-3d flex flex-col justify-center h-full">
        {/* Content sections with CSS variable-based fade animation */}
        <div className="space-y-4 md:space-y-6">

          {/* Image and Name Horizontally Aligned */}
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 space-y-4 md:space-y-0">
            {/* Developer Image Section */}
            <div className="relative preserve-3d" style={parallaxStyle(0.5)}>
              <img
                src={DevImage}
                alt="Alex Abdugani"
                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto object-cover border-4 border-purple-500/30 opacity-0 animate-slide-up"
                style={{
                  opacity: 'var(--text-opacity, 1)',
                  clipPath: 'polygon(40% 0%, 70% 10%, 100% 35%, 90% 70%, 60% 100%, 30% 90%, 0% 60%, 10% 30%)',
                  filter: `drop-shadow(6px 6px 10px rgba(0, 0, 0, ${0.3 * (1 - scrollProgress)})) drop-shadow(0px 0px 15px rgba(128, 0, 128, ${0.2 * (1 - scrollProgress)}))`
                }}
              />
              <div className="absolute inset-0 mx-auto w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-2xl -z-10 animate-pulse" />
            </div>

            {/* Name and Title Block */}
            <div className="text-center md:text-left">
              {/* Name section - using CSS variables for opacity */}
              <div className="relative preserve-3d" style={parallaxStyle(0.4)}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold opacity-0 animate-slide-up">
                  <span 
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:from-emerald-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-500"
                    style={{
                      fontFamily: '"Alex Brush", cursive',
                      opacity: 'var(--text-opacity, 1)'
                    }}
                  >
                    Alex
                  </span>
                  <span 
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:from-emerald-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-500"
                    style={{
                      fontFamily: '"Alex Brush", cursive',
                      opacity: 'var(--text-opacity, 1)'
                    }}
                  >
                    Abdugani
                  </span>
                </h1>
                <div className="absolute -inset-x-16 -inset-y-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl -z-10 animate-pulse" />
              </div>
              
              {/* Title section - using CSS variables for opacity */}
              <div className="relative preserve-3d mt-1 md:mt-2" style={parallaxStyle(0.3)}>
                <h2 className="text-lg md:text-xl lg:text-2xl font-light text-gray-300 opacity-0 animate-slide-up animation-delay-200">
                  <span 
                    className="font-normal text-white relative group"
                    style={{ opacity: 'var(--text-opacity, 1)' }}
                  >
                    Full Stack Developer
                    <span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-300" 
                    />
                  </span>
                </h2>
              </div>
            </div>
          </div>
          
          {/* Description section - using CSS variables for opacity */}
          <div className="relative preserve-3d pt-4 md:pt-6" style={parallaxStyle(0.2)}>
            <p 
              className="text-base md:text-lg text-gray-400 max-w-xl mx-auto opacity-0 animate-slide-up animation-delay-400 leading-relaxed group"
              style={{ opacity: 'var(--text-opacity, 1)' }}
            >
              Building beautiful, functional, and scalable web applications with modern technologies.
            </p>
          </div>

          {/* Social links section - using CSS variables for opacity */}
          <div 
            className="flex justify-center space-x-4 md:space-x-6 opacity-0 animate-slide-up animation-delay-600" 
            style={{
              ...parallaxStyle(0.3),
              opacity: 'var(--text-opacity, 1)'
            }}
          >
            {/* Social links with reduced padding */}
            <a href="https://github.com/abuyork" target="_blank" rel="noopener noreferrer" 
               className="group relative p-3 rounded-full hover:bg-gray-800/30 backdrop-blur-sm transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <Github className="w-5 h-5 group-hover:text-blue-400 transition-colors relative z-10" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                GitHub
              </span>
            </a>
            
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="group relative p-3 rounded-full hover:bg-gray-800/30 backdrop-blur-sm transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <Linkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors relative z-10" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                LinkedIn
              </span>
            </a>
            
            <a href="mailto:nortoshev@bk.ru"
               className="group relative p-3 rounded-full hover:bg-gray-800/30 backdrop-blur-sm transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <Mail className="w-5 h-5 group-hover:text-blue-400 transition-colors relative z-10" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                Email
              </span>
            </a>
          </div>
        </div>
        
        {/* CTA button section - using CSS variables for opacity */}
        <div className="relative preserve-3d mt-6" style={parallaxStyle(0.2)}>
          <a href="#about"
             className="group relative inline-flex items-center gap-2 px-6 py-3 opacity-0 animate-slide-up animation-delay-800 overflow-hidden"
             style={{ opacity: 'var(--text-opacity, 1)' }}
          >
            {/* Button styling remains the same */}
            <span className="relative z-10 font-medium text-white text-sm">
              Explore My Work
            </span>
            <ChevronDown className="relative z-10 w-3 h-3 animate-bounce" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator - using CSS variables for opacity */}
      <div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in animation-delay-1000"
        style={{
          ...parallaxStyle(0.2),
          opacity: 'var(--text-opacity, 1)'
        }}
      >
        <div className="relative w-5 h-8 border-2 border-white/30 rounded-full flex justify-center hover:border-white/50 transition-colors group">
          <div className="w-1 h-2 bg-gradient-to-b from-white/50 to-white/20 rounded-full mt-2 group-hover:h-4 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Hero;