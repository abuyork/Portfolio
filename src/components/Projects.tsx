import { 
  Github, ExternalLink, ArrowRight, 
  ShoppingCart, // For E-commerce
  ListTodo, // For Task Management
  Cloud // For Weather Dashboard
} from 'lucide-react';
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { fadeIn, slideInFromBottom } from '../utils/animations';
import { useRef } from 'react';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create animated values based on scroll position

  const projects = [
    {
      title: 'E-Commerce Platform',
      icon: ShoppingCart,
      description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, product management, and payment integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Task Management App',
      icon: ListTodo,
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Weather Dashboard',
      icon: Cloud,
      description: 'A weather dashboard that displays current weather conditions and forecasts for multiple locations using weather API integration.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      technologies: ['React', 'TypeScript', 'OpenWeather API'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative min-h-screen py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white overflow-hidden"
    >
      {/* Enhanced floating orbs with parallax - copied from Hero */}
      <div className="absolute inset-0 overflow-hidden preserve-3d">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"
          animate={{
            y: [50, 0, 50],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl"
          animate={{
            y: [30, 0, 30],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Updated heading section with Hero-like styling */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 font-['Space_Grotesk'] tracking-tight"
            whileHover={{
              backgroundSize: "200% 200%",
              transition: { duration: 1 }
            }}
          >
            Projects
          </motion.h2>
          {/* Added gradient underline with animation */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full"
            whileInView={{
              width: ["0%", "6rem"],
              transition: { duration: 0.8, ease: "easeOut" }
            }}
          />
        </motion.div>

        {/* Project cards grid remains the same */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => {
            const cardRef = useRef(null);

            // Add these motion values for parallax effect
            const mouseXMotionValue = useMotionValue(0);
            const mouseYMotionValue = useMotionValue(0);

            // Add smooth spring physics
            const rotateX = useSpring(mouseYMotionValue, { stiffness: 150, damping: 20 });
            const rotateY = useSpring(mouseXMotionValue, { stiffness: 150, damping: 20 });

            // Handle mouse move for parallax
            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const width = rect.width;
              const height = rect.height;
              const currentMouseX = e.clientX - rect.left;
              const currentMouseY = e.clientY - rect.top;
              
              const xPct = currentMouseX / width - 0.5;
              const yPct = currentMouseY / height - 0.5;
              
              mouseXMotionValue.set(xPct * 20); // Now using the motion value
              mouseYMotionValue.set(yPct * 20);
            };

            const handleMouseLeave = () => {
              mouseXMotionValue.set(0);
              mouseYMotionValue.set(0);
            };
            
            return (
              <motion.div 
                key={index}
                ref={cardRef}
                custom={index}
                variants={slideInFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    // Stagger the animation based on index
                    delay: index * 0.2
                  }
                }}
                style={{
                  rotateY,
                  rotateX,
                  transformStyle: "preserve-3d",
                }}
                className={`
                  group relative overflow-hidden rounded-xl
                  ${index % 2 === 0 ? 'md:translate-y-12' : ''}
                  ${index % 3 === 1 ? 'lg:translate-y-24' : ''}
                  ${index % 3 === 2 ? 'lg:translate-y-8' : ''}
                  before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-b before:from-gray-900/0 
                  before:via-gray-900/5 before:to-gray-900/20
                  after:absolute after:inset-0 after:z-10 
                  after:bg-gradient-to-t after:from-gray-900/40 
                  after:to-gray-900/0
                  bg-gradient-to-br from-gray-700/50 via-gray-800/30 to-gray-800/50
                  backdrop-blur-[6px] backdrop-saturate-150
                  border border-white/5 hover:border-white/10
                  shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                  transition-all duration-300 ease-out
                  hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]
                  hover:backdrop-blur-[8px]
                  hover:-translate-y-2
                  hover:z-10
                  transform-gpu
                  perspective-1000
                `}
              >
                {/* Add a subtle shadow animation */}
                <motion.div
                  className="absolute -inset-1 bg-black/30 rounded-xl blur-xl -z-10"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.05, 1],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                />

                {/* Image section with parallax */}
                <motion.div 
                  className="relative h-48 overflow-hidden"
                  style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500
                      filter brightness-100 contrast-100 saturate-100"
                    style={{
                      scale: 1.1,
                      transformStyle: "preserve-3d",
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                  >
                    {/* Updated icons container with adjusted positioning */}
                    <div className="absolute bottom-0 left-0 right-0 px-8 py-4 
                      flex justify-between items-center
                      transform translate-y-full group-hover:translate-y-0 
                      transition-transform duration-300 ease-out"
                    >
                      <div className="flex gap-2 ml-4">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full 
                            hover:bg-white/20 transition-all duration-200
                            shadow-[0_0_15px_rgba(255,255,255,0.1)]
                            hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                          <Github className="w-4 h-4 text-white" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full 
                            hover:bg-white/20 transition-all duration-200
                            shadow-[0_0_15px_rgba(255,255,255,0.1)]
                            hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                        </motion.a>
                      </div>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-white flex items-center gap-2 text-sm
                          px-3 py-1.5 rounded-full mr-4
                          hover:bg-white/20 transition-all duration-200
                          shadow-[0_0_15px_rgba(255,255,255,0.1)]
                          hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      >
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Content section with parallax */}
                <motion.div 
                  className="relative z-20 p-6 bg-gradient-to-b from-gray-700/50 to-gray-800/50 backdrop-blur-sm"
                  style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400"
                    >
                      <project.icon className="w-5 h-5" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 
                      transition-colors duration-200 drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors duration-200">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2
                        }}
                        className="px-3 py-1 text-sm font-medium rounded-full
                          relative overflow-hidden group/badge
                          bg-white/5 text-gray-300
                          border border-white/5
                          hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20
                          transition-all duration-200
                          shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                          hover:shadow-[0_2px_15px_rgba(59,130,246,0.2)]"
                      >
                        {/* Gradient glow effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-purple-500/0 
                          opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300
                          blur-md -z-10" 
                        />
                        
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                          translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000
                          -z-10" 
                        />
                        
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_50%)]
                  pointer-events-none z-0"
                />
                
                {/* Add subtle light reflection */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500
                  bg-gradient-to-r from-transparent via-white/10 to-transparent
                  -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]
                  pointer-events-none z-0 animate-shimmer"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;