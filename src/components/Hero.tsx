import { Github, Linkedin, Mail, ChevronDown} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { AuthAnimatedBackground } from './common/AnimatedBackground';

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [nameText, setNameText] = useState("John Doe");
  const [titleText, setTitleText] = useState("Full Stack Developer");
  const [descText, setDescText] = useState("Building beautiful, functional, and scalable web applications with modern technologies.");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, scrollPosition / windowHeight);
      setScrollProgress(progress);

      // Text fade calculations
      const nameLength = Math.floor((1 - progress) * "John Doe".length);
      const titleLength = Math.floor((1 - progress) * "Full Stack Developer".length);
      const descLength = Math.floor((1 - progress) * "Building beautiful, functional, and scalable web applications with modern technologies.".length);

      setNameText("John Doe".slice(0, Math.max(0, nameLength)));
      setTitleText("Full Stack Developer".slice(0, Math.max(0, titleLength)));
      setDescText("Building beautiful, functional, and scalable web applications with modern technologies.".slice(0, Math.max(0, descLength)));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
  };

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
      className="relative h-[100vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden preserve-3d rounded-[20px] mb-16"
      style={{
        ...containerStyle,
        transformStyle: 'preserve-3d',
        boxShadow: `0 ${scrollProgress * 50}px ${scrollProgress * 100}px rgba(0,0,0,0.3)`,
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center preserve-3d flex flex-col justify-center h-full">
        {/* Content sections with reduced sizes */}
        <div className="space-y-4 md:space-y-6">
          {/* Name section - reduced size */}
          <div className="relative preserve-3d" style={parallaxStyle(0.4)}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold opacity-0 animate-slide-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:from-emerald-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-500 font-['Space_Grotesk']">
                {nameText}
              </span>
            </h1>
            <div className="absolute -inset-x-16 -inset-y-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl -z-10 animate-pulse" />
          </div>
          
          {/* Title section - reduced size */}
          <div className="relative preserve-3d" style={parallaxStyle(0.3)}>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-light text-gray-300 opacity-0 animate-slide-up animation-delay-200">
              <span className="font-normal text-white relative group">
                {titleText}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-1/2 transition-all duration-300" 
                      style={{ transform: 'translateX(-50%)' }} />
              </span>
            </h2>
          </div>
          
          {/* Description section - reduced size and width */}
          <div className="relative preserve-3d" style={parallaxStyle(0.2)}>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto opacity-0 animate-slide-up animation-delay-400 leading-relaxed group">
              {descText}
            </p>
          </div>

          {/* Social links section - reduced spacing */}
          <div className="flex justify-center space-x-4 md:space-x-6 opacity-0 animate-slide-up animation-delay-600" style={parallaxStyle(0.3)}>
            {/* Social links with reduced padding */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
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
            
            <a href="mailto:contact@example.com"
               className="group relative p-3 rounded-full hover:bg-gray-800/30 backdrop-blur-sm transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <Mail className="w-5 h-5 group-hover:text-blue-400 transition-colors relative z-10" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                Email
              </span>
            </a>
          </div>
        </div>
        
        {/* CTA button section - reduced size */}
        <div className="relative preserve-3d mt-6" style={parallaxStyle(0.2)}>
          <a href="#about"
             className="group relative inline-flex items-center gap-2 px-6 py-3 opacity-0 animate-slide-up animation-delay-800 overflow-hidden">
            {/* Button styling remains the same */}
            <span className="relative z-10 font-medium text-white text-sm">
              Explore My Work
            </span>
            <ChevronDown className="relative z-10 w-3 h-3 animate-bounce" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator - reduced size */}
      <div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in animation-delay-1000"
        style={parallaxStyle(0.2)}
      >
        <div className="relative w-5 h-8 border-2 border-white/30 rounded-full flex justify-center hover:border-white/50 transition-colors group">
          <div className="w-1 h-2 bg-gradient-to-b from-white/50 to-white/20 rounded-full mt-2 group-hover:h-4 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Hero;