import { 
  Github, ExternalLink, ArrowRight, 
  ShoppingCart, // For E-commerce
  ListTodo, // For Task Management
  Cloud // For Weather Dashboard
} from 'lucide-react';
import { motion, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { fadeIn, slideInFromBottom } from '../utils/animations';
import { useRef, useState, useMemo } from 'react';
import { 
  ReactIcon, NodeIcon, MongoDbIcon, StripeIcon,
  NextJsIcon, TypeScriptIcon, PostgreSqlIcon, SocketIoIcon,
  OpenWeatherIcon
} from '../utils/TechIcons';

// Add these interfaces at the top
interface StarParticle {
  id: number;
  size: number;
  x: number;
  y: number;
  depth: number;
  speed: number;
  colorIndex: number;
  isShootingStar?: boolean;
  isNebula?: boolean;
  cluster?: boolean;
}

// Star colors array
const starColors = [
  ['#60A5FA', '#818CF8'], // blue-purple
  ['#818CF8', '#34D399'], // purple-emerald
  ['#34D399', '#60A5FA'], // emerald-blue
  ['#F472B6', '#818CF8'], // pink-purple
  ['#F59E0B', '#EC4899'], // amber-pink
  ['#8B5CF6', '#3B82F6']  // purple-blue
];

// Star generation function
const generateStars = (): StarParticle[] => {
  const stars: StarParticle[] = [];
  const starCount = 45;
  
  const clusterPoints = [
    { x: 20, y: 20 }, { x: 80, y: 80 }, { x: 30, y: 70 }
  ];

  for (let i = 0; i < starCount; i++) {
    const isCluster = Math.random() < 0.3;
    let x, y;

    if (isCluster) {
      const cluster = clusterPoints[Math.floor(Math.random() * clusterPoints.length)];
      x = cluster.x + (Math.random() - 0.5) * 20;
      y = cluster.y + (Math.random() - 0.5) * 20;
    } else {
      x = Math.random() * 100;
      y = Math.random() * 100;
    }

    stars.push({
      id: i,
      size: Math.random() * 3 + 1,
      x,
      y,
      depth: Math.random() * 5 + 1,
      speed: Math.random() * 3 + 2,
      colorIndex: Math.floor(Math.random() * 6),
      isShootingStar: Math.random() < 0.1,
      isNebula: Math.random() < 0.15,
      cluster: isCluster
    });
  }
  return stars;
};

const EnhancedStarField = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const stars = useMemo(() => generateStars(), []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {stars.map((star: StarParticle) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            width: star.isShootingStar ? `${star.size * 2}px` : `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            zIndex: Math.floor(star.depth),
          }}
          initial={{ opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Star core */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(45deg, ${starColors[star.colorIndex][0]}, ${starColors[star.colorIndex][1]})`,
              filter: star.cluster ? 'blur(0.3px)' : 'blur(0.5px)',
              boxShadow: `0 0 ${star.size * 2}px ${starColors[star.colorIndex][0]}40`,
              opacity: getStarOpacity(mousePosition, { x: star.x, y: star.y }),
              transition: 'opacity 0.2s ease-out',
            }}
          />

          {/* Star glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: `-${star.size / 2}px`,
              background: `radial-gradient(circle at center, ${starColors[star.colorIndex][0]}20, transparent 70%)`,
              filter: 'blur(1px)',
              opacity: getStarOpacity(mousePosition, { x: star.x, y: star.y }) * 0.5,
              transition: 'opacity 0.2s ease-out',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const getStarOpacity = (
  mousePos: { x: number, y: number }, 
  starPos: { x: number, y: number }
) => {
  // Convert percentage to pixels for more accurate distance calculation
  const starPosPixels = {
    x: (starPos.x / 100) * window.innerWidth,
    y: (starPos.y / 100) * window.innerHeight
  };

  const distance = Math.sqrt(
    Math.pow((mousePos.x - starPosPixels.x), 2) + 
    Math.pow((mousePos.y - starPosPixels.y), 2)
  );
  
  const maxDistance = 150; // Reduced radius for tighter visibility around cursor
  return Math.max(0, 1 - (distance / maxDistance));
};

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

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative min-h-screen py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Replace planets with enhanced star field */}
      <EnhancedStarField />

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

        {/* Project cards grid - update card background */}
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
                  bg-gradient-to-br from-gray-700/30 via-gray-800/20 to-gray-800/30
                  backdrop-blur-lg backdrop-saturate-150
                  border border-white/10 hover:border-white/20
                  shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                  transition-all duration-300 ease-out
                  hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]
                  hover:backdrop-blur-xl
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
                      transition-transform duration-300 ease-out
                      backdrop-blur-lg bg-gray-900/20"
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
                  className="relative z-20 p-6 bg-gradient-to-b from-gray-700/30 to-gray-800/30 backdrop-blur-md"
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
                        <div className="w-6 h-6 rounded-lg bg-white/5 p-1
                          hover:bg-blue-500/10 transition-all duration-200
                          border border-white/5 hover:border-blue-500/20
                          shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                          hover:shadow-[0_2px_15px_rgba(59,130,246,0.2)]
                          flex items-center justify-center"
                        >
                          <tech.icon className="w-full h-full text-gray-300 group-hover/tech:text-blue-400
                            transition-colors duration-200" />
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 
                          bg-gray-900/80 backdrop-blur-md text-white text-xs rounded-md opacity-0 
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
            duration: 20,
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
                duration: 3,
                delay: i * 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Replace the sparkle points with aesthetic stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${i % 3 === 0 ? 'w-[3px] h-[3px]' : 'w-[2px] h-[2px]'} rounded-full`}
          style={{
            background: i % 4 === 0 
              ? 'linear-gradient(to right, #60A5FA, #818CF8)' // blue-purple
              : i % 4 === 1
              ? 'linear-gradient(to right, #818CF8, #34D399)' // purple-emerald
              : i % 4 === 2
              ? 'linear-gradient(to right, #34D399, #60A5FA)' // emerald-blue
              : 'linear-gradient(to right, #F472B6, #818CF8)', // pink-purple
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
            boxShadow: i % 3 === 0 
              ? '0 0 4px rgba(96, 165, 250, 0.5)' 
              : '0 0 2px rgba(96, 165, 250, 0.3)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Add inner glow */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'inherit',
              filter: 'blur(1px)',
              opacity: 0.5,
            }}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default Projects;