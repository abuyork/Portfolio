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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden preserve-3d rounded-[20px]"
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

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
        <motion.div 
          className="text-center mb-16"
          style={parallaxStyle(0.4)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
            whileHover={{
              backgroundSize: "200% 200%",
              transition: { duration: 1 }
            }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"
            whileInView={{
              width: ["0%", "4rem"],
              transition: { duration: 0.8, ease: "easeOut" }
            }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-start">
          <motion.div 
            className="space-y-8"
            style={parallaxStyle(0.2)}
          >
            <motion.p
              className="text-lg text-gray-300 leading-relaxed backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10"
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
              className="flex gap-6"
              variants={textVariants}
              custom={3}
            >
              <motion.a 
                href="#contact" 
                className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl bg-blue-500" />
                
                <span className="relative z-10 font-medium text-white">
                  Get in Touch
                </span>
                
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.a>

              <motion.a 
                href="#projects" 
                className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-lg border border-blue-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 rounded-lg" />
                
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl bg-blue-500/20" />
                
                <span className="relative z-10 text-blue-500 font-medium group-hover:text-blue-400 transition-colors">
                  View Projects
                </span>
                
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-6 preserve-3d"
            style={parallaxStyle(0.3)}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="group relative p-6 backdrop-blur-sm bg-[#1a1f2e]/50 rounded-xl border border-white/5"
                initial={{ opacity: 0, y: 20, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  backgroundColor: "rgba(26, 31, 46, 0.8)",
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                <motion.div
                  className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
                  initial={{ boxShadow: "none" }}
                  whileHover={{
                    boxShadow: `
                      0 0 20px 2px rgba(255, 255, 255, 0.1),
                      inset 0 0 20px 2px rgba(255, 255, 255, 0.1)
                    `
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100"
                  initial={{ boxShadow: "none" }}
                  whileHover={{
                    boxShadow: `
                      10px 10px 20px rgba(0, 0, 0, 0.2),
                      -10px -10px 20px rgba(255, 255, 255, 0.05)
                    `
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className={`relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} p-3 mb-4`}>
                  <service.icon className="w-full h-full text-white" />
                </div>
                <h3 className="relative z-10 text-xl font-semibold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="relative z-10 text-gray-400 text-base leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;