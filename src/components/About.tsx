import { Code2, Globe, Server, Sparkles } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const About = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const services = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Creating beautiful, responsive user interfaces with modern frameworks and best practices.',
      color: 'blue',
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Building robust server-side applications and APIs with scalable architecture.',
      color: 'green',
    },
    {
      icon: Globe,
      title: 'Full Stack Development',
      description: 'End-to-end development of web applications from concept to deployment.',
      color: 'purple',
    },
    {
      icon: Sparkles,
      title: 'UI/UX Design',
      description: 'Designing intuitive and engaging user experiences with modern design principles.',
      color: 'yellow',
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = (depth: number) => ({
    transform: `
      perspective(2000px)
      translateX(${mousePosition.x * depth * 30}px)
      translateY(${mousePosition.y * depth * 30}px)
      translateZ(${depth * 30}px)
      rotateX(${mousePosition.y * depth * 5}deg)
      rotateY(${mousePosition.x * depth * 5}deg)
    `,
    transition: 'transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)',
  });

  // Text animation variants
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

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -30 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <motion.section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden preserve-3d"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.2,
            delayChildren: 0.3
          }
        }
      }}
    >
      {/* Background Effects with enhanced animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title with enhanced animation */}
        <motion.div 
          className="text-center mb-16"
          style={parallaxStyle(0.2)}
          variants={textVariants}
          custom={0}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 8px rgb(59, 130, 246, 0.5)"
            }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"
            whileHover={{ scaleX: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content with enhanced animation */}
          <motion.div 
            className="space-y-6"
            style={parallaxStyle(0.3)}
          >
            <motion.p
              variants={textVariants}
              custom={1}
              className="text-lg text-gray-300 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
            >
              Hello! I'm a passionate Full Stack Developer with over 5 years of experience in creating 
              elegant solutions to complex problems. My journey in web development started with a 
              curiosity about how websites work, and it has evolved into a professional career 
              building robust applications.
            </motion.p>

            <motion.p
              variants={textVariants}
              custom={2}
              className="text-lg text-gray-300 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
            >
              I specialize in building full-stack web applications using modern technologies and 
              best practices. My approach combines technical expertise with creative problem-solving 
              to deliver solutions that not only work flawlessly but also provide an excellent user 
              experience.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex gap-4 pt-4"
              variants={textVariants}
              custom={3}
            >
              <motion.a 
                href="#contact" 
                className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10 font-semibold text-white">Get in Touch</div>
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl bg-blue-500" />
              </motion.a>

              <motion.a 
                href="#projects" 
                className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg border-2 border-blue-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
                <span className="relative z-10 text-blue-500 font-semibold">View Projects</span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Service Cards with enhanced 3D effect */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            style={parallaxStyle(0.4)}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.05,
                  rotateX: mousePosition.y * 10,
                  rotateY: mousePosition.x * 10,
                  z: 50
                }}
                className="group p-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 preserve-3d"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${service.color}-400/20 to-${service.color}-600/20 p-2.5 mb-4 group-hover:from-${service.color}-400/30 group-hover:to-${service.color}-600/30 transition-colors duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
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