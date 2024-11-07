import { 
  Github, ExternalLink, ArrowRight, 
  ShoppingCart, // For E-commerce
  ListTodo, // For Task Management
  Cloud // For Weather Dashboard
} from 'lucide-react';
import { motion, useScroll, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { fadeIn, slideInFromBottom } from '../utils/animations';
import { useRef } from 'react';
import { 
  ReactIcon, NodeIcon, MongoDbIcon, StripeIcon,
  NextJsIcon, TypeScriptIcon, PostgreSqlIcon, SocketIoIcon,
  OpenWeatherIcon
} from '../utils/TechIcons';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const projects = [
    {
      title: 'E-Commerce Platform',
      icon: ShoppingCart,
      description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, product management, and payment integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      technologies: [
        { icon: ReactIcon, name: 'React' },
        { icon: NodeIcon, name: 'Node.js' },
        { icon: MongoDbIcon, name: 'MongoDB' },
        { icon: StripeIcon, name: 'Stripe' }
      ],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Task Management App',
      icon: ListTodo,
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      technologies: [
        { icon: NextJsIcon, name: 'Next.js' },
        { icon: TypeScriptIcon, name: 'TypeScript' },
        { icon: PostgreSqlIcon, name: 'PostgreSQL' },
        { icon: SocketIoIcon, name: 'Socket.io' }
      ],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Weather Dashboard',
      icon: Cloud,
      description: 'A weather dashboard that displays current weather conditions and forecasts for multiple locations using weather API integration.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      technologies: [
        { icon: ReactIcon, name: 'React' },
        { icon: TypeScriptIcon, name: 'TypeScript' },
        { icon: OpenWeatherIcon, name: 'Weather API' }
      ],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || 
      { left: 0, top: 0, width: 0, height: 0 };
    
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "0px 0px -150px 0px",
    amount: 0.1,
    once: false
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scrollProgress = useTransform(scrollYProgress, 
    [0, 0.4],
    [1, 0]
  );

  return (
    <motion.section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Liquid wave overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.1))',
          opacity: scrollProgress
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `rgba(59,130,246,${0.03 * (i + 1)})`,
              opacity: scrollProgress
            }}
            animate={{
              y: scrollProgress.get() === 1 ? 0 : [0, -1000 - i * 200],
              scaleY: scrollProgress.get() === 1 ? 1 : [1, 2.5],
              skewY: scrollProgress.get() === 1 ? 0 : [0, -15],
            }}
            transition={{
              duration: 2.4 + i * 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </motion.div>

      {/* Ripple effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isInView ? 0 : 1,
        }}
        transition={{ duration: 1.6 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-blue-500/20"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              scale: isInView ? [1, 1] : [0, 4],
              opacity: isInView ? 1 : [0.5, 0],
              x: '-50%',
              y: '-50%',
            }}
            transition={{
              duration: 4,
              delay: i * 0.4,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </motion.div>

      {/* Content container with liquid distortion */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{
          opacity: scrollProgress,
          scale: useTransform(scrollProgress, [0, 1], [0.95, 1]),
          filter: useTransform(scrollProgress, [0, 1], ['hue-rotate(90deg)', 'none']),
          willChange: 'transform',
        }}
      >
        {/* Original content */}
        <motion.div
          animate={{
            y: isInView ? 0 : 100,
            opacity: isInView ? 1 : 0,
          }}
          transition={{
            duration: 1.6,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          {/* Updated heading section with Hero-like styling */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 font-['Space_Grotesk'] tracking-tight"
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
                  width: ["0%", "7rem"],
                  transition: { duration: 0.8, ease: "easeOut" }
                }}
              />
            </motion.div>

            {/* Project cards grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                      bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95
                      backdrop-blur-sm backdrop-saturate-150
                      border border-white/10 hover:border-white/20
                      shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                      transition-all duration-300 ease-out
                      hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]
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
                      className="relative h-64 overflow-hidden"
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
                                border border-white/20
                                transition-all duration-200
                                hover:text-blue-400 hover:border-blue-400"
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
                                border border-white/20
                                transition-all duration-200
                                hover:text-blue-400 hover:border-blue-400"
                            >
                              <ExternalLink className="w-4 h-4 text-white" />
                            </motion.a>
                          </div>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="text-white flex items-center gap-2 text-sm
                              px-3 py-1.5 rounded-full mr-4
                              border border-white/20
                              transition-all duration-200
                              hover:text-blue-400 hover:border-blue-400"
                          >
                            Details <ArrowRight className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content section with parallax */}
                    <motion.div 
                      className="relative z-20 p-10 bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-sm"
                      style={{
                        transform: "translateZ(50px)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                        >
                          <project.icon className="w-5 h-5" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white 
                          transition-colors duration-200 drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-gray-100 mb-6 line-clamp-2 transition-colors duration-200 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            whileHover={{ 
                              scale: 1.1,
                              y: -2
                            }}
                            className="relative group/tech"
                          >
                            <div className="w-6 h-6 rounded-lg bg-white/10 p-1
                              hover:bg-blue-500/10 transition-all duration-200
                              border border-white/10 hover:border-blue-500/20
                              shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                              hover:shadow-[0_2px_15px_rgba(59,130,246,0.2)]
                              flex items-center justify-center"
                            >
                              <tech.icon className="w-full h-full text-white group-hover/tech:text-blue-400
                                transition-colors duration-200" />
                            </div>
                            
                            {/* Update tooltip background */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 
                              bg-gray-900 text-white text-xs rounded-md opacity-0 
                              group-hover/tech:opacity-100 transition-opacity duration-200
                              pointer-events-none whitespace-nowrap
                              border border-white/10"
                            >
                              {tech.name}
                            </div>
                          </motion.div>
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
        </motion.div>
      </motion.div>

      {/* Update the shine effect container with reduced brightness */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.15), transparent 40%)',
          '--mouse-x': useTransform(mouseX, value => `${value * 100}%`),
          '--mouse-y': useTransform(mouseY, value => `${value * 100}%`)
        } as any}
      />

      {/* Add these new animated shine rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-[1px] origin-left"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.1), transparent)',
                rotate: `${i * 60}deg`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6,
                delay: i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;