import { Code2, Globe, Server, Sparkles } from 'lucide-react';
import { motion, useAnimation, useInView, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { AuthAnimatedBackground } from './common/AnimatedBackground';

const About = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const services = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Creating beautiful, responsive user interfaces with modern frameworks and best practices.',
      gradientFrom: 'from-blue-400/20',
      gradientTo: 'to-blue-600/20',
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Building robust server-side applications and APIs with scalable architecture.',
      gradientFrom: 'from-emerald-400/20',
      gradientTo: 'to-emerald-600/20',
    },
    {
      icon: Globe,
      title: 'Full Stack Development',
      description: 'End-to-end development of web applications from concept to deployment.',
      gradientFrom: 'from-purple-400/20',
      gradientTo: 'to-purple-600/20',
    },
    {
      icon: Sparkles,
      title: 'UI/UX Design',
      description: 'Designing intuitive and engaging user experiences with modern design principles.',
      gradientFrom: 'from-yellow-400/20',
      gradientTo: 'to-yellow-600/20',
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = (depth: number) => ({
    transform: `
      translateX(${mousePosition.x * depth * 50}px)
      translateY(${mousePosition.y * depth * 50}px)
      translateZ(${depth * 50}px)
    `,
    transition: 'transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1)',
  });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <motion.section 
      id="about" 
      ref={containerRef}
      className="relative h-[calc(100vh+4rem)] -mt-16 pt-16 flex items-start justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden preserve-3d"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '2000px',
      }}
    >
      <AuthAnimatedBackground />

      <div className="absolute inset-0 overflow-hidden preserve-3d">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          style={parallaxStyle(0.5)}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          style={parallaxStyle(0.3)}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative py-6 mt-24">
        <motion.div 
          className="text-center mb-16"
          style={parallaxStyle(0.4)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
            whileHover={{
              backgroundSize: "200% 200%",
              transition: { duration: 1 }
            }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"
            whileInView={{
              width: ["0%", "6rem"],
              transition: { duration: 0.8, ease: "easeOut" }
            }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-6 items-start">
          <motion.div 
            className="space-y-4"
            style={parallaxStyle(0.2)}
          >
            <motion.p
              className="text-sm sm:text-base text-gray-300 leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                transition: { duration: 0.3 }
              }}
            >
              I specialize in building full-stack web applications using modern technologies and 
              best practices. My approach combines technical expertise with creative problem-solving 
              to deliver solutions that not only work flawlessly but also provide an excellent user 
              experience.
            </motion.p>

            <motion.div 
              className="flex gap-3"
              variants={textVariants}
              custom={3}
            >
              <motion.a 
                href="#contact" 
                className="group relative inline-flex items-center px-4 py-1.5 overflow-hidden rounded-lg text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 font-medium text-white">
                  Get in Touch
                </span>
              </motion.a>

              <motion.a 
                href="#projects" 
                className="group relative inline-flex items-center px-4 py-1.5 overflow-hidden rounded-lg border border-blue-500/30 text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-blue-500 font-medium group-hover:text-blue-400 transition-colors">
                  View Projects
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4 relative"
            style={parallaxStyle(0.3)}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className={`group relative overflow-hidden backdrop-blur-sm bg-[#1a1f2e]/30 border border-white/5
                  ${index === 0 ? 'rounded-[2rem_1rem_2rem_1rem] translate-y-4 translate-x-4 z-[2]' : ''}
                  ${index === 1 ? 'rounded-[1rem_2rem_1rem_2rem] mt-12 -translate-x-4 z-[1]' : ''}
                  ${index === 2 ? 'rounded-[2rem_1rem_1rem_2rem] -mt-8 translate-x-6 z-[3]' : ''}
                  ${index === 3 ? 'rounded-[1rem_2rem_2rem_1rem] translate-y-4 -translate-x-6 z-[4]' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(26, 31, 46, 0.5)",
                  zIndex: 10,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                {/* Abstract background shapes */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className={`absolute w-full h-full bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo}`} />
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                  <div className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} blur-3xl opacity-20 transform rotate-12`} />
                </div>

                {/* Content container with asymmetric padding */}
                <div className={`relative p-5 flex flex-col h-full
                  ${index === 0 ? 'pl-6' : ''}
                  ${index === 1 ? 'pr-6' : ''}
                  ${index === 2 ? 'pl-6' : ''}
                  ${index === 3 ? 'pr-6' : ''}
                `}>
                  {/* Icon and title with dynamic positioning */}
                  <div className={`flex items-center space-x-3 mb-3
                    ${index % 2 === 0 ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}
                  `}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} p-1.5 
                      opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:rotate-12 duration-300`}>
                      <service.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description with custom border */}
                  <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors
                    relative pl-3 border-l border-white/10 group-hover:border-blue-500/30">
                    {service.description}
                  </p>

                  {/* Animated accent lines */}
                  <motion.div 
                    className={`absolute h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent
                      ${index % 2 === 0 ? 'left-0 bottom-0 w-2/3' : 'right-0 bottom-0 w-2/3'}
                    `}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className={`absolute w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent
                      ${index % 2 === 0 ? 'right-0 h-2/3' : 'left-0 h-2/3'}
                    `}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Floating accent elements */}
                <div className={`absolute w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-45
                  ${index === 0 ? '-top-8 -right-8' : ''}
                  ${index === 1 ? '-bottom-8 -left-8' : ''}
                  ${index === 2 ? '-bottom-8 -right-8' : ''}
                  ${index === 3 ? '-top-8 -left-8' : ''}
                `} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;