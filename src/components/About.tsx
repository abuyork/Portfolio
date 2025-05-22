import { Laptop, Database, Layout, Palette } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { AuthAnimatedBackground } from './common/AnimatedBackground';
import { 
  SiReact, SiJavascript, SiNodedotjs, SiExpress, SiNestjs, 
  SiCss3, SiHtml5, SiPython, SiGraphql, SiDocker, 
  SiAmazon, SiFigma, SiTailwindcss 
} from 'react-icons/si';

const About = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  const services = [
    {
      icon: Layout,
      title: 'Frontend Development',
      description: 'Creating beautiful, responsive user interfaces with modern frameworks and best practices.',
      gradientFrom: 'from-indigo-400/20',
      gradientTo: 'to-blue-600/20',
      accentLight: 'from-indigo-400',
      accentDark: 'to-blue-600',
      borderAccent: 'border-blue-500/10 group-hover:border-blue-500/20',
      iconBg: 'from-indigo-500 to-blue-600',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Building robust server-side applications and APIs with scalable architecture.',
      gradientFrom: 'from-emerald-400/20',
      gradientTo: 'to-teal-600/20',
      accentLight: 'from-emerald-400',
      accentDark: 'to-teal-600',
      borderAccent: 'border-emerald-500/10 group-hover:border-emerald-500/20',
      iconBg: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Laptop,
      title: 'Full Stack Development',
      description: 'End-to-end development of web applications from concept to deployment.',
      gradientFrom: 'from-violet-400/20',
      gradientTo: 'to-purple-600/20',
      accentLight: 'from-violet-400',
      accentDark: 'to-purple-600',
      borderAccent: 'border-purple-500/10 group-hover:border-purple-500/20',
      iconBg: 'from-violet-500 to-purple-600',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive and engaging user experiences with modern design principles.',
      gradientFrom: 'from-rose-400/20',
      gradientTo: 'to-pink-600/20',
      accentLight: 'from-rose-400',
      accentDark: 'to-pink-600',
      borderAccent: 'border-pink-500/10 group-hover:border-pink-500/20',
      iconBg: 'from-rose-500 to-pink-600',
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

  return (
    <motion.section 
      id="about" 
      ref={containerRef}
      className="relative min-h-[90vh] py-16 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden preserve-3d"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '2000px',
      }}
    >
      {/* Background layer */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
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
      </motion.div>

      {/* Content layer */}
      <motion.div 
        className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative py-4"
      >
        <motion.div 
          className="text-center mb-8"
          style={parallaxStyle(0.4)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 font-['Space_Grotesk'] tracking-tight"
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

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 items-start">
          <motion.div 
            className="space-y-6 flex flex-col"
            style={parallaxStyle(0.2)}
          >
            <motion.div
              className="text-sm sm:text-base text-gray-300 leading-relaxed backdrop-blur-sm 
                bg-white/[0.03] hover:bg-white/[0.05]
                p-6 rounded-2xl border border-white/10
                transition-colors duration-300"
              style={{
                transformOrigin: 'center top',
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <span className="block mb-4 text-base sm:text-lg font-light">
                I specialize in building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-medium">full-stack web applications</span> using 
                modern technologies and best practices.
              </span>
              
              <span className="block text-gray-400 mb-3 font-medium tracking-wide">
                My expertise includes:
              </span>
              
              <ul className="list-none space-y-3 text-gray-300">
                {[
                  "Modern frontend frameworks & responsive design",
                  "Scalable backend architecture & API development",
                  "User experience optimization & performance",
                  "Creative problem-solving & technical innovation"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center space-x-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 
                      group-hover:w-3 transition-all duration-300" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4 relative"
            style={parallaxStyle(0.3)}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className={`group relative overflow-hidden backdrop-blur-sm bg-[#1a1f2e]/30 border ${service.borderAccent}
                  ${index === 0 ? 'rounded-[2rem_1rem_2rem_1rem] col-span-2 row-span-1 translate-y-4 z-[4]' : ''}
                  ${index === 1 ? 'rounded-[1rem_2rem_1rem_2rem] translate-x-2 z-[2]' : ''}
                  ${index === 2 ? 'rounded-[2rem_1rem_1rem_2rem] -translate-x-2 z-[2]' : ''}
                  ${index === 3 ? 'rounded-[1rem_2rem_2rem_1rem] col-span-2 translate-y-2 z-[1]' : ''}
                  transition-all duration-500 ease-out
                  hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
                  dark:hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]
                `}
                initial={{ 
                  boxShadow: "0 0px 0px rgba(8, 112, 184, 0)",
                  y: 0
                }}
                whileInView={{
                  boxShadow: "0 10px 30px rgba(8, 112, 184, 0.1)",
                  y: -5
                }}
                viewport={{ once: false, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(26, 31, 46, 0.5)",
                  zIndex: 10,
                  boxShadow: "0 20px 50px rgba(8, 112, 184, 0.2)",
                  y: -10
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
                  ${index === 0 ? 'md:flex-row md:items-center md:gap-6' : ''}
                  ${index === 1 || index === 2 ? 'justify-between' : ''}
                  ${index === 3 ? 'md:flex-row md:items-center md:gap-6' : ''}
                `}>
                  {/* Icon and title with dynamic positioning */}
                  <div className={`flex items-center space-x-3 mb-3 ${index === 0 ? 'md:mb-0' : ''}`}>
                    <div className={`flex-shrink-0 ${index === 0 ? 'w-12 h-12' : 'w-8 h-8'} rounded-lg 
                      bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} p-2
                      opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:rotate-12 duration-300`}>
                      <service.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className={`font-medium text-white group-hover:text-blue-400 transition-colors
                      ${index === 0 ? 'text-lg' : 'text-sm'}`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Description with custom border */}
                  <p className={`text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors
                    relative pl-4 border-l border-white/10 group-hover:border-blue-500/30
                    ${index === 0 ? 'text-sm md:max-w-[60%] leading-6' : 'text-xs leading-5'}
                    tracking-wide
                  `}>
                    {service.description}
                  </p>

                  {/* Animated accent lines with unique colors */}
                  <motion.div 
                    className={`absolute h-[1px] bg-gradient-to-r from-transparent ${service.accentLight} ${service.accentDark} to-transparent
                      ${index % 2 === 0 ? 'left-0 bottom-0 w-2/3' : 'right-0 bottom-0 w-2/3'}
                    `}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className={`absolute w-[1px] bg-gradient-to-b from-transparent ${service.accentLight} ${service.accentDark} to-transparent
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

          {/* Tech stack card */}
          <motion.div
            className="col-span-full mt-8 relative overflow-hidden backdrop-blur-sm bg-[#1a1f2e]/30 
              border border-blue-500/10 hover:border-blue-500/20 rounded-2xl py-8
              transition-all duration-500 ease-out
              hover:shadow-[0_20px_50px_rgba(59,_130,_246,_0.5)]
              dark:hover:shadow-[0_20px_50px_rgba(59,_130,_246,_0.2)]"
            initial={{ 
              boxShadow: "0 0px 0px rgba(59, 130, 246, 0)",
              y: 0
            }}
            whileInView={{ 
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.08)",
              y: -5
            }}
            viewport={{ once: false, margin: "-50px" }}
            whileHover={{ 
              backgroundColor: "rgba(26, 31, 46, 0.5)",
              zIndex: 10,
              boxShadow: "0 20px 50px rgba(59, 130, 246, 0.2)",
              y: -10
            }}
            transition={{ 
              duration: 0.3
            }}
            style={parallaxStyle(0.2)}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300">
              <div className="absolute w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20" />
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
              <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full 
                bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl opacity-20 transform rotate-12" />
            </div>

            <div className="flex items-center justify-between px-12 relative">
              {[
                { Icon: SiReact, color: 'text-[#61DAFB]', tooltip: 'React' },
                { Icon: SiJavascript, color: 'text-[#F7DF1E]', tooltip: 'JavaScript' },
                { Icon: SiHtml5, color: 'text-[#E34F26]', tooltip: 'HTML5' },
                { Icon: SiCss3, color: 'text-[#1572B6]', tooltip: 'CSS3' },
                { Icon: SiTailwindcss, color: 'text-[#38B2AC]', tooltip: 'Tailwind CSS' },
                { Icon: SiNodedotjs, color: 'text-[#339933]', tooltip: 'Node.js' },
                { Icon: SiExpress, color: 'text-gray-400', tooltip: 'Express' },
                { Icon: SiNestjs, color: 'text-[#E0234E]', tooltip: 'NestJS' },
                { Icon: SiPython, color: 'text-[#3776AB]', tooltip: 'Python' },
                { Icon: SiGraphql, color: 'text-[#E10098]', tooltip: 'GraphQL' },
                { Icon: SiDocker, color: 'text-[#2496ED]', tooltip: 'Docker' },
                { Icon: SiAmazon, color: 'text-[#FF9900]', tooltip: 'AWS' },
                { Icon: SiFigma, color: 'text-[#F24E1E]', tooltip: 'Figma' },
              ].map(({ Icon, color, tooltip }) => (
                <motion.div
                  key={tooltip}
                  className="group relative flex flex-col items-center"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut"
                      }
                    }
                  }}
                >
                  <Icon className={`w-7 h-7 ${color} opacity-70 
                    transition-all duration-300
                    hover:opacity-100 
                    hover:drop-shadow-[0_0_10px_currentColor]`} 
                  />
                  <motion.span 
                    className="absolute top-full mt-2 text-xs text-gray-400 whitespace-nowrap"
                  >
                    {tooltip}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;